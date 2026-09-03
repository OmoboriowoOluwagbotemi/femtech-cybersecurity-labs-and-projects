# FEMTECH Cybersecurity Tool Mastery Guide

## Purpose

The practical programme teaches decisions and evidence, not tool collecting. This guide ensures that every important tool family from the 40 lessons is represented while keeping a clear distinction between:

- **Core:** every student must operate and troubleshoot it.
- **Role track:** required for students specialising in SOC/DFIR, infrastructure, vulnerability management, or application/cloud security.
- **Instructor shared:** valuable but resource-heavy; one shared deployment is sufficient.
- **Alternative:** performs a similar function to a core tool and is included for comparison, not duplicate installation.

Mastery means the student can state what question a tool answers, collect evidence safely, explain important options, validate results with a second source, recognise limitations, recover from failure, and communicate the result.

For the mandatory hands-on progression across Kali Linux, Ubuntu Server, pfSense, Windows Server, Greenbone/OpenVAS, and Wazuh, use the [Core Tool Skills Pathway](CORE_TOOL_SKILLS_PATHWAY.md) alongside this guide.

## Complete Tool Coverage Matrix

| Domain | Core tools | Important extensions/alternatives | Mastery evidence |
|---|---|---|---|
| Virtualisation | VirtualBox, snapshots, internal networks | Hyper-V or VMware only where already available | Adapter proof, resource plan, snapshot/recovery test |
| Firewall/routing/VPN | pfSense CE, OpenVPN, UFW | nftables, WireGuard where approved | Rule matrix, state/log evidence, allowed/denied tests |
| Linux administration | Ubuntu, Bash, systemd, journalctl, APT, ACLs, sudo | Ansible, auditd, Fail2Ban | Baseline, change, negative test, audit event, rollback |
| Windows administration | Windows Server/11 Evaluation, PowerShell, Event Viewer, Defender, Windows Firewall | Sysinternals, Sysmon, osquery | GPO/resultant policy, Defender status, EVTX evidence |
| Identity/AD | AD DS, DNS, Group Policy, PowerShell AD module | BloodHound CE for defensive path review, Windows LAPS where supported | AGDLP tests, attack-path report, remediation proof |
| Network discovery | Nmap, netcat, dig, curl, OpenSSL | arp-scan/netdiscover | Authorised scope, XML output, host validation |
| Packet/network detection | tcpdump, Wireshark/tshark, Suricata, Zeek | Snort as signature-engine alternative | PCAP/hash, alert, protocol log, false-positive analysis |
| Vulnerability management | Greenbone Community Edition/OpenVAS, CVE/CVSS | Nessus Essentials only as optional limited no-cost comparison | Validated findings, contextual priority, retest |
| Web/application security | OWASP Juice Shop, OWASP ZAP, browser developer tools | Burp Suite Community as manual-proxy alternative | Endpoint map, passive/active evidence, manual validation |
| SIEM/detection | Wazuh, Sigma, jq, Windows/Linux logs | SPL/KQL syntax comparison; Splunk/Sentinel trials not required | End-to-end event trace, rule tests, tuning and runbook |
| Endpoint visibility | Wazuh agent, Defender, Sysmon | osquery; Velociraptor for DFIR collection | Telemetry map, health test, collection/query evidence |
| Threat intelligence | MISP, VirusTotal, AlienVault OTX, AbuseIPDB | local IOC lists and STIX/TAXII concepts | Source/confidence/age/context record; no blind blocking |
| Malware/file triage | file, strings, sha256sum/Get-FileHash, YARA, ClamAV | ExifTool, FLOSS where instructor supplies safe samples | Hash, file type, strings, YARA rule/test, limitations |
| Memory/disk forensics | Volatility 3, Sleuth Kit, Autopsy, EVTX tools | Chainsaw, Velociraptor, Hayabusa alternative | Chain, image/hash, timeline, process/artifact correlation |
| Password auditing | John the Ripper or Hashcat on synthetic hashes only | password-policy analysis | Authorisation, offline test, remediation—not recovered-secret display |
| Cloud/container/DevSecOps | Docker, Trivy, Git, Gitleaks, OpenTofu | Semgrep; Podman; Syft/Grype alternative | Image digest/SBOM, secret scan, IaC validation, fixed retest |
| Automation/portfolio | Bash, Python, Git, Markdown | Ansible, GitHub | Reproducible script/playbook, clean repository, secret scan |
| Risk/compliance/reporting | Markdown/CSV templates, NIST CSF, CIS Controls | diagrams.net Community or Mermaid | Risk register, control evidence, executive decision |

## Tools Deliberately Not Required

- **Commercial EDR/SIEM/scanners:** useful in employment, but not required to complete the programme.
- **Nessus Essentials:** no-cost but limited; Greenbone is the primary vulnerability platform. Students may compare results if current licence terms allow.
- **Burp Suite Community:** excellent manual proxy, but ZAP is the primary open-source platform. Installing both is optional.
- **Snort:** important historically and conceptually; Suricata is the primary signature IDS while Zeek supplies metadata. Students must explain the distinction but need not maintain two signature engines.
- **Metasploit:** not needed for the defensive outcomes. It may be used only in a separately authorised, isolated exploitation module.
- **Mimikatz, live malware, destructive ransomware simulators, and public exploit automation:** excluded from the core course. They add safety risk without being required for the stated competencies.

## 1. Network and Protocol Mastery Pack

### Questions These Tools Answer

- What interface, address, route, resolver, neighbour, listener, and process are involved?
- Can the source reach the destination at IP and TCP/UDP level?
- Does DNS return the intended record?
- Does TLS present the intended identity and chain?
- What did the packet capture actually observe?

### Linux Baseline

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
hostnamectl
ip -br link
ip -br address
ip route show table main
ip neigh show
resolvectl status
sudo ss -lntup
```

Interpret in layers. An interface can be up without an address; an address can exist without a route; a route can work while DNS fails; a TCP port can accept while TLS identity fails.

### DNS

```bash
dig @10.10.20.10 femtech.lab SOA +noall +answer
dig @10.10.20.10 dc01.femtech.lab A +noall +answer
dig @10.10.20.10 _ldap._tcp.dc._msdcs.femtech.lab SRV +noall +answer
dig -x 10.10.20.10 +noall +answer
```

The explicit `@server` identifies which resolver answered. Record `status`, authoritative/recursive flags, TTL, and returned name/value. `NXDOMAIN`, timeout, and empty answer are different conditions.

### TCP and HTTP

```bash
nc -vz -w 3 10.10.20.20 22
curl -sS -D headers.txt -o body.bin --connect-timeout 5 http://10.10.30.20/
file body.bin
sha256sum body.bin
```

`nc` proves a TCP result, not application correctness. `curl` separates headers and body so the student can inspect status, redirect, server behaviour, and evidence hash.

### TLS

```bash
openssl s_client -connect 10.10.30.20:443 \
  -servername portal.femtech.lab \
  -CAfile femtech-root-ca.crt.pem \
  -verify_return_error </dev/null

openssl s_client -connect 10.10.30.20:443 -servername portal.femtech.lab </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -serial -dates -fingerprint -sha256 -ext subjectAltName
```

Validate chain, time, name, key usage, and revocation design. `-k` in curl may help diagnose but does not prove trust and must not be used as the final passing test.

### Nmap

```bash
sudo nmap -sn -n --reason --max-retries 2 -oA discovery 10.10.20.0/24
sudo nmap -Pn -n -sT -p 22,80,443 --reason --version-light -oA service-check 10.10.20.20
```

Use `-oA` for reproducibility. XML supports structured processing. Do not use a remote stylesheet in an offline or sensitive workflow; copy an approved local stylesheet instead.

### Capture and Wireshark/tshark

```bash
sudo timeout 120 tcpdump -ni enp0s3 -s 0 -w case.pcap 'host 10.10.20.20 and (tcp or udp)'
sha256sum case.pcap > case.pcap.sha256
capinfos case.pcap
tshark -r case.pcap -q -z io,phs
tshark -r case.pcap -q -z conv,tcp
tshark -r case.pcap -Y 'dns.flags.response==0' -T fields -e frame.time -e ip.src -e dns.qry.name
```

In Wireshark, students must master display filters, Follow TCP Stream, Conversations, Endpoints, Expert Information, packet bytes, and export of selected packet details. Capture filters and display filters use different syntax.

## 2. Windows Sysinternals and Sysmon Pack

Sysmon is a no-cost Microsoft Sysinternals service/driver. It records detailed process, network, file, and other activity but does not decide whether activity is malicious.

### Acquire and Verify

Download only from Microsoft's Sysmon page. On the isolated Windows lab:

```powershell
Get-FileHash .\Sysmon64.exe -Algorithm SHA256
Get-AuthenticodeSignature .\Sysmon64.exe | Format-List Status,StatusMessage,SignerCertificate
.\Sysmon64.exe -s | Out-File .\sysmon-schema.txt
```

Hashing records identity; Authenticode checks publisher signature; `-s` records the schema supported by that binary.

### Minimal Training Configuration

Save as `C:\FEMTECH\sysmon-lab.xml`, using the schema version shown by the installed binary:

```xml
<Sysmon schemaversion="4.90">
  <HashAlgorithms>sha256</HashAlgorithms>
  <CheckRevocation />
  <EventFiltering>
    <ProcessCreate onmatch="exclude" />
    <NetworkConnect onmatch="exclude" />
    <FileCreate onmatch="include">
      <TargetFilename condition="begin with">C:\FEMTECH\LabData\</TargetFilename>
    </FileCreate>
    <RegistryEvent onmatch="include">
      <TargetObject condition="contains">\Software\Microsoft\Windows\CurrentVersion\Run</TargetObject>
    </RegistryEvent>
  </EventFiltering>
</Sysmon>
```

Before use, replace `4.90` if `Sysmon64.exe -s` reports a different required schema. Broad process/network logging is acceptable only for the small lab; production requires volume, privacy, and performance tuning.

### Install, Verify, Generate, Export

```powershell
New-Item -ItemType Directory -Force C:\FEMTECH\LabData | Out-Null
.\Sysmon64.exe -accepteula -i C:\FEMTECH\sysmon-lab.xml
.\Sysmon64.exe -c
Get-Service Sysmon64
Get-WinEvent -LogName 'Microsoft-Windows-Sysmon/Operational' -MaxEvents 10 |
  Select-Object TimeCreated,Id,RecordId,Message

$Start = Get-Date
whoami.exe /all | Out-Null
Resolve-DnsName dc01.femtech.lab | Out-Null
'synthetic' | Set-Content C:\FEMTECH\LabData\sysmon-proof.txt
Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  StartTime=$Start
} | Select-Object TimeCreated,Id,RecordId,Message | Format-List

wevtutil epl Microsoft-Windows-Sysmon/Operational C:\FEMTECH\Sysmon-Lab.evtx /ow:true
Get-FileHash C:\FEMTECH\Sysmon-Lab.evtx -Algorithm SHA256
```

Students must interpret at least event IDs 1 (process), 3 (network when enabled), 11 (file create), 13 (registry value set), and 16 (configuration change), including ProcessGuid correlation and UTC timestamps.

### Wazuh Collection

Add the event channel to the Windows Wazuh agent configuration using the installed version's supported syntax:

```xml
<localfile>
  <location>Microsoft-Windows-Sysmon/Operational</location>
  <log_format>eventchannel</log_format>
</localfile>
```

Restart the agent, generate a known event, and trace source EVTX -> agent -> manager -> index -> dashboard. A Wazuh alert is not proof that all Sysmon events are ingested; query a known RecordId.

### Rollback

```powershell
.\Sysmon64.exe -u
Get-Service Sysmon64 -ErrorAction SilentlyContinue
```

Uninstall only after exporting required evidence and obtaining change approval.

## 3. osquery Endpoint Query Pack

osquery exposes operating-system state as SQL tables. It is useful for inventory and hunt questions, not a replacement for event logs or an EDR.

After installing an official build, open `osqueryi`:

```sql
.mode column
.headers on
SELECT hostname, cpu_brand, physical_memory FROM system_info;
SELECT name, version, install_location FROM programs ORDER BY name;
SELECT pid, name, path, cmdline, parent FROM processes ORDER BY pid;
SELECT pid, local_address, local_port, remote_address, remote_port, state FROM process_open_sockets;
SELECT name, path, status, start_type, user_account FROM services;
SELECT name, action, enabled, last_run_time, next_run_time FROM scheduled_tasks;
SELECT username, type, directory FROM users;
```

On Linux:

```sql
SELECT name, version, source FROM deb_packages ORDER BY name;
SELECT path, mode, uid, gid, mtime FROM file WHERE path IN ('/etc/passwd','/etc/sudoers','/etc/ssh/sshd_config');
SELECT name, path, source FROM crontab;
SELECT key, subkey, value, data FROM registry WHERE path LIKE 'HKEY_USERS\%\Software\Microsoft\Windows\CurrentVersion\Run%';
```

Export with explicit query and JSON:

```bash
osqueryi --json "SELECT pid,name,path,cmdline,parent FROM processes;" > processes.json
jq . processes.json >/dev/null
sha256sum processes.json
```

Always record query, time, host, osquery version, and limitations. A point-in-time query can miss a short-lived process.

## 4. Active Directory Defensive Path Analysis

The core AD lab already uses AD PowerShell, `dcdiag`, `repadmin`, Group Policy, and AGDLP. Add BloodHound Community Edition only on the isolated domain for defensive attack-path review.

### Safety

BloodHound collection contains sensitive identity and relationship data. Keep it in the SOC segment, restrict the UI, use synthetic identities, do not upload the graph, and delete exports according to the exercise retention plan.

### Workflow

1. Deploy BloodHound CE using the current SpecterOps Community Edition quickstart on an instructor-managed host.
2. Record image versions/digests, bound ports, administrator authentication, and firewall restrictions.
3. Use the current official collector with a least-privilege domain user where supported.
4. Collect only the authorised `femtech.lab` domain.
5. Hash the collection archive before import.
6. Review paths to high-value groups, excessive local admin, dangerous ACLs, sessions, delegation, and stale privilege.
7. Validate every important edge with AD PowerShell or ACL evidence.
8. Remediate one relationship and recollect to prove the edge/path is removed.

PowerShell validation examples:

```powershell
Get-ADGroupMember 'Domain Admins' -Recursive
Get-ADUser -Filter * -Properties AdminCount,Enabled,PasswordLastSet,LastLogonDate |
  Select-Object SamAccountName,Enabled,AdminCount,PasswordLastSet,LastLogonDate
Get-ADComputer -Filter * -Properties OperatingSystem,OperatingSystemVersion,LastLogonDate
Get-ACL 'AD:\OU=Servers,OU=FEMTECH,DC=femtech,DC=lab' | Format-List
```

BloodHound shows graph relationships, not automatically exploitable facts. Validate current state, reachability, credentials, control effectiveness, and business context.

## 5. Malware and File-Triage Pack

Use synthetic text/binaries or instructor-provided safe samples. Do not upload internal evidence to public services.

### Initial Triage

```bash
file suspicious.bin
stat suspicious.bin
sha256sum suspicious.bin
xxd -l 256 suspicious.bin
strings -a -n 6 suspicious.bin | head -n 100
exiftool suspicious.bin
clamscan --infected --no-summary suspicious.bin
```

`file` uses signatures/heuristics; `strings` extracts printable sequences; metadata can be forged; antivirus detection is a lead, not a verdict.

### Safe YARA Exercise

Create `synthetic-note.txt` containing only:

```text
FEMTECH_TRAINING_MARKER
contact=training.example.invalid
action=BENIGN_SIMULATION
```

Create `femtech-training.yar`:

```yara
rule FEMTECH_Benign_Training_Marker
{
    meta:
        author = "FEMTECH student"
        purpose = "Safe YARA validation"
    strings:
        $marker = "FEMTECH_TRAINING_MARKER" ascii wide
        $domain = /[a-z]+\.example\.invalid/ nocase
        $context = "BENIGN_SIMULATION" ascii
    condition:
        uint16(0) != 0x5a4d and 2 of them
}
```

Test:

```bash
yara -w femtech-training.yar synthetic-note.txt
yara -s femtech-training.yar synthetic-note.txt
printf 'ordinary approved document\n' > negative.txt
yara femtech-training.yar negative.txt; test $? -eq 1 && echo 'Negative test PASS'
```

`-s` shows matching strings. The condition requires two indicators and excludes an `MZ` header for this text-only exercise. A production YARA rule needs representative positive and benign corpora, performance tests, ownership, versioning, and response guidance.

## 6. Windows Event Hunting with Chainsaw

Chainsaw is a GPLv3 tool for rapid searching/hunting in EVTX and related artefacts. Download a signed/hash-verified release from the official WithSecureLabs repository; do not use unknown repackaged binaries.

```bash
./chainsaw --version
./chainsaw search 'svc-lab-admin' evidence/evtx/ --json > output/account-search.json
./chainsaw search -e 4720 -e 4732 evidence/evtx/ --json > output/account-events.json
./chainsaw hunt evidence/evtx/ \
  -s sigma/rules/windows/ \
  --mapping mappings/sigma-event-logs-all.yml \
  --json --output output/chainsaw-hunt
```

Record ruleset commit/hash, mapping file, tool version, excluded rules, and time filter. A Sigma match is a lead. Locate the original EVTX RecordId and validate the field mapping.

## 7. Sleuth Kit and Autopsy Disk-Forensics Pack

Autopsy provides a GUI; Sleuth Kit supplies reproducible command-line artefact extraction. Use instructor images only.

```bash
file evidence.dd
sha256sum evidence.dd
mmls evidence.dd | tee output/partition-table.txt
```

Identify the partition start sector from `mmls`, then use the confirmed offset:

```bash
fsstat -o <START_SECTOR> evidence.dd | tee output/filesystem.txt
fls -r -m / -o <START_SECTOR> evidence.dd > output/bodyfile.txt
icat -o <START_SECTOR> evidence.dd <METADATA_ADDRESS> > output/recovered-file.bin
sha256sum output/recovered-file.bin
```

Never guess the sector or metadata address. `fls` identifies metadata entries; `icat` extracts by metadata address. Record deleted status, path, timestamps, hash, and provenance. Use Autopsy to cross-check, not to replace the chain record.

## 8. Velociraptor DFIR Collection Track

Velociraptor is an optional SOC/DFIR track because it needs server/client governance. Its official quickstart uses self-signed TLS and basic authentication for short-lived private labs only; never expose that training configuration to the Internet.

Required student outcomes:

1. Verify official binary/hash and record version.
2. Generate server configuration on an isolated Ubuntu SOC host.
3. Bind/restrict admin GUI and client frontend to authorised segments.
4. Install one Windows client.
5. Run a low-impact artefact collection for system information, users, processes, network connections, and event-log inventory.
6. Export results with case metadata and hash.
7. Demonstrate collection approval, timeout, data minimisation, and deletion/retention.
8. Compare remote live collection with dead-box forensics.

Do not run broad file-content or memory-acquisition hunts without explicit authority and capacity planning.

## 9. Threat-Intelligence and MISP Pack

### Analysis Record

Every indicator lookup records:

```csv
indicator,type,source,queried_utc,first_seen,last_seen,confidence,context,age,scope,privacy_limit,corroboration,decision
```

### Public Services

VirusTotal, AlienVault OTX, and AbuseIPDB can enrich public lab indicators when instructor policy permits. Never submit files, internal domains, private IPs, customer data, or confidential hashes. API keys are secrets and must not appear in command history or reports.

Use a prompt rather than embedding a key:

```bash
read -s -p 'API key: ' VT_API_KEY; echo
curl --fail --silent --show-error \
  --header "x-apikey: $VT_API_KEY" \
  'https://www.virustotal.com/api/v3/ip_addresses/<PUBLIC_LAB_INDICATOR>' \
  --output vt-response.json
unset VT_API_KEY
jq '{id:.data.id,type:.data.type,stats:.data.attributes.last_analysis_stats}' vt-response.json
sha256sum vt-response.json
```

Check current official API terms/endpoints before use. A detection ratio is not proof of maliciousness.

### MISP Instructor-Shared Track

MISP 2.5 is free/open source and currently recommends Ubuntu 24.04 or an approved container deployment. Because it is resource-heavy, one instructor-shared instance is enough.

Students must:

- Create a synthetic event with distribution `Your organisation only`.
- Apply an appropriate threat level, analysis state, taxonomy, and TLP marking.
- Add synthetic IP/domain/hash attributes with comments and source.
- Distinguish indicator from sighting, object, galaxy, and relationship.
- Export MISP JSON and STIX-compatible output where supported.
- Hash the export and import it into a clean training organisation.
- Correct a false-positive/expired indicator without deleting audit history.
- Document sharing, retention, confidence, and data-quality rules.

## 10. Password-Auditing Pack

Password auditing is offline, synthetic, and explicitly authorised. Never use real NTLM dumps, production hashes, online guessing, credential stuffing, or public accounts.

Create a known SHA-256 training hash and tiny wordlist:

```bash
printf %s 'TrainingOnly!2026' | sha256sum | awk '{print $1}' > training.hash
printf '%s\n' 'Password123' 'TrainingOnly!2026' 'Welcome2026' > training-wordlist.txt
sha256sum training.hash training-wordlist.txt
```

John the Ripper:

```bash
john --format=Raw-SHA256 --wordlist=training-wordlist.txt training.hash
john --status
john --show --format=Raw-SHA256 training.hash
```

Hashcat alternative:

```bash
hashcat -m 1400 -a 0 training.hash training-wordlist.txt --potfile-path training.pot --session femtech-lab
hashcat -m 1400 training.hash --show --potfile-path training.pot
```

The professional outcome is not displaying a recovered password. It is explaining why fast general-purpose hashes are unsuitable for password storage and recommending a salted, adaptive password derivation function, MFA, password-manager support, monitoring, and reset/rotation procedure.

## 11. Git, Gitleaks, and Portfolio Hygiene

### Build a Local Portfolio Repository

```bash
git --version
mkdir femtech-portfolio && cd femtech-portfolio
git init
git config user.name 'FEMTECH Student'
git config user.email 'student@example.invalid'
printf '*.pcap\n*.evtx\n*.raw\n*.mem\n.env\nsecrets/\nevidence/originals/\n' > .gitignore
git add .gitignore
git commit -m 'chore: establish evidence and secret exclusions'
```

Use synthetic identity. Large evidence files, secrets, real IOCs, credentials, and personal data do not belong in a public portfolio.

### Gitleaks

Use an official release/container. Scan with redaction:

```bash
gitleaks version
gitleaks dir --redact --report-format json --report-path gitleaks-working-tree.json .
gitleaks git --redact --report-format json --report-path gitleaks-history.json .
```

If a real secret is found:

1. Do not merely delete the current file.
2. Revoke/rotate the credential immediately.
3. Preserve a restricted incident record.
4. Remove it from history using an approved procedure.
5. Notify repository consumers.
6. Add prevention and rescan all refs.

Do not place the leaked secret in tickets or screenshots.

## 12. Trivy Container, Filesystem, Secret, and IaC Pack

Use the official repository or official container image. Record Trivy version and database update time.

```bash
trivy --version
trivy image --format json --output trivy-image.json bkimminich/juice-shop
trivy fs --scanners vuln,secret,misconfig --format json --output trivy-fs.json ./project
trivy config --format table ./infrastructure
trivy image --format cyclonedx --output sbom.cdx.json bkimminich/juice-shop
sha256sum trivy-image.json trivy-fs.json sbom.cdx.json
```

Pin an image digest for repeatable comparison. Triage findings using reachability, installed vs running component, exploit prerequisites, fix availability, exposure, and business impact. Never publish an unredacted secret report.

Validation requires rescanning the exact updated digest and running application regression tests.

## 13. OpenTofu Infrastructure-as-Code Pack

OpenTofu is a Linux Foundation open-source infrastructure-as-code tool. Use it locally to learn safe configuration lifecycle without requiring paid cloud services.

```bash
tofu version
tofu fmt -recursive -check
tofu init
tofu validate
tofu plan -out=tfplan
tofu show -json tfplan > tfplan.json
trivy config .
```

Rules:

- Do not commit `.tfstate`, plan files, `.terraform/`, or credentials.
- Treat state as sensitive because it can contain infrastructure data and secrets.
- Pin providers/modules and verify sources/checksums.
- Review the plan before apply.
- Require approval and rollback/destroy planning.
- Use Gitleaks and Trivy before merge.

The project can model local Docker or lab infrastructure; students need not create a billable cloud account.

## 14. Ansible Secure-Automation Pack

Ansible demonstrates repeatable configuration at small scale. Use dedicated lab accounts and SSH keys; never place passwords in inventory.

```bash
sudo apt update && sudo apt install -y ansible
ansible --version
ansible-inventory -i inventory.ini --graph
ansible all -i inventory.ini -m ping
ansible-playbook -i inventory.ini harden.yml --syntax-check
ansible-playbook -i inventory.ini harden.yml --check --diff
ansible-playbook -i inventory.ini harden.yml --limit canary
```

Required professional controls:

- Version-controlled inventory and playbook.
- Secret encryption with Ansible Vault or an approved vault.
- Idempotence test: second run produces no unauthorised changes.
- Canary host before broad deployment.
- Check mode plus human review.
- Service health, negative security, and rollback tests.
- Log/audit evidence identifying automation identity.

## 15. Tool Selection Examination

For each final project, the team receives five questions and must select tools before running commands:

1. **Question:** What do we need to know?
2. **Best primary source:** Host, network, identity, application, cloud/container, or intelligence?
3. **Tool:** Why is it proportionate and authorised?
4. **Expected artefact:** Text, JSON, EVTX, PCAP, image, graph, alert, or report?
5. **Validation:** Which independent source can confirm or challenge the result?

Examples:

| Question | Primary tool | Validation | Common mistake |
|---|---|---|---|
| Is TCP/443 reachable? | `nc`/Nmap | pfSense state/log and server listener | Claiming application is healthy |
| Is TLS trusted for this name? | OpenSSL/curl | browser or independent client | Using `-k` as proof |
| Was a process created? | Sysmon/Event 4688 | Wazuh and process artefacts | Treating command line as user intent |
| Is a package finding real? | Greenbone | package manager/vendor advisory | Trusting banner only |
| Did a file change? | Wazuh FIM/auditd | filesystem metadata/hash/change ticket | Calling every change malicious |
| Is an AD path dangerous? | BloodHound CE | AD ACL/group/session evidence | Treating every graph edge as exploitable |
| Is a file malicious? | YARA/ClamAV/static triage | multiple artefacts/sandbox only if authorised | Uploading confidential evidence |
| Did a secret enter Git history? | Gitleaks | manual commit/path validation | Deleting file without rotating secret |
| Is an image safe to deploy? | Trivy/SBOM | digest, runtime exposure, regression | Fixating on CVSS only |

## Tool Mastery Sign-Off

For each core tool, the instructor signs only when the student can:

- Install/acquire from an official source and record version/licence.
- Verify hash/signature or image digest where available.
- State required privilege and data sensitivity.
- Run a scoped baseline command.
- Explain important flags and expected output.
- Generate a known positive and negative test.
- Save machine-readable evidence and hash it.
- Identify one false-positive and false-negative mechanism.
- Troubleshoot one failure by layer.
- Roll back/clean up safely.
- Explain when a different tool or no tool is the better choice.

Tool mastery without safety, interpretation, validation, and communication is incomplete.
