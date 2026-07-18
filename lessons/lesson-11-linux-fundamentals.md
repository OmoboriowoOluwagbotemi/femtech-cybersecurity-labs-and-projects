# Lesson 11: Linux Fundamentals

## Lesson Overview

Linux powers servers, cloud workloads, network appliances, security tools, containers, and embedded systems. Cybersecurity professionals must be able to navigate a Linux system, understand its filesystem, manage software and processes, interpret permissions, and collect reliable evidence.

This lesson covers the filesystem hierarchy, core commands, package management, process management, and file permissions. It uses an isolated VM created according to Lesson 10.

## Learning Objectives

Students will be able to:

- Explain the Linux kernel, shell, distribution, and filesystem.
- Navigate the filesystem safely.
- Create, inspect, copy, move, and remove lab files.
- Search files and text using core commands.
- Manage packages through approved repositories.
- Inspect and control processes.
- Interpret user, group, and other permissions.
- Apply safe command-line and troubleshooting practices.
- Connect Linux artifacts to enterprise security operations.

## Prerequisite Knowledge

Students should understand least privilege, attack surface, malware and persistence, logging needs, virtualization, snapshots, and host-only lab networking from previous lessons.

## Enterprise Relevance

Linux supports:

- Web, database, DNS, and email servers.
- Cloud virtual machines and containers.
- Firewalls and network appliances.
- SIEM, IDS, vulnerability, and forensic tools.
- Developer platforms and automation.

A security analyst may need to identify a suspicious process, verify a package, locate a configuration, review permissions, preserve file metadata, or explain why a service failed.

## 1. Linux Fundamentals

### What

Linux is an open-source operating-system kernel. A Linux distribution combines the kernel with system utilities, package management, libraries, services, and applications.

Examples include Ubuntu, Debian, Red Hat Enterprise Linux, Rocky Linux, AlmaLinux, Fedora, and Kali Linux.

### Why

Linux is stable, flexible, automatable, and widely used in enterprise and cloud infrastructure.

### How

Users interact through graphical tools, applications, remote services, and command-line shells such as Bash.

### Where

Linux runs on physical servers, VMs, cloud instances, containers, laptops, appliances, and embedded devices.

## 2. Kernel, Shell, and Distribution

| Component | Function |
|---|---|
| Kernel | Manages CPU, memory, devices, processes, filesystems, and system calls |
| Shell | Interprets commands and launches programs |
| Distribution | Packaged operating system built around Linux |
| Terminal | Interface through which a user interacts with a shell |
| Utility | Program performing a task, such as `ls`, `cp`, or `grep` |

The shell is not the kernel. A command may be a shell built-in, an executable file, an alias, or a function.

Useful checks:

```bash
uname -a
cat /etc/os-release
echo "$SHELL"
whoami
id
```

## 3. Linux Filesystem Model

### What

Linux presents files and directories in one hierarchy beginning at the root directory, `/`.

### Why

A predictable hierarchy helps administrators locate programs, configuration, logs, user data, and devices.

### How

Storage devices and remote filesystems are mounted at directories within the hierarchy.

### Where

Files may reside on local disks, removable media, network storage, memory-backed filesystems, container layers, or cloud volumes while appearing within one tree.

Linux is generally case-sensitive. `/etc/Hosts` and `/etc/hosts` are different paths.

## 4. Filesystem Hierarchy

| Path | Typical Purpose | Security Relevance |
|---|---|---|
| `/` | Root of the hierarchy | Starting point for all paths |
| `/bin` | Essential user commands, often linked into `/usr` | Trusted executable locations |
| `/sbin` | System administration commands, often linked into `/usr` | Privileged administration tools |
| `/etc` | System-wide configuration | Hardening, accounts, services, networking |
| `/home` | Standard user home directories | User files, shell history, SSH data |
| `/root` | Root user's home | Highly sensitive administrative data |
| `/var` | Variable data | Logs, queues, caches, databases |
| `/var/log` | System and application logs | SOC and incident evidence |
| `/tmp` | Temporary files | Common abuse and unsafe-permission risk |
| `/usr` | Applications, libraries, and shared data | Installed software |
| `/opt` | Optional or third-party software | Vendor applications |
| `/dev` | Device representations | Storage and device access |
| `/proc` | Virtual process and kernel information | Live process and system evidence |
| `/sys` | Kernel device and subsystem information | Hardware and kernel configuration |
| `/boot` | Bootloader and kernel-related files | Boot integrity |
| `/mnt` and `/media` | Mount points | External or temporary storage |

The exact layout varies by distribution and configuration.

## 5. Paths and Navigation

An **absolute path** begins at `/`. A **relative path** begins from the current working directory.

```bash
pwd
ls
ls -la
cd /var/log
cd ..
cd ~
```

Special directory references:

| Reference | Meaning |
|---|---|
| `.` | Current directory |
| `..` | Parent directory |
| `~` | Current user's home |
| `/` | Filesystem root |

Quote paths containing spaces:

```bash
cd "/home/student/Case Files"
```

Before a destructive command, verify location with `pwd` and inspect targets with `ls`.

## 6. Creating and Managing Files

```bash
touch notes.txt
mkdir evidence
mkdir -p cases/case-001
cp notes.txt evidence/
mv notes.txt notes-old.txt
rm notes-old.txt
rmdir empty-directory
```

| Command | Purpose | Safety Note |
|---|---|---|
| `touch` | Create an empty file or update timestamps | Timestamp changes can affect evidence |
| `mkdir` | Create a directory | Use clear ownership and permissions |
| `cp` | Copy files | Preserve metadata when required |
| `mv` | Move or rename | Can overwrite depending on options |
| `rm` | Remove directory entries | No standard recycle bin |
| `ln` | Create links | Understand symbolic versus hard links |

Do not practice recursive removal outside an instructor-provided directory. In forensic work, avoid modifying original evidence.

## 7. Viewing Files

```bash
cat /etc/os-release
less /var/log/example.log
head -n 20 file.txt
tail -n 20 file.txt
tail -f application.log
wc -l application.log
file suspicious.bin
stat suspicious.bin
```

`less` is usually better than `cat` for large files. `tail -f` follows appended log content but does not replace centralized log monitoring.

`file` estimates type from content patterns. Extensions alone do not establish file type.

## 8. Searching Files and Text

```bash
find /var/log -type f -name "*.log"
grep "Failed password" auth.log
grep -i -n "error" application.log
command -v ssh
which python3
```

| Command | Searches |
|---|---|
| `find` | Filesystem objects by name, type, time, size, ownership, and other attributes |
| `grep` | Text matching a pattern |
| `command -v` | How the shell resolves a command |

Searching broad filesystem paths may produce permission errors and consume resources. Limit scope and use authorized privileges.

## 9. Redirection and Pipes

### Standard Streams

- Standard input: input to a program.
- Standard output: normal output.
- Standard error: error output.

```bash
command > output.txt
command >> output.txt
command 2> errors.txt
command | grep pattern
```

`>` overwrites a file. `>>` appends. Confirm the target before redirecting privileged command output.

A pipe sends one command's standard output to another command's standard input:

```bash
ps aux | grep ssh
```

For reliable scripts and investigations, avoid assuming every command's human-readable output is a stable data format.

## 10. Help and Documentation

```bash
man ls
ls --help
apropos permissions
```

Manual pages commonly include synopsis, description, options, files, examples, and related commands. Verify commands before using elevated privileges.

## 11. Package Management

### What

Package management installs, updates, verifies, and removes software through distribution-managed packages and repositories.

### Why

It provides dependency handling, update tracking, signatures, and consistent software inventory.

### How

Debian and Ubuntu systems commonly use APT:

```bash
sudo apt update
apt list --upgradable
sudo apt upgrade
sudo apt install package-name
sudo apt remove package-name
```

Red Hat-family systems commonly use DNF:

```bash
sudo dnf check-update
sudo dnf upgrade
sudo dnf install package-name
sudo dnf remove package-name
```

### Where

Repositories may be maintained by distributions, enterprises, or approved vendors.

### Security Practices

- Use approved repositories.
- Verify repository signing and configuration.
- Review package source and dependencies.
- Patch according to risk and change control.
- Remove unsupported software.
- Maintain software inventory.
- Avoid blindly executing Internet installation scripts.
- Test critical updates and maintain recovery plans.

`apt update` refreshes package metadata; it does not install upgrades.

## 12. Processes

### What

A process is a running instance of a program. Each process has a process identifier (PID), owner, state, parent, command, and resource use.

### Why

Processes perform system work. Suspicious or failed processes are central to administration and incident investigation.

### How

The kernel creates, schedules, and terminates processes. Processes may create child processes and communicate through files, memory, sockets, and signals.

### Where

Process information appears through commands, `/proc`, system logs, audit systems, and endpoint security tools.

## 13. Inspecting Processes

```bash
ps
ps aux
ps -ef
top
pgrep ssh
pstree
```

| Field | Meaning |
|---|---|
| PID | Process identifier |
| PPID | Parent process identifier |
| USER | Process owner |
| STAT | Process state |
| %CPU | CPU use estimate |
| %MEM | Memory use estimate |
| COMMAND | Executable or command information |

Analysts should examine process ancestry, full command line, executable path, network activity, user, start time, and related files.

## 14. Controlling Processes

```bash
kill PID
kill -TERM PID
kill -KILL PID
pkill process-name
jobs
bg
fg
```

`SIGTERM` requests graceful termination. `SIGKILL` forces termination and cannot be handled by the process. Use force only when justified because it may cause data loss or prevent cleanup.

Stopping a suspicious process can destroy volatile evidence or trigger attacker behavior. During an incident, coordinate containment and evidence collection.

## 15. File Ownership and Permissions

### What

Traditional Linux discretionary access control assigns:

- An owning user.
- An owning group.
- Permissions for user, group, and others.

### Why

Permissions limit who can read, modify, or execute files and access directories.

### How

```bash
ls -l
```

Example:

```text
-rwxr-x--- 1 analyst security 2048 Jul 8 10:00 collect.sh
```

Interpretation:

- `-`: regular file.
- `rwx`: owner can read, write, execute.
- `r-x`: group can read and execute.
- `---`: others have no permissions.
- Owner: `analyst`.
- Group: `security`.

### Where

Permissions apply to files, directories, devices, sockets, and other filesystem objects.

## 16. Permission Meanings

| Permission | On a File | On a Directory |
|---|---|---|
| Read (`r`) | Read content | List directory entries |
| Write (`w`) | Modify content | Create, delete, or rename entries, subject to other controls |
| Execute (`x`) | Execute as a program or script | Traverse and access entries |

Directory behavior is a frequent source of confusion. File deletion is mainly controlled by permissions on the containing directory, not only the file.

## 17. Numeric Permissions

| Permission | Value |
|---|---:|
| Read | 4 |
| Write | 2 |
| Execute | 1 |

Examples:

| Mode | Meaning |
|---|---|
| `600` | Owner read/write; no group or other access |
| `640` | Owner read/write; group read |
| `644` | Owner read/write; group and others read |
| `700` | Owner full access only |
| `750` | Owner full; group read/execute |
| `755` | Owner full; group and others read/execute |

```bash
chmod 640 report.txt
chmod u+x collect.sh
```

Avoid `777` as a troubleshooting shortcut. Grant only the access required.

Lesson 12 expands `chmod`, `chown`, ACLs, groups, and `sudoers`.

## 18. Root and sudo

The root account has extensive system authority. `sudo` allows authorized users to run approved commands with elevated privileges.

```bash
sudo command
sudo -l
```

Security practices:

- Use standard accounts for routine work.
- Elevate only when necessary.
- Do not run unknown commands with `sudo`.
- Log privileged activity.
- Protect administrative credentials.
- Avoid persistent root sessions.

## 19. Hidden Files and Links

Names beginning with `.` are hidden from ordinary `ls` output:

```bash
ls -la ~
```

Hidden does not mean encrypted or access-controlled.

A symbolic link points to another path. A hard link refers to the same underlying inode:

```bash
ln -s /var/log/app.log app-log-link
```

Attackers and administrators may use links. Analysts should verify resolved paths to avoid inspecting or modifying an unintended target.

## 20. Enterprise Scenarios

### Small Business

A Linux web server runs an outdated package from an unapproved repository. The administrator removes the repository, validates package integrity, patches the service, and reviews related logs.

### Financial Institution

A database export is world-readable. The security administrator restricts permissions, identifies prior access, and corrects the deployment process that created the file.

### Healthcare Organization

A clinical application process consumes all CPU. Administrators inspect process ancestry and logs before restarting it to preserve availability and evidence.

### University

A student lab account places an executable in a shared writable directory. Application controls, mount options, permissions, and monitoring reduce execution risk.

### Government Agency

An unfamiliar process runs as root. Incident responders preserve process and network evidence, isolate according to procedure, and investigate persistence.

### Cloud Environment

A Linux cloud VM contains API credentials in a user's shell history. The team revokes the credentials, restricts access, reviews cloud audit logs, and improves secret handling.

## 21. Security Operations and Troubleshooting

Useful first-response commands include:

```bash
date
hostname
whoami
id
uptime
df -h
free -h
ps aux
ss -tulpn
```

Do not collect commands blindly. Record:

- Purpose.
- Time and time zone.
- Account used.
- Commands executed.
- Output location.
- Whether commands changed system state.

Troubleshoot in layers:

1. Confirm the symptom.
2. Check identity and permissions.
3. Check storage and memory.
4. Check process and service state.
5. Check configuration.
6. Check logs.
7. Check network dependencies.
8. Make one controlled change.
9. Validate and document.

## 22. Security+ SY0-701 Alignment

This lesson supports secure configuration, least privilege, permissions, patch management, process analysis, logging, system hardening, and incident response.

Filesystem permissions and package verification are technical controls. Patch procedures and evidence collection are operational controls. Approved repository and least-privilege policies are managerial controls and directive in function.

## 23. Linux Internals and Analyst Accuracy

### Inodes, Names, and Metadata

A directory maps a filename to an inode. The inode stores metadata and references file data; the filename itself belongs to the directory entry. Hard links can give one inode multiple names. Deleting one name does not remove the underlying data while another hard link or open file reference remains.

`stat` can reveal inode, ownership, size, mode, and timestamps. Common timestamps include modification of content, change of metadata, and access, subject to filesystem and mount behavior. Linux does not provide one universally available creation-time field across every filesystem.

### Process Identity

A process can have real, effective, saved, and filesystem identity values. The effective identity commonly influences access checks. Therefore a process list showing the launching user may not fully describe current privilege, especially with setuid programs, capabilities, containers, or service managers.

### Linux Capabilities

Linux capabilities divide some root powers into individual privileges. A process or executable may perform sensitive actions without UID `0`. Analysts should therefore inspect capabilities where relevant rather than equating "not root" with "unprivileged."

### Package Trust

Repository signatures help authenticate repository metadata and packages, but they do not prove that every package is vulnerability-free or appropriate for the system. Package origin, support lifecycle, installed version, configuration, and active exposure all affect risk.

### Evidence Collection Effects

Commands can change access times, shell history, caches, process state, and logs. `kill`, package operations, and service commands clearly alter the system, but even reading data can have effects. Incident procedures should identify acceptable live-response tradeoffs and preserve command history and output.

## 24. Classroom Hands-On Practical

### Practical Title

Linux Navigation, Packages, Processes, and Permissions

### Lab Boundary

Use an instructor-approved Linux VM on host-only networking. Create a clean snapshot first.

### Tasks

1. Identify distribution, kernel, shell, user, and groups.
2. Create `~/lesson11/{logs,evidence,scripts}`.
3. Create three sample files.
4. Copy and move files between directories.
5. Use `find` to locate `.log` files.
6. Use `grep` to find `Failed password` in an instructor-provided log.
7. Inspect a file with `file` and `stat`.
8. List upgradable packages without installing them.
9. Start an instructor-approved process and identify its PID and parent.
10. Terminate it gracefully.
11. Set a report to `640` and a script to `750`.
12. Explain each resulting permission.

### Evidence Table

| Task | Command | Key Output | Security Meaning |
|---|---|---|---|
| Identify user | `id` |  |  |
| Search log | `grep` |  |  |
| Inspect process | `ps` |  |  |
| Set permission | `chmod` |  |  |

### Safety Rules

- Do not use recursive removal.
- Do not modify `/etc`.
- Do not install packages unless instructed.
- Do not use `chmod 777`.
- Do not elevate commands without a stated reason.

## 25. Take-Home Practical

Create a Linux system-baseline report containing:

- Distribution, kernel, hostname, user, and groups.
- Filesystem usage.
- Ten important filesystem paths.
- Ten running processes and owners.
- Five installed security-relevant packages.
- Five files with permission analysis.
- Three excessive-permission risks.
- Package-update status.
- A troubleshooting decision tree.

Use synthetic or lab data only.

## 26. Assessment Questions

### Multiple Choice

1. Which directory normally contains system-wide configuration?
   A. `/etc`
   B. `/home`
   C. `/tmp`
   D. `/media`

2. Which command prints the current directory?
   A. `pwd`
   B. `ps`
   C. `grep`
   D. `chmod`

3. Which command searches text?
   A. `find`
   B. `grep`
   C. `mkdir`
   D. `mv`

4. What does `apt update` do?
   A. Refreshes package metadata
   B. Upgrades every package
   C. Deletes logs
   D. Changes permissions

5. Which process signal requests graceful termination?
   A. SIGTERM
   B. SIGKILL only
   C. SIGHIDE
   D. SIGCOPY

6. What does permission mode `640` mean?
   A. Owner read/write, group read, others none
   B. Everyone full access
   C. Owner execute only
   D. Group write only

7. What does execute permission on a directory allow?
   A. Traversal
   B. Encryption
   C. Package installation
   D. Process termination

8. Why is `chmod 777` usually unsafe?
   A. It grants broad access
   B. It removes every permission
   C. It encrypts the file
   D. It stops the kernel

9. Which location contains live process information?
   A. `/proc`
   B. `/boot`
   C. `/media`
   D. `/opt` only

10. Which is an operational control?
    A. Patch-management procedure
    B. Filesystem permission bit
    C. Linux kernel
    D. Shell executable

### Short Answer

1. Distinguish kernel, shell, terminal, and distribution.
2. Compare absolute and relative paths.
3. Explain standard output, standard error, and a pipe.
4. List five package-management security practices.
5. Explain PID, PPID, process owner, and process state.
6. Compare SIGTERM and SIGKILL.
7. Explain file versus directory permissions.
8. Why can incident-response commands affect evidence?

### Scenario Questions

1. A sensitive export has mode `644`. Assess and correct the risk.
2. An unknown root process contacts an external address. Describe evidence and response.
3. A server cannot update packages after adding a third-party repository. Describe safe troubleshooting.
4. A filesystem is full and an application fails. Describe a layered investigation.

### Answer Key

1. **A.** `/etc` is the conventional location for system-wide configuration.
2. **A.** `pwd` prints the shell's current working directory.
3. **B.** `grep` matches text patterns; `find` searches filesystem objects and attributes.
4. **A.** `apt update` refreshes repository metadata but does not itself install upgrades.
5. **A.** SIGTERM requests orderly termination and can be handled by the process.
6. **A.** `640` grants owner read/write, group read, and no permissions to others.
7. **A.** Execute on a directory permits traversal and access to known entries when other permissions allow.
8. **A.** `777` grants read, write, and execute to everyone represented by the mode classes.
9. **A.** `/proc` exposes virtual kernel and process information.
10. **A.** Patch management is carried out through a people-driven procedure and is operational.

## 27. Glossary

| Term | Definition |
|---|---|
| Absolute Path | Path beginning at filesystem root. |
| Distribution | Packaged operating system built around Linux. |
| Filesystem | Structure used to organize and access stored objects. |
| Group | Collection of accounts used for access assignment. |
| Kernel | Core managing hardware, processes, memory, and system calls. |
| Package Manager | Tool that installs, updates, verifies, and removes software packages. |
| Permission | Rule allowing read, write, or execute access. |
| PID | Numeric process identifier. |
| Process | Running instance of a program. |
| Relative Path | Path interpreted from the current directory. |
| Root | The filesystem root `/` or the privileged root account, depending on context. |
| Shell | Command interpreter such as Bash. |
| sudo | Mechanism allowing authorized command execution with elevated privilege. |

## 28. Lesson Review Checklist

- I can navigate the Linux filesystem.
- I can manage lab files safely.
- I can inspect packages and processes.
- I can interpret ownership and permissions.
- I can use help and search commands.
- I can connect Linux artifacts to security operations.

## 29. Continuity With Future Lessons

Lesson 12 expands Linux users, groups, ownership, `chmod`, `chown`, ACLs, and `sudoers`. Students should retain the difference between file permissions, directory permissions, ownership, and elevated privilege.
