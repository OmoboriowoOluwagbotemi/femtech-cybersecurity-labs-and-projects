# Lesson 37: Compliance Frameworks

## Lesson Overview

Cybersecurity compliance is the disciplined process of identifying applicable obligations, implementing and operating controls, producing reliable evidence, correcting deficiencies, and demonstrating accountability. Compliance does not automatically make an organization secure, but a mature compliance program converts legal, contractual, and governance requirements into repeatable security work.

This lesson covers NIST Cybersecurity Framework (CSF) 2.0, CIS Controls v8.1, ISO/IEC 27001:2022, PCI DSS v4.0.1, the HIPAA Security Rule, the General Data Protection Regulation (GDPR), and practical enterprise implementation.

> **Professional boundary:** This lesson teaches security and compliance operations. Determining legal applicability and interpreting legal obligations require qualified legal, privacy, and compliance personnel.

## Learning Objectives

Students will be able to:

- Distinguish laws, regulations, contractual standards, certifiable standards, and voluntary frameworks.
- Explain the structure and intended use of each curriculum framework.
- Determine which obligations may apply to an organization, system, service, or data set.
- Scope systems, people, processes, facilities, suppliers, and data flows.
- Map requirements to technical, managerial, operational, and physical controls.
- Build a control matrix without assuming that one control satisfies every framework.
- Collect evidence that demonstrates both control design and operating effectiveness.
- Identify gaps, exceptions, owners, deadlines, and residual risk.
- Support audits while protecting sensitive evidence.
- Integrate compliance with risk, vulnerability management, incident response, and continuous improvement.

## Prerequisite Knowledge

Students should understand the CIA triad, risk assessment, security-control categories and functions, IAM, hardening, network segmentation, vulnerability management, SIEM, incident response, forensics, and evidence handling from Lessons 1-36.

## Enterprise Relevance

Compliance work affects:

- Executive accountability and governance.
- Customer and supplier contracts.
- Payment-card processing.
- Healthcare information systems.
- Cloud and managed-service deployments.
- Privacy and personal-data processing.
- Security architecture and control selection.
- Audit readiness and certification.
- Incident notification and evidence preservation.
- Market access, insurance, and organizational trust.

SOC analysts support compliance by preserving logs, following escalation procedures, investigating alerts, documenting cases, and demonstrating that monitoring controls operate as intended. System and security administrators support it through access control, hardening, patching, backup, change records, and configuration evidence.

## 1. Compliance Foundations

Compliance means meeting requirements that apply to an organization or defined scope. A requirement may arise from law, regulation, contract, standard, policy, or another authoritative obligation.

Organizations must understand what they are required or have committed to do. Failure may cause regulatory action, contractual penalties, litigation, loss of certification, interrupted payment processing, reputational damage, or harm to individuals.

A compliance program:

1. Identifies obligations.
2. Determines applicability.
3. Defines scope.
4. Interprets requirements.
5. Maps requirements to controls.
6. Assigns accountable owners.
7. Implements and operates controls.
8. Collects and protects evidence.
9. Tests design and effectiveness.
10. Remediates gaps and reports status.

Compliance applies across governance, employees, facilities, endpoints, networks, applications, cloud services, data, suppliers, and business processes. It is not owned only by the security team.

## 2. Types of Authority

| Instrument | Meaning | Typical effect | Example |
|---|---|---|---|
| Law | Rule enacted through a legislative authority | Legally enforceable within its jurisdiction | A national privacy statute |
| Regulation | Detailed rule issued under legal authority | Legally enforceable for regulated parties | HIPAA Security Rule provisions |
| Contractual or industry standard | Requirements accepted through participation or contract | Enforced through contracts, acquiring relationships, or program rules | PCI DSS |
| Certifiable standard | Published requirements against which a management system may be audited | Voluntary unless required by contract, policy, or law | ISO/IEC 27001 |
| Framework or guidance | Organized outcomes, practices, or recommendations | Usually voluntary unless adopted as an obligation | NIST CSF, CIS Controls |
| Internal policy | Organization-approved requirement | Mandatory for covered personnel and systems | Corporate access-control policy |

Passing an audit against one instrument does not prove universal compliance. Different obligations have different scopes, definitions, evidence requirements, and objectives.

## 3. Compliance Is Not the Same as Security

Compliance establishes a minimum or defined set of outcomes. Security manages changing risk.

| Compliance question | Security question |
|---|---|
| Is the required control documented and operating? | Does the control reduce the current threat and risk? |
| Is evidence available for the audit period? | Can the control prevent, detect, or limit a real attack? |
| Is the scoped population complete? | Are unknown assets and paths also addressed? |
| Is an exception approved? | Is the residual risk tolerable today? |

A technically compliant control can be ineffective. For example, a quarterly access review may exist, but reviewers may approve every account without examining job need. The evidence proves activity, not sound judgment.

## 4. Scoping and Applicability

**Applicability** determines whether an obligation covers the organization or activity. **Scope** defines the people, processes, technologies, locations, data, and suppliers included in an assessment.

Incorrect scope creates false assurance. If a payment tokenization service, cloud identity provider, backup platform, or support vendor can affect protected data, excluding it without analysis may conceal risk.

Document:

- Legal entities and jurisdictions.
- Products and business services.
- Data types and processing purposes.
- Data owners, controllers, processors, covered entities, or business associates where relevant.
- Data flows, storage, transmission, and deletion.
- Network and identity trust boundaries.
- Cloud accounts, subscriptions, tenants, and regions.
- Third parties and shared responsibilities.
- Supporting systems that can affect security.
- Explicit inclusions, exclusions, and rationale.

Scoping appears in system inventories, data-flow diagrams, contracts, statements of applicability, PCI scope records, privacy records, risk assessments, and audit plans.

## 5. NIST Cybersecurity Framework 2.0

NIST CSF 2.0 is a technology-neutral framework for managing cybersecurity risk. Its Core organizes cybersecurity outcomes into six Functions:

| Function | Purpose |
|---|---|
| Govern | Establish strategy, policy, roles, oversight, risk context, and supply-chain governance |
| Identify | Understand assets, risks, dependencies, and opportunities for improvement |
| Protect | Apply safeguards that reduce the likelihood and impact of adverse events |
| Detect | Discover and analyze possible cybersecurity events |
| Respond | Manage and contain detected incidents |
| Recover | Restore affected assets and operations and communicate recovery |

Functions contain Categories and Subcategories. Organizational Profiles describe current and target outcomes. Tiers characterize the rigor of cybersecurity risk governance and management practices; they are not simple maturity scores or certification levels.

The CSF provides a common language between executives, risk teams, engineers, suppliers, and assessors. It is broad enough for small businesses, enterprises, government, education, healthcare, and cloud environments.

An organization can:

1. Establish organizational context and priorities.
2. Create a Current Profile using applicable CSF outcomes.
3. Create a Target Profile based on risk and objectives.
4. Analyze gaps.
5. Prioritize actions, owners, resources, and measures.
6. Reassess as risks and business conditions change.

Use CSF 2.0 for enterprise risk communication, strategy, program assessment, supplier conversations, architecture review, and mapping multiple requirements into a common outcome model.

### Example

A university identifies that unmanaged research devices are missing from inventory. It maps the gap to Identify outcomes, establishes governance for ownership, deploys discovery and endpoint enrollment, and measures the percentage of devices with an accountable owner.

## 6. CIS Controls v8.1

CIS Controls v8.1 is a prioritized set of 18 Controls supported by specific Safeguards. It emphasizes practical defenses against common attacks.

The Controls begin with inventory and control of enterprise assets and software, then address data protection, secure configuration, account and access management, vulnerability management, logging, email and browser protection, malware defenses, recovery, network infrastructure, awareness, service providers, application security, incident response, and penetration testing.

Implementation Groups help prioritize:

| Group | General use |
|---|---|
| IG1 | Essential cyber hygiene for organizations with limited resources and lower complexity |
| IG2 | Additional safeguards for organizations managing sensitive data or greater operational complexity |
| IG3 | Safeguards for organizations facing sophisticated threats or high-impact consequences |

IG1 is the foundation; IG2 and IG3 build cumulatively.

CIS Controls converts broad security goals into implementable safeguards. It is especially useful when an organization needs a prioritized technical and operational starting point.

1. Select the appropriate Implementation Group using risk and enterprise characteristics.
2. Inventory applicable assets and data.
3. Assign every Safeguard an owner.
4. Define implementation, evidence, and measurement.
5. Record exceptions and compensating controls.
6. Assess implementation and improve coverage.

Use CIS Controls in small-business security programs, hardening roadmaps, internal assessments, cloud programs, supplier requirements, and mappings to NIST CSF or other obligations.

## 7. ISO/IEC 27001:2022

ISO/IEC 27001:2022 defines requirements for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS). It is a certifiable management-system standard. Amendment 1:2024 adds climate-action considerations to the management-system context requirements.

The ISMS includes:

- Organizational context and interested parties.
- Leadership and policy.
- Planning and risk treatment.
- Support and documented information.
- Operation.
- Performance evaluation.
- Improvement.

Annex A provides a reference set of controls grouped into organizational, people, physical, and technological themes. ISO/IEC 27001 requires a risk-based control-selection process; it does not require blindly applying every Annex A control.

An ISMS creates governance, repeatability, accountability, evidence, internal audit, management review, and continual improvement. Certification can provide external assurance that the scoped management system meets the standard's requirements.

1. Define ISMS scope and context.
2. Establish policy, roles, and objectives.
3. Define a risk-assessment and treatment method.
4. Assess risk and select treatment.
5. Produce a Statement of Applicability explaining included and excluded Annex A controls.
6. Implement and operate controls.
7. Monitor objectives and control performance.
8. Conduct internal audits and management reviews.
9. Correct nonconformities and improve.

ISO/IEC 27001 is used by cloud providers, financial organizations, government suppliers, healthcare technology companies, universities, and managed service providers seeking structured governance or certification.

### Important Distinction

Certification applies to a stated ISMS scope, not automatically to every product, location, subsidiary, or security claim made by the organization. Review the certificate scope and issuing certification body's status.

## 8. PCI DSS v4.0.1

The Payment Card Industry Data Security Standard (PCI DSS) establishes security requirements for entities that store, process, transmit, or can affect the security of payment-account data. PCI DSS v4.0.1 is a limited revision of version 4.0. Its future-dated requirements became effective on 31 March 2025.

PCI DSS contains 12 high-level requirements covering areas such as network security controls, secure configurations, account data, cryptography, malware protection, secure development, access control, authentication, physical access, logging, testing, and security policy.

Compromise of cardholder data enables fraud and damages customers and payment ecosystems. PCI DSS creates a shared minimum for protecting the cardholder data environment (CDE).

Organizations:

- Determine their merchant or service-provider obligations.
- Identify account-data flows.
- Define and minimize CDE scope.
- Segment carefully and validate segmentation.
- Select the correct assessment method, such as an applicable Self-Assessment Questionnaire or assessor-led Report on Compliance.
- Implement requirements and retain evidence.
- Perform required testing and attest compliance.

The customized approach permits an entity to meet a requirement's defined objective through a designed control, but it requires rigorous documentation, targeted risk analysis, testing, and assessor validation. It is not permission to omit the objective.

PCI DSS applies to e-commerce, retail, financial services, payment gateways, call centers, hospitality, and service providers that can affect payment security.

### Scope Example

A retailer outsources payment capture to a hosted provider. Outsourcing may reduce the retailer's PCI scope, but the retailer still must verify the provider, protect its integration, manage scripts or redirects as applicable, and meet its remaining responsibilities.

## 9. HIPAA Security Rule

The HIPAA Security Rule establishes U.S. national standards for protecting electronic protected health information (ePHI) created, received, maintained, or transmitted by covered entities and business associates. It requires appropriate administrative, physical, and technical safeguards to protect confidentiality, integrity, and availability.

Some implementation specifications are described as **required** and others as **addressable**. Addressable does not mean optional. A regulated entity must assess whether the specification is reasonable and appropriate, implement it when appropriate, or document why an equivalent alternative or non-implementation is reasonable under the circumstances.

As of this lesson's publication, HHS's January 2025 proposal to strengthen the Security Rule remains a proposed rule, not a replacement final rule. Compliance teams must monitor official rulemaking and avoid treating proposals as current obligations.

Healthcare systems contain highly sensitive information and support patient care. Security failures can cause privacy harm, fraud, treatment disruption, and patient-safety consequences.

Security operations support:

- Accurate ePHI system and data-flow inventories.
- Risk analysis and risk management.
- Assigned security responsibility.
- Workforce authorization and training.
- Access, authentication, audit, integrity, and transmission controls.
- Facility and device controls.
- Incident procedures and contingency planning.
- Business-associate governance.
- Documentation and periodic evaluation.

The Security Rule applies in hospitals, clinics, health plans, clearinghouses, qualifying providers, and business associates such as cloud, billing, analytics, and managed-service providers handling ePHI.

### Healthcare Example

A hospital cannot patch a life-supporting legacy device immediately. It documents risk, isolates the device VLAN, limits management access, monitors traffic, coordinates the manufacturer, tests recovery, assigns an expiration date, and preserves evidence. The exception is managed; it is not ignored.

## 10. GDPR

The General Data Protection Regulation is European Union law governing processing of personal data within its material and territorial scope. It establishes principles, lawful bases, data-subject rights, controller and processor responsibilities, security obligations, accountability, privacy by design and default, and breach-related duties.

Core processing principles include:

- Lawfulness, fairness, and transparency.
- Purpose limitation.
- Data minimization.
- Accuracy.
- Storage limitation.
- Integrity and confidentiality.
- Accountability.

Cybersecurity protects data, but GDPR addresses the broader legitimacy and governance of processing. Strong encryption does not make unnecessary or unlawfully collected personal data compliant.

Organizations may need to:

- Map processing activities and data flows.
- Establish and document lawful bases.
- Provide appropriate privacy information.
- Minimize collection and retention.
- support data-subject rights.
- Apply data protection by design and default.
- Conduct data protection impact assessments where required.
- govern processors and international transfers.
- Implement risk-appropriate technical and organizational measures.
- assess and document personal-data breaches and notification decisions.

Security teams should rapidly provide facts about affected data, individuals, systems, exposure, protective measures, containment, and likely consequences. Privacy and legal teams determine formal notification duties.

GDPR can affect organizations established in the European Economic Area and, under specified territorial conditions, organizations elsewhere that offer goods or services to, or monitor the behavior of, people in the EU.

## 11. Framework Comparison

| Instrument | Primary nature | Main focus | Typical assurance |
|---|---|---|---|
| NIST CSF 2.0 | Voluntary framework | Cybersecurity outcomes and risk governance | Profiles, assessments, metrics |
| CIS Controls v8.1 | Prioritized guidance | Practical safeguards against common attacks | Safeguard assessment |
| ISO/IEC 27001:2022 | Certifiable standard | Risk-based ISMS | Internal audit and accredited certification |
| PCI DSS v4.0.1 | Industry/contractual standard | Payment-account data security | SAQ, AOC, ROC, scans, testing as applicable |
| HIPAA Security Rule | U.S. regulation | Security of ePHI | Regulatory compliance evidence and evaluation |
| GDPR | EU regulation | Lawful and accountable personal-data processing | Records, assessments, controls, supervisory oversight |

Mappings are accelerators, not proof of equivalence. One access-control process may support several requirements, but each mapping must preserve the original requirement's scope, intent, and evidence.

## 12. Security+ Control Taxonomy in Compliance Work

Use the Security+ SY0-701 taxonomy consistently:

### Categories by Nature

- **Technical:** MFA, encryption, EDR, firewall rules.
- **Managerial:** risk policy, governance, supplier requirements.
- **Operational:** access reviews, incident procedures, backup testing.
- **Physical:** locks, guards, secure media storage.

### Functions

- **Preventive:** MFA prevents many unauthorized logons.
- **Deterrent:** sanctions and monitoring notices discourage misuse.
- **Detective:** SIEM alerts identify suspicious activity.
- **Corrective:** reimaging and patching remove a known weakness.
- **Compensating:** segmentation reduces risk when a legacy device cannot support the preferred control.
- **Directive:** policy requires approved handling and reporting.

A control can have more than one function, but document its primary purpose and how effectiveness is measured.

## 13. The Compliance Control Matrix

A control matrix connects obligations to operational reality.

| Field | Example |
|---|---|
| Requirement | Privileged access must be restricted and reviewed |
| Scope | Production cloud subscriptions |
| Control | Just-in-time privileged roles with quarterly owner review |
| Category/function | Technical preventive; operational detective review |
| Owner | IAM manager |
| Operator | Cloud operations |
| Frequency | Continuous enforcement; quarterly review |
| Evidence | Role settings, activation logs, review record, exceptions |
| Test | Sample activations and terminated-user population |
| Gap | Two legacy subscriptions lack integration |
| Treatment | Migrate by 30 September; weekly manual review meanwhile |

Do not rely on screenshots alone. Prefer reproducible exports, configuration records, tickets, logs, samples, and signed approvals with timestamps and scope.

## 14. Control Design and Operating Effectiveness

**Design effectiveness** asks whether the control, if performed as designed, can achieve its objective.

**Operating effectiveness** asks whether the control operated consistently, for the full population and period, by authorized personnel, with exceptions handled.

Example:

- Design failure: the leaver process covers employees but not contractors.
- Operating failure: the process covers contractors, but three termination tickets were not completed.

An assessor may inspect documentation, interview personnel, observe performance, reperform a procedure, and sample evidence. Sample success does not excuse a known population gap.

## 15. Evidence Management

Good evidence is:

- Relevant to the requirement.
- Complete for the population and period.
- Accurate and attributable.
- Timestamped.
- Reproducible where possible.
- Protected against unauthorized access or alteration.
- Retained according to policy and obligation.

Compliance repositories can contain network diagrams, vulnerabilities, privileged-user lists, contracts, incident details, and personal data. Apply least privilege, encryption, version control, retention, and audit logging.

## 16. Exceptions and Compensating Controls

An exception should include:

- Requirement and affected scope.
- Business and technical reason.
- Threat and vulnerability.
- Inherent and residual risk.
- Existing and compensating controls.
- Accountable risk owner.
- Approval authority.
- Remediation plan.
- Expiration and review date.
- Monitoring and evidence.

An expired exception is an unmanaged risk. A compensating control must address the original objective and be tested, not merely listed.

## 17. Practical Implementation Lifecycle

### Phase 1: Establish Governance

- Name executive sponsors and accountable owners.
- Maintain an obligation register.
- Define policies, risk appetite, and reporting.
- Establish legal, privacy, audit, IT, security, and business coordination.

### Phase 2: Discover and Scope

- Inventory assets, software, identities, data, suppliers, and services.
- Map data flows and trust boundaries.
- Determine applicability with qualified stakeholders.
- Record exclusions and dependencies.

### Phase 3: Assess and Design

- Map obligations to existing controls.
- Evaluate design and evidence.
- Identify gaps and duplicated work.
- Prioritize by risk and mandatory deadline.

### Phase 4: Implement and Operate

- Assign control owners and operators.
- Build procedures into normal workflows.
- Automate evidence where reliable.
- Train personnel and manage change.

### Phase 5: Test and Improve

- Perform continuous monitoring, control testing, internal audit, and management review.
- Track nonconformities, findings, incidents, and exceptions.
- Validate remediation.
- Update scope when the enterprise changes.

## 18. Enterprise Scenarios

### Scenario A: Small Online Retailer

The retailer uses a hosted payment page but deploys its own e-commerce scripts. It maps card-data flows, verifies the payment provider, restricts script changes, monitors the website, secures administrative access, and completes the assessment method applicable to its environment. Outsourcing narrows responsibilities but does not eliminate them.

### Scenario B: Healthcare Cloud Migration

A clinic moves ePHI to a SaaS platform. It confirms business-associate terms, maps identity and data flows, reviews tenant configuration, enables MFA and audit logs, tests backup and incident procedures, and documents shared responsibilities. The provider's certification does not transfer the clinic's accountability.

### Scenario C: Financial Institution

A bank uses NIST CSF 2.0 as an executive risk model, CIS Controls for implementation priorities, and ISO/IEC 27001 for its ISMS. A single control library maps to each requirement, but owners retain requirement-specific evidence and scope.

### Scenario D: Educational Institution

A university processes student and research data across many decentralized systems. It begins with CIS IG1 safeguards, inventories assets, then creates NIST CSF Current and Target Profiles. High-risk research environments receive additional safeguards based on data and threat exposure.

### Scenario E: Government Supplier

A software supplier presents an ISO/IEC 27001 certificate. The agency verifies the certificate's scope, checks whether the delivered service and development locations are included, reviews current assurance reports, and evaluates contractual incident and access requirements.

## 19. Common Failure Modes

| Failure | Consequence | Better practice |
|---|---|---|
| Treating every framework as law | Misleading priorities | Record authority and applicability |
| Copying a generic scope | Missing systems and suppliers | Validate data and trust boundaries |
| Checkbox evidence | Controls exist only on paper | Test operating effectiveness |
| One-time audit project | Control decay after assessment | Embed controls in operations |
| Blind crosswalk reliance | Requirement nuances are lost | Validate source intent and scope |
| Unowned controls | Evidence and remediation fail | Assign accountable owner and operator |
| Permanent exceptions | Accumulating residual risk | Expiring approvals and monitoring |
| Excessive evidence access | Sensitive audit data is exposed | Secure evidence repositories |
| Certification overclaim | Customers receive false assurance | State exact scope and limitations |

## 20. Classroom Hands-On Practical

### Title

Build a Multi-Framework Control Matrix

### Scenario

A regional clinic accepts card payments, operates Microsoft 365, stores ePHI in a cloud-hosted clinical system, and serves some EU residents through a telehealth program.

### Safety and Scope

Use only the fictional environment and supplied sample evidence. This is not legal advice and does not determine real regulatory applicability.

### Tasks

1. Identify possible obligations and the stakeholder who must confirm each one.
2. Draw a simplified data-flow and trust-boundary diagram.
3. Define preliminary HIPAA, PCI DSS, and GDPR scopes.
4. Select ten applicable security outcomes or requirements.
5. Map each to NIST CSF 2.0 and an appropriate CIS Safeguard area.
6. Define control, owner, operator, frequency, evidence, and test.
7. Classify each control by Security+ category and function.
8. Identify three gaps and record risk-based treatments.
9. Draft one time-bound exception with a compensating control.
10. Present an executive summary containing status, material risk, decisions needed, and next review date.

### Expected Deliverables

- Scope and data-flow diagram.
- Obligation register.
- Control matrix.
- Gap and exception records.
- One-page executive summary.

### Success Criteria

Students must distinguish applicability from scope, avoid asserting legal conclusions, preserve framework-specific intent, use the correct control taxonomy, and define testable evidence.

## 21. Take-Home Practical

Choose a fictional small business, financial institution, healthcare organization, school, government agency, or cloud provider.

Produce:

1. Business and system context.
2. Data and asset inventory.
3. Applicable-instrument assumptions.
4. NIST CSF Current and Target Profile excerpts.
5. CIS Implementation Group rationale.
6. Eight-control matrix.
7. Evidence plan.
8. Two gap records.
9. One exception with compensating controls.
10. A 90-day prioritized improvement roadmap.

State all assumptions and identify decisions requiring legal, privacy, audit, or executive approval.

## 22. Assessment Questions

### Multiple Choice

1. Which NIST CSF 2.0 Function establishes strategy, roles, policy, and oversight?
   - A. Govern
   - B. Identify
   - C. Detect
   - D. Recover

2. Which statement about PCI DSS is most accurate?
   - A. It is an EU privacy law.
   - B. Outsourcing payment processing always removes all merchant obligations.
   - C. It is an industry standard commonly enforced through payment relationships and contracts.
   - D. It certifies an entire corporation without a defined scope.

3. Which artifact explains ISO/IEC 27001 Annex A control applicability?
   - A. Packet capture
   - B. Statement of Applicability
   - C. Merchant invoice
   - D. Certificate signing request

4. What does addressable mean under the HIPAA Security Rule?
   - A. The specification can always be ignored.
   - B. It applies only to postal addresses.
   - C. The entity must assess, implement when reasonable and appropriate, or document an appropriate alternative or rationale.
   - D. It is identical to a required specification in every implementation decision.

5. Which is the strongest evidence that a quarterly access-review control operated effectively?
   - A. An undated policy screenshot
   - B. A vendor brochure
   - C. Complete review records, population, decisions, approvals, and timely removals
   - D. A statement that the administrator usually performs it

6. Under Security+ SY0-701, a policy requiring incident reporting is primarily which control function?
   - A. Physical
   - B. Directive
   - C. Operational
   - D. Technical

7. Why can a framework crosswalk not prove compliance by itself?
   - A. Crosswalks cannot contain control names.
   - B. Requirements may differ in scope, intent, definitions, and evidence.
   - C. Every framework prohibits mappings.
   - D. Only physical controls can be mapped.

8. Which GDPR principle requires collecting only personal data necessary for the purpose?
   - A. Data minimization
   - B. Availability
   - C. Non-repudiation
   - D. Deterrence

### Short Answer

9. Distinguish control design effectiveness from operating effectiveness.
10. Explain why a cloud provider's certification does not make a customer automatically compliant.
11. List six fields required in a defensible exception record.
12. Describe how a SOC analyst contributes to compliance without becoming the legal decision-maker.

### Scenario

13. An auditor finds that a privileged-access review policy exists, but contractors were excluded from the reviewed population and two departed administrators remain enabled. Analyze the design failure, operating failure, immediate response, evidence required, and longer-term corrective action.

## 24. Glossary

| Term | Definition |
|---|---|
| Applicability | Determination of whether an obligation covers an organization, activity, system, or data |
| Assessment scope | Defined boundary of people, processes, technology, facilities, data, and suppliers under review |
| Attestation | Formal statement that specified requirements or assertions have been met |
| Audit evidence | Information used to evaluate whether criteria are satisfied |
| Compensating control | Alternative control that addresses the objective when the preferred control is not feasible |
| Compliance | Meeting applicable legal, regulatory, contractual, standard, or policy requirements |
| Control matrix | Record linking requirements to controls, owners, evidence, testing, and gaps |
| Controller | GDPR role determining purposes and means of personal-data processing |
| Covered entity | HIPAA-regulated health plan, clearinghouse, or qualifying healthcare provider |
| Data protection impact assessment | Structured GDPR assessment for processing likely to create high risk to individuals |
| Design effectiveness | Whether control design is capable of achieving its objective |
| ePHI | Electronic protected health information under HIPAA |
| Implementation Group | CIS Controls prioritization tier: IG1, IG2, or IG3 |
| ISMS | Information Security Management System |
| Nonconformity | Failure to satisfy a requirement |
| Operating effectiveness | Whether a control operated consistently and correctly over a period |
| Processor | GDPR role processing personal data on behalf of a controller |
| Statement of Applicability | ISO/IEC 27001 artifact documenting control inclusion, exclusion, justification, and status |

## 25. Lesson Review Checklist

Students should now be able to:

- [ ] Distinguish laws, regulations, standards, contracts, and frameworks.
- [ ] Explain NIST CSF 2.0's six Functions.
- [ ] Explain CIS Controls v8.1 and Implementation Groups.
- [ ] Describe the ISO/IEC 27001 ISMS and Statement of Applicability.
- [ ] Explain PCI DSS scope and assessment concepts.
- [ ] Describe HIPAA Security Rule safeguards and addressable specifications.
- [ ] Explain GDPR security and accountability in the broader processing context.
- [ ] Build a control matrix with owners, evidence, and tests.
- [ ] Evaluate design and operating effectiveness.
- [ ] Manage evidence, gaps, and time-bound exceptions.

## 26. Continuity Note

Lesson 36 converted technical findings into risk decisions. This lesson converts those risks and obligations into governed controls and evidence. Lesson 38 will teach students to communicate that work professionally, build defensible portfolios, use GitHub responsibly, and plan continued career development.
