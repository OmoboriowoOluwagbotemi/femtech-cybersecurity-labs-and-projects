# Project 10 - Defend Northstar Manufacturing Capstone

## Portfolio Problem

A manufacturing company needs a practical foundational security program across identity, network segmentation, Linux and Windows hardening, vulnerability management, SOC monitoring, incident response, and executive reporting.

## Combines Tools Learned

All core tools: VirtualBox, Kali, Ubuntu Server, pfSense, Windows Server, Active Directory, Greenbone/OpenVAS, Nmap, Wazuh, PowerShell, Bash, and optional Suricata or Zeek.

## Business Scenario

Northstar Manufacturing operates office users, engineering workstations, internal servers, a DMZ supplier portal, and a small SOC function. The company has limited budget but must reduce ransomware risk, protect engineering data, prove monitoring, and prepare for incident response.

This is the final foundational capstone. Students must show they can connect fundamentals to real operational security.

## Required Outcomes

- Asset inventory and data classification exist.
- Identity and access are group-based.
- Network zones are segmented.
- Linux and Windows systems are hardened.
- Vulnerability assessment and remediation cycle is performed.
- Wazuh monitoring and alert triage are operational.
- Recovery and incident procedures are tested.
- Executive and technical reports are portfolio-ready.

## Step-by-Step Completion Standard

Complete the capstone as a full engagement. Start with scope, then inventory, then architecture, then identity, then network controls, then Linux and Windows hardening, then monitoring, then vulnerability management, then incident response, then recovery, then reporting. Do not work from tools first; work from the business risk and prove every control with evidence.

## Required Work

1. Build or document the lab architecture.
2. Create scope, authorization, and stop conditions.
3. Inventory assets, users, services, data, and dependencies.
4. Design network segmentation and firewall policy.
5. Implement AD users, groups, and access tests.
6. Harden Ubuntu and Windows systems.
7. Configure Wazuh agents and collect key events.
8. Run Nmap and Greenbone/OpenVAS against approved targets.
9. Validate and remediate or mitigate one finding.
10. Build at least four detections or alert triage cases.
11. Run an incident tabletop for ransomware or insider misuse.
12. Test one restore or recovery process.
13. Prepare final reports and oral defense.

## Minimum Evidence

```text
scope-and-authorization.md
asset-inventory.md
data-classification.md
network-topology.md
firewall-rule-matrix.md
identity-access-design.md
linux-hardening-evidence.md
windows-ad-gpo-evidence.md
wazuh-monitoring-evidence.md
vulnerability-management-cycle.md
incident-response-tabletop.md
recovery-test.md
risk-register.md
technical-report.md
executive-summary.md
portfolio-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| User access | Least privilege is proven with allowed and denied tests |
| Network segmentation | Approved traffic works and blocked traffic is logged |
| System hardening | Linux and Windows controls are evidenced |
| Vulnerability cycle | Finding is scanned, validated, treated, and retested |
| SOC monitoring | Alerts are traced from source event to triage decision |
| Recovery | At least one restore or rollback is tested |
| Reporting | Management can understand risk and next decisions |

## Instructor Injects

Use at least four:

| Inject | Required response |
|---|---|
| Unknown device appears in server subnet | Verify, scope, risk-rank, and recommend action |
| Privileged group membership changes unexpectedly | Preserve evidence and triage |
| Wazuh agent disconnects | Troubleshoot telemetry path |
| Critical scanner finding conflicts with uptime requirement | Validate and propose treatment |
| User reports suspicious email | Triage and communicate without panic |
| Restore test fails | Escalate, troubleshoot, and update risk |

## Oral Defense

1. What was the most important asset?
2. What trust boundary mattered most?
3. How did you prove least privilege?
4. How did you prove segmentation?
5. What finding did you validate?
6. What alert did you triage?
7. What incident decision did you make?
8. What recovery evidence did you produce?
9. What risk remains?
10. What should management fund next?

## Recruiter-Visible Portfolio Artifact

Publish a sanitized capstone portfolio package with architecture diagrams, control evidence, validation tables, vulnerability lifecycle, SOC triage, incident response notes, recovery proof, and executive summary.

Completion does not guarantee employment, but this capstone should give students strong interview stories and concrete proof of foundational cybersecurity capability.

## Expanded Scenario

Northstar Manufacturing produces precision components for industrial customers. It has office users, engineering users, manufacturing support systems, internal servers, a supplier portal, and a small IT team. The company has no mature security program but wants practical improvement that can be defended with evidence.

Business concerns:

- Ransomware could stop production planning.
- Engineering documents could be exposed or modified.
- Flat networks increase lateral movement.
- Privileged accounts are not reviewed regularly.
- Logs exist but are not centralized or triaged.
- Vulnerability remediation is reactive.
- Recovery procedures are assumed, not tested.

The capstone question is:

```text
Can the team build a foundational security program that protects critical assets, validates controls, detects important activity, and communicates risk clearly?
```

## Required Business Services

| Service | Security concern |
|---|---|
| Engineering file access | Confidentiality and integrity |
| Supplier portal | DMZ exposure and TLS |
| Active Directory | Identity, privilege, and auditability |
| Ubuntu internal service | Hardening and vulnerability management |
| pfSense gateway | Segmentation and logging |
| Wazuh SOC | Detection and triage |
| Backup/recovery process | Availability |

## Capstone Work Packages

| Work package | Required student work | Evidence |
|---|---|---|
| WP01 - Governance | Scope, rules, roles, stop conditions, and communication plan | Governance pack |
| WP02 - Discovery | Asset inventory, data classification, services, owners, dependencies | Inventory |
| WP03 - Risk | Top 15 risks with likelihood, impact, controls, owner, and treatment | Risk register |
| WP04 - Architecture | Network zones, trust boundaries, admin paths, data flows | Diagrams |
| WP05 - Identity | AD users, groups, least privilege, disabled-user test, GPO | AD evidence |
| WP06 - Linux hardening | SSH, UFW, services, permissions, logs, rollback | Linux evidence |
| WP07 - Segmentation | pfSense rules, allowed tests, blocked tests, logs | Firewall evidence |
| WP08 - Monitoring | Wazuh agents, alert searches, triage notes, telemetry gap handling | SOC evidence |
| WP09 - Vulnerability | Nmap/OpenVAS scan, validation, treatment, rescan | Vulnerability lifecycle |
| WP10 - Incident | Tabletop or simulated investigation with timeline and decisions | IR report |
| WP11 - Recovery | Restore or rollback proof and business validation | Recovery evidence |
| WP12 - Executive briefing | Management summary, roadmap, and oral defense | Final reports |

## Minimum Validation Set

Students must prove:

| Area | Minimum validation |
|---|---|
| Identity | Authorized access allowed, unauthorized access denied, disabled user denied |
| Network | At least 10 allowed and 10 blocked firewall tests |
| Linux | Approved SSH works, root SSH denied, unnecessary exposure reduced |
| Windows | GPO applies and important event IDs are found |
| Wazuh | At least four events traced from source log to triage decision |
| Vulnerability | One finding scanned, validated, treated, and retested |
| Recovery | One service or data restore tested and documented |
| Reporting | Technical evidence supports executive recommendations |

## Required Final Reports

```text
1. Executive Summary
2. Scope and Authorization
3. Business Services and Critical Assets
4. Architecture and Trust Boundaries
5. Identity and Access Controls
6. Linux and Windows Hardening
7. Network Segmentation and Firewall Policy
8. Monitoring and Detection
9. Vulnerability Management
10. Incident Response Exercise
11. Backup and Recovery Test
12. Risk Register and Residual Risk
13. 30/60/90-Day Roadmap
14. Evidence Index
15. Limitations
```

## Portfolio Package

The sanitized portfolio package must include:

- One architecture diagram.
- One identity/access-control proof.
- One firewall allowed/blocked validation table.
- One Linux or Windows hardening before/after summary.
- One Wazuh triage case.
- One vulnerability lifecycle case.
- One incident or recovery decision record.
- One executive summary.

## Capstone Grading Emphasis

| Area | Weight |
|---|---:|
| Scope, ethics, and evidence hygiene | 10 |
| Architecture and risk reasoning | 15 |
| Technical implementation | 20 |
| Validation and troubleshooting | 20 |
| SOC and vulnerability workflows | 15 |
| Incident and recovery readiness | 10 |
| Executive communication and oral defense | 10 |

## Final Interview Stories

By the end, students should be able to confidently explain:

1. A time they reduced attack surface.
2. A time they proved denied access.
3. A time they found and validated a vulnerability.
4. A time they traced an event into a SIEM.
5. A time they handled a recovery or incident decision.
6. A time they explained technical risk to a nontechnical manager.
