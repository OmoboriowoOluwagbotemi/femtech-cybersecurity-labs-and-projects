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
