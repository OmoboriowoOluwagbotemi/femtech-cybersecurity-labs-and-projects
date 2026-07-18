# Project 08 - Conduct a Threat-Hunting Sprint

## Scenario

The SOC receives intelligence that an actor may use valid accounts, PowerShell, scheduled tasks, and common cloud-hosting destinations. There is no confirmed incident. Conduct a one-week hypothesis-driven hunt across Windows, Linux, network, and Wazuh data without turning every anomaly into an alert.

**Duration:** 1-2 weeks
**Tools:** Wazuh, Sigma CLI, PowerShell, Suricata/Zeek, tshark, VirusTotal/OTX/AbuseIPDB only when approved, spreadsheets/Markdown
**Lessons:** 2, 25, 30-35, 38

## Hunt Question

Has any identity in the lab shown a sequence of unusual authentication, script execution, persistence, and outbound communication that is inconsistent with approved administration?

## Phase 1 - Prepare the Hunt

Define hypothesis, ATT&CK techniques, time window, systems, required data, expected benign behaviour, blind spots, decision criteria, and privacy limits. Validate telemetry health before interpreting silence.

```bash
sudo /var/ossec/bin/agent_control -lc
df -h
sudo journalctl -u wazuh-manager -p warning --since '-7 days' --no-pager
```

## Phase 2 - Establish Baselines

Measure by host/user/hour:

- Successful and failed logons.
- Administrative logon types.
- PowerShell/process volume.
- Scheduled-task creation/change.
- New services/accounts/groups.
- DNS destinations and rare outbound endpoints.
- Agent/log gaps.

Use distributions and peer groups; do not call "rare" malicious.

## Phase 3 - Hunt Identity

Search events 4624, 4625, 4648, 4672, Linux SSH, sudo, and VPN. For candidates, correlate source, device, time, authentication method, logon ID, privileges, and change ticket.

## Phase 4 - Hunt Execution and Persistence

Search 4688, PowerShell 4103/4104, scheduled-task events, services, cron/systemd, and Wazuh FIM. Validate exact fields in local data. A candidate must have an evidence bundle and benign alternative.

## Phase 5 - Hunt Network Behaviour

Use Zeek and PCAP:

```bash
jq -r '[.ts,.id.orig_h,.id.resp_h,.id.resp_p,.service,.duration,.orig_bytes,.resp_bytes,.conn_state] | @tsv' conn.log | sort
jq -r '[.ts,.id.orig_h,.query,.qtype_name,.rcode_name] | @tsv' dns.log | sort
tshark -r hunt.pcap -q -z conv,tcp
```

Enrichment must record source, age, confidence, and privacy. Never upload internal files or sensitive hashes.

## Phase 6 - Test and Escalate

For each lead, seek corroboration across at least two sources. Classify as benign explained, suspicious needs monitoring, incident candidate, or data gap. Open an incident only when evidence and policy support it.

If a useful pattern emerges, write a Sigma/Wazuh detection and test it with known positive and negative events.

## Injects

1. Intelligence IOC is six months old and belongs to shared hosting.
2. A rare PowerShell command came from authorised patch automation.
3. One critical host has no PowerShell logs.
4. A likely positive occurs during an approved admin window but from the wrong source host.

## Deliverables

- Hunt plan and telemetry-coverage assessment.
- Baseline workbook/query notes.
- At least six evidence bundles, including benign explanations and data gaps.
- Hunt timeline and lead disposition.
- One tested new detection and triage guide.
- Hunt report: findings, no-findings, limits, and next hypotheses.
- 10-minute briefing that clearly separates intelligence, anomaly, suspicious activity, and confirmed incident.
