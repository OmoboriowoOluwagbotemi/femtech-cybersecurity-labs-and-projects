# FEMTECH Cybersecurity Practical Programme

## 6 Tool Labs, 1 Advanced Integration Lab, and 11 Professional Projects

This practical programme consolidates the 40-lesson Enterprise Cybersecurity Course. It is designed to move a student through four levels of performance:

1. **Follow** a safe procedure and explain every command.
2. **Validate** that a control works by producing evidence.
3. **Troubleshoot** a failure without guessing or destroying evidence.
4. **Decide and communicate** like a cybersecurity professional under business constraints.

The exercises use no-cost or open-source tools. Windows Server is the official time-limited Microsoft evaluation edition and is permitted only for evaluation, demonstration, and training under Microsoft's terms. It is not a free production licence. The VirtualBox Extension Pack is not required.

## Programme Outcomes

By the end, a successful student can:

- Build and recover an isolated enterprise cyber range.
- Administer and harden Ubuntu Linux, Windows Server, Windows clients, Active Directory, and pfSense.
- Discover assets, map attack surface, assess vulnerabilities, prioritise remediation, and validate fixes.
- Configure segmentation, firewall policy, logging, IDS, SIEM, and endpoint telemetry.
- Write and tune detections with evidence instead of copying rules blindly.
- Investigate alerts, PCAPs, logs, IOCs, host artefacts, and timelines.
- Apply incident response, risk assessment, compliance, and executive communication.
- Maintain an ethical portfolio containing sanitised, reproducible evidence.

The [Tool Mastery Guide](TOOL_MASTERY_GUIDE.md) provides the complete core/optional tool matrix plus detailed packs for Sysmon, osquery, BloodHound CE defensive review, YARA, Chainsaw, Sleuth Kit/Autopsy, Velociraptor, MISP, password auditing, Git/Gitleaks, Trivy, OpenTofu, and Ansible.

The [Core Tool Skills Pathway](CORE_TOOL_SKILLS_PATHWAY.md) defines the mandatory hands-on skill progression for Kali Linux, Ubuntu Server, pfSense, Windows Server, Greenbone/OpenVAS, and Wazuh. Instructors should use it as the practical competency checklist for the course.

## Programme Map

| ID | Practical | Core lessons | Expected time |
|---|---|---:|---:|
| Tool Lab 01 | Kali Linux analyst workstation | 8, 10, 15, 16, 27 | 4-5 hours |
| Tool Lab 02 | Ubuntu Server administration and hardening | 11-16, 21, 29 | 5-6 hours |
| Tool Lab 03 | pfSense firewall and segmentation | 22-24, 27, 30 | 5-6 hours |
| Tool Lab 04 | Windows Server and Active Directory | 17-20, 21, 30 | 6-8 hours |
| Tool Lab 05 | Greenbone/OpenVAS vulnerability assessment on Kali | 27-29, 36-37 | 6-8 hours plus feed synchronisation |
| Tool Lab 06 | Wazuh SIEM/XDR operations | 30-34 | 6-8 hours |
| Advanced Lab 07 | Professional vulnerability assessment with Nmap and Greenbone/OpenVAS | 27-29, 36-37 | 6-8 hours |
| Project 01 | Secure a community health clinic | 1-25, 36-39 | 2-3 weeks |
| Project 02 | Make a school ransomware-ready | 1-2, 14, 19-25, 33-37 | 2 weeks |
| Project 03 | Build a SOC for a fintech startup | 25, 30-34, 38 | 2-3 weeks |
| Project 04 | Rescue a breached e-commerce service | 4-9, 27-35 | 2 weeks |
| Project 05 | Secure a remote NGO workforce | 5, 20-24, 36-39 | 2 weeks |
| Project 06 | Investigate a privileged insider | 17-21, 30-36, 38 | 2 weeks |
| Project 07 | Protect a self-hosted cloud storage service | 4-6, 14, 21, 26, 36-37 | 2 weeks |
| Project 08 | Conduct a threat-hunting sprint | 2, 25, 30-35, 38 | 1-2 weeks |
| Project 09 | Perform DFIR after a Linux web compromise | 9, 13-16, 29, 33-35 | 2 weeks |
| Project 10 | Defend Northstar Manufacturing | All 40 lessons | 3-4 weeks |
| Project 11 | Recover the asset truth at MeridianPay | 16, 24, 26-29, 36, 38 | 5 class days or 2 weeks part-time |

## Core Tool Skill Coverage

Every guided lab should strengthen at least one professional tool skill. The table below shows the minimum required coverage for the tools the course depends on most.

| Core tool | Required practical coverage | Primary evidence students must submit |
|---|---|---|
| Kali Linux | Analyst workstation, network validation, Nmap, packet capture, OpenSSL/curl checks, safe assessment workflow | Source IP proof, route proof, authorised scope, saved command output, scan or validation files |
| Ubuntu Server | Linux administration, users/groups, permissions, SSH, UFW, logs, services, hardening, remediation | Before/after service state, UFW rules, SSH configuration, authentication logs, rollback evidence |
| pfSense | Interfaces, DHCP, NAT, aliases, firewall rules, segmentation, logs, allowed/blocked validation | Interface plan, rule matrix, config export, allowed traffic test, denied traffic test, firewall log proof |
| Windows Server | DNS, DHCP, server roles, Event Viewer, Active Directory, groups, OUs, Group Policy, security logs | IP/DNS proof, role evidence, AD structure, group membership, GPO result, EVTX or event evidence |
| Greenbone/OpenVAS | Scanner setup, target creation, scan execution, report export, finding validation, remediation, rescan | Scanner health, exact target scope, report export, validation notes, remediation proof, rescan result |
| Wazuh | Manager/agent deployment, log onboarding, event generation, dashboard search, alert interpretation, tuning | Agent status, raw event, alert details, search filter, rule ID/level, triage recommendation |

Students should revisit the [Core Tool Skills Pathway](CORE_TOOL_SKILLS_PATHWAY.md) after each tool lab to confirm that each skill is moving from guided use toward independent performance.

## Required Rules of Engagement

These rules apply to every lab and project.

1. Work only on systems explicitly listed in the exercise scope.
2. Use **Internal Network** or **Host-Only** adapters for target networks. Never bridge an intentionally vulnerable VM.
3. The pfSense WAN may use VirtualBox NAT only when downloads or updates are required. Target machines must not have a second NAT or bridged adapter.
4. Before scanning, record the source IP, target IP or CIDR, purpose, start time, stop time, and approving instructor.
5. Use only synthetic accounts, domains, email, data, and credentials.
6. Do not copy malware into the range. Generate benign simulations with normal administration commands, EICAR where explicitly authorised, or instructor-supplied evidence.
7. Do not attempt denial of service, persistence that survives the exercise, credential theft from real users, or attacks on public Internet hosts.
8. Take a snapshot before a risky change. A snapshot supports rollback; it is not a backup.
9. Preserve logs and evidence before remediation when an investigation has started.
10. Stop if the observed IP range, adapter mode, or target differs from the written scope.

The student must say aloud before any security test: **"I have written authorisation, I have verified the target, and I have verified isolation."**

## Standard Free Toolset

| Component | Purpose | Cost/licence position | Official source |
|---|---|---|---|
| Oracle VirtualBox base package | Hypervisor | GPLv3; Extension Pack not needed | https://www.virtualbox.org/wiki/Downloads |
| Ubuntu Server 24.04 LTS | Linux servers | Free/open source; selected for broad tool compatibility | https://releases.ubuntu.com/24.04/ |
| Kali Linux VirtualBox image | Analyst workstation | Free/open source | https://www.kali.org/get-kali/ |
| pfSense Community Edition | Firewall/router | Free/open-source Community Edition | https://www.pfsense.org/download/ |
| Windows Server 2025 Evaluation | AD DS, DNS, Windows Server | Official 180-day evaluation; not production freeware | https://www.microsoft.com/en-us/evalcenter/download-windows-server-2025 |
| Windows 11 Enterprise Evaluation | Endpoint | Time-limited evaluation; not production freeware | https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-enterprise |
| Wazuh | SIEM/XDR and endpoint telemetry | Free/open source | https://documentation.wazuh.com/current/quickstart.html |
| Suricata | Network IDS | Free/open source | https://suricata.io/download/ |
| Zeek | Network security monitoring | Free/open source | https://docs.zeek.org/en/current/install.html |
| Greenbone Community Edition | Vulnerability management | Free/open source | https://greenbone.github.io/docs/latest/ |
| OWASP Juice Shop | Intentionally vulnerable web app | Free/open source; lab target only | https://owasp.org/www-project-juice-shop/ |
| OWASP ZAP | Web assessment proxy/scanner | Free/open source | https://www.zaproxy.org/download/ |
| Wireshark/tshark | Packet analysis | Free/open source | https://www.wireshark.org/download.html |
| Nmap | Discovery and service validation | Free/open source | https://nmap.org/download.html |
| OpenSSL | Cryptographic and certificate operations | Free/open source | https://www.openssl.org/source/ |
| Sigma CLI/rules | Portable detections | Free/open source | https://sigmahq.io/ |
| Volatility 3 | Memory forensics | Free/open source | https://github.com/volatilityfoundation/volatility3 |
| Sysmon/Sysinternals | Detailed Windows telemetry and troubleshooting | No-cost Microsoft utilities | https://learn.microsoft.com/sysinternals/ |
| YARA | File/content pattern matching | Free/open source | https://yara.readthedocs.io/ |
| Chainsaw | EVTX hunting with Sigma support | Free/open source | https://github.com/WithSecureLabs/chainsaw |
| Sleuth Kit/Autopsy | Disk and filesystem forensics | Free/open source | https://www.sleuthkit.org/ |
| Velociraptor | DFIR collection and endpoint hunting | Free/open source | https://docs.velociraptor.app/ |
| MISP | Threat-intelligence management/sharing | Free/open source | https://www.misp-project.org/ |
| osquery | SQL-based endpoint inventory/querying | Free/open source | https://osquery.io/ |
| BloodHound CE | Defensive AD relationship/attack-path analysis | Free Community Edition | https://bloodhound.specterops.io/ |
| Git and Gitleaks | Version control and secret detection | Free/open source | https://git-scm.com/ and https://github.com/gitleaks/gitleaks |
| Trivy | Container, repository, secret, SBOM, and IaC scanning | Free/open source | https://trivy.dev/ |
| OpenTofu | Infrastructure as code | Free/open source | https://opentofu.org/ |
| Ansible | Repeatable secure configuration | Free/open source core | https://docs.ansible.com/ |

Version-specific commands in this programme were checked against current sources in July 2026. Instructors should validate download URLs and package names before each cohort. Never replace an official download URL with an unofficial mirror simply because a command has changed.

## Reference Range Topology

Use one pfSense VM as the only router between segments.

| Segment | VirtualBox network name | Subnet | Gateway | Typical systems |
|---|---|---|---|---|
| WAN | VirtualBox NAT | DHCP | VirtualBox | pfSense WAN only |
| USERS | `FEM-USERS` | `10.10.10.0/24` | `10.10.10.1` | Windows client, Kali when acting as a user |
| SERVERS | `FEM-SERVERS` | `10.10.20.0/24` | `10.10.20.1` | Domain controller, Ubuntu server |
| DMZ | `FEM-DMZ` | `10.10.30.0/24` | `10.10.30.1` | Web app, reverse proxy |
| SOC | `FEM-SOC` | `10.10.40.0/24` | `10.10.40.1` | Wazuh, Zeek/Suricata sensor, analyst station |

Suggested fixed addresses:

| Host | Address | DNS |
|---|---|---|
| `fw01` | `.1` on every internal subnet | forwards approved queries |
| `dc01` | `10.10.20.10` | `10.10.20.10` |
| `lin01` | `10.10.20.20` | `10.10.20.10` after AD exists |
| `web01` | `10.10.30.20` | `10.10.20.10` |
| `wazuh01` | `10.10.40.10` | `10.10.20.10` |
| `sensor01` | `10.10.40.20` | `10.10.20.10` |
| `win11-01` | DHCP reservation or `10.10.10.50` | `10.10.20.10` |
| `kali01` | DHCP reservation or `10.10.10.60` | pfSense or AD DNS |

### Resource Profiles

**Minimum profile (16 GB host RAM):** Run pfSense (1 GB), one Linux target (2 GB), Kali (3 GB), and one additional service at a time. Shut down unused VMs. Wazuh all-in-one may be slow and should be instructor-hosted.

**Recommended profile (32 GB host RAM):** pfSense (2 GB), DC (4 GB), Windows client (4 GB), Ubuntu (2 GB), Kali (4 GB), Wazuh (8 GB), and sensor (2 GB), with at least 250 GB free SSD storage.

**Team profile:** Place Wazuh and Greenbone on an instructor workstation and give each student an isolated target pair. Do not merge student target networks unless the addressing and authorisation plan explicitly permits it.

## VirtualBox Build Standard

Run host commands from PowerShell. `VBoxManage` may not be on `PATH`; the default Windows path is shown below.

```powershell
$VBox = 'C:\Program Files\Oracle\VirtualBox\VBoxManage.exe'
& $VBox --version
& $VBox list hostonlyifs
& $VBox list intnets
```

- `$VBox` stores the executable path once, reducing typing mistakes.
- `--version` proves which hypervisor build generated the evidence.
- `list hostonlyifs` and `list intnets` reveal existing lab networks before changes.

Create the four named internal networks by attaching adapters to VMs; VirtualBox creates an internal network when its name is first used. Example for an existing powered-off VM:

```powershell
& $VBox modifyvm 'pfSense-FEM' --nic1 nat
& $VBox modifyvm 'pfSense-FEM' --nic2 intnet --intnet2 'FEM-USERS' --nictype2 82540EM
& $VBox modifyvm 'pfSense-FEM' --nic3 intnet --intnet3 'FEM-SERVERS' --nictype3 82540EM
& $VBox modifyvm 'pfSense-FEM' --nic4 intnet --intnet4 'FEM-DMZ' --nictype4 82540EM
```

The base pfSense VM has only four adapters. Add the SOC segment by using a second pfSense adapter only if the VirtualBox configuration and guest support it, or place the sensor on SERVERS for early labs. For the full topology, enable adapter 5 in the VirtualBox GUI or use:

```powershell
& $VBox modifyvm 'pfSense-FEM' --nic5 intnet --intnet5 'FEM-SOC' --nictype5 82540EM
```

Attach a target to exactly one protected segment:

```powershell
& $VBox modifyvm 'Ubuntu-FEM' --nic1 intnet --intnet1 'FEM-SERVERS' --cableconnected1 on
& $VBox showvminfo 'Ubuntu-FEM' --machinereadable | Select-String 'nic1|intnet1|nic2|intnet2'
```

The final command is mandatory evidence: it verifies that an unexpected NAT or bridged second adapter is absent.

## Addressing and Command Conventions

- Replace every value in angle brackets, such as `<TARGET_IP>`, before pressing Enter.
- A command beginning with `$` is a Linux user command; do not type the `$`.
- A command beginning with `PS>` is PowerShell; do not type `PS>`.
- `sudo` means the command needs Linux administrative privilege. Read the command before entering a password.
- Use `ip -br address` for concise Linux addresses, `ip route` for routing, and `ss -lntup` for listening services.
- Use `Get-NetIPConfiguration`, `Get-NetRoute`, and `Get-NetTCPConnection -State Listen` on Windows.
- Use `tee` when the student must both see and save command output.
- Never run an instructor command containing a destructive placeholder such as `/dev/sdX` until the exact device has been independently verified.

## Evidence Standard

Every submission uses this structure:

```text
student-name/
  README.md
  scope-and-authorization.md
  command-log.txt
  evidence/
    01-before/
    02-change/
    03-validation/
    04-rollback/
  report/
    technical-report.md
    executive-summary.md
  hashes.sha256
```

On Linux, start a transcript and record the session time:

```bash
mkdir -p ~/femtech-evidence/{01-before,02-change,03-validation,04-rollback}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee ~/femtech-evidence/session-start-utc.txt
script -af ~/femtech-evidence/command-log.txt
```

Exit the transcript with `exit`. Remove ANSI control characters only in a copy if they interfere with reading; retain the original.

On PowerShell, use:

```powershell
$Evidence = "$env:USERPROFILE\Documents\FEMTECH-Evidence"
New-Item -ItemType Directory -Force -Path $Evidence | Out-Null
Start-Transcript -Path "$Evidence\command-log.txt" -Append
Get-Date -AsUTC -Format 'yyyy-MM-ddTHH:mm:ssZ' | Set-Content "$Evidence\session-start-utc.txt"
```

End with `Stop-Transcript`.

Create integrity hashes after the evidence folder is complete.

```bash
find ~/femtech-evidence -type f ! -name hashes.sha256 -print0 \
  | sort -z \
  | xargs -0 sha256sum > ~/femtech-evidence/hashes.sha256
sha256sum --check ~/femtech-evidence/hashes.sha256
```

```powershell
Get-ChildItem $Evidence -File -Recurse |
  Where-Object Name -ne 'hashes.sha256' |
  Sort-Object FullName |
  ForEach-Object { "$(Get-FileHash $_.FullName -Algorithm SHA256 | Select-Object -Expand Hash) *$($_.FullName)" } |
  Set-Content "$Evidence\hashes.sha256"
```

A screenshot without the command, timestamp, hostname, and interpretation is weak evidence. Prefer saved text, JSON, CSV, XML, EVTX, PCAP, and configuration exports.

## Professional Work Cycle

Use this cycle in every exercise:

1. **Receive:** Read the ticket, scope, business owner, deadline, and prohibited actions.
2. **Plan:** Write assumptions, dependencies, change risk, success tests, and rollback.
3. **Baseline:** Capture the original state before changing it.
4. **Execute:** Make the smallest authorised change.
5. **Validate:** Run positive, negative, and regression tests.
6. **Observe:** Confirm logs and monitoring show the expected activity.
7. **Recover:** Roll back or restore if validation fails.
8. **Communicate:** Write what happened, why it matters, limits, and next action.
9. **Improve:** Record a detection, automation, process, or architecture improvement.

## Troubleshooting Standard

When a step fails, do not immediately reinstall. Record:

1. Exact command or action.
2. Exact error and UTC time.
3. Expected result and actual result.
4. Layer being tested: link, IP, route, DNS, port, TLS, application, identity, or authorisation.
5. One hypothesis.
6. One test that could disprove that hypothesis.
7. Result and next decision.

Use the following sequence for network failures:

```bash
ip -br link
ip -br address
ip route
ping -c 2 <LOCAL_GATEWAY>
getent hosts <HOSTNAME>
nc -vz <TARGET_IP> <PORT>
curl -vk --connect-timeout 5 https://<TARGET_IP>:<PORT>/
```

This moves from interface to application and prevents random configuration changes.

## Lab Assessment Model

Each tool lab is scored out of 100:

| Category | Points | What earns full credit |
|---|---:|---|
| Safety and scope | 15 | Isolation, authorisation, correct targets, no real data |
| Procedure and command understanding | 20 | Correct steps and a plain-language explanation of important flags |
| Technical implementation | 25 | Required control or analysis works |
| Validation and troubleshooting | 20 | Positive, negative, regression, monitoring, and rollback evidence |
| Evidence quality | 10 | Timestamped, reproducible, hashed artefacts |
| Professional communication | 10 | Clear findings, limits, risk, and next action |

Automatic fail conditions: testing outside scope, bridging a vulnerable target, using real credentials/data, fabricating evidence, or concealing a safety error.

## Project Assessment Model

Each project is scored out of 100:

| Category | Points |
|---|---:|
| Discovery, requirements, and assumptions | 10 |
| Architecture and threat/risk reasoning | 15 |
| Secure implementation | 20 |
| Monitoring and detection | 15 |
| Validation, attack-path tests, and recovery | 15 |
| Incident/vulnerability handling | 10 |
| Evidence and reproducibility | 5 |
| Technical report and executive briefing | 10 |

Professional projects deliberately contain ambiguity. A high-scoring team documents assumptions, asks targeted questions, ranks risks, records rejected options, preserves evidence, and communicates trade-offs. Completing every technical task without explaining business impact is not mastery.

## Delivery Sequence

Run Tool Lab 01 after Lesson 10, Tool Lab 02 after Lesson 16, Tool Lab 03 after Lesson 24, Tool Lab 04 after Lesson 20, Tool Lab 05 after Lesson 29, and Tool Lab 06 after Lesson 31. Run Advanced Lab 07 after Tool Lab 05 as the detailed vulnerability-assessment and remediation exercise. Begin Projects 01-03 as team exercises during the middle of the course. Projects 04-09 are portfolio projects. Run Project 11 after Lesson 29 as a focused asset and vulnerability-management engagement. Project 10 remains the final capstone after Lessons 39-40.

## Practical Files

The detailed guides are in the [guided lab index](labs/README.md) and [professional project index](projects/README.md). Use the [Core Tool Skills Pathway](CORE_TOOL_SKILLS_PATHWAY.md) for required hands-on competency checkpoints and the [Tool Mastery Guide](TOOL_MASTERY_GUIDE.md) for complete tool coverage and command packs. Reusable forms are in the [template pack](templates/README.md).
