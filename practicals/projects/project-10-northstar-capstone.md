# Project 10 - Defend Northstar Manufacturing

## Scenario

Northstar Manufacturing is a fictional 120-person company producing safety equipment. It has Windows domain services, engineering and finance endpoints, an Ubuntu ERP API, a supplier portal in a DMZ, remote vendors, and a small factory network represented by a protected lab segment. After rapid growth, security is inconsistent. The board gives your team one month to assess, improve, monitor, and defend the environment.

During the project, a multi-stage simulated incident will occur. The team will not know the full story in advance.

**Duration:** 3-4 weeks
**Tools:** every core free/no-cost tool used in the programme plus one defended role-track selection from the [Tool Mastery Guide](../TOOL_MASTERY_GUIDE.md)
**Lessons:** all 40

## Constraints

- Production-equivalent ERP downtime: maximum 30 minutes per change.
- Factory segment cannot be scanned aggressively.
- Vendor needs time-bound access to one service.
- Finance data and engineering designs are confidential.
- Windows evaluation software is lab-only.
- Team must work within a fixed virtual resource budget.
- No malware, denial of service, or public-target testing.

## Week 1 - Discover, Assess, and Plan

1. Establish scope, authority, roles, escalation, evidence, and communications.
2. Inventory assets, services, software, identity, data, certificates, remote access, logs, and dependencies.
3. Build topology, data flow, trust boundaries, attack paths, and administrative paths.
4. Perform controlled Nmap and Greenbone assessments.
5. Review AD, Linux, Windows, pfSense, endpoint, and backup baselines.
6. Produce risk register, compliance crosswalk, and prioritised backlog.
7. Present a change roadmap to the instructor change board.

Required command evidence includes all common project checkpoints plus:

```powershell
dcdiag /test:dns /v
repadmin /replsummary
Get-ADGroupMember 'Domain Admins'
Get-GPOReport -All -ReportType Html -Path C:\northstar-gpos.html
```

```bash
sudo sshd -T | sort
sudo auditctl -l
sudo ufw status verbose
sudo find /etc /opt -xdev -type f -mtime -7 -printf '%TY-%Tm-%TdT%TH:%TM:%TS %u %g %m %p\n' | head -n 200
```

## Week 2 - Build the Defensive Architecture

Implement through approved tickets:

- USERS, SERVERS, DMZ, SOC, and FACTORY segmentation.
- Role-based AD and Linux access with privileged separation.
- Secure vendor access with expiry and least privilege.
- Linux/Windows hardening and endpoint controls.
- Private-PKI TLS for internal services.
- Backups with restore validation.
- Wazuh agents and network detection.

Every change must show before state, exact implementation, positive/negative/regression/monitoring tests, rollback, and owner sign-off.

## Week 3 - Detect, Hunt, and Operate

Build a minimum catalogue of ten detections:

1. Repeated failure followed by success.
2. Privileged-group change.
3. New local/domain account.
4. PowerShell or script execution pattern.
5. Linux sudo/SSH anomaly.
6. Critical configuration/FIM change.
7. Network scan/lateral movement pattern.
8. DMZ-to-internal policy violation.
9. Unusual outbound destination.
10. Telemetry/backup failure.

Run a purple-team validation with benign course simulations. Conduct a hunt and tune at least two detections. Maintain daily platform-health and ticket queues.

## Week 4 - Incident and Recovery

The instructor releases staged evidence. The team must execute NIST-style preparation, detection/analysis, containment, eradication, recovery, and lessons learned while keeping the board informed.

Minimum incident artefacts:

- Incident record and authority log.
- Evidence register and chain/hashes.
- SIEM queries, logs, PCAP, host evidence, and threat-intelligence notes.
- UTC timeline and fact/hypothesis table.
- ATT&CK mapping with evidence.
- Severity and containment options.
- Recovery and monitoring evidence.
- Executive and technical reports.

## Instructor Inject Schedule

Inject details are withheld from students. Themes include:

1. Unknown asset in the FACTORY segment.
2. Vendor access request outside the approved window.
3. Certificate expiry warning during a change freeze.
4. Critical vulnerability with incomplete exploit context.
5. Wazuh telemetry gap on a key server.
6. Authentication anomaly and configuration change.
7. Misleading threat-intelligence hit.
8. Business pressure to restore before evidence is complete.

## Required Deliverable Set

### Governance and design

- Charter, scope, RACI, rules of engagement, assumptions, meeting log.
- Asset/data/dependency/certificate/log inventories.
- Architecture, data flows, trust boundaries, and attack paths.
- STRIDE model, risk register, and NIST CSF/CIS crosswalk.

### Implementation

- Sanitised pfSense, AD/GPO, Linux, Windows, PKI, Wazuh, and IDS configurations.
- Change tickets and test results.
- Access, firewall, vulnerability, backup, restore, and failover evidence.
- Tool mastery records covering acquisition/source, version, licence, signature/digest, privilege, positive/negative tests, limitations, troubleshooting, and cleanup.

### Security operations

- Ten-detection catalogue and test packs.
- Dashboards, health checks, tuning records, hunt report, and runbooks.
- Incident evidence, timeline, decisions, and lessons learned.

### Communication and portfolio

- Two-page board report.
- Technical report with evidence appendix.
- 15-minute board briefing and 30-minute oral defence.
- Sanitised Git repository with README, architecture, reproducible commands, hashes, and no secrets or live indicators.

## Final Acceptance Tests

The instructor selects tests without notice:

- Prove a vulnerable VM is isolated from the physical LAN.
- Prove one allowed and one denied path across each trust boundary.
- Disable a synthetic user and prove session/access response.
- Restore a file/service and state measured RPO/RTO.
- Generate one known event and trace it end to end through Wazuh.
- Explain one alert that should not become an incident.
- Reproduce one vulnerability finding and one closed remediation.
- Locate evidence for three incident-timeline claims.
- Restore one failed configuration from backup.
- Brief a nontechnical executive on the top residual risk and required decision.
- Select the correct primary tool for an unseen question, justify the choice, preserve its native evidence, and validate the result with an independent source.

## Capstone Scoring

| Domain | Points |
|---|---:|
| Safety, ethics, scope, and governance | 10 |
| Discovery, architecture, and risk reasoning | 15 |
| Identity, systems, network, and data controls | 20 |
| Vulnerability and remediation lifecycle | 10 |
| Telemetry, detection, and threat hunting | 15 |
| Incident response, forensics, and recovery | 15 |
| Evidence, reproducibility, and portfolio hygiene | 5 |
| Technical and executive communication | 10 |

## Mastery Standard

A strong team does not merely make the environment quieter. It can prove what is protected, explain why controls exist, identify what remains unknown, detect when visibility fails, recover when a change goes wrong, and help leaders make informed risk decisions.
