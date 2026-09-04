# Tool Lab Index

Use these labs with the [Core Tool Skills Pathway](../CORE_TOOL_SKILLS_PATHWAY.md). The labs are now organised around the main tools students must operate confidently: Kali Linux, Ubuntu Server, pfSense, Windows Server, Greenbone/OpenVAS, and Wazuh.

## Required Tool Labs

1. [Introduction to VirtualBox, Kali Linux, and Bash](tool-lab-01-kali-analyst-workstation.md)
2. [Ubuntu Server Administration and Hardening](tool-lab-02-ubuntu-server-hardening.md)
3. [pfSense Firewall and Segmentation](tool-lab-03-pfsense-firewall-segmentation.md)
4. [Windows Server and Active Directory](tool-lab-04-windows-server-active-directory.md)
5. [Greenbone/OpenVAS Vulnerability Assessment on Kali](tool-lab-05-openvas-vulnerability-assessment.md)
6. [Wazuh SIEM/XDR Operations](tool-lab-06-wazuh-siem-xdr.md)

## Advanced Integration Lab

7. [Professional Vulnerability Assessment with Nmap and Greenbone/OpenVAS](tool-lab-07-professional-vulnerability-assessment.md)

Read the [programme guide](../README.md) before Tool Lab 01. Its rules of engagement, evidence standard, topology, troubleshooting method, and scoring model apply to every lab.

## Tool Competency Checkpoints

| Checkpoint | Labs | Required student capability |
|---|---|---|
| VirtualBox, Kali Linux, and Bash basics | Tool Lab 01 | Start Kali in VirtualBox, use the Linux terminal, navigate files/folders, create evidence, use beginner Bash variables/loops/scripts, and explain output |
| Ubuntu Server administration | Tool Labs 02, 05, 06, Advanced Lab 07 | Manage users, permissions, services, logs, SSH, UFW, hardening, remediation, and rollback |
| pfSense firewall and segmentation | Tool Labs 03, 05, 06, Advanced Lab 07 | Configure interfaces, DHCP, NAT, aliases, rules, logs, and positive/negative traffic tests |
| Windows Server and AD | Tool Labs 04, 06 | Build basic enterprise identity, apply groups and policy, inspect Windows events, and connect telemetry to Wazuh |
| Greenbone/OpenVAS vulnerability management | Tool Lab 05, Advanced Lab 07 | Install or operate scanner, create scoped targets, scan, validate findings, remediate, rescan, and report |
| Wazuh SIEM/XDR | Tool Lab 06 | Onboard agents, generate events, search alerts, interpret rule details, tune noise, and support incident response |

Students should not move to the advanced integration lab until they can complete each checkpoint with limited instructor prompting.

## Tool Lab Completion Matrix

Each tool lab must produce technical evidence, written interpretation, and a professional decision. The table below defines the minimum standard for a complete submission.

| Lab | Core tools reinforced | Student must demonstrate | Minimum evidence | Pass condition |
|---|---|---|---|---|
| Tool Lab 01 - Introduction to VirtualBox, Kali Linux, and Bash | VirtualBox, Kali, Bash | Start Kali, navigate Linux, manage files/folders, explain permissions, identify processes/services, review packages/logs, check local network settings, use Bash variables/loops/scripts, and hash files | Linux orientation evidence, practice files, permission evidence, process/service evidence, package/log evidence, Bash scripts, student answers, hashes | Student has a solid beginner Linux foundation before touching security tools |
| Tool Lab 02 - Ubuntu Server Administration and Hardening | Ubuntu, SSH, UFW, Fail2Ban, systemd, logs | Harden Linux access, manage users/groups/permissions, configure services, read logs, and prepare rollback | Baseline, permissions proof, SSH settings, UFW status, service status, auth logs, rollback plan | Student can administer and harden a Linux server without breaking required service |
| Tool Lab 03 - pfSense Firewall and Segmentation | pfSense, aliases, DHCP, NAT, firewall logs | Configure zones, aliases, rules, management access, allowed tests, denied tests, and configuration exports | Interface plan, DHCP plan, alias list, rule matrix, traffic tests, log evidence, XML backup | Student can enforce segmentation and troubleshoot firewall behavior |
| Tool Lab 04 - Windows Server and Active Directory | Windows Server, AD DS, DNS, Server Manager, ADUC, GPO, Event Viewer, PowerShell verification | Configure server networking manually, install AD DS/DNS, create OUs/users/groups, apply group-based access, join a client, apply GPO, inspect security logs | IP/DNS proof, AD services, OU/group/user export, share ACL, domain join proof, GPO report, EVTX/hash | Student can build and explain basic enterprise identity administration |
| Tool Lab 05 - Greenbone/OpenVAS Vulnerability Assessment | Kali, Nmap, Greenbone/OpenVAS, Ubuntu, pfSense | Install/use OpenVAS on Kali, scan an authorised target, validate one finding, remediate, and rescan | GVM health, target scope, Nmap baseline, report export, finding worksheet, remediation and rescan proof | Student can perform a controlled vulnerability assessment lifecycle |
| Tool Lab 06 - Wazuh SIEM/XDR Operations | Wazuh, Ubuntu agent, Windows agent, pfSense, Kali | Verify Wazuh health, onboard agents, generate Linux/Windows events, search alerts, triage and tune | Manager health, agent proof, raw event, alert details, query/filter, triage note, telemetry failure recovery | Student can trace endpoint events into Wazuh and explain response decisions |
| Advanced Lab 07 - Professional Vulnerability Assessment | Kali, Nmap, Greenbone/OpenVAS, Ubuntu, pfSense | Complete a full professional assessment from authorization to final management report | Authorization, Nmap evidence, OpenVAS setup, baseline report, validation, remediation, rescan, final report | Student can perform and defend an end-to-end vulnerability assessment |

## Minimum Completeness Rules

A lab is incomplete until it contains:

- A written scope and authorization record.
- Source and target proof where applicable. Tool Lab 01 does not require a target IP because it uses only VirtualBox and Kali Linux.
- Before-state evidence.
- The exact command, configuration, or GUI action used.
- Validation evidence showing the expected result.
- At least one negative or blocked test where the lab objective involves access control, firewalling, hardening, detection, or segmentation.
- Troubleshooting notes when the first attempt fails.
- Evidence hashes for important exported files.
- A short technical report and a short management summary.
- A clear statement of remaining risk and next action.

Screenshots are allowed, but they must support evidence rather than replace it. Strong submissions include saved command output, configuration exports, log files, reports, PCAPs, EVTX files, CSV/XML/JSON exports, and written interpretation.

## Job-Ready Lab Quality Gate

Before a student is marked complete for the tool pathway, confirm they can do more than follow commands. They must be able to explain, validate, troubleshoot, and report.

| Quality area | Minimum standard |
|---|---|
| Technical understanding | Student can explain what the tool does, what problem it solves, and what evidence proves success |
| Manual skill | Student can perform core GUI or CLI steps without relying only on automation |
| Validation | Student proves both positive results and expected blocked or denied results |
| Troubleshooting | Student can identify whether a failure is caused by IP addressing, DNS, firewall rules, service state, credentials, time, permissions, logs, or tool configuration |
| Evidence handling | Student saves outputs, exports, screenshots, hashes, and written interpretation without exposing secrets |
| Security judgment | Student separates exposure, vulnerability, threat, risk, control, remediation, mitigation, and residual risk |
| Communication | Student writes a technical summary and a plain management summary |
| Professional behavior | Student respects scope, avoids public scanning, avoids exploitation, protects credentials, and asks for approval before risky changes |

Completing these labs does not guarantee employment by itself. The goal is to give students a strong practical foundation for entry-level interviews, junior SOC work, security administration, vulnerability management support, and real troubleshooting conversations.
