# Project 02 - Make a School Ransomware-Ready

## Scenario

Unity Secondary School has 300 students, 45 employees, a shared file server, an ageing domain, and one IT technician. A neighbouring school lost teaching files to ransomware. Unity has backups but has never restored them. Teachers share folders broadly, student devices use the same network as servers, and remote administration uses exposed RDP.

Your team must reduce ransomware likelihood and blast radius and demonstrate recovery using synthetic school data.

**Duration:** 2 weeks
**Tools:** pfSense CE, Windows Server/11 Evaluation, Ubuntu, Wazuh, Defender, PowerShell, Suricata, Restic, Nmap
**Lessons:** 1-2, 14, 19-25, 33-37

## Required Outcomes

- Separate STUDENTS, STAFF, SERVERS, and SOC/ADMIN.
- Eliminate exposed RDP and define controlled remote administration.
- Apply role-based file access and privileged-account separation.
- Establish protected, versioned backups and prove restore.
- Detect precursor behaviour and telemetry loss.
- Run a tabletop and a technical recovery exercise.

## Phase 1 - Baseline and Crown Jewels

Inventory teaching files, finance/payroll, identity, DNS/DHCP, endpoints, backups, and remote access. Record dependencies and maximum tolerable outage. Identify at least three attack paths from student device to file server/domain admin.

```powershell
Get-SmbShare
Get-SmbShareAccess -Name <SHARE>
(Get-Acl 'C:\Shares\Teaching').Access
Get-ADGroupMember 'Domain Admins'
Get-NetTCPConnection -State Listen | Sort-Object LocalPort
Get-ScheduledTask | Where-Object State -ne 'Disabled'
```

## Phase 2 - Reduce Attack Surface

Implement segmentation and deny student-to-server management protocols. Restrict RDP/WinRM/SSH to ADMIN sources. Remove unnecessary local administrators and stale accounts. Harden Linux and Windows using course baselines.

Validation matrix includes student DNS/web success, student SMB/RDP denial, staff share access, admin management success, nonadmin denial, and logs for each.

## Phase 3 - Build Protected Backups

Use an Ubuntu backup repository reachable only during backup/restore windows. Install Restic on a Linux file-data simulation:

```bash
sudo apt update && sudo apt install -y restic
sudo install -d -o root -g root -m 0700 /srv/backup-repo
export RESTIC_REPOSITORY=/srv/backup-repo
read -s RESTIC_PASSWORD; export RESTIC_PASSWORD
restic init
restic backup /srv/school-data --tag nightly
restic snapshots
restic check
```

Do not put passwords in scripts or reports. Restore to a different path:

```bash
sudo install -d -m 0700 /srv/restore-test
restic restore latest --target /srv/restore-test
diff -r /srv/school-data /srv/restore-test/srv/school-data
```

Measure elapsed time and compare with RTO. Explain why a snapshot or always-mounted writable share alone is not ransomware-resilient.

## Phase 4 - Detect and Respond

Build safe detections for:

- New privileged user/group membership.
- Large burst of file changes in a synthetic test directory.
- Defender disabled or signatures stale.
- Backup job failure.
- Wazuh agent disconnected.

Generate a benign file-change burst only in `/srv/school-data/lab-simulation`:

```bash
mkdir -p /srv/school-data/lab-simulation
for n in $(seq -w 1 100); do printf 'synthetic-%s\n' "$n" > "/srv/school-data/lab-simulation/file-$n.txt"; done
find /srv/school-data/lab-simulation -type f -printf '%TY-%Tm-%TdT%TH:%TM:%TS %p\n' | head
```

Do not encrypt files or run ransomware.

## Phase 5 - Exercise Recovery

Instructor declares the live synthetic teaching folder unavailable. Students must:

1. Open incident record and preserve evidence.
2. Confirm scope and business priority.
3. Isolate only with approval.
4. Select clean restore point.
5. Restore to staging.
6. Scan and validate content.
7. Obtain owner sign-off.
8. Return service and monitor.
9. Record actual RPO/RTO.

## Injects

1. The principal demands Internet RDP for weekend work.
2. A backup completes but `restic check` reports an issue.
3. A domain admin account is used from a student IP.
4. The restored files are clean, but DNS is still unavailable.

## Deliverables

- Ransomware attack-path diagram and prioritised risk register.
- Segmentation/rule set and 14-test matrix.
- Privileged-access and share-permission review.
- Backup design, protected-secret method, restore evidence, and measured RPO/RTO.
- Five detections and ransomware triage playbook.
- Tabletop minutes, executive update, and lessons learned.

## Success Standard

Students must show that recovery is a business process involving identity, DNS, applications, data, validation, communications, and security—not merely copying files back.
