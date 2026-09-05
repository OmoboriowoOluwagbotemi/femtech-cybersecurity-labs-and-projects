# Project 04 - Build Identity and Access for a Growing Company

## Portfolio Problem

A growing company needs centralized identity, group-based access control, workstation policy, and auditable Windows security events.

## Validates

Tool Lab 04 - Windows Server and Active Directory.

## Business Scenario

Northwind Legal Services has grown from five employees to forty. Users still share local accounts, access to folders is inconsistent, and management cannot prove who accessed sensitive documents. The company wants a small Active Directory environment for centralized control.

## Required Outcomes

- Windows Server is configured as a domain controller.
- DNS works for the domain.
- OUs, users, groups, and workstation objects are organized.
- Access is assigned through groups, not direct user permissions.
- One shared resource has allowed and denied tests.
- One workstation GPO is linked and verified.
- Security events are generated and interpreted.

## Step-by-Step Completion Standard

Complete this project in order. Prepare the server first, then install AD DS and DNS, then validate the domain, then create OUs, then create groups, then create users, then apply permissions, then join a workstation, then apply GPO, then collect events. Do not create users or permissions until the identity design is written down.

## Required Work

1. Prepare written scope and VM requirements.
2. Rename the server and configure static IP.
3. Install AD DS and DNS.
4. Promote the server to a domain controller.
5. Validate AD, DNS, KDC, NTDS, and time.
6. Create OUs for users, groups, workstations, and servers.
7. Create role groups and resource groups.
8. Create two or more synthetic users.
9. Configure a shared folder using share and NTFS permissions.
10. Join a Windows client to the domain.
11. Link a basic workstation GPO and verify with Group Policy Management or Group Policy Results.
12. Collect Event Viewer evidence for logon and account/group changes.

## Minimum Evidence

```text
01-server-ip-dns-time.txt
02-ad-domain-services-proof.txt
03-dns-zone-proof.txt
04-ou-group-user-proof.txt
05-share-and-ntfs-permissions.txt
06-client-domain-join-proof.txt
07-group-policy-results-proof.png
08-security-events-selected.txt
09-evtx-export-hash.txt
technical-report.md
executive-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| Domain user login | Allowed |
| Disabled user login | Denied |
| Authorized group access | Allowed |
| Unauthorized user access | Denied |
| GPO application | Visible in Group Policy Results |
| Security logs | Relevant event IDs are found and explained |

## Oral Defense

1. Why does Active Directory depend on DNS?
2. Why use groups instead of direct user permissions?
3. What is the difference between authentication and authorization?
4. How did you prove the GPO applied?
5. Which event IDs would a SOC analyst care about?

## Recruiter-Visible Portfolio Artifact

Create a sanitized identity administration case study showing AD design, group-based access, denied-access proof, GPO evidence, and Windows log interpretation.

## Expanded Scenario

Northwind Legal Services stores synthetic legal case files, HR records, billing documents, and internal policies. The company cannot continue using shared local accounts because management needs accountability and consistent access control.

Current state:

- Users sign in locally on workstations.
- Several employees know the same local administrator password.
- Sensitive folders use inconsistent permissions.
- Departing staff are removed manually and sometimes late.
- No one can show a reliable log trail for sign-ins, account creation, or group membership changes.

The business problem is centralized identity and accountable access. Students must prove that users, groups, policies, logs, and access tests work together.

## Required Environment

| System | Role | Example address |
|---|---|---:|
| `dc01` | Domain controller and DNS | `10.10.20.10` |
| `win11-legal01` | Domain workstation | `10.10.10.50` |
| `file-share` | Shared folder on `dc01` or member server | `\\dc01\Cases` |
| `kali01` | Optional network validation source | `10.10.10.60` |

## Required Identity Design

| Business role | Example user | Global group | Resource group |
|---|---|---|---|
| Legal assistant | `laura.legal` | `GG_Legal_Assistants` | `DL_Cases_Read` |
| Attorney | `ade.attorney` | `GG_Attorneys` | `DL_Cases_Modify` |
| HR staff | `hana.hr` | `GG_HR_Staff` | `DL_HR_Read` |
| IT helpdesk | `isaac.it` | `GG_IT_Helpdesk` | `DL_Admin_Tools_Access` |
| Former employee | `former.user` | No active access | None |

## Work Packages

| Work package | Required student work | Evidence |
|---|---|---|
| WP01 - Scope | Define domain, users, data, systems, and prohibited actions | Authorization record |
| WP02 - Server build | Configure hostname, static IP, DNS, AD DS, and domain promotion | Server and AD evidence |
| WP03 - AD structure | Create OUs for users, groups, workstations, servers, and disabled accounts | ADUC screenshots |
| WP04 - Access control | Create groups, shared folders, share permissions, and NTFS permissions | ACL and group evidence |
| WP05 - Workstation join | Join client to domain and verify DNS/domain controller discovery | System settings and domain login evidence |
| WP06 - Policy | Apply one security GPO to workstation OU | GPO report and client proof |
| WP07 - Logs | Generate and review security events | Event IDs and EVTX/hash |
| WP08 - Lifecycle | Disable a user and prove access is removed | Before/after tests |

## Required Event IDs

| Event ID | Meaning | Evidence purpose |
|---:|---|---|
| 4624 | Successful logon | Proves authenticated access |
| 4625 | Failed logon | Proves failed authentication can be reviewed |
| 4720 | User account created | Proves account creation is logged |
| 4728 | Member added to global group | Proves group access changes are visible |
| 4738 | User account changed | Proves account modifications are visible |
| 4740 | Account locked out | Useful for brute-force or user-error investigation |
| 4768/4769/4771 | Kerberos activity | Supports domain authentication analysis |

## Mandatory Tests

| Test | Expected result |
|---|---|
| Attorney reads and modifies case file | Allowed |
| Legal assistant reads case file | Allowed |
| Legal assistant modifies restricted case file | Denied unless approved |
| HR user opens legal case file | Denied |
| Former user logs in | Denied |
| Workstation receives GPO | Visible in Group Policy Results |
| Group membership change appears in logs | Event evidence exists |

## Instructor Injects

| Inject | Expected response |
|---|---|
| A former employee can still access a share | Check active sessions, group membership, disabled status, and cached credentials |
| GPO does not apply | Check OU location, security filtering, DNS, time, and Group Policy Results |
| User cannot join domain | Check DNS points to domain controller |
| Sensitive folder allows `Domain Users` | Remove broad access and retest |

## Technical Report Template

```text
1. Executive Summary
2. Scope and Domain Design
3. AD DS and DNS Build Evidence
4. OU, User, and Group Design
5. Access Control Design
6. Domain Join Evidence
7. GPO Evidence
8. Security Event Evidence
9. Lifecycle Test
10. Troubleshooting
11. Residual Risk
12. Recommendations
13. Evidence Index
```
