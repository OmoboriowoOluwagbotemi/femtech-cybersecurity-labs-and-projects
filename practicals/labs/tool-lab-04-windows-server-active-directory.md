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

## Complete Lab Support

### Beginner Concepts

| Concept | Simple meaning | Lab example |
|---|---|---|
| Windows Server | Microsoft server operating system | Domain controller |
| Domain | Central identity boundary | `femtech.lab` |
| Domain controller | Server that authenticates domain users | `DC01` |
| Active Directory | Directory of users, computers, groups, and policies | AD DS |
| DNS | Name resolution service AD depends on | Client finds domain controller |
| OU | Folder-like container for AD objects | `FEMTECH Users` |
| Group | Collection used for access control | `GG_HR_Staff` |
| GPO | Group Policy Object applying settings | Workstation baseline |
| Event Viewer | Tool for reading Windows logs | Security log |
| PowerShell | Command-line automation shell | AD user creation |

### Preflight Checklist

```text
Windows Server VM name:
Planned hostname:
Static IP:
Gateway:
DNS server:
Domain name:
Local administrator account:
Snapshot name:
Instructor approval:
```

Do not promote the server to a domain controller until the IP address, DNS setting, and time are correct.

### Evidence Folder

On Windows Server, create:

```powershell
$Evidence = "C:\FEMTECH-Evidence\Tool-Lab-04"
New-Item -ItemType Directory -Force -Path $Evidence | Out-Null
Get-Date -AsUTC | Out-File "$Evidence\start-time-utc.txt"
Start-Transcript -Path "$Evidence\powershell-transcript.txt" -Append
```

At the end:

```powershell
Stop-Transcript
Get-ChildItem $Evidence -File -Recurse |
  Get-FileHash -Algorithm SHA256 |
  Format-Table Hash,Path -AutoSize |
  Out-File "$Evidence\hashes.sha256.txt"
```

### Build Order

Follow this order exactly:

1. Rename the server.
2. Reboot.
3. Set static IP.
4. Set DNS to the server's own IP.
5. Install AD DS and DNS.
6. Promote the server.
7. Reboot.
8. Confirm AD services.
9. Create OUs.
10. Create groups.
11. Create users.
12. Assign users to groups.
13. Create file share and ACLs.
14. Create GPO.
15. Join client.
16. Generate and collect logs.

### Required Validation Commands

Run after domain promotion:

```powershell
Get-ADDomain | Out-File "$Evidence\ad-domain.txt"
Get-ADForest | Out-File "$Evidence\ad-forest.txt"
Get-Service DNS,NTDS,KDC | Format-Table Name,Status,StartType | Out-File "$Evidence\ad-services.txt"
dcdiag /v | Out-File "$Evidence\dcdiag.txt"
Get-DnsServerZone | Out-File "$Evidence\dns-zones.txt"
```

Run after creating AD objects:

```powershell
Get-ADOrganizationalUnit -Filter * | Select-Object Name,DistinguishedName | Out-File "$Evidence\ous.txt"
Get-ADGroup -Filter * | Select-Object Name,GroupScope,GroupCategory | Out-File "$Evidence\groups.txt"
Get-ADUser -Filter * | Select-Object Name,SamAccountName,Enabled | Out-File "$Evidence\users.txt"
Get-ADGroupMember GG_HR_Staff | Out-File "$Evidence\gg-hr-staff-members.txt"
Get-ADGroupMember DL_HR_Read | Out-File "$Evidence\dl-hr-read-members.txt"
```

### Testing Access

Create this test table in the report:

| Test | User | Expected result | Actual result | Evidence |
|---|---|---|---|---|
| HR share access | `aokoro` | Allowed | | |
| HR share access | `tbello` | Denied unless added | | |
| Domain login | Domain user | Allowed | | |
| Wrong password | Domain user | Failed logon event | | |
| GPO result | Domain client | Policy visible | | |

### Important Event IDs

| Event ID | Meaning |
|---:|---|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4720 | User account created |
| 4726 | User account deleted |
| 4728 | Member added to global group |
| 4732 | Member added to local group |
| 4738 | User account changed |

### Report Template

```text
Title: Windows Server and Active Directory Lab Report

1. Scope and Purpose

2. Server Configuration
Hostname:
IP:
DNS:
Domain:

3. AD Structure
OUs:
Groups:
Users:

4. Access Control Test

5. Group Policy Evidence

6. Security Event Evidence

7. Troubleshooting

8. Management Summary
```

