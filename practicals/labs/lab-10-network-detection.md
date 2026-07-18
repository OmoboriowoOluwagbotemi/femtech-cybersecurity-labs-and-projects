# Lab 10 - Detect Network Activity with Suricata and Zeek

## Mission

The SOC sees unexplained connections to a Linux server but has no network evidence. Deploy Suricata on the monitored server, capture a controlled test, analyse the PCAP with Zeek, and explain the difference between an alert and network metadata.

**Lessons:** 8, 25, 30, 32
**Time:** 5 hours
**Sensor/target:** Ubuntu `lin01` (`10.10.20.20`)
**Test source:** Kali (`10.10.10.60`)

## Step 1 - Confirm Visibility and Interface

On Ubuntu:

```bash
ip -br address
ip route
sudo ethtool -i enp0s3 2>/dev/null || true
sudo tcpdump -ni enp0s3 -c 10 'host 10.10.10.60'
```

Replace `enp0s3` with the actual interface. While `tcpdump` runs, ping the server from Kali. If no packets appear, fix visibility before installing detection software.

## Step 2 - Install and Baseline Suricata

```bash
sudo apt update
sudo apt install -y suricata jq tcpdump zeek
suricata --build-info | tee evidence/01-before/suricata-build.txt
sudo suricata-update
sudo suricata -T -c /etc/suricata/suricata.yaml
```

- `suricata-update` downloads and manages community rules.
- `-T` validates configuration and rules without starting packet processing.

Inspect variables:

```bash
sudo grep -nE 'HOME_NET|EXTERNAL_NET|default-rule-path' /etc/suricata/suricata.yaml
```

Set `HOME_NET` to the authorised lab subnets, not `any`. Back up the file first and edit with `sudoedit`:

```bash
sudo cp /etc/suricata/suricata.yaml /etc/suricata/suricata.yaml.pre-lab10
sudoedit /etc/suricata/suricata.yaml
sudo suricata -T -c /etc/suricata/suricata.yaml
sudo systemctl enable --now suricata
sudo systemctl status suricata --no-pager
```

## Step 3 - Add a Local Rule with Intent

Create `/etc/suricata/rules/local.rules`:

```text
alert tcp 10.10.10.0/24 any -> 10.10.20.20 22 (msg:"FEMTECH repeated SSH connection attempts"; flags:S; flow:stateless; threshold:type both, track by_src, count 5, seconds 60; sid:1000001; rev:1;)
```

Ensure `local.rules` is included under `rule-files` in `suricata.yaml`. Then:

```bash
sudo suricata -T -c /etc/suricata/suricata.yaml
sudo systemctl restart suricata
sudo journalctl -u suricata -n 30 --no-pager
```

The rule detects five SYN attempts in 60 seconds. It does not prove password guessing or compromise. The message deliberately says "connection attempts," not "brute force confirmed."

## Step 4 - Generate a Safe Positive Test

On Ubuntu, capture simultaneously:

```bash
sudo timeout 90 tcpdump -ni enp0s3 -s 0 -w evidence/02-change/lab10-test.pcap 'host 10.10.10.60'
```

On Kali:

```bash
date -u +'%Y-%m-%dT%H:%M:%SZ'
for port in 22 22 22 22 22 22; do nc -vz -w 1 10.10.20.20 "$port"; done
```

This makes ordinary TCP connections. It does not guess passwords.

## Step 5 - Find and Explain the Suricata Event

```bash
sudo jq -c 'select(.event_type=="alert" and .alert.signature_id==1000001)' /var/log/suricata/eve.json \
  | tee evidence/03-validation/suricata-alert.json
sudo jq -r 'select(.event_type=="alert") | [.timestamp,.src_ip,.dest_ip,.dest_port,.alert.signature_id,.alert.signature] | @tsv' /var/log/suricata/eve.json | tail
```

Record rule SID, revision, five-tuple, timestamp, threshold, and packet evidence. If no alert appears, check interface, HOME_NET, rule loading, timestamps, and packet counters before changing the signature.

## Step 6 - Perform Offline Zeek Analysis

Never edit the original PCAP. Hash it:

```bash
sha256sum evidence/02-change/lab10-test.pcap | tee evidence/02-change/lab10-test.pcap.sha256
mkdir -p evidence/03-validation/zeek
cd evidence/03-validation/zeek
zeek -r ../../02-change/lab10-test.pcap LogAscii::use_json=T
ls -lh
```

Query connection metadata:

```bash
jq -r '[.ts,.id.orig_h,.id.orig_p,.id.resp_h,.id.resp_p,.proto,.service,.duration,.orig_bytes,.resp_bytes,.conn_state] | @tsv' conn.log
```

If `notice.log` is absent, that is not failure. Zeek may produce rich protocol logs without raising a notice.

## Step 7 - Run a Negative and Regression Test

Make fewer than five SSH connections in 60 seconds. Confirm normal `flow` or `conn` evidence exists but SID `1000001` does not alert. Then test HTTP to ensure the rule is limited to SSH.

## Step 8 - Tune Based on Evidence

Choose one justified change: count, time window, source scope, destination list, or suppression for an approved scanner. Run positive and benign tests again. Document false-positive cost and false-negative risk.

Do not suppress an entire subnet merely because one authorised scanner is noisy. Prefer a named scanner alias or separate rule path.

## Deliverables

- Visibility proof and Suricata configuration test.
- Local rule with a plain-language detection hypothesis.
- PCAP and SHA-256 hash.
- EVE alert and Zeek connection evidence.
- Positive, negative, and regression results.
- Tuning decision with before/after alert counts.
- Comparison: Suricata signature evidence vs Zeek metadata, including encrypted-traffic limitations.
