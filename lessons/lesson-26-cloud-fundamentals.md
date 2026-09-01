# Lesson 26: Cloud Fundamentals

## Lesson Overview

Cloud computing delivers configurable technology resources through provider-operated platforms and service models. Security responsibilities change according to whether the customer consumes infrastructure, a managed platform, or complete software.

This lesson covers Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS), the shared responsibility model, cloud risk, and common misconfigurations.

## Learning Objectives

Students will be able to:

- Explain essential cloud characteristics and deployment models.
- Compare IaaS, PaaS, and SaaS.
- Apply shared responsibility to identity, data, networks, workloads, logging, and recovery.
- Identify management-plane, identity, storage, network, and secret risks.
- Explain cloud-native logging and configuration evidence.
- Assess common AWS, Azure, and Microsoft 365 misconfigurations conceptually.
- Design preventive, detective, and corrective cloud controls.

## Prerequisite Knowledge

Students should understand virtualization, IAM, networking, segmentation, endpoint security, cryptography, logging, and incident response foundations from previous lessons.

## Enterprise Relevance

Organizations use cloud services for:

- Virtual machines.
- Storage.
- Databases.
- Web applications.
- Identity.
- Email and collaboration.
- Analytics.
- Backup.
- Security operations.
- Software development.

Cloud services can be deployed quickly, making governance and continuous visibility essential.

## 1. Cloud Computing

Cloud computing provides on-demand access to shared configurable computing resources through provider-operated services.

Organizations seek speed, elasticity, global reach, managed capabilities, and consumption-based cost.

Customers request resources through portals, APIs, command-line tools, infrastructure-as-code, and managed platforms.

Cloud workloads run in provider regions, availability zones, edge locations, SaaS tenants, and hybrid connections.

## 2. Cloud Characteristics

Common characteristics include:

- On-demand self-service.
- Broad network access.
- Resource pooling.
- Rapid elasticity.
- Measured service.

Security implications:

- Fast deployment can bypass review.
- APIs become privileged management paths.
- Elastic assets can appear and disappear.
- Resource tags and inventory may become stale.
- Cost can be affected by abuse.

## 3. Deployment Models

| Model | Description |
|---|---|
| Public cloud | Provider infrastructure shared across customers with logical isolation |
| Private cloud | Cloud-like environment dedicated to one organization |
| Hybrid cloud | Integrated use of on-premises or private and public cloud |
| Multi-cloud | Use of more than one cloud provider |

Deployment model is different from service model. A private cloud can still offer IaaS or PaaS.

## 4. Infrastructure as a Service

IaaS provides virtualized compute, storage, and networking while the customer manages operating systems, applications, identities, and data.

It offers control similar to a virtual data center without owning physical infrastructure.

Customers deploy VMs, virtual networks, disks, load balancers, and security rules through cloud management interfaces.

Examples include AWS EC2 and Azure Virtual Machines.

### Customer Responsibilities

- Guest OS hardening and patching.
- Applications.
- Workload identities.
- Host firewall.
- Data protection.
- Security groups and routes.
- Monitoring agents.
- Backup and recovery configuration.

The provider protects physical facilities, hardware, and underlying virtualization according to the service.

## 5. Platform as a Service

PaaS provides a managed application platform where the provider operates more of the runtime, middleware, scaling, and operating system.

Developers can focus on application code and data rather than server administration.

Customers deploy code or configure a managed database, function, container platform, or web application service.

Examples include managed web applications, serverless functions, and managed databases.

### Customer Responsibilities

- Application code.
- Data.
- Identity and access.
- Secrets.
- Network exposure.
- Service configuration.
- Logging.
- Dependency and application security.

PaaS removes some patching responsibility but does not remove secure coding or configuration responsibility.

## 6. Software as a Service

SaaS provides a complete provider-operated application consumed by users or systems.

Organizations avoid managing the underlying application stack.

Customers configure a tenant, identities, sharing, retention, applications, and data governance.

Examples include Microsoft 365, cloud CRM, HR, ticketing, and collaboration platforms.

### Customer Responsibilities

- User and administrator identities.
- MFA and conditional access.
- Data classification and sharing.
- Tenant settings.
- Application consent.
- Retention and recovery choices.
- Endpoint security.
- Monitoring and incident response.

The provider operating the application does not know which external guest or sharing decision is appropriate for the customer.

## 7. Service Model Comparison

| Layer | IaaS | PaaS | SaaS |
|---|---|---|---|
| Physical infrastructure | Provider | Provider | Provider |
| Hypervisor | Provider | Provider | Provider |
| Guest OS | Customer | Provider | Provider |
| Runtime/middleware | Customer | Mostly provider | Provider |
| Application | Customer | Customer | Provider |
| Application configuration | Customer | Customer | Shared/customer |
| Identity and data decisions | Customer | Customer | Customer/shared |

Exact boundaries vary by service. Contracts and provider documentation are authoritative for the selected offering.

## 8. Shared Responsibility

Shared responsibility divides security obligations between cloud provider and customer.

The provider cannot control every customer identity, configuration, application, or data decision, while the customer cannot secure provider facilities and hypervisors directly.

Responsibilities shift by service model and contract.

Apply the model to every control, not only broad layers.

## 9. Shared Responsibility Questions

For each service ask:

- Who patches the operating system?
- Who configures identity?
- Who encrypts data and manages keys?
- Who configures network exposure?
- Who creates and retains logs?
- Who backs up data?
- Who tests recovery?
- Who handles vulnerabilities?
- Who notifies whom during incidents?

"The provider handles security" is never a sufficient analysis.

## 10. Cloud Management Plane

The management plane is the interface used to create, modify, and delete cloud resources and policy.

Compromise can affect many workloads and regions without exploiting each workload.

Management occurs through:

- Web portals.
- APIs.
- CLIs.
- SDKs.
- Infrastructure-as-code.
- Automation identities.

Every cloud tenant, account, subscription, project, and SaaS environment has privileged control functions.

## 11. Management-Plane Protection

- Phishing-resistant MFA.
- Separate privileged identities.
- Least-privileged roles.
- JIT access.
- Conditional access.
- Privileged workstations.
- API and access-key control.
- Logging.
- Emergency accounts.
- Organization-level guardrails.

Do not use root, owner, or global administrator identities for routine work.

## 12. Cloud Identity

Cloud identity types:

- Human users.
- Guests and external users.
- Service principals.
- Managed identities.
- Roles.
- API keys.
- Workload federation.

Prefer short-lived, managed credentials over embedded long-lived secrets.

Risks:

- Overprivileged roles.
- Stale guests.
- Unused access keys.
- Excessive application consent.
- Cross-account trust.
- Public repository secrets.

## 13. Cloud Networking

Cloud networking includes:

- Virtual networks or VPCs.
- Subnets.
- Routes.
- Security groups.
- Network ACLs.
- Public IP addresses.
- Load balancers.
- Private endpoints.
- VPN and dedicated links.

Security groups may be stateful while network ACLs may be stateless, depending on platform. Validate actual service behavior.

## 14. Public Exposure

Exposure can result from:

- Public IP.
- Internet-facing load balancer.
- Broad security group.
- Public storage endpoint.
- Public PaaS access.
- API gateway.
- SaaS anonymous sharing.

An asset without a public IP may still be publicly reachable through another service.

## 15. Cloud Storage

Storage types include:

- Object.
- Block.
- File.
- Database.
- SaaS document storage.

Protect:

- Public access.
- Identity permissions.
- Encryption.
- Key policy.
- Versioning.
- Retention.
- Immutability.
- Logging.
- Data lifecycle.

Encryption does not correct public read permission.

## 16. Cloud Encryption and Keys

Models may include:

- Provider-managed keys.
- Customer-managed keys.
- Customer-provided key material.
- Application-level encryption.

Customer-managed keys provide additional control but create responsibility for policy, availability, rotation, monitoring, and recovery.

Deleting or disabling a key can make data unavailable.

## 17. Secrets

Secrets include:

- API keys.
- Database passwords.
- Private keys.
- Tokens.
- Connection strings.

Use managed secret stores, workload identity, scoped access, rotation, and access logging.

Avoid secrets in:

- Source code.
- VM images.
- User-data scripts.
- Logs.
- Tickets.
- Chat.
- Environment files with weak permissions.

## 18. Instance Metadata

Cloud instances may access metadata services containing configuration or workload credentials.

Risks:

- Server-side request forgery.
- Overprivileged instance identity.
- Unrestricted metadata access.

Controls:

- Stronger metadata service modes where available.
- Least-privileged workload roles.
- SSRF defenses.
- Network and process restrictions.
- Monitoring credential use.

## 19. Cloud Logging

Important logs:

- Management-plane audit.
- Identity sign-ins.
- Role changes.
- Storage access.
- Network flow.
- DNS.
- Load balancer and WAF.
- PaaS application.
- Key management.
- Security findings.

Logs often require explicit enablement, destination, retention, and protection.

## 20. Logging Architecture

Use:

- Central security account or workspace.
- Immutable or protected retention where required.
- Cross-account access controls.
- Alerting on log disablement.
- Time normalization.
- Parsing validation.
- Cost monitoring.

Cloud resources can be deleted quickly; centralized logs may be the only surviving evidence.

## 21. Common Misconfigurations

| Misconfiguration | Risk |
|---|---|
| Public object storage | Data disclosure |
| `0.0.0.0/0` administrative port | Internet attack surface |
| Excessive IAM role | Privilege escalation |
| Long-lived access key | Credential theft |
| Disabled audit logging | Detection and investigation gap |
| Unencrypted sensitive data | Disclosure and compliance risk |
| Over-broad key policy | Unauthorized decryption |
| Public database | Direct attack path |
| Anonymous SaaS sharing | Data leakage |
| Default or stale guest access | Unauthorized access |

## 22. Misconfiguration Causes

- Rapid deployment.
- Copying templates.
- Lack of ownership.
- Manual portal changes.
- Inconsistent environments.
- Broad troubleshooting access.
- Missing policy-as-code.
- Unclear responsibility.
- Alert fatigue.
- Shadow IT.

Correct the process as well as the individual resource.

## 23. Infrastructure as Code

Infrastructure as code (IaC) defines cloud resources in version-controlled templates.

Benefits:

- Repeatability.
- Review.
- Testing.
- Drift comparison.
- Rapid recovery.

Risks:

- One insecure template scales widely.
- Secrets committed to repositories.
- Pipeline compromise.
- Excessive deployment identity.
- Unreviewed modules.

Use code review, scanning, signed artifacts where applicable, protected branches, and least-privileged pipelines.

## 24. Cloud Security Posture Management

CSPM capabilities assess cloud configuration against policies and benchmarks.

Use for:

- Public exposure.
- Identity risk.
- Encryption.
- Logging.
- Baseline compliance.
- Vulnerability context.

CSPM findings require asset context and ownership. A compliant configuration can still host vulnerable application code.

## 25. Resilience

Cloud resilience uses:

- Multiple availability zones.
- Regional recovery.
- Backups.
- Versioning.
- Replication.
- Autoscaling.
- Queueing.
- Tested infrastructure redeployment.

Availability zones reduce some infrastructure failures but do not protect against customer deletion, bad code, compromised credentials, or region-wide failure.

## 26. Data Residency and Compliance

Organizations must know:

- Where data is stored.
- Where backups and logs reside.
- Which provider personnel or subprocessors may access it.
- Which laws and contracts apply.
- How deletion and retention work.

Region selection alone does not settle every residency or legal question.

## 27. Enterprise Scenarios

### Small Business

A Microsoft 365 tenant permits anonymous document links. The organization restricts sharing, reviews existing links and guests, enables MFA, and monitors downloads.

### Financial Institution

An AWS IAM role has wildcard administrative permissions. The bank replaces it with scoped roles, permission boundaries or guardrails, JIT access, and alerting.

### Healthcare Organization

An Azure storage account containing health data permits public network access. Private endpoints, firewall policy, encryption, logging, and identity restrictions reduce exposure.

### Educational Institution

Students receive cloud sandboxes with cost and permission limits. Guardrails prevent public databases and cryptocurrency mining.

### Government Agency

Customer-managed key policy allows too many administrators. Separation of duties and HSM-backed controls protect key use.

### Hybrid Enterprise

An on-premises compromise reaches synchronized cloud identities. Teams protect synchronization infrastructure and monitor cross-environment privilege.

## 28. Cloud Incident Response

1. Preserve management and identity logs.
2. Identify accounts, roles, keys, tokens, and resources.
3. Revoke or restrict compromised identities.
4. Snapshot or preserve workloads where appropriate.
5. Isolate network paths.
6. Protect logs and backups.
7. Determine data access and exfiltration.
8. Rebuild through trusted IaC.
9. Rotate secrets and keys.
10. correct policy and detection gaps.

Deleting a compromised instance immediately can destroy evidence while leaving stolen credentials active.

## 29. Cloud Risk Assessment

Assess:

- Data sensitivity.
- Service model.
- Provider dependency.
- Identity design.
- Exposure.
- Workload vulnerability.
- Logging.
- Recovery.
- Legal requirements.
- Exit strategy.

Risk is shared operationally, but accountability cannot simply be outsourced.

## 30. Security+ SY0-701 Alignment

This lesson supports cloud service models, shared responsibility, IAM, virtualization, storage, encryption, network security, misconfiguration, logging, resilience, and data governance.

Cloud IAM, security groups, encryption settings, and guardrails are technical controls. Access review, incident response, backup testing, and change review are operational controls. Cloud policy and provider governance are managerial controls and directive in function.

## 31. Classroom Hands-On Practical

### Practical Title

Assess a Cloud Environment

### Safety

Use an instructor-provided fictional inventory or sandbox. Do not create public resources or use production credentials.

### Scenario

- Two IaaS VMs.
- One PaaS web application.
- Object storage.
- Managed database.
- Microsoft 365.
- Five human users.
- Two service identities.

Findings:

- SSH open to the Internet.
- Storage allows anonymous read.
- One service key is three years old.
- Audit logging is disabled.
- Database uses public endpoint.
- Global admin lacks MFA.

### Tasks

1. Classify each service model.
2. Assign provider and customer responsibilities.
3. Rank findings by risk.
4. Recommend immediate containment.
5. Design least-privileged IAM.
6. Define logging and retention.
7. Propose network and storage controls.
8. Define recovery tests.

### Risk Table

| Asset | Service Model | Finding | Impact | Owner | Control | Validation |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 32. Take-Home Practical

Design cloud security for one organization. Include:

- Deployment and service models.
- Shared-responsibility matrix.
- Account and subscription structure.
- Human and workload IAM.
- Network architecture.
- Storage and key management.
- Secret management.
- Logging and SIEM.
- IaC controls.
- Resilience, recovery, and exit strategy.
- Ten misconfigurations and detections.

## 33. Assessment Questions

### Multiple Choice

1. Who manages the guest OS in IaaS?
   A. Customer
   B. Provider only
   C. Internet user
   D. Nobody

2. Which model provides a managed application platform?
   A. PaaS
   B. IaaS only
   C. Physical security
   D. VLAN

3. Which is a customer SaaS responsibility?
   A. User access and data sharing
   B. Provider data-center guards
   C. Hypervisor patching
   D. Physical disks

4. Why is the management plane high value?
   A. It controls resources and policy at scale
   B. It has no privileges
   C. It only displays invoices
   D. It cannot delete resources

5. What is safer than an embedded long-lived secret?
   A. Managed workload identity
   B. Public repository key
   C. Shared root password
   D. Anonymous access

6. Why does encryption not fix public storage?
   A. Authorized public access can still return decrypted data
   B. Encryption disables IAM
   C. Storage has no keys
   D. Public means offline

7. What can instance metadata expose?
   A. Workload credentials and configuration
   B. Physical badge logs only
   C. Printed documents
   D. Every user password

8. What is a benefit of IaC?
   A. Repeatable, reviewable deployment
   B. No need for security review
   C. Automatic secure code
   D. Removal of identity

9. Why centralize cloud logs?
   A. Preserve and correlate evidence beyond resource lifetime
   B. Disable alerts
   C. Make resources public
   D. Avoid retention

10. Which is an operational control?
    A. Quarterly cloud-access review
    B. Security-group rule
    C. Encryption setting
    D. IAM policy engine

### Short Answer

1. Compare IaaS, PaaS, and SaaS.
2. Explain shared responsibility.
3. Describe management-plane protection.
4. List cloud identity types and risks.
5. Explain public-exposure paths.
6. Describe cloud encryption and key choices.
7. List common cloud misconfigurations.
8. Describe cloud incident response.

### Scenario Questions

1. A public storage bucket contains customer records. Describe response.
2. An IaaS VM is unpatched. Assign responsibility and remediation.
3. A service key appears in a public repository. Describe containment.
4. Audit logging was disabled before resources were deleted. Describe evidence strategy.
5. A PaaS application is vulnerable to SQL injection. Explain responsibility.

## 34. Glossary

| Term | Definition |
|---|---|
| Cloud Management Plane | Interfaces controlling cloud resources and policy. |
| CSPM | Capability assessing cloud configuration and posture. |
| IaaS | Service model providing virtualized infrastructure. |
| IaC | Versioned code defining infrastructure resources. |
| Managed Identity | Platform-managed workload identity avoiding embedded credentials. |
| PaaS | Service model providing a managed application platform. |
| Public Cloud | Provider environment shared through logical tenant isolation. |
| SaaS | Provider-operated complete software application. |
| Shared Responsibility | Division of cloud security obligations between provider and customer. |
| Workload Identity | Identity used by application or infrastructure code. |

## 35. Lesson Review Checklist

- I can compare cloud service and deployment models.
- I can assign shared responsibility by control.
- I can protect the management plane.
- I can secure cloud identity, networks, storage, keys, and secrets.
- I can identify common misconfigurations.
- I can design logging, IaC, resilience, and incident response.

## 36. Continuity With Future Lessons

Lesson 27 applies cloud and network knowledge to Nmap, Netdiscover, asset inventory, attack-surface mapping, and asset management.

Students should retain that an asset can be exposed through a public service even without a directly assigned public IP, and that ephemeral cloud resources require automated inventory.
