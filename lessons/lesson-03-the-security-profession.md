# Lesson 3: The Security Profession

## Lesson Overview

Cybersecurity is not one job. It is a profession made of many roles that work together to protect organizations, investigate threats, reduce risk, and support business operations.

Lesson 1 introduced the language of security: assets, threats, vulnerabilities, risk, controls, defense in depth, attack surface, and the CIA Triad. Lesson 2 introduced the threat landscape: malware, threat actors, advanced persistent threats, the Cyber Kill Chain, and MITRE ATT&CK. Lesson 3 explains where people fit into that picture.

Students should leave this lesson understanding what cybersecurity professionals actually do, how career paths develop, which certifications support different paths, and how to build a habit of continuous learning.

## Learning Objectives

By the end of this lesson, students should be able to:

- Describe common cybersecurity roles and their responsibilities.
- Explain how cybersecurity roles support enterprise risk reduction.
- Distinguish between technical, operational, managerial, and governance-oriented security work.
- Identify realistic entry-level and intermediate cybersecurity career paths.
- Explain the purpose and audience of Security+, CySA+, CEH, OSCP, and CISSP.
- Build a beginner-friendly certification roadmap.
- Describe continuous learning strategies for long-term professional growth.
- Connect role responsibilities to SOC operations, vulnerability management, IAM, endpoint security, incident response, and cloud security.

## Prerequisite Knowledge

Students should understand:

- The CIA Triad from Lesson 1.
- Risk, threats, vulnerabilities, and controls from Lesson 1.
- Malware, threat actors, and common attack stages from Lesson 2.
- The difference between prevention, detection, response, and recovery.

No prior work experience in cybersecurity is required.

## Enterprise Relevance

In real organizations, cybersecurity is delivered by teams. A firewall rule, SIEM alert, vulnerability scan, identity policy, or incident report is usually connected to several roles.

For example:

- A SOC analyst detects suspicious PowerShell activity.
- A systems administrator isolates the affected workstation.
- An incident responder coordinates containment.
- A vulnerability analyst checks whether the attack used an unpatched weakness.
- An identity administrator resets credentials and reviews account access.
- A security manager briefs leadership on business impact.

Professional cybersecurity requires both technical skill and operational discipline.

## 1. The Cybersecurity Profession

The cybersecurity profession is the field responsible for protecting systems, networks, applications, data, identities, and business operations from security risks.

Cybersecurity professionals work across:

- Prevention.
- Detection.
- Response.
- Recovery.
- Governance.
- Risk management.
- Compliance.
- Architecture.
- Awareness and training.

Organizations depend on technology for nearly every business function. If technology is compromised, the organization can lose money, data, trust, legal standing, and operational capability.

Cybersecurity professionals help organizations:

- Protect sensitive data.
- Keep services available.
- Detect attacks early.
- Respond to incidents.
- Reduce vulnerability exposure.
- Meet legal and regulatory obligations.
- Support safe business growth.

Security professionals use:

- Policies and procedures.
- Security tools.
- Risk assessments.
- Logs and alerts.
- Vulnerability scans.
- Access reviews.
- Incident response playbooks.
- Threat intelligence.
- Security awareness programs.
- Technical hardening standards.

Cybersecurity work appears in:

- Small businesses.
- Corporate enterprises.
- Banks.
- Hospitals.
- Schools and universities.
- Government agencies.
- Cloud environments.
- Hybrid infrastructures.
- Managed service providers.
- Software companies.

## 2. Cybersecurity Role Families

Cybersecurity roles can be grouped into broad families. A single organization may use different job titles, but the responsibilities are often similar.

| Role Family | Main Focus | Example Job Titles |
|---|---|---|
| Security operations | Monitoring, alert triage, detection, escalation. | SOC Analyst, Security Analyst, Detection Analyst. |
| Incident response | Investigating and containing incidents. | Incident Responder, Cyber Incident Analyst. |
| Vulnerability management | Finding, ranking, and tracking weaknesses. | Vulnerability Analyst, VM Analyst, Security Engineer. |
| Security administration | Operating security tools and controls. | Security Administrator, Endpoint Security Admin. |
| Identity and access management | Managing user access and privileges. | IAM Analyst, Active Directory Administrator, PAM Analyst. |
| Network security | Protecting networks, firewalls, VPNs, segmentation. | Network Security Engineer, Firewall Administrator. |
| Cloud security | Securing cloud platforms and SaaS services. | Cloud Security Analyst, Azure Security Engineer. |
| Governance, risk, and compliance | Policies, audits, risk, standards, compliance. | GRC Analyst, Risk Analyst, Compliance Analyst. |
| Security architecture | Designing secure systems and enterprise controls. | Security Architect, Cloud Security Architect. |
| Penetration testing | Authorized testing of security weaknesses. | Penetration Tester, Red Team Operator. |
| Digital forensics | Evidence collection and forensic analysis. | Digital Forensics Analyst, Forensic Investigator. |
| Security leadership | Strategy, budgets, teams, and business risk. | Security Manager, CISO. |

## 3. SOC Analyst

A SOC Analyst monitors security alerts, investigates suspicious activity, and escalates confirmed incidents.

Organizations generate large volumes of logs from endpoints, servers, identity systems, cloud platforms, firewalls, and applications. SOC analysts help separate normal activity from potential threats.

SOC analysts commonly use:

- SIEM platforms such as Microsoft Sentinel, Splunk, or Wazuh.
- Endpoint tools such as Microsoft Defender.
- Ticketing systems.
- Threat intelligence sources.
- Log queries.
- Alert triage procedures.
- MITRE ATT&CK mapping.

SOC analysts work in:

- Enterprise security teams.
- Managed security service providers.
- Banks.
- Telecom companies.
- Healthcare organizations.
- Government security operations centers.
- Cloud-focused companies.

### Example Responsibilities

- Review alerts for suspicious login attempts.
- Investigate malware detections.
- Analyze endpoint and network logs.
- Escalate confirmed incidents.
- Document findings in tickets.
- Recommend alert tuning.
- Support incident response.

### Enterprise Scenario

A Microsoft Sentinel alert shows impossible travel for a Microsoft 365 user followed by mailbox rule creation. The SOC analyst reviews sign-in logs, checks the user's location history, verifies whether MFA was satisfied, investigates mailbox rules, and escalates the case as possible business email compromise.

## 4. Cybersecurity Analyst

A cybersecurity analyst is a broad role that may include monitoring, risk analysis, vulnerability review, control validation, reporting, and security improvement.

Many organizations need professionals who can connect technical evidence to business risk.

Cybersecurity analysts may:

- Review alerts.
- Analyze vulnerabilities.
- Write security reports.
- Support audits.
- Investigate suspicious activity.
- Review security controls.
- Track remediation.
- Communicate risk to IT teams and managers.

This role appears in small businesses, enterprises, financial institutions, education, healthcare, cloud companies, and government agencies.

### Enterprise Scenario

A vulnerability scan shows critical findings on an internet-facing VPN server. The cybersecurity analyst verifies the asset owner, checks whether exploitation is reported in the wild, evaluates business impact, and recommends immediate patching with temporary access restrictions.

## 5. Security Administrator

A security administrator configures, operates, and maintains security controls.

Security tools only reduce risk when they are properly configured, monitored, updated, and maintained.

Security administrators may manage:

- Microsoft Defender policies.
- Antivirus and EDR settings.
- Firewall rules.
- VPN access.
- Email security controls.
- SIEM log source configuration.
- Disk encryption.
- Security baselines.
- Privileged access policies.

Security administrators are common in organizations with internal IT teams, managed service providers, hospitals, banks, schools, and government agencies.

### Enterprise Scenario

A company deploys Microsoft Defender for Endpoint. The security administrator configures tamper protection, attack surface reduction rules, alert forwarding to Sentinel, and exclusions only where justified by business need.

## 6. Systems Administrator With Security Responsibilities

A systems administrator manages servers, endpoints, operating systems, directories, updates, and core IT services. In many organizations, systems administrators perform important security work.

Many security failures begin as system administration weaknesses: missing patches, excessive privileges, weak logging, insecure services, or poor backup practices.

Systems administrators support security by:

- Patching Windows and Linux systems.
- Managing Active Directory.
- Configuring Windows Event Logs.
- Hardening SSH.
- Reviewing services and processes.
- Managing backups.
- Enforcing secure configurations.
- Using PowerShell and Bash responsibly.

Systems administrators work in almost every organization, especially small and medium businesses where security duties may be shared with IT operations.

### Enterprise Scenario

A hospital runs legacy Windows servers for a clinical application. The systems administrator works with security staff to restrict network access, enable logging, test backups, and plan a safe upgrade path.

## 7. Vulnerability Management Analyst

A vulnerability management analyst identifies, validates, prioritizes, and tracks vulnerabilities until remediation is complete.

Not every vulnerability carries the same risk. Organizations need a disciplined process to decide what must be fixed first.

Vulnerability analysts use:

- Nessus.
- OpenVAS.
- Nmap.
- CVE information.
- CVSS scores.
- Asset criticality.
- Exploitation intelligence.
- Remediation reports.
- Validation scans.

This role appears in enterprises, banks, healthcare organizations, cloud environments, managed security providers, and government agencies.

### Enterprise Scenario

A bank identifies a critical vulnerability on an internet-facing web server. The vulnerability analyst confirms exposure, checks whether the server handles customer data, coordinates patching, validates remediation, and documents residual risk.

## 8. Incident Responder

An incident responder investigates security incidents, coordinates containment, supports eradication, and helps restore normal operations.

When an attack occurs, organizations need calm, structured action. Poor response can destroy evidence, extend downtime, or allow attackers to remain inside the environment.

Incident responders:

- Validate incidents.
- Preserve evidence.
- Scope affected systems.
- Contain compromised hosts or accounts.
- Coordinate with IT and leadership.
- Support malware analysis and forensics.
- Document timelines.
- Write incident reports.
- Recommend lessons learned.

Incident response is important in every sector, especially healthcare, finance, government, cloud services, and critical infrastructure.

### Enterprise Scenario

A ransomware alert appears on several endpoints. The incident responder coordinates network isolation, disables suspected compromised accounts, confirms backup status, collects logs, identifies initial access, and prepares leadership updates.

## 9. IAM Analyst

An Identity and Access Management analyst helps ensure that the right users have the right access at the right time.

Modern attacks often target identity. Stolen credentials, excessive privileges, stale accounts, and weak MFA enforcement can give attackers direct access to sensitive systems.

IAM analysts work with:

- User provisioning.
- Account deprovisioning.
- Role-based access control.
- MFA enforcement.
- Privileged access reviews.
- Active Directory groups.
- Microsoft Entra ID or other identity platforms.
- Conditional Access.
- Service accounts.

IAM roles are common in enterprises, banks, hospitals, schools, cloud-first organizations, and government agencies.

### Enterprise Scenario

A former contractor's account still has access to a project SharePoint site. The IAM analyst removes access, reviews group membership, checks recent activity, and improves offboarding procedures.

## 10. GRC Analyst

A Governance, Risk, and Compliance analyst supports policies, risk assessments, audits, standards, and regulatory requirements.

Security must be accountable. Organizations need evidence that controls exist, risks are tracked, and legal or regulatory obligations are understood.

GRC analysts:

- Maintain policies.
- Track risk registers.
- Support audits.
- Map controls to frameworks.
- Review vendor risk.
- Collect evidence.
- Communicate findings to leadership.
- Support compliance programs.

GRC is important in finance, healthcare, government, education, cloud services, and any organization subject to contracts, regulations, or audits.

### Enterprise Scenario

A healthcare organization prepares for an audit. The GRC analyst collects evidence for access reviews, backup testing, incident response exercises, security training, and vulnerability remediation.

## 11. Penetration Tester and Red Team Roles

A penetration tester performs authorized security testing to identify exploitable weaknesses. A red team may simulate more realistic adversary behavior to test detection and response.

Organizations need to understand whether security controls work under realistic conditions.

Penetration testers use approved scope, rules of engagement, testing tools, manual analysis, and reporting. Professional testing must be authorized in writing.

Penetration testing is used in:

- Web application testing.
- Internal network testing.
- External perimeter testing.
- Cloud security testing.
- Wireless assessments.
- Social engineering exercises.

### Enterprise Scenario

A company authorizes a test of its external web application. The tester identifies an authentication weakness, documents the business risk, provides proof safely, and recommends remediation without damaging production systems.

## 12. Career Paths

A career path is a realistic progression of skills, roles, experience, and certifications.

Cybersecurity is broad. A clear path helps students avoid confusion and build depth step by step.

### Common Entry Points

| Entry Point | Good For | Typical Next Step |
|---|---|---|
| Help desk | User support, troubleshooting, account basics. | Systems admin, SOC analyst, IAM analyst. |
| Network support | IP addressing, routing, firewalls, troubleshooting. | Network security, SOC, cloud security. |
| Systems administration | Windows, Linux, patching, backups, identity. | Security admin, cloud security, incident response. |
| Compliance or audit support | Documentation, risk, policies, evidence. | GRC analyst, risk analyst, security analyst. |
| Software or scripting background | Automation, code review, application logic. | AppSec, cloud security, detection engineering. |
| Self-built lab and portfolio | Practical evidence for beginners. | Junior SOC, junior security analyst, internship. |

### Example Career Path: SOC Analyst

1. Learn networking, Windows, Linux, and security fundamentals.
2. Practice log analysis with Windows Event Logs and Linux logs.
3. Learn SIEM basics with Wazuh, Splunk, or Microsoft Sentinel.
4. Study malware types, phishing, and MITRE ATT&CK.
5. Build lab projects and write short investigation reports.
6. Apply for SOC Analyst Tier 1 or Junior Security Analyst roles.

### Example Career Path: Vulnerability Management

1. Learn assets, risk, vulnerabilities, CVE, and CVSS.
2. Practice Nmap, Nessus, and OpenVAS in a lab.
3. Learn Windows and Linux patching basics.
4. Practice writing remediation reports.
5. Learn how to prioritize vulnerabilities by asset criticality and exposure.
6. Apply for Vulnerability Analyst or Security Analyst roles.

### Example Career Path: Security Administrator

1. Build strong systems administration skills.
2. Learn endpoint protection and hardening.
3. Learn identity and access management.
4. Practice firewall and VPN configuration.
5. Learn Microsoft Defender, BitLocker, logging, and patch management.
6. Apply for Security Administrator or Systems Security Analyst roles.

### Example Career Path: Incident Response

1. Build SOC, endpoint, and log analysis skills.
2. Learn Windows and Linux artifacts.
3. Study malware behavior and attacker techniques.
4. Practice incident timelines and evidence handling.
5. Learn NIST incident response lifecycle.
6. Apply for Junior Incident Response or SOC escalation roles.

## 13. Certification Roadmap

Certifications do not replace skill, judgment, or experience. They help structure learning, validate knowledge, and make a candidate easier for employers to evaluate.

Before registering for any certification, students should verify the current exam version, exam objectives, pricing, prerequisites, renewal requirements, and official training guidance directly from the certification provider.

### Certification Comparison

| Certification | Provider | Best Fit | Level | Main Focus |
|---|---|---|---|---|
| Security+ | CompTIA | Beginners and early-career professionals. | Foundational to early intermediate. | Security concepts, threats, architecture, operations, governance, risk, and compliance. |
| CySA+ | CompTIA | Analysts moving beyond fundamentals. | Intermediate. | Security analytics, vulnerability management, incident response, reporting. |
| CEH | EC-Council | Students seeking structured ethical hacking exposure. | Foundational to intermediate, depending on version and preparation. | Ethical hacking concepts, tools, attack categories, security testing vocabulary. |
| OSCP / OSCP+ | OffSec | Hands-on penetration testing path. | Intermediate to advanced practical. | Exploitation methodology, enumeration, privilege escalation, reporting. |
| CISSP | ISC2 | Experienced security professionals and leaders. | Advanced. | Security management, architecture, governance, risk, operations, and broad security domains. |

### Security+

Security+ is a vendor-neutral cybersecurity certification that validates broad security knowledge.

Security+ is often useful for students entering SOC, security analyst, systems administrator, security administrator, and junior cybersecurity roles.

Students should study:

- Security concepts.
- Threats, vulnerabilities, and mitigations.
- Security architecture.
- Security operations.
- Governance, risk, and compliance.

Security+ fits early in the learning journey, after students understand basic IT, networking, operating systems, and cybersecurity fundamentals.

### CySA+

CySA+ is a cybersecurity analyst certification focused on security operations, analytics, vulnerability management, incident response, and reporting.

It is useful for students targeting SOC Analyst, Cybersecurity Analyst, Vulnerability Analyst, and incident response support roles.

Students should build skill in:

- Log analysis.
- SIEM usage.
- Vulnerability scanning.
- Incident triage.
- Detection and response.
- Reporting.

CySA+ fits after Security+ or equivalent knowledge, especially when the student wants blue-team analyst work.

### CEH

CEH, Certified Ethical Hacker, introduces ethical hacking concepts and offensive security vocabulary under an authorized testing model.

It helps students understand how attackers think, but it must be paired with real lab practice, defensive thinking, and professional ethics.

Students should study:

- Reconnaissance.
- Scanning.
- Enumeration.
- Vulnerability exploitation concepts.
- Web attacks.
- Wireless and cloud attack concepts.
- Reporting and ethical boundaries.

CEH may fit after foundational security knowledge, especially for students who want structured exposure to offensive concepts.

### OSCP / OSCP+

OSCP is a practical penetration testing certification path from OffSec. OSCP+ is associated with OffSec's current certification branding and continuing education model.

It is widely respected for hands-on offensive security skill because students must demonstrate practical exploitation and reporting ability in a controlled exam environment.

Students should prepare with:

- Strong Linux and Windows fundamentals.
- Networking.
- Bash and Python basics.
- Enumeration.
- Web vulnerability understanding.
- Privilege escalation.
- Report writing.
- Persistent lab practice.

OSCP fits later than Security+ and most beginner courses. Students should not rush into it without practical lab confidence.

### CISSP

CISSP is an advanced security certification for experienced professionals across broad security domains.

It is valuable for security managers, architects, consultants, senior analysts, and professionals who need broad governance, risk, architecture, and leadership knowledge.

Students should prepare after gaining professional experience in security or closely related IT work.

CISSP is not usually the first certification for beginners. It is better treated as a mid-career or senior milestone.

### Suggested Beginner Roadmaps

| Goal | Suggested Roadmap |
|---|---|
| SOC Analyst | IT basics -> Security+ -> SIEM labs -> CySA+ -> portfolio investigations. |
| Vulnerability Analyst | IT basics -> Security+ -> Nmap/Nessus/OpenVAS labs -> CySA+ -> remediation reports. |
| Security Administrator | Networking and systems -> Security+ -> Windows/Linux hardening -> cloud and endpoint security. |
| Incident Response | Security+ -> SOC practice -> CySA+ -> forensics basics -> incident reports. |
| Penetration Tester | Networking/Linux/Python -> Security+ or equivalent -> web/network labs -> CEH or equivalent -> OSCP path. |
| GRC Analyst | Security+ -> risk and compliance projects -> framework mapping -> audit evidence practice -> CISSP later. |

## 14. Continuous Learning Strategies

Continuous learning is the habit of regularly improving technical knowledge, practical skill, professional judgment, and communication ability.

Cybersecurity changes constantly. Attackers adapt. Tools change. Cloud platforms evolve. Regulations are updated. New vulnerabilities are disclosed. A security professional who stops learning becomes less effective over time.

Students can practice continuous learning through:

- Reading official documentation.
- Building home labs.
- Practicing with virtual machines.
- Writing investigation reports.
- Reviewing threat intelligence summaries.
- Studying security advisories.
- Following vendor security blogs.
- Practicing log analysis.
- Participating in capture-the-flag platforms ethically.
- Documenting projects in a portfolio.
- Reviewing lessons learned from incidents.

Continuous learning happens:

- In labs.
- In work tickets.
- During incident reviews.
- In certification study.
- In security communities.
- In vendor documentation.
- In team knowledge-sharing sessions.

## 15. Professional Skills

Technical skill matters, but professional behavior determines whether that skill is trusted.

### Core Professional Skills

| Skill | Why It Matters |
|---|---|
| Clear writing | Security findings must be understood by technical and non-technical readers. |
| Evidence-based reasoning | Analysts must support conclusions with logs, facts, and observations. |
| Ethical judgment | Security access can be powerful and must be used responsibly. |
| Communication | Incidents require coordination across IT, legal, management, and business teams. |
| Documentation | Good notes preserve evidence and support repeatable operations. |
| Prioritization | Security teams must handle limited time and many competing risks. |
| Curiosity | Good analysts keep asking what happened, why, and what evidence supports it. |
| Calm under pressure | Incidents require structured thinking even when business impact is high. |

### Enterprise Example

A junior SOC analyst sees an alert for credential dumping. Instead of writing "hacker attack confirmed," the analyst writes:

"Microsoft Defender generated a credential access alert on workstation FIN-LAP-022 at 09:42. The alert involved suspicious access to LSASS memory. The host was assigned to a finance user. Recommended next actions are host isolation, user credential reset, review of recent authentication logs, and escalation to incident response."

This is professional because it is specific, evidence-based, and action-oriented.

## 16. Building a Professional Portfolio

A portfolio is a collection of practical work that shows what a student can do.

Beginners often lack job experience. A portfolio helps demonstrate learning, discipline, and practical ability.

Students can build portfolio projects such as:

- A home lab diagram.
- A Windows event log investigation.
- A Linux authentication log analysis.
- A Wazuh deployment write-up.
- A vulnerability scan report.
- A phishing email analysis.
- A basic incident report.
- A MITRE ATT&CK mapping exercise.
- A security hardening checklist.
- A cloud IAM review scenario.

Portfolio work may be stored in:

- A personal GitHub repository.
- A PDF collection.
- A private documentation folder.
- A personal website.
- A professional cloud storage folder.

Students must never publish real employer data, private logs, credentials, customer information, or sensitive screenshots.

## 17. Enterprise Scenarios

### Scenario 1: Small Business

A small business has no dedicated security team. One IT support person manages laptops, Microsoft 365, backups, and the Wi-Fi router.

Security profession view:

- The IT support person performs systems administration, security administration, IAM, and incident response support.
- Security priorities include MFA, backups, patching, endpoint protection, and email security.
- A managed security provider may help with monitoring.

### Scenario 2: Corporate Enterprise

A corporation has separate teams for SOC, IAM, vulnerability management, endpoint security, cloud security, and GRC.

Security profession view:

- The SOC detects suspicious activity.
- IAM controls access.
- Vulnerability management tracks weaknesses.
- Endpoint security protects workstations.
- GRC tracks risk and compliance.
- Leadership coordinates strategy and budget.

### Scenario 3: Healthcare Organization

A hospital needs availability and patient data protection.

Security profession view:

- Systems administrators protect clinical systems.
- Incident responders prepare for ransomware.
- GRC analysts support healthcare compliance.
- SOC analysts monitor endpoints, identity, and network activity.
- Security leaders coordinate with clinical operations.

### Scenario 4: Cloud-First Company

A software company uses Azure, Microsoft 365, GitHub, containers, and SaaS applications.

Security profession view:

- Cloud security analysts review IAM, storage exposure, and logging.
- Security engineers automate detection.
- Developers support secure coding.
- SOC analysts monitor identity and cloud alerts.
- GRC analysts review vendor and compliance obligations.

## 18. Classroom Hands-On Practical

### Practical Title

Map Security Tasks to Professional Roles

### Objective

Students will learn how real security work is divided across roles.

### Scenario

A company detects suspicious activity:

- Microsoft Defender alerts on suspicious PowerShell.
- Sentinel shows unusual sign-ins from a foreign country.
- Nessus reports critical vulnerabilities on a VPN appliance.
- A manager asks whether customer data was accessed.
- The firewall team sees outbound traffic to an unknown IP address.
- The business wants a written incident summary.

### Tasks

For each activity, identify:

1. Which role should be involved.
2. What evidence the role should review.
3. What action the role should take.
4. What business risk is being reduced.

### Expected Student Output

| Activity | Role | Evidence | Action |
|---|---|---|---|
| Suspicious PowerShell | SOC Analyst / Incident Responder | Defender alert, PowerShell logs, process tree. | Triage, isolate if confirmed, escalate. |
| Unusual sign-ins | SOC Analyst / IAM Analyst | Entra ID sign-in logs, MFA status. | Reset password, revoke sessions, review access. |
| Critical VPN vulnerability | Vulnerability Analyst / Network Security Engineer | Scan report, asset exposure, CVE details. | Patch, restrict access, validate fix. |
| Customer data concern | Incident Responder / GRC Analyst | Data access logs, incident timeline. | Determine exposure and reporting obligations. |
| Unknown outbound IP | Network Security Analyst | Firewall, DNS, proxy logs. | Block if malicious, investigate host. |
| Written incident summary | Incident Responder / Security Manager | Confirmed findings and actions. | Produce accurate report for leadership. |

## 19. Take-Home Practical

### Assignment

Choose one target role:

- SOC Analyst.
- Cybersecurity Analyst.
- Security Administrator.
- Systems Administrator with security responsibilities.
- Junior Incident Responder.
- Vulnerability Management Analyst.
- IAM Analyst.
- GRC Analyst.

Create a one-page career plan that includes:

- Why the role interests you.
- Required technical skills.
- Required professional skills.
- Tools to learn.
- One certification goal.
- Three lab projects.
- A 90-day learning plan.
- One portfolio artifact you will create.

## 20. Assessment Questions

### Multiple Choice

1. Which role is most directly responsible for monitoring and triaging SIEM alerts?
   A. SOC Analyst
   B. Payroll Manager
   C. Facilities Coordinator
   D. Sales Director

2. Which certification is generally best suited as an early cybersecurity foundation?
   A. CISSP
   B. Security+
   C. Advanced architecture board certification
   D. Senior executive leadership credential

3. Which role commonly prioritizes scan findings and tracks remediation?
   A. Vulnerability Management Analyst
   B. Receptionist
   C. Procurement Clerk
   D. Graphic Designer

4. Why should students verify certification exam versions before registering?
   A. Certification exams and objectives can change
   B. Exam codes never change
   C. It is unnecessary if a friend took the exam years ago
   D. Only employers can view exam objectives

5. Which professional habit is most important when writing an incident note?
   A. Guessing the attacker immediately
   B. Using evidence-based statements
   C. Deleting uncertain details from memory
   D. Avoiding timestamps

6. Which role is most likely to manage firewall rules, endpoint protection policies, and security tool configuration?
   A. Security Administrator
   B. Marketing Assistant
   C. Payroll Clerk
   D. Receptionist

7. Which role commonly manages operating systems, services, patches, accounts, and backups?
   A. Systems Administrator
   B. Customer Service Agent
   C. Graphic Designer
   D. Sales Representative

8. Which certification is generally associated with hands-on penetration testing skill?
   A. OSCP
   B. Basic typing certificate
   C. Office attendance certificate
   D. Driver's license

9. Why is continuous learning required in cybersecurity?
   A. Threats, tools, platforms, and best practices change over time
   B. Security knowledge never changes
   C. Certifications permanently replace experience
   D. Logs always explain themselves

10. Which portfolio item best demonstrates practical beginner skill?
    A. A copied screenshot with no explanation
    B. A documented lab showing scope, steps, evidence, findings, and lessons learned
    C. A private employer report uploaded publicly
    D. A list of tools without examples

### Short Answer

1. Explain the difference between a SOC analyst and an incident responder.
2. Why are systems administrators important to cybersecurity?
3. List three tasks an IAM analyst may perform.
4. Explain why certifications do not replace practical skill.
5. Give two examples of beginner portfolio projects.

### Scenario-Based Questions

1. A hospital receives ransomware alerts on several endpoints. Which roles should be involved and why?
2. A vulnerability scan identifies a critical flaw on an internet-facing server. What should a vulnerability analyst do next?
3. A junior analyst sees suspicious login activity but is unsure whether it is malicious. What professional steps should the analyst take?

## 21. Glossary

| Term | Definition |
|---|---|
| Career Path | A planned progression of skills, roles, experience, and certifications. |
| Certification Roadmap | A sequence of certifications aligned to career goals and skill level. |
| Continuous Learning | The ongoing habit of improving technical, professional, and security knowledge. |
| Cybersecurity Analyst | A broad security role focused on analyzing risk, alerts, vulnerabilities, controls, or incidents. |
| GRC Analyst | A professional focused on governance, risk, compliance, policies, audits, and evidence. |
| IAM Analyst | A professional focused on identity, access, account lifecycle, and privileges. |
| Incident Responder | A professional who investigates, contains, and coordinates response to security incidents. |
| Penetration Tester | A professional who performs authorized testing to identify exploitable weaknesses. |
| Portfolio | A collection of practical work demonstrating skills and professional growth. |
| Security Administrator | A professional who configures and maintains security controls and tools. |
| SOC Analyst | A security operations professional who monitors, triages, and escalates security alerts. |
| Systems Administrator | A professional who manages operating systems, servers, endpoints, accounts, patches, and IT services. |
| Vulnerability Management Analyst | A professional who identifies, prioritizes, tracks, and validates vulnerability remediation. |

## 22. Lesson Review Checklist

Students should be able to confirm:

- I can describe common cybersecurity roles.
- I can explain how security roles work together during incidents.
- I can distinguish SOC, IR, vulnerability management, IAM, GRC, security administration, and systems administration responsibilities.
- I can explain where Security+, CySA+, CEH, OSCP, and CISSP fit in a roadmap.
- I understand that certifications must be paired with practical skills.
- I can create a beginner career plan with labs, tools, and portfolio goals.
- I can explain why continuous learning is necessary in cybersecurity.

## 23. Continuity With Future Lessons

Lesson 4 begins the technical foundation of cryptography. Students should carry forward the professional role perspective from this lesson:

- SOC analysts need to understand cryptographic alerts and certificate issues.
- Systems administrators must configure encryption correctly.
- Security administrators must enforce secure protocols.
- IAM analysts must understand authentication and token security.
- Incident responders must recognize when encryption protects data and when attackers abuse encryption to hide traffic or extort victims.

Future lessons will keep connecting technical concepts to real job responsibilities.

## References for Instructor Alignment

- CompTIA Security+: verify the current exam objectives directly through CompTIA before registration.
- CompTIA CySA+: verify the current exam objectives directly through CompTIA before registration.
- EC-Council CEH: https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/
- OffSec PEN-200 / OSCP path: https://www.offsec.com/courses/pen-200/
- ISC2 CISSP: https://www.isc2.org/certifications/cissp
