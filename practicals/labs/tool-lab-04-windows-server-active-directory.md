# Tool Lab 04 - Windows Server and Active Directory

## Purpose

This lab teaches students how to build and operate a small Windows Server Active Directory environment using a practical, manual, GUI-first approach. PowerShell is used mainly for verification, evidence collection, and troubleshooting so students understand what they are configuring instead of only running automation.

By the end of this lab, students should be able to explain and perform the core tasks expected from an entry-level security administrator, systems administrator, SOC analyst, or junior cybersecurity analyst working in a Windows enterprise.

## Scenario

FEMTECH Information Technology Institute is building a small internal training network. The organization needs a central identity system so staff can log in with domain accounts, access shared resources, receive security policies, and generate auditable security events.

You will build a domain controller named `DC01`, create a domain named `femtech.lab`, organize users and computers, create security groups, configure a shared HR folder, apply a basic Group Policy Object, join a Windows client to the domain, and review Windows Security logs.

## Tools Used

| Tool | Purpose in this lab |
|---|---|
| VirtualBox or VMware | Run the Windows Server and Windows client virtual machines |
| Windows Server Evaluation | Build the domain controller |
| Windows client | Join a workstation to the domain and test user access |
| Server Manager | Install roles and manage Windows Server |
| Active Directory Users and Computers | Create OUs, users, and groups |
| Group Policy Management | Create and link a basic security policy |
| Event Viewer | Review Windows Security logs |
| PowerShell | Verify configuration and save evidence |

## Network Plan

| System | Role | Example IP address | DNS setting |
|---|---|---:|---:|
| `DC01` | Domain controller, DNS server | `10.10.20.10` | `10.10.20.10` |
| Windows client | Domain workstation | `10.10.20.50` | `10.10.20.10` |
| pfSense | Gateway for the server network | `10.10.20.1` | Not used as client DNS for AD |

Important: In an Active Directory lab, the Windows client must use the domain controller as its DNS server. If the client uses public DNS or pfSense DNS instead of `DC01`, domain join and logon will usually fail.

## Licensing and Safety

Use Microsoft evaluation software only for training and evaluation. Do not use evaluation licenses in production.

Use only synthetic users and synthetic data. Do not use real staff names, real passwords, real customer data, or real organizational documents.

## Required Starting Materials

Before starting the lab, confirm that you have:

| Requirement | Minimum recommendation | Notes |
|---|---|---|
| Host computer | 16 GB RAM or more | 8 GB may work slowly, but Windows Server plus a Windows client can become unstable |
| Hypervisor | VirtualBox or VMware | Use the same hypervisor for both Windows VMs if possible |
| Windows Server ISO | Microsoft Windows Server Evaluation | Desktop Experience is easier for beginners than Server Core |
| Windows client ISO | Windows 10 or Windows 11 Evaluation | A client VM is required for domain join and access testing |
| Network | Same isolated lab network for server and client | Do not expose the domain controller directly to a public network |
| Administrator password | Classroom-approved password | Never reuse a personal password |
| Lab notebook | Digital or paper | Record IP addresses, errors, screenshots, and fixes |

Recommended VM resources:

| VM | CPU | RAM | Disk |
|---|---:|---:|---:|
| Windows Server `DC01` | 2 cores | 4 GB to 6 GB | 60 GB |
| Windows client | 2 cores | 4 GB | 50 GB |

If the host computer has limited resources, run only the VM needed for the current step. For example, configure `DC01` first, then start the Windows client when you reach the domain-join section.

Take a VM snapshot before major changes:

| Snapshot point | Why it matters |
|---|---|
| Clean Windows Server installed | Allows rollback before AD promotion |
| Server renamed and static IP configured | Allows rollback before installing roles |
| Domain controller working | Allows rollback before creating users, groups, and GPOs |
| Windows client before domain join | Allows repeated domain join practice |

## Learning Outcomes

After completing this lab, students will be able to:

- Explain the role of Windows Server in an enterprise network.
- Explain why Active Directory depends heavily on DNS.
- Configure a Windows Server hostname and static IP address.
- Install Active Directory Domain Services and DNS Server using Server Manager.
- Promote a server to a domain controller.
- Create organizational units, users, and security groups.
- Use group-based access control instead of assigning permissions directly to users.
- Create a shared folder and apply basic share and NTFS permissions.
- Create and link a Group Policy Object.
- Join a Windows client to a domain.
- Generate and identify important Windows Security event IDs.
- Collect evidence in a professional lab report.

## Key Concepts Before You Start

| Concept | Meaning | Why it matters in security operations |
|---|---|---|
| Windows Server | Microsoft operating system used for server roles such as identity, DNS, file sharing, DHCP, and application services | Many enterprises rely on Windows Server for authentication and centralized administration |
| Active Directory Domain Services | Microsoft directory service that stores users, computers, groups, and policies | It is a common target for attackers because it controls identity and access |
| Domain | A central administrative boundary for users, computers, and policies | Users can sign in across joined systems using domain identities |
| Domain controller | A server that authenticates domain users and stores AD data | If domain controllers fail or are compromised, business operations can be seriously affected |
| DNS | Name resolution service that converts names to IP addresses | AD uses DNS records so clients can find domain controllers and services |
| Organizational Unit | A container used to organize AD objects and apply Group Policy | OUs support cleaner administration and policy targeting |
| Security group | A collection of accounts used to assign access | Groups are easier to audit and manage than direct user permissions |
| Group Policy Object | A policy that applies settings to users or computers | GPOs help enforce security baselines across many systems |
| Authentication | Proving identity | Example: Ada signs in with a domain username and password |
| Authorization | Deciding what an authenticated identity can access | Example: Ada can read the HR share because she is in the HR group |
| Event Viewer | Windows tool for reading logs | SOC analysts use logs to investigate logons, account changes, service activity, and failures |

## Lab Build Order

Follow this order carefully:

1. Install Windows Server with Desktop Experience if it is not already installed.
2. Install Windows client if it is not already installed.
3. Confirm both VMs are on the correct isolated network.
4. Rename the Windows Server to `DC01`.
5. Configure a static IP address on `DC01`.
6. Check time and timezone.
7. Install AD DS and DNS Server.
8. Promote `DC01` to a domain controller for `femtech.lab`.
9. Validate domain controller health.
10. Create OUs.
11. Create groups.
12. Create users.
13. Assign users to groups.
14. Create a shared folder and configure permissions.
15. Join a Windows client to the domain.
16. Create and apply a basic GPO.
17. Generate security events.
18. Collect evidence and complete the report.

## Lab Credentials

Use classroom-approved passwords only. Do not use personal passwords.

Suggested lab naming:

| Object | Value |
|---|---|
| Server hostname | `DC01` |
| Domain name | `femtech.lab` |
| NetBIOS name | `FEMTECH` |
| Domain administrator | `FEMTECH\Administrator` |
| Test user 1 | `aokoro` |
| Test user 2 | `tbello` |
| HR group | `GG_HR_Staff` |
| HR resource group | `DL_HR_Read` |

Do not include passwords in screenshots, reports, file names, or GitHub repositories.

## Step 1 - Prepare the Evidence Folder

On `DC01`, sign in as the local Administrator.

Open PowerShell as Administrator and run:

```powershell
New-Item -ItemType Directory -Force -Path C:\FEMTECH-Evidence\Tool-Lab-04
Get-Date -AsUTC | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\start-time-utc.txt
Start-Transcript -Path C:\FEMTECH-Evidence\Tool-Lab-04\powershell-transcript.txt -Append
```

This folder stores proof of what you configured. Screenshots are useful, but saved command output is stronger because it can be searched, copied, compared, and hashed.

Checkpoint:

```powershell
Test-Path C:\FEMTECH-Evidence\Tool-Lab-04
```

Expected result:

```text
True
```

## Step 2 - Confirm the VM Network

Before changing Windows Server, confirm that the VM is connected to the correct network.

If Windows Server is not installed yet:

1. Create a new VM.
2. Attach the Windows Server Evaluation ISO.
3. Start the VM.
4. Select language, time, and keyboard options.
5. Click Install now.
6. Choose Windows Server with Desktop Experience.
7. Choose Custom installation.
8. Select the virtual disk.
9. Allow installation to complete.
10. Set the local Administrator password.
11. Sign in and wait for Server Manager to open.

If the Windows client is not installed yet:

1. Create a second VM.
2. Attach the Windows 10 or Windows 11 ISO.
3. Install Windows normally.
4. Create a local administrator account.
5. Keep the client in a workgroup for now.
6. Do not join the domain until Step 14.

In VirtualBox:

1. Shut down the Windows Server VM if it is running.
2. Select the Windows Server VM.
3. Open Settings.
4. Go to Network.
5. Confirm the network adapter is connected to the same lab network as the Windows client.
6. Use the network type required by your instructor, usually Internal Network, Host-only Adapter, or a pfSense-backed lab network.

In VMware:

1. Shut down the Windows Server VM if it is running.
2. Open VM Settings.
3. Select Network Adapter.
4. Confirm the adapter is connected to the correct lab network.
5. Avoid using a network that exposes the domain controller directly to the internet.

Record in your report:

```text
Server VM network type:
Client VM network type:
Gateway IP:
Instructor approval:
```

Checkpoint before continuing:

| Check | Expected result |
|---|---|
| Server and client can be placed on the same lab network | Yes |
| Server has enough RAM to boot normally | Yes |
| Windows Server opens Server Manager | Yes |
| Windows client can reach network settings | Yes |
| Snapshot taken before AD changes | Yes |

## Step 3 - Rename the Server Manually

A clear server name helps administrators and analysts quickly understand what system they are reviewing.

On `DC01`:

1. Open Server Manager.
2. Select Local Server.
3. Click the current computer name.
4. In System Properties, click Change.
5. Set Computer name to `DC01`.
6. Click OK.
7. Restart when prompted.

After restart, open PowerShell and verify:

```powershell
hostname
$env:COMPUTERNAME
```

Save evidence:

```powershell
hostname | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\hostname.txt
```

Expected result:

```text
DC01
```

## Step 4 - Configure a Static IP Address Manually

Domain controllers should not rely on changing DHCP addresses. If the IP address changes, clients may fail to find the domain controller.

On `DC01`:

1. Open Server Manager.
2. Select Local Server.
3. Click the Ethernet link beside the network adapter.
4. Right-click the active adapter.
5. Select Properties.
6. Select Internet Protocol Version 4 (TCP/IPv4).
7. Click Properties.
8. Select Use the following IP address.
9. Enter:

| Setting | Value |
|---|---|
| IP address | `10.10.20.10` |
| Subnet mask | `255.255.255.0` |
| Default gateway | `10.10.20.1` |
| Preferred DNS server | `10.10.20.10` |

Click OK and close the adapter windows.

Verify:

```powershell
ipconfig /all
Get-NetIPConfiguration
```

Save evidence:

```powershell
ipconfig /all | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\ipconfig-dc01.txt
Get-NetIPConfiguration | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\net-ip-configuration-dc01.txt
```

Student explanation:

```text
Why should the domain controller use a static IP address?
Why should domain clients use the domain controller as DNS?
What can break if DNS is configured incorrectly?
```

## Precheck - Check Time and Timezone

Kerberos authentication is sensitive to time differences. In a domain, large time differences between clients and domain controllers can cause logon failures even when the username and password are correct.

On `DC01`:

1. Open Server Manager.
2. Select Local Server.
3. Check Time zone.
4. Correct the time zone if it is wrong.
5. Confirm the date and time are reasonable for the lab.

Verify:

```powershell
Get-Date
w32tm /query /status
```

Save evidence:

```powershell
Get-Date | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\server-date-time.txt
w32tm /query /status | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\server-time-status.txt
```

Beginner note: In a real enterprise, domain time is planned carefully. Workstations usually synchronize with the domain hierarchy, and the domain controller holding the PDC Emulator role is commonly configured with a reliable time source.

## Step 5 - Install AD DS and DNS Using Server Manager

Active Directory Domain Services provides the identity database. DNS allows domain clients to locate the domain controller.

On `DC01`:

1. Open Server Manager.
2. Click Manage.
3. Click Add Roles and Features.
4. Select Role-based or feature-based installation.
5. Select the local server.
6. Tick Active Directory Domain Services.
7. Click Add Features when prompted.
8. Tick DNS Server.
9. Click Add Features when prompted.
10. Continue through the wizard.
11. Click Install.
12. Wait for installation to complete.

Do not close Server Manager until the installation completes.

Verify role installation:

```powershell
Get-WindowsFeature AD-Domain-Services,DNS
```

Save evidence:

```powershell
Get-WindowsFeature AD-Domain-Services,DNS | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\installed-windows-features.txt
```

Expected result: AD Domain Services and DNS Server show as installed.

## Step 6 - Promote the Server to a Domain Controller

Installing the AD DS role is not enough. The server becomes a domain controller only after promotion.

On `DC01`:

1. In Server Manager, click the notification flag in the top-right corner.
2. Click Promote this server to a domain controller.
3. Select Add a new forest.
4. Enter Root domain name: `femtech.lab`.
5. Click Next.
6. Leave Forest functional level and Domain functional level at the default selected by Windows Server.
7. Confirm Domain Name System (DNS) server is selected.
8. Enter a Directory Services Restore Mode password provided by the instructor.
9. Click Next.
10. If a DNS delegation warning appears, read it and continue. This is normal in a small isolated lab.
11. Confirm NetBIOS domain name is `FEMTECH`.
12. Leave default database, log, and SYSVOL paths.
13. Review the configuration.
14. Allow the prerequisite check to complete.
15. Click Install.
16. The server will restart automatically.

Important terms:

| Term | Meaning |
|---|---|
| Forest | The highest AD logical boundary |
| Domain | Administrative identity boundary inside the forest |
| DSRM password | Recovery password used for directory restore scenarios |
| SYSVOL | Shared AD folder used for domain policies and scripts |
| NetBIOS name | Short legacy domain name, such as `FEMTECH` |

After restart, sign in as:

```text
FEMTECH\Administrator
```

## Step 7 - Validate Domain Controller Health

Validation confirms that AD DS, DNS, Kerberos, and related services are running.

Open Server Manager and check:

1. Dashboard shows AD DS and DNS.
2. AD DS does not show critical errors.
3. DNS does not show critical errors.
4. Local Server shows the computer name as `DC01`.

Open PowerShell as Administrator and run:

```powershell
Get-ADDomain
Get-ADForest
Get-Service DNS,NTDS,KDC
dcdiag
```

Save evidence:

```powershell
Get-ADDomain | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\ad-domain.txt
Get-ADForest | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\ad-forest.txt
Get-Service DNS,NTDS,KDC | Format-Table Name,Status,StartType | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\ad-services.txt
dcdiag | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\dcdiag.txt
```

Expected signs of success:

| Check | Expected result |
|---|---|
| Domain name | `femtech.lab` |
| Forest name | `femtech.lab` |
| DNS service | Running |
| NTDS service | Running |
| KDC service | Running |
| `dcdiag` | No major failures for the lab domain controller |

If `dcdiag` shows warnings, read them carefully. Some warnings may be normal in a one-domain-controller lab, but DNS, Kerberos, and replication-related errors must be understood.

## Step 8 - Explore Active Directory Users and Computers

Open Active Directory Users and Computers:

1. Open Server Manager.
2. Click Tools.
3. Click Active Directory Users and Computers.
4. Expand `femtech.lab`.

Observe the default containers:

| Container | What it commonly contains |
|---|---|
| Builtin | Built-in local domain groups |
| Computers | Domain-joined computers by default |
| Domain Controllers | Domain controller computer accounts |
| Users | Default users and groups |

Professional note: Avoid placing all users and computers in default containers. Create OUs that match administration, security policy, and delegation needs.

## Step 9 - Create Organizational Units Manually

In Active Directory Users and Computers:

1. Right-click `femtech.lab`.
2. Select New.
3. Select Organizational Unit.
4. Create `FEMTECH Users`.
5. Repeat the process for:

| OU name | Purpose |
|---|---|
| `FEMTECH Users` | Normal user accounts |
| `FEMTECH Groups` | Security groups |
| `FEMTECH Workstations` | Domain client computers |
| `FEMTECH Servers` | Member servers |

Leave Protect container from accidental deletion selected.

Verify:

```powershell
Get-ADOrganizationalUnit -Filter * | Select-Object Name,DistinguishedName
```

Save evidence:

```powershell
Get-ADOrganizationalUnit -Filter * |
Select-Object Name,DistinguishedName |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\ous.txt
```

Student explanation:

```text
Why are OUs better than placing every user in the default Users container?
Which OU should receive workstation security policies?
Which OU should store security groups?
```

## Step 10 - Create Security Groups Manually

This lab uses a simple version of the AGDLP model:

```text
Accounts -> Global Groups -> Domain Local Groups -> Permissions
```

Meaning:

| Layer | Example | Purpose |
|---|---|---|
| Account | `aokoro` | Represents one user |
| Global group | `GG_HR_Staff` | Groups users by role or department |
| Domain local group | `DL_HR_Read` | Receives permission to a resource |
| Permission | Read access to HR share | Controls what the group can do |

In Active Directory Users and Computers:

1. Open the `FEMTECH Groups` OU.
2. Right-click inside the OU.
3. Select New.
4. Select Group.
5. Create the following groups:

| Group name | Group scope | Group type | Purpose |
|---|---|---|---|
| `GG_HR_Staff` | Global | Security | Holds HR staff user accounts |
| `GG_IT_Helpdesk` | Global | Security | Holds IT support user accounts |
| `DL_HR_Read` | Domain local | Security | Receives read permission to the HR shared folder |

To add `GG_HR_Staff` into `DL_HR_Read`:

1. Double-click `DL_HR_Read`.
2. Open the Members tab.
3. Click Add.
4. Type `GG_HR_Staff`.
5. Click Check Names.
6. Click OK.

Verify:

```powershell
Get-ADGroup -Filter * | Select-Object Name,GroupScope,GroupCategory
Get-ADGroupMember DL_HR_Read
```

Save evidence:

```powershell
Get-ADGroup -Filter * |
Select-Object Name,GroupScope,GroupCategory |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\groups.txt

Get-ADGroupMember DL_HR_Read |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\dl-hr-read-members.txt
```

## Step 11 - Create Domain Users Manually

In Active Directory Users and Computers:

1. Open the `FEMTECH Users` OU.
2. Right-click inside the OU.
3. Select New.
4. Select User.
5. Create the users below.

| Full name | User logon name | Department role |
|---|---|---|
| Ada Okoro | `aokoro` | HR staff |
| Tunde Bello | `tbello` | General staff |

For each user:

1. Enter the first name, last name, and logon name.
2. Set a temporary classroom password.
3. Select User must change password at next logon.
4. Finish the wizard.

Do not save the temporary password in the report.

Add Ada to the HR group:

1. Double-click `Ada Okoro`.
2. Open the Member Of tab.
3. Click Add.
4. Type `GG_HR_Staff`.
5. Click Check Names.
6. Click OK.

Leave Tunde outside the HR group. He will be used for a denied access test.

Verify:

```powershell
Get-ADUser -Filter * | Select-Object Name,SamAccountName,Enabled
Get-ADGroupMember GG_HR_Staff
```

Save evidence:

```powershell
Get-ADUser -Filter * |
Select-Object Name,SamAccountName,Enabled |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\users.txt

Get-ADGroupMember GG_HR_Staff |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\gg-hr-staff-members.txt
```

## Step 12 - Create the HR Shared Folder

This section teaches the difference between share permissions and NTFS permissions.

| Permission layer | Where configured | What it controls |
|---|---|---|
| Share permission | Sharing tab | Access over the network |
| NTFS permission | Security tab | Access to files and folders on disk |

For network access to work, the user must pass both permission layers.

On `DC01`:

1. Open File Explorer.
2. Open Local Disk `C:`.
3. Create a folder named `Shares`.
4. Inside `Shares`, create a folder named `HR`.
5. Right-click the `HR` folder.
6. Select Properties.
7. Open the Sharing tab.
8. Click Advanced Sharing.
9. Tick Share this folder.
10. Set Share name to `HR`.
11. Click Permissions.
12. Remove `Everyone` if it is listed.
13. Click Add.
14. Type `FEMTECH\DL_HR_Read`.
15. Click Check Names.
16. Click OK.
17. Give `FEMTECH\DL_HR_Read` Read permission only.
18. Click OK.

Now configure NTFS permissions:

1. Open the Security tab.
2. Click Advanced.
3. Click Disable inheritance.
4. Choose Convert inherited permissions into explicit permissions on this object.
5. Review the permission entries.
6. Keep `SYSTEM` with Full control.
7. Keep `Administrators` with Full control.
8. Remove broad entries such as `Users`, `Authenticated Users`, or `Everyone` if they allow normal users to read the folder.
9. Click Add.
10. Click Select a principal.
11. Type `FEMTECH\DL_HR_Read`.
12. Click Check Names.
13. Click OK.
14. Grant Read and execute, List folder contents, and Read.
15. Click OK until all permission windows are closed.

Correct permission design:

| Principal | Permission | Reason |
|---|---|---|
| `SYSTEM` | Full control | Windows operating system access |
| `Administrators` | Full control | Administrative management |
| `FEMTECH\DL_HR_Read` | Read and execute, List folder contents, Read | HR staff read access through group membership |

Avoid leaving `Everyone`, `Users`, or `Domain Users` with read access on this lab folder. If those broad entries remain, Tunde may be able to read the folder even though he is not in the HR group.

Create a small test file:

1. Open `C:\Shares\HR`.
2. Create a text file named `hr-notice.txt`.
3. Add this content:

```text
FEMTECH HR training file. Synthetic data only.
```

Verify:

```powershell
Get-SmbShare HR
icacls C:\Shares\HR
```

Save evidence:

```powershell
Get-SmbShare HR | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\hr-share.txt
icacls C:\Shares\HR | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\hr-ntfs-permissions.txt
```

Security lesson: Assign permissions to groups, not directly to users. When Ada changes department, administrators can remove her from `GG_HR_Staff` instead of searching every folder where her account was directly assigned.

## Step 13 - Prepare the Windows Client for Domain Join

On the Windows client:

1. Confirm it is connected to the same lab network as `DC01`.
2. Configure its IPv4 settings.
3. Use an IP address in the same subnet, such as `10.10.20.50`.
4. Set Default gateway to `10.10.20.1`.
5. Set Preferred DNS server to `10.10.20.10`.

Verify from the client:

```powershell
ipconfig /all
ping 10.10.20.10
nslookup femtech.lab
```

Expected result:

| Test | Expected result |
|---|---|
| `ping 10.10.20.10` | Reply from the domain controller, if firewall permits ICMP |
| `nslookup femtech.lab` | DNS answer from `10.10.20.10` |
| DNS server in `ipconfig /all` | `10.10.20.10` |

If ping fails but DNS works, continue if the instructor confirms ICMP is blocked by firewall policy. If DNS fails, fix DNS before joining the domain.

## Step 14 - Join the Windows Client to the Domain Manually

On the Windows client:

1. Open Settings.
2. Go to System.
3. Open About.
4. Click Domain or workgroup.
5. Click Change.
6. Select Domain.
7. Enter `femtech.lab`.
8. Click OK.
9. When prompted, enter domain administrator credentials.
10. Wait for the welcome message.
11. Restart the client.

After restart, sign in as:

```text
FEMTECH\aokoro
```

If Windows says the password must be changed before signing in:

1. Enter the temporary classroom password.
2. Create a new classroom-approved password.
3. Confirm the new password.
4. Do not record the password in the report.
5. Sign in again if prompted.

If the sign-in screen shows only the local computer name, choose Other user and type the full domain format:

```text
FEMTECH\aokoro
```

Verify from the client:

```powershell
whoami
nltest /dsgetdc:femtech.lab
gpresult /r
```

Save evidence on the client if possible:

```powershell
New-Item -ItemType Directory -Force -Path C:\FEMTECH-Evidence\Tool-Lab-04
whoami | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\client-whoami.txt
nltest /dsgetdc:femtech.lab | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\client-domain-controller.txt
gpresult /r | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\client-gpresult-before-gpo.txt
```

## Step 15 - Test Group-Based Access

On the Windows client, while signed in as `FEMTECH\aokoro`:

1. Open File Explorer.
2. In the address bar, enter:

```text
\\DC01\HR
```

3. Confirm the folder opens.
4. Open `hr-notice.txt`.
5. Record the result in your report.

Now test denied access:

1. Sign out.
2. Sign in as `FEMTECH\tbello`.
3. Open File Explorer.
4. Enter:

```text
\\DC01\HR
```

5. Record whether access is denied.

Testing table:

| Test | User | Expected result | Actual result | Evidence |
|---|---|---|---|---|
| HR share read | `FEMTECH\aokoro` | Allowed | | Screenshot or note |
| HR share read | `FEMTECH\tbello` | Denied | | Screenshot or note |
| Domain login | `FEMTECH\aokoro` | Allowed | | `whoami` output |
| Domain login | `FEMTECH\tbello` | Allowed | | `whoami` output |

If Tunde can access the folder, check:

- Is `tbello` accidentally in `GG_HR_Staff`?
- Is `Domain Users` granted access on the share?
- Is `Everyone` granted access on the share or NTFS permissions?
- Did you test using a fresh logon session after group changes?

## Step 16 - Create a Basic Workstation Security GPO

Group Policy helps administrators enforce consistent security settings across many computers.

First move the client computer account:

1. On `DC01`, open Active Directory Users and Computers.
2. Open the Computers container.
3. Find the Windows client computer account.
4. Right-click it.
5. Select Move.
6. Move it to `FEMTECH Workstations`.

Now create the GPO:

1. On `DC01`, open Server Manager.
2. Click Tools.
3. Click Group Policy Management.
4. Expand Forest: `femtech.lab`.
5. Expand Domains.
6. Expand `femtech.lab`.
7. Right-click `FEMTECH Workstations`.
8. Select Create a GPO in this domain, and Link it here.
9. Name it `FEMTECH Workstation Security Baseline`.
10. Right-click the new GPO.
11. Click Edit.

Configure one clear security setting:

1. Go to Computer Configuration.
2. Expand Policies.
3. Expand Windows Settings.
4. Expand Security Settings.
5. Expand Local Policies.
6. Click Security Options.
7. Find Interactive logon: Do not display last user name.
8. Set it to Enabled.
9. Close the editor.

This policy reduces information exposure at the sign-in screen. An attacker should not be handed the last valid username.

Apply and verify from the Windows client:

```powershell
gpupdate /force
gpresult /r
```

Save evidence from the client:

```powershell
gpresult /r | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\client-gpresult-after-gpo.txt
```

Read the `gpresult /r` output carefully. Look under Computer Settings and confirm that `FEMTECH Workstation Security Baseline` appears in the list of applied Group Policy Objects.

For a more detailed policy report, run:

```powershell
gpresult /h C:\FEMTECH-Evidence\Tool-Lab-04\client-gpresult-after-gpo.html
```

Expected result:

| Check | Expected result |
|---|---|
| Computer is in `FEMTECH Workstations` OU | Yes |
| `gpupdate /force` completes | Yes |
| `gpresult /r` shows the workstation GPO | Yes |
| HTML policy report is created | Yes |

Save a GPO report from `DC01`:

```powershell
Get-GPOReport -Name "FEMTECH Workstation Security Baseline" -ReportType Html -Path C:\FEMTECH-Evidence\Tool-Lab-04\workstation-security-baseline-gpo.html
```

## Step 17 - Review DNS for Active Directory

On `DC01`:

1. Open Server Manager.
2. Click Tools.
3. Click DNS.
4. Expand `DC01`.
5. Expand Forward Lookup Zones.
6. Open `femtech.lab`.
7. Observe domain DNS records.

Look for records related to:

| Record type | Purpose |
|---|---|
| A record | Maps a hostname to an IP address |
| SRV record | Helps clients find domain services such as LDAP and Kerberos |
| `_msdcs` records | Used by AD for domain controller discovery |

Save evidence:

```powershell
Get-DnsServerZone | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\dns-zones.txt
Resolve-DnsName femtech.lab | Out-File C:\FEMTECH-Evidence\Tool-Lab-04\resolve-domain-name.txt
```

Student explanation:

```text
Why can a client fail to join the domain even when the domain controller is powered on?
What DNS server should the Windows client use in this lab?
What type of DNS records help clients locate domain services?
```

## Step 18 - Generate Security Events

Security logs become useful when students understand what action created the event.

Perform these actions:

| Action | Where | Expected event type |
|---|---|---|
| Successful domain logon as Ada | Windows client | Successful logon |
| Failed logon with wrong password | Windows client | Failed logon |
| Create a test user | Domain controller | Account creation |
| Add a user to a group | Domain controller | Group membership change |
| Access HR share as Ada | Windows client | File/share access activity if auditing is configured |
| Attempt HR share access as Tunde | Windows client | Access denied behavior |

Where to look:

| Evidence source | Events commonly found there |
|---|---|
| Windows client Security log | Interactive logon success, interactive logon failure, local policy processing |
| Domain controller Security log | Domain account creation, domain group membership changes, Kerberos authentication activity |
| File server Security log | File/share access events when object access auditing is configured |

Important Windows Security event IDs:

| Event ID | Meaning | Why analysts care |
|---:|---|---|
| 4624 | Successful logon | Confirms who accessed a system |
| 4625 | Failed logon | Helps detect password guessing or user error |
| 4768 | Kerberos authentication ticket requested | Helps investigate domain authentication activity |
| 4769 | Kerberos service ticket requested | Helps investigate access to domain services |
| 4771 | Kerberos pre-authentication failed | Helps detect failed domain authentication attempts |
| 4720 | User account created | Helps detect unauthorized account creation |
| 4726 | User account deleted | Helps detect suspicious account removal |
| 4728 | Member added to a global group | Helps detect privilege or access changes |
| 4732 | Member added to a local group | Helps detect local privilege changes |
| 4738 | User account changed | Helps track account modifications |
| 4740 | User account locked out | Helps detect brute force or repeated failures |

Create a temporary test user manually:

1. Open Active Directory Users and Computers.
2. Open `FEMTECH Users`.
3. Create a user named `Test Event`.
4. Use logon name `tevent`.
5. Set a temporary password.
6. Add `tevent` to `GG_IT_Helpdesk`.
7. Do not use this account for real work.

Review logs:

1. On `DC01`, open Server Manager.
2. Click Tools.
3. Click Event Viewer.
4. Expand Windows Logs.
5. Click Security.
6. Use Filter Current Log.
7. Search for event IDs `4624`, `4625`, `4720`, `4728`, `4732`, `4738`, and `4740`.

Save recent security events:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4768,4769,4771,4720,4728,4732,4738,4740; StartTime=(Get-Date).AddHours(-4)} |
Select-Object TimeCreated,Id,ProviderName,Message |
Format-List |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\security-events-selected.txt
```

If a failed password attempt does not appear as `4625` on the domain controller, check the Windows client Security log and then check the domain controller for Kerberos failure events such as `4771`. This is normal because Windows logs different parts of authentication on different systems.

Export the Security log:

```powershell
wevtutil epl Security C:\FEMTECH-Evidence\Tool-Lab-04\Security-Lab04.evtx /ow:true
```

Hash the exported log:

```powershell
Get-FileHash C:\FEMTECH-Evidence\Tool-Lab-04\Security-Lab04.evtx -Algorithm SHA256 |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\Security-Lab04.evtx.sha256.txt
```

## Step 19 - Troubleshoot Common Problems

| Problem | Likely cause | How to check | Fix |
|---|---|---|---|
| Client cannot join domain | Client DNS is wrong | `ipconfig /all` | Set DNS to `10.10.20.10` |
| Domain controller cannot be found | DNS records missing or wrong DNS server | `nslookup femtech.lab` | Confirm DNS role and client DNS settings |
| User cannot access HR share | Missing group membership or permission issue | ADUC group membership, `icacls C:\Shares\HR` | Add user to correct group and confirm ACLs |
| Tunde can access HR share | Broad permissions still exist | Check share and NTFS permissions | Remove unnecessary `Everyone` or `Domain Users` access |
| GPO does not apply | Computer account is in wrong OU | ADUC and `gpresult /r` | Move computer to `FEMTECH Workstations` and run `gpupdate /force` |
| Login fails after password change | User typed wrong domain or password | `whoami`, sign-in screen domain | Use `FEMTECH\username` format |
| Correct password fails during domain logon | Time difference is too large | `Get-Date`, `w32tm /query /status` | Correct time and timezone, then retry |
| Events are missing | Wrong system or wrong time window | Event Viewer filter | Check both client and DC, increase time range |
| `dcdiag` shows DNS issues | DNS role or records are not healthy | DNS Manager and `dcdiag` | Restart DNS service and review zone records |

## Step 20 - Final Evidence Hashes

At the end of the lab, run on `DC01`:

```powershell
Get-ChildItem C:\FEMTECH-Evidence\Tool-Lab-04 -File -Recurse |
Get-FileHash -Algorithm SHA256 |
Format-Table Hash,Path -AutoSize |
Out-File C:\FEMTECH-Evidence\Tool-Lab-04\hashes.sha256.txt

Stop-Transcript
```

The hash file proves that exported evidence can be checked later for integrity.

## Student Lab Report Template

```text
Title: Tool Lab 04 - Windows Server and Active Directory

Student name:
Date:
Instructor:

1. Scope
Systems used:
Domain name:
Activities performed:

2. Server Configuration
Hostname:
Static IP:
DNS setting:
Gateway:

3. Active Directory Installation
Installed roles:
Domain:
Forest:
Evidence files:

4. AD Structure
OUs created:
Groups created:
Users created:
Reason for using groups instead of direct user permissions:

5. Shared Folder Access Control
Share name:
NTFS permissions:
Authorized user test result:
Unauthorized user test result:

6. Domain Join
Client hostname:
Client DNS:
Domain join result:
Domain controller discovered:

7. Group Policy
GPO name:
Linked OU:
Security setting configured:
Client result:

8. Security Logs
Event IDs found:
What actions generated them:
Most important security observation:

9. Troubleshooting
Problem encountered:
Root cause:
Fix:
Lesson learned:

10. Management Summary
Write 5 to 8 sentences explaining what was built, what worked, what risk was reduced, and what should be improved next.
```

## Deliverables

Submit:

- `hostname.txt`
- `ipconfig-dc01.txt`
- `net-ip-configuration-dc01.txt`
- `server-date-time.txt`
- `server-time-status.txt`
- `installed-windows-features.txt`
- `ad-domain.txt`
- `ad-forest.txt`
- `ad-services.txt`
- `dcdiag.txt`
- `ous.txt`
- `groups.txt`
- `users.txt`
- `gg-hr-staff-members.txt`
- `dl-hr-read-members.txt`
- `hr-share.txt`
- `hr-ntfs-permissions.txt`
- `client-whoami.txt`
- `client-domain-controller.txt`
- `client-gpresult-after-gpo.txt`
- `client-gpresult-after-gpo.html`
- `workstation-security-baseline-gpo.html`
- `dns-zones.txt`
- `resolve-domain-name.txt`
- `security-events-selected.txt`
- `Security-Lab04.evtx`
- `Security-Lab04.evtx.sha256.txt`
- `hashes.sha256.txt`
- Completed lab report

## Knowledge Check

Answer these before submitting the lab:

1. What is the purpose of a domain controller?
2. Why does Active Directory need DNS?
3. What is the difference between a local user and a domain user?
4. What is the difference between authentication and authorization?
5. Why should permissions be assigned to groups instead of directly to users?
6. What is an OU used for?
7. What is a GPO used for?
8. What is the difference between share permissions and NTFS permissions?
9. Why should the domain controller use a static IP address?
10. What event ID shows a failed Windows logon?
11. What event ID shows a successful Windows logon?
12. What event ID may show that a user account was created?
13. Why is `FEMTECH\tbello` expected to be denied access to the HR share?
14. What command can show the domain controller discovered by a client?
15. What command can show whether Group Policy applied to a client?
16. Why should a student not place all accounts in default AD containers?
17. What is the risk of leaving `Everyone` with broad permissions?
18. Why should exported logs be hashed?
19. What should you check first when a client cannot join the domain?
20. How does this lab connect to real SOC or security administrator work?

## Pass Condition

The student passes this lab when:

- `DC01` is renamed and configured with a static IP address.
- `femtech.lab` is successfully created.
- AD DS, DNS, NTDS, and KDC services are running.
- OUs, users, and groups are created correctly.
- `aokoro` receives HR access through group membership.
- `tbello` is denied HR access.
- The Windows client is joined to the domain.
- A workstation GPO is linked and visible from the client.
- Relevant Windows Security events are found and explained.
- Evidence files are collected and hashed.
- The final report explains both the technical actions and the security purpose.

## Entry-Level Job Readiness Check

The student is ready to continue when they can:

| Skill | Student can demonstrate |
|---|---|
| Windows Server administration | Rename a server, set static IP addressing, and verify services |
| Active Directory basics | Explain domains, forests, domain controllers, OUs, users, groups, and DNS dependency |
| Identity operations | Create users and groups manually and use group-based access control |
| Access control | Prove one authorized access test and one denied access test |
| Group Policy | Link a basic workstation GPO and prove it applied with `gpresult` |
| Windows logging | Find and explain important Security event IDs such as `4624`, `4625`, `4720`, and Kerberos events |
| Troubleshooting | Diagnose DNS, time, group membership, permission, and GPO problems |
| Professional reporting | Produce evidence and explain the business value of centralized identity |
