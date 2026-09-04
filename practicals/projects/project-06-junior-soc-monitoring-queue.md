# Project 06 - Operate a Junior SOC Monitoring Queue

## Portfolio Problem

A company has endpoint logs but no junior analyst process. Students must onboard systems, generate benign events, search alerts, triage one case, tune one noisy alert, and explain telemetry gaps.

## Validates

Tool Lab 06 - Wazuh SIEM/XDR Operations.

## Business Scenario

BlueRiver Services has a Windows server, a Windows workstation, and an Ubuntu server. Management wants basic SOC visibility before hiring a full-time analyst. Your team must prove that important events reach Wazuh and can be triaged responsibly.

## Required Outcomes

- Wazuh manager health is verified.
- Linux and Windows agents are active.
- Authentication, file change, and Windows Security events are generated safely.
- Alerts are searched and interpreted.
- One triage note is completed.
- One telemetry failure is simulated with approval and recovered.
- One tuning recommendation is written.

## Step-by-Step Completion Standard

Complete this project like a SOC shift. First verify Wazuh health, then confirm agents, then generate approved test events, then search alerts, then open each case, then collect supporting endpoint evidence, then decide severity, then write analyst notes, then identify tuning opportunities. Do not close an alert without evidence and explanation.

## Required Work

1. Verify Wazuh services, ports, time, disk, memory, and dashboard access.
2. Onboard Ubuntu agent.
3. Onboard Windows agent.
4. Generate failed and successful SSH activity.
5. Generate an approved file integrity monitoring event.
6. Generate Windows logon or account-change events.
7. Search Wazuh by agent name, time range, user, and event terms.
8. Complete one triage note.
9. Stop one agent briefly with approval and document telemetry loss.
10. Restart the agent and prove recovery.
11. Recommend tuning without hiding real risk.

## Minimum Evidence

```text
01-manager-health.txt
02-agent-list.txt
03-linux-agent-log.txt
04-windows-agent-log.txt
05-linux-auth-local-log.txt
06-linux-alert-proof.png
07-fim-alert-proof.png
08-windows-event-proof.txt
09-windows-alert-proof.png
10-triage-note.md
11-telemetry-loss-recovery.md
12-tuning-recommendation.md
technical-report.md
executive-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| Agent health | Linux and Windows agents active |
| Linux auth event | Local log and Wazuh evidence match |
| FIM event | File change appears or documented local evidence exists |
| Windows event | Event Viewer and Wazuh evidence are connected |
| Triage | Alert is classified with evidence |
| Telemetry failure | Disconnection and recovery are documented |

## Oral Defense

1. What is the difference between a raw event and an alert?
2. Why is time range important in SIEM searches?
3. Why is a failed login not automatically an incident?
4. What risk does agent disconnection create?
5. How would you explain this alert to a manager?

## Recruiter-Visible Portfolio Artifact

Create a sanitized SOC triage case study with data flow, alert screenshots, raw event notes, triage decision, telemetry troubleshooting, and tuning recommendation.

## Expanded Scenario

BlueRiver Services has recently deployed Wazuh, but nobody has a clear analyst workflow. Logs appear in the dashboard, yet alerts are not consistently triaged, evidence is not recorded, and management receives either too much technical detail or no useful summary.

The business problem is to create a junior SOC workflow that answers:

```text
Did the activity happen, which system reported it, why does it matter, what should we do, and what evidence supports the decision?
```

## Required Environment

| System | Role | Example evidence |
|---|---|---|
| Wazuh server | Manager, indexer, dashboard | Service health, listener ports |
| Ubuntu agent | Linux endpoint | SSH logs, FIM events |
| Windows agent | Windows endpoint | Event Viewer and Wazuh alerts |
| Kali | Approved test source | Benign authentication tests |
| pfSense | Optional network evidence | Firewall logs |

## Work Packages

| Work package | Required student work | Evidence |
|---|---|---|
| WP01 - SOC scope | Define monitored systems, data sources, alert types, and prohibited tests | SOC scope record |
| WP02 - Manager health | Verify Wazuh services, ports, disk, memory, and time | Manager evidence |
| WP03 - Agent onboarding | Prove Linux and Windows agents are connected | Agent list and logs |
| WP04 - Event generation | Generate approved Linux, Windows, and FIM events | Local endpoint logs |
| WP05 - Dashboard search | Search by agent, time, user, source IP, rule ID, and event text | Search evidence |
| WP06 - Triage | Complete one full alert triage note | Triage report |
| WP07 - Telemetry failure | Stop one agent with approval, detect gap, recover agent | Timeline |
| WP08 - Tuning | Recommend one safe tuning change without hiding risk | Tuning note |
| WP09 - Management update | Write a short nontechnical status update | Executive note |

## Alert Decision Types

| Decision | Meaning |
|---|---|
| Benign true positive | Activity happened and was authorized |
| Suspicious | Activity needs more investigation |
| Incident | Evidence shows security impact or active compromise |
| False positive | Alert logic does not match real activity |
| Tuning candidate | Alert is valid but too noisy in current form |

Students must not call an alert an incident only because the dashboard shows a high rule level.

## Required Triage Fields

```text
Alert title:
Rule ID:
Rule level:
Agent:
Source IP:
User:
Source event time:
Dashboard/index time:
Raw event:
Observed behavior:
Likely explanation:
Possible malicious explanation:
CIA impact:
Decision:
Recommended action:
Evidence references:
```

## Required SOC Tests

| Test | Expected result |
|---|---|
| Failed SSH login from Kali | Ubuntu log and Wazuh event exist |
| Successful SSH login | Activity is visible and explained |
| File change in monitored path | FIM event appears or limitation is documented |
| Failed Windows logon | Event Viewer and Wazuh evidence are connected |
| Agent stopped | Dashboard or manager shows telemetry loss |
| Agent restarted | Endpoint returns to active status |

## Instructor Injects

| Inject | Expected response |
|---|---|
| Alert flood after lab testing | Separate expected lab noise from suspicious behavior |
| Windows event visible locally but not in Wazuh | Check agent, channel configuration, and time range |
| Linux agent disconnected | Troubleshoot service, network, manager ports, and logs |
| Manager dashboard time is wrong | Check time range, timezone, and event timestamps |

## Technical Report Template

```text
1. Executive Summary
2. SOC Scope
3. Wazuh Architecture and Data Flow
4. Manager Health Evidence
5. Agent Onboarding Evidence
6. Event Generation
7. Dashboard Search Method
8. Alert Triage Case
9. Telemetry Failure and Recovery
10. Tuning Recommendation
11. Residual Monitoring Gaps
12. Recommendations
13. Evidence Index
```
