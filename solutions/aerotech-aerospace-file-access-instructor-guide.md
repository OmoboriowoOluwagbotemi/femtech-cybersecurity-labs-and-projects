# AeroTech Aerospace Secure File Access

## Instructor Solution and Teaching Guide

**Companion problem:** [AeroTech student project](../practicals/projects/aerotech-aerospace-file-access-project.md)

**Platform:** Ubuntu Server

**Scope:** Isolated educational lab

> This reference implementation teaches why each control works, how to prove it, and how it fails. Never use real aerospace data, production credentials, or external systems.

## 1. Reference Architecture

The reference design uses:

- one unique fictional account per employee;
- one supplementary group per department;
- `root` as administrative owner;
- each department group as its directory group owner;
- mode `0711` on `/srv/aerotech`;
- mode `2770` on each department directory;
- SGID for group inheritance;
- default ACLs for predictable collaboration;
- no access for `other`;
- auditd for write and attribute-change evidence;
- metadata-aware backup and isolated recovery;
- tests executed as ordinary users, not as root.

This is Linux group-based discretionary access control. Groups represent business roles, but this is not mandatory access control.

## 2. Technical Mental Model

### 2.1 Process identity

A process carries a UID, primary GID, and supplementary GIDs. The kernel evaluates numeric IDs; account and group names are mappings.

```bash
id eng1
getent passwd eng1
getent group engineering
```

Existing sessions retain their original supplementary groups after membership changes. Start a new session or terminate stale sessions when revoking access.

### 2.2 Permission selection

Traditional permissions select one class: owner when UID matches, group when a process group matches, otherwise `other`. Linux does not combine the most generous bits from all classes.

ACLs add named users and groups. The ACL mask caps the effective permissions of the group class.

### 2.3 Files and directories

| Permission | Regular file | Directory |
|---|---|---|
| `r` | Read contents | List entry names |
| `w` | Modify contents | Create, delete, or rename entries when traversal is allowed |
| `x` | Execute program | Traverse and access a known name |

Deleting a file depends mainly on the parent directory, not on the file's write bit.

### 2.4 SGID, default ACL, and `umask`

SGID on a directory assigns its group to new children. It does not guarantee group write.

A default ACL supplies inherited access entries. It solves the collaboration problem that SGID alone does not solve.

Programs normally request `0666` for files and `0777` for directories. `umask` removes requested bits in a non-ACL design. With a default ACL, Linux derives inherited access while still respecting the mode requested by the creating program.

### 2.5 Privilege boundary

Root and sufficiently capable processes can bypass ordinary DAC. Limit and audit sudo. Do not claim that departmental permissions stop an unrestricted administrator.

## 3. Reference Design Tables

| Department | Group | Directory | Representative |
|---|---|---|---|
| Engineering | `engineering` | `/srv/aerotech/engineering` | `eng1` |
| Flight Operations | `flightops` | `/srv/aerotech/flight_operations` | `flight1` |
| Quality Assurance | `qualityassurance` | `/srv/aerotech/quality_assurance` | `qa1` |
| Research and Development | `research` | `/srv/aerotech/research_development` | `rd1` |
| Maintenance | `maintenance` | `/srv/aerotech/maintenance` | `maint1` |
| Information Technology | `it` | `/srv/aerotech/it` | `it1` |

| Path | Owner | Group | Mode | Purpose |
|---|---|---|---:|---|
| `/srv/aerotech` | `root` | `root` | `0711` | Traverse a known path without listing all departments |
| Department directory | `root` | Department | `2770` | Group collaboration, SGID, no world access |
| New file | Creator | Department | Effective `0660` | Creator and department collaboration |
| New subdirectory | Creator | Department | Effective `2770` | Continued inheritance and collaboration |

The design does not protect against compromised root, unrestricted sudo, offline disk access, insecure backups, or an authorised insider copying data elsewhere.

## 4. Baseline the Lab

Record authorisation, hostname, path, fictional identities, evidence location, stop conditions, and rollback before changing state.

```bash
date --iso-8601=seconds
hostnamectl
cat /etc/os-release
uname -r
timedatectl
findmnt -T /srv
```

These commands anchor evidence and confirm the filesystem backing `/srv`. Stop if this is not the authorised host.

```bash
getent passwd | cut -d: -f1,3,4 | sort
getent group | cut -d: -f1,3,4 | sort
sudo find /srv -maxdepth 2 -printf '%M %u %g %p\n' 2>/dev/null
sudo getfacl -p /srv 2>/dev/null
sudo systemctl --failed
```

Check duplicate numeric identities:

```bash
getent passwd | cut -d: -f3 | sort | uniq -d
getent group | cut -d: -f3 | sort | uniq -d
```

Empty output is expected. Duplicate IDs can make two names equivalent to the kernel.

Install free dependencies:

```bash
sudo apt update
sudo apt install acl auditd audispd-plugins
getfacl --version
sudo systemctl status auditd --no-pager
```

## 5. Create Department Groups

```bash
for group in engineering flightops qualityassurance research maintenance it; do if getent group "$group" >/dev/null; then printf 'EXISTS: %s\n' "$group"; else sudo groupadd "$group" && printf 'CREATED: %s\n' "$group"; fi; done
```

This is idempotent: it checks current state instead of blindly failing or duplicating work.

```bash
for group in engineering flightops qualityassurance research maintenance it; do getent group "$group"; done
```

## 6. Create Employee Accounts

Ubuntu `adduser` normally creates a private primary group. Keeping the department supplementary separates identity from role and visibly demonstrates SGID inheritance.

```bash
users='eng1 eng2 eng3 flight1 flight2 flight3 qa1 qa2 qa3 rd1 rd2 rd3 maint1 maint2 maint3 it1 it2 it3'
for user in $users; do if id "$user" >/dev/null 2>&1; then printf 'EXISTS: %s\n' "$user"; else sudo adduser --disabled-password --gecos 'AeroTech training account' "$user" && printf 'CREATED: %s\n' "$user"; fi; done
```

`--disabled-password` avoids embedding credentials. If interactive login is required, use `sudo passwd USER` and enter the password privately. Never store plaintext passwords in scripts, screenshots, or GitHub.

`--disabled-password` disables password authentication, not every possible login method. SSH keys or another PAM method may still permit access. Use `--disabled-login`, a non-login shell, or the organisation's identity control when complete login denial is required.

Assign roles:

```bash
for user in eng1 eng2 eng3; do sudo usermod -aG engineering "$user"; done
for user in flight1 flight2 flight3; do sudo usermod -aG flightops "$user"; done
for user in qa1 qa2 qa3; do sudo usermod -aG qualityassurance "$user"; done
for user in rd1 rd2 rd3; do sudo usermod -aG research "$user"; done
for user in maint1 maint2 maint3; do sudo usermod -aG maintenance "$user"; done
for user in it1 it2 it3; do sudo usermod -aG it "$user"; done
```

`-a` is critical. `usermod -G` without `-a` replaces the supplementary group list.

Verify exact identity:

```bash
for user in $users; do id "$user"; done
for group in engineering flightops qualityassurance research maintenance it; do getent group "$group"; done
```

Review every department-group occurrence for unexplained cross-membership.

## 7. Create the Secure Hierarchy

```bash
sudo install -d -o root -g root -m 0711 /srv/aerotech
sudo install -d -o root -g engineering      -m 2770 /srv/aerotech/engineering
sudo install -d -o root -g flightops        -m 2770 /srv/aerotech/flight_operations
sudo install -d -o root -g qualityassurance -m 2770 /srv/aerotech/quality_assurance
sudo install -d -o root -g research         -m 2770 /srv/aerotech/research_development
sudo install -d -o root -g maintenance      -m 2770 /srv/aerotech/maintenance
sudo install -d -o root -g it               -m 2770 /srv/aerotech/it
```

`0711` lets ordinary users traverse a known authorised path but prevents listing all department names. `2770` means SGID, full owner/group access, and no `other` access.

Because department members have write and execute on the shared directory, they can normally rename or delete colleague-created entries. That is the chosen collaborative policy. A sticky bit would restrict deletion/rename mainly to the entry owner, directory owner, or root, but would change the business behaviour and must not be added without a requirement.

Apply explicit access and default ACLs:

```bash
dirs='/srv/aerotech/engineering /srv/aerotech/flight_operations /srv/aerotech/quality_assurance /srv/aerotech/research_development /srv/aerotech/maintenance /srv/aerotech/it'
for dir in $dirs; do sudo setfacl -m u::rwx,g::rwx,m::rwx,o::--- "$dir"; sudo setfacl -m d:u::rwx,d:g::rwx,d:m::rwx,d:o::--- "$dir"; done
```

`m::rwx` is the ACL mask. It caps effective group-class permissions. Entries beginning `d:` are inherited by new children.

Verify the complete path:

```bash
namei -l /srv/aerotech/engineering
sudo find /srv/aerotech -maxdepth 1 -printf '%M %u %g %p\n'
sudo getfacl -p /srv/aerotech/engineering
```

Expected departmental mode begins `drwxrws---`; the group-position `s` shows SGID with execute.

## 8. Create the Twelve Fictional Records

Create records as ordinary employees so owner and SGID evidence is genuine.

```bash
sudo -u eng1 -- bash -c "printf '%s\n' 'Engineering Department - Aircraft design documentation is confidential.' > /srv/aerotech/engineering/aircraft_design.txt"
sudo -u eng2 -- bash -c "printf '%s\n' 'Engineering Department - Component specifications are restricted to engineering staff.' > /srv/aerotech/engineering/component_specs.txt"
sudo -u flight1 -- bash -c "printf '%s\n' 'Flight Operations Department - Flight schedules are confidential operational information.' > /srv/aerotech/flight_operations/flight_schedule.txt"
sudo -u flight2 -- bash -c "printf '%s\n' 'Flight Operations Department - Mission records are restricted to authorised personnel.' > /srv/aerotech/flight_operations/mission_log.txt"
sudo -u qa1 -- bash -c "printf '%s\n' 'Quality Assurance Department - Inspection reports contain controlled information.' > /srv/aerotech/quality_assurance/inspection_report.txt"
sudo -u qa2 -- bash -c "printf '%s\n' 'Quality Assurance Department - Compliance verification records are confidential.' > /srv/aerotech/quality_assurance/compliance_checklist.txt"
sudo -u rd1 -- bash -c "printf '%s\n' 'Research Department - Prototype development notes are confidential.' > /srv/aerotech/research_development/prototype_notes.txt"
sudo -u rd2 -- bash -c "printf '%s\n' 'Research Department - Aerospace innovation documentation is restricted.' > /srv/aerotech/research_development/aerospace_innovation.txt"
sudo -u maint1 -- bash -c "printf '%s\n' 'Maintenance Department - Maintenance activities are recorded for authorised staff only.' > /srv/aerotech/maintenance/maintenance_log.txt"
sudo -u maint2 -- bash -c "printf '%s\n' 'Maintenance Department - Repair records contain sensitive technical information.' > /srv/aerotech/maintenance/repair_records.txt"
sudo -u it1 -- bash -c "printf '%s\n' 'IT Department - Network inventory information is restricted.' > /srv/aerotech/it/network_inventory.txt"
sudo -u it2 -- bash -c "printf '%s\n' 'IT Department - Server backup records are confidential.' > /srv/aerotech/it/server_backup.txt"
```

Inspect:

```bash
sudo find /srv/aerotech -type f -printf '%M %u %g %p\n' | sort
sudo getfacl -p /srv/aerotech/engineering/aircraft_design.txt
```

Expected: creator owner, inherited department group, effective group collaboration, and no `other` access.

## 9. Positive Access and Collaboration Tests

Run tests as ordinary users. Root success does not prove ordinary-user access.

```bash
sudo -u eng1 -- ls -la /srv/aerotech/engineering
sudo -u eng1 -- cat /srv/aerotech/engineering/aircraft_design.txt
sudo -u eng1 -- touch /srv/aerotech/engineering/eng1_validation.txt
sudo -u eng1 -- bash -c "printf '%s\n' 'eng1 validation entry' >> /srv/aerotech/engineering/eng1_validation.txt"
```

Repeat representative reads:

```bash
sudo -u flight1 -- cat /srv/aerotech/flight_operations/flight_schedule.txt
sudo -u qa1 -- cat /srv/aerotech/quality_assurance/inspection_report.txt
sudo -u rd1 -- cat /srv/aerotech/research_development/prototype_notes.txt
sudo -u maint1 -- cat /srv/aerotech/maintenance/maintenance_log.txt
sudo -u it1 -- cat /srv/aerotech/it/network_inventory.txt
```

Prove peer collaboration. `eng1` created the design file; `eng2` must append:

```bash
sudo -u eng2 -- bash -c "printf '%s\n' 'Engineering peer review completed.' >> /srv/aerotech/engineering/aircraft_design.txt"
sudo -u eng1 -- tail -n 2 /srv/aerotech/engineering/aircraft_design.txt
```

Prove subdirectory inheritance:

```bash
sudo -u eng3 -- mkdir /srv/aerotech/engineering/review_workspace
stat -c '%A %a %U %G %n' /srv/aerotech/engineering/review_workspace
getfacl -p /srv/aerotech/engineering/review_workspace
```

Expected: group `engineering`, SGID retained, default ACL present, and no `other` access.

## 10. Negative Security Tests

Capture the non-zero exit status. An expected denial is a passing security result.

```bash
if sudo -u eng1 -- cat /srv/aerotech/research_development/prototype_notes.txt; then
  echo 'FAIL: eng1 read Research data'
else
  rc=$?
  echo "PASS: eng1 denied Research read; exit=$rc"
fi
```

Test listing:

```bash
sudo -u eng1 -- ls /srv/aerotech/flight_operations
sudo -u eng1 -- ls /srv/aerotech/quality_assurance
sudo -u eng1 -- ls /srv/aerotech/research_development
sudo -u eng1 -- ls /srv/aerotech/maintenance
sudo -u eng1 -- ls /srv/aerotech/it
```

All must fail.

Test multiple operations against Maintenance:

```bash
sudo -u eng1 -- cat /srv/aerotech/maintenance/maintenance_log.txt
sudo -u eng1 -- touch /srv/aerotech/maintenance/unauthorised.txt
sudo -u eng1 -- bash -c "printf 'tamper\n' >> /srv/aerotech/maintenance/maintenance_log.txt"
sudo -u eng1 -- mv /srv/aerotech/maintenance/maintenance_log.txt /srv/aerotech/maintenance/changed.txt
sudo -u eng1 -- rm /srv/aerotech/maintenance/maintenance_log.txt
```

Verify the original file still exists and its content is unchanged. Repeat both directions across all six departments; one protected direction does not prove the reverse.

Parent behaviour:

```bash
sudo -u eng1 -- ls /srv/aerotech
sudo -u eng1 -- stat /srv/aerotech/engineering
```

With `0711`, listing the parent fails while reaching the known authorised path succeeds.

## 11. SGID, ACL, and `umask` Experiments

Prove SGID:

```bash
sudo -u eng1 -- touch /srv/aerotech/engineering/sgid_test.txt
stat -c '%U %G %A %a %n' /srv/aerotech/engineering/sgid_test.txt
```

The group is `engineering` even though the user's primary group is private.

Test restrictive `umask`:

```bash
sudo -u eng1 -- bash -c "umask 0077; touch /srv/aerotech/engineering/umask_0077.txt"
stat -c '%A %a %U %G %n' /srv/aerotech/engineering/umask_0077.txt
getfacl -p /srv/aerotech/engineering/umask_0077.txt
sudo -u eng2 -- bash -c "printf '%s\n' 'eng2 collaboration test' >> /srv/aerotech/engineering/umask_0077.txt"
```

The peer append should succeed through the inherited ACL.

Demonstrate SGID alone in a disposable path:

```bash
sudo install -d -o root -g engineering -m 2770 /tmp/sgid-only-demo
sudo -u eng1 -- bash -c 'umask 0022; touch /tmp/sgid-only-demo/file.txt'
stat -c '%A %a %U %G %n' /tmp/sgid-only-demo/file.txt
sudo -u eng2 -- bash -c "printf 'peer update\n' >> /tmp/sgid-only-demo/file.txt"
```

The group inherits, but the peer write normally fails. Group identity inheritance and permission inheritance are separate.

After verifying the exact literal path, remove this disposable directory:

```bash
sudo rm -rf -- /tmp/sgid-only-demo
```

Demonstrate the ACL mask on a disposable file:

```bash
sudo cp --preserve=all /srv/aerotech/engineering/aircraft_design.txt /srv/aerotech/engineering/acl_mask_demo.txt
sudo setfacl -m m::r-- /srv/aerotech/engineering/acl_mask_demo.txt
getfacl -p /srv/aerotech/engineering/acl_mask_demo.txt
sudo -u eng2 -- bash -c "printf 'update\n' >> /srv/aerotech/engineering/acl_mask_demo.txt"
```

The group entry may show write, but the mask reduces effective access. Restore only the demo:

```bash
sudo setfacl -m m::rw- /srv/aerotech/engineering/acl_mask_demo.txt
```

Teach that some `chmod` operations recalculate the ACL mask and can unexpectedly change effective ACL rights.

## 12. Repeatable Validation Script

The following reference script checks the foundation. Students should expand it to all 20 acceptance tests.

```bash
#!/usr/bin/env bash
set -Eeuo pipefail
failures=0
pass() { printf 'PASS | %s\n' "$1"; }
fail() { printf 'FAIL | %s\n' "$1"; failures=$((failures + 1)); }

for group in engineering flightops qualityassurance research maintenance it; do
  getent group "$group" >/dev/null && pass "group $group" || fail "missing group $group"
done

for user in eng1 eng2 eng3 flight1 flight2 flight3 qa1 qa2 qa3 rd1 rd2 rd3 maint1 maint2 maint3 it1 it2 it3; do
  id "$user" >/dev/null 2>&1 && pass "user $user" || fail "missing user $user"
done

check_dir() {
  path=$1
  expected_group=$2
  test -d "$path" || { fail "$path missing"; return; }
  test "$(stat -c '%U' "$path")" = root && pass "$path owner" || fail "$path owner"
  test "$(stat -c '%G' "$path")" = "$expected_group" && pass "$path group" || fail "$path group"
  test "$(stat -c '%a' "$path")" = 2770 && pass "$path mode" || fail "$path mode"
  getfacl -cp "$path" | grep -qx 'default:other::---' && pass "$path default ACL" || fail "$path default ACL"
}

check_dir /srv/aerotech/engineering engineering
check_dir /srv/aerotech/flight_operations flightops
check_dir /srv/aerotech/quality_assurance qualityassurance
check_dir /srv/aerotech/research_development research
check_dir /srv/aerotech/maintenance maintenance
check_dir /srv/aerotech/it it

sudo -u eng1 -- test -r /srv/aerotech/engineering/aircraft_design.txt && pass 'eng1 authorised read' || fail 'eng1 authorised read'
if sudo -u eng1 -- test -r /srv/aerotech/research_development/prototype_notes.txt; then fail 'eng1 Research denial'; else pass 'eng1 Research denial'; fi

printf 'SUMMARY | failures=%d\n' "$failures"
exit "$failures"
```

Key lessons:

- expected denials must be handled deliberately with `set -e`;
- a failed control must produce a non-zero script exit;
- use `stat`, `id`, and `getent` rather than parsing presentation-oriented `ls` output.

## 13. Audit Security-Relevant Activity

Create `/etc/audit/rules.d/aerotech.rules` with:

```text
-w /srv/aerotech -p wa -k aerotech_file_activity
```

Meaning:

- `-w` watches the path;
- `w` records writes;
- `a` records attribute changes;
- `-k` assigns a searchable key.

Load and verify:

```bash
sudo augenrules --load
sudo auditctl -l | grep aerotech
sudo systemctl status auditd --no-pager
```

Generate an authorised event:

```bash
sudo -u eng1 -- touch /srv/aerotech/engineering/audit_authorised.txt
sudo ausearch -k aerotech_file_activity -ts recent -i
```

Generate a denied attempt:

```bash
sudo -u eng1 -- touch /srv/aerotech/research_development/audit_denied.txt
sudo ausearch -k aerotech_file_activity -ts recent -i
```

Path watches do not necessarily answer every failed-access question. A denial can occur before the watched inode operation produces the evidence expected. Validate telemetry against the intended investigation rather than assuming “audit enabled” means complete visibility.

Review time, executable, audit user, effective user, path, syscall result, and key. Production environments should forward logs to a protected central collector because a compromised local root can alter local evidence.

Export from an approved evidence directory:

```bash
sudo ausearch -k aerotech_file_activity -ts today --raw > aerotech-audit-export.log
sha256sum aerotech-audit-export.log
```

Review exports for sensitive data before publication.

## 14. Joiner, Mover, and Leaver

### 14.1 Joiner

```bash
sudo adduser --disabled-password --gecos 'Temporary AeroTech trainee' engtemp
sudo usermod -aG engineering engtemp
id engtemp
sudo -u engtemp -- test -r /srv/aerotech/engineering/aircraft_design.txt
```

For a temporary account, set an instructor-approved future expiry:

```bash
sudo chage -E 2026-12-31 engtemp
sudo chage -l engtemp
```

Do not copy the example date after it has passed.

### 14.2 Mover

```bash
sudo gpasswd -d engtemp engineering
sudo usermod -aG qualityassurance engtemp
id engtemp
```

Test in a new process context:

```bash
sudo -u engtemp -- test -r /srv/aerotech/engineering/aircraft_design.txt
echo "Engineering exit: $?"
sudo -u engtemp -- test -r /srv/aerotech/quality_assurance/inspection_report.txt
echo "QA exit: $?"
```

Engineering must be denied; QA must succeed.

### 14.3 Leaver

```bash
sudo usermod -L engtemp
sudo chage -E 0 engtemp
sudo passwd -S engtemp
```

Locking affects new password authentication. It does not terminate an existing shell or rewrite a running process's groups.

```bash
pgrep -a -u engtemp
loginctl list-sessions
```

After approval and evidence preservation:

```bash
sudo loginctl terminate-user engtemp
```

Do not immediately delete an account that owns files. Unmapped numeric ownership harms accountability. Archive, reassign, or retain identity history according to policy.

## 15. Metadata-Aware Backup and Recovery

A simplistic copy can lose UID/GID ownership, modes, SGID, ACLs, extended attributes, timestamps, and hard links.

Create protected backup storage:

```bash
sudo install -d -o root -g root -m 0700 /var/backups/aerotech
stamp=$(date -u +'%Y%m%dT%H%M%SZ')
sudo tar --acls --xattrs --numeric-owner -cpf "/var/backups/aerotech/aerotech-$stamp.tar" -C /srv aerotech
sudo sha256sum "/var/backups/aerotech/aerotech-$stamp.tar"
sudo tar -tvf "/var/backups/aerotech/aerotech-$stamp.tar" | head
```

Export ACLs for human review:

```bash
sudo getfacl -R -p /srv/aerotech > "/var/backups/aerotech/aerotech-$stamp.acl"
sudo sha256sum "/var/backups/aerotech/aerotech-$stamp.acl"
```

Restore outside the live path:

```bash
sudo install -d -o root -g root -m 0711 /srv/aerotech-recovery
sudo tar --acls --xattrs --numeric-owner -xpf "/var/backups/aerotech/aerotech-$stamp.tar" -C /srv/aerotech-recovery
```

The restored tree is `/srv/aerotech-recovery/aerotech` because the archive contains the top-level `aerotech` directory. Mode `0711` on the recovery parent permits ordinary-user known-path testing without exposing its listing. Mode `0700` would make every ordinary-user recovery test fail at the parent, regardless of the restored department permissions.

Compare metadata:

```bash
sudo find /srv/aerotech -printf '%P|%m|%u|%g|%y\n' | sort > /tmp/aerotech-live-metadata.txt
sudo find /srv/aerotech-recovery/aerotech -printf '%P|%m|%u|%g|%y\n' | sort > /tmp/aerotech-restored-metadata.txt
diff -u /tmp/aerotech-live-metadata.txt /tmp/aerotech-restored-metadata.txt
sudo getfacl -p /srv/aerotech-recovery/aerotech/engineering
```

Test restored access:

```bash
sudo -u eng1 -- cat /srv/aerotech-recovery/aerotech/engineering/aircraft_design.txt
if sudo -u eng1 -- cat /srv/aerotech-recovery/aerotech/research_development/prototype_notes.txt; then echo 'FAIL: restored Research exposed'; else echo 'PASS: restored Research denied'; fi
```

Recovery passes only when authorised availability and unauthorised denial are both preserved.

## 16. Incident Response Method

Preserve facts before repair:

```bash
date --iso-8601=seconds
hostname
sudo find /srv/aerotech -maxdepth 2 -printf '%m %u %g %p\n' | sort
sudo getfacl -R -p /srv/aerotech > aerotech-incident-acl.txt
sudo ausearch -k aerotech_file_activity -ts today -i > aerotech-incident-audit.txt
sha256sum aerotech-incident-acl.txt aerotech-incident-audit.txt
```

Ask:

1. Which identity or group obtained access?
2. Was access caused by membership, mode, ACL, mask, path, ownership, or privilege?
3. When did metadata change?
4. Which files were readable, writable, renamed, or deleted?
5. Did a stale session retain old groups?
6. Did copy or recovery strip metadata?
7. Which facts are supported by evidence?
8. What cannot be concluded?

Contain with the smallest safe action: suspend an actively misused identity, remove the specific membership, terminate stale sessions after preservation, correct the specific metadata fault, restore affected data, and run regression tests.

Never begin with `chmod -R 777`, indiscriminate recursive ownership changes, log deletion, or premature account deletion.

## 17. Instructor Inject Solutions

### Inject A - Accidental cross-membership

Reference setup:

```bash
sudo usermod -aG research eng1
```

Expected response: detect with `id` and `getent`, evaluate the exposure window, remove only the unauthorised role using `sudo gpasswd -d eng1 research`, handle stale sessions, and retest Engineering success plus Research denial. Membership proves potential access, not that every file was read.

### Inject B - Group inheritance failure

Reference setup:

```bash
sudo chmod g-s /srv/aerotech/maintenance
sudo -u maint1 -- touch /srv/aerotech/maintenance/inheritance_fault.txt
```

Expected response: inspect the exact parent, distinguish SGID from ACL, restore SGID, correct the affected file group through change control, and create a new file to prove inheritance. Moving and copying can behave differently from creation.

### Inject C - Collaboration failure

```bash
sudo setfacl -m m::r-- /srv/aerotech/engineering/component_specs.txt
```

Expected response: `getfacl` reveals the restrictive mask and effective rights. Restore the intended mask on the specific file, identify why it changed, test peer append, and retain cross-department denial.

### Inject D - Excessive permission

```bash
sudo chmod 2777 /srv/aerotech/flight_operations
```

Expected response: preserve evidence, determine exposure, restore `2770` plus approved ACLs, and rerun both positive and negative tests.

### Inject E - ACL mask change

Use the Phase Eleven demo. The student must explain why `group::rw-` can be effectively read-only when `mask::r--` is present.

### Inject F - Leaver still has access

Begin a session before revocation. The correct conclusion is that process credentials are established at session creation. Account locking controls new authentication, not existing processes.

### Inject G - Incomplete recovery

Create a copy without ACL preservation. Students compare `stat` and `getfacl`, reject the incomplete recovery, use a metadata-aware archive, and rerun access tests.

### Inject H - Privileged access concern

Students must recognise root bypass, preserve sudo/audit evidence, validate authorisation, and recommend separate admin identities, MFA, least-privilege sudo, central logs, approvals, and reviews. Mode bits cannot stop unrestricted root.

## 18. Troubleshooting Decision Guide

| Symptom | Questions | Evidence |
|---|---|---|
| User cannot reach authorised path | Does every parent allow traversal? Is the group active in this session? | `namei -l`, `id`, `stat` |
| Correct group but peer cannot write | What are mode, ACL, and mask? | `stat`, `getfacl` |
| New file has private group | Is SGID set on the exact parent? Was the file moved or copied? | `namei -l`, `stat` |
| ACL looks correct but access fails | Does the mask reduce effective rights? | `getfacl` |
| Removed user still has access | Is an old session or process running? | `id`, `pgrep -u`, `loginctl` |
| Negative test succeeds | Cross-membership, named ACL, `other`, sudo, or wrong identity? | `id`, `getfacl`, `sudo -l` |
| Restored data is exposed | Did restore preserve owner, mode, SGID, and ACL? | `tar -tvf`, `stat`, `getfacl` |
| Audit search is empty | Was the rule loaded before the event? Is time/key correct? | `auditctl -l`, `ausearch`, service status |

Follow the kernel decision path: process identity, every path component, inode owner/group, mode/ACL, mask, and privilege. Do not troubleshoot by random `chmod` commands.

## 19. Acceptance Test Reference

| ID | Required proof |
|---|---|
| AT-01 | Six groups exist; duplicate-GID query is empty |
| AT-02 | Eighteen users exist; duplicate-UID query is empty |
| AT-03 | `id -nG` matches the approved matrix |
| AT-04 | All six paths exist under `/srv/aerotech` |
| AT-05 | Known authorised traversal works; parent listing and unauthorised paths fail |
| AT-06 | Department paths show `root` plus matching group |
| AT-07 | No department content grants `other` access |
| AT-08 | Department directories and new subdirectories retain SGID |
| AT-09 | Ordinary-user files inherit department group |
| AT-10 | A colleague modifies a peer-created file |
| AT-11 | `umask 0077` experiment retains approved collaboration |
| AT-12 | Representative list/read tests pass for six departments |
| AT-13 | Representative create/update/subdirectory tests pass |
| AT-14 | Every cross-department read test fails |
| AT-15 | Cross-department create/modify/rename/delete tests fail |
| AT-16 | Twelve-file inventory matches content, owner, group, mode, and ACL |
| AT-17 | Audit rule is loaded and a test event is interpreted |
| AT-18 | Mover loses old access; leaver cannot authenticate anew |
| AT-19 | Restore preserves data, IDs, modes, SGID, ACLs, success, and denial |
| AT-20 | Final traceability links requirements to evidence and residual risk |

## 20. Misconfiguration Scans

Find world-readable or world-writable content:

```bash
sudo find /srv/aerotech -mindepth 1 \( -perm -0004 -o -perm -0002 \) -printf '%M %u %g %p\n'
```

Expected: no output. Assess the parent `/srv/aerotech` separately because its deliberate `other` execute bit permits known-path traversal.

Find wrong groups:

```bash
sudo find /srv/aerotech/engineering ! -group engineering -printf '%p %u %g\n'
sudo find /srv/aerotech/flight_operations ! -group flightops -printf '%p %u %g\n'
sudo find /srv/aerotech/quality_assurance ! -group qualityassurance -printf '%p %u %g\n'
sudo find /srv/aerotech/research_development ! -group research -printf '%p %u %g\n'
sudo find /srv/aerotech/maintenance ! -group maintenance -printf '%p %u %g\n'
sudo find /srv/aerotech/it ! -group it -printf '%p %u %g\n'
```

Find missing SGID:

```bash
sudo find /srv/aerotech -mindepth 1 -type d ! -perm -2000 -printf 'MISSING SGID: %p\n'
```

## 21. Evidence Package

Every record should contain:

```text
Evidence ID: AERO-AT10-001
Collector: student or team
Host: authorised lab hostname
Time: ISO 8601 with timezone
Purpose: prove peer write to a colleague-created file
Command: exact command
Expected: result and exit status
Actual: output and exit status
Interpretation: what it proves and what it does not prove
Integrity: evidence path and SHA-256 where appropriate
```

Terminal recording can help:

```bash
script --log-out aerotech-test-session.txt
date --iso-8601=seconds
sha256sum aerotech-test-session.txt
```

`script` can capture secrets. Never type passwords or sensitive data while recording.

## 22. Common Wrong Solutions

### `chmod 777`

It destroys isolation by granting every local user access.

### Only `chgrp`

Correct group ownership does not grant access when mode or ACL denies it.

### Only SGID

SGID assigns the group; it does not guarantee collaborative write.

### Only a permissive `umask`

Relying on every shell setting is fragile and does not express policy at the shared directory.

### Testing only as root

Root success says nothing useful about ordinary-user isolation.

### Testing only successful reads

Professional assurance requires negative read/write tests, peer collaboration, lifecycle tests, audit validation, and recovery.

### Recursive repair before investigation

Broad `chmod -R` or `chown -R` can destroy special modes, ACL masks, intended exceptions, and evidence.

### Calling permissions encryption

Modes and ACLs are access-control metadata. They do not encrypt file contents at rest.

## 23. Production Hardening Discussion

A real aerospace environment would additionally require evaluation of:

- central identity such as LDAP or Active Directory integration;
- MFA and separate privileged accounts;
- least-privilege sudo policy;
- encrypted storage and controlled keys;
- protected central audit collection;
- tested off-host backup and recovery objectives;
- endpoint detection, data-loss prevention, and egress controls;
- AppArmor or SELinux where justified;
- file-integrity monitoring;
- periodic access certification;
- dedicated cross-department project groups;
- applicable legal, contractual, and regulatory requirements.

This lab does not prove production compliance.

## 24. Six-Day Teaching Sequence

### Day 1 - Identity and threat model

Teach UID/GID, primary/supplementary groups, scope, classification, and baseline. Students design the matrix before provisioning.

### Day 2 - Permission mechanics

Demonstrate file versus directory `rwx`, parent traversal, owner/group/other selection, and why `777` is dangerous.

### Day 3 - SGID, ACLs, and collaboration

Build the hierarchy. Compare SGID-only with SGID plus default ACL. Demonstrate `umask` and ACL masks.

### Day 4 - Positive and negative validation

Students capture exit codes, automate tests, and diagnose membership or ACL faults.

### Day 5 - Audit and identity lifecycle

Configure auditd, discuss telemetry limits, and run joiner/mover/leaver exercises including stale sessions.

### Day 6 - Recovery and incident defence

Restore outside the live path, compare metadata, respond to an inject, deliver the executive summary, and defend decisions.

## 25. Reference Executive Summary

```text
AeroTech's lab file service was redesigned around unique identities and six
department groups. Each department uses a root-managed directory with
group-restricted access, SGID group inheritance, and default ACLs for
predictable collaboration. Ordinary users were tested for authorised read and
write access and for denial of cross-department listing, reading, creation,
modification, rename, and deletion.

Security-relevant changes are auditable in the lab, identity lifecycle changes
were tested, and a metadata-aware backup was restored outside the live path.
The restore retained ownership, modes, SGID, ACLs, authorised access, and
unauthorised denial.

The solution is approved for isolated training. It is not approved for a
production aerospace environment without central identity, MFA, encryption,
protected central logging, privileged-access governance, resilient backups,
and formal assurance.
```

## 26. Authoritative Technical References

- [Linux ACL access algorithm and default ACL creation](https://man7.org/linux/man-pages/man5/acl.5.html)
- [Linux `umask` interaction with default ACLs](https://man7.org/linux/man-pages/man2/umask.2.html)
- [Ubuntu `adduser` account options](https://manpages.ubuntu.com/manpages/noble/man8/addgroup.8.html)
- [Ubuntu `auditctl` watches and permission filters](https://manpages.ubuntu.com/manpages/jammy/man8/auditctl.8.html)
- [GNU tar ACL and extended-attribute preservation](https://www.gnu.org/software/tar/manual/tar.html)

Always use documentation matching the installed Ubuntu, adduser, audit, ACL, and GNU tar versions.

## 27. Cleanup and Final Checks

1. Stop terminal recording.
2. Preserve and hash required evidence.
3. Remove only approved disposable demo files.
4. Retain the final tree if required for assessment.
5. Review audit and backup retention.
6. Lock temporary accounts.
7. Run the complete acceptance suite.

```bash
sudo find /srv/aerotech -maxdepth 2 -printf '%M %u %g %p\n' | sort
sudo auditctl -l | grep aerotech
sudo systemctl --failed
sudo find /srv/aerotech -mindepth 1 \( -perm -0004 -o -perm -0002 \) -print
```

The goal is not memorising `chmod`. Students must predict the kernel's decision, design inheritance deliberately, verify success and denial, preserve evidence, and recover without weakening security.
