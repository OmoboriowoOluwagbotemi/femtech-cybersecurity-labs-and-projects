# Lesson 18: Windows Server

## Lesson Overview

Windows Server provides infrastructure and application roles used across enterprise environments. DNS and DHCP support network operation, server roles deliver business capabilities, Event Viewer provides operational and security evidence, and hardening reduces attack surface.

This lesson covers Windows Server DNS, DHCP, Event Viewer, server roles, and basic server hardening. Active Directory architecture and authentication are developed in Lesson 19.

## Learning Objectives

Students will be able to:

- Explain the purpose and architecture of Windows Server roles and features.
- Describe DNS zones, records, recursion, forwarding, caching, and security controls.
- Explain DHCP scopes, leases, options, reservations, relay, and authorization.
- Use Event Viewer and PowerShell to investigate server events.
- Identify role dependencies and security implications.
- Build a basic Windows Server hardening workflow.
- Troubleshoot DNS, DHCP, role, and hardening failures systematically.
- Connect Windows Server evidence to SOC and incident-response operations.

## Prerequisite Knowledge

Students should understand IP addressing, routing, ports, DNS fundamentals, Windows services, processes, Registry, Event Logs, PowerShell, ACLs, and Windows security architecture from Lessons 8, 16, and 17.

## Enterprise Relevance

Windows Server commonly provides:

- Name resolution.
- Address configuration.
- Identity and policy services.
- File and print services.
- Web applications.
- Remote access.
- Certificate services.
- Update and deployment infrastructure.
- Virtualization.

Compromise or outage can affect the entire organization rather than one workstation.

## 1. Windows Server

### What

Windows Server is Microsoft's server operating-system family for infrastructure, identity, application, storage, networking, and virtualization workloads.

### Why

Enterprises need centrally managed, resilient services that support many users and systems.

### How

Administrators install roles and features, configure them through graphical or PowerShell tools, apply policy, monitor events, and maintain them through controlled change.

### Where

Windows Server runs on physical systems, VMs, private clouds, public cloud IaaS, branch offices, data centers, and hybrid environments.

## 2. Server Roles and Features

### What

A server role is a major business or infrastructure function. A feature is a supporting component that may assist one or more roles.

### Why

Role-based installation allows administrators to deploy only required capabilities.

### How

Server Manager and PowerShell discover, install, configure, and remove roles and features.

### Where

Examples include:

- DNS Server.
- DHCP Server.
- File and Storage Services.
- Web Server (IIS).
- Hyper-V.
- Remote Desktop Services.
- Active Directory Domain Services.
- Active Directory Certificate Services.

## 3. Role Administration

PowerShell discovery:

```powershell
Get-WindowsFeature
Get-WindowsFeature |
    Where-Object InstallState -eq 'Installed'
```

Installation example:

```powershell
Install-WindowsFeature -Name DNS -IncludeManagementTools
```

Removal and installation require authorization, dependency review, change windows, rollback planning, and post-change validation.

### Role Security Principles

- Install only required roles and features.
- Avoid combining high-risk roles without architectural justification.
- Use dedicated service identities.
- Restrict management access.
- Patch the operating system and role software.
- Centralize logs.
- Back up configuration and service data.
- Test recovery.

## 4. Role Separation

Combining roles reduces infrastructure cost but increases:

- Attack surface.
- Privilege concentration.
- Resource contention.
- Change complexity.
- Outage blast radius.

For example, placing a public web application on an identity server exposes critical infrastructure to application risk. Small organizations may accept limited combinations but should document risk and use compensating controls.

## 5. DNS

### What

DNS translates names into records and supports service discovery and infrastructure operation.

### Why

Users and applications rely on names. Active Directory also depends heavily on DNS service records.

### How

Windows DNS Server can host zones, answer authoritative queries, perform recursion, forward requests, cache answers, and integrate zone data with Active Directory.

### Where

DNS supports internal domains, public services, cloud networks, domain controllers, applications, email, and hybrid connectivity.

## 6. DNS Zones

### Forward Lookup Zone

Maps names to records such as IPv4 and IPv6 addresses.

### Reverse Lookup Zone

Maps addresses to PTR records representing names.

### Primary and Secondary Zones

A primary zone holds writable zone data. A secondary zone maintains a read-only transferred copy from an authoritative source.

### Active Directory-Integrated Zone

Stores zone data in Active Directory and uses directory replication. It can support secure dynamic updates and multi-master administration among appropriate DNS-enabled domain controllers.

### Stub Zone

Contains selected records identifying authoritative servers for another zone and helps maintain referral information.

## 7. Common DNS Records

| Record | Purpose |
|---|---|
| A | Name to IPv4 address |
| AAAA | Name to IPv6 address |
| CNAME | Alias to another canonical name |
| MX | Mail exchanger |
| NS | Authoritative name server |
| PTR | Address-to-name mapping in reverse zones |
| SOA | Zone authority and operational parameters |
| SRV | Service location |
| TXT | Text-based policy or verification data |

An Active Directory client uses SRV records to locate domain services. A general A record alone is not enough for full domain-service discovery.

## 8. DNS Query Flow

1. Client checks local information and cache.
2. Client sends a query to its configured recursive resolver.
3. Resolver checks cache and hosted zones.
4. Resolver may use a forwarder or perform recursive resolution.
5. Resolver returns a response and caches it according to TTL and policy.

Authoritative service and recursive resolution are different functions. An internal authoritative server does not necessarily need unrestricted recursion for every client.

## 9. Windows DNS Tools

```powershell
Resolve-DnsName server01.corp.example
Get-DnsClientServerAddress
Get-DnsServerZone
Get-DnsServerResourceRecord -ZoneName 'corp.example'
Get-DnsServerCache
```

`nslookup` remains available, but `Resolve-DnsName` and DNS Server cmdlets provide structured PowerShell objects.

Client cache:

```powershell
Get-DnsClientCache
Clear-DnsClientCache
```

Clearing a cache may remove stale client state but does not repair an incorrect authoritative record or compromised DNS administration.

## 10. DNS Security

Threats include:

- Unauthorized record modification.
- Cache poisoning.
- Insecure dynamic updates.
- Excessive zone-transfer exposure.
- Open recursion.
- Registrar or cloud-DNS compromise.
- DNS tunneling.
- Denial of service.

Controls include:

- Secure dynamic updates.
- Least-privileged DNS administration.
- Restricted zone transfers.
- Recursion and forwarding policy.
- DNS logging and change auditing.
- MFA for external DNS providers.
- Network segmentation.
- DNSSEC where applicable and properly managed.
- Backup and recovery.

DNSSEC authenticates DNS data; it does not encrypt queries or prove that an application is safe.

## 11. DNS Troubleshooting

Check:

1. Client interface and DNS server settings.
2. Query name and record type.
3. Response code and responding server.
4. Hosted zone and record.
5. Delegation and authoritative records.
6. Forwarder and recursion.
7. Firewall and port 53 for UDP and TCP as required.
8. Cache state and TTL.
9. Replication for directory-integrated zones.
10. Event logs.

TCP DNS is not only for zone transfers; large or truncated responses and modern DNS behavior may also use TCP.

## 12. DHCP

### What

DHCP automatically supplies IP configuration to clients.

### Why

Manual addressing does not scale and creates inconsistency.

### How

A common IPv4 sequence is:

1. Discover.
2. Offer.
3. Request.
4. Acknowledge.

This is often called DORA.

### Where

DHCP operates on enterprise LANs, branch networks, wireless networks, lab networks, and selected cloud or virtual environments.

## 13. DHCP Components

| Component | Purpose |
|---|---|
| Scope | Address range and subnet configuration |
| Exclusion | Addresses not offered dynamically |
| Reservation | Consistent address assigned to a client identifier |
| Lease | Time-limited address assignment |
| Option | Additional configuration such as gateway or DNS |
| Relay agent | Forwards DHCP messages across routed boundaries |
| Failover | Coordinates lease availability between supported DHCP servers |

A reservation is not strong authentication. Client identifiers or MAC addresses can be spoofed.

## 14. DHCP Options

Common options include:

- Subnet mask.
- Default gateway.
- DNS servers.
- DNS suffix.
- Lease duration.
- Network boot information where used.

Incorrect DHCP options can redirect DNS, remove network access, or send clients through an unauthorized gateway.

## 15. Windows DHCP Administration

```powershell
Get-DhcpServerv4Scope
Get-DhcpServerv4Lease -ScopeId 192.168.10.0
Get-DhcpServerv4OptionValue -ScopeId 192.168.10.0
Get-DhcpServerv4Reservation -ScopeId 192.168.10.0
```

In an Active Directory environment, DHCP server authorization helps prevent unauthorized domain DHCP servers from servicing clients. It does not prevent every rogue DHCP implementation on the network; switch security and monitoring remain important.

## 16. DHCP Security

Threats:

- Rogue DHCP server.
- Scope exhaustion.
- Malicious option values.
- Unauthorized reservation or lease change.
- Service denial.

Controls:

- DHCP authorization.
- DHCP snooping on supported switches.
- Port security and network access control.
- Scope monitoring.
- Least-privileged administration.
- Configuration backup.
- Redundancy.
- Change auditing.
- Segmentation.

## 17. DHCP Troubleshooting

Client tools:

```powershell
Get-NetIPConfiguration
ipconfig /all
ipconfig /release
ipconfig /renew
```

Do not release a remote system's lease without ensuring recovery access.

Troubleshooting sequence:

1. Verify physical or virtual link and VLAN.
2. Check current address and whether it is self-assigned.
3. Confirm scope has available leases.
4. Confirm server service and authorization.
5. Check relay configuration.
6. Check UDP ports 67 and 68 paths.
7. Inspect leases and conflicts.
8. Verify options.
9. Review server and client events.

An IPv4 address in `169.254.0.0/16` often indicates Automatic Private IP Addressing after DHCP failure, but analysts should confirm context.

## 18. Event Viewer

### What

Event Viewer is a graphical management console for Windows Event Logs, subscriptions, custom views, and selected operational logs.

### Why

Server troubleshooting requires correlating role, service, system, and security events.

### How

Administrators can filter by time, level, provider, Event ID, keyword, user, and computer.

### Where

Use Event Viewer locally, through approved remote management, or with exported `.evtx` files.

## 19. Event Viewer Workflow

1. Define symptom and time range.
2. Check System and Application.
3. Open role-specific operational logs.
4. Review Security events where relevant.
5. Filter by provider and Event ID.
6. Correlate record IDs, activity IDs, service state, and changes.
7. Save a custom view or export relevant events.
8. Document timezone and collection method.

Do not interpret red error icons as proof of an attack. They indicate event level assigned by the provider.

## 20. Custom Views and Subscriptions

Custom Views save filters; they do not duplicate events. Windows Event Forwarding can collect selected events centrally using subscriptions.

Enterprise requirements include:

- Source enrollment and authentication.
- Subscription design.
- Collector availability.
- Retention.
- Parsing.
- Source-health monitoring.
- Access control.
- Time synchronization.

## 21. Role-Specific Evidence

| Role | Useful Evidence |
|---|---|
| DNS | DNS Server logs, analytic logging where approved, record changes, service state |
| DHCP | DHCP operational and audit logs, leases, scope state, authorization |
| File server | SMB, security auditing, share and filesystem events |
| IIS | HTTP access logs, HTTP errors, application logs, process activity |
| Hyper-V | VM management, worker, networking, and storage events |

High-volume analytic logs should be enabled based on defined requirements and capacity planning.

## 22. Basic Server Hardening

### What

Server hardening applies secure configuration based on the server's role, risk, and dependencies.

### Why

Servers concentrate critical data and services and may be continuously reachable.

### How

1. Build from an approved image.
2. Install required roles only.
3. Patch.
4. Apply a role-specific baseline.
5. Restrict identity and management.
6. Configure firewall and network segmentation.
7. Enable protection and logging.
8. Test business service and recovery.
9. Monitor drift.

### Where

Hardening applies to physical, virtual, cloud, branch, and data-center servers.

## 23. Hardening Controls

### Identity

- Separate administrative accounts.
- MFA through the management architecture.
- Least privilege.
- Managed service accounts where suitable.
- Disable stale and default access.
- Restrict local administrators.

### Network

- Host firewall.
- Management network.
- Restricted RDP or remote PowerShell.
- Remove legacy protocols.
- Limit outbound access.
- Segment critical roles.

### Operating System

- Supported versions and patching.
- Secure Boot and platform protections where available.
- Defender and EDR.
- Attack-surface reduction controls where compatible.
- Application control for high-value systems.
- BitLocker where required.

### Logging and Recovery

- Advanced audit policy.
- PowerShell and Defender logs.
- Central event forwarding.
- Protected backups.
- Tested role recovery.
- Configuration and change records.

## 24. Server Core

Server Core provides a reduced user interface and smaller installed component set for supported roles.

Potential benefits:

- Reduced attack surface.
- Fewer components requiring updates.
- Less interactive administration.

Operational requirements:

- Remote-management capability.
- Staff PowerShell skill.
- Tool compatibility.
- Recovery procedures.

A smaller interface does not remove the need for patching, Defender, firewalling, and monitoring.

## 25. Patch and Change Management

Server patching should include:

- Asset and dependency inventory.
- Vulnerability and exposure context.
- Testing.
- Approved window.
- Backup or recovery point.
- Cluster and redundancy sequencing.
- Reboot planning.
- Health checks.
- Rollback criteria.
- Monitoring after change.

Delaying patches creates exposure, but untested changes can interrupt critical services. Risk-based planning balances both.

## 26. Enterprise Scenarios

### Small Business

A single server provides DNS, DHCP, and files. An outage affects every workstation. The business documents role dependencies, backs up configuration, tests recovery, and plans separation as it grows.

### Financial Institution

Unauthorized DNS record modification redirects an internal payment application. The SOC correlates DNS administration, privileged logon, change ticket, and application TLS events.

### Healthcare Organization

A DHCP scope is exhausted on a clinical wireless network. Teams expand capacity through approved change, investigate abnormal requests, and preserve patient-care connectivity.

### Educational Institution

An unapproved DHCP server supplies a malicious DNS address in a student lab. Switch DHCP snooping and segmentation limit impact while analysts identify the connected port.

### Government Agency

A Windows Server has unused IIS components installed. Hardening removes unnecessary role services after compatibility testing and change approval.

### Cloud Environment

A cloud Windows Server exposes management ports publicly. The team restricts cloud firewall rules, requires bastion access, reviews logons, and validates Defender coverage.

## 27. SOC and Incident Response

Potential alerts:

- DNS record or zone change.
- New or unauthorized DHCP server.
- Scope exhaustion.
- Unexpected server role installation.
- Security log clearing.
- New service or scheduled task.
- Defender disabled.
- Public management exposure.
- Repeated privileged remote logons.

### Triage Questions

- Which role and business process are affected?
- Is the event authorized?
- Which identity made the change?
- What clients depend on this service?
- Is integrity, confidentiality, or availability affected?
- Can containment preserve essential service?
- Which configuration and logs must be preserved?
- What recovery path is tested?

## 28. Security+ SY0-701 Alignment

This lesson supports secure configuration, DNS, DHCP, role-based architecture, host firewalls, least privilege, logging, patching, segmentation, resilience, and incident response.

Windows firewall, DNS security settings, DHCP authorization, and Defender are technical controls. Patch, backup, log review, and change procedures are operational controls. Server baselines and role standards are managerial controls and directive in function.

## 29. Classroom Hands-On Practical

### Practical Title

Investigate and Harden Windows Server Infrastructure

### Safety

Use an instructor-approved isolated Windows Server VM. Do not install production roles, modify organizational DNS, or release a remote server's network lease.

### Part A: Role Inventory

1. List installed roles and features.
2. Identify listening ports.
3. Map each expected listener to a role and service.
4. Identify unnecessary components for review, not immediate removal.

### Part B: DNS

1. Inspect the instructor-provided zone.
2. Query A, AAAA, and SRV records.
3. Record response source and TTL.
4. Compare expected and actual records.
5. Review DNS events.

### Part C: DHCP

1. Inspect an instructor-provided scope.
2. Record range, exclusions, options, leases, and reservations.
3. Calculate remaining capacity.
4. Identify a risky option or configuration from a provided scenario.

### Part D: Event Timeline

1. Filter relevant role and System events.
2. Export only the approved events.
3. Record provider, Event ID, record ID, time, computer, and message fields.
4. Build a timeline.

### Part E: Hardening Plan

Recommend ten changes. For each, include risk, dependency, validation, rollback, control category, and control function.

## 30. Take-Home Practical

Design a Windows Server deployment for one organization. Include:

- Server roles and separation.
- DNS zones, records, update, transfer, recursion, and logging policy.
- DHCP scopes, options, relay, redundancy, and security.
- Event collection and retention.
- Identity and remote-management controls.
- Firewall and segmentation.
- Patch, backup, and recovery.
- Ten failure scenarios and troubleshooting steps.
- Baseline exceptions and compensating controls.

## 31. Assessment Questions

### Multiple Choice

1. What is a Windows Server role?
   A. Major infrastructure or business function
   B. A user password
   C. One Registry value
   D. A packet capture

2. Which DNS record locates a network service?
   A. SRV
   B. PTR only
   C. TXT only
   D. SOA only

3. What is an Active Directory-integrated zone?
   A. Zone data stored and replicated through Active Directory
   B. Public zone without authentication
   C. Local client cache
   D. DHCP reservation

4. Which sequence represents common DHCPv4 allocation?
   A. Discover, Offer, Request, Acknowledge
   B. Query, Sign, Encrypt, Delete
   C. Start, Stop, Restart, Remove
   D. Read, Write, Execute, Audit

5. What is a DHCP reservation?
   A. Consistent lease assignment associated with a client identifier
   B. Strong user authentication
   C. DNS zone transfer
   D. Event subscription

6. What does an APIPA address commonly suggest?
   A. DHCP configuration was not obtained
   B. DNSSEC validation passed
   C. Server role was removed
   D. Event logs are full

7. What does an Event Viewer Custom View store?
   A. A saved event filter
   B. A duplicate server
   C. A DHCP lease
   D. A password hash

8. Why separate server roles?
   A. Reduce attack surface and failure blast radius
   B. Remove all need for backups
   C. Guarantee no vulnerabilities
   D. Disable logging

9. What is a benefit of Server Core?
   A. Reduced installed component and interface surface
   B. No patching required
   C. Automatic MFA for every protocol
   D. Elimination of all services

10. Which is an operational control?
    A. Tested patch and rollback procedure
    B. DNS record ACL
    C. Host firewall rule
    D. DHCP authorization setting

### Short Answer

1. Distinguish roles from features.
2. Compare primary, secondary, stub, and AD-integrated DNS zones.
3. Explain recursion, forwarding, caching, and authoritative answers.
4. Describe DHCP scopes, exclusions, reservations, leases, options, and relays.
5. Explain DHCP authorization and its limitations.
6. Describe an Event Viewer investigation workflow.
7. List ten Windows Server hardening controls.
8. Explain role separation and compensating controls.

### Scenario Questions

1. An internal application name resolves to an unexpected address. Describe DNS investigation.
2. A branch office receives no DHCP leases. Describe layered troubleshooting.
3. A rogue DHCP server supplies attacker-controlled DNS. Describe containment and evidence.
4. A critical server patch causes role failure. Describe rollback, evidence, and follow-up.
5. An unexpected IIS role appears on a domain infrastructure server. Describe response.

### Answer Key

1. **A.** A role is a major server function such as DNS, DHCP, file service, or web service.
2. **A.** SRV records publish the location of protocol-specific services.
3. **A.** Directory-integrated zones store and replicate DNS data through Active Directory.
4. **A.** DORA describes the common DHCPv4 allocation exchange.
5. **A.** A reservation provides a consistent assignment but is not strong authentication.
6. **A.** APIPA commonly appears when a client configured for DHCP cannot obtain a lease.
7. **A.** A Custom View saves filter logic and displays matching existing events.
8. **A.** Separation limits combined privileges, exposure, dependencies, and outage impact.
9. **A.** Server Core reduces installed interface components but still requires full security management.
10. **A.** Testing, deployment, and rollback are people-driven operational procedures.

## 32. Glossary

| Term | Definition |
|---|---|
| Active Directory-Integrated Zone | DNS zone stored and replicated through Active Directory. |
| APIPA | Automatic IPv4 addressing commonly used when DHCP configuration is unavailable. |
| DHCP Authorization | Active Directory control identifying approved Windows DHCP servers. |
| DHCP Relay | Function forwarding DHCP messages across routed boundaries. |
| DNS Forwarder | Resolver to which another DNS server sends selected recursive requests. |
| DNS Recursion | Process of obtaining a final DNS answer on behalf of a client. |
| Exclusion | Address range within a scope not dynamically offered. |
| Feature | Supporting Windows Server component. |
| Lease | Time-limited DHCP address assignment. |
| Reservation | Consistent DHCP assignment linked to a client identifier. |
| Role | Major Windows Server infrastructure or application function. |
| Scope | DHCP address pool and associated configuration. |
| Server Core | Reduced-interface Windows Server installation option for supported roles. |
| Zone | Administrative DNS data set for a namespace. |

## 33. Lesson Review Checklist

- I can explain server roles and role separation.
- I can interpret DNS zones and records.
- I can troubleshoot DNS securely.
- I can explain DHCP allocation, options, relay, and security.
- I can investigate server events.
- I can design basic Windows Server hardening.
- I can validate changes and preserve availability.

## 34. Continuity With Future Lessons

Lesson 19 develops Active Directory domains, forests, trusts, users, groups, organizational units, Kerberos, NTLM, LDAP, and Group Policy.

Students should retain that Active Directory depends on correctly configured DNS, accurate time, protected infrastructure roles, and reliable event evidence.
