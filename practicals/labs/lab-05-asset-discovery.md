# Lab 05 - Discover, Classify, and Baseline Assets

## Mission

FEMTECH has inherited a server segment with incomplete records. Create an evidence-based asset inventory without scanning outside the authorised subnet or disrupting services.

**Lessons:** 8, 16, 27
**Time:** 4 hours
**Source:** Kali
**Authorised target:** `10.10.20.0/24` only

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

## Deliverables

- Scope record and route proof.
- Passive PCAP and three Nmap output formats.
- Host-vs-network comparison table.
- Completed asset inventory with confidence fields.
- Rogue-asset escalation ticket.
- Explanation of false positives, false negatives, and why inventory is continuous.

## Reflection

1. Why can `-sn` miss a live Windows host?
2. What does an open port prove, and what does it not prove?
3. Why should owner and business function be part of asset discovery?
4. How would you safely scale this process to 10,000 assets?
