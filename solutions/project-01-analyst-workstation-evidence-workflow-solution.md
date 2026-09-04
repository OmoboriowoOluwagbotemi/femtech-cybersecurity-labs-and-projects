# Project 01 Solution - Security Analyst Workstation and Evidence Workflow

## Target Outcome

The student produces a clean Kali analyst workstation workflow with organized evidence, safe command output, a beginner Bash collection script, hashes, and a sanitized portfolio summary.

## Reference Build

| Item | Example |
|---|---|
| Hypervisor | VirtualBox |
| VM | Kali Linux |
| Network mode | NAT or Host-only, depending on instructor scope |
| Project folder | `~/femtech-projects/project-01-analyst-workstation` |
| Evidence folder | `~/femtech-projects/project-01-analyst-workstation/evidence` |

## Step 1 - Verify VM Safety

In VirtualBox, confirm:

1. The VM name is clear, such as `kali01`.
2. The VM is not connected to a real target network.
3. The network mode is documented.
4. No sensitive host folders are mounted unless approved.

Inside Kali:

```bash
mkdir -p ~/femtech-projects/project-01-analyst-workstation/evidence/{01-before,02-linux,03-script,04-report}
cd ~/femtech-projects/project-01-analyst-workstation
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee evidence/01-before/start-time-utc.txt
hostnamectl | tee evidence/01-before/hostnamectl.txt
whoami | tee evidence/01-before/current-user.txt
ip -br address | tee evidence/01-before/ip-address.txt
ip route | tee evidence/01-before/routes.txt
```

## Step 2 - Prove Linux Navigation

```bash
pwd | tee evidence/02-linux/pwd.txt
ls -la | tee evidence/02-linux/project-folder-listing.txt
mkdir -p evidence/02-linux/practice-folder
printf 'FEMTECH analyst workflow practice\n' > evidence/02-linux/practice-folder/note.txt
cat evidence/02-linux/practice-folder/note.txt | tee evidence/02-linux/note-output.txt
```

Expected result: the student can explain current directory, relative path, absolute path, file creation, and file reading.

Navigation checklist:

| Skill | Command | What the student must explain |
|---|---|---|
| Current location | `pwd` | Where the shell is currently working |
| List files | `ls -la` | Hidden files, permissions, owner, group, size, timestamp |
| Change directory | `cd` | Movement through the filesystem |
| Create folder | `mkdir -p` | Creating parent folders safely |
| Read file | `cat` | Displaying file content |
| Save output | `tee` | Showing output while saving evidence |

Common beginner mistakes:

- Running commands from the wrong folder.
- Saving evidence into inconsistent locations.
- Forgetting that Linux paths are case-sensitive.
- Confusing `/home/kali/file.txt` with `~/file.txt`.
- Using screenshots when text output would be easier to verify.

## Step 3 - Prove Permissions

```bash
cd ~/femtech-projects/project-01-analyst-workstation
ls -l evidence/02-linux/practice-folder/note.txt | tee evidence/02-linux/permission-before.txt
chmod 600 evidence/02-linux/practice-folder/note.txt
ls -l evidence/02-linux/practice-folder/note.txt | tee evidence/02-linux/permission-600.txt
chmod 644 evidence/02-linux/practice-folder/note.txt
ls -l evidence/02-linux/practice-folder/note.txt | tee evidence/02-linux/permission-644.txt
```

Required student explanation:

- `600` means owner read/write only.
- `644` means owner read/write and group/other read.
- Execute permission is needed to run scripts and traverse directories.
- The first permission triplet is for the owner, the second is for the group, and the third is for others.
- Write permission on a file allows changing the file content.
- Write permission on a directory affects creating, deleting, or renaming files inside the directory.

## Step 4 - Collect Safe System Evidence

```bash
cat /etc/os-release | tee evidence/02-linux/os-release.txt
uname -a | tee evidence/02-linux/kernel.txt
id | tee evidence/02-linux/id.txt
groups | tee evidence/02-linux/groups.txt
ps aux | head -n 20 | tee evidence/02-linux/process-sample.txt
systemctl list-units --type=service --state=running --no-pager | head -n 30 | tee evidence/02-linux/running-services.txt
dpkg -l | head -n 30 | tee evidence/02-linux/package-sample.txt
journalctl -n 10 --no-pager | tee evidence/02-linux/journal-last-10.txt
```

If a command requires permission and fails, the student records the failure and explains it. They should not force access to sensitive logs without instructor approval.

Evidence interpretation guide:

| Evidence | Security meaning |
|---|---|
| `os-release.txt` | Confirms operating system identity and version |
| `kernel.txt` | Shows kernel build, useful for patch and vulnerability context |
| `id.txt` | Shows user ID, group ID, and privilege context |
| `running-services.txt` | Helps identify attack surface |
| `package-sample.txt` | Shows installed software inventory concept |
| `journal-last-10.txt` | Introduces system log review |

## Step 5 - Create the Review Script

Create `linux-review.sh`:

```bash
nano linux-review.sh
```

Paste:

```bash
#!/usr/bin/env bash
set -u

echo "FEMTECH Linux Review"
echo "UTC time: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
echo "User: $(whoami)"
echo "Hostname: $(hostname)"
echo
echo "OS:"
grep -E '^(NAME|VERSION)=' /etc/os-release
echo
echo "IP addresses:"
ip -br address
echo
echo "Routes:"
ip route
echo
echo "Disk:"
df -h /
echo
echo "Memory:"
free -h
echo
echo "Top processes:"
ps -eo pid,user,comm,%mem,%cpu --sort=-%mem | head
```

Run:

```bash
chmod 750 linux-review.sh
./linux-review.sh | tee evidence/03-script/linux-review-output.txt
cp linux-review.sh evidence/03-script/linux-review.sh
```

Script explanation:

| Line or command | Meaning |
|---|---|
| `#!/usr/bin/env bash` | Runs the script with Bash |
| `set -u` | Stops use of undefined variables |
| `date -u` | Records time in UTC for consistent evidence |
| `grep -E` | Uses regular expressions to select matching lines |
| `ip -br address` | Shows compact network interface information |
| `ps ... --sort=-%mem` | Shows high-memory processes first |

Troubleshooting:

| Problem | Likely cause | Fix |
|---|---|---|
| `Permission denied` when running script | Script is not executable | Run `chmod 750 linux-review.sh` |
| `No such file or directory` | Wrong path or folder | Run `pwd` and `ls -la` |
| Empty evidence file | Command failed before output | Rerun command and read error message |
| Hash check fails | Evidence changed after hashing | Recreate the hash file after final edits |

## Step 6 - Hash and Report

```bash
find evidence -type f ! -name hashes.sha256 -print0 | sort -z | xargs -0 sha256sum > evidence/hashes.sha256
sha256sum --check evidence/hashes.sha256 | tee evidence/hash-check.txt
```

Create `reports/technical-report.md` and `reports/executive-summary.md`. The technical report must explain what each evidence group proves. The executive summary should be short and non-sensitive.

Recommended report structure:

```text
Title:
Student name:
Date:
Lab environment:
Work completed:
Key Linux skills demonstrated:
Evidence collected:
Problems encountered:
Security lessons learned:
Limitations:
```

Example executive summary:

```text
This project built a safe Kali Linux analyst workflow for collecting basic system and security evidence. The workstation was documented, Linux navigation and permissions were practiced, and a Bash script was created to collect repeatable host information. Evidence files were hashed to support integrity checking. No real client data, credentials, or public systems were tested.
```

## Required Evidence Checklist

| Evidence file | Required |
|---|---|
| `start-time-utc.txt` | Yes |
| `hostnamectl.txt` | Yes |
| `ip-address.txt` | Yes |
| `routes.txt` | Yes |
| `permission-before.txt` | Yes |
| `permission-600.txt` | Yes |
| `permission-644.txt` | Yes |
| `linux-review.sh` | Yes |
| `linux-review-output.txt` | Yes |
| `hashes.sha256` | Yes |
| `technical-report.md` | Yes |
| `executive-summary.md` | Yes |

## Instructor Review Questions

1. What is the difference between a relative path and an absolute path?
2. Why should analysts save command output instead of relying only on memory?
3. What does `chmod 750` allow and deny?
4. Why is UTC useful for evidence?
5. What does hashing prove, and what does hashing not prove?

## Pass Standard

The student passes when they can use Kali safely, navigate Linux, manage files, explain permissions, create and run a Bash script, collect evidence, hash files, and publish a sanitized portfolio summary.
