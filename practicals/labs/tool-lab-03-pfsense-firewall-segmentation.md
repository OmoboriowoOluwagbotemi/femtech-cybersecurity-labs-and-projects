# Tool Lab 03 - pfSense Firewall and Segmentation

## Purpose

pfSense is the lab firewall, router, DHCP service, NAT gateway, and segmentation enforcement point. This lab teaches students to configure clear network zones, write firewall rules, validate traffic, and troubleshoot with logs.

## Scenario

FEMTECH is separating users, servers, DMZ systems, and SOC tools. You must configure pfSense so approved traffic works and unapproved traffic is blocked with evidence.

## Lab Segments

| Segment | Subnet | Gateway | Purpose |
|---|---|---|---|
| USERS | `10.10.10.0/24` | `10.10.10.1` | Kali and Windows client |
| SERVERS | `10.10.20.0/24` | `10.10.20.1` | Ubuntu and Windows Server |
| DMZ | `10.10.30.0/24` | `10.10.30.1` | Web application target |
| SOC | `10.10.40.0/24` | `10.10.40.1` | Wazuh and sensors |

## Required Policy

| Source | Destination | Port | Decision | Reason |
|---|---|---:|---|---|
| USERS admin host | SERVERS Ubuntu | 22 | Allow | Admin SSH |
| USERS subnet | DMZ web | 80, 443 | Allow | User web access |
| DMZ | SERVERS | Any | Block | Prevent lateral movement |
| SERVERS | SOC Wazuh | Wazuh required ports | Allow | Telemetry |
| USERS | pfSense management | 443 | Allow only admin host | Firewall administration |
| Any internal | Any internal | Unapproved traffic | Block/log | Least privilege |

## Step 1 - Back Up Current pfSense Configuration

In pfSense:

1. Go to **Diagnostics > Backup & Restore**.
2. Download the configuration.
3. Save it as `pfsense-before-tool-lab.xml`.
4. Record the date, administrator, and reason for the change.

## Step 2 - Label Interfaces

Go to **Interfaces > Assignments** and confirm each interface:

| Interface | Name | Address |
|---|---|---|
| LAN/OPT | USERS | `10.10.10.1/24` |
| OPT | SERVERS | `10.10.20.1/24` |
| OPT | DMZ | `10.10.30.1/24` |
| OPT | SOC | `10.10.40.1/24` |

Save evidence showing interface names and addresses.

## Step 3 - Configure DHCP Where Needed

For USERS and optional client networks:

1. Go to **Services > DHCP Server**.
2. Select the interface.
3. Enable DHCP.
4. Set a narrow lab range such as `10.10.10.50` to `10.10.10.100`.
5. Set DNS to pfSense or the Windows domain controller if Active Directory is active.

Do not enable DHCP on networks where servers use static addresses unless the instructor approves reservations.

## Step 4 - Create Aliases

Go to **Firewall > Aliases** and create:

| Alias | Type | Values |
|---|---|---|
| `ADMIN_HOSTS` | Host(s) | `10.10.10.60` |
| `UBUNTU_SERVERS` | Host(s) | `10.10.20.20` |
| `WINDOWS_SERVERS` | Host(s) | `10.10.20.10` |
| `DMZ_WEB` | Host(s) | `10.10.30.20` |
| `WAZUH_SERVER` | Host(s) | `10.10.40.10` |
| `WEB_PORTS` | Ports | `80`, `443` |
| `WAZUH_PORTS` | Ports | approved Wazuh ports for the installed version |

Aliases make rules readable and reduce mistakes.

## Step 5 - Build Rules from Specific to General

On each ingress interface, create explicit allow rules first, then let the default deny handle everything else.

Example USERS rules:

1. Allow `ADMIN_HOSTS` to `UBUNTU_SERVERS` TCP/22.
2. Allow USERS net to `DMZ_WEB` TCP `WEB_PORTS`.
3. Allow `ADMIN_HOSTS` to pfSense address TCP/443.
4. Block and log USERS net to SERVERS net any, except rules above.

Example DMZ rules:

1. Allow DMZ web server outbound DNS only to approved DNS.
2. Block and log DMZ net to SERVERS net.
3. Block and log DMZ net to SOC net.

Example SERVERS rules:

1. Allow Ubuntu/Windows agents to `WAZUH_SERVER` on approved Wazuh ports.
2. Allow required DNS to domain controller where AD is used.
3. Block unnecessary outbound traffic and log selected denies.

## Step 6 - Validate Allowed Traffic

From Kali:

```bash
nc -vz -w 3 10.10.20.20 22
curl -sSI --connect-timeout 5 http://10.10.30.20/
```

From Ubuntu or Windows agent:

```bash
nc -vz -w 3 10.10.40.10 1514
nc -vz -w 3 10.10.40.10 1515
```

Save command output and matching pfSense state/log evidence.

## Step 7 - Validate Blocked Traffic

From Kali:

```bash
nc -vz -w 3 10.10.20.20 3389
nc -vz -w 3 10.10.30.20 22
```

Expected result: blocked or timed out unless the instructor approved that service.

In pfSense:

1. Go to **Status > System Logs > Firewall**.
2. Filter by source IP and destination IP.
3. Save evidence of the block.

## Step 8 - Troubleshoot by Layer

Use this order:

1. Interface enabled?
2. Correct subnet and gateway?
3. Correct ingress interface?
4. Rule order correct?
5. Source, destination, protocol, and port correct?
6. Host firewall allowing traffic?
7. Service actually listening?
8. Return path correct?
9. NAT accidentally hiding the real source?

Do not create an `any-any` rule as a final fix.

## Step 9 - Export Final Configuration

In pfSense:

1. Go to **Diagnostics > Backup & Restore**.
2. Export final configuration.
3. Save as `pfsense-after-tool-lab.xml`.
4. Hash both XML files.

## Deliverables

- Interface plan.
- DHCP plan.
- Alias list.
- Firewall rule matrix.
- Before and after pfSense configuration exports.
- Positive traffic tests.
- Negative traffic tests.
- Firewall log evidence.
- Troubleshooting notes.
- Management summary explaining the business value of segmentation.

## Pass Condition

The student passes when approved business traffic works, unapproved lateral movement is blocked, pfSense logs prove the decision, and the student can explain rule direction and order.

