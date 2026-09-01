# Lesson 8: Network and System Attacks

## Lesson Overview

Network and system attacks target the services, protocols, addressing mechanisms, and resources that allow computers to communicate. This lesson covers reconnaissance, port scanning, ARP spoofing, DNS poisoning, man-in-the-middle attacks, distributed denial-of-service attacks, and enumeration.

The material is presented for authorized defensive analysis. Students must perform scanning or packet analysis only in systems they own or have explicit permission to test.

## Learning Objectives

By the end of this lesson, students should be able to:

- Distinguish passive and active reconnaissance.
- Explain how port scanning discovers reachable services.
- Distinguish scanning from enumeration and exploitation.
- Explain ARP spoofing, DNS poisoning, and man-in-the-middle attacks.
- Compare denial-of-service and distributed denial-of-service attacks.
- Identify common enumeration targets.
- Interpret basic Nmap and Wireshark evidence in an authorized lab.
- Recommend preventive, detective, and corrective controls.
- Connect network evidence to SOC triage and incident response.

## Prerequisite Knowledge

Students should understand risk, attack surface, defense in depth, threat actors, the Cyber Kill Chain, identity attacks, TLS, and social-engineering initial access from Lessons 1 through 7.

## Enterprise Relevance

Every enterprise network exposes services required for business. Attackers seek to discover those services, identify identities and technologies, manipulate local or name-resolution traffic, intercept communications, or exhaust capacity.

Defenders must know what normal traffic looks like, which services should be reachable, and which logs can confirm suspicious behavior.

## 1. Network Attack Foundations

A network attack abuses communication protocols, reachable services, network trust, or system resources to discover, intercept, alter, disrupt, or gain unauthorized access.

Networks connect valuable systems. Every exposed interface, port, protocol, account, and service contributes to attack surface.

Attackers may collect information, probe hosts, enumerate services, manipulate traffic, exploit weaknesses, or overwhelm capacity.

Attacks occur on local networks, wireless networks, the Internet, VPNs, cloud virtual networks, data centers, branch offices, and hybrid infrastructure.

## 2. Reconnaissance

Reconnaissance is information gathering about a target, its people, systems, domains, technologies, and relationships.

Accurate information helps an attacker select targets and reduces wasted effort. Defenders use authorized reconnaissance to understand their own external exposure.

Reconnaissance may be:

- **Passive:** gathering information without directly probing target systems.
- **Active:** interacting with target infrastructure to collect information.

Sources include public websites, DNS, certificate data, job advertisements, social media, vendor documentation, search engines, and direct network probes.

| Type | Example | Detection Potential |
|---|---|---|
| Passive | Reviewing public DNS or job postings | Usually low visibility to the target |
| Active | Sending probes to an Internet-facing server | May appear in firewall, IDS, or server logs |

### Defensive Reconnaissance

Organizations should inventory public assets, remove unnecessary information, monitor newly exposed services, review certificate and DNS records, and conduct authorized external attack-surface assessments.

## 3. Port Scanning

Port scanning sends network probes to determine which ports and services appear reachable on a host.

An open port can reveal a service that may be intended, misconfigured, outdated, or unnecessarily exposed.

The scanner evaluates responses and classifies ports. Common states include:

| State | Meaning |
|---|---|
| Open | An application is accepting connections |
| Closed | The host is reachable, but no service accepts the connection |
| Filtered | A firewall or network condition prevents a definite conclusion |
| Open or filtered | The response cannot distinguish the two states |

Scanning may occur from the Internet, an internal compromised endpoint, a vulnerability-management scanner, or an authorized test workstation.

### TCP and UDP Scanning

TCP scanning can use completed connections or carefully chosen TCP flags. UDP scanning is often slower because many open UDP services do not respond to empty probes, while ICMP errors may indicate closed ports.

### Nmap

Nmap is a network discovery and service-identification tool. In an authorized lab:

```bash
nmap -sT -sV 192.168.56.10
```

- `-sT` requests a TCP connect scan.
- `-sV` requests service-version detection.

Scanning does not prove a vulnerability. Results require validation, ownership context, and authorization.

## 4. Scan Interpretation

| Observation | Possible Meaning | Defender Follow-Up |
|---|---|---|
| Port 22 open | SSH service reachable | Confirm business need, source restrictions, and secure configuration |
| Port 3389 Internet-facing | RDP exposed | Restrict through VPN or secure gateway and review logs |
| Unexpected database port | Database reachable outside intended segment | Validate firewall and segmentation |
| Many sequential connection attempts | Possible scan | Correlate source, timing, assets, and authorized scanner list |
| Service banner reveals version | Information disclosure | Patch and reduce banner detail where practical |

False positives can arise from vulnerability scanners, monitoring systems, asset discovery, or administrator troubleshooting.

## 5. Enumeration

Enumeration is the active collection of detailed information from reachable services and systems.

Port scanning identifies where a service may exist. Enumeration seeks useful details such as users, shares, hostnames, software versions, groups, DNS records, and service configuration.

Enumeration uses protocol-specific requests and valid or anonymous access where permitted. Examples include:

- DNS record queries.
- SMB share discovery.
- LDAP directory queries.
- SNMP information requests.
- Web-directory and application discovery.
- Service-banner collection.
- User and group discovery.

Enumeration targets Windows domains, Linux servers, network devices, cloud services, web applications, file servers, and management interfaces.

| Stage | Central Question |
|---|---|
| Reconnaissance | What can be learned about the target? |
| Scanning | Which hosts and ports respond? |
| Enumeration | What detailed information do exposed services provide? |
| Exploitation | Can a weakness be used to gain unauthorized effect? |

## 6. ARP Spoofing

Address Resolution Protocol (ARP) maps IPv4 addresses to MAC addresses on a local broadcast domain. ARP spoofing sends deceptive ARP information so systems associate an IP address with the attacker's MAC address.

Traditional ARP does not authenticate mappings. An attacker on the same Layer 2 network may attempt to redirect or disrupt traffic.

An attacker may claim to own the default gateway's IP address to a victim and claim to own the victim's IP address to the gateway. Traffic may then pass through the attacker or be dropped.

ARP spoofing is relevant on local Ethernet or Wi-Fi broadcast domains, not as a normal attack sent directly across routers.

### Impact

- Traffic interception.
- Session manipulation.
- Credential exposure in unprotected protocols.
- Denial of service.
- Redirection to malicious services.

### Defenses

- Network segmentation.
- Dynamic ARP inspection on supported switches.
- DHCP snooping as a trust foundation.
- Port security.
- Secure protocols such as TLS and SSH.
- Static mappings for limited critical use cases.
- ARP-change and duplicate-address monitoring.

## 7. DNS Poisoning

DNS poisoning causes a resolver, client, or DNS data source to return an incorrect mapping.

Users trust names. If a trusted name resolves to an attacker-controlled destination, traffic can be redirected without changing the visible name entered by the user.

Possible paths include:

- Resolver cache poisoning.
- Compromise of authoritative DNS or registrar accounts.
- Malicious local DNS configuration.
- Unauthorized hosts-file changes.
- Rogue DHCP supplying an attacker-controlled DNS server.

DNS attacks affect endpoints, recursive resolvers, authoritative services, registrars, cloud DNS, and local networks.

### Defenses

- Secure registrar and DNS-provider accounts with MFA.
- Restrict DNS administration.
- Patch and harden resolvers.
- Use DNSSEC validation where supported and properly managed.
- Monitor DNS record changes.
- Restrict endpoint DNS settings.
- Use protective DNS and logging.
- Retain TLS certificate validation; DNS resolution alone does not establish server identity.

## 8. Man-in-the-Middle Attacks

A man-in-the-middle (MITM) attack places an attacker between communicating parties so the attacker can observe, relay, or modify traffic while each party believes it is communicating normally.

Intercepted traffic may reveal credentials, sessions, sensitive data, or commands. Modification can compromise integrity.

MITM positioning may result from:

- ARP spoofing.
- Rogue wireless access points.
- DNS manipulation.
- Compromised routers or proxies.
- Route manipulation.
- Certificate-validation bypass.

Risks are elevated on untrusted wireless networks, flat internal networks, compromised infrastructure, and applications using plaintext or invalid TLS handling.

### Defenses

- TLS with complete certificate validation.
- VPNs on untrusted networks.
- Secure Wi-Fi authentication.
- Network access control and segmentation.
- Certificate pinning only where operationally appropriate.
- Detection of rogue access points and abnormal ARP behavior.
- Removal of plaintext protocols.

An attacker may relay encrypted traffic without reading it. Confidentiality is compromised when encryption is absent, downgraded, terminated by an untrusted party, or certificate validation is defeated.

## 9. Denial-of-Service and DDoS

A denial-of-service (DoS) attack attempts to make a resource unavailable. A distributed denial-of-service (DDoS) attack uses many sources or distributed infrastructure.

Availability failures can halt revenue, healthcare, education, public services, and security operations.

| Category | Method | Target |
|---|---|---|
| Volumetric | Consumes bandwidth with high traffic volume | Network links |
| Protocol or state exhaustion | Consumes firewall, load balancer, or server state | Network infrastructure |
| Application-layer | Sends expensive or excessive application requests | Web or API resources |
| Reflection/amplification | Spoofs victim address and uses larger third-party responses | Victim bandwidth and services |

Targets include websites, DNS, APIs, VPN concentrators, firewalls, game services, financial portals, and government services.

### Defenses

- Upstream DDoS protection and scrubbing.
- Content delivery networks and anycast.
- Rate limiting.
- Web application firewalls.
- Autoscaling with cost controls.
- Redundant architecture.
- Firewall and load-balancer tuning.
- Runbooks and provider contacts.
- Monitoring of traffic volume, errors, latency, and resource state.

Blocking one source is rarely effective against a distributed attack.

## 10. Enterprise Scenarios

### Small Business

An Internet-facing RDP service is discovered through scanning. Repeated sign-in attempts follow. The company removes direct exposure, requires VPN and MFA, and reviews authentication logs.

### Financial Institution

A public banking API experiences application-layer DDoS. The bank activates upstream protection, rate limits abusive requests, preserves legitimate customer access, and monitors fraud and capacity.

### Healthcare Organization

ARP anomalies appear on a clinical-device VLAN. Network staff isolate the switch segment, preserve packet evidence, verify gateway mappings, and assess patient-care impact.

### University

An unmanaged student device scans administrative subnets. Segmentation limits reachability. The SOC validates whether the activity is malicious, educational, or compromised-host behavior.

### Government Agency

Unauthorized DNS changes redirect a public service. Responders restore records, secure registrar accounts, review administrative logs, and communicate service integrity.

### Cloud Environment

A security group exposes a database port publicly. Attack-surface monitoring detects it before exploitation. The cloud team restricts access and investigates the configuration change.

## 11. Detection and Investigation

Useful evidence includes:

- Firewall allow and deny logs.
- IDS and IPS alerts.
- NetFlow or flow records.
- DNS query and administration logs.
- DHCP and switch logs.
- Endpoint network telemetry.
- Authentication logs.
- Cloud flow logs.
- Packet captures.
- Application and load-balancer logs.

### Triage Workflow

1. Identify source, destination, ports, protocol, and time.
2. Confirm whether activity is authorized.
3. Determine affected assets and business criticality.
4. Compare against normal behavior.
5. Review related identity, endpoint, DNS, and application evidence.
6. Determine whether discovery progressed to access or impact.
7. Contain without unnecessarily disrupting critical services.
8. Preserve evidence and document conclusions.

## 12. Wireshark Analysis

Wireshark captures and analyzes network packets. Useful display filters include:

```text
arp
dns
tcp.flags.syn == 1 && tcp.flags.ack == 0
ip.addr == 192.168.56.10
```

Potential indicators:

- One MAC address claiming multiple IP addresses.
- Frequent unsolicited ARP replies.
- Many SYN packets to sequential ports.
- Unexpected DNS answers.
- Repeated retransmissions or connection failures.
- Sudden traffic spikes.

Packet evidence requires context. Redundancy protocols, network appliances, vulnerability scanners, and failover can resemble suspicious activity.

## 13. Security+ SY0-701 Alignment

This lesson supports:

- Reconnaissance and scanning.
- Network attacks.
- On-path attacks.
- DNS and ARP attacks.
- DoS and DDoS.
- Segmentation and secure protocols.
- Network monitoring and incident response.

Firewalls, IDS/IPS, secure protocols, and dynamic ARP inspection are technical controls. Monitoring and response procedures are operational controls. Acceptable-use and testing authorization policies are managerial controls and directive in function.

## 14. Protocol Mechanics and Evidence

### TCP Scan Mechanics

A TCP connection normally begins with `SYN`, `SYN-ACK`, and `ACK`. A connect scan asks the operating system to complete that handshake. An open port commonly returns `SYN-ACK`; a closed port commonly returns `RST`; silence or an ICMP administrative response may indicate filtering. These are observations, not universal guarantees, because firewalls and deception systems can alter responses.

A SYN scan usually sends a SYN and interprets the reply without completing a normal application connection. It often requires elevated packet privileges. Defenders may detect either method through many short-lived connections, sequential destination ports, fan-out across hosts, or unusual source behavior.

### UDP Scan Mechanics

UDP has no handshake. A closed UDP port may produce ICMP destination-unreachable, while an open service may respond only to a correctly formed application request or may remain silent. Therefore `open|filtered` is common and results require protocol-aware validation.

### ARP Evidence

An ARP cache is temporary state, not authoritative proof. Analysts should compare endpoint caches, switch forwarding tables, DHCP leases, gateway records, packet captures, and known redundancy protocols. A gateway MAC change may be malicious, but it may also result from approved failover.

### DNS Evidence

Separate the question of which answer was returned from why it was returned. Review the client resolver configuration, DHCP lease, recursive-resolver logs, authoritative records, registrar audit events, DNSSEC status where used, TTL, and certificate validation. Flushing a client cache may restore service but does not correct compromised authoritative data.

### DDoS Capacity Reasoning

DDoS response must identify the constrained resource: Internet bandwidth, firewall state table, connection pool, CPU, database capacity, or application dependency. Scaling the web tier does not help if the upstream link is saturated, and unlimited autoscaling can convert an availability attack into a financial-impact attack.

## 15. Classroom Hands-On Practical

### Practical Title

Authorized Service Discovery and Packet Analysis

### Lab Boundary

Use only an instructor-provided host-only VirtualBox or VMware network. Do not scan the campus, corporate, home, Internet, NAT, or bridged network.

### Tasks

1. Record the authorized target IP.
2. Verify connectivity.
3. Run:

```bash
nmap -sT -sV TARGET_IP
```

4. Record each port, state, service, and version estimate.
5. Capture the scan on the lab interface with Wireshark.
6. Filter for initial TCP SYN packets.
7. Compare open-port and closed-port responses.
8. Explain which findings are exposure, which are confirmed vulnerabilities, and which require validation.

### Evidence Table

| Port | State | Service | Expected? | Risk Question | Recommended Action |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

### Instructor Review

Students must:

- Stay within scope.
- Distinguish discovery from exploitation.
- Avoid claiming that every open port is vulnerable.
- Identify how firewall and endpoint logs would record the scan.
- Recommend controls based on business need.

## 16. Take-Home Practical

Design a defensive network-attack assessment for a fictional organization. Include:

- External and internal reconnaissance risks.
- Five exposed-service scenarios.
- ARP, DNS, MITM, and DDoS risks.
- Preventive and detective controls.
- Required logs and retention owners.
- A containment runbook.
- An authorization and rules-of-engagement statement.
- A network segmentation diagram or table.

## 17. Assessment Questions

### Multiple Choice

1. Which activity is passive reconnaissance?
   A. Sending packets to every port
   B. Reviewing public job advertisements
   C. Exploiting a server
   D. Flooding an API

2. What does an open port indicate?
   A. The host is certainly compromised
   B. A service is accepting connections
   C. The service has no vulnerabilities
   D. A firewall blocked all traffic

3. What distinguishes enumeration from scanning?
   A. Enumeration collects detailed service information.
   B. Enumeration is always passive.
   C. Scanning always exploits a vulnerability.
   D. There is no distinction.

4. ARP spoofing is primarily relevant within:
   A. A local broadcast domain
   B. A certificate authority
   C. An email header
   D. A password database

5. What can DNS poisoning cause?
   A. Incorrect name resolution
   B. Stronger password hashing
   C. Certificate renewal
   D. File compression

6. Which control best protects HTTPS users after malicious DNS resolution?
   A. Disabled certificate validation
   B. Correct TLS certificate validation
   C. Plain HTTP
   D. Shared passwords

7. What distinguishes DDoS from DoS?
   A. DDoS uses distributed sources or infrastructure.
   B. DDoS affects only DNS.
   C. DoS always uses malware.
   D. DoS cannot affect availability.

8. Which Wireshark filter displays ARP traffic?
   A. `http`
   B. `arp`
   C. `smtp`
   D. `icmpv6.type`

9. What should an analyst verify first after detecting scanning?
   A. Whether the activity is authorized
   B. Whether every port can be exploited
   C. Whether logs should be deleted
   D. Whether the source should always be publicly named

10. Which is an operational control?
    A. Incident-response procedure
    B. Firewall appliance
    C. TLS algorithm
    D. Switch hardware

### Short Answer

1. Distinguish passive and active reconnaissance.
2. Explain open, closed, and filtered port states.
3. Describe how ARP spoofing can support a MITM attack.
4. List four DNS poisoning defenses.
5. Compare volumetric and application-layer DDoS.
6. Explain why an open port is not proof of a vulnerability.
7. List five useful network-attack log sources.
8. Explain why authorization is required before scanning.

### Scenario Questions

1. A workstation connects sequentially to hundreds of server ports. Describe triage.
2. Multiple IP addresses suddenly map to one unfamiliar MAC address. Explain possible causes and response.
3. A public DNS record changes without authorization. Describe containment and investigation.
4. A hospital portal slows under distributed requests. Explain availability-focused response.

## 18. Glossary

| Term | Definition |
|---|---|
| ARP Spoofing | Deceptive ARP messages that associate an IP address with an unauthorized MAC address. |
| DDoS | Availability attack using distributed sources or infrastructure. |
| DNS Poisoning | Manipulation causing incorrect DNS resolution. |
| Enumeration | Active collection of detailed information from systems and services. |
| Man-in-the-Middle | Attack positioning an adversary between communicating parties. |
| NetFlow | Metadata summarizing network communication flows. |
| Port Scan | Probing used to identify reachable network services. |
| Reconnaissance | Information gathering about a target. |
| Reflection | Sending requests with a spoofed victim address so responses reach the victim. |
| Service Banner | Information a service reveals about itself. |

## 19. Lesson Review Checklist

- I can distinguish reconnaissance, scanning, enumeration, and exploitation.
- I can interpret basic port states.
- I can explain ARP spoofing, DNS poisoning, MITM, and DDoS.
- I can identify relevant enterprise defenses and evidence.
- I can perform authorized lab discovery safely.
- I can classify controls by category and function correctly.

## 20. Continuity With Future Lessons

Lesson 9 examines web attacks and malware. Students should carry forward the progression from exposed service discovery to service enumeration, application weakness, execution, persistence, and observable indicators.
