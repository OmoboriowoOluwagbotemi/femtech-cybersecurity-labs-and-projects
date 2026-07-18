# Lesson 30: SIEM Fundamentals

## Lesson Overview

A Security Information and Event Management (SIEM) platform collects, normalizes, stores, searches, correlates, and alerts on security telemetry. SIEM value depends on reliable sources, parsing, context, detection logic, analyst workflows, and retention.

This lesson covers SIEM architecture, log sources, correlation rules, alerting, Kusto Query Language (KQL) basics, and Search Processing Language (SPL) basics.

## Learning Objectives

Students will be able to:

- Explain SIEM architecture and data flow.
- Select and prioritize log sources.
- Distinguish collection, parsing, normalization, enrichment, and correlation.
- Design basic correlation and alert logic.
- Explain alert severity, confidence, triage, and tuning.
- Write introductory KQL and SPL searches.
- Validate source health, timestamps, fields, and retention.
- Connect SIEM evidence to investigations and response.

## Prerequisite Knowledge

Students should understand Windows and Linux logs, identity, endpoints, networks, IDS/IPS, cloud logs, assets, vulnerabilities, and incident evidence from prior lessons.

## Enterprise Relevance

A SIEM can connect:

- Identity sign-ins.
- Endpoint processes.
- Firewall traffic.
- DNS.
- Email.
- Cloud administration.
- Vulnerabilities.
- Asset criticality.

Without correlation, each source may appear harmless. Together they may reveal an attack.

## 1. SIEM

### What

A SIEM centralizes security telemetry for search, detection, investigation, reporting, and selected response integrations.

### Why

Enterprise evidence is distributed across many systems and disappears at different rates.

### How

The SIEM ingests events, parses fields, normalizes data, enriches context, stores records, evaluates analytics, and presents alerts and cases.

### Where

SIEM platforms may be cloud-native, on-premises, hybrid, commercial, or open source.

## 2. SIEM Data Flow

```text
Source
  -> Agent, API, collector, or forwarder
  -> Transport and buffering
  -> Parsing and normalization
  -> Enrichment
  -> Storage and indexing
  -> Search and analytics
  -> Alert and case
  -> Response
```

Failure at any stage can create a blind spot.

## 3. SIEM Components

| Component | Purpose |
|---|---|
| Source | Generates original events |
| Agent or connector | Collects records |
| Forwarder or collector | Aggregates and buffers |
| Parser | Extracts fields |
| Normalization | Maps fields to common schema |
| Enrichment | Adds asset, identity, threat, or vulnerability context |
| Storage/index | Retains searchable data |
| Analytics engine | Evaluates rules and models |
| Case management | Tracks investigation |
| SOAR integration | Automates approved actions |

## 4. Collection Methods

- Endpoint agent.
- Syslog.
- Windows Event Forwarding.
- API.
- Cloud-native connector.
- Database query.
- File monitoring.
- Message queue.
- Network sensor.

Choose based on reliability, latency, authentication, scale, and source support.

## 5. Collection Reliability

Validate:

- Source is enrolled.
- Events arrive.
- Expected event types exist.
- Timestamps are correct.
- Fields parse.
- Volume is plausible.
- Duplicates are controlled.
- Buffering works.
- Collection recovers after outage.

No alerts may indicate failed collection.

## 6. Log Sources

### Identity

- Domain controllers.
- Microsoft Entra ID.
- VPN.
- MFA.
- PAM.
- SaaS authentication.

### Endpoint

- EDR.
- Windows Security.
- PowerShell.
- Defender.
- Linux auth and audit.

### Network

- Firewall.
- DNS.
- DHCP.
- Proxy.
- VPN.
- IDS/IPS.
- Zeek.

### Cloud and Application

- Cloud management.
- Storage access.
- SaaS audit.
- Web server.
- Database.
- Application.
- WAF.

## 7. Source Prioritization

Prioritize by:

- Detection use cases.
- Asset criticality.
- Threat model.
- Evidence value.
- Retention requirement.
- Integration quality.
- Cost.

Collecting every available event without defined use can create cost and noise.

## 8. Parsing

### What

Parsing extracts structured fields from raw events.

### Why

Analytics need consistent fields such as user, IP, process, action, and result.

### How

Parsers use source schemas, JSON, XML, key-value formats, delimiters, or patterns.

### Where

Parsing may occur at source, collector, ingestion, query, or analytics time.

## 9. Normalization

Different sources may use:

- `src_ip`.
- `SourceIP`.
- `clientAddress`.

Normalization maps them to a common conceptual field or schema.

Benefits:

- Cross-source rules.
- Reusable dashboards.
- Easier analyst workflow.

Raw data should remain available where feasible because normalization can lose detail or contain errors.

## 10. Timestamp Management

An event may contain:

- Source event time.
- Ingestion time.
- Processing time.
- Device-local time.

Challenges:

- Time zones.
- Clock drift.
- Delayed forwarding.
- Batch ingestion.
- Daylight-saving transitions.

Use synchronized clocks, preserve original timestamps, and understand which field a query uses.

## 11. Enrichment

Add:

- Asset owner and criticality.
- User department and privilege.
- Vulnerability.
- Threat intelligence.
- Geography.
- Device compliance.
- Known scanner.
- Change window.

Enrichment can become stale or incorrect. Preserve source and update time.

## 12. Storage and Retention

Retention design considers:

- Detection lookback.
- Investigation needs.
- Legal and compliance requirements.
- Source volume.
- Search performance.
- Cost.
- Privacy.

Data tiers may include:

- Hot searchable.
- Warm.
- Archive.

Archive is useful only if retrieval time meets investigation needs.

## 13. Data Protection

SIEM data may contain:

- Credentials accidentally logged.
- Personal data.
- Medical records.
- Commands.
- Network content.
- Vulnerability details.

Apply:

- RBAC.
- Encryption.
- Query auditing.
- Data minimization.
- Retention and deletion.
- Export controls.
- Separation of duties.

## 14. Correlation

### What

Correlation connects related events across time, sources, identities, assets, or behavior.

### Why

Individual events may not justify an alert.

### How

Example:

1. Many failed sign-ins.
2. Successful sign-in.
3. MFA method changed.
4. Privileged role assigned.
5. Large download.

### Where

Correlation runs in scheduled rules, streaming analytics, UEBA, or analyst searches.

## 15. Correlation Rule Anatomy

A rule should define:

- Threat hypothesis.
- Required sources.
- Query.
- Time window.
- Grouping entity.
- Threshold.
- Exclusions.
- Severity.
- Enrichment.
- Triage.
- Test.
- Owner.

## 16. Correlation Examples

| Detection | Correlation |
|---|---|
| Password spray | Same source, many users, failures |
| Compromised account | Failures, success, unusual device, privilege use |
| Ransomware | Security impairment, mass file changes, extension changes |
| Web compromise | WAF exploit alert, web process shell, outbound connection |
| Data exfiltration | Sensitive access, unusual volume, rare destination |

## 17. Rule Windows and Grouping

Poor design can:

- Combine unrelated users.
- Miss slow attacks.
- Duplicate alerts.
- Trigger on batch jobs.

Choose:

- Event-time versus ingestion-time.
- Sliding or fixed window.
- Group by user, device, IP, application, or combination.
- Threshold and suppression.

## 18. Alerting

An alert represents rule or analytic output requiring evaluation.

Fields:

- Title.
- Time.
- Entities.
- Severity.
- Confidence.
- Evidence.
- Rule.
- Status.
- Owner.
- Related alerts.

An alert is not automatically an incident.

## 19. Severity and Confidence

### Severity

Potential impact if malicious.

### Confidence

Strength of evidence that behavior is malicious.

A high-impact but low-confidence alert may require urgent validation. A high-confidence low-impact alert may be automated safely.

## 20. Alert Lifecycle

1. New.
2. Assigned.
3. Triage.
4. Investigating.
5. Escalated or contained.
6. Resolved.
7. Closed with disposition.
8. Tuning or lessons learned.

Common dispositions:

- True positive.
- Benign positive.
- False positive.
- Duplicate.
- Informational.

## 21. Tuning

Tune:

- Threshold.
- Time window.
- Entity grouping.
- Known scanners.
- Approved service accounts.
- Asset criticality.
- Change windows.
- Severity.

Avoid broad exclusions. Every exception needs owner, reason, test, and review.

## 22. KQL Basics

KQL is used by Microsoft Sentinel and other Microsoft data platforms.

Basic pattern:

```kusto
SecurityEvent
| where TimeGenerated > ago(1h)
| where EventID == 4625
| project TimeGenerated, Computer, Account, IpAddress
| order by TimeGenerated desc
```

Operators:

- `where`: filter rows.
- `project`: select or create columns.
- `summarize`: aggregate.
- `extend`: create calculated field.
- `order by`: sort.
- `join`: combine tables.

Table and field names depend on connector and schema.

## 23. KQL Aggregation

```kusto
SecurityEvent
| where TimeGenerated > ago(1h)
| where EventID == 4625
| summarize Failures=count(),
            Accounts=dcount(Account)
  by IpAddress, bin(TimeGenerated, 5m)
| where Accounts >= 5
```

This is a starting hypothesis for password spraying, not a production-ready rule.

Consider:

- Missing IPs.
- NAT.
- Authorized testing.
- Service noise.
- Event delays.
- Successful follow-on logons.

## 24. KQL String and Null Handling

Useful concepts:

```kusto
| where isnotempty(IpAddress)
| where Account !endswith "$"
| extend NormalizedUser=tolower(Account)
```

Field normalization matters because casing, domain format, and missing values can split one identity into multiple groups.

## 25. SPL Basics

SPL is used by Splunk.

Basic pattern:

```spl
index=windows sourcetype=WinEventLog:Security EventCode=4625
| fields _time, host, user, src_ip
| sort - _time
```

Concepts:

- Search terms select events.
- Pipes pass results to commands.
- `stats` aggregates.
- `eval` creates fields.
- `where` filters expressions.
- `table` formats fields.

Index and field names depend on data onboarding.

## 26. SPL Aggregation

```spl
index=windows EventCode=4625 earliest=-1h
| stats count AS failures,
        dc(user) AS accounts
  BY src_ip, span=5m
| where accounts >= 5
```

Exact time-bucketing syntax and fields should be tested in the target Splunk environment. A common explicit approach is:

```spl
index=windows EventCode=4625 earliest=-1h
| bin _time span=5m
| stats count AS failures,
        dc(user) AS accounts
  BY src_ip, _time
| where accounts >= 5
```

## 27. Query Safety and Quality

- Limit time range.
- Select required indexes or tables.
- Filter early.
- Avoid expensive joins without need.
- Validate field types.
- Handle nulls.
- Normalize entities.
- Record query version.
- Test known positive and benign data.
- Protect sensitive output.

A query returning no rows may indicate no events, wrong fields, wrong time, or failed ingestion.

## 28. Detection Testing

Test with:

- Known true-positive events.
- Benign similar events.
- Missing fields.
- Delayed ingestion.
- Duplicate events.
- Time-zone boundaries.
- High volume.
- Multiple entities behind NAT.

Record expected and actual results.

## 29. SIEM Health

Monitor:

- Source silence.
- Ingestion delay.
- Parsing errors.
- Connector authentication.
- License or cost limits.
- Storage.
- Rule execution failure.
- Queue backlog.
- Clock drift.

SIEM monitoring must monitor the SIEM itself.

## 30. Enterprise Scenarios

### Small Business

Wazuh or a managed SIEM receives endpoint, firewall, and Microsoft 365 logs. Source-health alerts identify a disconnected endpoint agent.

### Financial Institution

Splunk correlates VPN authentication, PAM activation, and payment-system access. High-risk privileged sessions receive immediate triage.

### Healthcare Organization

A clinical account accesses many patient records. SIEM enrichment adds role and department before escalation.

### Educational Institution

Student password spraying is separated from authorized security labs using scanner inventory and network segments.

### Government Agency

Microsoft Sentinel correlates cloud privilege assignment with Defender process alerts and DNS activity.

### Hybrid Enterprise

On-premises domain events and cloud sign-ins normalize one identity across different naming formats.

## 31. SOC Triage

1. Validate alert rule and source health.
2. Confirm entities and time.
3. Review raw events.
4. Check enrichment accuracy.
5. Expand timeline.
6. Correlate other sources.
7. Determine impact and privilege.
8. Contain or escalate.
9. Document queries and evidence.
10. Recommend tuning.

## 32. SIEM Implementation Lifecycle

1. Define use cases.
2. Prioritize sources.
3. Design retention.
4. Onboard and parse.
5. Validate data.
6. Build detections.
7. Test.
8. Train analysts.
9. Measure.
10. Improve.

Buying a SIEM without operating processes creates an expensive log repository.

## 33. Security+ SY0-701 Alignment

This lesson supports SIEM, log sources, normalization, correlation, alerting, querying, retention, tuning, incident response, and monitoring.

Collectors, parsers, correlation rules, and access controls are technical controls. Triage, tuning, onboarding, and source-health review are operational controls. Logging and detection standards are managerial controls and directive in function.

## 34. Classroom Hands-On Practical

### Practical Title

Build and Validate a SIEM Detection

### Safety

Use provided sample events in an instructor-approved Sentinel, Splunk, Wazuh, or offline training environment. Do not ingest production-sensitive data.

### Scenario

Events include:

- Failures against 12 accounts.
- One successful login.
- New MFA method.
- Privileged group change.
- Large cloud download.

### Tasks

1. Verify source, fields, and timestamps.
2. Normalize user and IP.
3. Write a KQL or SPL search for failures.
4. Aggregate by source and time.
5. Correlate success and privilege change.
6. Add asset and identity context.
7. Assign severity and confidence.
8. Write triage steps.
9. Test a benign shared-proxy case.
10. Document tuning.

### Detection Record

| Field | Value |
|---|---|
| Hypothesis |  |
| Sources |  |
| Query |  |
| Window |  |
| Grouping |  |
| Severity |  |
| Triage |  |
| Tests |  |

## 35. Take-Home Practical

Design SIEM architecture for one organization. Include:

- Use cases.
- Source priorities.
- Collection methods.
- Parsing and normalization.
- Enrichment.
- Retention tiers.
- Ten correlation rules.
- Alert lifecycle.
- KQL and SPL examples.
- Health monitoring.
- Privacy and access controls.

## 36. Assessment Questions

### Multiple Choice

1. What does parsing do?
   A. Extracts structured fields
   B. Encrypts disks
   C. Creates VLANs
   D. Patches servers

2. What does normalization do?
   A. Maps different source fields to common concepts
   B. Deletes raw events
   C. Disables correlation
   D. Creates accounts

3. What is enrichment?
   A. Adding asset, identity, threat, or vulnerability context
   B. Removing timestamps
   C. Blocking every alert
   D. Compressing passwords

4. What does correlation do?
   A. Connects related events
   B. Removes sources
   C. Encrypts traffic
   D. Assigns DHCP

5. What is alert confidence?
   A. Strength of evidence that activity is malicious
   B. Business impact only
   C. Storage duration
   D. User password length

6. Which KQL operator aggregates?
   A. `summarize`
   B. `project` only
   C. `where` only
   D. `order by`

7. Which SPL command commonly aggregates?
   A. `stats`
   B. `table`
   C. `fields`
   D. `sort`

8. Why filter time early?
   A. Improve query performance and relevance
   B. Disable logs
   C. Change Event IDs
   D. Remove identity

9. What can no query results mean?
   A. No events, wrong query, wrong time, or ingestion failure
   B. Guaranteed safety
   C. Automatic remediation
   D. Correct parsing always

10. Which is an operational control?
    A. Daily source-health review
    B. Parser code
    C. Correlation engine
    D. Encryption setting

### Short Answer

1. Explain SIEM data flow.
2. List and prioritize log sources.
3. Compare parsing, normalization, and enrichment.
4. Describe correlation-rule anatomy.
5. Compare severity and confidence.
6. Explain alert lifecycle and dispositions.
7. Write a basic KQL aggregation.
8. Write a basic SPL aggregation.

### Scenario Questions

1. A source suddenly sends no events. Describe validation.
2. A password-spray rule alerts on a corporate proxy. Tune safely.
3. Events arrive two hours late. Explain correlation effects.
4. A privileged alert lacks asset context. Improve enrichment.
5. A SIEM query returns no results after onboarding. Troubleshoot.

### Answer Key

1. **A.** Parsing converts source content into searchable fields.
2. **A.** Normalization provides common concepts across different schemas.
3. **A.** Enrichment adds context used for prioritization and investigation.
4. **A.** Correlation joins events by entities, time, sequence, or behavior.
5. **A.** Confidence represents evidentiary strength, while severity represents potential impact.
6. **A.** `summarize` performs grouping and aggregation in KQL.
7. **A.** `stats` calculates grouped aggregations in SPL.
8. **A.** A bounded time range reduces data scanned and irrelevant results.
9. **A.** Empty output has several possible causes and requires validation.
10. **A.** Source-health review is a people-driven operational process.

## 37. Glossary

| Term | Definition |
|---|---|
| Alert | Analytic result requiring evaluation. |
| Correlation | Connection of related events by time, entity, or behavior. |
| Enrichment | Addition of external context to events. |
| Ingestion Time | Time an event enters the platform. |
| KQL | Query language used by Microsoft Sentinel and related platforms. |
| Normalization | Mapping source-specific fields to common concepts. |
| Parsing | Extraction of structured fields from event data. |
| SIEM | Platform centralizing telemetry for search, detection, and investigation. |
| SPL | Splunk Search Processing Language. |
| Source Health | Reliability, freshness, parsing, and completeness of a telemetry source. |

## 38. Lesson Review Checklist

- I can explain SIEM architecture and data flow.
- I can prioritize and validate log sources.
- I can distinguish parsing, normalization, and enrichment.
- I can design correlation and alert logic.
- I can write introductory KQL and SPL.
- I can tune and test detections.
- I can monitor SIEM health and protect data.

## 39. Continuity With Future Lessons

Lesson 31 applies these concepts in Wazuh through agents, log-source configuration, dashboards, querying, and alert tuning.

Students should retain that source health and field quality must be proven before detection quality can be trusted.
