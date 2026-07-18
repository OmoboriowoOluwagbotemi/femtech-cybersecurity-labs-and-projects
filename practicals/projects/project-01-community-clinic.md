# Project 01 - Secure a Community Health Clinic

## Scenario

BrightCare Clinic has 35 staff, 20 Windows workstations, one patient-record application, a public appointment portal, and no full-time security employee. All systems currently share one subnet. Receptionists use local administrator accounts, the portal talks directly to the database, and logs remain on individual machines. The clinic can tolerate at most 30 minutes of planned portal downtime.

Your team must build a no-cost reference environment that protects synthetic patient data, supports clinic operations, and produces evidence for a management decision.

**Duration:** 2-3 weeks
**Free tools:** VirtualBox, pfSense CE, Windows Server Evaluation, Windows 11 Evaluation, Ubuntu, Nginx, Wazuh, Suricata, Greenbone, OpenSSL
**Lessons consolidated:** 1-25 and 36-39

## Business Requirements

- Reception can use the synthetic patient application but cannot administer systems.
- IT can administer endpoints from a controlled source.
- The public portal resides in a DMZ and reaches only its required back end.
- Patient data is encrypted in transit and access is attributable.
- Logs support detection and a 30-day lab retention design.
- The solution has backup, recovery, incident, and access-review procedures.

## Phase 1 - Discover and Model

1. Interview the instructor acting as clinic manager, application owner, privacy lead, and IT provider.
2. Produce asset, data, identity, dependency, and third-party inventories.
3. Draw data flow from patient browser to portal to application/database.
4. Mark trust boundaries and privileged paths.
5. Create at least 12 risks using threat, vulnerability, impact, existing controls, owner, and treatment.
6. Map relevant NIST CSF functions and CIS Controls safeguards without claiming certification.

Required evidence commands:

```bash
ip -br address
ip route
sudo ss -lntup
nmap -Pn -n -sT -p 22,53,80,88,135,389,443,445,464,636,3000,1514,1515 --reason <APPROVED_IPS>
```

## Phase 2 - Design

Use USERS, SERVERS, DMZ, and SOC segments. Produce:

- IP plan and pfSense interface/rule matrix.
- AD OU, groups, service accounts, and joiner/mover/leaver design.
- TLS certificate inventory and renewal plan.
- Logging/data-retention matrix.
- Backup objectives with RPO/RTO assumptions.
- Change sequence that preserves portal availability.

The team must defend why each allowed flow exists. `Any -> any` is rejected.

## Phase 3 - Build Identity and Access

Create role groups such as `GG_Reception`, `GG_Clinicians`, `GG_IT_Helpdesk`, and resource groups. Use synthetic users and group-based permissions. Join one Windows client.

```powershell
Get-ADUser -Filter * -SearchBase 'OU=Users,OU=FEMTECH,DC=femtech,DC=lab' -Properties Enabled,MemberOf
Get-ADGroupMember GG_Reception
whoami /groups
gpresult /h C:\clinic-gpresult.html
```

Test reception, clinician, help-desk, disabled-user, and unauthorised-user scenarios. Direct user ACLs require a documented exception.

## Phase 4 - Build Network and Services

Deploy pfSense and the DMZ portal. Issue a private-PKI certificate for the lab name. Apply Linux hardening and host firewall policy. Validate:

```bash
curl --cacert <LAB_ROOT_CA> -v https://portal.brightcare.lab/
openssl s_client -connect 10.10.30.20:443 -servername portal.brightcare.lab -CAfile <LAB_ROOT_CA> -verify_return_error </dev/null
nc -vz -w 3 <PORTAL_IP> 443
nc -vz -w 3 <PORTAL_IP> <BACKEND_PORT>
```

Run at least 16 firewall test cases, half negative. Correlate each denial with a pfSense log.

## Phase 5 - Monitor and Detect

Onboard the domain controller, Windows client, Linux server, and portal to Wazuh. Configure Suricata or Zeek for network evidence. Build and test detections for:

- Privileged-group change.
- Repeated failed authentication followed by success.
- Portal configuration-file change.
- Endpoint telemetry loss.

Each detection needs a hypothesis, source fields, ATT&CK mapping, positive test, negative test, triage runbook, and owner.

## Phase 6 - Vulnerability and Recovery Validation

Run an authorised Greenbone assessment against the server and DMZ only. Manually validate five findings. Remediate one without breaking the portal. Then execute:

- Portal restore from configuration/content backup.
- Disabled-user access test.
- Expired/incorrect TLS identity test.
- Wazuh agent interruption and recovery.
- pfSense configuration restore drill.

## Scheduled Injects

1. **Day 3:** A locum clinician needs access for 48 hours.
2. **Day 6:** The portal vendor asks for direct RDP/SSH from the Internet.
3. **Day 8:** Wazuh stops receiving logs from the portal during a busy clinic.
4. **Day 10:** A scanner reports a critical package, but patching may exceed the downtime limit.

The team must update authority, risk, communication, tests, and rollback for each inject.

## Deliverables

- Executive architecture proposal and cost/licence statement.
- Topology, data-flow, trust-boundary, and administrative-path diagrams.
- Configurations/exports with secrets removed.
- 16 firewall tests, five access tests, four detection test packs, and recovery evidence.
- Risk and vulnerability registers.
- Incident/access/recovery runbooks.
- Five-minute clinic-board briefing and 15-minute technical defence.

## Acceptance Gate

The project fails the gate if the portal or target is bridged, synthetic patient records are publicly reachable, reception is local admin, DMZ has broad internal access, logs are absent, or recovery is untested.
