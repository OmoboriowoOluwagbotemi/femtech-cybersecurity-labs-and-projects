# Lab 12 - Deploy Wazuh and Onboard Endpoints

## Mission

FEMTECH cannot investigate what it cannot see. Deploy an all-in-one Wazuh platform, onboard an Ubuntu agent, generate known events, trace the data path, and diagnose one simulated telemetry failure.

**Lessons:** 30-31
**Time:** 6-8 hours
**Manager:** Ubuntu `wazuh01` (`10.10.40.10`), 4 vCPU, 8 GiB RAM, 50+ GB disk
**Agent:** Ubuntu `lin01` (`10.10.20.20`)

## Safety and Version Position

The command below follows Wazuh 4.14 quickstart as validated in July 2026. Check the current official quickstart before a new cohort. Use only synthetic logs. Do not enable active response in this lab.

## Step 1 - Verify Resources and DNS

On `wazuh01`:

```bash
hostnamectl
lscpu | grep -E '^CPU\(s\)|Architecture'
free -h
df -h /
ip -br address
getent hosts wazuh01.femtech.lab
timedatectl
```

Low memory, full disk, wrong DNS, and time drift can all resemble application problems later.

## Step 2 - Install the All-in-One Platform

```bash
cd /tmp
curl -sO https://packages.wazuh.com/4.14/wazuh-install.sh
less wazuh-install.sh
sudo bash ./wazuh-install.sh -a
```

Reviewing the script before privilege elevation is a supply-chain control. After completion, store displayed credentials in the instructor-approved vault, then verify:

```bash
sudo systemctl status wazuh-manager wazuh-indexer wazuh-dashboard filebeat --no-pager
sudo ss -lntp | grep -E ':1514|:1515|:443|:9200'
sudo /var/ossec/bin/wazuh-control status
```

Access `https://10.10.40.10` from the authorised analyst host. The quickstart uses a locally generated certificate, so a browser warning is expected until trust is configured. Verify the certificate fingerprint before accepting it.

## Step 3 - Preserve Credentials and Installation Files

Pause the shell transcript before handling secrets. Extract the protected password file without printing it to the terminal:

```bash
sudo tar -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt
sudo chmod 0600 wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt
```

Copy the required values into the instructor-approved vault, restrict the extracted file, and resume the transcript only after the secret is no longer displayed. If a password was captured, stop, rotate it, and sanitise only the report copy while retaining incident documentation.

## Step 4 - Install the Ubuntu Agent

On `lin01`:

```bash
sudo install -d -m 0755 /usr/share/keyrings
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH \
  | sudo gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import
sudo chmod 0644 /usr/share/keyrings/wazuh.gpg
echo 'deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main' \
  | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update
sudo env WAZUH_MANAGER='10.10.40.10' WAZUH_AGENT_NAME='lin01' apt install -y wazuh-agent
sudo systemctl daemon-reload
sudo systemctl enable --now wazuh-agent
sudo systemctl status wazuh-agent --no-pager
```

The manager address and agent name become enrollment configuration. Verify connectivity:

```bash
sudo grep -nA3 '<address>' /var/ossec/etc/ossec.conf
sudo tail -n 50 /var/ossec/logs/ossec.log
nc -vz -w 3 10.10.40.10 1514
```

On the manager:

```bash
sudo /var/ossec/bin/agent_control -lc
sudo tail -n 50 /var/ossec/logs/ossec.log
```

## Step 5 - Generate and Trace Authentication Events

Record UTC time. From Kali, make two failed SSH logins to `lin01`, then one successful approved login. On `lin01`:

```bash
sudo tail -n 30 /var/log/auth.log
sudo tail -n 50 /var/ossec/logs/ossec.log
```

In Wazuh, search by agent `lin01`, source IP, and time. Record raw event, decoder fields, rule ID/level, index timestamp, and dashboard view. Explain each pipeline stage:

```text
source -> agent collection -> secure transport -> manager decoder/rule -> indexer -> dashboard query
```

## Step 6 - Enable a Narrow File-Integrity Test

Back up configuration:

```bash
sudo cp /var/ossec/etc/ossec.conf /var/ossec/etc/ossec.conf.pre-lab12
sudo install -d -o root -g root -m 0755 /opt/femtech-critical
sudoedit /var/ossec/etc/ossec.conf
```

Inside `<syscheck>`, add:

```xml
<directories realtime="yes" check_all="yes">/opt/femtech-critical</directories>
```

Validate and restart:

```bash
sudo /var/ossec/bin/wazuh-agentd -t
sudo systemctl restart wazuh-agent
echo 'approved baseline' | sudo tee /opt/femtech-critical/config.txt
echo 'authorised change' | sudo tee -a /opt/femtech-critical/config.txt
sudo tail -n 50 /var/ossec/logs/ossec.log
```

Find the FIM alert. Explain why FIM confirms change but does not prove malicious intent.

## Step 7 - Simulate a Telemetry Failure

With instructor approval, stop the agent for five minutes:

```bash
sudo systemctl stop wazuh-agent
date -u
```

Observe manager status and dashboard delay. Diagnose using service state, local log, network ports, manager record, and time. Recover:

```bash
sudo systemctl start wazuh-agent
sudo systemctl is-active wazuh-agent
sudo tail -n 30 /var/ossec/logs/ossec.log
```

Telemetry loss is itself a security event and a coverage gap.

## Step 8 - Platform Health and Repository Governance

```bash
sudo journalctl -u wazuh-manager -p warning --since '-2 hours' --no-pager
sudo journalctl -u wazuh-indexer -p warning --since '-2 hours' --no-pager
df -h
free -h
curl -k -s -u '<INDEXER_USER>' https://127.0.0.1:9200/_cluster/health?pretty
```

Do not put literal credentials into shell history. Prefer an interactive prompt or protected credential file. Follow current Wazuh guidance on disabling repositories after installation to avoid unplanned upgrades, and manage updates through change control.

## Deliverables

- Architecture/data-path diagram and port matrix.
- Installation and service-health evidence with secrets removed.
- Agent enrollment and connectivity proof.
- Authentication event traced end to end.
- FIM configuration, alert, and interpretation.
- Telemetry-failure timeline, diagnosis, and recovery.
- Capacity/retention assumptions and a 90-day operational checklist.

## Troubleshooting Decision Tree

1. Is the source event present locally?
2. Is the agent service active and configuration valid?
3. Can the agent reach the manager ports through host and pfSense firewalls?
4. Does the manager show the agent connected?
5. Is the event decoded and ruled?
6. Is it indexed?
7. Does the dashboard time range/query include it?

Change only the failed layer.
