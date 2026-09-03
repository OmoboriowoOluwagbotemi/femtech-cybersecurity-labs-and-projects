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
