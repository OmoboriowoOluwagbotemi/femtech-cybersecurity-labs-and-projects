# Lesson 2: Threat Landscape

## Lesson Overview

The threat landscape is the complete environment of cyber threats that may affect an organization. It includes malware, threat actors, sustained campaigns, and the frameworks defenders use to interpret attacker behavior.

Lesson 1 introduced assets, threats, vulnerabilities, risk, controls, defense in depth, and attack surface. This lesson builds on that foundation by examining likely attackers, their methods, and the evidence defenders can recognize before serious damage occurs.

Security professionals do not study threats to create fear. They study threats to make better decisions about prevention, detection, response, and recovery.

## Learning Objectives

By the end of this lesson, students should be able to:

- Explain the meaning of threat landscape in enterprise cybersecurity.
- Identify major malware types and describe their business impact.
- Distinguish between common threat actor categories.
- Explain the characteristics of advanced persistent threats.
- Describe the Cyber Kill Chain and apply it to incident analysis.
- Explain how MITRE ATT&CK helps defenders map attacker behavior.
- Connect threat knowledge to SOC alert triage, vulnerability management, identity security, endpoint security, and incident response.

## Prerequisite Knowledge

Students should understand Lesson 1 concepts:

- Asset.
- Threat.
- Vulnerability.
- Risk.
- Security control.
- Defense in depth.
- Attack surface.
- CIA Triad.

This lesson will reuse those terms without redefining them in full.

## Enterprise Relevance

The threat landscape affects every organization:

- A small business may face phishing, ransomware, invoice fraud, and credential theft.
- A bank may face financially motivated malware, fraud operations, DDoS attacks, and nation-state interest.
- A hospital may face ransomware, data theft, and attacks against legacy systems.
- A university may face account compromise, research theft, student data exposure, and abuse of open networks.
- A government agency may face espionage, hacktivism, insider threats, and supply chain attacks.
- A cloud-first company may face exposed keys, compromised identities, malicious OAuth applications, and misconfigured storage.

SOC analysts, security administrators, incident responders, vulnerability analysts, and system administrators all use threat landscape knowledge to decide which risks deserve priority.

## 1. Understanding the Threat Landscape

The threat landscape is the collection of threats that exist against an organization, industry, technology, region, or business process.

It includes:

- Malware.
- Threat actors.
- Attack techniques.
- Targeted industries.
- Exploited vulnerabilities.
- Social engineering methods.
- Cloud and identity attacks.
- Supply chain risks.
- Geopolitical and criminal trends.

Organizations cannot defend well if they do not understand realistic threats. A school, a bank, and a hospital may all use laptops, cloud email, and networks, but the risk priorities are not identical.

For example:

- A hospital prioritizes availability because downtime can affect patient care.
- A bank prioritizes transaction integrity and fraud prevention.
- A university must balance open access with research and student data protection.
- A government agency must consider espionage and public service availability.
- A small business often needs low-cost controls that reduce common threats quickly.

Security teams use threat knowledge to:

- Prioritize vulnerabilities based on real exploitation.
- Tune SIEM alerts.
- Improve endpoint detection.
- Train users on likely social engineering methods.
- Decide which systems require stronger monitoring.
- Plan incident response playbooks.
- Map attacker behavior to MITRE ATT&CK.
- Communicate risk to leadership.

Threat landscape knowledge appears in:

- SOC operations.
- Threat intelligence reports.
- Vulnerability management meetings.
- Incident response briefings.
- Security awareness training.
- Cloud security reviews.
- Executive risk reporting.
- Compliance and audit discussions.

## 2. Malware Types

Malware is malicious software designed to damage systems, steal data, disrupt operations, spy on users, gain unauthorized access, or help attackers maintain control.

Malware is not one single thing. It is a broad category that includes many tools and techniques.

Malware can affect all parts of the CIA Triad:

| CIA Principle | Malware Impact Example |
|---|---|
| Confidentiality | Spyware steals credentials or sensitive documents. |
| Integrity | Malware modifies files, transactions, configurations, or logs. |
| Availability | Ransomware encrypts systems and stops business operations. |

### Common Malware Types

The categories below describe common behavior, but real malware can combine several of them. For example, one campaign may use a Trojan for delivery, fileless techniques for execution, and ransomware for impact.

| Malware Type | What It Does | Enterprise Impact | Defensive Focus |
|---|---|---|---|
| Virus | Attaches to files and spreads when infected files run. | File corruption, system instability, user disruption. | Endpoint protection, patching, safe file handling. |
| Worm | Self-replicates across networks without direct user action. | Rapid spread across vulnerable systems. | Network segmentation, patching, IDS/IPS, firewall controls. |
| Trojan | Disguises itself as legitimate software. | Unauthorized access, data theft, malware installation. | Application control, user training, endpoint detection. |
| Ransomware | Encrypts or steals data and demands payment. | Business outage, data exposure, financial loss. | Backups, EDR, least privilege, segmentation, response planning. |
| Spyware | Secretly monitors users or systems. | Credential theft, privacy breach, intelligence gathering. | Endpoint monitoring, browser security, access review. |
| Keylogger | Captures keystrokes. | Password theft, fraud, account takeover. | MFA, endpoint protection, privileged access controls. |
| Rootkit | Hides attacker activity and provides stealthy control. | Difficult detection, persistent compromise. | Secure boot, EDR, integrity monitoring, forensic analysis. |
| Botnet malware | Enrolls systems into attacker-controlled networks. | DDoS participation, spam, proxy abuse, internal compromise. | Network monitoring, egress filtering, endpoint cleanup. |
| Logic bomb | Executes malicious action when a condition is met. | Delayed sabotage or data destruction. | Change control, code review, monitoring. |
| Fileless malware | Uses legitimate system tools and memory instead of obvious files. | Harder detection, abuse of PowerShell or scripting tools. | Script logging, behavioral detection, least privilege. |
| Cryptominer | Uses systems to mine cryptocurrency without authorization. | Resource exhaustion, cloud cost increase, performance loss. | Cloud monitoring, endpoint alerts, process analysis. |
| Wiper | Destroys or corrupts data to disrupt operations. | Severe availability and integrity loss. | Backups, segmentation, incident response, destructive activity alerts. |

Malware often enters through:

- Phishing emails.
- Malicious attachments.
- Drive-by downloads.
- Compromised websites.
- Exposed remote services.
- Exploited software vulnerabilities.
- Infected USB devices.
- Supply chain compromise.
- Stolen credentials.
- Malicious scripts.

Malware may be detected through:

- Microsoft Defender alerts.
- EDR telemetry.
- Windows Event Logs.
- Linux logs.
- Wazuh alerts.
- Splunk or Microsoft Sentinel correlation rules.
- Network IDS alerts from Snort or Suricata.
- DNS logs.
- Proxy logs.
- Firewall logs.
- File integrity monitoring.

### Enterprise Example: Ransomware in Healthcare

A hospital user opens a malicious attachment. The attachment launches malware that attempts to contact a command-and-control server, steal credentials, and spread to file shares. The major risk is not only data theft. It is also downtime for patient care systems.

Defensive response should include:

- Isolate the affected endpoint.
- Disable compromised accounts.
- Review EDR and SIEM alerts.
- Check file server access logs.
- Preserve evidence.
- Validate backups.
- Identify the initial access method.
- Communicate clearly with clinical operations.

## 3. Threat Actors

A threat actor is a person, group, or organization that can cause harm through cyber activity.

Threat actors differ by motivation, capability, resources, targeting, patience, and risk tolerance.

Understanding the likely actor helps defenders estimate:

- Why the attack is happening.
- What the attacker may do next.
- Which assets may be targeted.
- How persistent the attacker may be.
- Which controls and response actions are appropriate.

Actor identification should be careful. Early in an incident, defenders may not know who is behind the activity. Analysts should avoid unsupported conclusions and focus first on observable behavior.

### Common Threat Actor Categories

Actor categories help analysts form initial hypotheses about motivation and capability. They should not be treated as attribution unless reliable evidence supports the conclusion.

| Threat Actor | Motivation | Typical Targets | Example Activity |
|---|---|---|---|
| Cybercriminals | Financial gain. | Businesses, individuals, banks, healthcare, cloud accounts. | Ransomware, fraud, credential theft. |
| Nation-state actors | Espionage, disruption, strategic advantage. | Government, defense, critical infrastructure, research, technology. | Long-term intrusion, data theft, supply chain compromise. |
| Hacktivists | Political, social, or ideological goals. | Governments, corporations, public-facing services. | Website defacement, data leaks, DDoS. |
| Insiders | Financial gain, revenge, negligence, pressure, or convenience. | Current or former employer systems. | Data theft, privilege misuse, accidental exposure. |
| Competitors | Business advantage. | Intellectual property, pricing, strategy, customers. | Corporate espionage or unethical intelligence gathering. |
| Script kiddies | Curiosity, status, disruption. | Exposed systems and easy targets. | Use of public tools without deep expertise. |
| Terrorist or extremist groups | Ideological disruption or fear. | Public services, critical infrastructure, symbolic targets. | Disruption, propaganda, destructive attacks. |
| Organized crime groups | Profit at scale. | Financial systems, healthcare, retail, managed service providers. | Ransomware-as-a-service, fraud networks. |

Threat actors may choose targets based on:

- Financial value.
- Sensitive data.
- Weak security controls.
- Public exposure.
- Political value.
- Supply chain access.
- Industry importance.
- Ease of exploitation.

Threat actor analysis appears in:

- Threat intelligence.
- SOC alert enrichment.
- Incident reports.
- Executive briefings.
- Risk assessments.
- Security awareness programs.
- Vulnerability prioritization.

### Enterprise Example: Small Business Credential Theft

A small business receives a fake Microsoft 365 login email. An employee enters credentials into a phishing page. The attacker logs in, creates mailbox forwarding rules, and sends fraudulent invoices to customers.

The likely actor may be financially motivated cybercriminals rather than an APT. The practical controls include MFA, mailbox rule monitoring, user training, conditional access, and alerting for unusual sign-ins.

## 4. Advanced Persistent Threats

An advanced persistent threat is a highly capable and patient threat actor or campaign that uses sustained, targeted activity to gain and maintain access to an environment.

The word "advanced" does not mean every technique is technically complex. APTs often combine advanced methods with simple methods that work, such as phishing, credential theft, and abuse of legitimate administration tools.

APTs matter because they may:

- Target high-value organizations.
- Stay hidden for long periods.
- Use stealth and deception.
- Move laterally across networks.
- Steal sensitive data.
- Target identity systems.
- Abuse trusted vendors.
- Adapt when defenders block one technique.

APT operations often include:

- Researching targets.
- Gaining initial access.
- Establishing persistence.
- Escalating privileges.
- Avoiding detection.
- Moving laterally.
- Collecting data.
- Exfiltrating data.
- Maintaining access.

APT risk is especially relevant to:

- Government agencies.
- Defense contractors.
- Financial institutions.
- Energy and critical infrastructure.
- Healthcare research.
- Universities with sensitive research.
- Cloud service providers.
- Managed service providers.
- Technology companies.

### Enterprise Example: University Research Theft

A university conducts funded research in biotechnology. Attackers compromise a faculty member's email account, use it to access cloud files, then attempt to access research servers through VPN. The goal may be intellectual property theft.

Defensive priorities include:

- MFA enforcement.
- Conditional access.
- VPN monitoring.
- Least privilege.
- Logging of cloud file access.
- Detection of impossible travel and unusual downloads.
- Incident response with legal and research leadership involvement.

## 5. Cyber Kill Chain

The Cyber Kill Chain is a model that describes common stages of an intrusion. It helps defenders understand how an attack progresses and where security controls can interrupt it.

The commonly taught stages are:

| Stage | Meaning | Defender Question |
|---|---|---|
| Reconnaissance | The attacker researches the target. | What public information or exposed services can attackers see? |
| Weaponization | The attacker prepares the attack method. | What malware, exploit, or lure may be prepared? |
| Delivery | The attacker delivers the malicious payload or access method. | How did the attack reach the victim? |
| Exploitation | The attacker triggers code execution or abuses a weakness. | Which vulnerability or user action enabled the attack? |
| Installation | The attacker installs malware or persistence. | What changed on the endpoint or system? |
| Command and Control | The compromised system communicates with attacker infrastructure. | What network traffic indicates external control? |
| Actions on Objectives | The attacker performs the final goal. | Was data stolen, encrypted, altered, or disrupted? |

The Cyber Kill Chain helps defenders:

- Break an attack into understandable stages.
- Identify where controls failed.
- Improve detection.
- Build incident timelines.
- Explain attacks to leadership.
- Create response playbooks.

| Kill Chain Stage | Example Controls |
|---|---|
| Reconnaissance | Attack surface management, limited public exposure, secure DNS and WHOIS practices. |
| Weaponization | Threat intelligence, vulnerability management, secure configuration. |
| Delivery | Email filtering, web filtering, user awareness, attachment sandboxing. |
| Exploitation | Patching, application control, exploit protection, least privilege. |
| Installation | EDR, application allowlisting, file integrity monitoring. |
| Command and Control | DNS monitoring, proxy logs, firewall egress filtering, IDS/IPS. |
| Actions on Objectives | DLP, backups, segmentation, privileged access controls, incident response. |

The Cyber Kill Chain is used in:

- SOC analysis.
- Incident reports.
- Tabletop exercises.
- Threat hunting.
- Security architecture reviews.
- Executive communication.

### Enterprise Example: Bank Phishing Attack

A bank employee receives a phishing email that appears to come from a vendor. The user opens an attachment. Malware runs, contacts command-and-control infrastructure, and attempts to access internal file shares.

Kill Chain analysis:

| Stage | Observed Evidence |
|---|---|
| Reconnaissance | Vendor relationship likely identified through public or previous compromise. |
| Weaponization | Malicious document prepared. |
| Delivery | Phishing email delivered to employee. |
| Exploitation | User opened document and enabled malicious action. |
| Installation | Suspicious process created on endpoint. |
| Command and Control | Endpoint made unusual outbound DNS and HTTPS requests. |
| Actions on Objectives | Attempted file share discovery and data collection. |

## 6. MITRE ATT&CK Framework

MITRE ATT&CK is a knowledge base of adversary tactics, techniques, and procedures based on observed real-world activity. It helps defenders describe what attackers are trying to accomplish and how they attempt to do it.

ATT&CK does not replace the Cyber Kill Chain. The Kill Chain gives a high-level sequence. ATT&CK provides detailed behavior categories and techniques that defenders can map to evidence.

MITRE ATT&CK helps security teams:

- Map alerts to attacker behavior.
- Identify detection gaps.
- Build detection rules.
- Improve threat hunting.
- Standardize incident reporting.
- Communicate with other security teams.
- Compare defensive coverage across tactics and techniques.

ATT&CK uses:

- Tactics: the attacker's tactical goal.
- Techniques: how the attacker achieves that goal.
- Sub-techniques: more specific technique variations.
- Procedures: real-world ways attackers have used techniques.

As of the current Enterprise ATT&CK structure, MITRE lists 15 Enterprise tactics:

| ATT&CK Tactic | Meaning |
|---|---|
| Reconnaissance | The attacker gathers information for planning. |
| Resource Development | The attacker prepares infrastructure, accounts, or capabilities. |
| Initial Access | The attacker attempts to enter the environment. |
| Execution | The attacker runs malicious code or commands. |
| Persistence | The attacker maintains access. |
| Privilege Escalation | The attacker gains higher permissions. |
| Credential Access | The attacker steals or abuses credentials. |
| Discovery | The attacker learns about the environment. |
| Lateral Movement | The attacker moves between systems. |
| Collection | The attacker gathers target data. |
| Command and Control | The attacker communicates with compromised systems. |
| Exfiltration | The attacker removes data from the environment. |
| Impact | The attacker disrupts, destroys, or manipulates systems or data. |
| Stealth | The attacker attempts to hide activity before, during, or after operations. |
| Defense Impairment | The attacker weakens or disables defensive capabilities. |

ATT&CK is used in:

- Detection engineering.
- SIEM rule design.
- SOC alert triage.
- Threat hunting.
- Incident reporting.
- Purple team exercises.
- Security control gap analysis.
- Executive risk summaries.

### Example ATT&CK Mapping

Scenario: A Windows endpoint runs suspicious PowerShell, contacts an unusual external IP address, and attempts to dump credentials.

| Evidence | Possible ATT&CK Tactic | Defensive Action |
|---|---|---|
| Suspicious PowerShell command | Execution | Review script block logs and EDR telemetry. |
| Credential dumping behavior | Credential Access | Isolate host, reset credentials, check privileged accounts. |
| External beaconing | Command and Control | Review DNS, proxy, firewall, and SIEM logs. |
| Attempts to disable security tools | Defense Impairment or Stealth | Confirm Microsoft Defender status and tamper protection. |

ATT&CK mapping should be evidence-based. Analysts should not force a technique label if the logs do not support it.

## 7. Comparing the Cyber Kill Chain and MITRE ATT&CK

The two models describe attacks at different levels of detail. The Cyber Kill Chain provides a simple progression that is useful for communicating an incident story, while ATT&CK provides a richer vocabulary for behaviors, detections, and coverage analysis.

| Feature | Cyber Kill Chain | MITRE ATT&CK |
|---|---|---|
| Main purpose | Shows high-level attack progression. | Describes detailed attacker behaviors. |
| Best use | Incident timeline and attack interruption. | Detection mapping, threat hunting, gap analysis. |
| Structure | Sequential stages. | Tactics, techniques, sub-techniques, procedures. |
| Strength | Easy to explain to students and leadership. | Detailed and practical for SOC operations. |
| Limitation | Some modern attacks do not follow a neat sequence. | Can be large and complex for beginners. |

Both models are useful. A professional analyst can use the Cyber Kill Chain to explain the story of an attack and ATT&CK to describe the specific behaviors observed.

## 8. Threat Landscape and Enterprise Security Operations

### SOC Analyst Perspective

A SOC analyst uses threat landscape knowledge to decide whether an alert is routine or serious.

Example:

- Alert: Multiple failed Microsoft 365 logins from foreign locations.
- Threat concern: Credential stuffing or password spraying.
- Risk: Account takeover.
- Relevant controls: MFA, conditional access, alerting, account lockout, user notification.

### Vulnerability Management Perspective

A vulnerability analyst uses threat landscape knowledge to prioritize real-world risk.

Example:

- A critical vulnerability on an internet-facing VPN appliance may be more urgent than a medium vulnerability on an isolated lab host.
- Exploitation in the wild increases priority.
- Asset criticality and exposure affect risk ranking.

### Systems Administration Perspective

A systems administrator uses threat knowledge to harden systems.

Example:

- Disable unnecessary services.
- Patch operating systems.
- Restrict PowerShell where appropriate.
- Enforce least privilege.
- Enable logging.
- Protect backups.

### Incident Response Perspective

An incident responder uses threat models to decide containment and investigation steps.

Example:

- Ransomware evidence requires immediate containment, backup validation, identity review, and lateral movement analysis.
- A suspected APT requires careful evidence preservation, broad log review, and leadership communication.

## 9. Enterprise Scenarios

### Scenario 1: Small Business Business Email Compromise

A small business owner receives an email that appears to come from a supplier. The email requests a change in payment details. An employee updates the payment information without verification.

Analysis:

- Threat actor: Financially motivated cybercriminal.
- Technique: Social engineering and payment fraud.
- Risk: Financial loss and supplier relationship damage.
- Controls: Payment verification process, security awareness training, MFA, mailbox monitoring.
- CIA impact: Integrity of payment records and confidentiality of email accounts.

### Scenario 2: Hospital Ransomware

A hospital workstation is infected after a user opens a malicious attachment. File shares begin showing encrypted files.

Analysis:

- Threat actor: Criminal ransomware group.
- Malware type: Ransomware.
- Risk: Clinical downtime, patient safety impact, data exposure.
- Controls: EDR, segmentation, backups, phishing defense, incident response plan.
- Priority: Containment and availability restoration.

### Scenario 3: Government Espionage

A government agency detects unusual authentication activity followed by large downloads from a sensitive document repository.

Analysis:

- Threat actor: Possible nation-state or espionage-motivated actor.
- Risk: Confidentiality loss and national or public interest harm.
- Controls: MFA, privileged access management, SIEM monitoring, data access alerts, threat hunting.
- Framework use: ATT&CK mapping for credential access, discovery, collection, and exfiltration.

### Scenario 4: Cloud Startup Exposed Credentials

A developer accidentally commits an API key to a public code repository. Unknown users begin using the key to create cloud resources.

Analysis:

- Threat actor: Opportunistic cloud abusers or cybercriminals.
- Risk: Cloud cost increase, data exposure, unauthorized resource creation.
- Controls: Secret scanning, key rotation, least privilege IAM, cloud logging, budget alerts.
- CIA impact: Confidentiality and integrity of cloud resources, availability through resource exhaustion.

## 10. Classroom Hands-On Practical

### Practical Title

Map a Security Incident to the Cyber Kill Chain and MITRE ATT&CK

### Objective

Students will analyze a safe written scenario and map observed evidence to attack stages and tactics.

### Scenario

A company reports the following events:

- An employee received an email with an attachment named `Updated_Invoice.xlsm`.
- The employee opened the attachment.
- Microsoft Defender generated an alert for suspicious PowerShell activity.
- The endpoint contacted a newly registered external domain.
- Several failed login attempts occurred against an internal file server.
- A large number of files were compressed into an archive.
- The endpoint attempted to upload data to an external IP address.

### Tasks

1. Identify the likely malware or attack type.
2. Map each event to a Cyber Kill Chain stage.
3. Map each event to a likely MITRE ATT&CK tactic.
4. Identify at least five defensive controls that could reduce risk.
5. Recommend immediate incident response actions.

### Expected Student Output

| Evidence | Kill Chain Stage | ATT&CK Tactic | Defensive Note |
|---|---|---|---|
| Phishing email with attachment | Delivery | Initial Access | Email filtering and awareness training. |
| Suspicious PowerShell | Exploitation or Installation | Execution | Review PowerShell logs and EDR telemetry. |
| External domain contact | Command and Control | Command and Control | Review DNS and proxy logs. |
| Failed file server logins | Actions on Objectives | Credential Access or Lateral Movement | Investigate account use and failed logins. |
| File archive creation | Actions on Objectives | Collection | Check file access logs. |
| External upload attempt | Actions on Objectives | Exfiltration | Block traffic and preserve evidence. |

### Instructor Review Points

Check whether students:

- Avoid unsupported actor attribution.
- Use evidence to support mappings.
- Connect malware behavior to business risk.
- Recommend containment before deep cleanup.
- Consider identity, endpoint, network, and cloud logs.

## 11. Take-Home Practical

### Assignment

Choose one sector:

- Small business.
- Financial institution.
- Healthcare organization.
- Educational institution.
- Government agency.
- Cloud-first company.

Create a two-page threat landscape profile for that sector.

Include:

- Five likely threat actor categories.
- Five likely malware or attack types.
- Three high-value assets.
- Three likely attack surface areas.
- One Cyber Kill Chain example.
- One MITRE ATT&CK mapping table.
- Five recommended defensive controls.

### Submission Standard

The report must use professional language and avoid unsupported claims. Students should explain why each threat is relevant to the chosen sector.

## 12. Assessment Questions

### Multiple Choice

1. Which malware type is most directly associated with encrypting files and demanding payment?
   A. Worm
   B. Ransomware
   C. Keylogger
   D. Logic bomb

2. Which threat actor category is most commonly associated with espionage and long-term strategic objectives?
   A. Script kiddies
   B. Nation-state actors
   C. Random insiders only
   D. Untrained users

3. What is the main purpose of the Cyber Kill Chain?
   A. To assign legal blame during an incident
   B. To describe high-level stages of an intrusion
   C. To replace endpoint protection
   D. To calculate patch scores

4. In MITRE ATT&CK, what does a tactic represent?
   A. The attacker's technical tool name
   B. The attacker's tactical objective
   C. The victim's company size
   D. The cost of the incident

5. Which statement is best practice during early incident analysis?
   A. Immediately attribute the attack to a nation-state
   B. Ignore logs if malware is detected
   C. Base conclusions on observable evidence
   D. Delete all affected files before investigation

6. Which malware type records user keystrokes?
   A. Keylogger
   B. Wiper
   C. Logic bomb
   D. Adware only

7. Which actor is most likely to abuse legitimate access from inside an organization?
   A. Insider threat
   B. Script kiddie
   C. Natural disaster
   D. Search engine crawler

8. In the Cyber Kill Chain, which stage commonly involves delivering a malicious attachment or link?
   A. Delivery
   B. Recovery
   C. Retirement
   D. Procurement

9. In MITRE ATT&CK, what does a technique describe?
   A. The method an adversary uses to achieve a tactical goal
   B. The organization's annual budget
   C. The color of a dashboard
   D. The number of employees in a department

10. Which control is most useful for reducing ransomware impact?
    A. Tested backups and recovery procedures
    B. Publicly posting administrator passwords
    C. Disabling all logs
    D. Ignoring endpoint alerts

### Short Answer

1. Explain the difference between malware type and threat actor.
2. Give one example of how ransomware affects availability.
3. Why should analysts avoid unsupported attribution?
4. How can ATT&CK help a SOC improve detection coverage?
5. List three logs that may help investigate command-and-control activity.

### Scenario-Based Questions

1. A cloud administrator finds that an exposed API key was used to create unauthorized compute resources. Identify the likely threat, risk, and controls.
2. A workstation alerts for suspicious PowerShell followed by outbound connections to an unknown domain. Map the activity to likely Kill Chain stages.
3. A university detects unusual downloads from a research file share. Describe possible threat actors and immediate response steps.

## 13. Glossary

| Term | Definition |
|---|---|
| Advanced Persistent Threat | A capable and persistent actor or campaign that conducts targeted long-term cyber operations. |
| Botnet | A group of compromised systems controlled by an attacker. |
| Command and Control | Communication between compromised systems and attacker-controlled infrastructure. |
| Cyber Kill Chain | A model describing common stages of an intrusion from reconnaissance to attacker objectives. |
| Fileless Malware | Malware activity that relies heavily on memory, scripts, or legitimate tools rather than obvious malicious files. |
| Hacktivist | A threat actor motivated by political, social, or ideological goals. |
| Keylogger | Malware or monitoring software that captures keystrokes. |
| Malware | Malicious software designed to harm systems, steal data, disrupt operations, or support unauthorized access. |
| MITRE ATT&CK | A knowledge base of adversary tactics, techniques, and procedures based on observed cyber activity. |
| Nation-State Actor | A threat actor linked to or operating in support of a government objective. |
| Ransomware | Malware that encrypts or steals data and demands payment. |
| Rootkit | Malware designed to hide attacker activity and maintain privileged control. |
| Tactic | In ATT&CK, the attacker's tactical goal. |
| Technique | In ATT&CK, the method used to achieve a tactic. |
| Threat Actor | A person, group, or organization capable of causing cyber harm. |
| Threat Landscape | The collection of threats that may affect an organization, industry, technology, or environment. |
| Trojan | Malware disguised as legitimate or desirable software. |
| Wiper | Malware designed to destroy or corrupt data or systems. |
| Worm | Malware that self-replicates across systems or networks. |

## 14. Lesson Review Checklist

Students should be able to confirm:

- I can explain what the threat landscape means.
- I can identify common malware types and their enterprise impact.
- I can distinguish threat actors by motivation and capability.
- I can explain why APTs are persistent and difficult to remove.
- I can map a basic incident to the Cyber Kill Chain.
- I can explain the purpose of MITRE ATT&CK.
- I can use evidence-based reasoning when analyzing threat activity.
- I can connect threat knowledge to risk, controls, and attack surface from Lesson 1.

## 15. Continuity With Future Lessons

Lesson 3 will shift from threats to people by exploring the security profession, cybersecurity roles, career paths, certifications, and continuous learning. The threat landscape from this lesson will help students understand why different security roles exist.

Later lessons will return to this material:

- Lesson 7 will expand social engineering and phishing.
- Lesson 8 will expand network and system attacks.
- Lesson 9 will expand web attacks and malware.
- Lesson 30 will connect threat behavior to SIEM detection.
- Lesson 32 will use ATT&CK for detection engineering.
- Lesson 33 will use the Kill Chain and ATT&CK during incident response.

## References for Instructor Alignment

- MITRE ATT&CK Enterprise Tactics: https://attack.mitre.org/tactics/enterprise/
- Lockheed Martin Cyber Kill Chain: https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html
- CompTIA Security+ SY0-701 objectives should be used as the terminology baseline for exam alignment.
