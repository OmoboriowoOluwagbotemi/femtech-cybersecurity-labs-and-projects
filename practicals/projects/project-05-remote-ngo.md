# Project 05 - Secure a Remote NGO Workforce

## Scenario

AidBridge NGO has 25 staff across Nigeria. Staff use home networks and shared devices to access donor files, finance records, and an internal case-management portal. VPN credentials are shared, RDP is exposed, and departing volunteers sometimes retain access. The NGO has limited bandwidth and no budget for commercial zero-trust products.

Design and demonstrate a secure remote-access model using free components and strong operational controls.

**Duration:** 2 weeks
**Tools:** pfSense CE VPN capability, OpenVPN clients, Windows/Ubuntu, Active Directory, Wazuh, Defender, OpenSSL
**Lessons:** 5, 20-24, 36-39

## Requirements

- Named identities; no shared VPN account.
- Role-based access and rapid offboarding.
- VPN clients may reach only approved services.
- Administrative access uses separate accounts and source controls.
- Device posture is represented by practical compensating controls.
- Low-bandwidth operation and emergency access are addressed.
- Authentication, VPN, endpoint, and resource logs are monitored.

## Phase 1 - Define Access Decisions

Create a matrix of user role, device ownership, data, application, source, authentication strength, session risk, and action. Identify cases that must be denied, stepped up, or manually approved.

Explain zero trust as continuous, contextual verification and least privilege—not as a product or "trust nobody" slogan.

## Phase 2 - Design Identity Lifecycle

Build OUs/groups for employees, volunteers, finance, case workers, IT, and disabled identities. Define sponsor, expiry, recertification, and emergency access.

Create a time-limited volunteer:

```powershell
$P = Read-Host 'Temporary password' -AsSecureString
New-ADUser -Name 'Volunteer Lab' -SamAccountName 'volunteer.lab' `
  -UserPrincipalName 'volunteer.lab@femtech.lab' -Path '<VOLUNTEER_OU_DN>' `
  -AccountPassword $P -Enabled $true -ChangePasswordAtLogon $true `
  -AccountExpirationDate (Get-Date).AddDays(14)
Get-ADUser volunteer.lab -Properties AccountExpirationDate,Enabled,MemberOf
```

## Phase 3 - Configure VPN and Segmentation

Use pfSense's current OpenVPN wizard and an internal lab CA. Create individual user certificates or an approved identity integration. Do not export CA private keys. Restrict VPN subnet traffic with explicit rules.

Client validation:

```bash
ip -br address
ip route
dig @10.10.20.10 femtech.lab SOA +short
nc -vz -w 3 <CASE_PORTAL_IP> 443
nc -vz -w 3 <FILE_SERVER_IP> 445
nc -vz -w 3 <DOMAIN_CONTROLLER_IP> 3389
```

Run tests for finance employee, case worker, volunteer, IT admin, expired identity, revoked certificate, and non-VPN source.

## Phase 4 - Secure Endpoints and Administration

Apply Defender, firewall, patch, audit, PowerShell logging, disk-encryption plan, screen lock, and local-admin removal. Separate daily and administrative accounts. Restrict management ports to an ADMIN or SOC source, never all VPN users.

## Phase 5 - Monitor and Respond

Onboard endpoints and servers to Wazuh. Detect:

- Repeated VPN failure followed by success.
- Login from an unusual lab source/time.
- Disabled or expired user attempt.
- Privileged-group change.
- Endpoint agent offline.
- VPN certificate nearing expiry/revoked use.

Create a lost-device runbook covering identity/session revocation, certificate revocation, evidence, data exposure assessment, device recovery, communication, and return-to-service.

## Phase 6 - Test Offboarding

Simulate a volunteer departure:

1. Record approval and effective time.
2. Disable AD identity.
3. Revoke VPN certificate/session.
4. Remove group access.
5. Transfer ownership of synthetic data.
6. Validate new login and existing session denial.
7. Preserve access evidence.
8. Notify sponsor and record completion.

## Injects

1. Finance director loses a laptop one hour before payroll.
2. Rural staff report the VPN is unusable on low bandwidth.
3. A donor auditor asks for proof that volunteers cannot access finance.
4. The emergency admin certificate has expired during an outage.

## Deliverables

- Remote-access architecture and access-decision matrix.
- Identity lifecycle and certificate lifecycle procedures.
- pfSense VPN/rule exports with secrets removed.
- At least 14 identity/network test cases.
- Endpoint baseline and monitoring evidence.
- Lost-device, offboarding, emergency-access, and low-bandwidth runbooks.
- Risk assessment comparing shared credentials, direct RDP, and the proposed model.

## Professional Test

The instructor chooses one user, device condition, and requested resource. The team must make an immediate allow/deny/step-up decision, cite policy and evidence, and explain the business trade-off.
