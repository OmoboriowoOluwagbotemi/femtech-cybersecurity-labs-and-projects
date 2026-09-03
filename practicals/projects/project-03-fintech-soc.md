# Project 03 - Build a SOC for a Fintech Startup

## Scenario

PayWave Labs provides a synthetic payment API and has eight Linux servers, 30 Windows endpoints, one domain controller, pfSense, and no central monitoring. Investors require evidence that suspicious activity is detected and handled, but the team cannot buy a commercial SIEM.

Build a small operational SOC using Wazuh, Suricata/Zeek, Sigma concepts, and documented analyst workflows.

**Duration:** 2-3 weeks
**Tools:** Wazuh, Suricata, Zeek, Sigma CLI, Wireshark/tshark, pfSense, Ubuntu, Windows Evaluation
**Lessons:** 25, 30-34, 38

## Service-Level Objectives

- Critical telemetry loss identified within 15 minutes.
- High-severity lab alerts triaged within 20 minutes.
- Every detection has an owner, data source, test, and response action.
- Secrets and synthetic payment data are excluded or appropriately protected.
- Platform health, capacity, and retention are observable.

## Phase 1 - Design the SOC

Produce log-source inventory with event purpose, fields, volume estimate, retention, sensitivity, owner, collection method, and failure signal. Design Wazuh all-in-one for the lab and a scaled production recommendation.

Required sources: Windows Security, PowerShell, Defender, Sysmon, Linux auth/journal/audit, pfSense, Suricata EVE, and application authentication. Use osquery for point-in-time endpoint inventory and compare that state with historical events.

## Phase 2 - Deploy and Prove the Pipeline

Install Wazuh using current official quickstart. Onboard one Windows and two Linux agents. Send pfSense/network IDS logs through an approved integration. For each source, trace:

```text
generation -> local source -> collector -> transport -> manager parse/rule -> index -> dashboard/query
```

Use service and pipeline checks:

```bash
sudo /var/ossec/bin/agent_control -lc
sudo /var/ossec/bin/wazuh-control status
sudo tail -n 100 /var/ossec/logs/ossec.log
sudo jq -r '[.timestamp,.agent.name,.rule.id,.rule.level,.rule.description] | @tsv' /var/ossec/logs/alerts/alerts.json | tail
df -h
free -h
```

## Phase 3 - Build the Detection Catalogue

Implement and test at least eight use cases:

1. Repeated failed authentication followed by success.
2. Privileged-group change.
3. New local account.
4. PowerShell suspicious administrative pattern using benign commands.
5. Critical application configuration change.
6. Network scan against payment API.
7. Outbound connection to instructor-designated unusual destination.
8. Agent/log-source telemetry loss.

For each: hypothesis, ATT&CK, fields, rule/query, severity, false positives, test dataset, owner, response, and KPI.

Use Sigma as a portable design format where appropriate:

```bash
python3 -m venv ~/venvs/sigma
source ~/venvs/sigma/bin/activate
python -m pip install sigma-cli
sigma list pipelines
sigma check detections/
```

Backend availability changes; validate generated queries against actual Wazuh/OpenSearch fields rather than assuming portability.

At least three Windows detections must use Sysmon fields and correlate ProcessGuid, parent/child process, hash, or network connection. Export the source Sysmon EVTX and locate the exact event in Wazuh. A successful dashboard query without source-event validation does not pass.

Run a scheduled osquery inventory for installed programs, services, scheduled tasks, and listening sockets. Alert only after defining expected change and collection-health behaviour; osquery current state must not be mistaken for historical evidence.

## Phase 4 - Create Dashboards and Queues

Build views for platform health, authentication, privileged change, endpoint coverage, network alerts, application risk, and incident SLA. Dashboards must answer operational questions, not merely display charts.

Define severity and escalation using asset criticality, confidence, blast radius, data, and business impact. Document when an analyst may close, escalate, or request containment.

## Phase 5 - Run a Purple-Team Validation

Use only benign simulations from the tool labs, especially Tool Lab 01 and Tool Lab 06: Nmap approved ports, failed/successful SSH, temporary account creation/removal, file change, and agent stop/start. Measure:

- Event generated?
- Collected?
- Alerted?
- Correct severity?
- Analyst found it?
- Triage correct?
- Time to detect/triage?
- Required evidence available?

## Phase 6 - Operate for a Week

Run daily health checks and a 30-minute hunt. Track alert count, unique rules, false-positive rate, agent coverage, ingestion delay, storage growth, and unassigned alerts. Tune one noisy rule without hiding unrelated activity.

## Injects

1. Index storage reaches 85%.
2. A critical server is silent for 12 hours but no alert exists.
3. An executive asks to suppress all VPN-source alerts.
4. A high alert is a planned administrator action with no change ticket.

## Deliverables

- SOC architecture, source matrix, data flow, and capacity assumptions.
- Sysmon configuration/volume assessment and osquery inventory pack.
- Eight tested detections and catalogue.
- Dashboards, severity matrix, triage and escalation runbooks.
- Purple-team test report and coverage matrix.
- Seven-day operations log with tuning decisions and metrics.
- 90-day maturity roadmap covering people, process, technology, and governance.

## Acceptance Gate

The platform running is not enough. The team must prove source completeness, detection behaviour, telemetry-loss monitoring, analyst workflow, safe tuning, evidence protection, and business communication.
