# Lab 03 - Harden and Audit an Ubuntu Server

## Mission

An Ubuntu server is moving from a development network into the server segment. Apply a defensible minimum baseline without locking out administrators or breaking Nginx.

**Lessons:** 13-16, 21, 29
**Time:** 5 hours
**System:** `lin01` at `10.10.20.20`; Kali management source on USERS

## Change Ticket

Approved services: SSH from `10.10.10.0/24`, HTTP/HTTPS from USERS, and outbound updates through pfSense. Root SSH, unused services, and password authentication are prohibited after key access is proven.

Rollback triggers: syntax error, loss of a validated new SSH session, Nginx health-check failure, or unexpected firewall exposure.

## Step 1 - Capture the Pre-Change State

```bash
sudo ss -lntup | tee ~/femtech-evidence/01-before/listeners.txt
sudo systemctl --type=service --state=running --no-pager | tee ~/femtech-evidence/01-before/services.txt
sudo ufw status verbose | tee ~/femtech-evidence/01-before/ufw.txt
sudo sshd -T | sort | tee ~/femtech-evidence/01-before/sshd-effective.txt
sudo apt list --upgradable 2>/dev/null | tee ~/femtech-evidence/01-before/upgradable.txt
```

`sshd -T` shows effective values after includes and defaults, which is stronger evidence than reading one line from one file.

## Step 2 - Patch with Change Awareness

```bash
sudo apt update
apt list --upgradable
sudo apt upgrade -y
test -f /var/run/reboot-required && cat /var/run/reboot-required || echo 'No reboot flag'
```

Review the package list before approving. In production, maintenance windows, backups, application owners, and rollback matter even when a security update is urgent.

## Step 3 - Create and Test SSH Keys

On Kali:

```bash
install -d -m 0700 ~/.ssh
ssh-keygen -t ed25519 -a 64 -f ~/.ssh/femtech_admin -C 'amara@femtech-lab'
ssh-copy-id -i ~/.ssh/femtech_admin.pub amara@10.10.20.20
ssh -i ~/.ssh/femtech_admin amara@10.10.20.20
```

- Ed25519 provides modern public-key authentication.
- `-a 64` increases private-key derivation work, protecting an encrypted key file.
- The private key stays on Kali; only the public key is copied.

Keep this session open.

## Step 4 - Harden SSH Safely

On Ubuntu:

```bash
sudo install -m 0600 -o root -g root /etc/ssh/sshd_config /etc/ssh/sshd_config.pre-lab03
sudo tee /etc/ssh/sshd_config.d/60-femtech-hardening.conf >/dev/null <<'EOF'
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
AllowGroups webops
MaxAuthTries 3
LoginGraceTime 30
X11Forwarding no
EOF
sudo sshd -t
sudo systemctl reload ssh
sudo systemctl is-active ssh
```

Why reload: existing connections remain while the daemon rereads configuration. Why validate first: a typo can prevent new sessions.

From a second Kali terminal:

```bash
ssh -o PasswordAuthentication=no -i ~/.ssh/femtech_admin amara@10.10.20.20 'id && hostname'
ssh -o PubkeyAuthentication=no amara@10.10.20.20
ssh root@10.10.20.20
```

First succeeds; the next two fail. Do not close the original session until this is proven.

## Step 5 - Configure Host Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow proto tcp from 10.10.10.0/24 to any port 22 comment 'CHG-LAB03 SSH from USERS'
sudo ufw allow proto tcp from 10.10.10.0/24 to any port 80 comment 'CHG-LAB03 HTTP from USERS'
sudo ufw allow proto tcp from 10.10.10.0/24 to any port 443 comment 'CHG-LAB03 HTTPS from USERS'
sudo ufw logging medium
sudo ufw --force enable
sudo ufw status numbered
```

The host firewall complements pfSense. It protects the server if network segmentation is misconfigured or traffic originates inside the server segment.

Validate from Kali:

```bash
nmap -Pn -sT -p 22,80,443,3306 10.10.20.20
```

`-Pn` skips host discovery because a firewall may block ping; `-sT` uses normal TCP connections; explicit ports keep the test in scope.

## Step 6 - Install and Tune Fail2Ban

```bash
sudo apt install -y fail2ban
sudo tee /etc/fail2ban/jail.d/sshd-femtech.local >/dev/null <<'EOF'
[sshd]
enabled = true
backend = systemd
maxretry = 5
findtime = 10m
bantime = 15m
ignoreip = 127.0.0.1/8 10.10.20.1
EOF
sudo fail2ban-client -t
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

The pfSense gateway is ignored to reduce the risk of blocking the management path. Do not whitelist the entire user subnet; that would hide repeated attacks from compromised clients.

Generate two failed logins only, below the ban threshold, and confirm they are counted. Do not intentionally ban a shared classroom address.

## Step 7 - Add Targeted Audit Rules

```bash
sudo apt install -y auditd audispd-plugins
sudo tee /etc/audit/rules.d/femtech.rules >/dev/null <<'EOF'
-w /etc/ssh/sshd_config -p wa -k ssh_config_change
-w /etc/ssh/sshd_config.d/ -p wa -k ssh_config_change
-w /etc/sudoers -p wa -k privilege_policy
-w /etc/sudoers.d/ -p wa -k privilege_policy
EOF
sudo augenrules --check
sudo augenrules --load
sudo auditctl -l
```

`-p wa` records writes and attribute changes; the key makes later searches predictable. Avoid recursively auditing broad trees because noise can exhaust disk and analyst capacity.

Generate an authorised test:

```bash
sudo touch /etc/ssh/sshd_config.d/audit-proof.conf
sudo rm /etc/ssh/sshd_config.d/audit-proof.conf
sudo ausearch -k ssh_config_change -ts recent -i
```

## Step 8 - Remove Unneeded Exposure

```bash
sudo ss -lntup
sudo systemctl list-unit-files --state=enabled
sudo lsof -nP -iTCP -sTCP:LISTEN
```

For each listener, document owner, purpose, data, users, and dependency. Disable only an instructor-approved unused service:

```bash
sudo systemctl disable --now <UNUSED_SERVICE>
sudo systemctl mask <UNUSED_SERVICE>
```

`disable` removes automatic start; `mask` prevents manual or dependency-based starts. Do not use placeholders literally.

## Step 9 - Validate Security and Business Function

```bash
sudo sshd -t
sudo nginx -t
curl -fsS http://127.0.0.1/ >/dev/null && echo 'Local Nginx PASS'
sudo systemctl --failed
sudo journalctl -p warning --since '-1 hour' --no-pager
sudo ufw status verbose
sudo fail2ban-client status sshd
sudo auditctl -l
```

From Kali, repeat SSH, HTTP, and negative-port tests. Confirm pfSense and UFW logs. A secure configuration that breaks the business service is not a successful change.

## Rollback

At the console:

```bash
sudo rm -f /etc/ssh/sshd_config.d/60-femtech-hardening.conf
sudo cp /etc/ssh/sshd_config.pre-lab03 /etc/ssh/sshd_config
sudo sshd -t && sudo systemctl reload ssh
sudo ufw --force disable
sudo systemctl disable --now fail2ban
```

Use the snapshot only if targeted rollback fails. Record why rollback was invoked.

## Deliverables

- Change plan with risk, tests, and rollback.
- Before/after effective SSH configuration and listeners.
- Key-login success plus password/root failures.
- UFW rule set and Nmap validation.
- Fail2Ban status and interpretation.
- auditd rule and matching event.
- Service health and regression tests.
- Exception record for one hardening recommendation you deliberately did not apply.

## Decision Questions

1. Why can disabling password authentication cause an outage?
2. Why are pfSense and UFW both valuable?
3. When would a Fail2Ban ban be a harmful false positive?
4. What evidence supports that Nginx still works after hardening?
