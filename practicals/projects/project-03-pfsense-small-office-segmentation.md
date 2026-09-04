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
