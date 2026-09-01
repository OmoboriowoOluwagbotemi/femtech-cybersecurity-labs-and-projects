# Lesson 13: Linux Logging and Services

## Lesson Overview

Linux logs record authentication, service, kernel, application, and scheduled-task activity. Services provide persistent system functions, while cron and systemd timers execute work according to schedules. Administrators and analysts must know where evidence is stored, how to query it, and how to distinguish normal operations from suspicious activity.

This lesson covers syslog, `auth.log`, `journalctl`, `systemctl`, cron jobs, and practical Linux log interpretation.

## Learning Objectives

Students will be able to:

- Explain the purpose and limitations of Linux logging.
- Describe syslog facilities, severities, and message flow.
- Locate common authentication and system logs.
- Query the systemd journal with `journalctl`.
- Manage and troubleshoot services with `systemctl`.
- Inspect user and system cron jobs.
- Interpret authentication, privilege, service, and scheduled-task events.
- Preserve and centralize logs for enterprise investigations.

## Prerequisite Knowledge

Students should understand Linux filesystems, commands, processes, users, groups, permissions, ownership, ACLs, and `sudo` from Lessons 11 and 12.

## Enterprise Relevance

Linux logging supports:

- SOC alert investigation.
- Incident response.
- Authentication monitoring.
- Service troubleshooting.
- Compliance evidence.
- Change validation.
- Threat hunting.
- Forensic timelines.

Logs are useful only when systems generate the right events, timestamps are reliable, storage is protected, and analysts understand context.

## 1. Linux Logging

Logging is the creation of timestamped event records describing system, service, application, security, or user activity.

Logs help answer:

- What happened?
- When did it happen?
- Which identity and system were involved?
- Did an action succeed or fail?
- What occurred before and after it?

### How

Applications may write to:

- The systemd journal.
- A syslog socket.
- Text files.
- Application databases.
- Standard output captured by a service manager.
- Remote log collectors.

### Where

Common locations include `/var/log`, the journal store, application directories, audit logs, cloud logging services, and central SIEM platforms.

## 2. Log Limitations

Absence of a log entry does not prove an event did not occur. Possible causes include:

- Logging was disabled.
- The event was not configured for collection.
- Logs rotated or expired.
- Storage filled.
- An attacker altered records.
- The service failed before writing.
- Time was incorrect.
- The analyst searched the wrong host, source, or time zone.

Logs are evidence, not infallible truth. Correlate multiple independent sources.

## 3. Syslog

Syslog is a logging model and protocol family used to send event messages from applications and systems to local or remote collectors.

It provides common routing by message source and severity.

### How

A process submits a message with a facility and severity. A syslog implementation such as `rsyslog` or `syslog-ng` applies rules and writes, forwards, or discards the message.

### Where

Syslog is used by Linux servers, network devices, firewalls, appliances, and security tools.

## 4. Syslog Facilities

Facilities identify a broad message source.

| Facility | Typical Purpose |
|---|---|
| `auth` or `authpriv` | Authentication and authorization |
| `cron` | Scheduled tasks |
| `daemon` | Background services |
| `kern` | Kernel |
| `mail` | Email services |
| `user` | User-level applications |
| `local0` through `local7` | Locally defined uses |

Facility use varies by application and distribution.

## 5. Syslog Severities

| Numeric Value | Name | Meaning |
|---:|---|---|
| 0 | Emergency | System unusable |
| 1 | Alert | Immediate action required |
| 2 | Critical | Critical condition |
| 3 | Error | Error condition |
| 4 | Warning | Warning condition |
| 5 | Notice | Normal but significant |
| 6 | Informational | Informational event |
| 7 | Debug | Detailed diagnostic event |

Lower numbers indicate higher severity. A high-severity label does not automatically equal high business impact; asset criticality and event context still matter.

Test messages may be generated in a lab:

```bash
logger -p user.notice "Lesson 13 test message"
```

## 6. Common Log Files

| Path | Common Distribution Use |
|---|---|
| `/var/log/syslog` | General system messages on Debian-family systems |
| `/var/log/messages` | General system messages on many Red Hat-family systems |
| `/var/log/auth.log` | Authentication and sudo events on Debian-family systems |
| `/var/log/secure` | Authentication and security events on many Red Hat-family systems |
| `/var/log/kern.log` | Kernel messages on some systems |
| `/var/log/cron` | Cron events on some systems |
| `/var/log/audit/audit.log` | Linux audit framework events |
| `/var/log/wtmp` | Binary login history used by `last` |
| `/var/log/btmp` | Binary failed-login history used by `lastb` |

Not every file exists on every distribution. Some systems rely primarily on the systemd journal.

## 7. Reading Text Logs

```bash
sudo less /var/log/auth.log
sudo tail -n 50 /var/log/auth.log
sudo tail -f /var/log/auth.log
sudo grep -i "failed" /var/log/auth.log
sudo grep "sudo" /var/log/auth.log
```

Analysts should normalize:

- Time and time zone.
- Hostname.
- Process name and PID.
- User and target account.
- Source address.
- Result.
- Session or correlation information.

## 8. Authentication Logs

Authentication logs may record:

- SSH success and failure.
- Invalid users.
- `sudo` execution.
- PAM decisions.
- Session opening and closing.
- Account lock or password changes.
- Service authentication.

Illustrative messages:

```text
Jul 08 10:12:04 web01 sshd[4182]: Failed password for invalid user backup from 192.0.2.44 port 51120 ssh2
Jul 08 10:12:11 web01 sshd[4187]: Accepted publickey for analyst from 10.10.20.15 port 55214 ssh2
Jul 08 10:13:02 web01 sudo: analyst : TTY=pts/0 ; PWD=/home/analyst ; USER=root ; COMMAND=/usr/bin/systemctl restart nginx
```

### Interpretation

The first event contains:

- Host: `web01`.
- Service: SSH.
- Failed authentication.
- Nonexistent account: `backup`.
- Source IP: `192.0.2.44`.

One failure may be user error or Internet noise. Many accounts from one source may indicate scanning or brute force; one common password across many accounts may indicate spraying. Correlate counts, timing, success, and follow-on activity.

## 9. systemd Journal

The systemd journal is a structured logging service managed by `systemd-journald`.

It captures metadata and supports filtering by service, boot, process, priority, and time.

### How

`journalctl` queries journal records.

### Where

Journal data may be volatile or persistent depending on configuration.

## 10. journalctl

```bash
journalctl
journalctl -b
journalctl -b -1
journalctl -u ssh.service
journalctl -p warning
journalctl --since "2026-07-08 09:00:00"
journalctl --until "2026-07-08 11:00:00"
journalctl -f
journalctl -k
journalctl -o json-pretty
```

| Option | Purpose |
|---|---|
| `-b` | Current boot |
| `-b -1` | Previous boot, if retained |
| `-u` | Specific systemd unit |
| `-p` | Priority range |
| `--since`, `--until` | Time range |
| `-f` | Follow new events |
| `-k` | Kernel messages |
| `-o` | Output format |

Use UTC or explicitly record time zone during multi-system investigations.

## 11. Journal Storage and Integrity

Check journal storage:

```bash
journalctl --disk-usage
```

Security considerations:

- Configure persistent storage where required.
- Set retention based on risk, capacity, and obligations.
- Restrict access to sensitive logs.
- Forward logs off-host.
- Monitor logging-service failure.
- Protect time synchronization.
- Avoid exposing secrets in logs.

Local root access may permit log manipulation. Central forwarding reduces, but does not eliminate, evidence risk.

## 12. Linux Services

A service is a background function managed by the operating system, commonly through systemd units.

Services provide SSH, web, database, logging, scheduling, networking, and security functions.

### How

systemd uses unit definitions, dependencies, targets, and service state.

### Where

Unit files commonly exist under `/usr/lib/systemd/system`, `/lib/systemd/system`, `/etc/systemd/system`, and runtime locations, depending on distribution.

## 13. systemctl

```bash
systemctl status ssh
systemctl is-active ssh
systemctl is-enabled ssh
sudo systemctl start service
sudo systemctl stop service
sudo systemctl restart service
sudo systemctl reload service
sudo systemctl enable service
sudo systemctl disable service
systemctl list-units --type=service
systemctl cat service
```

Important distinctions:

- **Start:** run now.
- **Enable:** configure startup behavior.
- **Stop:** stop now.
- **Disable:** remove configured startup enablement.
- **Restart:** stop and start.
- **Reload:** ask the service to reread configuration without full restart, if supported.
- **Mask:** prevent manual and dependency-based start until unmasked.

Enabling does not necessarily start a service immediately. Disabling does not necessarily stop a running service.

## 14. Service Troubleshooting

1. Check status:

```bash
systemctl status nginx
```

2. Read unit logs:

```bash
journalctl -u nginx --since "30 minutes ago"
```

3. Validate application configuration using its supported checker.
4. Check listening ports and process:

```bash
ss -tulpn
ps -ef
```

5. Check files, permissions, storage, dependencies, firewall, and mandatory access controls.
6. Apply one controlled change.
7. Validate service and business function.

Repeated restart without finding root cause may worsen impact or destroy useful volatile evidence.

## 15. Service Security

- Disable unnecessary services.
- Run with a dedicated least-privileged account.
- Restrict filesystem access.
- Use systemd hardening directives where supported.
- Limit network exposure.
- Patch software.
- Protect unit and configuration files.
- Monitor service creation and modification.
- Review unexpected child processes.

An enabled unfamiliar service can be a persistence mechanism.

## 16. Cron

Cron schedules commands according to time expressions.

It supports backups, maintenance, reports, cleanup, and automation.

### How

A standard crontab entry contains:

```text
minute hour day-of-month month day-of-week command
```

Example:

```text
30 2 * * * /usr/local/sbin/approved-backup
```

This requests execution daily at 02:30.

### Where

Cron configuration may appear in:

- User crontabs.
- `/etc/crontab`.
- `/etc/cron.d/`.
- Distribution scheduling directories.

## 17. Cron Administration

```bash
crontab -l
crontab -e
sudo crontab -l -u username
sudo ls -la /etc/cron.d
```

Security practices:

- Use absolute command paths.
- Restrict writable scripts and directories.
- Define a safe environment.
- Redirect and monitor output.
- Run with least privilege.
- Inventory and review jobs.
- Protect crontab files.
- Avoid secrets in command lines.

Cron often has a limited environment and may not use the same `PATH` as an interactive shell.

## 18. systemd Timers

systemd timers are another scheduling mechanism. They can provide dependency management, structured logging, missed-run behavior, and randomized delays.

```bash
systemctl list-timers --all
```

Analysts must inspect both cron and systemd timers when investigating scheduled persistence.

## 19. Log Rotation

Log rotation renames, compresses, archives, and removes logs according to policy.

Without rotation, logs can consume storage and disrupt services.

### How

Tools such as `logrotate` apply schedules and retention rules.

### Security Considerations

- Retain logs long enough for detection and investigation.
- Protect rotated archives.
- Verify services reopen logs correctly.
- Monitor failed rotation.
- Do not let attackers erase evidence through storage exhaustion.
- Coordinate local and centralized retention.

## 20. Reading and Interpreting Logs

Use a structured method:

1. State the investigation question.
2. Define systems and time range.
3. Confirm clock and time zone.
4. Identify authoritative sources.
5. Filter broadly, then narrow.
6. Build a timeline.
7. Correlate identities, hosts, processes, addresses, and outcomes.
8. Separate facts from hypotheses.
9. Record collection methods.
10. Preserve relevant evidence.

### Event Versus Incident

A failed login is an event. Repeated failures followed by a successful login and privilege escalation may constitute an incident. Context determines meaning.

## 21. Enterprise Scenarios

### Small Business

Repeated SSH failures target nonexistent users. The administrator confirms no success, restricts SSH exposure, enables stronger authentication, and forwards logs centrally.

### Financial Institution

A privileged `sudo` command runs outside a change window. The SOC correlates authentication, ticket, command, and endpoint evidence before escalating.

### Healthcare Organization

A clinical service repeatedly crashes. Journal logs show storage exhaustion caused by uncontrolled application logs. Teams restore capacity and correct rotation.

### University

A user cron job downloads and runs an unknown script. The account and host are contained while analysts preserve the crontab, script, network, and authentication evidence.

### Government Agency

An unauthorized systemd service starts at boot. Responders capture the unit file, binary, hashes, ownership, timestamps, journal, and related network activity.

### Cloud Environment

A cloud VM is replaced after compromise, but local logs disappear with it. Central log forwarding provides the surviving investigation record.

## 22. Centralized Logging

Centralization allows cross-host search, retention, alerting, and resilience. Sources may forward to Wazuh, Splunk, Microsoft Sentinel through collectors, or another SIEM.

Secure design includes:

- Authenticated and encrypted transport where supported.
- Source identification.
- Buffering during outages.
- Time synchronization.
- Access control.
- Parsing validation.
- Retention policy.
- Monitoring for missing sources.

Ingestion does not guarantee usefulness. Fields, timestamps, and event coverage must be validated.

## 23. Security+ SY0-701 Alignment

This lesson supports log collection, monitoring, alerting, process and service analysis, persistence detection, time synchronization, retention, incident response, and least privilege.

Logging services and permissions are technical controls. Log review, service management, rotation, and incident procedures are operational controls. Logging and retention policy is managerial and directive in function.

## 24. Logging Architecture and Evidentiary Detail

### journald and Syslog Relationship

`systemd-journald` and a syslog daemon may operate together. journald can collect kernel, service standard-output, and syslog messages; a syslog daemon may then receive or read selected journal events and write traditional files or forward them. Duplicate events across journal and text files do not necessarily represent separate actions.

### Persistent Versus Volatile Journal

Journal storage under persistent system paths can survive reboot, while runtime storage does not. Analysts should confirm storage configuration and available boot history before assuming previous-boot evidence exists.

### Process and Unit Attribution

Journal metadata may identify PID, UID, executable, command, unit, boot ID, transport, and hostname. PID alone is not globally unique across time because identifiers are reused. Correlate PID with boot ID, timestamp, process start, unit, and executable.

### Service Failure Semantics

`active`, `inactive`, `failed`, `enabled`, and `masked` describe different dimensions. A service can be active but disabled, or inactive but enabled. A unit may fail because the process exited, a dependency failed, a start timeout occurred, permissions were denied, or a configured condition was unmet.

### Cron Evidence Gaps

Cron may log that a command was launched without capturing the command's full output or proving success. Redirect output to a protected logging destination, check exit status, and instrument the underlying task. Also inspect systemd timers, `at` jobs where enabled, application schedulers, and cloud automation.

### Collection Quality

Central logging should detect silent sources. A "no alerts" dashboard can mean no attack, broken collection, parsing failure, clock drift, or an unavailable agent. Source health, ingestion delay, parse success, and expected event volume are security metrics.

## 25. Classroom Hands-On Practical

### Practical Title

Investigate Authentication, Service, and Scheduled Activity

### Safety

Use the isolated Linux VM. Generate only approved test events and record exact times.

### Tasks

1. Record current time, time zone, hostname, user, and boot ID.
2. Generate a test syslog message with `logger`.
3. Locate it using `journalctl` or the applicable text log.
4. Perform one approved failed SSH login in the host-only lab.
5. Locate the failed event and identify source, target, result, and service.
6. Run one approved `sudo` command and find its log.
7. Inspect an approved service with `systemctl status`.
8. Query its current-boot journal.
9. List user and system cron locations.
10. List systemd timers.
11. Build a timeline of the generated activity.

### Evidence Table

| Time | Host | Source | Identity | Event | Result | Interpretation |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

### Instructor Checks

- Students distinguish generated test activity from suspicious activity.
- Timestamps and time zones are recorded.
- Conclusions cite specific log fields.
- No system service is disabled without authorization.
- No persistent cron job is left behind.

## 26. Take-Home Practical

Create a Linux logging and service-monitoring plan containing:

- Required authentication, service, kernel, cron, timer, and application sources.
- Local and central retention.
- Time synchronization requirements.
- Ten detection ideas.
- Five service-health checks.
- Log-rotation controls.
- Missing-log-source alerting.
- Incident evidence checklist.

## 27. Assessment Questions

### Multiple Choice

1. Which syslog severity is most urgent?
   A. 0 Emergency
   B. 7 Debug
   C. 6 Informational
   D. 5 Notice

2. Which file commonly records authentication on Debian-family systems?
   A. `/var/log/auth.log`
   B. `/etc/passwd`
   C. `/boot/grub`
   D. `/tmp/auth`

3. Which command filters the journal by unit?
   A. `journalctl -u unit`
   B. `chmod unit`
   C. `grep -R /`
   D. `useradd unit`

4. What does `systemctl enable` normally affect?
   A. Startup configuration
   B. Current password
   C. File ownership
   D. DNS cache

5. What does disabling a service not necessarily do?
   A. Stop its current process
   B. Change boot behavior
   C. Remove enablement links
   D. Affect future startup

6. Which tool lists systemd timers?
   A. `systemctl list-timers`
   B. `crontab -e` only
   C. `chmod`
   D. `passwd`

7. Why use absolute paths in cron?
   A. Cron may have a limited environment and PATH
   B. It encrypts commands
   C. It grants root
   D. It disables logs

8. What does log rotation primarily prevent?
   A. Unbounded local log growth
   B. Authentication
   C. Service startup
   D. Time synchronization

9. Why forward logs centrally?
   A. Improve correlation and resilience to local loss
   B. Eliminate every false positive
   C. Replace endpoint security
   D. Remove timestamps

10. Which is an operational control?
    A. Daily alert review procedure
    B. Journal storage code
    C. File permission bit
    D. Syslog protocol

### Short Answer

1. Explain facility and severity.
2. List four reasons an expected log may be absent.
3. Interpret the key fields in a failed SSH message.
4. Distinguish start, enable, stop, disable, reload, and restart.
5. Explain three cron security risks.
6. Compare cron and systemd timers.
7. Describe a structured log-analysis workflow.
8. List six centralized-logging requirements.

### Scenario Questions

1. SSH failures are followed by a successful root login. Describe investigation and containment.
2. An unfamiliar service starts at every boot. Identify evidence to preserve.
3. A cron job runs a script from a world-writable directory. Assess and remediate.
4. A critical service fails because `/var` is full. Describe response and prevention.

## 28. Glossary

| Term | Definition |
|---|---|
| Cron | Time-based command scheduler. |
| Facility | Syslog classification representing a broad message source. |
| Journal | Structured event store maintained by systemd-journald. |
| Log Rotation | Controlled archival, compression, and removal of logs. |
| Severity | Syslog indication of event urgency. |
| Service | Background system or application function. |
| Syslog | Logging model and protocol family for event routing. |
| systemctl | Command for inspecting and controlling systemd units. |
| systemd Timer | systemd unit that schedules another unit. |
| Unit | Resource managed by systemd, such as a service or timer. |

## 29. Lesson Review Checklist

- I can locate and interpret Linux logs.
- I can query the systemd journal.
- I can manage and troubleshoot services.
- I can inspect cron and systemd timers.
- I can build an evidence-based timeline.
- I can explain central logging and retention.

## 30. Continuity With Future Lessons

Lesson 14 uses these logging and service skills to harden SSH, configure UFW and Fail2Ban, introduce auditd, and validate security baselines.
