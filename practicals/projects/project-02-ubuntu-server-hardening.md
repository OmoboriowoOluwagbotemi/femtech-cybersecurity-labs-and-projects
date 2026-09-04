# Project 02 - Harden a Small-Business Ubuntu Web Server

## Portfolio Problem

A small business has an Ubuntu web server that must remain available while SSH, firewall rules, users, services, logs, and rollback procedures are improved.

## Validates

Tool Lab 02 - Ubuntu Server Administration and Hardening.

## Business Scenario

BrightOffice Services uses one Ubuntu server for an internal web page and remote administration. The server was built quickly, and management is concerned about exposed services, weak administration, missing evidence, and lack of rollback planning.

Your job is to harden the server without breaking the approved web service.

## Required Outcomes

- Baseline server state is captured before changes.
- Users and groups follow least privilege.
- SSH root login is disabled.
- SSH key login is tested before password SSH is disabled.
- UFW allows only approved services.
- Fail2Ban is installed or configured for SSH protection.
- Web service remains available.
- Logs prove successful and denied activity.
- Rollback plan is documented.

## Required Work

1. Write scope and approved services.
2. Capture hostname, IP, route, listeners, failed services, and recent warnings.
3. Create `secops` and `webops` groups with test users.
4. Configure `/srv/femtech-web` with safe ownership and group permissions.
5. Install and validate Nginx.
6. Prepare SSH key access from Kali.
7. Harden SSH only after key login works.
8. Configure UFW rules for SSH from the approved admin source and HTTP from the approved user network.
9. Install and validate Fail2Ban.
10. Generate one allowed and one denied authentication event.
11. Write rollback instructions.

## Minimum Evidence

```text
01-baseline-host-network-services.txt
02-users-groups-permissions.txt
03-nginx-status-and-curl.txt
04-ssh-key-login-proof.txt
05-ssh-hardening-settings.txt
06-ufw-status-and-tests.txt
07-fail2ban-status.txt
08-auth-log-analysis.txt
09-rollback-plan.md
technical-report.md
executive-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| Web service | Still reachable after hardening |
| Approved SSH user | Can log in with key |
| Root SSH | Denied |
| Password-only SSH | Denied after key access is proven |
| UFW | Shows only approved inbound rules |
| Logs | Show allowed and failed/denied activity |

## Oral Defense

1. Why test SSH keys before disabling password login?
2. Why is UFW useful even behind pfSense?
3. What service must remain available?
4. What evidence proves root SSH is denied?
5. What rollback would you perform if SSH failed?

## Recruiter-Visible Portfolio Artifact

Create a sanitized hardening report with before/after exposure, SSH control evidence, UFW rule explanation, log interpretation, and rollback thinking.
