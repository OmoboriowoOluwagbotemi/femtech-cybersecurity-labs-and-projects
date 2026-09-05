# Project 04 Solution - Windows Server, Active Directory, and Identity

## Target Outcome

The student builds a small Active Directory domain for Northwind Legal Services using Windows graphical administration tools. The student creates OUs, groups, users, share permissions, NTFS permissions, a basic GPO, and Windows security evidence without using PowerShell commands for the Active Directory build.

## Reference Environment

| Component | Example |
|---|---|
| Domain controller | Windows Server, `DC01` |
| Domain | `northwind.lab` |
| Server IP | `10.10.20.10` |
| Client | Windows 10 or Windows 11 |
| Evidence folder | `C:\Northwind-Evidence\Project-04` |
| Main tools | Server Manager, ADUC, DNS Manager, Group Policy Management, File Explorer, Event Viewer |

Use synthetic names only. Do not use real employee data, real client files, or real legal documents.

## Step 1 - Prepare the Evidence Folder Manually

On the Windows Server:

1. Open File Explorer.
2. Open `Local Disk (C:)`.
3. Create a folder named `Northwind-Evidence`.
4. Inside it, create a folder named `Project-04`.
5. Inside `Project-04`, create folders named `01-server-build`, `02-domain`, `03-identity`, `04-access-control`, `05-workstation`, `06-gpo`, `07-events`, and `08-report`.

Evidence to save:

| Evidence | How to capture |
|---|---|
| Server name | Screenshot of Server Manager Local Server page |
| IP address and DNS | Screenshot of Ethernet IPv4 properties |
| Date and time | Screenshot of Windows date/time settings |
| Evidence folders | Screenshot of File Explorer showing folder structure |

Expected student explanation: evidence must be organized before configuration begins so another administrator can review what was done.

## Step 2 - Rename the Server with GUI

1. Open Server Manager.
2. Select `Local Server`.
3. Click the current computer name.
4. In `System Properties`, select `Change`.
5. Enter computer name `DC01`.
6. Restart when prompted.
7. After restart, open Server Manager again and confirm the computer name shows `DC01`.
8. Save a screenshot in `01-server-build`.

## Step 3 - Configure Static IP and DNS with GUI

1. Open Server Manager.
2. Select `Local Server`.
3. Click the Ethernet adapter link.
4. Open adapter properties.
5. Select `Internet Protocol Version 4 (TCP/IPv4)`.
6. Configure the approved static IP, subnet mask, gateway, and DNS.

Recommended lab values:

| Setting | Example |
|---|---|
| IP address | `10.10.20.10` |
| Subnet mask | `255.255.255.0` |
| Default gateway | pfSense gateway for the server subnet |
| Preferred DNS before promotion | Temporary approved DNS or self after DNS role is available |
| Preferred DNS after promotion | `10.10.20.10` |

Evidence:

- Screenshot of IPv4 settings.
- Screenshot of Server Manager showing network information.

Teaching point: Active Directory depends on DNS. Domain clients must be able to find domain controllers, Kerberos services, and LDAP services through DNS records.

## Step 4 - Install AD DS and DNS with Server Manager

1. Open Server Manager.
2. Select `Manage`.
3. Select `Add Roles and Features`.
4. Choose `Role-based or feature-based installation`.
5. Select the local server.
6. Choose `Active Directory Domain Services`.
7. Accept required management tools when prompted.
8. Choose `DNS Server`.
9. Continue through the wizard.
10. Select `Install`.
11. Wait for installation to finish.

Evidence:

- Screenshot showing AD DS and DNS selected.
- Screenshot of successful role installation.

## Step 5 - Promote the Server to a Domain Controller with GUI

1. In Server Manager, click the notification flag.
2. Select `Promote this server to a domain controller`.
3. Choose `Add a new forest`.
4. Enter root domain name `northwind.lab`.
5. Set the forest and domain functional levels available in the lab.
6. Keep `Domain Name System (DNS) server` selected.
7. Enter the Directory Services Restore Mode password. Do not record the password in evidence.
8. Continue through the DNS delegation warning if this is an isolated lab.
9. Review the NetBIOS name `NORTHWIND`.
10. Accept default database, log, and SYSVOL paths unless the instructor says otherwise.
11. Review prerequisites.
12. Select `Install`.
13. Allow the server to restart.

After restart:

1. Sign in with the domain administrator account.
2. Open Server Manager.
3. Confirm AD DS and DNS appear as installed roles.
4. Open `Tools > Active Directory Users and Computers`.
5. Confirm the domain `northwind.lab` appears.
6. Open `Tools > DNS`.
7. Confirm the forward lookup zone for `northwind.lab` exists.

Evidence:

- Screenshot of ADUC showing `northwind.lab`.
- Screenshot of DNS Manager showing the `northwind.lab` zone.
- Screenshot of Server Manager role dashboard.

## Step 6 - Create OUs Manually in ADUC

Open `Server Manager > Tools > Active Directory Users and Computers`.

Create these OUs under `northwind.lab`:

| OU name | Purpose |
|---|---|
| `Northwind Users` | Active employee user accounts |
| `Northwind Groups` | Security groups |
| `Northwind Workstations` | Domain client computers |
| `Northwind Servers` | Member servers if used |
| `Northwind Disabled` | Disabled former employee accounts |

Manual steps for each OU:

1. Right-click `northwind.lab`.
2. Select `New > Organizational Unit`.
3. Enter the OU name.
4. Leave protection from accidental deletion enabled if available.
5. Select `OK`.

Evidence:

- Screenshot of ADUC showing all required OUs.
- Short written explanation that OUs organize administration and Group Policy, while groups control access.

## Step 7 - Create Groups Manually in ADUC

Open the `Northwind Groups` OU.

Create global security groups:

| Group | Purpose |
|---|---|
| `GG_Attorneys` | Attorney job role |
| `GG_Legal_Assistants` | Legal assistant job role |
| `GG_HR_Staff` | HR job role |
| `GG_IT_Helpdesk` | IT helpdesk job role |

Create domain local security groups:

| Group | Purpose |
|---|---|
| `DL_Cases_Read` | Read access to legal case share |
| `DL_Cases_Modify` | Modify access to legal case share |
| `DL_HR_Read` | Read access to HR content if created |

Manual steps for each group:

1. Right-click `Northwind Groups`.
2. Select `New > Group`.
3. Enter the group name exactly.
4. Choose the correct group scope: `Global` or `Domain local`.
5. Choose `Security`.
6. Select `OK`.

Add role groups into resource groups:

1. Open `DL_Cases_Modify`.
2. Select the `Members` tab.
3. Add `GG_Attorneys`.
4. Open `DL_Cases_Read`.
5. Select the `Members` tab.
6. Add `GG_Legal_Assistants`.

Evidence:

- Screenshot of group list in `Northwind Groups`.
- Screenshot of `DL_Cases_Modify` membership.
- Screenshot of `DL_Cases_Read` membership.

Teaching point: users go into role groups, role groups go into resource groups, and resource groups receive permissions. This keeps access easier to review.

## Step 8 - Create Synthetic Users Manually in ADUC

Open the `Northwind Users` OU.

Create active users:

| User | Username | Group membership |
|---|---|---|
| Laura Legal | `laura.legal` | `GG_Legal_Assistants` |
| Ade Attorney | `ade.attorney` | `GG_Attorneys` |
| Hana HR | `hana.hr` | `GG_HR_Staff` |
| Isaac IT | `isaac.it` | `GG_IT_Helpdesk` |

Create disabled user:

| User | Username | Location |
|---|---|---|
| Former User | `former.user` | `Northwind Disabled` |

Manual steps for each active user:

1. Right-click `Northwind Users`.
2. Select `New > User`.
3. Enter first name, last name, and user logon name.
4. Set a temporary lab password.
5. Select `User must change password at next logon` if interactive login testing is required.
6. Finish the wizard.
7. Open the user's properties.
8. Use the `Member Of` tab to add the correct global group.

Manual steps for the disabled user:

1. Create `former.user`.
2. Right-click the account.
3. Select `Disable Account`.
4. Move the account into `Northwind Disabled`.

Evidence:

- Screenshot of active users in `Northwind Users`.
- Screenshot of `former.user` disabled in `Northwind Disabled`.
- Screenshot of one user's `Member Of` tab.

Do not record passwords in screenshots or reports.

## Step 9 - Create the Shared Folder with File Explorer

On the server:

1. Open File Explorer.
2. Create `C:\Shares`.
3. Create `C:\Shares\Cases`.
4. Inside `Cases`, create a text file named `case-summary.txt`.
5. Add synthetic content only, such as `Synthetic legal case file for lab testing only`.

## Step 10 - Configure Share Permissions Manually

1. Right-click `C:\Shares\Cases`.
2. Select `Properties`.
3. Open the `Sharing` tab.
4. Select `Advanced Sharing`.
5. Enable `Share this folder`.
6. Set share name to `Cases`.
7. Open `Permissions`.
8. Remove broad access if present and approved by the instructor.
9. Add `NORTHWIND\DL_Cases_Read` with read permission.
10. Add `NORTHWIND\DL_Cases_Modify` with change permission.
11. Keep administrators with appropriate administrative control.

Evidence:

- Screenshot of share name.
- Screenshot of share permissions.

## Step 11 - Configure NTFS Permissions Manually

1. Right-click `C:\Shares\Cases`.
2. Select `Properties`.
3. Open the `Security` tab.
4. Select `Advanced`.
5. Disable inheritance if required by the lab.
6. Remove broad groups such as `Everyone` or `Domain Users` if they give inappropriate access.
7. Add `DL_Cases_Read` with read/execute permissions.
8. Add `DL_Cases_Modify` with modify permissions.
9. Keep `Administrators` or `Domain Admins` with full control.
10. Apply changes.

Evidence:

- Screenshot of the Security tab.
- Screenshot of Advanced Security Settings.
- Written explanation of share permissions versus NTFS permissions.

Teaching point: the effective access is controlled by the most restrictive combination of share permissions and NTFS permissions.

## Step 12 - Join the Client to the Domain with GUI

On the Windows client:

1. Configure the client DNS server to point to `10.10.20.10`.
2. Open `Settings > System > About`.
3. Select `Domain or workgroup`.
4. Select `Change`.
5. Choose `Domain`.
6. Enter `northwind.lab`.
7. Enter approved domain administrator credentials when prompted.
8. Restart the client.

After restart:

1. Sign in as `NORTHWIND\laura.legal`.
2. Confirm the account signs in successfully.
3. Sign out.
4. Attempt sign-in as `NORTHWIND\former.user`.
5. Confirm the disabled account cannot sign in.

Evidence:

- Screenshot of domain membership.
- Screenshot or written record of successful domain login.
- Screenshot or written record that disabled user login failed.

## Step 13 - Test Share Access Manually

From the Windows client:

1. Sign in as `laura.legal`.
2. Open File Explorer.
3. Browse to `\\DC01\Cases`.
4. Open `case-summary.txt`.
5. Attempt to create or modify a test file.
6. Record whether read and write worked.
7. Repeat the test as `ade.attorney`.
8. Repeat the test as `hana.hr`.

Expected results:

| User | Expected result |
|---|---|
| `laura.legal` | Can read case files; cannot modify restricted files unless granted modify access |
| `ade.attorney` | Can read and modify case files |
| `hana.hr` | Cannot access legal case files |
| `former.user` | Cannot sign in |

Evidence:

- Screenshot of allowed read.
- Screenshot of allowed modify by attorney.
- Screenshot of denied access by unauthorized user.

## Step 14 - Create and Apply a GPO with Group Policy Management

Open `Server Manager > Tools > Group Policy Management`.

1. Expand the forest and domain.
2. Right-click `Northwind Workstations`.
3. Select `Create a GPO in this domain, and Link it here`.
4. Name it `Northwind Workstation Baseline`.
5. Right-click the GPO and select `Edit`.
6. Browse to `Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options`.
7. Enable `Interactive logon: Do not display last user name`.
8. Close the editor.
9. In ADUC, move the client computer object into `Northwind Workstations`.
10. Restart the client or wait for policy refresh.

Validate through GUI:

1. Open Group Policy Management.
2. Use the `Group Policy Results` wizard.
3. Select the client and user.
4. Confirm `Northwind Workstation Baseline` appears in applied GPOs.

Evidence:

- Screenshot of linked GPO.
- Screenshot of configured setting.
- Screenshot of Group Policy Results showing the GPO applied.

## Step 15 - Review Security Events with Event Viewer

Generate events:

1. Successful domain sign-in.
2. Failed domain sign-in.
3. User creation.
4. Group membership change.
5. Disabled account sign-in attempt.

Open Event Viewer:

1. Open `Server Manager > Tools > Event Viewer`.
2. Browse to `Windows Logs > Security`.
3. Use `Filter Current Log`.
4. Filter for relevant event IDs.
5. Open each event and read the details.

Important event IDs:

| Event ID | Meaning |
|---:|---|
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

Evidence:

- Screenshot of filtered Security log.
- Screenshot of at least one successful logon event.
- Screenshot of at least one failed logon event.
- Screenshot of at least one account or group change event.
- Exported EVTX file using Event Viewer `Save All Events As`.

## Step 16 - Write the Solution Report

The report must include:

- Business problem.
- Domain name, hostnames, and IP addressing.
- OU design.
- Group design.
- User and group membership table.
- Share permission explanation.
- NTFS permission explanation.
- Positive and negative access tests.
- GPO setting and proof.
- Security event IDs and what each event means.
- Security weaknesses still present.
- Recommendations for MFA, privileged access management, backups, monitoring, and patching.

## Pass Standard

The project is complete when the student can prove the domain works, DNS works, users authenticate, disabled users are denied, folder access follows group membership, GPO applies to the client, and Windows Event Viewer evidence supports the story.
