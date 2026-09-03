# Tool Lab 01 - Introduction to Linux, Kali Workstation, and Bash Basics

## Purpose

Kali Linux is the student analyst workstation for discovery, validation, packet capture, web testing, OpenVAS operation, Bash automation, and evidence handling. This lab introduces Linux fundamentals, then teaches students to use Kali professionally inside an authorised private range while building the Bash skills needed for real analyst work.

## Scenario

FEMTECH has assigned you a Kali workstation named `kali01`. Before you are allowed to scan or test anything, you must prove that Kali is isolated, correctly addressed, able to reach only approved lab targets, and ready to preserve evidence.

## Systems

| System | Role | Example address |
|---|---|---|
| Kali Linux | Analyst workstation | `10.10.10.60` |
| pfSense | Gateway/firewall | `10.10.10.1` |
| Ubuntu Server | Approved test target | `10.10.20.20` |

## Safety Rules

- Test only the approved private lab ranges.
- Kali must not use a bridged adapter during security testing.
- Do not scan the Internet, the physical LAN, school systems, or another student's VM.
- Record source IP, target IP, purpose, date, start time, and stop time before each test.
- Save command output; do not rely only on screenshots.

## Introduction to Linux Skills Covered

Students will practise:

- Understanding Linux as an operating system used for servers, security tools, cloud systems, and analyst workstations.
- Identifying the current user, hostname, kernel, distribution, and system time.
- Navigating the filesystem with `pwd`, `ls`, `cd`, and common directories such as `/home`, `/etc`, `/var/log`, `/tmp`, and `/usr/bin`.
- Reading files safely with `cat`, `less`, `head`, and `tail`.
- Understanding root privilege and `sudo`.
- Checking users and groups with `whoami`, `id`, and `groups`.
- Viewing file ownership and permissions with `ls -l` and `stat`.
- Checking processes with `ps` and service status with `systemctl`.
- Checking installed packages with `dpkg` and APT.
- Reading system logs from `/var/log` where permitted.
- Checking IP addresses, routes, DNS, neighbours, and listening ports.

Linux matters in cybersecurity because many enterprise systems, security tools, firewalls, SIEM components, web servers, cloud workloads, containers, and forensic workstations are Linux-based. A student who cannot navigate Linux will struggle with SOC analysis, vulnerability management, incident response, and system hardening.

## Beginner Terms

| Term | Simple meaning | Example |
|---|---|---|
| Operating system | Software that manages the computer and lets users run programs | Kali Linux, Ubuntu, Windows |
| Terminal | Text window where commands are typed | The black command window in Kali |
| Shell | Program that reads commands and runs them | Bash |
| Command | Instruction typed into the terminal | `pwd` |
| Directory | A folder in Linux | `/home/kali` |
| File | A stored item such as a note, log, script, or configuration | `notes.txt` |
| Path | The location of a file or folder | `/var/log/auth.log` |
| User | Account currently using the system | `kali` |
| Root | Most powerful Linux administrator account | Similar to full administrator |
| `sudo` | Runs one approved command with administrator privilege | `sudo apt update` |
| Process | A running program | Browser, SSH service, terminal |
| Service | A background program managed by Linux | SSH, web server |
| Package | Installed software managed by the system | `nmap`, `curl` |
| Log | Record of system or application activity | Authentication log |
| Permission | Rule controlling who can read, write, or run a file | `rwx` |

## How to Read a Linux Command

Linux commands usually follow this pattern:

```text
command option target
```

Example:

```bash
ls -l /home
```

| Part | Meaning |
|---|---|
| `ls` | The command; it lists files and folders |
| `-l` | An option; it asks for long detailed output |
| `/home` | The target; it tells `ls` what location to list |

Do not type the word `bash` from the code-block label. The label only tells you the command is meant for a Linux Bash terminal.

## Bash Skills Covered

Students will practise:

- Variables for evidence paths, source IPs, targets, and ports.
- Command substitution using `$(...)`.
- Quoting paths and variables correctly.
- Output redirection with `>`, `>>`, and `2>/dev/null`.
- `tee` for viewing and saving evidence at the same time.
- Simple `for` loops for repeated checks.
- `if` statements for basic pass/fail decisions.
- Functions for reusable validation commands.
- Exit codes using `$?`.
- Basic text parsing with `grep`, `awk`, and `cut`.

These Bash skills matter because analysts often need to collect repeatable evidence quickly during vulnerability assessments, SOC triage, server checks, and incident response.

## Step 1 - Open Terminal and Learn the Prompt

Open the Kali terminal.

Run one command at a time:

```bash
pwd
```

Meaning: print working directory. It shows the folder you are currently inside.

```bash
whoami
```

Meaning: show the current username.

```bash
hostname
```

Meaning: show the computer name.

```bash
date
```

Meaning: show the current date and time.

Now clear the screen:

```bash
clear
```

This does not delete files. It only clears the terminal view.

## Step 2 - Move Around the Linux Filesystem

Run:

```bash
pwd
ls
ls -l
cd /home
pwd
ls
cd ~
pwd
```

What happened:

- `pwd` showed your current location.
- `ls` listed files and folders.
- `ls -l` showed details such as owner, group, size, and permissions.
- `cd /home` moved into `/home`.
- `cd ~` returned to your own home folder.

Create a practice folder:

```bash
mkdir linux-practice
cd linux-practice
pwd
```

Create and read a simple file:

```bash
echo "This is my first Linux note" > note.txt
cat note.txt
ls -l note.txt
```

Important:

- `>` writes output into a file.
- If the file already exists, `>` replaces its content.
- `cat` displays the content of a small file.

Append a second line:

```bash
echo "Linux is important for cybersecurity" >> note.txt
cat note.txt
```

Important:

- `>>` adds to the end of a file.
- `>>` is safer than `>` when you do not want to overwrite existing notes.

## Step 3 - Understand Files, Permissions, and Help

Run:

```bash
ls -l note.txt
stat note.txt
```

In `ls -l`, output may look like this:

```text
-rw-r--r-- 1 kali kali 67 Sep 03 10:00 note.txt
```

Simple interpretation:

| Part | Meaning |
|---|---|
| `-` | This is a regular file |
| `rw-` | Owner can read and write |
| `r--` | Group can read |
| `r--` | Others can read |
| `kali kali` | Owner and group |
| `note.txt` | File name |

Learn how to get help:

```bash
man ls
```

Press `q` to quit the manual page.

Try short help:

```bash
ls --help | head
```

## Step 4 - Create the Evidence Folder

```bash
mkdir -p ~/femtech-evidence/kali-tool-lab
mkdir -p ~/femtech-evidence/kali-tool-lab/01-baseline
mkdir -p ~/femtech-evidence/kali-tool-lab/02-validation
mkdir -p ~/femtech-evidence/kali-tool-lab/03-scans
mkdir -p ~/femtech-evidence/kali-tool-lab/04-pcap
mkdir -p ~/femtech-evidence/kali-tool-lab/05-report
mkdir -p ~/femtech-evidence/kali-tool-lab/06-scripts
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee ~/femtech-evidence/kali-tool-lab/session-start-utc.txt
script -af ~/femtech-evidence/kali-tool-lab/command-log.txt
```

Exit the transcript at the end with `exit`.

Now create variables so later commands are shorter:

```bash
LAB_NAME="kali-tool-lab"
EVIDENCE="$HOME/femtech-evidence/$LAB_NAME"
TARGET_IP="10.10.20.20"
TARGET_NET="10.10.20.0/24"
GATEWAY_IP="10.10.10.1"
PORTS="22,80,443"
```

Key Bash points:

- `LAB_NAME="kali-tool-lab"` creates a variable.
- `$HOME` expands to the current user's home directory.
- `"$EVIDENCE"` is quoted so paths with spaces do not break commands.
- `tee` shows output on screen and saves it to a file.
- A variable stores a value so you do not type the same long path many times.
- If you close the terminal, you must create the variables again.

## Step 5 - Practise Essential Linux and Bash Checks

Run these Linux orientation commands:

```bash
pwd | tee "$EVIDENCE/01-baseline/current-directory.txt"
whoami | tee "$EVIDENCE/01-baseline/current-user.txt"
id | tee "$EVIDENCE/01-baseline/current-user-id.txt"
groups | tee "$EVIDENCE/01-baseline/current-user-groups.txt"
uname -a | tee "$EVIDENCE/01-baseline/kernel-info.txt"
cat /etc/os-release | tee "$EVIDENCE/01-baseline/os-release.txt"
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee "$EVIDENCE/01-baseline/current-time.txt"
```

Review important directories:

```bash
ls -ld / /home /etc /var /var/log /tmp /usr /usr/bin | tee "$EVIDENCE/01-baseline/linux-directory-summary.txt"
```

Interpret the directories:

| Directory | Practical meaning |
|---|---|
| `/` | Root of the Linux filesystem |
| `/home` | User home directories |
| `/etc` | System and application configuration files |
| `/var/log` | Many system and application logs |
| `/tmp` | Temporary files; often cleared and not trusted for permanent evidence |
| `/usr/bin` | Many user commands and installed tools |

Check permissions:

```bash
ls -l "$EVIDENCE" | tee "$EVIDENCE/01-baseline/evidence-folder-permissions.txt"
stat "$EVIDENCE" | tee "$EVIDENCE/01-baseline/evidence-folder-stat.txt"
```

Check processes, services, and packages:

```bash
ps aux --sort=-%mem | head -n 10 | tee "$EVIDENCE/01-baseline/top-processes.txt"
systemctl --type=service --state=running --no-pager | head -n 25 | tee "$EVIDENCE/01-baseline/running-services.txt"
dpkg -l nmap tcpdump curl openssl 2>/dev/null | tee "$EVIDENCE/01-baseline/security-tool-packages.txt"
```

Important Linux points:

- `root` is the most privileged account on Linux.
- `sudo` temporarily runs an approved command with administrative privilege.
- Configuration files are commonly stored under `/etc`.
- Logs are commonly stored under `/var/log`.
- Linux permissions control read, write, and execute access for owner, group, and others.
- Processes are running programs; services are background processes managed by the system.

Now practise Bash:

```bash
echo "Evidence folder: $EVIDENCE" | tee "$EVIDENCE/01-baseline/bash-variable-test.txt"
NOW_UTC="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
echo "Current UTC time is $NOW_UTC" | tee "$EVIDENCE/01-baseline/bash-command-substitution.txt"
```

Check exit codes:

```bash
ping -c 1 "$GATEWAY_IP" >/dev/null 2>&1
echo "Gateway ping exit code: $?" | tee "$EVIDENCE/01-baseline/gateway-exit-code.txt"
```

Use an `if` statement:

```bash
if ping -c 1 "$GATEWAY_IP" >/dev/null 2>&1; then
  echo "PASS: Gateway is reachable" | tee "$EVIDENCE/01-baseline/gateway-check.txt"
else
  echo "FAIL: Gateway is not reachable" | tee "$EVIDENCE/01-baseline/gateway-check.txt"
fi
```

Use a loop:

```bash
for CHECK_PORT in 22 80 443; do
  nc -vz -w 3 "$TARGET_IP" "$CHECK_PORT" 2>&1 | tee -a "$EVIDENCE/02-validation/port-loop-check.txt"
done
```

Use simple parsing:

```bash
ip -br address | awk '{print $1, $3}' | tee "$EVIDENCE/01-baseline/interface-address-summary.txt"
ip route | grep default | tee "$EVIDENCE/01-baseline/default-route.txt"
```

## Step 6 - Prove Kali Identity and Network Placement

```bash
hostnamectl | tee "$EVIDENCE/01-baseline/hostname.txt"
ip -br address | tee "$EVIDENCE/01-baseline/ip-address.txt"
ip route | tee "$EVIDENCE/01-baseline/routes.txt"
ip neigh show | tee "$EVIDENCE/01-baseline/neighbours.txt"
resolvectl status 2>/dev/null | tee "$EVIDENCE/01-baseline/dns.txt"
```

Write a short note explaining:

- Kali's IP address.
- Default gateway.
- DNS server.
- Approved target subnet.
- Why a bridged adapter would be unsafe in this course.

## Step 7 - Verify Authorised Scope

Create `scope-record.md`:

```bash
nano "$EVIDENCE/scope-record.md"
```

Include:

```text
Student:
Date:
Source system:
Source IP:
Approved targets:
Approved activity:
Prohibited activity:
Instructor approval:
Start time UTC:
Stop time UTC:
```

## Step 8 - Test Basic Connectivity

```bash
ping -c 3 "$GATEWAY_IP" | tee "$EVIDENCE/02-validation/ping-gateway.txt"
ping -c 3 "$TARGET_IP" | tee "$EVIDENCE/02-validation/ping-ubuntu.txt"
nc -vz -w 3 "$TARGET_IP" 22 2>&1 | tee "$EVIDENCE/02-validation/tcp-ssh.txt"
```

If ping fails but TCP succeeds, explain why ICMP filtering does not always mean the host is down.

## Step 9 - Create a Reusable Bash Validation Script

Create a simple script:

```bash
nano "$EVIDENCE/06-scripts/validate-target.sh"
```

Add:

```bash
#!/usr/bin/env bash
set -u

TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  echo "Usage: $0 <target-ip>"
  exit 1
fi

echo "Validation started at $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
echo "Target: $TARGET"

echo "[1] Ping test"
ping -c 2 "$TARGET"

echo "[2] TCP port checks"
for PORT in 22 80 443; do
  nc -vz -w 3 "$TARGET" "$PORT"
done

echo "[3] HTTP header check"
curl -sSI --connect-timeout 5 "http://$TARGET/" || true

echo "Validation finished at $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
```

Make it executable and run it:

```bash
chmod 750 "$EVIDENCE/06-scripts/validate-target.sh"
"$EVIDENCE/06-scripts/validate-target.sh" "$TARGET_IP" 2>&1 \
  | tee "$EVIDENCE/02-validation/bash-script-validation.txt"
```

Important Bash points:

- `#!/usr/bin/env bash` tells Linux to run the file with Bash.
- `set -u` catches unset variables.
- `$1` is the first argument passed to a script.
- `${1:-}` prevents an unset argument error.
- `if [ -z "$TARGET" ]` checks whether the target argument is empty.
- `for PORT in 22 80 443` repeats a command for each port.
- `|| true` allows the script to continue when HTTP is unavailable.

## Step 10 - Run Safe Nmap Discovery

```bash
cd "$EVIDENCE/03-scans"
sudo nmap -sn -n --reason --max-retries 2 -oA discovery-servers "$TARGET_NET"
sudo nmap -Pn -n -sT -p "$PORTS" --reason --version-light -oA service-check-ubuntu "$TARGET_IP"
```

Explain these options:

- `-sn` performs host discovery without a full port scan.
- `-n` prevents DNS lookups that could leak outside the lab.
- `--reason` records why Nmap made a decision.
- `-oA` saves normal, grepable, and XML output.
- `--version-light` limits service detection intensity.

Parse the grepable Nmap output:

```bash
grep "Ports:" service-check-ubuntu.gnmap | tee "$EVIDENCE/03-scans/open-port-summary.txt"
awk '/Ports:/ {print $0}' service-check-ubuntu.gnmap | tee "$EVIDENCE/03-scans/awk-port-summary.txt"
```

## Step 11 - Capture a Small PCAP

Open one terminal on Kali:

```bash
sudo timeout 60 tcpdump -ni any -s 0 -w "$EVIDENCE/04-pcap/kali-validation.pcap" "host $TARGET_IP"
```

In another terminal:

```bash
nc -vz -w 3 "$TARGET_IP" 22
curl -sSI --connect-timeout 5 "http://$TARGET_IP/" | tee "$EVIDENCE/02-validation/http-head.txt"
```

Hash the PCAP:

```bash
sha256sum "$EVIDENCE/04-pcap/kali-validation.pcap" \
  | tee "$EVIDENCE/04-pcap/kali-validation.pcap.sha256"
```

## Step 12 - Interpret Linux, Bash, and Security Results

Create `technical-notes.md`:

```bash
nano "$EVIDENCE/05-report/technical-notes.md"
```

Answer:

1. What did Kali prove about routing?
2. Which ports were reachable?
3. Which evidence proves the scan stayed in scope?
4. What does Nmap prove, and what does it not prove?
5. What would you check if Nmap says a host is down but pfSense logs show allowed traffic?
6. What Bash variables did you use, and why did they reduce mistakes?
7. What did the `for` loop do?
8. What is the difference between `>` and `>>`?
9. Why is quoting `"$EVIDENCE"` safer than using `$EVIDENCE` without quotes?
10. Why is saving command output important in cybersecurity work?
11. What is the difference between `/etc` and `/var/log`?
12. Why should analysts understand `sudo` before running commands from a lab guide?
13. What do Linux file permissions protect?
14. How are processes and services different?
15. Why is Linux knowledge important for cybersecurity jobs?

## Step 13 - Package Evidence

```bash
find "$EVIDENCE" -type f ! -name hashes.sha256 -print0 \
  | sort -z \
  | xargs -0 sha256sum > "$EVIDENCE/hashes.sha256"
sha256sum --check "$EVIDENCE/hashes.sha256"
exit
```

## Troubleshooting

| Problem | Likely cause | Check |
|---|---|---|
| No IP address | Wrong adapter or DHCP unavailable | `ip -br address`, pfSense DHCP leases |
| Cannot reach gateway | Wrong network segment | VM adapter setting, `ip route` |
| Target port times out | Firewall block or service down | pfSense logs, Ubuntu `ss -lntup` |
| Nmap finds unexpected hosts | Wrong scope or shared network | Stop and verify adapter mode |
| PCAP is empty | Wrong interface or filter | Try `tcpdump -D`, then recapture |
| Script says permission denied | Script is not executable | `chmod 750 validate-target.sh` |
| Variable output is blank | Variable not set in current shell | `echo "$EVIDENCE"` and rerun Step 1 |
| Loop output overwrites evidence | Used `>` instead of `>>` or `tee -a` | Use append for repeated loop output |
| Permission denied reading a file | Normal user lacks access | Check `ls -l`; use `sudo` only when authorised |
| Command not found | Package not installed or not in PATH | Use `which <command>` and `dpkg -l <package>` |

## Deliverables

- Scope record.
- Linux orientation evidence.
- Kali IP, route, DNS, and neighbour evidence.
- Connectivity tests.
- Nmap outputs in all three formats.
- PCAP and hash.
- Bash validation script.
- Bash variable, loop, parsing, script, and exit-code evidence.
- Technical notes.
- Final `hashes.sha256`.

## Pass Condition

The student passes when they can explain basic Linux structure, prove Kali is isolated, work from the command line safely, validate authorised systems, use Bash for repeatable evidence collection, and preserve professional evidence.
