# Aviation Cybersecurity Incident Response Solution Guide

## Management Emergency Security Meeting - SkyLink Aviation Services

## Purpose of This Solution

This solution explains how a Network Security Engineering Team should analyse and respond to the SkyLink Aviation Services scenario. The goal is not only to create firewall rules, but to demonstrate professional cybersecurity thinking: identify business-critical assets, understand risk, protect confidentiality, integrity, and availability, apply least privilege, design pfSense controls, test legitimate operations, analyse logs, and communicate findings clearly to management.

The scenario involves two internal network zones:

| Zone | Network | Purpose |
|---|---:|---|
| Corporate Operations Network | `172.16.50.0/24` | Used by Operations Officers, Flight Dispatchers, Customer Service Representatives, and Administrative Staff |
| Flight Operations Server Network | `172.16.100.0/24` | Hosts critical aviation systems and databases |

Key devices:

| Device | IP Address |
|---|---:|
| pfSense LAN interface | `172.16.50.1/24` |
| pfSense OPT1 interface | `172.16.100.1/24` |
| Operations Workstation | `172.16.50.100` |
| Flight Operations Server | `172.16.100.100` |

The SOC detected suspicious traffic from an Operations Officer's workstation toward the Flight Operations Server Network. No aircraft operation impact is confirmed, but the unrestricted firewall policy between corporate users and critical aviation systems creates unacceptable risk.

## 1. Executive Summary

SkyLink Aviation Services has a serious internal segmentation weakness. A corporate workstation was able to communicate freely with critical aviation servers. Even though there is no confirmed operational disruption, unrestricted communication between the Corporate Operations Network and the Flight Operations Server Network creates a high-risk path for malware, credential misuse, ransomware, lateral movement, data theft, and accidental system disruption.

The recommended solution is to redesign the internal pfSense firewall policy using the Principle of Least Privilege. Corporate systems should not have broad access to flight operations systems. Only required business services should be explicitly allowed, and all other traffic from the Corporate Operations Network to the Flight Operations Server Network should be denied and logged.

The proposed policy should:

- Allow only approved business traffic to the Flight Operations Server.
- Block unauthorized access attempts from corporate workstations.
- Log denied traffic for SOC review.
- Preserve operational continuity by testing required aviation services before enforcement.
- Provide management with evidence that legitimate operations work and unauthorized traffic is blocked.

## 2. Critical Assets

Critical assets are systems, data, services, and processes whose compromise could harm flight safety, airline operations, compliance, customer trust, or business continuity.

| Critical Asset | Why It Matters | Primary Security Concern |
|---|---|---|
| Flight Operations Management System | Supports flight coordination and operational decisions | Integrity and availability |
| Flight Planning Server | Supports route planning, schedules, and operational preparation | Integrity and availability |
| Aircraft Maintenance Management System | Tracks maintenance work and aircraft readiness | Integrity and availability |
| Crew Scheduling Database | Supports crew assignment and operational staffing | Availability and integrity |
| Aircraft Technical Records | Contains maintenance history, inspection records, and aircraft condition data | Integrity and confidentiality |
| Operations Workstations | Used by business staff and may become entry points into critical systems | Compromise and lateral movement |
| pfSense Firewall | Enforces segmentation between corporate and flight operations networks | Control integrity and availability |
| Firewall Logs | Provide evidence for SOC monitoring, audit, and incident investigation | Integrity and retention |

The most important assets are the flight operations systems, maintenance systems, and aircraft technical records. These systems directly support aviation safety, compliance, and operational continuity. A disruption or unauthorized change could create serious business and safety consequences.

## 3. Possible Threat Actors

The scenario does not confirm who caused the suspicious activity. Professional analysis should consider several realistic threat actors without making unsupported claims.

| Threat Actor | Possible Motivation | Relevant Scenario Concern |
|---|---|---|
| Cybercriminal | Ransomware, extortion, credential theft, fraud | Corporate workstation may be used as an initial foothold |
| Malicious insider | Data theft, sabotage, fraud, revenge | Internal access may be abused if segmentation is weak |
| Careless or compromised employee | Unintentional malware execution or credential exposure | Operations workstation may generate suspicious traffic |
| Nation-state or advanced actor | Aviation intelligence, operational disruption, long-term access | Aviation is a high-value sector |
| Third-party/vendor compromise | Abuse of trusted support paths | Vendors may have operational system access |
| Automated malware | Scanning, propagation, command-and-control | Workstation may attempt broad internal communication |

The immediate working assumption should be that the Operations Workstation is untrusted until investigated. The firewall policy should not depend on trusting every corporate endpoint.

## 4. Vulnerabilities and Weaknesses

The main weakness is unrestricted communication between the Corporate Operations Network and the Flight Operations Server Network.

| Weakness | Explanation | Risk Created |
|---|---|---|
| Flat or overly permissive internal access | Corporate workstations can reach critical servers without strong restriction | Lateral movement and unauthorized access |
| No least-privilege firewall policy | Traffic is allowed because networks are connected, not because business need is proven | Excessive attack surface |
| Insufficient deny logging | If blocked traffic is not logged, SOC visibility is reduced | Delayed detection |
| Lack of service-level allow list | Required ports and sources are not clearly defined | Overbroad rules or operational outages |
| Possible endpoint compromise | The Operations Workstation generated suspicious traffic | Malware, stolen credentials, or unauthorized activity |
| Weak change governance | Critical segmentation was not previously reviewed well enough | Long-term control failure |

The incident reveals a design problem, not only a workstation problem. Even if the workstation is cleaned, the organization remains exposed if unrestricted internal access continues.

## 5. Cybersecurity Risk Assessment

Risk is the possibility that a threat will exploit a vulnerability and cause harm to an asset or business process.

| Risk Scenario | Likelihood | Impact | Overall Risk |
|---|---|---|---|
| Compromised corporate workstation scans flight operations servers | High | Medium to High | High |
| Malware spreads from corporate network into server network | Medium | High | High |
| Unauthorized user accesses aircraft technical records | Medium | High | High |
| Ransomware encrypts flight operations or maintenance systems | Medium | Critical | Critical |
| Incorrect firewall rule blocks legitimate flight operations traffic | Medium | High | High |
| Lack of logging prevents timely investigation | Medium | Medium | Medium to High |

The highest-priority risk is unauthorized or malicious traffic from corporate endpoints reaching aviation-critical servers. The second major risk is implementing changes too aggressively and interrupting flight operations. The solution must therefore improve security while preserving availability.

## 6. CIA Triad Impact

### Confidentiality

Confidentiality may be affected if unauthorized users or malware can access flight operations data, crew schedules, maintenance information, or aircraft technical records. Aviation records may contain sensitive operational, technical, and compliance information.

Examples of confidentiality risk:

- A compromised workstation reads server shares.
- Malware copies technical records.
- An attacker enumerates systems and extracts configuration details.

### Integrity

Integrity is the most serious concern for aviation systems. If flight schedules, maintenance records, technical records, or planning data are altered without authorization, staff may make decisions based on incorrect information.

Examples of integrity risk:

- Unauthorized changes to maintenance status.
- Modification of flight planning data.
- Tampering with logs after compromise.
- Corruption of crew scheduling records.

### Availability

Availability is also critical because flight operations, maintenance, baggage handling, crew scheduling, and passenger services depend on timely system access. Ransomware, denial of service, or bad firewall rules could interrupt business operations.

Examples of availability risk:

- Malware disrupts flight operations servers.
- Ransomware encrypts databases.
- Firewall rules accidentally block required applications.
- Logs or monitoring systems become unavailable during investigation.

## 7. Principle of Least Privilege

The Principle of Least Privilege means users, systems, and networks should receive only the access required to perform approved business functions.

In this scenario, least privilege means:

- Corporate workstations should not access every port on every flight operations server.
- Only approved source systems should reach specific approved destination systems.
- Only required ports should be allowed.
- All other traffic should be denied by default.
- Denied attempts should be logged and reviewed.

Least privilege reduces risk because a compromised workstation cannot freely move into the critical server network. It also improves investigation quality because unusual attempts become visible in firewall logs.

## 8. Firewall Design Approach

The firewall policy should be designed in phases:

1. Identify required business services.
2. Confirm source and destination systems.
3. Create narrow allow rules.
4. Create a deny-and-log rule for unauthorized corporate-to-server traffic.
5. Test legitimate business functions.
6. Review logs for unexpected blocked traffic.
7. Adjust only when justified by business requirements.

pfSense evaluates firewall rules top-down on the interface where traffic enters. For traffic from `172.16.50.0/24` to `172.16.100.0/24`, rules should be applied on the LAN interface because the traffic enters pfSense from the Corporate Operations Network.

## 9. Recommended pfSense Aliases

Aliases make firewall rules easier to read, maintain, and audit.

| Alias Name | Type | Value | Purpose |
|---|---|---|---|
| `CORP_NET` | Network | `172.16.50.0/24` | Corporate Operations Network |
| `FLIGHT_NET` | Network | `172.16.100.0/24` | Flight Operations Server Network |
| `OPS_WORKSTATION` | Host | `172.16.50.100` | Operations Officer workstation from scenario |
| `FLIGHT_OPS_SERVER` | Host | `172.16.100.100` | Flight Operations Server |
| `AVIATION_APP_PORTS` | Ports | Approved application ports | Required aviation application traffic |
| `ADMIN_PORTS` | Ports | Approved admin ports if needed | Restricted management access |

Because the PDF does not specify the application ports, the team must identify them through business and technical discovery. For classroom purposes, instructors may define example ports such as HTTPS `443` for a web-based application, database access only from application servers, and management protocols only from administrator jump hosts.

## 10. Example Firewall Policy

The following policy is a professional example based on the scenario. It should be adjusted if the instructor provides exact application ports.

### Rule 1 - Allow Required Flight Operations Application Access

| Setting | Value |
|---|---|
| Interface | LAN |
| Action | Pass |
| Protocol | TCP |
| Source | Approved corporate users or `OPS_WORKSTATION` if limited lab scope |
| Destination | `FLIGHT_OPS_SERVER` |
| Destination Port | Required application port, commonly `443` if web-based |
| Description | Allow approved business access to Flight Operations application |
| Logging | Enabled for initial validation |

Justification:

This rule supports operational continuity. If staff must use the Flight Operations Management System, the firewall should allow only the required service rather than all traffic.

### Rule 2 - Allow Required Maintenance or Scheduling Services Only If Confirmed

| Setting | Value |
|---|---|
| Interface | LAN |
| Action | Pass |
| Protocol | TCP |
| Source | Approved business systems or users |
| Destination | Specific approved server in `FLIGHT_NET` |
| Destination Port | Confirmed application port |
| Description | Allow approved aviation business service |
| Logging | Enabled during testing |

Justification:

Different aviation applications may require different services. Each service should receive its own justified rule. Avoid one broad rule that allows all corporate hosts to all server ports.

### Rule 3 - Allow DNS or Authentication Only If Required and Properly Scoped

| Setting | Value |
|---|---|
| Interface | LAN |
| Action | Pass |
| Protocol | TCP/UDP as required |
| Source | Approved systems only |
| Destination | Approved DNS, directory, or authentication server |
| Destination Port | Required service port |
| Description | Allow supporting identity or name-resolution service only if required |
| Logging | Enabled initially |

Justification:

Some applications depend on DNS or identity services. These dependencies should be explicitly documented. Do not assume all supporting traffic is safe.

### Rule 4 - Block and Log Corporate Access to Flight Operations Server Network

| Setting | Value |
|---|---|
| Interface | LAN |
| Action | Block or Reject |
| Protocol | Any |
| Source | `CORP_NET` |
| Destination | `FLIGHT_NET` |
| Destination Port | Any |
| Description | Block unauthorized corporate access to flight operations network |
| Logging | Enabled |

Justification:

This is the most important security rule. After approved allow rules are placed above it, this rule blocks all unnecessary traffic from corporate workstations to critical aviation systems. Logging provides evidence of attempted unauthorized access.

### Rule 5 - Allow Normal Corporate Internet or Internal Business Access

| Setting | Value |
|---|---|
| Interface | LAN |
| Action | Pass |
| Protocol | As required |
| Source | `CORP_NET` |
| Destination | Approved non-flight destinations |
| Destination Port | Required ports |
| Description | Preserve normal corporate business operations |
| Logging | Based on monitoring requirements |

Justification:

The goal is not to break the corporate network. Corporate users still need email, internet, printing, ticketing, and business systems, but access to the critical flight network must be controlled.

## 11. Rule Order

Rule order matters in pfSense. Place specific allow rules above broad deny rules.

Recommended order on the LAN interface:

1. Allow approved corporate-to-flight application traffic.
2. Allow approved supporting services if required.
3. Block and log all other corporate-to-flight network traffic.
4. Allow normal corporate traffic to non-flight destinations as required.
5. Default deny remains as a safety backstop.

If the block rule is placed above the allow rules, legitimate aviation services may fail. If the allow rule is too broad, the security objective fails.

## 12. Services That Should Be Allowed

The exact allowed services must be confirmed by application owners and technical testing. Examples may include:

| Service | Allow? | Reason |
|---|---|---|
| HTTPS to flight operations application | Yes, if required | Supports approved application access |
| Maintenance application port | Yes, if documented | Supports engineering operations |
| Crew scheduling application access | Yes, if documented | Supports flight staffing |
| DNS to approved resolver | Only if required | Supports name resolution |
| Authentication to approved identity service | Only if required | Supports controlled login |
| Administrative access such as SSH/RDP | No from general corporate users | Should use an admin jump host or restricted management path |
| SMB/file sharing | No unless explicitly required | High lateral movement and ransomware risk |
| Any-to-any traffic | No | Violates least privilege |
| ICMP/ping | Optional and limited | Useful for troubleshooting but should not prove application access |

## 13. Services That Should Be Blocked

The following should normally be blocked from general corporate workstations to the Flight Operations Server Network:

- Unrestricted TCP and UDP traffic.
- SMB file sharing unless specifically required.
- RDP from general workstations.
- SSH from general workstations.
- Database ports directly from user workstations.
- Remote management services.
- Scanning and enumeration traffic.
- Unapproved ICMP or diagnostic traffic.

Blocking these services reduces attack surface and limits the ability of malware to move laterally.

## 14. Testing Plan

Testing proves that the security design protects critical systems without interrupting airline operations.

### Pre-Change Testing

Before enforcement, document:

- Current workstation IP address.
- Current server IP address.
- Existing reachable services.
- Required aviation workflows.
- Current firewall rules.
- Current application access paths.
- Known business dependencies.

### Post-Change Functional Tests

| Test | Expected Result |
|---|---|
| Operations user opens approved flight application | Allowed |
| Operations user accesses approved maintenance service | Allowed only if required |
| Operations workstation attempts RDP to flight server | Blocked |
| Operations workstation attempts SMB to flight server | Blocked unless specifically approved |
| Operations workstation scans flight network ports | Blocked and logged |
| Flight operations application remains usable | Successful |
| Firewall logs show denied unauthorized attempts | Successful |

### Example Test Commands

From the Operations Workstation:

```powershell
Test-NetConnection 172.16.100.100 -Port 443
Test-NetConnection 172.16.100.100 -Port 3389
Test-NetConnection 172.16.100.100 -Port 445
```

Expected interpretation:

- Port `443` should succeed only if HTTPS is the approved application service.
- Port `3389` should fail unless there is a documented administrative requirement.
- Port `445` should fail unless file sharing is explicitly approved.

If using Nmap in a controlled lab:

```bash
nmap -Pn -p 22,80,443,445,3389 172.16.100.100
```

Nmap should be used only in an authorized lab or approved enterprise test window.

## 15. Firewall Log Analysis

Firewall logs should prove both business continuity and security enforcement.

Useful log evidence includes:

| Evidence | What It Proves |
|---|---|
| Allowed application traffic from approved source to approved destination | Legitimate aviation service remains operational |
| Blocked traffic from `172.16.50.100` to unauthorized ports | Least privilege is being enforced |
| Repeated denied connections from one workstation | Possible compromise or misconfiguration |
| No broad allow rule from `CORP_NET` to `FLIGHT_NET` | Segmentation design is controlled |
| Time-stamped test results | Change was validated |

Example management statement:

"After implementing the policy, approved HTTPS application traffic from authorized corporate users to the Flight Operations Server succeeded. Attempts from the Operations Workstation to reach unauthorized services such as SMB and RDP were denied and logged by pfSense. This demonstrates that required operations continue while unnecessary exposure to the Flight Operations Server Network has been reduced."

## 16. Incident Response Actions

Firewall redesign is necessary, but it does not replace incident response. The suspicious workstation must be investigated.

Recommended actions:

1. Isolate or contain the Operations Workstation according to business impact.
2. Preserve relevant logs and endpoint evidence.
3. Review endpoint alerts, running processes, persistence, and user activity.
4. Review authentication logs for the Operations Officer account.
5. Check whether credentials were exposed.
6. Search firewall, DNS, proxy, and endpoint logs for related indicators.
7. Reimage or clean the workstation if compromise is confirmed.
8. Reset credentials and revoke sessions if account compromise is suspected.
9. Monitor for repeated denied attempts after firewall enforcement.
10. Document findings and lessons learned.

## 17. Management Reporting

Management does not need every technical detail, but they need a clear risk-based explanation.

### Key Message to Management

The organization had excessive internal trust between the corporate network and critical flight operations systems. A suspicious workstation was able to attempt communication with aviation servers because the firewall policy did not enforce least privilege. The new design reduces attack surface by allowing only approved business services and blocking all other corporate-to-flight network traffic.

### Business Impact

The project protects:

- Flight operations continuity.
- Aircraft maintenance records.
- Crew scheduling.
- Passenger service reliability.
- Regulatory and audit confidence.
- Executive risk accountability.

### Evidence to Present

| Evidence | Audience Value |
|---|---|
| Network diagram before and after | Shows improved segmentation |
| Firewall rule table | Shows least-privilege design |
| Test results | Shows operations still work |
| Deny log samples | Shows unauthorized traffic is blocked |
| Incident timeline | Shows what happened and when |
| Risk register update | Shows governance and accountability |

## 18. Expected Student Deliverables

Students should submit:

1. Critical asset list.
2. Threat actor analysis.
3. Vulnerability and weakness assessment.
4. Risk assessment table.
5. CIA impact analysis.
6. pfSense alias table.
7. Firewall rule table.
8. Rule justification.
9. Testing evidence.
10. Firewall log analysis.
11. Management summary.

## 19. Instructor Grading Guide

| Requirement | Excellent Answer Should Include |
|---|---|
| Critical assets | Aviation systems, maintenance records, crew scheduling, firewall, logs, workstations |
| Threat actors | Cybercriminals, insiders, compromised employees, malware, third parties, advanced actors |
| Vulnerabilities | Unrestricted inter-network access, weak segmentation, broad rules, lack of least privilege |
| Risks | Lateral movement, ransomware, data theft, operational disruption, integrity loss |
| CIA analysis | Clear confidentiality, integrity, and availability impact |
| PoLP | Specific allow rules and broad deny after approved access |
| pfSense rules | Correct interface, source, destination, port, action, logging, and order |
| Justification | Business reason and security reason for each rule |
| Testing | Allowed services verified and unauthorized services blocked |
| Logs | Evidence-based interpretation, not just screenshots |
| Management reporting | Clear, non-alarmist, business-focused summary |

## 20. Common Student Mistakes

- Allowing all traffic from `172.16.50.0/24` to `172.16.100.0/24`.
- Creating rules without explaining business purpose.
- Blocking everything without testing operational impact.
- Placing deny rules above required allow rules.
- Treating ping success as proof that applications work.
- Ignoring logs.
- Forgetting that the compromised workstation still needs incident response.
- Describing the incident as confirmed aircraft compromise without evidence.
- Failing to distinguish confidentiality, integrity, and availability impacts.

## 21. Final Recommended Answer

SkyLink Aviation Services should treat the incident as a serious segmentation and internal access-control failure. The suspicious workstation may or may not be fully compromised, but its ability to communicate freely with critical flight operations systems proves that the current network policy is too permissive.

The correct response is to preserve aviation operations while redesigning pfSense rules around least privilege. The team should identify required application flows, create specific allow rules for approved services, block and log all other Corporate Operations Network traffic to the Flight Operations Server Network, and validate that flight operations, maintenance, and scheduling services continue working.

Management should receive evidence showing that legitimate services remain available and unauthorized access is now blocked. The SOC and incident response team should investigate the Operations Workstation, while network security engineers implement segmentation, systems administrators confirm service dependencies, compliance validates risk treatment, and internal audit reviews the control evidence.

The final security posture should not rely on trust between internal networks. It should rely on documented business need, approved firewall rules, monitoring, testing, and continuous review.
