# Project 11 - Recover the Asset Truth at MeridianPay

## Client Brief

MeridianPay is a 120-person payment-services company operating from Lagos with remote staff and a small cloud footprint. A recent audit found that the CMDB, endpoint console, network records, and cloud billing report disagree. Management cannot answer three basic questions: what assets exist, which business services depend on them, and which unknowns require action first.

You are the newly appointed asset-discovery team. Deliver a defensible current-state inventory and a sustainable 90-day improvement plan without interrupting payment operations.

**Duration:** 5 class days or 2 weeks part-time

**Team size:** 3-5 students

**Lessons consolidated:** 16, 24, 26-29, 36, and 38

**Primary lesson:** 27

**Lab range:** pfSense, Kali, Ubuntu, Metasploitable 2, optional Windows Server, and instructor-supplied enterprise records

## Business Context

MeridianPay supports:

- `PayLink`, a customer payment API with a two-hour recovery target.
- `MerchantOps`, an internal merchant-onboarding workflow.
- `FinanceVault`, monthly settlement reporting.
- Remote workforce collaboration and support.

The audit deadline is ten business days away. The payment API must not be disrupted. The company has no budget for a new commercial platform during the project, and existing staff can sustain no more than four hours per week of manual inventory work after handover.

## Written Authority

Students may:

- Inspect supplied records and authorised lab systems.
- Passively observe the lab and query local ARP/neighbour state.
- Perform Nmap host discovery on `10.10.20.0/24`.
- Perform TCP connect and light service detection only against discovered lab hosts, limited to the top 100 TCP ports or specifically approved ports.
- Use read-only host commands when credentials are supplied.
- Query instructor-supplied mock cloud and SaaS exports.

Students may not:

- Scan public IP addresses, the physical LAN, or any non-lab network.
- Use `-A`, `-p-`, UDP sweeps, exploit/vulnerability/brute-force NSE scripts, password attacks, or evasion.
- Alter, isolate, reboot, patch, or delete an asset without a separately approved change.
- Treat an IP address, banner, MAC vendor, or device name as conclusive identity.

Stop if scope is ambiguous, the target service degrades, routes expose a physical network, or tool output contains an unexpected non-lab address.

## Available Evidence

The instructor supplies imperfect snapshots of:

- CMDB.
- DHCP leases.
- DNS records.
- EDR device inventory.
- Vulnerability-scanner targets.
- Backup jobs.
- Firewall objects and logs.
- Cloud compute/storage inventory.
- Finance procurement and disposal records.
- Help-desk tickets.

No source is authoritative by itself. Each has a different collection time, identifier, purpose, and blind spot.

## Team Roles

- Engagement lead: authority, stakeholder questions, schedule, quality gate.
- Discovery analyst: passive and active collection, tool records, limitations.
- Data/reconciliation analyst: source normalization, entity matching, confidence.
- Business analyst: ownership, services, criticality, dependencies, impact.
- Quality reviewer: evidence integrity, repeatability, report challenge.

Rotate the spokesperson at each checkpoint.

## Phase 1 - Scope and Discovery Design

Produce:

1. Signed rules of engagement with sources, targets, exclusions, window, rate, stop conditions, and escalation contact.
2. Stakeholder question set for IT, Finance, application owners, HR, risk, and vendors.
3. Source-capability matrix describing freshness, coverage, identifiers, strengths, weaknesses, and owner.
4. Discovery plan that starts with supplied and passive evidence, then uses the minimum active probes necessary.
5. Evidence register and naming convention.

Checkpoint question: What can your plan never discover, even if every command succeeds?

## Phase 2 - Collect and Preserve Observations

Record the analyst context:

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
hostname
ip -br address
ip route
nmap --version
```

Collect passive/local evidence first:

```bash
ip neigh show
arp -an
sudo tcpdump -ni any -c 50 'arp or icmp or port 53' -w 02-passive/passive-sample.pcap
```

Then perform controlled discovery:

```bash
sudo nmap -sn -n --reason --max-retries 2 -oA 03-discovery/hosts 10.10.20.0/24
sudo nmap -Pn -n -sT --top-ports 100 --reason --version-light \
  -oA 04-validation/services <APPROVED_DISCOVERED_IPS>
```

Run targeted protocol checks only when supported by the discovery plan. Preserve original output, timestamps, errors, tool version, source IP, and exact command. Hash the evidence set before analysis.

## Phase 3 - Reconcile Asset Identity

Create a staging table that preserves every raw source row. Create a separate canonical inventory rather than editing sources.

For every proposed match, record:

- Source record IDs.
- Match keys.
- Conflicting values.
- Decision and rationale.
- Confidence: confirmed, high, medium, low, or unknown.
- Human or technical validation still required.

Explicitly investigate:

- A live system absent from the CMDB.
- A CMDB system not observed anywhere else.
- A hostname with two addresses.
- An address associated with different names at different times.
- An asset missing one or more expected security controls.
- A cloud or SaaS asset not visible to network scanning.

## Phase 4 - Add Business Context

For each canonical asset, determine or explicitly leave unknown:

- Business service and dependency role.
- Business owner and technical custodian.
- Data classification.
- Criticality and recovery objective.
- Internal/external exposure.
- Lifecycle and support state.
- EDR, logging, vulnerability scanning, patching, and backup coverage.
- First seen, last seen, source provenance, and confidence.

Build a dependency view for PayLink, MerchantOps, and FinanceVault. Do not infer that the most exposed system is automatically the most business-critical.

## Phase 5 - Triage Unknown and Control-Deficient Assets

For each important unknown:

1. State facts separately from hypotheses.
2. Identify plausible benign and malicious explanations.
3. Assess business impact of both action and inaction.
4. Request owner validation.
5. Recommend a proportionate immediate action.
6. Define approval, rollback, monitoring, and closure evidence.

Students must not block an asset simply because it is unknown. A legacy settlement service without documentation may still be operationally critical.

## Phase 6 - Design Continuous Discovery

Create a 90-day operating model covering:

- Daily or event-driven cloud inventory.
- DHCP/DNS and network-controller ingestion.
- EDR/MDM and vulnerability-scanner reconciliation.
- Procurement, onboarding, transfer, and disposal workflows.
- Asset owner attestation.
- Unknown-asset queue and service-level targets.
- Ephemeral resource identity.
- Exception handling for fragile systems.
- Access control and retention for the inventory itself.

Define at least eight measurable indicators, including:

- Percentage of assets with a named business owner.
- Percentage with criticality and data classification.
- Percentage covered by EDR, vulnerability scanning, logging, and backup.
- Unknown assets older than the triage target.
- Stale records beyond the freshness target.
- Mean time to identify and assign an owner.
- Source reconciliation failure rate.
- Unauthorized public exposure count.

Explain each metric's denominator and how teams might game it.

## Scheduled Business Injects

The instructor releases these only after the preceding checkpoint.

### Inject 1 - The Unknown Linux Host

An undocumented host responds on the server segment and exposes several old-looking services. Finance says month-end reporting may depend on “an old Linux box.” Decide what to do before month-end processing begins.

### Inject 2 - The Missing Laptop

EDR lists a laptop as active, HR says the employee left six weeks ago, and the CMDB says “in storage.” The last public IP is unrelated to the lab. Students must not scan it. Design the internal investigation and escalation.

### Inject 3 - The Cloud Storage Bill

Finance supplies a line item for a cloud storage bucket not present in the infrastructure export. It may contain settlement files. Establish ownership and exposure using only authorised records and mock API evidence.

### Inject 4 - Executive Pressure

The COO asks for a slide saying, “We found 100% of assets and there are no rogue devices.” Respond professionally with a defensible coverage statement and decision-ready uncertainty.

## Required Deliverables

1. Rules of engagement and discovery plan.
2. Stakeholder interview record and source-capability matrix.
3. Original evidence, evidence register, hashes, and reproducible command log.
4. Raw staging dataset and canonical asset inventory.
5. Reconciliation/exception register with confidence and provenance.
6. Network, trust-boundary, and business-dependency diagrams.
7. Unknown-asset triage tickets for all injects.
8. Coverage and control-gap dashboard.
9. Prioritized 30/60/90-day improvement roadmap with effort, owner, and validation.
10. Two-page executive report and ten-minute board briefing.
11. Technical handover enabling another analyst to repeat the work.

Remove credentials, tokens, sensitive personal data, and real public addresses from portfolio versions.

## Acceptance Tests

The project is complete only when:

- Every probe maps to written authority and a lab target.
- At least four independent sources contribute to the result.
- Every canonical record retains source provenance and last-seen time.
- Every identity conflict has a documented decision or remains explicitly unresolved.
- Unknown assets have proportional response paths, not unsupported accusations.
- Critical business services have owners and dependency views, or the absence is escalated.
- Coverage claims have a defined population, time, and limitations.
- The operating model fits the four-hour weekly manual-work constraint.
- A second student can reproduce the discovery and reconciliation process.

## Scoring Rubric (100 points)

| Domain | Points | Evidence of mastery |
|---|---:|---|
| Authority, safety, and ethics | 15 | Precise scope, safe methods, stop decisions, no unauthorized activity |
| Discovery engineering | 15 | Layered sources, constrained commands, repeatability, limitations |
| Data reconciliation | 20 | Provenance, durable identity, conflict handling, confidence, freshness |
| Business context and risk | 15 | Owners, services, dependencies, data, criticality, impact of action |
| Unknown-asset response | 10 | Fact/hypothesis separation and proportionate escalation |
| Continuous operating model | 10 | Sustainable workflow, useful metrics, lifecycle and cloud coverage |
| Evidence and quality | 5 | Integrity, traceability, sanitization, clear defect handling |
| Executive and technical communication | 10 | Honest coverage, decisions, concise board story, reproducible handover |

### Performance Bands

- **90-100, consultant-ready:** evidence survives challenge; decisions integrate technical and business context.
- **75-89, analyst-ready:** safe and substantially correct; limited gaps in reconciliation or operating design.
- **60-74, developing:** commands work, but business context, provenance, or uncertainty is weak.
- **Below 60, resubmit:** unsafe scope, untraceable conclusions, or inventory is merely a scan result.

## Oral Defence Questions

1. What evidence supports the identity of your highest-risk unknown asset?
2. Which live assets could your methods miss and why?
3. Why did you prefer one source value over another?
4. What would you do if isolating the unknown host stopped settlements?
5. How do you distinguish stale, dormant, retired, and missing?
6. How would this design change for 10,000 endpoints, containers, and multiple clouds?
7. Which metric could look healthy while risk remains high?
8. What statement can management safely make about coverage today?
