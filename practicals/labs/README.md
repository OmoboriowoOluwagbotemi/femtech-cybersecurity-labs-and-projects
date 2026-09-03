# Guided Lab Index

Use these labs with the [Core Tool Skills Pathway](../CORE_TOOL_SKILLS_PATHWAY.md). The pathway explains the required practical competencies for Kali Linux, Ubuntu Server, pfSense, Windows Server, Greenbone/OpenVAS, and Wazuh.

1. [Build and prove an isolated cyber range](lab-01-isolated-cyber-range.md)
2. [Linux administration and least privilege](lab-02-linux-least-privilege.md)
3. [Harden and audit an Ubuntu server](lab-03-ubuntu-hardening.md)
4. [Build a private PKI and secure a web service](lab-04-private-pki-tls.md)
5. [Discover, classify, and baseline assets](lab-05-asset-discovery.md)
6. [Segment an enterprise with pfSense](lab-06-pfsense-segmentation.md)
7. [Build Active Directory and role-based access](lab-07-active-directory-rbac.md)
8. [Harden and monitor a Windows endpoint](lab-08-windows-hardening-monitoring.md)
9. [Assess an intentionally vulnerable web application](lab-09-web-security-assessment.md)
10. [Detect network activity with Suricata and Zeek](lab-10-network-detection.md)
11. [Run a governed vulnerability-management cycle](lab-11-vulnerability-management.md)
12. [Deploy Wazuh and onboard endpoints](lab-12-wazuh-deployment.md)
13. [Engineer and tune a detection](lab-13-detection-engineering.md)
14. [Triage and contain a simulated incident](lab-14-incident-response.md)
15. [Preserve evidence and build a forensic timeline](lab-15-forensic-timeline.md)
16. [Perform a professional vulnerability assessment with Nmap and Greenbone/OpenVAS](lab-16-professional-vulnerability-assessment.md)

Read the [programme guide](../README.md) before Lab 01. Its rules of engagement, evidence standard, topology, troubleshooting method, and scoring model apply to every lab.

## Core Tool Checkpoints

| Checkpoint | Labs | Required student capability |
|---|---|---|
| Kali analyst workstation | 01, 03, 05, 09, 10, 11, 14, 15, 16 | Verify isolation, record source/target details, run authorised validation commands, preserve evidence, and explain output |
| Ubuntu Server administration | 01, 02, 03, 04, 05, 09, 10, 11, 12, 14 | Manage users, permissions, services, logs, SSH, UFW, hardening, remediation, and rollback |
| pfSense firewall and segmentation | 01, 05, 06, 10, 11, 12, 14, 16 | Configure interfaces, DHCP, NAT, aliases, rules, logs, and positive/negative traffic tests |
| Windows Server and AD | 07, 08, 12, 13, 14 | Build basic enterprise identity, apply groups and policy, inspect Windows events, and connect telemetry to Wazuh |
| Greenbone/OpenVAS vulnerability management | 11, 16 | Install or operate scanner, create scoped targets, scan, validate findings, remediate, rescan, and report |
| Wazuh SIEM/XDR | 12, 13, 14, 15 | Onboard agents, generate events, search alerts, interpret rule details, tune noise, and support incident response |

Students should not move to the capstone until they can complete each checkpoint with limited instructor prompting.

## Lab Completion Matrix

Each lab must produce technical evidence, written interpretation, and a professional decision. The table below defines the minimum standard for a complete submission.

| Lab | Core tools reinforced | Student must demonstrate | Minimum evidence | Pass condition |
|---|---|---|---|---|
| 01 - Isolated cyber range | VirtualBox, pfSense, Kali, Ubuntu Server | Build an isolated routed lab and prove targets do not touch the physical LAN directly | VM adapter proof, IP plan, pfSense routes/rules, Kali-to-Ubuntu positive and negative tests, snapshot proof | Student can safely create, validate, and recover the lab range |
| 02 - Linux least privilege | Ubuntu Server, Bash, Linux permissions | Create users, groups, shared folders, setgid directories, sudo boundaries, and log-review access | `id`, `groups`, `namei`, `getfacl`, sudo test, denied-access test, command log | Student can apply least privilege without breaking required work |
| 03 - Ubuntu hardening | Ubuntu Server, SSH, UFW, Fail2Ban, auditd, Kali | Harden SSH, configure host firewall rules, validate lockout controls, and preserve audit evidence | SSH before/after config, UFW status, Nmap validation, auth logs, Fail2Ban status, audit rules | Student can harden a Linux server and prove business services still work |
| 04 - Private PKI and TLS | Ubuntu Server, OpenSSL, Nginx, Kali | Build a private CA, issue a server certificate, configure TLS, and validate trust correctly | CA files, CSR, certificate details, Nginx config, `openssl s_client` validation, file-permission proof | Student can explain and operate basic certificate lifecycle tasks |
| 05 - Asset discovery | Kali, Nmap, Ubuntu Server, pfSense, optional Windows Server | Discover assets safely, reconcile network and host evidence, identify unknown assets, and build an inventory | Scope record, route proof, Nmap outputs, host listener checks, inventory, rogue-asset escalation | Student can turn scan output into a business asset inventory |
| 06 - pfSense segmentation | pfSense, Kali, Ubuntu Server, Wazuh/analyst host | Build segmented firewall policy using interfaces, aliases, rules, logs, and traffic validation | Interface plan, alias list, rule matrix, allowed/denied tests, firewall logs, config export | Student can enforce and troubleshoot segmentation rules |
| 07 - Active Directory RBAC | Windows Server, AD DS, DNS, PowerShell, Windows client | Build basic domain structure, groups, OUs, shared access, GPO, and account lifecycle workflow | IP/DNS proof, AD objects, group membership, GPO report, access tests, event evidence | Student can administer basic identity and authorization safely |
| 08 - Windows hardening and monitoring | Windows endpoint/server tools, Defender, Firewall, Event Viewer, PowerShell, Sysmon | Baseline Windows security, enable audit controls, generate benign events, export logs, and validate telemetry | Defender status, firewall profiles, audit policy, EVTX exports, Sysmon/osquery evidence | Student can harden and monitor Windows with defensible evidence |
| 09 - Web security assessment | Ubuntu DMZ, OWASP Juice Shop, ZAP, Kali, Nmap | Assess an intentionally vulnerable web application within strict scope and validate findings manually | Scope statement, app map, ZAP report, manual validation, finding triage, cleanup proof | Student can report web weaknesses without unsafe testing behavior |
| 10 - Network detection | Ubuntu Server, Suricata, Zeek, tcpdump, Kali | Deploy detection, write a local rule, generate safe traffic, compare alert data with Zeek metadata | Suricata test output, local rule, PCAP hash, EVE alert, Zeek logs, tuning notes | Student can explain what an alert proves and what it does not prove |
| 11 - Vulnerability management | Kali, Greenbone/OpenVAS, Nmap, Ubuntu, pfSense | Run a governed scan, validate findings, rank risk, remediate one issue, and confirm closure | Scan plan, feed health, reports, five validation records, risk register, remediation, retest | Student can manage vulnerabilities as a lifecycle, not just run a scanner |
| 12 - Wazuh deployment | Wazuh, Ubuntu Server, Kali, pfSense | Deploy Wazuh, onboard an Ubuntu agent, trace authentication/FIM events, and troubleshoot telemetry loss | Service status, agent status, raw event, alert, query/filter, FIM change, telemetry failure timeline | Student can prove an event travelled from endpoint to SIEM dashboard |
| 13 - Detection engineering | Wazuh, Windows logs, Sigma concepts, PowerShell | Build a detection hypothesis, test known positives/benign activity, tune noise, and write a triage runbook | Source events, Wazuh fields, local rule, test matrix, false-positive analysis, runbook | Student can create a usable detection with documented limits |
| 14 - Incident response | Wazuh, Ubuntu logs, pfSense logs, PCAP, Kali | Triage an incident, preserve evidence, correlate sources, scope impact, and recommend containment | Intake record, volatile state, log exports, timeline, IOC notes, scope table, incident report | Student can separate confirmed facts from assumptions during response |
| 15 - Forensic timeline | Kali/Ubuntu forensic VM, Volatility, EVTX tools, tshark, YARA, Sleuth Kit/Autopsy | Preserve evidence, analyse memory/log/PCAP/disk artefacts, test hypotheses, and build a timeline | Chain-of-custody record, hashes, tool versions, process/network/log artefacts, timeline | Student can defend a forensic conclusion with traceable evidence |
| 16 - Professional vulnerability assessment | Kali, Nmap, Greenbone/OpenVAS, Ubuntu Server, pfSense | Complete a full vulnerability assessment from authorization to management report | Authorization record, Nmap evidence, OpenVAS setup, baseline report, finding worksheet, remediation, rescan, final report | Student can perform and explain an end-to-end vulnerability assessment |

## Minimum Completeness Rules

A lab is incomplete until it contains:

- A written scope and authorization record.
- Source and target IP proof.
- Before-state evidence.
- The exact command, configuration, or GUI action used.
- Validation evidence showing the expected result.
- At least one negative or blocked test where the lab objective involves access control, firewalling, hardening, detection, or segmentation.
- Troubleshooting notes when the first attempt fails.
- Evidence hashes for important exported files.
- A short technical report and a short management summary.
- A clear statement of remaining risk and next action.

Screenshots are allowed, but they must support evidence rather than replace it. Strong submissions include saved command output, configuration exports, log files, reports, PCAPs, EVTX files, CSV/XML/JSON exports, and written interpretation.
