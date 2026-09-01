# Lesson 33: Incident Response

## Lesson Overview

Incident response (IR) prepares an organization to detect, analyze, contain, eradicate, recover from, and learn from cybersecurity incidents. Effective response coordinates technical teams, business owners, legal, privacy, communications, leadership, vendors, and external authorities.

NIST SP 800-61 Revision 3 integrates incident response across all six NIST Cybersecurity Framework 2.0 functions: Govern, Identify, Protect, Detect, Respond, and Recover. This lesson applies that current risk-management view while retaining the practical workflow required by the curriculum: identification, containment, eradication, recovery, lessons learned, and incident reporting.

## Learning Objectives

Students will be able to:

- Explain current NIST incident-response guidance and practical lifecycle activities.
- Distinguish events, alerts, incidents, and crises.
- Validate, classify, scope, and prioritize incidents.
- Select short-term and long-term containment.
- Eradicate root cause and persistence.
- Recover systems safely and monitor recurrence.
- Conduct lessons-learned reviews without blame.
- Write clear incident reports for technical and executive audiences.
- Preserve evidence, chain of custody, and decision records.

## Prerequisite Knowledge

Students should understand alerts, logs, SIEM, EDR, identity, malware, network detection, cloud, vulnerability management, and detection engineering from previous lessons.

## Enterprise Relevance

Incidents can involve:

- Ransomware.
- Business email compromise.
- Cloud-account takeover.
- Data exposure.
- Insider misuse.
- Lost devices.
- Vulnerability exploitation.
- Service disruption.
- Supply-chain compromise.

Response quality determines business impact, regulatory exposure, recovery time, and stakeholder trust.

## 1. Incident Response

Incident response is the organized capability for managing suspected and confirmed cybersecurity incidents.

Uncoordinated response can increase damage, destroy evidence, interrupt critical services, and create inconsistent communication.

IR uses:

- Governance.
- Plans and playbooks.
- Trained roles.
- Detection.
- Investigation.
- Containment.
- Eradication.
- Recovery.
- Communication.
- Improvement.

IR applies across on-premises, cloud, SaaS, endpoints, applications, third parties, and physical locations.

## 2. Event, Alert, Incident, and Crisis

| Term | Meaning |
|---|---|
| Event | Observable occurrence |
| Alert | Analytic result requiring evaluation |
| Incident | Occurrence jeopardizing confidentiality, integrity, availability, or policy |
| Crisis | Event with severe enterprise consequences requiring executive crisis management |

Not every alert is an incident. An incident may exist before an alert fires.

## 3. NIST SP 800-61 Revision 3 Context

Current NIST guidance treats incident response as part of cybersecurity risk management across:

- **Govern:** policy, roles, risk, oversight.
- **Identify:** assets, risk, dependencies, improvements.
- **Protect:** safeguards that reduce incident likelihood and impact.
- **Detect:** find and analyze events.
- **Respond:** manage, contain, communicate, mitigate.
- **Recover:** restore, communicate, and improve.

IR preparation is therefore not a separate phase performed only by the SOC.

## 4. Practical Response Workflow

Operational activities remain:

1. Prepare.
2. Identify and analyze.
3. Contain.
4. Eradicate.
5. Recover.
6. Learn and improve.

These activities overlap and repeat. Recovery may reveal persistence and return the team to containment.

## 5. Preparation

Preparation includes:

- IR policy and plan.
- Roles and contact lists.
- Playbooks.
- Logging and retention.
- Tools and access.
- Evidence procedures.
- Backups.
- Exercises.
- Vendor and law-enforcement contacts.
- Communications templates.
- Legal and regulatory requirements.

An IR plan not exercised may fail when people, credentials, tools, or contacts are unavailable.

## 6. Roles

| Role | Responsibility |
|---|---|
| Incident commander | Coordinates priorities, decisions, and status |
| Lead investigator | Directs technical analysis |
| SOC analyst | Validates and escalates alerts |
| IT operations | Contains, restores, and validates systems |
| IAM team | Revokes sessions, credentials, and privilege |
| Legal/privacy | Advises on obligations and evidence |
| Communications | Coordinates approved messaging |
| Business owner | Defines operational impact and recovery need |
| Scribe | Maintains timeline and decision log |

One person may hold several roles in a small organization, but responsibilities should remain explicit.

## 7. Incident Identification

Identification determines whether observed activity is an incident and establishes initial scope and priority.

Premature closure misses attacks; premature crisis declaration wastes resources.

1. Validate alert and source health.
2. Review raw evidence.
3. Identify assets and identities.
4. Build timeline.
5. Determine affected security objectives.
6. Identify known attacker actions.
7. Estimate scope and confidence.
8. Assign severity.

Evidence comes from SIEM, EDR, identity, email, cloud, firewall, applications, users, and third parties.

## 8. Triage Questions

- What happened?
- When did it begin?
- Which assets and accounts are affected?
- Is activity ongoing?
- What data or service is at risk?
- What privilege does the attacker have?
- Is evidence reliable?
- What containment is urgent?
- What business operations depend on the system?
- Who must be notified now?

## 9. Severity

Consider:

- Scope.
- Data sensitivity.
- Privilege.
- Operational disruption.
- Safety.
- Legal obligations.
- Attacker persistence.
- Public exposure.
- Recovery capability.

Severity can change as evidence develops.

## 10. Incident Declaration

Declaration should record:

- Case ID.
- Date and time.
- Declaring authority.
- Initial facts.
- Severity.
- Incident commander.
- Stakeholders.
- Next actions.

Use one authoritative case record to avoid conflicting timelines.

## 11. Scoping

Scope by:

- User.
- Device.
- IP.
- Process.
- File hash.
- Domain.
- Cloud resource.
- Token.
- Time.
- Behavior.

Do not scope only by one IOC. Attackers change infrastructure and may use valid tools.

## 12. Containment

Containment limits ongoing harm while preserving essential operations and evidence.

Investigation without containment can allow continued theft, encryption, or movement.

Actions may include:

- Isolate endpoint.
- Disable account.
- Revoke sessions.
- Block network path.
- Quarantine email.
- Remove public access.
- Suspend compromised key.
- Segment a zone.
- Disable vulnerable service.

Contain at endpoint, identity, network, application, cloud, data, or business-process layer.

## 13. Short-Term and Long-Term Containment

### Short-Term

Rapid action to stop immediate harm.

### Long-Term

Controlled temporary state allowing business operation while eradication proceeds.

Example:

- Short-term: isolate compromised web server.
- Long-term: deploy clean replacement behind stricter firewall while investigation continues.

## 14. Containment Decision

Balance:

- Active harm.
- Evidence preservation.
- Business availability.
- Safety.
- Attacker awareness.
- Containment confidence.
- Recovery readiness.

Watching an attacker longer can produce intelligence but requires explicit authorization and risk ownership.

## 15. Identity Containment

May require:

- Disable account.
- Reset password.
- Revoke refresh tokens and sessions.
- Remove MFA methods.
- Remove malicious application consent.
- Rotate API keys.
- Review privileged roles.
- Invalidate certificates.

Password reset alone is often insufficient.

## 16. Cloud Containment

- Restrict roles.
- Disable keys.
- Snapshot evidence.
- Isolate security groups.
- Block public access.
- Preserve audit logs.
- Quarantine workloads.
- Prevent automation from recreating compromised state.

Deleting a resource too early can destroy evidence.

## 17. Eradication

Eradication removes attacker access, persistence, malware, vulnerable conditions, and root cause.

Containment alone does not restore trust.

- Remove persistence.
- Patch vulnerability.
- Rebuild systems.
- Rotate secrets.
- Correct permissions.
- Remove malicious rules and accounts.
- Update detections.
- Correct configuration.

Eradication may span endpoint, identity, cloud, application, network, and supplier environments.

## 18. Root Cause

Distinguish:

- Initial access.
- Enabling vulnerability.
- Control failure.
- Persistence.
- Process weakness.

Example:

- Initial access: phishing.
- Enabling weakness: non-phishing-resistant MFA.
- Persistence: stolen token and mailbox rule.
- Process weakness: delayed alert review.

## 19. Rebuild Versus Clean

Rebuild is often preferred when:

- Privileged compromise occurred.
- System integrity is uncertain.
- Rootkit or unknown persistence is possible.
- Clean image exists.

Cleaning may be appropriate when:

- Scope is clear.
- Artifact is fully understood.
- Rebuild is unsafe or impossible.
- Validation is strong.

Neither choice resolves stolen credentials or other compromised systems automatically.

## 20. Recovery

Recovery restores systems and business operations to a trusted state.

Availability must return without reintroducing compromise.

1. Confirm eradication criteria.
2. Restore from trusted source.
3. Patch and harden.
4. Rotate credentials.
5. Validate monitoring.
6. Test business function.
7. Return in stages.
8. Increase monitoring.

Recovery includes technology, data, identity, suppliers, users, and communications.

## 21. Recovery Validation

Validate:

- System integrity.
- Security controls.
- Authentication.
- Network policy.
- Application function.
- Data completeness.
- Backup integrity.
- Logs.
- Detection.
- User acceptance.

Use defined recovery time and recovery point objectives where applicable.

## 22. Monitoring After Recovery

Watch for:

- Repeated IOC and IOA.
- Authentication anomaly.
- Persistence recreation.
- Data transfer.
- Security-control impairment.
- Reinfection.
- Attacker use of alternate accounts.

Define heightened-monitoring duration and exit criteria.

## 23. Evidence Preservation

Evidence may include:

- Logs.
- Disk images.
- Memory.
- PCAP.
- Cloud snapshots.
- Emails.
- Files.
- Screenshots.
- Interviews.
- Tickets.

Record:

- Collector.
- Date and time.
- Method.
- Source.
- Hash.
- Storage.
- Transfers.

## 24. Chain of Custody

Chain of custody records possession and handling of evidence.

It supports:

- Integrity.
- Reproducibility.
- Legal process.
- Internal discipline.

Every transfer should record who, when, what, why, and how.

## 25. Communication

Audiences:

- Responders.
- Leadership.
- Employees.
- Customers.
- Regulators.
- Law enforcement.
- Insurers.
- Vendors.

Communication should be:

- Accurate.
- Timely.
- Authorized.
- Audience-specific.
- Consistent.
- Protected.

Do not speculate beyond evidence.

## 26. Status Updates

Include:

- Current facts.
- Impact.
- Scope.
- Actions completed.
- Risks.
- Decisions needed.
- Next update time.

Separate facts, assumptions, and unknowns.

## 27. Lessons Learned

A lessons-learned review identifies improvements after an incident.

Incidents expose gaps in people, process, technology, architecture, and governance.

Ask:

- What worked?
- What failed?
- What delayed response?
- Which evidence was missing?
- Which decisions lacked authority?
- Did containment affect business?
- What must change?

Improvements feed risk, architecture, detection, training, patching, IAM, and plans.

## 28. Blameless Review

Blameless does not mean no accountability. It means examining system conditions and decisions without discouraging honest reporting.

Actions need:

- Owner.
- Due date.
- Priority.
- Verification.
- Governance tracking.

## 29. Incident Report

Structure:

1. Executive summary.
2. Incident classification.
3. Scope.
4. Timeline.
5. Detection and identification.
6. Containment.
7. Eradication.
8. Recovery.
9. Business and data impact.
10. Root cause.
11. Evidence.
12. Lessons and actions.

## 30. Timeline

Use:

- Normalized time.
- Source.
- Event.
- Actor.
- Asset.
- Evidence.
- Confidence.

Preserve original time and time zone. Distinguish event time from discovery and ingestion time.

## 31. Incident Metrics

- Mean time to detect.
- Mean time to contain.
- Mean time to recover.
- Dwell time.
- Escalation delay.
- Evidence-source availability.
- Recurrence.
- Action completion.

Metrics can mislead if start and stop definitions differ.

## 32. Playbooks

Develop playbooks for:

- Phishing and BEC.
- Ransomware.
- Lost device.
- Cloud key exposure.
- Privileged account compromise.
- Web exploitation.
- Data leakage.
- DDoS.

Playbooks guide decisions but do not replace judgment.

## 33. Enterprise Scenarios

### Small Business

A mailbox compromise changes supplier payment details. The team revokes sessions, removes rules, contacts the bank and supplier, and reviews other mailboxes.

### Financial Institution

An actively exploited VPN is isolated through redundant access. Sessions and credentials are revoked while customer services remain available.

### Healthcare Organization

Ransomware affects a clinical segment. Patient safety drives staged containment and tested restoration.

### Educational Institution

A compromised student account scans servers. Identity, endpoint, and network evidence determine whether it is malware or intentional misuse.

### Government Agency

An administrator token is stolen. Responders protect the identity control plane, preserve evidence, and rotate high-value credentials.

### Cloud Environment

An API key creates resources and accesses storage. Cloud audit logs, role changes, workload snapshots, and billing evidence define scope.

## 34. Security+ SY0-701 Alignment

This lesson supports incident response, preparation, detection, analysis, containment, eradication, recovery, evidence, communication, lessons learned, and reporting.

Isolation, session revocation, and blocking are technical controls. Triage, containment coordination, recovery, and lessons learned are operational controls. IR policy and authority are managerial controls and directive in function.

## 35. Classroom Hands-On Practical

### Practical Title

Run a Tabletop Incident Response

### Scenario

A SIEM alert shows:

- Phishing attachment.
- PowerShell execution.
- Credential access.
- Remote logon.
- Large cloud download.

### Tasks

1. Declare or reject the incident.
2. Assign roles.
3. Classify severity.
4. Build initial scope.
5. Choose containment.
6. Identify evidence.
7. Define eradication.
8. Plan recovery.
9. Draft a status update.
10. Create lessons-learned actions.

### Decision Log

| Time | Decision | Evidence | Owner | Risk | Result |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 36. Take-Home Practical

Create an incident-response plan containing:

- Governance and authority.
- NIST CSF integration.
- Roles and contacts.
- Severity matrix.
- Identification workflow.
- Containment options.
- Evidence and chain of custody.
- Eradication and recovery criteria.
- Communication.
- Report template.
- Metrics and exercises.

## 37. Assessment Questions

### Multiple Choice

1. What is an incident?
   A. Occurrence jeopardizing security objectives or policy
   B. Every log event
   C. Every alert
   D. Only malware

2. How does current NIST guidance treat IR?
   A. Integrated across CSF risk-management functions
   B. SOC-only activity
   C. Recovery-only process
   D. One technical control

3. What is short-term containment?
   A. Rapid action limiting immediate harm
   B. Final recovery
   C. Lessons learned
   D. Risk acceptance

4. Why is password reset often insufficient?
   A. Sessions, tokens, keys, and persistence may remain
   B. Passwords control disks only
   C. Reset deletes logs
   D. MFA cannot be changed

5. What is eradication?
   A. Removal of access, persistence, and root cause
   B. Alert creation
   C. Initial triage
   D. Communication only

6. What should recovery restore?
   A. Trusted business operation
   B. Vulnerable state
   C. Attacker access
   D. Unverified backups

7. What does chain of custody record?
   A. Evidence possession and handling
   B. Firewall routes
   C. User passwords
   D. Patch severity

8. What should a status update separate?
   A. Facts, assumptions, and unknowns
   B. Users and groups only
   C. Ports and protocols only
   D. Patches and backups only

9. What should lessons learned produce?
   A. Owned and verified improvements
   B. Blame only
   C. Deleted evidence
   D. No changes

10. Which is an operational control?
    A. Incident containment procedure
    B. EDR isolation command
    C. Firewall block
    D. Token revocation mechanism

### Short Answer

1. Distinguish events, alerts, incidents, and crises.
2. Explain NIST SP 800-61 Rev. 3 context.
3. Describe identification and severity.
4. Compare short- and long-term containment.
5. Explain eradication and root cause.
6. Describe recovery validation.
7. Explain evidence and chain of custody.
8. Write an incident-report structure.

### Scenario Questions

1. A compromised mailbox diverts payment. Describe response.
2. Ransomware affects a hospital. Prioritize containment and recovery.
3. A cloud API key is public. Describe identity and evidence response.
4. A restored server recreates persistence. Explain lifecycle iteration.
5. Leadership requests certainty before evidence is complete. Draft communication.

## 38. Glossary

| Term | Definition |
|---|---|
| Chain of Custody | Record of evidence possession and handling. |
| Containment | Action limiting ongoing incident harm. |
| Eradication | Removal of attacker access, persistence, and root cause. |
| Event | Observable occurrence in a system or network. |
| Incident | Occurrence jeopardizing security objectives or policy. |
| Incident Commander | Role coordinating priorities, decisions, and status. |
| Recovery | Restoration of trusted business operations. |
| Root Cause | Underlying condition enabling an incident. |
| Scribe | Role maintaining timeline and decision records. |

## 39. Lesson Review Checklist

- I can explain current NIST incident-response guidance.
- I can identify and classify incidents.
- I can select containment by risk.
- I can plan eradication and recovery.
- I can preserve evidence and chain of custody.
- I can communicate clearly.
- I can conduct lessons learned and write reports.

## 40. Continuity With Future Lessons

Lesson 34 enriches incident and alert evidence with threat intelligence using VirusTotal, AbuseIPDB, AlienVault OTX, MISP, IOC investigation, and alert enrichment.

Students should retain that intelligence supports a decision but does not replace local evidence.
