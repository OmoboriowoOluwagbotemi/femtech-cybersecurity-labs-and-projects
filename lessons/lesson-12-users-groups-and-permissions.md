# Lesson 12: Users, Groups and Permissions

## Lesson Overview

Linux access control begins with identities, groups, ownership, permissions, and controlled privilege elevation. Administrators must provide enough access for work while preventing unauthorized disclosure, modification, execution, and system administration.

This lesson covers user management, groups, `chmod`, `chown`, access control lists (ACLs), `sudoers`, and ownership. It builds on Lesson 11 without repeating basic filesystem navigation.

## Learning Objectives

Students will be able to:

- Explain Linux user and group identities.
- Distinguish root, regular, system, and service accounts.
- Create, modify, lock, and retire lab accounts safely.
- Manage primary and supplementary group membership.
- Interpret and modify symbolic and numeric permissions.
- Change file ownership with `chown` and `chgrp`.
- Apply and troubleshoot POSIX ACLs.
- Explain special permission bits and shared-directory behavior.
- Configure least-privilege `sudoers` rules using safe validation.
- Audit access and identify excessive privilege.

## Prerequisite Knowledge

Students should understand Linux paths, files, processes, basic permissions, root, and `sudo` from Lesson 11. Use an instructor-approved VM on host-only networking with a clean snapshot.

## Enterprise Relevance

Linux accounts and permissions protect web servers, databases, cloud workloads, security tools, development systems, and network appliances. Weak access control can expose keys, customer records, logs, backups, or administrative functions.

## 1. Linux Identity

### What

A Linux identity is represented primarily by a numeric user identifier (UID). Groups are represented by group identifiers (GIDs).

### Why

The kernel makes access decisions using numeric identities and permissions. Usernames and group names provide human-readable mappings.

### How

Local identity information is commonly represented through:

- `/etc/passwd`: account identity and basic account fields.
- `/etc/shadow`: protected password-hash and aging information.
- `/etc/group`: group definitions and memberships.
- `/etc/gshadow`: protected group administration data.

### Where

Identities may be local or supplied through centralized services such as LDAP, Active Directory integration, or other identity sources.

Never edit identity databases casually. Use approved account-management tools.

## 2. Account Types

| Account Type | Purpose | Security Concern |
|---|---|---|
| Root | Unrestricted system administration | Compromise has system-wide impact |
| Regular user | Human interactive work | Must receive only required access |
| System account | Operating-system function | Usually should not allow interactive login |
| Service account | Runs an application or service | Limit shell, permissions, and credential use |
| Shared account | Used by multiple people | Weak accountability; generally avoid |

The root account normally has UID `0`. Any account assigned UID `0` has root-equivalent identity regardless of username.

## 3. Account Information

Useful read-only commands:

```bash
whoami
id
groups
getent passwd username
getent group groupname
last
lastlog
```

`getent` is useful because it can query the system's configured identity sources rather than only local files.

An `/etc/passwd` entry contains colon-separated fields:

```text
username:x:UID:GID:comment:home:shell
```

The `x` indicates that password information is stored separately, commonly in `/etc/shadow`.

## 4. User Management

### What

User management controls account creation, attributes, authentication status, group assignment, and retirement.

### Why

Accounts must match an approved identity and business need throughout their lifecycle.

### How

Common tools include:

```bash
sudo useradd -m -s /bin/bash analyst1
sudo passwd analyst1
sudo usermod -c "SOC Analyst" analyst1
sudo usermod -L analyst1
sudo usermod -U analyst1
sudo userdel analyst1
```

Some distributions provide higher-level tools such as `adduser`.

### Where

Local users are appropriate for limited standalone needs. Enterprises often centralize workforce identity while retaining controlled local emergency or service accounts.

### Lifecycle

1. Approved request.
2. Identity verification.
3. Account creation.
4. Role and group assignment.
5. Periodic access review.
6. Modification when duties change.
7. Immediate disablement when access is no longer required.
8. Data transfer and account retirement.

### Locking Versus Deleting

Locking an account prevents normal password authentication but may not terminate active sessions, remove SSH keys, revoke tokens, stop scheduled jobs, or disable every authentication method.

Offboarding may require:

- Terminating sessions and processes.
- Removing SSH keys and certificates.
- Disabling centralized identity.
- Reviewing cron jobs and owned files.
- Transferring business data.
- Revoking application and cloud access.

## 5. Password Aging

```bash
sudo chage -l analyst1
sudo chage -M 90 -m 1 -W 14 analyst1
sudo passwd -e analyst1
```

| Setting | Meaning |
|---|---|
| Maximum age | Time before password expiration |
| Minimum age | Minimum time before another change |
| Warning period | Advance expiration notice |
| Inactive period | Time after expiration before disablement |
| Account expiration | Date after which account is disabled |

Password-aging policy must match organizational standards and current identity strategy. MFA, compromised-password screening, and strong recovery processes remain important.

## 6. Groups

### What

A group is a collection of identities used to assign access.

### Why

Group-based access is more scalable and auditable than assigning permissions separately to every user.

### How

Each user has a primary group and may have supplementary groups.

```bash
sudo groupadd security
sudo usermod -aG security analyst1
groups analyst1
getent group security
sudo gpasswd -d analyst1 security
```

The `-aG` combination appends supplementary groups. Using `-G` without `-a` can replace existing supplementary memberships.

### Where

Groups control access to files, devices, logs, administrative commands, containers, and application resources.

Group changes may not affect an existing session until the user signs in again or starts a session with updated credentials.

## 7. Ownership

### What

Linux filesystem objects normally have an owning user and owning group.

### Why

Ownership determines which user and group permission sets apply.

### How

```bash
ls -l report.txt
sudo chown analyst1 report.txt
sudo chown analyst1:security report.txt
sudo chgrp security report.txt
```

### Where

Ownership applies to regular files, directories, links, devices, sockets, and other objects.

### Recursive Changes

```bash
sudo chown -R analyst1:security /approved/path
```

Recursive ownership changes can damage services or expose data. Verify the exact path, expected scope, links, mount boundaries, and service requirements first.

## 8. chmod

### What

`chmod` changes permission mode bits.

### Why

It controls read, write, and execute access for owner, group, and others.

### How

Symbolic examples:

```bash
chmod u+x script.sh
chmod g-w report.txt
chmod o-rwx secrets.txt
chmod g=rx shared-tool
```

Numeric examples:

```bash
chmod 600 private.key
chmod 640 report.txt
chmod 750 scripts
```

### Where

Use `chmod` on files and directories that the administrator is authorized to manage.

### Least-Privilege Examples

| Resource | Example Mode | Reason |
|---|---:|---|
| Private key | `600` | Owner read/write only |
| Shared report | `640` | Owner writes, group reads |
| Private directory | `700` | Owner-only access |
| Team directory | `2770` | Group collaboration with setgid inheritance |
| Executable script | `750` | Owner and approved group execute |

Requirements vary. A mode is not secure merely because it is restrictive; the service must still function and ownership must be correct.

## 9. Special Permission Bits

### setuid

On an executable file, setuid causes execution with the file owner's effective identity.

### setgid

On an executable, setgid uses the file's group identity. On a directory, new entries inherit the directory's group, supporting collaboration.

### Sticky Bit

On a shared writable directory, the sticky bit restricts deletion or renaming so users generally cannot remove files owned by others.

| Bit | Symbolic Example | Numeric Prefix |
|---|---|---:|
| setuid | `rws` in owner execute position | 4 |
| setgid | `rws` in group execute position | 2 |
| sticky | `t` in other execute position | 1 |

Examples:

```bash
chmod 2770 teamshare
chmod 1777 shared-temp
```

World-writable directories without appropriate protections create significant risk. setuid and setgid executables require careful inventory and review.

## 10. Default Permissions and umask

### What

`umask` removes permission bits from the default modes requested when new files and directories are created.

### Why

Secure defaults reduce accidental exposure.

### How

```bash
umask
umask 027
```

Common starting maximums are `666` for files and `777` for directories. With umask `027`, typical results are:

- Files: `640`.
- Directories: `750`.

The exact result also depends on the creating application and filesystem.

### Where

Umask can be configured in shells, service definitions, application settings, and system policy.

## 11. Access Control Lists

### What

POSIX ACLs provide permissions for additional named users and groups beyond the traditional owner, group, and other entries.

### Why

ACLs support exceptions without changing primary ownership or creating excessive groups.

### How

```bash
getfacl report.txt
setfacl -m u:auditor:r-- report.txt
setfacl -m g:security:rw- report.txt
setfacl -x u:auditor report.txt
```

Default ACL on a directory:

```bash
setfacl -m d:g:security:rwx teamshare
```

### Where

ACLs are useful for project directories, shared reports, applications, and temporary access exceptions.

## 12. ACL Mask

The ACL mask limits the effective permissions of named users, named groups, and the owning group, except the owning user and others.

Example output:

```text
user::rw-
user:auditor:r--
group::r--
group:security:rw-
mask::r--
other::---
```

Although `security` requests `rw-`, the mask limits effective access to `r--`.

Troubleshooting should inspect:

- Parent-directory traversal.
- Traditional mode bits.
- ACL entries.
- ACL mask.
- Identity and current groups.
- Filesystem mount options.
- Mandatory access controls such as SELinux or AppArmor.

## 13. ACL and Traditional Permission Comparison

| Feature | Traditional Mode | ACL |
|---|---|---|
| Named owner | One | One |
| Named group | One owning group | Owning group plus named groups |
| Additional users | Not directly | Supported |
| Simplicity | High | More complex |
| Audit need | Moderate | Higher due to hidden exceptions |

A `+` after permission characters in some `ls -l` output indicates extended ACL information.

## 14. sudo and sudoers

### What

`sudo` allows an authorized user to execute specified commands with another identity, commonly root.

### Why

It supports controlled privilege elevation, accountability, and separation between routine and administrative work.

### How

Rules are defined in `/etc/sudoers` and included files, commonly under `/etc/sudoers.d/`.

Always validate edits with:

```bash
sudo visudo
sudo visudo -c
```

Example concept:

```text
%webops ALL=(root) /usr/bin/systemctl restart approved-web.service
```

This permits members of `webops` to run the specified command. Exact command paths and arguments must be designed carefully.

### Where

`sudo` is used for server administration, support operations, automation, and controlled emergency access.

## 15. sudoers Security

Avoid:

- `ALL` command access without genuine administrative need.
- Broad wildcard patterns.
- Allowing editors, shells, interpreters, or commands that can escape to a shell.
- Unrestricted environment-variable preservation.
- `NOPASSWD` without risk assessment.
- Direct editing that can leave invalid syntax.

Apply:

- Least privilege.
- Group-based assignment.
- Full executable paths.
- Command and argument review.
- Central logging.
- Periodic access review.
- Separate administrative accounts where appropriate.
- Removal when duties change.

A narrowly named command may still provide root access indirectly if it loads attacker-controlled configuration, scripts, plugins, environment values, or files.

## 16. Permission Decision Process

1. Identify the asset and owner.
2. Identify required users and actions.
3. Prefer role-based group access.
4. Set ownership.
5. Apply minimal traditional permissions.
6. Use ACLs only for justified exceptions.
7. Validate with the actual user identity.
8. Record the change.
9. Monitor and review.

## 17. Auditing Users and Access

Useful commands:

```bash
getent passwd
getent group
id username
find / -xdev -perm -4000 2>/dev/null
find /approved/path -xdev -type f -perm /002
getfacl file
sudo -l -U username
```

Run broad searches only with authorization and consideration for system load. Findings require context:

- A setuid file may be legitimate.
- A service account may intentionally lack a login shell.
- A world-readable file may contain public data.
- A group may grant indirect administrative power.

## 18. Enterprise Scenarios

### Small Business

A departed administrator's local account remains in the `sudo` group. The company disables it, terminates sessions, reviews commands and SSH keys, transfers files, and improves offboarding.

### Financial Institution

A private key is group-writable. Security corrects ownership and mode, checks whether the group modified it, rotates the key if integrity cannot be established, and repairs deployment automation.

### Healthcare Organization

A clinical support team needs read-only access to selected logs. A dedicated group and controlled ACL provide access without granting root.

### University

A shared project directory uses setgid so new files inherit the research group. The sticky bit or carefully designed group permissions prevent inappropriate deletion.

### Government Agency

A sudoers rule permits a support group to run a text editor as root. Because the editor can launch a shell, the rule is treated as root-equivalent and removed.

### Cloud Environment

A service account with an interactive shell and SSH key is compromised. The team disables interactive access, rotates credentials, reviews owned files and cloud actions, and moves to a managed workload identity.

## 19. Troubleshooting Access Denied

Use a structured approach:

1. Confirm the exact identity with `id`.
2. Confirm the full resolved path.
3. Check ownership and mode with `ls -ld`.
4. Check every parent directory for execute permission.
5. Inspect ACLs and mask with `getfacl`.
6. Confirm group changes reached the current session.
7. Check mount options.
8. Check SELinux or AppArmor denials.
9. Check application-specific controls.
10. Apply the smallest justified change.

Do not respond to access errors with `chmod 777`.

## 20. Security Operations

Suspicious identity and permission events include:

- New UID `0` account.
- Unexpected sudo-group membership.
- New SSH key.
- Password or account lock change.
- New setuid executable.
- World-writable sensitive file.
- ACL granting unexpected access.
- Sudoers modification.
- Service account interactive login.
- Ownership change on security configuration.

Useful evidence includes authentication logs, auditd records, shell history where reliable, file metadata, centralized logs, EDR telemetry, and identity-system records.

## 21. Security+ SY0-701 Alignment

This lesson supports least privilege, account lifecycle, role-based access, privileged access, permissions, access reviews, secure configuration, and monitoring.

Permissions, ACLs, and `sudo` enforcement are technical controls. Provisioning, offboarding, review, and change validation are operational controls. Access-control policy is managerial and directive in function.

## 22. Permission Evaluation and Privilege Boundaries

### Access Evaluation

Traditional mode classes are not cumulative. If the process effective UID matches the file owner, the owner bits are evaluated; the kernel does not then grant additional access from the group or other bits. If the user is not the owner but matches the owning group or a relevant supplementary group, group-class permissions apply. Otherwise, other permissions apply. ACLs extend this process and the ACL mask can limit effective group-class access.

### Directory Deletion

Deleting a file changes the containing directory. A user may be able to delete a file they cannot read if they have write and execute permissions on the directory. The sticky bit adds ownership-related deletion restrictions in shared directories. This is why analysts must inspect both the object and every parent directory.

### Root Is Not the Only Privilege Path

Privilege can arise from UID `0`, sudo rules, setuid executables, file capabilities, writable service definitions, container-management groups, device access, or permission to modify code executed by a privileged process. Membership in groups such as container administration groups may be effectively root-equivalent.

### sudo Command Escapes

A rule that allows a text editor, interpreter, package manager, archive tool, or service command may permit execution of arbitrary commands. Least privilege requires evaluating what the allowed program can do, which files it can modify, which environment it inherits, and whether the user controls referenced configuration.

### Central Identity

`/etc/passwd` and `/etc/group` may not contain every enterprise identity. Name Service Switch configuration can resolve users and groups from local files, LDAP, Active Directory integration, or other sources. `getent` is therefore generally more representative than reading local files alone.

## 23. Classroom Hands-On Practical

### Practical Title

Build and Audit a Least-Privilege Team Directory

### Safety

Use an instructor-approved VM snapshot. Create only fictional lab users. Do not change production accounts or the instructor's administrative access.

### Scenario

Create:

- Group `soclab`.
- Users `analyst1` and `analyst2`.
- Directory `/srv/soclab`.
- Read-only exception for fictional user `auditor1`.

### Tasks

1. Create users and group.
2. Add analysts with `usermod -aG`.
3. Set directory owner to `root:soclab`.
4. Apply mode `2770`.
5. Create a report as one analyst.
6. Verify group inheritance.
7. Grant `auditor1` read and traversal through ACLs.
8. Inspect ACL and mask.
9. Test allowed and denied actions as each user.
10. Lock `analyst2` and explain what additional offboarding steps remain.
11. Validate account and permission evidence.

### Evidence Table

| Identity | Expected Read | Expected Write | Expected Delete | Actual |
|---|---|---|---|---|
| analyst1 | Yes | Yes | According to directory design |  |
| analyst2 | Yes before lock | Yes before lock | According to directory design |  |
| auditor1 | Yes | No | No |  |
| unrelated user | No | No | No |  |

### Rollback

Remove only instructor-approved lab accounts, group, ACLs, and directory, or revert the snapshot.

## 24. Take-Home Practical

Design a Linux access-control standard containing:

- Account categories.
- Joiner, mover, and leaver workflow.
- Group naming and ownership rules.
- File and directory permission baselines.
- ACL approval and review.
- setuid, setgid, and sticky-bit review.
- Sudoers design and validation.
- Service-account restrictions.
- Ten audit checks.
- Incident response for unexpected privilege.

## 25. Assessment Questions

### Multiple Choice

1. Which value identifies a Linux user to the kernel?
   A. UID
   B. PID
   C. Port
   D. Hash only

2. Which command safely appends a supplementary group?
   A. `usermod -aG group user`
   B. `chmod 777 user`
   C. `kill user`
   D. `rm /etc/group`

3. What does `chown user:group file` change?
   A. User and group ownership
   B. Password age
   C. Process state
   D. Package source

4. What does setgid on a directory commonly provide?
   A. New entries inherit the directory group
   B. Everyone becomes root
   C. Files are encrypted
   D. Accounts expire

5. What does the sticky bit protect in a shared writable directory?
   A. Deletion or renaming of other users' entries
   B. Network traffic
   C. Password hashes
   D. Package signatures

6. What can limit effective named ACL permissions?
   A. ACL mask
   B. PID
   C. DNS resolver
   D. Hypervisor

7. Which tool should validate sudoers changes?
   A. `visudo`
   B. `grep` only
   C. `touch`
   D. `ping`

8. Why may locking an account be insufficient?
   A. Active sessions and SSH keys may remain
   B. It deletes all files
   C. It grants root
   D. It removes every process automatically

9. Which finding is most serious?
   A. Unexpected account with UID 0
   B. User with a home directory
   C. Group with a name
   D. File owned by its creator

10. Which is an operational control?
    A. Quarterly access review
    B. ACL enforcement code
    C. Permission bit
    D. Kernel UID check

### Short Answer

1. Distinguish root, regular, system, and service accounts.
2. Explain primary and supplementary groups.
3. Compare `chmod`, `chown`, and `chgrp`.
4. Explain setuid, setgid, and sticky bit.
5. Describe how umask affects defaults.
6. Explain ACL mask behavior.
7. List five sudoers security practices.
8. Describe complete account offboarding.

### Scenario Questions

1. A support account receives unrestricted `sudo ALL`. Assess and redesign access.
2. A named ACL shows write access, but the user can only read. Troubleshoot.
3. A departed user still has processes, SSH keys, and owned cron jobs. Respond.
4. A private key becomes group-writable. Describe investigation and remediation.

## 26. Glossary

| Term | Definition |
|---|---|
| ACL | Extended permissions for additional named users and groups. |
| ACL Mask | Maximum effective permissions for selected ACL classes. |
| GID | Numeric group identifier. |
| Ownership | User and group association assigned to a filesystem object. |
| Primary Group | Default group associated with a user identity. |
| Service Account | Identity used to run an application or automated service. |
| setgid | Special bit affecting effective group or directory group inheritance. |
| setuid | Special bit causing execution with file-owner effective identity. |
| Sticky Bit | Directory control restricting deletion or rename of others' entries. |
| sudoers | Policy defining authorized `sudo` privilege elevation. |
| Supplementary Group | Additional group membership assigned to a user. |
| UID | Numeric user identifier. |
| umask | Mask removing permissions from application-requested defaults. |

## 27. Lesson Review Checklist

- I can manage users and groups safely.
- I can apply ownership and permissions.
- I can explain special permission bits.
- I can configure and troubleshoot ACLs.
- I can evaluate sudoers privilege.
- I can audit accounts and access.
- I can complete offboarding beyond password locking.

## 28. Continuity With Future Lessons

Lesson 13 covers Linux logging and services. Students will use identity, ownership, permission, process, and privilege knowledge to interpret authentication logs, systemd services, and scheduled activity.
