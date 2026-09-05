# Project 10 Solution - Northstar Manufacturing Capstone

## Target Outcome

The student completes an integrated defensive security project for Northstar Manufacturing. The work combines Linux, Windows Server, Active Directory, pfSense, Nmap, OpenVAS, Wazuh, incident response, vulnerability management, and executive reporting.

## Reference Environment

| Component | Example |
|---|---|
| Firewall | pfSense |
| Analyst VM | Kali Linux |
| Linux servers | Ubuntu Server |
| Windows environment | Windows Server and Windows client |
| Monitoring | Wazuh |
| Vulnerability tools | Nmap and OpenVAS |
| Evidence folder | `~/femtech-projects/project-10-capstone/evidence` |

This project should be treated like a small consulting engagement.

## Step 1 - Create Engagement Structure

```bash
mkdir -p ~/femtech-projects/project-10-capstone/evidence/{01-scope,02-architecture,03-linux,04-windows-ad,05-firewall,06-vulnerability,07-monitoring,08-incident,09-report}
cd ~/femtech-projects/project-10-capstone
```

Create a scope file:

```text
Client: Northstar Manufacturing
Goal: improve defensive security for a small hybrid manufacturing network
Approved assets: lab firewall, domain controller, Windows client, Ubuntu server, Wazuh server, Kali analyst VM
Approved activity: configuration review, hardening, segmentation, vulnerability scanning, log review, incident response exercise
Forbidden activity: exploitation, denial of service, public scanning, real credential harvesting
```

## Step 2 - Understand Business Operations

Northstar has office users, engineering systems, production support systems, and administrative servers. Security controls must protect operations without blocking legitimate work.

Asset inventory:

| Asset | Function | Criticality | Main risk |
|---|---|---:|---|
| Domain controller | Identity | High | Full environment compromise |
| File server | Engineering and office files | High | Data theft or ransomware |
| Ubuntu server | Internal application | Medium | Service compromise |
| pfSense | Network control | High | Segmentation failure |
| Wazuh | Monitoring | High | Loss of visibility |
| Windows client | User workstation | Medium | Initial access |

## Step 3 - Design Segmentation

Recommended zones:

| Zone | Purpose | Example subnet |
|---|---|---|
| Office | Employee workstations | `10.30.10.0/24` |
| Engineering | Engineering workstations | `10.30.20.0/24` |
| Servers | AD, file, app servers | `10.30.30.0/24` |
| SOC | Wazuh and analyst tools | `10.30.40.0/24` |
| Guest | Internet-only access | `10.30.50.0/24` |

Firewall principles:

- Deny by default between zones.
- Allow only business-required traffic.
- Restrict administration to admin or SOC systems.
- Log denied traffic for review.
- Document every allow rule.

Validation:

```bash
nmap -Pn -n -p 22,53,88,389,445,3389 SERVER_IP -oA evidence/05-firewall/zone-validation
```

## Step 4 - Harden Ubuntu Server

Baseline evidence:

```bash
hostnamectl | tee evidence/03-linux/hostnamectl.txt
ip -br address | tee evidence/03-linux/ip-address.txt
sudo ss -lntp | tee evidence/03-linux/listening-services-before.txt
sudo systemctl --type=service --state=running | tee evidence/03-linux/running-services-before.txt
sudo ufw status verbose | tee evidence/03-linux/ufw-before.txt
```

Apply hardening:

```bash
sudo apt update
sudo apt upgrade
sudo cp /etc/ssh/sshd_config evidence/03-linux/sshd-config-before.txt
sudo sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sshd -t
sudo systemctl restart ssh
sudo ufw allow from ADMIN_SUBNET to any port 22 proto tcp
sudo ufw enable
sudo ufw status verbose | tee evidence/03-linux/ufw-after.txt
```

If password authentication is required in the classroom, document that exception and use a strong password plus limited source IP.

## Step 5 - Configure Windows and Active Directory

Use Windows graphical administration tools for Active Directory. Do not use command-line AD creation for this capstone.

Minimum AD work:

1. Domain controller installed and validated.
2. DNS working.
3. OUs for users, workstations, servers, and groups.
4. Groups for Office, Engineering, IT Admins, and SOC Analysts.
5. Shared folder permissions assigned through groups.
6. Disabled account test.
7. GPO applied to a workstation.

Evidence:

- Server Manager screenshot showing AD DS and DNS installed.
- DNS Manager screenshot showing the domain zone.
- ADUC screenshot showing the OU structure.
- ADUC screenshot showing Office, Engineering, IT Admin, and SOC Analyst groups.
- ADUC screenshot showing at least one user membership.
- File Explorer Security tab screenshot showing group-based share or NTFS permissions.
- Group Policy Management screenshot showing the linked GPO.
- Group Policy Results wizard screenshot proving policy application.
- Event Viewer screenshots for successful logon, failed logon, privileged group change, and account change events.

Required explanation: AD is not only a login system. It controls authorization, policy, administrative structure, and audit evidence.

## Step 6 - Vulnerability Discovery and Assessment

Run approved discovery:

```bash
sudo nmap -Pn -n -sT --top-ports 100 --reason --version-light -oA evidence/06-vulnerability/northstar-baseline TARGET_IP
```

Run focused validation:

```bash
sudo nmap -Pn -n -sV -p DISCOVERED_PORTS -oA evidence/06-vulnerability/northstar-services TARGET_IP
```

Run OpenVAS:

1. Create target for the approved server.
2. Run `Full and fast` or instructor-approved scan.
3. Export PDF and CSV.
4. Select top findings.
5. Validate safely.
6. Rank by business risk.

Prioritization table:

| Finding | CVSS | Asset | Exposure | Business risk | Priority |
|---|---:|---|---|---|---|
| Outdated remote service | High | Server | Internal but reachable | Lateral movement | P1 |
| Missing HTTP header | Medium | App server | Internal | Hardening weakness | P3 |
| Unneeded service | Medium | Server | Multiple zones | Attack surface | P2 |

## Step 7 - Configure Wazuh Monitoring

Confirm health:

```bash
sudo /var/ossec/bin/wazuh-control status | tee evidence/07-monitoring/wazuh-status.txt
sudo /var/ossec/bin/agent_control -lc | tee evidence/07-monitoring/wazuh-agents.txt
```

Monitor:

- Domain controller.
- Windows client.
- Ubuntu server.
- Firewall logs if configured.

Generate and investigate:

| Test | Expected detection value |
|---|---|
| Failed Windows logon | Credential attack visibility |
| Linux SSH failure | Remote access monitoring |
| Privileged group change | Identity abuse detection |
| File integrity change | Unauthorized change visibility |
| Agent disconnect | Telemetry failure detection |

SOC note format:

```text
Alert:
Time:
Asset:
User/source:
Evidence:
Decision:
Severity:
Next action:
```

## Step 8 - Incident Response Exercise

Scenario: Wazuh reports repeated failed logins against the Ubuntu server followed by a suspicious file change.

Investigation steps:

1. Confirm alert time and affected host.
2. Review Linux authentication logs.
3. Check current sessions and processes.
4. Review firewall logs for source IP.
5. Search Wazuh for related alerts.
6. Determine whether activity is authorized.
7. Contain by blocking source or disabling account if needed.
8. Preserve evidence.
9. Recommend eradication and recovery.
10. Write incident report.

Linux evidence commands:

```bash
sudo grep -Ei 'failed|accepted|invalid user|sshd' /var/log/auth.log | tail -n 80 |
  tee evidence/08-incident/linux-auth-review.txt
who
last -a | head -n 20
ps aux --sort=-%cpu | head -n 20
sudo ss -tupn
```

Containment options:

```bash
sudo ufw deny from SUSPICIOUS_IP
sudo passwd -l suspicioususer
```

Only perform containment if the source and account are part of the lab.

## Step 9 - Build Executive and Technical Reports

Executive summary must answer:

- What was protected?
- What risks were found?
- What controls were implemented?
- What improved after validation?
- What risks remain?
- What should management fund next?

Technical report must include:

- Architecture diagram.
- Asset inventory.
- Firewall rule table.
- AD design.
- Linux hardening evidence.
- Vulnerability scan results.
- Wazuh alert investigations.
- Incident response timeline.
- Remediation roadmap.
- Evidence appendix.

## Step 10 - 30/60/90 Day Roadmap

| Timeline | Recommended improvement |
|---|---|
| 30 days | Complete patching, enforce least privilege, document firewall rules |
| 60 days | Improve Wazuh detections, add backup restore tests, review admin accounts |
| 90 days | Formalize vulnerability management, tabletop incident response, improve segmentation |

## Step 11 - Evidence Closeout

Hash final evidence:

```bash
find evidence -type f ! -name hashes.sha256 -print0 | sort -z | xargs -0 sha256sum > evidence/hashes.sha256
sha256sum --check evidence/hashes.sha256
```

Evidence index:

| Folder | Content |
|---|---|
| `01-scope` | Authorization and scope |
| `02-architecture` | Diagrams and asset inventory |
| `03-linux` | Ubuntu hardening |
| `04-windows-ad` | AD and Windows proof |
| `05-firewall` | pfSense rules and validation |
| `06-vulnerability` | Nmap and OpenVAS |
| `07-monitoring` | Wazuh health and alerts |
| `08-incident` | Incident response evidence |
| `09-report` | Final reports |

## Pass Standard

The capstone is complete when the student can defend the environment end to end: what assets exist, how access is controlled, how the network is segmented, how vulnerabilities were found and prioritized, how alerts were investigated, how incidents would be contained, and how management should reduce remaining risk.
