# Lesson 21: Endpoint Security

## Lesson Overview

Endpoints are where users, applications, credentials, data, and attackers interact. Endpoint security combines prevention, detection, investigation, containment, encryption, patching, configuration management, identity controls, and recovery.

This lesson covers Microsoft Defender, BitLocker, endpoint detection and response (EDR), patch management, and endpoint hardening. It builds on Windows architecture, IAM, malware, and incident-response concepts introduced earlier.

## Learning Objectives

Students will be able to:

- Explain endpoint security architecture and defense in depth.
- Distinguish antivirus, next-generation protection, EDR, and XDR.
- Describe Microsoft Defender security capabilities and evidence.
- Explain BitLocker, TPM protection, recovery, and operational limitations.
- Build a risk-based patch-management lifecycle.
- Design endpoint hardening and configuration-drift controls.
- Triage endpoint alerts and choose containment actions.
- Apply endpoint controls across Windows, Linux, cloud, and hybrid environments.

## Prerequisite Knowledge

Students should understand malware, ransomware, persistence, IOCs, IOAs, cryptography, identity, Windows processes and services, Active Directory, IAM, logging, and Linux hardening from prior lessons.

## Enterprise Relevance

Endpoints include:

- Employee laptops and desktops.
- Servers.
- Mobile devices.
- Virtual machines.
- Cloud instances.
- Kiosks.
- Industrial workstations.
- Privileged access workstations.

Compromised endpoints can expose credentials, data, sessions, administrative tools, and network access.

## 1. Endpoint Security

### What

Endpoint security protects devices throughout provisioning, operation, monitoring, incident response, recovery, and retirement.

### Why

Endpoints execute untrusted content, store data, authenticate users, and connect to enterprise resources.

### How

Controls include:

- Secure build.
- Patch management.
- Endpoint protection.
- EDR.
- Disk encryption.
- Host firewall.
- Application control.
- Least privilege.
- Device management.
- Logging.
- Backup and recovery.

### Where

Controls operate locally and through centralized management platforms.

## 2. Endpoint Security Lifecycle

1. Procure approved hardware.
2. Enroll device identity.
3. Apply secure image and baseline.
4. Encrypt storage.
5. Install management and security agents.
6. Assign user and access.
7. Patch and monitor.
8. Investigate and contain incidents.
9. Recover or rebuild.
10. Securely retire and sanitize.

Security begins before the first user logon and continues after reassignment.

## 3. Antivirus, EDR, and XDR

| Capability | Primary Focus |
|---|---|
| Traditional antivirus | Detect known malicious files and patterns |
| Next-generation endpoint protection | Combine signatures, behavior, reputation, cloud analysis, and attack-surface controls |
| EDR | Record endpoint activity, detect behavior, investigate, hunt, and respond |
| XDR | Correlate endpoint with identity, email, cloud, network, and other security domains |

Product labels vary. Evaluate actual telemetry, detection, response, retention, integration, and operational maturity.

## 4. Microsoft Defender

### What

Microsoft Defender is a family of security capabilities. On Windows, Microsoft Defender Antivirus provides antimalware protection. Microsoft Defender for Endpoint adds enterprise endpoint detection, investigation, response, vulnerability-related visibility, and centralized operations according to licensing and configuration.

### Why

Organizations need prevention and endpoint-level behavioral evidence.

### How

Capabilities may include:

- Real-time protection.
- Cloud-delivered protection.
- Behavior monitoring.
- Tamper protection.
- Attack-surface reduction rules.
- Network protection.
- Controlled folder access.
- EDR telemetry.
- Automated investigation and remediation.
- Device isolation.
- Live response.

### Where

Defender capabilities can protect supported Windows, Linux, macOS, mobile, server, and cloud-connected environments, with platform-specific differences.

## 5. Defender Antivirus

PowerShell inspection examples:

```powershell
Get-MpComputerStatus
Get-MpPreference
Get-MpThreatDetection
Update-MpSignature
```

Important status:

- Antivirus and antispyware enabled.
- Real-time protection.
- Behavior monitoring.
- Signature age.
- Cloud protection.
- Tamper protection visibility.
- Last scan.

Do not change exclusions or disable protection for troubleshooting without documented risk, approval, validation, and removal of the exception.

## 6. Defender Exclusions

Exclusions can improve compatibility but create blind spots.

Review:

- Exact path, process, extension, or IP.
- Business owner.
- Vendor justification.
- Scope.
- Compensating controls.
- Expiration.
- Evidence that the exclusion solves the problem.

Attackers may target excluded paths. Broad exclusions such as entire drives or temporary directories are high risk.

## 7. Attack-Surface Reduction

Attack-surface reduction (ASR) rules can block or audit risky behaviors such as:

- Office applications creating child processes.
- Credential theft from LSASS.
- Executable content from email or webmail.
- Abuse of scripts or vulnerable signed drivers.

Deployment process:

1. Confirm prerequisites.
2. Inventory applications.
3. Use audit or warning modes where appropriate.
4. Analyze events.
5. Resolve incompatibilities.
6. Enforce in stages.
7. Monitor exceptions and drift.

An ASR alert describes behavior; analysts still validate context.

## 8. EDR Concepts

### What

EDR continuously records selected endpoint activity and supports behavioral detection, investigation, threat hunting, and response.

### Why

Attackers can change file hashes and use legitimate tools. Behavior and relationships provide more durable evidence.

### How

EDR may collect:

- Process creation and ancestry.
- Command lines.
- File operations.
- Registry changes.
- Network connections.
- Logons.
- Module loads.
- Script behavior.
- Device and user context.

### Where

EDR agents send telemetry to a central platform for detection and analysis.

## 9. EDR Process Trees

A process tree shows parent-child relationships:

```text
outlook.exe
  -> winword.exe
      -> powershell.exe
          -> rundll32.exe
```

This chain can be suspicious because a document application launches a script interpreter. It is not proof by itself. Analysts review:

- Full command.
- File origin.
- User action.
- Signatures and hashes.
- Network destinations.
- Persistence.
- Similar activity.
- Business context.

PIDs are reused; timestamps, device, process start, and platform identifiers matter.

## 10. EDR Response Actions

Capabilities may include:

- Isolate device.
- Kill process.
- Quarantine file.
- Collect investigation package.
- Run live-response commands.
- Block indicator.
- Trigger scan.
- Restrict application.

Response actions require authorization and impact assessment. Isolating a clinical workstation, payment server, or domain controller can create serious availability consequences.

### Isolation

Device isolation normally restricts network communication while preserving selected management connectivity. Confirm:

- Product behavior.
- Management channel.
- Critical dependencies.
- Recovery process.
- Whether attacker access remains through allowed channels.

## 11. EDR Limitations

- Agent can be unhealthy or missing.
- Telemetry may be delayed.
- Retention may be limited.
- Encrypted or kernel-level activity may reduce visibility.
- Attackers may tamper with sensors.
- Detection rules produce false positives and negatives.
- Isolation may not revoke cloud sessions or credentials.

Endpoint response must coordinate with IAM, network, cloud, and incident-response actions.

## 12. BitLocker

### What

BitLocker provides full-volume encryption for supported Windows volumes.

### Why

It reduces data disclosure if a powered-off device or drive is lost, stolen, or accessed offline.

### How

BitLocker uses volume encryption keys protected by one or more key protectors. A Trusted Platform Module (TPM) can release key material when expected platform measurements and policy conditions are satisfied.

### Where

BitLocker protects operating-system, fixed-data, and removable volumes according to configuration.

## 13. BitLocker Protectors

Possible protectors include:

- TPM.
- TPM plus PIN.
- Recovery password.
- Startup key.
- Password for selected data or removable scenarios.
- Certificate-based mechanisms in supported contexts.

TPM-only provides transparent startup protection. TPM plus PIN adds preboot knowledge but increases support and recovery requirements.

## 14. BitLocker Operations

PowerShell:

```powershell
Get-BitLockerVolume
manage-bde -status
```

Administrators should verify:

- Protection status.
- Encryption percentage.
- Encryption method.
- Protectors.
- Recovery escrow.
- Volume type.

Suspending protection is not the same as decrypting. Suspension temporarily permits startup without normal protector enforcement while data remains encrypted, and must be controlled and re-enabled.

## 15. BitLocker Recovery

Recovery may be needed after:

- Firmware or boot changes.
- TPM changes.
- Hardware replacement.
- Policy changes.
- Repeated PIN failure.
- Boot integrity concern.

Recovery requirements:

- Secure escrow before deployment.
- Restricted access.
- Identity verification.
- Logging.
- Help-desk procedure.
- Testing.
- Rotation where exposure requires it.

A recovery key grants access to protected data and must be treated as a high-value secret.

## 16. BitLocker Limitations

BitLocker does not protect:

- Data after an authorized user unlocks the device.
- Data exfiltrated by malware during use.
- Cloud data outside the encrypted volume.
- Network traffic.
- Availability if recovery material is lost.

Combine it with secure boot, endpoint protection, authentication, least privilege, and remote device-management actions.

## 17. Patch Management

### What

Patch management identifies, evaluates, tests, deploys, verifies, and documents software and firmware updates.

### Why

Known vulnerabilities are common attack paths, but poorly managed updates can cause outages.

### How

1. Maintain asset and software inventory.
2. Monitor updates and vulnerabilities.
3. Determine applicability and exposure.
4. Prioritize by risk.
5. Test.
6. Deploy in rings.
7. Verify installation and function.
8. Remediate failures.
9. Report exceptions.

### Where

Patch operating systems, applications, browsers, drivers, firmware, security tools, and third-party software.

## 18. Risk-Based Prioritization

Consider:

- Active exploitation.
- Internet exposure.
- Vulnerability severity.
- Exploitability.
- Asset criticality.
- Privilege required.
- Compensating controls.
- Business impact.
- Patch reliability.

CVSS alone does not determine enterprise priority.

## 19. Deployment Rings

| Ring | Purpose |
|---|---|
| Test | Validate in laboratory |
| Pilot | Limited representative users and devices |
| Broad | General deployment |
| Critical or specialized | Controlled schedule based on service needs |

Emergency updates may compress timelines but still require validation and monitoring.

## 20. Patch Exceptions

An exception should include:

- Affected assets.
- Missing update.
- Technical reason.
- Business impact.
- Risk owner.
- Compensating controls.
- Expiration.
- Remediation plan.
- Review schedule.

Offline, forgotten, and unsupported devices require active escalation, not silent exclusion from compliance reports.

## 21. Endpoint Hardening

### What

Endpoint hardening applies secure configuration to reduce attack surface and constrain behavior.

### Why

Default functionality may exceed business need.

### How

Use:

- Security baselines.
- MDM or Group Policy.
- Configuration management.
- Application control.
- Host firewall.
- Least privilege.
- Secure protocols.
- Device control.
- Browser and Office hardening.
- Logging.

### Where

Hardening differs for standard users, developers, kiosks, servers, and privileged workstations.

## 22. Hardening Areas

### Accounts

- Remove unnecessary local administrators.
- Use LAPS or equivalent managed local password controls.
- Disable stale accounts.
- Restrict credential exposure.

### Applications

- Remove unsupported software.
- Restrict macros and scripts.
- Apply application allowlisting where feasible.
- Control browser extensions.

### Devices

- Restrict removable media based on risk.
- Require secure boot and TPM where applicable.
- Disable unused hardware and services.

### Network

- Host firewall.
- Secure DNS and proxy.
- Remove legacy protocols.
- Restrict remote administration.

## 23. Configuration Drift

Drift occurs when endpoint state departs from baseline.

Causes:

- User changes.
- Application installation.
- Troubleshooting exceptions.
- Failed policy.
- Offline devices.
- attacker defense impairment.

Detect through compliance reporting, configuration assessment, EDR, vulnerability scanning, and change monitoring.

## 24. Endpoint Isolation and Rebuild

Containment options:

- Network isolation.
- Account/session revocation.
- Process termination.
- Quarantine.
- Physical disconnection.
- VLAN change.

Rebuild is appropriate when trust cannot be restored efficiently, but it does not replace:

- Evidence preservation.
- Root-cause analysis.
- Credential response.
- Scope assessment.
- Data-exposure assessment.
- Persistence search elsewhere.

## 25. Enterprise Scenarios

### Small Business

Defender detects a Trojan on an accounting laptop. The device is isolated, sessions revoked, evidence collected, and the system rebuilt from a managed image.

### Financial Institution

ASR audit shows a legacy spreadsheet workflow spawning PowerShell. Teams redesign the workflow before enforcement instead of creating a broad exclusion.

### Healthcare Organization

An unpatched clinical endpoint cannot receive the current OS update. It is segmented, application allowlisted, closely monitored, and scheduled for replacement under an approved exception.

### Educational Institution

Student lab machines drift because users install software. Automated reimaging, application control, and separate research environments restore consistency.

### Government Agency

A privileged workstation triggers an LSASS-access alert. Incident responders treat it as high severity, isolate carefully, preserve memory evidence, and protect administrative credentials.

### Cloud Environment

EDR finds a cloud VM running an unexpected cryptominer. Teams isolate the VM, revoke workload credentials, inspect the image and cloud audit logs, and correct the exposed service.

## 26. SOC Endpoint Triage

1. Validate device, user, time, alert source, and severity.
2. Review process tree and command line.
3. Review file, Registry, network, and identity evidence.
4. Identify affected privilege and data.
5. Search for related behavior across endpoints.
6. Determine containment impact.
7. Preserve volatile and platform evidence.
8. Coordinate identity and cloud containment.
9. Eradicate root cause.
10. Recover and monitor.

## 27. Endpoint Metrics

- Managed-device coverage.
- EDR sensor health.
- Signature and platform currency.
- Encryption coverage and recovery escrow.
- Patch compliance by risk.
- Mean time to contain.
- Isolation success.
- Unsupported software.
- Local administrator population.
- Baseline drift.
- Exception age.

Coverage percentages should exclude neither offline nor failed devices without explicit reporting.

## 28. Security+ SY0-701 Alignment

This lesson supports endpoint protection, EDR, disk encryption, patching, secure configuration, application control, least privilege, host firewalls, incident response, and vulnerability management.

Defender, EDR, BitLocker, and hardening settings are technical controls. Patch deployment, alert triage, key recovery, and rebuild procedures are operational controls. Endpoint standards and exception policy are managerial controls and directive in function.

## 29. Classroom Hands-On Practical

### Practical Title

Assess and Respond to a Windows Endpoint Alert

### Safety

Use an instructor-approved Windows VM and sanitized alert data. Do not disable Defender, create real malware, or isolate a production device.

### Part A: Security Posture

1. Inspect Defender status with `Get-MpComputerStatus`.
2. Review relevant preferences without changing them.
3. Inspect BitLocker status.
4. Identify pending updates from an approved source.
5. Record local administrators.
6. Review host firewall profiles.

### Part B: Alert

Analyze:

```text
winword.exe
  -> powershell.exe -EncodedCommand [REDACTED]
      -> rundll32.exe C:\Users\student\AppData\Local\Temp\update.dll,Start
```

Additional evidence:

- Document arrived through email.
- DLL is unsigned.
- Outbound connection followed.
- New Run key appeared.

### Tasks

1. Build a timeline.
2. Identify IOAs and IOCs.
3. Determine evidence needed before decoding or executing content.
4. Recommend containment.
5. Include identity and session response.
6. Recommend recovery and control improvements.

### Evidence Table

| Evidence | Observation | Meaning | Confidence |
|---|---|---|---|
| Process tree | Office to PowerShell | Suspicious execution chain | High |
| Signature | Unsigned DLL | Requires validation | Medium |
| Registry | New Run entry | Possible persistence | High |

## 30. Take-Home Practical

Design an endpoint security standard containing:

- Device enrollment and inventory.
- Defender and EDR requirements.
- BitLocker and recovery.
- Patch rings and emergency updates.
- Application control.
- Local administrator management.
- Firewall and remote access.
- Baseline drift.
- Incident containment and rebuild.
- Ten metrics and ten detections.

## 31. Assessment Questions

### Multiple Choice

1. What is EDR primarily designed to provide?
   A. Endpoint telemetry, detection, investigation, and response
   B. DNS hosting
   C. Email delivery
   D. Physical access

2. Why is a process tree useful?
   A. It shows execution relationships and context
   B. It proves every process is malicious
   C. It replaces all logs
   D. It encrypts files

3. What does BitLocker primarily protect?
   A. Data on a locked or offline volume
   B. Every cloud session
   C. Network traffic
   D. Data already exfiltrated

4. What does suspending BitLocker do?
   A. Temporarily suspends normal protector enforcement while volume remains encrypted
   B. Immediately decrypts every sector
   C. Deletes recovery keys
   D. Disables TPM hardware permanently

5. Why protect recovery keys?
   A. They can unlock protected volumes
   B. They are public hashes
   C. They contain no security value
   D. They only list patches

6. Which factor most increases patch priority?
   A. Active exploitation on an exposed critical asset
   B. High CVSS with no applicability
   C. Attractive update name
   D. Large file size

7. What is configuration drift?
   A. Departure from approved baseline
   B. Normal encryption
   C. DNS lookup
   D. MFA enrollment

8. Why can a broad Defender exclusion be dangerous?
   A. Attackers may operate in the blind spot
   B. It guarantees more detections
   C. It enables BitLocker
   D. It creates backups

9. Why coordinate device isolation with IAM?
   A. Stolen cloud sessions and credentials may remain usable
   B. Isolation automatically rotates every password
   C. IAM controls disk sectors
   D. EDR cannot see processes

10. Which is an operational control?
    A. Patch testing and deployment procedure
    B. BitLocker encryption
    C. ASR rule
    D. Host firewall

### Short Answer

1. Compare antivirus, endpoint protection, EDR, and XDR.
2. List Defender status fields useful to an analyst.
3. Explain process-tree investigation.
4. Describe EDR containment limitations.
5. Explain BitLocker protectors and recovery.
6. Design a patch-management lifecycle.
7. List ten endpoint-hardening areas.
8. Explain rebuild versus full incident resolution.

### Scenario Questions

1. EDR detects LSASS access on an admin workstation. Describe response.
2. A hospital cannot patch a critical legacy endpoint. Design an exception.
3. A BitLocker recovery key appears in a ticket. Describe containment.
4. A cloud VM is isolated but its workload key remains active. Explain further response.
5. An ASR rule blocks a legitimate finance process. Describe safe tuning.

## 32. Glossary

| Term | Definition |
|---|---|
| ASR Rule | Endpoint rule controlling selected high-risk behaviors. |
| BitLocker | Windows full-volume encryption technology. |
| Configuration Drift | Departure from an approved endpoint baseline. |
| Device Isolation | EDR response restricting endpoint network communication. |
| EDR | Endpoint telemetry, behavioral detection, investigation, hunting, and response capability. |
| Endpoint | User or server computing device requiring protection. |
| Key Protector | Mechanism protecting access to a BitLocker volume key. |
| Patch Ring | Staged group used to test and deploy updates. |
| Recovery Key | Secret used to recover access to an encrypted volume. |
| TPM | Hardware security component supporting protected key operations and platform measurements. |
| XDR | Cross-domain security detection and response correlation. |

## 33. Lesson Review Checklist

- I can explain endpoint defense in depth.
- I can distinguish prevention, EDR, and XDR.
- I can evaluate Defender configuration and exclusions.
- I can investigate process trees.
- I can explain BitLocker and recovery.
- I can prioritize and deploy patches by risk.
- I can design endpoint hardening and drift monitoring.
- I can coordinate endpoint, identity, and cloud containment.

## 34. Continuity With Future Lessons

Lesson 22 applies endpoint and identity protections to VPNs, remote access, Zero Trust, RDP hardening, and secure remote work.

Students should retain:

- Endpoint isolation does not revoke credentials or sessions.
- Full-disk encryption protects offline data, not an active compromised session.
- Patch priority depends on enterprise risk, not severity alone.
- Exceptions require owners, compensating controls, and expiration.
