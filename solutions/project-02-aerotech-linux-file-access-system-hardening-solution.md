# Project 02 Solution - AeroTech Linux File Access and System Hardening

## Target Outcome

The student builds a hardened Ubuntu departmental file-access service under `/srv/aerotech`, with correct Linux users, groups, SGID directories, default ACLs, SSH hardening, UFW, audit evidence, backup, restore, and positive/negative validation.

## Step 1 - Prepare Scope and Evidence

```bash
mkdir -p ~/aerotech-linux-hardening/evidence/{01-baseline,02-identity,03-filesystem,04-hardening,05-validation,06-audit,07-recovery,08-troubleshooting}
mkdir -p ~/aerotech-linux-hardening/reports ~/aerotech-linux-hardening/portfolio
cd ~/aerotech-linux-hardening
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee evidence/01-baseline/start-time-utc.txt
script -af evidence/command-log.txt
```

Baseline:

```bash
hostnamectl | tee evidence/01-baseline/hostnamectl.txt
whoami | tee evidence/01-baseline/whoami.txt
ip -br address | tee evidence/01-baseline/ip-address.txt
ip route | tee evidence/01-baseline/routes.txt
sudo ss -lntup | tee evidence/01-baseline/listeners.txt
sudo systemctl --failed | tee evidence/01-baseline/failed-services.txt
ls -ld /srv /srv/aerotech 2>&1 | tee evidence/01-baseline/srv-before.txt
```

## Step 2 - Create Groups and Users

Create the groups manually. Do not use a loop for this section. The purpose is to make the student understand the relationship between Linux users, primary groups, home directories, login shells, and departmental access.

```bash
sudo groupadd engineering
sudo groupadd flightops
sudo groupadd qualityassurance
sudo groupadd research
sudo groupadd maintenance
sudo groupadd it
```

If a group already exists because the student is repeating the lab, verify it instead of creating a duplicate:

```bash
getent group engineering
```

Create the users manually:

```bash
sudo useradd -m -s /bin/bash -g engineering eng1
sudo useradd -m -s /bin/bash -g engineering eng2
sudo useradd -m -s /bin/bash -g engineering eng3

sudo useradd -m -s /bin/bash -g flightops flight1
sudo useradd -m -s /bin/bash -g flightops flight2
sudo useradd -m -s /bin/bash -g flightops flight3

sudo useradd -m -s /bin/bash -g qualityassurance qa1
sudo useradd -m -s /bin/bash -g qualityassurance qa2
sudo useradd -m -s /bin/bash -g qualityassurance qa3

sudo useradd -m -s /bin/bash -g research rd1
sudo useradd -m -s /bin/bash -g research rd2
sudo useradd -m -s /bin/bash -g research rd3

sudo useradd -m -s /bin/bash -g maintenance maint1
sudo useradd -m -s /bin/bash -g maintenance maint2
sudo useradd -m -s /bin/bash -g maintenance maint3

sudo useradd -m -s /bin/bash -g it it1
sudo useradd -m -s /bin/bash -g it it2
sudo useradd -m -s /bin/bash -g it it3
```

Set temporary passwords only if interactive login testing is required:

```bash
sudo passwd eng1
```

Never record passwords.

Validate:

```bash
getent group engineering flightops qualityassurance research maintenance it | tee evidence/02-identity/groups.txt
id eng1 | tee evidence/02-identity/id-eng1.txt
id eng2 | tee evidence/02-identity/id-eng2.txt
id eng3 | tee evidence/02-identity/id-eng3.txt
id flight1 | tee evidence/02-identity/id-flight1.txt
id flight2 | tee evidence/02-identity/id-flight2.txt
id flight3 | tee evidence/02-identity/id-flight3.txt
id qa1 | tee evidence/02-identity/id-qa1.txt
id qa2 | tee evidence/02-identity/id-qa2.txt
id qa3 | tee evidence/02-identity/id-qa3.txt
id rd1 | tee evidence/02-identity/id-rd1.txt
id rd2 | tee evidence/02-identity/id-rd2.txt
id rd3 | tee evidence/02-identity/id-rd3.txt
id maint1 | tee evidence/02-identity/id-maint1.txt
id maint2 | tee evidence/02-identity/id-maint2.txt
id maint3 | tee evidence/02-identity/id-maint3.txt
id it1 | tee evidence/02-identity/id-it1.txt
id it2 | tee evidence/02-identity/id-it2.txt
id it3 | tee evidence/02-identity/id-it3.txt
```

Create a simple membership matrix:

| Department | Group | Users |
|---|---|---|
| Engineering | `engineering` | `eng1`, `eng2`, `eng3` |
| Flight Operations | `flightops` | `flight1`, `flight2`, `flight3` |
| Quality Assurance | `qualityassurance` | `qa1`, `qa2`, `qa3` |
| Research and Development | `research` | `rd1`, `rd2`, `rd3` |
| Maintenance | `maintenance` | `maint1`, `maint2`, `maint3` |
| Information Technology | `it` | `it1`, `it2`, `it3` |

Command explanation:

| Command or option | Meaning |
|---|---|
| `groupadd engineering` | Creates the local Linux group named `engineering` |
| `useradd eng1` | Creates the local Linux user named `eng1` |
| `-m` | Creates `/home/username` |
| `-s /bin/bash` | Sets Bash as the login shell |
| `-g engineering` | Makes `engineering` the user's primary group |
| `id eng1` | Shows UID, primary group, and supplementary groups |
| `getent group engineering` | Confirms the group exists through the system name service |

Expected result: every user has a unique UID, the correct primary GID, a home directory, and no membership in unrelated department groups.

## Step 3 - Build Directory Structure

```bash
sudo mkdir -p /srv/aerotech/{engineering,flight_operations,quality_assurance,research_development,maintenance,it}
sudo chown root:root /srv/aerotech
sudo chmod 711 /srv/aerotech

sudo chown root:engineering /srv/aerotech/engineering
sudo chown root:flightops /srv/aerotech/flight_operations
sudo chown root:qualityassurance /srv/aerotech/quality_assurance
sudo chown root:research /srv/aerotech/research_development
sudo chown root:maintenance /srv/aerotech/maintenance
sudo chown root:it /srv/aerotech/it

sudo chmod 2770 /srv/aerotech/engineering
sudo chmod 2770 /srv/aerotech/flight_operations
sudo chmod 2770 /srv/aerotech/quality_assurance
sudo chmod 2770 /srv/aerotech/research_development
sudo chmod 2770 /srv/aerotech/maintenance
sudo chmod 2770 /srv/aerotech/it
```

Why `711` on `/srv/aerotech`: users can traverse to authorized directories if they know the path, but cannot list all departments. Why `2770` on departments: owner and group can work, others have no access, and SGID preserves group ownership for new content.

## Step 4 - Configure Default ACLs

```bash
sudo apt update
sudo apt install -y acl

sudo setfacl -m g:engineering:rwx,d:g:engineering:rwx,d:o::--- /srv/aerotech/engineering
sudo setfacl -m g:flightops:rwx,d:g:flightops:rwx,d:o::--- /srv/aerotech/flight_operations
sudo setfacl -m g:qualityassurance:rwx,d:g:qualityassurance:rwx,d:o::--- /srv/aerotech/quality_assurance
sudo setfacl -m g:research:rwx,d:g:research:rwx,d:o::--- /srv/aerotech/research_development
sudo setfacl -m g:maintenance:rwx,d:g:maintenance:rwx,d:o::--- /srv/aerotech/maintenance
sudo setfacl -m g:it:rwx,d:g:it:rwx,d:o::--- /srv/aerotech/it
```

Validate:

```bash
namei -l /srv/aerotech/engineering | tee evidence/03-filesystem/namei-engineering.txt
getfacl -R /srv/aerotech | tee evidence/03-filesystem/aerotech-acls.txt
find /srv/aerotech -maxdepth 2 -printf '%M %u %g %p\n' | tee evidence/03-filesystem/tree-metadata.txt
find /srv/aerotech -perm -0007 -ls | tee evidence/03-filesystem/world-access-check.txt
```

`world-access-check.txt` should be empty.

## Step 5 - Create Sample Records as Department Users

Use `sudo -u` to create records as ordinary identities:

```bash
sudo -u eng1 bash -c "echo 'Synthetic aircraft design documentation is confidential.' > /srv/aerotech/engineering/aircraft_design.txt"
sudo -u eng2 bash -c "echo 'Synthetic component specifications are restricted to engineering.' > /srv/aerotech/engineering/component_specs.txt"
sudo -u flight1 bash -c "echo 'Synthetic flight schedules are confidential.' > /srv/aerotech/flight_operations/flight_schedule.txt"
sudo -u flight2 bash -c "echo 'Synthetic mission records are restricted.' > /srv/aerotech/flight_operations/mission_log.txt"
sudo -u qa1 bash -c "echo 'Synthetic inspection reports contain controlled information.' > /srv/aerotech/quality_assurance/inspection_report.txt"
sudo -u qa2 bash -c "echo 'Synthetic compliance verification records are confidential.' > /srv/aerotech/quality_assurance/compliance_checklist.txt"
sudo -u rd1 bash -c "echo 'Synthetic prototype development notes are confidential.' > /srv/aerotech/research_development/prototype_notes.txt"
sudo -u rd2 bash -c "echo 'Synthetic aerospace innovation documentation is restricted.' > /srv/aerotech/research_development/aerospace_innovation.txt"
sudo -u maint1 bash -c "echo 'Synthetic maintenance activity records are limited.' > /srv/aerotech/maintenance/maintenance_log.txt"
sudo -u maint2 bash -c "echo 'Synthetic repair records contain sensitive technical information.' > /srv/aerotech/maintenance/repair_records.txt"
sudo -u it1 bash -c "echo 'Synthetic network inventory is restricted.' > /srv/aerotech/it/network_inventory.txt"
sudo -u it2 bash -c "echo 'Synthetic backup records are confidential.' > /srv/aerotech/it/server_backup.txt"
```

```bash
find /srv/aerotech -type f -printf '%M %u %g %p\n' | tee evidence/03-filesystem/sample-records-metadata.txt
```

## Step 6 - Positive and Negative Access Tests

Positive examples:

```bash
sudo -u eng1 ls /srv/aerotech/engineering | tee evidence/05-validation/eng1-list-engineering.txt
sudo -u eng3 cat /srv/aerotech/engineering/aircraft_design.txt | tee evidence/05-validation/eng3-read-engineering.txt
sudo -u eng3 bash -c "echo 'eng3 update' >> /srv/aerotech/engineering/component_specs.txt"
```

Negative examples:

```bash
sudo -u eng1 ls /srv/aerotech/research_development > evidence/05-validation/eng1-list-research-denied.txt 2>&1; echo $? | tee -a evidence/05-validation/eng1-list-research-denied.txt
sudo -u qa1 cat /srv/aerotech/engineering/aircraft_design.txt > evidence/05-validation/qa1-read-engineering-denied.txt 2>&1; echo $? | tee -a evidence/05-validation/qa1-read-engineering-denied.txt
sudo -u maint1 touch /srv/aerotech/it/bad-file.txt > evidence/05-validation/maint1-write-it-denied.txt 2>&1; echo $? | tee -a evidence/05-validation/maint1-write-it-denied.txt
```

Expected: denied tests return non-zero exit code and permission denied text.

## Step 7 - SSH, UFW, Fail2Ban, and Services

Prepare key login before disabling password SSH. From Kali:

```bash
ssh-keygen -t ed25519 -C "aerotech-admin"
ssh-copy-id it1@<UBUNTU_IP>
ssh it1@<UBUNTU_IP> 'whoami; hostname'
```

On Ubuntu:

```bash
sudo groupadd sshadmins 2>/dev/null || true
sudo usermod -aG sshadmins it1
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.pre-aerotech
sudoedit /etc/ssh/sshd_config
```

Required settings:

```text
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
MaxAuthTries 3
AllowGroups sshadmins
```

Validate:

```bash
sudo sshd -t
sudo systemctl reload ssh
sudo grep -nE 'PermitRootLogin|PubkeyAuthentication|PasswordAuthentication|MaxAuthTries|AllowGroups' /etc/ssh/sshd_config | tee evidence/04-hardening/ssh-settings.txt
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from <KALI_IP> to any port 22 proto tcp comment 'Approved admin SSH'
sudo ufw enable
sudo ufw status verbose | tee evidence/04-hardening/ufw-status.txt
sudo ss -lntup | tee evidence/04-hardening/listeners-after-hardening.txt
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd | tee evidence/04-hardening/fail2ban-sshd.txt
```

## Step 8 - Audit Evidence

```bash
sudo apt install -y auditd audispd-plugins
sudo systemctl enable --now auditd
sudo auditctl -w /srv/aerotech -p rwxa -k aerotech-access
sudo auditctl -w /etc/passwd -p wa -k identity-change
sudo auditctl -w /etc/group -p wa -k identity-change
```

Generate activity:

```bash
sudo -u eng1 cat /srv/aerotech/engineering/aircraft_design.txt >/dev/null
sudo -u qa1 cat /srv/aerotech/engineering/aircraft_design.txt 2>/dev/null || true
sudo chmod g+w /srv/aerotech/engineering/component_specs.txt
```

Collect:

```bash
sudo ausearch -k aerotech-access | tee evidence/06-audit/aerotech-access-events.txt
sudo ausearch -k identity-change | tee evidence/06-audit/identity-change-events.txt
sudo tail -n 80 /var/log/auth.log | tee evidence/06-audit/auth-log-tail.txt
```

If `auditd` is unavailable, document the limitation and preserve command evidence.

## Step 9 - Joiner, Mover, Leaver

```bash
sudo useradd -m -s /bin/bash -g engineering tempeng
id tempeng | tee evidence/05-validation/tempeng-before.txt
sudo -u tempeng ls /srv/aerotech/engineering | tee evidence/05-validation/tempeng-engineering-allowed.txt

sudo usermod -g qualityassurance tempeng
id tempeng | tee evidence/05-validation/tempeng-after-move.txt
sudo -u tempeng ls /srv/aerotech/engineering > evidence/05-validation/tempeng-engineering-denied-after-move.txt 2>&1; echo $? | tee -a evidence/05-validation/tempeng-engineering-denied-after-move.txt
sudo -u tempeng ls /srv/aerotech/quality_assurance | tee evidence/05-validation/tempeng-qa-allowed.txt

sudo usermod -L tempeng
sudo passwd -S tempeng | tee evidence/05-validation/tempeng-locked.txt
```

Explain that active sessions may need to be terminated separately with `pkill -KILL -u tempeng` if approved.

## Step 10 - Backup and Recovery

```bash
sudo tar --acls --xattrs --numeric-owner -cpf evidence/07-recovery/aerotech-backup.tar /srv/aerotech
sha256sum evidence/07-recovery/aerotech-backup.tar | tee evidence/07-recovery/aerotech-backup.sha256
sudo mkdir -p /srv/aerotech-restore-test
sudo tar --acls --xattrs --numeric-owner -xpf evidence/07-recovery/aerotech-backup.tar -C /srv/aerotech-restore-test
sudo getfacl -R /srv/aerotech-restore-test/srv/aerotech | tee evidence/07-recovery/restored-acls.txt
sudo find /srv/aerotech-restore-test/srv/aerotech -maxdepth 2 -printf '%M %u %g %p\n' | tee evidence/07-recovery/restored-metadata.txt
```

Retest one allowed and one denied access against the restored path.

## Step 11 - Closeout

```bash
exit
find evidence -type f ! -name hashes.sha256 -print0 | sort -z | xargs -0 sha256sum > evidence/hashes.sha256
sha256sum --check evidence/hashes.sha256 | tee evidence/hash-check.txt
```

The final report must explain SGID, ACLs, `umask`, SSH hardening, UFW, audit evidence, backup metadata, and remaining risk.
