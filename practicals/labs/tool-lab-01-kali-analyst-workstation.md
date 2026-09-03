# Tool Lab 01 - Kali Linux Analyst Workstation

## Purpose

Kali Linux is the student analyst workstation for discovery, validation, packet capture, web testing, OpenVAS operation, and evidence handling. This lab teaches students to use Kali professionally inside an authorised private range.

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

## Step 1 - Create the Evidence Folder

```bash
mkdir -p ~/femtech-evidence/kali-tool-lab/{01-baseline,02-validation,03-scans,04-pcap,05-report}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee ~/femtech-evidence/kali-tool-lab/session-start-utc.txt
script -af ~/femtech-evidence/kali-tool-lab/command-log.txt
```

Exit the transcript at the end with `exit`.

## Step 2 - Prove Kali Identity and Network Placement

```bash
hostnamectl | tee ~/femtech-evidence/kali-tool-lab/01-baseline/hostname.txt
ip -br address | tee ~/femtech-evidence/kali-tool-lab/01-baseline/ip-address.txt
ip route | tee ~/femtech-evidence/kali-tool-lab/01-baseline/routes.txt
ip neigh show | tee ~/femtech-evidence/kali-tool-lab/01-baseline/neighbours.txt
resolvectl status 2>/dev/null | tee ~/femtech-evidence/kali-tool-lab/01-baseline/dns.txt
```

Write a short note explaining:

- Kali's IP address.
- Default gateway.
- DNS server.
- Approved target subnet.
- Why a bridged adapter would be unsafe in this course.

## Step 3 - Verify Authorised Scope

Create `scope-record.md`:

```bash
nano ~/femtech-evidence/kali-tool-lab/scope-record.md
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

## Step 4 - Test Basic Connectivity

```bash
ping -c 3 10.10.10.1 | tee ~/femtech-evidence/kali-tool-lab/02-validation/ping-gateway.txt
ping -c 3 10.10.20.20 | tee ~/femtech-evidence/kali-tool-lab/02-validation/ping-ubuntu.txt
nc -vz -w 3 10.10.20.20 22 | tee ~/femtech-evidence/kali-tool-lab/02-validation/tcp-ssh.txt
```

If ping fails but TCP succeeds, explain why ICMP filtering does not always mean the host is down.

## Step 5 - Run Safe Nmap Discovery

```bash
cd ~/femtech-evidence/kali-tool-lab/03-scans
sudo nmap -sn -n --reason --max-retries 2 -oA discovery-servers 10.10.20.0/24
sudo nmap -Pn -n -sT -p 22,80,443 --reason --version-light -oA service-check-ubuntu 10.10.20.20
```

Explain these options:

- `-sn` performs host discovery without a full port scan.
- `-n` prevents DNS lookups that could leak outside the lab.
- `--reason` records why Nmap made a decision.
- `-oA` saves normal, grepable, and XML output.
- `--version-light` limits service detection intensity.

## Step 6 - Capture a Small PCAP

Open one terminal on Kali:

```bash
sudo timeout 60 tcpdump -ni any -s 0 -w ~/femtech-evidence/kali-tool-lab/04-pcap/kali-validation.pcap 'host 10.10.20.20'
```

In another terminal:

```bash
nc -vz -w 3 10.10.20.20 22
curl -sSI --connect-timeout 5 http://10.10.20.20/ | tee ~/femtech-evidence/kali-tool-lab/02-validation/http-head.txt
```

Hash the PCAP:

```bash
sha256sum ~/femtech-evidence/kali-tool-lab/04-pcap/kali-validation.pcap \
  | tee ~/femtech-evidence/kali-tool-lab/04-pcap/kali-validation.pcap.sha256
```

## Step 7 - Interpret Results

Create `technical-notes.md`:

```bash
nano ~/femtech-evidence/kali-tool-lab/05-report/technical-notes.md
```

Answer:

1. What did Kali prove about routing?
2. Which ports were reachable?
3. Which evidence proves the scan stayed in scope?
4. What does Nmap prove, and what does it not prove?
5. What would you check if Nmap says a host is down but pfSense logs show allowed traffic?

## Step 8 - Package Evidence

```bash
find ~/femtech-evidence/kali-tool-lab -type f ! -name hashes.sha256 -print0 \
  | sort -z \
  | xargs -0 sha256sum > ~/femtech-evidence/kali-tool-lab/hashes.sha256
sha256sum --check ~/femtech-evidence/kali-tool-lab/hashes.sha256
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

## Deliverables

- Scope record.
- Kali IP, route, DNS, and neighbour evidence.
- Connectivity tests.
- Nmap outputs in all three formats.
- PCAP and hash.
- Technical notes.
- Final `hashes.sha256`.

## Pass Condition

The student passes when they can prove Kali is isolated, correctly scoped, able to validate authorised systems, and able to preserve professional evidence.

