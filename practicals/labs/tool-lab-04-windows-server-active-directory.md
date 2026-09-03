# Tool Lab 04 - Windows Server and Active Directory

## Purpose

Windows Server is the foundation for many enterprise identity environments. This lab teaches students to configure Windows Server basics, install Active Directory Domain Services, create users and groups, apply Group Policy, and inspect security events.

## Scenario

FEMTECH needs a small internal domain named `femtech.lab`. You will build a domain controller for training, create a simple organizational structure, apply group-based access, and prove security events are logged.

## Systems

| System | Role | Example address |
|---|---|---|
| Windows Server Evaluation | Domain controller | `10.10.20.10` |
| Windows client | Domain workstation | `10.10.10.50` |
| pfSense | Gateway | `10.10.20.1` |
| Wazuh | Optional monitoring | `10.10.40.10` |

## Licence and Safety

Use Microsoft evaluation software only for training and evaluation. Do not use evaluation licences in production. Use synthetic users and data only.

## Step 1 - Configure Server Identity and Network

Run PowerShell as Administrator:

```powershell
Rename-Computer -NewName DC01 -Restart
```

After restart:

```powershell
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 10.10.20.10 -PrefixLength 24 -DefaultGateway 10.10.20.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 10.10.20.10
Get-NetIPConfiguration | Out-File C:\FEMTECH-DC01-IP.txt
Get-Date -AsUTC | Out-File C:\FEMTECH-DC01-Time.txt
```

Adjust the interface name if yours is different.

## Step 2 - Install AD DS and DNS

```powershell
Install-WindowsFeature AD-Domain-Services,DNS -IncludeManagementTools
Install-ADDSForest -DomainName "femtech.lab" -DomainNetbiosName "FEMTECH" -InstallDNS
```

After restart:

```powershell
Get-ADDomain | Out-File C:\FEMTECH-AD-Domain.txt
Get-Service DNS,NTDS,KDC | Format-Table Name,Status,StartType | Out-File C:\FEMTECH-AD-Services.txt
```

## Step 3 - Create OUs, Groups, and Users

```powershell
Import-Module ActiveDirectory
$Base = "DC=femtech,DC=lab"
New-ADOrganizationalUnit -Name "FEMTECH Users" -Path $Base
New-ADOrganizationalUnit -Name "FEMTECH Groups" -Path $Base
New-ADOrganizationalUnit -Name "FEMTECH Workstations" -Path $Base
New-ADOrganizationalUnit -Name "FEMTECH Servers" -Path $Base

$GroupsOU = "OU=FEMTECH Groups,$Base"
$UsersOU = "OU=FEMTECH Users,$Base"

New-ADGroup -Name "GG_IT_Helpdesk" -SamAccountName "GG_IT_Helpdesk" -GroupCategory Security -GroupScope Global -Path $GroupsOU
New-ADGroup -Name "GG_HR_Staff" -SamAccountName "GG_HR_Staff" -GroupCategory Security -GroupScope Global -Path $GroupsOU
New-ADGroup -Name "DL_HR_Read" -SamAccountName "DL_HR_Read" -GroupCategory Security -GroupScope DomainLocal -Path $GroupsOU

$Password = Read-Host "Enter temporary lab password" -AsSecureString
New-ADUser -Name "Ada Okoro" -SamAccountName "aokoro" -UserPrincipalName "aokoro@femtech.lab" -Path $UsersOU -AccountPassword $Password -Enabled $true -ChangePasswordAtLogon $true
New-ADUser -Name "Tunde Bello" -SamAccountName "tbello" -UserPrincipalName "tbello@femtech.lab" -Path $UsersOU -AccountPassword $Password -Enabled $true -ChangePasswordAtLogon $true
Add-ADGroupMember GG_HR_Staff aokoro
Add-ADGroupMember DL_HR_Read GG_HR_Staff
```

Do not write the password in the lab report.

## Step 4 - Build a Shared Resource

```powershell
New-Item -ItemType Directory -Path C:\Shares\HR -Force
New-SmbShare -Name HR -Path C:\Shares\HR -ChangeAccess "FEMTECH\DL_HR_Read"
icacls C:\Shares\HR /inheritance:r
icacls C:\Shares\HR /grant "FEMTECH\DL_HR_Read:(OI)(CI)RX"
Get-SmbShare HR | Out-File C:\FEMTECH-HR-Share.txt
icacls C:\Shares\HR | Out-File C:\FEMTECH-HR-ACL.txt
```

## Step 5 - Create a Basic Security GPO

```powershell
Import-Module GroupPolicy
$Gpo = New-GPO -Name "FEMTECH Workstation Security Baseline"
Set-GPRegistryValue -Name $Gpo.DisplayName -Key "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System" -ValueName "DisableCAD" -Type DWord -Value 0
New-GPLink -Name $Gpo.DisplayName -Target "OU=FEMTECH Workstations,$Base"
Get-GPOReport -Name $Gpo.DisplayName -ReportType Html -Path C:\FEMTECH-GPO-Report.html
```

## Step 6 - Join a Windows Client

On the client, set DNS to `10.10.20.10`, then join the domain:

```powershell
Add-Computer -DomainName femtech.lab -Restart
```

After restart:

```powershell
whoami
gpresult /r
nltest /dsgetdc:femtech.lab
```

Save output.

## Step 7 - Generate Security Events

Perform these actions:

1. Log on successfully as a domain user.
2. Attempt one failed logon with a wrong password.
3. Add and remove a user from a test group.
4. Access the HR share with an authorised user.
5. Attempt access with an unauthorised user.

On the domain controller:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4720,4728,4732; StartTime=(Get-Date).AddHours(-2)} |
  Select-Object TimeCreated,Id,ProviderName,Message |
  Format-List |
  Out-File C:\FEMTECH-Security-Events.txt
wevtutil epl Security C:\FEMTECH-Security-Lab.evtx /ow:true
Get-FileHash C:\FEMTECH-Security-Lab.evtx -Algorithm SHA256 | Out-File C:\FEMTECH-Security-Lab.evtx.sha256.txt
```

## Step 8 - Explain Identity Concepts

In the report, explain:

- Difference between local and domain accounts.
- Why groups are better than direct user permissions.
- Difference between authentication and authorization.
- Why DNS is critical to Active Directory.
- Why Kerberos time accuracy matters.

## Troubleshooting

| Problem | Check |
|---|---|
| Client cannot join domain | DNS points to DC, not pfSense or public DNS |
| Domain controller not found | `nltest /dsgetdc:femtech.lab` |
| GPO not applying | Link target, OU location, `gpupdate /force`, `gpresult /r` |
| Share access wrong | Group membership, token refresh, NTFS ACL and share permissions |
| Events missing | Audit policy, time window, correct log, correct system |

## Deliverables

- Server IP and time evidence.
- AD DS/DNS installation evidence.
- OU, group, and user export.
- Share and ACL evidence.
- GPO report.
- Client domain-join proof.
- Security event export and hash.
- Identity explanation.

## Pass Condition

The student passes when the domain works, group-based access is proven, GPO evidence exists, and security events can be found and explained.

