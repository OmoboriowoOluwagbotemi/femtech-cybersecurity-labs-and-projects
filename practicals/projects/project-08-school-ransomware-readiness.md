# Project 08 - Make a School Ransomware-Ready

## Portfolio Problem

A school wants to reduce ransomware likelihood and prove it can recover important files without paying a ransom.

## Combines Tools Learned

Kali, Ubuntu Server, pfSense, Windows Server, Active Directory, Wazuh, Nmap, backup tooling, PowerShell, and Bash.

## Business Scenario

Unity Secondary School has 300 students, 45 employees, a shared file server, an aging domain, and one IT technician. A nearby school lost teaching files to ransomware. Unity has backups but has never restored them. Teachers share folders broadly, student devices use the same network as servers, and remote administration uses exposed RDP.

## Required Outcomes

- STUDENTS, STAFF, SERVERS, and SOC/ADMIN networks are separated.
- Student systems cannot reach server management ports.
- RDP/SSH/WinRM are restricted to approved admin sources.
- File access is role-based.
- Protected backups exist and restore is tested.
- Wazuh detects key precursor events.
- Recovery process includes communication and validation.

## Step-by-Step Completion Standard

Complete this project as a readiness assessment. Identify critical assets first, then design segmentation, then implement access controls, then test file permissions, then prove backup restore, then generate monitoring evidence, then write the ransomware playbook, then summarize residual risk. Do not simulate real ransomware or destructive encryption.

## Required Work

1. Identify crown jewels: teaching files, exams, finance/payroll, identity, DNS, backups.
2. Draw at least three attack paths from student network to important assets.
3. Segment the network with pfSense.
4. Review and correct broad file permissions.
5. Separate privileged accounts from normal teaching accounts.
6. Build protected backup and restore workflow using synthetic school data.
7. Detect privileged group change, burst file changes, Defender issue, backup failure, and telemetry loss.
8. Run a ransomware tabletop.
9. Restore data to a clean location and validate.
10. Report measured or estimated RPO/RTO.

## Minimum Evidence

```text
attack-path-diagram.md
segmentation-rule-matrix.md
allowed-blocked-tests.md
file-permission-review.md
privileged-access-review.md
backup-configuration.md
restore-test-evidence.md
wazuh-detection-pack.md
tabletop-minutes.md
rpo-rto-results.md
technical-report.md
executive-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| Student network to server management | Blocked |
| Staff access to teaching files | Allowed by role |
| Unauthorized access to teaching files | Denied |
| Backup restore | Successful to staging path |
| Restored data | Validated by owner |
| Wazuh detections | Evidence exists for at least three detection types |

## Oral Defense

1. What is the school's crown jewel?
2. Which attack path did you reduce first?
3. Why is backup restore more important than backup existence?
4. What would you tell the principal during an outage?
5. What risk remains after your controls?

## Recruiter-Visible Portfolio Artifact

Publish a sanitized ransomware readiness case study with segmentation, backup/restore proof, detection evidence, tabletop decisions, and management recommendations.

## Expanded Scenario

Unity Secondary School depends on shared teaching files, exam preparation folders, finance spreadsheets, DNS, and Active Directory. A nearby school lost access to lesson plans and exam materials for two weeks after ransomware. Unity's principal wants practical proof that the school can reduce ransomware spread and restore important files.

Current state:

- Student devices can reach the same network as servers.
- Teachers share files broadly because access requests are slow.
- RDP is available from places it should not be.
- Backups exist, but no one has restored them.
- Alerts are not reviewed consistently.
- There is no simple incident communication template.

The business problem is:

```text
Can the school reduce ransomware blast radius, detect early warning signs, and restore priority data?
```

## Required Environment

| System | Role |
|---|---|
| pfSense | Segment STUDENTS, STAFF, SERVERS, and SOC/ADMIN |
| Windows Server | AD DS, DNS, groups, and file access |
| Windows client | Staff or student workstation simulation |
| Ubuntu Server | Backup repository or Linux service |
| Wazuh | Security monitoring |
| Kali | Approved validation source only |

## Work Packages

| Work package | Required student work | Evidence |
|---|---|---|
| WP01 - Crown jewels | Identify teaching files, exams, finance, identity, DNS, backups | Crown-jewel register |
| WP02 - Attack paths | Draw three paths from student device to critical assets | Attack-path diagrams |
| WP03 - Segmentation | Block student-to-server management and restrict admin paths | Rule matrix and logs |
| WP04 - Identity | Review privileged groups, stale users, and share permissions | AD evidence |
| WP05 - Backup | Build protected backup and restore workflow with synthetic data | Backup and restore proof |
| WP06 - Detection | Configure or document detections for precursor behavior | Wazuh evidence |
| WP07 - Tabletop | Run ransomware response discussion | Tabletop minutes |
| WP08 - Recovery | Restore files to staging and validate with owner | RPO/RTO evidence |
| WP09 - Management | Write principal-ready summary and next steps | Executive summary |

## Required Detections

At least three must be tested:

| Detection | Example evidence |
|---|---|
| Privileged group membership change | Windows event or Wazuh alert |
| Repeated failed login followed by success | Windows/Linux logs and Wazuh |
| Large burst of file changes in synthetic folder | File inventory or FIM event |
| Defender disabled or unhealthy | PowerShell evidence |
| Backup job failure | Job log or simulated failed check |
| Wazuh agent disconnected | Agent status timeline |

Do not run ransomware, encryption malware, or destructive scripts. Use benign file-change simulations only in a synthetic folder.

## Recovery Standard

Students must prove:

| Item | Required proof |
|---|---|
| Backup exists | Backup command output or job evidence |
| Backup is protected | Access control or isolation explanation |
| Restore works | Files restored to staging |
| Data is usable | Owner validation or `diff` result |
| RPO | How much data could be lost |
| RTO | How long recovery took |
| Monitoring after restore | Logs or agent status checked |

## Instructor Injects

| Inject | Expected response |
|---|---|
| Principal demands internet RDP | Reject unsafe request and propose secure remote support |
| Backup check fails | Stop assumptions, troubleshoot, update risk |
| Domain admin used from student subnet | Preserve evidence and triage privileged misuse |
| Restore works but DNS remains down | Explain dependency recovery order |

## Technical Report Template

```text
1. Executive Summary for School Leadership
2. Scope and Safety
3. Crown Jewels and Attack Paths
4. Segmentation Design
5. Identity and Privileged Access Review
6. Backup Design
7. Restore Test and RPO/RTO
8. Detection Evidence
9. Tabletop Decisions
10. Incident Communication Template
11. Residual Risk
12. Recommendations
13. Evidence Index
```
