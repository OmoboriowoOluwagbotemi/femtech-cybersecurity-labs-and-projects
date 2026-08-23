# Lesson 16: Linux Networking

## Lesson Overview

Linux networking connects interfaces, addresses, routes, name resolution, sockets, applications, and file-sharing services. Security professionals must distinguish what a system is configured to do from what it is actually doing on the network.

This lesson covers network interfaces, `netstat`, `ss`, `dig`, `curl`, SSH tunneling, Samba, and secure file sharing. It completes the Linux foundation established in Lessons 11 through 15.

## Learning Objectives

Students will be able to:

- Explain Linux interface, address, route, DNS, socket, and application layers.
- Inspect network interfaces and routing safely.
- Compare `netstat` and `ss`.
- Identify listening and established sockets.
- Query and interpret DNS with `dig`.
- Test HTTP and HTTPS behavior with `curl`.
- Explain local, remote, and dynamic SSH forwarding.
- Describe Samba architecture, identity, shares, and permissions.
- Troubleshoot network and file-sharing problems systematically.
- Collect network evidence without exceeding authorization.

## Prerequisite Knowledge

Students should understand:

- Ports, protocols, scanning, DNS, and on-path attacks from Lesson 8.
- TLS and certificate validation from Lessons 4 and 6.
- Host-only virtualization from Lesson 10.
- Linux files, users, permissions, services, logs, hardening, Bash, and Python from Lessons 11 through 15.

## Enterprise Relevance

Linux systems commonly provide web, DNS, database, file, monitoring, automation, and security services. Analysts investigate:

- Unexpected listeners.
- Suspicious outbound connections.
- Incorrect routes or DNS.
- Failed service binding.
- Exposed administration ports.
- Unencrypted protocols.
- SSH tunnel abuse.
- Excessive file-share access.
- Cloud and hybrid connectivity failures.

## 1. Linux Networking

### What

Linux networking is the set of kernel, interface, routing, name-resolution, socket, firewall, and application functions that enable communication.

### Why

Applications depend on correct and secure connectivity. A failure may result from configuration, routing, DNS, firewall, authentication, encryption, application state, or a security incident.

### How

Data is processed through layers:

1. Application constructs data.
2. Transport protocol uses ports and connection state.
3. IP selects source, destination, and route.
4. Link layer delivers frames on the local network.
5. The receiving system reverses the process.

### Where

Networking operates across physical interfaces, virtual adapters, bridges, VLANs, VPNs, containers, cloud virtual networks, and loopback.

## 2. Interfaces and Addresses

### What

A network interface is a software representation of a physical or virtual communication endpoint.

### Why

Interfaces hold addresses and link state and connect the host to a network.

### How

The kernel and network-management services configure interface state, addresses, routes, DNS, and link properties.

### Where

Examples include:

- Ethernet interfaces.
- Wireless interfaces.
- Loopback.
- Virtual-machine adapters.
- Bridges.
- VLAN interfaces.
- VPN tunnels.
- Container virtual Ethernet pairs.

## 3. Inspecting Interfaces

Preferred modern commands:

```bash
ip link show
ip address show
ip -brief address
ip route show
ip -6 route show
```

| Command | Shows |
|---|---|
| `ip link` | Interface and link-layer state |
| `ip address` | IPv4 and IPv6 addresses |
| `ip route` | Routing table |
| `ip neigh` | Neighbor cache, including ARP-related state |

Legacy `ifconfig` may be absent and does not provide the full modern `iproute2` model.

### Interface State

An interface may be administratively up but lack a working physical or virtual link. Address presence also does not prove end-to-end connectivity.

Check:

- Interface state.
- Link state.
- Address and prefix.
- Default gateway.
- DNS configuration.
- Route selection.
- Firewall.
- Application listener.

## 4. IPv4 and IPv6 Addressing

An IP address identifies an interface within an IP network context. A prefix length identifies the network portion.

Examples:

```text
192.168.56.20/24
2001:db8:10::20/64
```

Important address scopes:

| Scope | Example | Purpose |
|---|---|---|
| IPv4 loopback | `127.0.0.1` | Same host |
| IPv6 loopback | `::1` | Same host |
| IPv4 private | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | Private addressing |
| IPv6 link-local | `fe80::/10` | Local link operations |
| Unspecified | `0.0.0.0`, `::` | No specific address; may mean all local addresses for a listener |

A service bound to `127.0.0.1` is not normally reachable from another host. A listener on `0.0.0.0` may accept connections on every assigned IPv4 address, subject to firewall and routing.

## 5. Routing

### What

Routing selects the next hop and outgoing interface for a destination.

### Why

A correctly addressed interface still cannot reach remote networks without a suitable route.

### How

Linux generally chooses the most specific matching route, then applies metrics and policy rules where relevant.

### Where

Routes may be connected, static, learned, default, VPN-provided, container-created, or cloud-configured.

Useful command:

```bash
ip route get 192.0.2.50
```

This asks the kernel how it would route a destination. It does not prove that the destination responds.

## 6. Connectivity Testing

```bash
ping -c 4 192.168.56.10
tracepath 192.168.56.10
```

Ping tests ICMP echo behavior, not whether every application works. A host may block ICMP and still provide HTTPS. A successful ping does not prove the target service is secure.

Trace tools infer path behavior using TTL or hop-limit responses. Missing hops may reflect filtering, rate limiting, asymmetric routing, or devices that do not reply.

## 7. Sockets

### What

A socket is a kernel communication endpoint associated with protocol, addresses, ports, state, and process context.

### Why

Socket inspection shows which services are exposed and which remote systems have active communication.

### How

Applications request sockets from the kernel, bind local addresses and ports, listen for connections, or connect outward.

### Where

Sockets include TCP, UDP, raw, Unix-domain, and other families.

## 8. netstat

### What

`netstat` is a legacy tool for displaying network connections, listeners, routes, interfaces, and statistics.

### Why

It remains common in older procedures and systems.

### How

Typical command:

```bash
sudo netstat -tulpn
```

Common options:

- `-t`: TCP.
- `-u`: UDP.
- `-l`: listening.
- `-p`: process information, subject to privilege.
- `-n`: numeric addresses and ports.

### Where

`netstat` is provided by older or optional network-tools packages. Modern Linux administration generally prefers `ss`.

## 9. ss

### What

`ss` is a modern socket-inspection tool in the `iproute2` suite.

### Why

It provides efficient, detailed visibility into socket state and filtering.

### How

```bash
ss -tulpn
ss -tan
ss -uan
ss -tp state established
ss -ltn 'sport = :22'
```

| Option | Meaning |
|---|---|
| `-t` | TCP |
| `-u` | UDP |
| `-l` | Listening |
| `-a` | All relevant sockets |
| `-n` | Numeric output |
| `-p` | Process details |

### Where

Use `ss` for service exposure review, troubleshooting, incident response, and baseline comparison.

## 10. Socket Interpretation

Example:

```text
LISTEN 0 128 0.0.0.0:22 0.0.0.0:*
```

Interpretation:

- Protocol is determined by command context.
- State is listening.
- Local IPv4 address is all assigned addresses.
- Local port is 22.
- Remote endpoint is not yet established.

TCP states include:

- `LISTEN`.
- `ESTAB`.
- `SYN-SENT`.
- `SYN-RECV`.
- `TIME-WAIT`.
- `CLOSE-WAIT`.

Many `TIME-WAIT` sockets can be normal after short connections. Persistent `CLOSE-WAIT` may indicate an application is not closing sockets after the peer closes.

### Analyst Cautions

- Process details may require privilege.
- A process name can be changed or misleading.
- Containers and namespaces can hide sockets from the host or guest view.
- A listener does not prove firewall reachability.
- A connection does not prove maliciousness.
- NAT can obscure original endpoints.

## 11. DNS Resolution

### What

DNS maps names to records such as addresses, mail exchangers, name servers, aliases, and text data.

### Why

Applications depend on names, but resolution failure and malicious changes can redirect or interrupt communication.

### How

A client commonly uses a stub resolver, configured recursive resolver, cache, and authoritative DNS hierarchy.

### Where

Linux DNS configuration may involve `/etc/resolv.conf`, NetworkManager, `systemd-resolved`, DHCP, VPN software, containers, and local caching services.

## 12. dig

### What

`dig` is a DNS query and troubleshooting tool.

### Why

It exposes response codes, record data, TTL, flags, authority, and responding server.

### How

```bash
dig example.org A
dig example.org AAAA
dig example.org MX
dig example.org TXT
dig @192.168.56.1 example.org A
dig +short example.org
dig +trace example.org
dig -x 192.0.2.10
```

### Where

Use `dig` to compare resolvers, inspect records, investigate email authentication, and troubleshoot name resolution.

## 13. DNS Response Interpretation

Important fields:

| Field | Meaning |
|---|---|
| `status` | Result such as `NOERROR`, `NXDOMAIN`, or `SERVFAIL` |
| `ANSWER` | Records answering the question |
| `AUTHORITY` | Authority-related records |
| `SERVER` | Resolver that answered the client |
| `Query time` | Observed response time |
| `TTL` | Remaining cache lifetime for a record |

`NXDOMAIN` means the queried name does not exist according to the answer. `NOERROR` with no requested record can mean the name exists but has no record of that type. `SERVFAIL` indicates the resolver could not complete processing, possibly because of DNSSEC, upstream, or server failure.

`dig +trace` sends iterative queries and can expose requests to external authoritative servers. Use it only where allowed.

DNS data does not authenticate an HTTPS service by itself. TLS hostname and trust validation remain required.

## 14. curl

### What

`curl` transfers data using protocols such as HTTP and HTTPS and displays request or response information.

### Why

It supports repeatable testing of status, headers, redirects, certificates, APIs, and service behavior.

### How

```bash
curl https://example.org/
curl -I https://example.org/
curl -v https://example.org/
curl -L https://example.org/
curl --fail --show-error https://example.org/health
```

### Where

Use `curl` for application troubleshooting, health checks, API testing, certificate investigation, and automation.

## 15. curl Security

Useful concepts:

- `-I` requests headers using a HEAD request where supported.
- `-v` displays protocol and TLS diagnostics and may expose sensitive headers.
- `-L` follows redirects, which may cross domains.
- `--fail` treats selected HTTP error status codes as command failure.
- `--connect-timeout` and `--max-time` bound waiting.

Avoid:

- `-k` or `--insecure` as a routine fix because it disables certificate verification.
- Placing credentials or tokens directly in command history.
- Sending production data to unapproved endpoints.
- Assuming HTTP 200 means correct or secure business behavior.
- Logging authorization headers.

Example safer time bounds:

```bash
curl --fail --show-error \
  --connect-timeout 5 \
  --max-time 15 \
  https://example.org/health
```

## 16. SSH Tunneling

### What

SSH tunneling forwards selected network connections through an encrypted SSH session.

### Why

It can protect otherwise exposed paths, reach controlled management services, and support secure administration.

### How

SSH listens on an endpoint, carries traffic through the SSH connection, and connects to a destination from one side of the tunnel.

### Where

Tunnels are used for administration, database access, temporary troubleshooting, bastion hosts, and controlled port forwarding.

## 17. Local Port Forwarding

```bash
ssh -L 127.0.0.1:8443:internal-app:443 user@bastion
```

This generally means:

1. Listen locally on `127.0.0.1:8443`.
2. Carry accepted connections through SSH to `bastion`.
3. Ask the remote SSH side to connect to `internal-app:443`.

Binding to loopback limits who can connect locally. Binding to all interfaces can expose the forwarded service to other hosts and requires explicit risk review.

## 18. Remote Port Forwarding

```bash
ssh -R 127.0.0.1:9000:localhost:8080 user@remote-host
```

This requests a listener on the remote side and forwards connections back through SSH to the specified destination from the local side.

Remote forwarding can bypass intended inbound controls if unmanaged. SSH server policy can restrict forwarding and permitted destinations.

## 19. Dynamic Port Forwarding

```bash
ssh -D 127.0.0.1:1080 user@bastion
```

Dynamic forwarding creates a local SOCKS proxy. Compatible applications can send different destination connections through the tunnel.

### Tunnel Limitations

- SSH forwarding is not automatically a full-device VPN.
- Only configured application traffic uses the tunnel.
- DNS may or may not traverse it, depending on application and proxy configuration.
- The SSH server and destination trust boundaries remain relevant.
- Logging may show the bastion rather than the original client at the destination.
- Long-lived tunnels can become persistence or bypass mechanisms.

## 20. SSH Tunnel Security

- Require authorization and documented business purpose.
- Restrict SSH users and source networks.
- Limit forwarding with SSH policy.
- Bind listeners narrowly.
- Use strong authentication.
- Monitor unusual listeners and long sessions.
- Log bastion activity.
- Remove temporary access after use.
- Do not use tunnels to bypass segmentation policy.

Detection may involve SSH session logs, unexpected local listeners, process command lines, network flows, and destination access from bastions.

## 21. File Sharing

### What

File sharing exposes files through a network protocol while applying identity, authorization, locking, and transport controls.

### Why

Organizations need controlled collaboration and application access.

### How

A file-sharing service authenticates a client, evaluates share and filesystem permissions, and performs file operations.

### Where

Linux may share files through SMB/Samba, NFS, SFTP, HTTPS applications, or cloud storage.

## 22. Samba

### What

Samba implements SMB-related services on Unix-like systems and can interoperate with Windows clients and Active Directory environments.

### Why

It allows Linux systems to provide or consume enterprise file and printer services.

### How

Common components include:

- `smbd`: file and print service functions.
- `nmbd`: legacy NetBIOS name functions in some deployments.
- `winbindd`: identity and authentication integration functions.
- Configuration, commonly `/etc/samba/smb.conf`.

### Where

Samba is used for departmental shares, application data, user directories, and hybrid Windows-Linux environments.

## 23. Samba Access Control

Access may depend on:

1. Network reachability and firewall.
2. SMB protocol and encryption/signing policy.
3. Samba share configuration.
4. Authenticated identity.
5. Filesystem ownership, mode, ACLs, and mandatory access controls.

The effective result is usually the most restrictive combination. A writable Samba share does not override filesystem denial.

Illustrative share:

```ini
[security-reports]
    path = /srv/security-reports
    read only = yes
    valid users = @security
```

This is not a complete production configuration. Validate syntax with:

```bash
testparm
```

## 24. Samba Identity

Samba can use:

- Local Samba users.
- Local Unix identities.
- Active Directory domain identities.
- Other configured identity back ends.

Local Samba password state can be separate from the Linux password. Account lifecycle must disable every relevant identity path.

Useful administrative checks:

```bash
testparm
smbclient -L //server -U username
getent passwd domain-user
getent group domain-group
```

Never place a password directly in a command argument when a safer prompt or credential mechanism exists.

## 25. Samba Security

- Disable obsolete SMB versions.
- Require signing or encryption according to risk and compatibility.
- Restrict network exposure.
- Use least-privileged share and filesystem access.
- Avoid guest access for sensitive data.
- Protect configuration and credential databases.
- Patch Samba.
- Log authentication and file activity appropriate to risk.
- Separate administrative shares.
- Review stale accounts and groups.
- Test backup and recovery.

SMB signing supports integrity and peer authentication properties for SMB messages. SMB encryption protects confidentiality as well. Exact support and negotiation depend on client, server, and configuration.

## 26. File-Sharing Threats

| Threat | Example | Control |
|---|---|---|
| Excessive access | All staff can read payroll | Role groups and reviews |
| Ransomware | Compromised user encrypts writable shares | Least privilege, EDR, segmentation, tested backups |
| Credential theft | Weak SMB authentication | Strong identity, MFA at access architecture, protocol hardening |
| On-path manipulation | Unsigned traffic altered | SMB signing and trusted networks |
| Data interception | Sensitive files cross untrusted network | SMB encryption or secure tunnel |
| Hidden persistence | Files placed in startup or software shares | Change control and monitoring |
| Availability failure | Share or storage unavailable | Redundancy, monitoring, recovery |

## 27. Troubleshooting Method

Use a layered approach:

1. Confirm business symptom and scope.
2. Inspect interface and address.
3. Inspect route selection.
4. Test local and remote reachability appropriately.
5. Check DNS answer and resolver.
6. Inspect socket listener and process.
7. Check host and network firewalls.
8. Check service state and logs.
9. Check TLS or SSH trust.
10. Check authentication.
11. Check share-level authorization.
12. Check filesystem permissions and ACLs.
13. Validate after one controlled change.

Avoid broad firewall rules or `chmod 777` as troubleshooting shortcuts.

## 28. Enterprise Scenarios

### Small Business

A Linux web server listens on `0.0.0.0:8080` even though only a reverse proxy should reach it. The administrator binds it to a private address, restricts UFW, and verifies proxy health.

### Financial Institution

Database administrators use approved local SSH forwarding through a hardened bastion. Access is time-limited, strongly authenticated, logged, and restricted to the required destination.

### Healthcare Organization

A clinical file share is reachable but access fails. Investigation finds valid Samba authentication and share permission, but the directory ACL mask removes write access. The team corrects the approved ACL rather than broadening all permissions.

### Educational Institution

A student research share permits guest access and obsolete SMB. Administrators migrate users to authenticated groups, remove legacy protocol support, and monitor access.

### Government Agency

An unexpected dynamic SSH forward appears on an administrator workstation. Responders preserve process, command-line, authentication, socket, and flow evidence and determine whether it was authorized.

### Cloud Environment

A cloud Linux instance resolves an internal service to an unexpected address after a DNS configuration change. Teams compare instance resolver state, virtual network DNS settings, authoritative records, and TLS validation.

## 29. SOC Investigation

Network evidence may include:

- `ss` socket output.
- Process tree and executable.
- SSH authentication and session logs.
- DNS resolver and query logs.
- Firewall and flow logs.
- Proxy and HTTP logs.
- Samba authentication and audit logs.
- Filesystem changes.
- Cloud network-flow and configuration logs.

### Investigation Questions

- Is the listener expected and approved?
- Which addresses can reach it?
- Which process and identity own it?
- When did it start?
- Is the connection inbound or outbound?
- Is DNS returning the expected destination?
- Was certificate or host-key validation successful?
- Is a tunnel bypassing normal controls?
- Did file access exceed business need?
- What changed immediately before the symptom?

## 30. Security+ SY0-701 Alignment

This lesson supports network configuration, secure protocols, ports and services, DNS, SSH, tunneling, segmentation, file sharing, least privilege, monitoring, and troubleshooting.

Host firewalls, secure protocols, Samba access controls, and SSH restrictions are technical controls. Access review, tunnel approval, troubleshooting, and recovery are operational controls. Network and file-sharing standards are managerial controls and directive in function.

## 31. Classroom Hands-On Practical

### Practical Title

Investigate Linux Connectivity and Build a Controlled File Share

### Lab Boundary

Use two instructor-approved VMs on one host-only network. No bridged adapter is permitted. Do not expose Samba or SSH forwarding to the physical network.

### Part A: Network Baseline

On the Linux server:

1. Record `ip -brief address`.
2. Record `ip route`.
3. Use `ip route get` for the client address.
4. Record listening sockets with `ss -tulpn`.
5. Map expected listeners to services and owners.

### Part B: DNS and HTTPS

1. Query an instructor-approved DNS record with `dig`.
2. Record status, answer, TTL, and responding server.
3. Use `curl -v` against an instructor-approved HTTPS service.
4. Record status, redirect, TLS result, and certificate hostname outcome.
5. Do not use `--insecure`.

### Part C: Local SSH Forward

With instructor approval:

```bash
ssh -L 127.0.0.1:8443:INTERNAL_HOST:443 user@BASTION
```

1. Confirm the local listener.
2. Test through `127.0.0.1:8443`.
3. Identify which host makes the destination connection.
4. Close the tunnel.
5. Verify the listener disappears.

### Part D: Samba

1. Create an instructor-approved group and directory.
2. Set controlled ownership and permissions.
3. Configure a read-only lab share.
4. Run `testparm`.
5. Start or reload the approved service.
6. Test authorized and unauthorized access.
7. Review service and authentication logs.

### Evidence Table

| Layer | Command or Source | Expected | Actual | Security Meaning |
|---|---|---|---|---|
| Interface | `ip -brief address` | Host-only address |  |  |
| Route | `ip route get` | Host-only interface |  |  |
| Socket | `ss -tulpn` | Approved listeners |  |  |
| DNS | `dig` | Approved answer |  |  |
| HTTPS | `curl -v` | Valid TLS |  |  |
| Samba | Logs and test | Authorized access only |  |  |

### Rollback

Remove the temporary tunnel, share configuration, lab users and groups, and test data according to instructor instructions, or revert the snapshot.

## 32. Take-Home Practical

Design Linux networking for a fictional organization containing:

- Interface and address plan.
- Route and DNS requirements.
- Approved listener inventory.
- `ss` baseline process.
- HTTPS health check with safe timeouts.
- Bastion and SSH-forwarding policy.
- Samba identity and share design.
- Share and filesystem permission matrix.
- Logging and alerting requirements.
- Ten troubleshooting tests.
- Five attack scenarios and controls.

## 33. Assessment Questions

### Multiple Choice

1. Which command is preferred for modern Linux interface inspection?
   A. `ip`
   B. `chmod`
   C. `passwd`
   D. `tar`

2. What does a listener on `0.0.0.0:22` generally indicate?
   A. SSH may accept IPv4 connections on all assigned local IPv4 addresses
   B. SSH is accessible from every network regardless of firewall
   C. Only loopback can connect
   D. DNS is disabled

3. Which tool is the modern replacement for many `netstat` socket functions?
   A. `ss`
   B. `touch`
   C. `chown`
   D. `logger`

4. What does `NXDOMAIN` indicate?
   A. The queried name does not exist according to the DNS response
   B. The host is malware-free
   C. HTTPS validation passed
   D. The record has infinite TTL

5. Why is `curl --insecure` unsafe as a routine fix?
   A. It disables TLS certificate verification
   B. It disables HTTP
   C. It deletes certificates
   D. It changes DNS records

6. In local SSH forwarding, where is the initial listening port?
   A. On the SSH client side
   B. Always on the destination web server
   C. On every network host
   D. Only in DNS

7. What does dynamic SSH forwarding commonly provide?
   A. A local SOCKS proxy
   B. A full-disk backup
   C. An SMB share
   D. A DNS zone

8. Which statement about Samba authorization is correct?
   A. Share and filesystem permissions both affect access
   B. Share write access always overrides filesystem denial
   C. Guest access is always secure
   D. SMB requires no identity

9. What should be run before applying Samba configuration?
   A. `testparm`
   B. `chmod 777`
   C. `kill -9 1`
   D. `rm /etc`

10. Which is an operational control?
    A. Quarterly file-share access review
    B. SMB encryption algorithm
    C. UFW packet rule
    D. SSH daemon code

### Short Answer

1. Distinguish interface state, addressing, routing, and DNS.
2. Compare `netstat` and `ss`.
3. Explain five common TCP socket states.
4. Distinguish `NXDOMAIN`, `NOERROR` without an answer, and `SERVFAIL`.
5. List five secure `curl` practices.
6. Compare local, remote, and dynamic SSH forwarding.
7. Explain why an SSH tunnel is not necessarily a full VPN.
8. Describe the Samba access-control layers.

### Scenario Questions

1. A service listens on `0.0.0.0`, but remote clients cannot connect. Describe layered troubleshooting.
2. DNS resolves a trusted service to an unexpected address, but TLS fails hostname validation. Describe investigation and safe response.
3. A long-lived dynamic SSH forward appears on a privileged workstation. Identify evidence and containment considerations.
4. A user authenticates to Samba but cannot write. Describe authorization troubleshooting.
5. Ransomware encrypts files through a writable share. Describe identity, endpoint, share, backup, and evidence response.

## 34. Glossary

| Term | Definition |
|---|---|
| Bind | Associate a socket with a local address and port. |
| curl | Command-line data-transfer and protocol-testing tool. |
| dig | DNS query and troubleshooting tool. |
| Dynamic Forwarding | SSH mode providing a local SOCKS proxy. |
| Interface | Physical or virtual networking endpoint represented by the operating system. |
| Local Forwarding | SSH mode creating a listener on the client side and forwarding through the server. |
| netstat | Legacy network status and socket-inspection tool. |
| Remote Forwarding | SSH mode requesting a listener on the remote side and forwarding back through the client. |
| Route | Rule used to select a next hop and outgoing interface. |
| Samba | Unix-like implementation of SMB-related file, print, and identity services. |
| SMB | Network protocol family commonly used for file and printer sharing. |
| Socket | Kernel communication endpoint associated with protocol and addressing. |
| SOCKS Proxy | Proxy protocol allowing applications to request connections to different destinations. |
| ss | Modern Linux socket-inspection tool. |

## 35. Lesson Review Checklist

- I can inspect Linux interfaces, addresses, routes, and neighbors.
- I can compare `netstat` with `ss`.
- I can interpret listeners and established sockets.
- I can query and interpret DNS with `dig`.
- I can test HTTPS safely with `curl`.
- I can explain all three SSH forwarding types and their risks.
- I can design and troubleshoot Samba access.
- I can conduct layered network troubleshooting.
- I can classify controls by category and function correctly.

## 36. Continuity With Future Lessons

Lesson 17 begins Windows fundamentals, including the Registry, services, processes, Event Logs, PowerShell, and Windows security architecture.

Students should carry forward:

- Configuration state is not proof of actual reachability.
- A listener, route, DNS answer, and application response describe different layers.
- Trust validation must not be disabled to make testing appear successful.
- Identity and filesystem permissions remain essential to file sharing.
- Tunnels must be authorized, bounded, logged, and removed when no longer required.
