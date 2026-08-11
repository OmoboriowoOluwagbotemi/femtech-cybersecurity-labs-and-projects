# Instructor Guide - Project 11 Asset Discovery at MeridianPay

Keep this file separate from the student brief until the final debrief. It provides a reproducible classroom setup, deliberately inconsistent source data, expected reasoning, inject facilitation, and grading guidance. It is a reference outcome, not a single mandatory answer.

## Teaching Purpose

The project corrects five common beginner habits:

1. Treating an Nmap list as an asset inventory.
2. Equating “not observed” with “does not exist.”
3. Identifying an asset by current IP address alone.
4. Calling every undocumented device malicious.
5. Reporting technical facts without ownership or business consequence.

The strongest students will state what their evidence proves, what it merely suggests, and what remains outside coverage.

## Recommended Delivery

| Session | Focus | Instructor checkpoint |
|---|---|---|
| 1 | Briefing, scope, source assessment | Approve rules of engagement before commands |
| 2 | Passive and controlled active discovery | Check routes, isolation, commands, originals |
| 3 | Normalization and reconciliation | Challenge IP-only matching and silent conflict resolution |
| 4 | Business context and injects | Force students to consider impact of containment |
| 5 | Operating model, board report, defence | Challenge “100% coverage” and weak denominators |

Allow 6-8 hours for the guided Lab 05 first. Run Project 11 only after students can explain `-sn`, `-Pn`, ARP boundaries, port states, and source limitations.

## Minimum Range

- pfSense: USERS `10.10.10.1/24`, SERVERS `10.10.20.1/24`.
- Kali on USERS, DHCP address.
- Ubuntu `app01` on `10.10.20.20`, SSH and HTTP enabled.
- Metasploitable 2 on `10.10.20.30`, labelled privately as the legacy reporting server.

Optional:

- Windows Server `dc01` on `10.10.20.10`, DNS enabled.
- Ubuntu clone `contractor-tools` on `10.10.20.40`, started only after the baseline.

Metasploitable must use an internal network only. If updates are needed, update other systems through pfSense and disconnect or power off Metasploitable first. Take clean snapshots.

## Instructor Ground Truth

| Asset ID | Hostname | Current address | Business role | Owner | Intended student conclusion |
|---|---|---|---|---|---|
| MP-FW-001 | fw01 | 10.10.20.1 | Lab routing/security | Infrastructure | Known; scan source sees gateway |
| MP-DC-001 | dc01 | 10.10.20.10 | Identity/DNS | Infrastructure | Known; optional VM or supplied records |
| MP-APP-001 | app01 | 10.10.20.20 | PayLink test application | Application Engineering | Known; CMDB contains stale `.21` address |
| MP-LEG-001 | legacy-reporting | 10.10.20.30 | FinanceVault month-end report | No current named owner | Live, undocumented, control-deficient, not proven malicious |
| MP-CTR-001 | contractor-tools | 10.10.20.40 | Temporary vendor diagnostics | MerchantOps team | Time-bound/shadow IT; should have expiry and owner validation |
| MP-OLD-001 | files01 | none | Retired file server | Infrastructure | Stale CMDB record, should not be deleted without retirement proof |
| MP-LAP-017 | lap-017 | no lab address | Former employee laptop | End User Computing | Conflicting HR/EDR/CMDB state; internal investigation only |
| MP-CLD-009 | settlement-archive | API record only | Settlement archive | Initially unknown | Cloud asset invisible to Nmap; exposure/data questions matter |

Do not require students to reproduce these exact IDs. Grade the reasoning, provenance, and outcome.

## Deliberately Imperfect Source Pack

Prepare CSVs from the following records. Adjust timestamps to the class date so students must compare freshness.

### CMDB

| CI | Name | IP | Owner | Status | Last review |
|---|---|---|---|---|---|
| CI-100 | dc01 | 10.10.20.10 | Infrastructure | Active | 45 days ago |
| CI-110 | app01 | 10.10.20.21 | App Engineering | Active | 120 days ago |
| CI-120 | files01 | 10.10.20.30 | Infrastructure | Retired | 200 days ago |
| CI-130 | lap-017 | DHCP | End User Computing | In storage | 42 days ago |

The `.30` reuse is intentional. Students should not merge `files01` and `legacy-reporting` merely because they share an address at different times.

### DHCP/DNS

| Record | Identifier/name | Address | Observation |
|---|---|---|---|
| DHCP-201 | app01/MAC-A | 10.10.20.20 | Today |
| DHCP-202 | legacy-reporting/MAC-B | 10.10.20.30 | Today |
| DHCP-203 | contractor-tools/MAC-C | 10.10.20.40 | Today, lease expiry tomorrow |
| DNS-210 | app01.femtech.lab | 10.10.20.21 | Static and stale |
| DNS-211 | api-test.femtech.lab | 10.10.20.20 | Active alias |

### EDR/Vulnerability/Backup

| Source record | Device | Last seen | Important state |
|---|---|---|---|
| EDR-301 | app01 | Today | Healthy |
| EDR-302 | lap-017 | Yesterday | Agent active; public address withheld |
| VM-310 | dc01 | Seven days ago | Assessed |
| VM-311 | app01 | Seven days ago | Assessed |
| BKP-320 | app01 | Last night | Successful |
| BKP-321 | files01 | 90 days ago | Disabled job |

There should be no EDR, vulnerability, or current backup coverage for `legacy-reporting` and `contractor-tools`.

### Cloud/Finance

| Source record | Resource | State |
|---|---|---|
| BILL-401 | `settlement-archive` storage charge | Recurring monthly cost |
| CLD-410 | compute list | No resource by that name |
| CLD-411 | storage list | Initially omitted; released with Inject 3 |
| PROC-420 | legacy reporting VM | Purchased for Finance project; project manager departed |

When Inject 3 is released, provide a mock API row showing a private bucket, encryption enabled, access logging disabled, and an old service-account grant. Students should recommend ownership confirmation, access/log review, and data handling—not public scanning.

## Expected Discovery Interpretation

- ARP discovery may not cross pfSense from USERS to SERVERS. Routed host discovery and firewall behavior should be discussed.
- `-sn` may miss hosts that filter selected probes. `-Pn` on named, approved systems is a validation method, not proof that every address exists.
- Service banners support hypotheses, not definitive software/vulnerability conclusions.
- Metasploitable's many services make the legacy host conspicuous, but the safe response is owner validation and change-controlled containment planning.
- Network scans cannot enumerate SaaS, storage buckets, stopped VMs, identities, laptops away from the network, or retired equipment in a cupboard.
- The CMDB stale `.21` address should be retained as historical source data while `.20` becomes the current observation with suitable confidence.

## Inject Facilitation and Reference Responses

### Inject 1 - Unknown Linux Host

Full-credit response:

- Separate observed IP/ports from guessed identity.
- Link the procurement clue and Finance statement as hypotheses.
- Request Finance and infrastructure owner validation.
- Avoid aggressive scans or immediate isolation before month-end.
- Propose monitoring, restricted reachability, backup/status validation, and a maintenance-window plan.
- Create a ticket to assign owner, document dependencies, assess support state, and migrate or retire.

Weak response: “Metasploitable was found, so hack it or block it.”

### Inject 2 - Missing Laptop

Full-credit response:

- Do not scan the public address.
- Ask EDR administrators for device identity, user, last check-in, location metadata permitted by policy, and containment capability.
- Reconcile HR departure, return-of-equipment, identity disablement, MDM, help-desk, and chain-of-custody records.
- Escalate possible data/equipment loss through HR, legal/privacy, and incident processes.
- Preserve evidence and seek approval before remote containment or wipe.

### Inject 3 - Cloud Storage Bill

Full-credit response:

- Use billing/account hierarchy and authorised API evidence to establish resource ID and tenant.
- Identify the service-account grant, missing logs, data classification, owner, retention, encryption/key ownership, and public-access controls.
- Record it as an asset even though no host responds to Nmap.
- Recommend least-privilege review, logging, owner assignment, and lifecycle decision.

### Inject 4 - Executive Pressure

Example defensible statement:

> Within the authorised server subnet, five current network identities were observed during the stated window and reconciled against the supplied records. Two require owner or lifecycle confirmation. This does not cover off-network endpoints, unsupplied tenants, dormant equipment, or resources that did not communicate.

Students should provide a decision needed, not merely refuse the COO.

## Suggested Answer Shape

A strong final inventory will usually classify:

- `dc01` and `app01`: known and managed, with the stale DNS/CMDB discrepancy tracked.
- `legacy-reporting`: known or likely legitimate but undocumented and control-deficient; high priority due to Finance dependency and legacy exposure.
- `contractor-tools`: temporary/shadow IT with owner and expiry required.
- `files01`: retired/stale record requiring decommissioning evidence and record closure.
- `lap-017`: lifecycle and custody exception requiring incident-aware internal follow-up.
- `settlement-archive`: cloud data asset requiring owner, access, logging, and retention review.

Priority should consider business service and data, not simply number of open ports.

## 30/60/90-Day Reference Roadmap

### First 30 Days

- Assign owners to unknown/high-criticality assets.
- Resolve `app01` address records and `files01` retirement evidence.
- Establish an unknown-asset queue with an urgent business-impact triage path.
- Review settlement bucket access/logging and former-employee device custody.
- Define minimum asset schema and stable ID rules.

### Days 31-60

- Automate scheduled exports from DHCP/DNS, EDR, vulnerability, backup, directory, and cloud sources.
- Build reconciliation rules with exception review instead of destructive overwrites.
- Link procurement/onboarding/disposal workflows to inventory updates.
- Define fragile-device and emergency-discovery procedures.

### Days 61-90

- Add owner attestation and freshness SLAs.
- Measure control coverage and unresolved unknown age by criticality.
- Test an ephemeral-resource event workflow.
- Run a sample retirement audit and a disaster-recovery scope comparison.
- Present trend metrics and residual blind spots to management.

## Grading Calibration

Reserve scores above 90 for work that:

- Preserves provenance and distinguishes observations from canonical decisions.
- Uses business dependencies to change priority or response.
- Identifies important assets that Nmap cannot see.
- States honest coverage with population and time boundaries.
- Produces an operating workflow sustainable under the stated staffing constraint.

Require resubmission for:

- Any out-of-scope scan.
- Bridged Metasploitable.
- Fabricated owners or timestamps.
- Unsupported claims of compromise or vulnerability.
- A “canonical inventory” that is only copied Nmap output.
- Publishing real identifiers, credentials, personal data, or public addresses.

## Debrief Prompts

1. Which source looked most authoritative at first, and where did it fail?
2. Which asset represented the greatest business uncertainty rather than the greatest technical exposure?
3. What decision would change if the month-end dependency were removed?
4. How could automation create false confidence?
5. What evidence would turn a medium-confidence identity match into confirmed?
6. What would continuous discovery look like for containers and serverless workloads?
