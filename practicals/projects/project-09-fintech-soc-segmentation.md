# Project 09 - Build a SOC and Segmentation Plan for a Fintech Startup

## Portfolio Problem

A fintech startup needs basic segmentation, security monitoring, alert triage, and vulnerability visibility without buying enterprise tools.

## Combines Tools Learned

pfSense, Wazuh, Windows Server, Ubuntu Server, Kali, Nmap, Greenbone/OpenVAS, Suricata or Zeek, PowerShell, and Bash.

## Business Scenario

MeridianPay processes synthetic payment workflow data in a training environment. The startup has developers, support staff, payment services, an admin network, and a small SOC function. Management is worried about lateral movement, fraud-supporting access misuse, and missing logs.

## Required Outcomes

- Payment-like services are segmented from users and administration.
- Admin access is restricted and logged.
- Wazuh receives Windows and Linux telemetry.
- Network monitoring produces evidence for suspicious discovery or blocked access.
- Vulnerability assessment identifies and validates risks.
- SOC triage process creates useful decisions, not alert noise.

## Step-by-Step Completion Standard

Complete this project in an audit-ready order. Define payment-zone risk, design the network, configure pfSense rules, validate traffic paths, configure identity groups, enroll systems into Wazuh, run approved vulnerability checks, triage generated alerts, and write a fintech-ready report. Do not allow broad user-to-payment access as a final state.

## Required Work

1. Create asset and data-flow inventory.
2. Design USERS, PAYMENT-SERVICES, ADMIN, DMZ, and SOC segments.
3. Configure pfSense aliases and rules.
4. Validate allowed and blocked payment-service paths.
5. Onboard required endpoints to Wazuh.
6. Add Suricata or Zeek evidence if available.
7. Build detections for suspicious discovery, privileged access, telemetry loss, and repeated authentication failures.
8. Run Nmap/OpenVAS against approved internal targets.
9. Validate one vulnerability finding.
10. Produce SOC operating procedure and executive risk summary.

## Minimum Evidence

```text
asset-inventory.md
payment-data-flow.md
network-zone-design.md
pfsense-rule-matrix.md
allowed-blocked-tests.md
wazuh-agent-proof.md
alert-triage-notes.md
network-monitoring-evidence.md
vulnerability-assessment-summary.md
validated-finding.md
soc-runbook.md
executive-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| User to payment admin port | Blocked |
| Approved admin to server management | Allowed and logged |
| Wazuh Linux event | Visible and triaged |
| Wazuh Windows event | Visible and triaged |
| Suspicious discovery simulation | Alert or network evidence exists |
| Vulnerability finding | Validated or challenged with evidence |

## Oral Defense

1. What makes fintech segmentation different from a normal office?
2. Which logs are most important for suspicious payment access?
3. How did you reduce alert noise?
4. What vulnerability deserved attention first?
5. What would you improve with a budget?

## Recruiter-Visible Portfolio Artifact

Publish a sanitized fintech SOC case study showing segmentation, telemetry flow, alert triage, vulnerability validation, and management communication.

## Expanded Scenario

MeridianPay is a fintech startup building a synthetic payment workflow platform for training. It has developers, support users, an internal payment API, an admin jump host, a small database server, and a SOC dashboard. The company cannot afford enterprise tooling yet, but it must show investors that basic security operations are disciplined.

Current state:

- Developers and support users can reach too many systems.
- Payment-like services are not clearly separated from user workstations.
- Admin activity is not consistently logged.
- Wazuh is installed but alert ownership is unclear.
- Network security monitoring is optional and poorly understood.
- Vulnerability findings are discussed but not validated.

The business problem is:

```text
Can MeridianPay prove payment-service segmentation, useful telemetry, alert triage, and vulnerability visibility with no-cost tools?
```

## Required Environment

| Segment | Purpose | Example systems |
|---|---|---|
| USERS | Support and developer workstations | Windows client, Kali only when approved |
| PAYMENT-SERVICES | Synthetic payment API and database | Ubuntu services |
| ADMIN | Controlled administration | Admin workstation or jump host |
| DMZ | Optional customer-facing portal | Web frontend |
| SOC | Monitoring | Wazuh, optional Suricata/Zeek |

## Work Packages

| Work package | Required student work | Evidence |
|---|---|---|
| WP01 - Business process | Map synthetic payment workflow and sensitive data | Data-flow diagram |
| WP02 - Asset inventory | Identify systems, owners, services, and dependencies | Inventory |
| WP03 - Segmentation | Design and implement pfSense rules | Rule matrix and logs |
| WP04 - Admin control | Restrict management ports to approved admin sources | Allowed/blocked tests |
| WP05 - Telemetry | Onboard Windows/Linux systems to Wazuh | Agent proof |
| WP06 - Network evidence | Use Suricata, Zeek, pfSense logs, or packet evidence if available | Network evidence |
| WP07 - Detection | Create triage cases for suspicious discovery, privileged access, failed logins, and telemetry loss | Alert pack |
| WP08 - Vulnerability | Run scoped Nmap/OpenVAS review and validate one finding | Finding worksheet |
| WP09 - SOC process | Build queue, severity, owner, escalation, and closure process | SOC runbook |
| WP10 - Reporting | Present risk, control evidence, and next budget priorities | Reports |

## Required Security Questions

Students must answer:

1. Which systems process payment-like data?
2. Which users can reach those systems?
3. Which ports are required for business?
4. Which admin paths are allowed?
5. Which logs prove access and blocked traffic?
6. Which alerts require immediate review?
7. Which vulnerability creates the highest business risk?
8. What remains manual because the company has limited budget?

## Required Detection and Triage Cases

| Case | Required evidence |
|---|---|
| Suspicious discovery from user network | Nmap/pfSense/Wazuh/network evidence |
| Privileged access outside admin path | Windows/Linux/Wazuh evidence |
| Repeated authentication failures | Raw event and alert |
| Telemetry loss | Agent disconnect and recovery |
| Vulnerability finding | Scanner evidence and manual validation |

## Instructor Injects

| Inject | Expected response |
|---|---|
| Support user needs emergency database access | Evaluate request, least privilege, time limit, approval, and logging |
| Alert flood during testing | Tune process without disabling important visibility |
| Payment API becomes unreachable | Troubleshoot firewall, service state, DNS, and logs |
| Investor asks whether the company is "secure" | Explain evidence, limits, and roadmap honestly |

## Technical Report Template

```text
1. Executive Summary
2. Scope and Business Workflow
3. Asset and Data Inventory
4. Network Segmentation Design
5. Firewall Rule Matrix and Tests
6. Administrative Access Control
7. Wazuh Telemetry Architecture
8. Alert Triage Cases
9. Network Monitoring Evidence
10. Vulnerability Assessment
11. SOC Runbook
12. Residual Risk
13. Budget and Roadmap Recommendations
14. Evidence Index
```
