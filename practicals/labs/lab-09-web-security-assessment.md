# Lab 09 - Assess an Intentionally Vulnerable Web Application

## Mission

The product owner wants an evidence-based security assessment before a customer portal release. Deploy OWASP Juice Shop in the isolated DMZ, map the application, run controlled ZAP tests, manually validate selected findings, and write remediation advice developers can act on.

**Lessons:** 7-9, 27-29
**Time:** 5 hours
**Target:** OWASP Juice Shop on `web01` (`10.10.30.20:3000`) only
**Tools:** Docker Engine, curl, browser developer tools, OWASP ZAP, Nmap

## Strict Scope

Only `http://10.10.30.20:3000` is authorised. Do not scan Docker Hub, the host's public address, pfSense, or another student's VM. Do not perform denial of service, upload executable content, reuse credentials, or test real email addresses.

## Step 1 - Deploy the Target

On the isolated Ubuntu DMZ host:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo docker pull bkimminich/juice-shop
sudo docker image inspect bkimminich/juice-shop --format '{{index .RepoDigests 0}}'
sudo docker run -d --name juice-shop --restart unless-stopped \
  -p 10.10.30.20:3000:3000 bkimminich/juice-shop
sudo docker ps --filter name=juice-shop
sudo ss -lntp | grep ':3000'
```

Binding to `10.10.30.20` avoids publishing on every interface. The image digest makes the build reproducible.

## Step 2 - Verify the Target and Scope from Kali

```bash
ip route get 10.10.30.20
curl -I --connect-timeout 5 http://10.10.30.20:3000/
nmap -Pn -n -sT -p 3000 --reason -sV --version-light 10.10.30.20
```

Record route, response headers, and service evidence. A banner is an observation, not a vulnerability conclusion.

## Step 3 - Build an Application Map

Use browser developer tools with Network recording enabled. Visit the home page, search, login, registration, basket, and API calls using synthetic data. Create a map with:

- URL/method.
- Parameters and data type.
- Authentication required.
- Role expected.
- Sensitive data involved.
- Client-side or server-side behaviour.
- Security control expected.

Export a HAR file after confirming it contains no real secrets. Treat session tokens as credentials and redact them from the report.

## Step 4 - Run a Passive ZAP Baseline

If ZAP is installed as a package or container, use the official stable image:

```bash
mkdir -p ~/zap-output
sudo docker run --rm --network host \
  -v "$HOME/zap-output:/zap/wrk/:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t http://10.10.30.20:3000 \
  -r zap-baseline.html -J zap-baseline.json -m 2
```

The baseline spider and passive scanner observe responses; it is lower risk than an active scan. `-m 2` limits spider time. Review every alert rather than copying the report.

## Step 5 - Run a Constrained Active Scan

Obtain explicit instructor approval, take a target snapshot, and confirm no other service is bound to the address. Then:

```bash
sudo docker run --rm --network host \
  -v "$HOME/zap-output:/zap/wrk/:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-full-scan.py -t http://10.10.30.20:3000 \
  -r zap-active.html -J zap-active.json -m 3
```

Stop with `Ctrl+C` if the target becomes unstable, scan scope expands, or resource use harms the shared host. Automated alerts are hypotheses requiring validation.

## Step 6 - Manually Validate Security Headers

```bash
curl -sS -D evidence/03-validation/headers.txt -o /dev/null http://10.10.30.20:3000/
grep -Ei 'content-security-policy|strict-transport-security|x-content-type-options|referrer-policy|set-cookie' evidence/03-validation/headers.txt
```

For each absent or weak header, explain applicability. HSTS is meaningful only when HTTPS is correctly deployed.

## Step 7 - Validate Input Handling Without Harm

Choose one search or feedback input. Send a unique harmless marker:

```bash
MARKER="FEMTECH-$(date +%s)"
curl -sS --get --data-urlencode "q=$MARKER" 'http://10.10.30.20:3000/rest/products/search' \
  | tee evidence/03-validation/search-marker.json
```

Observe whether the marker is reflected, encoded, stored, or rejected. Reflection alone is not XSS. Use ZAP's evidence and browser context to determine whether executable interpretation is possible. Do not copy a payload into another application or public site.

## Step 8 - Validate Access Control

Create two synthetic users with different roles if the application workflow supports it. Record an authorised request to the user's own object, then change only the lab object identifier to another synthetic object. Capture status, response size, and data exposure. Stop if real or instructor data appears.

The finding must distinguish:

- Authentication: who is the caller?
- Authorisation: may this caller access this object/action?
- Enumeration: can identifiers be guessed?
- Impact: what data or action becomes available?

## Step 9 - Triage and Report Findings

For each candidate finding, record:

1. Title and affected endpoint.
2. Preconditions and exact reproducible request.
3. Actual vs expected response.
4. Evidence and timestamp.
5. Business impact using synthetic scenario data.
6. Likelihood and severity rationale.
7. OWASP category and CWE where justified.
8. Root-cause hypothesis, clearly labelled.
9. Specific remediation and validation test.
10. Limitations and possible false positives.

Prioritise by exploitability, data sensitivity, reachability, privileges, business impact, and existing controls—not scanner order.

## Step 10 - Clean Up

```bash
sudo docker logs --since 30m juice-shop > evidence/03-validation/juice-shop.log 2>&1
sudo docker stop juice-shop
sudo docker rm juice-shop
sudo ss -lntp | grep ':3000' || echo 'Port 3000 is no longer listening'
```

Keep or remove the image according to instructor policy. Do not delete evidence before hashing it.

## Deliverables

- Scope record and target digest.
- Application/endpoint map and sanitised HAR.
- ZAP baseline and active reports.
- Manual validation for at least three alerts, including one false positive or informational issue.
- Two developer-ready findings and one executive risk summary.
- Remediation validation plan with positive and negative tests.
- Clean-up proof.

## Professional Challenge

The release manager says, "ZAP shows 30 alerts, so the application has 30 vulnerabilities." Write a concise response that explains alert validation, duplicates, context, false positives, risk prioritisation, and release decision ownership.
