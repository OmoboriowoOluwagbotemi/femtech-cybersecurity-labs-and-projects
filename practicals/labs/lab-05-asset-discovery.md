# Lab 05 - Discover, Classify, and Baseline Assets

## Mission

FEMTECH has inherited a server segment with incomplete records. Create an evidence-based asset inventory without scanning outside the authorised subnet or disrupting services.

**Lessons:** 8, 16, 27
**Time:** 6-8 hours (two teaching sessions)
**Source:** Kali
**Authorised target:** `10.10.20.0/24` only

## Business Scenario

FEMTECH acquired a small payment-support company. Its spreadsheet lists two servers, but the network team sees additional addresses and the endpoint team reports only one managed system. Before patching, monitoring, backup, or incident-response work begins, management needs a defensible inventory and a decision about an unknown device.

Students work as junior security analysts. The instructor acts as the business owner, network engineer, and change approver. Technical discovery alone is not enough: students must connect each observation to ownership, purpose, criticality, control coverage, and an action.

## Learning Outcomes

By the end, students can:

- Convert written authority into safe tool scope and stop conditions.
- Combine passive, ARP, ICMP/TCP, service, host, DHCP/DNS, and supplied management evidence.
- Explain false negatives, false positives, confidence, and time sensitivity.
- Distinguish an address, observation, asset, service, and business system.
- Reconcile duplicates and conflicts without overwriting source evidence.
- Escalate an unknown asset without disrupting a legitimate business service.
- Produce an inventory, attack-surface view, technical handover, and executive decision note.

## Range Architecture

Use the isolated range from Lab 01. No intentionally vulnerable VM may have a bridged adapter.

| VM | Suggested specification | Segment/address | Classroom role |
|---|---:|---|---|
| pfSense CE | 1 vCPU, 1 GB RAM | USERS `10.10.10.1`; SERVERS `10.10.20.1` | Routing, DHCP/DNS evidence, firewall logs |
| Kali Linux | 2 vCPU, 4 GB RAM | USERS via DHCP | Analyst workstation |
| Ubuntu Server | 2 vCPU, 2 GB RAM | `10.10.20.20` | Known application server |
| Metasploitable 2 | 1 vCPU, 1 GB RAM | `10.10.20.30` | Legacy unknown server; isolated only |
| Optional Windows Server Evaluation | 2 vCPU, 4 GB RAM | `10.10.20.10` | DNS/identity server and host-source comparison |
| Optional lightweight Ubuntu clone | 1 vCPU, 1 GB RAM | `10.10.20.40` | Short-lived contractor or shadow-IT asset |

For computers with less than 16 GB RAM, run pfSense, Kali, Ubuntu, and Metasploitable only. The instructor can provide exported DHCP/DNS/EDR records to preserve the reconciliation exercise.

## Instructor Preparation

Before class:

1. Snapshot every VM and verify all target adapters are `Internal Network` only.
2. Set Ubuntu hostname to `app01` and expose SSH plus one simple HTTP service.
3. Give Metasploitable the label `legacy-reporting` in the hypervisor but omit it from the student inventory.
4. Prepare three imperfect source files: `cmdb-export.csv`, `dhcp-leases.csv`, and `edr-export.csv`.
5. Put one deliberate conflict in the data, such as an old IP for `app01`.
6. Omit one live asset from the CMDB and include one retired asset that is no longer live.
7. Confirm pfSense permits only the approved low-impact probes from Kali.
8. Keep the instructor ground truth private until the debrief.

Suggested source records appear in the instructor solution for Project 11 and can be reused here.

## Required Student Folder Structure

```text
lab05/
  00-admin/
  01-source-originals/
  02-passive/
  03-discovery/
  04-validation/
  05-analysis/
  06-reports/
```

Never edit original tool output. Analysis copies, screenshots, notes, and final reports go in later folders.

## Rules

- Verify Kali has no bridged adapter.
- Use the smallest scan that answers the question.
- Do not use `-A`, `-p-`, UDP sweeps, brute-force scripts, or vulnerability scripts in this lab.
- Stop immediately if routes show a physical or corporate network.

## Step 1 - Write the Scan Record

Create `scope-and-authorization.md` containing source IP, target CIDR, purpose, approver, start/stop time, rate limit, excluded IPs, and emergency stop contact.

Then verify:

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
hostname
ip -br address
ip route
```

The route to `10.10.20.0/24` must go through pfSense. Record the physical host's network separately and confirm it is not in scope.

## Step 2 - Passive and Local Evidence First

```bash
ip neigh show
arp -an
sudo tcpdump -ni any -c 30 'arp or icmp or port 53' -w evidence/01-before/passive-sample.pcap
```

Passive evidence may reveal systems without sending probes. It is incomplete, so label it as observed, not authoritative.

Before probing, inspect the instructor-provided CMDB, DHCP, DNS, EDR, and retired-asset records. Write a hypothesis table showing what each source can prove, what it cannot prove, its timestamp, and likely gaps.

## Step 3 - Controlled Host Discovery

```bash
sudo nmap -sn -n --reason --max-retries 2 \
  -oA evidence/02-change/host-discovery 10.10.20.0/24
```

- `-sn`: host discovery without a port scan.
- `-n`: prevents external DNS lookups and speeds the lab.
- `--reason`: records why Nmap considered a host up.
- `--max-retries 2`: limits repeated probes.
- `-oA`: writes normal, XML, and grepable outputs.

List discovered addresses:

```bash
grep 'Status: Up' evidence/02-change/host-discovery.gnmap
```

Do not assume a missing host is absent; host firewalls can suppress discovery.

## Step 4 - Validate Known Infrastructure

For the expected servers only:

```bash
sudo nmap -Pn -n -sT --top-ports 100 --reason --version-light \
  -oA evidence/02-change/top100 10.10.20.10 10.10.20.20
```

- `-Pn` treats the named hosts as online.
- `-sT` uses the operating system's normal TCP connect.
- `--top-ports 100` constrains scope.
- `--version-light` makes low-intensity service probes.

## Step 5 - Targeted Service Checks

Validate only ports discovered or documented:

```bash
nc -vz -w 3 10.10.20.20 22
curl -I --connect-timeout 5 http://10.10.20.20/
dig @10.10.20.10 femtech.lab SOA +noall +answer
openssl s_client -connect 10.10.20.20:443 -servername lin01.femtech.lab </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates 2>/dev/null
```

Each tool tests a different layer: TCP reachability, HTTP response, DNS data, and TLS identity.

## Step 6 - Compare Network and Host Truth

On Ubuntu:

```bash
sudo ss -lntup
sudo systemctl --type=service --state=running --no-pager
sudo ufw status verbose
```

On Windows Server:

```powershell
Get-NetTCPConnection -State Listen | Sort-Object LocalPort
Get-Service | Where-Object Status -eq 'Running'
Get-NetFirewallProfile
```

Compare host listeners with network-visible ports. Differences may be caused by binding address, host firewall, pfSense, service state, or scan method.

Create a comparison matrix with one row per service and columns for host listener, host firewall, network observation, documented purpose, and conclusion. A listening service is not necessarily reachable; a reachable port does not prove the banner, owner, or vulnerability.

## Step 7 - Create a Professional Inventory

Create `asset-inventory.csv` with:

```csv
asset_id,hostname,ip,mac,segment,os_confidence,service,port,protocol,owner,business_function,data_class,criticality,source,last_seen_utc,confidence,notes
```

Rules:

- Use `unknown`, not a guess, when owner or function is unavailable.
- Keep observation separate from inference.
- Record source file and UTC time.
- One IP is not a durable asset identifier.
- Do not mark a service vulnerable based only on its banner.

## Step 8 - Identify and Escalate a Rogue Asset

The instructor adds or designates an unfamiliar host. Do not scan it more aggressively. Perform only:

```bash
sudo nmap -Pn -n -sT -p 22,80,443 --reason -oA evidence/03-validation/unknown-host <UNKNOWN_LAB_IP>
ip neigh show <UNKNOWN_LAB_IP>
```

Write a ticket containing evidence, uncertainty, risk, owner lookup request, containment options, and business-impact warning. Do not block the host without authority.

## Step 9 - Reconcile the Sources

Preserve every source value and create a separate canonical record. Match records using the strongest available identifiers in this order where applicable:

1. Cloud resource, EDR device, directory object, or hardware identifier.
2. Serial number or VM UUID.
3. MAC address with segment and observation time.
4. Hostname plus supporting evidence.
5. IP address only as a time-bound observation.

For each conflict, record the competing values, preferred value, reason, confidence, owner needed to confirm it, and next review date. Never silently select the newest-looking value.

Classify every record as one of:

- Known and managed.
- Known but control-deficient.
- Unknown and under investigation.
- Duplicate or conflicting.
- Retired but still observed.
- Expected but not observed.
- Ephemeral or time-bound.

## Step 10 - Build the Business Inventory

Use `practicals/templates/asset-inventory-template.csv`. One asset can expose several services, so keep asset identity separate from service observations if using a database or workbook. At minimum, complete:

- Stable asset ID, hostname, address observations, type, platform, and location.
- Business service, owner, technical custodian, and support contact.
- Data classification, business criticality, exposure, and dependencies.
- EDR, vulnerability scanning, logging, patching, and backup coverage.
- Lifecycle state, first/last seen time, evidence source, and confidence.

Do not invent ownership. `Unknown - owner lookup requested in TKT-###` is a valid professional answer.

## Step 11 - Map the Attack Surface and Gaps

Draw a small topology showing zones, trust boundaries, discovered assets, observed services, and allowed paths. Mark observations differently from assumptions. Then create a gap register containing:

- The asset or record affected.
- The evidence-backed gap.
- Business consequence.
- Immediate safe action.
- Long-term control improvement.
- Owner, target date, and validation method.

At least one recommendation must address the discovery process rather than an individual host.

## Step 12 - Management Communication

Prepare two outputs:

1. A one-page executive note stating coverage, important unknowns, business exposure, decisions required, owners, and deadlines.
2. A technical handover containing exact scope, methods, evidence locations, reconciliation logic, limitations, and reproducible commands.

Do not report “100% complete.” State coverage against the authorised subnet and supplied sources, plus what remains invisible.

## Verification Tests

Students must pass all of these tests:

| Test | Expected evidence |
|---|---|
| Isolation | Hypervisor adapter and route output show no bridged target |
| Scope | Every target in tool output belongs to `10.10.20.0/24` |
| Repeatability | Another analyst can repeat the exact low-impact discovery |
| Source diversity | At least four independent discovery/inventory sources used |
| Reconciliation | One duplicate/conflict resolved with rationale and confidence |
| Unknown asset | Escalated without aggressive scanning or unauthorised blocking |
| Business context | Every priority has owner/decision request or explicit owner gap |
| Evidence integrity | Originals retained and final evidence register completed |

## Deliverables

- Scope record and route proof.
- Passive PCAP and three Nmap output formats.
- Host-vs-network comparison table.
- Completed asset inventory with confidence fields.
- Rogue-asset escalation ticket.
- Explanation of false positives, false negatives, and why inventory is continuous.
- Source-capability and reconciliation matrices.
- Canonical inventory using the supplied template.
- Attack-surface diagram and gap register.
- One-page executive note and five-minute briefing.

## Assessment Rubric (100 points)

| Area | Points | Full-credit standard |
|---|---:|---|
| Safety, authority, and scope | 15 | Isolation proven; methods and stop conditions match authority |
| Discovery method | 20 | Low-impact, reproducible, multi-source collection with saved output |
| Technical interpretation | 15 | Correctly explains reachability, service confidence, and limitations |
| Inventory and reconciliation | 20 | Durable identifiers, provenance, conflict handling, ownership and lifecycle |
| Business risk and response | 15 | Proportionate actions tied to service impact and accountable owners |
| Evidence and reporting | 10 | Timestamped, traceable, concise technical and executive outputs |
| Oral defence | 5 | Student explains uncertainty and defends choices under questioning |

Automatic resubmission is required if a student scans outside scope, bridges Metasploitable, fabricates evidence, exposes credentials, or claims an unknown host is malicious without validation.

## Reflection

1. Why can `-sn` miss a live Windows host?
2. What does an open port prove, and what does it not prove?
3. Why should owner and business function be part of asset discovery?
4. How would you safely scale this process to 10,000 assets?
