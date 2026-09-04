# Project 03 Solution - Segment a Small Office Network with pfSense

## Target Outcome

The student uses pfSense to segment a small office into USERS, SERVERS, DMZ, and ADMIN/SOC zones, then proves approved traffic works and unapproved traffic is blocked with firewall logs.

## Reference Topology

| Segment | Subnet | Gateway | Systems |
|---|---|---:|---|
| USERS | `10.10.10.0/24` | `10.10.10.1` | `win-user01`, `kali01` |
| SERVERS | `10.10.20.0/24` | `10.10.20.1` | `file01` |
| DMZ | `10.10.30.0/24` | `10.10.30.1` | `portal01` |
| ADMIN/SOC | `10.10.40.0/24` | `10.10.40.1` | `admin01`, Wazuh optional |

## Step 1 - Scope and Backup

Record:

```text
Approved networks:
Approved source systems:
Approved target systems:
Approved ports:
Prohibited actions:
Stop conditions:
```

In pfSense:

1. Go to Diagnostics > Backup & Restore.
2. Download configuration backup.
3. Save as `02-before-config-backup.xml`.

The backup is required because firewall changes can accidentally block access or break business traffic. A professional administrator always preserves a known-good configuration before changing routing, DHCP, NAT, or firewall rules.

Evidence folder suggestion:

```text
project-03-pfsense-segmentation/
  evidence/
    01-scope/
    02-before/
    03-interfaces/
    04-dhcp/
    05-aliases/
    06-rules/
    07-validation/
    08-logs/
    09-report/
```

## Step 2 - Configure Interfaces

In pfSense:

1. Go to Interfaces > Assignments.
2. Assign interfaces for USERS, SERVERS, DMZ, and ADMIN/SOC.
3. Enable each interface.
4. Set static IPv4 addresses:
   - USERS: `10.10.10.1/24`
   - SERVERS: `10.10.20.1/24`
   - DMZ: `10.10.30.1/24`
   - ADMIN/SOC: `10.10.40.1/24`
5. Save and apply changes.

Evidence: screenshot each interface page after saving.

Interface validation table:

| Interface | Status to prove | Evidence |
|---|---|---|
| USERS | Enabled with correct static IP | Interface screenshot |
| SERVERS | Enabled with correct static IP | Interface screenshot |
| DMZ | Enabled with correct static IP | Interface screenshot |
| ADMIN/SOC | Enabled with correct static IP | Interface screenshot |

If a client cannot reach its gateway, check the VirtualBox network adapter mapping first. A common mistake is assigning the pfSense interface correctly in the web UI but connecting the VM network adapters to the wrong internal network names.

## Step 3 - Configure DHCP Where Needed

For USERS:

1. Services > DHCP Server > USERS.
2. Enable DHCP.
3. Range: `10.10.10.100` to `10.10.10.199`.
4. DNS: instructor-approved DNS, or AD DNS if the domain exists.
5. Save.

For server segments, prefer static IPs or DHCP reservations.

DHCP validation from a client:

```bash
ip -br address
ip route
cat /etc/resolv.conf
ping -c 4 10.10.10.1
```

Expected result: the client receives an IP address from the correct subnet, uses the pfSense interface as its default gateway, and has a DNS server assigned.

## Step 4 - Create Aliases

Firewall > Aliases:

| Alias | Type | Values |
|---|---|---|
| `ADMIN_HOSTS` | Host(s) | `10.10.40.50` |
| `FILE_SERVER` | Host | `10.10.20.20` |
| `PORTAL_SERVER` | Host | `10.10.30.20` |
| `MGMT_PORTS` | Ports | `22,3389,5985,5986` |
| `WEB_PORTS` | Ports | `80,443` |

Evidence: export or screenshot alias list.

## Step 5 - Build Firewall Rules

Before adding allow rules, confirm the policy goal:

- Users should reach only approved business services.
- Servers should not initiate unnecessary traffic to user devices.
- DMZ systems should be treated as exposed and less trusted.
- Admin/SOC access should be limited to approved administrative hosts.
- Firewall logs should help explain both allowed and denied tests.

USERS interface rules, top to bottom:

| Action | Source | Destination | Port | Description |
|---|---|---|---|---|
| Pass | USERS net | `PORTAL_SERVER` | `WEB_PORTS` | Allow portal access |
| Pass | USERS net | `FILE_SERVER` | `445` if required | Allow approved file access |
| Block | USERS net | SERVERS net | `MGMT_PORTS` | Block user management access |
| Block | USERS net | DMZ net | Any not approved | Block unnecessary DMZ access |

ADMIN/SOC rules:

| Action | Source | Destination | Port | Description |
|---|---|---|---|---|
| Pass | `ADMIN_HOSTS` | SERVERS net | `MGMT_PORTS` | Admin to servers |
| Pass | `ADMIN_HOSTS` | DMZ net | `MGMT_PORTS` | Admin to portal |

DMZ rules:

| Action | Source | Destination | Port | Description |
|---|---|---|---|---|
| Pass | `PORTAL_SERVER` | backend if required | approved backend port | Portal backend access |
| Block | DMZ net | USERS net | Any | Block DMZ to users |
| Block | DMZ net | SERVERS net | Any not approved | Block broad internal access |

Enable logging on important block rules.

Rule order matters. pfSense evaluates rules from top to bottom on the interface where traffic enters the firewall. A broad allow rule placed above a specific block rule can accidentally permit traffic that should be denied.

Minimum final policy:

| Traffic | Final decision |
|---|---|
| USERS to DMZ web portal | Allow |
| USERS to SERVERS SMB if business-approved | Allow |
| USERS to server SSH/RDP/WinRM | Deny |
| ADMIN/SOC to server management ports | Allow |
| DMZ to USERS | Deny |
| DMZ to internal server ports not required by the application | Deny |
| Guest or unknown networks to internal networks | Deny |

## Step 6 - Validation Commands

From `kali01` or approved test host:

```bash
nc -vz -w 3 10.10.30.20 443
nc -vz -w 3 10.10.20.20 22
nc -vz -w 3 10.10.20.20 445
nmap -Pn -n -sT -p 22,80,443,445,3389 --reason 10.10.20.20
```

From ADMIN/SOC:

```bash
nc -vz -w 3 10.10.20.20 22
```

Expected:

- USERS to portal HTTPS: allowed.
- USERS to server management: blocked.
- ADMIN/SOC to server management: allowed.
- DMZ to USERS: blocked.

Save validation evidence:

```bash
mkdir -p evidence/07-validation
ip -br address | tee evidence/07-validation/test-host-ip.txt
ip route | tee evidence/07-validation/test-host-route.txt
nc -vz -w 3 10.10.30.20 443 |& tee evidence/07-validation/users-to-dmz-443.txt
nc -vz -w 3 10.10.20.20 22 |& tee evidence/07-validation/users-to-server-22-blocked.txt
nmap -Pn -n -sT -p 22,80,443,445,3389 --reason 10.10.20.20 -oA evidence/07-validation/users-to-server-nmap
```

PowerShell validation from Windows:

```powershell
Test-NetConnection 10.10.30.20 -Port 443
Test-NetConnection 10.10.20.20 -Port 22
Test-NetConnection 10.10.20.20 -Port 445
ipconfig /all
route print
```

Interpretation:

| Result | Meaning |
|---|---|
| `TcpTestSucceeded: True` | The port is reachable from that source |
| `TcpTestSucceeded: False` | The port is blocked, closed, or unreachable |
| Nmap `filtered` | Firewall likely blocked probe or response |
| Nmap `closed` | Host responded but service is not listening |
| Nmap `open` | Service is reachable |

## Step 7 - Firewall Log Evidence

In pfSense:

1. Status > System Logs > Firewall.
2. Filter by source IP or destination IP.
3. Capture allowed and blocked examples.
4. Record rule description, interface, action, source, destination, port, and time.

Log review table:

| Field | What to record |
|---|---|
| Time | When the test happened |
| Interface | Where traffic entered pfSense |
| Action | Pass or block |
| Source | Test machine IP |
| Destination | Target server IP |
| Port | Service being tested |
| Rule description | Which rule made the decision |

Good evidence connects the command output and the firewall log. For example, if `nc` fails from USERS to SSH on a server, the pfSense log should show a matching block entry from the USERS interface.

## Step 8 - Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Client has no IP | DHCP disabled or wrong VM network | Check DHCP range and VirtualBox adapter |
| Client cannot ping gateway | Wrong interface assignment | Verify pfSense interface mapping |
| Allowed traffic blocked | Rule on wrong interface or wrong alias | Check source interface and alias values |
| Blocked traffic allowed | Broad allow rule above block rule | Reorder rules and retest |
| Logs do not show test | Logging not enabled or wrong source | Enable logging and verify client IP |
| DNS fails but IP works | DNS server missing or blocked | Check DHCP DNS and DNS firewall rules |

## Step 9 - Final Backup and Report

Export final config as `11-final-config-backup.xml`.

Final report must include topology, rule matrix, allowed tests, blocked tests, log interpretation, rollback plan, and residual risk.

Required report sections:

```text
Business problem:
Network diagram:
Interface table:
DHCP design:
Alias table:
Firewall rule matrix:
Allowed traffic validation:
Blocked traffic validation:
Firewall log evidence:
Troubleshooting notes:
Rollback plan:
Residual risk:
Recommendations:
```

## Pass Standard

The project is complete when the student can prove segmentation exists, explain why each zone is trusted differently, show firewall rules with clear descriptions, validate allowed and denied traffic, interpret pfSense logs, and restore the previous configuration if needed.
