# Lab 13 - Engineer and Tune a Detection

## Mission

The SOC wants to detect suspicious creation of a privileged local account without alerting on every authorised help-desk action. Develop the detection from hypothesis to production recommendation using Windows events, Wazuh, ATT&CK mapping, and a controlled test suite.

**Lessons:** 2, 30-32, 34
**Time:** 5 hours
**Systems:** `win11-01` with Wazuh agent and `wazuh01`

## Detection Requirements

Detect a new local user followed by addition to the local Administrators group within ten minutes. Exclude only a documented automation account during an approved change window. Do not automatically block.

## Step 1 - Write the Detection Specification

Before touching a rule, document:

- Threat hypothesis and business risk.
- Required events: 4720 for user creation and 4732 for local-group membership change.
- Required fields: host, actor, target account, group, logon/session identifier, timestamp.
- Time window and correlation key.
- Expected benign sources.
- ATT&CK technique candidate and why it fits.
- Positive, negative, boundary, and regression tests.
- Triage steps and owner.

Event IDs are not universal truth; validate the actual event on the monitored OS and audit policy.

## Step 2 - Generate a Known Positive Dataset

On Windows, elevated:

```powershell
$Start = Get-Date
$Password = Read-Host 'Temporary lab password' -AsSecureString
New-LocalUser -Name 'svc-lab-admin' -Password $Password -Description 'LAB13 synthetic account'
Add-LocalGroupMember -Group 'Administrators' -Member 'svc-lab-admin'
Start-Sleep -Seconds 10
Remove-LocalGroupMember -Group 'Administrators' -Member 'svc-lab-admin'
Remove-LocalUser -Name 'svc-lab-admin'
```

Preserve source events:

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4720,4732,4733,4726; StartTime=$Start} |
  Select-Object TimeCreated,Id,RecordId,MachineName,Message |
  Format-List | Out-File "$Evidence\LAB13-source-events.txt"
```

Do not leave the account or membership in place.

## Step 3 - Inspect Wazuh Normalisation

In the Wazuh dashboard, search the agent and event IDs. Record the exact indexed field names. On the manager, inspect candidate alerts:

```bash
sudo jq -c 'select(.data.win.system.eventID=="4720" or .data.win.system.eventID=="4732")' \
  /var/ossec/logs/alerts/alerts.json | tail -n 20
```

Field paths may differ by version or event. Build rules from observed data, not memory.

## Step 4 - Create Narrow Local Rules

Back up `/var/ossec/etc/rules/local_rules.xml`. Add a dedicated group with IDs in the local range:

```xml
<group name="femtech,windows,account_change,">
  <rule id="100100" level="5">
    <field name="win.system.eventID">^4720$</field>
    <description>FEMTECH local account created: $(win.eventdata.targetUserName)</description>
    <options>no_full_log</options>
    <mitre>
      <id>T1136.001</id>
    </mitre>
  </rule>

  <rule id="100101" level="10" frequency="2" timeframe="600">
    <if_matched_sid>100100</if_matched_sid>
    <field name="win.system.eventID">^4732$</field>
    <field name="win.eventdata.targetUserName">Administrators</field>
    <same_source_ip />
    <description>FEMTECH account creation followed by privileged-group change</description>
    <mitre>
      <id>T1098</id>
    </mitre>
  </rule>
</group>
```

This example may require adjustment because Windows event correlation is better keyed by host, actor, target account, or session than `source_ip`. Treat the rule as an engineering starting point, validate actual fields, and document any limitation. Never claim correlation works until tests prove it.

## Step 5 - Test Before Restarting

Use `wazuh-logtest` with copied raw event JSON:

```bash
sudo /var/ossec/bin/wazuh-logtest
```

Paste one event at a time and inspect decoder, rule, and fields. Then validate manager configuration:

```bash
sudo /var/ossec/bin/wazuh-analysisd -t
sudo systemctl restart wazuh-manager
sudo systemctl is-active wazuh-manager
sudo tail -n 50 /var/ossec/logs/ossec.log
```

A rule that prevents the manager from starting is a failed change and must be rolled back immediately.

## Step 6 - Execute a Test Suite

Run and record:

1. Positive: create account and add to Administrators within ten minutes.
2. Negative: create account but never add it.
3. Negative: add an existing approved account to a nonprivileged group.
4. Boundary: privileged addition after more than the configured window, using an instructor-shortened window for class time.
5. Regression: ordinary logon and PowerShell events still ingest.
6. Evasion/coverage question: event logging disabled or agent offline.

For every test, preserve source event, Wazuh alert/non-alert, expected result, actual result, and reason.

## Step 7 - Tune Without Hiding Risk

If authorised automation creates false positives, prefer context:

- Approved actor identity.
- Managed source host.
- Change-ticket time window.
- Exact target naming pattern.
- Separate lower-severity audit rule.

Avoid broad exclusions such as all service accounts, all administrators, or the whole management subnet.

## Step 8 - Write the Triage Runbook

The analyst must:

1. Confirm source events and time order.
2. Identify actor, target, host, logon/session, and remote origin.
3. Check change ticket and account owner.
4. Review process creation and PowerShell near the event.
5. Query other hosts for the target account.
6. Determine current membership and active sessions.
7. Preserve evidence before disabling an account.
8. Escalate or close with reason and supporting evidence.

## Deliverables

- Detection specification and ATT&CK rationale.
- Source events and normalised field map.
- Validated local rule with version/change record.
- Six-test results and alert latency.
- False-positive analysis and tuning decision.
- Triage runbook, owner, monitoring metric, and rollback.
- Known limitations and likely blind spots.

## Professional Standard

A detection is not complete when it fires. It is complete when it is testable, owned, observable, triageable, measurable, safely deployable, and periodically revalidated.
