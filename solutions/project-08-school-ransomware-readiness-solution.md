# Project 08 Solution - School Ransomware Readiness

## Target Outcome

The student designs and validates a ransomware readiness plan for BrightPath College using segmentation, identity controls, file permissions, backup testing, endpoint monitoring, and incident response documentation.

## Reference Environment

| Component | Example |
|---|---|
| Firewall | pfSense |
| Identity | Windows Server Active Directory |
| Linux server | Ubuntu Server |
| Monitoring | Wazuh |
| Analyst VM | Kali Linux |
| Evidence folder | `~/femtech-projects/project-08-ransomware-readiness/evidence` |

Use lab data only. Do not create destructive ransomware simulations.

## Step 1 - Define the Business Problem

Create the project folder:

```bash
mkdir -p ~/femtech-projects/project-08-ransomware-readiness/evidence/{01-scope,02-architecture,03-identity,04-network,05-backup,06-monitoring,07-response,08-report}
cd ~/femtech-projects/project-08-ransomware-readiness
```

Document the scenario:

```text
BrightPath College needs to reduce ransomware impact against student records, teaching files, finance systems, and administrative workstations. The school has limited budget, mixed Windows and Linux systems, and needs controls that junior administrators can operate.
```

Define crown jewels:

| Asset | Why it matters | Primary risk |
|---|---|---|
| Student records | Contains personal information | Data theft and privacy breach |
| Finance files | Payroll and fee records | Fraud and business interruption |
| Shared teaching materials | Daily academic operations | Encryption and deletion |
| Domain controller | Central identity | Full environment compromise |
| Backup repository | Recovery capability | Ransomware destroys backups |

## Step 2 - Build the Target Architecture

Recommended network zones:

| Zone | Example subnet | Purpose |
|---|---|---|
| Staff | `10.10.10.0/24` | Staff workstations |
| Students | `10.10.20.0/24` | Student devices |
| Servers | `10.10.30.0/24` | AD, file, and application servers |
| SOC | `10.10.40.0/24` | Wazuh and analyst systems |
| Guest | `10.10.50.0/24` | Untrusted internet-only access |

Students should draw the architecture and label:

- pfSense interfaces.
- Domain controller.
- File server.
- Wazuh server.
- Backup location.
- Allowed management paths.
- Blocked student-to-server paths.

## Step 3 - Configure pfSense Segmentation

In pfSense:

1. Create or identify interfaces for `STAFF`, `STUDENTS`, `SERVERS`, `SOC`, and `GUEST`.
2. Configure static interface IPs.
3. Enable DHCP only on zones that need it.
4. Use clear descriptions on all rules.

Recommended rule matrix:

| Source | Destination | Allowed service | Reason |
|---|---|---|---|
| Staff | Domain Controller | DNS, Kerberos, LDAP, SMB as needed | Staff authentication and file access |
| Staff | File Server | SMB | Department shares |
| Students | Internet | HTTP/HTTPS/DNS | Learning access |
| Students | Servers | Deny by default | Protect internal systems |
| SOC | All internal zones | Wazuh agent traffic, admin-approved management | Monitoring and response |
| Guest | Internet only | HTTP/HTTPS/DNS | Isolation |

Validation from Kali:

```bash
mkdir -p evidence/04-network
nmap -Pn -n -p 53,88,389,445 SERVER_IP -oA evidence/04-network/staff-to-server-test
nmap -Pn -n -p 445 SERVER_IP -oA evidence/04-network/student-to-server-deny-test
```

Expected result: authorized staff paths work, student-to-server SMB is blocked, and guest has no internal access.

## Step 4 - Configure Identity and Least Privilege

In Active Directory, create groups:

| Group | Purpose |
|---|---|
| `GG_Teachers` | Teaching staff |
| `GG_Students` | Student users |
| `GG_Finance` | Finance users |
| `GG_IT_Admins` | Administrators |
| `GG_Backup_Operators` | Backup operators |
| `DL_Teaching_Read` | Read access to teaching materials |
| `DL_Teaching_Modify` | Modify access to teaching materials |
| `DL_Finance_Modify` | Modify finance files |

Use the model: users into global groups, global groups into resource groups, resource groups on folders.

Evidence:

```powershell
Get-ADGroup -Filter * | Select-Object Name,GroupScope |
  Out-File C:\Project08-AD-Groups.txt
Get-ADUser -Filter * -Properties MemberOf |
  Select-Object Name,SamAccountName,Enabled |
  Out-File C:\Project08-AD-Users.txt
```

## Step 5 - Harden File Permissions

Example Windows share:

```powershell
New-Item -ItemType Directory -Force -Path C:\SchoolShares\Teaching
New-Item -ItemType Directory -Force -Path C:\SchoolShares\Finance
New-SmbShare -Name Teaching -Path C:\SchoolShares\Teaching
New-SmbShare -Name Finance -Path C:\SchoolShares\Finance
```

Set permissions so students cannot modify staff or finance files. Avoid `Everyone:Full Control` as a final state.

Validation:

| Test | Expected result |
|---|---|
| Teacher reads teaching file | Allowed |
| Teacher modifies teaching file | Allowed only if in modify group |
| Student writes to teaching share | Denied |
| Student opens finance share | Denied |
| Finance user modifies finance file | Allowed |

## Step 6 - Create and Test Backups

On Ubuntu, install a zero-budget backup tool:

```bash
sudo apt update
sudo apt install -y restic
sudo install -d -m 0700 /srv/backup-repo
sudo install -d -m 0750 /srv/school-data
echo "Synthetic student record" | sudo tee /srv/school-data/student-record.txt
```

Initialize a local backup repository:

```bash
export RESTIC_REPOSITORY=/srv/backup-repo
export RESTIC_PASSWORD='ChangeMe-StudentLab!2026'
sudo -E restic init
sudo -E restic backup /srv/school-data --tag project08-baseline | tee evidence/05-backup/restic-backup.txt
sudo -E restic snapshots | tee evidence/05-backup/restic-snapshots.txt
```

Test restore:

```bash
sudo rm -rf /srv/restore-test
sudo mkdir -p /srv/restore-test
sudo -E restic restore latest --target /srv/restore-test | tee evidence/05-backup/restic-restore.txt
diff -r /srv/school-data /srv/restore-test/srv/school-data | tee evidence/05-backup/restore-diff.txt
```

Expected result: restore completes and `diff` shows no unexpected differences.

Security note: real backup repositories should be isolated, access-controlled, monitored, and protected from ordinary domain administrator compromise where possible.

## Step 7 - Monitor with Wazuh

Confirm agents:

```bash
sudo /var/ossec/bin/agent_control -lc | tee evidence/06-monitoring/wazuh-agents.txt
```

Generate safe events:

- Failed Windows sign-in.
- Linux SSH failed login.
- Change to a monitored test file.
- Wazuh agent disconnect/reconnect test only if approved.

Search for:

```text
data.win.system.eventID: 4625
rule.groups: syscheck
sshd
agent.status: disconnected
```

Detection priorities:

| Alert type | Why it matters in ransomware readiness |
|---|---|
| Failed logins | May indicate password spraying or stolen credentials |
| Privileged group change | Attackers often seek admin rights |
| File integrity change | Can show suspicious modification behavior |
| Agent disconnected | May indicate tampering or monitoring failure |

## Step 8 - Write Incident Response Playbook

Minimum ransomware playbook:

1. Identify affected host and user.
2. Isolate endpoint from network.
3. Preserve volatile and log evidence.
4. Disable suspected compromised accounts.
5. Check lateral movement paths.
6. Confirm backup integrity before restoration.
7. Rebuild or clean affected systems.
8. Restore from known-good backup.
9. Monitor for re-compromise.
10. Document lessons learned.

Include communication roles:

| Role | Responsibility |
|---|---|
| Principal or executive sponsor | Business decision making |
| IT lead | Technical containment and recovery |
| SOC analyst | Alert review and timeline |
| Legal/compliance | Regulatory and privacy review |
| Communications | Staff and parent/student messaging |

## Step 9 - Final Deliverables

The student submits:

- Network segmentation diagram.
- pfSense rule table and screenshots.
- AD user and group design.
- File permission tests.
- Backup and restore proof.
- Wazuh alert evidence.
- Ransomware response playbook.
- Executive summary.

## Pass Standard

The project is complete when the student proves that critical school assets are identified, risky network paths are blocked, access follows least privilege, backup restoration works, monitoring sees important activity, and the incident playbook is usable during pressure.
