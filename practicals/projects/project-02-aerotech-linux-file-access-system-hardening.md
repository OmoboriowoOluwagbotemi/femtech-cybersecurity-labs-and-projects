# Project 02 - AeroTech Linux File Access and System Hardening

## Portfolio Problem

An aerospace engineering company needs an Ubuntu server hardened for departmental file access. Students must prove Linux identity, groups, permissions, SGID, ACLs, SSH hardening, UFW, audit evidence, backup, recovery, and troubleshooting.

## Validates

Tool Lab 02 - Ubuntu Server Administration and Hardening.

## Business Scenario

AeroTech Aerospace Systems is a fictional aerospace engineering company. It designs aircraft components, coordinates flight operations, conducts quality assurance, develops prototypes, performs maintenance, and operates internal IT services.

An internal review found serious file-access and system-hardening problems:

- Departmental documents are stored inconsistently.
- Some files are readable by unrelated employees.
- New files do not always keep the correct department group.
- Collaboration breaks when users create files with restrictive permissions.
- SSH administration is not clearly controlled.
- The host firewall is not documented.
- Administrators cannot prove that access restrictions still work after staff changes.
- Backups exist, but nobody has proven that permissions and ACLs survive restore.

The exposed information could include aircraft component specifications, flight schedules, inspection reports, prototype notes, maintenance histories, network inventories, and backup records.

Management has commissioned a secure departmental file-access and Linux hardening project on Ubuntu Server. Employees must collaborate within their own departments without being able to browse, read, create, alter, or delete information owned by another department.

## Role

Student role: Junior Linux Security Administrator.

## Duration

Recommended duration: 5 to 6 class days.

## Required Tools

| Tool | Purpose |
|---|---|
| Ubuntu Server | Main project server |
| Bash | Validation scripts and evidence collection |
| SSH | Controlled remote administration |
| UFW | Host firewall |
| Fail2Ban | SSH brute-force protection if installed |
| auditd | File-access and permission-change audit evidence |
| tar or rsync | Backup and recovery test |
| Kali Linux | Approved admin/testing source if remote testing is required |

## Authorized Environment

Perform all activity only on the assigned Ubuntu lab server. Use fictional files and accounts only. Do not use production aerospace data, real employee data, operational flight records, real credentials, export-controlled material, or public systems.

| Scope item | Approved value |
|---|---|
| Organization | AeroTech Aerospace Systems |
| Platform | Ubuntu Server |
| Project path | `/srv/aerotech` |
| Allowed activity | Linux administration, user/group setup, permissions, ACLs, SSH hardening, UFW, audit, backup, restore, validation |
| Prohibited activity | Real data, public scanning, password theft, destructive testing, broad `777` final permissions |
| Stop condition | Stop if work is occurring on the wrong server, wrong path, real data, or a system outside written scope |

## Department and Identity Requirements

| Department | Linux group | Required users | Directory |
|---|---|---|---|
| Engineering | `engineering` | `eng1`, `eng2`, `eng3` | `/srv/aerotech/engineering` |
| Flight Operations | `flightops` | `flight1`, `flight2`, `flight3` | `/srv/aerotech/flight_operations` |
| Quality Assurance | `qualityassurance` | `qa1`, `qa2`, `qa3` | `/srv/aerotech/quality_assurance` |
| Research and Development | `research` | `rd1`, `rd2`, `rd3` | `/srv/aerotech/research_development` |
| Maintenance | `maintenance` | `maint1`, `maint2`, `maint3` | `/srv/aerotech/maintenance` |
| Information Technology | `it` | `it1`, `it2`, `it3` | `/srv/aerotech/it` |

## Required Sample Records

Create these fictional records with synthetic content only:

| Department | File | Required content meaning |
|---|---|---|
| Engineering | `aircraft_design.txt` | Aircraft design documentation is confidential |
| Engineering | `component_specs.txt` | Component specifications are restricted to engineering staff |
| Flight Operations | `flight_schedule.txt` | Flight schedules are confidential operational information |
| Flight Operations | `mission_log.txt` | Mission records are restricted to authorized personnel |
| Quality Assurance | `inspection_report.txt` | Inspection reports contain controlled information |
| Quality Assurance | `compliance_checklist.txt` | Compliance verification records are confidential |
| Research and Development | `prototype_notes.txt` | Prototype development notes are confidential |
| Research and Development | `aerospace_innovation.txt` | Aerospace innovation documentation is restricted |
| Maintenance | `maintenance_log.txt` | Maintenance activity records are limited to authorized staff |
| Maintenance | `repair_records.txt` | Repair records contain sensitive technical information |
| Information Technology | `network_inventory.txt` | Network inventory information is restricted |
| Information Technology | `server_backup.txt` | Backup records are confidential |

## Required Security Outcomes

| ID | Requirement | Expected result |
|---|---|---|
| SR-01 | Unique accounts | Every employee has a unique Linux account |
| SR-02 | Correct groups | Each employee belongs to the correct departmental group |
| SR-03 | Department isolation | Users cannot access other department content |
| SR-04 | Department collaboration | Department members can collaborate inside their own directory |
| SR-05 | Controlled traversal | Users can reach authorized paths without broad listing of all data |
| SR-06 | Group inheritance | New content inherits the correct department group |
| SR-07 | Predictable permissions | Default ACLs and tested `umask` values do not break collaboration |
| SR-08 | Least privilege | World access is denied; `777` is not used as a final solution |
| SR-09 | SSH hardening | Root SSH is denied and approved admin access is controlled |
| SR-10 | UFW host firewall | Only approved host services are allowed |
| SR-11 | Audit visibility | Relevant access and permission activity creates reviewable evidence |
| SR-12 | Recovery | Backup and restore preserve content, ownership, modes, SGID, and ACLs |

## Step-by-Step Completion Standard

Complete the work packages in order. Do not jump directly to hardening commands. First record scope and baseline state, then manually create identity objects, then build the directory structure, then apply permissions, then test access, then harden SSH and UFW, then collect audit evidence, then test staff lifecycle changes, then prove backup and restore. Students must explain each command before using it.

## Required Evidence Structure

```text
aerotech-linux-hardening/
  scope-and-authorization.md
  evidence/
    01-baseline/
    02-identity/
    03-filesystem/
    04-hardening/
    05-validation/
    06-audit/
    07-recovery/
    08-troubleshooting/
  reports/
    technical-report.md
    executive-summary.md
  portfolio/
    sanitized-case-study.md
  hashes.sha256
```

## Work Package 1 - Scope, Classification, and Baseline

Define:

- Authorized server.
- Authorized users and groups.
- Authorized project path.
- Prohibited activity.
- Evidence handling.
- Data classification for each department.
- Stop conditions.

Baseline the server:

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
hostnamectl
whoami
ip -br address
ip route
sudo ss -lntup
sudo systemctl --failed
getent passwd | tail
getent group | tail
ls -ld /srv /srv/aerotech 2>/dev/null
```

Required output:

- Baseline command evidence.
- Initial risk register.
- Existing service exposure summary.
- Snapshot or rollback note.

## Work Package 2 - Identity and Group Provisioning

Create all six department groups and all eighteen user accounts. Each user must have a unique account and correct group membership.

For this project, create users and groups manually. Do not use a loop or a bulk account-creation script for the first build. The goal is for students to understand exactly what each Linux identity command does before they automate anything in later work.

Required manual group commands:

```bash
sudo groupadd engineering
sudo groupadd flightops
sudo groupadd qualityassurance
sudo groupadd research
sudo groupadd maintenance
sudo groupadd it
```

Required manual user commands:

```bash
sudo useradd -m -s /bin/bash -g engineering eng1
sudo useradd -m -s /bin/bash -g engineering eng2
sudo useradd -m -s /bin/bash -g engineering eng3

sudo useradd -m -s /bin/bash -g flightops flight1
sudo useradd -m -s /bin/bash -g flightops flight2
sudo useradd -m -s /bin/bash -g flightops flight3

sudo useradd -m -s /bin/bash -g qualityassurance qa1
sudo useradd -m -s /bin/bash -g qualityassurance qa2
sudo useradd -m -s /bin/bash -g qualityassurance qa3

sudo useradd -m -s /bin/bash -g research rd1
sudo useradd -m -s /bin/bash -g research rd2
sudo useradd -m -s /bin/bash -g research rd3

sudo useradd -m -s /bin/bash -g maintenance maint1
sudo useradd -m -s /bin/bash -g maintenance maint2
sudo useradd -m -s /bin/bash -g maintenance maint3

sudo useradd -m -s /bin/bash -g it it1
sudo useradd -m -s /bin/bash -g it it2
sudo useradd -m -s /bin/bash -g it it3
```

Command meaning:

| Option | Meaning |
|---|---|
| `useradd` | Creates a local Linux user account |
| `-m` | Creates the user's home directory |
| `-s /bin/bash` | Sets Bash as the user's login shell |
| `-g groupname` | Sets the user's primary group |
| `groupadd` | Creates a local Linux group |

Validation examples:

```bash
getent group engineering flightops qualityassurance research maintenance it
id eng1
id flight1
id qa1
id rd1
id maint1
id it1
```

Required output:

- User inventory.
- Group inventory.
- Membership matrix.
- Exception list if any user needs cross-department access.

## Work Package 3 - Secure Directory Design

Create `/srv/aerotech` and all department directories.

Design expectations:

| Path level | Expected security idea |
|---|---|
| `/srv/aerotech` | Controlled company root, no broad write access |
| Department directories | Department group ownership, SGID, no world access |
| Department files | Read/write based on department membership |
| Default ACLs | New content remains usable by authorized colleagues |

Students must explain:

- Directory read permission.
- Directory execute permission.
- File read permission.
- File write permission.
- SGID on directories.
- Default ACLs.
- ACL mask.
- `umask`.

## Work Package 4 - Collaboration and Permission Hardening

Implement:

- Correct ownership for every department directory.
- SGID on every department directory.
- Default ACLs for departmental collaboration.
- No world-readable or world-writable departmental content.
- A tested design that works even when user `umask` differs.

Validation examples:

```bash
namei -l /srv/aerotech/engineering
getfacl /srv/aerotech/engineering
find /srv/aerotech -perm -0007 -ls
find /srv/aerotech -type d -not -perm -2000 -ls
```

Required output:

- Ownership evidence.
- Mode evidence.
- ACL evidence.
- SGID evidence.
- `umask` test evidence.

## Work Package 5 - Sample Records and Access Testing

Create all twelve sample records through ordinary departmental identities, not by using `root` for every file.

For each department, prove:

- Authorized user can enter the department directory.
- Authorized user can list allowed content.
- Authorized user can read allowed records.
- Authorized user can create a new file.
- Authorized user can update a colleague-created file if collaboration is required.
- Unauthorized user cannot list, read, create, modify, rename, or delete in that department.

Test record format:

```text
Test ID:
User:
Command or action:
Expected result:
Actual result:
Exit code:
Evidence file:
Interpretation:
```

## Work Package 6 - SSH and System Hardening

Harden the Ubuntu server without breaking approved administration.

Required controls:

| Control | Required result |
|---|---|
| SSH root login | Disabled |
| SSH key access | Tested before disabling password login |
| Approved admin group | Only approved administrators can SSH |
| UFW | Allows only approved inbound services |
| Fail2Ban | Protects SSH if installed |
| Package updates | Reviewed before applying |
| Service exposure | Only expected services listen |

Validation examples:

```bash
sudo sshd -t
sudo systemctl status ssh --no-pager
sudo grep -nE 'PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|AllowGroups|MaxAuthTries' /etc/ssh/sshd_config
sudo ufw status verbose
sudo ss -lntup
sudo fail2ban-client status sshd 2>/dev/null
```

Required tests:

| Test | Expected result |
|---|---|
| Approved admin SSH key login | Allowed |
| Root SSH login | Denied |
| Non-approved user SSH login | Denied |
| Approved file service access | Allowed |
| Unapproved service exposure | Not present or blocked |

## Work Package 7 - Audit and Investigation

Configure lab-appropriate audit visibility for `/srv/aerotech`.

Generate:

- One authorized file read or write.
- One unauthorized access attempt.
- One permission or ACL change.
- One group membership change if approved.

Retrieve and explain evidence:

```bash
sudo ausearch -k aerotech-access 2>/dev/null
sudo ausearch -k aerotech-permissions 2>/dev/null
sudo journalctl --since '-2 hours' --no-pager
sudo tail -n 80 /var/log/auth.log
```

If `auditd` is not available, document the limitation and use available logs plus command evidence. Do not pretend unsupported logging exists.

## Work Package 8 - Joiner, Mover, and Leaver Test

Demonstrate account lifecycle control:

1. Onboard one temporary Engineering user.
2. Prove Engineering access works.
3. Move the user to Quality Assurance.
4. Prove old Engineering access is removed.
5. Prove new Quality Assurance access works.
6. Lock the account as a leaver.
7. Prove new login is denied.
8. Explain why an existing session may need to be terminated separately.

Required output:

- Change records.
- Before/after group membership.
- Access test results.
- Session-risk explanation.

## Work Package 9 - Backup and Recovery

Back up both content and security metadata. Restore into an isolated recovery path. Do not overwrite the live project tree during the first recovery test.

Prove the restore preserves:

- Files.
- Ownership.
- Group ownership.
- Modes.
- SGID.
- ACLs.
- Authorized access.
- Unauthorized denial.

Required output:

- Backup command or tool used.
- Backup manifest.
- Integrity hash.
- Restore location.
- Metadata comparison.
- Access retest.

## Work Package 10 - Final Report and Portfolio Summary

Write:

- Technical report.
- Executive summary.
- Sanitized portfolio case study.

The executive summary must explain:

- What business risk existed.
- What controls were implemented.
- What evidence proves the controls work.
- What risks remain.
- What management should improve next.

## Minimum Evidence

```text
01-baseline-host-network-services.txt
02-user-group-membership-matrix.txt
03-directory-ownership-modes.txt
04-sgid-acl-umask-tests.txt
05-positive-access-tests.txt
06-negative-access-tests.txt
07-ssh-hardening-proof.txt
08-ufw-and-service-exposure.txt
09-audit-event-evidence.txt
10-joiner-mover-leaver-tests.txt
11-backup-restore-metadata-proof.txt
12-hashes.sha256
technical-report.md
executive-summary.md
sanitized-case-study.md
```

## Mandatory Acceptance Tests

| ID | Security question | Required result |
|---|---|---|
| AT-01 | Do all required groups exist? | Six approved groups exist |
| AT-02 | Do all required users exist? | Eighteen approved users exist |
| AT-03 | Are memberships correct? | Each employee has correct department membership |
| AT-04 | Is the hierarchy correct? | All department directories exist under `/srv/aerotech` |
| AT-05 | Can users reach only authorized paths? | Authorized traversal works; unauthorized access fails |
| AT-06 | Are directory owners and groups correct? | Department directories use correct group ownership |
| AT-07 | Is world access denied? | No broad world-readable or world-writable content |
| AT-08 | Is SGID set? | Department directories preserve group inheritance |
| AT-09 | Do default ACLs support collaboration? | New files remain usable by department colleagues |
| AT-10 | Does restrictive `umask` break the design? | Collaboration still works |
| AT-11 | Is SSH hardened safely? | Key access works, root SSH denied |
| AT-12 | Is UFW configured? | Only approved inbound services are allowed |
| AT-13 | Are unauthorized users denied? | Negative tests fail as expected |
| AT-14 | Is activity auditable? | Events or documented evidence can be reviewed |
| AT-15 | Does account lifecycle work? | Joiner, mover, leaver tests pass |
| AT-16 | Does recovery preserve metadata? | Restored content passes ownership, ACL, SGID, and access tests |

## Instructor Injects

| Inject | Student response |
|---|---|
| Engineering user appears in Research group | Investigate exposure, active sessions, containment, and correction |
| New Maintenance file has wrong group | Diagnose SGID, copy behavior, path, or ownership issue |
| Engineering collaboration fails | Diagnose mode, ACL, ACL mask, and `umask` |
| Directory changed to broad access | Determine exposure and restore least privilege |
| ACL mask blocks write access | Explain effective permissions and correct safely |
| Locked user still has active shell | Explain account lock versus session termination |
| Restore loses ACLs | Identify backup limitation and repeat recovery correctly |

## Technical Report Template

```text
Title: AeroTech Linux File Access and System Hardening Project

1. Executive Summary
2. Scope and Authorization
3. Business Problem
4. Baseline Assessment
5. Identity and Group Design
6. Filesystem Permission Design
7. SSH and System Hardening
8. UFW and Service Exposure
9. Positive and Negative Access Testing
10. Audit Evidence
11. Joiner, Mover, and Leaver Testing
12. Backup and Recovery
13. Troubleshooting
14. Residual Risk
15. Recommendations
16. Evidence Index
```

## Oral Defense

Students should be ready to answer:

1. Why does a directory need execute permission for traversal?
2. Why is read permission on a directory different from read permission on a file?
3. What does SGID on a directory change?
4. Why does SGID alone not guarantee collaborative write access?
5. How do `umask` and default ACLs interact?
6. What is the ACL mask and why can it reduce effective permissions?
7. Why is `chmod 777` not an acceptable repair?
8. Why can `root` read files that ordinary users cannot?
9. Why can a locked account retain access through an existing session?
10. What evidence proves denied access?
11. How did the backup preserve ACLs and ownership?
12. What system-hardening control reduced remote administration risk?

## Recruiter-Visible Portfolio Artifact

Publish a sanitized case study showing:

- Business problem.
- Access-control design.
- User/group matrix.
- Permission and ACL explanation.
- Positive and negative test table.
- SSH and UFW hardening evidence.
- Audit and recovery evidence.
- Problems encountered and how they were fixed.
- Final management recommendation.

Do not publish real usernames, real hostnames, passwords, hashes from real systems, private keys, or screenshots showing secrets.
