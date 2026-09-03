# Enterprise Cybersecurity Course Curriculum

This curriculum is the source of truth for the 40-lesson professional cybersecurity course.

## Lesson 1: Security Fundamentals

- CIA Triad
- Risk
- Threats
- Vulnerabilities
- Security Controls
- Defense in Depth
- Attack Surface

## Lesson 2: Threat Landscape

- Malware Types
- Threat Actors
- Advanced Persistent Threats (APTs)
- Cyber Kill Chain
- MITRE ATT&CK Framework

## Lesson 3: The Security Profession

- Cybersecurity Roles
- Career Paths
- Certification Roadmap
  - Security+
  - CySA+
  - CEH
  - OSCP
  - CISSP
- Continuous Learning Strategies

## Lesson 4: Cryptography Fundamentals

- Hashing
- Symmetric Encryption
- Asymmetric Encryption
- PKI
- TLS/SSL
- Certificates
- Data at Rest
- Data in Transit

## Lesson 5: Authentication and Identity

- MFA
- Single Sign-On Concepts
- Token-Based Authentication
- Password Storage
- Credential Security

## Lesson 6: Access Control and Defense in Depth

- Access Control Concepts
- Identification, Authentication, Authorization, and Accounting
- Authorization Models
  - DAC
  - MAC
  - RBAC
  - Rule-Based Access Control
  - ABAC
- Least Privilege
- Need to Know
- Separation of Duties
- Privileged Access
- Defense in Depth
- Security Control Categories and Functions

## Lesson 7: Social Engineering

- Phishing
- Spear Phishing
- Business Email Compromise
- Vishing
- Pretexting
- Credential Attacks
- Email Header Analysis

## Lesson 8: Network and System Attacks

- Reconnaissance
- Port Scanning
- ARP Spoofing
- DNS Poisoning
- Man-in-the-Middle Attacks
- DDoS Attacks
- Enumeration Techniques

## Lesson 9: Web Attacks and Malware

- OWASP Top 10
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Command Injection
- Trojans
- Ransomware
- Persistence Mechanisms
- Indicators of Compromise (IOC)
- Indicators of Attack (IOA)

## Lesson 10: Virtualization Fundamentals

- Hypervisors
- VirtualBox
- VMware
- Snapshots
- Network Modes
  - NAT
  - Bridged
  - Host-Only

## Lesson 11: Linux Fundamentals

- Filesystem Hierarchy
- Core Commands
- Package Management
- Process Management
- File Permissions

## Lesson 12: Users, Groups and Permissions

- User Management
- Groups
- chmod
- chown
- ACLs
- sudoers
- Ownership

## Lesson 13: Linux Logging and Services

- syslog
- auth.log
- journalctl
- systemctl
- Cron Jobs
- Reading and Interpreting Linux Logs

## Lesson 14: Linux Hardening

- SSH Configuration
- UFW Firewall
- Fail2Ban
- Security Baselines
- auditd Basics
- CIS Benchmark Introduction

## Lesson 15: Bash and Python Basics

- Variables
- Loops
- Conditionals
- Functions
- Regular Expressions
- Log Parsing
- Simple Security Scripts

## Lesson 16: Linux Networking

- Network Interfaces
- netstat
- ss
- dig
- curl
- SSH Tunneling
- Samba
- File Sharing

## Lesson 17: Windows Fundamentals

- Registry
- Services
- Processes
- Event Logs
- PowerShell Basics
- Windows Security Architecture

## Lesson 18: Windows Server

- DNS
- DHCP
- Event Viewer
- Server Roles
- Basic Server Hardening

## Lesson 19: Active Directory

- Domains
- Forests
- Trusts
- Users
- Groups
- Organizational Units
- Kerberos
- NTLM
- LDAP
- Group Policy Basics

## Lesson 20: IAM Fundamentals

- RBAC
- Least Privilege
- PAM Concepts
- Account Lifecycle Management
- Privileged Account Protection

## Lesson 21: Endpoint Security

- Microsoft Defender
- BitLocker
- EDR Concepts
- Patch Management
- Endpoint Hardening

## Lesson 22: Remote Access and VPN

- VPN Concepts
- Remote Access Security
- Zero Trust Basics
- RDP Hardening
- Secure Remote Work

## Lesson 23: Firewall and pfSense

- Interface Configuration
- NAT
- DHCP
- Firewall Rules
- Logging
- Segmentation Design

## Lesson 24: Network Segmentation

- VLANs
- DMZ Architecture
- ACLs
- Traffic Isolation
- Segmentation Best Practices

## Lesson 25: IDS and IPS

- Snort
- Suricata
- Zeek
- Rule-Based Detection
- Network-Based Alerting
- Signature-Based Detection
- Anomaly-Based Detection

## Lesson 26: Cloud Fundamentals

- IaaS
- PaaS
- SaaS
- Shared Responsibility Model
- Cloud Risk
- Common Misconfigurations

## Lesson 27: Asset Discovery

- Nmap
- Netdiscover
- Asset Inventory
- Attack Surface Mapping
- Asset Management

## Lesson 28: Vulnerability Assessment

- Nessus
- OpenVAS
- CVE
- CVSS Scoring
- Risk Ranking
- Scan Interpretation

## Lesson 29: Remediation and Reporting

- Patch Management
- Remediation Prioritization
- Validation Testing
- Writing Vulnerability Reports

## Lesson 30: SIEM Fundamentals

- SIEM Architecture
- Log Sources
- Correlation Rules
- Alerting
- KQL Basics
- SPL Basics

## Lesson 31: Wazuh in Practice

- Agent Deployment
- Log Source Configuration
- Dashboards
- Querying
- Alert Tuning

## Lesson 32: Detection Engineering

- Writing Detection Rules
- Sigma Rules
- ATT&CK Mapping
- False Positive Reduction
- Introduction to SOAR

## Lesson 33: Incident Response

- NIST 800-61 Lifecycle
- Identification
- Containment
- Eradication
- Recovery
- Lessons Learned
- Incident Report Writing

## Lesson 34: Threat Intelligence

- VirusTotal
- AbuseIPDB
- AlienVault OTX
- MISP
- IOC Investigation
- Alert Enrichment

## Lesson 35: Forensics Fundamentals

- Timeline Analysis
- Memory Forensics with Volatility
- Disk Artifacts
- Chain of Custody
- Evidence Documentation

## Lesson 36: Risk Assessment

- Risk Identification
- STRIDE Threat Modeling
- Risk Registers
- Risk Treatment Options
- Risk Communication

## Lesson 37: Compliance Frameworks

- NIST CSF
- CIS Controls v8
- ISO 27001
- PCI-DSS
- HIPAA
- GDPR
- Practical Implementation

## Lesson 38: Career and Professional Skills

- Security Report Writing
- Communication with Non-Technical Stakeholders
- Portfolio Building
- GitHub Usage
- Certification Planning

## Lesson 39: Integration Review

- Architecture Walkthrough
- System Hardening Review
- Zero Trust Principles
- Gap Identification

## Lesson 40: Capstone Investigation

Workflow:

1. SIEM Alert
2. Log Analysis
3. PCAP Review
4. Threat Intelligence Investigation
5. ATT&CK Mapping
6. Severity Assessment
7. Containment
8. Written Incident Report

## Practical Consolidation Programme

The course is consolidated by a separate professional practical programme:

- [Practical programme guide](practicals/README.md)
- [Complete tool-mastery guide](practicals/TOOL_MASTERY_GUIDE.md)
- 15 guided labs covering range safety, Linux, Windows, Active Directory, pfSense, PKI, web security, vulnerability management, network detection, Wazuh, detection engineering, incident response, and forensics.
- 10 scenario-based projects covering healthcare, education, fintech, e-commerce, remote work, insider risk, self-hosted cloud storage, threat hunting, Linux DFIR, and an all-course manufacturing capstone.
- [Professional project operating guide](practicals/projects/README.md)
- [Reusable evidence and reporting templates](practicals/templates/README.md)

All practicals require written scope, isolated targets, free/no-cost tools, command evidence, positive and negative validation, rollback, monitoring, business reasoning, and professional reporting.
