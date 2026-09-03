# Tool Lab 02 - Ubuntu Server Administration and Hardening

## Purpose

Ubuntu Server is the course Linux platform for administration, hardening, logging, remediation, and incident evidence. This lab builds practical skill with users, permissions, services, SSH, UFW, Fail2Ban, logs, and rollback.

## Scenario

An internal Ubuntu server named `lin01` is being moved into the server network. It must support SSH administration and a simple web service, but it must not expose unnecessary services or allow weak administration.

## Systems

| System | Role | Example address |
|---|---|---|
| Ubuntu Server | Target server | `10.10.20.20` |
| Kali Linux | Admin/testing source | `10.10.10.60` |
| pfSense | Network firewall | `10.10.10.1`, `10.10.20.1` |

## Step 1 - Start Evidence Collection

```bash
mkdir -p ~/femtech-evidence/ubuntu-tool-lab/{01-before,02-change,03-validation,04-rollback,05-report}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee ~/femtech-evidence/ubuntu-tool-lab/session-start-utc.txt
script -af ~/femtech-evidence/ubuntu-tool-lab/command-log.txt
```

## Step 2 - Baseline the Server

```bash
hostnamectl | tee ~/femtech-evidence/ubuntu-tool-lab/01-before/hostname.txt
ip -br address | tee ~/femtech-evidence/ubuntu-tool-lab/01-before/ip-address.txt
ip route | tee ~/femtech-evidence/ubuntu-tool-lab/01-before/routes.txt
sudo ss -lntup | tee ~/femtech-evidence/ubuntu-tool-lab/01-before/listeners.txt
systemctl --failed | tee ~/femtech-evidence/ubuntu-tool-lab/01-before/failed-services.txt
sudo journalctl -p warning -n 50 --no-pager | tee ~/femtech-evidence/ubuntu-tool-lab/01-before/journal-warnings.txt
```

## Step 3 - Update Packages Safely

```bash
sudo apt update | tee ~/femtech-evidence/ubuntu-tool-lab/02-change/apt-update.txt
apt list --upgradable 2>/dev/null | tee ~/femtech-evidence/ubuntu-tool-lab/02-change/upgradable-before.txt
sudo apt upgrade -y | tee ~/femtech-evidence/ubuntu-tool-lab/02-change/apt-upgrade.txt
```

If a reboot is required, record it:

```bash
test -f /var/run/reboot-required && cat /var/run/reboot-required | tee ~/femtech-evidence/ubuntu-tool-lab/02-change/reboot-required.txt
```

## Step 4 - Create Users, Groups, and Permissions

```bash
sudo groupadd secops
sudo groupadd webops
sudo useradd -m -s /bin/bash analyst01
sudo useradd -m -s /bin/bash webadmin01
sudo usermod -aG secops analyst01
sudo usermod -aG webops webadmin01
sudo install -d -o root -g webops -m 2770 /srv/femtech-web
sudo install -d -o root -g secops -m 2750 /var/log/femtech-review
id analyst01 | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/id-analyst01.txt
id webadmin01 | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/id-webadmin01.txt
namei -l /srv/femtech-web | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/web-path-permissions.txt
```

Set temporary passwords only if the instructor requires interactive testing. Do not record passwords in evidence.

## Step 5 - Install and Validate Nginx

```bash
sudo apt install -y nginx
echo 'FEMTECH Ubuntu hardening lab' | sudo tee /var/www/html/index.html
sudo systemctl enable --now nginx
sudo systemctl status nginx --no-pager | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/nginx-status.txt
sudo ss -lntup | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/listeners-after-nginx.txt
```

From Kali:

```bash
curl -sSI --connect-timeout 5 http://10.10.20.20/
```

Save the Kali result in the student's Kali evidence folder or copy it into the report.

## Step 6 - Harden SSH

Create a backup:

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.pre-femtech
```

Edit with `sudoedit`:

```bash
sudoedit /etc/ssh/sshd_config
```

Required settings:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowGroups secops
```

Validate before restarting:

```bash
sudo sshd -t
sudo systemctl reload ssh
sudo systemctl status ssh --no-pager | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/ssh-status.txt
sudo grep -nE 'PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|MaxAuthTries|AllowGroups' /etc/ssh/sshd_config \
  | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/ssh-effective-settings.txt
```

Keep one existing session open while testing a new SSH session from Kali.

## Step 7 - Configure UFW

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.10.60 to any port 22 proto tcp comment 'Kali admin SSH'
sudo ufw allow from 10.10.10.0/24 to any port 80 proto tcp comment 'User HTTP access'
sudo ufw enable
sudo ufw status verbose | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/ufw-status.txt
```

Validate from Kali:

```bash
nc -vz -w 3 10.10.20.20 22
curl -sSI --connect-timeout 5 http://10.10.20.20/
nmap -Pn -n -sT -p 22,80,443 --reason 10.10.20.20
```

## Step 8 - Install Fail2Ban

```bash
sudo apt install -y fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local.pre-femtech
sudo tee /etc/fail2ban/jail.d/femtech-sshd.conf >/dev/null <<'EOF'
[sshd]
enabled = true
maxretry = 3
findtime = 10m
bantime = 15m
EOF
sudo systemctl enable --now fail2ban
sudo fail2ban-client status | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/fail2ban-status.txt
sudo fail2ban-client status sshd | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/fail2ban-sshd.txt
```

## Step 9 - Read Logs Like an Analyst

```bash
sudo tail -n 80 /var/log/auth.log | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/auth-log-tail.txt
sudo journalctl -u ssh --since '-1 hour' --no-pager | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/ssh-journal.txt
sudo journalctl -u nginx --since '-1 hour' --no-pager | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/nginx-journal.txt
```

Explain at least one successful event and one denied or failed event.

## Step 10 - Rollback Plan

Record how to reverse each change:

```text
SSH rollback:
UFW rollback:
Fail2Ban rollback:
Nginx rollback:
User/group rollback:
Snapshot name:
```

Do not perform rollback unless validation fails or the instructor asks.

## Deliverables

- Baseline server evidence.
- User/group and permission proof.
- SSH hardening proof.
- UFW configuration and Kali validation.
- Fail2Ban status.
- Log interpretation.
- Rollback plan.
- Technical and management summary.

## Pass Condition

The student passes when SSH is safer, required web access still works, unnecessary exposure is reduced, and logs prove the outcome.

