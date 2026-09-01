# Lesson 19: Active Directory

## Lesson Overview

Active Directory Domain Services (AD DS) provides centralized identity, authentication, authorization, policy, and directory functions for many enterprise Windows environments. Its structure includes domains, forests, trusts, users, groups, organizational units, domain controllers, DNS, Kerberos, NTLM, LDAP, and Group Policy.

Because Active Directory controls access across the enterprise, compromise can affect nearly every system. This lesson explains the architecture from first principles and connects it to secure administration, monitoring, and incident response.

## Learning Objectives

Students will be able to:

- Explain domains, forests, domain controllers, and directory partitions.
- Describe trust direction and access implications.
- Manage conceptual user, computer, service, and group identities.
- Distinguish security and distribution groups and group scopes.
- Explain organizational units and delegated administration.
- Describe Kerberos tickets, keys, service principal names, and time requirements.
- Explain NTLM operation, limitations, and reduction strategy.
- Describe LDAP, LDAPS, directory queries, and binding.
- Explain Group Policy processing, inheritance, filtering, and security.
- Identify Active Directory attack paths, evidence, and defensive controls.

## Prerequisite Knowledge

Students should understand DNS, Windows SIDs, access tokens, ACLs, Windows Event Logs, server roles, authentication factors, least privilege, and credential security from Lessons 5, 17, and 18.

## Enterprise Relevance

Active Directory commonly controls:

- Workforce authentication.
- Workstation and server access.
- Administrative privilege.
- Group-based authorization.
- Security configuration.
- Software deployment.
- Service identities.
- File and application access.
- Hybrid identity synchronization.

An attacker who compromises privileged directory access may control identities, policy, authentication, and security tooling.

## 1. Active Directory Domain Services

AD DS is a directory service that stores objects and provides identity, authentication, authorization, policy, and discovery.

Enterprises need consistent identity and access decisions across many systems.

### How

Domain controllers store replicated directory data, authenticate principals, issue Kerberos tickets, process LDAP requests, publish services through DNS, and apply directory security.

### Where

AD DS operates in on-premises and hybrid environments and may integrate with Microsoft Entra ID, SaaS services, PKI, VPNs, applications, and Linux systems.

## 2. Directory Objects and Attributes

Objects represent:

- Users.
- Computers.
- Groups.
- Organizational units.
- Managed service accounts.
- Group Policy containers.
- Domain controllers.
- Contacts.
- Printers and other published resources.

Attributes hold properties such as name, SID, group membership, service principal names, and account state.

Every object has a distinguished name representing its location in the directory hierarchy, for example:

```text
CN=Amina Yusuf,OU=Finance,DC=corp,DC=example
```

Moving an object changes its distinguished name but not necessarily its SID or globally unique identifier.

## 3. Domains

A domain is an administrative, replication, authentication, and policy boundary within a forest.

It groups directory objects under a DNS namespace and common domain policies.

### How

Domain controllers replicate the domain partition and authenticate domain principals.

### Where

A forest may contain one or multiple domains. Modern designs often prefer fewer domains unless legal, administrative, namespace, or technical requirements justify more.

### Domain Is Not a Complete Security Boundary

The forest is the primary security boundary in traditional AD DS. Highly privileged forest roles and domain controllers can affect domains across the forest. Creating another domain in the same forest does not provide the isolation of a separate forest.

## 4. Forests

A forest is the top-level AD DS structure sharing:

- Schema.
- Configuration partition.
- Global Catalog.
- Trust relationships among its domains.

It creates a common directory and trust architecture.

### How

The first domain is the forest root. Additional domains share forest-wide structures and automatic transitive trusts.

### Where

Organizations may use one forest or multiple forests based on security isolation, mergers, legal boundaries, and operational requirements.

### Forest Security

Forest compromise may affect:

- Schema.
- Configuration.
- Cross-domain trust.
- Global Catalog.
- Enterprise-wide administrative roles.

Forest-level administrators and domain controllers require the highest protection tier.

## 5. Domain Controllers

A domain controller hosts AD DS and provides directory and authentication services.

Clients require trusted systems to validate identity and retrieve directory information.

### How

Domain controllers replicate changes through multi-master replication, subject to role-specific exceptions. They depend on DNS and accurate time.

### Where

Deploy based on site, availability, recovery, security, and network requirements.

### Security Practices

- Use dedicated role and administration.
- Restrict interactive logon.
- Apply hardened baselines.
- Patch rapidly.
- Protect backups.
- Monitor replication and authentication.
- Use privileged access workstations.
- Avoid unrelated applications.
- Maintain tested forest recovery procedures.

## 6. Directory Partitions and Global Catalog

| Partition | General Content |
|---|---|
| Domain | Objects for one domain |
| Configuration | Forest topology and service configuration |
| Schema | Object classes and attributes |
| Application | Optional application-specific replicated data |

The Global Catalog stores a full copy of local-domain objects and a partial attribute set for objects in other forest domains. It supports forest-wide searches and selected logon functions.

## 7. Trusts

A trust allows authentication from one domain or forest to be recognized for potential access in another.

Organizations need controlled access across domains, forests, mergers, partners, or legacy environments.

### How

The trusting side accepts authentication from the trusted side. Authorization is still required on the target resource.

### Where

Trusts can exist within a forest or between domains and forests.

## 8. Trust Direction

If Domain A trusts Domain B:

- Domain A is the trusting domain.
- Domain B is the trusted domain.
- Users from B may be granted access to resources in A.

A trust does not automatically grant access. It allows authentication to be considered; resource ACLs and other controls determine authorization.

### Trust Characteristics

| Characteristic | Meaning |
|---|---|
| One-way | Trust operates in one direction |
| Two-way | Each side trusts the other |
| Transitive | Trust can extend through related trust paths |
| Non-transitive | Trust is limited to specified domains |
| Forest trust | Connects supported forest trust relationships |
| External trust | Connects selected domains, commonly non-transitive |

### Trust Security

- Document business purpose.
- Limit scope and duration.
- Review SID filtering and authentication scope.
- Monitor cross-boundary logons.
- Protect trust credentials.
- Remove obsolete trusts.
- Treat compromised trusted environments as risk to trusting resources.

## 9. Users and Computers

### User Accounts

Represent human or service identities. Security depends on lifecycle, authentication, group membership, delegation, and monitoring.

### Computer Accounts

Represent domain-joined systems and maintain a machine-account secret with the domain.

### Service Accounts

Run applications or services. Prefer managed service accounts where supported to reduce manual password handling.

### Account Controls

- Disable rather than immediately delete during investigation or controlled offboarding.
- Set expiration for temporary accounts.
- Separate standard and administrative identities.
- Avoid shared accounts.
- Protect privileged accounts with stronger authentication and workstations.
- Review stale accounts and service principal names.

## 10. Groups

Groups assign permissions, roles, communication, and policy to collections of principals.

Group-based authorization scales better than direct user permissions.

### How

Security groups appear in access tokens and can receive permissions. Distribution groups are intended for communication and are not security principals for ACL authorization.

### Where

Groups control files, applications, servers, delegation, remote access, and administrative privilege.

## 11. Group Scopes

| Scope | Typical Membership | Typical Permission Use |
|---|---|---|
| Global | Accounts and global groups from same domain | Represent role or department |
| Domain Local | Accounts and groups from trusted domains, subject to rules | Grant access to resources in its domain |
| Universal | Accounts and groups across forest domains, subject to rules | Forest-wide role where justified |

A common model is:

```text
Accounts -> Global role group -> Domain Local resource group -> Permission
```

This is often summarized as AGDLP. In multi-domain designs, universal groups may extend the pattern.

### Group Risks

- Nested privilege is difficult to see.
- Stale members retain access.
- Protected administrative groups create high impact.
- Group membership may not affect existing tokens until a new logon.
- Universal group changes can increase replication impact.

## 12. Organizational Units

An organizational unit (OU) is a directory container used to organize objects, delegate administration, and link Group Policy.

OUs allow policy and delegated management aligned with technical administration.

### How

Objects are placed in OUs, permissions are delegated through ACLs, and GPOs are linked.

### Where

OU design may reflect device types, administrative teams, security tiers, locations, or management requirements.

### OU Limitations

- OUs are not security groups.
- Moving an object can change policy.
- Geographic structure is not always the best administrative design.
- Excessive depth complicates inheritance.
- Delegated permissions can create indirect privilege.

## 13. Delegation of Control

Delegation grants limited rights to administer selected objects or attributes.

Examples:

- Help desk resets passwords for standard users.
- Desktop team joins approved computers.
- HR updates selected user attributes.

Security requirements:

- Delegate to groups, not individuals.
- Grant specific rights on specific OUs.
- Separate privileged accounts.
- Audit changes.
- Review inherited and effective permissions.
- Test whether delegated rights enable privilege escalation.

A password-reset right over a privileged user is privileged access even if the delegate is not a domain administrator.

## 14. Kerberos

Kerberos is the preferred AD DS authentication protocol for supported domain scenarios. It uses tickets and symmetric cryptography.

It enables centralized authentication without sending the user's password to every service.

### How

Key components:

- Client.
- Key Distribution Center (KDC).
- Authentication Service.
- Ticket-Granting Service.
- Ticket-Granting Ticket (TGT).
- Service ticket.
- Service Principal Name (SPN).

The KDC role is performed by domain controllers.

## 15. Kerberos Flow

Simplified flow:

1. User proves knowledge associated with the account during initial authentication.
2. KDC issues a TGT.
3. Client presents TGT when requesting access to a named service.
4. Ticket-Granting Service issues a service ticket for the SPN.
5. Client presents service ticket to the service.
6. Service validates it using its account key.
7. Authorization occurs using the resulting identity and access token.

The service ticket is not authorization by itself. The service and operating system still evaluate permissions.

## 16. Kerberos Requirements

- Correct DNS.
- Accurate time within policy tolerance.
- Reachable domain controllers.
- Unique and correct SPNs.
- Healthy machine and service-account secrets.
- Supported encryption and policy.
- Trust path where cross-domain access occurs.

Duplicate or missing SPNs can cause authentication failure or fallback.

## 17. Kerberos Security

Threats include:

- Ticket theft.
- Password-derived key cracking for selected service accounts.
- Forged tickets after high-value key compromise.
- Delegation abuse.
- Kerberoasting.
- AS-REP roasting where preauthentication is disabled.

Defenses:

- Strong managed service-account secrets.
- gMSA where suitable.
- Modern encryption settings.
- Privileged-tier separation.
- Credential Guard and endpoint protections where supported.
- Limit delegation.
- Monitor ticket anomalies.
- Protect domain controllers and high-value account keys.

## 18. NTLM

NTLM is a challenge-response authentication family retained for compatibility.

Legacy systems and scenarios without suitable Kerberos conditions may depend on it.

### How

The client proves knowledge of password-derived material through a challenge-response process. The password itself is not sent in plaintext, but captured challenge-response material may be relayed or attacked offline in some conditions.

### Where

NTLM can appear with local accounts, IP-address access, legacy applications, workgroups, broken SPNs, and fallback scenarios.

## 19. NTLM Risks and Reduction

Risks:

- Relay attacks.
- Weak legacy versions.
- Lack of mutual authentication in many scenarios.
- Credential material exposure.
- Hidden application dependencies.

Reduction process:

1. Audit NTLM usage.
2. Identify applications and identities.
3. Correct DNS and SPNs.
4. Remove old protocol dependencies.
5. Apply SMB and LDAP protections.
6. Restrict NTLM in stages.
7. Monitor failures and exceptions.

Disabling NTLM without discovery can interrupt critical legacy applications.

## 20. Kerberos and NTLM Comparison

| Characteristic | Kerberos | NTLM |
|---|---|---|
| Core model | Ticket-based | Challenge-response |
| Preferred in domain | Yes | Compatibility or fallback |
| Service identity | SPN-based | Target and protocol context |
| Mutual authentication | Supported | Limited in common use |
| Time sensitivity | Significant | Less central |
| Main risks | Ticket/key theft, delegation, service-account cracking | Relay, offline attack, legacy weakness |

## 21. LDAP

Lightweight Directory Access Protocol (LDAP) is used to query and modify directory information.

Applications and administrators need structured directory access.

### How

LDAP operations include:

- Bind.
- Search.
- Add.
- Modify.
- Delete.
- Compare.

### Where

LDAP is used by management tools, applications, identity integrations, Linux clients, and security tools.

## 22. LDAP Names and Filters

Distinguished name:

```text
CN=Amina Yusuf,OU=Finance,DC=corp,DC=example
```

Conceptual filter:

```text
(&(objectClass=user)(sAMAccountName=amina))
```

Applications must safely construct filters using supported APIs and escaping. LDAP injection can occur when untrusted values alter filter meaning.

## 23. LDAP Security

LDAP can be protected through:

- TLS-protected LDAP.
- StartTLS where properly implemented.
- SASL and integrated authentication.
- LDAP signing.
- Channel binding where supported.
- Least-privileged bind accounts.
- Restricted network access.

Avoid:

- Simple bind credentials over unprotected transport.
- Broad directory read or write accounts.
- Hard-coded bind passwords.
- Anonymous access without explicit need.
- Disabling certificate validation.

LDAPS commonly refers to LDAP over TLS from connection establishment. Security depends on certificate validation and configuration, not only the port number.

## 24. Group Policy

Group Policy centrally configures users and computers through Group Policy Objects (GPOs).

Enterprises need repeatable settings for security, software, scripts, firewall, auditing, and operating-system behavior.

### How

GPOs are linked to sites, domains, or OUs. Clients process applicable policy based on location, inheritance, security filtering, WMI filtering where used, and policy rules.

### Where

Group Policy applies to domain-joined Windows systems and users.

## 25. Group Policy Processing

A common order is:

```text
Local -> Site -> Domain -> OU hierarchy
```

Often summarized as LSDOU.

Later applicable settings commonly take precedence for conflicts, subject to:

- Enforced links.
- Block inheritance.
- Security filtering.
- Loopback processing.
- WMI filters.
- Setting-specific behavior.

Not every policy setting behaves as a simple overwrite.

## 26. GPO Components

A GPO has:

- Group Policy Container in Active Directory.
- Group Policy Template in SYSVOL.

Healthy replication of both is required. Permission or replication mismatch can create inconsistent policy.

Useful tools:

```powershell
gpresult /h C:\Temp\gpresult.html
gpupdate /force
Get-GPO -All
Get-GPResultantSetOfPolicy -ReportType Html -Path C:\Temp\rsop.html
```

Use `gpupdate /force` carefully because scripts, software, and security settings may have operational effects.

## 27. Group Policy Security

Risks:

- Excessive GPO edit rights.
- Startup script modification.
- Weak SYSVOL permissions.
- Policy disabling security controls.
- Broad local administrator assignment.
- Unsafe scheduled tasks or preferences.
- Uncontrolled link changes.

Controls:

- Restrict GPO creation, edit, and link rights.
- Separate privileged policy administration.
- Back up GPOs.
- Audit changes.
- Review resultant policy.
- Test in staged OUs.
- Monitor SYSVOL integrity.
- Maintain rollback.

## 28. Active Directory Administrative Tiers

A practical tiering model separates:

- Directory and identity control plane.
- Server and application administration.
- Workstation and user administration.

Privileged credentials should not be entered into lower-trust systems. A domain administrator logging on to an ordinary workstation can expose credentials or tokens to endpoint compromise.

Modern enterprise designs may use privileged access workstations, just-in-time access, authentication policies, and other controls instead of relying on one static tier model.

## 29. Active Directory Attack Paths

Attack paths may involve:

- Excessive group membership.
- Delegated password reset.
- Writable GPO.
- Service account with weak password.
- Local administrator reuse.
- Unconstrained or unsafe delegation.
- Trust misconfiguration.
- Certificate-service misconfiguration.
- Synchronization or hybrid identity privilege.
- Domain controller compromise.

Security requires evaluating effective privilege, not only direct group membership.

## 30. Important Evidence

| Evidence | Use |
|---|---|
| Domain controller Security logs | Authentication and account changes |
| Directory Service logs | Directory health and selected events |
| DNS logs | Service discovery and record changes |
| Group Policy operational logs | Policy processing |
| PowerShell logs | Administrative commands |
| Replication health | Consistency and compromise indicators |
| Endpoint EDR | Credential and process behavior |
| Cloud identity logs | Hybrid access and synchronization |

Common Security events include account creation, group change, logon, Kerberos ticket activity, directory-object changes when auditing is configured, and audit-policy changes.

## 31. Enterprise Scenarios

### Small Business

All IT staff use Domain Admin accounts for daily work. The organization creates separate accounts, delegates routine tasks, protects domain controllers, and reviews privileged logons.

### Financial Institution

A service account with a weak static password is targeted for Kerberoasting. The bank migrates supported services to gMSA, rotates credentials, and monitors ticket requests.

### Healthcare Organization

A help-desk group can reset passwords in an OU containing privileged clinical administrators. Delegation is redesigned into separate OUs and scopes.

### Educational Institution

A GPO linked to student labs accidentally applies to administrative computers. Staged OUs, security filtering, resultant-policy testing, and rollback correct the design.

### Government Agency

An obsolete external trust remains after a project ends. The agency reviews cross-trust authentication, removes permissions, disables the trust under change control, and monitors failures.

### Hybrid Environment

An on-premises privileged account synchronizes unexpectedly to cloud identity. Teams review synchronization scope, role assignments, sign-ins, and hybrid privilege paths.

## 32. Troubleshooting Authentication

1. Confirm client time.
2. Confirm DNS server and domain records.
3. Confirm domain controller reachability.
4. Identify user, computer, and service account state.
5. Identify expected protocol.
6. Check SPN for Kerberos.
7. Inspect ticket state and relevant events.
8. Check trust path.
9. Check service and resource authorization.
10. Avoid clearing evidence before collection.

Useful commands:

```powershell
klist
whoami /all
nltest /dsgetdc:corp.example
Resolve-DnsName _kerberos._tcp.dc._msdcs.corp.example -Type SRV
```

Purging tickets may change behavior and evidence; use only as an approved troubleshooting step.

## 33. Security+ SY0-701 Alignment

This lesson supports identity providers, centralized authentication, Kerberos, LDAP, legacy authentication, trusts, groups, least privilege, delegation, Group Policy, secure administration, and monitoring.

Directory ACLs, Kerberos policy, LDAP signing, and GPO settings are technical controls. Account lifecycle, access review, trust review, and recovery are operational controls. Identity and Group Policy standards are managerial controls and directive in function.

## 34. Classroom Hands-On Practical

### Practical Title

Analyze Active Directory Structure, Authentication, and Policy

### Safety

Use an instructor-provided isolated domain. Do not modify privileged groups, trusts, domain-controller policy, or production identity.

### Tasks

1. Draw the forest, domain, domain controllers, DNS namespace, and OUs.
2. Inspect three fictional users and two computers.
3. Trace one user's nested group membership.
4. Map role group to resource permission using AGDLP.
5. Inspect one delegated OU permission.
6. Use `klist` to identify TGT and service-ticket concepts.
7. Query domain-controller SRV records.
8. Compare a Kerberos and NTLM scenario.
9. Generate a resultant-policy report for a lab workstation.
10. Review provided authentication and group-change events.

### Evidence Table

| Question | Evidence | Finding | Security Impact |
|---|---|---|---|
| Which groups grant access? | Membership and ACL |  |  |
| Which protocol was used? | Ticket and event evidence |  |  |
| Which GPO applied? | Resultant policy |  |  |
| Is delegation excessive? | OU ACL |  |  |

### Required Analysis

- Identify one indirect privilege path.
- Explain trust direction separately from access.
- Explain why DNS and time affect Kerberos.
- Recommend a least-privilege correction.
- Identify rollback and validation for a GPO change.

## 35. Take-Home Practical

Design an Active Directory security model for one organization. Include:

- Forest and domain rationale.
- Domain-controller placement and protection.
- OU design.
- User, computer, and service-account lifecycle.
- Group strategy.
- Delegation model.
- Kerberos requirements.
- NTLM reduction plan.
- LDAP protection.
- GPO testing, backup, and change control.
- Ten detections.
- Forest-recovery requirements.

## 36. Assessment Questions

### Multiple Choice

1. What is the primary traditional AD DS security boundary?
   A. Forest
   B. OU
   C. Group
   D. Workstation

2. What does a trust provide?
   A. Recognition of authentication for potential cross-boundary access
   B. Automatic authorization to every resource
   C. File encryption
   D. DHCP allocation

3. Which group type can receive ACL permissions?
   A. Security group
   B. Distribution group only
   C. Contact
   D. OU

4. What is an OU primarily used for?
   A. Organization, delegation, and Group Policy scope
   B. Replacing security groups
   C. Encrypting Kerberos tickets
   D. DNS recursion

5. What does a TGT allow a client to request?
   A. Service tickets
   B. DHCP leases
   C. Registry values
   D. File hashes

6. Which Kerberos element identifies a service instance?
   A. SPN
   B. SID history only
   C. GPO link
   D. DHCP option

7. Why is NTLM relay a concern?
   A. Captured authentication can be forwarded to another accepting service
   B. NTLM always sends plaintext passwords
   C. NTLM is a firewall
   D. NTLM signs every LDAP session automatically

8. What is unsafe?
   A. Simple LDAP bind credentials over unprotected transport
   B. Validated TLS-protected LDAP
   C. Least-privileged bind account
   D. Restricted directory access

9. What does LSDOU describe?
   A. Common Group Policy processing order
   B. Kerberos ticket sequence
   C. DHCP allocation
   D. Trust direction

10. Which is an operational control?
    A. Quarterly privileged-group review
    B. LDAP signing setting
    C. Kerberos encryption
    D. Directory ACL enforcement

### Short Answer

1. Distinguish domains, forests, and OUs.
2. Explain trust direction and authorization.
3. Compare security and distribution groups.
4. Explain global, domain local, and universal scopes.
5. Describe the Kerberos ticket flow.
6. Compare Kerberos and NTLM.
7. Explain LDAP security requirements.
8. Describe Group Policy processing and conflict factors.

### Scenario Questions

1. A help-desk group can reset a Domain Admin password. Explain the privilege path and correction.
2. A service falls back from Kerberos to NTLM. Describe troubleshooting.
3. A GPO disables Defender on servers. Describe containment, evidence, rollback, and investigation.
4. A trust to a former partner remains active. Describe risk review and retirement.
5. A domain administrator logged onto a compromised workstation. Describe credential-risk response.

## 37. Glossary

| Term | Definition |
|---|---|
| Active Directory Domain Services | Directory service providing centralized identity, authentication, authorization, and policy. |
| Domain | AD DS administrative, replication, authentication, and policy structure within a forest. |
| Domain Controller | Server hosting AD DS and authentication functions. |
| Forest | Top-level AD DS structure sharing schema, configuration, catalog, and trust architecture. |
| Global Catalog | Forest-wide searchable catalog containing full local and partial other-domain object attributes. |
| GPO | Group Policy Object containing user and computer policy settings. |
| Kerberos | Ticket-based authentication protocol preferred in supported domain scenarios. |
| LDAP | Protocol for querying and modifying directory information. |
| NTLM | Challenge-response authentication family retained for compatibility. |
| Organizational Unit | Container used for organization, delegation, and Group Policy scope. |
| Service Principal Name | Identifier mapping a service instance to an account for Kerberos. |
| TGT | Kerberos ticket used to request service tickets. |
| Trust | Relationship allowing authentication recognition across directory boundaries. |

## 38. Lesson Review Checklist

- I can explain domains, forests, domain controllers, and partitions.
- I can interpret trust direction and access.
- I can design users, groups, OUs, and delegation.
- I can explain Kerberos and troubleshoot its dependencies.
- I can explain NTLM risk and staged reduction.
- I can secure LDAP.
- I can analyze Group Policy processing and privilege.
- I can identify indirect Active Directory attack paths.

## 39. Continuity With Future Lessons

Lesson 20 applies identity and access management principles across Active Directory, cloud, SaaS, applications, and privileged access.

Students should retain:

- Effective privilege includes nested groups, delegation, trusts, GPO rights, and service identities.
- Authentication does not equal authorization.
- DNS, time, SPNs, and domain-controller health affect Kerberos.
- Legacy authentication must be discovered before restriction.
- Identity control-plane systems require the strongest administrative protection.
