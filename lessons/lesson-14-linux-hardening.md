# Lesson 14: Linux Hardening

## Lesson Overview

Linux hardening reduces attack surface and limits the effect of compromise through secure configuration, least privilege, patching, network controls, logging, and continuous validation.

This lesson covers SSH configuration, the UFW firewall, Fail2Ban, security baselines, auditd basics, and an introduction to CIS Benchmarks. Hardening must be risk-based and tested. A control that locks out administrators or interrupts patient care, payments, or public services can create unacceptable availability risk.

## Learning Objectives

Students will be able to:

- Explain hardening and configuration baselines.
- Assess and improve SSH security.
- Configure basic host firewall policy with UFW.
- Explain how Fail2Ban responds to repeated events.
- Describe auditd architecture and basic rules.
- Interpret CIS Benchmark recommendations.
- Plan testing, rollback, exception, and validation procedures.
- Produce evidence for enterprise hardening reviews.

## Prerequisite Knowledge

Students should understand Linux filesystems, packages, processes, permissions, users, groups, services, authentication logs, `journalctl`, `systemctl`, and cron from Lessons 11 through 13.

## Enterprise Relevance

Linux systems often host critical applications and Internet-facing services. Default or inconsistent configurations can expose unnecessary services, weak authentication, excessive privileges, and insufficient evidence.

Hardening supports prevention, detection, compliance, vulnerability management, and incident response.

## 1. Linux Hardening

Hardening is the systematic reduction of security risk through configuration, removal of unnecessary functionality, and implementation of safeguards.

Every service, package, account, permission, and network path can contribute to attack surface.

### How

A hardening program:

1. Inventories the asset and purpose.
2. Selects an approved baseline.
3. Assesses current state.
4. Tests changes.
5. Implements through change management.
6. Validates security and business function.
7. Records exceptions.
8. Monitors configuration drift.

### Where

Hardening applies to physical servers, VMs, cloud instances, containers, appliances, images, and templates.

## 2. Security Baselines

A security baseline is an approved minimum configuration for a defined system type and risk level.

Baselines reduce inconsistency, support repeatable deployment, and provide a measurable reference for drift.

### How

A baseline may define:

- Approved packages and services.
- Account and authentication settings.
- SSH policy.
- Firewall policy.
- File permissions.
- Logging and audit settings.
- Patch requirements.
- Time synchronization.
- Cryptographic settings.
- Monitoring agents.

### Where

Organizations create separate baselines for web servers, database servers, workstations, cloud images, containers, and high-security systems.

## 3. Baseline Versus Hardening Guide

| Item | Purpose |
|---|---|
| Hardening guide | Recommendations and implementation guidance |
| Security baseline | Organization-approved minimum configuration |
| Build standard | Repeatable technical deployment specification |
| Exception | Approved deviation with risk and compensating controls |
| Configuration drift | Unauthorized or unintended departure from the baseline |

A benchmark should not be applied blindly. Compatibility, threat model, legal obligations, service design, and availability must be considered.

## 4. SSH Security

Secure Shell (SSH) provides encrypted remote administration, file transfer, tunneling, and authentication.

SSH frequently exposes privileged management access. Weak credentials, broad exposure, unsafe keys, or poor configuration can lead to system compromise.

### How

The SSH server reads configuration, authenticates clients, creates sessions, and logs activity.

### Where

SSH is used for Linux administration, automation, file transfer, cloud access, network devices, and secure tunnels.

## 5. SSH Configuration

Server configuration is commonly stored in:

```text
/etc/ssh/sshd_config
```

Additional included files may exist under:

```text
/etc/ssh/sshd_config.d/
```

Before restarting or reloading SSH:

```bash
sudo sshd -t
```

This validates syntax but does not prove every operational requirement will work.

Inspect effective settings where supported:

```bash
sudo sshd -T
```

## 6. SSH Hardening Controls

| Control | Security Value | Operational Consideration |
|---|---|---|
| Disable direct root login | Improves accountability and reduces direct root targeting | Confirm sudo-based administration works |
| Use public-key or certificate authentication | Reduces password-guessing exposure | Protect private keys and recovery |
| Disable password authentication where appropriate | Removes online password attack path | Validate all authorized users first |
| Restrict users or groups | Limits eligible identities | Maintain accurate access lifecycle |
| Limit network sources | Reduces exposure | Support legitimate remote locations |
| Disable unused forwarding | Reduces tunneling abuse | Confirm application requirements |
| Set idle and session controls | Reduces abandoned sessions | Avoid disrupting long approved tasks |
| Log authentication activity | Supports detection and investigation | Protect and centralize logs |

Example baseline concepts:

```text
PermitRootLogin no
AllowGroups sshadmins
PasswordAuthentication no
PermitEmptyPasswords no
```

Exact settings must match the supported SSH version and organizational design.

### Safe Change Procedure

1. Keep an existing authorized session open.
2. Confirm console or recovery access.
3. Back up the configuration securely.
4. Make one controlled change.
5. Run `sshd -t`.
6. Reload rather than restart when appropriate.
7. Test a new session.
8. Verify logs.
9. Roll back if validation fails.

Changing SSH's port may reduce noise but does not replace authentication, firewalling, patching, and monitoring.

## 7. SSH Key Security

- Generate keys with approved algorithms and sizes.
- Protect private keys with file permissions and passphrases where appropriate.
- Do not share private keys.
- Restrict `authorized_keys` permissions and ownership.
- Remove keys during offboarding.
- Inventory keys and owners.
- Use certificate-based SSH at scale where appropriate.
- Rotate exposed keys.
- Avoid placing keys in images, repositories, or shared drives.

An SSH key remains an active credential even after a user's password is locked.

## 8. UFW Firewall

Uncomplicated Firewall (UFW) is a management interface commonly used on Ubuntu and related systems to configure host firewall policy.

A host firewall limits network reachability even when a service is listening.

### How

UFW translates administrator policy into underlying Linux packet-filtering rules.

### Where

UFW protects individual Linux hosts. It complements network firewalls and cloud security groups.

## 9. UFW Administration

Inspect status:

```bash
sudo ufw status verbose
sudo ufw status numbered
```

Example lab policy:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 192.168.56.0/24 to any port 22 proto tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Delete by reviewed rule number:

```bash
sudo ufw status numbered
sudo ufw delete RULE_NUMBER
```

### Firewall Safety

- Inventory required traffic.
- Confirm management source addresses.
- Ensure console recovery.
- Add management allow rules before enabling default deny.
- Consider IPv4 and IPv6.
- Validate listening services with `ss -tulpn`.
- Test from authorized source and denied source.
- Enable logging appropriate to capacity.
- Document purpose and owner for every exception.

A firewall allow rule does not make a vulnerable service secure.

## 10. Fail2Ban

Fail2Ban monitors selected log events and temporarily or permanently applies actions, commonly blocking sources that exceed configured failure thresholds.

It can reduce repeated online guessing and log noise against exposed services.

### How

Fail2Ban uses:

- **Filters:** patterns identifying relevant log events.
- **Jails:** combinations of filter, log source, thresholds, duration, and action.
- **Actions:** responses such as adding firewall blocks.

### Where

It may protect SSH, web authentication, mail services, and other log-producing applications.

## 11. Fail2Ban Operation

Useful commands vary by package and distribution:

```bash
sudo systemctl status fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

Configuration overrides commonly belong in `jail.local` or files under `jail.d`, rather than modifying package defaults.

### Limitations

- It reacts after detectable failures.
- Distributed attacks may stay below per-source thresholds.
- Shared NAT addresses can cause collateral blocking.
- Incorrect patterns may block legitimate users or miss attacks.
- IPv6 and changing addresses require testing.
- It does not replace MFA, key authentication, patching, or restricted exposure.

Monitor bans, false positives, service health, and rule effectiveness.

## 12. auditd Basics

The Linux Audit system records selected security-relevant events from the kernel. `auditd` receives and writes audit records.

Standard application logs may not provide sufficient detail about file access, system calls, account changes, or privileged actions.

### How

Audit rules select activity by system call, path, identity, permission, architecture, or other fields. Events may contain multiple correlated records.

### Where

Audit logs commonly appear in:

```text
/var/log/audit/audit.log
```

## 13. auditd Components and Commands

| Component | Purpose |
|---|---|
| Kernel audit subsystem | Generates audit events |
| `auditd` | Receives and stores events |
| Audit rules | Define selected activity |
| `ausearch` | Searches audit records |
| `aureport` | Produces summary reports |
| `auditctl` | Inspects or changes runtime rules |

Examples:

```bash
sudo systemctl status auditd
sudo auditctl -l
sudo ausearch -m USER_LOGIN --start today
sudo aureport --auth
```

## 14. Basic Audit Rules

Illustrative lab rule:

```bash
sudo auditctl -w /etc/sudoers -p wa -k sudoers_changes
```

Meaning:

- Watch `/etc/sudoers`.
- Monitor writes and attribute changes.
- Label matching events with key `sudoers_changes`.

Search:

```bash
sudo ausearch -k sudoers_changes
```

Runtime rules may disappear after reboot. Persistent rules are normally managed through approved rule files and loaded according to distribution procedures.

### Audit Rule Design

- Start with defined detection requirements.
- Avoid excessively broad rules.
- Estimate event volume.
- Protect audit logs.
- Monitor dropped events and disk pressure.
- Centralize important audit records.
- Test that rules capture the intended action.
- Document exclusions and retention.

Audit logging can affect performance and storage. More events are not automatically better security.

## 15. Audit Evidence Interpretation

Audit events may include:

- Event serial and timestamp.
- System call.
- Success or failure.
- Real and effective user IDs.
- Executable.
- Command information.
- Path records.
- Terminal and session.

Analysts must correlate all records sharing the same audit event identifier. A single line may not tell the complete story.

## 16. CIS Benchmarks

CIS Benchmarks are consensus-based secure-configuration recommendations for operating systems, cloud services, applications, and other technologies.

They provide structured assessment guidance and a common hardening reference.

### How

Organizations select an applicable benchmark and profile, tailor it to business requirements, assess current configuration, remediate approved findings, document exceptions, and monitor drift.

### Where

Benchmarks may be applied to Linux servers, Windows, cloud platforms, databases, containers, and network devices.

## 17. CIS Profile Concepts

Common benchmark profile concepts include:

- **Level 1:** practical security improvement intended to have limited operational impact.
- **Level 2:** stronger defense-in-depth recommendations that may require more planning and testing.

Profiles and labels vary by benchmark. Organizations must read the exact benchmark version and applicability.

### Benchmark Cautions

- A benchmark is not a substitute for risk assessment.
- A passing score does not prove the system is secure.
- Automated checks may require manual validation.
- Recommendations can affect applications.
- Exceptions require ownership, rationale, expiration, and compensating controls.
- Benchmark versions must match the platform.

## 18. Hardening Workflow

1. Identify system role and data.
2. Inventory packages, services, accounts, ports, and dependencies.
3. Select baseline and benchmark.
4. Assess current state.
5. Rank findings by risk.
6. Test in a representative environment.
7. Create rollback and recovery plans.
8. Obtain change approval.
9. Implement in stages.
10. Validate security and business operation.
11. Record evidence and exceptions.
12. Monitor drift and reassess.

## 19. Enterprise Scenarios

### Small Business

SSH is exposed to the Internet with password authentication. The company restricts sources through firewall and VPN, deploys keys and MFA-capable access architecture, disables direct root login, and monitors attempts.

### Financial Institution

A Linux payment server is hardened against a tailored baseline. Every exception requires an owner, risk acceptance, compensating control, and review date.

### Healthcare Organization

A blanket firewall change blocks a clinical integration. The team rolls back, maps required flows, tests a narrow rule, and validates patient-care functions before redeployment.

### University

Fail2Ban blocks a shared campus NAT address after repeated student failures. Administrators tune thresholds, improve identity controls, and monitor collateral impact.

### Government Agency

Audit rules monitor privileged configuration changes. Events are forwarded to a central SIEM where unauthorized changes trigger investigation.

### Cloud Environment

A hardened Linux image includes baseline packages, logging, EDR, firewall policy, and no embedded secrets. Continuous assessment detects drift after deployment.

## 20. Hardening Validation

Validate:

- Required services remain available.
- Unnecessary ports are closed.
- SSH policy is effective.
- Authorized administrators can connect.
- Unauthorized sources are blocked.
- Logs and audit records are generated.
- Time is synchronized.
- Monitoring agents remain healthy.
- Recovery access works.
- Configuration survives reboot where intended.

Keep command output, tickets, configuration versions, test results, and exception approvals as evidence.

## 21. Security+ SY0-701 Alignment

This lesson supports secure baselines, attack-surface reduction, host firewalls, secure remote administration, least privilege, logging, configuration management, patching, compensating controls, and continuous monitoring.

SSH, UFW, Fail2Ban, and auditd are technical controls. Hardening, validation, exception review, and recovery procedures are operational controls. Baselines and hardening policies are managerial controls and directive in function.

## 22. Hardening Depth and Failure Analysis

### Effective SSH Configuration

OpenSSH may process global settings, included files, and conditional `Match` blocks. The first obtained value for many keywords can matter, so reading one line in one file may not establish the effective policy. Use supported effective-configuration output and test with representative user, source, and host conditions.

Host keys authenticate the server and are different from user authentication keys. Unexpected host-key changes can indicate rebuild, misconfiguration, or interception and require verification through a trusted channel.

### Firewall Layers

UFW, cloud security groups, network ACLs, perimeter firewalls, container rules, and application listeners can all affect reachability. A packet must pass every relevant layer. Troubleshooting should identify where it was denied rather than opening broad rules at several layers.

Stateful firewalls commonly permit return traffic for established flows. "Default deny incoming" therefore does not mean response packets to approved outbound connections are blocked.

### Fail2Ban Trust Boundary

Fail2Ban trusts parsed log content. If an attacker can inject text that matches a filter or if a proxy causes every request to appear from one address, bans may target innocent sources. Applications behind proxies must preserve and trust client-address headers only from approved proxies.

### auditd Reliability

Audit backlog overflow, disk exhaustion, rule errors, or service failure can create evidence gaps. Audit policy should define failure behavior appropriate to system criticality. An aggressive halt-on-failure policy may protect evidentiary requirements but can create availability impact.

### Baseline Scoring

Compliance percentages can conceal severity. One failed requirement exposing remote root access may matter more than many low-impact passes. Report individual control risk, applicability, evidence, and exceptions rather than relying only on an aggregate score.

## 23. Classroom Hands-On Practical

### Practical Title

Harden and Validate an Isolated Linux Server

### Safety

Use a snapshot and host-only network. Keep console access. Do not apply these settings to production.

### Tasks

1. Record system role, IP, open ports, services, and current SSH settings.
2. Back up SSH configuration.
3. Create or verify an approved `sshadmins` group.
4. Set `PermitRootLogin no`.
5. Restrict SSH to the approved group.
6. Run `sshd -t`.
7. Reload SSH and test a new session before closing the old one.
8. Configure UFW default-deny incoming.
9. Allow SSH only from the host-only subnet.
10. Enable UFW and validate allowed and denied behavior.
11. Inspect Fail2Ban status and its SSH jail if installed.
12. Add an instructor-approved temporary audit watch.
13. Make an approved change and locate the event with `ausearch`.
14. Remove the temporary runtime rule or revert the snapshot.

### Evidence Table

| Control | Before | Change | Validation | Rollback |
|---|---|---|---|---|
| SSH root login |  |  |  |  |
| SSH access group |  |  |  |  |
| UFW inbound policy |  |  |  |  |
| auditd watch |  |  |  |  |

### Instructor Checks

- Syntax is validated before reload.
- Management access is not interrupted.
- Firewall scope is host-only.
- Audit evidence is interpreted correctly.
- Students distinguish a technical setting from its operational procedure.

## 24. Take-Home Practical

Produce a hardening plan for a fictional Linux web server containing:

- Asset and dependency inventory.
- SSH baseline.
- UFW rule table.
- Fail2Ban use and limitations.
- Account and permission requirements.
- auditd detection objectives.
- CIS Benchmark profile selection.
- Ten test cases.
- Rollback and emergency-access plan.
- Exception register with compensating controls.
- Drift-monitoring plan.

## 25. Assessment Questions

### Multiple Choice

1. What is a security baseline?
   A. Approved minimum configuration
   B. A malware hash
   C. An unrestricted firewall
   D. A shared password

2. Which command validates SSH server configuration syntax?
   A. `sshd -t`
   B. `chmod 777`
   C. `ping ssh`
   D. `crontab -l`

3. What should occur before disabling SSH password authentication?
   A. Validate alternative authorized access and recovery
   B. Close every session immediately
   C. Delete logs
   D. Disable the firewall

4. What does `ufw default deny incoming` establish?
   A. Default block for incoming traffic
   B. Default block for file reads
   C. Password expiration
   D. Audit retention

5. What is a Fail2Ban jail?
   A. Filter, threshold, timing, and action configuration
   B. Encrypted home directory
   C. Package repository
   D. VM snapshot

6. Which tool searches Linux Audit records?
   A. `ausearch`
   B. `useradd`
   C. `rmdir`
   D. `dig`

7. Why avoid excessively broad audit rules?
   A. They can create excessive volume and performance impact
   B. They remove every event
   C. They disable users
   D. They always block SSH

8. What is configuration drift?
   A. Departure from approved baseline
   B. Encrypted network traffic
   C. Password hashing
   D. DNS resolution

9. What should a baseline exception include?
   A. Owner, rationale, risk, compensating control, and review date
   B. No documentation
   C. Only a username
   D. A public private key

10. Which is an operational control?
    A. Hardening validation procedure
    B. UFW packet rule
    C. SSH encryption algorithm
    D. auditd executable

### Short Answer

1. Explain why hardening must protect availability.
2. List six SSH hardening controls.
3. Describe a safe SSH change procedure.
4. Explain why NAT or a network firewall does not replace UFW.
5. Describe Fail2Ban's strengths and limitations.
6. Explain auditd components and event correlation.
7. Distinguish a benchmark, baseline, build standard, and exception.
8. Describe continuous drift monitoring.

### Scenario Questions

1. An SSH change locks out remote administrators. Describe recovery and prevention.
2. Fail2Ban blocks a shared corporate address. Explain response and tuning.
3. Audit logs fill the disk on a payment server. Describe immediate and long-term action.
4. A CIS recommendation conflicts with a clinical application. Describe risk-based handling.

## 26. Glossary

| Term | Definition |
|---|---|
| auditd | Service receiving and storing Linux Audit events. |
| CIS Benchmark | Consensus-based secure-configuration recommendations. |
| Compensating Control | Alternative safeguard used when a primary control is not feasible. |
| Configuration Drift | Departure from an approved baseline. |
| Fail2Ban | Tool that responds to selected repeated log events, often by blocking sources. |
| Hardening | Systematic reduction of security risk through secure configuration. |
| Jail | Fail2Ban combination of filter, thresholds, timing, and actions. |
| Security Baseline | Approved minimum configuration for a defined system type. |
| SSH | Encrypted protocol for remote administration and related functions. |
| UFW | Host-firewall management interface common on Ubuntu-family systems. |

## 27. Lesson Review Checklist

- I can explain baselines and hardening.
- I can plan a safe SSH change.
- I can configure and validate basic UFW policy.
- I can explain Fail2Ban and its limitations.
- I can create and interpret a basic audit watch.
- I can apply CIS guidance through risk-based change management.
- I can validate, roll back, and document hardening.

## 28. Continuity With Future Lessons

Lesson 15 introduces Bash and Python for variables, loops, conditionals, functions, regular expressions, log parsing, and simple security automation. Students will automate only understood and tested administrative tasks.
