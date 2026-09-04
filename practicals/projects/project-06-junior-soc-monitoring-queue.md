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
