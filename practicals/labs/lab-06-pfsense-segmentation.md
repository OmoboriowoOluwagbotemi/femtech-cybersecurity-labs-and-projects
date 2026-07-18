# Lab 06 - Segment an Enterprise with pfSense

## Mission

FEMTECH currently has a flat network. Implement USERS, SERVERS, DMZ, and SOC trust zones with default-deny inter-zone policy, controlled DNS/administration, and logged validation.

**Lessons:** 22-25
**Time:** 6 hours
**Systems:** pfSense, Kali/Windows user, Ubuntu server, DMZ web server, Wazuh or analyst host

## Policy Requirements

| Source | Destination | Service | Decision | Business reason |
|---|---|---|---|---|
| USERS | DNS server | TCP/UDP 53 | Allow | Name resolution |
| USERS | DMZ web | TCP 80/443 | Allow | Customer portal |
| USERS | Ubuntu admin | TCP 22 | Allow only from `ADMIN_HOSTS` alias | Administration |
| DMZ | SERVERS | TCP 5432 to approved database only | Allow | Application data |
| DMZ | Any other internal | Any | Deny/log | Containment |
| SERVERS | SOC Wazuh | Required Wazuh ports | Allow | Telemetry |
| SOC | Managed hosts | Approved management ports | Allow | Security operations |
| Any | Any other inter-zone | Any | Deny/log | Least privilege |

## Step 1 - Back Up and Baseline

Export pfSense configuration from **Diagnostics > Backup & Restore**. Record interface assignments, addresses, DHCP scopes, aliases, NAT, rules, and gateways.

From each host:

```bash
ip -br address
ip route
resolvectl status
```

Windows:

```powershell
Get-NetIPConfiguration
Get-NetRoute -AddressFamily IPv4
Resolve-DnsName dc01.femtech.lab
```

## Step 2 - Create and Label Interfaces

In **Interfaces > Assignments**, add and configure:

- USERS: `10.10.10.1/24`
- SERVERS: `10.10.20.1/24`
- DMZ: `10.10.30.1/24`
- SOC: `10.10.40.1/24`

Enable each interface and add a description. Do not overlap subnets. Enable DHCP only where the design requires it. Use reservations for managed lab clients.

## Step 3 - Build Aliases

Under **Firewall > Aliases**, create:

- `ADMIN_HOSTS`: authorised Kali/administrator IP.
- `INTERNAL_NETS`: all four internal CIDRs.
- `DMZ_WEB`: `10.10.30.20`.
- `AD_DNS`: `10.10.20.10`.
- `WAZUH_SERVER`: `10.10.40.10`.
- `WAZUH_PORTS`: ports required by the installed Wazuh version, documented from official guidance.

Aliases make rules readable and changes controlled. They do not automatically permit anything.

## Step 4 - Apply Rules from Specific to General

On each interface, create specific pass rules first, then a logged block rule to `INTERNAL_NETS`. Use a change ID in every description. Example USERS order:

1. Allow USERS to `AD_DNS` TCP/UDP 53.
2. Allow `ADMIN_HOSTS` to SERVERS TCP 22.
3. Allow USERS to `DMZ_WEB` TCP 80/443.
4. Block USERS to `INTERNAL_NETS` any, log.
5. Optional allow USERS to Internet according to course policy.

pfSense normally evaluates interface rules on the interface where traffic enters and uses first match. A broad allow above a narrow block defeats the policy.

Apply, then export another configuration backup.

## Step 5 - Control Administrative Access

Create a dedicated alias and rule for pfSense management. Restrict webConfigurator access to `ADMIN_HOSTS`. Before changing the anti-lockout behaviour:

1. Open a console session.
2. Add and apply the explicit management rule.
3. Test a new browser session from the authorised host.
4. Test denial from an unauthorised host.
5. Only then consider disabling the anti-lockout rule.

Management lockout is a rollback trigger.

## Step 6 - Run a Test Matrix

From each zone, use only explicit ports:

```bash
nc -vz -w 3 <DESTINATION_IP> <PORT>
curl -I --connect-timeout 5 http://10.10.30.20/
dig @10.10.20.10 femtech.lab SOA +short
traceroute -n <DESTINATION_IP>
```

Create at least twelve tests: six expected allows and six expected denies. Record source, destination, service, rule expected, result, log event, and decision.

## Step 7 - Observe State and Logs

Use **Diagnostics > States** to find an allowed connection. Use **Status > System Logs > Firewall** for blocks. For a test packet, record:

- UTC time.
- Interface.
- Action.
- Rule description or tracker.
- Source/destination IP and port.
- TCP flags when present.

Clear only lab states needed to retest a changed rule; stateful firewalls can preserve an earlier connection after policy changes.

## Step 8 - Validate DMZ Containment

On the DMZ host:

```bash
ip route
nc -vz -w 3 10.10.20.10 53
nc -vz -w 3 <DATABASE_IP> 5432
nc -vz -w 3 10.10.20.20 22
nc -vz -w 3 10.10.10.50 445
```

Only the explicitly authorised application dependency should work. If an unrelated connection succeeds, capture the matching state and rule, then remediate the policy.

## Step 9 - Troubleshoot Methodically

- Link: interface enabled and VirtualBox cable connected?
- IP: correct address and `/24` prefix?
- Route: default gateway is segment `.1`?
- DNS: client points to authorised resolver?
- Listener: destination service actually listening?
- Host firewall: inbound rule permits source?
- pfSense rule: correct ingress interface, order, protocol, source, destination, and port?
- State: old state masking a rule change?
- NAT: no inter-zone NAT should normally be needed.

## Rollback

Use console access and restore the pre-change XML if management or routing is lost. Record which validation failed. A configuration restore without root-cause analysis is recovery, not troubleshooting.

## Deliverables

- Before/after pfSense XML exports stored securely.
- Logical topology and data-flow diagram.
- Rule matrix with business justification and owner.
- Twelve-test validation matrix and corresponding logs.
- Evidence of one stateful-firewall observation.
- DMZ compromise analysis: allowed attack paths, blocked paths, and residual risks.
- Five-minute change advisory board briefing.

## Senior Analyst Challenge

The application owner asks for `DMZ net -> SERVERS net any` because troubleshooting is slow. Draft a response that acknowledges business pressure, explains blast radius, proposes a temporary time-bound diagnostic rule, defines monitoring, and states removal criteria.
