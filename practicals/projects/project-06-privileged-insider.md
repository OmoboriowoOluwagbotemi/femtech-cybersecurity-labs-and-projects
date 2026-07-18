# Project 06 - Investigate a Privileged Insider

## Scenario

FEMTECH's finance lead reports that a confidential salary file was accessed outside working hours. The account belongs to a systems administrator who was on leave, but the administrator says a scheduled process may be responsible. Management wants a fair, evidence-based investigation and explicitly forbids premature accusations.

**Duration:** 2 weeks
**Tools:** Active Directory, Windows Event Logs, PowerShell, Wazuh, pfSense logs, Volatility 3 where evidence is supplied, SHA-256 tools
**Lessons:** 17-21, 30-36, 38

## Investigation Principles

- An account is not a person.
- Privilege, shared systems, automation, remote access, token theft, and log gaps create alternative explanations.
- Preserve privacy and need-to-know.
- Separate HR/legal decisions from technical facts.
- Do not notify, disable, image, or search a user's personal device without authority.

## Phase 1 - Authority and Questions

Record legal/HR sponsor, systems, accounts, dates, permitted evidence, prohibited sources, retention, and reporting audience. Form hypotheses:

1. Authorised scheduled job.
2. Administrator intentionally accessed the file.
3. Credentials/session were misused by another actor.
4. Logging/identity attribution is wrong.

Define evidence that could support or disprove each.

## Phase 2 - Preserve Identity and Access Evidence

On the domain controller/analysis host:

```powershell
$Start = Get-Date '2026-07-17T00:00:00'
$End = Get-Date '2026-07-18T00:00:00'
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624,4625,4634,4648,4672,4688; StartTime=$Start; EndTime=$End} |
  Select-Object TimeCreated,Id,RecordId,MachineName,Message |
  Export-Csv .\evidence\identity-window.csv -NoTypeInformation
Get-ADUser <ACCOUNT> -Properties Enabled,MemberOf,LastLogonDate,PasswordLastSet,whenChanged
Get-ADGroupMember 'Domain Admins'
```

Do not rely on `LastLogonDate` for precise forensic timing; correlate source events and domain controllers.

## Phase 3 - Correlate File and Process Activity

Use provided file-server audit events, Wazuh records, scheduled tasks, services, and process creation. Query:

```powershell
Get-ScheduledTask | Where-Object {$_.Principal.UserId -match '<ACCOUNT_OR_SERVICE>'} |
  Select-Object TaskPath,TaskName,State,@{n='RunAs';e={$_.Principal.UserId}}
Get-ScheduledTaskInfo -TaskName '<TASK_NAME>' -TaskPath '<TASK_PATH>'
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4663; StartTime=$Start; EndTime=$End} |
  Where-Object Message -match 'salary|payroll' |
  Select-Object TimeCreated,RecordId,Message
```

Assess logon type, source workstation/IP, authentication package, logon ID, process, scheduled-task history, and file object. Correlate by logon ID where possible.

## Phase 4 - Network and Endpoint Correlation

Review pfSense/VPN records and endpoint evidence. Establish whether the alleged source could reach the server and whether telemetry was healthy. If memory evidence is supplied, use Volatility to inspect sessions, processes, and connections without treating one artefact as conclusive.

## Phase 5 - Timeline and Competing Hypotheses

Build a UTC timeline with evidence locators and confidence. For every significant claim, identify corroboration and contradictory evidence. Include clock drift, NAT, jump host, shared service account, cached session, log retention, and audit-policy limitations.

## Phase 6 - Proportionate Control Improvement

Regardless of attribution, propose controls:

- Separate named admin accounts.
- Eliminate shared privileged credentials.
- Privileged access workstation or ADMIN segment.
- Time-bound group membership and approvals.
- File-object auditing for crown jewels.
- Service-account inventory and managed secrets.
- Alerting on unusual privileged access and telemetry gaps.
- Quarterly access recertification.

Test one control using a synthetic account and positive/negative evidence.

## Injects

1. HR asks for the employee's personal browsing history, which is outside scope.
2. The VPN address is shared by several administrators.
3. File access auditing was enabled only after the event.
4. A scheduled task exists but was modified two days earlier by an unknown actor.

## Deliverables

- Signed investigation scope and privacy handling plan.
- Evidence/chain register and integrity hashes.
- Identity, file, process, task, network, and telemetry analysis.
- Timeline and four-hypothesis matrix.
- Findings that avoid personal attribution beyond evidence.
- Tested privileged-access improvement and management briefing.

## Assessment Emphasis

Students lose points for accusation, confirmation bias, scope expansion, or treating absence of logs as proof of absence. They gain points for disciplined uncertainty and fair alternative hypotheses.
