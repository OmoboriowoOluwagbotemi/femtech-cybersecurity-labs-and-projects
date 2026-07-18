# Project 09 - Perform DFIR After a Linux Web Compromise

## Scenario

The FEMTECH marketing site on Ubuntu begins redirecting users intermittently. Nginx configuration changed overnight, a new systemd unit exists, and outbound traffic was observed. The server must remain available long enough to preserve evidence, but continued compromise may harm visitors.

**Duration:** 2 weeks
**Tools:** Ubuntu, Wazuh, auditd, journalctl, tcpdump/tshark, Zeek, Suricata, YARA optional, SHA-256, pfSense
**Lessons:** 9, 13-16, 29, 33-35

## Phase 1 - Incident Command and Safety

Open incident, identify site owner, evidence authority, legal/privacy constraints, severity, update cadence, and containment authority. Prepare options before changing state.

## Phase 2 - Volatile Collection

```bash
CASE=/tmp/INC-LINUX-DFIR
sudo install -d -m 0700 "$CASE"
date -u +'%Y-%m-%dT%H:%M:%SZ' | sudo tee "$CASE/start.txt"
sudo ps auxfww > "$CASE/ps.txt"
sudo pstree -ap > "$CASE/pstree.txt"
sudo ss -pantue > "$CASE/ss.txt"
sudo lsof -nP > "$CASE/lsof.txt"
sudo who -a > "$CASE/who.txt"
sudo ip -br address > "$CASE/ip.txt"
sudo ip route > "$CASE/routes.txt"
sudo systemctl --type=service --state=running --no-pager > "$CASE/services.txt"
sudo systemctl list-timers --all --no-pager > "$CASE/timers.txt"
sudo crontab -l > "$CASE/root-crontab.txt" 2>&1
```

## Phase 3 - Preserve Configurations and Logs

```bash
sudo journalctl --since '-48 hours' --utc --no-pager > "$CASE/journal-48h.txt"
sudo cp --preserve=all /var/log/auth.log /var/log/nginx/access.log /var/log/nginx/error.log "$CASE/"
sudo tar --xattrs --acls -cpf "$CASE/config-and-web.tar" /etc/nginx /etc/systemd/system /var/www 2>/dev/null
sudo find /etc/nginx /etc/systemd/system /var/www -xdev -printf '%TY-%Tm-%TdT%TH:%TM:%TS %M %u %g %s %p\n' > "$CASE/fs-timeline.txt"
sudo sha256sum "$CASE"/* > "$CASE/hashes.sha256"
```

Do not run unknown binaries or delete redirect code.

## Phase 4 - Analyse

Investigate process ancestry, executable path, package ownership, unit file, logins, sudo, file changes, web requests, network destinations, and Wazuh alerts.

```bash
sudo systemctl cat <SUSPICIOUS_UNIT>
sudo systemctl show <SUSPICIOUS_UNIT> -p FragmentPath,User,ExecStart,ActiveEnterTimestamp
dpkg -S <SUSPICIOUS_PATH> 2>/dev/null || echo 'No package owns path'
stat <SUSPICIOUS_PATH>
sha256sum <SUSPICIOUS_PATH>
grep -E 'Accepted|Failed|sudo|session opened' "$CASE/auth.log"
```

## Phase 5 - Scope and Contain

Search Wazuh for hash/path/user/source/destination across agents. Present containment options: pfSense egress/source block, maintenance page, remove server from load balancer, disable account/session, or host isolation. Preserve evidence and obtain approval first.

## Phase 6 - Eradicate and Recover

Preferred recovery is rebuild from a known-good image when integrity cannot be trusted. Restore validated content/configuration, rotate keys and credentials, patch root cause, reissue certificates if private keys were exposed, and re-onboard monitoring. A simple file deletion is not sufficient.

Validate:

```bash
sudo nginx -t
curl --cacert <ROOT_CA> -fsS https://<SITE_NAME>/ >/dev/null
sudo systemctl --failed
sudo ss -lntup
sudo journalctl -p warning --since '-30 minutes' --no-pager
nmap -Pn -n -sT -p 22,80,443 --reason <RECOVERED_IP>
```

## Injects

1. The suspicious unit name resembles a legitimate monitoring agent.
2. The private TLS key was readable by the web-service account.
3. The last known-good backup predates a marketing update.
4. Wazuh FIM was disabled three days before the redirect.

## Deliverables

- Authority log, evidence register/hashes, volatile collection, and UTC timeline.
- Root-cause and contributing-factor analysis with confidence.
- Scope and containment decision.
- Rebuild/recovery evidence and business sign-off.
- Credential/certificate rotation record.
- Detection improvements and forensic-readiness plan.
- Executive incident report and technical appendix.
