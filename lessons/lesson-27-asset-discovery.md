# Lesson 27: Asset Discovery

## Lesson Overview

Security teams cannot protect assets they do not know exist. Asset discovery identifies hardware, software, services, cloud resources, identities, and externally exposed systems. Asset inventory adds ownership, business context, lifecycle, and security state.

This lesson covers Nmap, Netdiscover, asset inventory, attack-surface mapping, and asset management.

## Learning Objectives

Students will be able to:

- Distinguish discovery, inventory, scanning, enumeration, and asset management.
- Compare active, passive, authenticated, and API-based discovery.
- Use Nmap safely in an authorized lab.
- Explain Netdiscover and local ARP discovery limitations.
- Build an enterprise asset inventory.
- Map external and internal attack surfaces.
- Reconcile conflicting asset sources.
- Identify shadow IT, stale, rogue, and ephemeral assets.

## Prerequisite Knowledge

Students should understand attack surface, reconnaissance, scanning, network interfaces, VLANs, cloud resources, identity, and authorization boundaries from Lessons 1, 8, 16, 24, and 26.

## Enterprise Relevance

Unknown assets may be:

- Unpatched.
- Publicly exposed.
- Missing EDR.
- Outside backup.
- Using default credentials.
- Owned by departed teams.
- Running unsupported software.
- Unmonitored.

Discovery is therefore a continuous security function, not a one-time project.

## 1. Asset Discovery

### What

Asset discovery identifies technology resources and observable properties.

### Why

Security controls, patching, vulnerability scanning, logging, and incident response depend on complete scope.

### How

Discovery uses:

- Network probes.
- Passive traffic.
- DHCP and DNS.
- Directory and device management.
- EDR.
- Cloud APIs.
- Procurement and CMDB data.
- Vulnerability scanners.

### Where

Discovery covers data centers, branches, campuses, remote users, cloud, SaaS, containers, mobile devices, IoT, and Internet-facing assets.

## 2. Asset Types

Assets include:

- Physical and virtual servers.
- Endpoints and mobile devices.
- Network and security devices.
- Cloud compute, storage, databases, and functions.
- Containers and clusters.
- Applications and APIs.
- Domains, certificates, and public IPs.
- Identities and service accounts.
- Data stores.
- SaaS tenants and integrations.

An IP address is an observation, not a complete asset identity. Addresses can change or be shared.

## 3. Discovery Versus Inventory

| Function | Question |
|---|---|
| Discovery | What is observable? |
| Identification | What asset is it? |
| Inventory | What attributes and owner describe it? |
| Asset management | How is it governed through lifecycle? |
| Attack-surface mapping | How can it be reached or abused? |

A scan result without owner and business purpose is incomplete.

## 4. Active Discovery

### What

Active discovery sends probes or queries directly or through management APIs.

### Why

It can confirm live systems, open ports, services, and selected properties.

### How

Tools send ICMP, ARP, TCP, UDP, application, authenticated, or API requests.

### Where

Use on explicitly authorized ranges, accounts, tenants, and time windows.

### Risks

- Service disruption.
- IDS alerts.
- Account lockout.
- Rate limiting.
- Cloud API cost.
- Legal or contractual violation.
- Incomplete results through firewalls.

## 5. Passive Discovery

### What

Passive discovery observes existing traffic and logs without directly probing assets.

### Why

It can identify fragile devices and normal communication with low direct impact.

### How

Sources include:

- Network taps.
- Zeek.
- DHCP.
- DNS.
- Flow logs.
- Wireless controllers.
- Switch tables.
- Cloud logs.

### Where

Use at network boundaries, internal segments, cloud, and managed infrastructure.

### Limitations

Assets that do not communicate during the observation period may remain invisible.

## 6. Authenticated Discovery

Authenticated methods query systems with approved credentials or agents.

Benefits:

- Installed software.
- Patch state.
- Configuration.
- Local users.
- Hardware details.

Risks:

- Credential exposure.
- Excessive privilege.
- Performance impact.
- Changes caused by tooling.

Use dedicated, least-privileged credentials, secure vaulting, source restriction, and logging.

## 7. Nmap

### What

Nmap is a network discovery and service-identification tool.

### Why

It identifies reachable hosts, ports, protocols, and selected service details.

### How

Nmap sends probes and interprets responses.

### Where

Use only on authorized lab or enterprise scope.

## 8. Nmap Host Discovery

Lab examples:

```bash
nmap -sn 192.168.56.0/24
nmap -sn -PR 192.168.56.0/24
```

- `-sn` performs host discovery without a port scan.
- `-PR` requests ARP discovery on a local Ethernet network.

Firewalls may block probes, while ARP can still identify local neighbors. "Down" may mean no response, not no asset.

## 9. Nmap Port and Service Discovery

```bash
nmap -sT -sV 192.168.56.10
```

- `-sT`: TCP connect scan.
- `-sV`: service-version detection.

Targeted ports:

```bash
nmap -sT -p 22,80,443 192.168.56.10
```

Broad scans increase traffic and time. Use the minimum scope required.

## 10. Nmap Output

Save structured and human-readable results:

```bash
nmap -sT -sV -oA case-001 192.168.56.10
```

`-oA` writes multiple output formats using a base name.

Record:

- Authorization.
- Scanner.
- Time.
- Target.
- Options.
- Nmap version.
- Network location.
- Packet loss or constraints.

Results are time-specific observations.

## 11. Nmap Interpretation

Port states may include:

- Open.
- Closed.
- Filtered.
- Unfiltered.
- Open or filtered.
- Closed or filtered.

Service detection is an estimate based on responses. Validate ownership and configuration before treating it as authoritative.

## 12. Nmap Scripting Engine

NSE scripts automate discovery, checks, and selected testing.

Risks:

- Some scripts are intrusive.
- Credentials may be required.
- Requests may alter state.
- Vulnerable services may crash.

Review exact script code, category, arguments, and authorization. Do not use broad script categories blindly.

## 13. Netdiscover

### What

Netdiscover identifies IPv4 hosts on a local network using ARP requests and observations.

### Why

ARP is effective within a local broadcast domain even when IP probes are filtered.

### How

It sends or listens for ARP activity and records address-to-MAC observations.

### Where

Use on authorized local Ethernet segments.

## 14. Netdiscover Limitations

- ARP does not cross routers.
- IPv6 uses Neighbor Discovery, not ARP.
- One MAC may represent a gateway, proxy, cluster, or virtual system.
- MAC addresses can be spoofed.
- Sleeping devices may not answer.
- Wireless isolation may hide peers.

Netdiscover complements rather than replaces Nmap, switch, DHCP, and endpoint inventory.

## 15. Enterprise Data Sources

| Source | Strength |
|---|---|
| DHCP | Recently leased clients |
| DNS | Named services and addresses |
| Active Directory | Domain identities and computers |
| EDR | Managed active endpoints |
| MDM | Mobile and enrolled devices |
| Vulnerability scanner | Reachable assessed assets |
| Switch or wireless controller | Connected devices |
| Cloud API | Provider resources and configuration |
| Procurement | Purchased equipment |
| CMDB | Ownership and business context |
| Certificate inventory | TLS and public services |

Every source has gaps.

## 16. Cloud Asset Discovery

Cloud discovery should use provider APIs and organization-level inventory where possible.

Discover:

- Accounts, subscriptions, and projects.
- VMs and containers.
- Storage.
- Databases.
- Serverless functions.
- Public IPs.
- Load balancers.
- Security groups.
- IAM roles and keys.
- SaaS integrations.

Network scanning alone misses managed and control-plane resources.

## 17. Ephemeral Assets

Autoscaling instances, containers, and functions may exist briefly.

Inventory should record:

- Stable workload identity.
- Image or template.
- Deployment.
- Owner.
- Labels or tags.
- Creation and termination time.
- Public exposure.

Automated event-driven inventory is more effective than periodic scans alone.

## 18. Asset Inventory

Minimum fields:

- Unique asset identifier.
- Hostname and addresses.
- Asset type.
- Owner and custodian.
- Business service.
- Location or cloud scope.
- Operating system and software.
- Data classification.
- Criticality.
- Exposure.
- Lifecycle status.
- Security-control coverage.
- Last seen.

## 19. Inventory Quality

An inventory must be:

- Complete enough for purpose.
- Accurate.
- Current.
- Owned.
- Reconciled.
- Protected.
- Auditable.

Sensitive inventory can help attackers identify high-value systems. Apply access control and monitoring.

## 20. Reconciliation

Reconciliation matches records from multiple sources.

Challenges:

- Hostname changes.
- Dynamic IPs.
- Duplicate serial numbers.
- Cloned VMs.
- NAT.
- Missing agents.
- Reused cloud names.

Use stable identifiers such as device ID, cloud resource ID, serial number, directory object ID, or cryptographic device identity where appropriate.

## 21. Asset Ownership

### Business Owner

Accountable for business use, risk, and access.

### Technical Custodian

Maintains technology and controls.

### Data Owner

Defines data classification and use.

An asset without an owner should be escalated, restricted, or retired through an approved process.

## 22. Attack-Surface Mapping

### What

Attack-surface mapping identifies reachable assets, identities, services, trust relationships, and entry paths.

### Why

An asset can be known internally but exposed unexpectedly through DNS, cloud gateways, vendor links, or credentials.

### How

Map:

- Domains and subdomains.
- Public IPs.
- Ports and services.
- Certificates.
- APIs.
- Remote access.
- SaaS sharing.
- Trusts.
- Third parties.
- Leaked secrets.

### Where

Map external and internal surfaces separately.

## 23. External Attack Surface

Sources:

- DNS.
- Certificate transparency data.
- Cloud inventory.
- Internet scanning by authorized providers.
- Domain registration.
- Public repositories.
- Vendor records.

Validate ownership before testing. Similar names do not prove organizational ownership.

## 24. Internal Attack Surface

Includes:

- Flat network reachability.
- Legacy protocols.
- Shared local administrators.
- Unmanaged devices.
- Excessive trusts.
- Open management interfaces.
- Internal applications.
- Service accounts.

Internal does not mean trusted.

## 25. Shadow IT and Rogue Assets

### Shadow IT

Technology used without approved governance, such as personal SaaS storage.

### Rogue Asset

Unauthorized or malicious device or service.

Response:

1. Validate identity and owner.
2. Determine business function.
3. Assess exposure and data.
4. Contain if necessary.
5. Preserve evidence.
6. Onboard, remediate, or retire.
7. Correct governance gaps.

## 26. Asset Lifecycle

Stages:

1. Request.
2. Procurement or creation.
3. Enrollment and baseline.
4. Operation.
5. Maintenance.
6. Transfer.
7. Retirement.
8. Sanitization and record closure.

Inventory should reflect status. A decommissioned record does not prove the system is actually offline or data is sanitized.

## 27. Discovery Governance

Define:

- Authorization.
- Scope.
- Schedule.
- Scanner source.
- Rate.
- Credentials.
- Sensitive networks.
- Notification.
- Evidence handling.
- Escalation.

Healthcare, industrial, and legacy devices may require passive methods or vendor-approved testing.

## 28. Enterprise Scenarios

### Small Business

Nmap identifies an unknown NAS exposing SMB. The business finds no owner, isolates it, checks data and logs, and either enrolls or retires it.

### Financial Institution

Cloud API inventory finds a public load balancer absent from the CMDB. The bank traces IaC deployment, owner, certificates, and back-end exposure.

### Healthcare Organization

Active scanning could disrupt a legacy clinical device. Passive monitoring, switch data, vendor documentation, and controlled windows provide inventory.

### Educational Institution

Netdiscover identifies many student devices on a lab VLAN but cannot see devices across routed campus segments. Wireless and DHCP records complete the view.

### Government Agency

Certificate inventory reveals an Internet service nearing expiration that no team owns. The agency assigns ownership and reviews whether service should remain.

### Hybrid Enterprise

An autoscaled cloud workload exists for minutes and evades weekly scans. Cloud events and deployment metadata create real-time inventory.

## 29. Discovery Findings

Classify:

- Known and managed.
- Known but noncompliant.
- Unknown.
- Stale.
- Duplicate.
- Publicly exposed.
- Unsupported.
- Missing owner.
- Missing security controls.

Discovery is not remediation. Findings require workflows and accountability.

## 30. Security+ SY0-701 Alignment

This lesson supports asset management, discovery, scanning, attack surface, cloud inventory, unauthorized assets, vulnerability management, and monitoring.

Network scanners, EDR inventory, and cloud inventory APIs are technical controls. Reconciliation, ownership assignment, and lifecycle review are operational controls. Discovery authorization and asset policy are managerial controls and directive in function.

## 31. Classroom Hands-On Practical

### Practical Title

Discover and Reconcile an Authorized Lab

### Safety

Use only an instructor-provided host-only subnet. Confirm no bridged adapter. Do not use intrusive NSE scripts.

### Tasks

1. Record authorization, subnet, scanner, and time.
2. Use Netdiscover or ARP-based discovery.
3. Run Nmap host discovery.
4. Run targeted TCP service discovery against approved hosts.
5. Save output with `-oA`.
6. Compare results with DHCP and provided inventory.
7. Identify unknown, missing, and conflicting records.
8. Assign hypothetical owners and criticality.
9. Build an attack-surface map.
10. Recommend remediation.

### Inventory Table

| Asset ID | Address | Hostname | Service | Source | Owner | Criticality | Status |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

## 32. Take-Home Practical

Design enterprise asset discovery containing:

- Asset types.
- Active and passive methods.
- Authenticated discovery.
- Cloud and SaaS APIs.
- Nmap scope and safety.
- Inventory schema.
- Reconciliation.
- Attack-surface mapping.
- Shadow IT response.
- Lifecycle and metrics.
- Ten data-quality tests.

## 33. Assessment Questions

### Multiple Choice

1. What does asset discovery answer?
   A. What is observable
   B. Who approved every patch
   C. How to encrypt disks
   D. How to write GPO

2. What is passive discovery?
   A. Observing existing traffic and logs without direct probes
   B. Full port scan
   C. Password reset
   D. Firewall change

3. What does `nmap -sn` request?
   A. Host discovery without port scan
   B. Full exploit
   C. Password cracking
   D. Disk imaging

4. Why can "host down" be misleading?
   A. Probes may be filtered or ignored
   B. Nmap proves absence
   C. DNS deletes the host
   D. ARP crosses all routers

5. Where does Netdiscover primarily operate?
   A. Local IPv4 broadcast domain
   B. Every cloud API
   C. Active Directory forest
   D. Public certificate store

6. Why use cloud APIs for inventory?
   A. Managed resources may not appear in network scans
   B. APIs remove IAM
   C. APIs always scan ports
   D. Cloud has no assets

7. What helps reconcile a dynamic IP?
   A. Stable device or cloud resource identifier
   B. IP address alone
   C. Display name only
   D. Open port only

8. What is shadow IT?
   A. Technology used outside approved governance
   B. Approved backup
   C. Firewall state
   D. Signed software

9. Why protect inventory?
   A. It reveals high-value systems and security details
   B. It has no sensitive content
   C. It disables logging
   D. It replaces access control

10. Which is an operational control?
    A. Monthly inventory reconciliation
    B. Nmap probe
    C. EDR agent
    D. Cloud API

### Short Answer

1. Distinguish discovery, inventory, and asset management.
2. Compare active, passive, and authenticated discovery.
3. Explain Nmap host and service discovery.
4. Describe Netdiscover limitations.
5. List fifteen inventory fields.
6. Explain reconciliation.
7. Describe attack-surface mapping.
8. Explain shadow IT response.

### Scenario Questions

1. Nmap finds an unknown SSH server. Describe response.
2. EDR and CMDB inventories disagree. Describe reconciliation.
3. A cloud resource appears and disappears between scans. Improve discovery.
4. Active scanning could affect a clinical device. Design a safe method.
5. An unowned public certificate is discovered. Describe investigation.

### Answer Key

1. **A.** Discovery identifies what can be observed through selected sources.
2. **A.** Passive methods consume existing communications or records rather than probing targets.
3. **A.** `-sn` performs host discovery without the normal port-scan phase.
4. **A.** A live system may ignore or filter the selected discovery probes.
5. **A.** ARP-based Netdiscover visibility is limited to the local IPv4 broadcast domain.
6. **A.** PaaS, serverless, IAM, and other managed assets may have no scan-visible host.
7. **A.** Stable identifiers remain useful when addresses and names change.
8. **A.** Shadow IT operates outside approved ownership, risk, and control processes.
9. **A.** Inventory can reveal topology, criticality, software, owners, and defensive gaps.
10. **A.** Reconciliation is a people- and process-driven operational activity.

## 34. Glossary

| Term | Definition |
|---|---|
| Active Discovery | Discovery that sends probes or queries to assets or platforms. |
| Asset Inventory | Structured record of assets, context, ownership, and state. |
| Asset Management | Governance of assets through their lifecycle. |
| Attack-Surface Mapping | Identification of reachable systems, identities, services, and entry paths. |
| Ephemeral Asset | Resource existing for a short or dynamic period. |
| Netdiscover | Local IPv4 ARP-based discovery tool. |
| Passive Discovery | Identification through existing traffic and records. |
| Reconciliation | Matching and resolving records from multiple inventory sources. |
| Rogue Asset | Unauthorized or malicious device or service. |
| Shadow IT | Technology used outside approved governance. |

## 35. Lesson Review Checklist

- I can distinguish discovery, inventory, and management.
- I can select active, passive, authenticated, and API methods.
- I can use Nmap safely in an authorized lab.
- I can explain Netdiscover limits.
- I can reconcile inventory sources.
- I can map external and internal attack surfaces.
- I can respond to unknown and ephemeral assets.

## 36. Continuity With Future Lessons

Lesson 28 applies the asset inventory to Nessus, OpenVAS, CVEs, CVSS, risk ranking, and scan interpretation.

Students should retain that vulnerability results are only as complete as the assets and services included in scope.
