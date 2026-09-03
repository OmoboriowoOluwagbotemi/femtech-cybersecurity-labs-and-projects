# FEMTECH Core Tool Skills Pathway

## Purpose

This pathway makes the practical programme tool-focused without turning the course into tool memorisation. Students must repeatedly use the same core platforms in realistic security workflows until they can configure, validate, troubleshoot, document, and explain their work.

The core technical stack for this course is:

- Kali Linux
- Ubuntu Server
- pfSense
- Windows Server
- Greenbone/OpenVAS
- Wazuh

These tools were selected because they are no-cost or evaluation-friendly, common in training environments, and directly connected to entry-level cybersecurity work such as SOC analysis, system hardening, vulnerability management, security administration, and junior incident response.

## Skill Standard

A student has not mastered a tool simply because they opened it or followed one command. For every core tool, the student must prove that they can:

1. Install or access the tool in the approved lab environment.
2. Confirm network placement, IP address, DNS, routing, and allowed scope.
3. Perform the assigned security task safely.
4. Save evidence before and after the change or test.
5. Validate success using at least one independent method.
6. Troubleshoot common failure conditions without guessing.
7. Explain the security value, limitation, and business impact.
8. Write a short technical report that another analyst could reproduce.

## Core Tool Progression

| Tool | First exposure | Skill-building labs | Professional outcome |
|---|---|---|---|
| Kali Linux | Lab 01 | Labs 03, 04, 05, 09, 10, 11, 14, 15, 16 | Analyst workstation for discovery, validation, packet review, evidence collection, and controlled security testing |
| Ubuntu Server | Lab 01 | Labs 02, 03, 04, 05, 09, 10, 11, 12, 14 | Linux administration, hardening, service validation, logging, remediation, and incident evidence |
| pfSense | Lab 01 | Labs 05, 06, 10, 11, 12, 14, 16 | Segmentation, firewall policy, DHCP, NAT, routing validation, and log-based troubleshooting |
| Windows Server | Lab 07 | Labs 08, 12, 13, 14 | Server roles, Event Viewer, Active Directory basics, Group Policy, access control, and Windows security logging |
| Greenbone/OpenVAS | Lab 11 | Lab 16 | Vulnerability scanning, finding validation, risk ranking, remediation tracking, and rescan proof |
| Wazuh | Lab 12 | Labs 13, 14, 15 | Endpoint telemetry, SIEM investigation, alert validation, detection tuning, and incident response evidence |

## Kali Linux Skills

Kali is the analyst workstation. In this course it is used for authorised discovery, validation, packet work, web testing, vulnerability assessment support, and forensic handling. Students must treat Kali as a professional workbench, not as an attack toy.

Required student skills:

- Confirm adapter mode and prove Kali is not bridged to the physical network.
- Record source IP, target IP, gateway, DNS server, route, and time before testing.
- Use `ip`, `ss`, `dig`, `nc`, `curl`, `openssl`, `nmap`, `tcpdump`, `tshark`, and browser tools where relevant.
- Save Nmap output in normal, grepable, and XML formats when asset or vulnerability evidence is required.
- Capture packets only for authorised targets and hash the PCAP.
- Keep case folders organised by date, lab, source, target, and evidence type.
- Explain the difference between discovery, service validation, vulnerability scanning, exploitation, and denial of service.

Minimum Kali evidence:

- `ip -br address` and `ip route` output.
- Scope statement showing authorised target range.
- Nmap or validation output saved to file.
- At least one negative test showing a blocked or out-of-scope path is not used.
- Analyst notes explaining what the result proves and what it does not prove.

## Ubuntu Server Skills

Ubuntu Server is the main Linux target and service platform. Students must become comfortable administering it because many real organizations run Linux for web services, monitoring, automation, databases, development platforms, and internal applications.

Required student skills:

- Install updates with APT and record package state.
- Create users, groups, ownership, permissions, and basic ACLs.
- Inspect processes, listeners, services, timers, and logs.
- Configure SSH safely using keys, limited administration, and disabled root login.
- Configure UFW to allow required services and deny unnecessary exposure.
- Install and validate Fail2Ban where authorised.
- Read `/var/log/auth.log`, syslog, application logs, and `journalctl`.
- Use `systemctl` to start, stop, restart, enable, disable, and inspect services.
- Make a backup before changing critical files.
- Remediate one approved vulnerability or misconfiguration and prove the fix.

Minimum Ubuntu evidence:

- Before-and-after `ss -lntup` output.
- Before-and-after UFW status.
- SSH configuration excerpt with risky options corrected.
- Authentication log evidence showing approved success and denied failure.
- Service status and journal evidence.
- Clear rollback note or snapshot reference.

## pfSense Skills

pfSense is the course firewall and segmentation platform. Students must understand that firewalls are not only devices with rules; they are enforcement points for trust boundaries, routing, visibility, and change control.

Required student skills:

- Assign and label interfaces correctly.
- Configure internal networks, DHCP scopes, gateways, and DNS forwarding where required.
- Create aliases for hosts, networks, and ports.
- Write firewall rules using correct ingress interface, source, destination, protocol, port, description, and order.
- Validate allowed and denied traffic from the correct source network.
- Read firewall logs and distinguish blocked traffic, allowed traffic, routing failure, DNS failure, and host firewall failure.
- Export configuration before and after major changes.
- Avoid broad `any-any` rules except as temporary, documented troubleshooting steps that are removed before submission.

Minimum pfSense evidence:

- Interface table with names, subnets, and purpose.
- Rule matrix showing business intent.
- Screenshot or export evidence of final aliases and rules.
- Positive test for permitted traffic.
- Negative test for denied traffic.
- Firewall log entry matching at least one allowed or blocked test.

## Windows Server Skills

Windows Server is used for enterprise identity and infrastructure administration. Students must understand Windows Server as a business-critical platform for DNS, DHCP, Active Directory, authentication, authorization, Group Policy, and security logging.

Required student skills:

- Configure server name, static IP, DNS settings, and time.
- Install and document approved server roles.
- Use Server Manager, Event Viewer, Windows Defender, Windows Firewall, and PowerShell.
- Build basic Active Directory structure with users, groups, and organizational units.
- Apply least privilege using groups instead of assigning permissions directly to many individual users.
- Create and test basic Group Policy settings.
- Inspect Windows Security logs for successful logon, failed logon, account creation, group membership change, and policy-related events.
- Distinguish local accounts, domain accounts, service accounts, privileged groups, Kerberos, NTLM, and LDAP at a beginner professional level.

Minimum Windows Server evidence:

- `Get-NetIPConfiguration` output.
- Role installation evidence.
- AD structure screenshot or PowerShell export.
- Group membership proof.
- Resultant policy or `gpresult` evidence.
- EVTX export or Event Viewer evidence for assigned security events.

## Greenbone/OpenVAS Skills

Greenbone/OpenVAS is the vulnerability assessment platform. Students must learn that scanners produce leads, not final truth. A professional analyst validates findings, ranks them with context, communicates risk clearly, and confirms remediation with a rescan.

Required student skills:

- Install and start Greenbone/OpenVAS on Kali for the lab.
- Confirm feeds and services are healthy before scanning.
- Create a target using only the authorised IP or hostname.
- Create a scan task with a safe scan profile approved by the instructor.
- Run a baseline scan and export the report.
- Select one finding and manually validate whether the affected service, version, configuration, or exposure is real.
- Rank findings using severity, exploitability, exposure, asset value, compensating controls, and business impact.
- Remediate one approved issue on Ubuntu or Windows where the lab permits it.
- Rescan only the authorised target and prove whether the finding is closed, reduced, accepted, or still open.

Minimum Greenbone/OpenVAS evidence:

- Setup and service health output.
- Target configuration showing exact authorised scope.
- Scan report export.
- Validation notes for at least one finding.
- Remediation evidence.
- Rescan evidence.
- Short vulnerability report with priority, affected asset, proof, risk, recommendation, owner, and status.

## Wazuh Skills

Wazuh is the course SIEM/XDR platform. Students must learn the full telemetry path: endpoint event, agent collection, manager analysis, indexed data, dashboard search, alert interpretation, triage, tuning, and response recommendation.

Required student skills:

- Install or access an approved Wazuh manager.
- Onboard at least one Ubuntu agent and one Windows agent where resources permit.
- Confirm agent status and troubleshoot disconnected agents.
- Generate known benign security events such as failed SSH login, successful SSH login, file change, Windows failed logon, account creation, or group membership change.
- Search Wazuh for the event by host, user, source IP, time window, rule ID, and event field.
- Explain decoder fields, rule level, alert grouping, and severity interpretation.
- Tune a noisy alert using documented reasoning.
- Preserve raw event and alert evidence before recommending containment or remediation.

Minimum Wazuh evidence:

- Agent enrollment and active status.
- Raw event evidence.
- Alert evidence with rule ID, level, timestamp, agent, and source.
- Search query or dashboard filter used.
- One troubleshooting record for agent, firewall, time, DNS, or log-source failure.
- One triage note mapping event, impact, likely cause, and recommended next step.

## Cross-Tool Professional Drills

Students should repeat these drills throughout the course. They are short exercises that turn tool familiarity into job-ready habits.

| Drill | Tools | Student must prove |
|---|---|---|
| Network truth drill | Kali, Ubuntu, pfSense | Source IP, target IP, route, DNS, port, firewall decision, and log evidence all agree |
| Hardening validation drill | Ubuntu, Kali, pfSense | A service remains available to approved users and blocked from unapproved paths |
| Windows identity drill | Windows Server, Windows client, Wazuh | User/group change appears in Windows logs and Wazuh with correct context |
| Vulnerability lifecycle drill | Kali, OpenVAS, Ubuntu, pfSense | Finding is scanned, validated, prioritised, remediated, and rescanned |
| SOC alert drill | Wazuh, Ubuntu, Windows Server, pfSense | Alert is traced from endpoint or network event to business impact and response |
| Troubleshooting drill | All core tools | Student tests one layer at a time and records hypothesis, test, result, and decision |

## Minimum Employability Portfolio

By the end of the labs, every student should have a portfolio folder containing:

- Cyber range topology with IP plan, segmentation design, and isolation proof.
- Ubuntu hardening report with SSH, UFW, logs, and validation evidence.
- pfSense rule matrix with screenshots or exported configuration evidence.
- Windows Server/Active Directory report with users, groups, OU structure, GPO evidence, and security logs.
- OpenVAS vulnerability assessment report with validated finding, remediation, and rescan proof.
- Wazuh deployment and alert triage report with raw event, alert, search, and recommendation.
- One incident response report combining Wazuh, Ubuntu logs, pfSense logs, and timeline evidence.
- Hashes for submitted evidence and a short explanation of evidence integrity.

This portfolio does not guarantee employment by itself, but it gives the student interview-ready proof of practical ability. A student who can explain these artefacts clearly has a stronger foundation for SOC Analyst, Junior Cybersecurity Analyst, Security Administrator, Systems Administrator, Vulnerability Management Assistant, and Junior Incident Response roles.

## Instructor Quality Checklist

Before accepting a lab submission, verify:

- The lab was performed inside the approved isolated range.
- The evidence contains timestamps, hostnames, IP addresses, commands, and interpretation.
- The student validated both successful and blocked behavior where relevant.
- The student did not rely only on screenshots.
- The student can explain important commands and tool output without reading from the notes.
- Findings are written in business language as well as technical language.
- Reports identify limitations and next steps.
- No real credentials, personal data, production data, or public targets were used.

