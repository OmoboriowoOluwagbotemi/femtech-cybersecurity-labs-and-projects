# Lesson 36: Risk Assessment

## Lesson Overview

Cybersecurity risk assessment identifies assets, threats, vulnerabilities, existing controls, likelihood, and impact so that accountable leaders can make decisions. Risk assessment converts technical evidence into business priorities.

This lesson covers risk identification, STRIDE threat modeling, risk registers, risk-treatment options, and risk communication.

## Learning Objectives

Students will be able to:

- Define risk, inherent risk, residual risk, likelihood, and impact.
- Identify assets, threats, vulnerabilities, dependencies, and controls.
- Compare qualitative, semi-quantitative, and quantitative approaches.
- Apply STRIDE to architecture and data-flow diagrams.
- Create and maintain a risk register.
- Select mitigation, avoidance, transfer, or acceptance.
- Document compensating controls and treatment plans.
- Communicate risk to technical and non-technical stakeholders.

## Prerequisite Knowledge

Students should understand assets, threats, vulnerabilities, controls, incidents, forensics, vulnerability management, IAM, cloud, and enterprise architecture from prior lessons.

## Enterprise Relevance

Risk assessment supports:

- Investment.
- Architecture decisions.
- Vulnerability priorities.
- Cloud adoption.
- Exceptions.
- Third-party governance.
- Compliance.
- Incident improvement.
- Business continuity.

Security teams advise, but business risk owners make accountable decisions.

## 1. Cybersecurity Risk

Risk is the possibility that uncertainty or a threat will affect organizational objectives.

Organizations cannot eliminate all risk and must allocate limited resources.

### How

Assess:

- Asset or objective.
- Threat scenario.
- Vulnerability or condition.
- Likelihood.
- Impact.
- Existing controls.
- Uncertainty.

### Where

Risk applies to technology, people, process, suppliers, facilities, cloud, data, and strategy.

## 2. Risk Scenario

A useful risk statement has:

```text
Because of [condition], [threat] may [event], causing [business impact].
```

Example:

```text
Because the public VPN is unpatched, an external attacker may exploit it to gain remote access, causing credential exposure and service interruption.
```

Avoid vague statements such as "Risk of hacking."

## 3. Assets and Objectives

Assets include:

- Data.
- Services.
- Systems.
- Identities.
- Facilities.
- Reputation.
- Revenue.
- Safety.
- Legal standing.

Start with business objectives. A server matters because of the process, data, users, and dependencies it supports.

## 4. Threat Identification

Threat sources:

- Cybercriminal.
- Insider.
- Nation-state.
- Competitor.
- Accidental error.
- Supplier failure.
- Technology failure.
- Natural or environmental event.

Threat events:

- Credential theft.
- Malware.
- Misconfiguration.
- Data disclosure.
- Service outage.
- Unauthorized change.
- Physical loss.

Do not confuse threat source, event, vulnerability, and impact.

## 5. Vulnerabilities and Conditions

Examples:

- Missing patch.
- Excessive privilege.
- Weak process.
- Public storage.
- Single point of failure.
- Missing logs.
- Untrained staff.
- Unsupported system.
- Insecure supplier access.

A vulnerability may be technical, procedural, organizational, or physical.

## 6. Dependencies

Risk assessments should include:

- DNS.
- Identity provider.
- Network.
- Cloud region.
- Supplier.
- Certificate authority.
- Backup.
- Power.
- Staff.

A resilient application may still fail because its identity or DNS dependency is unavailable.

## 7. Existing Controls

Assess:

- Design.
- Implementation.
- Operating effectiveness.
- Coverage.
- Evidence.
- Failure modes.

A documented control that is not deployed or monitored should not receive full risk-reduction credit.

## 8. Inherent and Residual Risk

### Inherent Risk

Risk before considering controls.

### Residual Risk

Risk remaining after controls.

### Target Risk

Desired level after planned treatment.

```text
Inherent risk -> Existing controls -> Residual risk
Residual risk -> Planned treatment -> Target risk
```

## 9. Likelihood

Likelihood considers:

- Threat intent and capability.
- Opportunity and exposure.
- Vulnerability exploitability.
- Frequency.
- Existing controls.
- Historical evidence.
- Detection and response.

Use defined criteria. "Likely" must mean the same thing across assessments.

## 10. Impact

Impact dimensions:

- Confidentiality.
- Integrity.
- Availability.
- Financial.
- Legal.
- Regulatory.
- Safety.
- Reputation.
- Operational.
- Strategic.

Consider maximum credible and realistic scenarios, not only technical severity.

## 11. Risk Methods

### Qualitative

Uses categories such as low, medium, high.

### Semi-Quantitative

Uses ordinal numeric scales and matrices.

### Quantitative

Uses monetary, frequency, or probabilistic estimates.

Numbers do not remove uncertainty. Document assumptions and ranges.

## 12. Risk Matrix

Example:

| Likelihood / Impact | Low | Medium | High |
|---|---:|---:|---:|
| Low | Low | Low | Medium |
| Medium | Low | Medium | High |
| High | Medium | High | Critical |

Limitations:

- Different combinations collapse into one category.
- Scales may be subjective.
- Colors create false precision.
- Rare catastrophic events can be understated.

Use a matrix as a decision aid, not truth.

## 13. Quantitative Concepts

Common conceptual terms:

- Single Loss Expectancy (SLE).
- Annualized Rate of Occurrence (ARO).
- Annualized Loss Expectancy (ALE).

```text
ALE = SLE x ARO
```

Estimates require ranges and confidence. Cyber events rarely provide perfect frequency data.

## 14. Threat Modeling

Threat modeling systematically identifies security threats and design controls before or during system development.

Design flaws are cheaper and safer to address before production.

### How

1. Define scope and objectives.
2. Diagram system and data flows.
3. Identify trust boundaries.
4. Identify threats.
5. Prioritize.
6. Select controls.
7. Validate.

### Where

Use for applications, APIs, cloud, networks, identity, devices, and business processes.

## 15. Data-Flow Diagrams

Elements:

- External entity.
- Process.
- Data store.
- Data flow.
- Trust boundary.

A threat applies to a component or interaction. Modeling only a list of technologies misses data and trust transitions.

## 16. STRIDE

STRIDE is a threat-modeling mnemonic:

| Category | Security Property | Example |
|---|---|---|
| Spoofing | Authentication | Attacker uses stolen identity |
| Tampering | Integrity | API request altered |
| Repudiation | Accountability | Action cannot be attributed |
| Information Disclosure | Confidentiality | Records exposed |
| Denial of Service | Availability | API capacity exhausted |
| Elevation of Privilege | Authorization | User gains administrator rights |

STRIDE identifies threat categories; it does not calculate risk automatically.

## 17. Applying STRIDE

For each diagram element ask:

- Can an entity be spoofed?
- Can flow or data be tampered with?
- Can an action be denied without evidence?
- Can data be disclosed?
- Can service be exhausted?
- Can privilege increase?

Not every category applies equally to every element.

## 18. STRIDE Example

Online patient portal:

- Spoofing: stolen patient account.
- Tampering: altered prescription request.
- Repudiation: missing audit trail.
- Disclosure: exposed health records.
- DoS: appointment API flood.
- Elevation: patient accesses clinician function.

Controls:

- MFA.
- Signed or validated transactions.
- Protected audit logs.
- Encryption and authorization.
- Rate limiting and resilience.
- Server-side role checks.

## 19. Threat-Model Quality

A good model:

- Matches current architecture.
- Includes dependencies.
- Identifies trust boundaries.
- Includes administrators and automation.
- Includes failure and abuse.
- Assigns owners.
- Tracks mitigations.

Update after architecture, data, threat, or control changes.

## 20. Risk Register

A risk register records identified risks, analysis, ownership, treatment, and status.

Risk decisions require traceability and follow-through.

### How

Maintain one governed source with review dates and evidence.

### Where

Registers can exist at enterprise, business-unit, project, supplier, or system level.

## 21. Risk Register Fields

- Risk ID.
- Title.
- Scenario statement.
- Assets and objectives.
- Threat.
- Vulnerability.
- Existing controls.
- Likelihood.
- Impact.
- Inherent risk.
- Residual risk.
- Owner.
- Treatment.
- Actions.
- Due date.
- Status.
- Review date.
- Evidence.

## 22. Risk Owner

The risk owner has authority and accountability to manage or accept risk.

Security analysts:

- Identify.
- Analyze.
- Recommend.
- Monitor.
- Escalate.

They should not silently accept business risk for system owners.

## 23. Risk Treatment

### Mitigate

Implement controls.

### Avoid

Stop the activity or retire the asset.

### Transfer

Shift selected consequences through insurance or contract.

### Accept

Formally retain residual risk within authority.

Treatment may combine options.

## 24. Risk Acceptance

Acceptance requires:

- Defined residual risk.
- Informed owner.
- Authority.
- Rationale.
- Duration.
- Monitoring.
- Review trigger.

Acceptance is not "do nothing" or permanent exemption.

## 25. Compensating Controls

When primary treatment is unavailable:

- Segment.
- Restrict access.
- Increase monitoring.
- Disable function.
- Apply application allowlisting.
- Improve recovery.

Test whether the control addresses the actual scenario and document residual risk.

## 26. Third-Party Risk

Assess:

- Data and access.
- Subprocessors.
- Security controls.
- Incident notification.
- Resilience.
- Legal jurisdiction.
- Exit and data return.
- Concentration risk.

Certifications and questionnaires are evidence, not proof of current security.

## 27. Risk Communication

Different audiences need different detail.

### Executive

- Business objective.
- Scenario.
- Potential impact.
- Decision.
- Cost and timeline.

### Technical

- Architecture.
- Evidence.
- Vulnerability.
- Controls.
- Test.

### Operational

- Owner.
- Action.
- Deadline.
- Dependency.
- Status.

## 28. Communicating Uncertainty

State:

- Known facts.
- Assumptions.
- Data gaps.
- Confidence.
- Range.
- Sensitivity to change.

Avoid pretending an ordinal score is an exact probability.

## 29. Risk Appetite and Tolerance

### Risk Appetite

Broad amount and type of risk an organization is willing to pursue or retain.

### Risk Tolerance

Acceptable variation around a specific objective or threshold.

Risk acceptance should align with governance, not individual convenience.

## 30. Risk Review Triggers

Review when:

- Incident occurs.
- Exploitation emerges.
- Architecture changes.
- Supplier changes.
- New regulation applies.
- Control fails.
- Asset criticality changes.
- Exception expires.

Periodic review alone may be too slow.

## 31. Enterprise Scenarios

### Small Business

A single cloud administrator creates concentration risk. Treatment adds a second trained administrator, emergency access, and recovery documentation.

### Financial Institution

STRIDE identifies transaction tampering and repudiation risks. Strong authorization, integrity controls, and immutable audit records reduce risk.

### Healthcare Organization

A legacy device cannot be patched. The risk register documents patient-care dependency, segmentation, monitoring, vendor plan, and replacement date.

### Educational Institution

Open student Wi-Fi is accepted for Internet access but isolated from administrative systems.

### Government Agency

A supplier processes citizen data. Contract, audit rights, encryption, notification, and exit requirements treat the risk.

### Cloud Environment

A single-region SaaS dependency threatens availability. The business evaluates alternate processes, export capability, and provider recovery commitments.

## 32. Risk Assessment Workflow

1. Define scope.
2. Identify objectives and assets.
3. Identify threats and vulnerabilities.
4. Assess controls.
5. Estimate likelihood and impact.
6. Determine residual risk.
7. Select treatment.
8. Assign owner and action.
9. Communicate.
10. Monitor and review.

## 33. Security+ SY0-701 Alignment

This lesson supports risk identification, threat modeling, likelihood, impact, risk registers, risk treatment, acceptance, third-party risk, and communication.

Risk tools and automated assessments are technical controls. Assessment, review, and treatment tracking are operational controls. Risk policy, appetite, and acceptance authority are managerial controls and directive in function.

## 34. Classroom Hands-On Practical

### Practical Title

Threat-Model and Assess a Patient Portal

### Tasks

1. Define business objectives.
2. Draw entities, processes, stores, flows, and trust boundaries.
3. Apply STRIDE.
4. Write six risk scenarios.
5. Identify existing controls.
6. Rate likelihood and impact.
7. Select treatment.
8. Create risk-register entries.
9. Write an executive summary.
10. Document uncertainty.

### Risk Register

| ID | Scenario | Existing Controls | Likelihood | Impact | Residual Risk | Owner | Treatment |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

## 35. Take-Home Practical

Perform a risk assessment for a bank, university, government agency, cloud startup, or small business. Include:

- Scope.
- Asset and dependency inventory.
- Data-flow diagram.
- STRIDE model.
- Ten risks.
- Inherent and residual ratings.
- Treatment plan.
- Risk register.
- Executive and technical communication.
- Review triggers.

## 36. Assessment Questions

### Multiple Choice

1. What is residual risk?
   A. Risk remaining after controls
   B. Risk before controls
   C. No risk
   D. Patch score

2. What should a risk scenario include?
   A. Condition, threat event, and business impact
   B. Color only
   C. CVSS only
   D. Tool name only

3. What does STRIDE identify?
   A. Threat categories
   B. Exact financial loss
   C. Patch deadline
   D. Asset owner

4. Which STRIDE category relates to accountability?
   A. Repudiation
   B. Spoofing
   C. Disclosure
   D. DoS

5. What is inherent risk?
   A. Risk before controls
   B. Risk after all controls
   C. Accepted risk only
   D. Transferred risk

6. Who should accept business risk?
   A. Authorized risk owner
   B. Scanner
   C. Any analyst
   D. Firewall

7. What does risk avoidance mean?
   A. Stop the risky activity
   B. Add monitoring only
   C. Buy insurance only
   D. Ignore risk

8. Why document uncertainty?
   A. Evidence and estimates are incomplete
   B. Scores are always exact
   C. Risk never changes
   D. It removes ownership

9. What triggers reassessment?
   A. Incident or significant change
   B. Never
   C. Only annual date
   D. Only patch install

10. Which is an operational control?
    A. Quarterly risk-register review
    B. Firewall rule
    C. Encryption setting
    D. IAM engine

### Short Answer

1. Explain assets, threats, vulnerabilities, and controls in a risk scenario.
2. Compare inherent, residual, and target risk.
3. Compare qualitative and quantitative methods.
4. Explain STRIDE.
5. List risk-register fields.
6. Compare treatment options.
7. Explain risk acceptance.
8. Describe risk communication.

### Scenario Questions

1. A critical CVSS finding affects an isolated nonproduction server. Assess risk.
2. A medium flaw is actively exploited on a public VPN. Assess risk.
3. A supplier has certification but poor incident notification. Evaluate.
4. A hospital cannot patch a clinical device. Build treatment.
5. An executive requests one exact loss number despite uncertainty. Respond.

## 37. Glossary

| Term | Definition |
|---|---|
| Inherent Risk | Risk before controls. |
| Residual Risk | Risk remaining after controls. |
| Risk Acceptance | Authorized decision to retain residual risk. |
| Risk Appetite | Broad amount and type of risk an organization is willing to retain. |
| Risk Register | Governed record of risks, ownership, treatment, and status. |
| Risk Scenario | Structured statement connecting condition, threat event, and impact. |
| Risk Tolerance | Acceptable variation around a specific objective. |
| STRIDE | Threat-modeling categories for spoofing, tampering, repudiation, disclosure, denial, and privilege elevation. |
| Target Risk | Desired risk after planned treatment. |
| Threat Model | Structured analysis of architecture, trust boundaries, and threats. |

## 38. Lesson Review Checklist

- I can identify risk scenarios and dependencies.
- I can assess likelihood, impact, and controls.
- I can distinguish inherent, residual, and target risk.
- I can apply STRIDE.
- I can maintain a risk register.
- I can select and govern treatment.
- I can communicate risk and uncertainty.

## 39. Continuity With Future Lessons

Lesson 37 maps risk and controls to NIST CSF, CIS Controls, ISO 27001, PCI DSS, HIPAA, GDPR, and practical implementation.

Students should retain that frameworks organize risk management but do not replace enterprise-specific assessment.
