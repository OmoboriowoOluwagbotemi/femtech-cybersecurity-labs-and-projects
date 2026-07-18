# Lab 14 - Triage and Contain a Simulated Incident

## Mission

At 09:15, Wazuh reports repeated failed SSH access followed by a successful login and a change under `/etc/cron.d` on `lin01`. The business owner says the server supports a time-sensitive training portal. Determine what is confirmed, scope the event, recommend proportionate containment, and preserve evidence.

**Lessons:** 2, 7, 33-34
**Time:** 5 hours
**Evidence:** Wazuh alerts, Ubuntu logs, pfSense logs, a PCAP, and instructor-provided business context

## Student Authority

You may query logs, capture volatile state, copy evidence, and propose containment. You may not power off, delete the cron file, reset accounts, block an IP, or isolate the server until the instructor acting as incident commander approves the action.

## Phase 1 - Intake and Stabilise

Create an incident record:

```text
Incident ID: INC-FEM-014
Opened UTC:
Reporter/source:
Initial alert:
Affected asset/service:
Business owner:
Current severity:
Known/unknown:
Authorised actions:
Next update time:
```

Write two separate sections: **confirmed facts** and **hypotheses**. Do not say "breach" solely because an alert fired.

## Phase 2 - Preserve Volatile Host State

On `lin01`, using the approved responder account:

```bash
CASE=/tmp/INC-FEM-014
sudo install -d -m 0700 "$CASE"
date -u +'%Y-%m-%dT%H:%M:%SZ' | sudo tee "$CASE/collection-start.txt"
sudo hostnamectl > "$CASE/hostnamectl.txt"
sudo uptime > "$CASE/uptime.txt"
sudo who -a > "$CASE/who.txt"
sudo w > "$CASE/w.txt"
sudo ps auxfww > "$CASE/processes.txt"
sudo ss -pantue > "$CASE/network-connections.txt"
sudo ip -br address > "$CASE/ip-address.txt"
sudo ip route > "$CASE/routes.txt"
sudo ip neigh > "$CASE/neighbours.txt"
sudo lsof -nP > "$CASE/open-files.txt"
sudo systemctl --type=service --state=running --no-pager > "$CASE/running-services.txt"
sudo find /etc/cron.d /etc/cron.daily /var/spool/cron -xdev -printf '%TY-%Tm-%TdT%TH:%TM:%TS %M %u %g %s %p\n' 2>/dev/null > "$CASE/cron-metadata.txt"
```

Why first: processes, connections, logins, and open files change quickly. Avoid commands that execute suspicious files or alter their timestamps unnecessarily.

## Phase 3 - Collect Relevant Logs

```bash
sudo journalctl --since 'today 08:45' --until 'today 10:00' --utc --no-pager > "$CASE/journal-window.txt"
sudo cp --preserve=all /var/log/auth.log "$CASE/auth.log"
sudo cp --preserve=all /var/log/syslog "$CASE/syslog"
sudo ausearch -ts 08:45:00 -te 10:00:00 -i > "$CASE/audit-window.txt" 2>/dev/null || true
sudo tar --xattrs --acls -cpf "$CASE/cron-evidence.tar" /etc/cron.d 2>/dev/null
sudo sha256sum "$CASE"/* | sudo tee "$CASE/hashes-initial.sha256"
```

Use actual incident dates when the evidence is not from today. Preserve original timezone fields and note normalisation.

## Phase 4 - Analyse Authentication

```bash
sudo grep -E 'Failed password|Accepted (password|publickey)|Invalid user|session opened|session closed' "$CASE/auth.log" \
  | tee "$CASE/auth-filtered.txt"
sudo last -Faiwx | head -n 50 | tee "$CASE/last-logins.txt"
sudo lastb -Faiwx | head -n 50 | tee "$CASE/failed-logins.txt"
```

Answer:

- Which source attempted access?
- Which accounts were targeted?
- What authentication method succeeded?
- Was the success from the same source and user?
- What session duration and commands are evidenced?
- Could NAT, a bastion, or log forwarding change source interpretation?

## Phase 5 - Analyse the Cron Change Safely

```bash
sudo stat /etc/cron.d/* | tee "$CASE/cron-stat.txt"
sudo grep -RIn --binary-files=without-match . /etc/cron.d | tee "$CASE/cron-content.txt"
sudo namei -l /etc/cron.d | tee "$CASE/cron-path-permissions.txt"
sudo sha256sum /etc/cron.d/* | tee "$CASE/cron-hashes.txt"
```

Do not execute the command referenced by an unfamiliar cron entry. Determine owner, creation/change times, command path, signer/package association, change ticket, and related process/network evidence.

## Phase 6 - Correlate SIEM, Firewall, and PCAP

In Wazuh, query the host and time window; export JSON. In pfSense, filter by the suspected source/destination. With `tshark`:

```bash
tshark -r instructor-evidence/INC-FEM-014.pcap -q -z conv,tcp
tshark -r instructor-evidence/INC-FEM-014.pcap \
  -Y 'ip.addr==10.10.20.20' \
  -T fields -e frame.time_epoch -e ip.src -e tcp.srcport -e ip.dst -e tcp.dstport -e tcp.flags -e frame.len \
  > "$CASE/pcap-host-flow.tsv"
```

Encrypted SSH payload is not visible, but timing, endpoints, ports, duration, and volume can corroborate host logs.

## Phase 7 - Enrich Indicators Carefully

For any IP, domain, or hash, first classify whether it is private, documentation-only, lab-generated, or public. Use instructor-provided offline intelligence or approved public services. Record source, query time, confidence, age, context, and terms/privacy concerns.

A reputation hit is context, not proof. Shared hosting, VPNs, cloud services, and stale data can mislead.

## Phase 8 - Scope

Query Wazuh for the suspected user, source IP, cron filename/hash, destination, and related process across all agents. Create a scope table:

| Entity | Evidence | First seen | Last seen | Confirmed/suspected | Action |
|---|---|---|---|---|---|

Look for both affected assets and evidence of non-impact. Absence of alerts is meaningful only if telemetry health is proven.

## Phase 9 - Recommend Containment

Prepare three options:

1. Isolate host immediately.
2. Block source and disable affected account while keeping service online.
3. Increase monitoring briefly while collecting evidence.

For each, state evidence preserved/lost, business impact, attacker opportunity, rollback, owner, and trigger. The incident commander chooses.

If option 2 is approved, use the named change ticket, export firewall configuration first, and test the exact block plus business service. Do not delete artefacts during containment.

## Phase 10 - Report

Provide a UTC timeline, executive update, technical findings, ATT&CK mapping, severity, containment decision, eradication/recovery plan, root-cause hypotheses, detection gaps, and lessons learned. Label unknowns and confidence.

## Deliverables

- Incident record and authority log.
- Host collection, hashes, SIEM export, firewall logs, and PCAP analysis.
- Fact/hypothesis table and scoped entity table.
- Containment options and approved decision record.
- ATT&CK mapping supported by evidence.
- 15-minute executive update and full incident report.

## Evaluation Twist

The instructor will provide one misleading indicator and one telemetry gap. High-quality analysts identify both rather than forcing all evidence into the initial story.
