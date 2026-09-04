# Tool Lab 06 - Wazuh SIEM/XDR Operations

## Purpose

Wazuh gives students practical SOC experience: endpoint agents, log collection, file integrity monitoring, alert search, triage, tuning, and telemetry troubleshooting.

## Scenario

FEMTECH needs visibility into Linux and Windows activity. You will deploy or use a Wazuh manager, onboard endpoints, generate benign security events, confirm alerts, and write a triage note.

## Systems

| System | Role | Example address |
|---|---|---|
| Wazuh server | Manager, indexer, dashboard | `10.10.40.10` |
| Ubuntu Server | Linux agent | `10.10.20.20` |
| Windows Server/client | Windows agent | `10.10.20.10` or `10.10.10.50` |
| Kali | Test source | `10.10.10.60` |
| pfSense | Firewall/log source | Segment gateways |

## Step 1 - Prepare Evidence

```bash
mkdir -p ~/femtech-evidence/wazuh-tool-lab/{01-manager,02-agents,03-events,04-alerts,05-troubleshooting,06-report}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee ~/femtech-evidence/wazuh-tool-lab/session-start-utc.txt
script -af ~/femtech-evidence/wazuh-tool-lab/command-log.txt
```

## Step 2 - Verify Wazuh Manager Health

On `wazuh01`:

```bash
hostnamectl | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/hostname.txt
ip -br address | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/ip-address.txt
free -h | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/memory.txt
df -h / | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/disk.txt
sudo systemctl status wazuh-manager wazuh-indexer wazuh-dashboard filebeat --no-pager \
  | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/service-status.txt
sudo /var/ossec/bin/wazuh-control status | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/wazuh-control.txt
sudo ss -lntp | grep -E ':1514|:1515|:443|:9200' \
  | tee ~/femtech-evidence/wazuh-tool-lab/01-manager/listeners.txt
```

If Wazuh is not installed, use the current official quickstart approved by the instructor and preserve installation evidence. Do not print secrets into reports.

## Step 3 - Onboard Ubuntu Agent

On Ubuntu:

```bash
sudo systemctl status wazuh-agent --no-pager
sudo grep -nA3 '<server>' /var/ossec/etc/ossec.conf
sudo tail -n 50 /var/ossec/logs/ossec.log
nc -vz -w 3 10.10.40.10 1514
nc -vz -w 3 10.10.40.10 1515
```

If the agent is not installed, install it using the current package method approved by the instructor and set:

```text
WAZUH_MANAGER=10.10.40.10
WAZUH_AGENT_NAME=lin01
```

On the manager:

```bash
sudo /var/ossec/bin/agent_control -lc | tee ~/femtech-evidence/wazuh-tool-lab/02-agents/agent-list.txt
```

## Step 4 - Onboard Windows Agent

On Windows:

1. Install the Wazuh agent using the approved installer.
2. Set the manager IP to `10.10.40.10`.
3. Name the agent clearly, such as `win11-01` or `dc01`.
4. Start the agent service.

PowerShell evidence:

```powershell
Get-Service WazuhSvc
Get-Content "C:\Program Files (x86)\ossec-agent\ossec.log" -Tail 50
Test-NetConnection 10.10.40.10 -Port 1514
Test-NetConnection 10.10.40.10 -Port 1515
```

Export screenshots or text output without exposing secrets.

## Step 5 - Generate Linux Authentication Events

From Kali, attempt two failed SSH logins to Ubuntu, then one approved successful login.

On Ubuntu:

```bash
sudo tail -n 80 /var/log/auth.log | tee ~/femtech-evidence/wazuh-tool-lab/03-events/ubuntu-auth-events.txt
```

In Wazuh dashboard, search:

```text
agent.name: lin01 AND (sshd OR authentication)
```

Record:

- Raw event.
- Agent name.
- Source IP.
- Username.
- Rule ID.
- Rule level.
- Timestamp.
- Dashboard time range.

## Step 6 - Generate File Integrity Monitoring Event

On Ubuntu:

```bash
sudo install -d -o root -g root -m 0755 /opt/femtech-critical
echo 'approved baseline' | sudo tee /opt/femtech-critical/config.txt
echo 'authorised change' | sudo tee -a /opt/femtech-critical/config.txt
```

If `/opt/femtech-critical` is not monitored, add it under the Wazuh agent syscheck configuration using instructor-approved syntax, validate configuration, and restart the agent.

Find the FIM alert in Wazuh and explain why file change is not automatically malicious.

## Step 7 - Generate Windows Security Events

On Windows, perform:

1. One failed logon.
2. One successful logon.
3. One test local user creation or group membership change if authorised.

PowerShell evidence:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4720,4732; StartTime=(Get-Date).AddHours(-2)} |
  Select-Object TimeCreated,Id,ProviderName,Message |
  Format-List |
  Out-File C:\FEMTECH-Wazuh-Windows-Events.txt
```

Search Wazuh for the same time window and record matching alerts.

## Step 8 - Triage One Alert

Complete this triage note:

```text
Alert title:
Rule ID and level:
Agent:
Source IP:
User:
Observed behavior:
Confirmed evidence:
Possible benign explanation:
Possible malicious explanation:
CIA impact:
Recommended action:
Severity:
Reason for severity:
```

## Step 9 - Simulate Telemetry Failure

With instructor approval, stop the Ubuntu agent for five minutes:

```bash
sudo systemctl stop wazuh-agent
date -u
```

Observe dashboard and manager status. Recover:

```bash
sudo systemctl start wazuh-agent
sudo systemctl is-active wazuh-agent
sudo tail -n 50 /var/ossec/logs/ossec.log
```

Explain why a disconnected security agent is a risk.

## Step 10 - Tune One Noisy Alert

Choose one alert that is expected in the lab. Do not disable monitoring globally. Write a tuning recommendation:

```text
Alert:
Why it is noisy:
What risk remains:
Recommended tuning:
Who approves:
Review date:
```

## Deliverables

- Wazuh manager health evidence.
- Ubuntu agent evidence.
- Windows agent evidence.
- Linux authentication alert.
- FIM alert.
- Windows security alert.
- One triage note.
- Telemetry failure and recovery timeline.
- Tuning recommendation.
- Management summary.

## Pass Condition

The student passes when they can trace an event from endpoint log to Wazuh alert, explain the alert professionally, troubleshoot telemetry failure, and recommend proportionate response.

## Complete Lab Support

### Beginner Concepts

| Concept | Simple meaning | Wazuh example |
|---|---|---|
| SIEM | Platform for collecting and searching security events | Wazuh dashboard |
| Agent | Software installed on endpoint to send telemetry | Wazuh agent on Ubuntu |
| Manager | Server that receives and analyzes agent data | Wazuh manager |
| Indexer | Stores searchable events | Wazuh indexer |
| Dashboard | Web interface for search and review | Wazuh dashboard |
| Rule | Logic that creates an alert | Failed SSH login rule |
| Alert | Security event needing review | Authentication failure |
| FIM | File integrity monitoring | Detects file changes |
| Telemetry | Security data collected from systems | Logs, FIM, agent status |
| Triage | First review of alert meaning and urgency | Confirm benign or suspicious |

### Preflight Checklist

```text
Wazuh server IP:
Ubuntu agent IP:
Windows agent IP:
Dashboard URL:
Instructor-approved credentials stored safely:
Time synchronized:
Firewall permits agent ports:
No production logs used:
```

### Wazuh Data Flow

Students must be able to explain this chain:

```text
Endpoint event
 -> Wazuh agent
 -> Wazuh manager
 -> Decoder/rule
 -> Indexer
 -> Dashboard search
 -> Analyst triage
 -> Recommendation
```

If an alert is missing, test the chain from left to right. Do not start by changing rules.

### Required Health Checks

On the manager:

```bash
sudo /var/ossec/bin/wazuh-control status
sudo /var/ossec/bin/agent_control -lc
sudo systemctl status wazuh-manager wazuh-indexer wazuh-dashboard filebeat --no-pager
sudo journalctl -u wazuh-manager -n 50 --no-pager
```

On Linux agent:

```bash
sudo systemctl status wazuh-agent --no-pager
sudo tail -n 80 /var/ossec/logs/ossec.log
```

On Windows agent:

```powershell
Get-Service WazuhSvc
Get-Content "C:\Program Files (x86)\ossec-agent\ossec.log" -Tail 80
```

### Alert Evidence Standard

For every alert, record:

```text
Alert name:
Rule ID:
Rule level:
Agent name:
Agent IP:
Source event time:
Dashboard/index time:
User:
Source IP:
Raw event:
Analyst interpretation:
Recommended action:
```

### Linux Event Exercise

Generate only benign activity:

1. Failed SSH login.
2. Successful approved SSH login.
3. Approved file creation or modification.

The student must show:

- Local Ubuntu log.
- Wazuh raw event or alert.
- Dashboard search filter.
- Explanation of what is confirmed.
- Explanation of what is not confirmed.

### Windows Event Exercise

Generate only instructor-approved activity:

1. Failed Windows logon.
2. Successful Windows logon.
3. Test local user or group change if allowed.

The student must connect:

- Windows Event Viewer evidence.
- Wazuh evidence.
- Rule ID or indexed fields.
- Analyst triage decision.

### Troubleshooting Matrix

| Problem | First place to check | Reason |
|---|---|---|
| No local event | Endpoint log | Wazuh cannot collect what does not exist |
| Agent disconnected | Agent service/log | Collection path is broken |
| Agent connected but no alert | Rules/decoder/search | Event may be indexed but not alerted |
| Dashboard shows wrong time | Time range/time zone | Many missed alerts are search-window problems |
| Linux event present, Wazuh missing | Agent config and manager ports | Collection or transport issue |
| Windows event present, Wazuh missing | Agent event channel config | Channel may not be collected |

### Triage Report Template

```text
Title: Wazuh Alert Triage Report

1. Alert Summary
2. Scope
3. Evidence
4. Analysis
5. Severity
6. Recommended Response
7. Tuning Recommendation
8. Management Summary
```

### Student Must Explain

- Why agent health matters.
- Why time synchronization matters.
- Why a failed login alone is not automatically an incident.
- Why file integrity monitoring proves a change but not attacker intent.
- Why alert tuning must not hide real risk.
