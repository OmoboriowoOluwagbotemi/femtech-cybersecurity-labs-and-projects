# Lesson 17: Windows Fundamentals

## Lesson Overview

Windows endpoints and servers are central to enterprise identity, productivity, administration, and security operations. Analysts must understand the Registry, services, processes, Event Logs, PowerShell, and the Windows security architecture that connects identities, access tokens, permissions, integrity levels, and protective controls.

This lesson establishes the Windows foundation for Windows Server, Active Directory, IAM, endpoint security, remote access, SIEM, and incident response.

## Learning Objectives

Students will be able to:

- Explain major Windows security architecture components.
- Navigate the Registry and distinguish hives, keys, values, and data.
- Inspect and manage Windows services safely.
- Analyze process identity, ancestry, command lines, signatures, and network activity.
- Locate and interpret important Windows Event Logs.
- Use basic PowerShell objects, pipelines, filtering, and help.
- Explain SIDs, access tokens, ACLs, UAC, integrity levels, and LSASS.
- Apply evidence-driven Windows troubleshooting and incident triage.

## Prerequisite Knowledge

Students should understand operating-system processes, services, files, permissions, logging, scripting, networking, and hardening from Lessons 11 through 16.

## Enterprise Relevance

Windows supports employee workstations, application servers, domain infrastructure, healthcare systems, finance platforms, education labs, and government services. Common investigations involve:

- Suspicious processes and PowerShell.
- Service persistence.
- Registry changes.
- Failed or unusual logons.
- Privilege escalation.
- Endpoint malware.
- Configuration drift.
- Event-log tampering.

## 1. Windows Architecture

### What

Windows is an operating-system family built around kernel-mode and user-mode components, securable objects, services, identities, and management interfaces.

### Why

Security decisions depend on identity, privilege, object permissions, process context, policy, and protective services.

### How

Applications run primarily in user mode and request operating-system functions through defined interfaces. Kernel-mode components manage memory, processes, devices, security enforcement, and system resources.

### Where

Windows operates on endpoints, servers, VMs, cloud instances, virtual desktops, kiosks, and specialized systems.

## 2. Core Security Components

| Component | Purpose |
|---|---|
| Security Accounts Manager (SAM) | Local account and credential-related database |
| Local Security Authority (LSA) | Local security policy and authentication functions |
| LSASS | User-mode process implementing important LSA functions |
| Security Reference Monitor | Kernel enforcement of access checks |
| Access token | Process or thread security context |
| Security identifier (SID) | Unique identifier for a user, group, or security principal |
| ACL | Permissions and audit rules on securable objects |
| UAC | Controls administrative elevation behavior |
| Windows Defender Firewall | Host network filtering |
| Microsoft Defender | Endpoint protection capabilities, depending on product and configuration |

`lsass.exe` is a high-value process because it handles authentication and security policy functions. Attempts to access its memory can indicate credential theft, but legitimate security tools may also interact with it under controlled conditions.

## 3. Security Identifiers and Access Tokens

### What

A SID identifies a security principal. An access token represents the security context of a process or thread.

### Why

Windows uses SIDs rather than display names for access decisions. Renaming an account does not change its SID.

### How

An access token may contain:

- User SID.
- Group SIDs.
- Privileges.
- Integrity level.
- Logon session information.
- Restrictions.
- Elevation state.

### Where

Tokens are created during logon and used whenever processes access files, Registry keys, services, processes, and other securable objects.

## 4. Windows Access Control

### What

Windows securable objects can have a security descriptor containing ownership and access control lists.

### Why

Permissions determine which principals can read, modify, execute, delete, administer, or audit an object.

### How

- A DACL defines allowed and denied access.
- A SACL defines auditing behavior.
- Access control entries reference SIDs and rights.
- Inheritance can propagate entries from parent objects.

### Where

Access control applies to files, folders, Registry keys, services, processes, shares, Active Directory objects, and other resources.

An empty DACL and a null DACL are not equivalent. A null DACL can allow full access, while an empty DACL grants no access. Administrators should use supported tools rather than manually constructing descriptors.

## 5. User Account Control and Integrity

### What

UAC separates normal activity from elevated administrative activity. Mandatory Integrity Control assigns integrity levels such as low, medium, high, and system.

### Why

An administrator should not perform every task with a fully elevated token.

### How

An administrative user commonly operates with a filtered token and requests elevation for administrative actions. UAC is a security boundary component and usability control, but it is not a substitute for separate accounts, least privilege, application control, or endpoint protection.

### Where

UAC affects interactive administration, installers, system settings, Registry access, services, and administrative PowerShell sessions.

## 6. The Windows Registry

### What

The Registry is a hierarchical database for operating-system, hardware, application, service, user, and policy configuration.

### Why

Windows components require structured persistent configuration. Attackers also target the Registry for persistence, defense impairment, and system modification.

### How

The hierarchy contains:

- Hives.
- Keys and subkeys.
- Values.
- Value names, types, and data.

### Where

Registry data is exposed through paths such as:

- `HKEY_LOCAL_MACHINE` (`HKLM`).
- `HKEY_CURRENT_USER` (`HKCU`).
- `HKEY_USERS` (`HKU`).
- `HKEY_CLASSES_ROOT` (`HKCR`).
- `HKEY_CURRENT_CONFIG` (`HKCC`).

## 7. Registry Hives

| Hive | Scope | Security Relevance |
|---|---|---|
| `HKLM` | System-wide | Services, drivers, software, security configuration |
| `HKCU` | Current user | User settings and user-level persistence |
| `HKU` | Loaded user profiles | Compare user-specific configuration |
| `HKCR` | Classes and file associations | Execution and handler configuration |
| `HKCC` | Current hardware profile | Active hardware configuration |

Registry hive files are stored in protected system and user-profile locations. The displayed hierarchy is assembled from loaded hives and mappings; it is not simply one file.

## 8. Registry Values and Tools

Common value types include:

- String.
- Expandable string.
- Multi-string.
- DWORD.
- QWORD.
- Binary.

PowerShell:

```powershell
Get-ChildItem Registry::HKEY_LOCAL_MACHINE\SOFTWARE
Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion'
```

Command-line:

```powershell
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion"
```

Export or document a key before an approved change. A Registry export is not a complete system backup and may contain sensitive information.

## 9. Registry Security and Persistence

Security-relevant locations include:

- Service configuration.
- Startup entries.
- Winlogon-related configuration.
- File associations.
- PowerShell policy and logging settings.
- Defender and firewall settings.

The existence of a startup entry is not proof of malware. Analysts correlate:

- Value creation time where available through evidence.
- Writing process and user.
- Referenced executable.
- Signature and hash.
- File path.
- Network activity.
- Change ticket and software installation.

Registry auditing must be configured on selected keys to generate useful security events.

## 10. Windows Services

### What

A Windows service is a long-running program managed by the Service Control Manager (SCM).

### Why

Services provide operating-system, security, networking, database, application, and management functions.

### How

A service definition includes:

- Service name and display name.
- Executable path.
- Startup type.
- Service account.
- Dependencies.
- Recovery actions.
- Permissions.

### Where

Services run on endpoints and servers, often without an interactive user session.

## 11. Inspecting Services

PowerShell:

```powershell
Get-Service
Get-Service -Name WinDefend
Get-CimInstance Win32_Service |
    Select-Object Name, State, StartMode, StartName, PathName
```

`Get-Service` shows operational state but not every configuration detail. CIM provides additional properties.

Service control:

```powershell
Start-Service -Name ServiceName
Stop-Service -Name ServiceName
Restart-Service -Name ServiceName
Set-Service -Name ServiceName -StartupType Manual
```

Use only with authorization. Stopping a security, identity, database, or clinical service can create severe impact.

## 12. Service Security

Risks include:

- Unquoted executable paths containing spaces.
- Writable service executable or directory.
- Excessive service-account privilege.
- Weak service-control permissions.
- Malicious or unexpected service creation.
- Disabled security services.
- Recovery actions launching unsafe commands.

Defenses include:

- Least-privileged service identities.
- Managed service accounts where appropriate.
- Restricted file and service permissions.
- Quoted paths.
- Application control.
- Service inventory and baseline.
- Event and EDR monitoring.

An unquoted path is exploitable only when additional conditions, such as a writable candidate location and execution behavior, are satisfied.

## 13. Windows Processes

### What

A process is a running program with virtual memory, handles, threads, token, executable image, parent relationship, and other state.

### Why

Process behavior reveals application function, malware execution, persistence, credential access, and system failures.

### How

Processes are created by other processes or operating-system mechanisms. Each has a process ID, but PIDs are reused.

### Where

Inspect through Task Manager, Resource Monitor, Process Explorer where approved, PowerShell, CIM, EDR, and event logs.

## 14. Inspecting Processes

```powershell
Get-Process
Get-Process -Id 1234
Get-CimInstance Win32_Process |
    Select-Object ProcessId, ParentProcessId, Name, ExecutablePath, CommandLine
```

Investigate:

- Executable path.
- Digital signature.
- Hash.
- Parent and child processes.
- Command line.
- User and token.
- Start time.
- Network connections.
- Loaded modules.
- Persistence.

Process name alone is weak evidence. Malware may use a trusted-looking name in an unusual path.

## 15. Process Response

```powershell
Stop-Process -Id 1234
```

Terminating a process can:

- Destroy volatile evidence.
- Interrupt business operations.
- Trigger recovery or persistence.
- Leave corrupted data.
- Fail to remove the root cause.

During an incident, coordinate process termination with containment, memory collection, identity response, and service recovery.

## 16. Windows Event Logs

### What

Windows Event Logs store structured events from operating-system components, applications, security auditing, and services.

### Why

They support troubleshooting, monitoring, compliance, and incident investigation.

### How

Event providers write records to channels. Records contain system metadata and event-specific data.

### Where

Common channels include:

- Security.
- System.
- Application.
- Setup.
- PowerShell operational logs.
- Windows Defender operational logs.
- Task Scheduler operational logs.

## 17. Event Record Fields

| Field | Meaning |
|---|---|
| Log and provider | Source channel and component |
| Event ID | Provider-specific event type |
| Level | Informational, warning, error, or other severity |
| Time created | Timestamp |
| Computer | Originating system |
| Record ID | Sequence within a log channel |
| User or subject | Identity context where provided |
| Activity or correlation ID | Relationship among events where supported |
| Event data | Provider-specific fields |

An Event ID is meaningful only with its provider and channel. The same number can mean different things from different providers.

## 18. Important Security Events

Examples commonly used in investigations include:

| Event ID | General Meaning |
|---:|---|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4634 | Logoff |
| 4648 | Logon attempt using explicit credentials |
| 4672 | Special privileges assigned to a new logon |
| 4688 | Process creation, when auditing is enabled |
| 4697 | Service installed, subject to auditing and platform behavior |
| 4720 | User account created |
| 4728 / 4732 | Member added to selected security-enabled groups |
| 1102 | Security audit log cleared |

Event presence depends on audit policy, edition, version, and configuration. Event 4688 command-line data requires relevant policy.

## 19. Logon Types

Event 4624 includes a logon type, such as:

| Type | General Context |
|---:|---|
| 2 | Interactive |
| 3 | Network |
| 4 | Batch |
| 5 | Service |
| 7 | Unlock |
| 10 | Remote interactive |
| 11 | Cached interactive |

A network logon is not automatically malicious. File sharing, remote management, applications, and services create network logons.

## 20. Event Viewer and PowerShell

PowerShell examples:

```powershell
Get-WinEvent -LogName System -MaxEvents 20
Get-WinEvent -FilterHashtable @{
    LogName = 'Security'
    Id      = 4625
    StartTime = (Get-Date).AddHours(-1)
}
```

`Get-WinEvent` supports efficient provider-side filtering. Avoid retrieving an entire large log and filtering afterward when a filter hashtable can narrow the query.

Preserve:

- Time zone.
- Channel.
- Provider.
- Event ID.
- Record ID.
- Computer.
- Relevant fields.
- Collection command and analyst identity.

## 21. Event Log Limitations

- Required auditing may be disabled.
- Logs can wrap and overwrite old records.
- Local administrators may clear or manipulate logs.
- Forwarding may fail.
- Time may drift.
- Event fields differ by version.
- A successful event does not prove authorized business activity.
- A failed event does not prove an attack.

Central forwarding and source-health monitoring improve resilience.

## 22. PowerShell Fundamentals

### What

PowerShell is a command shell, scripting language, and automation framework based on .NET objects.

### Why

It supports consistent administration and rich system data. Attackers also abuse it because it is powerful and widely available.

### How

PowerShell commands return objects with properties and methods. The pipeline passes objects rather than only text.

### Where

PowerShell is used for Windows, Microsoft 365, Azure, Active Directory, endpoint administration, and security operations.

## 23. Cmdlets and Objects

Cmdlets commonly use Verb-Noun naming:

```powershell
Get-Command
Get-Help Get-Process -Full
Get-Member
Get-Process | Get-Member
```

Object pipeline:

```powershell
Get-Process |
    Where-Object CPU -gt 100 |
    Sort-Object CPU -Descending |
    Select-Object -First 10 Name, Id, CPU
```

Formatting cmdlets should generally be used at the end for human display, not before data export or additional object processing.

## 24. PowerShell Variables and Safety

```powershell
$computerName = $env:COMPUTERNAME
$events = Get-WinEvent -LogName System -MaxEvents 10
```

Safety practices:

- Use `Get-Help`.
- Use `-WhatIf` and `-Confirm` where supported.
- Validate paths and scope.
- Avoid `Invoke-Expression` with untrusted input.
- Do not hard-code credentials.
- Use least privilege.
- Sign and control scripts where required.
- Log PowerShell activity.
- Test in an isolated environment.

Execution policy is a script-safety feature, not a strong security boundary against a determined attacker. Organizations may manage it through technical configuration and directive policy, but it does not replace application control, least privilege, or endpoint protection.

## 25. PowerShell Logging

Relevant capabilities may include:

- Script Block Logging.
- Module Logging.
- Transcription.
- Process creation auditing.
- AMSI integration.
- Defender or EDR telemetry.

These have privacy, volume, and sensitive-data considerations. Protect logs and validate that events reach the SIEM.

## 26. Windows Security Architecture in Operation

Example access sequence:

1. User authenticates.
2. Windows creates a logon session and access token.
3. A process receives the token.
4. The process requests access to a securable object.
5. Windows compares the token with the object's security descriptor.
6. Mandatory integrity and other policy may further constrain access.
7. Auditing may generate an event if configured.

Authentication success, token privilege, object authorization, and auditing are separate stages.

## 27. Windows Persistence Examples

Common mechanisms include:

- Services.
- Scheduled tasks.
- Startup folders.
- Registry Run keys.
- WMI event subscriptions.
- Browser or application extensions.
- New accounts or group membership.

Legitimate software uses these mechanisms. Analysts correlate creator, time, path, signature, command, user, network, and change history.

## 28. Enterprise Scenarios

### Small Business

An unsigned program launches from a user's temporary directory and creates a Run key. Defender isolates the file while the analyst reviews process, Registry, download, and identity evidence.

### Financial Institution

A new service runs under a highly privileged account. The bank confirms whether a change ticket exists, validates the binary and permissions, and investigates the creating identity.

### Healthcare Organization

A clinical application service stops repeatedly. System and application logs show a dependency failure rather than malware. Controlled recovery restores availability while preserving evidence.

### Educational Institution

PowerShell runs an encoded command on a lab workstation. Analysts inspect the full command, parent process, user, script-block logs, network activity, and whether the activity belongs to an approved class exercise.

### Government Agency

Security Event Log 1102 indicates clearing. The SOC checks who performed it, whether forwarding preserved prior records, and whether privilege or defense-evasion activity preceded it.

### Cloud Environment

A Windows cloud VM has RDP-related logons from an unexpected address. Teams correlate cloud flow logs, Windows logon types, identity records, endpoint telemetry, and network policy.

## 29. Troubleshooting Workflow

1. Confirm the symptom and business impact.
2. Record time, host, user, and recent changes.
3. Check process and service state.
4. Check relevant Registry and configuration.
5. Review System, Application, and Security logs.
6. Check network sockets and firewall.
7. Validate permissions and token context.
8. Make one approved change.
9. Confirm service and security state.
10. Document evidence and rollback.

Do not disable Defender, firewall, UAC, or auditing merely to make a problem disappear.

## 30. Security Operations Evidence

Useful sources include:

- Security, System, and Application logs.
- PowerShell operational logs.
- Defender and EDR telemetry.
- Registry auditing.
- Service and scheduled-task events.
- Prefetch and other endpoint artifacts where applicable.
- Firewall and network connections.
- File hashes and signatures.
- Cloud and identity logs.

The meaning of an event depends on collection configuration and system role.

## 31. Security+ SY0-701 Alignment

This lesson supports endpoint architecture, least privilege, access control, processes, services, secure configuration, PowerShell, event logging, endpoint monitoring, and incident response.

Windows ACLs, UAC, firewall, and Defender are technical controls. Service review, log review, troubleshooting, and incident procedures are operational controls. Windows baselines and scripting policies are managerial controls and directive in function.

## 32. Classroom Hands-On Practical

### Practical Title

Build a Windows Process, Service, Registry, and Event Timeline

### Safety

Use an instructor-approved Windows VM on host-only networking with a clean snapshot. Do not disable security controls or edit protected Registry locations.

### Tasks

1. Record Windows version, hostname, current user, and groups.
2. List services and inspect one approved service through CIM.
3. Record service state, startup mode, identity, and path.
4. List processes with PID, PPID, path, and command line.
5. Identify one signed Windows process and verify its path.
6. Read an approved Registry key.
7. Generate an instructor-approved test event, such as starting a benign process.
8. Query recent process or system events according to enabled auditing.
9. Query recent failed logons from a provided exported log if local generation is unavailable.
10. Build a timeline and distinguish facts from hypotheses.

### Evidence Table

| Time | Source | Event | Identity | Process or Service | Interpretation |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

### Instructor Checks

- Students use provider and channel with Event ID.
- Students do not assume a process name proves legitimacy.
- Service changes are not made without authorization.
- PowerShell pipelines preserve objects until final formatting.
- Conclusions identify missing evidence.

## 33. Take-Home Practical

Create a Windows endpoint baseline containing:

- Operating-system and security architecture summary.
- Ten important Registry locations or categories.
- Service inventory and risk fields.
- Process investigation checklist.
- Event-log collection plan.
- PowerShell logging requirements.
- Five persistence scenarios.
- Ten detection ideas.
- Troubleshooting and rollback workflow.

## 34. Assessment Questions

### Multiple Choice

1. What uniquely identifies a Windows security principal?
   A. SID
   B. PID
   C. Port
   D. Filename

2. What does an access token represent?
   A. Process or thread security context
   B. Registry backup
   C. Network route
   D. File hash only

3. Which Registry hive primarily contains system-wide configuration?
   A. `HKLM`
   B. `HKCU`
   C. `HKCC` only
   D. `HKU` only

4. Which component manages Windows services?
   A. Service Control Manager
   B. DNS resolver
   C. Registry Editor only
   D. Taskbar

5. Why is process name weak evidence?
   A. Malware can use a trusted-looking name in an unusual path
   B. Processes have no path
   C. Windows has no signatures
   D. PIDs never change

6. What does Security Event ID 4625 generally represent?
   A. Failed logon
   B. Successful logon
   C. Service installation
   D. Log clearing

7. Why must Event ID be paired with provider and channel?
   A. IDs are provider-specific and may have different meanings
   B. Every ID is globally unique
   C. Channels contain no metadata
   D. Providers are usernames

8. What does a PowerShell pipeline primarily pass?
   A. Objects
   B. Only unstructured screen text
   C. Registry hives
   D. Passwords

9. Why is execution policy not a complete security boundary?
   A. It can be bypassed and is intended mainly as a script-safety control
   B. It encrypts every script
   C. It replaces Defender
   D. It prevents all PowerShell use

10. Which is an operational control?
    A. Weekly service-baseline review
    B. Windows ACL enforcement
    C. UAC token filtering
    D. Defender engine

### Short Answer

1. Explain SID, access token, DACL, and SACL.
2. Describe UAC and integrity levels.
3. Distinguish Registry hives, keys, values, types, and data.
4. List six service-security checks.
5. Describe a process investigation.
6. Explain five important Windows security events.
7. Describe PowerShell's object pipeline.
8. List six PowerShell security practices.

### Scenario Questions

1. A new auto-start service runs from a writable directory. Describe risk, evidence, and response.
2. Event 1102 appears after a privileged logon. Describe investigation and preservation.
3. Encoded PowerShell launches from an Office application. Describe triage.
4. A clinical service fails repeatedly after patching. Describe secure troubleshooting.
5. A local administrator account is renamed. Explain why SID-based permissions remain relevant.

## 35. Glossary

| Term | Definition |
|---|---|
| Access Token | Windows object representing a process or thread security context. |
| DACL | Access control list defining allowed and denied rights. |
| Event Channel | Named destination containing events from one or more providers. |
| Event ID | Provider-defined identifier for an event type. |
| Integrity Level | Mandatory label constraining interaction among processes and objects. |
| LSASS | Process implementing important Local Security Authority functions. |
| PowerShell Cmdlet | .NET-based command following a Verb-Noun naming pattern. |
| Registry | Hierarchical Windows configuration database. |
| SACL | Access control list defining auditing behavior. |
| Security Descriptor | Object containing ownership, control, and ACL information. |
| SID | Unique identifier for a Windows security principal. |
| Service Control Manager | Windows component managing service definitions and state. |
| UAC | Mechanism separating standard activity from administrative elevation. |

## 36. Lesson Review Checklist

- I can explain Windows security architecture.
- I can inspect Registry structure safely.
- I can investigate services and processes.
- I can interpret Event Logs with provider context.
- I can explain common logon types and security events.
- I can use PowerShell objects and filtering.
- I can distinguish authentication, token creation, authorization, and auditing.
- I can conduct evidence-driven Windows troubleshooting.

## 37. Continuity With Future Lessons

Lesson 18 expands these foundations into Windows Server DNS, DHCP, Event Viewer, server roles, and basic server hardening.

Students should carry forward:

- Display names are not security identifiers.
- Process and service names require path, identity, signature, and behavior context.
- Event IDs require provider, channel, fields, and audit-policy context.
- Configuration changes need validation and rollback.
- Security controls should not be disabled as a troubleshooting shortcut.
