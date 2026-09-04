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
sudo apt upgrade | tee ~/femtech-evidence/ubuntu-tool-lab/02-change/apt-upgrade.txt
```

Read the upgrade summary before typing `Y`. In a real organization, administrators review what will change before approving updates.

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

Before disabling password SSH, prepare SSH key access from Kali. This prevents accidental lockout.

On Kali, check whether a lab SSH key already exists:

```bash
ls -l ~/.ssh
```

If no approved lab key exists, create one:

```bash
ssh-keygen -t ed25519 -C "femtech-lab-analyst01"
```

Press `Enter` to accept the default file path unless the instructor gives a different name. Use a passphrase if required by the instructor. Do not put the private key in evidence or reports.

Copy the public key to `analyst01` on Ubuntu while password login is still allowed:

```bash
ssh-copy-id analyst01@10.10.20.20
```

If `ssh-copy-id` is not available, display the public key on Kali:

```bash
cat ~/.ssh/id_ed25519.pub
```

Then on Ubuntu, as an administrator, create the authorized key file manually:

```bash
sudo install -d -m 700 -o analyst01 -g analyst01 /home/analyst01/.ssh
sudoedit /home/analyst01/.ssh/authorized_keys
sudo chown analyst01:analyst01 /home/analyst01/.ssh/authorized_keys
sudo chmod 600 /home/analyst01/.ssh/authorized_keys
```

Paste only the public key into `authorized_keys`. Never paste the private key.

Test key login from Kali before editing SSH hardening settings:

```bash
ssh analyst01@10.10.20.20 'whoami; hostname; date -u'
```

Expected result:

```text
analyst01
lin01
```

Save proof of the successful key login from Kali in the Kali evidence folder or paste the output into the report.

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

Test expected access:

```bash
ssh analyst01@10.10.20.20 'whoami; groups; hostname'
```

Test expected denial:

```bash
ssh root@10.10.20.20
```

Root SSH should be denied. If root login succeeds, stop and review `PermitRootLogin no`.

If `analyst01` cannot log in after hardening, restore the backup from the still-open session:

```bash
sudo cp /etc/ssh/sshd_config.pre-femtech /etc/ssh/sshd_config
sudo sshd -t
sudo systemctl reload ssh
```

## Step 7 - Configure UFW

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.10.60 to any port 22 proto tcp comment 'Kali admin SSH'
sudo ufw allow from 10.10.10.0/24 to any port 80 proto tcp comment 'User HTTP access'
sudo ufw enable
sudo ufw status verbose | tee ~/femtech-evidence/ubuntu-tool-lab/03-validation/ufw-status.txt
```

Important: The SSH allow rule must be added before `sudo ufw enable`. If students enable UFW before allowing SSH, they may block their own administration path.

Validate from Kali:

```bash
nc -vz -w 3 10.10.20.20 22
curl -sSI --connect-timeout 5 http://10.10.20.20/
nmap -Pn -n -sT -p 22,80,443 --reason 10.10.20.20
```

Expected validation:

| Test | Expected result |
|---|---|
| SSH from approved Kali IP | Allowed |
| HTTP from approved user network | Allowed |
| HTTPS port 443 | Closed or filtered unless intentionally configured |
| Root SSH login | Denied |
| Password-only SSH login | Denied after key access is proven |

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

## Complete Lab Support

### Beginner Concepts

| Concept | Simple meaning | Lab example |
|---|---|---|
| Server | A computer that provides a service to users or other systems | Ubuntu provides SSH and a web page |
| SSH | Secure remote command-line access | Administrator connects from Kali to Ubuntu |
| Service | Background program managed by Linux | `ssh`, `nginx`, `fail2ban` |
| Firewall | Control that allows or blocks traffic | UFW allows only approved ports |
| User | Account used to log in or run work | `analyst01` |
| Group | Collection of users used for permission management | `secops`, `webops` |
| Permission | Rule that controls read, write, or execute access | `/srv/femtech-web` group write access |
| Log | Record of activity | `/var/log/auth.log` |
| Hardening | Reducing unnecessary risk | Disable root SSH and password SSH |
| Rollback | Returning to a known working state | Restore SSH backup or VM snapshot |

### Required Preflight

Before changing the server, complete this checklist:

```text
Ubuntu VM name:
Ubuntu hostname:
Ubuntu IP address:
Admin username:
Kali source IP:
Approved services:
Snapshot name:
Instructor approval:
```

Run:

```bash
hostname
whoami
ip -br address
ip route
sudo -v
```

Stop if the system is not the assigned Ubuntu server.

### Evidence Folder Standard

Use one variable to avoid typing mistakes:

```bash
LAB="$HOME/femtech-evidence/ubuntu-tool-lab"
mkdir -p "$LAB"/{01-before,02-change,03-validation,04-rollback,05-report,06-screenshots}
date -u +'%Y-%m-%dT%H:%M:%SZ' | tee "$LAB/session-start-utc.txt"
```

Every important command should either use `tee` or be copied into the report with date, hostname, and interpretation.

### Step-by-Step Validation Matrix

| Area | Command | Passing result |
|---|---|---|
| Host identity | `hostnamectl` | Hostname, OS, and kernel are visible |
| Network | `ip -br address` | Server has the expected IP |
| Routing | `ip route` | Default route is correct for the lab |
| Services | `sudo ss -lntup` | Only expected listening services appear |
| Failed services | `systemctl --failed` | No unexpected failed service |
| SSH syntax | `sudo sshd -t` | No output or no syntax error |
| SSH status | `systemctl status ssh` | Service is active |
| Firewall | `sudo ufw status verbose` | Only required rules are allowed |
| Fail2Ban | `sudo fail2ban-client status sshd` | SSH jail is active |
| Logs | `sudo tail /var/log/auth.log` | SSH activity appears |

### Safe SSH Hardening Notes

Do not close the current SSH session until a new session works. A safe sequence is:

1. Back up `/etc/ssh/sshd_config`.
2. Edit the file.
3. Run `sudo sshd -t`.
4. Reload SSH, not reboot first.
5. Open a second terminal.
6. Test a new login.
7. Only then close the old session.

If login fails, use the still-open session to restore:

```bash
sudo cp /etc/ssh/sshd_config.pre-femtech /etc/ssh/sshd_config
sudo sshd -t
sudo systemctl reload ssh
```

### Report Template

```text
Title: Ubuntu Server Administration and Hardening Report

1. Scope
System:
IP address:
Approved services:
Change window:

2. Baseline
Listening services before:
Users/groups before:
Important risks observed:

3. Changes Made
Users/groups:
Permissions:
SSH:
UFW:
Fail2Ban:
Nginx:

4. Validation
Positive tests:
Negative tests:
Log evidence:

5. Problems and Fixes
Issue:
Hypothesis:
Test:
Result:

6. Remaining Risk

7. Management Summary
```

### Student Must Explain

- Why root SSH login is risky.
- Why SSH key access is stronger than password-only access.
- Why UFW is still useful even when pfSense exists.
- Why a service can be installed but not listening.
- Why logs are evidence, but still need interpretation.
- Why safe hardening requires testing key access before disabling password login.
- Why a negative test, such as denied root SSH, is as important as an allowed test.

### Entry-Level Job Readiness Check

A student is ready to move forward when they can do these tasks without copying blindly:

| Skill | Student can demonstrate |
|---|---|
| Linux administration | Identify hostname, IP address, routes, services, users, and groups |
| SSH security | Configure key-based access and deny risky root login |
| Host firewalling | Allow required services and block unnecessary exposure with UFW |
| Service validation | Prove `nginx`, `ssh`, and `fail2ban` are running and useful |
| Log analysis | Explain at least one successful and one failed authentication event |
| Change safety | Keep rollback evidence and avoid locking themselves out |
