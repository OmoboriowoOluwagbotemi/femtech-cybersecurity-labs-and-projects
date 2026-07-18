# Lab 08 - Harden and Monitor a Windows Endpoint

## Mission

A finance workstation has joined the domain but lacks a verified security baseline. Apply built-in Windows controls, enable useful audit telemetry, generate safe test events, and prove that protections and business functions still work.

**Lessons:** 17, 21, 30-32
**Time:** 5 hours
**System:** Windows 11 Enterprise Evaluation `win11-01`

## Step 1 - Baseline Security State

Run elevated PowerShell and start a transcript:

```powershell
Get-ComputerInfo | Select-Object WindowsProductName,WindowsVersion,OsBuildNumber,CsName
Get-MpComputerStatus | Format-List AMServiceEnabled,AntivirusEnabled,RealTimeProtectionEnabled,AntivirusSignatureVersion,QuickScanAge
Get-NetFirewallProfile | Format-Table Name,Enabled,DefaultInboundAction,DefaultOutboundAction
Get-BitLockerVolume
Get-LocalGroupMember Administrators
Get-WinEvent -LogName System -MaxEvents 20
```

Record which settings are facts, which are policy requirements, and which need an exception.

## Step 2 - Update Defender and Run a Baseline Scan

```powershell
Update-MpSignature
Start-MpScan -ScanType QuickScan
Get-MpComputerStatus | Select-Object AntivirusSignatureLastUpdated,QuickScanStartTime,QuickScanEndTime,QuickScanAge
Get-MpThreatDetection
```

A scan result is not proof that the host is clean; it is one source of evidence with detection limitations.

## Step 3 - Enforce Firewall Profiles

```powershell
Set-NetFirewallProfile -Profile Domain,Private,Public -Enabled True
Set-NetFirewallProfile -Profile Domain,Private,Public -DefaultInboundAction Block
Set-NetFirewallProfile -Profile Domain,Private,Public -LogBlocked True -LogAllowed True
Set-NetFirewallProfile -Profile Domain,Private,Public -LogMaxSizeKilobytes 32768
Get-NetFirewallProfile | Format-Table Name,Enabled,DefaultInboundAction,LogBlocked,LogAllowed,LogFileName
```

Create a narrow rule only if remote administration is required:

```powershell
New-NetFirewallRule -DisplayName 'FEMTECH WinRM from SOC' `
  -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5985 `
  -RemoteAddress 10.10.40.0/24 -Profile Domain
Get-NetFirewallRule -DisplayName 'FEMTECH WinRM from SOC' | Get-NetFirewallPortFilter
```

Do not enable WinRM merely to demonstrate a rule. If the service is not authorised, create and then disable the rule, documenting the decision.

## Step 4 - Enable High-Value Audit Policy

```powershell
auditpol /set /subcategory:'Logon' /success:enable /failure:enable
auditpol /set /subcategory:'User Account Management' /success:enable /failure:enable
auditpol /set /subcategory:'Security Group Management' /success:enable /failure:enable
auditpol /set /subcategory:'Process Creation' /success:enable /failure:enable
auditpol /set /subcategory:'Other Object Access Events' /success:enable /failure:enable
auditpol /get /category:*
```

Enable command-line inclusion for process events in the lab:

```powershell
New-Item -Path 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Policies\System\Audit' -Force | Out-Null
New-ItemProperty -Path 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Policies\System\Audit' `
  -Name ProcessCreationIncludeCmdLine_Enabled -PropertyType DWord -Value 1 -Force
```

Command lines can contain sensitive data. Production deployment needs access, retention, and privacy controls.

## Step 5 - Enable PowerShell Telemetry

```powershell
New-Item -Path 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging' -Force | Out-Null
Set-ItemProperty -Path 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging' -Name EnableScriptBlockLogging -Type DWord -Value 1
New-Item -Path 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ModuleLogging' -Force | Out-Null
Set-ItemProperty -Path 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ModuleLogging' -Name EnableModuleLogging -Type DWord -Value 1
New-Item -Path 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ModuleLogging\ModuleNames' -Force | Out-Null
New-ItemProperty -Path 'HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ModuleLogging\ModuleNames' -Name '*' -Value '*' -PropertyType String -Force
```

On a domain-managed endpoint, configure these through GPO to prevent drift. Local commands are used here to show the underlying settings.

## Step 6 - Generate Benign Test Events

Record UTC time, then:

```powershell
$TestStart = (Get-Date).ToUniversalTime()
whoami /all
Get-Process | Select-Object -First 5
New-LocalUser -Name 'lab-temp' -NoPassword -AccountNeverExpires
Add-LocalGroupMember -Group 'Remote Desktop Users' -Member 'lab-temp'
Remove-LocalGroupMember -Group 'Remote Desktop Users' -Member 'lab-temp'
Remove-LocalUser -Name 'lab-temp'
Write-EventLog -LogName Application -Source 'Windows PowerShell' -EventId 3001 -EntryType Information -Message 'FEMTECH LAB08 benign validation event'
```

These are authorised administrative events, not malware simulation. The temporary account is removed in the same change window.

## Step 7 - Find and Interpret Evidence

```powershell
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688; StartTime=$TestStart.ToLocalTime()} -ErrorAction SilentlyContinue |
  Select-Object TimeCreated,Id,Message | Format-List
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4720,4726,4732,4733; StartTime=$TestStart.ToLocalTime()} |
  Select-Object TimeCreated,Id,Message | Format-List
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-PowerShell/Operational'; Id=4103,4104; StartTime=$TestStart.ToLocalTime()} |
  Select-Object TimeCreated,Id,Message | Format-List
```

Export evidence:

```powershell
wevtutil epl Security "$Evidence\Security-LAB08.evtx" /ow:true
wevtutil epl Microsoft-Windows-PowerShell/Operational "$Evidence\PowerShell-LAB08.evtx" /ow:true
Get-FileHash "$Evidence\Security-LAB08.evtx","$Evidence\PowerShell-LAB08.evtx" -Algorithm SHA256
```

## Step 8 - Review Persistence and Exposure

```powershell
Get-CimInstance Win32_StartupCommand | Select-Object Name,Command,Location,User
Get-ScheduledTask | Where-Object State -ne 'Disabled' | Select-Object TaskPath,TaskName,State
Get-Service | Where-Object StartType -eq 'Automatic' | Select-Object Name,DisplayName,Status
Get-NetTCPConnection -State Listen | Sort-Object LocalPort
```

Do not label every scheduled task or automatic service malicious. Record signer, path, owner, creation time, purpose, and expected baseline before deciding.

## Step 9 - Add Sysmon Endpoint Telemetry

Use the official Microsoft Sysmon download and the acquisition/configuration procedure in the [Tool Mastery Guide](../TOOL_MASTERY_GUIDE.md). Verify Authenticode and SHA-256 before installation. Enable a lab-scoped configuration for process creation, network connection, a dedicated file-test directory, and Run-key changes.

Required validation:

```powershell
.\Sysmon64.exe -c
Get-Service Sysmon64
$Start = Get-Date
whoami.exe /all | Out-Null
Resolve-DnsName dc01.femtech.lab | Out-Null
'LAB08 synthetic' | Set-Content C:\FEMTECH\LabData\lab08.txt
Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  StartTime=$Start
} | Select-Object TimeCreated,Id,RecordId,Message | Format-List
```

Trace one event into Wazuh using its exact Sysmon `RecordId`. Explain ProcessId versus ProcessGuid, parent process, hash, network source/destination, UTC timestamp, and configuration-change event. Measure event volume for five minutes and identify data/privacy implications.

## Step 10 - Query the Endpoint with osquery

Install an official osquery build or use an instructor-prepared VM. Run and export at least these tables: `system_info`, `programs`, `processes`, `process_open_sockets`, `services`, `scheduled_tasks`, and `users`.

```powershell
& 'C:\Program Files\osquery\osqueryi.exe' --json "SELECT pid,name,path,cmdline,parent FROM processes;" |
  Set-Content "$Evidence\osquery-processes.json"
Get-FileHash "$Evidence\osquery-processes.json" -Algorithm SHA256
```

Compare osquery's point-in-time process view with Sysmon's historical process events. State which short-lived activity osquery might miss and which current state an old Sysmon event cannot prove.

## Step 11 - Validate and Roll Back

Validate domain logon, DNS, approved application, Defender, firewall, and event generation. Remove any temporary rule or setting not approved for the final baseline:

```powershell
Remove-NetFirewallRule -DisplayName 'FEMTECH WinRM from SOC' -ErrorAction SilentlyContinue
Get-LocalUser -Name 'lab-temp' -ErrorAction SilentlyContinue
Get-MpComputerStatus | Select-Object AntivirusEnabled,RealTimeProtectionEnabled
Get-NetFirewallProfile | Format-Table Name,Enabled,DefaultInboundAction
```

## Deliverables

- Before/after endpoint baseline.
- Change record and exception register.
- Audit-policy and PowerShell logging evidence.
- Timeline correlating account, group, process, and script-block events.
- Exported EVTX files with SHA-256 hashes.
- Persistence review with at least three benign items correctly explained.
- Sysmon installation/configuration, known event, EVTX export, Wazuh trace, and event-volume note.
- osquery JSON evidence and comparison with event-based telemetry.
- Privacy note for command-line and PowerShell logging.

## Analyst Question

If event 4688 exists but command-line data is blank, list at least four possible causes and the tests you would run before changing policy.
