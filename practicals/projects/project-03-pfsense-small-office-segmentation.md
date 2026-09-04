# Project 03 - Segment a Small Office Network with pfSense

## Portfolio Problem

A small office has users, servers, and a public-facing service on one flat network. The business needs segmentation, firewall rules, DHCP control, logging, and validation.

## Validates

Tool Lab 03 - pfSense Firewall and Segmentation.

## Business Scenario

Oakbridge Accounting has staff workstations, a file server, an admin workstation, and a small client portal. A malware infection on one workstation could currently reach everything. Management wants a low-cost segmentation design using pfSense.

## Required Outcomes

- Network zones are clearly defined.
- pfSense interfaces and gateways are documented.
- DHCP scope is configured where required.
- Aliases make rules readable.
- Approved traffic is allowed.
- Unapproved traffic is blocked.
- Firewall logs prove decisions.
- Configuration backup and rollback plan exist.

## Step-by-Step Completion Standard

Complete this project in phases. Start with scope and IP planning, then back up pfSense, then configure interfaces, then configure DHCP, then create aliases, then write the rule matrix, then apply rules, then test allowed traffic, then test blocked traffic, then review logs, then export the final configuration. Do not create rules until the intended traffic flow is written down.

## Required Work

1. Define USERS, SERVERS, DMZ, and ADMIN/SOC zones.
2. Build an IP plan and interface table.
3. Back up pfSense before changes.
4. Configure interfaces and DHCP for the user network if required.
5. Create aliases for management hosts, servers, and approved ports.
6. Write a firewall rule matrix before applying rules.
7. Build rules in correct order.
8. Run at least 12 traffic tests: 6 allowed and 6 blocked.
9. Capture pfSense logs for blocked traffic.
10. Export final configuration with secrets protected.

## Minimum Evidence

```text
01-scope-and-ip-plan.md
02-before-config-backup.xml
03-interface-proof.png
04-dhcp-proof.png
05-aliases-proof.png
06-rule-matrix.md
07-rule-order-proof.png
08-allowed-tests.txt
09-blocked-tests.txt
10-firewall-log-evidence.txt
11-final-config-backup.xml
technical-report.md
executive-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| USERS to approved web service | Allowed |
| USERS to server management port | Blocked |
| ADMIN to server management port | Allowed |
| DMZ to USERS | Blocked |
| DNS or required infrastructure flow | Allowed only if required |
| Firewall logs | Show source, destination, port, action, and rule |

## Oral Defense

1. Why is a flat network risky?
2. Why does rule order matter?
3. Why are aliases useful?
4. What does a firewall log prove?
5. What risk remains after segmentation?

## Recruiter-Visible Portfolio Artifact

Publish a sanitized segmentation case study with topology, rule matrix, allowed/blocked test table, log interpretation, and business risk reduction.

## Expanded Scenario

Oakbridge Accounting handles payroll records, tax documents, client identity documents, and internal finance spreadsheets. The office has grown quickly, and the network was built for convenience instead of security.

Current state:

- Staff laptops, file server, printer, admin workstation, and portal server are on the same subnet.
- Any workstation can attempt SMB, SSH, RDP, and web access to servers.
- The client portal is reachable from the user network and can also initiate traffic back to staff systems.
- Firewall rules were added without naming conventions or business justification.
- Management cannot prove which traffic is intentionally allowed and which traffic is blocked.

The business problem is not "install pfSense." The business problem is reducing lateral movement and protecting client records while keeping required office work functioning.

## Required Environment

| System | Example role | Example address |
|---|---|---:|
| `fw01` | pfSense firewall | Gateway on every internal segment |
| `win-user01` | Staff workstation | `10.10.10.50` |
| `kali01` | Approved test workstation | `10.10.10.60` |
| `file01` | Internal file server | `10.10.20.20` |
| `portal01` | DMZ client portal | `10.10.30.20` |
| `admin01` | Admin workstation | `10.10.40.50` |

## Work Packages

| Work package | Required student work | Evidence |
|---|---|---|
| WP01 - Scope | Define approved networks, systems, ports, and prohibited activity | Scope record |
| WP02 - Baseline | Record current interfaces, routes, DHCP, rules, and exposed services | Screenshots and command output |
| WP03 - Zone design | Design USERS, SERVERS, DMZ, and ADMIN/SOC trust boundaries | Topology and data-flow diagram |
| WP04 - Rule matrix | Write every rule before implementation with business reason | Rule matrix |
| WP05 - Implementation | Configure interfaces, DHCP if required, aliases, rules, and logging | pfSense screenshots/export |
| WP06 - Validation | Run allowed, blocked, and regression tests | Test table and logs |
| WP07 - Recovery | Export configuration and write rollback steps | XML backup and rollback note |
| WP08 - Reporting | Explain security improvement and remaining risk | Technical and executive reports |

## Mandatory Rule Design

| Flow | Expected action | Reason |
|---|---|---|
| USERS to portal HTTPS | Allow | Staff can use client portal |
| USERS to file server SMB | Allow only if required | Business file access |
| USERS to server SSH/RDP/WinRM | Block | Staff should not administer servers |
| ADMIN/SOC to server management | Allow | Controlled administration |
| DMZ to USERS | Block | Prevent pivoting from public-facing service |
| DMZ to required backend only | Allow narrowly | Portal function |
| SERVERS to internet | Allow only required updates | Limit outbound abuse |
| Any to pfSense admin UI | Block except approved admin source | Protect firewall management |

## Required Test Matrix

Students must run at least 16 tests:

- 6 approved allow tests.
- 6 expected block tests.
- 2 management-plane protection tests.
- 2 regression tests proving business service still works.

Each test must include:

```text
Test ID:
Source host:
Source IP:
Destination:
Port/protocol:
Expected action:
Actual result:
pfSense rule name:
Log reference:
Business interpretation:
```

## Instructor Injects

| Inject | Expected response |
|---|---|
| Staff cannot reach the file server | Check rule direction, source network, destination, port, and logs |
| Portal can reach a workstation | Identify rule allowing DMZ-to-USERS traffic and correct it |
| Admin UI is reachable from USERS | Restrict management access and document risk |
| DNS stops working after segmentation | Identify required DNS path and add narrow rule |

## Technical Report Template

```text
1. Executive Summary
2. Scope and Authorization
3. Baseline Network State
4. Proposed Segmentation Design
5. Firewall Rule Matrix
6. Implementation Evidence
7. Allowed Traffic Tests
8. Blocked Traffic Tests
9. Firewall Log Interpretation
10. Troubleshooting and Fixes
11. Residual Risk
12. Recommendations
13. Evidence Index
```
