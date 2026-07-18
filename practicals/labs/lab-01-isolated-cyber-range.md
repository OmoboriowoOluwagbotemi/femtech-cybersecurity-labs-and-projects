# Lab 01 - Build and Prove an Isolated Cyber Range

## Mission

You are the junior security engineer for FEMTECH Training Services. Before any scanning or attack simulation is allowed, you must build a range containing pfSense, Kali, and Ubuntu and prove that the target cannot reach the physical LAN directly.

**Lessons:** 1, 8, 10
**Time:** 4-6 hours
**Systems:** VirtualBox host, pfSense CE, Kali, Ubuntu Server 24.04 LTS
**Change risk:** Accidental bridging can expose a vulnerable system or send test traffic to an unauthorised network.

## Objectives

- Explain NAT, bridged, host-only, and internal networking.
- Configure pfSense as the only path out of the target network.
- Verify addressing, routes, DNS, and isolation with reproducible evidence.
- Create and test snapshots and a recovery checkpoint.

## Scope and Success Tests

In scope: `pfSense-FEM`, `Kali-FEM`, `Ubuntu-FEM`, `FEM-USERS`, and `FEM-SERVERS`. No other IP is authorised.

Success means:

1. Ubuntu and Kali have only an internal adapter.
2. pfSense routes between authorised lab segments.
3. A target can reach its gateway but cannot appear on the physical LAN.
4. An explicit firewall rule controls cross-segment traffic.
5. A snapshot reversion removes a test change.

## Step 1 - Baseline the Host

In PowerShell:

```powershell
Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer,Model,TotalPhysicalMemory
Get-Volume | Select-Object DriveLetter,FileSystemLabel,SizeRemaining,Size
Get-NetIPConfiguration | Format-List
```

The first two commands prove capacity. The third records physical-network addresses so you can recognise and avoid them during scanning.

Create an evidence folder and transcript using the programme standard. Then locate VirtualBox:

```powershell
$VBox = 'C:\Program Files\Oracle\VirtualBox\VBoxManage.exe'
& $VBox --version
& $VBox list vms
```

## Step 2 - Inspect Before Changing

Power off all three VMs. Never alter adapter attachment while a lab target is running.

```powershell
& $VBox showvminfo 'pfSense-FEM' --machinereadable | Set-Content "$Evidence\pfsense-before.txt"
& $VBox showvminfo 'Kali-FEM' --machinereadable | Set-Content "$Evidence\kali-before.txt"
& $VBox showvminfo 'Ubuntu-FEM' --machinereadable | Set-Content "$Evidence\ubuntu-before.txt"
```

Read the files and identify every `nicN`, `bridgeadapterN`, and `intnetN` field. Stop if a target adapter says `bridged`.

## Step 3 - Attach the Range

```powershell
& $VBox modifyvm 'pfSense-FEM' --nic1 nat --cableconnected1 on
& $VBox modifyvm 'pfSense-FEM' --nic2 intnet --intnet2 'FEM-USERS' --cableconnected2 on
& $VBox modifyvm 'pfSense-FEM' --nic3 intnet --intnet3 'FEM-SERVERS' --cableconnected3 on
& $VBox modifyvm 'Kali-FEM' --nic1 intnet --intnet1 'FEM-USERS' --nic2 none
& $VBox modifyvm 'Ubuntu-FEM' --nic1 intnet --intnet1 'FEM-SERVERS' --nic2 none
```

Why:

- pfSense adapter 1 uses NAT for controlled updates.
- pfSense adapters 2 and 3 form separate trust zones.
- Kali and Ubuntu have no alternate route that bypasses the firewall.
- `--nic2 none` removes a common hidden escape path.

Validate before booting:

```powershell
& $VBox showvminfo 'Kali-FEM' --machinereadable | Select-String 'nic[1-4]|intnet[1-4]|bridgeadapter[1-4]'
& $VBox showvminfo 'Ubuntu-FEM' --machinereadable | Select-String 'nic[1-4]|intnet[1-4]|bridgeadapter[1-4]'
```

Capture the output. The words `bridged` and the name of a physical adapter must not appear.

## Step 4 - Configure pfSense

Boot pfSense and use its console menu.

1. Assign WAN to the first adapter, USERS/LAN to the second, and SERVERS/OPT1 to the third.
2. Set USERS to `10.10.10.1/24` and enable DHCP from `10.10.10.100` to `10.10.10.199`.
3. Set SERVERS to `10.10.20.1/24`; leave DHCP disabled because servers will be static.
4. From Kali, browse to `https://10.10.10.1`, change the default administrator password, set hostname `fw01`, and set domain `femtech.lab`.
5. Export a configuration backup from **Diagnostics > Backup & Restore** before adding rules.

Do not disable the web configurator anti-lockout rule until an alternate management rule has been tested.

## Step 5 - Configure Ubuntu

At the Ubuntu console, identify the interface:

```bash
ip -br link
ip -br address
ip route
```

Find the Netplan file:

```bash
ls -l /etc/netplan
sudo cp /etc/netplan/*.yaml /etc/netplan/before-lab01.yaml.bak
```

Edit the active YAML with `sudo nano /etc/netplan/50-femtech.yaml`:

```yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: false
      addresses:
        - 10.10.20.20/24
      routes:
        - to: default
          via: 10.10.20.1
      nameservers:
        addresses:
          - 10.10.20.1
```

Replace `enp0s3` with the observed name. YAML indentation uses spaces, not tabs.

```bash
sudo netplan generate
sudo netplan try
sudo netplan apply
ip -br address
ip route
```

`generate` catches syntax errors. `try` provides timed rollback. `apply` commits only after the console test succeeds.

## Step 6 - Create Least-Privilege Firewall Policy

In pfSense, add a SERVERS rule:

- Action: Pass
- Protocol: TCP
- Source: `USERS net`
- Destination: `10.10.20.20`
- Destination port: `22 (SSH)`
- Description: `CHG-LAB01 Allow USERS to SSH lin01`
- Logging: enabled

Place the rule above a final logged block rule from USERS to SERVERS. Apply changes.

## Step 7 - Validate Positive, Negative, and Route Behaviour

On Ubuntu:

```bash
sudo apt update
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
sudo ss -lntp | grep ':22'
```

On Kali:

```bash
ip -br address
ip route
ping -c 3 10.10.10.1
nc -vz -w 3 10.10.20.20 22
nc -vz -w 3 10.10.20.20 80
traceroute -n 10.10.20.20
```

Expected: gateway ping succeeds; TCP/22 succeeds; TCP/80 fails; the route crosses pfSense. A closed port and a firewall block are different. Confirm the negative test in pfSense firewall logs.

## Step 8 - Prove No Physical-LAN Attachment

On each guest:

```bash
ip -br address
ip route
ip neigh
```

The guest must show only `10.10.10.0/24` or `10.10.20.0/24` neighbours and the pfSense gateway. On the host, repeat `showvminfo`. This combination proves configuration and observed behaviour; a screenshot of one setting alone does not.

## Step 9 - Snapshot and Recovery Test

Power off Ubuntu cleanly:

```bash
sudo shutdown -h now
```

On the host:

```powershell
& $VBox snapshot 'Ubuntu-FEM' take 'LAB01-Clean-Baseline' --description 'Static IP and SSH validated'
& $VBox snapshot 'Ubuntu-FEM' list --details
```

Boot Ubuntu, create `/tmp/snapshot-proof.txt`, shut down, restore the snapshot, and confirm the file is absent:

```powershell
& $VBox snapshot 'Ubuntu-FEM' restore 'LAB01-Clean-Baseline'
```

## Troubleshooting

- No DHCP on Kali: verify the VM is on `FEM-USERS`, DHCP is enabled on the USERS interface, and pfSense interface link is up.
- Ubuntu cannot reach gateway: check prefix `/24`, gateway `.1`, adapter segment, and pfSense OPT1 enablement.
- SSH port times out: check pfSense rule order and logs. A rejection from `nc` means routing worked but no listener accepted.
- Internet fails through pfSense: confirm pfSense WAN received a NAT address and outbound NAT is automatic. Internet access is not required for the isolation proof.

## Deliverables

- Adapter evidence before and after.
- Addressing and routing table.
- pfSense configuration export.
- Positive SSH and negative port test.
- Firewall log entry tied to the negative test.
- Snapshot list and recovery proof.
- One-page explanation: why the range is isolated, remaining risks, and emergency shutdown steps.

## Reflection

1. Why is NAT not the same as isolation?
2. What evidence would reveal a hidden second adapter?
3. Which failure would you investigate first if DNS failed but IP connectivity worked?
4. What can a snapshot recover, and what can it not recover?
