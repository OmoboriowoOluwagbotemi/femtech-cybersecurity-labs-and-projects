# Lesson 6: Access Control and Defense in Depth

## Lesson Overview

Access control decides who or what is allowed to use a system, data, application, network, device, or administrative function. Defense in depth ensures that access control is not the only thing protecting the organization. If one safeguard fails, other safeguards still reduce the likelihood, impact, or speed of an attack.

Lesson 1 introduced security controls, defense in depth, risk, and attack surface. Lesson 5 introduced authentication and identity. This lesson connects those foundations to enterprise authorization, access control models, least privilege, account governance, layered controls, monitoring, and practical security administration.

Students should leave this lesson able to reason like entry-level SOC analysts, cybersecurity analysts, security administrators, systems administrators, junior incident responders, and vulnerability management analysts. The goal is not only to memorize access control terms. The goal is to decide whether access is appropriate, whether a control is sufficient, and what evidence proves the environment is protected.

## Learning Objectives

By the end of this lesson, students should be able to:

- Explain access control from first principles.
- Distinguish identification, authentication, authorization, and accounting.
- Compare discretionary, mandatory, role-based, rule-based, and attribute-based access control.
- Explain least privilege, need to know, separation of duties, privileged access, and access reviews.
- Describe defense in depth across identity, endpoint, network, application, data, logging, backup, and response layers.
- Classify controls by Security+ SY0-701 categories: technical, managerial, operational, and physical.
- Classify controls by Security+ SY0-701 function: preventive, deterrent, detective, corrective, compensating, and directive.
- Avoid placing directive controls under control category by nature.
- Analyze realistic access failures in small business, enterprise, finance, healthcare, education, government, cloud, and hybrid environments.
- Recommend practical controls using Windows, Linux, Active Directory, Microsoft 365/Azure, cloud IAM, firewalls, SIEM, and endpoint tools where relevant.
- Complete basic hands-on access review and defense-in-depth mapping exercises.

## Prerequisite Knowledge

Students should understand:

- CIA Triad, risk, threats, vulnerabilities, attack surface, and security controls from Lesson 1.
- Threat actors and attack progression from Lesson 2.
- Security roles and professional responsibilities from Lesson 3.
- Cryptography fundamentals such as hashing, encryption, TLS, and certificates from Lesson 4.
- Authentication, MFA, SSO, tokens, password storage, and credential security from Lesson 5.

## Enterprise Relevance

Access control is one of the most common sources of real security incidents. Many breaches do not begin with advanced malware. They begin with an account that has too much access, a shared password, a forgotten former employee account, an exposed cloud token, a weak file permission, a misconfigured application role, or an administrator account used on the wrong endpoint.

Defense in depth matters because enterprises are complex. A phishing email may bypass filtering. A user may approve a malicious MFA prompt. A laptop may be stolen. A firewall rule may be too broad. A cloud storage bucket may be misconfigured. A backup may fail. A strong security program assumes individual controls can fail and builds layers that limit damage.

Access control and defense in depth are used daily by:

- SOC analysts investigating suspicious logons, privilege changes, and unusual access.
- Security administrators configuring MFA, conditional access, EDR policies, firewall rules, and SIEM alerts.
- Systems administrators managing local users, groups, file permissions, services, patches, and backups.
- IAM analysts provisioning users, assigning roles, reviewing access, and removing accounts.
- Incident responders containing compromised identities and limiting lateral movement.
- Vulnerability analysts connecting excessive exposure and weak permissions to business risk.
- GRC analysts collecting evidence that controls are designed, approved, implemented, and reviewed.

## 1. Access Control

Access control is the process of deciding whether a subject is allowed to perform an action on an object.

| Element | Meaning | Example |
|---|---|---|
| Subject | The user, service, process, device, or workload requesting access | Employee account, service account, application, virtual machine |
| Object | The resource being accessed | File, database, mailbox, server, API, network share, cloud storage |
| Action | The operation requested | Read, write, execute, delete, approve, administer, connect |
| Policy | The rule that decides whether access is allowed | Only Finance can read payroll files |
| Enforcement point | The system that applies the decision | Operating system, application, firewall, identity provider, cloud IAM |

Access control is broader than login. A user may successfully authenticate and still be blocked from viewing payroll, changing firewall rules, deleting backups, or opening patient records.

Access control protects confidentiality, integrity, and availability.

- Confidentiality: only authorized people and systems can view sensitive data.
- Integrity: only authorized people and systems can change data or configuration.
- Availability: only authorized people and systems can perform actions that affect service operation.

Without access control, any user, application, or attacker who reaches a system may access data or perform actions beyond their role.

Access control normally follows this sequence:

1. Identify the subject.
2. Authenticate the subject.
3. Evaluate authorization policy.
4. Enforce allow or deny decision.
5. Log the access event.
6. Review access periodically.
7. Remove access when it is no longer needed.

Access control applies in:

- Windows files, folders, services, Registry keys, local groups, and Active Directory.
- Linux users, groups, permissions, ACLs, sudoers rules, SSH, SELinux, and AppArmor.
- Cloud IAM roles, resource policies, storage permissions, and administrative portals.
- Microsoft 365 mailboxes, SharePoint sites, Teams, Conditional Access, and Defender portals.
- Databases, applications, APIs, firewalls, VPNs, SIEM platforms, backups, and physical facilities.

## 2. Identification, Authentication, Authorization, and Accounting

Access control depends on four related ideas.

| Concept | Question Answered | Example |
|---|---|---|
| Identification | Who are you claiming to be? | Username, employee ID, device ID |
| Authentication | Can you prove that identity? | Password, MFA, certificate, security key |
| Authorization | What are you allowed to do? | Read HR files, approve payments, reset passwords |
| Accounting | What did you do? | Logon logs, file access logs, audit trail |

Identification names the subject. Authentication verifies the claim. Authorization grants or denies permission. Accounting records what happened.

Confusing these concepts causes security mistakes. A valid login does not mean the user should have access to every resource. A successful MFA event does not mean a transaction is safe. An administrator account does not mean every action is appropriate.

Enterprise systems enforce these concepts using identity providers, directories, access tokens, group membership, policies, permissions, logs, and monitoring.

Examples include Active Directory, Microsoft Entra ID, Linux PAM, cloud IAM, VPN portals, SaaS applications, firewalls, databases, and SIEM platforms.

## 3. Access Control Models

Access control models describe how authorization decisions are organized.

| Model | Main Idea | Common Use | Risk if Misused |
|---|---|---|---|
| Discretionary Access Control (DAC) | Resource owner controls access | Windows and Linux file permissions | Owners may grant excessive access |
| Mandatory Access Control (MAC) | Central policy labels control access | High-security government or hardened systems | Difficult to manage if labels are wrong |
| Role-Based Access Control (RBAC) | Access is based on job role | Active Directory groups, SaaS roles, cloud IAM | Roles become too broad over time |
| Rule-Based Access Control | Access is based on explicit rules | Firewalls, time restrictions, network policies | Rules may conflict or become outdated |
| Attribute-Based Access Control (ABAC) | Access is based on attributes and conditions | Cloud IAM, Conditional Access, Zero Trust | Poor attributes can create wrong decisions |

### Discretionary Access Control

DAC allows the owner or administrator of a resource to decide who can access it. For example, a department manager may grant a user access to a shared folder.

DAC is flexible, but it can become risky when owners do not understand permissions, inheritance, group membership, or business sensitivity.

### Mandatory Access Control

MAC uses centrally managed labels or classifications. A user must have the required clearance or label relationship before access is allowed.

MAC is useful in highly controlled environments such as government, defense, research, and regulated data environments. It is less flexible than ordinary business file sharing.

### Role-Based Access Control

RBAC assigns access based on job roles. A payroll clerk receives payroll permissions. A SOC analyst receives SIEM read access. A helpdesk technician receives password reset permissions but not domain administrator privileges.

RBAC is common because it maps well to enterprise job functions. The weakness is role creep, where users collect more permissions over time as they move between teams.

### Rule-Based Access Control

Rule-based access uses predefined rules. For example:

- Allow VPN access only during business hours.
- Block RDP from non-admin networks.
- Permit HTTP from the internet to the DMZ web server.
- Deny logon from high-risk countries.

Rules must be documented, tested, reviewed, and monitored.

### Attribute-Based Access Control

ABAC evaluates attributes such as user department, device compliance, location, data classification, time, authentication strength, and risk score.

Modern Zero Trust and conditional access designs often use ABAC-style decisions:

```text
Allow access to payroll only when:
User is in Finance,
device is compliant,
MFA is satisfied,
location is trusted or risk is low,
and the session is logged.
```

## 4. Least Privilege and Need to Know

Least privilege means subjects receive only the access required to perform approved work. Need to know means access to information is limited to those with a legitimate business need.

Excessive access increases breach impact. If a phishing victim has access to payroll, backups, cloud admin panels, file shares, and email rules, one compromised account can damage many systems.

Organizations apply least privilege through:

- Role design.
- Group-based permission assignment.
- Privileged access management.
- Just-in-time access.
- Access reviews.
- Separation of duties.
- Conditional access.
- Removal of dormant accounts.
- Monitoring of privilege changes.

Least privilege applies to user accounts, administrator accounts, service accounts, API keys, cloud roles, database permissions, file shares, endpoints, firewalls, and security tools.

## 5. Separation of Duties

Separation of duties divides sensitive responsibilities so one person cannot complete a high-risk process alone.

It reduces fraud, mistakes, and abuse of privilege.

Examples:

- One employee creates a vendor; another approves payment.
- A developer writes code; a reviewer approves production deployment.
- A helpdesk worker resets passwords; a security administrator reviews high-risk resets.
- A firewall engineer proposes a rule; a change manager approves it.

Separation of duties is used in finance, healthcare, government, cloud administration, software development, HR, procurement, and security operations.

## 6. Privileged Access

Privileged access is access that can administer systems, change security settings, read sensitive data at scale, disable controls, or affect many users.

Examples include:

- Domain Administrator.
- Local Administrator.
- Root.
- Global Administrator in Microsoft 365 or Entra ID.
- Cloud account administrator.
- Firewall administrator.
- Database administrator.
- SIEM administrator.
- Backup administrator.

Privileged accounts are high-value targets. If attackers compromise them, they may disable defenses, create persistence, steal data, encrypt systems, or hide evidence.

Privileged access is protected with:

- Separate admin accounts.
- MFA or phishing-resistant MFA.
- Privileged access workstations.
- Just-in-time elevation.
- Password vaulting.
- Session recording.
- Administrative tiering.
- Change approval.
- Alerting on privilege changes.
- Regular access review.

Privileged access exists across Windows, Linux, Active Directory, cloud platforms, Microsoft 365, firewalls, hypervisors, databases, CI/CD tools, SIEMs, EDR consoles, and backup systems.

## 7. Access Control in Windows and Active Directory

Windows access control uses security identifiers, access tokens, groups, privileges, and access control lists. Active Directory centralizes identity and group management for domain environments.

Common controls:

| Control | Security Purpose |
|---|---|
| Active Directory groups | Assign access by role instead of individual user |
| Group Policy | Enforce security configuration and restrictions |
| NTFS permissions | Control file and folder access |
| Share permissions | Control network-share access |
| Local Administrators group review | Reduce endpoint privilege |
| Event Logs | Record logon, privilege, and object-access events |
| Microsoft Defender | Detect suspicious endpoint activity |
| Microsoft Sentinel or Splunk | Correlate identity, endpoint, and access logs |

Enterprise example: In a corporate enterprise, the Finance shared folder should not be assigned to `Domain Users`. A safer design uses a Finance security group, approval from the data owner, NTFS permissions, audit logging, and periodic access review.

## 8. Access Control in Linux

Linux access control commonly uses users, groups, file ownership, permissions, ACLs, sudoers rules, SSH controls, and mandatory access controls such as SELinux or AppArmor.

Common controls:

| Control | Security Purpose |
|---|---|
| File ownership | Defines the user and group associated with a file |
| Mode bits | Control read, write, and execute for owner, group, and others |
| ACLs | Provide more specific access rules |
| `sudoers` | Controls who can run administrative commands |
| SSH keys | Support stronger administrative authentication |
| AppArmor or SELinux | Restrict what processes can access |
| Logs | Support investigation of logon and privilege activity |

Enterprise example: A healthcare Linux server storing lab-interface files should not allow every local user to read patient exports. The administrator should use a dedicated group, restricted directory permissions, service-account separation, audit logging, and tested backups.

## 9. Access Control in Cloud and Microsoft 365

Cloud access control extends beyond users. It includes service principals, managed identities, roles, policies, API keys, storage permissions, conditional access, and workload identities.

Common controls:

| Area | Example Control |
|---|---|
| Microsoft 365 | Limit SharePoint sharing, protect mailbox rules, enforce MFA |
| Azure | Use RBAC, Conditional Access, Privileged Identity Management, managed identities |
| AWS | Use IAM roles, policies, security groups, organization service control policies |
| SaaS | Assign least-privilege roles, review admin accounts, monitor exports |
| Storage | Block public access, restrict sharing, log access |
| APIs | Rotate keys, scope tokens, monitor abnormal use |

Cloud example: A small business may encrypt cloud storage but accidentally allow public read access. Encryption helps protect data at rest, but access control decides who can retrieve the object. Defense in depth requires storage policies, identity controls, logging, alerting, and periodic review.

## 10. Defense in Depth

Defense in depth is a layered security strategy. It uses multiple safeguards across people, process, and technology so that one failure does not expose the whole organization.

No control is perfect. Users can be tricked, software can have vulnerabilities, passwords can be stolen, firewalls can be misconfigured, backups can fail, and logs can be incomplete. Defense in depth reduces dependence on a single protection.

Defense in depth works by placing controls at different layers:

| Layer | Example Controls |
|---|---|
| Governance | Policies, risk assessment, control ownership, audit |
| Identity | MFA, RBAC, PAM, account lifecycle, access reviews |
| Endpoint | Hardening, EDR, patching, disk encryption |
| Network | Firewalls, segmentation, VPN, IDS/IPS |
| Application | Secure coding, server-side authorization, input validation |
| Data | Classification, encryption, DLP, backup, retention |
| Monitoring | SIEM, Wazuh, Microsoft Sentinel, Splunk, alert tuning |
| Response | Incident response playbooks, containment, recovery, lessons learned |
| Physical | Locks, badges, cameras, guards, access control vestibules |

Defense in depth applies to every enterprise environment: small offices, hospitals, banks, schools, government agencies, cloud systems, hybrid networks, endpoints, servers, applications, and security operations.

## 11. Defense in Depth Example: Compromised User Account

One stolen password should not allow full compromise.

| Attack Step | Layered Defense |
|---|---|
| Attacker gets password | MFA blocks password-only access |
| Attacker tricks MFA approval | Conditional Access checks device, location, and risk |
| Attacker logs in to email | Mailbox audit and impossible-travel alert triggers review |
| Attacker searches files | Least privilege limits access |
| Attacker creates forwarding rule | Mailbox-rule alert detects suspicious change |
| Attacker accesses admin portal | Separate admin account and PAM block normal user |
| Attacker downloads data | DLP and audit logs detect unusual export |
| Incident confirmed | IR process disables account, revokes sessions, preserves logs |

The professional lesson is simple: each layer reduces attacker options, increases detection opportunity, and limits business impact.

## 12. Security Control Categories and Functions

Security+ SY0-701 separates control categories from control functions.

### Control Categories

Control categories describe the nature of the control.

| Category | Meaning | Example |
|---|---|---|
| Technical | Implemented through hardware, software, or automated technology | MFA, firewall rule, EDR, encryption, ACL |
| Managerial | Governance, risk management, policy approval, oversight, and planning | Risk register, policy approval, vendor review |
| Operational | People-driven procedures and daily security operations | Access review, account offboarding, log review |
| Physical | Protects facilities, equipment, and physical access | Badge reader, lock, camera, security guard |

### Control Functions

Control functions describe what the control does.

| Function | Meaning | Example |
|---|---|---|
| Preventive | Stops or blocks an unwanted event before it succeeds | MFA, least privilege, firewall deny rule |
| Deterrent | Discourages unwanted behavior | Warning banner, security guard presence |
| Detective | Identifies events after or while they occur | SIEM alert, audit log, file integrity monitoring |
| Corrective | Restores or fixes after a problem | Patch, account disablement, restore from backup |
| Compensating | Provides an alternative when the preferred control is not possible | Firewall restriction for a legacy system that cannot be patched |
| Directive | Tells people what must be done | Policy, standard, procedure, acceptable use notice |

Important: directive is a control function, not a control category by nature. Operational is a control category, not a function.

## 13. Access Control Failure Patterns

| Failure | Example | Likely Impact | Better Practice |
|---|---|---|---|
| Excessive group membership | All staff can read payroll | Confidentiality loss | Role-based groups and access review |
| Orphaned account | Former employee still active | Unauthorized access | Timely deprovisioning |
| Shared administrator account | Many admins use one password | No accountability | Named admin accounts and PAM |
| Weak service-account permissions | Service account is domain admin | Large compromise impact | Minimum required privileges |
| Public cloud storage | Internet users can read files | Data exposure | Private-by-default and logging |
| Missing audit logs | Access cannot be investigated | Weak incident response | Enable and retain logs |
| Poor separation of duties | One person creates and pays vendors | Fraud risk | Approval workflow |
| Flat network | Compromised user reaches servers | Lateral movement | Segmentation |

## 14. Enterprise Scenarios

### Small Business

A small accounting firm stores tax files in a shared cloud folder. A new employee is added to a broad `All Staff` group and can access every client folder. The fix is not only to remove that user. The firm needs client-folder groups, owner approval, MFA, sharing restrictions, audit logs, and quarterly access reviews.

### Corporate Enterprise

A corporate enterprise discovers that many users remain in old project groups after changing departments. The business risk is role creep. The organization implements joiner-mover-leaver reviews, HR-driven identity updates, group owners, SIEM alerts for privileged group changes, and annual entitlement certification.

### Financial Institution

A payment operations user can create vendors and approve payments. This violates separation of duties. The bank separates vendor creation from payment approval, logs changes, alerts on new high-value vendors, and requires manager approval for exceptions.

### Healthcare Organization

A nurse account is used from an unusual location to access many patient records. Defense in depth includes MFA, Conditional Access, EHR audit logs, impossible-travel detection, minimum necessary access, incident response, and privacy reporting procedures.

### Educational Institution

A teaching assistant can access the entire grade database instead of only assigned course sections. The university corrects application roles, reviews database permissions, monitors privileged actions, and requires department approval for elevated access.

### Government Agency

A government contractor needs temporary access to a case-management system. The agency uses time-bound access, identity proofing, MFA, least privilege, manager approval, audit logging, and automatic expiration.

### Cloud Environment

An AWS IAM policy allows `s3:*` on all buckets for an application role. The role only needs read access to one bucket. The cloud team scopes the policy, uses access analyzer findings, enables CloudTrail, and alerts on unusual object reads.

### Hybrid Infrastructure

A company synchronizes Active Directory identities to Microsoft 365. A compromised on-premises account is used to access cloud email. The organization must contain both environments: disable the account, revoke cloud sessions, reset credentials, review mailbox rules, check AD group membership, and inspect endpoint evidence.

## 15. SOC and Incident Response Context

Access control failures often appear in logs before they appear as business damage.

Potential alerts:

- New user added to privileged group.
- Disabled account successfully authenticates.
- User logs in from unusual location.
- Multiple failed logons followed by success.
- New mailbox forwarding rule created.
- Service account used interactively.
- Cloud role assigned broad administrative permissions.
- Large file download from sensitive storage.
- Firewall rule changed to allow broad access.
- Backup administrator account logs in outside maintenance window.

Triage questions:

1. Which identity is involved?
2. What resource was accessed?
3. Was authentication successful?
4. Was the access authorized for the user's role?
5. Was a privileged role added, changed, or used?
6. What system enforced the access decision?
7. What logs prove the timeline?
8. What containment is required now?
9. What business process owner must be notified?
10. What control should prevent recurrence?

## 16. Practical Design Method

When designing access control, use this professional sequence:

1. Identify the asset and data sensitivity.
2. Identify business owners and technical owners.
3. Identify required user roles and service identities.
4. Assign least-privilege permissions.
5. Separate privileged and standard access.
6. Require strong authentication.
7. Add network and device conditions where appropriate.
8. Enable logging and alerting.
9. Test normal access and denied access.
10. Document exceptions and expiration dates.
11. Review access periodically.
12. Remove access when no longer needed.

## 17. Security+ SY0-701 Alignment

This lesson supports Security+ SY0-701 objectives related to:

- Security control categories and functions.
- Authentication, authorization, and accounting.
- Authorization models.
- Zero Trust concepts.
- Change management and policy-driven access.
- Enterprise IAM operations.
- Provisioning and deprovisioning.
- Permission assignments.
- Least privilege.
- Privileged access management.
- Security operations, monitoring, alerting, remediation, and validation.

## 18. Classroom Hands-On Practical

### Practical Title

Access Review and Defense-in-Depth Mapping

### Safety

Use only instructor-provided sample data, lab systems, or screenshots. Do not inspect real student, employee, customer, patient, or production records.

### Part A: Access Review Table

Students receive or create this sample access list:

| User | Department | Current Access | Business Need | Decision |
|---|---|---|---|---|
| Ada | Finance | Payroll Share, General Share | Payroll Share, General Share | Keep |
| Ben | IT Helpdesk | Password Reset, Domain Admin | Password Reset only | Remove Domain Admin |
| Chika | HR | HR Share, Payroll Share | HR Share only | Remove Payroll Share |
| David | Former Employee | Email, VPN | None | Disable account |
| Efe-App | Service Account | Database Read/Write, Domain Admin | Database Read/Write only | Remove Domain Admin |

Students must identify:

- Excessive access.
- Privileged access.
- Orphaned access.
- Service-account risk.
- Required remediation.
- Evidence needed to prove remediation.

### Part B: Windows or Active Directory Thinking

For each risky access item, students write the likely location to check:

| Question | Possible Check |
|---|---|
| Is the user in a privileged group? | Active Directory group membership |
| Can the user access a file share? | Share and NTFS permissions |
| Was a group changed recently? | Windows Security logs or SIEM |
| Is the account disabled? | Active Directory user object |
| Is access still needed? | Manager or data-owner approval |

### Part C: Linux Thinking

Use a lab Linux directory example:

```bash
mkdir -p ~/access-lab/finance
ls -ld ~/access-lab/finance
```

Students answer:

1. Who owns the directory?
2. Which group has access?
3. Can others read it?
4. What would be risky about world-readable finance data?
5. What evidence would prove the permission was corrected?

### Part D: Defense-in-Depth Map

Students map one sensitive file share or cloud folder through layers:

| Layer | Control |
|---|---|
| Identity | MFA and RBAC group |
| Endpoint | Managed device and EDR |
| Network | VPN or trusted network restriction |
| Application/Data | File permissions and data classification |
| Monitoring | SIEM alert on unusual access |
| Response | Disable account and revoke sessions |
| Governance | Access review and owner approval |

### Student Deliverable

Submit a one-page access review and defense-in-depth map that explains:

- What access was excessive.
- Why it created risk.
- How it should be corrected.
- Where the control is enforced.
- Which evidence proves the correction.

## 19. Take-Home Practical

Create an access control design for a fictional organization with:

- 30 employees.
- Finance, HR, IT, Operations, and Management teams.
- One file server.
- Microsoft 365 email and cloud storage.
- One Linux web server.
- One firewall.
- One SIEM or log-monitoring platform.

Include:

- Five roles and their required access.
- Two privileged roles and how they are protected.
- One service account and how its permissions are limited.
- One access review process.
- One joiner-mover-leaver process.
- A defense-in-depth map for protecting payroll data.
- At least one preventive, deterrent, detective, corrective, compensating, and directive control.
- At least one technical, managerial, operational, and physical control.

## 20. Assessment Questions

### Multiple Choice

1. What does authorization decide?
   A. Whether a user can prove an identity
   B. Whether a subject is allowed to perform an action on a resource
   C. Whether a password is complex
   D. Whether a system is encrypted

2. Which access control model assigns permissions primarily through job roles?
   A. DAC
   B. RBAC
   C. MAC
   D. Hashing

3. Which statement best describes least privilege?
   A. Give every user administrator access for convenience
   B. Give users only the access required for approved work
   C. Allow access if the user knows the password
   D. Remove all access from all users

4. Which is a privileged account?
   A. A guest account with no access
   B. A domain administrator account
   C. A read-only public website visitor
   D. A disabled former employee account

5. In Security+ SY0-701, which item is a control category?
   A. Directive
   B. Corrective
   C. Operational
   D. Deterrent

6. In Security+ SY0-701, which item is a control function?
   A. Technical
   B. Managerial
   C. Physical
   D. Directive

7. What is the purpose of defense in depth?
   A. To rely on one strong firewall only
   B. To use layered controls so one failure does not expose everything
   C. To remove the need for monitoring
   D. To make all users administrators

8. Which control is detective?
   A. SIEM alert for privileged group changes
   B. Locked server-room door
   C. Written acceptable use policy
   D. Firewall rule blocking inbound traffic

9. Which access problem is role creep?
   A. User loses access before starting work
   B. User accumulates old permissions after changing jobs
   C. User forgets a password
   D. User uses MFA successfully

10. Which is the best example of a compensating control?
    A. A policy that says users must protect passwords
    B. A warning sign beside a server room
    C. A firewall restriction used because a legacy system cannot be patched immediately
    D. A normal patch applied to a current system

### Short Answer

1. Distinguish identification, authentication, authorization, and accounting.
2. Explain why a successful login does not automatically mean access is appropriate.
3. Compare DAC, MAC, RBAC, rule-based access control, and ABAC.
4. Explain least privilege and give one Windows, one Linux, and one cloud example.
5. Explain defense in depth using at least four layers.

### Scenario Questions

1. A finance employee moves to Operations but keeps payroll folder access, VPN access, and approval rights in the payment system. Three months later, the account is compromised through phishing. Explain the access control failures, the business risk, the immediate containment steps, and the defense-in-depth improvements.

2. A healthcare organization uses a Linux server to store exported patient reports. The directory is readable by all local users, SSH password login is enabled, logs are not reviewed, and backups are stored on the same server. Explain the risks to confidentiality, integrity, and availability, then recommend layered controls that are practical for a small IT team.

## 21. Glossary

| Term | Definition |
|---|---|
| Access Control | The process of deciding whether a subject may perform an action on an object. |
| Accounting | Logging and tracking what users, systems, and processes do. |
| ABAC | Attribute-based access control, using attributes and conditions to make access decisions. |
| Authorization | The decision about what an authenticated subject is allowed to do. |
| Compensating Control | An alternative safeguard used when the preferred control is not feasible. |
| Defense in Depth | Layered security across people, process, and technology. |
| Detective Control | A control that identifies events during or after they occur. |
| Directive Control | A control function that tells people what must be done. |
| Least Privilege | Giving only the access needed for approved work. |
| Mandatory Access Control | Access controlled by centrally managed labels or policy. |
| Need to Know | Limiting information access to users with a legitimate business requirement. |
| Privileged Access | Elevated access that can administer systems, change security settings, or affect many users. |
| RBAC | Role-based access control, assigning permissions through job roles. |
| Separation of Duties | Dividing sensitive tasks so one person cannot complete a risky process alone. |
| Subject | The user, service, process, device, or workload requesting access. |

## 22. Lesson Review Checklist

Students should be able to confirm:

- I can explain access control from first principles.
- I can distinguish authentication from authorization.
- I can compare major access control models.
- I can identify excessive access and privileged access.
- I can explain least privilege, need to know, and separation of duties.
- I can classify Security+ control categories and functions correctly.
- I understand that directive is a control function, not a category.
- I can design layered defenses for identity, endpoint, network, application, data, monitoring, response, and governance.
- I can connect access failures to CIA impact and business risk.
- I can recommend practical controls for Windows, Linux, cloud, and hybrid environments.

## 23. Continuity With Future Lessons

Lesson 7 applies access control thinking to social engineering and phishing, where attackers attempt to trick users into revealing credentials, approving payments, or granting access.

Lessons 11 and 12 expand Linux permissions, users, groups, ACLs, ownership, and sudoers in greater practical detail. Lessons 17 through 20 expand Windows, Active Directory, IAM, RBAC, least privilege, PAM, and privileged-account protection. Later lessons reuse defense in depth for endpoint security, remote access, firewalls, segmentation, cloud, vulnerability management, SIEM, detection engineering, incident response, compliance, and the final capstone.
