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
