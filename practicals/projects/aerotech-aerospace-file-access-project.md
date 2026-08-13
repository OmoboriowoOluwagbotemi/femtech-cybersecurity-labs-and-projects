# AeroTech Aerospace Systems: Secure Department File Access

## Student Project Brief

**Organisation:** AeroTech Aerospace Systems

**Role:** Junior Linux Security Administrator

**Platform:** Ubuntu Server

**Duration:** Six days
**Focus:** Linux identity, group-based access control, file security, validation, auditing, and recovery

> This document defines the problem, constraints, expected outcomes, and assessment evidence. It does not provide implementation commands or a click-by-click solution.

## 1. Business Scenario

AeroTech Aerospace Systems is a fictional aerospace engineering company. It designs aircraft components, coordinates flight operations, conducts quality assurance, develops prototypes, performs maintenance, and operates internal IT services.

An internal review found that departmental documents are stored inconsistently. Some files are readable by unrelated employees, new files do not always retain the correct departmental group, and administrators cannot prove that access restrictions continue to work after staff or permission changes.

The exposed information could include:

- aircraft component specifications;
- flight schedules and mission records;
- inspection and compliance reports;
- prototype and research notes;
- maintenance and repair histories;
- network and backup inventories.

Management has commissioned a secure departmental file-access service on Ubuntu Server. Employees must collaborate within their department without being able to browse, read, create, alter, or delete information owned by another department.

The solution must also be maintainable. AeroTech wants repeatable verification, useful audit evidence, safe onboarding and offboarding, and a tested recovery process. Screenshots alone are not accepted as proof.

## 2. Mission

Design, implement, validate, audit, and document a group-based access-control system under `/srv/aerotech`.

Your work must demonstrate that you understand:

- how Linux identifies users and groups;
- how directory traversal, read, write, and execute permissions differ;
- how ownership and effective group membership affect access;
- why SGID and default ACLs solve different problems;
- how `umask` can affect collaboration;
- how to prove both authorised and unauthorised outcomes;
- how privileged administrators differ from ordinary users;
- how permissions, ownership, ACLs, and audit evidence are preserved during recovery.

## 3. Authorised Environment

Perform all activity only on the assigned Ubuntu lab server. Use fictional files and accounts. Do not use production aerospace information, real employee data, operational flight records, credentials, or export-controlled material.

## 4. Department and Identity Requirements

| Department | Linux group | Required users | Directory |
|---|---|---|---|
| Engineering | `engineering` | `eng1`, `eng2`, `eng3` | `/srv/aerotech/engineering` |
| Flight Operations | `flightops` | `flight1`, `flight2`, `flight3` | `/srv/aerotech/flight_operations` |
| Quality Assurance | `qualityassurance` | `qa1`, `qa2`, `qa3` | `/srv/aerotech/quality_assurance` |
| Research and Development | `research` | `rd1`, `rd2`, `rd3` | `/srv/aerotech/research_development` |
| Maintenance | `maintenance` | `maint1`, `maint2`, `maint3` | `/srv/aerotech/maintenance` |
| Information Technology | `it` | `it1`, `it2`, `it3` | `/srv/aerotech/it` |

## 5. Required Sample Records

Create the following fictional records with the stated meaning.

| Department | File | Required content meaning |
|---|---|---|
| Engineering | `aircraft_design.txt` | Aircraft design documentation is confidential |
| Engineering | `component_specs.txt` | Component specifications are restricted to engineering staff |
| Flight Operations | `flight_schedule.txt` | Flight schedules are confidential operational information |
| Flight Operations | `mission_log.txt` | Mission records are restricted to authorised personnel |
| Quality Assurance | `inspection_report.txt` | Inspection reports contain controlled information |
| Quality Assurance | `compliance_checklist.txt` | Compliance verification records are confidential |
| Research and Development | `prototype_notes.txt` | Prototype development notes are confidential |
| Research and Development | `aerospace_innovation.txt` | Aerospace innovation documentation is restricted |
| Maintenance | `maintenance_log.txt` | Maintenance activity records are limited to authorised staff |
| Maintenance | `repair_records.txt` | Repair records contain sensitive technical information |
| Information Technology | `network_inventory.txt` | Network inventory information is restricted |
| Information Technology | `server_backup.txt` | Backup records are confidential |

## 6. Security Requirements

### SR-01 - Identity separation

Every employee must have a unique account. Shared employee accounts are prohibited.

### SR-02 - Role mapping

Each employee must be a member of the correct departmental group. Unexplained cross-department membership is prohibited.

### SR-03 - Department isolation

Ordinary users must not list, read, create, modify, rename, or delete content in another department.

### SR-04 - Department collaboration

Members of the same department must be able to create and update shared departmental records according to the approved collaboration policy.

### SR-05 - Controlled traversal

The company root must permit the traversal required to reach authorised paths without unnecessarily revealing the complete departmental directory listing.

### SR-06 - Group inheritance

New files and subdirectories created inside a departmental folder must inherit the department group.

### SR-07 - Predictable collaborative permissions

New content must remain usable by authorised colleagues even when a creator has a restrictive or permissive `umask`.

### SR-08 - Least privilege

World access must be denied. Broad permissions such as `777` are prohibited.

### SR-09 - Administrative accountability

The design must state clearly that `root` and equivalently privileged administrators can bypass ordinary discretionary access controls. Administrative access must therefore be limited and auditable.

### SR-10 - Repeatable validation

Positive and negative access tests must be executable repeatedly and must report expected versus actual results.

### SR-11 - Change resilience

The solution must be retested after membership, ownership, permission, ACL, or recovery changes.

### SR-12 - Audit visibility

Security-relevant changes and attempted or successful file activity must generate reviewable evidence appropriate to the lab.

### SR-13 - Recoverability

The directory data and its security metadata must be backed up and restored in an isolated recovery location.

### SR-14 - Secret and data hygiene

Passwords, private keys, password hashes, real identities, and sensitive source data must not appear in GitHub, screenshots, or reports.

## 7. Work Packages

## WP01 - Engagement Scope and Data Classification

Define:

- authorised systems, identities, paths, and test activities;
- prohibited activity and stop conditions;
- departmental data classification;
- evidence-handling requirements;
- assumptions and limitations.

**Deliverables:** scope statement, data classification table, rules of engagement, and responsibility matrix.

## WP02 - Baseline Assessment

Assess the server before implementation:

- operating system and time configuration;
- existing users, groups, memberships, and duplicate identifiers;
- current `/srv` structure;
- current permission, ACL, and mount behaviour;
- failed services and relevant packages;
- existing audit and backup capability.

**Deliverables:** baseline report, initial risk register, and timestamped command evidence.

## WP03 - Access-Control Design

Produce a design that maps each business role to:

- group membership;
- authorised directory;
- allowed operations;
- prohibited operations;
- owner and group ownership;
- directory mode;
- access ACL and default ACL;
- evidence and review owner.

Explain why the design uses Linux group-based discretionary access control. Do not describe it as mandatory access control.

**Deliverables:** identity matrix, access-control matrix, directory design, and threat assumptions.

## WP04 - Identity Provisioning

Create all required groups and unique employee accounts. Use a secure initial-access process. Ensure account identifiers are unique and memberships exactly match the approved matrix.

**Deliverables:** group inventory, user inventory, membership verification, and exception list.

## WP05 - Secure Directory Structure

Create the approved hierarchy under `/srv/aerotech`. Establish a defensible owner, group, and mode for the company root and each departmental directory.

**Deliverables:** hierarchy evidence, ownership evidence, and permission rationale.

## WP06 - Inheritance and Collaboration

Implement:

- departmental group inheritance for new content;
- predictable group collaboration for new files and subdirectories;
- denial of access to non-members;
- a design that remains effective under tested `umask` values.

Explain separately what SGID controls and what default ACLs control.

**Deliverables:** SGID evidence, ACL evidence, `umask` test, and collaborative-write test.

## WP07 - Sample Record Creation

Create all twelve fictional records through ordinary departmental identities, not by using `root` for every file. Distribute creation across departmental members so ownership and collaboration can be tested.

**Deliverables:** content inventory, owner/group/mode evidence, and data-hygiene confirmation.

## WP08 - Positive and Negative Security Testing

For each department, prove that a representative user can:

- reach the assigned department;
- list authorised content;
- read an authorised record;
- create a new record;
- update a colleague-created record if collaboration is required;
- create a subdirectory with correct inherited security metadata.

Also prove that the representative user cannot perform those actions in each unauthorised department.

**Deliverables:** test plan, expected results recorded before testing, actual results, exit codes, evidence references, defects, remediation, and retest.

## WP09 - Security Metadata Validation

Validate:

- numeric and named user/group identity;
- parent-path traversal permissions;
- directory ownership and modes;
- file ownership and modes;
- access and default ACLs;
- SGID on every required directory;
- absence of world-accessible content;
- absence of unexplained cross-department membership.

**Deliverables:** metadata report and automated validation output.

## WP10 - Audit and Investigation

Establish lab-appropriate auditing for security-relevant activity under `/srv/aerotech`. Generate authorised and unauthorised activity, retrieve related events, and explain what the audit evidence proves and does not prove.

**Deliverables:** audit configuration, event evidence, interpretation, retention note, and limitations.

## WP11 - Joiner, Mover, and Leaver Exercises

Demonstrate controlled identity lifecycle changes:

- onboard one temporary Engineering user;
- move that user to Quality Assurance;
- prove old access is removed and new access works;
- lock the account as a leaver;
- prove access is no longer available;
- preserve ownership and accountability for existing files.

**Deliverables:** approved change records, before/after membership, session considerations, and regression tests.

## WP12 - Backup and Recovery

Back up both content and security metadata. Restore into an isolated recovery path and prove that:

- files are complete;
- ownership is correct;
- SGID is retained;
- ACLs are retained;
- authorised access works;
- unauthorised access remains denied.

Do not overwrite the live project tree during the first recovery test.

**Deliverables:** backup manifest, integrity hash, recovery record, metadata comparison, and retest results.

## WP13 - Incident Challenge

Investigate an instructor-provided access anomaly. Determine:

- what changed;
- who or what identity performed it;
- which departments were exposed;
- whether content was only visible or was modified;
- the safest containment action;
- how to preserve evidence;
- how to correct the root cause;
- how to prevent recurrence.

**Deliverables:** incident ticket, timeline, evidence register, impact assessment, containment decision, root cause, and lessons learned.

## WP14 - Final Handover

Provide a professional handover suitable for another Linux administrator and a non-technical manager.

**Deliverables:** executive summary, technical runbook, final access matrix, test report, risk register, recovery guide, monitoring responsibilities, and go/no-go recommendation.

## 8. Mandatory Acceptance Tests

| ID | Security question | Required result |
|---|---|---|
| AT-01 | Do all required groups exist exactly once? | Six approved groups with unique GIDs |
| AT-02 | Do all required users exist exactly once? | Eighteen approved users with unique UIDs |
| AT-03 | Are memberships correct? | Each employee has the approved department membership and no unexplained cross-membership |
| AT-04 | Is the hierarchy correct? | All six required departmental paths exist under `/srv/aerotech` |
| AT-05 | Can users reach only authorised paths? | Parent traversal works; unauthorised department access fails |
| AT-06 | Are directory owners and groups correct? | Approved administrative owner and matching department group |
| AT-07 | Is world access denied? | No other-user permission or ACL grants access |
| AT-08 | Is SGID set? | Every department directory and new subdirectory has SGID |
| AT-09 | Do new files inherit the department group? | Group is correct regardless of the creator's primary group |
| AT-10 | Do default ACLs support collaboration? | New files are writable by authorised department colleagues |
| AT-11 | Does restrictive `umask` break the design? | Tested new content retains approved group collaboration |
| AT-12 | Can representative users list and read their department? | Positive tests pass for all six departments |
| AT-13 | Can representative users create and modify authorised content? | Positive write tests pass for all six departments |
| AT-14 | Can a user read another department's file? | Every negative read test fails |
| AT-15 | Can a user create, modify, rename, or delete in another department? | Every negative write test fails |
| AT-16 | Are all twelve sample records correct? | Names, content meaning, owner, group, mode, and ACL are approved |
| AT-17 | Is relevant activity auditable? | Test activity can be retrieved and interpreted |
| AT-18 | Does lifecycle management revoke access? | Moved and locked accounts lose obsolete access as expected |
| AT-19 | Does recovery preserve security metadata? | Restored data passes ownership, mode, ACL, SGID, and access tests |
| AT-20 | Is the handover complete and defensible? | Requirements trace to evidence, residual risks, and final recommendation |

## 9. Instructor Injects

### Inject A - Accidental cross-membership

An Engineering user unexpectedly appears in the Research group. Investigate exposure, session effects, evidence, containment, and correction.

### Inject B - Group inheritance failure

A newly created Maintenance file has the creator's private group instead of `maintenance`. Determine whether SGID, path, copy behaviour, or another condition caused it.

### Inject C - Collaboration failure

One Engineering user creates a file that another Engineering user can read but cannot update. Diagnose mode, ACL, mask, and `umask` behaviour.

### Inject D - Excessive permission

A help-desk workaround changed a department directory to a broad mode. Determine exposure and restore least privilege without destroying legitimate collaboration.

### Inject E - ACL mask change

The named group entry appears to grant write access, but effective access is read-only. Explain and correct the ACL mask safely.

### Inject F - Leaver still has access

A locked user retains an active shell session. Explain why account locking and session termination are different controls.

### Inject G - Incomplete recovery

Restored files contain the correct data but have incorrect owners or no default ACL. Determine why the backup method was insufficient and perform a safe recovery.

### Inject H - Privileged access concern

Audit evidence shows a privileged administrator accessing Research records. Determine what Linux permissions can and cannot prevent, preserve evidence, and recommend governance controls.

## 10. Evidence Standards

Every evidence item must include:

- evidence ID;
- student or team;
- hostname;
- command or activity;
- date, time, and timezone;
- expected result;
- actual result and exit code where relevant;
- interpretation;
- source file or screenshot reference;
- hash for exported evidence where appropriate.

Screenshots without interpretation are insufficient. Do not capture passwords, password hashes, private keys, or unrelated system information.

## 11. Submission Structure

```text
aerotech-file-security/
|-- 01-governance/
|-- 02-baseline/
|-- 03-design/
|-- 04-identity/
|-- 05-filesystem/
|-- 06-testing/
|-- 07-audit/
|-- 08-incident/
|-- 09-recovery/
`-- 10-handover/
```

## 12. Assessment Rubric

| Area | Weight |
|---|---:|
| Scope, ethics, and data classification | 6 |
| Baseline and access-control design | 10 |
| Identity and group management | 10 |
| Ownership, permissions, SGID, and ACL implementation | 20 |
| Positive, negative, and collaborative testing | 18 |
| Audit and incident investigation | 10 |
| Joiner, mover, and leaver controls | 8 |
| Backup and recovery | 8 |
| Documentation, evidence, and oral defence | 10 |
| **Total** | **100** |

### Critical failure conditions

The project may be marked incomplete regardless of score if:

- testing occurs outside the authorised lab;
- evidence is fabricated;
- any departmental path remains world-readable or world-writable;
- broad `777` access is used as the final solution;
- unexplained cross-department access remains;
- passwords or sensitive data are committed to GitHub;
- recovery is claimed without a restore test;
- only screenshots are submitted without reproducible evidence.

## 13. Oral Defence

Be prepared to explain:

1. Why does a directory need execute permission for traversal?
2. Why is read permission on a directory different from read permission on a file?
3. What does SGID on a directory change?
4. Why does SGID alone not guarantee collaborative write access?
5. How do `umask` and default ACLs interact?
6. What is the ACL mask and why can it reduce effective permissions?
7. Why is `chmod 777` not an acceptable repair?
8. Why can `root` read files that ordinary users cannot?
9. Why can a locked account retain access through an existing session?
10. What evidence proves denial at the filesystem rather than application layer?
11. How did the backup preserve ACLs and numeric ownership?
12. Why is group-based Linux DAC not the same as mandatory access control?
13. How would you handle a legitimate user who needs access to two departments?
14. What changes would be needed for a production aerospace environment?

## 14. Definition of Done

The engagement is complete only when every security requirement and acceptance test has an evidence-backed result, all defects have been remediated or accepted by an owner, recovery has been tested outside the live path, and the student can explain the technical reason for each control.
