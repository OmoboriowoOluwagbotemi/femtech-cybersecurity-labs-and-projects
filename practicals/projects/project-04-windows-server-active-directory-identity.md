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
11. Link a basic workstation GPO and verify with `gpresult`.
12. Collect Event Viewer evidence for logon and account/group changes.

## Minimum Evidence

```text
01-server-ip-dns-time.txt
02-ad-domain-services-proof.txt
03-dns-zone-proof.txt
04-ou-group-user-proof.txt
05-share-and-ntfs-permissions.txt
06-client-domain-join-proof.txt
07-gpresult-proof.html
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
| GPO application | Visible in `gpresult` |
| Security logs | Relevant event IDs are found and explained |

## Oral Defense

1. Why does Active Directory depend on DNS?
2. Why use groups instead of direct user permissions?
3. What is the difference between authentication and authorization?
4. How did you prove the GPO applied?
5. Which event IDs would a SOC analyst care about?

## Recruiter-Visible Portfolio Artifact

Create a sanitized identity administration case study showing AD design, group-based access, denied-access proof, GPO evidence, and Windows log interpretation.
