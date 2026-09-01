# Lesson 1: Security Fundamentals

## Lesson Overview

Cybersecurity begins with a simple professional question: what must be protected, from what, and how well?

Security fundamentals give analysts, administrators, and incident responders the language needed to answer that question in a business environment. Before a student can understand malware, firewalls, SIEM alerts, cloud security, Active Directory, or incident response, the student must understand the relationship between assets, risk, threats, vulnerabilities, controls, defense in depth, and attack surface.

This lesson introduces the foundation that every later lesson will build on. The goal is not only to memorize terms, but to think like a security professional who can connect technical weaknesses to real business impact.

## Learning Objectives

By the end of this lesson, students should be able to:

- Explain the CIA Triad and apply it to real enterprise systems.
- Define risk, threat, vulnerability, security control, defense in depth, and attack surface.
- Distinguish between threats, vulnerabilities, and risks.
- Explain why security controls must be layered.
- Identify common attack surface areas in small business, enterprise, healthcare, finance, education, government, cloud, and hybrid environments.
- Connect foundational security concepts to SOC, systems administration, vulnerability management, and incident response work.
- Apply security fundamentals to practical scenarios using professional reasoning.

## Prerequisite Knowledge

Students should understand basic computer usage, common business systems, the internet, user accounts, passwords, email, and the general idea that organizations depend on technology to operate. No advanced technical background is required.

## Enterprise Relevance

Security fundamentals are used daily by:

- SOC analysts who triage alerts and decide whether activity represents real risk.
- Security administrators who configure access, endpoint protection, firewalls, and monitoring.
- Systems administrators who harden servers, patch vulnerabilities, and protect availability.
- Vulnerability management analysts who rank weaknesses by business impact.
- Incident responders who decide what must be contained first during an attack.
- IT managers who communicate security risk to business leadership.

In an enterprise, cybersecurity is not only about blocking hackers. It is about protecting business operations, customer trust, legal obligations, financial stability, and human safety.

## 1. The CIA Triad

The CIA Triad is the foundational model used to describe the three primary goals of information security:

| Principle | Meaning | Security Question |
|---|---|---|
| Confidentiality | Information is only accessible to authorized people, systems, or processes. | Who is allowed to see this data? |
| Integrity | Information and systems remain accurate, complete, and trustworthy. | Has this data or system been changed improperly? |
| Availability | Information and services are accessible when needed. | Can authorized users access the system when required? |

### Confidentiality

Confidentiality means protecting information from unauthorized access or disclosure.

In simple terms, confidentiality ensures that private data stays private. Examples include customer records, employee salary data, bank account details, medical records, government documents, source code, and security investigation reports.

Loss of confidentiality can cause financial loss, regulatory penalties, identity theft, reputational damage, and legal exposure.

For example:

- A hospital must prevent unauthorized access to patient records.
- A bank must protect account numbers, transaction history, and authentication data.
- A school must protect student records and examination results.
- A government agency must protect sensitive citizen information.
- A company using Microsoft 365 must protect email, SharePoint files, and Teams conversations.

### How Confidentiality Is Protected

Common confidentiality controls include:

- Authentication, such as passwords and multifactor authentication.
- Authorization, such as role-based access control.
- Encryption for data at rest and data in transit.
- Data loss prevention.
- Network segmentation.
- Secure file permissions.
- Least privilege access.
- Monitoring for unauthorized access.

In Windows environments, confidentiality may be supported by NTFS permissions, BitLocker, Microsoft Defender, Conditional Access, and Active Directory group membership. In Linux environments, confidentiality may be supported by file permissions, SSH key controls, disk encryption, and restricted sudo access.

### Where Confidentiality Applies

Confidentiality applies wherever sensitive information exists:

- Databases.
- File shares.
- Laptops.
- Cloud storage.
- Email systems.
- Backups.
- SIEM logs.
- Source code repositories.
- Identity platforms.

### Integrity

Integrity means ensuring that data, systems, and processes remain accurate, complete, and trustworthy.

Integrity is not only about preventing attackers from changing data. It also includes preventing accidental corruption, unauthorized configuration changes, software tampering, and improper administrative actions.

If integrity fails, users and systems can no longer trust the information they depend on.

For example:

- A bank must ensure transaction balances are correct.
- A hospital must ensure medication records are accurate.
- A university must ensure grades are not altered improperly.
- A government agency must ensure public records are not manipulated.
- A SOC must ensure logs have not been deleted or modified by an attacker.

### How Integrity Is Protected

Common integrity controls include:

- Hashing.
- Digital signatures.
- File integrity monitoring.
- Change control.
- Version control.
- Access control.
- Database constraints.
- Logging and auditing.
- Configuration baselines.
- Endpoint detection and response.

Tools such as Wazuh can monitor file integrity. Microsoft Sentinel and Splunk can collect logs that help detect suspicious changes. Git can help preserve the integrity of source code by tracking changes.

### Where Integrity Applies

Integrity applies to:

- Financial transactions.
- Medical records.
- Security logs.
- System configurations.
- Software updates.
- Active Directory objects.
- Firewall rules.
- Cloud identity settings.
- Vulnerability scan results.

### Availability

Availability means ensuring that authorized users can access systems, applications, and data when needed.

Availability is critical because even perfectly confidential and accurate data has limited value if nobody can access it during business operations.

Availability failures can stop business operations, disrupt public services, and endanger people.

For example:

- A hospital needs access to patient systems during emergency care.
- A bank needs online banking systems to remain available for customers.
- A school needs learning platforms during exams.
- A small business needs point-of-sale systems during business hours.
- A government portal must remain available when citizens need public services.

### How Availability Is Protected

Common availability controls include:

- Backups.
- Redundancy.
- Failover systems.
- Disaster recovery planning.
- Patching.
- DDoS protection.
- Capacity planning.
- Monitoring.
- Incident response procedures.
- Secure system administration.

Availability is supported by both technology and process. A backup is only useful if it can be restored. A failover system is only useful if it has been tested.

### Where Availability Applies

Availability applies to:

- Servers.
- Cloud services.
- Networks.
- Authentication systems.
- DNS.
- Firewalls.
- VPNs.
- Databases.
- Security tools.
- Business applications.

## 2. Risk

### Risk

Risk is the possibility that a threat will exploit a vulnerability and cause harm to an asset or business process.

A simple way to think about risk is:

| Element | Meaning |
|---|---|
| Asset | Something valuable that must be protected. |
| Threat | Something that could cause harm. |
| Vulnerability | A weakness that could be exploited. |
| Impact | The damage that could occur. |
| Likelihood | The chance that the event may happen. |

Security teams often express risk conceptually as:

`Risk = Threat x Vulnerability x Impact`

This is not always a mathematical formula. It is a thinking model that helps professionals evaluate what could go wrong, how likely it is, and how serious the outcome would be.

Organizations cannot protect everything equally. Time, staff, money, and tools are limited. Risk helps security teams prioritize.

A vulnerability on an isolated test machine may be less urgent than the same vulnerability on an internet-facing payroll server. A weak password on a disabled account may be less serious than a weak password on a domain administrator account.

Risk connects cybersecurity decisions to business reality.

### How Risk Is Managed

Risk management usually includes:

1. Identifying assets.
2. Identifying threats.
3. Identifying vulnerabilities.
4. Estimating likelihood.
5. Estimating impact.
6. Selecting security controls.
7. Monitoring whether risk changes over time.

Common risk treatment options include:

| Treatment | Meaning | Example |
|---|---|---|
| Avoid | Stop the risky activity. | Disable an unused public service. |
| Mitigate | Reduce likelihood or impact. | Patch a vulnerable server. |
| Transfer | Shift part of the risk. | Buy cyber insurance or use a managed provider. |
| Accept | Acknowledge the risk and continue. | Accept a low-risk internal finding temporarily. |

### Where Risk Appears in Security Work

Risk appears in:

- Vulnerability management.
- Cloud security reviews.
- Incident response.
- Firewall rule approvals.
- Access reviews.
- Vendor assessments.
- Security architecture.
- Audit and compliance.
- Executive reporting.

### Enterprise Example

A small accounting firm stores client tax documents in a cloud file-sharing platform. The asset is client financial data. A threat is account takeover through phishing. A vulnerability is lack of multifactor authentication. The impact could include data theft, legal liability, and loss of client trust. The risk can be mitigated by enabling MFA, reviewing sharing permissions, monitoring suspicious logins, and training staff.

## 3. Threats

### Threats

A threat is anything that can cause harm to an asset, system, network, user, or organization.

Threats are not always attackers. A threat can be a cybercriminal, a malicious insider, a careless employee, a power outage, a failed update, a natural disaster, or a misconfigured cloud service.

Security teams must understand threats so they can prepare realistic defenses. Without threat awareness, an organization may spend money on controls that do not address the most likely or most damaging events.

### How Threats Are Categorized

| Threat Category | Description | Example |
|---|---|---|
| External human threat | A person or group outside the organization. | Cybercriminals stealing credentials. |
| Internal human threat | A person inside the organization. | Employee copying customer data. |
| Technical threat | Failure or misuse of technology. | Server crash or insecure software update. |
| Environmental threat | Physical or natural event. | Flood, fire, power outage. |
| Process threat | Weakness in procedure. | No approval process for firewall changes. |

### Where Threats Appear

Threats appear across:

- Email.
- Web applications.
- Endpoints.
- Cloud accounts.
- Remote access systems.
- Wireless networks.
- Third-party vendors.
- Physical facilities.
- Identity systems.

### Enterprise Example

A financial institution faces threats from phishing, credential stuffing, ransomware, insider fraud, DDoS attacks, and third-party compromise. A security team must understand these threats so it can design controls such as MFA, transaction monitoring, endpoint protection, SIEM correlation, DDoS protection, and privileged access monitoring.

## 4. Vulnerabilities

### Vulnerabilities

A vulnerability is a weakness that can be exploited by a threat.

Vulnerabilities can exist in software, hardware, configurations, processes, people, or physical environments.

Examples include:

- Unpatched software.
- Weak passwords.
- Open network ports.
- Misconfigured cloud storage.
- Excessive user privileges.
- Missing backups.
- Poor logging.
- Default credentials.
- Insecure firewall rules.
- Lack of security awareness.

Threats become more dangerous when vulnerabilities are present. A phishing email is more likely to succeed if users are not trained, MFA is not enabled, and suspicious login alerts are not monitored.

Security teams reduce risk by finding and fixing vulnerabilities before attackers exploit them.

### How Vulnerabilities Are Found

Common methods include:

- Vulnerability scanning with tools such as Nessus or OpenVAS.
- Network discovery with tools such as Nmap.
- Configuration reviews.
- Patch audits.
- Penetration testing.
- Cloud security posture reviews.
- Log analysis.
- User access reviews.
- Security baseline assessments.

### Where Vulnerabilities Appear

| Environment | Common Vulnerabilities |
|---|---|
| Windows endpoints | Missing patches, weak local admin controls, insecure services. |
| Linux servers | Exposed SSH, weak file permissions, outdated packages. |
| Active Directory | Excessive privileges, stale accounts, weak password policy. |
| Cloud platforms | Public storage, over-permissive IAM roles, exposed management ports. |
| Networks | Flat architecture, open ports, weak firewall rules. |
| Applications | Injection flaws, broken authentication, insecure session handling. |
| People and process | Poor training, weak change control, no incident response plan. |

### Enterprise Example

A healthcare organization runs an outdated file server that stores patient documents. The threat is ransomware. The vulnerability is unpatched software and open SMB access from too many network segments. The impact could include operational disruption and exposure of sensitive medical data. Controls may include patching, segmentation, backups, endpoint protection, and monitoring for suspicious file activity.

## 5. Security Controls

### Security Controls

A security control is a safeguard used to reduce risk.

Controls can be technical, managerial, operational, or physical. By function, they can prevent, deter, detect, correct, compensate for, or direct security activity.

Security controls turn security goals into practical action. It is not enough to say "protect customer data." An organization must implement controls that enforce access, monitor activity, protect systems, and support recovery.

### How Security Controls Are Classified

#### Security+ Control Categories

| Control Category | Meaning | Example |
|---|---|---|
| Technical control | Implemented through hardware, software, or automated technology. | MFA, firewall, encryption, EDR, SIEM alerting. |
| Managerial control | Implemented through governance, oversight, risk management, planning, policy approval, and leadership decision-making. | Risk assessment, security strategy, compliance oversight, audit planning. |
| Operational control | Implemented through people-driven procedures and day-to-day security operations. | Security awareness training, incident response procedures, change management, account review process. |
| Physical control | Protects facilities, equipment, and physical access to systems or data. | Badge readers, locks, cameras, security guards. |

CompTIA Security+ SY0-701 commonly uses these four control categories: technical, managerial, operational, and physical. Older materials and some organizations may use the term administrative control, but for this course we will follow the SY0-701 wording unless a real enterprise framework uses different terminology.

#### Control Types by Function

| Control Function | Purpose | Example |
|---|---|---|
| Preventive | Stops or reduces the chance of an event. | MFA, patching, firewall rule. |
| Deterrent | Discourages unwanted behavior. | Warning banners, visible cameras, disciplinary policy. |
| Detective | Identifies events that may have occurred. | SIEM alert, IDS, audit log. |
| Corrective | Fixes or restores after a problem. | Patch deployment, account reset. |
| Compensating | Provides an alternative when the preferred control is not possible. | Extra monitoring for a legacy server. |
| Directive | Directs or instructs people to behave in a required security manner. | Acceptable use policy, security procedures, login banners. |

Recovery controls, such as backups and disaster recovery plans, are still important in enterprise security. In Security+ discussions, recovery is often treated as part of resilience, business continuity, incident response, or corrective activity rather than one of the core control function labels listed above.

### Where Controls Are Used

Controls are used throughout the enterprise:

- Endpoint controls: Microsoft Defender, BitLocker, EDR, patch management.
- Identity controls: MFA, Conditional Access, RBAC, privileged access management.
- Network controls: firewalls, VLANs, pfSense, IDS/IPS, VPN.
- Cloud controls: IAM policies, logging, encryption, security posture management.
- Monitoring controls: Microsoft Sentinel, Wazuh, Splunk, alert rules.
- Managerial controls: policies, risk registers, compliance oversight, security planning.
- Operational controls: training, account reviews, incident response procedures, change management.
- Physical controls: locks, access badges, secure server rooms.

### Enterprise Example

A hybrid enterprise uses on-premises Active Directory and Microsoft 365. To protect administrator accounts, it implements MFA, privileged access workstations, conditional access policies, passwordless authentication for admins, PowerShell logging, Microsoft Defender for Endpoint, and SIEM alerts in Microsoft Sentinel. These controls work together to reduce the risk of account compromise.

## 6. Defense in Depth

### Defense in Depth

Defense in depth is a security strategy that uses multiple layers of controls so that if one control fails, other controls still provide protection.

The idea is simple: no single control is perfect. Passwords can be stolen. Firewalls can be misconfigured. Antivirus can miss new malware. Employees can make mistakes. Systems can fail. Layered defense reduces the chance that one weakness becomes a full compromise.

Modern environments are complex. Organizations use endpoints, servers, cloud platforms, remote workers, SaaS applications, mobile devices, APIs, third-party vendors, and identity providers. Attackers often move through several stages, from phishing to credential theft to privilege escalation to data theft.

Defense in depth makes that attack path harder.

### How Defense in Depth Works

| Layer | Example Controls |
|---|---|
| Governance | Policies, risk assessments, security standards. |
| Identity | MFA, least privilege, RBAC, privileged access management. |
| Endpoint | EDR, antivirus, disk encryption, patching. |
| Network | Firewalls, VLANs, IDS/IPS, segmentation. |
| Application | Secure coding, input validation, web application firewalls. |
| Data | Encryption, backups, data loss prevention. |
| Monitoring | SIEM, log collection, alerting, threat hunting. |
| Response | Incident response plan, containment procedures, recovery testing. |

### Where Defense in Depth Applies

Defense in depth applies everywhere security matters:

- A school network separates student Wi-Fi from administrative systems.
- A bank uses MFA, fraud monitoring, encryption, SIEM alerts, and transaction limits.
- A hospital uses endpoint protection, network segmentation, backups, access controls, and downtime procedures.
- A government agency uses identity controls, monitoring, classification rules, encryption, and audit logging.
- A cloud environment uses IAM, logging, encryption, network security groups, backup policies, and security monitoring.

### Enterprise Example

Consider ransomware protection in a corporate enterprise:

- Security awareness reduces phishing success.
- Email filtering blocks many malicious attachments.
- MFA reduces the value of stolen passwords.
- Endpoint protection detects suspicious execution.
- Application control blocks unauthorized scripts.
- Network segmentation limits lateral movement.
- Backups allow recovery.
- SIEM alerts help analysts detect early signs of compromise.
- Incident response procedures guide containment and recovery.

No single layer solves ransomware alone. Together, the layers reduce risk significantly.

## 7. Attack Surface

### Attack Surface

Attack surface is the total set of points where an attacker could try to enter, interact with, or exploit an environment.

An attack surface includes technology, people, processes, identities, vendors, and exposed services.

Attackers look for exposed and weak points. The larger and less managed the attack surface, the more opportunities attackers have.

Organizations reduce risk by understanding, monitoring, and shrinking their attack surface.

### How Attack Surface Is Identified

Security teams identify attack surface by asking:

- What systems are connected to the network?
- What services are exposed to the internet?
- Which users have privileged access?
- Which cloud storage locations are public?
- Which applications process sensitive data?
- Which vendors connect to our environment?
- Which systems are unsupported or unpatched?
- Which remote access methods are enabled?
- Which logs are collected and monitored?

Tools and methods include:

- Asset inventories.
- Nmap scans.
- Vulnerability scanners such as Nessus or OpenVAS.
- Cloud security posture reviews.
- Active Directory audits.
- Firewall rule reviews.
- External attack surface management.
- SIEM log review.

### Where Attack Surface Appears

| Attack Surface Area | Example Exposure |
|---|---|
| Internet-facing systems | VPN portal, web server, email gateway. |
| Endpoints | Laptops, desktops, mobile devices. |
| Identity | User accounts, admin accounts, service accounts. |
| Cloud | Public storage, exposed keys, permissive IAM roles. |
| Network | Open ports, flat networks, weak firewall rules. |
| Applications | Login pages, APIs, upload forms. |
| People | Phishing, weak passwords, poor reporting habits. |
| Vendors | Third-party access, unmanaged integrations. |

### Enterprise Example

A university has student portals, staff systems, public websites, research servers, computer labs, Wi-Fi networks, cloud applications, and remote access services. Its attack surface is large because many users and systems interact with the environment. Security teams reduce risk through segmentation, MFA, vulnerability scanning, account lifecycle management, monitoring, and acceptable use policies.

## 8. Connecting the Concepts

Security fundamentals are connected:

| Concept | Relationship |
|---|---|
| CIA Triad | Defines what security is trying to protect. |
| Threat | Something that could cause harm. |
| Vulnerability | A weakness that could be exploited. |
| Risk | The possibility of harm when threats exploit vulnerabilities. |
| Security Control | A safeguard that reduces risk. |
| Defense in Depth | A strategy of using multiple controls together. |
| Attack Surface | The total exposure that must be understood and managed. |

### Practical Reasoning Example

Scenario: A company exposes Remote Desktop Protocol directly to the internet.

| Question | Analysis |
|---|---|
| What is the asset? | Internal Windows server access. |
| What is the threat? | Attackers attempting brute force, credential stuffing, or exploitation. |
| What is the vulnerability? | Exposed RDP and possibly weak authentication. |
| What is the risk? | Unauthorized access, ransomware, data theft, business outage. |
| What controls help? | VPN, MFA, RDP hardening, firewall restrictions, monitoring, patching. |
| What CIA principles are affected? | Confidentiality, integrity, and availability. |
| What attack surface exists? | Internet-facing remote access service and user credentials. |

This is the kind of reasoning expected from a SOC analyst, systems administrator, and security administrator.

## 9. Standards and Framework Connections

### CompTIA Security+ Alignment

This lesson supports Security+ foundational knowledge related to:

- Security concepts.
- Threats, vulnerabilities, and mitigations.
- Security architecture.
- Security operations.
- Governance, risk, and compliance.

### NIST Cybersecurity Framework Connection

The NIST Cybersecurity Framework organizes security outcomes into major functions such as govern, identify, protect, detect, respond, and recover. Lesson 1 supports this thinking by introducing risk, assets, controls, monitoring, and recovery.

### CIS Controls Connection

The CIS Controls provide practical safeguards such as asset inventory, vulnerability management, secure configuration, access control, audit log management, email and browser protections, malware defenses, and incident response management. Lesson 1 introduces the concepts needed to understand why these safeguards exist.

### MITRE ATT&CK Connection

MITRE ATT&CK describes attacker tactics and techniques. Lesson 1 introduces threats, vulnerabilities, controls, and attack surface. Later lessons will use ATT&CK to map attacker behavior to detection and response.

## 10. Enterprise Scenarios

### Scenario 1: Small Business

A small retail business uses Microsoft 365, a cloud point-of-sale system, laptops, and a shared Wi-Fi router. The owner believes the business is too small to be targeted.

Security analysis:

- Confidentiality risk: customer records and invoices may be exposed through weak passwords.
- Integrity risk: invoices or payment records could be altered.
- Availability risk: ransomware could stop sales operations.
- Attack surface: email accounts, laptops, Wi-Fi, cloud services, payment system.
- Controls: MFA, endpoint protection, backups, secure Wi-Fi, patching, user training.

### Scenario 2: Corporate Enterprise

A corporation has thousands of endpoints, Active Directory, Microsoft 365, cloud workloads, VPN, internal applications, and a SOC.

Security analysis:

- Confidentiality risk: sensitive business data and credentials may be stolen.
- Integrity risk: attackers may change group memberships or application data.
- Availability risk: ransomware or DDoS could disrupt operations.
- Attack surface: endpoints, identity systems, remote access, cloud services, vendors.
- Controls: EDR, SIEM, segmentation, privileged access management, vulnerability scanning, incident response.

### Scenario 3: Financial Institution

A bank provides online banking, mobile banking, ATM services, and internal transaction processing.

Security analysis:

- Confidentiality risk: customer financial data may be exposed.
- Integrity risk: transaction records may be manipulated.
- Availability risk: online banking outage may affect customers and regulators.
- Attack surface: web applications, APIs, authentication systems, employees, third parties.
- Controls: encryption, MFA, fraud detection, SIEM monitoring, change control, secure software development.

### Scenario 4: Healthcare Organization

A hospital depends on electronic health records, medical devices, pharmacy systems, and scheduling applications.

Security analysis:

- Confidentiality risk: patient records may be accessed without authorization.
- Integrity risk: medication or treatment records may be altered.
- Availability risk: system downtime may affect patient care.
- Attack surface: endpoints, medical devices, remote vendors, legacy systems, wireless networks.
- Controls: segmentation, backups, access reviews, endpoint protection, downtime procedures, monitoring.

### Scenario 5: Cloud and Hybrid Infrastructure

An organization uses on-premises Active Directory, Azure, Microsoft 365, SaaS applications, and remote workers.

Security analysis:

- Confidentiality risk: cloud files may be overshared.
- Integrity risk: identity permissions may be changed by a compromised admin account.
- Availability risk: identity provider outage may block access to applications.
- Attack surface: cloud identities, public services, APIs, endpoints, remote access.
- Controls: Conditional Access, MFA, logging, Defender, Sentinel, least privilege, backup and recovery planning.

## 11. Classroom Hands-On Practical

### Practical Title

Identify Assets, Risks, Controls, and Attack Surface in a Small Organization

### Objective

Students will analyze a simple organization and identify security fundamentals using professional terminology.

### Scenario

A private training center has:

- 25 Windows laptops.
- 2 Linux servers.
- Microsoft 365 email.
- A Wi-Fi network for staff and students.
- A file share for student records.
- A website hosted in the cloud.
- One IT administrator.
- No formal security policy.
- No regular vulnerability scanning.
- Backups are performed manually once per month.

### Tasks

1. Identify at least five important assets.
2. Identify at least five threats.
3. Identify at least five vulnerabilities.
4. Describe at least five risks.
5. Recommend at least eight security controls.
6. Identify the organization's attack surface.
7. Explain which CIA Triad principle is most affected by each risk.

### Expected Student Output

Students should produce a table similar to:

| Asset | Threat | Vulnerability | Risk | CIA Impact | Recommended Control |
|---|---|---|---|---|---|
| Student records file share | Unauthorized access | Weak permissions | Exposure of student data | Confidentiality | Access review and least privilege |
| Windows laptops | Malware | Missing patch process | Ransomware infection | Availability | Patch management and Defender |
| Microsoft 365 email | Phishing | No MFA | Account takeover | Confidentiality | MFA and user training |

### Instructor Review Points

The instructor should check whether students:

- Distinguish threats from vulnerabilities.
- Link risks to business impact.
- Recommend controls that match the risk.
- Include people, process, and technology.
- Consider both technical and operational realities.

## 12. Take-Home Practical

### Assignment

Choose one organization type:

- Small business.
- Hospital.
- Bank.
- University.
- Government office.
- Cloud-based startup.

Create a one-page security fundamentals assessment that includes:

- Five critical assets.
- Five likely threats.
- Five vulnerabilities.
- Five risks.
- Ten recommended controls.
- A short explanation of the attack surface.
- A defense in depth diagram or layered list.

### Submission Format

Students may submit a written report or a table-based assessment. The report should use professional language and clearly explain how each control reduces risk.

## 13. Assessment Questions

### Multiple Choice

1. Which part of the CIA Triad is most directly affected when unauthorized users read confidential payroll data?
   A. Availability
   B. Integrity
   C. Confidentiality
   D. Redundancy

2. Which statement best describes a vulnerability?
   A. A weakness that could be exploited
   B. A person trying to attack a system
   C. The total cost of a security tool
   D. A backup copy of important data

3. Which of the following is an example of a detective control?
   A. Firewall rule blocking inbound traffic
   B. SIEM alert for suspicious login activity
   C. Locked server room door
   D. Mandatory security awareness policy

4. Why is defense in depth important?
   A. It removes the need for monitoring
   B. It guarantees attackers cannot succeed
   C. It provides multiple layers of protection when one control fails
   D. It replaces the need for backups

5. Which item is part of an organization's attack surface?
   A. Only known malware samples
   B. Only the security policy document
   C. Internet-facing services, user accounts, endpoints, and cloud resources
   D. Only systems with confirmed vulnerabilities

### Short Answer

1. Explain the difference between a threat and a vulnerability.
2. Give one example of a risk involving cloud storage.
3. Explain how MFA supports confidentiality.
4. Describe why availability is critical in healthcare.
5. List three controls that could reduce the risk of ransomware.

### Scenario-Based Questions

1. A company discovers that a former employee's account is still active and can access internal files. Identify the asset, vulnerability, threat, risk, and one recommended control.
2. A public web server is missing critical patches. Explain how this affects attack surface and risk.
3. A school uses one Wi-Fi network for students, staff, and administrative systems. Explain the security concern and recommend controls.

## 14. Glossary

| Term | Definition |
|---|---|
| Asset | Anything valuable to an organization that should be protected. |
| Attack Surface | The total set of points where an attacker could interact with or exploit an environment. |
| Availability | The security principle that systems and data should be accessible to authorized users when needed. |
| Confidentiality | The security principle that information should only be accessible to authorized users, systems, or processes. |
| Control | A safeguard used to reduce security risk. |
| Defense in Depth | A security strategy that uses multiple layers of controls. |
| Impact | The amount of harm that could result from a security event. |
| Integrity | The security principle that data and systems should remain accurate, complete, and trustworthy. |
| Likelihood | The chance that a security event may occur. |
| Risk | The possibility that a threat will exploit a vulnerability and cause harm. |
| Security Control | A safeguard that reduces risk; in Security+ SY0-701, controls are commonly categorized as technical, managerial, operational, or physical. |
| Threat | Anything that could cause harm to an asset, system, or organization. |
| Vulnerability | A weakness that could be exploited by a threat. |

## 15. Lesson Review Checklist

Students should be able to confirm:

- I can explain confidentiality, integrity, and availability using real examples.
- I can distinguish between threats, vulnerabilities, and risks.
- I can identify security controls and classify them by type and function.
- I can explain why defense in depth is necessary.
- I can describe attack surface in cloud, network, endpoint, identity, and human contexts.
- I can apply these concepts to small business and enterprise scenarios.
- I can connect security fundamentals to SOC, systems administration, vulnerability management, and incident response work.

## 16. Continuity With Future Lessons

Lesson 2 will build on this foundation by examining the modern threat landscape, including malware, threat actors, advanced persistent threats, the Cyber Kill Chain, and MITRE ATT&CK. Students should carry forward the Lesson 1 habit of asking:

- What is the asset?
- What is the threat?
- What vulnerability could be exploited?
- What is the risk?
- What controls reduce that risk?
- How does this affect confidentiality, integrity, or availability?

These questions remain useful throughout the entire course.
