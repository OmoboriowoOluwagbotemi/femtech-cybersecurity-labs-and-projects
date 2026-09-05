# Project 09 Solution - Fintech SOC and Segmentation

## Target Outcome

The student builds a defensible security design for MeridianPay, a fintech startup that needs network segmentation, secure administration, vulnerability visibility, and SOC monitoring for payment-related systems.

## Reference Environment

| Component | Example |
|---|---|
| Firewall | pfSense |
| Monitoring | Wazuh |
| Vulnerability tools | Nmap and OpenVAS |
| Identity | Windows Server Active Directory |
| Linux systems | Ubuntu Server |
| Evidence folder | `~/femtech-projects/project-09-fintech-soc/evidence` |

This is a portfolio project. The final report must explain both technical controls and business risk.

## Step 1 - Define Scope and Regulatory Sensitivity

```bash
mkdir -p ~/femtech-projects/project-09-fintech-soc/evidence/{01-scope,02-network,03-identity,04-monitoring,05-vulnerability,06-incident,07-report}
cd ~/femtech-projects/project-09-fintech-soc
```

Scope statement:

```text
MeridianPay processes payment-related data in a lab environment. The project designs controls inspired by financial-sector expectations: least privilege, segmentation, monitoring, vulnerability management, and audit-ready evidence. No real cardholder data is used.
```

Core risks:

| Risk | Business impact |
|---|---|
| Flat network | Compromise of one workstation can reach payment systems |
| Weak admin access | Attackers can control critical systems |
| Poor logging | Incidents cannot be investigated |
| Unpatched services | Known vulnerabilities remain exploitable |
| Missing response process | Containment is delayed |

## Step 2 - Design Segments

Recommended zones:

| Zone | Example subnet | Systems |
|---|---|---|
| Users | `10.20.10.0/24` | Employee workstations |
| Payment | `10.20.20.0/24` | Payment application and database lab servers |
| Admin | `10.20.30.0/24` | Admin workstation or jump box |
| DMZ | `10.20.40.0/24` | Public-facing test web server |
| SOC | `10.20.50.0/24` | Wazuh and analyst systems |

The payment zone should be the most protected internal zone.

## Step 3 - Configure pfSense Rules

Firewall rule baseline:

| Source | Destination | Port/service | Action | Reason |
|---|---|---|---|---|
| Users | Internet | HTTP/HTTPS/DNS | Allow | Business access |
| Users | Payment | Any | Deny | Prevent direct access |
| Admin | Payment | RDP/SSH as approved | Allow | Controlled administration |
| SOC | All zones | Agent/log collection paths | Allow | Monitoring |
| DMZ | Payment | Required app port only | Allow only if needed | Application dependency |
| Guest/Unknown | Internal zones | Any | Deny | Isolation |

Use explicit descriptions in pfSense, such as `ALLOW_ADMIN_TO_PAYMENT_SSH` and `DENY_USERS_TO_PAYMENT`.

Validation from Kali:

```bash
nmap -Pn -n -p 22,3389 PAYMENT_SERVER_IP -oA evidence/02-network/users-to-payment-test
nmap -Pn -n -p 22,3389 PAYMENT_SERVER_IP -oA evidence/02-network/admin-to-payment-test
```

Expected result: user zone tests are blocked; admin zone tests match approved access.

## Step 4 - Apply Identity Controls

Use Active Directory Users and Computers, not command-line AD creation, for this section.

Create these groups manually in ADUC:

| Group | Purpose |
|---|---|
| `GG_Finance_Users` | Finance staff |
| `GG_Payment_App_Admins` | Limited payment application administrators |
| `GG_SOC_Analysts` | Monitoring team |
| `GG_Domain_Admins_Controlled` | Restricted admin membership |
| `DL_Payment_Read` | Payment read access |
| `DL_Payment_Modify` | Payment modify access |

Evidence:

- Screenshot of the OU containing fintech groups.
- Screenshot of `GG_Payment_App_Admins` membership.
- Screenshot of `GG_SOC_Analysts` membership.
- Screenshot showing payment resource groups are separate from job-role groups.

Required explanation: financial environments need separation of duties. A helpdesk user should not automatically have payment server administrator access.

## Step 5 - Enroll Systems into Wazuh

On the Wazuh manager:

```bash
sudo /var/ossec/bin/wazuh-control status | tee evidence/04-monitoring/wazuh-status.txt
sudo /var/ossec/bin/agent_control -lc | tee evidence/04-monitoring/wazuh-agents.txt
```

At minimum, monitor:

- Domain controller.
- Payment server.
- Linux application server.
- Admin workstation.

Important alert categories:

| Category | Why it matters |
|---|---|
| Failed login | Credential attack detection |
| Privileged group change | Admin abuse or compromise |
| File integrity change | Unauthorized modification |
| Agent disconnected | Monitoring failure |
| Suspicious process/service | Possible persistence |

## Step 6 - Generate SOC Test Cases

Create controlled benign events:

Windows:

Use Event Viewer on the Windows system or domain controller:

1. Open `Event Viewer`.
2. Browse to `Windows Logs > Security`.
3. Use `Filter Current Log`.
4. Review event IDs `4624`, `4625`, `4728`, and `4732`.
5. Save screenshots or export selected events through Event Viewer.

Linux:

```bash
sudo grep -Ei 'failed|accepted|sudo|sshd' /var/log/auth.log | tail -n 50 |
  tee evidence/04-monitoring/linux-auth-events.txt
```

Wazuh searches:

```text
data.win.system.eventID: 4625
data.win.system.eventID: 4728
rule.groups: authentication_failed
rule.groups: syscheck
```

SOC triage table:

| Alert | Affected system | Severity | Evidence | Decision |
|---|---|---:|---|---|
| Failed admin login | Admin workstation | Medium | Event ID 4625 | Investigate if repeated |
| Payment server file change | Payment server | High | FIM alert | Escalate |
| Agent disconnected | Payment server | High | Agent status | Immediate review |

## Step 7 - Vulnerability Assessment

Run Nmap against approved payment and DMZ systems:

```bash
sudo nmap -Pn -n -sT --top-ports 100 --reason --version-light -oA evidence/05-vulnerability/meridianpay-baseline PAYMENT_SERVER_IP
```

Run OpenVAS against the approved target. Export PDF and CSV reports.

Validate one finding safely:

```bash
sudo nmap -Pn -n -sV -p DISCOVERED_PORTS -oA evidence/05-vulnerability/validated-services PAYMENT_SERVER_IP
curl -I http://DMZ_SERVER_IP/ | tee evidence/05-vulnerability/dmz-http-headers.txt
```

Risk ranking must consider:

- CVSS.
- Payment zone criticality.
- Exposure from other zones.
- Exploit availability.
- Compensating firewall rules.

## Step 8 - Build Incident Response Runbook

Minimum runbook for suspected payment server compromise:

1. Confirm alert source and affected asset.
2. Preserve Wazuh alerts and local logs.
3. Isolate the server or restrict pfSense rules.
4. Disable suspected compromised credentials.
5. Check for lateral movement.
6. Review recent firewall, Windows, and Linux logs.
7. Patch or rebuild depending on severity.
8. Validate restoration and monitoring.
9. Write an incident report.
10. Hold lessons learned.

Containment decision table:

| Situation | Action |
|---|---|
| Single failed login from known admin | Monitor |
| Repeated failed logins from user zone | Block source and investigate |
| Privileged group change without ticket | Escalate and verify authorization |
| Payment server Wazuh agent offline | Treat as high priority |

## Step 9 - Final Portfolio Deliverable

The final submission should include:

- Architecture diagram.
- Firewall rule table.
- Identity group design.
- Wazuh monitoring proof.
- Vulnerability scan summary.
- One validated vulnerability.
- SOC triage notes.
- Incident runbook.
- Executive summary for fintech management.

## Pass Standard

The project is complete when the student demonstrates segmentation, least privilege, vulnerability visibility, monitoring, and incident response as one connected security program for a financial technology environment.
