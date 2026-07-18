# Lesson 39: Integration Review

## Lesson Overview

Enterprise security depends on how controls work together across business services, identities, endpoints, networks, applications, cloud platforms, monitoring, response, and recovery. A strong component can still fail when a dependency, trust relationship, or operational process is weak.

This lesson integrates the course through architecture walkthroughs, system-hardening review, Zero Trust principles, and gap identification. Students will assess an enterprise as a connected system rather than as a list of products.

## Learning Objectives

Students will be able to:

- Conduct a business-led security architecture walkthrough.
- Trace data, identities, administrative paths, dependencies, and trust boundaries.
- Evaluate preventive, detective, corrective, compensating, deterrent, and directive functions.
- Review Windows, Linux, Active Directory, network, endpoint, cloud, and application hardening.
- Apply Zero Trust principles without treating Zero Trust as a product.
- Identify control gaps, overlaps, single points of failure, and untested assumptions.
- Validate that telemetry, detection, incident response, and recovery support the architecture.
- Prioritize findings using evidence, exploit paths, asset criticality, and residual risk.
- Produce technical and executive integration-review outputs.

## Prerequisite Knowledge

Students should understand all concepts from Lessons 1-38, including threats, cryptography, identity, operating systems, network controls, cloud, vulnerability management, SIEM, detection engineering, incident response, forensics, risk, compliance, and reporting.

## Enterprise Relevance

Integration reviews support:

- New system and cloud-service approval.
- Mergers and acquisitions.
- Major architecture changes.
- Zero Trust programs.
- Internal audit and compliance.
- Incident lessons learned.
- Ransomware resilience.
- Supplier and remote-access assessment.
- Annual security-program review.

The goal is not to draw an attractive diagram. The goal is to verify that actual architecture and operations protect the business service under realistic failure and attack conditions.

## 1. Security Architecture Walkthrough

### What

A security architecture walkthrough is a structured examination of how a business service is designed, operated, monitored, and recovered.

### Why

Security weaknesses frequently exist between components:

- An application uses MFA, but its service account has excessive privilege.
- Servers are patched, but the backup console shares compromised credentials.
- A firewall blocks inbound traffic, but unrestricted outbound traffic enables command and control.
- Logs exist locally, but an attacker can erase them before collection.

### How

Trace:

1. Business purpose and criticality.
2. Users and administrators.
3. Data and transactions.
4. Components and dependencies.
5. Trust boundaries.
6. Entry and exit paths.
7. Security controls.
8. Telemetry and detection.
9. Response authority and procedures.
10. Backup, recovery, and continuity.

### Where

Walkthroughs apply to on-premises systems, SaaS, IaaS, hybrid identity, branch networks, industrial or clinical environments, remote work, and supplier-hosted services.

## 2. Start with the Business Service

Document:

- Service owner.
- Users and customers.
- Supported mission or revenue.
- Critical time periods.
- Maximum tolerable disruption.
- Data sensitivity.
- Legal and contractual obligations.
- Upstream and downstream dependencies.
- Manual workarounds.

A server is not the business service. For example, online banking depends on DNS, identity, certificates, APIs, transaction databases, fraud monitoring, support teams, telecommunications, and recovery processes.

## 3. Build an Evidence-Based Architecture View

Use multiple evidence sources:

- Asset and cloud inventories.
- Network and data-flow diagrams.
- DNS, DHCP, routing, and firewall configuration.
- Identity-role and privileged-access exports.
- Endpoint and server baselines.
- Application and infrastructure-as-code repositories.
- Vulnerability and configuration scan results.
- SIEM ingestion and detection coverage.
- Backup configuration and recovery tests.
- Contracts and shared-responsibility records.
- Interviews and direct observation.

Diagrams and inventories can be wrong. Reconcile documentation with observed configuration and telemetry.

## 4. Trust Boundaries and Data Flows

### What

A trust boundary separates components with different identities, ownership, privilege, exposure, or security assumptions. A data flow shows how information moves between entities, processes, and storage.

### Why

Attacks cross boundaries. The review must identify what authenticates each crossing, what is authorized, what is encrypted, what is logged, and what happens when validation fails.

### How

For every flow, ask:

- Source and destination?
- Protocol and port?
- User, workload, or device identity?
- Authentication and authorization mechanism?
- Encryption and certificate validation?
- Data classification?
- Input validation?
- Logging and alerting?
- Failure and retry behavior?
- Owner?

### Where

Important boundaries include internet-to-DMZ, user-to-application, application-to-database, on-premises-to-cloud, administrator-to-management plane, supplier-to-enterprise, production-to-backup, and corporate-to-clinical or operational networks.

## 5. Administrative Paths

Administrative access can bypass normal application controls. Trace:

- Privileged workstations.
- VPN or Zero Trust access.
- Bastion hosts.
- PAM activation.
- RDP, SSH, PowerShell remoting, and cloud consoles.
- Emergency accounts.
- Service and automation identities.
- Hypervisor, backup, and security-tool consoles.
- Domain, tenant, and subscription administration.

Validate:

- MFA and phishing-resistant methods where appropriate.
- Separate privileged accounts.
- Least privilege and time-bound elevation.
- Device health.
- Source restrictions.
- Session and activity logging.
- Credential rotation.
- Break-glass monitoring and testing.

An isolated workload is not protected if its hypervisor or management plane is broadly accessible.

## 6. Dependency Analysis

### What

Dependencies are services or resources required for operation, security, or recovery.

### Why

Hidden dependencies create single points of failure and unexpected blast radius.

### How

Examine:

- DNS and time synchronization.
- Identity provider and directories.
- PKI and key management.
- Network, internet, and telecommunications.
- Cloud regions and platform services.
- Software supply chain.
- Monitoring and ticketing.
- Backup and recovery infrastructure.
- Staff and supplier availability.

### Where

Record dependencies in architecture diagrams, configuration management databases, business-impact analysis, risk registers, recovery plans, and supplier inventories.

## 7. Defense-in-Depth Review

Defense in depth uses independent or complementary controls so that one failure does not expose the objective.

Example: protecting a remote administrator:

| Layer | Control |
|---|---|
| Identity | Phishing-resistant MFA and separate privileged account |
| Device | Managed privileged workstation with EDR |
| Access | Time-bound PAM role |
| Network | Restricted management path through bastion |
| Host | Local firewall and hardened remote service |
| Detection | Identity, PAM, bastion, and endpoint correlation |
| Response | Session revocation and account containment playbook |
| Recovery | Tested break-glass and restoration procedure |

Do not count duplicated controls as independent when they share the same failure mode. Two tools using the same compromised identity provider may fail together.

## 8. System Hardening Review

### What

Hardening reduces attack surface and constrains behavior by securely configuring systems and removing unnecessary exposure.

### Why

Default configurations prioritize broad compatibility and ease of use. Unnecessary services, privileges, software, protocols, and trust increase attack opportunities.

### How

Use approved baselines, configuration management, exception handling, validation, and drift detection.

### Where

Apply hardening to endpoints, servers, directory services, network devices, hypervisors, containers, cloud resources, SaaS tenants, applications, and management tools.

## 9. Windows and Active Directory Review

Review:

- Supported versions and patch state.
- Microsoft Defender and EDR health.
- BitLocker coverage and recovery-key governance.
- Local administrator management.
- Windows Firewall profiles.
- PowerShell logging and constrained administration where appropriate.
- Audit policy and event forwarding.
- RDP exposure and Network Level Authentication.
- Service identities and permissions.
- LAPS or equivalent local-password management.
- Domain and forest trust.
- Privileged groups and delegated OU permissions.
- Kerberos encryption and service accounts.
- NTLM reduction and legacy dependencies.
- Group Policy ownership, change control, and drift.
- Domain-controller protection, backup, and recovery.

Evidence should include effective policy, not only intended Group Policy Objects.

## 10. Linux Review

Review:

- Supported distribution and package sources.
- Patch state and repository trust.
- Users, groups, sudoers, and SSH keys.
- File ownership, modes, ACLs, and sensitive paths.
- SSH authentication, root access, and forwarding policy.
- UFW, nftables, or enterprise host firewall.
- systemd services and enabled units.
- Cron and systemd timer persistence.
- Audit, authentication, and journal collection.
- SELinux or AppArmor status where deployed.
- Secrets and service-account permissions.
- Backup and recovery.
- Baseline compliance and drift.

Use `ss`, `systemctl`, package inventory, permissions, logs, and configuration-management evidence to validate the actual state.

## 11. Endpoint Review

Evaluate:

- Asset ownership and enrollment.
- EDR sensor health and tamper protection.
- Anti-malware and exploit protection.
- Disk encryption.
- Patch and vulnerability coverage.
- Application control.
- Browser and email protections.
- USB and removable-media policy.
- Host firewall.
- Local privilege.
- Logging and time synchronization.
- Isolation and reimage procedures.

Coverage percentages need complete denominators. Reporting "98% protected" is unreliable if unknown devices are absent from inventory.

## 12. Network and Remote-Access Review

Review:

- Authoritative network inventory and diagrams.
- VLAN and zone purpose.
- Default-deny and least-access rules.
- DMZ placement.
- East-west traffic controls.
- Administrative-plane isolation.
- Firewall rule ownership, expiration, and logging.
- NAT implications.
- IDS/IPS and Zeek visibility.
- DNS and DHCP security.
- VPN identity, MFA, posture, routing, and logs.
- RDP and SSH exposure.
- Wireless segmentation.
- Cloud connectivity and asymmetric routes.

Validate a rule from source to destination. A firewall entry can exist yet fail because of routing, state, NAT order, or an overlooked alternate path.

## 13. Cloud and SaaS Review

Review:

- Account, subscription, project, and tenant structure.
- Root or global administrator protection.
- Federated identity and emergency access.
- IAM roles and managed identities.
- Public endpoints and storage.
- Security groups, network ACLs, and private connectivity.
- Encryption and key ownership.
- Logging at organization, identity, management, and workload layers.
- Configuration policies and guardrails.
- Backup, snapshots, and cross-account recovery.
- CI/CD and infrastructure-as-code controls.
- Marketplace and OAuth application consent.
- Data sharing and retention.
- Provider and customer responsibilities.

A cloud provider secures the platform; the customer still owns configuration and responsibilities assigned by the service model.

## 14. Application and Data Review

Review:

- Authentication, session, and authorization design.
- Input validation and output encoding.
- Secrets and key management.
- Dependency and software-composition risk.
- Secure development and peer review.
- Build pipeline and artifact integrity.
- Database access.
- Data classification, minimization, retention, and deletion.
- Encryption at rest and in transit.
- API authorization, rate limits, and logging.
- Web application firewall limitations.
- Recovery and integrity validation.

Do not treat TLS as proof that application authorization or input handling is secure.

## 15. Vulnerability and Patch Integration

Verify that:

- Asset inventory defines scan scope.
- Authenticated scans use protected least-privilege credentials.
- Fragile assets have safe methods.
- Findings are validated and deduplicated.
- Threat intelligence and exposure influence priority.
- Tickets have owners and deadlines.
- Change management includes testing and rollback.
- Exceptions expire.
- Remediation is rescanned or otherwise validated.
- Metrics distinguish accepted, mitigated, fixed, and overdue risk.

## 16. Telemetry and Detection Review

### What

Detection coverage is the ability to observe and identify meaningful behavior across relevant attack paths.

### Why

Controls fail. Without sufficient telemetry and tested detection logic, incidents remain invisible.

### How

For critical scenarios, map:

- Required data sources.
- Collection path.
- Parsing and normalization.
- Retention.
- Detection rule.
- Threshold and suppression.
- Enrichment.
- Alert owner.
- Investigation steps.
- Response authority.
- Test evidence.

### Where

Include identity, endpoint, Windows, Linux, DNS, firewall, VPN, IDS, cloud control plane, SaaS, application, database, and backup telemetry.

### Coverage Validation

An ATT&CK mapping is not evidence of effective detection. Generate an authorized test event, confirm source logging, collection, parsing, rule execution, alert routing, analyst interpretation, and response.

## 17. Incident Response and Recovery Review

Evaluate:

- Incident policy and authority.
- Contact and escalation records.
- NIST-aligned response process.
- Playbooks for likely scenarios.
- Identity and endpoint containment capability.
- Forensic preservation.
- Legal, privacy, compliance, and communications coordination.
- Supplier response obligations.
- Recovery priorities.
- Offline or immutable backups.
- Restore testing and integrity validation.
- Lessons-learned tracking.

Recovery should not reconnect systems into the same unresolved attack path.

## 18. Zero Trust Principles

### What

Zero Trust is an architectural approach that does not grant implicit trust based only on network location, ownership, or a previous authentication. Access is explicitly evaluated using identity, device, resource, context, policy, and risk.

### Why

Modern enterprises operate across cloud, SaaS, remote work, suppliers, mobile devices, and hybrid infrastructure. A trusted internal network is too broad a security boundary.

### How

Apply:

- Explicit verification.
- Least-privilege access.
- Assume breach.
- Strong identity.
- Device and workload posture.
- Resource-level policy.
- Segmentation.
- Continuous telemetry and reevaluation.
- Automated response with safeguards.

### Where

Zero Trust applies to users, administrators, service identities, APIs, workloads, data, remote access, cloud management, and internal applications.

## 19. Zero Trust Decision Flow

An access decision may evaluate:

1. Subject identity and authentication strength.
2. Device identity, management, encryption, and risk.
3. Requested resource and action.
4. User and resource sensitivity.
5. Time, location, behavior, and threat context.
6. Policy and risk threshold.
7. Permit, deny, limit, or require stronger verification.
8. Log, monitor, and reevaluate the session.

Access granted at 09:00 should not necessarily remain trusted after the device becomes high risk at 09:15.

## 20. What Zero Trust Does Not Mean

Zero Trust does not mean:

- Trusting nobody in a social or employment sense.
- Buying one vendor product.
- Removing all networks or firewalls.
- Prompting for MFA on every click.
- Eliminating availability and recovery needs.
- Automatically blocking all legacy systems.
- Replacing governance, asset inventory, or incident response.

Poorly designed controls can create denial-of-service risk or unsafe workarounds. Use phased deployment and business validation.

## 21. Zero Trust Maturity Questions

| Domain | Review questions |
|---|---|
| Identity | Are users and workloads strongly identified? Is privilege time-bound? |
| Devices | Is health known and continuously evaluated? |
| Applications | Is access resource-specific or broadly network-based? |
| Data | Is sensitivity known and use constrained? |
| Network | Is lateral movement limited and observed? |
| Automation | Can risk trigger safe access changes? |
| Visibility | Can decisions be reconstructed from logs? |
| Governance | Are policies, owners, exceptions, and metrics defined? |

## 22. Gap Identification

### What

A security gap is a difference between the required or target state and the observed state.

### Why

Unstructured concerns do not create accountable remediation.

### How

Record:

- Target or requirement.
- Observed condition.
- Evidence.
- Affected scope.
- Threat scenario.
- Existing controls.
- Business impact.
- Likelihood and confidence.
- Recommendation.
- Owner and due date.
- Residual risk and exception status.
- Validation method.

### Where

Track gaps in findings, risk registers, plans of action, remediation tickets, architecture decisions, compliance records, and executive dashboards.

## 23. Gap Types

| Type | Example |
|---|---|
| Coverage gap | Cloud audit logs are collected from only two of five subscriptions |
| Design gap | Leaver process omits contractors |
| Operation gap | Required quarterly review was missed |
| Visibility gap | DNS logs lack client identity |
| Integration gap | EDR risk does not influence remote access |
| Resilience gap | Backup console shares domain credentials |
| Governance gap | Firewall exceptions have no owner or expiry |
| Validation gap | Recovery plan has never been tested |

## 24. Attack-Path Analysis

Prioritize connected weaknesses, not isolated scores.

Example path:

1. Phishing captures a user's session.
2. SaaS access permits OAuth application consent.
3. The user can access a shared administration document.
4. The document exposes a service credential.
5. The credential reaches a flat server network.
6. Backup administration uses the same identity plane.

Each issue may appear moderate alone. Together they create a high-impact ransomware and data-exposure path.

Break paths at multiple points through phishing-resistant authentication, consent restrictions, secrets management, least privilege, segmentation, backup isolation, and tested detections.

## 25. Prioritization

Prioritize using:

- Business criticality and safety.
- Data sensitivity.
- Exposure.
- Threat activity.
- Exploit prerequisites.
- Privilege and blast radius.
- Existing controls.
- Detection and recovery capability.
- Compliance deadline.
- Remediation complexity and dependency.

Quick wins matter, but do not allow many easy low-risk actions to displace a difficult material risk.

## 26. Findings and Roadmap

Group actions into:

- **Immediate:** active exposure, containment, or critical control restoration.
- **Near term:** high-risk design and coverage gaps.
- **Planned:** structural improvements requiring projects.
- **Accepted:** approved residual risk with monitoring and expiry.

Every roadmap item needs an accountable owner, resources, dependencies, success measure, and validation.

## 27. Enterprise Scenarios

### Scenario A: Healthcare Architecture

A clinical device cannot support modern authentication. The organization isolates it, permits only required clinical flows, routes vendor support through PAM and a monitored bastion, passively monitors traffic, and maintains a replacement deadline. Zero Trust is achieved through surrounding controls, not an unsafe forced agent installation.

### Scenario B: Financial Recovery Gap

The bank has immutable backups, but backup administrators authenticate through the production domain. The review identifies a shared identity failure, separates recovery credentials, hardens the management plane, and conducts a domain-compromise recovery exercise.

### Scenario C: University Cloud Sprawl

Research subscriptions are missing from central logging. The university establishes organization-level inventory, enrollment guardrails, delegated ownership, minimum log requirements, and a monitored exception path for sensitive experiments.

### Scenario D: Government Supplier Access

A vendor VPN allows broad network reach during a six-month project. The agency replaces it with approved-device, time-bound, resource-specific access through a bastion and correlates vendor identity, session, endpoint, and target logs.

### Scenario E: Small Business

A small company cannot implement every advanced tool. It uses CIS IG1 priorities: inventory, MFA, patching, secure configuration, backups, endpoint protection, logging, and an external incident-response contact. Its architecture remains simple and supportable.

## 28. Enterprise Troubleshooting During Review

When a control appears absent:

1. Confirm the expected architecture.
2. Query the authoritative configuration source.
3. Test the actual path safely.
4. Check collection and time synchronization.
5. Identify alternate routes and identities.
6. Distinguish configuration from temporary outage.
7. Record evidence and limitations.
8. Avoid making unapproved production changes during assessment.

For example, a missing SIEM event may indicate source logging disabled, collector failure, parser mismatch, filter suppression, network interruption, clock skew, or wrong query scope.

## 29. Classroom Hands-On Practical

### Title

Integrated Enterprise Security Review

### Environment

A fictional hybrid healthcare organization has:

- Active Directory and Microsoft 365.
- Windows endpoints and Linux application servers.
- A public patient portal in a cloud subscription.
- A pfSense-managed network with clinical, user, server, and DMZ VLANs.
- Remote vendor access.
- Wazuh and Microsoft Sentinel telemetry.
- Local and cloud backups.

### Tasks

1. Identify business services, owners, data, and critical dependencies.
2. Build a current-state architecture and data-flow diagram.
3. Mark internet, identity, privilege, management, cloud, vendor, and recovery trust boundaries.
4. Trace one user path, one administrator path, and one service-identity path.
5. Review hardening evidence for Windows, Linux, AD, network, endpoint, and cloud.
6. Map defense-in-depth controls and shared failure modes.
7. Evaluate Zero Trust maturity by domain.
8. Test telemetry and detection for one authorized scenario.
9. Identify at least eight gaps using the formal gap fields.
10. Construct one multi-stage attack path.
11. Prioritize a 30-, 90-, and 180-day roadmap.
12. Deliver a technical report and five-minute executive briefing.

### Success Criteria

Students must use evidence, distinguish target from observed state, include recovery and operational controls, use correct Security+ control taxonomy, and avoid treating products as proof of architecture effectiveness.

## 30. Take-Home Practical

Review the complete isolated course lab.

Produce:

- Business context.
- Asset and identity inventory.
- Architecture and data-flow diagram.
- Administrative-path diagram.
- Hardening checklist with evidence.
- Zero Trust assessment.
- Detection and response coverage table.
- Recovery dependency analysis.
- Ten-gap register.
- One attack-path narrative.
- Prioritized roadmap.
- Executive summary.

For each finding, state evidence, confidence, impact, owner, deadline, and validation method.

## 31. Assessment Questions

### Multiple Choice

1. What is the best starting point for an architecture walkthrough?
   - A. A list of firewall vendors
   - B. The business service, data, users, owners, and dependencies
   - C. The highest CVSS score
   - D. A generic compliance checklist

2. Which is a trust boundary?
   - A. A page break in a report
   - B. A transition between a vendor identity and an internal management resource
   - C. Two files in the same directory
   - D. A vulnerability name

3. What does Zero Trust require?
   - A. Implicit trust for internal devices
   - B. Explicit, context-aware access decisions and continuous evaluation
   - C. Removal of all firewalls
   - D. Purchase of one product

4. Which is an integration gap?
   - A. The EDR detects high device risk, but remote access continues unchanged.
   - B. The security policy has an owner.
   - C. Backups are restored successfully.
   - D. Firewall logs reach the SIEM.

5. Why should an ATT&CK mapping be tested?
   - A. A mapping alone does not prove telemetry, rule behavior, alert routing, or analyst response.
   - B. ATT&CK contains no techniques.
   - C. Testing removes the need for logs.
   - D. Every mapped rule is automatically effective.

6. Which creates a dangerous shared failure mode?
   - A. Recovery administrators use an identity plane independent of production.
   - B. Production and backup consoles depend on the same privileged credentials.
   - C. Offline recovery procedures are tested.
   - D. Privileged actions are logged.

7. What is the strongest finding statement?
   - A. Security is weak.
   - B. The cloud is insecure.
   - C. Three production subscriptions do not export control-plane logs; privilege changes there cannot be centrally detected or investigated.
   - D. Buy more tools.

8. Which prioritization approach is most appropriate?
   - A. Fix only easy findings.
   - B. Use scanner score alone.
   - C. Consider connected attack paths, business impact, exposure, controls, and recovery.
   - D. Address findings alphabetically.

### Short Answer

9. List six questions to ask about a data flow crossing a trust boundary.
10. Explain why effective Group Policy must be checked rather than only intended configuration.
11. Distinguish a coverage gap from an operating gap.
12. Explain how Zero Trust can be applied to a legacy clinical device.

### Scenario

13. A hybrid enterprise uses MFA for remote access, but administrators connect from unmanaged personal devices to a broad VPN, use standing Domain Admin accounts, and manage both production and backup systems. Identify the integrated risks and propose a phased architecture improvement.

## 32. Answer Key

1. **B.** Architecture security exists to protect business services, data, and users; technology review follows that context.
2. **B.** Identity, ownership, and privilege assumptions change when vendor access reaches an internal management resource.
3. **B.** Zero Trust evaluates identity, device, resource, context, policy, and risk rather than trusting location alone.
4. **A.** The tools produce relevant risk information, but the access decision does not consume it.
5. **A.** End-to-end testing proves whether the detection chain works in practice.
6. **B.** One credential or directory compromise can defeat both production and recovery.
7. **C.** It identifies scope, observed condition, and operational consequence.
8. **C.** Organizational risk depends on connected conditions and business context, not one technical value.
9. Any six of: source, destination, protocol, identity, authentication, authorization, encryption, certificate validation, data classification, input validation, logging, failure behavior, and owner.
10. GPOs can be filtered, overridden, blocked, conflicted, delayed, or fail to apply. Effective-result evidence confirms the endpoint's actual state.
11. A coverage gap leaves part of the required population or environment outside the control. An operating gap occurs when a correctly designed control fails to run or produce the required result.
12. Surround it with controls: isolate it, permit only necessary flows, restrict and monitor administrative access, use passive monitoring, manage exceptions, and plan replacement. Do not force an unsupported control that threatens patient safety.
13. MFA reduces credential-only attacks but does not establish device trust or least privilege. Personal devices increase malware and evidence risk; broad VPN access enables lateral movement; standing Domain Admin magnifies compromise; shared production and backup administration threatens recovery. Phase improvements by first monitoring and restricting source paths, separating backup credentials, and removing unnecessary standing privilege. Then deploy managed privileged workstations, PAM with time-bound roles, a bastion, resource-specific access, device-compliance decisions, segmented management networks, and correlated logs. Test emergency access and domain-compromise recovery.

## 33. Glossary

| Term | Definition |
|---|---|
| Administrative path | Route and identities used to manage a system or security boundary |
| Architecture walkthrough | Structured review of a service's design, operation, monitoring, and recovery |
| Attack path | Connected sequence of conditions an attacker may use to reach an objective |
| Coverage gap | Required assets, users, or events outside a control's effective population |
| Data flow | Movement of data between entities, processes, or storage |
| Defense in depth | Layered controls that reduce reliance on any one safeguard |
| Dependency | Service or resource required for operation, security, or recovery |
| Drift | Deviation of actual configuration from an approved baseline |
| Integration gap | Failure of relevant controls or systems to exchange or act on information |
| Management plane | Interfaces and services used to administer resources |
| Single point of failure | Component whose loss causes a service or control to fail |
| Trust boundary | Transition where identity, ownership, privilege, or security assumptions change |
| Zero Trust | Architecture that avoids implicit trust and explicitly evaluates access using context and risk |

## 34. Lesson Review Checklist

Students should now be able to:

- [ ] Begin architecture review with business services and data.
- [ ] Trace user, administrator, service, data, and recovery paths.
- [ ] Identify trust boundaries and dependencies.
- [ ] Review hardening across Windows, Linux, AD, endpoint, network, cloud, and applications.
- [ ] Evaluate telemetry, detection, response, and recovery.
- [ ] Explain and apply Zero Trust principles.
- [ ] Identify coverage, design, operation, visibility, integration, resilience, governance, and validation gaps.
- [ ] Construct and break multi-stage attack paths.
- [ ] Prioritize an evidence-based roadmap.
- [ ] Communicate technical and executive findings.

## 35. Continuity Note

This lesson integrates the complete architecture and operations taught throughout the course. Lesson 40 will require students to apply those competencies in a capstone investigation from SIEM alert through log and PCAP analysis, threat intelligence, ATT&CK mapping, severity assessment, containment, and written incident reporting.
