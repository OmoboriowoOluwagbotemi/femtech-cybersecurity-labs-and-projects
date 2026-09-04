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

## Complete Lab Support

### Beginner Concepts

| Concept | Simple meaning | pfSense example |
|---|---|---|
| Interface | Network card or virtual adapter | USERS, SERVERS, DMZ, SOC |
| Gateway | Device IP used to leave a subnet | `10.10.10.1` |
| Subnet | Group of IP addresses in one network | `10.10.20.0/24` |
| DHCP | Automatically gives IP addresses | USERS clients receive addresses |
| DNS | Converts names to IP addresses | Domain clients find `dc01` |
| NAT | Translates addresses between networks | Internal clients reach updates through WAN |
| Alias | Reusable name for hosts, networks, or ports | `ADMIN_HOSTS` |
| Rule | Allow or block decision | Allow admin SSH |
| State | Memory of an allowed connection | Return traffic is permitted |
| Log | Record of firewall decisions | Blocked DMZ traffic appears in logs |

### Preflight Checklist

```text
pfSense VM name:
Admin username:
WAN adapter mode:
Internal segments present:
USERS gateway:
SERVERS gateway:
DMZ gateway:
SOC gateway:
Backup file name:
Instructor approval:
```

Before rules are changed, export the configuration. If a rule locks out access, restore from the backup or use the pfSense console.

### Exact Rule-Building Guidance

For every rule, record:

```text
Interface:
Action:
Protocol:
Source:
Destination:
Destination port:
Description:
Log enabled:
Business reason:
```

Rule descriptions must be specific. Bad description: `allow`. Better description: `Allow Kali admin SSH to Ubuntu server`.

### Validation Worksheet

| Test ID | Source | Destination | Port | Expected result | Actual result | pfSense log seen? |
|---|---|---|---:|---|---|---|
| T1 | Admin host | Ubuntu server | 22 | Allow | | |
| T2 | User network | DMZ web | 80 | Allow | | |
| T3 | DMZ web | Server network | Any | Block | | |
| T4 | User host | Windows server RDP | 3389 | Block unless approved | | |
| T5 | Server agent | Wazuh server | 1514/1515 | Allow if Wazuh lab active | | |

Use the correct source machine for each test. Testing from the wrong segment does not validate the intended firewall rule.

### Log Interpretation Guide

When reviewing **Status > System Logs > Firewall**, students must identify:

- Time.
- Interface.
- Action: pass or block.
- Source IP and source port.
- Destination IP and destination port.
- Protocol.
- Rule description.

If there is no log entry, consider:

- The rule is not set to log.
- Traffic did not reach pfSense.
- The source used the wrong gateway.
- A host firewall blocked before traffic reached the network.
- The test used the wrong protocol or port.

### Common pfSense Mistakes

| Mistake | Why it causes problems |
|---|---|
| Rule on wrong interface | pfSense evaluates traffic where it enters |
| Broad allow above block | First matching rule wins |
| Using `any` everywhere | Policy becomes hard to audit |
| Forgetting DNS | Systems may be reachable by IP but not name |
| No description | Future troubleshooting becomes slow |
| No backup | Bad rules become hard to recover from |

### Report Template

```text
Title: pfSense Firewall and Segmentation Report

1. Business Goal

2. Network Segments
USERS:
SERVERS:
DMZ:
SOC:

3. Rule Matrix

4. Changes Made
Interfaces:
DHCP:
Aliases:
Rules:

5. Validation Results
Allowed traffic:
Blocked traffic:
Firewall logs:

6. Troubleshooting Notes

7. Remaining Risk

8. Management Summary
```

