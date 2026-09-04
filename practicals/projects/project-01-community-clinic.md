# Project 01 - Secure a Community Health Clinic

## Project Purpose

This project turns the first part of the course into a realistic small-business healthcare security engagement. Students must secure a small clinic environment, protect synthetic patient data, reduce attack surface, configure identity and network controls, collect logs, validate detections, and present a management-ready security improvement plan.

This is not a copy-and-paste lab. It is a guided professional project. Students are expected to make decisions, explain trade-offs, validate controls, document evidence, and communicate clearly.

## Scenario

BrightCare Clinic has 35 staff, 20 Windows workstations, one patient-record application, a public appointment portal, and no full-time security employee. The clinic depends on technology for patient scheduling, clinical notes, billing support, prescriptions, and communication with external service providers.

Current problems:

- All systems share one flat subnet.
- Receptionists use local administrator accounts.
- The public appointment portal communicates directly with the database.
- Logs remain on individual machines.
- Patient data is not clearly classified.
- Backups exist, but restore testing is informal.
- The clinic can tolerate at most 30 minutes of planned portal downtime.

Your team must build a no-cost reference environment that protects synthetic patient data, supports clinic operations, and produces enough evidence for management to approve a security roadmap.

## Duration

Recommended duration: 2 to 3 weeks.

| Stage | Suggested time |
|---|---:|
| Discovery, risk, and design | 2 to 3 class sessions |
| Identity, network, and service build | 3 to 5 class sessions |
| Monitoring, vulnerability review, and recovery testing | 3 to 4 class sessions |
| Reporting and presentation | 1 to 2 class sessions |

## Lessons Consolidated

This project reinforces Lessons 1 to 25 and Lessons 36 to 39.

Key areas:

- Security fundamentals
- Threats, attacks, and vulnerabilities
- Social engineering and phishing risk
- Authentication and identity
- Access control and defense in depth
- Linux and Windows administration
- Active Directory basics
- Endpoint security
- Remote access and VPN concepts
- pfSense firewall rules
- Network segmentation
- IDS/IPS concepts
- Asset discovery
- Vulnerability assessment
- Risk assessment
- Security report writing
- Communication with non-technical stakeholders

## Free or Evaluation Tools

Use only approved lab tools:

| Tool | Use |
|---|---|
| VirtualBox or VMware | Run the isolated lab systems |
| pfSense CE | Segmentation, routing, firewall rules, logging |
| Windows Server Evaluation | AD DS, DNS, groups, policy, Windows logs |
| Windows 11 Evaluation | Clinic workstation simulation |
| Ubuntu Server | Portal, backend, logging or backup simulation |
| Nginx | Simple synthetic appointment portal |
| Wazuh | SIEM/XDR logging and alert triage |
| Suricata or Zeek | Network security monitoring if available |
| Greenbone/OpenVAS | Vulnerability assessment |
| Nmap | Asset discovery and service validation |
| OpenSSL | Private lab certificate checks |
| PowerShell and Bash | Administration, validation, and evidence |

Do not use real patient data, real clinic credentials, or real public systems.

## Authorized Scope

Students may work only inside the approved lab environment.

| Scope item | Approved value |
|---|---|
| Organization | BrightCare Clinic |
| Data | Synthetic patient and clinic data only |
| Network | Isolated classroom lab network |
| Allowed systems | pfSense, Windows Server, Windows client, Ubuntu portal/backend, Wazuh, Kali |
| Allowed testing | Configuration review, internal scanning, safe validation, detection testing, backup and restore |
| Prohibited testing | Public scanning, denial of service, real malware, credential theft, exploitation outside instructor-approved simulation |
| Stop condition | Stop if a target, source, adapter mode, credential, or data source is outside written scope |

Before any scan or security test, the team must say and record:

```text
We have written authorization.
We have verified the source system.
We have verified the target system.
We are working only inside the approved clinic lab.
```

## Required Lab Architecture

Use the course reference topology unless the instructor approves a change.

| Segment | Purpose | Example subnet | Example systems |
|---|---|---:|---|
| USERS | Staff workstations | `10.10.10.0/24` | Windows client |
| SERVERS | Internal services | `10.10.20.0/24` | Domain controller, backend |
| DMZ | Public-facing service simulation | `10.10.30.0/24` | Appointment portal |
| SOC | Security monitoring | `10.10.40.0/24` | Wazuh, sensor |

Suggested fixed addresses:

| Host | Role | Address |
|---|---|---:|
| `fw01` | pfSense gateway | `.1` on each segment |
| `dc01` | AD DS and DNS | `10.10.20.10` |
| `win11-reception01` | Reception workstation | `10.10.10.50` |
| `portal01` | Appointment portal | `10.10.30.20` |
| `backend01` | Synthetic patient backend | `10.10.20.20` |
| `wazuh01` | SIEM/XDR | `10.10.40.10` |
| `kali01` | Approved analyst workstation | `10.10.10.60` |

## Business Requirements

The final solution must satisfy these requirements:

| ID | Requirement | Security purpose |
|---|---|---|
| BR-01 | Reception can use the synthetic patient application but cannot administer systems | Least privilege |
| BR-02 | Clinicians can access required synthetic patient records | Role-based access |
| BR-03 | IT can administer endpoints only from controlled sources | Administrative path control |
| BR-04 | The public portal is placed in a DMZ | Attack surface reduction |
| BR-05 | The portal reaches only required backend services | Segmentation |
| BR-06 | Patient data is encrypted in transit where practical | Confidentiality |
| BR-07 | User access is attributable to named accounts | Accountability |
| BR-08 | Logs support investigation and 30-day lab retention design | Detection and auditability |
| BR-09 | Backups and restore procedures are tested | Availability and recovery |
| BR-10 | Risks, exceptions, and residual risk are communicated to management | Governance |

## Team Roles

Rotate roles during the project.

| Role | Responsibility |
|---|---|
| Engagement lead | Scope, schedule, stakeholder updates, final presentation |
| Security architect | Network zones, trust boundaries, control design, risk register |
| Systems administrator | Windows Server, AD, Linux services, backups |
| Network engineer | pfSense interfaces, aliases, rules, traffic validation |
| SOC analyst | Wazuh onboarding, alert search, triage, detection evidence |
| Vulnerability analyst | Nmap/OpenVAS scope, scan evidence, validation, remediation recommendation |
| Quality reviewer | Evidence quality, secrets review, report clarity, acceptance gate |

One student may hold more than one role in a small class, but nobody should approve their own risky change.

## Required Evidence Structure

Create a project folder:

```text
brightcare-project/
  README.md
  scope-and-authorization.md
  design/
  evidence/
    01-discovery/
    02-identity/
    03-network/
    04-services/
    05-monitoring/
    06-vulnerability/
    07-recovery/
    08-injects/
  reports/
    technical-report.md
    executive-summary.md
    presentation-notes.md
  hashes.sha256
```

Evidence must include:

- Date and time.
- Student or team name.
- System name.
- Command output or screenshot.
- Short interpretation.
- Hashes for important exported files.

## Work Package 1 - Discovery and Authorization

### Task

Interview the instructor acting as clinic manager, application owner, privacy lead, and IT provider.

### Required outputs

Create:

- Scope and authorization record.
- Asset inventory.
- Data inventory.
- Identity inventory.
- Dependency inventory.
- Initial risk register.
- Assumptions and unknowns list.

### Minimum questions to ask

| Area | Questions |
|---|---|
| Business | Which services must remain available during clinic hours? |
| Data | What synthetic data represents patient records, appointment data, billing data, and staff data? |
| Users | Which roles need access: reception, clinician, IT, management, vendor? |
| Downtime | What is the maximum acceptable outage for the portal and internal app? |
| Remote access | Who needs remote administration and from where? |
| Logs | Who reviews alerts and how quickly? |
| Backups | What data must be restored first after an outage? |

### Discovery commands

Run only against approved lab systems.

Linux:

```bash
hostnamectl
ip -br address
ip route
sudo ss -lntup
sudo systemctl --failed
```

Windows:

```powershell
hostname
Get-NetIPConfiguration
Get-LocalUser
Get-LocalGroup
Get-NetTCPConnection -State Listen
```

Nmap from approved Kali:

```bash
nmap -Pn -n -sT -p 22,53,80,88,135,389,443,445,464,636,1514,1515 --reason <APPROVED_IPS>
```

### Acceptance criteria

- Source and target systems are verified.
- No public IPs are scanned.
- At least 12 realistic risks are documented.
- Every risk has an owner, impact, likelihood, existing control, and treatment option.

## Work Package 2 - Architecture and Threat Model

### Task

Design the secure clinic architecture before building.

### Required outputs

- Network topology diagram.
- Data-flow diagram from patient browser to portal to backend.
- Trust-boundary diagram.
- Administrative access path diagram.
- Firewall rule matrix.
- AD OU and group design.
- Logging matrix.
- Backup and recovery design.

### Required design decisions

| Decision | Minimum expectation |
|---|---|
| Network zones | USERS, SERVERS, DMZ, SOC |
| Portal placement | Portal in DMZ |
| Backend access | Portal can reach only required backend port |
| Administration | Admin protocols allowed only from controlled source |
| Identity | Named users and groups, not shared local admin |
| Logging | Domain controller, Windows client, portal, backend, and firewall logs considered |
| Recovery | Backup and restore test planned before final presentation |

`Any -> any` firewall access is rejected unless it is temporary, documented, time-limited, and approved by the instructor.

## Work Package 3 - Identity and Access Control

### Task

Build role-based identity and access using Windows Server and Active Directory.

### Required groups

| Group | Purpose |
|---|---|
| `GG_Reception` | Reception staff |
| `GG_Clinicians` | Clinical staff |
| `GG_IT_Helpdesk` | IT support |
| `GG_Clinic_Managers` | Management review role |
| `DL_PatientRecords_Read` | Read access to synthetic patient records |
| `DL_PatientRecords_Modify` | Modify access to synthetic patient records |
| `DL_Admin_Tools_Access` | Access to approved administration tools |

### Required tests

| Test | Expected result |
|---|---|
| Reception user signs in | Allowed |
| Reception user is local admin | Denied |
| Clinician opens synthetic patient records | Allowed |
| Unauthorized user opens patient records | Denied |
| Disabled user signs in | Denied |
| Helpdesk performs approved admin action | Allowed only from approved source |

### Evidence commands

```powershell
Get-ADUser -Filter * -Properties Enabled,MemberOf
Get-ADGroup -Filter * | Select-Object Name,GroupScope,GroupCategory
Get-ADGroupMember GG_Reception
Get-ADGroupMember GG_Clinicians
whoami /groups
gpresult /h C:\brightcare-gpresult.html
```

### Acceptance criteria

- Access is assigned through groups.
- Direct user permissions are avoided or documented as exceptions.
- At least one allowed and one denied access test are proven.

## Work Package 4 - Network Segmentation and Firewall Policy

### Task

Use pfSense to enforce clinic segmentation.

### Required flows

| Source | Destination | Purpose | Expected action |
|---|---|---|---|
| USERS | Portal HTTPS | Staff access to portal | Allow |
| DMZ portal | Backend required port | Application function | Allow |
| USERS | Backend database | Direct access not allowed | Block |
| USERS | Domain controller DNS/Kerberos/LDAP as required | Domain function | Allow only required services |
| USERS | Server management ports | Staff should not administer servers | Block |
| ADMIN/SOC source | Server management ports | IT administration | Allow |
| DMZ | USERS | DMZ should not initiate to workstations | Block |
| SOC | Required log collection paths | Monitoring | Allow |

### Required validation

Run at least 16 firewall tests:

- 8 allowed tests.
- 8 blocked tests.

Each test must record:

```text
Test ID:
Source:
Destination:
Port/protocol:
Expected result:
Actual result:
pfSense rule:
Log evidence:
Interpretation:
```

### Useful commands

```bash
nc -vz -w 3 <TARGET_IP> <PORT>
curl -vk --connect-timeout 5 https://<TARGET_IP>/
nmap -Pn -n -sT -p <APPROVED_PORTS> --reason <APPROVED_TARGET>
```

### Acceptance criteria

- The portal remains reachable on approved HTTPS path.
- Direct user access to backend services is blocked.
- DMZ cannot broadly initiate into internal networks.
- pfSense logs prove both allowed and denied traffic.

## Work Package 5 - Portal, TLS, and Linux Hardening

### Task

Deploy a synthetic appointment portal in the DMZ and apply Linux hardening.

### Minimum portal requirement

The portal can be a simple Nginx page containing only synthetic content:

```text
BrightCare Clinic Appointment Portal
Synthetic training system only.
No real patient data.
```

### Required controls

| Control | Minimum expectation |
|---|---|
| TLS | Use a lab certificate or instructor-approved certificate method |
| SSH | Restrict administration to approved source |
| UFW | Allow only required local ports |
| Updates | Review and apply approved package updates |
| Permissions | Portal files owned by appropriate user/group |
| Logs | Web and authentication logs preserved |

### Validation commands

```bash
curl -vk --connect-timeout 5 https://portal.brightcare.lab/
openssl s_client -connect <PORTAL_IP>:443 -servername portal.brightcare.lab </dev/null
sudo ss -lntup
sudo ufw status verbose
sudo tail -n 50 /var/log/nginx/access.log
sudo tail -n 50 /var/log/auth.log
```

### Acceptance criteria

- Portal is reachable only through approved paths.
- TLS is inspected and documented.
- Linux host exposes only expected services.
- Logs show portal access and administration activity.

## Work Package 6 - Monitoring and Detection

### Task

Send useful security telemetry to Wazuh and create detection evidence.

### Required log sources

| Source | Minimum evidence |
|---|---|
| Domain controller | Authentication or account/group change events |
| Windows client | Logon or endpoint security events |
| Portal server | Authentication and web logs |
| Backend server | Service and authentication logs |
| pfSense | Firewall allow/block logs |

### Required detections

Create and test detections for:

1. Privileged-group membership change.
2. Repeated failed authentication followed by success.
3. Portal configuration-file change.
4. Endpoint telemetry loss.

Each detection must include:

```text
Detection name:
Hypothesis:
Data source:
Important fields:
ATT&CK mapping if relevant:
Positive test:
Negative test:
False-positive notes:
Triage steps:
Owner:
```

### Acceptance criteria

- Events are visible in Wazuh or documented as local log evidence if Wazuh is unavailable.
- Alerts are explained, not simply screenshotted.
- Students can separate benign true positive, suspicious activity, false positive, and telemetry gap.

## Work Package 7 - Vulnerability Assessment and Remediation

### Task

Run an authorized vulnerability review against only the server and DMZ systems.

### Requirements

- Confirm written scope.
- Run Nmap service discovery against approved targets.
- Run Greenbone/OpenVAS scan only against approved targets.
- Export the scanner report.
- Select five findings for review.
- Manually validate at least two findings.
- Remediate or mitigate one approved issue.
- Rescan or retest to prove the result.

### Finding worksheet

```text
Finding title:
Affected host:
Affected service:
CVE/CVSS if available:
Scanner evidence:
Manual validation:
Business impact:
CIA impact:
Recommended treatment:
Owner:
Due date:
Residual risk:
```

### Acceptance criteria

- No public or out-of-scope scanning occurs.
- Scanner output is not treated as final proof without validation.
- One approved remediation or mitigation is tested without breaking the portal.

## Work Package 8 - Backup, Recovery, and Incident Readiness

### Task

Prove that the clinic can recover from a realistic service or data problem.

### Required exercises

| Exercise | Expected proof |
|---|---|
| Portal restore | Backup exists and portal content/config can be restored |
| Disabled-user access test | Disabled account cannot access clinic resource |
| Incorrect TLS identity test | Student explains certificate name or trust failure |
| Wazuh agent interruption and recovery | Telemetry loss and recovery timeline |
| pfSense configuration restore drill | Backup export and restore plan |

### Recovery report fields

```text
Recovery scenario:
Affected service:
Recovery point:
Recovery time:
Validation test:
Business owner sign-off:
Remaining risk:
```

### Acceptance criteria

- Recovery is tested, not assumed.
- RPO and RTO are measured or estimated honestly.
- Security monitoring after recovery is checked.

## Scheduled Injects

The instructor releases injects only after baseline evidence exists.

| Inject | Scenario | Student response |
|---|---|---|
| Day 3 | A locum clinician needs access for 48 hours | Create time-limited access plan, approval record, and removal test |
| Day 6 | Portal vendor asks for direct RDP/SSH from the Internet | Reject broad direct access and propose secure support alternative |
| Day 8 | Wazuh stops receiving logs from the portal during a busy clinic | Triage telemetry path, communicate risk, recover logging |
| Day 10 | Scanner reports a critical package, but patching may exceed downtime limit | Validate finding, assess risk, propose mitigation or change window |

For each inject, students must record:

```text
Inject received:
UTC time:
Business impact:
Security risk:
Known facts:
Unknowns:
Decision requested:
Approved action:
Evidence preserved:
Validation result:
Stakeholder update:
```

## Required Deliverables

Submit:

- Scope and authorization record.
- Asset, identity, data, and dependency inventories.
- Risk register with at least 12 risks.
- Network topology, data-flow, trust-boundary, and admin-path diagrams.
- pfSense rule matrix and configuration export with secrets removed.
- 16 firewall tests with pfSense log evidence.
- AD OU/group/user design and access test evidence.
- Portal TLS and Linux hardening evidence.
- Wazuh source onboarding and four detection test packs.
- Vulnerability assessment report and finding worksheets.
- One remediation or mitigation proof.
- Backup and recovery evidence.
- Inject response records.
- Technical report.
- Executive summary.
- Five-minute board briefing.
- Fifteen-minute technical defense.

## Technical Report Template

```text
Title: BrightCare Clinic Security Improvement Project

1. Executive Summary
2. Scope and Authorization
3. Business Requirements
4. Environment and Architecture
5. Asset and Data Inventory
6. Threat Model and Risk Register
7. Identity and Access Control
8. Network Segmentation and Firewall Policy
9. Portal, TLS, and Linux Hardening
10. Monitoring and Detection
11. Vulnerability Assessment
12. Backup and Recovery
13. Inject Responses
14. Validation Evidence
15. Residual Risk
16. Roadmap and Recommendations
17. Evidence Index
18. Limitations
```

## Executive Summary Standard

The executive summary must be understandable to clinic management. It should answer:

- What business risk existed before the project?
- What was improved?
- What evidence proves the improvement?
- What risk remains?
- What decision or funding does management need to make next?

Avoid tool-heavy language in the executive summary. Put commands and technical details in the technical report.

## Acceptance Gate

The project fails the gate if:

- Any target is bridged to a real network without written approval.
- Synthetic patient records are publicly reachable.
- Reception users remain local administrators without a documented approved exception.
- The DMZ has broad internal access.
- Firewall rules rely on broad `any -> any` access.
- Logs are absent from critical systems.
- Recovery is untested.
- Vulnerability findings are exaggerated beyond evidence.
- Passwords, tokens, or secrets appear in submissions.
- The team performs scanning or testing outside scope.

## Scoring Rubric

| Category | Points | Full-credit standard |
|---|---:|---|
| Scope, safety, and professionalism | 10 | Clear authorization, correct targets, no real data, no scope violations |
| Discovery and risk analysis | 15 | Strong inventories, data flows, trust boundaries, and realistic risk register |
| Architecture and control design | 15 | Segmentation, least privilege, logging, backup, and rejected options are defensible |
| Technical implementation | 20 | Identity, firewall, portal, TLS, Linux hardening, and monitoring work as designed |
| Validation and troubleshooting | 15 | Positive, negative, recovery, and monitoring tests are evidenced |
| Vulnerability management | 10 | Scan scope, validation, remediation/mitigation, and rescan are professional |
| Reporting and communication | 10 | Technical report, executive summary, and briefing are clear and honest |
| Oral defense | 5 | Team can explain decisions, evidence, limitations, and residual risk |

## Oral Defense Questions

Students should be ready to answer:

1. What patient-data risk was most important?
2. What changed in the network design?
3. Which firewall rule was most important and why?
4. How did you prove reception users are not administrators?
5. How did you prove the DMZ cannot broadly access internal systems?
6. What detection did you build and how did you test it?
7. What vulnerability finding did you validate?
8. What remediation or mitigation did you apply?
9. What recovery test did you perform?
10. What residual risk should management address next?

## Job-Readiness Outcomes

This project prepares students for entry-level work by requiring them to:

| Job skill | Project evidence |
|---|---|
| Security administration | AD groups, GPO evidence, least privilege tests |
| Network security | pfSense rule matrix, allowed/blocked validation, DMZ design |
| SOC analysis | Wazuh alerts, detection tests, telemetry-loss investigation |
| Vulnerability management | Nmap/OpenVAS evidence, validation, risk ranking, remediation |
| Incident readiness | Inject responses, recovery tests, communication notes |
| Risk communication | Executive summary, risk register, residual-risk roadmap |
| Professional discipline | Authorization, evidence hashes, sanitized exports, oral defense |

Completion does not guarantee employment, but a well-executed submission gives students a strong portfolio artifact and practical interview examples.
