# Lesson 24: Network Segmentation

## Lesson Overview

Network segmentation divides infrastructure into zones and controls traffic between them. Effective segmentation reduces attack surface, limits lateral movement, contains incidents, and protects systems with different business and security requirements.

This lesson covers VLANs, DMZ architecture, access control lists (ACLs), traffic isolation, and segmentation best practices. It builds on pfSense routing, firewall rules, NAT, logging, and stateful inspection from Lesson 23.

## Learning Objectives

Students will be able to:

- Explain segmentation, microsegmentation, and traffic isolation.
- Describe VLAN tagging, access ports, trunks, and inter-VLAN routing.
- Explain why VLANs require enforcement controls.
- Design DMZ ingress, egress, management, and back-end flows.
- Distinguish network ACLs from filesystem and identity ACLs.
- Build and validate a segmentation matrix.
- Identify segmentation bypass and failure conditions.
- Investigate and contain cross-zone traffic.

## Prerequisite Knowledge

Students should understand IP addressing, routing, switching, firewalls, stateful rules, NAT, DHCP, DNS, VPNs, and pfSense from Lessons 8, 16, 22, and 23.

## Enterprise Relevance

Segmentation separates:

- Users from servers.
- Guests from corporate resources.
- Payment systems from general business systems.
- Clinical devices from ordinary workstations.
- Students from administrative services.
- Public services from internal networks.
- Management interfaces from users.
- Development from production.
- Cloud workloads by application and sensitivity.

Flat networks allow one compromise to reach far more systems.

## 1. Network Segmentation

Network segmentation divides a network into controlled zones based on function, sensitivity, trust, exposure, or administrative need.

It limits who and what can communicate, reducing attack paths and incident impact.

### How

Segmentation combines:

- Subnets.
- VLANs.
- Routers.
- Firewalls.
- ACLs.
- Host firewalls.
- Cloud security controls.
- Identity-aware policy.

### Where

Segmentation operates in campuses, data centers, branches, cloud virtual networks, industrial environments, and endpoint networks.

## 2. Segmentation Objectives

- Reduce lateral movement.
- Limit broadcast domains.
- Protect high-value assets.
- Separate different trust levels.
- Enforce compliance scope.
- Improve monitoring.
- Contain malware.
- Restrict management.
- Support service availability.

Segmentation should follow data and business flows, not only organizational charts.

## 3. Physical and Logical Segmentation

### Physical

Uses separate switching, cabling, devices, or infrastructure.

Benefits:

- Strong separation.
- Clear failure boundaries.

Costs:

- Higher expense.
- Operational complexity.

### Logical

Uses VLANs, virtual networks, routing, ACLs, and software-defined controls on shared infrastructure.

Benefits:

- Flexibility.
- Scalability.
- Lower hardware cost.

Risks:

- Misconfiguration.
- Shared control-plane compromise.
- Hidden dependencies.

## 4. VLANs

A virtual LAN (VLAN) creates a logical Layer 2 broadcast domain on switching infrastructure.

It separates devices without requiring a separate physical switch for every zone.

### How

Ethernet frames may be assigned to VLANs by switch-port configuration and, on trunk links, commonly identified with IEEE 802.1Q tags.

### Where

VLANs separate users, voice, guests, servers, management, IoT, and other device classes.

## 5. Access Ports and Trunks

### Access Port

Typically carries one assigned VLAN for an endpoint. Frames to and from the endpoint are commonly untagged from the endpoint's perspective.

### Trunk Port

Carries multiple VLANs between switches, routers, firewalls, hypervisors, or access points using tagging.

### Native VLAN

Some trunk configurations carry one VLAN untagged. Native-VLAN mismatches can create connectivity and security problems.

Security practices:

- Disable unused ports.
- Assign unused ports to an unused VLAN.
- Restrict allowed VLANs on trunks.
- Avoid user endpoints on trunk ports.
- Use explicit native-VLAN design.
- Monitor topology and configuration changes.

## 6. VLAN Is Not a Complete Security Boundary

Devices in different VLANs cannot communicate at Layer 2 directly under normal design, but inter-VLAN routing may permit communication.

A secure boundary requires:

- Layer 3 routing through an enforcement point.
- Firewall or ACL policy.
- Correct switch configuration.
- Protected management plane.
- Host controls.
- Monitoring.

Putting a sensitive server in a different VLAN while allowing unrestricted inter-VLAN routing provides little security benefit.

## 7. Inter-VLAN Routing

Routing between VLANs may occur on:

- Router.
- Firewall.
- Layer 3 switch.
- Virtual router.
- Cloud routing service.

Design choice:

- A firewall provides stateful policy and richer logging.
- A Layer 3 switch provides high-performance routing and ACLs but may offer different inspection depth.

High-risk boundaries should use controls appropriate to the threat and evidence requirements.

## 8. VLAN Threats

Potential risks:

- VLAN hopping through misconfigured trunks.
- Double tagging under specific native-VLAN conditions.
- Unauthorized trunk negotiation.
- Management-plane compromise.
- Rogue switch.
- Incorrect access-port assignment.
- Hypervisor virtual-switch misconfiguration.

Defenses:

- Disable automatic trunk negotiation where appropriate.
- Explicitly configure ports.
- Restrict trunk VLAN lists.
- Use an unused native VLAN where design supports it.
- Secure switch administration.
- Apply network access control.
- Audit configuration.

## 9. DMZ Architecture

A demilitarized zone is a controlled network segment for systems requiring exposure to less trusted networks.

It limits direct paths from public services into internal systems.

### How

Firewalls enforce separate flows:

- Internet to DMZ.
- DMZ to internal.
- Internal to DMZ.
- Management to DMZ.
- DMZ to Internet.

### Where

DMZs host reverse proxies, web servers, email gateways, authoritative DNS, remote-access gateways, and transfer services.

## 10. DMZ Traffic Policy

### Inbound

Allow only published services to specific hosts.

### Back-End

Allow only required application-to-service flows, such as a web tier to one database endpoint.

### Egress

Restrict outbound communication to updates, DNS, monitoring, or application requirements. Unrestricted egress enables command and control and exfiltration.

### Management

Use a dedicated management zone, bastion, strong identity, and monitored administration. Do not manage exposed systems directly from ordinary user networks.

## 11. DMZ Design Patterns

### Single Firewall

One firewall separates Internet, DMZ, and internal interfaces.

### Dual Firewall

Separate external and internal enforcement layers. This can improve defense in depth if independently managed and correctly designed, but complexity can introduce gaps.

### Cloud DMZ

Uses public and private subnets, application gateways, network security controls, and controlled routing.

The security objective matters more than the number of firewalls.

## 12. Access Control Lists

A network ACL is an ordered set of permit or deny conditions controlling traffic.

ACLs enforce which sources can reach destinations using selected protocols and ports.

### How

Fields may include:

- Direction.
- Source.
- Destination.
- Protocol.
- Port.
- Action.
- Logging.

### Where

ACLs appear on routers, switches, firewalls, cloud networks, wireless systems, and hosts.

## 13. Network ACL Context

Do not confuse:

- Network ACL: controls traffic.
- Filesystem ACL: controls file access.
- Active Directory ACL: controls directory-object rights.

The common concept is ordered access entries, but enforcement objects and semantics differ.

## 14. Standard and Extended ACL Concepts

Traditional network-device terminology may distinguish:

- Standard ACL: primarily source-address matching.
- Extended ACL: source, destination, protocol, and port matching.

Modern platforms vary. Students should inspect actual platform capabilities, direction, order, implicit behavior, and statefulness.

## 15. Stateless ACLs

A stateless ACL evaluates packets independently. Return traffic may require an explicit reverse permit.

Cloud network ACLs may be stateless, while security groups may be stateful, depending on platform.

Stateful firewall behavior should not be assumed for every ACL.

## 16. ACL Design

Principles:

- Default deny.
- Most specific required flows.
- Place controls near an effective enforcement point.
- Avoid `any any`.
- Use object groups or aliases carefully.
- Add descriptions.
- Log high-value denies and selected permits.
- Review shadowed and redundant entries.
- Assign owner and expiry.

An explicit deny placed before a required allow can shadow the allow. A broad allow before a deny can make the deny ineffective.

## 17. Traffic Isolation

### North-South Traffic

Traffic entering or leaving a data center, campus, cloud, or application environment.

### East-West Traffic

Traffic among internal systems, workloads, or zones.

Perimeter firewalls mainly observe north-south paths. Internal segmentation is required to control east-west movement.

## 18. Microsegmentation

Microsegmentation applies granular policy among individual workloads, applications, or small groups.

Traditional network zones may still contain many systems that should not communicate freely.

### How

Controls may use:

- Host-based firewalls.
- Hypervisor policy.
- Cloud security groups.
- Software-defined networking.
- Workload identity.
- Service mesh policy.

### Where

Microsegmentation is common in data centers, cloud workloads, virtual environments, and high-security application tiers.

## 19. Microsegmentation Challenges

- Incomplete asset inventory.
- Unknown application dependencies.
- Dynamic workloads and addresses.
- Policy sprawl.
- Agent failure.
- Troubleshooting complexity.
- Emergency exceptions.
- Inconsistent identity labels.

Start with observation, map dependencies, stage enforcement, and validate denied traffic.

## 20. Private VLAN and Client Isolation

Private VLANs or wireless client-isolation controls can restrict peer-to-peer communication within a larger segment.

Use cases:

- Guest Wi-Fi.
- Hosting networks.
- IoT.
- Student devices.

Limitations:

- Shared gateways remain reachable.
- Misconfigured infrastructure can bypass isolation.
- Required peer services may fail.
- It does not replace endpoint security.

## 21. Management-Plane Isolation

Management interfaces should be reachable only from:

- Dedicated management networks.
- Privileged workstations.
- Bastions.
- Approved administrator identities.

Protect:

- Switches.
- Firewalls.
- Hypervisors.
- Domain controllers.
- EDR consoles.
- Backup systems.
- Cloud control planes.

A user-network compromise should not provide direct management access.

## 22. Identity-Aware Segmentation

Network identity can supplement address-based policy:

- User role.
- Device certificate.
- Device posture.
- Workload identity.
- Application identity.

Identity-aware controls improve flexibility but depend on identity-provider availability, accurate attributes, and secure integration.

## 23. Segmentation Matrix

Required fields:

| Source Zone | Destination Zone | Application | Protocol/Port | Initiator | Owner | Decision |
|---|---|---|---|---|---|---|
| Users | DNS | Name resolution | TCP/UDP 53 | User endpoint | Infrastructure | Allow |
| Guest | Internal | Any | Any | Guest | Security | Deny |
| Web DMZ | Database | Application DB | Required port | Web server | App owner | Allow |
| Management | Servers | Administration | Approved protocols | PAW | IT | Allow |

The matrix is a design and review artifact. Technical rules must be validated against it.

## 24. Segmentation Validation

Test:

- Required flows succeed.
- Unrequired neighboring ports fail.
- Reverse initiation fails where not allowed.
- IPv4 and IPv6 match policy.
- Alternate paths do not bypass control.
- VPN and wireless users receive intended policy.
- DNS and management remain controlled.
- Logs identify enforcement.

Testing only successful flows is insufficient.

## 25. Segmentation Failure Modes

| Failure | Impact |
|---|---|
| Any-any rule | Reconnects zones broadly |
| Dual-homed host | Becomes alternate path |
| Uncontrolled VPN | Bypasses zone policy |
| Host firewall disabled | Removes microsegmentation |
| Trunk misconfiguration | Exposes unintended VLAN |
| Shared management network | Expands control-plane attack surface |
| IPv6 omitted | Creates unfiltered alternate path |
| Stale exception | Preserves obsolete access |
| Asymmetric route | Breaks state or inspection |

## 26. Segmentation and Encryption

Segmentation controls reachability. Encryption protects communication content and authentication.

Use both:

- TLS for application traffic.
- SSH for administration.
- SMB encryption/signing where required.
- IPsec for selected system paths.

An allowed flow can still be intercepted or abused if the application protocol is weak.

## 27. Enterprise Scenarios

### Small Business

Users, servers, printers, and cameras share one LAN. VLANs and firewall policy separate users, servers, guests, and IoT while preserving required printing.

### Financial Institution

Cardholder systems are isolated from general corporate networks. A controlled jump host, specific application flows, and monitored administrative paths reduce compliance scope.

### Healthcare Organization

Legacy clinical devices cannot run EDR. Segmentation restricts them to required servers, DNS, time, and vendor destinations, with IDS monitoring.

### Educational Institution

Student devices are isolated from one another and blocked from administrative networks while retaining learning and Internet access.

### Government Agency

A public web tier, application tier, and database tier use separate zones. No Internet-initiated path reaches the database directly.

### Cloud Environment

Security groups permit only workload-to-workload application flows. Flow logs detect a new unauthorized east-west connection.

## 28. Incident Response

During an incident:

- Quarantine a host or zone.
- Block indicators and behaviors.
- Preserve required management access.
- Avoid disrupting critical care or safety systems.
- Capture firewall, switch, flow, DHCP, DNS, and endpoint evidence.
- Check alternate paths.
- Record emergency rules.
- Remove emergency rules after recovery.

Segmentation can contain an incident, but hurried changes can destroy evidence or cause outages.

## 29. Segmentation Governance

Required processes:

- Architecture ownership.
- Asset and flow inventory.
- Rule requests and approvals.
- Exception expiry.
- Periodic recertification.
- Change validation.
- Configuration backup.
- Drift detection.
- Incident testing.

Metrics:

- Any-any rules.
- Expired exceptions.
- Unused rules.
- Unmanaged zones.
- Denied-flow trends.
- Time to quarantine.
- IPv6 policy coverage.

## 30. Security+ SY0-701 Alignment

This lesson supports VLANs, ACLs, DMZs, segmentation, microsegmentation, Zero Trust, traffic isolation, secure protocols, and incident containment.

VLAN configuration, ACLs, and host firewall policy are technical controls. Flow review, validation, and emergency-rule removal are operational controls. Segmentation standards are managerial controls and directive in function.

## 31. Classroom Hands-On Practical

### Practical Title

Design and Validate Enterprise Segmentation

### Scenario

An organization has:

- User network.
- Server network.
- DMZ web server.
- Management network.
- Guest Wi-Fi.
- IoT cameras.

### Tasks

1. Assign a VLAN and subnet to each zone.
2. Define access and trunk ports.
3. Create a segmentation matrix.
4. Permit required DNS, web, database, printing, and management flows.
5. Deny guest and IoT access to internal networks.
6. Restrict DMZ back-end and egress.
7. Define management access through a PAW.
8. Add logging.
9. Write positive and negative tests.
10. Identify five bypass risks.

### Validation Table

| Test | Source | Destination | Expected | Actual | Evidence |
|---|---|---|---|---|---|
| Guest to server | Guest | Server | Deny |  |  |
| Web to database | DMZ web | DB | Required port only |  |  |
| User to management | User | Management | Deny |  |  |
| PAW to firewall | Management | Firewall | Allow |  |  |

## 32. Take-Home Practical

Design segmentation for a bank, hospital, university, government agency, or cloud company. Include:

- Zones, VLANs, and subnets.
- Access and trunk policy.
- DMZ tiers.
- ACL and firewall matrix.
- Management isolation.
- East-west microsegmentation.
- Legacy-device controls.
- IPv6.
- Logging and SIEM.
- Validation and incident quarantine.
- Ten risks and compensating controls.

## 33. Assessment Questions

### Multiple Choice

1. What does a VLAN create?
   A. Logical Layer 2 broadcast domain
   B. Full-disk encryption
   C. User account
   D. DNS zone

2. What does a trunk commonly carry?
   A. Multiple VLANs
   B. One local password
   C. Only event logs
   D. BitLocker keys

3. Why is a VLAN not a complete security boundary?
   A. Inter-VLAN routing may permit unrestricted communication
   B. VLANs contain no addresses
   C. VLANs disable switches
   D. VLANs always encrypt traffic

4. What is the primary purpose of a DMZ?
   A. Isolate exposed services from internal networks
   B. Store passwords
   C. Replace endpoint security
   D. Disable routing

5. Which ACL type can commonly match source, destination, protocol, and port?
   A. Extended ACL
   B. File ACL only
   C. Distribution group
   D. Certificate

6. What is east-west traffic?
   A. Traffic among internal systems or workloads
   B. Only Internet traffic
   C. Physical mail
   D. DNS registration only

7. What is microsegmentation?
   A. Granular policy among workloads or small groups
   B. One flat LAN
   C. Shared administrator password
   D. Removal of firewalls

8. Why test denied flows?
   A. To prove isolation, not only service availability
   B. To disable logs
   C. To expand access
   D. To remove VLAN tags

9. What can a dual-homed host create?
   A. Alternate path between segments
   B. Stronger MFA
   C. Password rotation
   D. Certificate revocation

10. Which is an operational control?
    A. Quarterly segmentation-rule review
    B. VLAN tag
    C. Router ACL
    D. Host firewall engine

### Short Answer

1. Compare physical and logical segmentation.
2. Explain access ports, trunks, and native VLANs.
3. Describe VLAN hopping defenses.
4. Design DMZ inbound, back-end, egress, and management policy.
5. Compare stateless ACL and stateful firewall behavior.
6. Explain north-south and east-west traffic.
7. List microsegmentation challenges.
8. Describe segmentation validation.

### Scenario Questions

1. A DMZ web server can reach all internal systems. Redesign access.
2. Guest clients can communicate with one another. Explain isolation controls.
3. IPv4 policy works, but IPv6 bypasses segmentation. Describe response.
4. A legacy clinical device cannot be patched. Design compensating segmentation.
5. An emergency any-any rule remains after an incident. Describe governance and removal.

## 34. Glossary

| Term | Definition |
|---|---|
| Access Port | Switch port normally assigned to one endpoint VLAN. |
| DMZ | Controlled segment for services requiring exposure. |
| East-West Traffic | Communication among internal systems or workloads. |
| Microsegmentation | Granular policy among individual workloads or small groups. |
| Native VLAN | VLAN carried untagged on selected trunk configurations. |
| Network ACL | Ordered traffic permit and deny conditions. |
| North-South Traffic | Communication entering or leaving an environment. |
| Trunk | Link carrying multiple VLANs. |
| VLAN | Logical Layer 2 broadcast domain. |
| VLAN Hopping | Technique abusing misconfiguration to reach another VLAN. |

## 35. Lesson Review Checklist

- I can explain VLANs, ports, trunks, and routing.
- I can design a secure DMZ.
- I can distinguish network ACL behavior.
- I can control east-west and north-south traffic.
- I can design microsegmentation.
- I can validate both allowed and denied flows.
- I can identify and remediate segmentation bypass.

## 36. Continuity With Future Lessons

Lesson 25 introduces IDS and IPS through Snort, Suricata, Zeek, signatures, anomalies, rules, and network alerting.

Students should retain that segmentation creates high-value monitoring points, but detection does not replace enforcement.
