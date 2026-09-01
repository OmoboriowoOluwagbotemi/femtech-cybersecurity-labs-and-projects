# Lesson 31: Wazuh in Practice

## Lesson Overview

Wazuh is an open-source security platform that combines endpoint telemetry, log analysis, file-integrity monitoring, configuration assessment, vulnerability-related visibility, and alerting. Effective use requires healthy agents, correct log sources, parsing, rules, storage, dashboards, and analyst workflows.

This lesson covers Wazuh agent deployment, log-source configuration, dashboards, querying, and alert tuning. Exact screens and configuration details may vary by release, so students will learn stable architectural concepts and validation methods.

## Learning Objectives

Students will be able to:

- Explain Wazuh architecture and data flow.
- Plan and validate agent deployment.
- Configure conceptual Windows, Linux, network, and application log sources.
- Distinguish collection, decoding, rule evaluation, indexing, and visualization.
- Use dashboards and queries for investigation.
- Explain Wazuh rule levels, groups, decoders, and alerts.
- Tune alerts without creating broad blind spots.
- Monitor platform, agent, ingestion, and storage health.

## Prerequisite Knowledge

Students should understand SIEM architecture, Windows and Linux logs, EDR concepts, file-integrity monitoring, vulnerability assessment, network monitoring, and alert tuning from previous lessons.

## Enterprise Relevance

Wazuh can provide a security-monitoring foundation for:

- Small businesses.
- Training labs.
- Managed service environments.
- Linux and Windows fleets.
- Cloud workloads.
- Compliance monitoring.
- SOC investigation.

The platform requires governance and operations; installation alone does not create a functioning SOC.

## 1. Wazuh

Wazuh is an open-source security platform collecting and analyzing endpoint and log telemetry.

Organizations need centralized visibility, rules, alerts, dashboards, and searchable evidence.

Agents or agentless integrations collect events. The Wazuh manager analyzes data, while indexing and dashboard components store, search, and visualize results.

Wazuh can monitor endpoints, servers, cloud workloads, network-device logs, applications, containers, and selected cloud services.

## 2. Wazuh Architecture

Core conceptual components:

| Component | Purpose |
|---|---|
| Wazuh agent | Collects supported endpoint events and performs local monitoring functions |
| Wazuh server/manager | Receives, decodes, evaluates rules, and coordinates agents |
| Wazuh indexer | Stores and indexes security data |
| Wazuh dashboard | Provides search, dashboards, configuration, and investigation interfaces |
| Filebeat or supported shipper components | Moves selected manager output in applicable architectures |

Architecture and packaging can evolve. Verify the installed release and official configuration syntax in the environment.

## 3. Data Flow

```text
Endpoint or log source
  -> Agent or integration
  -> Wazuh manager
  -> Decoder
  -> Rule evaluation
  -> Alert output
  -> Indexer
  -> Dashboard, search, and API
```

Raw archives and alert storage depend on configuration. An event not generating an alert may not appear in the same index as alerts.

## 4. Deployment Models

- Single-node lab.
- Distributed server components.
- Clustered manager.
- Multiple indexer nodes.
- Remote agents.
- Cloud-hosted deployment.

Design for:

- Event volume.
- Agent count.
- Retention.
- Availability.
- Network latency.
- Administrative separation.
- Recovery.

## 5. Security of Wazuh

Protect:

- Dashboard and API.
- Agent enrollment.
- Manager.
- Indexer.
- Certificates.
- Credentials.
- Configuration.
- Rule and decoder files.
- Backups.

Controls:

- Strong named administrators.
- Least privilege.
- MFA through the surrounding access architecture where available.
- Management segmentation.
- TLS.
- Patch management.
- Central monitoring.
- Configuration backup.

The SIEM contains sensitive data and detection logic and is a high-value target.

## 6. Wazuh Agent

The Wazuh agent is software installed on a supported endpoint to collect and monitor selected activity.

Local access provides visibility not available from network logs alone.

The agent communicates with the manager and can perform:

- Log collection.
- File-integrity monitoring.
- Security configuration assessment.
- Rootkit-related checks.
- Inventory.
- Active response integration.
- Vulnerability-related inventory analysis.

Deploy to supported Windows, Linux, macOS, and other documented environments according to release capability.

## 7. Agent Deployment Planning

Define:

- Supported OS and version.
- Package source.
- Manager address.
- Enrollment method.
- Agent naming.
- Groups.
- Certificate or key trust.
- Firewall paths.
- Proxy requirements.
- Upgrade process.
- Uninstall and rollback.

Use endpoint-management tools for scale rather than manual installation.

## 8. Agent Enrollment

Enrollment establishes agent identity and trust with the manager.

Security requirements:

- Restrict enrollment service.
- Authenticate enrollment.
- Avoid reusable exposed passwords.
- Detect duplicate agent names or keys.
- Remove retired agents.
- Protect registration records.

A connected agent is not automatically healthy. Validate event flow and assigned configuration.

## 9. Agent Groups

Groups apply shared configuration to sets of agents.

Examples:

- Windows workstations.
- Linux servers.
- Domain controllers.
- Web servers.
- Cloud workloads.

Benefits:

- Consistency.
- Role-specific collection.
- Staged changes.

Risks:

- Wrong group creates excessive or missing telemetry.
- One change affects many agents.
- Group drift.

Test configuration on a pilot group before broad deployment.

## 10. Agent Health

Monitor:

- Connected, disconnected, never connected.
- Last keepalive.
- Agent version.
- Manager assignment.
- Configuration status.
- Event rate.
- Upgrade state.

No alert activity from a critical server can indicate quiet behavior or failed collection.

## 11. Log-Source Configuration

Log-source configuration tells Wazuh which event channels, files, commands, or integrations to collect.

Default collection may not include every security use case.

Configuration may specify:

- Log format.
- Location or channel.
- Query or filter.
- Multiline handling.
- Exclusions.
- Labels.

Configure locally or through centralized agent-group configuration according to architecture.

## 12. Windows Sources

High-value sources:

- Security.
- System.
- Application.
- PowerShell Operational.
- Defender Operational.
- Task Scheduler Operational.
- Sysmon where separately deployed and governed.

Use event-channel queries to select required events and control volume.

Collecting every event without use cases can overwhelm storage.

## 13. Linux Sources

Sources:

- systemd journal.
- Authentication logs.
- Syslog.
- auditd.
- Application logs.
- Web access and error logs.
- Package and service events.

Validate path and format by distribution. A configured nonexistent file does not provide coverage.

## 14. Network and Application Sources

Wazuh can receive or process selected logs forwarded from:

- Firewalls.
- IDS/IPS.
- VPN.
- Routers.
- Web applications.
- Databases.
- Cloud services.

Syslog collection requires:

- Restricted sources.
- Correct transport.
- Time.
- Parsing.
- Source identification.
- Buffering.

Do not expose an unauthenticated syslog listener broadly.

## 15. File-Integrity Monitoring

FIM monitors selected files or directories for changes.

Unexpected modification can indicate persistence, tampering, or configuration drift.

The agent records metadata, checksums, and change events according to configuration.

Monitor:

- Security configuration.
- Web roots.
- Startup locations.
- Scripts.
- Critical binaries.
- Application configuration.

Avoid monitoring volatile high-change paths without purpose.

## 16. FIM Interpretation

A change event should answer:

- What changed?
- When?
- Which host?
- Who or what process changed it, if available?
- Was the change authorized?
- What is the content or hash difference?

FIM indicates change, not maliciousness.

## 17. Security Configuration Assessment

SCA evaluates configuration against policy checks.

Use for:

- Hardening baselines.
- CIS-oriented checks.
- Configuration drift.
- Compliance evidence.

Limitations:

- A passed check does not prove full security.
- A failed check may be inapplicable.
- Automated evidence can require manual validation.
- Policy versions must match platform.

## 18. Inventory and Vulnerability Visibility

Agents can collect software and system inventory used for vulnerability-related analysis.

Analysts should verify:

- Inventory freshness.
- Package identity.
- OS support.
- Vulnerability feed.
- Applicability.
- Exposure.

This complements, not replaces, dedicated vulnerability assessment and validation.

## 19. Decoders

A decoder extracts structured fields from an event.

Rules need fields such as source IP, user, action, and process.

Decoders match source structure and parse fields.

Use built-in decoders or approved custom decoders for unsupported logs.

## 20. Decoder Development

Process:

1. Collect representative raw events.
2. Identify stable format.
3. Define parent or pre-match.
4. Extract fields.
5. Test malformed and variant data.
6. Validate no conflict with other decoders.
7. Version and deploy.

Regex parsing can be brittle. Prefer structured JSON fields where available.

## 21. Rules

Wazuh rules evaluate decoded events and context to generate alerts.

Rules translate telemetry into security meaning.

Rules may use:

- Decoder.
- Field values.
- Frequency.
- Time frame.
- Source or destination.
- Parent rule.
- Groups.
- Severity level.
- MITRE mapping.

Use built-in rules and approved local custom rules.

## 22. Rule Levels and Groups

Wazuh rule levels represent alert significance according to Wazuh's rule model. Organizations should map levels to local severity and response rather than assuming a level alone determines incident impact.

Groups categorize alerts by source or behavior and support dashboards and queries.

## 23. Custom Rule Practices

- Use local SID ranges according to Wazuh guidance.
- Do not edit vendor files directly.
- Add meaningful description.
- Group consistently.
- Map ATT&CK only when supported.
- Include owner and test.
- Validate upgrade behavior.
- Avoid overly broad suppression.

## 24. Rule Testing

Use Wazuh testing tools or isolated ingestion according to installed version.

Test:

- Raw event.
- Decoder result.
- Matched rule.
- Alert fields.
- Benign variant.
- Malicious variant.
- Frequency behavior.
- Missing fields.

A rule test passing does not prove production source collection works.

## 25. Dashboards

Dashboards support:

- Agent status.
- Alert trends.
- Authentication.
- FIM.
- Vulnerability-related findings.
- Compliance.
- MITRE mapping.
- Custom use cases.

Good dashboards:

- Answer a question.
- Show time range.
- Support drilldown.
- Display data freshness.
- Separate count from risk.
- Avoid misleading averages.

## 26. Querying

Wazuh-indexed data can be searched using the query capabilities available in the deployed dashboard and indexer.

Common fields may include:

- Agent name and ID.
- Rule ID, level, and groups.
- Source and destination IP.
- User.
- Decoder.
- Location.
- Full log.
- Timestamp.

Field names depend on event and schema. Inspect actual documents before building queries.

## 27. Query Workflow

1. Set time range.
2. Filter agent or source.
3. Filter rule group or ID.
4. Inspect raw and decoded fields.
5. Expand related events.
6. Normalize identities and addresses.
7. Save useful query.
8. Document evidence.

No results may mean wrong field, time, index, permissions, or ingestion.

## 28. Alert Tuning

Tuning may:

- Add frequency and time frame.
- Restrict host group.
- Exclude verified benign event.
- Change level.
- Improve decoder.
- Add context.
- Disable obsolete rule.

Before tuning:

1. Validate event.
2. Identify benign cause.
3. Determine affected scope.
4. Confirm alternate detection.
5. Test.
6. Assign owner and review.

## 29. Suppression Risks

Weak suppression:

```text
Ignore every alert from the backup server.
```

Better:

- Suppress one expected event.
- Only from approved process.
- During defined window.
- Preserve high-risk variants.
- Review after change.

## 30. Active Response

Wazuh can integrate active response actions such as blocking or executing approved scripts.

Risks:

- False-positive outage.
- Attacker-triggered denial of service.
- Unsafe scripts.
- Excess privilege.
- Missing rollback.

Begin in alert-only mode and apply prevention only to high-confidence, tested cases with governance.

## 31. Platform Health

Monitor:

- Manager service.
- Agent queue.
- Cluster health.
- Indexer status.
- Storage.
- Shard or index health where applicable.
- Dashboard connectivity.
- Certificate expiry.
- Event delay.
- Backup success.

SIEM health alerts should be sent through an independent path where possible.

## 32. Enterprise Scenarios

### Small Business

Wazuh monitors Windows endpoints and Linux servers. A disconnected-agent dashboard identifies an accounting laptop missing telemetry.

### Financial Institution

A custom rule correlates privileged group change with an unusual logon. PAM and domain events enrich the case.

### Healthcare Organization

FIM detects a change to clinical application configuration. Change records distinguish an approved update from tampering.

### Educational Institution

Student lab authentication failures create noise. Rules group by source, target count, and time while preserving spray detection.

### Government Agency

SCA checks hardened Linux servers. Approved exceptions are documented instead of globally disabling failed checks.

### Cloud Environment

Autoscaled Linux agents use deployment automation and role-based grouping. Terminated instances are removed from stale-agent reporting through lifecycle integration.

## 33. Investigation Workflow

1. Validate alert and source health.
2. Inspect rule logic and level.
3. Review raw event.
4. Review decoded fields.
5. Identify agent, user, process, and network context.
6. Search related rule groups.
7. Correlate endpoint, identity, and network evidence.
8. Assess business impact.
9. Contain or escalate.
10. Record tuning or coverage gaps.

## 34. Security+ SY0-701 Alignment

This lesson supports SIEM agents, log collection, parsing, rules, dashboards, queries, FIM, configuration assessment, alert tuning, and response.

Agents, decoders, rules, FIM, and active-response controls are technical controls. Deployment, tuning, triage, and health review are operational controls. Wazuh monitoring standards are managerial controls and directive in function.

## 35. Classroom Hands-On Practical

### Practical Title

Deploy, Validate, and Tune a Wazuh Agent

### Safety

Use an isolated Wazuh lab and approved agents. Do not send production logs or enable automated blocking.

### Tasks

1. Document architecture and data path.
2. Enroll one Linux or Windows agent.
3. Assign the correct group.
4. Confirm connection and keepalive.
5. Generate an approved authentication event.
6. Verify collection, decoding, rule, indexing, and dashboard visibility.
7. Configure one approved additional log source.
8. Trigger one FIM change in a lab directory.
9. Query related alerts.
10. Propose and test one narrow tuning change.

### Validation Table

| Stage | Evidence | Result |
|---|---|---|
| Agent enrolled | Agent record |  |
| Source collected | Raw event |  |
| Decoded | Extracted fields |  |
| Rule matched | Rule ID and level |  |
| Indexed | Search result |  |
| Tuned | Positive and benign tests |  |

## 36. Take-Home Practical

Design a Wazuh deployment for one organization. Include:

- Architecture and sizing assumptions.
- Agent groups.
- Windows and Linux sources.
- Network and cloud integrations.
- FIM and SCA.
- Decoder and rule lifecycle.
- Dashboard questions.
- Query workflow.
- Alert tuning.
- Active-response governance.
- Platform health and recovery.

## 37. Assessment Questions

### Multiple Choice

1. What does the Wazuh manager primarily do?
   A. Receives and analyzes events
   B. Replaces every endpoint OS
   C. Provides physical security
   D. Issues DHCP leases

2. What does a decoder do?
   A. Extracts structured fields
   B. Encrypts disks
   C. Creates users
   D. Assigns VLANs

3. What does a rule do?
   A. Evaluates events for security meaning
   B. Patches every host
   C. Creates DNS records
   D. Disables logs

4. Why use agent groups?
   A. Apply role-specific shared configuration
   B. Remove ownership
   C. Disable enrollment
   D. Make every host identical

5. What does FIM indicate?
   A. A monitored object changed
   B. The change is certainly malware
   C. DNS failed
   D. Password expired

6. Why verify agent health?
   A. Missing telemetry can look like no security activity
   B. Agents always self-repair
   C. Health changes CVE
   D. It removes storage

7. Why preserve raw events?
   A. Parsing may lose or misinterpret detail
   B. Raw events contain no value
   C. Rules do not use fields
   D. Dashboards replace evidence

8. What is unsafe tuning?
   A. Broadly suppressing all alerts from a server
   B. Testing a narrow exception
   C. Assigning an owner
   D. Reviewing expiry

9. Why begin active response in alert mode?
   A. Validate confidence and impact before blocking
   B. Disable evidence
   C. Remove rules
   D. Avoid testing

10. Which is an operational control?
    A. Weekly agent-health review
    B. Decoder regex
    C. FIM engine
    D. Rule match

### Short Answer

1. Explain Wazuh architecture and data flow.
2. Design secure agent enrollment.
3. List high-value Windows and Linux sources.
4. Explain FIM and SCA limitations.
5. Describe decoder development.
6. Describe rule testing.
7. Explain dashboard and query design.
8. Describe safe alert tuning.

### Scenario Questions

1. A critical server sends no alerts for a week. Investigate.
2. A custom application log does not parse. Describe decoder development.
3. FIM alerts after an approved patch. Tune safely.
4. Active response blocks a shared proxy. Describe response.
5. Indexer storage is nearly full. Describe operational action.

## 38. Glossary

| Term | Definition |
|---|---|
| Active Response | Automated action triggered by selected Wazuh conditions. |
| Agent Group | Set of Wazuh agents receiving shared configuration. |
| Decoder | Logic extracting fields from a raw event. |
| FIM | Monitoring selected files and directories for change. |
| Rule Level | Wazuh significance value assigned by rule logic. |
| SCA | Security configuration assessment against policy checks. |
| Wazuh Agent | Endpoint component collecting and monitoring supported telemetry. |
| Wazuh Dashboard | Search, visualization, and management interface. |
| Wazuh Indexer | Component storing and indexing Wazuh security data. |
| Wazuh Manager | Component receiving, decoding, and analyzing events. |

## 39. Lesson Review Checklist

- I can explain Wazuh architecture.
- I can plan and validate agent deployment.
- I can configure log sources.
- I can explain decoders and rules.
- I can query alerts and build useful dashboards.
- I can tune narrowly and test.
- I can monitor platform and agent health.

## 40. Continuity With Future Lessons

Lesson 32 expands Wazuh and SIEM concepts into detection engineering, Sigma rules, ATT&CK mapping, false-positive reduction, and SOAR.

Students should retain that a detection is only as reliable as its source, parser, fields, logic, tests, and operational owner.
