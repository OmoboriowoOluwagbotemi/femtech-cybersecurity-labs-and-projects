# Lesson 32: Detection Engineering

## Lesson Overview

Detection engineering designs, implements, tests, deploys, measures, and maintains analytics that identify suspicious behavior. A detection is not merely a query. It is a governed security product with data dependencies, assumptions, tests, triage, ownership, and lifecycle.

This lesson covers writing detection rules, Sigma rules, MITRE ATT&CK mapping, false-positive reduction, and an introduction to Security Orchestration, Automation, and Response (SOAR).

## Learning Objectives

Students will be able to:

- Define a detection hypothesis and required telemetry.
- Write structured detection logic.
- Explain Sigma rule structure and conversion limitations.
- Map evidence to ATT&CK tactics and techniques accurately.
- Test detections using positive, negative, and edge cases.
- Reduce false positives without creating blind spots.
- Measure detection quality and coverage.
- Explain SOAR playbooks, approvals, and automation risks.

## Prerequisite Knowledge

Students should understand MITRE ATT&CK, IOC/IOA, SIEM architecture, KQL, SPL, Wazuh rules, network detection, endpoint evidence, and alert triage from previous lessons.

## Enterprise Relevance

Detection engineering supports:

- SOC alert quality.
- Threat hunting.
- Incident response.
- Purple teaming.
- Control validation.
- Threat intelligence.
- Compliance monitoring.

Threats, environments, schemas, and business processes change. Detections must change with them.

## 1. Detection Engineering

Detection engineering is the disciplined lifecycle of creating and operating security analytics.

Generic vendor alerts cannot cover every enterprise asset, threat, workflow, and data source.

The lifecycle includes:

1. Threat model.
2. Hypothesis.
3. Data requirement.
4. Logic.
5. Test.
6. Deployment.
7. Triage.
8. Measurement.
9. Tuning.
10. Retirement.

Detections run in SIEM, EDR, IDS/IPS, cloud platforms, email security, IAM, Wazuh, and SOAR.

## 2. Detection Hypothesis

A hypothesis states:

```text
If an adversary performs X against Y, source Z should record fields A, B, and C that distinguish the behavior from normal activity.
```

Example:

```text
If an attacker creates a new Windows service for persistence, the Security log or EDR should record service creation, creator identity, binary path, host, and time.
```

A hypothesis can be tested and disproved. "Detect malware" is too vague.

## 3. Detection Requirements

Document:

- Threat behavior.
- Asset scope.
- Required source.
- Required fields.
- Collection and parsing assumptions.
- Query logic.
- Window.
- Entity grouping.
- Expected benign behavior.
- Severity.
- Triage.
- Response.
- Owner.

## 4. Data Contract

A data contract defines the telemetry a detection depends on.

A rule can silently fail when fields, schemas, policies, or connectors change.

Record:

- Source and version.
- Event type.
- Required fields and types.
- Timestamp semantics.
- Expected volume.
- Latency.
- Retention.
- Health check.

Use for every production detection.

## 5. Detection Logic

Logic types:

- Single-event match.
- Threshold.
- Sequence.
- Aggregation.
- Absence.
- Rare event.
- Baseline deviation.
- Cross-source correlation.

Choose the simplest logic that reliably tests the hypothesis.

## 6. Single-Event Detection

Example:

```text
Audit log cleared by an unexpected identity.
```

Strength:

- Simple and explainable.

Limit:

- One event may lack context.

Add asset, identity, change, and prior-event context during enrichment or triage.

## 7. Threshold Detection

Example:

```text
One source causes failed logons for ten users within five minutes.
```

Design:

- Group by normalized source.
- Count distinct users.
- Bound time.
- Exclude known scanners narrowly.
- Correlate success afterward.

NAT, proxies, and shared systems can create benign concentration.

## 8. Sequence Detection

Example:

1. Document process starts PowerShell.
2. PowerShell downloads content.
3. New Run key appears.

Sequence improves confidence but can miss:

- Delayed stages.
- Missing events.
- Different tools.
- Distributed activity.

## 9. Absence Detection

Absence can indicate:

- Agent stopped.
- Expected backup missing.
- Logging disabled.
- Heartbeat absent.

Absence rules require a known expected cadence and must account for maintenance, decommissioning, and ingestion delay.

## 10. Detection Rule Documentation

Required fields:

- ID and title.
- Status.
- Description.
- Author and owner.
- Date and version.
- Threat hypothesis.
- Data sources.
- Logic.
- Severity and confidence.
- ATT&CK mapping.
- False-positive notes.
- Triage.
- Tests.
- References to internal evidence, where applicable.

## 11. Sigma

Sigma is a generic, structured format for describing log detections.

It allows platform-neutral sharing and version control of detection intent.

A Sigma rule commonly includes:

- Metadata.
- Log source.
- Detection selections.
- Condition.
- False-positive notes.
- Level.
- Tags.

Rules can be converted or adapted to SIEM languages such as KQL or SPL.

## 12. Sigma Example

```yaml
title: Suspicious Office Child PowerShell
id: 11111111-2222-3333-4444-555555555555
status: test
logsource:
  category: process_creation
  product: windows
detection:
  parent:
    ParentImage|endswith:
      - '\WINWORD.EXE'
      - '\EXCEL.EXE'
  child:
    Image|endswith: '\powershell.exe'
  condition: parent and child
falsepositives:
  - Approved Office automation
level: high
tags:
  - attack.execution
```

The rule is illustrative. A production rule requires field mapping, command context, tests, and environment tuning.

## 13. Sigma Metadata

Useful metadata:

- Stable UUID.
- Status: experimental, test, stable, or deprecated according to workflow.
- Description.
- Author.
- Date and modified date.
- Related rules.
- Fields useful for triage.
- False positives.
- Tags.

Metadata supports governance, not just search conversion.

## 14. Sigma Detection Section

Selections define field conditions. Modifiers may express:

- Ends with.
- Starts with.
- Contains.
- Regular expression.
- Case or list behavior depending on specification and backend.

The condition combines selections with Boolean or count logic.

Field names such as `Image` and `ParentImage` assume an applicable process-creation schema and mapping.

## 15. Sigma Conversion Limitations

Automatic conversion may fail because:

- Target fields differ.
- Case sensitivity differs.
- Regex differs.
- Lists and nulls differ.
- Correlation is unsupported.
- Time windows require platform logic.
- Backend escapes values differently.

Always inspect and test generated KQL, SPL, or other output in the target environment.

## 16. Rule Repositories

Version control should provide:

- Peer review.
- Branch protection.
- Change history.
- Automated syntax checks.
- Test fixtures.
- Deployment pipeline.
- Rollback.
- Ownership.

Do not store sensitive production events or credentials in a public repository.

## 17. MITRE ATT&CK Mapping

ATT&CK mapping associates observed behavior with adversary tactics and techniques.

It supports common language, coverage analysis, hunting, and reporting.

Map the actual behavior detected, not the alert title or assumed attacker motive.

Use in rule metadata, dashboards, cases, threat models, and coverage maps.

## 18. Mapping Quality

Good mapping:

- Identifies the technique directly evidenced.
- Uses sub-technique where supported.
- Documents assumptions.
- Updates when ATT&CK changes.

Weak mapping:

- Tags every possible tactic.
- Maps only from a tool name.
- Claims successful behavior when only an attempt is detected.

One detection may map to multiple techniques only when logic actually observes them.

## 19. Coverage Analysis

A coverage matrix can show:

- Technique.
- Relevant threat.
- Data source.
- Detection.
- Test status.
- Asset coverage.
- Owner.
- Last validation.

Counting rules per technique is misleading. Several weak rules do not equal reliable coverage.

## 20. Detection Testing

### Positive Test

Known behavior should alert.

### Negative Test

Similar benign behavior should not alert.

### Edge Test

Missing fields, alternate case, renamed binary, IPv6, delayed event, or duplicate input.

### Load Test

Rule performs acceptably at production volume.

## 21. Test Data

Sources:

- Sanitized production examples.
- Synthetic logs.
- Controlled lab execution.
- Purple-team exercise.
- PCAP replay in isolated systems.
- Vendor test data.

Preserve expected result, source version, schema, and timestamp.

## 22. Detection Validation

Validate end to end:

1. Behavior occurs.
2. Source records it.
3. Collector receives it.
4. Parser extracts fields.
5. SIEM indexes it.
6. Rule evaluates.
7. Alert contains context.
8. Analyst can triage.

A query unit test does not prove end-to-end detection.

## 23. False-Positive Reduction

Use:

- More precise fields.
- Parent-child context.
- User or device role.
- Frequency.
- Signed binary plus path.
- Asset criticality.
- Known change window.
- Approved automation inventory.

Do not simply exclude all administrators, servers, or signed binaries.

## 24. Benign Positive

A benign positive correctly matches rule logic, but the activity is authorized.

Example:

- Approved vulnerability scanner triggers scan detection.

This differs from a false positive, where the rule logic or interpretation is wrong.

The distinction helps improve tuning and reporting.

## 25. Detection Tuning Workflow

1. Review raw events.
2. Confirm rule behavior.
3. Classify false or benign positive.
4. Identify stable differentiator.
5. Make narrow change.
6. Run regression tests.
7. Peer review.
8. Deploy in test mode.
9. Monitor.
10. Record decision.

## 26. Severity and Confidence

Set severity by potential impact and asset context.

Set confidence by:

- Specificity.
- Correlated stages.
- Source quality.
- Threat context.
- Known benign frequency.

Automation should require higher confidence as response impact increases.

## 27. Detection Metrics

Useful measures:

- True-positive rate.
- False-positive and benign-positive volume.
- Precision.
- Mean time to triage.
- Detection latency.
- Source coverage.
- Test freshness.
- Rule failure.
- ATT&CK coverage with evidence.
- Alerts per analyst.

Metrics should improve outcomes, not encourage alert suppression.

## 28. Detection Lifecycle

Statuses:

- Draft.
- Test.
- Production.
- Tuned.
- Deprecated.
- Retired.

Retire when:

- Source no longer exists.
- Threat behavior changed.
- Better detection replaced it.
- Logic is obsolete.

Retirement should preserve history and coverage impact.

## 29. SOAR

SOAR combines orchestration, automation, and case-response workflows.

Repetitive enrichment and response consume analyst time and can be inconsistent.

A playbook may:

1. Receive alert.
2. Enrich IP, user, and asset.
3. Check prior cases.
4. Ask for approval.
5. Isolate endpoint.
6. Revoke session.
7. Create ticket.
8. Notify stakeholders.

SOAR integrates SIEM, EDR, IAM, firewall, email, threat intelligence, and ticketing.

## 30. SOAR Automation Levels

| Level | Example |
|---|---|
| Enrichment | Add reputation and asset owner |
| Recommendation | Suggest containment |
| Approval-gated | Analyst approves isolation |
| Fully automated | Block high-confidence known malicious indicator |

Start with low-risk enrichment and progress based on evidence.

## 31. SOAR Risks

- False-positive containment.
- Excessive API privilege.
- Compromised playbook.
- Secret exposure.
- Recursive action loops.
- Rate-limit exhaustion.
- Incomplete rollback.
- Missing human accountability.

Controls:

- Least-privileged service identities.
- Approval gates.
- Input validation.
- Dry-run.
- Logging.
- Version control.
- Test environment.
- Rollback.
- Kill switch.

## 32. Enterprise Scenarios

### Small Business

A Sigma rule detects Office spawning PowerShell. A managed IT provider tests it against legitimate macros before deployment.

### Financial Institution

A high-confidence impossible admin action triggers approval-gated session revocation and PAM review.

### Healthcare Organization

A detection for mass patient-record access includes department, care context, and emergency-access status to reduce benign alerts.

### Educational Institution

Authorized lab scanning is tagged by source and schedule rather than excluded globally.

### Government Agency

ATT&CK coverage review finds many rules but no tested telemetry on privileged endpoints. The agency measures end-to-end coverage.

### Cloud Environment

A cloud role assignment followed by key creation and storage download creates a cross-source sequence detection.

## 33. Detection Review

Review:

- Is the hypothesis relevant?
- Is the source healthy?
- Are fields stable?
- Does logic detect attempt or success?
- Are false-positive notes current?
- Are tests passing?
- Is triage actionable?
- Is ATT&CK mapping accurate?
- Is response safe?

## 34. Security+ SY0-701 Alignment

This lesson supports detection rules, threat hunting, ATT&CK, behavioral analytics, false-positive reduction, SIEM, SOAR, automation, and incident response.

Detection logic and SOAR actions are technical controls. Testing, tuning, review, and playbook approval are operational controls. Detection and automation standards are managerial controls and directive in function.

## 35. Classroom Hands-On Practical

### Practical Title

Build, Test, and Tune a Sigma Detection

### Safety

Use sanitized sample process events. Do not execute malware or automate containment.

### Tasks

1. Define a threat hypothesis.
2. Define data contract.
3. Write a Sigma rule.
4. Add metadata and ATT&CK mapping.
5. Convert conceptually to KQL or SPL.
6. Test true-positive sample.
7. Test three benign samples.
8. Identify a benign positive.
9. Tune narrowly.
10. Design an approval-gated SOAR playbook.

### Detection Record

| Field | Value |
|---|---|
| Hypothesis |  |
| Source |  |
| Fields |  |
| Sigma ID |  |
| ATT&CK |  |
| Positive test |  |
| Negative tests |  |
| Triage |  |
| Owner |  |

## 36. Take-Home Practical

Create a detection package containing:

- Threat hypothesis.
- Data contract.
- Sigma rule.
- KQL and SPL adaptation.
- ATT&CK mapping.
- Five tests.
- False-positive analysis.
- Triage guide.
- Metrics.
- SOAR playbook with approval, rollback, and logging.

## 37. Assessment Questions

### Multiple Choice

1. What should begin detection design?
   A. Testable threat hypothesis
   B. Random query
   C. Broad exclusion
   D. Automated blocking

2. What is a data contract?
   A. Defined telemetry and field dependency
   B. Firewall route
   C. Password list
   D. Patch schedule

3. What is Sigma?
   A. Generic structured log-detection format
   B. Disk encryption
   C. VPN protocol
   D. DHCP server

4. Why test converted Sigma output?
   A. Backend fields and syntax differ
   B. Conversion guarantees correctness
   C. SIEMs use identical schemas
   D. Testing removes metadata

5. What should ATT&CK mapping represent?
   A. Behavior actually evidenced by detection
   B. Every possible adversary tactic
   C. Product name only
   D. Alert severity

6. What is a benign positive?
   A. Authorized activity correctly matching rule logic
   B. Malicious activity missed
   C. Broken parser
   D. False field

7. What does end-to-end validation confirm?
   A. Behavior reaches an actionable alert through the full data path
   B. Query syntax only
   C. Rule title
   D. ATT&CK count

8. What should tuning preserve?
   A. Visibility into malicious variants
   B. Every broad suppression
   C. No tests
   D. No ownership

9. What is a safe first SOAR use?
   A. Low-risk enrichment
   B. Automatic domain-controller shutdown
   C. Delete every account
   D. Disable logs

10. Which is an operational control?
    A. Detection peer-review process
    B. Sigma condition
    C. SOAR API call
    D. SIEM parser

### Short Answer

1. Define detection engineering.
2. Write a detection hypothesis.
3. Explain data contracts.
4. Describe Sigma structure.
5. Explain ATT&CK mapping quality.
6. Compare false positive and benign positive.
7. Describe end-to-end testing.
8. Explain SOAR risks and controls.

### Scenario Questions

1. A Sigma conversion returns no results. Troubleshoot.
2. An Office-PowerShell rule alerts on finance automation. Tune safely.
3. A SOAR playbook isolates a clinical server incorrectly. Describe response.
4. ATT&CK coverage looks high, but no rules are tested. Assess maturity.
5. An identity source changes field names. Describe data-contract response.

## 38. Glossary

| Term | Definition |
|---|---|
| Benign Positive | Authorized activity correctly matching detection logic. |
| Data Contract | Defined telemetry, schema, timing, and health dependency. |
| Detection Engineering | Lifecycle for designing, testing, operating, and maintaining analytics. |
| Detection Hypothesis | Testable statement connecting threat behavior to expected evidence. |
| Sigma | Generic structured format for log-detection rules. |
| SOAR | Orchestration, automation, and response platform or capability. |
| Triage Guide | Instructions for validating and investigating an alert. |

## 39. Lesson Review Checklist

- I can write a testable detection hypothesis.
- I can define a data contract.
- I can write and adapt a Sigma rule.
- I can map ATT&CK accurately.
- I can test end to end.
- I can tune without broad blind spots.
- I can design safe SOAR playbooks.

## 40. Continuity With Future Lessons

Lesson 33 applies detection output to the NIST incident-response lifecycle, containment, eradication, recovery, lessons learned, and incident reporting.

Students should retain that an alert becomes useful only when analysts can validate, scope, contain, and document the underlying event.
