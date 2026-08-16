# Lesson 27: Asset Discovery

## Lesson Overview

Asset discovery means finding the computers, servers, phones, printers, network devices, cloud systems, applications, services, and accounts that belong to an organization.

The main idea is simple:

> A security team cannot protect what it does not know exists.

If a company has an unknown server, that server may not be patched, monitored, backed up, hardened, or protected by endpoint security. Attackers often look for these forgotten systems because they are easier to compromise.

This lesson explains asset discovery in a beginner-friendly way while still connecting it to real cybersecurity work.

## Learning Objectives

By the end of this lesson, students should be able to:

- Explain what an asset is.
- Explain what asset discovery means.
- Describe why asset discovery is important for cybersecurity.
- Use basic Nmap commands in a safe lab.
- Explain what Netdiscover does.
- Create a simple asset inventory.
- Identify unknown, rogue, stale, and shadow IT assets.
- Explain how asset discovery supports vulnerability management, SOC monitoring, and incident response.

## 1. What Is an Asset?

### What

An asset is anything valuable to an organization that must be protected.

In cybersecurity, assets include:

- Desktop computers.
- Laptops.
- Servers.
- Mobile phones.
- Printers.
- Routers.
- Switches.
- Firewalls.
- Wireless access points.
- Cloud virtual machines.
- Websites.
- Databases.
- Applications.
- User accounts.
- Service accounts.
- Documents and business data.

### Why

Assets matter because they support business operations. If an important asset is attacked, the organization may lose money, data, trust, or service availability.

### How

Security teams protect assets by:

- Identifying them.
- Recording them in an inventory.
- Assigning ownership.
- Applying patches.
- Monitoring logs.
- Limiting access.
- Removing unused systems.

### Where

Assets may exist in:

- Small business offices.
- Corporate data centers.
- Schools and universities.
- Hospitals.
- Banks.
- Government networks.
- Cloud platforms such as Azure and AWS.
- Hybrid environments that combine local and cloud systems.

## 2. What Is Asset Discovery?

### What

Asset discovery is the process of finding assets on a network, in the cloud, or inside an organization.

### Why

Asset discovery helps answer important security questions:

- What devices are connected to the network?
- What systems are running?
- Which services are open?
- Who owns each system?
- Which systems are exposed to the Internet?
- Which assets are missing security tools?
- Which systems should be scanned for vulnerabilities?

### How

Asset discovery can be done by using:

- Network scanning tools such as Nmap.
- Local network discovery tools such as Netdiscover.
- DHCP records.
- DNS records.
- Active Directory.
- Endpoint security consoles.
- Cloud dashboards.
- Firewall logs.
- SIEM logs.
- Vulnerability scanners.
- Manual interviews with IT teams.

### Where

Asset discovery is used by:

- Security Operations Center analysts.
- System administrators.
- Network administrators.
- Vulnerability management teams.
- Incident responders.
- Auditors.
- Cloud security teams.

## 3. Discovery, Inventory, and Asset Management

These three terms are related, but they do not mean the same thing.

| Term | Simple Meaning | Example |
|---|---|---|
| Asset discovery | Finding assets | Nmap finds a server at `192.168.56.10` |
| Asset inventory | Recording asset details | The server is added to a spreadsheet or CMDB |
| Asset management | Managing the asset through its life | The server is patched, monitored, reviewed, and retired when no longer needed |

Discovery is the starting point. Inventory gives the organization a record. Asset management keeps that record useful over time.

## 4. Why Asset Discovery Is Important

Asset discovery supports many security activities.

| Security Activity | Why Asset Discovery Helps |
|---|---|
| Vulnerability management | You need to know what to scan |
| Patch management | You need to know what systems require updates |
| Incident response | You need to know what system is affected |
| Firewall review | You need to know what traffic should be allowed |
| SOC monitoring | You need to know which logs should be collected |
| Risk assessment | You need to know what business systems are exposed |
| Compliance | You need evidence of controlled assets |

Example: If a hospital does not know that an old Windows machine is still connected to the network, that machine may miss patches and become a ransomware entry point.

## 5. Types of Asset Discovery

### Active Discovery

Active discovery sends network traffic to find assets.

Example:

```bash
nmap -sn 192.168.56.0/24
```

This asks Nmap to look for live hosts in the `192.168.56.0/24` network.

Active discovery is useful, but it must be authorized. Scanning networks without permission can disrupt systems and may violate policy or law.

### Passive Discovery

Passive discovery observes existing activity instead of sending probes.

Examples:

- Reviewing firewall logs.
- Reviewing DHCP leases.
- Reviewing DNS queries.
- Reviewing switch or router logs.
- Watching network traffic in Wireshark.

Passive discovery is safer for sensitive systems because it does not directly touch the target.

### Authenticated Discovery

Authenticated discovery uses approved credentials or agents to collect more accurate information.

Examples:

- A vulnerability scanner logs into a Linux server to check installed packages.
- Microsoft Defender reports endpoint details.
- Active Directory shows joined computers.
- A cloud console lists running virtual machines.

Authenticated discovery usually gives better detail than unauthenticated scanning.

## 6. Nmap

### What

Nmap is a network scanning tool. It can help identify live hosts, open ports, and running services.

### Why

Security teams use Nmap to understand what is reachable on a network.

### How

Nmap sends network packets and reads the responses.

### Where

Nmap is useful in:

- Lab environments.
- Internal network reviews.
- Vulnerability assessment preparation.
- Troubleshooting.
- Authorized security assessments.

## 7. Basic Nmap Host Discovery

Host discovery checks which systems appear to be online.

Example:

```bash
nmap -sn 192.168.56.0/24
```

Simple interpretation:

- If Nmap reports a host is up, the system responded to discovery traffic.
- If Nmap does not report a host, the system may be offline, blocked by a firewall, or not responding to the probe type.

Important: "Not found" does not always mean "not there."

## 8. Basic Nmap Port Discovery

A port is a numbered communication point used by a service.

Common examples:

| Port | Common Service | Meaning |
|---|---|---|
| 22 | SSH | Remote Linux administration |
| 53 | DNS | Name resolution |
| 80 | HTTP | Web traffic without encryption |
| 443 | HTTPS | Encrypted web traffic |
| 3389 | RDP | Remote Windows administration |

Example:

```bash
nmap -sT -p 22,80,443 192.168.56.10
```

This checks whether ports `22`, `80`, and `443` are open on one host.

## 9. Basic Nmap Service Discovery

Service discovery tries to identify what software is running behind an open port.

Example:

```bash
nmap -sT -sV 192.168.56.10
```

Simple interpretation:

| Finding | Possible Meaning |
|---|---|
| Port 22 open | SSH may be running |
| Port 80 open | A web server may be running |
| Port 443 open | A secure website may be running |
| Service version shown | The tool estimated the software or version |

Service detection is helpful, but students must remember that tools can be wrong. Always validate important findings.

## 10. Saving Nmap Results

Security work requires evidence. Save scan results so they can be reviewed later.

Example:

```bash
nmap -sT -sV -oA asset-scan-01 192.168.56.10
```

The `-oA` option saves output in multiple formats using the name `asset-scan-01`.

Good scan notes should include:

- Date and time.
- Authorized scope.
- Tool used.
- Command used.
- Target network or host.
- Main findings.
- Analyst name.

## 11. Netdiscover

### What

Netdiscover is a local network discovery tool. It is commonly used to find devices on the same local IPv4 network.

### Why

It is useful in labs because it can quickly show devices that respond to ARP traffic.

### How

Netdiscover uses ARP, which is used on local networks to map IP addresses to MAC addresses.

Example:

```bash
sudo netdiscover -r 192.168.56.0/24
```

### Where

Netdiscover works best on a local lab network, such as a VirtualBox host-only network.

## 12. Netdiscover Limitations

Netdiscover is helpful, but limited.

| Limitation | Explanation |
|---|---|
| Local network only | ARP does not travel across routers |
| IPv4 focused | It is not a full IPv6 discovery solution |
| Limited detail | It may show IP and MAC address, but not full software details |
| Not an inventory system | It finds devices but does not manage them |

## 13. Asset Inventory

An asset inventory is a structured list of assets and their important details.

A basic inventory should include:

| Field | Example |
|---|---|
| Asset name | `WEB-SRV-01` |
| IP address | `192.168.56.10` |
| MAC address | `08:00:27:AA:BB:CC` |
| Asset type | Linux web server |
| Operating system | Ubuntu Server |
| Owner | Web team |
| Location | Data center or cloud |
| Criticality | High |
| Open services | SSH, HTTPS |
| Security tools | Wazuh agent installed |
| Patch status | Current or overdue |
| Notes | Public-facing test server |

The inventory should be protected because it can reveal sensitive details about the organization.

## 14. Good and Bad Inventory Records

| Poor Record | Better Record |
|---|---|
| `Server` | `WEB-SRV-01, Ubuntu, 192.168.56.10, Web Team, High criticality` |
| `Laptop` | `HR-LAP-044, Windows 11, assigned to HR, Defender enabled` |
| `Unknown device` | `Unknown device, 192.168.56.22, MAC address recorded, investigation opened` |

A good inventory helps people make decisions. A poor inventory creates confusion during incidents.

## 15. Unknown Assets

An unknown asset is a system found on the network that is not yet identified in the official inventory.

When an unknown asset is found, the security team should:

1. Confirm the finding.
2. Record IP address, MAC address, hostname, and open ports.
3. Check DHCP, DNS, Active Directory, endpoint security, and firewall logs.
4. Identify the owner.
5. Determine whether it is approved.
6. Add it to inventory or remove it from the network.
7. Document the action taken.

## 16. Rogue, Stale, and Shadow IT Assets

| Asset Type | Meaning | Example |
|---|---|---|
| Rogue asset | Unauthorized or suspicious asset | A personal router connected to the office network |
| Stale asset | Old asset still listed or connected | A retired server still online |
| Shadow IT asset | Technology used without approval | A department creates an unsanctioned cloud file-sharing account |

These assets increase risk because they may not follow security policy.

## 17. Attack Surface Mapping

### What

Attack surface mapping identifies the systems, services, accounts, and entry points that attackers could target.

### Why

The more exposed entry points an organization has, the more opportunities attackers may have.

### How

Security teams map:

- Public IP addresses.
- Domains and subdomains.
- Web applications.
- VPN portals.
- Remote access services.
- Cloud resources.
- Open ports.
- User accounts.
- Third-party connections.

### Where

Attack surface mapping applies to internal networks, Internet-facing systems, cloud platforms, and hybrid environments.

## 18. External and Internal Attack Surface

| Type | Meaning | Example |
|---|---|---|
| External attack surface | What is reachable from the Internet | Public website, VPN portal, cloud storage bucket |
| Internal attack surface | What is reachable inside the network | File server, domain controller, printer, database |

Both matter. External exposure may allow initial access. Internal exposure may allow movement after compromise.

## 19. Cloud Asset Discovery

Cloud assets may not always appear in normal network scans.

Examples of cloud assets:

- Virtual machines.
- Storage buckets.
- Databases.
- Load balancers.
- Serverless functions.
- IAM users and roles.
- Security groups.
- Public IP addresses.

Cloud discovery often uses cloud consoles and APIs. An API is a structured way for tools to ask a platform for information.

Example: In Azure, a security team may review virtual machines, public IP addresses, Microsoft Entra ID users, storage accounts, and Microsoft Defender for Cloud recommendations.

## 20. Asset Discovery in Enterprise Environments

In real organizations, one tool is not enough. Teams compare several sources.

| Source | What It May Show |
|---|---|
| DHCP | Devices that requested IP addresses |
| DNS | Hostnames and name lookups |
| Active Directory | Windows domain-joined computers |
| Microsoft Defender | Protected Windows endpoints |
| Wazuh | Agents reporting security data |
| Firewall logs | Systems sending or receiving traffic |
| Cloud console | Cloud resources |
| Vulnerability scanner | Hosts and services found during scans |
| CMDB | Official ownership and business information |

CMDB means Configuration Management Database. It is a system used to record assets, owners, and configuration information.

## 21. Reconciliation

Reconciliation means comparing asset records from different sources and fixing conflicts.

Example:

- Nmap finds `192.168.56.20`.
- DHCP shows the same IP belongs to a device called `FIN-LAP-020`.
- Microsoft Defender does not show the device.
- The inventory does not list the device.

Possible conclusion:

The laptop may be real, but it may be missing endpoint protection and inventory registration.

The team should investigate, confirm ownership, install required security tools, and update the inventory.

## 22. Enterprise Scenarios

### Small Business

A small company scans its office network and finds an old computer still connected. It is running unsupported software. The IT administrator removes it from the network and updates the asset list.

### Financial Institution

A bank discovers a public cloud server that is not listed in the official inventory. The security team checks ownership, firewall rules, logs, and whether customer data is present.

### Healthcare Organization

A hospital avoids aggressive scanning against medical devices. Instead, it uses passive discovery, vendor documentation, switch records, and maintenance windows.

### Educational Institution

A school discovers many student-owned devices on Wi-Fi. The network team separates student devices from staff systems using VLANs and access controls.

### Government Agency

A government office finds an unknown remote access service exposed to the Internet. The service is reviewed, restricted, and documented.

### Hybrid Enterprise

A company uses both on-premises servers and Azure. The security team combines Nmap, Active Directory, Defender, firewall logs, and Azure inventory to build a complete asset view.

## 23. Classroom Hands-On Practical

### Practical Title

Basic Asset Discovery with Nmap and Netdiscover

### Lab Safety

Use only the instructor-approved lab network. Do not scan public networks, school networks, company networks, or home networks without permission.

### Tasks

1. Start the approved virtual machines.
2. Confirm that all machines are on a host-only or isolated lab network.
3. Run host discovery:

```bash
nmap -sn 192.168.56.0/24
```

4. Select one discovered host.
5. Run a simple port scan:

```bash
nmap -sT -p 22,80,443 192.168.56.10
```

6. Run service detection:

```bash
nmap -sT -sV 192.168.56.10
```

7. Run Netdiscover:

```bash
sudo netdiscover -r 192.168.56.0/24
```

8. Create a small asset inventory table.
9. Identify any unknown systems.
10. Write a short recommendation.

### Student Inventory Table

| IP Address | Hostname | MAC Address | Open Ports | Possible Role | Owner | Action Needed |
|---|---|---|---|---|---|---|
| | | | | | | |

## 24. Take-Home Practical

Create a simple asset inventory for a small office or lab environment.

Do not scan any network without permission. If scanning is not allowed, create a paper-based inventory from observation and interviews.

Include:

- Asset name.
- Asset type.
- Owner.
- Location.
- Operating system.
- Security tools.
- Criticality.
- Notes.

Then answer:

1. Which assets are most important?
2. Which assets are unknown or poorly documented?
3. Which assets need better security controls?
4. What would you recommend first?

## 25. Assessment Questions

### Multiple Choice

1. What is asset discovery?
   A. Finding technology resources that exist in an environment
   B. Deleting old files
   C. Encrypting all data
   D. Blocking every port

2. Why is asset discovery important?
   A. Unknown assets may be unprotected
   B. It replaces passwords
   C. It stops all malware automatically
   D. It removes the need for firewalls

3. Which tool is commonly used for network scanning?
   A. Nmap
   B. Notepad
   C. Calculator
   D. Paint

4. What does `nmap -sn` mainly perform?
   A. Host discovery
   B. Password cracking
   C. File encryption
   D. Log deletion

5. What does Netdiscover commonly use for local discovery?
   A. ARP
   B. SMTP
   C. HTTPS certificates only
   D. SQL queries

6. What is a rogue asset?
   A. An unauthorized or suspicious asset
   B. A fully approved server
   C. A backed-up document
   D. A user training video

7. What is shadow IT?
   A. Technology used without approved governance
   B. A firewall rule
   C. A secure password vault
   D. A backup schedule

8. Which inventory field helps identify who is responsible for an asset?
   A. Owner
   B. Font size
   C. Wallpaper
   D. Mouse speed

9. What should a team do after finding an unknown asset?
   A. Investigate and document it
   B. Ignore it
   C. Assume it is safe
   D. Delete all logs

10. Why should an asset inventory be protected?
    A. It contains sensitive information about systems
    B. It has no value
    C. It is always public
    D. It prevents scanning

### Short Answer

1. Define an asset in cybersecurity.
2. Explain the difference between asset discovery and asset inventory.
3. Give two examples of active discovery.
4. Give two examples of passive discovery.
5. Why must scanning be authorized?
6. What information should be included in a basic asset inventory?
7. What is attack surface mapping?
8. Why might cloud assets be missed by normal network scans?

### Scenario Questions

1. You scan a lab network and find an unknown device with port 22 open. What should you do next?
2. A hospital has sensitive medical devices that may fail during aggressive scans. What safer discovery methods should be considered?
3. A company discovers a cloud server that nobody claims to own. What risks could this create?
4. A school allows student devices on Wi-Fi. Why should those devices be separated from staff systems?

### Answer Key

1. **A.** Asset discovery finds technology resources in an environment.
2. **A.** Unknown assets may not be patched, monitored, or protected.
3. **A.** Nmap is a common network scanning tool.
4. **A.** `nmap -sn` is mainly used for host discovery.
5. **A.** Netdiscover commonly uses ARP on local IPv4 networks.
6. **A.** A rogue asset is unauthorized or suspicious.
7. **A.** Shadow IT is technology used outside approved governance.
8. **A.** The owner field identifies responsibility.
9. **A.** Unknown assets should be investigated and documented.
10. **A.** Inventory can reveal systems, owners, exposure, and security gaps.

## 26. Glossary

| Term | Meaning |
|---|---|
| Asset | Anything valuable that an organization must protect |
| Asset Discovery | The process of finding assets |
| Asset Inventory | A structured record of assets and their details |
| Asset Management | Managing assets through their lifecycle |
| Active Discovery | Discovery that sends traffic or queries to find assets |
| Passive Discovery | Discovery that observes existing records or traffic |
| Authenticated Discovery | Discovery using approved credentials or agents |
| Nmap | A tool used for network discovery and scanning |
| Netdiscover | A local IPv4 ARP discovery tool |
| Rogue Asset | An unauthorized or suspicious asset |
| Shadow IT | Technology used without approved governance |
| Stale Asset | An old or outdated asset that still exists in records or on the network |
| Attack Surface | The systems, services, accounts, and paths attackers could target |
| CMDB | A database used to track assets and configuration details |

## 27. Lesson Review Checklist

Students should now be able to:

- Explain asset discovery in simple language.
- Identify common asset types.
- Explain why unknown assets create risk.
- Use basic Nmap commands in a lab.
- Explain what Netdiscover does.
- Build a simple inventory table.
- Describe rogue, stale, and shadow IT assets.
- Connect asset discovery to vulnerability management and incident response.

## 28. Continuity With Future Lessons

Lesson 28 uses asset discovery as the foundation for vulnerability assessment.

Before scanning for vulnerabilities, a security team must know what assets exist and which systems are approved for scanning.
