# Lab 02 - Linux Administration and Least Privilege

## Mission

A new web-operations team needs controlled access to `lin01`. The previous administrator shared the root password and gave application files mode `777`. Replace this practice with named accounts, groups, sudo policy, ACLs, and auditable changes.

**Lessons:** 11-13, 15, 20
**Time:** 4 hours
**System:** Ubuntu Server 24.04 LTS on `10.10.20.20`

## Requirements and Safety

Take a snapshot. Keep a root-capable console open. Never edit `/etc/sudoers` with a normal text editor; use `visudo`, which validates syntax.

Roles:

- `amara`: web operator; may read logs and restart Nginx only.
- `bisi`: security analyst; may read the lab log directory but may not restart services.
- `chidi`: contractor; account expires in seven days and has no sudo.

## Step 1 - Record the Baseline

```bash
hostnamectl
id
getent passwd | cut -d: -f1,3,4,7
getent group
sudo find /srv/femapp -maxdepth 2 -printf '%M %u %g %p\n' 2>/dev/null
sudo -l
```

`getent` uses the configured identity sources and is more general than reading local files alone. The `find -printf` output records permissions, owner, and group.

Create the application structure:

```bash
sudo install -d -o root -g root -m 0755 /srv/femapp
sudo install -d -o root -g webops -m 2770 /srv/femapp/releases 2>/dev/null || true
sudo install -d -o root -g root -m 0750 /var/log/femapp
```

The first run may report that `webops` does not exist. That is expected baseline evidence, not a reason to use `777`.

## Step 2 - Create Groups and Named Accounts

```bash
sudo groupadd --force webops
sudo groupadd --force secanalysts
sudo adduser amara
sudo adduser bisi
sudo adduser --disabled-password --gecos 'Lab contractor' chidi
sudo usermod -aG webops amara
sudo usermod -aG secanalysts bisi
sudo chage -E "$(date -d '+7 days' +%F)" chidi
```

- `-aG` appends supplementary groups. Omitting `-a` can remove existing memberships.
- `chage -E` sets an account expiry date; it is different from password expiry.
- Each person receives a named account so logs retain accountability.

Verify:

```bash
id amara
id bisi
sudo chage -l chidi
getent group webops secanalysts
```

## Step 3 - Apply Group Ownership and Setgid

```bash
sudo chown -R root:webops /srv/femapp
sudo chmod 0750 /srv/femapp
sudo chmod 2770 /srv/femapp/releases
sudo find /srv/femapp -maxdepth 2 -printf '%M %u %g %p\n'
```

The leading `2` sets setgid on the directory so new files inherit group `webops`. It does not grant every user access; group membership still controls entry.

Test as Amara:

```bash
sudo -iu amara
umask
touch /srv/femapp/releases/release-test.txt
ls -l /srv/femapp/releases/release-test.txt
exit
```

If the file is not group-writable, set an appropriate collaborative umask or default ACL rather than using `chmod 777`.

```bash
sudo setfacl -m d:g:webops:rwx,d:o::--- /srv/femapp/releases
sudo setfacl -m g:webops:rwx /srv/femapp/releases
getfacl /srv/femapp/releases
```

The access ACL controls the directory now; the default ACL is inherited by new children.

## Step 4 - Grant Read-Only Log Access

```bash
sudo apt update
sudo apt install -y acl
sudo touch /var/log/femapp/application.log
sudo chown root:root /var/log/femapp/application.log
sudo chmod 0640 /var/log/femapp/application.log
sudo setfacl -m g:secanalysts:rX /var/log/femapp
sudo setfacl -m d:g:secanalysts:rX /var/log/femapp
getfacl /var/log/femapp /var/log/femapp/application.log
```

Uppercase `X` grants execute only on directories or where execute already exists, avoiding accidental executable permission on ordinary log files.

## Step 5 - Install Nginx and Create Narrow Sudo Rules

```bash
sudo apt install -y nginx
sudo systemctl enable --now nginx
command -v systemctl
sudo visudo -f /etc/sudoers.d/femtech-webops
```

Enter exactly:

```text
Cmnd_Alias FEM_NGINX = /usr/bin/systemctl status nginx, /usr/bin/systemctl restart nginx
%webops ALL=(root) FEM_NGINX
```

Then set safe ownership and validate:

```bash
sudo chown root:root /etc/sudoers.d/femtech-webops
sudo chmod 0440 /etc/sudoers.d/femtech-webops
sudo visudo -cf /etc/sudoers
sudo -l -U amara
sudo -l -U bisi
```

Do not grant `systemctl * nginx`; wildcards can produce unexpected authorisation. Do not grant editors, shells, package managers, or arbitrary script paths through sudo.

## Step 6 - Run Authorisation Tests

Positive test:

```bash
sudo -iu amara
sudo /usr/bin/systemctl status nginx --no-pager
sudo /usr/bin/systemctl restart nginx
exit
```

Negative tests:

```bash
sudo -iu amara
sudo /usr/bin/apt update
cat /etc/shadow
exit
sudo -iu bisi
head /var/log/femapp/application.log
sudo /usr/bin/systemctl restart nginx
touch /srv/femapp/releases/unauthorised.txt
exit
```

Expected: Amara can manage only Nginx; Bisi can read lab logs but cannot restart Nginx or write releases; neither can read shadow.

## Step 7 - Audit the Actions

```bash
sudo journalctl _COMM=sudo --since '-30 minutes' --no-pager
sudo grep -E 'sudo|session opened|session closed' /var/log/auth.log | tail -n 50
last -a | head
```

Write one timeline row for every successful and denied privilege action. A denial is valuable evidence that least privilege is enforced.

## Rollback

```bash
sudo rm /etc/sudoers.d/femtech-webops
sudo gpasswd -d amara webops
sudo gpasswd -d bisi secanalysts
sudo setfacl -b /var/log/femapp
sudo setfacl -b /srv/femapp/releases
sudo visudo -cf /etc/sudoers
```

Do not delete student accounts until evidence has been reviewed; deletion can make historical numeric UIDs harder to interpret.

## Deliverables

- Before/after permission listing and ACL output.
- Account and group design with business justification.
- Sudoers file and syntax-validation result.
- Matrix of six positive/negative tests with actual outcomes.
- Authentication-log timeline.
- Short explanation of why `777`, shared root, and broad sudo are dangerous.

## Professional Challenge

The application owner asks Bisi to edit logs to remove noisy errors. Write the response you would send. Identify integrity, evidence, separation-of-duties, and operational concerns, then propose a safe alternative.
