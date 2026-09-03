# Instructor Answer Key - Lesson 27: Asset Discovery

Do not distribute this file before the assessment closes. Accept defensible scenario and theory answers when students support their reasoning with asset visibility, ownership, business impact, risk, and appropriate security controls.

## Multiple Choice Answer Key

1. **A.** An asset is anything valuable that must be protected or managed.
2. **A.** Security teams cannot protect assets they do not know exist.
3. **A.** Asset inventory is a structured record of assets and important details.
4. **A.** A rogue asset is unauthorized or suspicious.
5. **A.** Shadow IT is technology used without approved governance.
6. **A.** Ownership makes responsibility clear.
7. **A.** Criticality helps prioritize security effort.
8. **A.** Reviewing firewall logs is passive discovery because it uses existing records.
9. **A.** Inventory can reveal sensitive details about systems, owners, exposure, and security gaps.
10. **A.** Discovery helps define which systems must be assessed and patched.

## Scenario-Based Guidance

1. Unknown wireless router:
   Strong answers should mention unauthorized network access, possible weak Wi-Fi security, bypassed segmentation, unknown owner, unmanaged configuration, and potential attacker persistence. Students should collect IP address, MAC address, switch port, physical location, connected clients, logs, and ownership information. Correct action includes notifying the right team, isolating if policy permits, reviewing logs, documenting evidence, deciding whether it is approved, and either removing it or bringing it under formal governance.

2. Hospital medical-device discovery:
   Strong answers should prioritize passive discovery, DHCP/DNS records, switch/router records, vendor documentation, maintenance windows, clinical engineering input, and carefully approved authenticated or platform-based sources. Students should explain that aggressive scanning may disrupt patient-care equipment. A good response balances safety and visibility by using controlled scope, approvals, test windows, vendor guidance, and evidence documentation.

## Short Answer Guidance

1. Asset discovery is the process of identifying systems, applications, accounts, services, cloud resources, data stores, and other technology assets in an environment. It matters because patching, monitoring, incident response, vulnerability management, compliance, and access control depend on accurate scope.

2. Discovery finds assets. Inventory records details such as owner, type, criticality, location, controls, and lifecycle state. Asset management governs assets over time through onboarding, patching, monitoring, review, and retirement.

3. Valid fields include asset name, asset type, unique ID, owner, location, business purpose, criticality, data classification, operating system/platform, open services, security controls, patch status, backup status, last seen date, and lifecycle status. Students should explain the decision value of each field.

4. External attack surface includes assets or services reachable from outside the organization, such as websites, VPN portals, public APIs, and cloud storage. Internal attack surface includes assets or services reachable from inside the network after a user, endpoint, or account is compromised, such as file shares, domain controllers, databases, and admin interfaces.

5. Poor discovery weakens incident response because analysts may not know ownership, business impact, normal behavior, available logs, or containment consequences. It weakens vulnerability management because unknown systems may not be scanned, patched, prioritized, or assigned to owners.

## Grading Note

High-scoring students should show practical problem-solving: confirm facts, protect evidence, respect authorization, identify ownership, assess business impact, recommend controls, and communicate clearly. Weak answers usually focus only on running a tool without explaining visibility, risk, or decision-making.
