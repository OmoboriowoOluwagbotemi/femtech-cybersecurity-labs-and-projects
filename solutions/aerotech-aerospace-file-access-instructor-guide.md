# AeroTech Aerospace Secure File Access

## Basic Step-by-Step Instructor Solution

**Companion problem:** [AeroTech student project](../practicals/projects/aerotech-aerospace-file-access-project.md)

**Platform:** Ubuntu Server 22.04 or later

**Lab account:** An administrator with `sudo` permission
**Scope:** An isolated educational lab using fictional information only

This guide deliberately uses manual commands. Students should type each command, inspect its result, and explain why it worked before continuing. There are no provisioning loops or large validation scripts.

## What students are building

AeroTech needs six private department folders. A user may work inside their own department but must be denied access to every other department.

The design uses four Linux controls:

1. A unique account identifies each employee.
2. A group represents each department.
3. Normal permissions prevent access by users outside the department.
4. SGID and a default ACL make new content inherit safe collaborative permissions.

## Before starting

Use an Ubuntu Server virtual machine created only for this course. Take a VM snapshot first. Do not run the commands on a production server.

Log in with the administrator account and confirm the system:

```bash
whoami
hostname
cat /etc/os-release
date
```

`whoami` should show your administrator account. The other commands identify the machine and give the evidence a date and time.

## Step 1 - Install the required free tools

```bash
sudo apt update
sudo apt install acl auditd -y
```

- `apt update` refreshes Ubuntu's package list.
- `acl` provides `setfacl` and `getfacl`.
- `auditd` records security-relevant filesystem activity.
- `-y` accepts the package installation prompt.

Confirm installation:

```bash
getfacl --version
sudo systemctl status auditd --no-pager
```

Press `q` if a status screen remains open. Auditd should be active.

## Step 2 - Create the six department groups

Run each command separately:

```bash
sudo groupadd engineering
sudo groupadd flightops
sudo groupadd qualityassurance
sudo groupadd research
sudo groupadd maintenance
sudo groupadd it
```

`groupadd engineering`, for example, creates a Linux group named `engineering`. The group will later receive access to the Engineering folder.

Confirm all six groups:

```bash
getent group engineering
getent group flightops
getent group qualityassurance
getent group research
getent group maintenance
getent group it
```

Each command should print one group entry. A message saying a group already exists means the lab has previously been configured; inspect that group before continuing.

## Step 3 - Create the 18 employee accounts

Run the commands one at a time:

```bash
sudo adduser --disabled-password --gecos "" eng1
sudo adduser --disabled-password --gecos "" eng2
sudo adduser --disabled-password --gecos "" eng3

sudo adduser --disabled-password --gecos "" flight1
sudo adduser --disabled-password --gecos "" flight2
sudo adduser --disabled-password --gecos "" flight3

sudo adduser --disabled-password --gecos "" qa1
sudo adduser --disabled-password --gecos "" qa2
sudo adduser --disabled-password --gecos "" qa3

sudo adduser --disabled-password --gecos "" rd1
sudo adduser --disabled-password --gecos "" rd2
sudo adduser --disabled-password --gecos "" rd3

sudo adduser --disabled-password --gecos "" maint1
sudo adduser --disabled-password --gecos "" maint2
sudo adduser --disabled-password --gecos "" maint3

sudo adduser --disabled-password --gecos "" it1
sudo adduser --disabled-password --gecos "" it2
sudo adduser --disabled-password --gecos "" it3
```

`adduser` creates the account and home directory. `--disabled-password` prevents direct password login, which is appropriate because the administrator will use `sudo -u USER` for lab tests. `--gecos ""` skips the optional full-name questions.

Check a few accounts:

```bash
id eng1
id qa1
id it1
```

At this point the accounts exist, but they are not yet department members.

## Step 4 - Put every employee in the correct group

### Engineering

```bash
sudo usermod -aG engineering eng1
sudo usermod -aG engineering eng2
sudo usermod -aG engineering eng3
```

### Flight Operations

```bash
sudo usermod -aG flightops flight1
sudo usermod -aG flightops flight2
sudo usermod -aG flightops flight3
```

### Quality Assurance

```bash
sudo usermod -aG qualityassurance qa1
sudo usermod -aG qualityassurance qa2
sudo usermod -aG qualityassurance qa3
```

### Research and Development

```bash
sudo usermod -aG research rd1
sudo usermod -aG research rd2
sudo usermod -aG research rd3
```

### Maintenance

```bash
sudo usermod -aG maintenance maint1
sudo usermod -aG maintenance maint2
sudo usermod -aG maintenance maint3
```

### Information Technology

```bash
sudo usermod -aG it it1
sudo usermod -aG it it2
sudo usermod -aG it it3
```

In `usermod -aG engineering eng1`:

- `-G engineering` selects the supplementary group.
- `-a` appends the group without deleting existing memberships.
- `eng1` is the account being changed.

Never omit `-a` unless you intend to replace all supplementary groups.

Verify every department:

```bash
getent group engineering
getent group flightops
getent group qualityassurance
getent group research
getent group maintenance
getent group it
```

The correct three usernames should appear at the end of each line. Also run:

```bash
id eng1
id flight1
id qa1
id rd1
id maint1
id it1
```

## Step 5 - Create the AeroTech directory structure

```bash
sudo mkdir -p /srv/aerotech
sudo mkdir /srv/aerotech/engineering
sudo mkdir /srv/aerotech/flight_operations
sudo mkdir /srv/aerotech/quality_assurance
sudo mkdir /srv/aerotech/research_development
sudo mkdir /srv/aerotech/maintenance
sudo mkdir /srv/aerotech/it
```

`mkdir -p /srv/aerotech` creates the company folder and does not fail if `/srv` already exists. The remaining commands create one folder per department.

Inspect the result:

```bash
sudo find /srv/aerotech -maxdepth 1 -type d -ls
```

## Step 6 - Set the parent folder securely

```bash
sudo chown root:root /srv/aerotech
sudo chmod 0711 /srv/aerotech
ls -ld /srv/aerotech
```

`root:root` means the owner and group are both `root`. Mode `0711` means:

- owner `root` has read, write, and traverse;
- other users may traverse a known path;
- ordinary users cannot list all department names.

For a directory, execute permission means **traverse**, not “run.” Test the no-listing control:

```bash
sudo -u eng1 ls /srv/aerotech
```

Expected result: `Permission denied`. This is correct.

## Step 7 - Give each directory its correct owner and group

```bash
sudo chown root:engineering /srv/aerotech/engineering
sudo chown root:flightops /srv/aerotech/flight_operations
sudo chown root:qualityassurance /srv/aerotech/quality_assurance
sudo chown root:research /srv/aerotech/research_development
sudo chown root:maintenance /srv/aerotech/maintenance
sudo chown root:it /srv/aerotech/it
```

The owner remains `root`, so an ordinary employee cannot take administrative ownership. The group identifies the authorised department.

Check the result. Use `sudo find` because the administrator's shell cannot expand `*` inside a parent directory that ordinary users are not allowed to list:

```bash
sudo find /srv/aerotech -mindepth 1 -maxdepth 1 -type d -printf '%M %u %g %p\n'
```

## Step 8 - Apply private collaborative permissions

Run each command:

```bash
sudo chmod 2770 /srv/aerotech/engineering
sudo chmod 2770 /srv/aerotech/flight_operations
sudo chmod 2770 /srv/aerotech/quality_assurance
sudo chmod 2770 /srv/aerotech/research_development
sudo chmod 2770 /srv/aerotech/maintenance
sudo chmod 2770 /srv/aerotech/it
```

Mode `2770` means:

- `2` enables SGID on the directory;
- owner has `rwx`;
- department group has `rwx`;
- everyone else has no access.

SGID makes newly created content inherit the directory's department group. Confirm that the permission display begins with `drwxrws---`:

```bash
sudo find /srv/aerotech -mindepth 1 -maxdepth 1 -type d -printf '%M %u %g %p\n'
```

The `s` in the group-execute position proves SGID is active.

## Step 9 - Add default ACLs for reliable teamwork

### Engineering example

```bash
sudo setfacl -m u::rwx,g::rwx,o::--- /srv/aerotech/engineering
sudo setfacl -m d:u::rwx,d:g::rwx,d:o::--- /srv/aerotech/engineering
sudo getfacl /srv/aerotech/engineering
```

The first command defines current access. The second defines what new files and subdirectories inherit. `o::---` denies users outside the department.

Apply the same rule to the other five folders:

```bash
sudo setfacl -m u::rwx,g::rwx,o::--- /srv/aerotech/flight_operations
sudo setfacl -m d:u::rwx,d:g::rwx,d:o::--- /srv/aerotech/flight_operations

sudo setfacl -m u::rwx,g::rwx,o::--- /srv/aerotech/quality_assurance
sudo setfacl -m d:u::rwx,d:g::rwx,d:o::--- /srv/aerotech/quality_assurance

sudo setfacl -m u::rwx,g::rwx,o::--- /srv/aerotech/research_development
sudo setfacl -m d:u::rwx,d:g::rwx,d:o::--- /srv/aerotech/research_development

sudo setfacl -m u::rwx,g::rwx,o::--- /srv/aerotech/maintenance
sudo setfacl -m d:u::rwx,d:g::rwx,d:o::--- /srv/aerotech/maintenance

sudo setfacl -m u::rwx,g::rwx,o::--- /srv/aerotech/it
sudo setfacl -m d:u::rwx,d:g::rwx,d:o::--- /srv/aerotech/it
```

Check each folder manually:

```bash
sudo getfacl /srv/aerotech/engineering
sudo getfacl /srv/aerotech/flight_operations
sudo getfacl /srv/aerotech/quality_assurance
sudo getfacl /srv/aerotech/research_development
sudo getfacl /srv/aerotech/maintenance
sudo getfacl /srv/aerotech/it
```

Each output should contain `default:user::rwx`, `default:group::rwx`, and `default:other::---`.

## Step 10 - Create the 12 fictional files as normal employees

Do not create all files as `root`. Using employee accounts proves the access design works.

### Engineering

```bash
sudo -u eng1 sh -c 'echo "Aircraft design documentation is confidential." > /srv/aerotech/engineering/aircraft_design.txt'
sudo -u eng2 sh -c 'echo "Component specifications are restricted to engineering staff." > /srv/aerotech/engineering/component_specs.txt'
```

### Flight Operations

```bash
sudo -u flight1 sh -c 'echo "Flight schedules are confidential operational information." > /srv/aerotech/flight_operations/flight_schedule.txt'
sudo -u flight2 sh -c 'echo "Mission records are restricted to authorised personnel." > /srv/aerotech/flight_operations/mission_log.txt'
```

### Quality Assurance

```bash
sudo -u qa1 sh -c 'echo "Inspection reports contain controlled information." > /srv/aerotech/quality_assurance/inspection_report.txt'
sudo -u qa2 sh -c 'echo "Compliance verification records are confidential." > /srv/aerotech/quality_assurance/compliance_checklist.txt'
```

### Research and Development

```bash
sudo -u rd1 sh -c 'echo "Prototype development notes are confidential." > /srv/aerotech/research_development/prototype_notes.txt'
sudo -u rd2 sh -c 'echo "Aerospace innovation documentation is restricted." > /srv/aerotech/research_development/aerospace_innovation.txt'
```

### Maintenance

```bash
sudo -u maint1 sh -c 'echo "Maintenance activity records are limited to authorised staff." > /srv/aerotech/maintenance/maintenance_log.txt'
sudo -u maint2 sh -c 'echo "Repair records contain sensitive technical information." > /srv/aerotech/maintenance/repair_records.txt'
```

### Information Technology

```bash
sudo -u it1 sh -c 'echo "Network inventory information is restricted." > /srv/aerotech/it/network_inventory.txt'
sudo -u it2 sh -c 'echo "Backup records are confidential." > /srv/aerotech/it/server_backup.txt'
```

The shell is required because output redirection (`>`) must also run as the employee. Confirm the files:

```bash
sudo find /srv/aerotech -type f -printf '%M %u %g %p\n'
```

Expected: each file has its creator as owner, the correct department as group, and no permissions for `other`.

## Step 11 - Prove authorised access works

Test Engineering first:

```bash
sudo -u eng1 ls -l /srv/aerotech/engineering
sudo -u eng1 cat /srv/aerotech/engineering/aircraft_design.txt
sudo -u eng1 sh -c 'echo "Reviewed by eng1." >> /srv/aerotech/engineering/component_specs.txt'
sudo -u eng1 mkdir /srv/aerotech/engineering/design_reviews
```

All four commands should succeed. The third is important: `eng1` updates a file created by `eng2`, proving department collaboration.

Check inherited security metadata:

```bash
sudo ls -l /srv/aerotech/engineering
sudo ls -ld /srv/aerotech/engineering/design_reviews
sudo getfacl /srv/aerotech/engineering/component_specs.txt
```

The group should be `engineering`; the new subdirectory should retain SGID; `other` should have no permissions.

Repeat a simple read test for the remaining departments:

```bash
sudo -u flight1 cat /srv/aerotech/flight_operations/flight_schedule.txt
sudo -u qa1 cat /srv/aerotech/quality_assurance/inspection_report.txt
sudo -u rd1 cat /srv/aerotech/research_development/prototype_notes.txt
sudo -u maint1 cat /srv/aerotech/maintenance/maintenance_log.txt
sudo -u it1 cat /srv/aerotech/it/network_inventory.txt
```

Every command should display the file content.

## Step 12 - Prove unauthorised access is denied

An access-control test is incomplete if it checks only successful access.

Try to list another department:

```bash
sudo -u eng1 ls /srv/aerotech/quality_assurance
```

Try to read another department's file:

```bash
sudo -u eng1 cat /srv/aerotech/quality_assurance/inspection_report.txt
```

Try to create a file in another department:

```bash
sudo -u eng1 touch /srv/aerotech/quality_assurance/unauthorised.txt
```

Try to delete another department's file:

```bash
sudo -u eng1 rm /srv/aerotech/quality_assurance/inspection_report.txt
```

Expected result for all four commands: `Permission denied`. Confirm that the protected file still exists:

```bash
sudo -u qa1 cat /srv/aerotech/quality_assurance/inspection_report.txt
```

Then perform at least one cross-department denial test for every representative:

```bash
sudo -u flight1 ls /srv/aerotech/engineering
sudo -u qa1 ls /srv/aerotech/research_development
sudo -u rd1 ls /srv/aerotech/maintenance
sudo -u maint1 ls /srv/aerotech/it
sudo -u it1 ls /srv/aerotech/flight_operations
```

All should fail. A failed command is a **successful security test** when denial was expected.

## Step 13 - Check for dangerous permissions

```bash
sudo find /srv/aerotech -perm -0002 -ls
sudo find /srv/aerotech -type d ! -perm -2000 -ls
```

- The first command finds world-writable content. Expected output: nothing.
- The second finds directories without SGID. `/srv/aerotech` itself may appear because SGID is required only on department directories. No department folder should appear.

Do not use `chmod 777`. It would allow unrelated users to access or change sensitive records.

## Step 14 - Add basic auditing

Create one audit rule for the AeroTech tree:

```bash
sudo auditctl -w /srv/aerotech -p rwxa -k aerotech_files
sudo auditctl -l
```

- `-w` watches the path.
- `-p rwxa` watches reads, writes, execution/traversal-related access, and attribute changes.
- `-k aerotech_files` adds a searchable label.

Generate one authorised and one denied event:

```bash
sudo -u eng1 cat /srv/aerotech/engineering/aircraft_design.txt
sudo -u eng1 cat /srv/aerotech/it/network_inventory.txt
```

Search the log:

```bash
sudo ausearch -k aerotech_files -i | tail -n 40
```

Look for the username, path, operation, and success result. The temporary `auditctl` rule disappears after reboot, which is acceptable for this basic lab. Persistent audit configuration is an advanced follow-up topic.

## Step 15 - Make and test a basic metadata-aware backup

Create a protected backup directory and archive:

```bash
sudo mkdir -p /var/backups/aerotech
sudo chmod 0700 /var/backups/aerotech
sudo tar --acls --xattrs --numeric-owner -czpf /var/backups/aerotech/aerotech-backup.tar.gz /srv/aerotech
sudo tar -tzf /var/backups/aerotech/aerotech-backup.tar.gz | head
```

`--acls`, `--xattrs`, and `--numeric-owner` preserve important security metadata. `-p` preserves permissions during extraction by root. Listing the archive proves it is readable, but a restore test gives stronger evidence.

Restore into an isolated test location:

```bash
sudo mkdir -p /srv/aerotech_restore_test
sudo chmod 0711 /srv/aerotech_restore_test
sudo tar --acls --xattrs --numeric-owner -xzpf /var/backups/aerotech/aerotech-backup.tar.gz -C /srv/aerotech_restore_test
sudo ls -ld /srv/aerotech_restore_test/srv/aerotech/engineering
sudo getfacl /srv/aerotech_restore_test/srv/aerotech/engineering
```

Test the restored permissions:

```bash
sudo -u eng1 cat /srv/aerotech_restore_test/srv/aerotech/engineering/aircraft_design.txt
sudo -u qa1 cat /srv/aerotech_restore_test/srv/aerotech/engineering/aircraft_design.txt
```

Expected: `eng1` succeeds and `qa1` receives `Permission denied`.

## Step 16 - Perform a simple leaver test

Lock `eng3` to represent an employee leaving AeroTech:

```bash
sudo usermod -L eng3
sudo gpasswd -d eng3 engineering
sudo pkill -KILL -u eng3
id eng3
```

- `-L` locks password authentication.
- `gpasswd -d` removes department membership.
- `pkill -KILL -u` ends existing processes that might still carry old group membership.
- `id eng3` confirms the current groups.

Test access through a fresh process:

```bash
sudo -u eng3 ls /srv/aerotech/engineering
```

Expected: `Permission denied`. Locking a password alone does not remove filesystem permissions from an already running session, which is why membership and active sessions also matter.

## Step 17 - Final verification checklist

Students should prove each statement with command output:

- Six department groups exist.
- Eighteen unique accounts exist.
- Every user belongs to only the authorised department group.
- `/srv/aerotech` is owned by `root:root` with mode `0711`.
- Every department directory has the correct group and mode `2770`.
- Every department directory has a default ACL.
- All 12 fictional files exist with the correct department group.
- A department member can list, read, create, and collaborate.
- A non-member cannot list, read, create, change, or delete.
- No content is world-writable.
- Audit events can be retrieved.
- Backup and restored permissions have been tested.
- The leaver no longer has department access.

Useful final commands:

```bash
sudo find /srv/aerotech -maxdepth 1 -type d -printf '%M %u %g %p\n'
sudo find /srv/aerotech -type f -printf '%M %u %g %p\n'
sudo getfacl /srv/aerotech/engineering
sudo find /srv/aerotech -perm -0002 -ls
sudo ausearch -k aerotech_files -i | tail -n 20
```

## Questions students must be able to answer

1. Why does a directory need execute permission for a user to open a file inside it?
2. Why does mode `2770` begin with `2`?
3. What does SGID inherit, and what does it not guarantee?
4. Why is a default ACL needed for reliable group collaboration?
5. Why must the test plan include expected failures?
6. Why is testing as `root` insufficient?
7. Why is `chmod 777` unacceptable?
8. Why must a backup preserve ACLs, owners, groups, and modes?
9. Why can terminating old sessions matter after group membership is removed?

## Instructor notes and common errors

- If an authorised user receives `Permission denied`, check `id USER`, every parent directory with `namei -l PATH`, and the ACL with `getfacl PATH`.
- If a new file has the wrong group, check for the SGID `s` on the department directory.
- If colleagues cannot edit a new file, inspect its ACL and the ACL mask with `getfacl FILE`.
- If an unauthorised user succeeds, stop the lab and inspect group membership, directory mode, and ACL entries before continuing.
- A `+` after permissions in `ls -l` means an ACL exists; it is not an error.
- `root` can bypass ordinary Linux discretionary access controls. Limit and audit administrator access.
- Permissions control access but do not encrypt data. Disk encryption and secure transport are separate controls.

This basic solution is complete when students can run each test, predict the result before pressing Enter, explain the Linux control responsible for the result, and repair a deliberately introduced mistake without copying an automation script.
