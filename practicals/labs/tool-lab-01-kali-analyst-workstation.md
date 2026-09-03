# Tool Lab 01 - Kali Linux Analyst Workstation and Bash Basics

## Purpose

Kali Linux is the student analyst workstation for discovery, validation, packet capture, web testing, OpenVAS operation, Bash automation, and evidence handling. This lab teaches students to use Kali professionally inside an authorised private range while building the Bash skills needed for real analyst work.

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

## Step 1 - Create the Evidence Folder

```bash
LAB_NAME="kali-tool-lab"
EVIDENCE="$HOME/femtech-evidence/$LAB_NAME"
TARGET_IP="10.10.20.20"
TARGET_NET="10.10.20.0/24"
GATEWAY_IP="10.10.10.1"
PORTS="22,80,443"

mkdir -p "$EVIDENCE"/{01-baseline,02-validation,03-scans,04-pcap,05-report,06-scripts}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee "$EVIDENCE/session-start-utc.txt"
script -af "$EVIDENCE/command-log.txt"
```

Exit the transcript at the end with `exit`.

Key Bash points:

- `LAB_NAME="kali-tool-lab"` creates a variable.
- `$HOME` expands to the current user's home directory.
- `"$EVIDENCE"` is quoted so paths with spaces do not break commands.
- `{01-baseline,02-validation,...}` creates several folders in one command.
- `tee` shows output on screen and saves it to a file.

## Step 2 - Practise Essential Bash Checks

Run:

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

## Step 3 - Prove Kali Identity and Network Placement

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

## Step 4 - Verify Authorised Scope

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

## Step 5 - Test Basic Connectivity

```bash
ping -c 3 "$GATEWAY_IP" | tee "$EVIDENCE/02-validation/ping-gateway.txt"
ping -c 3 "$TARGET_IP" | tee "$EVIDENCE/02-validation/ping-ubuntu.txt"
nc -vz -w 3 "$TARGET_IP" 22 2>&1 | tee "$EVIDENCE/02-validation/tcp-ssh.txt"
```

If ping fails but TCP succeeds, explain why ICMP filtering does not always mean the host is down.

## Step 6 - Create a Reusable Bash Validation Script

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

## Step 7 - Run Safe Nmap Discovery

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

## Step 8 - Capture a Small PCAP

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

## Step 9 - Interpret Bash and Security Results

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

## Step 10 - Package Evidence

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

## Deliverables

- Scope record.
- Kali IP, route, DNS, and neighbour evidence.
- Connectivity tests.
- Nmap outputs in all three formats.
- PCAP and hash.
- Bash validation script.
- Bash variable, loop, parsing, and exit-code evidence.
- Technical notes.
- Final `hashes.sha256`.

## Pass Condition

The student passes when they can prove Kali is isolated, correctly scoped, able to validate authorised systems, able to use Bash for repeatable evidence collection, and able to preserve professional evidence.
