# Lesson 35: Forensics Fundamentals

## Lesson Overview

Digital forensics identifies, preserves, collects, examines, analyzes, and reports digital evidence. The objective is not merely to find suspicious artifacts, but to produce repeatable findings while protecting evidence integrity and documenting limitations.

This lesson covers timeline analysis, memory forensics with Volatility, disk artifacts, chain of custody, and evidence documentation.

## Learning Objectives

Students will be able to:

- Explain forensic readiness and evidence integrity.
- Apply order-of-volatility reasoning.
- Distinguish acquisition, examination, analysis, and reporting.
- Build and validate forensic timelines.
- Explain memory acquisition and Volatility 3 workflows.
- Identify common Windows and Linux disk artifacts.
- Maintain chain of custody.
- Document tools, hashes, actions, findings, and limitations.
- Explain live-response and dead-box tradeoffs.

## Prerequisite Knowledge

Students should understand incident response, Windows and Linux internals, processes, logs, malware, persistence, hashing, cloud evidence, and chain of custody from previous lessons.

## Enterprise Relevance

Forensics supports:

- Incident scoping.
- Root-cause analysis.
- Insider investigations.
- Ransomware response.
- Legal and regulatory matters.
- Fraud.
- Data-exposure analysis.
- Lessons learned.

Evidence collection must be authorized and coordinated with legal, privacy, HR, and business requirements.

## 1. Digital Forensics

### What

Digital forensics is the disciplined handling and analysis of digital evidence.

### Why

Organizations need trustworthy answers about what happened, how, when, by whom, and with what impact.

### How

A common process:

1. Identify.
2. Preserve.
3. Collect.
4. Examine.
5. Analyze.
6. Report.

### Where

Evidence comes from endpoints, servers, mobile devices, network systems, cloud, SaaS, email, applications, memory, and storage.

## 2. Forensic Readiness

Forensic readiness prepares evidence before an incident.

Requirements:

- Logging and retention.
- Accurate time.
- Asset inventory.
- Legal authority.
- Collection tools.
- Trained staff.
- Secure evidence storage.
- Cloud and vendor access.
- Chain-of-custody forms.
- Tested procedures.

Readiness reduces response delay and evidence loss.

## 3. Evidence Principles

Evidence should be:

- Relevant.
- Authentic.
- Reliable.
- Complete enough for purpose.
- Protected.
- Reproducible.
- Documented.

Analysts should distinguish direct observation, interpretation, and hypothesis.

## 4. Order of Volatility

Volatile evidence changes or disappears quickly.

Conceptual order:

1. Running state and memory.
2. Network connections.
3. Processes and open files.
4. Temporary filesystem data.
5. Persistent disk.
6. Remote logs and backups.

The exact order depends on incident risk. Collecting memory while ransomware continues encrypting may be unacceptable. Containment and safety can take priority.

## 5. Live Response and Dead-Box Forensics

### Live Response

Collects data while the system runs.

Benefits:

- Memory.
- Decrypted content.
- Processes.
- Network state.
- Logged-in users.

Risks:

- Changes system state.
- Executes tools in compromised environment.
- May trigger malware.

### Dead-Box

Analyzes powered-off storage or forensic images.

Benefits:

- Stable media analysis.
- Easier write protection.

Limitations:

- Volatile data is lost.
- Full-disk encryption may prevent access.

## 6. Acquisition

### What

Acquisition creates a controlled copy or collection of evidence.

### Why

Analysis should preserve originals where feasible.

### How

Methods:

- Bit-for-bit disk image.
- Logical file collection.
- Memory image.
- Cloud snapshot.
- API export.
- Log export.
- Packet capture.

### Where

Method depends on system, authority, encryption, business impact, and evidence need.

## 7. Forensic Images

A physical or bit-stream image captures addressable media, including allocated and unallocated areas where supported.

A logical acquisition captures selected files and directories.

Document:

- Source device.
- Serial or unique ID.
- Tool and version.
- Acquisition mode.
- Start and end time.
- Errors.
- Destination.
- Hash.

## 8. Write Protection

Hardware or software write blockers help prevent modification of source media.

Requirements:

- Validate blocker operation.
- Document model and configuration.
- Confirm source is read-only.
- Hash acquisition.

Cloud and live systems may not support traditional physical write blocking, requiring provider-native preservation and audit controls.

## 9. Hashing Evidence

Cryptographic hashes support integrity comparison.

Use SHA-256 or another approved algorithm. Record:

- Algorithm.
- Value.
- Tool.
- Time.
- Object.

Matching acquisition and verification hashes support integrity but do not prove the source was collected correctly or lawfully.

## 10. Timeline Analysis

### What

Timeline analysis orders events from multiple evidence sources.

### Why

Attacks unfold across identity, endpoint, network, cloud, and business systems.

### How

Normalize events while retaining original timestamps and provenance.

### Where

Sources:

- Filesystem timestamps.
- Event Logs.
- Registry.
- Browser history.
- Prefetch.
- Shell history.
- Cloud audit.
- Email.
- EDR.
- Network logs.

## 11. Timeline Fields

| Field | Purpose |
|---|---|
| Normalized time | Cross-source ordering |
| Original time | Preserve evidence representation |
| Time zone | Interpret source |
| Source | Provenance |
| Host or identity | Entity |
| Event | Observation |
| Evidence reference | Reproducibility |
| Confidence | Strength |
| Interpretation | Analyst reasoning |

## 12. Timestamp Challenges

- Clock drift.
- Time-zone mismatch.
- Daylight-saving changes.
- Delayed ingestion.
- Timestamp manipulation.
- Copy or extraction changing metadata.
- Different filesystem semantics.
- Missing year or offset.

Do not force precision beyond evidence. Use ranges when necessary.

## 13. Filesystem Timestamps

Common concepts:

- Modified: content changed.
- Accessed: content read, depending on filesystem and mount policy.
- Metadata changed: permissions or other metadata changed.
- Created: available on selected filesystems.

Windows and Linux filesystems represent timestamps differently. A timestamp alone does not prove user intent.

## 14. Super Timelines

A super timeline combines many artifact sources into one chronological view.

Benefits:

- Reveals sequences.
- Identifies gaps.
- Correlates user and system activity.

Risks:

- Huge volume.
- Duplicate events.
- Incorrect parsers.
- False precision.

Filter from broad incident window toward relevant entities and behavior.

## 15. Memory Forensics

### What

Memory forensics examines captured volatile memory.

### Why

Memory may contain:

- Running processes.
- Network connections.
- Loaded modules.
- Injected code.
- Command history.
- Decrypted data.
- Credentials or keys.

### How

Acquire memory with an approved tool, hash it, preserve it, and analyze a copy.

### Where

Memory analysis is useful for malware, credential theft, rootkits, fileless activity, and active sessions.

## 16. Memory Acquisition

Requirements:

- Correct tool for OS and architecture.
- Sufficient destination storage.
- Administrative authority.
- Time and tool documentation.
- Hash.
- Minimal footprint.
- Secure storage.

Acquisition changes memory because the tool itself runs. This limitation must be documented.

## 17. Volatility

### What

Volatility is an open-source memory-forensics framework. Modern training commonly uses Volatility 3.

### Why

It reconstructs operating-system and process artifacts from memory images.

### How

Volatility plugins interpret kernel structures using symbols and framework logic.

### Where

Use on acquired memory images, not directly as a substitute for collection.

## 18. Volatility 3 Workflow

Conceptual command:

```bash
python3 vol.py -f memory.raw windows.info
```

Common Windows plugins:

```bash
windows.pslist
windows.pstree
windows.psscan
windows.cmdline
windows.netscan
windows.dlllist
windows.malfind
```

Plugin availability and syntax depend on installed version and image support.

## 19. Process Analysis

Compare:

- `pslist`: linked process listing.
- `psscan`: pool scanning that may find terminated or unlinked processes.
- `pstree`: parent-child structure.
- `cmdline`: command line.

Investigate:

- Unexpected parent.
- Unusual path.
- Missing process from one view.
- Strange start time.
- Suspicious command.
- Network connection.

Process names can be spoofed.

## 20. Memory Network Analysis

`netscan` may identify:

- Local and remote address.
- Port.
- State.
- PID.
- Process.

Correlate with:

- Firewall.
- DNS.
- EDR.
- PCAP.
- Threat intelligence.

Memory structures may be stale or partially overwritten.

## 21. Malfind Interpretation

`malfind` searches for memory regions with characteristics associated with injected or suspicious code.

A result is not automatic proof of malware. Legitimate software, security products, and runtime behavior can create unusual memory permissions.

Validate:

- Process context.
- Region permissions.
- Content.
- Disassembly.
- Related behavior.
- Signature and file evidence.

## 22. Disk Artifacts

Disk artifacts can show:

- Execution.
- Persistence.
- User activity.
- File access.
- Downloads.
- Deletion.
- External devices.
- Authentication.

Artifacts vary by OS version, configuration, application, and retention.

## 23. Windows Disk Artifacts

Examples:

- Windows Event Logs.
- Registry hives.
- Prefetch.
- Amcache.
- Shimcache.
- Scheduled tasks.
- Services.
- LNK files.
- Jump Lists.
- Browser history.
- Recycle Bin.
- NTFS metadata.

No single artifact proves execution in every circumstance. Correlate.

## 24. Registry Forensics

Registry may reveal:

- User profiles.
- USB history.
- Run keys.
- Services.
- Network configuration.
- Recently used items.
- Mounted devices.

Loaded live keys differ from offline hive files and transaction logs. Use forensic parsers and preserve source files.

## 25. Linux Disk Artifacts

Examples:

- auth logs and journal.
- auditd.
- Shell history.
- Cron.
- systemd units.
- SSH authorized keys.
- Package logs.
- `/proc` only while live.
- User home files.
- Web and application logs.

Shell history can be disabled, cleared, delayed, or incomplete.

## 26. Deleted Data

Deletion often removes references rather than immediately overwriting content.

Recovery depends on:

- Filesystem.
- SSD TRIM.
- Encryption.
- Overwrite.
- Snapshot.
- Time.

Do not promise recovery before examining storage behavior.

## 27. Cloud Forensics

Cloud evidence:

- Management audit logs.
- Identity logs.
- Snapshots.
- Object versions.
- Network flow.
- Key logs.
- Serverless logs.
- SaaS audit.

Challenges:

- Provider control.
- Ephemeral assets.
- Multi-tenancy.
- Region and jurisdiction.
- API limits.
- Shared responsibility.

Preserve logs and snapshots quickly, using provider-supported methods.

## 28. Chain of Custody

Required fields:

- Case.
- Evidence ID.
- Description.
- Source.
- Collector.
- Date and time.
- Hash.
- Packaging or storage.
- Transfers.
- Purpose.
- Signatures or acknowledgments.

Chain records should begin at identification and continue through disposition.

## 29. Evidence Storage

- Restricted access.
- Encryption.
- Integrity monitoring.
- Backup.
- Environmental protection for physical media.
- Separate analysis copies.
- Audit logs.
- Retention and disposal.

Analysts should not work directly on the only evidence copy.

## 30. Evidence Documentation

Record:

- Authority and scope.
- Tool name and version.
- Commands.
- Settings.
- Input and output hashes.
- Time.
- Errors.
- Analyst.
- Findings.
- Limitations.

Documentation should allow another qualified analyst to understand and, where possible, reproduce the work.

## 31. Forensic Report

Structure:

1. Authority and objective.
2. Evidence received.
3. Chain of custody.
4. Methods and tools.
5. Findings.
6. Timeline.
7. Interpretation.
8. Limitations.
9. Conclusion.
10. Appendices.

Use neutral language. Do not claim attribution beyond evidence.

## 32. Enterprise Scenarios

### Small Business

A compromised laptop is isolated. Memory is acquired before shutdown because fileless activity is suspected.

### Financial Institution

Fraud investigation correlates VPN, transaction, endpoint, and browser evidence with documented time offsets.

### Healthcare Organization

Clinical-server imaging is delayed until failover protects patient care. Logs and memory are preserved first.

### Educational Institution

A student disputes executing a tool. Prefetch, shell history, process logs, and account evidence are evaluated with limitations.

### Government Agency

Evidence transfers use strict chain of custody and validated storage.

### Cloud Environment

An ephemeral VM is snapshotted and audit logs exported before automation terminates it.

## 33. Security+ SY0-701 Alignment

This lesson supports digital forensics, evidence acquisition, hashing, timelines, memory, disk artifacts, chain of custody, legal hold, and incident response.

Write blockers, access controls, and evidence encryption are technical controls. Acquisition, chain of custody, analysis, and reporting are operational controls. Forensic policy and retention are managerial controls and directive in function.

## 34. Classroom Hands-On Practical

### Practical Title

Build a Forensic Timeline from Memory and Disk Evidence

### Safety

Use instructor-provided forensic images. Do not acquire or analyze personal or production devices.

### Tasks

1. Record case and evidence identifiers.
2. Verify SHA-256 hashes.
3. Document tool versions.
4. Run approved Volatility 3 plugins.
5. Identify suspicious process ancestry.
6. Correlate one network connection.
7. Review provided Event Logs and Registry artifacts.
8. Build a normalized timeline.
9. Separate facts from hypotheses.
10. Write findings and limitations.

### Timeline Table

| Normalized Time | Original Time | Source | Event | Entity | Confidence | Evidence ID |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 35. Take-Home Practical

Create a forensic-readiness and examination plan containing:

- Authority.
- Order of volatility.
- Live and dead-box decisions.
- Memory and disk acquisition.
- Hashing.
- Timeline fields.
- Windows and Linux artifacts.
- Cloud evidence.
- Chain of custody.
- Storage, reporting, and limitations.

## 36. Assessment Questions

### Multiple Choice

1. What is forensic acquisition?
   A. Controlled collection or copy of evidence
   B. Alert tuning
   C. User provisioning
   D. Firewall routing

2. Why collect memory early?
   A. It is volatile
   B. It never changes
   C. It is always on disk
   D. It contains no sensitive data

3. What does a write blocker do?
   A. Helps prevent source-media modification
   B. Encrypts network traffic
   C. Creates accounts
   D. Patches systems

4. What does a matching SHA-256 support?
   A. Integrity comparison
   B. Legal authority
   C. Correct interpretation
   D. Malware attribution

5. What does Volatility analyze?
   A. Memory images
   B. Firewall rules only
   C. DNS zones
   D. GPOs only

6. What can `pstree` show?
   A. Process parent-child relationships
   B. File encryption
   C. DHCP leases
   D. User passwords

7. Why is `malfind` not a verdict?
   A. Legitimate software can create unusual memory regions
   B. It never finds memory
   C. It only scans disk
   D. It deletes evidence

8. What does chain of custody record?
   A. Evidence possession and handling
   B. CVSS
   C. DNS resolution
   D. Patch deployment

9. Why preserve original timestamps?
   A. Normalization may change representation or introduce assumptions
   B. Time has no value
   C. Every source uses UTC
   D. Ingestion equals event time

10. Which is an operational control?
    A. Evidence-acquisition procedure
    B. Write-blocker hardware
    C. Encryption algorithm
    D. Storage ACL

### Short Answer

1. Explain forensic readiness.
2. Describe order of volatility.
3. Compare live and dead-box forensics.
4. Explain acquisition and hashing.
5. Describe timeline challenges.
6. Explain a Volatility workflow.
7. List Windows and Linux disk artifacts.
8. Describe chain of custody and reporting.

### Scenario Questions

1. Ransomware is actively encrypting while memory is needed. Decide priority.
2. A BitLocker laptop is unlocked. Describe acquisition considerations.
3. Memory and disk timelines differ by two hours. Investigate.
4. A cloud instance will auto-terminate. Preserve evidence.
5. A transferred drive lacks chain documentation. Assess evidentiary risk.

## 37. Glossary

| Term | Definition |
|---|---|
| Acquisition | Controlled collection or copy of digital evidence. |
| Chain of Custody | Record of evidence possession and handling. |
| Dead-Box Forensics | Analysis of powered-off storage or forensic images. |
| Forensic Image | Controlled copy of source storage. |
| Forensic Readiness | Preparation to collect and use digital evidence effectively. |
| Live Response | Evidence collection from a running system. |
| Order of Volatility | Priority based on how quickly evidence changes or disappears. |
| Super Timeline | Chronology combining many artifact sources. |
| Volatility | Open-source memory-forensics framework. |
| Write Blocker | Control helping prevent changes to source media. |

## 38. Lesson Review Checklist

- I can plan forensic readiness and acquisition.
- I can apply order-of-volatility reasoning.
- I can build a defensible timeline.
- I can use Volatility 3 conceptually.
- I can identify disk artifacts.
- I can maintain chain of custody.
- I can document methods, findings, and limitations.

## 39. Continuity With Future Lessons

Lesson 36 uses incident, forensic, asset, vulnerability, and threat evidence to perform risk identification, STRIDE threat modeling, risk registers, treatment, and communication.

Students should retain that forensic findings become risk inputs only when their evidence and limitations are understood.
