# Course Memory

This file tracks lesson continuity, introduced terminology, recurring examples, and completed deliverables.

## Practical Consolidation Deliverable

The 40 lessons are consolidated by the completed programme in `practicals/`:

- `practicals/README.md`: common isolated range, free-tool inventory, evidence standard, safety, troubleshooting, and assessment.
- `practicals/TOOL_MASTERY_GUIDE.md`: mandatory/optional coverage matrix and detailed command packs for network tools, Sysmon, osquery, BloodHound CE, YARA, Chainsaw, Sleuth Kit/Autopsy, Velociraptor, MISP, password auditing, Git/Gitleaks, Trivy, OpenTofu, and Ansible.
- `practicals/labs/`: 15 detailed guided labs with commands, explanations, validation, rollback, troubleshooting, deliverables, and professional decision questions.
- `practicals/projects/`: 10 multi-stage scenario projects with business constraints, injects, technical checkpoints, acceptance gates, and reporting requirements.
- `practicals/templates/README.md`: scope, change, finding, risk, incident, test, executive update, and evidence forms.

Windows Server and Windows 11 are used only as official time-limited evaluation software. Vulnerable systems remain isolated, and all identities/data are synthetic.

## Completed Lessons

| Lesson | Title | Status | File |
|---|---|---|---|
| 1 | Security Fundamentals | Complete | `lessons/lesson-01-security-fundamentals.md` |
| 2 | Threat Landscape | Complete | `lessons/lesson-02-threat-landscape.md` |
| 3 | The Security Profession | Complete | `lessons/lesson-03-the-security-profession.md` |
| 4 | Cryptography Fundamentals | Complete | `lessons/lesson-04-cryptography-fundamentals.md` |
| 5 | Authentication and Identity | Complete | `lessons/lesson-05-authentication-and-identity.md` |
| 6 | Applied Cryptography | Complete | `lessons/lesson-06-applied-cryptography.md` |
| 7 | Social Engineering | Complete | `lessons/lesson-07-social-engineering.md` |
| 8 | Network and System Attacks | Complete | `lessons/lesson-08-network-and-system-attacks.md` |
| 9 | Web Attacks and Malware | Complete | `lessons/lesson-09-web-attacks-and-malware.md` |
| 10 | Virtualization Fundamentals | Complete | `lessons/lesson-10-virtualization-fundamentals.md` |
| 11 | Linux Fundamentals | Complete | `lessons/lesson-11-linux-fundamentals.md` |
| 12 | Users, Groups and Permissions | Complete | `lessons/lesson-12-users-groups-and-permissions.md` |
| 13 | Linux Logging and Services | Complete | `lessons/lesson-13-linux-logging-and-services.md` |
| 14 | Linux Hardening | Complete | `lessons/lesson-14-linux-hardening.md` |
| 15 | Bash and Python Basics | Complete | `lessons/lesson-15-bash-and-python-basics.md` |
| 16 | Linux Networking | Complete | `lessons/lesson-16-linux-networking.md` |
| 17 | Windows Fundamentals | Complete | `lessons/lesson-17-windows-fundamentals.md` |
| 18 | Windows Server | Complete | `lessons/lesson-18-windows-server.md` |
| 19 | Active Directory | Complete | `lessons/lesson-19-active-directory.md` |
| 20 | IAM Fundamentals | Complete | `lessons/lesson-20-iam-fundamentals.md` |
| 21 | Endpoint Security | Complete | `lessons/lesson-21-endpoint-security.md` |
| 22 | Remote Access and VPN | Complete | `lessons/lesson-22-remote-access-and-vpn.md` |
| 23 | Firewall and pfSense | Complete | `lessons/lesson-23-firewall-and-pfsense.md` |
| 24 | Network Segmentation | Complete | `lessons/lesson-24-network-segmentation.md` |
| 25 | IDS and IPS | Complete | `lessons/lesson-25-ids-and-ips.md` |
| 26 | Cloud Fundamentals | Complete | `lessons/lesson-26-cloud-fundamentals.md` |
| 27 | Asset Discovery | Complete | `lessons/lesson-27-asset-discovery.md` |
| 28 | Vulnerability Assessment | Complete | `lessons/lesson-28-vulnerability-assessment.md` |
| 29 | Remediation and Reporting | Complete | `lessons/lesson-29-remediation-and-reporting.md` |
| 30 | SIEM Fundamentals | Complete | `lessons/lesson-30-siem-fundamentals.md` |
| 31 | Wazuh in Practice | Complete | `lessons/lesson-31-wazuh-in-practice.md` |
| 32 | Detection Engineering | Complete | `lessons/lesson-32-detection-engineering.md` |
| 33 | Incident Response | Complete | `lessons/lesson-33-incident-response.md` |
| 34 | Threat Intelligence | Complete | `lessons/lesson-34-threat-intelligence.md` |
| 35 | Forensics Fundamentals | Complete | `lessons/lesson-35-forensics-fundamentals.md` |
| 36 | Risk Assessment | Complete | `lessons/lesson-36-risk-assessment.md` |
| 37 | Compliance Frameworks | Complete | `lessons/lesson-37-compliance-frameworks.md` |
| 38 | Career and Professional Skills | Complete | `lessons/lesson-38-career-and-professional-skills.md` |
| 39 | Integration Review | Complete | `lessons/lesson-39-integration-review.md` |
| 40 | Capstone Investigation | Complete | `lessons/lesson-40-capstone-investigation.md` |

## Concepts Introduced

| Concept | First Introduced | Notes |
|---|---:|---|
| CIA Triad | Lesson 1 | Confidentiality, integrity, and availability as the foundation of security objectives. |
| Risk | Lesson 1 | Explained as the possibility of loss when threats exploit vulnerabilities and affect business operations. |
| Threat | Lesson 1 | Explained as a potential cause of harm, including human, technical, environmental, and process-driven sources. |
| Vulnerability | Lesson 1 | Explained as a weakness in technology, people, process, or configuration. |
| Security Control | Lesson 1 | Explained as a safeguard used to reduce risk; Security+ SY0-701 taxonomy will be followed henceforth. |
| Technical Control | Lesson 1 | Defined as a control implemented through hardware, software, or automated technology. |
| Managerial Control | Lesson 1 | Defined as a control implemented through governance, oversight, risk management, planning, policy approval, and leadership decision-making. |
| Operational Control | Lesson 1 | Defined as a control implemented through people-driven procedures and day-to-day security operations. |
| Physical Control | Lesson 1 | Defined as a control that protects facilities, equipment, and physical access. |
| Directive Control | Lesson 1 | Defined as a control function that instructs people to follow required security behavior. |
| Defense in Depth | Lesson 1 | Explained as layered security across people, process, and technology. |
| Attack Surface | Lesson 1 | Explained as all exposed points that could be targeted by an attacker. |
| Risk Formula | Lesson 1 | Taught conceptually as Threat x Vulnerability x Impact, with business context. |
| Threat Landscape | Lesson 2 | Defined as the collection of threats affecting an organization, industry, technology, region, or process. |
| Malware | Lesson 2 | Defined as malicious software designed to harm systems, steal data, disrupt operations, or support unauthorized access. |
| Threat Actor | Lesson 2 | Defined as a person, group, or organization capable of causing cyber harm. |
| Advanced Persistent Threat | Lesson 2 | Defined as a capable and persistent actor or campaign conducting targeted long-term operations. |
| Cyber Kill Chain | Lesson 2 | Taught as a high-level model for intrusion stages. |
| MITRE ATT&CK Tactic | Lesson 2 | Defined as the attacker's tactical goal. |
| MITRE ATT&CK Technique | Lesson 2 | Defined as the method used to achieve a tactic. |
| SOC Analyst | Lesson 3 | Defined as a security operations professional who monitors, triages, and escalates security alerts. |
| Cybersecurity Analyst | Lesson 3 | Defined as a broad role connecting alerts, vulnerabilities, controls, incidents, and risk. |
| Security Administrator | Lesson 3 | Defined as a professional who configures and maintains security controls and tools. |
| Systems Administrator | Lesson 3 | Defined as a professional managing systems, accounts, patches, services, and IT operations with security responsibility. |
| Vulnerability Management Analyst | Lesson 3 | Defined as a professional who identifies, prioritizes, tracks, and validates vulnerability remediation. |
| Incident Responder | Lesson 3 | Defined as a professional who investigates, contains, coordinates, and documents security incidents. |
| IAM Analyst | Lesson 3 | Defined as a professional focused on identity, access, account lifecycle, and privileges. |
| GRC Analyst | Lesson 3 | Defined as a professional focused on governance, risk, compliance, policies, audits, and evidence. |
| Career Path | Lesson 3 | Defined as a planned progression of skills, roles, experience, and certifications. |
| Certification Roadmap | Lesson 3 | Defined as a sequence of certifications aligned to goals and skill level. |
| Continuous Learning | Lesson 3 | Defined as ongoing improvement of technical, professional, and security knowledge. |
| Portfolio | Lesson 3 | Defined as practical evidence of skill, projects, and professional growth. |
| Cryptography | Lesson 4 | Introduced as mathematical techniques supporting confidentiality, integrity, authentication, and non-repudiation. |
| Hashing | Lesson 4 | Defined as a one-way process producing a fixed-length digest; distinguished from encryption. |
| Symmetric Encryption | Lesson 4 | Defined as efficient encryption using a shared secret key. |
| Asymmetric Cryptography | Lesson 4 | Defined through related public and private keys used for authentication, signatures, and key establishment. |
| Digital Signature | Lesson 4 | Explained as private-key signing and public-key verification supporting integrity and authentication. |
| PKI | Lesson 4 | Defined as the people, policies, processes, hardware, software, and services managing certificate trust. |
| TLS | Lesson 4 | Explained as network communication protection providing authentication, confidentiality, and integrity. |
| Digital Certificate | Lesson 4 | Defined as a signed document binding a public key to a subject. |
| Data at Rest | Lesson 4 | Defined as data stored on media. |
| Data in Transit | Lesson 4 | Defined as data moving between systems or services. |
| Key Management | Lesson 4 | Explained across generation, distribution, storage, use, rotation, recovery, revocation, and destruction. |
| Authentication Factors | Lesson 5 | Classified as knowledge, possession, inherence, location, and behavior; independent categories required for MFA. |
| Multifactor Authentication | Lesson 5 | Explained with method strengths, phishing resistance, MFA fatigue, enrollment, and recovery risks. |
| Single Sign-On | Lesson 5 | Defined as central authentication for connected applications through protected assertions or tokens. |
| Federation | Lesson 5 | Defined as cross-domain identity trust involving an identity provider and relying service. |
| Token-Based Authentication | Lesson 5 | Covered access, ID, refresh, session, and reset tokens with validation and protection requirements. |
| Password Storage | Lesson 5 | Explained with unique salts, password-specific derivation functions, work factors, and optional peppers. |
| Credential Security | Lesson 5 | Covered enrollment, use, storage, reset, revocation, offboarding, and monitoring. |
| Conditional Access | Lesson 5 | Introduced as context-aware access decisions based on identity, device, application, location, and risk. |
| SPF | Lesson 6 | Defined as DNS-published authorization of sending infrastructure for an SMTP envelope domain. |
| DKIM | Lesson 6 | Defined as domain-controlled digital signing of selected email headers and body content. |
| DMARC | Lesson 6 | Defined as aligned email authentication policy and reporting based on SPF or DKIM. |
| HTTPS | Lesson 6 | Applied TLS to practical web, API, proxy, load balancer, and back-end protection. |
| Certificate Lifecycle | Lesson 6 | Expanded into inventory, ownership, request, issuance, deployment, monitoring, renewal, revocation, and retirement. |
| Encryption Failure | Lesson 6 | Classified failures involving absent or weak protection, trust, keys, configuration, randomness, expiration, and availability. |
| Social Engineering | Lesson 7 | Defined as manipulation causing disclosure, payment, access, or unsafe action; taught without victim blame. |
| Phishing | Lesson 7 | Covered bulk, spear, whaling, smishing, QR, angler, and clone variants. |
| Business Email Compromise | Lesson 7 | Explained through executive, supplier, payroll, and conversation-hijacking fraud. |
| Vishing | Lesson 7 | Defined as voice-based social engineering with trusted-channel callback defenses. |
| Pretexting | Lesson 7 | Defined as a constructed identity and scenario used to justify a deceptive request. |
| Email Header Analysis | Lesson 7 | Structured analysis of identity, routing, authentication, URLs, attachments, and business context. |
| Reconnaissance | Lesson 8 | Distinguished as passive or active information gathering. |
| Port Scanning | Lesson 8 | Defined as probing to identify reachable ports and services. |
| Enumeration | Lesson 8 | Distinguished from scanning as detailed protocol-specific information collection. |
| ARP Spoofing | Lesson 8 | Explained as deceptive local IPv4-to-MAC mapping. |
| DNS Poisoning | Lesson 8 | Covered resolver, authoritative, registrar, endpoint, and DHCP-related paths. |
| Man-in-the-Middle | Lesson 8 | Explained as interception or modification between communicating parties. |
| DDoS | Lesson 8 | Classified as volumetric, protocol/state, application-layer, and reflection/amplification. |
| OWASP Top 10 | Lesson 9 | Introduced as an application-risk awareness framework rather than a complete testing standard. |
| SQL Injection | Lesson 9 | Explained as untrusted input altering database query structure. |
| XSS | Lesson 9 | Covered stored, reflected, and DOM-based browser execution. |
| CSRF | Lesson 9 | Explained as abuse of a browser's authenticated session. |
| Command Injection | Lesson 9 | Explained as untrusted input altering operating-system command execution. |
| Trojan | Lesson 9 | Defined as malware disguised as or bundled with legitimate content. |
| Ransomware | Lesson 9 | Covered access, movement, exfiltration, encryption, extortion, and recovery. |
| Persistence | Lesson 9 | Covered Windows, Linux, web, Active Directory, and cloud mechanisms. |
| IOC and IOA | Lesson 9 | Distinguished fixed or observable artifacts from behavior and intent. |
| Virtualization | Lesson 10 | Defined as abstraction of computing resources into software-defined systems. |
| Hypervisor | Lesson 10 | Distinguished Type 1 bare-metal and Type 2 hosted platforms. |
| Snapshot | Lesson 10 | Defined as point-in-time state for reversion and explicitly distinguished from backup. |
| NAT Networking | Lesson 10 | Explained as translated outbound connectivity, not complete isolation. |
| Bridged Networking | Lesson 10 | Explained as direct physical-LAN presence with elevated lab exposure. |
| Host-Only Networking | Lesson 10 | Established as the default isolated course-lab network. |
| Linux Filesystem Hierarchy | Lesson 11 | Covered root, configuration, logs, users, temporary data, devices, process, and software paths. |
| Linux Package Management | Lesson 11 | Introduced APT and DNF with repository and patch-security practices. |
| Linux Process Management | Lesson 11 | Covered PID, PPID, ownership, states, inspection, signals, and evidence concerns. |
| Linux File Permissions | Lesson 11 | Introduced user, group, other, symbolic, and numeric permissions for files and directories. |
| Linux Account Lifecycle | Lesson 12 | Covered provisioning, modification, locking, offboarding, data transfer, and retirement. |
| Linux Groups | Lesson 12 | Distinguished primary and supplementary groups with safe membership administration. |
| Linux Ownership | Lesson 12 | Expanded user and group ownership using chown and chgrp. |
| POSIX ACLs | Lesson 12 | Covered named entries, default ACLs, masks, effective permissions, and troubleshooting. |
| sudoers | Lesson 12 | Covered least-privilege command rules, indirect privilege, and visudo validation. |
| Special Permission Bits | Lesson 12 | Covered setuid, setgid, and sticky-bit behavior and risk. |
| Syslog | Lesson 13 | Covered facilities, severities, routing, local storage, and forwarding. |
| systemd Journal | Lesson 13 | Covered structured records, persistence, filtering, and journalctl. |
| Linux Services | Lesson 13 | Covered systemd unit state, startup, management, security, and troubleshooting. |
| Cron Jobs | Lesson 13 | Covered syntax, locations, environment, privilege, review, and persistence risk. |
| Log Interpretation | Lesson 13 | Established evidence-driven timeline, correlation, and hypothesis practices. |
| Linux Hardening | Lesson 14 | Established risk-based assessment, testing, implementation, validation, rollback, and drift monitoring. |
| SSH Hardening | Lesson 14 | Covered authentication, root access, user restrictions, forwarding, key security, testing, and recovery. |
| UFW | Lesson 14 | Covered host firewall defaults, scoped rules, logging, IPv4/IPv6, and lockout prevention. |
| Fail2Ban | Lesson 14 | Covered filters, jails, actions, thresholds, false positives, and limitations. |
| auditd | Lesson 14 | Introduced Linux Audit architecture, runtime rules, searching, volume, and evidence. |
| Security Baseline | Lesson 14 | Distinguished baseline, guide, build standard, exception, and configuration drift. |
| CIS Benchmark | Lesson 14 | Introduced profiles, applicability, tailoring, validation, and exception handling. |
| Security Scripting | Lesson 15 | Covered authorization, validation, dry run, error handling, review, deployment, and rollback. |
| Variables, Loops, Conditionals, Functions | Lesson 15 | Introduced in both Bash and Python with security examples. |
| Regular Expressions | Lesson 15 | Introduced for text matching with syntax, validation, performance, and parsing limitations. |
| Log Parsing | Lesson 15 | Implemented as copied-log analysis with malformed-input and evidence-preservation requirements. |
| Linux Network Interfaces | Lesson 16 | Covered link state, IPv4/IPv6 addressing, routes, neighbor state, and layered troubleshooting. |
| Linux Sockets | Lesson 16 | Covered listener and connection state with netstat and ss. |
| dig | Lesson 16 | Expanded into DNS status, answer, TTL, resolver, reverse, trace, and trust interpretation. |
| curl | Lesson 16 | Covered HTTP/HTTPS testing, redirects, TLS validation, timeouts, errors, and credential safety. |
| SSH Tunneling | Lesson 16 | Distinguished local, remote, and dynamic forwarding with security and detection concerns. |
| Samba | Lesson 16 | Covered architecture, identity, share and filesystem permissions, protocol hardening, logging, and troubleshooting. |
| Windows Security Architecture | Lesson 17 | Covered SIDs, access tokens, ACLs, UAC, integrity levels, LSA, LSASS, and access checks. |
| Windows Registry | Lesson 17 | Covered hives, keys, values, types, persistence, auditing, and safe inspection. |
| Windows Services | Lesson 17 | Covered SCM, service state, identity, path, permissions, persistence, and troubleshooting. |
| Windows Processes | Lesson 17 | Covered PID/PPID, token, path, signature, hash, command line, ancestry, and response risks. |
| Windows Event Logs | Lesson 17 | Covered channels, providers, Event IDs, fields, logon types, limitations, and filtering. |
| PowerShell Basics | Lesson 17 | Covered cmdlets, objects, pipelines, filtering, help, safety, and logging. |
| Windows Server Roles | Lesson 18 | Covered roles, features, separation, dependencies, installation, and security. |
| Windows DNS Server | Lesson 18 | Covered zones, records, recursion, forwarding, caching, dynamic updates, DNSSEC, and troubleshooting. |
| Windows DHCP Server | Lesson 18 | Covered DORA, scopes, leases, options, reservations, relay, authorization, failover, and security. |
| Event Viewer Operations | Lesson 18 | Covered filters, Custom Views, role logs, exported events, subscriptions, and timeline analysis. |
| Basic Windows Server Hardening | Lesson 18 | Covered role-specific baselines, identity, network, Defender, logging, patching, recovery, and drift. |
| Active Directory Domain Services | Lesson 19 | Covered directory objects, partitions, domain controllers, replication context, DNS, and control-plane security. |
| Domains and Forests | Lesson 19 | Distinguished domain structure from the forest security boundary. |
| Active Directory Trusts | Lesson 19 | Covered direction, transitivity, authorization separation, scope, and retirement. |
| Active Directory Groups | Lesson 19 | Covered security/distribution types, scopes, nesting, AGDLP, and privilege risks. |
| Organizational Units | Lesson 19 | Covered organization, delegation, GPO scope, movement effects, and limitations. |
| Kerberos | Lesson 19 | Expanded tickets, KDC, TGT, SPN, dependencies, attacks, and defenses. |
| NTLM | Lesson 19 | Covered challenge-response, relay and offline risks, fallback, audit, and staged reduction. |
| LDAP | Lesson 19 | Covered bind, search, distinguished names, filters, TLS, signing, channel binding, and injection risk. |
| Group Policy | Lesson 19 | Covered GPO components, LSDOU, inheritance, filtering, delegation, security, and resultant policy. |
| RBAC | Lesson 20 | Covered business and technical roles, role engineering, assignments, ownership, and review. |
| Least Privilege | Lesson 20 | Expanded across permission, scope, time, device, network, command, and data. |
| PAM | Lesson 20 | Covered vaulting, rotation, brokering, approval, session management, analytics, and resilience. |
| Account Lifecycle | Lesson 20 | Covered joiner, mover, leaver, provisioning, deprovisioning, sessions, tokens, keys, and ownership. |
| Privileged Account Protection | Lesson 20 | Covered separate accounts, PAWs, phishing-resistant MFA, JIT, PAM, emergency access, and monitoring. |
| Separation of Duties | Lesson 20 | Covered toxic combinations, preventive policy, and compensating controls. |
| Microsoft Defender | Lesson 21 | Covered antivirus, cloud protection, behavior monitoring, exclusions, ASR, tamper protection, and evidence. |
| EDR | Lesson 21 | Covered endpoint telemetry, process trees, investigation, hunting, isolation, response, and limitations. |
| BitLocker | Lesson 21 | Covered volume encryption, TPM, protectors, recovery, suspension, escrow, and limitations. |
| Patch Management | Lesson 21 | Covered inventory, applicability, risk prioritization, testing rings, deployment, verification, and exceptions. |
| Endpoint Hardening | Lesson 21 | Covered accounts, applications, devices, firewall, application control, baseline, drift, and rebuild. |
| VPN | Lesson 22 | Covered remote-access, site-to-site, host-to-host, IPsec, TLS, authentication, routing, and resilience. |
| Split Tunneling | Lesson 22 | Compared with full tunneling through visibility, bandwidth, route, DNS, and endpoint risk. |
| Zero Trust | Lesson 22 | Defined through explicit verification, least privilege, assume breach, context, segmentation, and monitoring. |
| RDP Hardening | Lesson 22 | Covered gateways, NLA, MFA, source restriction, redirection, patching, session policy, and logs. |
| Secure Remote Work | Lesson 22 | Covered managed devices, BYOD, home networks, vendors, data, privacy, support, and response. |
| Stateful Firewall | Lesson 23 | Covered connection state, return traffic, state persistence, exhaustion, and troubleshooting. |
| pfSense Interfaces | Lesson 23 | Covered WAN, LAN, DMZ, management, guest, IoT, addressing, routing, and trust. |
| NAT in pfSense | Lesson 23 | Covered source NAT, outbound modes, destination NAT, port forwarding, reflection, and split DNS. |
| pfSense Firewall Rules | Lesson 23 | Covered ingress direction, top-down first match, aliases, management access, testing, and expiry. |
| Firewall Logging | Lesson 23 | Covered actions, interfaces, endpoints, ports, rule identifiers, states, and SIEM forwarding. |
| Segmentation Design | Lesson 23 | Covered zones, matrices, DMZ flows, default deny, explicit access, and validation. |
| VLANs | Lesson 24 | Covered access ports, trunks, tagging, native VLANs, routing, threats, and enforcement requirements. |
| DMZ Architecture | Lesson 24 | Covered ingress, back-end, egress, management, single/dual firewall, and cloud patterns. |
| Network ACLs | Lesson 24 | Distinguished network ACLs from identity and filesystem ACLs; covered order and stateless behavior. |
| Traffic Isolation | Lesson 24 | Covered north-south, east-west, private VLAN, wireless client isolation, and management planes. |
| Microsegmentation | Lesson 24 | Covered workload-level policy, identity context, challenges, observation, staging, and validation. |
| IDS and IPS | Lesson 25 | Distinguished passive detection from inline prevention, state, blocking, availability, and evidence. |
| Snort | Lesson 25 | Covered signature-oriented IDS/IPS architecture and rule concepts. |
| Suricata | Lesson 25 | Covered multithreaded IDS/IPS, protocol parsing, file visibility, and EVE JSON. |
| Zeek | Lesson 25 | Covered structured network metadata, protocol events, baselining, and threat hunting. |
| Signature Detection | Lesson 25 | Covered rules, known conditions, strengths, evasion, testing, and lifecycle. |
| Anomaly Detection | Lesson 25 | Covered baselines, deviations, business cycles, strengths, and false positives. |
| Network Alert Tuning | Lesson 25 | Covered thresholds, scope, suppression ownership, testing, expiry, and blocking criteria. |
| IaaS, PaaS, and SaaS | Lesson 26 | Compared service layers, control ownership, customer configuration, and security responsibilities. |
| Shared Responsibility | Lesson 26 | Applied provider/customer responsibility to identity, data, networking, logging, patching, and recovery. |
| Cloud Management Plane | Lesson 26 | Covered portals, APIs, CLIs, IaC, privilege, MFA, JIT, logging, and emergency access. |
| Cloud Misconfiguration | Lesson 26 | Covered public storage, broad network access, excessive IAM, stale keys, disabled logs, and public databases. |
| Infrastructure as Code | Lesson 26 | Covered repeatability, review, scanning, pipeline identity, modules, drift, and recovery. |
| Cloud Logging | Lesson 26 | Covered management, identity, storage, flow, DNS, load balancer, WAF, key, and application logs. |
| Asset Discovery | Lesson 27 | Distinguished active, passive, authenticated, agent, and API-based discovery. |
| Nmap Discovery | Lesson 27 | Covered host discovery, targeted service detection, output preservation, limitations, and authorization. |
| Netdiscover | Lesson 27 | Covered local IPv4 ARP discovery, strengths, limitations, and reconciliation. |
| Asset Inventory | Lesson 27 | Covered schema, ownership, criticality, control coverage, last seen, status, and protection. |
| Attack-Surface Mapping | Lesson 27 | Covered domains, public services, certificates, APIs, remote access, trusts, and internal paths. |
| Asset Reconciliation | Lesson 27 | Covered dynamic addresses, duplicates, cloud IDs, source conflicts, and stable identity. |
| Vulnerability Assessment | Lesson 28 | Covered scanning, validation, prioritization, data protection, metrics, and cloud coverage. |
| Nessus | Lesson 28 | Covered plugin-based commercial vulnerability assessment, credentials, evidence, and operations. |
| OpenVAS and Greenbone | Lesson 28 | Covered open-source scanning components, feeds, tasks, results, and administration. |
| CVE | Lesson 28 | Defined as a standard vulnerability identifier with applicability and lifecycle limitations. |
| CVSS | Lesson 28 | Defined as technical severity with version, vector, threat, environmental, and contextual considerations. |
| Risk Ranking | Lesson 28 | Combined severity, threat, exposure, asset impact, and effective controls. |
| Scan Interpretation | Lesson 28 | Covered evidence, authentication, applicability, false positives, false negatives, and validation. |
| Remediation Prioritization | Lesson 29 | Combined threat, exposure, asset impact, controls, age, safety, and effort. |
| Remediation Treatment | Lesson 29 | Covered patch, configuration, removal, upgrade, code correction, segmentation, retirement, and mitigation. |
| Validation Testing | Lesson 29 | Covered rescans, authenticated evidence, configuration checks, negative tests, regression, and availability. |
| Vulnerability Reporting | Lesson 29 | Covered executive summaries, technical findings, evidence, recommendations, ownership, metrics, and decisions. |
| Vulnerability Exceptions | Lesson 29 | Covered risk owner, justification, compensating controls, expiry, review, and exit plan. |
| SIEM Architecture | Lesson 30 | Covered sources, connectors, transport, parsing, normalization, enrichment, storage, analytics, alerts, and cases. |
| SIEM Log Sources | Lesson 30 | Covered identity, endpoint, network, cloud, application, vulnerability, and asset telemetry. |
| Correlation Rules | Lesson 30 | Covered hypothesis, sources, windows, grouping, thresholds, enrichment, triage, tests, and ownership. |
| SIEM Alerting | Lesson 30 | Covered severity, confidence, lifecycle, dispositions, tuning, and triage. |
| KQL Basics | Lesson 30 | Covered where, project, summarize, extend, sorting, bins, normalization, and null handling. |
| SPL Basics | Lesson 30 | Covered search terms, fields, stats, eval, where, bin, table, and time range. |
| SIEM Source Health | Lesson 30 | Covered silence, delay, parsing, connector authentication, queue, clock, volume, and rule execution. |
| Wazuh Architecture | Lesson 31 | Covered agent, manager, indexer, dashboard, shipping, clusters, and data flow. |
| Wazuh Agent Deployment | Lesson 31 | Covered enrollment, groups, packages, manager paths, health, lifecycle, and staged configuration. |
| Wazuh Log Sources | Lesson 31 | Covered Windows, Linux, network, application, cloud, syslog, formats, and source validation. |
| Wazuh Decoders and Rules | Lesson 31 | Covered parsing, rule levels, groups, custom logic, testing, local SIDs, and upgrades. |
| Wazuh Alert Tuning | Lesson 31 | Covered frequency, scope, decoder improvement, suppression risk, testing, ownership, and expiry. |
| Wazuh Platform Health | Lesson 31 | Covered manager, agent queues, cluster, indexer, storage, certificates, dashboard, delay, and backups. |
| Detection Engineering | Lesson 32 | Covered hypotheses, data contracts, logic, tests, deployment, tuning, metrics, lifecycle, and retirement. |
| Sigma Rules | Lesson 32 | Covered metadata, logsource, selections, conditions, false positives, levels, tags, conversion, and testing. |
| ATT&CK Mapping | Lesson 32 | Covered behavior-based mapping, sub-techniques, assumptions, coverage quality, and validation. |
| False-Positive Reduction | Lesson 32 | Covered context, benign positives, narrow tuning, regression tests, ownership, and deployment. |
| SOAR | Lesson 32 | Covered enrichment, recommendations, approval gates, automation, API privilege, rollback, and kill switches. |
| NIST Incident Response | Lesson 33 | Updated to SP 800-61 Rev. 3 and integrated across NIST CSF 2.0 functions. |
| Incident Identification | Lesson 33 | Covered validation, declaration, severity, scope, timelines, and evidence confidence. |
| Incident Containment | Lesson 33 | Covered short/long-term, identity, endpoint, network, cloud, evidence, safety, and availability. |
| Incident Eradication and Recovery | Lesson 33 | Covered root cause, rebuild, persistence, trusted restoration, validation, and monitoring. |
| Lessons Learned | Lesson 33 | Covered blameless review, accountability, ownership, dates, and verification. |
| Incident Reporting | Lesson 33 | Covered executive summary, timeline, technical response, impact, root cause, evidence, and actions. |
| Threat Intelligence | Lesson 34 | Covered requirements, collection, processing, analysis, dissemination, feedback, confidence, and lifecycle. |
| VirusTotal | Lesson 34 | Covered hash-first lookup, detection interpretation, relationships, behavior, and privacy risk. |
| AbuseIPDB | Lesson 34 | Covered community IP reputation, recency, shared infrastructure, and blocking limitations. |
| AlienVault OTX | Lesson 34 | Covered pulses, community context, duplication, staleness, tags, and validation. |
| MISP | Lesson 34 | Covered events, attributes, objects, tags, galaxies, sightings, distribution, and warning lists. |
| IOC Investigation | Lesson 34 | Covered normalization, internal sightings, external context, behavior, confidence, decisions, and expiry. |
| Alert Enrichment | Lesson 34 | Covered provenance, retrieval time, confidence, asset, identity, vulnerability, and intelligence context. |
| Digital Forensics | Lesson 35 | Covered readiness, preservation, acquisition, examination, analysis, reporting, and limitations. |
| Timeline Analysis | Lesson 35 | Covered source provenance, normalized and original time, confidence, drift, and super timelines. |
| Memory Forensics | Lesson 35 | Covered acquisition, volatile evidence, Volatility 3, processes, network state, and suspicious memory. |
| Disk Artifacts | Lesson 35 | Covered Windows Registry, Event Logs, Prefetch, Amcache, links, NTFS, Linux logs, cron, SSH, and packages. |
| Chain of Custody | Lesson 35 | Expanded evidence identification, possession, transfer, storage, hashing, retention, and disposition. |
| Evidence Documentation | Lesson 35 | Covered authority, tools, versions, commands, settings, hashes, errors, findings, and limitations. |
| Risk Identification | Lesson 36 | Covered objectives, assets, threats, vulnerabilities, dependencies, controls, likelihood, impact, and uncertainty. |
| STRIDE | Lesson 36 | Covered spoofing, tampering, repudiation, disclosure, denial, and elevation against data-flow elements. |
| Risk Register | Lesson 36 | Covered scenarios, controls, ratings, owner, treatment, actions, dates, status, evidence, and review. |
| Risk Treatment | Lesson 36 | Covered mitigation, avoidance, transfer, acceptance, compensating controls, and target risk. |
| Risk Communication | Lesson 36 | Covered executive, technical, operational audiences, uncertainty, confidence, and decisions. |
| Compliance Applicability and Scope | Lesson 37 | Distinguished authority, applicability, scope, data flows, dependencies, exclusions, and shared responsibility. |
| Compliance Control Matrix | Lesson 37 | Linked requirements to controls, taxonomy, owners, evidence, testing, gaps, and treatment. |
| Design and Operating Effectiveness | Lesson 37 | Distinguished whether a control can meet its objective from whether it operated correctly over the required population and period. |
| Compliance Evidence | Lesson 37 | Covered relevance, completeness, attribution, reproducibility, protection, and retention. |
| Professional Security Communication | Lesson 38 | Separated observation, analysis, conclusion, recommendation, confidence, audience, and decision. |
| Security Report Writing | Lesson 38 | Covered executive, technical, incident, vulnerability, risk, finding, timeline, and quality-review structures. |
| Portfolio Sanitization | Lesson 38 | Covered synthetic evidence, identifiers, metadata, contextual clues, authorization, and safe publication. |
| Git and GitHub Workflow | Lesson 38 | Covered repositories, branches, staging, commits, pull requests, review, secret protection, and collaboration. |
| Architecture Walkthrough | Lesson 39 | Covered business services, data flows, identities, trust boundaries, dependencies, management paths, controls, and recovery. |
| Zero Trust Architecture | Lesson 39 | Covered explicit verification, least privilege, assume breach, context, posture, resource policy, and continuous reevaluation. |
| Integration Gap | Lesson 39 | Distinguished coverage, design, operation, visibility, integration, resilience, governance, and validation gaps. |
| Attack-Path Analysis | Lesson 39 | Connected weaknesses into realistic paths and selected multiple opportunities to break them. |
| Capstone Investigation Workflow | Lesson 40 | Integrated alert triage, logs, PCAP, intelligence, ATT&CK, severity, containment, recovery, and reporting. |
| Analytical Confidence | Lesson 40 | Required confirmed, assessed, possible, and unknown labels with evidence and limitations. |
| Evidence Register | Lesson 40 | Recorded source, acquisition, hash, time zone, storage, and analyst actions. |

## Tools Mentioned

| Tool or Technology | First Introduced | Context |
|---|---:|---|
| Microsoft Defender | Lesson 1 | Endpoint protection and security control example. |
| Microsoft Sentinel | Lesson 1 | SIEM and detection control example. |
| Wazuh | Lesson 1 | Open-source SIEM/XDR and endpoint monitoring example. |
| Splunk | Lesson 1 | Enterprise SIEM and log analysis example. |
| Nessus | Lesson 1 | Vulnerability assessment example. |
| OpenVAS | Lesson 1 | Vulnerability assessment example. |
| Nmap | Lesson 1 | Asset discovery and exposed service identification example. |
| pfSense | Lesson 1 | Firewall, segmentation, and network control example. |
| Active Directory | Lesson 1 | Identity and access management example. |
| PowerShell | Lesson 1 | Windows administration and security operations example. |
| Bash | Lesson 1 | Linux administration and security operations example. |
| Snort | Lesson 2 | Mentioned as network IDS detection context. |
| Suricata | Lesson 2 | Mentioned as network IDS detection context. |
| Microsoft Entra ID | Lesson 3 | Mentioned as an identity platform for IAM and sign-in investigation examples. |
| GitHub | Lesson 3 | Mentioned as a possible portfolio location; warned not to publish sensitive data. |
| BitLocker | Lesson 4 | Full-disk encryption example for managed Windows endpoints. |
| LUKS | Lesson 4 | Linux volume encryption example. |
| OpenSSL | Lesson 4 | Optional lab tool for inspecting TLS connections and certificates. |
| Hardware Security Module | Lesson 4 | High-assurance protection for cryptographic keys and operations. |
| FIDO2 Security Key | Lesson 5 | Phishing-resistant possession-based authentication example. |
| Password Manager | Lesson 5 | Recommended for generating and storing long, unique user passwords. |
| Resolve-DnsName | Lesson 6 | Windows PowerShell command used to inspect email-authentication DNS records. |
| dig | Lesson 6 | Linux DNS query tool used to inspect SPF, DKIM, and DMARC records. |
| Wireshark | Lesson 8 | Packet capture and filtering for authorized network investigation. |
| VirtualBox | Lesson 10 | Hosted virtualization platform for isolated course labs. |
| VMware | Lesson 10 | Desktop and enterprise virtualization platform family. |
| Bash | Lesson 11 | Used as the primary Linux command shell for filesystem, process, and package tasks. |
| journalctl | Lesson 13 | Query tool for systemd journal evidence. |
| systemctl | Lesson 13 | Systemd service and unit management tool. |
| auditctl, ausearch, and aureport | Lesson 14 | Basic Linux Audit rule, search, and reporting tools. |
| Python | Lesson 15 | Introduced for structured security automation, parsing, hashing, and validation. |
| ss | Lesson 16 | Preferred modern Linux socket-inspection tool. |
| netstat | Lesson 16 | Legacy network and socket-inspection tool retained for enterprise familiarity. |
| curl | Lesson 16 | HTTP, HTTPS, API, and TLS troubleshooting tool. |
| Samba | Lesson 16 | SMB-compatible Linux file-sharing and identity-integration platform. |
| PowerShell | Lesson 17 | Windows and Microsoft-platform object-based administration and security shell. |
| Get-WinEvent | Lesson 17 | Provider-side Windows Event Log query tool. |
| CIM | Lesson 17 | Used to inspect detailed Windows service and process properties. |
| Windows Server Manager | Lesson 18 | Graphical role and feature management context. |
| Windows DNS PowerShell | Lesson 18 | Structured DNS server and client investigation cmdlets. |
| Windows DHCP PowerShell | Lesson 18 | Structured scope, lease, option, and reservation investigation cmdlets. |
| klist | Lesson 19 | Kerberos ticket cache inspection tool. |
| gpresult and Group Policy PowerShell | Lesson 19 | Resultant-policy and GPO analysis tools. |
| PAM Platform | Lesson 20 | Privileged credential, elevation, session, approval, and monitoring control platform. |
| Microsoft Defender for Endpoint | Lesson 21 | Enterprise EDR investigation and response context. |
| Get-MpComputerStatus | Lesson 21 | Windows Defender health and posture inspection. |
| VPN Gateway | Lesson 22 | Remote and site tunnel termination, policy, address, route, and logging platform. |
| RD Gateway and Bastion | Lesson 22 | Controlled intermediary for remote Windows and privileged access. |
| pfSense | Lesson 23 | Firewall, router, NAT, DHCP, VPN, and segmentation lab platform. |
| Snort | Lesson 25 | Network signature IDS/IPS engine. |
| Suricata | Lesson 25 | Network IDS/IPS and structured event engine. |
| Zeek | Lesson 25 | Network security monitoring and protocol metadata platform. |
| CSPM | Lesson 26 | Cloud configuration and posture assessment capability. |
| Netdiscover | Lesson 27 | Local IPv4 ARP-based asset discovery tool. |
| Nessus | Lesson 28 | Commercial vulnerability assessment platform. |
| OpenVAS | Lesson 28 | Greenbone ecosystem vulnerability scanner. |
| Microsoft Sentinel | Lesson 30 | SIEM context for KQL, cloud and hybrid correlation. |
| Splunk | Lesson 30 | SIEM context for SPL, indexing, correlation, and investigation. |
| Wazuh | Lesson 31 | Agent-based security monitoring, log analysis, FIM, SCA, rules, dashboards, and response. |
| Sigma | Lesson 32 | Platform-neutral structured log-detection rule format. |
| VirusTotal | Lesson 34 | Threat-analysis and artifact-context service. |
| AbuseIPDB | Lesson 34 | Community IP abuse-reputation service. |
| AlienVault OTX | Lesson 34 | Community threat-intelligence exchange. |
| MISP | Lesson 34 | Structured threat-intelligence management and sharing platform. |
| Volatility 3 | Lesson 35 | Memory-forensics framework and plugin workflow. |
| Git | Lesson 38 | Distributed version control for safe, reviewable security projects and documentation. |
| GitHub | Lesson 38 | Repository hosting, issues, pull requests, protected collaboration, portfolio work, and secret hygiene. |
| Wireshark | Lesson 40 | Capstone DNS, TLS, flow, and SMB metadata analysis with explicit capture limitations. |

## Standards and Frameworks Mentioned

| Framework | First Introduced | Context |
|---|---:|---|
| CompTIA Security+ | Lesson 1 | Security fundamentals alignment. |
| NIST Cybersecurity Framework | Lesson 1 | Governance, risk, and control context. |
| CIS Controls | Lesson 1 | Practical safeguard and baseline context. |
| MITRE ATT&CK | Lesson 1 | Briefly referenced as an attacker behavior knowledge base for later lessons. |
| Cyber Kill Chain | Lesson 2 | Introduced as an intrusion progression model for analysis and communication. |
| Security+ | Lesson 3 | Introduced as a foundational certification roadmap option; exam version should be verified with CompTIA before registration. |
| CySA+ | Lesson 3 | Introduced as an intermediate analyst certification roadmap option; exam version should be verified with CompTIA before registration. |
| CEH | Lesson 3 | Introduced as structured ethical hacking exposure. |
| OSCP / OSCP+ | Lesson 3 | Introduced as practical penetration testing certification path from OffSec. |
| CISSP | Lesson 3 | Introduced as an advanced, experience-oriented security certification. |
| X.509 | Lesson 4 | Introduced as the commonly used digital certificate format. |
| SAML | Lesson 5 | XML-based enterprise federation and SSO technology. |
| OAuth 2.0 | Lesson 5 | Authorization framework for delegated access; explicitly distinguished from authentication. |
| OpenID Connect | Lesson 5 | Identity layer built on OAuth 2.0. |
| Kerberos | Lesson 5 | Briefly introduced as ticket-based authentication used in Active Directory; expanded in Lesson 19. |
| SPF, DKIM, and DMARC | Lesson 6 | Applied email-domain authentication controls and alignment. |
| NIST CSF 2.0 | Lesson 37 | Six-function cybersecurity outcome and risk-governance framework using Current and Target Profiles. |
| CIS Controls v8.1 | Lesson 37 | Prioritized safeguards and cumulative Implementation Groups. |
| ISO/IEC 27001:2022 | Lesson 37 | Certifiable risk-based Information Security Management System standard, including Statement of Applicability. |
| PCI DSS v4.0.1 | Lesson 37 | Payment-account data security standard with scoped assessment and evidence requirements. |
| HIPAA Security Rule | Lesson 37 | U.S. regulatory safeguards for ePHI; January 2025 strengthening proposal correctly distinguished from a final rule. |
| GDPR | Lesson 37 | EU personal-data law covering processing principles, accountability, rights, security, and breach responsibilities. |

## Enterprise Scenarios Used

| Scenario | First Used | Reuse Guidance |
|---|---:|---|
| Small retail business using Microsoft 365 and cloud payment systems | Lesson 1 | Can be reused for basic risk, email security, and cloud configuration lessons. |
| Hospital protecting electronic health records and clinical systems | Lesson 1 | Can be reused for availability, compliance, incident response, and ransomware lessons. |
| Bank protecting online banking and transaction integrity | Lesson 1 | Can be reused for cryptography, IAM, monitoring, fraud, and risk lessons. |
| University managing students, faculty, labs, and public Wi-Fi | Lesson 1 | Can be reused for segmentation, identity, acceptable use, and vulnerability lessons. |
| Government agency protecting public services and sensitive citizen data | Lesson 1 | Can be reused for risk, compliance, incident response, and governance lessons. |
| Hybrid enterprise with on-premises Active Directory and Microsoft 365 | Lesson 1 | Can be reused throughout Windows, IAM, cloud, SIEM, and incident response lessons. |
| Small business business email compromise | Lesson 2 | Can be reused in social engineering, email security, and incident response lessons. |
| Hospital ransomware incident | Lesson 2 | Can be reused in malware, endpoint security, backups, IR, and forensics lessons. |
| Government espionage investigation | Lesson 2 | Can be reused in threat intelligence, ATT&CK, detection engineering, and risk lessons. |
| Cloud startup exposed API key | Lesson 2 | Can be reused in cloud fundamentals, IAM, incident response, and vulnerability lessons. |
| Microsoft 365 impossible travel and mailbox rule investigation | Lesson 3 | Can be reused in IAM, phishing, SIEM, and incident response lessons. |
| Hospital legacy server hardening | Lesson 3 | Can be reused in Windows Server, endpoint security, vulnerability management, and risk lessons. |
| Career mapping exercise | Lesson 3 | Can be reused in Lesson 38 for portfolio building and certification planning. |
| Bank online banking cryptographic protection | Lesson 4 | Can be reused for HTTPS, IAM, cloud security, and compliance. |
| Hospital encryption and recovery planning | Lesson 4 | Can be reused for endpoint security, incident response, and resilience. |
| University private PKI for managed devices | Lesson 4 | Can be reused for IAM, Wi-Fi security, and certificate lifecycle. |
| Government document and software signing | Lesson 4 | Can be reused for integrity, PKI, incident response, and compliance. |
| Hybrid enterprise cloud and on-premises key management | Lesson 4 | Can be reused for cloud security, IAM, and risk assessment. |
| Microsoft 365 account takeover and mailbox forwarding | Lesson 5 | Can be reused for social engineering, email security, SIEM, and incident response. |
| Bank phishing-resistant privileged access | Lesson 5 | Can be reused for PAM, Zero Trust, and risk assessment. |
| Hospital emergency identity access | Lesson 5 | Can be reused for IAM, availability, and incident response. |
| University federated SSO | Lesson 5 | Can be reused for Active Directory, IAM, and cloud security. |
| Cloud session-token theft | Lesson 5 | Can be reused for malware, SOC, and incident response lessons. |
| Small-business certificate expiration outage | Lesson 6 | Can be reused for vulnerability management and incident response. |
| Hospital encrypted-backup recovery failure | Lesson 6 | Can be reused for ransomware, resilience, and incident response. |
| Government signing-key compromise | Lesson 6 | Can be reused for forensics, incident response, and compliance. |
| Cloud key-policy overpermission | Lesson 6 | Can be reused for cloud security, IAM, and risk assessment. |
| Supplier invoice-thread compromise | Lesson 7 | Can be reused for BEC, incident response, and financial controls. |
| Bank help-desk vishing | Lesson 7 | Can be reused for IAM, PAM, and incident response. |
| University QR phishing | Lesson 7 | Can be reused for web attacks, IAM, and awareness. |
| Cloud application consent phishing | Lesson 7 | Can be reused for cloud security, SOC, and incident response. |
| Hospital clinical VLAN ARP anomaly | Lesson 8 | Can be reused for segmentation, IDS/IPS, and incident response. |
| Bank application-layer DDoS | Lesson 8 | Can be reused for firewall, cloud, and resilience lessons. |
| Cloud database security-group exposure | Lesson 8 | Can be reused for cloud risk and asset discovery. |
| Government web-server process anomaly | Lesson 9 | Can be reused for SIEM, detection engineering, and incident response. |
| Hospital ransomware and tested recovery | Lesson 9 | Can be reused for endpoint security, IR, and forensics. |
| Cloud access-key persistence after web compromise | Lesson 9 | Can be reused for cloud, IAM, and threat detection. |
| Isolated host-only cybersecurity lab | Lesson 10 | Foundation for Linux, Windows, network, vulnerability, SIEM, and IR practicals. |
| Linux root process investigation | Lesson 11 | Can be reused for logging, hardening, SIEM, and incident response. |
| Linux team directory with ACL exception | Lesson 12 | Can be reused for auditd, hardening, and access review. |
| Departed Linux administrator with residual access | Lesson 12 | Can be reused for IAM and incident response. |
| Unauthorized systemd persistence service | Lesson 13 | Can be reused for hardening, SIEM, detection, and IR. |
| Malicious user cron job | Lesson 13 | Can be reused for auditd, scripting, SIEM, and forensics. |
| Healthcare firewall change affecting clinical integration | Lesson 14 | Can be reused for change management, risk, and incident response. |
| Hardened cloud Linux image with drift detection | Lesson 14 | Can be reused for cloud, vulnerability management, and compliance. |
| Failed-login analyzer | Lesson 15 | Can be reused for SIEM, detection engineering, and portfolio work. |
| Safe incident evidence collector | Lesson 15 | Can be reused for incident response and forensics. |
| Authorized bastion SSH forwarding | Lesson 16 | Can be reused for remote access, Zero Trust, SOC monitoring, and incident response. |
| Healthcare Samba ACL-mask failure | Lesson 16 | Can be reused for IAM, file sharing, and enterprise troubleshooting. |
| Government dynamic SSH tunnel investigation | Lesson 16 | Can be reused for SIEM, detection engineering, and incident response. |
| Encoded PowerShell on university endpoint | Lesson 17 | Can be reused for endpoint security, SIEM, and incident response. |
| Government Security log clearing | Lesson 17 | Can be reused for detection engineering, forensics, and IR. |
| Windows cloud VM remote logon | Lesson 17 | Can be reused for remote access, cloud, SIEM, and IAM. |
| Financial DNS record redirection | Lesson 18 | Can be reused for Active Directory, SIEM, and incident response. |
| Healthcare DHCP scope exhaustion | Lesson 18 | Can be reused for monitoring, availability, and network troubleshooting. |
| Educational rogue DHCP server | Lesson 18 | Can be reused for segmentation, IDS/IPS, and incident response. |
| Financial service-account Kerberoasting risk | Lesson 19 | Can be reused for IAM, detection, and incident response. |
| Healthcare excessive OU delegation | Lesson 19 | Can be reused for IAM, PAM, and risk assessment. |
| Government obsolete external trust | Lesson 19 | Can be reused for risk, compliance, and incident response. |
| Healthcare mover retaining patient access | Lesson 20 | Can be reused for compliance, IAM, and risk assessment. |
| Government time-bound vendor PAM access | Lesson 20 | Can be reused for remote access, Zero Trust, and compliance. |
| Cloud managed identity overprivilege | Lesson 20 | Can be reused for cloud security, IAM, and incident response. |
| Government privileged workstation LSASS alert | Lesson 21 | Can be reused for SIEM, detection engineering, and incident response. |
| Healthcare legacy endpoint patch exception | Lesson 21 | Can be reused for vulnerability management, risk, and compliance. |
| Cloud VM cryptomining incident | Lesson 21 | Can be reused for cloud security, threat intelligence, and IR. |
| Healthcare emergency virtual desktop access | Lesson 22 | Can be reused for Zero Trust, resilience, and compliance. |
| Government vendor access outside window | Lesson 22 | Can be reused for PAM, SIEM, and incident response. |
| Hybrid broad VPN route redesign | Lesson 22 | Can be reused for firewall, segmentation, and Zero Trust. |
| Financial DMZ payment-service policy | Lesson 23 | Can be reused for segmentation, IDS/IPS, and compliance. |
| Government emergency any-any rule | Lesson 23 | Can be reused for change management, SIEM, and risk. |
| Hybrid asymmetric routing failure | Lesson 23 | Can be reused for VPN, cloud, and enterprise troubleshooting. |
| Healthcare segmented legacy clinical devices | Lesson 24 | Can be reused for IDS/IPS, risk, compliance, and vulnerability management. |
| Financial cardholder segmentation | Lesson 24 | Can be reused for compliance, SIEM, and architecture review. |
| Cloud east-west microsegmentation | Lesson 24 | Can be reused for cloud, detection engineering, and Zero Trust. |
| Healthcare rare clinical-device destination | Lesson 25 | Can be reused for threat intelligence, SIEM, and incident response. |
| Financial inline exploit blocking | Lesson 25 | Can be reused for detection engineering and change management. |
| Cloud traffic-mirroring coverage gap | Lesson 25 | Can be reused for cloud security, SIEM, and architecture review. |
| Microsoft 365 anonymous sharing | Lesson 26 | Can be reused for IAM, compliance, and incident response. |
| Healthcare public cloud-storage endpoint | Lesson 26 | Can be reused for vulnerability management, compliance, and risk. |
| Hybrid synchronized-identity compromise | Lesson 26 | Can be reused for IAM, incident response, and architecture review. |
| Healthcare passive legacy-device discovery | Lesson 27 | Can be reused for vulnerability management, risk, and IDS/IPS. |
| Government unowned public certificate | Lesson 27 | Can be reused for PKI, attack surface, and incident response. |
| Hybrid ephemeral cloud inventory | Lesson 27 | Can be reused for cloud security and vulnerability management. |
| Financial public VPN prioritization | Lesson 28 | Can be reused for remediation, threat intelligence, and reporting. |
| Healthcare fragile biomedical scan | Lesson 28 | Can be reused for risk, compliance, and remediation planning. |
| Government overprivileged scan credential | Lesson 28 | Can be reused for PAM, IAM, and incident response. |
| Financial emergency VPN remediation | Lesson 29 | Can be reused for incident response, reporting, and change management. |
| Healthcare time-bound device exception | Lesson 29 | Can be reused for risk assessment, compliance, and segmentation. |
| Cloud IaC security-group remediation | Lesson 29 | Can be reused for cloud, validation, and configuration management. |
| Financial VPN-PAM-payment correlation | Lesson 30 | Can be reused for detection engineering and incident response. |
| Healthcare unusual patient-record access | Lesson 30 | Can be reused for compliance, UEBA, and investigation. |
| Government cloud privilege and endpoint correlation | Lesson 30 | Can be reused for Sentinel, detection engineering, and IR. |
| Healthcare Wazuh FIM application change | Lesson 31 | Can be reused for detection engineering, change management, and IR. |
| Government Wazuh SCA exception | Lesson 31 | Can be reused for compliance, hardening, and risk. |
| Cloud autoscaled Wazuh agents | Lesson 31 | Can be reused for cloud security and SIEM operations. |
| Healthcare patient-record detection context | Lesson 32 | Can be reused for incident response, compliance, and UEBA. |
| Government untested ATT&CK coverage | Lesson 32 | Can be reused for architecture review, risk, and detection maturity. |
| Cloud privilege sequence detection | Lesson 32 | Can be reused for incident response and threat hunting. |
| Healthcare ransomware response | Lesson 33 | Can be reused for forensics, risk, compliance, and capstone. |
| Small-business BEC payment diversion | Lesson 33 | Can be reused for threat intelligence and capstone. |
| Cloud API-key compromise response | Lesson 33 | Can be reused for threat intelligence, forensics, and capstone. |
| Healthcare sanitized phishing URL lookup | Lesson 34 | Can be reused for privacy, incident response, and forensics. |
| Government restricted MISP sharing | Lesson 34 | Can be reused for compliance and risk communication. |
| Cloud valid-key rare-IP investigation | Lesson 34 | Can be reused for SIEM, forensics, and capstone. |
| Healthcare patient-safe forensic acquisition | Lesson 35 | Can be reused for risk, compliance, and capstone. |
| Government evidence chain of custody | Lesson 35 | Can be reused for compliance and incident reporting. |
| Cloud ephemeral instance preservation | Lesson 35 | Can be reused for cloud IR and capstone. |
| Healthcare legacy-device risk register | Lesson 36 | Can be reused for compliance, architecture, and integration review. |
| Financial STRIDE transaction model | Lesson 36 | Can be reused for compliance and capstone. |
| Government supplier citizen-data risk | Lesson 36 | Can be reused for compliance and risk communication. |
| Regional clinic multi-framework control matrix | Lesson 37 | Integrates HIPAA, PCI DSS, GDPR, NIST CSF, CIS Controls, ownership, evidence, and exceptions. |
| Government supplier certificate-scope review | Lesson 37 | Demonstrates that certification claims must be checked against the delivered service and locations. |
| Cloud repository secret exposure | Lesson 38 | Integrates immediate rotation, audit review, history remediation, and preventive scanning. |
| Synthetic government detection portfolio | Lesson 38 | Demonstrates ethical publication, testing, ATT&CK mapping, and reproducibility. |
| Financial production-and-backup identity dependency | Lesson 39 | Demonstrates shared failure analysis and ransomware recovery architecture. |
| Hybrid healthcare integration review | Lesson 39 | Integrates AD, Microsoft 365, Linux, pfSense, cloud, Wazuh, Sentinel, vendor access, and recovery. |
| Northbridge Health finance compromise | Lesson 40 | Final capstone integrating malicious document execution, PowerShell, persistence, finance-file access, mailbox manipulation, and incident response. |

## Formatting Standard Established

Each lesson should include:

- Lesson overview
- Learning objectives
- Prerequisite knowledge
- Enterprise relevance
- Main lesson content with What, Why, How, and Where explanations
- Enterprise examples
- Tables where appropriate
- Security tools and operations context
- Standards and framework mapping where appropriate
- Hands-on classroom practical
- Take-home practical
- Assessment questions
- Glossary
- Review checklist
- Continuity note

## Quality Standard

- Follow CompTIA Security+ SY0-701 terminology where applicable.
- Classify control categories as technical, managerial, operational, and physical.
- Classify control functions as preventive, deterrent, detective, corrective, compensating, and directive.
- Do not place directive controls under control categories.
- Do not use administrative control as the primary course taxonomy when Security+ SY0-701 uses managerial and operational controls; mention administrative only when explaining older terminology or external frameworks.
- Every major curriculum topic must independently explain What, Why, How, and Where before implementation or attack discussion.
- Topic coverage must include mechanics, trust boundaries, prerequisites, common failure modes, enterprise deployment, relevant evidence, defensive controls, and troubleshooting where applicable.
- Lessons must distinguish a technology's intended function from what it does not guarantee.
- Practical commands must explain important options, expected results, safety boundaries, validation, and rollback.
- Scenario answers must connect technical evidence to business impact, containment, recovery, and control improvement.
- Multiple-choice answer keys must include concise reasoning, not letters alone.
- Lesson depth must be judged by competency coverage rather than word count, but later lessons must not collapse into outline-style summaries.

## Depth Remediation Audit

| Lesson Range | Audit Result | Required Action |
|---|---|---|
| 1-5 | Remediation complete | Precision reviewed; explanatory assessment reasoning added |
| 6-7 | Remediation complete | Operational interpretation and explanatory assessment reasoning strengthened |
| 8-10 | Remediation complete | Protocol, application, hypervisor, storage, trust-boundary, and troubleshooting mechanics expanded |
| 11-14 | Remediation complete | Linux internals, identity resolution, permissions, logging, services, SSH, firewall, audit, and baseline mechanics expanded |
| 15 | Remediation complete | Shell parsing, subprocess safety, validation, testing, idempotence, concurrency, and structured output expanded |
| 16-20 | Publication audit complete | Linux networking, Windows, Active Directory, and IAM continuity and practical depth verified |
| 21-25 | Publication audit complete | Endpoint, remote access, firewall, segmentation, and IDS/IPS operational coverage verified |
| 26-30 | Publication audit complete | Cloud, asset, vulnerability, remediation, and SIEM progression verified |
| 31-35 | Publication audit complete | Wazuh, detection, incident response, intelligence, and forensics workflow verified |
| 36-40 | Publication audit complete | Risk, compliance, professional communication, integration review, and capstone assessment verified |

Depth remediation and publication audit are complete across Lessons 1-40. All multiple-choice answer keys include concise reasoning. No external reference sections were added from Lesson 4 onward.

## Avoid Repetition Notes

- Lesson 2 can briefly reference the CIA Triad, risk, vulnerabilities, and controls without re-explaining them in full.
- Lesson 3 should reference security roles introduced through examples but should formally define job responsibilities there.
- Lesson 3 should connect roles to the threats from Lesson 2, especially SOC analyst, incident responder, vulnerability analyst, and security administrator responsibilities.
- Lesson 4 should build on confidentiality and integrity when introducing encryption and hashing.
- Lesson 4 should connect cryptography to roles from Lesson 3: SOC, systems administration, security administration, IAM, and incident response.
- Lesson 5 should reference Lesson 4 hashing and key concepts when teaching password storage, tokens, and credential protection without reteaching cryptographic foundations.
- Lesson 6 should expand Lesson 4 TLS, certificates, and lifecycle foundations into operational HTTPS and email security.
- Lesson 7 should expand Lesson 5 phishing, MFA fatigue, credential theft, and identity-log analysis without reteaching authentication architecture.
- Lesson 7 should reuse Lesson 6 SPF, DKIM, DMARC, and trusted-header interpretation while emphasizing that authentication pass does not prove benign content.
- Lesson 8 may reference social engineering as an initial-access path but should focus on network and system attack mechanics.
- Lesson 9 should build from exposed services into web exploitation, malware, persistence, IOC, and IOA analysis.
- Lesson 10 should provide isolated virtualization foundations for later security labs and reinforce authorization and snapshots.
- Lessons 11 onward should require students to validate host-only networking before intentionally vulnerable or attack-oriented exercises.
- Lesson 12 should expand Lesson 11 ownership and permissions into users, groups, ACLs, and sudoers without reteaching filesystem navigation.
- Lesson 13 should connect authentication, sudo, account, process, service, and cron activity to Linux log evidence.
- Lesson 14 should reuse Lesson 13 logs and services to validate SSH, UFW, Fail2Ban, auditd, and baseline hardening.
- Lesson 15 should automate only understood Linux tasks and emphasize validation, safe parsing, error handling, and least privilege.
- Lesson 16 should reuse safe command execution and parsing while teaching Linux network investigation and file sharing.
- Lesson 17 should compare Windows Registry, service, process, event, and PowerShell evidence with the Linux concepts established in Lessons 11-16.
- Lesson 18 should expand Windows fundamentals into DNS, DHCP, server roles, Event Viewer operations, and server hardening.
- Lesson 19 should build on Windows DNS, SIDs, access tokens, Event Logs, and server roles when introducing Active Directory architecture and authentication.
- Lesson 20 should expand Active Directory and cloud identity into RBAC, least privilege, PAM, lifecycle, and privileged-account protection.
- Lesson 21 should apply identity and least privilege to endpoint protection, encryption, EDR, patching, and hardening.
- Lesson 22 should connect endpoint posture and IAM to VPN, remote access, Zero Trust, RDP, and secure remote work.
- Lesson 23 should implement network boundaries, NAT, DHCP, firewall policy, logging, and segmentation through pfSense.
- Lesson 24 should expand pfSense zones into VLAN, DMZ, ACL, traffic-isolation, and segmentation architecture.
- Lesson 25 should use segmentation boundaries as IDS/IPS and network-monitoring placement points.
- Lesson 26 should explain how cloud service models and shared responsibility change identity, network, workload, logging, and detection ownership.
- Lesson 27 should include cloud APIs and provider inventory alongside authorized network discovery.
- Lesson 28 should use Lesson 27 inventory as vulnerability-assessment scope and distinguish scanner findings from validated risk.
- Lesson 29 should turn validated findings into remediation plans, verification, and stakeholder reports.
- Lesson 30 should correlate asset, vulnerability, identity, endpoint, network, and cloud evidence in a SIEM.
- Lesson 31 should implement SIEM collection, dashboards, queries, and tuning through Wazuh.
- Lesson 32 should formalize detections across platforms through Sigma, ATT&CK, testing, tuning, and SOAR.
- Lesson 33 should consume alerts and cases through identification, containment, eradication, recovery, lessons learned, and reporting.
- Lesson 34 should enrich incident evidence through threat intelligence while preserving confidence, privacy, and source limitations.
- Lesson 35 should preserve and analyze incident evidence through timelines, memory, disk artifacts, chain of custody, and documentation.
- Lesson 36 should convert technical evidence into risk identification, STRIDE models, registers, treatment, and stakeholder communication.
- Lesson 37 should map risk and safeguards to compliance frameworks while distinguishing law, regulation, standard, and guidance.
- Lesson 38 should reuse technical evidence from prior lessons while focusing on audience, report quality, ethical portfolios, GitHub safety, and role-based development.
- Lesson 39 should integrate controls across complete business and attack paths rather than reteaching each technology independently.
- Lesson 40 should assess the complete workflow and require evidence-backed conclusions, operational containment, and professional reporting rather than introducing a new technical domain.
- Lesson 33 should reuse the Lesson 7 credential, token, mailbox, endpoint, and financial containment workflow.
- Lesson 19 should expand the brief Lesson 5 Kerberos introduction in the context of Active Directory.
- Lesson 20 should reuse Lesson 5 account lifecycle, conditional access, privileged accounts, and service identities.
- Lessons 27 to 29 should reuse attack surface, vulnerability, risk ranking, and control concepts from Lesson 1.
- Lesson 32 should reuse ATT&CK concepts from Lesson 2 and expand them into detection rules and Sigma.
