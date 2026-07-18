# Professional Project Operating Guide

The ten projects are not long labs. Students receive an outcome, incomplete information, business constraints, and scheduled injects. The team must make and defend decisions.

## Project Index

1. [Secure a community health clinic](project-01-community-clinic.md)
2. [Make a school ransomware-ready](project-02-school-ransomware-readiness.md)
3. [Build a SOC for a fintech startup](project-03-fintech-soc.md)
4. [Rescue a breached e-commerce service](project-04-ecommerce-breach.md)
5. [Secure a remote NGO workforce](project-05-remote-ngo.md)
6. [Investigate a privileged insider](project-06-privileged-insider.md)
7. [Protect a self-hosted cloud storage service](project-07-self-hosted-cloud.md)
8. [Conduct a threat-hunting sprint](project-08-threat-hunting-sprint.md)
9. [Perform DFIR after a Linux web compromise](project-09-linux-dfir.md)
10. [Defend Northstar Manufacturing](project-10-northstar-capstone.md)

## Mandatory Team Roles

Rotate roles between projects:

- Engagement lead: scope, schedule, approvals, and stakeholder updates.
- Security architect: data flows, trust boundaries, and control design.
- Systems/network engineer: implementation and rollback.
- SOC/detection engineer: telemetry, detections, and validation.
- Incident/vulnerability analyst: evidence, triage, and risk.
- Quality reviewer: reproducibility, secrets, screenshots, and report challenge.

One person may cover two roles in a small team, but nobody approves their own high-risk change.

## Required Project Stages

1. **Discovery:** assets, owners, business services, data, dependencies, constraints, and unknowns.
2. **Scope:** written authorisation, targets, exclusions, test limits, and stop conditions.
3. **Design:** topology, data flows, threat model, risk register, control choices, and rejected options.
4. **Plan:** backlog, change tickets, acceptance tests, rollback, evidence plan, and communication cadence.
5. **Build:** small, versioned changes with before/change/after evidence.
6. **Validate:** functional, security-positive, security-negative, monitoring, recovery, and regression tests.
7. **Operate:** health checks, alert triage, vulnerability cycle, access reviews, and inject response.
8. **Report:** executive outcome, technical evidence, residual risk, roadmap, and oral defence.

## Common Command Checkpoints

### Linux

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
hostnamectl
ip -br address
ip route
sudo ss -lntup
sudo systemctl --failed
sudo journalctl -p warning --since '-2 hours' --no-pager
sudo ufw status verbose
```

### Windows and Active Directory

```powershell
Get-ComputerInfo | Select-Object WindowsProductName,WindowsVersion,OsBuildNumber,CsName
Get-NetIPConfiguration
Get-NetFirewallProfile
Get-MpComputerStatus
Get-ADDomain
Get-ADDomainController -Filter *
dcdiag /test:dns
repadmin /replsummary
gpresult /h C:\project-gpresult.html
```

### pfSense and network validation

```bash
ip route get <TARGET_IP>
nc -vz -w 3 <TARGET_IP> <PORT>
curl -vk --connect-timeout 5 https://<TARGET_IP>:<PORT>/
nmap -Pn -n -sT -p <APPROVED_PORTS> --reason <APPROVED_TARGETS>
```

### Evidence and integrity

```bash
find evidence -type f ! -name hashes.sha256 -print0 | sort -z | xargs -0 sha256sum > evidence/hashes.sha256
sha256sum --check evidence/hashes.sha256
```

These are checkpoints, not a substitute for project-specific tests.

## Inject Rules

The instructor releases injects only after the team has captured baseline evidence. Students must:

1. Record receipt and UTC time.
2. State impact on scope, severity, schedule, and risk.
3. Identify what is known, unknown, and assumed.
4. Request authority for new actions.
5. Update plans and stakeholders.
6. Preserve pre-response evidence.
7. Perform and validate the approved response.

The team loses points for silently ignoring an inject or performing unauthorised containment, even if the technical action works.

## Project Definition of Done

- The named business service works.
- The design enforces defined trust boundaries and least privilege.
- Critical changes have rollback and recovery evidence.
- Logs arrive from every required source and telemetry gaps are monitored.
- At least one custom detection has positive and negative tests.
- The vulnerability register has owners and deadlines.
- The incident runbook has been exercised.
- Evidence is timestamped, hashed, sanitised, and reproducible.
- Residual risks and limitations are explicit.
- A nontechnical executive can understand the decision required.
