# Project 06 Solution - Junior SOC Monitoring Queue

## Target Outcome

The student operates a small SOC queue using Wazuh, investigates generated alerts, separates true positives from benign activity, documents evidence, and writes analyst notes that can be reviewed by a senior analyst.

## Reference Environment

| Component | Example |
|---|---|
| SIEM/XDR platform | Wazuh |
| Linux endpoint | Ubuntu Server |
| Windows endpoint | Windows Server or Windows client |
| Analyst VM | Kali or host browser |
| Evidence folder | `~/femtech-projects/project-06-soc-queue/evidence` |

## Step 1 - Prepare the Case Folder

```bash
mkdir -p ~/femtech-projects/project-06-soc-queue/evidence/{01-health,02-agents,03-alerts,04-triage,05-report}
cd ~/femtech-projects/project-06-soc-queue
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee evidence/01-health/start-time-utc.txt
```

Every alert investigation should have enough evidence for another analyst to understand what happened without asking the original student.

## Step 2 - Verify Wazuh Health

On the Wazuh server:

```bash
sudo systemctl status wazuh-manager --no-pager | tee evidence/01-health/wazuh-manager-status.txt
sudo systemctl status wazuh-indexer --no-pager | tee evidence/01-health/wazuh-indexer-status.txt
sudo systemctl status wazuh-dashboard --no-pager | tee evidence/01-health/wazuh-dashboard-status.txt
sudo systemctl status filebeat --no-pager | tee evidence/01-health/filebeat-status.txt
sudo /var/ossec/bin/wazuh-control status | tee evidence/01-health/wazuh-control-status.txt
sudo ss -lntp | tee evidence/01-health/listening-ports.txt
```

Expected result: Wazuh manager, indexer, dashboard, and filebeat should be running. If one service is down, document the issue before fixing it.

## Step 3 - Confirm Agent Enrollment

From the Wazuh manager:

```bash
sudo /var/ossec/bin/agent_control -lc | tee evidence/02-agents/connected-agents.txt
```

In the Wazuh dashboard:

1. Open `Agents`.
2. Confirm Linux and Windows agents are active.
3. Capture agent names, IP addresses, operating systems, and last keep-alive times.

Evidence table:

| Agent | OS | IP | Status | Purpose |
|---|---|---|---|---|
| `ubuntu01` | Ubuntu Server | Lab IP | Active | Linux log source |
| `win01` | Windows | Lab IP | Active | Windows event source |

If an agent is disconnected, troubleshoot:

```bash
sudo systemctl status wazuh-agent --no-pager
sudo tail -n 50 /var/ossec/logs/ossec.log
```

On Windows, check the Wazuh Agent service and the manager IP.

## Step 4 - Generate Linux Authentication Alerts

On the Linux endpoint, create benign test activity:

```bash
whoami
hostname
sudo tail -n 20 /var/log/auth.log
```

From Kali or another approved lab system, attempt one failed SSH login:

```bash
ssh fakeuser@UBUNTU_SERVER_IP
```

Then perform one successful approved login if credentials are available:

```bash
ssh approveduser@UBUNTU_SERVER_IP
```

Collect Linux evidence:

```bash
sudo grep -Ei 'failed|accepted|invalid user|sshd' /var/log/auth.log | tail -n 40 |
  tee ~/project-06-linux-auth-evidence.txt
```

Dashboard search examples:

```text
agent.name: ubuntu01 AND sshd
rule.description: *sshd*
data.srcip: KALI_IP
```

Expected analyst note: failed login by a known student lab source is low severity if isolated, but repeated failures from an unknown host would require escalation.

## Step 5 - Generate File Integrity Monitoring Evidence

On the Linux endpoint, use an approved monitored path if configured. If `/etc` is monitored:

```bash
sudo cp /etc/hosts /etc/hosts.project06.backup
echo "# project 06 test" | sudo tee -a /etc/hosts
sudo mv /etc/hosts.project06.backup /etc/hosts
```

If the instructor provides a safer monitored lab directory, use that directory instead.

Search in Wazuh:

```text
rule.groups: syscheck
agent.name: ubuntu01
```

Evidence should show file modified, time, agent, path, and rule description.

## Step 6 - Generate Windows Security Events

On the Windows endpoint, create controlled events:

```powershell
whoami
hostname
Get-Date
```

Perform:

1. One successful sign-in.
2. One failed sign-in.
3. One local group membership check.

Collect local evidence:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4732,4733} -MaxEvents 20 |
  Select-Object TimeCreated,Id,ProviderName,Message |
  Out-File C:\project-06-windows-security-events.txt
```

Dashboard search examples:

```text
data.win.system.eventID: 4625
data.win.system.eventID: 4624
agent.name: win01
```

Expected analyst note: Windows logon events must be interpreted with account name, source host, logon type, time, and whether the activity matches expected behavior.

## Step 7 - Triage Five Alerts

Create a triage table:

| Alert | Source | What happened | Evidence | Severity | Decision |
|---|---|---|---|---|---|
| Failed SSH login | Ubuntu | Invalid user attempted SSH | `auth.log`, Wazuh alert | Low | Benign lab activity |
| Successful SSH login | Ubuntu | Approved user signed in | Wazuh alert | Informational | Closed |
| File changed | Ubuntu | Monitored file changed | Wazuh syscheck | Medium | Approved test |
| Failed Windows logon | Windows | Incorrect password | Event ID 4625 | Low | Monitor |
| Agent disconnected | Endpoint | Telemetry gap | Agent status | Medium | Escalate if unexplained |

Each case note must include:

- Alert name and time.
- Affected asset.
- User or source IP.
- What evidence was checked.
- Analyst decision.
- Recommended next action.

## Step 8 - Identify False Positives and Tuning Options

Do not silence alerts just because they are noisy. Tuning must preserve security value.

Good tuning examples:

| Situation | Better tuning decision |
|---|---|
| Expected admin login from known jump box | Lower severity or add context |
| Repeated fake lab user SSH attempts | Keep detection, document lab source |
| Frequent known software file changes | Monitor exact approved path and process |
| Endpoint disconnected | Escalate if longer than approved outage window |

## Step 9 - Write Escalation Notes

Escalate when:

- Multiple failed logins come from an unknown source.
- A privileged account is involved.
- File integrity changes affect sensitive paths.
- An endpoint stops sending logs.
- Activity happens outside the approved lab window.

Escalation note format:

```text
Title:
Severity:
Affected asset:
User/source:
Observed behavior:
Evidence reviewed:
Why this matters:
Recommended action:
```

## Step 10 - Final SOC Report

The report must include:

- Wazuh health proof.
- Agent enrollment proof.
- Five investigated alerts.
- One false positive explanation.
- One escalation example.
- One detection tuning recommendation.
- Evidence index.
- Lessons learned.

## Pass Standard

The project is complete when the student can show Wazuh is healthy, agents are reporting, alerts were investigated, evidence supports each decision, and the final notes sound like a real SOC analyst wrote them.
