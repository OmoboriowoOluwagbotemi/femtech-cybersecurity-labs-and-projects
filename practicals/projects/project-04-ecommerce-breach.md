# Project 04 - Rescue a Breached E-Commerce Service

## Scenario

NaijaCart operates a deliberately vulnerable training storefront in the DMZ. Customers report password-reset emails they did not request. Web logs show unusual API calls, and the owner wants the site back online quickly. Your team must investigate, contain, assess the application, remediate priority weaknesses, and validate a safe return to service.

**Duration:** 2 weeks
**Tools:** OWASP Juice Shop, Nginx, OWASP ZAP, Wazuh, Suricata/Zeek, Greenbone, OpenSSL, Wireshark, pfSense
**Lessons:** 4-9, 27-35

## Authority

Only the isolated Juice Shop service, reverse proxy, and supplied evidence are in scope. No public addresses. Students may not delete logs, attack accounts outside the synthetic set, or run denial-of-service tests.

## Phase 1 - Incident Intake and Preservation

Open an incident record, list facts/hypotheses, record business owner and next update. Preserve:

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
sudo docker inspect juice-shop > evidence/docker-inspect.json
sudo docker logs --timestamps juice-shop > evidence/juice-shop.log 2>&1
sudo cp --preserve=all /var/log/nginx/access.log /var/log/nginx/error.log evidence/
sudo ss -pantue > evidence/connections.txt
sudo ps auxfww > evidence/processes.txt
sudo tar --xattrs --acls -cpf evidence/web-config.tar /etc/nginx /etc/docker 2>/dev/null
sha256sum evidence/* > evidence/initial-hashes.sha256
```

Do not restart the service before volatile evidence is considered.

## Phase 2 - Correlate Evidence

Build a UTC timeline using web logs, Wazuh, pfSense, PCAP, account activity, and change records. Use:

```bash
awk '{print $1,$4,$5,$6,$7,$9,$10}' evidence/access.log | head
tshark -r evidence/naijacart.pcap -q -z conv,tcp
jq -c 'select(.agent.name=="web01")' evidence/wazuh-alerts.json
```

Identify source, endpoints, methods, status codes, session/user, timing, and data returned. Separate suspicious patterns from confirmed unauthorised access.

## Phase 3 - Containment Decision

Present options: maintenance mode, pfSense source block, account/session reset, API-route restriction, or monitoring. For each state evidence loss, customer impact, rollback, and trigger. Implement only the approved option and validate both block and required owner access.

## Phase 4 - Application Assessment

After taking a snapshot, follow the same evidence discipline used in Tool Lab 01 and Tool Lab 05: verify scope, preserve command output, run only authorised assessment checks, and manually validate at least four findings, including authentication/session, authorisation, input handling, and security configuration. Do not equate alert count with vulnerabilities.

## Phase 5 - Remediation

Because Juice Shop is intentionally vulnerable, implement compensating controls around the training deployment rather than pretending to repair its source. Options:

- Restrict source networks with pfSense.
- Add Nginx TLS and selected headers.
- Rate-limit sensitive endpoints without causing denial of service.
- Disable unnecessary publication.
- Strengthen synthetic account and session practices.
- Add Wazuh/Suricata detections.

Example Nginx rate-limit concept:

```nginx
limit_req_zone $binary_remote_addr zone=authlimit:10m rate=5r/m;
location /rest/user/login {
    limit_req zone=authlimit burst=5 nodelay;
    proxy_pass http://127.0.0.1:3000;
}
```

Validate syntax before reload and test allowed use, threshold behaviour, logs, and rollback:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Phase 6 - Return-to-Service Gate

Required evidence:

- Known attack path blocked or monitored.
- Priority sessions/accounts addressed.
- TLS identity valid.
- Application functional tests pass.
- Negative security tests pass.
- Logs and detections work.
- Residual risks accepted by owner.
- Recovery snapshot/backup exists.

## Injects

1. The suspected source is a shared mobile-provider address.
2. A critical ZAP alert cannot be reproduced.
3. The owner asks to delete accounts immediately, but legal requests preservation.
4. After return, Wazuh shows a similar request from an internal admin host.

## Deliverables

- Incident record, evidence register, timeline, and scoped entities.
- Four validated findings and prioritised remediation register.
- Containment decision with business trade-offs.
- Before/after configurations and tests.
- Detection and triage pack for the observed behaviour.
- Return-to-service decision paper and customer-safe executive statement.
