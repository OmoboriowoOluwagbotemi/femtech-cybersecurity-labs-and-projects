# Lab 15 - Preserve Evidence and Build a Forensic Timeline

## Mission

Legal and the incident commander need a defensible chronology after suspicious activity on a Windows endpoint. Verify evidence integrity, examine memory and Windows logs, correlate a PCAP, and report findings without overstating certainty.

**Lessons:** 33, 35, 38
**Time:** 5 hours
**Workstation:** Kali or Ubuntu forensic VM
**Evidence:** instructor-provided Windows memory image, EVTX files, PCAP, and case manifest

## Rules

- Work from copies; make originals read-only.
- Never boot or mount an original evidence disk read-write.
- Record tool versions and every transfer.
- Keep original timestamps and timezone information.
- Do not upload evidence or hashes to public services.

## Step 1 - Establish the Case and Chain

Create:

```bash
umask 077
mkdir -p ~/cases/INC-FEM-015/{originals,working,output,notes}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee ~/cases/INC-FEM-015/notes/case-opened.txt
```

Copy instructor files into `originals`, then:

```bash
cd ~/cases/INC-FEM-015
find originals -type f -print0 | sort -z | xargs -0 sha256sum | tee notes/received-hashes.sha256
sha256sum --check notes/received-hashes.sha256
chmod -R a-w originals
cp -a originals/. working/
find working -type f -print0 | sort -z | xargs -0 sha256sum | tee notes/working-start-hashes.sha256
```

Complete a chain record for receipt, copy, analysis, transfer, and storage.

## Step 2 - Record Tool Versions

```bash
python3 --version
vol --version 2>/dev/null || python3 -m volatility3 --version
tshark --version | head -n 2
sha256sum --version | head -n 1
```

If Volatility 3 is not installed:

```bash
python3 -m venv ~/venvs/vol3
source ~/venvs/vol3/bin/activate
python -m pip install --upgrade pip
python -m pip install volatility3
vol --version
```

## Step 3 - Identify the Memory Image

```bash
file working/<MEMORY_IMAGE>
ls -lh working/<MEMORY_IMAGE>
vol -f working/<MEMORY_IMAGE> windows.info | tee output/windows-info.txt
```

Replace the placeholder with the supplied filename. `windows.info` helps identify kernel and symbol details. If symbols download, record network access and cache state.

## Step 4 - Examine Process Relationships

```bash
vol -f working/<MEMORY_IMAGE> windows.pslist | tee output/pslist.txt
vol -f working/<MEMORY_IMAGE> windows.pstree | tee output/pstree.txt
vol -f working/<MEMORY_IMAGE> windows.psscan | tee output/psscan.txt
vol -f working/<MEMORY_IMAGE> windows.cmdline | tee output/cmdline.txt
```

Compare lists:

- `pslist`: active-process linked list.
- `pstree`: parent-child relationships.
- `psscan`: pool scan that may find terminated or unlinked artefacts.
- `cmdline`: command-line context when recoverable.

An unusual parent or path is suspicious context, not proof by itself.

## Step 5 - Examine Network and Persistence Clues

```bash
vol -f working/<MEMORY_IMAGE> windows.netscan | tee output/netscan.txt
vol -f working/<MEMORY_IMAGE> windows.svcscan | tee output/svcscan.txt
vol -f working/<MEMORY_IMAGE> windows.registry.hivelist | tee output/hivelist.txt
vol -f working/<MEMORY_IMAGE> windows.malfind | tee output/malfind.txt
```

Treat `malfind` output as a lead. Legitimate software may have executable private memory. Correlate process, signer/path, network, command line, service, and timeline.

## Step 6 - Export and Query Windows Event Logs

On a Windows analysis VM, never the evidence endpoint:

```powershell
Get-WinEvent -Path .\working\Security.evtx -Oldest |
  Where-Object Id -in 4624,4625,4688,4720,4726,4732 |
  Select-Object TimeCreated,Id,RecordId,MachineName,Message |
  Export-Csv .\output\security-events.csv -NoTypeInformation
Get-WinEvent -Path .\working\Microsoft-Windows-PowerShell%4Operational.evtx -Oldest |
  Where-Object Id -in 4103,4104 |
  Select-Object TimeCreated,Id,RecordId,Message |
  Export-Csv .\output\powershell-events.csv -NoTypeInformation
```

Preserve RecordId and source filename so every timeline row can be traced back.

## Step 7 - Analyse PCAP Metadata

```bash
tshark -r working/<CASE_PCAP> -q -z conv,ip | tee output/pcap-ip-conversations.txt
tshark -r working/<CASE_PCAP> \
  -T fields -E header=y -E separator=, -E quote=d \
  -e frame.time_epoch -e ip.src -e tcp.srcport -e ip.dst -e tcp.dstport -e dns.qry.name -e tls.handshake.extensions_server_name \
  > output/pcap-timeline.csv
```

Encrypted payload may be unavailable. Do not infer file contents merely from byte counts.

## Step 8 - Hunt EVTX with Chainsaw

Use a verified release from the official WithSecureLabs repository and record the tool version plus Sigma ruleset commit. Run both a direct search and rule-based hunt:

```bash
./chainsaw --version
./chainsaw search 'svc-lab-admin' working/evtx/ --json > output/chainsaw-account-search.json
./chainsaw hunt working/evtx/ \
  -s working/sigma/rules/windows/ \
  --mapping mappings/sigma-event-logs-all.yml \
  --json --output output/chainsaw-hunt
```

For three matches, return to the original EVTX RecordId and determine whether the rule fields mapped correctly. Record false-positive possibilities and rule status.

## Step 9 - Examine a Disk Image with Sleuth Kit/Autopsy

If the instructor evidence set includes `disk.dd`, keep the original read-only:

```bash
sha256sum working/disk.dd
mmls working/disk.dd | tee output/partition-table.txt
fsstat -o <CONFIRMED_START_SECTOR> working/disk.dd | tee output/filesystem.txt
fls -r -m / -o <CONFIRMED_START_SECTOR> working/disk.dd > output/bodyfile.txt
icat -o <CONFIRMED_START_SECTOR> working/disk.dd <CONFIRMED_METADATA_ADDRESS> > output/recovered-file.bin
sha256sum output/recovered-file.bin
```

Never guess placeholders. Cross-check the recovered path, deletion status, timestamps, metadata address, and hash in Autopsy. Document any timezone interpretation performed by the GUI.

## Step 10 - Write and Test a Safe YARA Rule

Use a synthetic marker or instructor-approved inert sample. Do not scan production directories or upload evidence.

```bash
yara -w femtech-training.yar working/synthetic-note.txt
yara -s femtech-training.yar working/synthetic-note.txt | tee output/yara-positive.txt
yara femtech-training.yar working/negative.txt; test $? -eq 1 && echo 'Negative test PASS'
```

Explain strings, modifiers, condition, positive/negative corpus, false positives, performance, and why a YARA match is not a malware verdict. The full safe example is in the [Tool Mastery Guide](../TOOL_MASTERY_GUIDE.md).

## Step 11 - Build a Normalised Timeline

Use CSV columns:

```csv
time_utc,time_original,timezone,source_file,source_type,event_id,host,user,process,src_ip,dst_ip,description,evidence_locator,confidence,analyst_note
```

Normalise a copy to UTC but keep original representation. Correlate on multiple attributes: time, host, user, PID, process, IP/port, logon ID, and filename/hash.

Confidence labels:

- High: directly supported by multiple reliable artefacts.
- Medium: supported by one strong artefact or several indirect artefacts.
- Low: plausible hypothesis needing more evidence.

## Step 12 - Test Competing Hypotheses

At minimum evaluate:

1. Malicious remote access created persistence.
2. Authorised administration produced the observed artefacts.
3. Evidence comes from unrelated events combined by time drift.

For each, list supporting evidence, contradictory evidence, missing evidence, and next collection request. This protects against confirmation bias.

## Step 13 - Verify Integrity After Analysis

```bash
sha256sum --check notes/received-hashes.sha256
find output notes -type f -print0 | sort -z | xargs -0 sha256sum > notes/analysis-output-hashes.sha256
```

The originals must still match. Working copies may gain metadata depending on tools; record this rather than hiding it.

## Deliverables

- Case and chain-of-custody forms.
- Original/working hashes and tool versions.
- Volatility outputs with interpretations and limitations.
- Event-log, Chainsaw, PCAP, Sleuth Kit/Autopsy, and YARA evidence.
- At least 20 correlated UTC timeline rows with locators and confidence.
- Competing-hypothesis matrix.
- Technical findings, executive summary, and evidence appendix.
- Five forensic-readiness improvements for the organisation.

## Oral Defence

The instructor will choose three timeline claims. The student must locate the supporting source, explain the tool command, state limitations, and distinguish fact from inference without consulting the final narrative.
