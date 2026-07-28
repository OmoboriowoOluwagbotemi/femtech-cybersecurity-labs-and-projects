# Fintech Payment Network Segmentation and IDS/IPS Defence

## Robust Reference Implementation and Instructor Solution

**Companion challenge:** [Student task brief](../practicals/projects/pfsense-ids-ips-student-task-brief.md)

**Environment:** Isolated educational lab only  
**Core tools:** pfSense Community Edition, Suricata, Kali Linux, Ubuntu Server, OpenSSH, Nginx, tcpdump, Wireshark, Nmap, curl, OpenSSL  

> This guide explains one defensible implementation. It is not the only correct design. A professional engineer must understand the packet path, business requirement, security effect, evidence, failure modes, and rollback—not merely reproduce interface clicks.

## 1. Safety and Authorisation

Use the commands and tests in this guide only inside the assigned private lab:

- USERS: `10.10.10.0/24`
- SERVERS: `10.10.20.0/24`
- authorised validation source: `10.10.10.10`
- authorised target: `10.10.20.20`

Do not bridge these networks to a production environment. Do not change the target address to an internet host, classmate, employer, or any system without written authorisation.

Before testing, record:

```text
Engagement: NovaPay Fintech Segmentation Lab
Source: 10.10.10.10
Target: 10.10.20.20
Allowed period: instructor-approved lab window
Stop condition: traffic leaves scope, resource exhaustion, or service instability
```

The purpose of this boundary is both ethical and technical. A tool such as Nmap cannot determine whether you are authorised. The operator is responsible for scope.

# 2. What You Are Building

## 2.1 Reference topology

```text
                         Internet / NAT
                               |
                        pfSense WAN (DHCP)
                               |
                 +-------------+-------------+
                 |                           |
          USERS interface              SERVERS interface
           10.10.10.1/24                 10.10.20.1/24
                 |                           |
          Kali Linux                    Ubuntu Server
          10.10.10.10                   10.10.20.20
      finance workstation        payment operations application
```

## 2.2 Reference traffic policy

| Source | Destination | Service | Action | Business reason |
|---|---|---:|---|---|
| Kali `10.10.10.10` | Ubuntu `10.10.20.20` | TCP 22 | Allow and log | Authorised administration |
| USERS network | Ubuntu `10.10.20.20` | TCP 8443 | Allow and log | Payment operations portal |
| USERS network | SERVERS network | Any other | Block and log | Prevent lateral movement |
| USERS network | Internet | Required web/DNS traffic | Allow | Updates and approved external access |
| SERVERS network | USERS network | Any new connection | Block and log | Server must not initiate workstation access |
| Ubuntu | Approved external services | DNS, NTP, HTTP/HTTPS | Allow and log as required | Updates and time synchronisation |

## 2.3 Why the design matters

Routing and security are different functions. Routing answers, “Where should this packet go?” Firewall policy answers, “Should this packet be allowed to go there?” pfSense can know routes to both networks while still denying communication between them.

Rules are evaluated on the interface where traffic enters pfSense. A Kali-to-Ubuntu packet enters through USERS, so the controlling rule belongs on USERS. A server-initiated packet toward Kali enters through SERVERS, so it is evaluated against SERVERS rules.

pfSense is stateful. When the first packet of an approved session matches an allow rule, pfSense creates state. Return traffic is allowed by that state and does not require a broad reverse-direction rule.

# 3. Phase Zero — Prepare the Lab

## 3.1 Minimum recommended resources

| VM | vCPU | Memory | Disk |
|---|---:|---:|---:|
| pfSense | 2 | 2 GB | 20 GB |
| Kali Linux | 2 | 4 GB | 40 GB |
| Ubuntu Server | 2 | 2–4 GB | 30 GB |

These are lab recommendations, not production sizing. Suricata inspection, rule loading, logging, and packet capture consume memory and CPU. Under-resourcing can look like a network fault when it is actually resource exhaustion.

## 3.2 Create isolated virtual networks

Create three distinct virtual networks in VirtualBox, VMware, Hyper-V, or another free hypervisor:

- `NOVAPAY-WAN`: NAT or NAT Network
- `NOVAPAY-USERS`: internal/host-only network
- `NOVAPAY-SERVERS`: internal/host-only network

Do not attach USERS and SERVERS to the same virtual switch. Different IP subnets on one shared Layer 2 segment do not provide the same assurance as distinct segments. A host with an extra address could bypass intended routing controls.

## 3.3 Attach interfaces

Reference adapter assignment:

| VM | Adapter | Virtual network |
|---|---|---|
| pfSense | Adapter 1 | `NOVAPAY-WAN` |
| pfSense | Adapter 2 | `NOVAPAY-USERS` |
| pfSense | Adapter 3 | `NOVAPAY-SERVERS` |
| Kali | Adapter 1 | `NOVAPAY-USERS` |
| Ubuntu | Adapter 1 | `NOVAPAY-SERVERS` |

Record each virtual adapter MAC address. pfSense often displays interfaces by driver name such as `em0`, `em1`, `vtnet0`, or `hn0`. MAC addresses provide a reliable mapping when names differ.

## 3.4 Take snapshots

Create snapshots at these points:

1. operating systems installed;
2. network addressing verified;
3. firewall policy validated;
4. Suricata IDS validated;
5. IPS validated.

Snapshots support fast lab recovery. They do not replace configuration backup because a snapshot is tied to the hypervisor and captures more state than a controlled configuration record.

# 4. Phase One — Install and Assign pfSense

## 4.1 Install pfSense

Boot the pfSense Community Edition installer and complete a normal installation to the virtual disk. Remove or detach the installation ISO before rebooting.

During initial console configuration:

1. identify the WAN adapter connected to `NOVAPAY-WAN`;
2. identify the USERS adapter connected to `NOVAPAY-USERS`;
3. identify the SERVERS adapter connected to `NOVAPAY-SERVERS`;
4. assign WAN, LAN, and OPT1;
5. rename LAN to `USERS` and OPT1 to `SERVERS` in the web interface.

Reference addresses:

| Interface | Addressing |
|---|---|
| WAN | DHCP from the hypervisor NAT network |
| USERS | `10.10.10.1/24` |
| SERVERS | `10.10.20.1/24` |

Do not configure an upstream gateway on USERS or SERVERS. A gateway is the next router used to reach a non-local destination. These interfaces are directly connected networks, and pfSense itself is their router.

## 4.2 Verify interface identity

From the pfSense console, use the interface assignment and address display to compare:

- driver/interface name;
- MAC address;
- assigned role;
- IP address;
- link status.

If USERS and SERVERS are reversed, correct the assignment before writing rules. A perfectly written rule on the wrong interface enforces the wrong security boundary.

## 4.3 Initial web administration

From Kali, browse to:

```text
https://10.10.10.1
```

Complete the setup wizard:

- assign a unique hostname such as `fw01`;
- use a lab domain such as `novapay.lab`;
- select appropriate DNS and timezone;
- change the default administrator password;
- confirm the WAN configuration;
- retain HTTPS for administration.

Why:

- correct time is essential for log correlation;
- a unique hostname identifies the evidence source;
- HTTPS protects administrative credentials in transit;
- removing default credentials closes a predictable access path.

Do not expose the web interface on WAN. Restrict administration to the trusted lab management source where possible.

pfSense may create an anti-lockout rule on its LAN interface so an administrator does not accidentally lose GUI access. Once a tested explicit management rule exists, review whether anti-lockout still grants broader access than intended. Do not disable it until console access and rollback are confirmed.

## 4.4 Verify outbound NAT

pfSense normally uses automatic outbound NAT. Confirm under:

```text
Firewall > NAT > Outbound
```

Automatic mode should translate private source addresses to the WAN address for approved outbound traffic.

NAT is not the security boundary. It changes addresses. Firewall rules decide whether a flow is permitted.

# 5. Phase Two — Configure Ubuntu Server

## 5.1 Discover the interface name

On Ubuntu:

```bash
ip -br link
ip -br address
```

`ip -br link` shows compact interface and link-state information. `ip -br address` shows assigned addresses. The interface may be named `ens18`, `ens33`, `enp0s3`, or something else. Use the actual name in the configuration.

## 5.2 Preserve the current network configuration

```bash
sudo cp -a /etc/netplan /etc/netplan.before-novapay
```

`sudo` runs the command with administrative privilege. `cp -a` preserves file attributes while copying the directory. The backup provides a local rollback if the YAML configuration is invalid.

## 5.3 Configure a static address

Inspect existing Netplan files:

```bash
ls -la /etc/netplan
sudo sed -n '1,220p' /etc/netplan/*.yaml
```

Edit the existing active YAML file. On many Ubuntu Server installations it is named `50-cloud-init.yaml`:

```bash
sudo nano /etc/netplan/50-cloud-init.yaml
```

If the discovered filename is different, edit that file instead. Do not leave two files that configure the same interface with conflicting addresses or gateways; Netplan reads and combines all YAML files in the directory.

Reference configuration, replacing `ens33` with the discovered interface:

```yaml
network:
  version: 2
  ethernets:
    ens33:
      dhcp4: false
      addresses:
        - 10.10.20.20/24
      routes:
        - to: default
          via: 10.10.20.1
      nameservers:
        addresses:
          - 10.10.20.1
          - 1.1.1.1
```

Meaning:

- `dhcp4: false` prevents an unpredictable DHCP address;
- `10.10.20.20/24` places the server in the SERVERS subnet;
- the default route sends non-local traffic to pfSense;
- DNS uses pfSense first, with a public resolver as a lab fallback.

YAML uses spaces, not tabs. Indentation expresses structure.

Validate before committing:

```bash
sudo netplan generate
sudo netplan try
```

`netplan generate` checks syntax and creates renderer configuration. `netplan try` applies the configuration temporarily and rolls back if it is not confirmed. This reduces the chance of permanently losing remote access.

After confirmation:

```bash
sudo netplan apply
```

## 5.4 Verify Ubuntu networking

```bash
ip -br address
ip route
resolvectl status
ping -c 4 10.10.20.1
```

Interpretation:

- `ip -br address` should show `10.10.20.20/24`;
- `ip route` should show the connected subnet and default route through `10.10.20.1`;
- `resolvectl status` shows active DNS configuration;
- gateway replies prove local Layer 2 and Layer 3 reachability, not internet access or firewall correctness.

# 6. Phase Three — Configure Kali

## 6.1 Discover the connection

```bash
ip -br link
nmcli device status
nmcli connection show
```

`nmcli` controls NetworkManager. A device is the network interface; a connection is the saved profile applied to it.

Install the required free validation tools:

```bash
sudo apt update
sudo apt install nmap netcat-openbsd curl openssh-client tcpdump wireshark
```

Package purpose:

- `nmap`: controlled network and service validation;
- `netcat-openbsd`: simple TCP connection checks;
- `curl`: application and TLS validation;
- `openssh-client`: administrative connectivity;
- `tcpdump`: command-line packet capture;
- `wireshark`: detailed visual packet analysis.

During Wireshark installation, Kali may ask whether non-root users may capture packets. Follow the lab’s privilege policy. Packet capture provides visibility into other traffic and should not be granted casually on shared systems.

## 6.2 Configure the static address

Replace `Wired connection 1` if your profile has another name:

```bash
sudo nmcli connection modify "Wired connection 1" \
  ipv4.method manual \
  ipv4.addresses 10.10.10.10/24 \
  ipv4.gateway 10.10.10.1 \
  ipv4.dns "10.10.10.1 1.1.1.1"
```

Activate the profile:

```bash
sudo nmcli connection down "Wired connection 1"
sudo nmcli connection up "Wired connection 1"
```

Why the connection is briefly taken down: NetworkManager stores the new configuration in the profile, but the active interface may continue using old values until the profile is reactivated.

## 6.3 Verify Kali networking

```bash
ip -br address
ip route
cat /etc/resolv.conf
ping -c 4 10.10.10.1
```

Expected:

- address `10.10.10.10/24`;
- default route through `10.10.10.1`;
- working local gateway reachability.

# 7. Phase Four — Build the Simulated Payment Service

## 7.1 Update Ubuntu safely

```bash
sudo apt update
sudo apt upgrade
```

`apt update` refreshes package metadata. It does not update installed packages. `apt upgrade` installs available compatible upgrades. Separate metadata refresh from package installation so failures are easier to diagnose.

## 7.2 Install required services

```bash
sudo apt install openssh-server nginx openssl ufw curl
```

Purpose:

- OpenSSH provides controlled administration;
- Nginx represents the internal payment operations web application;
- OpenSSL creates a lab TLS certificate;
- UFW provides host-level defence in depth;
- curl validates HTTP/TLS behaviour.

Check service state:

```bash
sudo systemctl status ssh --no-pager
sudo systemctl status nginx --no-pager
sudo ss -lntup
```

`systemctl status` reports whether the service is active and recent errors. `ss -lntup` lists listening TCP/UDP sockets and owning processes. Listening on `0.0.0.0` means all IPv4 interfaces; it does not mean a firewall permits remote access.

## 7.3 Create non-sensitive simulated content

Create the document root:

```bash
sudo install -d -o root -g www-data -m 0750 /var/www/novapay
```

`install -d` creates the directory while explicitly setting owner, group, and permissions. This is more deliberate than creating a directory and forgetting to restrict it.

Create `/var/www/novapay/index.html`:

```html
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>NovaPay Operations</title></head>
<body>
  <h1>NovaPay Payment Operations Lab</h1>
  <p>Environment: authorised training simulation</p>
  <p>Transaction reference: LAB-TXN-0001</p>
  <p>Status: REVIEW</p>
</body>
</html>
```

Do not use real customer names, account details, card numbers, credentials, or production records.

Apply safe file ownership:

```bash
sudo chown root:www-data /var/www/novapay/index.html
sudo chmod 0640 /var/www/novapay/index.html
```

Root controls modification; the Nginx group can read the content.

## 7.4 Create a lab TLS certificate

```bash
sudo install -d -m 0750 /etc/nginx/tls
sudo openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout /etc/nginx/tls/novapay.key \
  -out /etc/nginx/tls/novapay.crt \
  -days 365 \
  -subj "/C=NG/O=NovaPay Lab/OU=Security/CN=payments.novapay.lab"
sudo chmod 0600 /etc/nginx/tls/novapay.key
```

Explanation:

- `req -x509` creates a self-signed certificate;
- `-nodes` leaves the private key without a passphrase so Nginx can start unattended;
- `-newkey rsa:2048` creates a new 2048-bit RSA key;
- `-days 365` sets lab validity;
- the subject identifies the simulated service;
- mode `0600` restricts the private key to its owner.

A self-signed certificate is appropriate for an isolated lab, not a public production service. Production should use trusted certificate management and formal key lifecycle controls.

## 7.5 Configure Nginx on TCP 8443

Create `/etc/nginx/sites-available/novapay`:

```nginx
server {
    listen 8443 ssl;
    server_name payments.novapay.lab;

    ssl_certificate     /etc/nginx/tls/novapay.crt;
    ssl_certificate_key /etc/nginx/tls/novapay.key;
    ssl_protocols       TLSv1.2 TLSv1.3;

    root /var/www/novapay;
    index index.html;

    access_log /var/log/nginx/novapay_access.log;
    error_log  /var/log/nginx/novapay_error.log warn;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable the site and disable the default:

```bash
sudo ln -s /etc/nginx/sites-available/novapay /etc/nginx/sites-enabled/novapay
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` validates syntax and referenced files before a reload. `reload` asks the running service to adopt the new configuration without a full stop/start.

Validate locally:

```bash
curl -kI https://127.0.0.1:8443/
sudo ss -lntp | grep -E ':(22|8443)\b'
```

`-I` requests response headers. `-k` accepts the self-signed lab certificate. A production client should validate certificate trust rather than use `-k`.

## 7.6 Apply Ubuntu host firewall policy

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.10.10 to 10.10.20.20 port 22 proto tcp comment 'Authorised admin'
sudo ufw allow from 10.10.10.0/24 to 10.10.20.20 port 8443 proto tcp comment 'Payment operations portal'
sudo ufw logging medium
sudo ufw enable
sudo ufw status numbered
```

Why:

- default-deny limits forgotten services;
- SSH is restricted to the authorised administrator;
- the application is accessible to the finance subnet;
- host logging provides evidence independent of pfSense.

Network and host firewalls are complementary. If either layer is misconfigured, the other may still reduce exposure.

# 8. Phase Five — Build pfSense Policy

## 8.1 Create aliases

Under `Firewall > Aliases`, create:

| Alias | Type | Value |
|---|---|---|
| `ADMIN_KALI` | Host | `10.10.10.10` |
| `PAYMENT_SERVER` | Host | `10.10.20.20` |
| `PAYMENT_APP_PORT` | Port | `8443` |
| `ADMIN_SSH_PORT` | Port | `22` |

Aliases turn raw values into policy objects. A rule using `PAYMENT_SERVER` explains intent and is easier to update and audit than a rule containing an unexplained address.

## 8.2 USERS rules

Create rules on `Firewall > Rules > USERS` in this order:

1. **Allow and log** `ADMIN_KALI` to `PAYMENT_SERVER`, TCP destination `ADMIN_SSH_PORT`.
2. **Allow and log** `USERS net` to `PAYMENT_SERVER`, TCP destination `PAYMENT_APP_PORT`.
3. **Block and log** `USERS net` to `SERVERS net`, any protocol.
4. **Allow** `USERS net` to required external destinations and services.

For a simple isolated lab, the final outbound rule may temporarily allow USERS to `any`, but document that it is a lab convenience and not a production egress policy. A mature design limits DNS to approved resolvers and web traffic through approved controls.

Rule order matters because pfSense uses first match on interface rules. The specific allows must appear before the general USERS-to-SERVERS block.

## 8.3 SERVERS rules

Create rules on `Firewall > Rules > SERVERS`:

1. allow Ubuntu to pfSense for required DNS if pfSense is the resolver;
2. allow Ubuntu to approved NTP;
3. allow Ubuntu outbound HTTP/HTTPS for controlled updates;
4. block and log `SERVERS net` to `USERS net`;
5. block other unapproved traffic.

Do not add a reverse allow for established Kali-to-Ubuntu sessions. pfSense state already permits the response. A reverse allow would permit new server-initiated connections, changing the risk.

## 8.4 Apply and inspect

After applying changes:

```text
Status > System Logs > Firewall
Diagnostics > States
```

Filter by `10.10.10.10` or `10.10.20.20`. Verify the rule description, action, interface, protocol, ports, and timestamp.

## 8.5 Understand state after rule changes

1. Establish an authorised SSH or HTTPS session.
2. Modify or disable the related allow rule.
3. Observe the existing session.
4. Attempt a new session.
5. Inspect `Diagnostics > States`.

An existing session may continue because its state was created under the earlier policy. A new session is evaluated against the new rulebase.

Clear only the specific lab state when testing policy changes. Clearing all states can interrupt unrelated users and is a production change with business impact.

# 9. Phase Six — Validate Segmentation

Create an evidence timestamp on each Linux system:

```bash
date --iso-8601=seconds
hostname
ip -br address
ip route
```

These commands identify when, where, and under which network state a test occurred.

## 9.1 Approved payment application

From Kali:

```bash
curl -vkI https://10.10.20.20:8443/
```

Expected:

- TCP connection succeeds;
- TLS handshake completes;
- Nginx returns an HTTP response;
- pfSense records the approved flow if rule logging is enabled;
- Ubuntu Nginx access logging records the request.

`-v` shows connection and TLS detail. `-k` is used only because the isolated lab uses a self-signed certificate.

## 9.2 Approved administration

From Kali:

```bash
ssh -v <ubuntu-user>@10.10.20.20
```

The first host-key prompt establishes server identity for future comparisons. `-v` displays the connection stages and helps distinguish network, key-exchange, and authentication failures.

Use the actual Ubuntu account in place of `<ubuntu-user>`. Prefer SSH keys over passwords for a production design.

## 9.3 Unapproved service tests

From Kali:

```bash
nc -zvw3 10.10.20.20 80
nc -zvw3 10.10.20.20 443
nc -zvw3 10.10.20.20 3306
```

Options:

- `-z` checks a TCP port without sending application data;
- `-v` provides detail;
- `-w3` limits waiting to three seconds.

Expected: the general USERS-to-SERVERS deny policy blocks these ports. A timeout commonly indicates silent filtering. “Connection refused” means the packet reached the host but no process accepted the port; that is not proof of firewall enforcement.

## 9.4 Controlled service discovery

Run only against the authorised target:

```bash
sudo nmap -sS -Pn -p 22,80,443,8443,3306 10.10.20.20
```

Meaning:

- `-sS` uses TCP SYN discovery;
- `-Pn` skips host discovery, useful when ICMP is blocked;
- `-p` restricts the test to explicitly selected ports.

Expected:

- 22 and 8443 are reachable according to policy;
- unapproved ports are filtered;
- firewall and Suricata evidence can be correlated after IDS is enabled.

Do not substitute a public address.

# 10. Phase Seven — Capture and Interpret Packets

## 10.1 Capture on Ubuntu

```bash
sudo tcpdump -ni any 'host 10.10.10.10 and (tcp port 22 or tcp port 8443)'
```

Explanation:

- `-n` prevents DNS lookups from obscuring addresses or generating extra traffic;
- `-i any` observes all Ubuntu interfaces;
- the filter limits evidence to the authorised source and services.

For file evidence:

```bash
sudo tcpdump -ni any -w /tmp/novapay-authorised-flow.pcap \
  'host 10.10.10.10 and (tcp port 22 or tcp port 8443)'
```

Stop with `Ctrl+C`, then hash the capture:

```bash
sha256sum /tmp/novapay-authorised-flow.pcap
```

The hash provides an integrity reference. It does not by itself prove who captured the file or guarantee a complete chain of custody.

## 10.2 Capture on pfSense

Use:

```text
Diagnostics > Packet Capture
```

Choose the interface based on the question:

- USERS: what arrived from Kali;
- SERVERS: what pfSense forwarded toward Ubuntu;
- WAN: what exited toward external networks.

If a denied packet appears on USERS but not SERVERS, pfSense likely stopped it between ingress and egress. Interface comparison is stronger evidence than a client timeout alone.

# 11. Phase Eight — Install Suricata

## 11.1 Prepare pfSense

Back up pfSense before package installation:

```text
Diagnostics > Backup & Restore
```

Store the configuration securely. It can contain sensitive values.

For a virtualised lab, review:

```text
System > Advanced > Networking
```

Disable hardware checksum offloading, TCP segmentation offloading, and large receive offloading if required by the selected Suricata capture/inline mode. Virtual offloading can cause packet metadata to look incomplete or prevent inline inspection from behaving predictably.

This setting trades some performance for reliable software inspection in the lab. Production decisions require platform-specific testing.

## 11.2 Install the package

Navigate to:

```text
System > Package Manager > Available Packages
```

Install `suricata`.

Then open:

```text
Services > Suricata
```

Package names and labels can vary slightly by pfSense release. Confirm the installed package version in the evidence record.

## 11.3 Configure rule sources

Enable the Emerging Threats Open rules or another approved free rule source. Update and verify that the rules download successfully.

Record:

- source name;
- licence;
- update time;
- number of loaded rules;
- failed downloads;
- categories enabled.

Start with a focused ruleset relevant to:

- scanning and reconnaissance;
- attempted administrator access;
- policy violations;
- common server threats;
- malware command-and-control indicators.

Enabling every available rule is not automatically stronger security. More rules increase memory, CPU use, false positives, and analyst workload.

## 11.4 Add the USERS inspection interface

Add Suricata to USERS first.

Reason: suspicious traffic originates from the finance workstation and enters pfSense on USERS. Inspecting at the source-zone boundary provides clear attribution and sees attempts even if the firewall later denies them.

Set HOME_NET to include:

```text
10.10.10.0/24,10.10.20.0/24
```

HOME_NET tells rules what the organisation considers internal. An incorrect value changes which signatures match and can create both missed detections and noise.

Enable:

- interface operation;
- alert logging;
- packet capture logging only when needed and storage permits;
- automatic rule updates on a controlled schedule.

Begin in IDS/alert-only mode.

## 11.5 Confirm sensor health

Verify:

- the interface shows running;
- rules loaded without fatal errors;
- the correct interface is selected;
- alerts and logs are receiving current timestamps;
- disk usage is controlled.

Sensor process status alone does not prove useful inspection. Detection validation is required.

# 12. Phase Nine — Validate IDS Detection

## 12.1 Establish a normal baseline

From Kali:

```bash
curl -skI https://10.10.20.20:8443/
ssh <ubuntu-user>@10.10.20.20
```

Record normal alert volume and application behaviour. Without baseline context, analysts can mistake ordinary finance operations for malicious activity.

## 12.2 Generate controlled reconnaissance

From Kali:

```bash
sudo nmap -sS -Pn -p 1-1000 10.10.20.20
```

This restricted scan tests the authorised lab server only. It sends SYN probes to the first 1,000 TCP ports. Suricata may generate scan-related alerts depending on enabled rules and thresholds.

Record exact start and end time:

```bash
date --iso-8601=seconds
```

## 12.3 Add a deterministic local alert rule

If community rules do not reliably alert in the small lab, add a local Suricata rule:

```text
alert tcp 10.10.10.10 any -> 10.10.20.20 any (msg:"NOVAPAY LAB repeated connection attempts from finance workstation"; flags:S; threshold: type both, track by_src, count 8, seconds 30; classtype:network-scan; sid:1000001; rev:1;)
```

Rule anatomy:

- `alert tcp`: inspect TCP and create an alert;
- source and destination restrict the rule to the lab pair;
- `flags:S` matches initial SYN packets;
- the threshold requires eight matches in 30 seconds;
- `track by_src` groups activity by source;
- `sid:1000001` is a locally managed unique signature ID;
- `rev:1` is the first rule revision.

Validate the Suricata configuration before restarting the interface. A syntax error can prevent the sensor from starting.

Generate the condition:

```bash
for port in 21 22 23 25 53 80 110 139 443 445 8443 9001; do
  nc -zvw1 10.10.20.20 "$port"
done
```

The loop makes bounded connection checks only against the authorised server.

## 12.4 Triage the alert

For the selected alert, answer:

1. Which host generated the traffic?
2. Which destinations and ports were involved?
3. Was the source authorised for this activity?
4. Did pfSense permit or deny the attempts?
5. Did Ubuntu receive any of them?
6. Did authentication or application logs show successful access?
7. Does the timing align with the suspected phishing event?
8. Is the event a true positive, benign positive, false positive, or inconclusive?

Correlate:

- Suricata alert;
- pfSense firewall log;
- Ubuntu authentication log;
- Nginx access log;
- packet capture;
- change/test log.

An IDS alert proves that traffic matched a rule. It does not prove compromise, intent, or business impact.

# 13. Phase Ten — Tune Detection

## 13.1 Identify noise

Suppose normal reconciliation generates repeated connections to 8443 and triggers the local rule. Do not disable all scan detection.

Collect:

- alert count per minute;
- source and destination;
- service;
- scheduled job window;
- whether other ports were contacted;
- analyst time consumed.

## 13.2 Narrow the rule

A revised rule can exclude the expected application port:

```text
alert tcp 10.10.10.10 any -> 10.10.20.20 !8443 (msg:"NOVAPAY LAB repeated connections outside approved payment service"; flags:S; threshold: type both, track by_src, count 8, seconds 30; classtype:network-scan; sid:1000001; rev:2;)
```

The destination-port negation `!8443` reduces noise from the approved application while retaining visibility into repeated attempts against other ports.

Risk: malicious repetition against 8443 would no longer match this specific rule. Other web-attack, TLS, authentication, and rate-based controls must cover that path.

Regression test both:

- normal repeated 8443 access should not trigger this rule;
- repeated access across unapproved ports should still trigger.

# 14. Phase Eleven — Move Safely to IPS

## 14.1 Readiness checklist

Before enabling blocking, confirm:

- configuration backup exists;
- console access is available;
- IDS alerts have been reviewed;
- normal payment traffic is baselined;
- rollback owner and criteria are defined;
- rule action and scope are narrow;
- testing window is approved.

## 14.2 Enable inline/blocking mode

In the Suricata USERS interface settings, select the supported inline IPS or blocking mode for the platform. pfSense/Suricata versions may label this as inline IPS using netmap or as a legacy blocking mode.

Prefer true inline mode where supported because Suricata can decide on the packet before it is forwarded. Legacy blocking may react after seeing traffic and can allow initial packets before a firewall table is updated.

## 14.3 Create a dedicated IPS test flow

Do not attempt to prove IPS by testing a port the firewall already blocks. A failed connection would be ambiguous.

On Ubuntu, start a temporary lab-only web service in a dedicated terminal:

```bash
sudo ufw allow from 10.10.10.10 to 10.10.20.20 port 9001 proto tcp comment 'Temporary IPS validation'
python3 -m http.server 9001 --bind 10.10.20.20 --directory /var/www/novapay
```

The Python service stays in the foreground so the operator can see requests and stop it with `Ctrl+C`. It is bound only to the server’s lab address.

Create a temporary pfSense USERS allow rule above the general inter-zone block:

| Source | Destination | Protocol/port | Purpose |
|---|---|---|---|
| `ADMIN_KALI` | `PAYMENT_SERVER` | TCP 9001 | Temporary IPS validation |

Log the rule and assign an automatic expiry or removal time in the change record.

While Suricata remains in IDS mode, prove the control flow is reachable:

```bash
curl -v http://10.10.20.20:9001/
```

Expected: the connection succeeds. Save pfSense, Ubuntu, and packet evidence. This is the “before” result.

## 14.4 Add a controlled drop rule

Use a narrowly scoped rule that affects only the temporary validation service:

```text
drop tcp 10.10.10.10 any -> 10.10.20.20 9001 (msg:"NOVAPAY LAB IPS blocks dedicated validation service"; flags:S; classtype:policy-violation; sid:1000002; rev:1;)
```

This rule cannot block SSH or the payment application because the header matches only destination TCP 9001.

Do not add a threshold to delay the drop. In Suricata IPS mode, `drop` is applied to every matching packet even when an alert threshold controls how often alerts are emitted. Thresholding is alert-rate control, not a safe way to postpone enforcement.

Validate the Suricata configuration and activate inline/blocking mode during the approved window.

## 14.5 Prove prevention

Keep both the pfSense temporary allow and Ubuntu UFW allow unchanged during the before/after comparison.

From Kali:

```bash
curl -v --connect-timeout 5 http://10.10.20.20:9001/
```

Expected after inline IPS activation:

- the client cannot complete the connection;
- Suricata records SID `1000002` with a drop/block action;
- the pfSense allow rule remains present;
- packets observed before the Suricata decision do not become a successful HTTP request on Ubuntu;
- SSH 22 and HTTPS 8443 continue to work.

Retest legitimate services:

```bash
nc -zvw3 10.10.20.20 22
curl -skI https://10.10.20.20:8443/
```

A timeout alone is not proof. The conclusion requires the unchanged allow rules, Suricata drop evidence, matching timestamps, and absence of a completed request on the temporary server.

## 14.6 Remove temporary exposure

After collecting evidence:

1. stop the Python service with `Ctrl+C`;
2. remove the temporary TCP 9001 pfSense rule;
3. remove the numbered UFW rule;
4. verify TCP 9001 is no longer listening or permitted;
5. retain or disable SID `1000002` according to the approved final design.

Display numbered UFW rules:

```bash
sudo ufw status numbered
```

Delete only the entry whose description and port identify the temporary validation rule:

```bash
sudo ufw delete <rule-number>
```

Replace `<rule-number>` with the displayed number. Recheck the list because UFW renumbers rules after deletion.

## 14.7 Roll back if service is affected

If authorised HTTPS or SSH becomes unreliable:

1. record the symptoms and time;
2. preserve alerts and counters;
3. disable only the new drop rule or return to alert-only mode;
4. confirm service restoration;
5. determine whether the rule, threshold, inspection mode, or resource exhaustion caused the issue;
6. refine and retest.

Rollback is a controlled risk response, not an admission of failure.

# 15. Phase Twelve — Simulate and Investigate the Incident

## 15.1 Incident statement

At a documented time, an authorised instructor or student generates repeated connections from Kali toward Ubuntu. The scenario represents a finance workstation recently associated with suspected phishing.

Do not place real malware on the system. The learning objective is network detection, correlation, containment reasoning, and evidence handling.

## 15.2 Preserve volatile evidence

On Kali:

```bash
date --iso-8601=seconds
hostname
ip -br address
ip route
ss -tpna
ps aux --sort=-%cpu | head -n 20
```

On Ubuntu:

```bash
date --iso-8601=seconds
hostname
ip -br address
sudo ss -lntup
sudo journalctl -u ssh --since "-30 minutes" --no-pager
sudo tail -n 100 /var/log/nginx/novapay_access.log
sudo ufw status verbose
```

Why:

- time and hostname anchor the evidence;
- addressing and routes show network context;
- sockets show current or recent connections;
- processes provide endpoint context;
- SSH and Nginx logs show whether access reached an application;
- UFW state confirms the host control.

Exact authentication log location varies by Ubuntu release. `journalctl` is preferred when systemd owns the service log.

## 15.3 Build a timeline

Use a table:

| Time and timezone | Source | Event | Evidence | Confidence |
|---|---|---|---|---|
| 10:00:00 WAT | Test log | Validation began | Change record | High |
| 10:01:12 WAT | Suricata | Repeated SYN alert | SID 1000001 | High |
| 10:01:12 WAT | pfSense | Selected flow denied | Firewall log | High |
| 10:01:13 WAT | Ubuntu | No matching application request | Nginx log review | Medium |

Absence of a log is not automatically proof that an event did not occur. Logging may be disabled, clocks may differ, retention may be incomplete, or the traffic may not have reached that layer.

## 15.4 Assess impact

Separate conclusions:

- **Observed:** connection attempts occurred.
- **Corroborated:** firewall and Suricata records share source, destination, and time.
- **Not proven:** credentials were stolen.
- **Not proven:** transaction data was changed.
- **Potential impact:** lateral movement, service discovery, account misuse, or preparation for fraud.

Network evidence can demonstrate connections and traffic characteristics. It usually cannot prove that an application record was fraudulently changed without application, database, identity, and change-audit evidence.

## 15.5 Recommend containment

A proportionate response may include:

- isolate the suspected workstation;
- preserve endpoint and network evidence;
- revoke or reset exposed credentials through approved identity processes;
- review administrative sessions;
- temporarily restrict access using a documented rule;
- notify Fraud Operations if transaction/customer impact indicators exist;
- maintain approved payment service availability;
- increase monitoring for related sources or accounts.

Do not delete logs, wipe the workstation, or indiscriminately block the entire payment platform before preserving evidence and considering business impact.

# 16. Phase Thirteen — Backup and Recovery

## 16.1 Export pfSense configuration

Use:

```text
Diagnostics > Backup & Restore
```

Export the full configuration after:

- firewall validation;
- IDS validation;
- IPS validation.

Use distinct filenames and record:

- pfSense version;
- Suricata package version;
- export time and timezone;
- configuration stage;
- storage location;
- file hash.

On a trusted workstation:

```bash
sha256sum <backup-file.xml>
```

The XML may contain hashed passwords, certificates, keys, or shared secrets. Do not commit it to GitHub.

## 16.2 Recovery test

In an instructor-approved snapshot or duplicate VM:

1. confirm console access;
2. restore the selected configuration;
3. allow the system to reload;
4. confirm interface assignments;
5. confirm firewall aliases and rules;
6. confirm Suricata package/interface configuration;
7. update rules if necessary;
8. rerun critical acceptance tests;
9. document differences or missing package data.

A backup is only a hypothesis until recovery is tested.

# 17. Troubleshooting by Layer

Do not change random settings. Start with the lowest plausible layer and gather evidence.

| Symptom | Questions | Useful evidence |
|---|---|---|
| No gateway reachability | Is the interface up? Correct virtual switch? Correct subnet? | `ip -br link`, `ip -br address`, hypervisor adapter mapping |
| Gateway works, remote subnet fails | Is the default route correct? Is pfSense receiving traffic? | `ip route`, pfSense packet capture |
| Port times out | Did pfSense block it? Did Ubuntu receive it? | firewall log, captures on USERS/SERVERS, UFW log |
| Connection refused | Is a service listening on the correct address/port? | `ss -lntup`, service status |
| SSH reaches server but login fails | Is this authentication rather than networking? | SSH verbose output, SSH journal |
| HTTPS certificate warning | Is the self-signed certificate expected? Does name match? | `openssl s_client`, curl verbose output |
| Rule change seems ineffective | Is an old state still active? Is rule order correct? | pfSense state table and rule counters |
| Suricata has no alerts | Is interface correct? Rules loaded? HOME_NET correct? | Suricata status, update log, interface counters |
| IPS does not block | Is true inline mode active? Is action `drop`? Did traffic match? | Suricata mode, rule SID, drop counters |
| IPS breaks approved service | Is rule scope too broad? Resource issue? Offloading issue? | alerts, CPU/memory, interface errors, rollback comparison |

## 17.1 Layered diagnostic sequence

On an endpoint:

```bash
ip -br link
ip -br address
ip route
ping -c 2 <local-gateway>
nc -zvw3 <target> <port>
```

Then inspect:

1. pfSense ingress capture;
2. pfSense firewall log and rule counter;
3. pfSense egress capture;
4. Ubuntu UFW log;
5. listening service;
6. application/authentication log;
7. Suricata alert or drop record.

This sequence follows the packet and identifies the layer where expected evidence disappears.

# 18. Expected Acceptance Results

| Test | Expected reference result |
|---|---|
| Kali identity | `10.10.10.10/24`, gateway `10.10.10.1` |
| Ubuntu identity | `10.10.20.20/24`, gateway `10.10.20.1` |
| Bypass test | No direct Layer 2 path between USERS and SERVERS |
| Payment portal | HTTPS 8443 succeeds from authorised USERS policy |
| SSH administration | TCP 22 succeeds only from `ADMIN_KALI` |
| Unapproved ports | Blocked by USERS-to-SERVERS deny policy |
| Stateful response | Return traffic succeeds without a reverse broad allow |
| Rule-change test | Existing and new sessions behave according to state |
| IDS health | Interface running, rules loaded, current events present |
| Reconnaissance detection | SID/community rule alert correlates with test time |
| Tuning regression | Normal 8443 traffic remains quiet; off-policy probing alerts |
| IPS validation | Narrow drop rule produces Suricata prevention evidence |
| Continuity | 8443 and approved SSH still work after IPS activation |
| Incident correlation | Firewall, IDS/IPS, endpoint, and test records align |
| Recovery | Restored system passes critical firewall and sensor tests |

# 19. Instructor Solutions for Scenario Injects

These are expected investigation paths and defensible conclusions. Instructors can vary the exact technical cause.

## Inject A — Approved access fails

### Reference fault

Move the SSH allow rule below the general USERS-to-SERVERS block or leave a stale blocked state after correcting policy.

### Expected response

The student should:

1. confirm Kali identity and route;
2. test TCP 22 and distinguish timeout from authentication failure;
3. verify that Ubuntu is listening on 22;
4. compare captures on USERS and SERVERS;
5. identify the matching firewall rule and current state;
6. correct rule order or remove only the relevant stale state;
7. prove SSH works and unapproved services remain blocked.

Professional conclusion: the payment server was healthy; policy evaluation or retained state prevented the authorised flow. The correction must not introduce broad access.

## Inject B — Unexpected server exposure

### Reference fault

Insert a broad USERS-to-SERVERS allow above the restrictive rules.

### Expected response

The student should inventory reachable services, preserve the rulebase, identify the first-match error, disable the excessive rule through change control, clear only affected test states, and rerun positive and negative tests.

Impact must be described as potential lateral movement and customer/transaction-data exposure. Reachability alone does not prove that data was accessed.

## Inject C — Alert flood

### Reference condition

Generate repeated approved HTTPS connections to 8443 during a simulated reconciliation job.

### Expected response

Correlate the alert with the authorised schedule and application logs. Classify it as a benign positive if the signature correctly describes repeated connections but the activity is approved. Tune narrowly by service, threshold, source, or schedule. Then prove that probing of off-policy ports still alerts.

## Inject D — Suspicious discovery

### Reference condition

Run the bounded multi-port test from Kali shortly after recording a simulated phishing notification.

### Expected response

Correlate Suricata, firewall, packet, and endpoint evidence. Determine which attempts were forwarded, blocked, or accepted. Search authentication and application logs for successful access. Isolate the workstation if the activity is not authorised, preserve endpoint evidence, review exposed credentials, and notify Fraud Operations if transaction indicators exist.

The correct conclusion is normally “suspicious lateral-movement behaviour requiring containment,” not “confirmed fraud,” unless additional evidence proves fraud.

## Inject E — IPS disrupts business

### Reference fault

Change the drop rule so it also covers 8443 or lower the threshold enough to match normal application behaviour.

### Expected response

Preserve drop events, confirm the firewall rule is unchanged, identify the over-broad signature, roll back only the new prevention rule, prove service restoration, refine the rule, and run both threat and continuity regression tests.

Do not disable the entire firewall or all IDS/IPS inspection.

## Inject F — Missing telemetry

### Reference fault

Disable logging on the USERS-to-SERVERS deny rule or stop the Suricata USERS interface.

### Expected response

Verify clock, sensor health, rule logging, retention, and disk status. Use remaining packet, endpoint, application, and change records. Clearly state that absent network telemetry limits certainty. Restore logging, validate it with a controlled event, and recommend monitoring of sensor health and log delivery.

## Inject G — Gateway recovery

### Reference fault

Use a disposable clone or snapshot and restore an earlier pfSense configuration.

### Expected response

Verify the backup hash and version, restore through the approved recovery path, confirm interface mapping, packages, aliases, rule order, Suricata configuration, and time. Rerun critical SSH, HTTPS, denial, IDS, and IPS tests.

If package data or downloaded rules are not contained in the configuration export, document and restore those dependencies separately.

## Inject H — Management challenge

### Expected answer

Unrestricted finance-to-payment access turns one stolen employee credential or compromised workstation into a path toward payment services and sensitive data. Segmentation limits blast radius and creates an enforceable, auditable boundary. IDS provides visibility after traffic is observed; it does not necessarily stop the packet. Carefully governed IPS can stop high-confidence activity but can also interrupt payments, so tuning, testing, rollback, and service monitoring are required.

## Inject I — Suspicious privileged access

### Reference condition

Create several failed SSH authentications followed by a successful authorised lab login outside the stated support window.

### Expected response

Correlate source address, account, authentication result, time, change ticket, and administrator confirmation. Preserve session and authentication records. If unapproved, restrict the account/source, revoke credentials through the identity process, identify commands or changes performed, and assess payment impact.

An unusual time is a risk indicator, not proof of compromise.

## Inject J — Transaction integrity concern

### Reference condition

Change the text in the simulated transaction page through an instructor-approved local server action and provide an expected-value record.

### Expected response

Compare the record with authoritative application/change evidence, file metadata, authentication history, and administrative sessions. Network logs may show who connected but generally cannot prove which authenticated user changed application data or what field changed. The student should request application/database audit evidence and avoid overstating the network evidence.

## Inject K — Third-party dependency outage

### Reference condition

Temporarily use a non-responsive test destination or introduce a controlled DNS/policy failure within the lab.

### Expected response

Test dependency resolution, routing, firewall decision, IPS event, and external reachability separately. Determine where the request stops. Communicate facts, affected functions, workaround, risk, owner, and next update time. Avoid weakening all egress policy to solve one dependency.

# 20. Evidence Package

Recommended files:

```text
solution-evidence/
|-- 01-scope/
|-- 02-topology/
|-- 03-addressing/
|-- 04-firewall/
|-- 05-suricata/
|-- 06-packet-captures/
|-- 07-endpoint-logs/
|-- 08-incident/
|-- 09-recovery/
`-- evidence-register.csv
```

Every evidence record should contain:

- unique evidence ID;
- collector;
- source system;
- collection time and timezone;
- related test;
- description;
- integrity hash where appropriate;
- sensitivity classification;
- storage location.

Never upload:

- pfSense configuration exports;
- TLS private keys;
- passwords or tokens;
- real customer or payment data;
- unredacted secrets.

# 21. Professional Understanding Check

A student has mastered the project when they can explain:

1. why routing between two connected networks does not imply permission;
2. why pfSense policy is normally placed on the ingress interface;
3. why stateful return traffic does not need a reverse allow;
4. why a timeout, refusal, and authentication failure represent different layers;
5. why packet capture on both sides of the firewall is stronger evidence;
6. why IDS alerts do not prove compromise;
7. why HOME_NET and inspection placement affect detection;
8. why inline IPS requires stricter change and rollback discipline;
9. why a narrow custom rule is safer than a broad blocking rule;
10. why payment availability, transaction integrity, and customer confidentiality can conflict;
11. why network evidence alone may not prove transaction manipulation;
12. why a downloaded backup is not the same as a tested recovery capability.

# 22. Authoritative References

Use the documentation matching the installed software release:

- [pfSense firewall fundamentals](https://docs.netgate.com/pfsense/en/latest/firewall/fundamentals.html)
- [pfSense rule methodology](https://docs.netgate.com/pfsense/en/latest/firewall/rule-methodology.html)
- [pfSense firewall-state inspection](https://docs.netgate.com/pfsense/en/latest/monitoring/status/firewall-states-gui.html)
- [pfSense firewall troubleshooting](https://docs.netgate.com/pfsense/en/latest/troubleshooting/firewall.html)
- [pfSense IDS/IPS packages](https://docs.netgate.com/pfsense/en/latest/packages/snort/index.html)
- [Netplan static address configuration](https://netplan.readthedocs.io/en/stable/using-static-ip-addresses/)
- [Suricata rule format and port operators](https://docs.suricata.io/en/latest/rules/intro.html)
- [Suricata threshold semantics](https://docs.suricata.io/en/latest/rules/thresholding.html)

# 23. Cleanup

After assessment:

1. stop active packet captures;
2. remove temporary test rules not approved for the final design;
3. return temporary IPS tests to the intended final policy;
4. confirm legitimate services;
5. archive required evidence securely;
6. remove evidence containing secrets or unnecessary simulated customer data;
7. take the final snapshot;
8. shut down the lab cleanly.

Final Linux checks:

```bash
sudo systemctl --failed
sudo ss -lntup
sudo ufw status verbose
```

Final pfSense checks:

- interface and gateway health;
- unexpected firewall states;
- firewall deny volume;
- Suricata sensor health;
- rule update status;
- disk usage;
- current configuration backup.

The professional objective is not simply to make green indicators appear. It is to know what every control protects, where every packet is evaluated, what each log proves, how a failure changes risk, and how to restore service without silently weakening security.
