# Lab 07 - Build Active Directory and Role-Based Access

## Mission

FEMTECH is replacing local accounts with a managed domain. Build a small Active Directory forest, create an organisational-unit and group design, join a Windows client, apply security policy, and prove least privilege and account lifecycle controls.

**Lessons:** 17-20
**Time:** 6-8 hours
**Systems:** Windows Server 2025 Evaluation `dc01` (`10.10.20.10`), Windows 11 Evaluation `win11-01`, pfSense
**Domain:** `femtech.lab`; NetBIOS: `FEMTECH`

## Important Licence and Safety Note

The Windows images are official time-limited evaluations for training, not free production licences. Use synthetic identities only. Snapshot the server before promotion and record the Directory Services Restore Mode password in the instructor-approved password vault, never in screenshots or transcripts.

## Step 1 - Configure and Validate the Server Address

In elevated PowerShell on the server:

```powershell
Get-NetAdapter
Get-NetIPConfiguration
$IfIndex = (Get-NetAdapter | Where-Object Status -eq 'Up' | Select-Object -First 1).ifIndex
New-NetIPAddress -InterfaceIndex $IfIndex -IPAddress 10.10.20.10 -PrefixLength 24 -DefaultGateway 10.10.20.1
Set-DnsClientServerAddress -InterfaceIndex $IfIndex -ServerAddresses 127.0.0.1
Rename-Computer -NewName 'DC01' -Restart
```

After restart:

```powershell
Get-NetIPConfiguration
Test-NetConnection 10.10.20.1
Resolve-DnsName localhost
```

AD depends heavily on DNS and time. Static addressing prevents a changing locator.

## Step 2 - Install and Promote AD DS

```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
Get-WindowsFeature AD-Domain-Services
$DSRM = Read-Host 'Enter DSRM password' -AsSecureString
Install-ADDSForest `
  -DomainName 'femtech.lab' `
  -DomainNetbiosName 'FEMTECH' `
  -InstallDNS `
  -SafeModeAdministratorPassword $DSRM `
  -Force
```

The server restarts. Afterward:

```powershell
Get-ADDomain
Get-ADForest
Get-ADDomainController -Filter *
dcdiag /test:dns /v
Get-DnsServerZone
```

Save `dcdiag` output. Investigate errors; do not declare success merely because the console opens.

## Step 3 - Build the OU Model

Do not mirror the company chart blindly. OUs support delegation and policy scope.

```powershell
$Base = 'DC=femtech,DC=lab'
New-ADOrganizationalUnit -Name 'FEMTECH' -Path $Base -ProtectedFromAccidentalDeletion $true
$Root = "OU=FEMTECH,$Base"
'Users','Workstations','Servers','Groups','Service Accounts','Disabled Objects' | ForEach-Object {
  New-ADOrganizationalUnit -Name $_ -Path $Root -ProtectedFromAccidentalDeletion $true
}
Get-ADOrganizationalUnit -Filter * -SearchBase $Root | Select-Object Name,DistinguishedName
```

## Step 4 - Create Role Groups and Users

Use the AGDLP principle: Accounts -> Global role groups -> Domain Local resource groups -> Permissions.

```powershell
$GroupsOU = "OU=Groups,$Root"
$UsersOU = "OU=Users,$Root"
New-ADGroup -Name 'GG_HR_Staff' -SamAccountName 'GG_HR_Staff' -GroupCategory Security -GroupScope Global -Path $GroupsOU
New-ADGroup -Name 'GG_IT_Helpdesk' -SamAccountName 'GG_IT_Helpdesk' -GroupCategory Security -GroupScope Global -Path $GroupsOU
New-ADGroup -Name 'DL_HR_Read' -SamAccountName 'DL_HR_Read' -GroupCategory Security -GroupScope DomainLocal -Path $GroupsOU
Add-ADGroupMember -Identity 'DL_HR_Read' -Members 'GG_HR_Staff'
```

Create a user without exposing the password:

```powershell
$TempPassword = Read-Host 'Temporary password for Ada' -AsSecureString
New-ADUser -Name 'Ada Okafor' -GivenName 'Ada' -Surname 'Okafor' `
  -SamAccountName 'ada.okafor' -UserPrincipalName 'ada.okafor@femtech.lab' `
  -Path $UsersOU -AccountPassword $TempPassword -Enabled $true -ChangePasswordAtLogon $true
Add-ADGroupMember -Identity 'GG_HR_Staff' -Members 'ada.okafor'
Get-ADUser ada.okafor -Properties MemberOf,Enabled,PasswordLastSet | Format-List
```

## Step 5 - Create a Resource and Assign Group-Based Access

On `dc01`, create a synthetic HR share:

```powershell
New-Item -ItemType Directory -Path C:\Shares\HR -Force
$Acl = Get-Acl C:\Shares\HR
$Acl.SetAccessRuleProtection($true,$false)
$Rule = New-Object System.Security.AccessControl.FileSystemAccessRule('FEMTECH\DL_HR_Read','ReadAndExecute','ContainerInherit,ObjectInherit','None','Allow')
$Acl.AddAccessRule($Rule)
Set-Acl C:\Shares\HR $Acl
New-SmbShare -Name 'HR' -Path C:\Shares\HR -ReadAccess 'FEMTECH\DL_HR_Read' -FullAccess 'FEMTECH\Domain Admins'
Get-SmbShareAccess -Name HR
(Get-Acl C:\Shares\HR).Access
```

Share and NTFS permissions both apply; the effective result is the more restrictive combination.

## Step 6 - Join the Client Correctly

On `win11-01`, set DNS to the domain controller, not a public resolver:

```powershell
Get-NetAdapter
$IfIndex = (Get-NetAdapter | Where-Object Status -eq 'Up' | Select-Object -First 1).ifIndex
Set-DnsClientServerAddress -InterfaceIndex $IfIndex -ServerAddresses 10.10.20.10
Resolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.femtech.lab
Test-NetConnection 10.10.20.10 -Port 53
Add-Computer -DomainName 'femtech.lab' -Credential (Get-Credential 'FEMTECH\Administrator') -Restart
```

After restart:

```powershell
whoami
whoami /groups
nltest /dsgetdc:femtech.lab
Test-ComputerSecureChannel -Verbose
```

Move the computer into the Workstations OU from `dc01`:

```powershell
Get-ADComputer 'WIN11-01' | Move-ADObject -TargetPath "OU=Workstations,$Root"
```

## Step 7 - Create and Link a Security GPO

```powershell
Import-Module GroupPolicy
$Gpo = New-GPO -Name 'FEMTECH Workstation Baseline'
New-GPLink -Name $Gpo.DisplayName -Target "OU=Workstations,$Root" -LinkEnabled Yes
Set-GPRegistryValue -Name $Gpo.DisplayName `
  -Key 'HKLM\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging' `
  -ValueName 'EnableScriptBlockLogging' -Type DWord -Value 1
Set-GPRegistryValue -Name $Gpo.DisplayName `
  -Key 'HKLM\Software\Policies\Microsoft\Windows\PowerShell\Transcription' `
  -ValueName 'EnableTranscripting' -Type DWord -Value 1
Get-GPOReport -Name $Gpo.DisplayName -ReportType Html -Path C:\FEMTECH-Workstation-Baseline.html
```

On the client:

```powershell
gpupdate /force
gpresult /h C:\gpresult.html
Get-ItemProperty 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging'
```

## Step 8 - Test Access and Separation of Duties

Sign in as Ada:

```powershell
whoami /all
Get-ChildItem \\dc01\HR
New-Item \\dc01\HR\unauthorised.txt -ItemType File
```

Read succeeds; creation fails. Test a non-HR synthetic user; both read and write fail. Do not grant direct user permissions to make the test pass.

## Step 9 - Perform an Account Lifecycle Action

Simulate Ada leaving:

```powershell
Disable-ADAccount ada.okafor
Get-ADUser ada.okafor | Move-ADObject -TargetPath "OU=Disabled Objects,$Root"
Set-ADUser ada.okafor -Description "Disabled by CHG-LAB07 on $(Get-Date -Format s)"
Get-ADUser ada.okafor -Properties Enabled,MemberOf,Description,DistinguishedName | Format-List
```

Validate that a new login is denied. Decide whether group memberships should be removed now or retained temporarily for investigation/audit; document the policy.

## Deliverables

- AD health, DNS, and secure-channel evidence.
- OU diagram and design rationale.
- AGDLP group mapping and share permissions.
- GPO backup/report and client application proof.
- Positive and negative resource-access tests.
- Joiner/mover/leaver checklist and lifecycle evidence.
- Risk note on privileged groups, service accounts, Kerberos, NTLM, and time synchronisation.

## Troubleshooting

- Domain not found: verify the client uses `10.10.20.10` DNS and the SRV lookup succeeds.
- Join fails with time error: compare `w32tm /query /status` and correct the hierarchy.
- GPO missing: verify computer OU, link, security filtering, WMI filters, and `gpresult` denial reasons.
- Share access unexpected: inspect both SMB and NTFS permissions plus the user's current token; sign out after group changes.
