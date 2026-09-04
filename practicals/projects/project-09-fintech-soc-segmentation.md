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
