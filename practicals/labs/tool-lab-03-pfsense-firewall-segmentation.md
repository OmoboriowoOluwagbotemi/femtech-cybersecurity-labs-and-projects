# Tool Lab 03 - pfSense Firewall and Segmentation

## Purpose

This lab teaches students how to use pfSense as a firewall in a small enterprise lab. The goal is to understand interfaces, IP addresses, DHCP, aliases, firewall rules, allowed traffic, blocked traffic, logs, backups, and basic troubleshooting.

The lab is written for beginners. Students should complete it slowly and save evidence after each major step.

## Tools Used

| Tool | Purpose |
|---|---|
| pfSense Community Edition | Firewall, router, DHCP service, NAT gateway, and segmentation control |
| Kali Linux or another approved client | Used only to test whether traffic is allowed or blocked |
| Ubuntu Server or another approved internal server | Used as a simple internal destination for testing |

## Scenario

FEMTECH has one flat network where users, servers, and security tools can reach each other too easily. This is risky because one compromised workstation could move toward servers.

You are asked to configure pfSense so the network is separated into zones. Approved traffic should work. Unapproved traffic should be blocked. pfSense logs must prove the result.

## What Students Should Know Before Starting

Students should already be able to:

- Open the pfSense web interface.
- Log in with instructor-approved credentials.
- Identify basic IP addresses.
- Use a browser.
- Save screenshots or exported files as evidence.
- Run simple terminal tests such as `ping`, `nc`, or `curl` from an approved lab machine.

## Beginner Terms

| Term | Simple meaning | Example in this lab |
|---|---|---|
| Firewall | A security device that allows or blocks traffic | pfSense |
| Interface | A network port or virtual adapter | USERS, SERVERS, DMZ |
| Zone | A network area with a purpose | User zone, server zone |
| IP address | Number used to identify a device on a network | `10.10.10.1` |
| Subnet | A group of IP addresses | `10.10.10.0/24` |
| Gateway | Device used to leave a subnet | pfSense interface IP |
| DHCP | Automatically gives IP addresses to clients | USERS DHCP range |
| DNS | Converts names to IP addresses | `dc01.femtech.lab` to an IP |
| NAT | Translates IP addresses between networks | Internal lab to WAN for updates |
| Alias | A friendly reusable name for IPs or ports | `ADMIN_HOSTS` |
| Rule | A firewall decision | Allow SSH from admin host |
| Source | Where traffic starts | Kali admin workstation |
| Destination | Where traffic goes | Ubuntu server |
| Port | Number identifying a service | 22 for SSH, 80 for HTTP |
| Log | Record of firewall activity | pfSense firewall log |

## Important Firewall Idea

Firewall rules should answer five questions:

```text
Who is sending the traffic?
Where is it going?
What service or port is being used?
Should it be allowed or blocked?
Why is this rule needed?
```

Example:

```text
Allow the approved admin workstation to reach the Ubuntu server on TCP port 22 because administrators need SSH access.
```

That is better than:

```text
Allow any to any.
```

## Lab Network

Use the instructor's approved lab addresses. If your classroom uses different addresses, replace the examples carefully.

| Zone | Example subnet | pfSense gateway | Example systems |
|---|---|---|---|
| USERS | `10.10.10.0/24` | `10.10.10.1` | Kali or Windows client |
| SERVERS | `10.10.20.0/24` | `10.10.20.1` | Ubuntu Server, Windows Server |
| DMZ | `10.10.30.0/24` | `10.10.30.1` | Web server |
| SOC | `10.10.40.0/24` | `10.10.40.1` | Wazuh or monitoring tools |

## Lab Goal

By the end of this lab:

1. pfSense interfaces are named clearly.
2. DHCP is configured where needed.
3. Aliases are created for important hosts and ports.
4. Firewall rules allow required traffic.
5. Firewall rules block unnecessary traffic.
6. Logs prove allowed and blocked traffic.
7. A before and after configuration backup exists.
8. The student can explain what each rule does.

## Safety Rules

- Work only in the approved lab network.
- Do not connect intentionally vulnerable systems directly to the public Internet.
- Do not create broad `any to any` allow rules as a final answer.
- Do not change WAN or LAN settings if you do not understand the effect.
- Always export a backup before major changes.
- If you lose access, stop and ask the instructor.

## Step 1 - Create the Lab Record

Create a written record before changing pfSense:

```text
Student name:
Date:
pfSense VM name:
pfSense web URL:
Admin username:
USERS subnet:
SERVERS subnet:
DMZ subnet:
SOC subnet:
Change purpose:
Instructor approval:
```

Save this as `pfsense-lab-record.md`.

## Step 2 - Back Up pfSense Before Changes

In pfSense:

1. Go to **Diagnostics**.
2. Click **Backup & Restore**.
3. Leave the backup area as **ALL** unless the instructor says otherwise.
4. Click **Download configuration as XML**.
5. Save the file as `pfsense-before-tool-lab.xml`.

Why this matters:

- A backup gives you a recovery point.
- Firewall mistakes can lock administrators out.
- A professional change should have rollback evidence.

Evidence to save:

- Screenshot of the backup page.
- The downloaded XML backup file.

## Step 3 - Identify the Interfaces

In pfSense:

1. Go to **Interfaces**.
2. Click **Assignments**.
3. Look at the list of interfaces.

Record:

| Interface name | Example IP | What it should represent |
|---|---|---|
| WAN | DHCP or NAT address | Outside/update path |
| LAN or USERS | `10.10.10.1/24` | User network |
| OPT1 or SERVERS | `10.10.20.1/24` | Server network |
| OPT2 or DMZ | `10.10.30.1/24` | Web/DMZ network |
| OPT3 or SOC | `10.10.40.1/24` | Monitoring network |

If the interface names are unclear, rename them:

1. Click the interface.
2. Enable it if needed.
3. Set a clear description such as `USERS`, `SERVERS`, `DMZ`, or `SOC`.
4. Save.
5. Apply changes.

Evidence to save:

- Screenshot of interface assignments.
- Screenshot of each configured interface IP.

## Step 4 - Understand Rule Direction

This is the most important beginner pfSense rule:

```text
pfSense interface rules usually apply when traffic enters that interface.
```

Example:

- Traffic from Kali in USERS to Ubuntu in SERVERS enters pfSense through the USERS interface.
- The rule should be placed on the USERS interface.

Simple memory aid:

```text
Put the rule where the traffic starts.
```

## Step 5 - Configure DHCP on the USERS Network

DHCP gives IP addresses automatically to client machines.

In pfSense:

1. Go to **Services**.
2. Click **DHCP Server**.
3. Select the **USERS** interface.
4. Tick **Enable DHCP server on USERS interface**.
5. Set range:

```text
From: 10.10.10.50
To:   10.10.10.100
```

6. Save.
7. Apply changes.

Do not enable DHCP on server networks unless your instructor wants that. Servers normally use static IP addresses or reservations.

Evidence to save:

- Screenshot of the DHCP range.
- Screenshot of a client that received an address, if available.

## Step 6 - Create Aliases

Aliases make rules easier to read. Instead of writing raw IP addresses everywhere, you create names.

In pfSense:

1. Go to **Firewall**.
2. Click **Aliases**.
3. Click **Add**.

Create these aliases if they match your lab:

| Alias name | Type | Value | Meaning |
|---|---|---|---|
| `ADMIN_HOSTS` | Host(s) | `10.10.10.60` | Approved admin workstation |
| `UBUNTU_SERVER` | Host(s) | `10.10.20.20` | Internal Ubuntu server |
| `WINDOWS_SERVER` | Host(s) | `10.10.20.10` | Internal Windows server |
| `DMZ_WEB` | Host(s) | `10.10.30.20` | Web server in DMZ |
| `WAZUH_SERVER` | Host(s) | `10.10.40.10` | Wazuh server |
| `WEB_PORTS` | Port(s) | `80`, `443` | HTTP and HTTPS |

For every alias:

1. Add a clear description.
2. Save.
3. Apply changes.

Evidence to save:

- Screenshot or export showing aliases.

## Step 7 - Build the Rule Plan Before Clicking

Do not create rules from memory. Fill this table first:

| Rule | Interface | Source | Destination | Port | Action | Reason |
|---|---|---|---|---:|---|---|
| 1 | USERS | `ADMIN_HOSTS` | `UBUNTU_SERVER` | 22 | Allow | Admin SSH |
| 2 | USERS | USERS net | `DMZ_WEB` | 80,443 | Allow | Web access |
| 3 | USERS | USERS net | SERVERS net | Any | Block/log | Stop unnecessary server access |
| 4 | DMZ | DMZ net | SERVERS net | Any | Block/log | Stop lateral movement |
| 5 | SERVERS | Server agents | `WAZUH_SERVER` | Approved Wazuh ports | Allow | Monitoring traffic |

If Wazuh is not installed yet, write the Wazuh rule as planned but do not create it unless the instructor approves.

## Step 8 - Create the First Allow Rule

Goal: allow the admin workstation to SSH to the Ubuntu server.

In pfSense:

1. Go to **Firewall**.
2. Click **Rules**.
3. Select the **USERS** tab.
4. Click **Add**.
5. Set **Action** to `Pass`.
6. Set **Interface** to `USERS`.
7. Set **Protocol** to `TCP`.
8. Set **Source** to `ADMIN_HOSTS`.
9. Set **Destination** to `UBUNTU_SERVER`.
10. Set **Destination port range** to `SSH` or `22`.
11. Add description:

```text
Allow admin SSH from ADMIN_HOSTS to UBUNTU_SERVER
```

12. Save.
13. Apply changes.

Evidence to save:

- Screenshot of the rule.

## Step 9 - Create the Web Access Rule

Goal: allow users to access the DMZ web server.

On the **USERS** rules tab:

1. Click **Add**.
2. Action: `Pass`.
3. Protocol: `TCP`.
4. Source: `USERS net`.
5. Destination: `DMZ_WEB`.
6. Destination port: `WEB_PORTS`.
7. Description:

```text
Allow USERS web access to DMZ_WEB
```

8. Save.
9. Apply changes.

Evidence to save:

- Screenshot of the rule.

## Step 10 - Create a Block Rule for Unapproved Server Access

Goal: block normal user systems from accessing the server network unless a previous allow rule permits it.

On the **USERS** rules tab:

1. Click **Add**.
2. Action: `Block`.
3. Tick **Log packets that are handled by this rule**.
4. Protocol: `Any`.
5. Source: `USERS net`.
6. Destination: `SERVERS net`.
7. Description:

```text
Block unapproved USERS access to SERVERS
```

8. Save.
9. Apply changes.

Important:

- This block rule must be below the specific SSH allow rule.
- If the block rule is above the allow rule, SSH may fail.

## Step 11 - Create a DMZ Isolation Rule

Goal: stop the DMZ from freely reaching the server network.

On the **DMZ** rules tab:

1. Click **Add**.
2. Action: `Block`.
3. Tick **Log packets that are handled by this rule**.
4. Protocol: `Any`.
5. Source: `DMZ net`.
6. Destination: `SERVERS net`.
7. Description:

```text
Block DMZ to SERVERS lateral movement
```

8. Save.
9. Apply changes.

Evidence to save:

- Screenshot of the DMZ block rule.

## Step 12 - Check Rule Order

On the USERS rules page, the order should look like:

```text
Allow admin SSH from ADMIN_HOSTS to UBUNTU_SERVER
Allow USERS web access to DMZ_WEB
Block unapproved USERS access to SERVERS
```

Rule order matters because pfSense uses the first matching rule.

If your rules are in the wrong order:

1. Drag the rule to the correct position.
2. Save.
3. Apply changes.

Evidence to save:

- Screenshot of final USERS rule order.

## Step 13 - Validate Allowed Traffic

From the approved client machine, test only instructor-approved systems.

Example SSH test:

```bash
nc -vz -w 3 10.10.20.20 22
```

Expected result:

```text
succeeded
```

Example web test:

```bash
curl -I http://10.10.30.20/
```

Expected result:

```text
HTTP response header appears
```

If your class does not have an Ubuntu server or DMZ web server ready, the instructor may provide screenshots or substitute a safe test host.

Evidence to save:

- Command output.
- Source IP.
- Destination IP.
- Time of test.

## Step 14 - Validate Blocked Traffic

Test a blocked path.

Example:

```bash
nc -vz -w 3 10.10.20.20 3389
```

Expected result:

```text
timed out, failed, or blocked
```

The exact message depends on firewall behavior and the client tool.

Evidence to save:

- Command output.
- Time of test.

## Step 15 - Read Firewall Logs

In pfSense:

1. Go to **Status**.
2. Click **System Logs**.
3. Click **Firewall**.
4. Filter by source IP or destination IP.
5. Find the rule that matched your test.

Record:

```text
Time:
Interface:
Action:
Source IP:
Destination IP:
Protocol:
Destination port:
Rule description:
```

Important:

- A block log proves pfSense saw and blocked traffic.
- No log does not always mean no traffic. The rule may not have logging enabled.
- Logs must match the test time and IP addresses.

## Step 16 - Export the Final Configuration

In pfSense:

1. Go to **Diagnostics**.
2. Click **Backup & Restore**.
3. Download the final configuration.
4. Save it as `pfsense-after-tool-lab.xml`.

If your workstation has hashing tools available, hash the files:

```bash
sha256sum pfsense-before-tool-lab.xml pfsense-after-tool-lab.xml
```

If hashing is not available, record filenames, dates, and file sizes.

## Step 17 - Complete the Validation Worksheet

| Test ID | Source | Destination | Port | Expected | Actual | Log found? |
|---|---|---|---:|---|---|---|
| T1 | Admin host | Ubuntu server | 22 | Allow | | |
| T2 | User network | DMZ web | 80 | Allow | | |
| T3 | User network | Server network | 3389 | Block | | |
| T4 | DMZ | Server network | Any | Block | | |

Only mark a test as complete when evidence exists.

## Step 18 - Troubleshoot Slowly

Use this order. Do not jump around.

| Layer | Question | Where to check |
|---|---|---|
| 1. Cable/adapter | Is the VM connected to the correct virtual network? | VirtualBox settings |
| 2. IP address | Does the machine have the expected IP? | Client network settings |
| 3. Gateway | Is pfSense the gateway? | Client route settings |
| 4. Interface | Did traffic enter the expected pfSense interface? | pfSense logs |
| 5. Rule order | Is the allow rule above the block rule? | Firewall rules page |
| 6. Rule details | Are source, destination, protocol, and port correct? | Rule edit page |
| 7. Service | Is the destination service running? | Server check |
| 8. Host firewall | Is the destination host blocking it? | Server firewall |
| 9. Logs | Does pfSense show pass or block? | Firewall logs |

Common beginner mistakes:

| Mistake | Fix |
|---|---|
| Rule placed on SERVERS instead of USERS | Put the rule where traffic starts |
| Block rule above allow rule | Move specific allow rules above broad blocks |
| Alias typed incorrectly | Open alias and confirm IP address |
| Wrong port | Confirm service port, such as 22 for SSH or 80 for HTTP |
| Forgot to apply changes | Click **Apply Changes** |
| No log found | Enable logging on the block rule |

## Step 19 - Write the Report

Use this template:

```text
Title: pfSense Firewall and Segmentation Lab Report

1. Business Goal
What risk did segmentation reduce?

2. Network Zones
USERS:
SERVERS:
DMZ:
SOC:

3. Rules Created
Rule 1:
Rule 2:
Rule 3:

4. Validation
Allowed test:
Blocked test:
Firewall log evidence:

5. Troubleshooting
Problem:
Cause:
Fix:

6. Remaining Risk

7. Management Summary
```

## Student Questions

Answer in your own words:

1. What is pfSense?
2. What is a firewall rule?
3. What is a network interface?
4. What is a subnet?
5. What is a gateway?
6. What does DHCP do?
7. What is an alias?
8. Why is `any to any` dangerous?
9. Why does rule order matter?
10. Where should a rule be placed when traffic starts from USERS?
11. Why should block rules be logged?
12. What does a firewall log prove?
13. What does a firewall log not prove by itself?
14. Why is a backup needed before changing pfSense?
15. Why is segmentation useful in an enterprise?

## Deliverables

Submit:

- Lab record.
- Before configuration backup.
- Interface screenshots.
- DHCP screenshot if configured.
- Alias list.
- Rule plan.
- Final USERS rule order screenshot.
- DMZ block rule screenshot.
- Allowed traffic test evidence.
- Blocked traffic test evidence.
- Firewall log evidence.
- Final configuration backup.
- Validation worksheet.
- Short report.
- Student question answers.

## Pass Condition

The student passes when they can explain the purpose of pfSense, identify interfaces and zones, create clear aliases, build simple allow and block rules, place rules in the correct order, prove allowed and blocked traffic with logs, export backups, and explain the business value of segmentation.

## Entry-Level Job Readiness Check

The student is ready to continue when they can:

| Skill | Student can demonstrate |
|---|---|
| Network zoning | Explain USERS, SERVERS, DMZ, SOC, gateway, subnet, and traffic direction |
| Firewall rule design | Build a rule plan before clicking and avoid broad `any to any` access |
| Rule order | Explain why the first matching rule matters |
| Positive testing | Prove approved traffic is allowed |
| Negative testing | Prove unapproved traffic is blocked |
| Log interpretation | Use firewall logs to explain source, destination, port, action, and rule |
| Change control | Export backups before and after changes and document rollback thinking |
| Business communication | Explain how segmentation reduces lateral movement and protects critical services |
