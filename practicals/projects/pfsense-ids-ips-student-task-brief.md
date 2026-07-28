# Fintech Payment Network Segmentation and IDS/IPS Defence

## Scenario-Based Student Project Brief

**Client:** NovaPay Financial Technologies

**Industry:** Digital payments and financial technology

**Student role:** Junior Fintech Security Engineer

**Engagement:** Secure and defend a payment operations environment after suspicious internal activity

**Difficulty:** Intermediate to advanced

> This is an outcome-based assessment. It intentionally provides no commands, menu paths, or prescribed solution sequence. Students must choose suitable methods, justify decisions, validate controls, troubleshoot failures, and submit professional evidence.

## 1. Client Scenario

NovaPay Financial Technologies is a fictional but realistic fintech company that processes wallet funding, merchant payments, transfers, and transaction-status enquiries. Its finance operations team uses employee workstations to review failed payments and resolve customer cases. A Linux application server supports an internal payment operations portal and stores simulated transaction and customer-support data.

During a recent security review, monitoring personnel observed repeated connection attempts from a finance operations workstation toward several services on the payment application server. The source device had recently been associated with a suspected phishing event. The company cannot yet determine whether the activity was an authorised support action, automated discovery, stolen-credential use, or the beginning of lateral movement.

The existing environment has weak separation between employee endpoints and payment infrastructure. Firewall rules are poorly documented, denied traffic is not consistently reviewed, and the company has not demonstrated that its intrusion detection controls can identify or safely prevent suspicious internal activity. A mistake could expose customer data, enable transaction manipulation, interrupt payment processing, create fraud losses, or produce unreliable audit evidence.

NovaPay has commissioned an urgent security improvement and assurance engagement using free and community-accessible tools:

- pfSense will provide routing, segmentation, firewalling, and policy logging.
- Suricata will provide network intrusion detection and controlled prevention.
- Kali Linux will represent the finance workstation under investigation and the authorised validation platform.
- Ubuntu Server will represent the protected internal payment operations application.

Executive management, Security Operations, Fraud Operations, IT, and Compliance require proof that:

- employee and payment-system networks are genuinely segmented;
- payment infrastructure accepts only justified administrative and application traffic;
- attempted lateral movement and suspicious discovery are visible;
- security analysts can distinguish fraud-related activity, authorised testing, and false positives;
- selected high-confidence activity can be prevented without disrupting legitimate payment operations;
- evidence is sufficiently complete for incident review and audit;
- changes and failures can be reversed without losing critical protection;
- technical findings can be communicated as business, fraud, customer, and regulatory risk.

## 2. Mission

Deliver a defensible fintech network security solution that reduces lateral-movement risk while preserving the availability and integrity of payment operations. The engagement covers the complete professional lifecycle:

1. scope and baseline the environment;
2. design trust zones and authorised data flows;
3. establish secure connectivity;
4. enforce least privilege;
5. collect useful security telemetry;
6. validate IDS and IPS behaviour;
7. investigate a simulated incident;
8. test backup and recovery;
9. provide operational handover to IT, Security Operations, Fraud Operations, and Compliance.

### Business impact priorities

Students must consider all four priorities when making security decisions:

1. **Transaction integrity:** prevent unauthorised alteration or manipulation of simulated payment data.
2. **Customer-data confidentiality:** minimise access to simulated customer and transaction information.
3. **Payment availability:** avoid unnecessary interruption to approved payment operations.
4. **Accountability:** preserve logs and evidence needed to reconstruct access and security decisions.

## 3. Authorised Environment

| Component | Security function | Required placement |
|---|---|---|
| pfSense | Gateway, firewall, logging point, IDS/IPS platform | WAN, USERS, and SERVERS |
| Kali Linux | Suspected-compromised finance workstation and authorised validation platform | USERS |
| Ubuntu Server | Internal payment operations application and simulated transaction-data asset | SERVERS |
| WAN/NAT | Simulated external connectivity | pfSense WAN only |

| Zone | Network | Required endpoint |
|---|---:|---:|
| USERS | `10.10.10.0/24` | Kali: `10.10.10.10` |
| SERVERS | `10.10.20.0/24` | Ubuntu: `10.10.20.20` |

Students must select and document firewall interface addresses, gateway strategy, DNS strategy, management access, and any DHCP use.

## 4. Rules of Engagement

- Test only the assigned lab assets and networks.
- Do not scan the internet, host computer, classmates, or any unapproved system.
- Treat Kali as an authorised assessment platform, not permission to attack unrelated targets.
- Begin Suricata validation in detection mode before considering prevention.
- Preserve relevant evidence before changing states, rules, services, or alert settings.
- Record every material configuration change and its validation.
- Do not create unrestricted inter-zone access merely to make a test succeed.
- Do not disable a control without documenting risk, approval, duration, and restoration.
- Stop testing if it causes instability or activity outside the lab.
- Do not expose passwords, tokens, private keys, or sensitive configuration in submissions.

## 5. Security Requirements

| ID | Requirement |
|---|---|
| SR-01 | Finance user endpoints and payment application systems must be separate security zones. |
| SR-02 | No endpoint may bypass pfSense for inter-zone communication. |
| SR-03 | Ubuntu must provide an approved administration service and a simulated internal payment application service for access-control testing. |
| SR-04 | Each protected service must be accessible only from explicitly authorised sources and for a documented business purpose. |
| SR-05 | Unapproved inter-zone traffic must be denied by default. |
| SR-06 | Required outbound access must be limited and justified. |
| SR-07 | Permitted, denied, and suspicious activity must produce useful evidence. |
| SR-08 | Suricata must detect approved test activity on a justified inspection path. |
| SR-09 | At least one approved malicious or policy-violating condition must be prevented after IDS validation. |
| SR-10 | Legitimate payment operations and authorised administration must survive security changes. |
| SR-11 | Important claims must be supported by reproducible evidence. |
| SR-12 | The approved security configuration must be backed up and recovery-tested. |
| SR-13 | Simulated customer and transaction data must not be exposed in screenshots, logs, reports, or repositories. |
| SR-14 | Security evidence must support investigation by Security Operations, Fraud Operations, and Compliance. |
| SR-15 | High-risk changes must include business-impact analysis, approval, validation, and rollback criteria. |

# 6. Student Work Packages

The work packages define required outcomes, not implementation steps.

## WP01 — Engagement Definition

### Task

Convert the scenario into a formal, authorised security engagement.

### Required output

- scope and exclusions;
- authorised target register;
- test limitations and stop conditions;
- team responsibility matrix;
- assumptions and constraints;
- evidence-preservation plan.

### Acceptance criteria

Every tested asset and activity is explicitly authorised, and responsibilities are unambiguous.

## WP02 — Baseline and Asset Assessment

### Task

Establish a trustworthy record of the supplied environment before security changes.

### Required analysis

- interfaces, addresses, routes, gateways, and DNS;
- listening services and their owners;
- existing controls and administrative exposure;
- baseline permitted and prohibited connectivity;
- insecure defaults and configuration conflicts.
- exposure of simulated customer records, transaction data, administrative interfaces, or payment services;
- dependencies whose failure could interrupt payment operations.

### Required output

Asset inventory, data classification, service inventory, payment-service dependency map, baseline connectivity matrix, initial findings, and timestamped evidence.

### Acceptance criteria

Another engineer can understand the starting condition and distinguish verified facts from assumptions.

## WP03 — Secure Architecture Design

### Task

Design the target architecture and justify its trust boundaries.

### Required output

- logical topology;
- data-flow and trust-boundary diagram;
- addressing plan;
- management path;
- payment operations and administrative data flows;
- firewall enforcement points;
- IDS/IPS inspection point;
- logging sources;
- design decision record with alternatives and trade-offs.

### Acceptance criteria

Approved and prohibited flows can be traced, every interface has a security purpose, and the design matches the assigned networks.

## WP04 — Gateway and Endpoint Configuration

### Task

Establish pfSense as the authoritative path between zones and place each endpoint in its required zone.

### Required outcomes

- correct interface identity and addressing;
- stable endpoint addressing and routing;
- controlled administrative access;
- no accidental bridging or bypass;
- no duplicate addresses or unintended routes;
- persistence across an authorised restart.

### Required output

Interface register, endpoint network record, route and gateway evidence, persistence test, and deviation log.

## WP05 — Server Service Exposure and Hardening

### Task

Prepare Ubuntu as a realistic internal payment operations asset while reducing unnecessary attack surface.

### Required outcomes

- an approved administration service and simulated payment application service are available for policy testing;
- every listening service has an owner and business purpose;
- unnecessary exposure is removed or accepted as a documented risk;
- authentication and host controls complement the network firewall.
- simulated transaction and customer-support data is classified and protected;
- service dependencies and acceptable outage impact are documented.

### Required output

Before-and-after service inventory, data classification record, hardening checklist, service justification, authentication summary, availability impact assessment, and residual-risk statement.

## WP06 — Firewall Policy Engineering

### Task

Translate business requirements into a maintainable least-privilege rulebase.

### Required policy fields

For every required flow, define its business owner, data handled, source, destination, service, direction, action, logging requirement, review date, fraud/security risk, and availability impact.

### Mandatory outcomes

- authorised administration works only from an approved source;
- unauthorised USERS access is denied and observable;
- unapproved payment-server services are inaccessible from USERS;
- outbound access is justified;
- temporary diagnostic access does not become permanent policy;
- no unexplained broad any-to-any rule remains;
- rule order, shadowing, redundancy, and stateful behaviour are reviewed.

### Required output

Firewall policy matrix, final rule evidence, allow-rule justifications, denial evidence, and rulebase review.

## WP07 — Segmentation Validation

### Task

Prove that segmentation is enforced rather than assumed.

### Required test categories

- approved user-to-server administration;
- unauthorised user-to-server administration;
- authorised access to the simulated payment application;
- access to an unapproved payment-server service;
- endpoint-to-gateway communication;
- required outbound connectivity;
- return traffic for an established approved session;
- traffic initiated without a documented requirement.

### Required output

A test plan with unique IDs, expected outcomes recorded before execution, actual results, timestamps, evidence references, remediation, and retest results.

### Acceptance criteria

Both positive and negative security tests are included. A successful ping alone is not proof of secure segmentation.

## WP08 — Stateful Inspection Investigation

### Task

Demonstrate how firewall state affects policy changes and live connections.

### Required analysis

- compare established sessions with new sessions after a controlled policy change;
- distinguish rule evidence from state-table evidence;
- assess the operational risk of clearing state;
- recommend a safe production change approach.

### Required output

Controlled test record, state evidence, technical explanation, and operational recommendation.

## WP09 — Firewall Logs and Packet Evidence

### Task

Establish enough visibility to distinguish policy denial, routing failure, service failure, host-control denial, suspicious discovery, and possible fraud-related access.

### Required output

- an allowed-flow record;
- a denied-flow record;
- packet evidence for a selected flow;
- a correlation table with source, destination, service, interface, action, and time;
- an explanation of what each evidence item proves.
- a privacy review confirming that evidence does not unnecessarily expose simulated customer or transaction data.

### Acceptance criteria

Endpoint, firewall, and packet evidence agree, with time and timezone clearly identified.

## WP10 — Suricata IDS Engineering

### Task

Deploy Suricata in detection mode on a justified inspection path.

### Required decisions

- inspection location and traffic coverage;
- free and legally usable rule sources;
- update and health-monitoring approach;
- alert retention;
- performance constraints;
- encrypted-traffic and architectural blind spots.

### Required output

IDS design note, rule-source inventory, sensor-health evidence, coverage analysis, and alert-retention plan.

## WP11 — Detection Validation and Alert Triage

### Task

Generate authorised test activity and determine whether resulting alerts are accurate, useful, and actionable.

### Required test categories

- controlled discovery;
- permitted connection activity;
- denied connection activity;
- simulated access to the payment operations application;
- repeated attempts against a payment-system service;
- a deliberately selected IDS test condition;
- repeated or suspicious connection behaviour;
- normal baseline traffic for comparison.

### Analyse each selected alert

- event and affected systems;
- authorisation status;
- possible relationship to account compromise, lateral movement, fraud, or transaction manipulation;
- signature, severity, and confidence;
- true positive, false positive, benign positive, or inconclusive;
- corroborating evidence;
- recommended analyst action.

### Required output

Detection plan, raw alert evidence, at least three materially different triage records, correlated evidence, missed-detection analysis, and coverage recommendations.

## WP12 — False-Positive Tuning

### Task

Reduce unhelpful alert noise without hiding relevant threats.

### Required outcomes

- identify and measure one noisy or contextually benign condition;
- choose the narrowest defensible tuning;
- assess the detection risk introduced;
- prove related hostile activity remains detectable;
- prepare rollback.

### Required output

Before-and-after comparison, tuning decision, risk assessment, regression result, and rollback plan.

### Acceptance criteria

Disabling an entire rule category without exceptional evidence is not acceptable.

## WP13 — IPS Readiness and Prevention

### Task

Assess readiness for prevention and demonstrate a controlled transition from IDS to IPS.

### Required outcomes

- obtain approval for a written change and rollback plan;
- identify signatures suitable for blocking;
- prove at least one authorised test condition is prevented;
- prove prevention rather than ordinary application failure;
- retest approved administration and simulated payment operations;
- correct any unintended disruption.

### Required output

Readiness assessment, approved change record, before-and-after evidence, prevention evidence, continuity test, and rollback/recovery record.

## WP14 — Misconfiguration Diagnosis

### Task

Diagnose and correct an instructor-introduced security or connectivity fault.

### Possible fault classes

- addressing, gateway, or virtual-network error;
- rule applied on the wrong interface;
- shadowed or excessive permission;
- server service failure;
- stale firewall state;
- IDS inspecting the wrong path;
- incomplete logging;
- IPS blocking approved traffic.

### Required response

Record symptoms, rank hypotheses, select discriminating evidence, determine root cause, make the smallest safe correction, and run regression tests.

### Required output

Troubleshooting journal, hypothesis table, root-cause statement, change record, validation, and recurrence-prevention recommendation.

## WP15 — Incident Investigation

### Task

Investigate instructor-provided suspicious activity involving the finance workstation and protected payment environment.

### Required responsibilities

- validate the event;
- identify affected assets and accounts;
- distinguish authorised testing from hostile activity;
- determine whether simulated customer data or transaction integrity may be affected;
- determine whether Fraud Operations must be engaged;
- build a timeline from at least three evidence sources;
- assess technical severity and business impact;
- preserve evidence;
- recommend containment, eradication, recovery, and prevention;
- state uncertainty where evidence is insufficient.

### Required output

Incident ticket, evidence register, timeline, indicators, affected-asset list, data/transaction impact assessment, containment decision, incident report, Fraud Operations notification decision, and executive briefing.

## WP16 — Backup and Recovery

### Task

Protect the approved security configuration and prove it can be recovered.

### Required outcomes

- protect a current pfSense configuration backup;
- record versions, packages, rule sources, and dependencies;
- define recovery objectives and responsible roles;
- perform an instructor-approved recovery validation;
- rerun critical security tests after recovery.

### Required output

Backup register, integrity evidence, secure-storage statement, recovery test, post-recovery validation, and resilience limitations.

### Acceptance criteria

Downloading a backup without validating recovery is not sufficient.

## WP17 — Final Validation and Handover

### Task

Assess the completed environment against every requirement and hand it to an operations team.

### Required output

- requirements traceability matrix;
- final architecture and asset inventory;
- signed test report;
- firewall and IDS/IPS design records;
- unresolved-defect list;
- residual-risk register;
- executive summary for fintech leadership;
- technical report;
- IT, SOC, Fraud Operations, and Compliance responsibilities;
- improvement roadmap;
- go-live or no-go recommendation.

### Acceptance criteria

Every requirement has a status and evidence reference. Every residual risk has an owner, treatment decision, and target date.

# 7. Mandatory Acceptance Tests

Students design the exact method and evidence. The table specifies the security question and required outcome only.

| ID | Security question | Required outcome |
|---|---|---|
| AT-01 | Are Kali and Ubuntu in their assigned zones with the required identities? | Addresses, routes, gateways, and zone placement are proven |
| AT-02 | Can either endpoint bypass pfSense between zones? | No bypass path exists |
| AT-03 | Can the authorised source reach the approved Ubuntu administration service? | Access succeeds and is logged |
| AT-04 | Can an unauthorised USERS source reach that service? | Access is denied and observable |
| AT-05 | Can an approved finance user reach the simulated payment application? | Only the justified application flow succeeds and is logged appropriately |
| AT-06 | Can USERS reach an unapproved payment-server service? | Traffic is denied |
| AT-07 | Does stateful return traffic work for approved sessions? | Approved communication operates correctly |
| AT-08 | Do existing and new sessions respond correctly to a policy change? | Behaviour is explained with rule and state evidence |
| AT-09 | Does required outbound access work without excessive permission? | Only documented access succeeds |
| AT-10 | Does Suricata observe the intended traffic path? | Sensor health and visibility are proven |
| AT-11 | Does controlled suspicious activity create a useful alert? | Alert is generated, interpreted, and correlated |
| AT-12 | Can normal payment activity and suspicious activity be distinguished? | Classification is evidence-backed |
| AT-13 | Does tuning reduce noise without hiding the selected threat? | Noise decreases and regression passes |
| AT-14 | Does the approved IPS control prevent selected activity? | Drop and endpoint evidence prove prevention |
| AT-15 | Do legitimate payment operations work after IPS activation? | Approved application and administration services remain available |
| AT-16 | Can an injected fault be diagnosed without guesswork? | Root cause and minimal correction are demonstrated |
| AT-17 | Can multiple sources produce a consistent event timeline? | Events and evidence references correlate |
| AT-18 | Can potential customer-data and transaction impact be assessed? | Evidence supports a scoped and qualified impact conclusion |
| AT-19 | Can the security configuration be recovered? | Critical controls pass after recovery |
| AT-20 | Does the final environment satisfy all client requirements? | Traceability supports the final recommendation |

# 8. Instructor Injects

These injects contain no solutions. Students are assessed on judgement, evidence, communication, and recovery.

## Inject A — Approved access fails

An authorised payment-platform administrator can no longer reach Ubuntu during a time-sensitive failed-transaction investigation. Determine whether the cause is endpoint configuration, routing, policy, state, service, authentication, IDS/IPS, or another control. Assess the operational impact while preserving security.

## Inject B — Unexpected server exposure

A review suggests finance workstations can reach more payment-server services than policy permits. Measure exposure, determine what simulated customer or transaction data may be at risk, contain the weakness, identify root cause, and demonstrate that approved payment operations still work.

## Inject C — Alert flood

A scheduled payment reconciliation process creates a high volume of alerts. Triage the condition, assess analyst and fraud-monitoring impact, propose narrow tuning, and prove relevant hostile activity remains detectable.

## Inject D — Suspicious discovery

Suricata reports repeated service discovery and failed connections from the finance workstation toward the payment server shortly after a suspected phishing event. Correlate evidence, determine whether credentials or the workstation may be compromised, assess fraud and data risk, and recommend containment.

## Inject E — IPS disrupts business

The internal payment operations portal becomes unreliable after prevention is activated, delaying failed-payment reviews. Preserve evidence, determine causation, restore acceptable service safely, and refine the prevention control without reopening unnecessary access.

## Inject F — Missing telemetry

A suspicious transaction-support access event occurs, but expected firewall or IDS records are incomplete. Identify the gap, state whether customer-data access or transaction manipulation can be proven, restore visibility, and recommend audit-evidence improvements.

## Inject G — Gateway recovery

The firewall configuration becomes unusable during a controlled exercise. Recover it, verify integrity, and rerun critical acceptance tests.

## Inject H — Management challenge

The Chief Product Officer asks why finance staff cannot receive unrestricted access to payment servers and why IDS alone is insufficient. Defend the design in terms of fraud loss, customer trust, payment availability, auditability, cost, and operational trade-offs.

## Inject I — Suspicious privileged access

An administrative account accesses the payment server outside its normal support window shortly after repeated authentication failures. Determine whether this represents authorised emergency work, credential misuse, or an unresolved incident. Recommend containment that preserves payment availability and evidence.

## Inject J — Transaction integrity concern

Fraud Operations reports that a simulated transaction record no longer matches the expected value. Determine whether the discrepancy is an application error, authorised correction, data-quality issue, or potential unauthorised change. Define what network evidence can and cannot prove.

## Inject K — Third-party dependency outage

A simulated external payment dependency becomes unavailable while security controls are being changed. Determine whether the interruption is caused by local policy, IPS behaviour, routing, DNS, or the external dependency. Provide an evidence-based stakeholder update.

# 9. Evidence Standard

Every evidence item must identify:

- project/team and work-package ID;
- test ID;
- date, time, and timezone;
- source system or interface;
- analyst;
- purpose;
- what the evidence proves;
- original file or log reference.

Evidence must be authentic, interpretable, securely handled, and cross-referenced. Screenshots without explanations are insufficient. Preserve original logs and packet captures where possible. Record meaningful failed tests and hash important exported evidence when chain of custody matters.

Suggested filename:

`TEAM-WP-TEST-SYSTEM-DATE-SEQUENCE`

# 10. Submission Structure

```text
femtech-enterprise-defence/
|-- 01-governance/
|-- 02-design/
|-- 03-configuration-records/
|-- 04-firewall-policy/
|-- 05-ids-ips/
|-- 06-testing/
|-- 07-evidence/
|   |-- screenshots/
|   |-- logs/
|   `-- packet-captures/
|-- 08-incident/
|-- 09-recovery/
`-- 10-final-report/
```

# 11. Oral Defence

Students must be ready to answer with evidence from their own environment:

1. What prevents a USERS endpoint from bypassing pfSense?
2. Why is working routing not proof of secure segmentation?
3. Which requirement justifies each allow rule?
4. Why is the selected Suricata inspection point appropriate?
5. What relevant traffic is invisible or difficult to inspect?
6. How did you distinguish policy denial from service failure?
7. Why can an existing session survive a rule change?
8. What proves an IPS action rather than an ordinary connection failure?
9. What risk did your alert tuning introduce?
10. How did you prove legitimate service continuity?
11. What is the most important residual risk?
12. What conclusion could you not prove from available evidence?
13. How would the design change if the payment application became internet-facing?
14. What would happen if pfSense failed?
15. How do you know the backup is usable?
16. Which security/operations trade-off was hardest?
17. How would this design scale to multiple departments?
18. What should be improved first in production?
19. When should the SOC escalate an event to Fraud Operations?
20. Which evidence would be required before claiming that a transaction was manipulated?
21. How would you contain a compromised finance workstation without unnecessarily interrupting payments?
22. How does segmentation reduce the business impact of stolen employee credentials?

# 12. Assessment Rubric

| Assessment area | Weight |
|---|---:|
| Scope, ethics, and change control | 8 |
| Baseline and architecture | 10 |
| Endpoint and service hardening | 8 |
| Firewall and segmentation | 18 |
| Logging and packet analysis | 10 |
| IDS deployment and detection | 12 |
| IPS and alert tuning | 10 |
| Troubleshooting and incident response | 10 |
| Backup and recovery | 4 |
| Reporting and oral defence | 10 |
| **Total** | **100** |

| Score | Classification |
|---:|---|
| 90–100 | Professional distinction |
| 80–89 | Strong professional competence |
| 70–79 | Competent with limited gaps |
| 60–69 | Partial competence; remediation required |
| Below 60 | Requirements not met |

## Critical failure conditions

The submission may be marked incomplete regardless of score if:

- testing leaves the authorised scope;
- evidence is fabricated;
- unexplained unrestricted finance-workstation-to-payment-server access remains;
- IPS is enabled without recovery planning;
- segmentation or IDS operation is not proven;
- critical configuration cannot be recovered;
- the submission exposes credentials, private keys, or tokens.

# 13. Definition of Done

The project is complete only when:

- all work packages have evidence-backed results;
- approved access succeeds;
- prohibited access is denied and observable;
- Suricata detection is validated and analysed;
- controlled prevention is proven safely;
- legitimate service continuity is confirmed;
- an injected fault is diagnosed and corrected;
- an incident is investigated with correlated evidence;
- backup recovery is validated;
- residual risks have owners and treatment decisions;
- technical handover and briefings for management, Fraud Operations, and Compliance are complete;
- the student can defend the design and results.

The goal is not to reproduce an instructor’s clicks. The goal is to receive a security problem, design a defensible solution, operate tools responsibly, investigate failure, and communicate like a cybersecurity professional.
