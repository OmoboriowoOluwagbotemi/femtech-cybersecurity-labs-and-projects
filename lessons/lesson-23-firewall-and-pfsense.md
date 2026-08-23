# Lesson 23: Firewall and pfSense

## Lesson Overview

A firewall enforces network communication policy by evaluating traffic against rules and connection state. pfSense is a firewall and routing platform commonly used in laboratories, small businesses, branches, and selected enterprise environments.

This lesson covers interface configuration, NAT, DHCP, firewall rules, logging, and segmentation design through pfSense. Product interfaces can change by version, so students must understand concepts rather than memorize screen positions.

## Learning Objectives

Students will be able to:

- Explain packet filtering, stateful inspection, and default-deny policy.
- Configure conceptual WAN, LAN, DMZ, and management interfaces.
- Distinguish source NAT, destination NAT, and port forwarding.
- Explain pfSense DHCP service and relay considerations.
- Design and evaluate interface firewall rules.
- Interpret firewall states and logs.
- Avoid administrative lockout.
- Design segmentation and validate allowed and denied flows.

## Prerequisite Knowledge

Students should understand IP addressing, routing, ports, NAT, DHCP, DNS, VPNs, endpoint security, and host-only virtual networking from prior lessons.

## Enterprise Relevance

Firewalls protect:

- Internet boundaries.
- Branch offices.
- Data-center segments.
- Cloud and hybrid links.
- DMZs.
- Management networks.
- User, server, guest, and IoT networks.

Poor firewall rules can expose services or interrupt business operations.

## 1. Firewalls

### What

A firewall evaluates network traffic and permits, rejects, or drops it according to policy.

### Why

Network reachability should match business need and trust boundaries.

### How

A firewall may evaluate:

- Interface.
- Direction.
- Source.
- Destination.
- Protocol.
- Port.
- Connection state.
- Schedule.
- Identity or application on supported platforms.

### Where

Firewalls operate on hosts, network gateways, cloud networks, applications, and virtual environments.

## 2. Stateless and Stateful Filtering

### Stateless

Evaluates each packet independently.

### Stateful

Tracks connection state. A rule permitting an initial connection can create state allowing related return traffic without a separate broad reverse rule.

State tables improve policy and performance but can be exhausted or contain stale entries. Rule changes may not affect existing states until they expire or are deliberately cleared.

## 3. Default Deny

Default deny blocks traffic not explicitly allowed.

Benefits:

- Reduces unintended exposure.
- Makes business requirements explicit.
- Limits lateral movement.

Requirements:

- Accurate flow inventory.
- Management and recovery path.
- Logging.
- Rule ownership.
- Exception process.
- Validation.

Default deny should not be enabled blindly on a remote firewall.

## 4. pfSense Architecture

### What

pfSense is a FreeBSD-based firewall and routing platform with a web interface and underlying packet-filtering capabilities.

### Why

It provides routing, firewalling, NAT, DHCP, VPN, DNS, monitoring, and package integration in one platform.

### How

Interfaces receive assignments and addresses. Services and rules apply to those interfaces. Stateful filtering controls traffic.

### Where

pfSense can run on supported appliances, physical hardware, or VMs.

## 5. pfSense Security Boundary

The firewall is a high-value control-plane system.

Protect:

- Web administration.
- Console.
- Configuration backups.
- Administrator accounts.
- API or automation credentials.
- Package installation.
- Update process.

Use:

- Dedicated management access.
- HTTPS with valid certificate.
- Strong unique accounts.
- MFA where supported by design.
- Restricted source networks.
- Central logging.
- Configuration backups.
- Tested recovery.

## 6. Interface Configuration

Common interfaces:

| Interface | Purpose |
|---|---|
| WAN | Untrusted or upstream connectivity |
| LAN | Internal trusted or user network |
| DMZ | Public-facing or intermediate services |
| Management | Administrative control plane |
| Guest | Untrusted user devices |
| IoT | Restricted embedded devices |

Interface labels express intended role, not automatic trust. Security comes from addressing, routing, rules, NAT, and services.

## 7. Interface Addressing

Each routed interface typically uses a different IP subnet.

Example:

| Interface | Address |
|---|---|
| WAN | Upstream-assigned |
| LAN | `192.168.10.1/24` |
| DMZ | `192.168.20.1/24` |
| Management | `192.168.30.1/24` |

Overlapping subnets cause ambiguous routing and VPN problems.

### Configuration Checks

- Correct virtual or physical adapter.
- Link state.
- Static or dynamic address.
- Prefix length.
- Upstream gateway.
- DNS behavior.
- Private-address blocking options appropriate to actual WAN design.

In a lab, a "WAN" connected to a private NAT network may require settings different from a real Internet-facing WAN.

## 8. Routing

pfSense routes between directly connected networks and configured gateways.

Routing does not itself permit firewall traffic. A route says where traffic goes; firewall policy says whether it may pass.

Avoid adding static routes for directly connected networks. Validate:

- Destination network.
- Next-hop gateway.
- Return route.
- Firewall rules.
- NAT requirements.

Asymmetric routing can cause a stateful firewall to drop traffic if it does not observe both directions.

## 9. NAT

### What

Network Address Translation changes address or port information as traffic passes.

### Why

NAT supports private-address Internet access, publishing selected services, overlapping constraints, and policy design.

### How

The firewall creates translation and connection state.

### Where

NAT commonly operates at Internet boundaries and selected interconnection points.

NAT is not a complete security control. Filtering policy remains necessary.

## 10. Source NAT

Source NAT changes the source of outbound traffic.

Common use:

- Internal private addresses access an upstream network through the firewall address.

pfSense outbound NAT modes generally include automatic, hybrid, manual, and disabled behavior. Choose based on architecture and understand generated rules before customization.

Risks:

- Logs at the destination show translated source.
- Over-broad translation hides segmentation errors.
- Incorrect ordering selects the wrong rule.
- Return traffic depends on state.

## 11. Destination NAT and Port Forwarding

Destination NAT changes the destination so inbound traffic reaches an internal service.

Example concept:

```text
WAN address:443 -> DMZ web server:443
```

Port forwarding requires:

- External interface and address.
- Protocol and port.
- Internal destination.
- Corresponding firewall permission.
- Service listener.
- Return path.
- TLS and application security.

Publishing a service expands attack surface. Prefer a reverse proxy, application gateway, VPN, or identity-aware access where appropriate.

## 12. NAT Reflection and Hairpinning

Internal users may need to reach an internal service through its public name. NAT reflection or hairpin behavior can support this, but split DNS is often clearer:

- External DNS returns public address.
- Internal DNS returns internal address.

Avoid enabling broad reflection without understanding routing and security effects.

## 13. DHCP in pfSense

pfSense can provide DHCP service on selected interfaces.

Configure:

- Address range.
- Gateway.
- DNS.
- Domain.
- Lease time.
- Reservations.
- Network boot options where required.

Do not overlap dynamic pools with static device addresses unless reservations and exclusions are designed correctly.

## 14. DHCP Security

- Enable only on intended interfaces.
- Prevent rogue DHCP through switch controls.
- Monitor scope utilization.
- Protect reservations.
- Validate DNS and gateway options.
- Segment guest and IoT networks.
- Back up configuration.

A firewall DHCP server cannot by itself prevent another device on the same broadcast domain from answering clients.

## 15. Firewall Rule Direction

In pfSense, interface rules are generally evaluated on traffic as it enters an interface.

Examples:

- A LAN rule controls traffic entering from LAN clients.
- A DMZ rule controls traffic initiated from DMZ systems.
- WAN rules control new traffic entering from WAN.

This direction is a common source of errors. Think from the packet's first pfSense interface.

## 16. Rule Evaluation

Rules are generally evaluated top to bottom, and the first matching rule determines action.

Rule fields:

- Action.
- Interface.
- Address family.
- Protocol.
- Source.
- Destination.
- Source and destination port.
- Logging.
- Description.
- Schedule or advanced options.

Place specific exceptions before broader rules where required.

## 17. Rule Design

Weak rule:

```text
Allow any from LAN to any
```

More controlled design:

- User network to approved DNS resolvers.
- User network to approved web proxy or Internet ports.
- Management network to administration ports.
- DMZ web server to specific database service.
- Guest network to Internet only.
- Explicit block and log for sensitive segments.

Rules should describe business flows, not vague trust.

## 18. Aliases

Aliases group addresses, networks, or ports.

Benefits:

- Readability.
- Reuse.
- Easier change.

Risks:

- One alias change affects many rules.
- Nested aliases obscure scope.
- Stale entries retain access.

Document owner and review aliases like rules.

## 19. Anti-Lockout and Management

pfSense may include anti-lockout behavior to preserve web or SSH administration from the LAN.

Enterprise practice should not depend only on implicit anti-lockout behavior. Design:

- Dedicated management interface or VLAN.
- Explicit management-source alias.
- HTTPS only.
- Console or out-of-band recovery.
- Tested backup and restore.
- Change approval.

Before changing management rules:

1. Back up configuration.
2. Keep console access.
3. Add and test replacement access.
4. Apply restriction.
5. Validate new session.

## 20. Logging

Firewall logs commonly include:

- Timestamp.
- Interface.
- Action.
- Direction.
- Protocol.
- Source and destination.
- Ports.
- Rule identifier.
- TCP flags.
- Packet length.

A blocked packet is not automatically an attack. Background scanning, misconfiguration, stale clients, and asymmetric routing can generate denies.

## 21. State Table

State inspection helps answer:

- Was a connection permitted?
- Which translation applies?
- How much traffic passed?
- Is state stale?
- Which rule created it?

Clearing states can interrupt active sessions. Do so only with impact assessment.

## 22. Remote Logging

Forward selected logs to a protected collector or SIEM.

Requirements:

- Accurate time.
- Secure transport where supported.
- Source identity.
- Parsing validation.
- Retention.
- Collector health.
- Local buffering or outage plan.

Firewall logs should correlate with endpoint, DNS, DHCP, VPN, IDS, and application evidence.

## 23. Segmentation Design

### What

Segmentation separates systems into network zones and controls communication between them.

### Why

It limits exposure, lateral movement, broadcast scope, and incident impact.

### How

Use routed interfaces or VLANs, default-deny rules, explicit flows, monitoring, and separate management.

### Where

Zones may include users, servers, DMZ, management, guests, IoT, clinical systems, payment systems, and security tools.

## 24. Segmentation Matrix

| Source Zone | Destination | Service | Decision |
|---|---|---|---|
| Users | DNS resolvers | DNS | Allow |
| Users | Management | Any | Deny |
| DMZ web | Database | Required DB port | Allow |
| DMZ | Domain controllers | Only justified services | Restrict |
| Guest | Internal networks | Any | Deny |
| Management | Managed devices | Approved admin ports | Allow |

Every allow should have owner, purpose, scope, and review.

## 25. DMZ Design

A DMZ hosts services requiring exposure while limiting direct access to internal networks.

Principles:

- No unrestricted DMZ-to-LAN access.
- Specific back-end flows.
- Separate administration.
- Hardened hosts.
- Reverse proxy or WAF where appropriate.
- Egress restriction.
- Logging and EDR.

A compromised DMZ server should not become a simple path to the domain.

## 26. Rule Change Management

Request fields:

- Business owner.
- Source and destination.
- Protocol and port.
- Direction.
- Purpose.
- Start and expiry.
- Risk.
- Test.
- Rollback.

After implementation:

- Test allowed flow.
- Test denied neighboring flows.
- Confirm logs.
- Check state.
- Remove temporary access at expiry.

## 27. Enterprise Scenarios

### Small Business

One flat LAN contains users, servers, and cameras. pfSense separates user, server, guest, and IoT networks with explicit flows.

### Financial Institution

A payment web server in the DMZ can reach only one database endpoint and required security services. All flows are logged and reviewed.

### Healthcare Organization

Clinical devices require vendor communication. Rules use destination aliases and egress limits, while exceptions have owners and expiry.

### Educational Institution

Guest Wi-Fi receives DHCP and Internet access but is blocked from administrative networks. DNS and abuse logs support investigation.

### Government Agency

An emergency any-any rule remains after troubleshooting. Rule review identifies and removes it, then validates the intended narrow flow.

### Hybrid Environment

pfSense routes to a cloud VPN. Overlapping subnets and asymmetric return paths cause failures; teams correct addressing and route design rather than adding broad NAT.

## 28. Troubleshooting

1. Confirm interface link and address.
2. Confirm source and destination.
3. Confirm route and return route.
4. Confirm DNS separately.
5. Identify ingress interface.
6. Check first matching rule.
7. Check NAT translation.
8. Check state table.
9. Check listener and host firewall.
10. Capture packets at relevant interfaces if authorized.

Packet capture points can show traffic entering one interface but not leaving another, narrowing the fault.

## 29. Security+ SY0-701 Alignment

This lesson supports firewalls, stateful inspection, NAT, DHCP, segmentation, DMZs, rule bases, logging, secure administration, and change management.

Firewall rules, NAT, and interface controls are technical controls. Rule review, testing, backup, and change procedures are operational controls. Firewall standards are managerial controls and directive in function.

## 30. Classroom Hands-On Practical

### Practical Title

Build and Validate a Segmented pfSense Lab

### Safety

Use an instructor-approved virtual pfSense instance. WAN must connect only to an approved lab NAT network; internal interfaces must be host-only. Do not bridge the lab to production or home networks.

### Topology

- WAN.
- LAN users.
- DMZ server.
- Management workstation.

### Tasks

1. Assign and document interfaces.
2. Configure non-overlapping addresses.
3. Enable DHCP only on user LAN.
4. Restrict management GUI to management source.
5. Allow users to approved DNS and web services.
6. Deny users to management.
7. Publish an instructor-approved DMZ service through port forwarding.
8. Restrict DMZ-to-LAN traffic.
9. Enable logging on selected denies.
10. Test allowed and denied flows.
11. Inspect firewall logs and states.
12. Back up configuration.

### Rule Matrix

| Interface | Source | Destination | Service | Action | Log | Purpose |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

### Required Validation

- Allowed service works.
- Adjacent non-required ports fail.
- Guest or user network cannot administer pfSense.
- DMZ cannot initiate unrestricted LAN access.
- Logs identify the matching rule.

## 31. Take-Home Practical

Design pfSense policy for one organization. Include:

- Interface and subnet plan.
- DHCP scope and options.
- Outbound NAT.
- One justified port forward.
- Management access.
- Segmentation matrix.
- DMZ flows.
- Logging and SIEM forwarding.
- Rule-change procedure.
- Ten troubleshooting tests.
- Five incident scenarios.

## 32. Assessment Questions

### Multiple Choice

1. What does a stateful firewall track?
   A. Connection state
   B. Only usernames
   C. Disk sectors
   D. Password hashes

2. What does default deny do?
   A. Blocks traffic not explicitly allowed
   B. Allows every route
   C. Disables logs
   D. Removes NAT

3. What is source NAT commonly used for?
   A. Translating internal outbound source addresses
   B. Creating user accounts
   C. Encrypting disks
   D. Applying GPO

4. What does port forwarding do?
   A. Translates inbound destination to an internal service
   B. Creates a backup
   C. Signs DNS
   D. Removes routes

5. Where are pfSense interface rules generally evaluated?
   A. As traffic enters the interface
   B. Only after application response
   C. At the endpoint disk
   D. In Active Directory

6. Why does rule order matter?
   A. First matching rule generally determines action
   B. Rules are evaluated randomly
   C. Only the last rule exists
   D. NAT disables filtering

7. Why may a changed rule not affect an existing connection?
   A. Existing state may continue
   B. DNS prevents it
   C. DHCP encrypts it
   D. The interface has no address

8. What is a DMZ?
   A. Controlled zone for exposed services
   B. Unrestricted internal network
   C. Password database
   D. Event channel

9. What should every temporary firewall rule have?
   A. Owner and expiry
   B. Any-any scope
   C. No logging
   D. Shared password

10. Which is an operational control?
    A. Firewall rule review
    B. Stateful filtering engine
    C. NAT translation
    D. Interface address

### Short Answer

1. Compare stateless and stateful filtering.
2. Explain interface role versus actual trust.
3. Compare source NAT and destination NAT.
4. Explain pfSense rule direction and order.
5. Describe management lockout prevention.
6. List firewall log fields.
7. Design a segmentation matrix.
8. Describe layered firewall troubleshooting.

### Scenario Questions

1. A port forward exists but the service is unreachable. Troubleshoot.
2. A DMZ server initiates connections to domain controllers. Assess and redesign.
3. An any-any rule was added during an outage. Describe controlled removal.
4. Firewall logs show blocks after a rule change but existing sessions continue. Explain.
5. A rogue DHCP server appears on guest Wi-Fi. Describe response.

## 33. Glossary

| Term | Definition |
|---|---|
| Alias | Reusable named group of networks, hosts, or ports. |
| Default Deny | Policy blocking traffic not explicitly allowed. |
| Destination NAT | Translation changing packet destination information. |
| DMZ | Segmented zone for services requiring controlled exposure. |
| Firewall State | Tracked connection context used by a stateful firewall. |
| Hairpin NAT | Translation allowing internal clients to reach an internal service through an external address. |
| NAT | Translation of network address or port information. |
| Port Forward | Destination translation publishing a selected internal service. |
| Segmentation | Separation of systems into controlled network zones. |
| Source NAT | Translation changing packet source information. |
| Stateful Firewall | Firewall tracking connection state across packets. |

## 34. Lesson Review Checklist

- I can explain stateful filtering and default deny.
- I can configure conceptual pfSense interfaces and routes.
- I can distinguish outbound NAT and port forwarding.
- I can design DHCP safely.
- I can write ordered interface rules.
- I can prevent management lockout.
- I can interpret logs and states.
- I can design and validate segmentation.

## 35. Continuity With Future Lessons

Lesson 24 expands network segmentation through VLANs, DMZ architecture, ACLs, traffic isolation, and enterprise segmentation best practices.

Students should retain:

- Routing, NAT, and filtering are separate functions.
- Stateful rules depend on direction and existing state.
- Every allow requires business purpose and validation.
- Segmentation fails when broad exceptions reconnect zones.
