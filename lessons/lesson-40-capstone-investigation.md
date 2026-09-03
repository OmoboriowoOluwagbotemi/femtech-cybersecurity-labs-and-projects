# Lesson 40: Capstone Investigation

## Lesson Overview

The capstone requires students to investigate a realistic enterprise security incident from first alert to written report. Students must preserve evidence, construct a timeline, analyze logs and packet metadata, enrich indicators safely, map behavior to MITRE ATT&CK, assess severity, recommend containment, and communicate defensible conclusions.

The objective is not to guess an answer quickly. It is to demonstrate a repeatable investigation method, accurate reasoning, operational judgment, and professional reporting.

## Learning Objectives

Students will be able to:

- Validate and triage a SIEM alert.
- Establish investigation scope and evidence-handling records.
- Normalize and correlate identity, endpoint, DNS, proxy, firewall, and cloud logs.
- Use Wireshark display filters to analyze an authorized PCAP.
- Distinguish indicators of compromise from indicators of attack.
- Enrich indicators without exposing confidential information.
- Map observed behavior to MITRE ATT&CK with evidence and confidence.
- Assess severity using technical and business context.
- Recommend proportionate containment that preserves operations and evidence.
- Produce a complete incident report and executive briefing.

## Prerequisite Knowledge

Students should have completed Lessons 1-39 and be able to use:

- Windows and Linux logs.
- SIEM queries.
- Wazuh, Microsoft Sentinel, or Splunk concepts.
- Wireshark.
- Threat-intelligence services.
- MITRE ATT&CK.
- NIST-aligned incident response.
- Risk and compliance reasoning.
- Professional report structures.

## Enterprise Relevance

This workflow reflects junior SOC analyst, cybersecurity analyst, incident responder, security administrator, and systems administrator responsibilities. Real investigations require coordination with identity, endpoint, network, cloud, business, legal, privacy, compliance, and management teams.

## 1. Capstone Rules of Engagement

### Authorization

Analyze only the supplied synthetic evidence and isolated course lab. Do not scan, contact, detonate, or attempt access to any external infrastructure.

### Evidence Safety

- Work from copies.
- Record source, collector, acquisition time, hash where provided, and analyst.
- Preserve original timestamps and time zones.
- Do not modify source files.
- Store notes and exports in the case directory.
- Record every query, filter, tool, and transformation.

### Analytical Discipline

Label:

- **Confirmed:** Directly supported by reliable evidence.
- **Assessed:** Best explanation supported by evidence.
- **Possible:** Plausible but not adequately established.
- **Unknown:** Evidence is insufficient.

Absence of evidence is not automatically evidence of absence.

## 2. Case Scenario

### Organization

Northbridge Health Services is a fictional regional healthcare organization.

### Environment

- Active Directory domain: `northbridge.example`
- Microsoft 365 tenant.
- Windows 11 managed endpoints with Microsoft Defender for Endpoint.
- Linux-hosted internal claims application.
- pfSense perimeter firewall.
- Wazuh agents and Microsoft Sentinel.
- Segmented user, server, clinical, and management VLANs.
- Cloud-hosted patient portal.
- Immutable backup copies with separate recovery credentials.

### Business Context

The Accounts Payable team processes supplier invoices. Its mailbox and file share contain supplier banking correspondence but should not contain clinical records. Fraud prevention requires out-of-band verification of bank-detail changes.

### Key Assets

| Asset | Purpose | Criticality |
|---|---|---|
| `FIN-WS-214` | Accounts Payable workstation | High |
| `NBH\m.adele` | Accounts Payable user | High financial trust |
| `FS-02` | Finance file server | High |
| `DC-01` | Domain controller | Critical |
| Microsoft 365 mailbox | Supplier communication | High |
| `CLAIMS-LNX-01` | Internal claims application | Critical |

## 3. Initial SIEM Alert

At 09:18 UTC, Sentinel creates:

```text
Alert ID: INC-2026-0714
Title: Suspicious PowerShell followed by rare outbound connection
Host: FIN-WS-214
User: NORTHBRIDGE\m.adele
Severity: High
First observed: 2026-07-08T09:16:42Z
Evidence:
  - powershell.exe launched with encoded command
  - DNS query for cdn-sync-storage.example
  - TLS connection to 203.0.113.77:443
  - destination not observed in previous 30 days
```

The domains, addresses, hashes, and people in this lesson are synthetic. `.example` and documentation IP ranges are used intentionally.

## 4. Investigation Workflow

Follow the required sequence:

1. SIEM alert.
2. Log analysis.
3. PCAP review.
4. Threat-intelligence investigation.
5. ATT&CK mapping.
6. Severity assessment.
7. Containment.
8. Written incident report.

The sequence organizes work, but investigators may loop back when new evidence changes scope.

## 5. Phase 1: SIEM Alert

Alert triage determines whether an alert is explainable, benign, suspicious, or a confirmed incident candidate.

Immediate assumptions create unnecessary disruption; delayed escalation permits attacker activity.

Validate:

- Rule logic and data sources.
- Entity and asset criticality.
- Timestamp and sequence.
- Process parent, command line, user, and signer.
- Destination and prevalence.
- Related identity, endpoint, network, and cloud events.
- Approved change or administrator activity.
- Sensor health and missing telemetry.

Use the SIEM case, EDR process tree, asset inventory, identity logs, proxy, DNS, firewall, and change-management records.

### Initial Questions

- Is the host and user correctly identified?
- Was PowerShell expected for this role?
- What launched it?
- What did the encoded content do?
- Was the destination contacted successfully?
- Did activity continue on other systems or accounts?
- Is business disruption currently occurring?

## 6. SIEM Query Examples

### Microsoft Sentinel KQL

```kusto
let start = datetime(2026-07-08T08:45:00Z);
let end = datetime(2026-07-08T10:00:00Z);
DeviceProcessEvents
| where Timestamp between (start .. end)
| where DeviceName =~ "FIN-WS-214"
| project Timestamp, DeviceName, AccountName, InitiatingProcessFileName,
          FileName, ProcessCommandLine, SHA256, ReportId
| order by Timestamp asc
```

Important points:

- `between` limits the investigation window.
- `=~` performs a case-insensitive comparison.
- `project` retains fields needed for review.
- Preserve `ReportId` or equivalent event identifiers for traceability.

### Splunk SPL

```spl
index=endpoint host="FIN-WS-214"
earliest="07/08/2026:08:45:00" latest="07/08/2026:10:00:00"
| table _time user parent_process process process_command_line sha256 event_id
| sort 0 _time
```

### Wazuh

Filter the relevant agent, rule group, user, process, and time range. Export the matching alert JSON and preserve `agent.id`, `rule.id`, source event, decoder fields, and timestamps.

Queries must be adapted to the organization's schema. A query returning no result may indicate a schema, ingestion, retention, or time-zone problem.

## 7. Supplied Evidence Set

The instructor provides read-only copies or simulated exports:

| Evidence ID | Artifact |
|---|---|
| E-01 | Sentinel alert JSON |
| E-02 | Defender process and network events |
| E-03 | Windows Security and PowerShell Operational events |
| E-04 | DNS resolver logs |
| E-05 | pfSense firewall and proxy logs |
| E-06 | `FIN-WS-214` packet capture |
| E-07 | Microsoft Entra sign-in and audit logs |
| E-08 | Microsoft 365 unified audit log |
| E-09 | Active Directory authentication events |
| E-10 | Asset, user, vulnerability, and change context |
| E-11 | Synthetic threat-intelligence records |

### Evidence Register

Students record:

```text
Evidence ID:
Description:
Source:
Collected by:
Acquisition time:
Original time zone:
Hash:
Storage location:
Analyst actions:
```

## 8. Phase 2: Log Analysis

Log analysis reconstructs events from systems that observed identity, process, file, network, and administrative activity.

No single log source provides complete truth. Correlation reduces blind spots and false conclusions.

1. Normalize timestamps to UTC while retaining originals.
2. Establish a narrow initial window.
3. Build a process and network sequence.
4. Pivot on host, user, process, hash, domain, IP, and session.
5. Expand time and population as evidence requires.
6. Record negative findings with query scope and limitations.

Use endpoint, Windows, PowerShell, identity, domain-controller, DNS, proxy, firewall, email, cloud, and application logs.

## 9. Synthetic Timeline Evidence

### Email and User Activity

```text
09:11:03Z  M365 message delivered to m.adele
            Subject: Updated remittance advice - July
            Sender display: Westlake Medical Supplies
            Sender domain: westlake-payments.example

09:15:58Z  WINWORD.EXE opens Remittance_July.docm
            Host: FIN-WS-214
            User: NORTHBRIDGE\m.adele
```

### Process Evidence

```text
09:16:41Z  Parent: WINWORD.EXE
            Child: powershell.exe
            Command line: powershell.exe -NoProfile -WindowStyle Hidden
                          -EncodedCommand <redacted-synthetic-value>

09:16:42Z  PowerShell Script Block ID 4104
            Action summary: create HTTPS client; download content from
            hxxps://cdn-sync-storage[.]example/update.dat; write
            C:\Users\m.adele\AppData\Local\Temp\OneDriveUpdate.ps1

09:16:49Z  powershell.exe launches powershell.exe
            Argument: -ExecutionPolicy Bypass -File
            C:\Users\m.adele\AppData\Local\Temp\OneDriveUpdate.ps1
```

The decoded command is summarized rather than provided as executable payload content.

### Network Evidence

```text
09:16:43Z DNS query  cdn-sync-storage.example
09:16:43Z DNS answer 203.0.113.77 TTL 300
09:16:44Z TCP 10.20.14.214:49722 -> 203.0.113.77:443 ALLOW
09:16:44Z TLS ClientHello SNI cdn-sync-storage.example
09:16:45Z TLS application data begins
09:17:08Z 184,322 bytes received; 12,811 bytes sent
```

### Persistence Evidence

```text
09:17:14Z Event 4698: Scheduled task created
Task name: OneDrive Update Check
User: NORTHBRIDGE\m.adele
Trigger: At user logon
Action: powershell.exe -WindowStyle Hidden -File
        C:\Users\m.adele\AppData\Local\Temp\OneDriveUpdate.ps1
```

### Discovery and Access Evidence

```text
09:17:22Z powershell.exe executes whoami /groups
09:17:25Z powershell.exe executes net use
09:17:31Z FIN-WS-214 connects to FS-02:445 using m.adele
09:17:34Z File read: \\FS-02\Finance\Suppliers\Bank_Changes_Q3.xlsx
09:17:39Z Access denied: \\FS-02\Clinical\
```

### Identity Evidence

```text
09:20:11Z Entra sign-in for m.adele from 10.20.14.214 egress address
            Result: success
            MFA: previously satisfied in token
            Device: compliant

09:26:54Z M365 audit: New-InboxRule
            Rule: Archive supplier confirmations
            Action: move messages containing "bank confirmation" to RSS Feeds
            Actor session: m.adele
            Source context: existing endpoint session
```

### Endpoint Detection

```text
09:18:02Z Defender alert generated
09:18:17Z Sentinel correlation alert generated
09:22:41Z SOC analyst acknowledges alert
```

## 10. Interpretation Questions

Students must answer:

- What is the probable initial execution method?
- Which evidence confirms script execution?
- What behavior indicates persistence?
- What information was accessed?
- Is clinical data access confirmed?
- Is credential theft confirmed?
- Is mailbox manipulation related, and with what confidence?
- Was data exfiltration confirmed?
- What additional evidence is needed?

### Required Precision

The evidence confirms access to a supplier bank-change workbook. It does not by itself prove that the workbook was transmitted externally. TLS byte counts show communication, not content. The clinical-share event was denied, so clinical-record access is not established by this evidence.

## 11. Expanding Scope

Pivot across:

- Other hosts contacting the domain or IP.
- Other users receiving the message.
- Hash prevalence.
- Similar parent-child process patterns.
- Scheduled task name or script path.
- Sign-ins and mailbox changes.
- SMB access from the endpoint.
- Domain-controller events for the account.
- Proxy upload volume.
- Cloud application consent or token activity.

Document the query range and data-source coverage. "No other affected hosts found" must be qualified by what was searched.

## 12. Phase 3: PCAP Review

Packet capture records network traffic observed at a collection point.

PCAP can validate DNS, connections, protocol behavior, timing, volume, and unencrypted content. Encryption limits payload visibility but still leaves useful metadata.

Preserve the PCAP, note capture point and filter, verify hash, then use focused Wireshark display filters.

E-06 contains traffic from `FIN-WS-214` during 09:10-09:35 UTC. The capture point is the user VLAN egress. It does not contain traffic that bypassed that point.

## 13. Wireshark Workflow

### Establish Host Activity

```text
ip.addr == 10.20.14.214
```

### DNS

```text
dns && ip.addr == 10.20.14.214
```

```text
dns.qry.name == "cdn-sync-storage.example"
```

### Destination

```text
ip.addr == 203.0.113.77
```

### TLS Server Name

```text
tls.handshake.extensions_server_name == "cdn-sync-storage.example"
```

### SMB

```text
smb2 && ip.addr == 10.20.14.214
```

### Troubleshooting

If a filter returns nothing:

- Confirm capture point and time.
- Check whether IPv6 was used.
- Resolve the endpoint's actual address.
- Inspect DNS answer changes.
- Check whether TLS fields are available in the Wireshark version.
- Determine whether traffic used a proxy.

## 14. PCAP Findings

Students should identify:

- DNS request and response.
- TCP three-way handshake.
- TLS ClientHello with matching SNI.
- Certificate subject and issuer metadata supplied in the lab.
- Encrypted application-data exchange.
- Connection duration and byte counts.
- SMB connection to `FS-02`.
- No packet evidence of direct connection to `DC-01` or `CLAIMS-LNX-01` in the capture.

### Limits

The PCAP does not reveal encrypted HTTPS content without authorized session keys. It cannot prove what was downloaded or uploaded. It covers one collection point and time range.

## 15. Phase 4: Threat-Intelligence Investigation

Threat-intelligence enrichment adds context about indicators, infrastructure, campaigns, and behavior.

Context can improve priority and pivots, but third-party reputation is not proof that an event is malicious or benign.

Use the supplied synthetic records or sanitized indicators. Record:

- Source.
- Lookup time.
- Indicator.
- First and last seen.
- Confidence.
- Relationships.
- Conflicts.
- Limitations.

In real authorized work, relevant services may include VirusTotal, AbuseIPDB, AlienVault OTX, MISP, passive DNS, vendor intelligence, and internal history.

## 16. Synthetic Intelligence Record

```text
Indicator: cdn-sync-storage.example
Classification: malicious infrastructure
Confidence: high
First seen: 2026-07-06
Related behavior: document-delivered PowerShell downloader
Related IP: 203.0.113.77
Observed campaign target: finance and procurement users
Limitation: campaign attribution not independently confirmed
```

```text
Indicator: SHA256 of update.dat
Classification: malicious downloader
Confidence: high
Observed capabilities: scheduled-task persistence, host discovery,
SMB-share enumeration
Limitation: no confirmed credential-dumping capability in supplied sample
```

### Safe Handling

Do not upload confidential files, full email bodies, patient information, internal URLs, or proprietary binaries to public services without authorization. Hash lookups can also disclose investigative interest.

## 17. IOC and IOA Analysis

| Type | Case example | Limitation |
|---|---|---|
| IOC | Domain, IP, file hash, task name | Can change or collide with benign values |
| IOA | Word spawning hidden encoded PowerShell | Behavior may detect variants |
| IOA | Script creating logon persistence | Requires context and sequence |
| IOA | Finance host reading supplier banking file after suspicious execution | Strong business context but not proof of external transfer |

Use indicators for pivots and containment, then retain behavioral detection for resilience when infrastructure changes.

## 18. Phase 5: MITRE ATT&CK Mapping

ATT&CK mapping associates observed behavior with documented adversary techniques.

Mapping supports consistent reporting, detection coverage, response planning, and lessons learned.

Map only behavior supported by evidence. Record the event, evidence ID, technique, confidence, and rationale.

Include mappings in the case report, detection backlog, threat hunt, and improvement plan.

## 19. Case ATT&CK Mapping

| Observed behavior | Technique | Evidence | Confidence |
|---|---|---|---|
| User opened a malicious macro-enabled document | T1204.002 User Execution: Malicious File | E-08, E-02 | High |
| PowerShell executed encoded and downloaded content | T1059.001 PowerShell | E-02, E-03 | High |
| Payload used HTTPS | T1071.001 Web Protocols | E-02, E-04, E-05, E-06 | High |
| Scheduled task created for logon execution | T1053.005 Scheduled Task/Job: Scheduled Task | E-03 | High |
| `whoami /groups` gathered group information | T1069.001 Permission Groups Discovery: Local Groups | E-02 | Medium; confirm command semantics and host context |
| `net use` enumerated network connections | T1016 or related discovery mapping requires validation | E-02 | Medium |
| SMB share accessed | T1021.002 SMB/Windows Admin Shares is not automatically appropriate | E-02, E-06 | Do not map unless remote service use fits technique definition |
| Inbox rule hid supplier messages | T1098 or collection mappings are not automatically appropriate | E-08 | Analyze behavior; do not force an unsupported mapping |

The final two rows demonstrate disciplined restraint. File-share access and mailbox-rule creation are important, but an analyst must verify the exact current ATT&CK technique definition before assigning a technique.

## 20. Mapping Quality

Avoid:

- Mapping a technique because a tool name appears.
- Mapping every alert field.
- Claiming tactic or intent from one event.
- Treating mapping as attribution.
- Using outdated technique definitions without checking.

A good mapping explains exactly how the observed procedure matches the technique.

## 21. Phase 6: Severity Assessment

Incident severity expresses urgency and consequence based on scope, impact, threat, controls, and confidence.

Severity determines escalation, resources, containment speed, communication, and business involvement.

Assess:

- Confirmed malicious execution.
- Persistence.
- Account and endpoint trust.
- Data accessed.
- Financial fraud opportunity.
- Clinical or patient-safety effect.
- Lateral movement.
- Privileged access.
- External communication.
- Scope.
- Detection and containment status.
- Recovery capability.
- Regulatory or contractual concerns.

Use the organization's incident-severity matrix and document rationale. Do not substitute CVSS; CVSS scores vulnerability severity, not incident impact.

## 22. Case Severity

An appropriate initial assessment is **High**, subject to organizational criteria:

- Malicious code execution is confirmed.
- Persistence is confirmed.
- A finance user and endpoint are affected.
- A supplier bank-change file was accessed.
- A mailbox rule could conceal fraud-related messages.
- External encrypted communication occurred.
- Enterprise-wide or clinical compromise is not established.
- Privileged compromise and confirmed exfiltration are not established.

Escalate severity if evidence confirms payment diversion, broader account compromise, clinical data exposure, privileged access, destructive behavior, or widespread execution.

## 23. Phase 7: Containment

Containment limits further harm while preserving evidence and necessary operations.

Uncoordinated action may destroy evidence, alert an intruder prematurely, interrupt patient care, or leave active sessions and persistence untouched.

Select actions based on confirmed scope, risk, authority, and business impact.

Contain endpoints, identities, sessions, email rules, domains, IPs, files, shares, and related infrastructure through approved controls.

## 24. Immediate Containment Plan

### Endpoint

- Use EDR network isolation for `FIN-WS-214`, preserving management connectivity.
- Capture volatile evidence if authorized and feasible.
- Quarantine confirmed malicious artifacts.
- Preserve EDR timeline, relevant logs, and scheduled-task details.
- Do not reimage until required evidence is preserved and scope decisions are made.

### Identity and Microsoft 365

- Disable or restrict the account according to incident procedure.
- Revoke active cloud sessions and refresh tokens.
- Reset credentials through an approved trusted process.
- Remove the unauthorized inbox rule after preserving evidence.
- Review MFA methods, delegated permissions, forwarding, OAuth consent, and sign-ins.
- Validate connected service credentials; do not rotate unrelated credentials without reason.

### Network

- Block confirmed malicious domain and IP at appropriate DNS, proxy, firewall, and endpoint controls.
- Search historical traffic before blocking.
- Monitor for alternate infrastructure and behavioral recurrence.
- Consider sinkholing only under authorized, designed operations.

### Business

- Notify Accounts Payable and fraud personnel.
- Pause or independently verify supplier bank-detail changes.
- Contact suppliers through previously trusted channels.
- Preserve relevant email and transaction records.

### Scope

- Hunt across endpoints, email recipients, identities, DNS, proxy, and file access.
- Increase logging or retention if evidence may expire.

## 25. Containment Trade-Offs

| Action | Benefit | Risk |
|---|---|---|
| Isolate endpoint | Stops most network activity | Interrupts user work; volatile activity changes |
| Disable account | Limits identity abuse | Affects business and may miss stolen tokens unless revoked |
| Block indicator | Rapidly stops known route | Infrastructure may change; false positive possible |
| Reimage immediately | Removes many artifacts | Destroys volatile and contextual evidence |
| Enterprise password reset | Broad precaution | Major disruption and weak targeting without evidence |

Containment should be proportionate. A high-confidence active finance compromise justifies rapid endpoint and identity action; it does not automatically justify shutting down clinical services.

## 26. Eradication and Recovery

After containment:

- Remove persistence and malicious files.
- Determine root cause and affected population.
- Patch or harden exploited control weaknesses.
- Rebuild from a trusted image when appropriate.
- Restore required data.
- Re-enroll EDR and configuration management.
- Validate identity, mailbox, endpoint, and network state.
- Monitor for recurrence.
- Obtain business confirmation.
- Return service through approved change control.

Recovery criteria for `FIN-WS-214` should include clean rebuild or validated remediation, current patches, active EDR, encryption, approved applications, restored user data from a trusted source, and heightened monitoring.

## 27. Root Cause and Contributing Factors

The likely initial cause is user execution of a malicious document. Do not end the analysis with "the user clicked."

Contributing control questions:

- Why did the document reach the mailbox?
- Were macros restricted?
- Did application control permit the process chain?
- Why was encoded PowerShell allowed or not blocked?
- Did the user need access to the full supplier file?
- Why did alert acknowledgment take four minutes?
- Did mailbox monitoring detect the rule independently?
- Were finance verification procedures followed?

Root-cause analysis should improve systems and processes, not blame a person.

## 28. Detection Improvements

Create or improve detections for:

- Office application spawning script interpreter.
- Hidden encoded PowerShell with network activity.
- Script download followed by scheduled-task creation.
- Rare destination contacted by a finance endpoint.
- Suspicious inbox rule creation.
- Finance account accessing unusual supplier data after endpoint alert.
- Endpoint alert correlated with cloud-session behavior.

For each rule, define data requirements, test cases, exclusions, owner, severity, playbook, and ATT&CK mapping.

## 29. Phase 8: Written Incident Report

### Required Structure

1. Document control and classification.
2. Executive summary.
3. Incident overview.
4. Scope and affected assets.
5. Detection and response timeline.
6. Evidence and analytical method.
7. Findings.
8. ATT&CK mapping.
9. Severity and business impact.
10. Containment, eradication, and recovery.
11. Data and notification assessment status.
12. Root cause and contributing factors.
13. Recommendations, owners, and deadlines.
14. Limitations and unresolved questions.
15. Evidence appendix.

## 30. Model Executive Summary

```text
On 8 July 2026, monitoring detected malicious PowerShell activity on the
Accounts Payable workstation FIN-WS-214 after a user opened a fraudulent
supplier document. Investigation confirmed external payload retrieval,
scheduled-task persistence, access to a supplier bank-change workbook, and
creation of a mailbox rule that could conceal confirmation messages.

The endpoint and account were contained, cloud sessions revoked, the mailbox
rule preserved and removed, and known malicious infrastructure blocked.
Accounts Payable began out-of-band validation of supplier payment changes.

No clinical-system access, privileged-domain activity, widespread execution,
or confirmed data exfiltration has been established. The incident remains High
severity because it affected a financially trusted user and created a credible
payment-fraud path. Investigation and enterprise hunting continue.
```

## 31. Required Findings

Students should support or challenge the following:

- Malicious document execution is the probable initial execution path.
- Hidden PowerShell downloaded and executed content.
- A scheduled task established persistence.
- The finance share was accessed with the user's existing authorization.
- A mailbox rule was created from the affected session.
- External TLS communication occurred.
- Data exfiltration is possible but not confirmed.
- Clinical data access and domain privilege are not confirmed.

Every conclusion must cite evidence identifiers and state limitations.

## 32. Incident Timeline Template

| UTC time | Source | Event | Interpretation | Evidence ID | Confidence |
|---|---|---|---|---|---|
| 09:15:58 | Defender | Word opened document | Initial user execution | E-02 | High |
| 09:16:41 | Defender | Word spawned PowerShell | Suspicious process chain | E-02 | High |

Continue through alerting, analyst action, containment, eradication, recovery, and monitoring.

## 33. Recommendation Register

| Recommendation | Owner | Priority | Target | Validation |
|---|---|---|---|---|
| Restrict internet-origin macros | Endpoint engineering | High | 30 days | Controlled attachment test |
| Correlate endpoint alert with inbox-rule creation | Detection engineering | High | 14 days | Replay synthetic events |
| Review finance file least privilege | Finance data owner | Medium | 45 days | Access population and sample |
| Test supplier bank-change procedure | Finance operations | High | 14 days | Tabletop and transaction sample |

Recommendations should address immediate weakness, connected attack path, and long-term resilience.

## 34. Team Roles

For classroom delivery:

| Role | Responsibility |
|---|---|
| SOC analyst | Alert validation, SIEM pivots, case notes |
| Endpoint analyst | Process tree, host evidence, containment |
| Network analyst | DNS, firewall, proxy, PCAP |
| Identity/cloud analyst | Sign-ins, sessions, mailbox activity |
| Incident lead | Scope, severity, decisions, coordination |
| Scribe/reporter | Timeline, evidence register, final report |

Rotate roles or require each student to submit individual analysis.

## 35. Classroom Hands-On Practical

### Duration

Two to four sessions, depending on tool availability.

### Stage 1: Intake and Triage

1. Create case ID and evidence register.
2. Validate the alert.
3. Establish initial scope, severity, and hypotheses.
4. Identify immediate evidence at risk of expiration.

### Stage 2: Correlation

1. Build a normalized timeline.
2. Decode only the instructor-provided safe summary or inert string.
3. Correlate process, PowerShell, DNS, firewall, identity, mail, and file events.
4. Record confirmed, assessed, possible, and unknown conclusions.

### Stage 3: PCAP

1. Verify PCAP hash.
2. Identify endpoint flows.
3. Filter DNS, TLS, destination, and SMB traffic.
4. Record what encryption prevents the analyst from seeing.

### Stage 4: Intelligence and ATT&CK

1. Enrich synthetic indicators.
2. Separate source reporting from analyst judgment.
3. Map only evidenced techniques.
4. Propose behavioral detections.

### Stage 5: Decision

1. Apply the severity matrix.
2. Draft immediate containment with operational trade-offs.
3. Identify legal, privacy, finance, and management coordination.
4. Define recovery criteria.

### Stage 6: Reporting

1. Submit technical incident report.
2. Submit one-page executive summary.
3. Deliver a five-minute briefing.
4. Answer challenge questions from the instructor.

## 36. Take-Home Practical

Individually submit:

- Evidence register.
- Query and filter log.
- Normalized timeline.
- IOC/IOA table.
- PCAP findings and limitations.
- Intelligence-enrichment table.
- ATT&CK mapping with confidence.
- Severity assessment.
- Containment and recovery plan.
- Complete incident report.
- Five prioritized control improvements.
- A short reflection describing one initial hypothesis that changed and why.

## 37. Scoring Rubric

| Area | Weight | High-quality evidence |
|---|---:|---|
| Evidence handling | 10% | Traceable artifacts, hashes, times, actions |
| SIEM and log analysis | 20% | Accurate pivots, timeline, scope, limitations |
| PCAP analysis | 15% | Correct filters, metadata findings, encryption limits |
| Threat intelligence | 10% | Safe enrichment, source/confidence separation |
| ATT&CK mapping | 10% | Exact evidence-to-technique rationale |
| Severity and containment | 15% | Business-aware, proportionate, actionable |
| Incident report | 15% | Accurate, clear, complete, audience appropriate |
| Professional conduct | 5% | Authorization, privacy, teamwork, no overclaiming |

Automatic major deductions apply for fabricating evidence, exposing supplied sensitive material, claiming unconfirmed exfiltration as fact, or performing unauthorized external activity.

## 38. Assessment Questions

### Multiple Choice

1. What should the analyst do first after receiving the SIEM alert?
   - A. Reimage every finance endpoint.
   - B. Validate the alert, entities, time, evidence, and context.
   - C. Publish the indicator publicly.
   - D. Conclude that all patient data was stolen.

2. What does the observed TLS byte count prove?
   - A. The supplier workbook was exfiltrated.
   - B. Encrypted data was exchanged, but content is not established.
   - C. No payload was downloaded.
   - D. The destination was legitimate.

3. Which evidence most directly confirms persistence?
   - A. DNS response
   - B. Scheduled task created to execute the script at logon
   - C. User opened Word
   - D. MFA was previously satisfied

4. Why should the account's sessions be revoked in addition to changing its password?
   - A. Existing tokens or sessions may remain usable.
   - B. Password changes delete endpoint logs.
   - C. Revocation patches PowerShell.
   - D. Sessions contain packet captures.

5. Which statement is accurate?
   - A. An access-denied clinical-share event confirms clinical data theft.
   - B. Finance-file access confirms external transmission.
   - C. Clinical access and data exfiltration remain unconfirmed.
   - D. A High alert confirms domain compromise.

6. What is the best use of threat intelligence in this case?
   - A. Treat reputation as sole proof.
   - B. Add context and pivots while preserving source, confidence, and limitations.
   - C. Upload the finance workbook to a public service.
   - D. Replace internal evidence.

7. Which containment action most directly protects payment operations?
   - A. Shut down the claims application.
   - B. Independently verify supplier bank-detail changes.
   - C. Disable DNS enterprise-wide.
   - D. Delete all finance email.

8. Why is ATT&CK mapping withheld for some behavior?
   - A. Important behavior must always be ignored.
   - B. A plausible label is insufficient without matching the current technique definition.
   - C. ATT&CK cannot describe enterprise behavior.
   - D. Only malware names can be mapped.

9. Which evidence best supports a timeline conclusion?
   - A. Multiple related events normalized to one time reference with source context preserved
   - B. A single unsupported guess
   - C. A deleted alert title
   - D. A screenshot with no timestamp

10. Which action best protects evidence integrity?
    - A. Track source, collection time, handler, hash where applicable, and storage location
    - B. Edit raw logs to make them easier to read
    - C. Delete inconvenient events
    - D. Share all evidence publicly

### Short Answer

1. List six additional pivots needed to determine scope.
2. Explain why the endpoint should not be immediately reimaged before evidence decisions.
3. Give four reasons the incident is High severity and three facts that would increase severity.
4. Distinguish an IOC from an IOA using case examples.
5. Explain how an analyst should write a conclusion when evidence confirms malicious execution but does not confirm data exfiltration.

### Scenario

13. Ten minutes after containment, a second finance endpoint queries the same domain but has no endpoint process telemetry because its EDR sensor stopped reporting two days earlier. Explain the immediate actions, evidence priorities, severity implications, and coverage gap.

14. The finance manager reports that a supplier called to ask why payment was sent to a new bank account. No external transfer of the workbook is confirmed, but mailbox-rule creation and finance-file access are confirmed. Explain how the investigation should handle payment verification, evidence limits, containment, stakeholder communication, and severity reassessment.

## 40. Instructor Review Guide

### Expected Core Narrative

The probable initial execution path is a fraudulent supplier-themed document opened by the Accounts Payable user. Word spawned hidden encoded PowerShell, which downloaded and executed a script over HTTPS. The script established scheduled-task persistence, performed discovery, and used the user's existing access to read a supplier banking workbook. An inbox rule was created from the affected session to conceal bank-confirmation messages.

### Confirmed

- Document open.
- Word-to-PowerShell process chain.
- Script download behavior.
- TLS connection.
- Scheduled-task persistence.
- Discovery commands.
- Finance file access.
- Inbox-rule creation.

### Not Confirmed

- Credential dumping.
- Domain or tenant administrative compromise.
- Successful clinical-data access.
- External transfer of the finance workbook.
- Payment diversion.
- Attribution to a named threat actor.

### Strong Student Behavior

- Revises hypotheses when evidence changes.
- States PCAP and log limitations.
- Uses business verification as containment.
- Preserves evidence before rebuild.
- Separates framework mapping from proof.
- Identifies detection and EDR-health improvements.
- Writes a concise executive summary without jargon or alarmism.

## 41. Glossary

| Term | Definition |
|---|---|
| Case hypothesis | Testable explanation used to guide evidence collection |
| Containment | Action that limits further incident harm |
| Evidence register | Record of evidence identity, source, acquisition, integrity, storage, and handling |
| High severity | Organization-defined classification for incidents requiring urgent coordinated response |
| Indicator of attack | Behavior suggesting an attack method or intent |
| Indicator of compromise | Artifact associated with possible or confirmed compromise |
| Normalized timeline | Events converted to a consistent time reference while preserving source context |
| PCAP | File containing captured network packets |
| Pivot | Search from one known entity or event to related evidence |
| Scope | Identified and potential extent of affected assets, identities, data, and services |
| SNI | TLS Server Name Indication used to identify the requested hostname during handshake |
| Triage | Initial validation and prioritization of an alert or incident |

## 42. Lesson Review Checklist and Final Course Competency Checklist

Students completing the capstone should be able to:

- [ ] Apply CIA, risk, threats, vulnerabilities, and controls.
- [ ] Recognize malware, social engineering, network, web, and identity attack behavior.
- [ ] Investigate Windows, Linux, Active Directory, cloud, endpoint, and network evidence.
- [ ] Use segmentation, firewall, IDS/IPS, hardening, IAM, and encryption concepts.
- [ ] Discover assets and interpret vulnerability findings.
- [ ] Query and tune SIEM and detection logic.
- [ ] Preserve forensic evidence and construct timelines.
- [ ] Enrich indicators and map evidenced ATT&CK techniques.
- [ ] Follow a NIST-aligned incident-response process.
- [ ] Assess and communicate risk and compliance implications.
- [ ] Produce professional technical and executive reports.
- [ ] Work safely, ethically, and within authorization.

## 43. Course Completion Note

This capstone integrates the complete 40-lesson curriculum. Students should retain the case, sanitized report, detection logic, architecture review, and remediation plan as evidence of practical readiness for junior SOC, cybersecurity analyst, security administrator, systems administrator, incident response, and vulnerability-management roles.
