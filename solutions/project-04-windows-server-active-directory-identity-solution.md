# Project 04 Solution - Windows Server, Active Directory, and Identity

## Target Outcome

The student builds a small Active Directory domain for Northwind Legal Services, creates organized identity objects, assigns access through groups, applies a basic Group Policy Object, and collects Windows security evidence that a junior administrator or SOC analyst can explain.

## Reference Environment

| Component | Example |
|---|---|
| Domain controller | Windows Server, `DC01` |
| Domain | `northwind.lab` |
| Server IP | `10.10.20.10` |
| Client | Windows 10 or Windows 11 |
| Evidence folder | `C:\Northwind-Evidence\Project-04` |

Use synthetic names only. Do not use real employee data, real client files, or real legal documents.

## Step 1 - Create Evidence Folder and Start Logging

On the Windows Server:

```powershell
New-Item -ItemType Directory -Force -Path C:\Northwind-Evidence\Project-04
Start-Transcript -Path C:\Northwind-Evidence\Project-04\powershell-transcript.txt -Append
Get-Date
hostname
whoami
ipconfig /all
```

Expected explanation: the transcript records administrative work, `ipconfig /all` proves IP and DNS configuration, and `whoami` proves which account performed the actions.

## Step 2 - Prepare the Server

Rename the server:

```powershell
Rename-Computer -NewName DC01 -Restart
```

After restart, configure a static IP address through Server Manager or Windows network settings. The DNS server should point to the domain controller itself after DNS is installed.

Collect evidence:

```powershell
hostname | Out-File C:\Northwind-Evidence\Project-04\01-hostname.txt
ipconfig /all | Out-File C:\Northwind-Evidence\Project-04\02-ip-dns-settings.txt
w32tm /query /status | Out-File C:\Northwind-Evidence\Project-04\03-time-status.txt
```

Why this matters in practice: Active Directory relies heavily on DNS and time synchronization. Kerberos authentication can fail when time is badly wrong, and domain clients must be able to locate domain controllers through DNS.

## Step 3 - Install AD DS and DNS

Install required server roles:

```powershell
Install-WindowsFeature AD-Domain-Services,DNS -IncludeManagementTools
```

Promote the server to a new forest:

```powershell
Install-ADDSForest `
  -DomainName "northwind.lab" `
  -DomainNetbiosName "NORTHWIND" `
  -InstallDNS
```

The server will restart. After restart, sign in as a domain administrator.

Validate:

```powershell
Get-ADDomain | Out-File C:\Northwind-Evidence\Project-04\04-domain-proof.txt
Get-ADForest | Out-File C:\Northwind-Evidence\Project-04\05-forest-proof.txt
Get-Service DNS,NTDS,KDC | Out-File C:\Northwind-Evidence\Project-04\06-critical-services.txt
Get-DnsServerZone | Out-File C:\Northwind-Evidence\Project-04\07-dns-zones.txt
dcdiag /v | Out-File C:\Northwind-Evidence\Project-04\08-dcdiag.txt
```

The expected result is that the domain exists, DNS has the domain zone, and critical services are running.

## Step 4 - Create Organizational Units

Create OUs that reflect administration and policy needs:

```powershell
$base = "DC=northwind,DC=lab"
New-ADOrganizationalUnit -Name "Northwind Users" -Path $base
New-ADOrganizationalUnit -Name "Northwind Groups" -Path $base
New-ADOrganizationalUnit -Name "Northwind Workstations" -Path $base
New-ADOrganizationalUnit -Name "Northwind Servers" -Path $base
New-ADOrganizationalUnit -Name "Northwind Disabled" -Path $base
Get-ADOrganizationalUnit -Filter * | Select-Object Name,DistinguishedName |
  Out-File C:\Northwind-Evidence\Project-04\09-ou-proof.txt
```

Good design principle: OUs are used for administration and Group Policy targeting. Groups are used for access.

## Step 5 - Create Role Groups and Resource Groups

Create global groups for job roles and domain local groups for resource permissions:

```powershell
$groupOU = "OU=Northwind Groups,DC=northwind,DC=lab"

New-ADGroup -Name "GG_Attorneys" -GroupScope Global -GroupCategory Security -Path $groupOU
New-ADGroup -Name "GG_Legal_Assistants" -GroupScope Global -GroupCategory Security -Path $groupOU
New-ADGroup -Name "GG_HR_Staff" -GroupScope Global -GroupCategory Security -Path $groupOU
New-ADGroup -Name "GG_IT_Helpdesk" -GroupScope Global -GroupCategory Security -Path $groupOU

New-ADGroup -Name "DL_Cases_Read" -GroupScope DomainLocal -GroupCategory Security -Path $groupOU
New-ADGroup -Name "DL_Cases_Modify" -GroupScope DomainLocal -GroupCategory Security -Path $groupOU
New-ADGroup -Name "DL_HR_Read" -GroupScope DomainLocal -GroupCategory Security -Path $groupOU

Add-ADGroupMember -Identity "DL_Cases_Modify" -Members "GG_Attorneys"
Add-ADGroupMember -Identity "DL_Cases_Read" -Members "GG_Legal_Assistants"
```

This follows a clean access model: users go into role groups, role groups go into resource groups, and resource groups receive permissions.

## Step 6 - Create Synthetic Users

```powershell
$userOU = "OU=Northwind Users,DC=northwind,DC=lab"
$password = ConvertTo-SecureString "ChangeMe-StudentLab!2026" -AsPlainText -Force

New-ADUser -Name "Laura Legal" -SamAccountName "laura.legal" -UserPrincipalName "laura.legal@northwind.lab" -AccountPassword $password -Enabled $true -Path $userOU -ChangePasswordAtLogon $true
New-ADUser -Name "Ade Attorney" -SamAccountName "ade.attorney" -UserPrincipalName "ade.attorney@northwind.lab" -AccountPassword $password -Enabled $true -Path $userOU -ChangePasswordAtLogon $true
New-ADUser -Name "Hana HR" -SamAccountName "hana.hr" -UserPrincipalName "hana.hr@northwind.lab" -AccountPassword $password -Enabled $true -Path $userOU -ChangePasswordAtLogon $true
New-ADUser -Name "Former User" -SamAccountName "former.user" -UserPrincipalName "former.user@northwind.lab" -AccountPassword $password -Enabled $false -Path "OU=Northwind Disabled,DC=northwind,DC=lab"

Add-ADGroupMember -Identity "GG_Legal_Assistants" -Members "laura.legal"
Add-ADGroupMember -Identity "GG_Attorneys" -Members "ade.attorney"
Add-ADGroupMember -Identity "GG_HR_Staff" -Members "hana.hr"

Get-ADUser -Filter * -Properties Enabled,MemberOf | Select-Object Name,SamAccountName,Enabled |
  Out-File C:\Northwind-Evidence\Project-04\10-user-proof.txt
Get-ADGroup -Filter * | Select-Object Name,GroupScope |
  Out-File C:\Northwind-Evidence\Project-04\11-group-proof.txt
```

Do not reuse this password in real life. In a real organization, passwords must follow approved policy, MFA should be used where supported, and privileged accounts should be tightly controlled.

## Step 7 - Build a Shared Folder with Group-Based Access

```powershell
New-Item -ItemType Directory -Force -Path C:\Shares\Cases
Set-Content -Path C:\Shares\Cases\case-summary.txt -Value "Synthetic legal case file for lab testing only."
New-SmbShare -Name Cases -Path C:\Shares\Cases -ChangeAccess "NORTHWIND\DL_Cases_Modify" -ReadAccess "NORTHWIND\DL_Cases_Read"
```

Configure NTFS permissions:

```powershell
$acl = Get-Acl C:\Shares\Cases
$acl.SetAccessRuleProtection($true,$false)
$rules = @(
  New-Object System.Security.AccessControl.FileSystemAccessRule("NORTHWIND\DL_Cases_Modify","Modify","ContainerInherit,ObjectInherit","None","Allow"),
  New-Object System.Security.AccessControl.FileSystemAccessRule("NORTHWIND\DL_Cases_Read","ReadAndExecute","ContainerInherit,ObjectInherit","None","Allow"),
  New-Object System.Security.AccessControl.FileSystemAccessRule("NORTHWIND\Domain Admins","FullControl","ContainerInherit,ObjectInherit","None","Allow")
)
foreach ($rule in $rules) { $acl.AddAccessRule($rule) }
Set-Acl C:\Shares\Cases $acl
Get-SmbShareAccess -Name Cases | Out-File C:\Northwind-Evidence\Project-04\12-share-permissions.txt
(Get-Acl C:\Shares\Cases).Access | Out-File C:\Northwind-Evidence\Project-04\13-ntfs-permissions.txt
```

Validation:

```powershell
Test-Path \\DC01\Cases
```

Sign in or map the share as the test users:

```powershell
net use Z: \\DC01\Cases /user:NORTHWIND\laura.legal *
type Z:\case-summary.txt
echo test > Z:\laura-write-test.txt
net use Z: /delete
```

Expected result: `laura.legal` can read but cannot write. `ade.attorney` can read and write. `hana.hr` should not access the Cases share unless added to the proper group.

## Step 8 - Join a Windows Client to the Domain

On the client, set DNS to `10.10.20.10`, then join the domain:

```powershell
Add-Computer -DomainName northwind.lab -Restart
```

After restart:

```powershell
whoami
nltest /dsgetdc:northwind.lab
gpresult /r
```

Save the outputs to the evidence folder on the server or export screenshots with command output visible.

## Step 9 - Create and Apply a Basic Workstation GPO

In Group Policy Management:

1. Create a GPO named `Northwind Workstation Baseline`.
2. Link it to `OU=Northwind Workstations`.
3. Configure one simple setting, such as hiding the last signed-in user:
   `Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Interactive logon: Do not display last user name`.
4. Move the client computer object into the `Northwind Workstations` OU.

On the client:

```powershell
gpupdate /force
gpresult /h C:\gpresult-project-04.html
```

Copy the HTML result into the evidence folder.

## Step 10 - Collect Security Events

Generate a successful sign-in, failed sign-in, group membership change, and disabled account test. Then review Windows Security logs.

Important event IDs:

| Event ID | Meaning |
|---|---|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4720 | User account created |
| 4726 | User account deleted |
| 4728 | Member added to global group |
| 4732 | Member added to local group |
| 4738 | User account changed |
| 4740 | Account locked out |
| 4768 | Kerberos TGT requested |
| 4769 | Kerberos service ticket requested |
| 4771 | Kerberos pre-authentication failed |

Export evidence:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4720,4728,4738,4740,4768,4769,4771} -MaxEvents 50 |
  Select-Object TimeCreated,Id,ProviderName,Message |
  Out-File C:\Northwind-Evidence\Project-04\14-selected-security-events.txt

wevtutil epl Security C:\Northwind-Evidence\Project-04\Security.evtx
Get-FileHash C:\Northwind-Evidence\Project-04\Security.evtx -Algorithm SHA256 |
  Out-File C:\Northwind-Evidence\Project-04\15-security-evtx-hash.txt
```

## Step 11 - Write the Solution Report

The report must include:

- Business problem.
- Domain name, hostnames, and IP addressing.
- OU and group design.
- User and group membership table.
- Share and NTFS permission explanation.
- Positive and negative access tests.
- GPO setting and proof.
- Important event IDs and what each event means.
- Security weaknesses still present.
- Recommendations for MFA, privileged access management, backups, monitoring, and patching.

## Pass Standard

The project is complete when the student can prove the domain works, DNS works, users authenticate, disabled users are denied, folder access follows group membership, GPO applies to the client, and Windows event logs support the story.
