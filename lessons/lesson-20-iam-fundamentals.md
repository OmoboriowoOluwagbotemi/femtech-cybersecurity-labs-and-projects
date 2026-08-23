# Lesson 20: IAM Fundamentals

## Lesson Overview

Identity and Access Management (IAM) governs how human and non-human identities are created, authenticated, authorized, monitored, changed, and retired. Active Directory is one identity platform; enterprise IAM spans directories, cloud platforms, SaaS applications, databases, infrastructure, APIs, devices, and privileged-access systems.

This lesson covers role-based access control (RBAC), least privilege, privileged access management (PAM), account lifecycle management, and privileged-account protection.

## Learning Objectives

Students will be able to:

- Explain IAM, identity governance, authentication, authorization, and accountability.
- Design and evaluate RBAC.
- Apply least privilege to human and workload identities.
- Explain PAM vaulting, rotation, elevation, approval, brokering, and monitoring.
- Build joiner, mover, and leaver lifecycle processes.
- Protect administrative, service, emergency, and shared identities.
- Conduct access reviews and identify privilege creep.
- Investigate identity and privilege events across hybrid environments.

## Prerequisite Knowledge

Students should understand authentication factors, tokens, credential security, Windows SIDs and tokens, Active Directory users, groups, delegation, Kerberos, trusts, and Group Policy from Lessons 5, 17, and 19.

## Enterprise Relevance

IAM determines who can:

- Access payroll.
- Read patient records.
- administer cloud subscriptions.
- Change firewall rules.
- Deploy application code.
- Reset passwords.
- Export customer data.
- Manage domain controllers.

Many security incidents use valid credentials and excessive authorization rather than software exploitation.

## 1. Identity and Access Management

### What

IAM is the combination of governance, processes, technologies, and controls used to manage identities and access.

### Why

Organizations need the right identities to receive the right access for the right purpose and duration.

### How

IAM connects:

- Authoritative identity sources.
- Directories and identity providers.
- Authentication methods.
- Authorization models.
- Provisioning and deprovisioning.
- Access requests and approvals.
- Privileged access.
- Logging, review, and certification.

### Where

IAM applies to on-premises, cloud, SaaS, applications, networks, databases, endpoints, APIs, physical access, and machine identities.

## 2. Identity Governance and Administration

Identity governance defines:

- Who owns an identity.
- Who approves access.
- Which roles exist.
- Which conflicts are prohibited.
- How access is reviewed.
- How exceptions expire.
- Which evidence proves compliance.

Administration executes lifecycle changes and integrates target systems.

IAM is not only an IT account-creation function. Business owners must define appropriate access.

## 3. Authentication and Authorization

Authentication verifies identity. Authorization determines allowed actions.

Example:

1. An analyst authenticates with a passkey.
2. The identity provider issues a token.
3. The SIEM validates the token.
4. Role and policy grant query access.
5. Sensitive rule deletion remains prohibited.
6. Activity is logged.

Strong MFA cannot correct excessive authorization.

## 4. Authorization Models

| Model | Decision Basis | Example |
|---|---|---|
| RBAC | Assigned role | SOC Tier 1 can triage alerts |
| ABAC | Attributes and policy | Managed device and approved location required |
| Rule-based | Explicit system rules | Firewall allows approved subnet |
| Discretionary | Resource owner controls access | File owner grants another user access |
| Mandatory | Centrally enforced labels and policy | Classified data access by clearance |

Enterprises often combine models.

## 5. Role-Based Access Control

### What

RBAC assigns permissions to roles and users to appropriate roles.

### Why

It reduces direct user entitlements and aligns access with job functions.

### How

```text
User -> Business Role -> Technical Entitlements -> Resources
```

### Where

RBAC appears in Active Directory groups, cloud roles, databases, SaaS applications, SIEM platforms, and business systems.

## 6. RBAC Design

1. Identify business functions.
2. Inventory permissions and resources.
3. Define role purpose and owner.
4. Assign minimum entitlements.
5. Define eligibility and approval.
6. Test normal and prohibited actions.
7. Review conflicts.
8. Monitor assignments and use.
9. retire unused roles.

### Role Types

- Business role: job function such as Accounts Payable Clerk.
- Technical role: platform permission bundle such as Storage Reader.
- Privileged role: administrative capability.
- Emergency role: temporary crisis access.

## 7. Role Engineering Risks

- **Role explosion:** too many highly specific roles.
- **Over-broad role:** one role grants unrelated privileges.
- **Privilege creep:** access accumulates through job changes.
- **Toxic combination:** separately reasonable roles create fraud or control bypass.
- **Orphan role:** no owner or business purpose.
- **Direct assignment:** bypasses governed role model.

RBAC should not force every exceptional need into a permanent role.

## 8. Separation of Duties

### What

Separation of duties divides sensitive processes among multiple people or roles.

### Why

It reduces fraud, error, and unilateral abuse.

### How

Examples:

- Requester cannot approve own access.
- Payment creator cannot release payment.
- Developer cannot directly approve production deployment.
- PAM administrator cannot freely use every vaulted credential.

### Where

Apply to finance, identity administration, cloud, code deployment, key management, audit, and security operations.

Small teams may require compensating controls such as independent review, stronger logging, transaction limits, and retrospective approval.

## 9. Least Privilege

### What

Least privilege grants only the access necessary for an approved task, scope, and duration.

### Why

It limits errors, misuse, malware impact, and lateral movement.

### How

Apply least privilege across:

- Permissions.
- Resource scope.
- Time.
- Network location.
- device trust.
- command or action.
- data set.

### Where

It applies to users, administrators, service accounts, applications, scripts, APIs, databases, and cloud workloads.

## 10. Least Privilege Is Dynamic

A person may need elevated access for one hour to resolve an incident, not permanent membership in an administrator group.

Dynamic controls include:

- Just-in-time access.
- Just-enough administration.
- Time-bound roles.
- Approval workflows.
- Conditional access.
- Session brokering.
- Attribute-based restrictions.

Least privilege must preserve operational capability. Access that is too restrictive may cause unsafe workarounds or service delay.

## 11. Privileged Access

Privileged access can:

- Change security controls.
- Manage identities.
- Access sensitive data.
- Deploy code.
- Alter logs.
- Control infrastructure.
- Assume other roles.

Privilege is broader than "administrator" labels. A user who can edit a startup script executed by root or reset an administrator password has indirect privilege.

## 12. Privileged Access Management

### What

PAM is the governance and technology used to control, protect, monitor, and audit privileged access.

### Why

Privileged credentials and sessions have high impact and attract attackers.

### How

PAM capabilities may include:

- Credential vaulting.
- Automatic rotation.
- Access request and approval.
- Session brokering.
- Session recording.
- Just-in-time elevation.
- Command restriction.
- Discovery of privileged accounts.
- Check-out and check-in.
- Analytics and alerting.

### Where

PAM protects operating systems, Active Directory, databases, network devices, cloud roles, applications, secrets, and emergency accounts.

## 13. PAM Architecture

| Component | Purpose |
|---|---|
| Vault | Protect credentials and secrets |
| Discovery | Find privileged identities and credentials |
| Rotation engine | Change managed secrets |
| Session proxy | Broker access without revealing credentials |
| Approval workflow | Validate business need |
| Recorder | Capture session evidence |
| Analytics | Detect unusual privilege use |

The PAM platform becomes critical infrastructure. It requires HA, strong administration, backups, monitoring, and emergency recovery.

## 14. Credential Vaulting

Vaulting protects passwords, keys, and secrets through encryption, access control, audit, and rotation.

Security requirements:

- Do not reveal a secret when brokering is possible.
- Separate vault administration from secret use.
- Rotate after use or exposure according to design.
- Prevent secrets in scripts and tickets.
- Monitor export.
- Protect recovery keys.
- Test vault recovery.

Vaulting does not reduce privilege automatically; it controls access to the credential.

## 15. Session Management

PAM may:

- Launch RDP, SSH, database, or web sessions.
- Inject credentials.
- Record commands or video.
- Restrict transfer and clipboard.
- Terminate sessions.

Session recording creates sensitive evidence. Define access, retention, privacy, integrity, and investigation procedures.

Recording is detective and accountability support; it does not prevent every harmful action.

## 16. Account Lifecycle Management

### What

Account lifecycle management controls identities from creation through retirement.

### Why

Uncontrolled accounts become orphaned, excessive, stale, or exploitable.

### How

The lifecycle includes:

1. Authoritative identity event.
2. Approval.
3. Provisioning.
4. Authentication enrollment.
5. Access assignment.
6. Monitoring and review.
7. Modification.
8. Suspension or disablement.
9. Deprovisioning.
10. Record retention.

### Where

Lifecycle applies to employees, contractors, students, vendors, customers, services, devices, and workloads.

## 17. Joiner Process

Required controls:

- Verify identity and employment or relationship.
- Use a unique identifier.
- Assign baseline access from an approved role.
- Require owner approval for sensitive access.
- Enroll secure authentication.
- Communicate acceptable use.
- Record evidence.
- Avoid copying all access from another user without review.

## 18. Mover Process

Job or responsibility changes can create privilege creep.

Mover workflow:

1. Identify new role.
2. Compare current and required access.
3. Remove access no longer needed.
4. Add approved access.
5. Check separation-of-duties conflicts.
6. Review privileged eligibility.
7. Validate with old and new owners.

Adding new access without removing old access is a common failure.

## 19. Leaver Process

Offboarding may require:

- Disable interactive accounts.
- Revoke sessions and tokens.
- Remove MFA devices and passkeys.
- Revoke certificates and keys.
- Remove group and role assignments.
- Disable VPN and remote access.
- Transfer data ownership.
- Rotate shared or exposed secrets.
- Disable service identities associated with the person.
- Preserve evidence for high-risk departures.

Timing depends on risk and employment process. Involuntary departure may require coordinated immediate action.

## 20. Non-Human Identity Lifecycle

Service, application, API, device, and workload identities require:

- Named owner.
- Defined purpose.
- Least privilege.
- Non-interactive restrictions.
- Managed credential or key.
- Rotation.
- Expiration or review date.
- Usage monitoring.
- Decommissioning with the workload.

Workload identities often outnumber human accounts and can become long-lived blind spots.

## 21. Access Requests

A sound request records:

- Requester.
- Beneficiary.
- resource.
- Role or entitlement.
- Business justification.
- Duration.
- Risk.
- Data or system owner.
- Required approvers.
- Separation-of-duties result.

Approval does not prove correct implementation. Provisioning and later removal must be validated.

## 22. Access Reviews

### What

An access review asks accountable owners to confirm whether identities still require access.

### Why

Roles, relationships, and risk change over time.

### How

Provide reviewers with:

- Identity.
- Access.
- Source of assignment.
- Last use.
- Risk and privilege.
- Manager and owner.
- Prior decisions.

### Where

Reviews cover privileged groups, applications, cloud roles, shared files, service accounts, and third parties.

### Review Quality

Avoid "rubber-stamp" reviews. Use:

- Focused scope.
- Plain-language entitlement descriptions.
- Escalation for non-response.
- Evidence of removal.
- Independent review of high privilege.
- Metrics for revoked access and overdue decisions.

## 23. Privileged Account Types

| Type | Example | Protection |
|---|---|---|
| Named admin | Individual administrator account | MFA, separate account, PAW, JIT |
| Shared emergency | Break-glass account | Vault, dual control, monitoring, test |
| Service account | Application identity | Managed secret, no interactive logon |
| Built-in account | Platform-provided administrator | Restrict, rename only as minor obscurity, monitor |
| Cloud role | Subscription administrator | Time-bound activation and conditional access |
| Vendor account | Third-party support | Sponsor, expiry, limited window, monitoring |

## 24. Privileged Account Protection

- Separate standard and administrative accounts.
- Use phishing-resistant MFA.
- Use privileged access workstations.
- Prohibit privileged logon to lower-trust endpoints.
- Apply JIT and approval.
- Restrict source networks and devices.
- Use PAM brokering.
- Monitor privilege assignment and use.
- Protect recovery.
- Review memberships frequently.
- Alert on dormant privileged use.

## 25. Emergency Access

Break-glass identities support recovery when normal IAM controls fail.

Requirements:

- Exclude from the same failure mode where justified.
- Strong protected credentials.
- Minimal number.
- No routine use.
- Continuous alerting.
- Tested sign-in.
- Documented authorization.
- Post-use rotation and review.

An emergency account that is never tested may not work during an emergency.

## 26. Shared Accounts

Shared accounts weaken accountability because activity cannot be reliably attributed to one person.

Prefer:

- Named identities.
- Role assignment.
- PAM credential injection.
- Session recording.

If unavoidable, apply owner, vaulting, rotation, approval, logging, and narrow scope.

## 27. Cloud and Hybrid IAM

Cloud IAM introduces:

- Tenant-wide roles.
- Resource scopes.
- service principals.
- Managed identities.
- API tokens.
- federation.
- Conditional access.
- Cross-tenant and guest access.

Hybrid risks include:

- Privilege synchronization.
- Stale cloud sessions after on-premises disablement.
- Misaligned lifecycle.
- Excessive application consent.
- On-premises compromise reaching cloud.
- Cloud compromise reaching synchronized identity.

Treat synchronization and federation services as privileged control-plane systems.

## 28. IAM Logging and Detection

Collect:

- Successful and failed authentication.
- MFA registration and reset.
- Role assignment and activation.
- Group membership change.
- Access request and approval.
- Token and session revocation.
- PAM checkout and session.
- Service-account use.
- Application consent.
- Account disablement and deletion.

Detection ideas:

- Privileged role assigned outside process.
- Dormant administrator becomes active.
- Service account logs on interactively.
- MFA method added before privilege use.
- Break-glass account used.
- Privilege activated from unmanaged device.
- Access retained after termination.

## 29. Enterprise Scenarios

### Small Business

One IT administrator uses a shared domain and cloud admin account. The business introduces named admin accounts, MFA, vaulting, emergency access, and independent owner review.

### Financial Institution

A trader requests payment approval access, creating a toxic combination. IAM policy blocks the role combination and routes the exception to risk and compliance.

### Healthcare Organization

A nurse moves to another department but retains access to prior patient records. A mover process removes old role entitlements and validates minimum necessary access.

### Educational Institution

Temporary lecturers remain active after semester end. Expiring affiliations and automated deprovisioning reduce stale accounts.

### Government Agency

A vendor receives privileged access for maintenance. Access is sponsored, time-bound, brokered through PAM, recorded, and automatically removed.

### Cloud Environment

A managed identity receives subscription-wide owner instead of one storage read role. The cloud team narrows scope and monitors prior actions.

## 30. IAM Troubleshooting

When access fails:

1. Confirm identity and authentication.
2. Confirm account state.
3. Identify intended entitlement.
4. Trace direct and inherited assignments.
5. Check role activation and expiry.
6. Check conditional and device policy.
7. Check token issuance time and cached session.
8. Check resource-side authorization.
9. Check separation-of-duties denial.
10. Apply the smallest approved correction.

Do not grant broad administrator access merely to test an access problem.

## 31. IAM Metrics

Useful measures:

- Provisioning and deprovisioning time.
- Orphan accounts.
- Stale privileged accounts.
- Access-review completion and revocation.
- Direct versus role-based assignments.
- Privileged activation duration.
- Service accounts with expired owners.
- MFA and phishing-resistant coverage.
- Emergency-account test status.
- Unresolved separation-of-duties conflicts.

Metrics require context and should drive correction, not only reporting.

## 32. Security+ SY0-701 Alignment

This lesson supports RBAC, least privilege, identity lifecycle, PAM, privileged accounts, MFA, conditional access, separation of duties, account review, and Zero Trust principles.

RBAC enforcement, PAM vaults, and conditional access are technical controls. Provisioning, review, approval, and offboarding are operational controls. IAM standards and separation-of-duties policy are managerial controls and directive in function.

## 33. Classroom Hands-On Practical

### Practical Title

Design and Audit Enterprise Access

### Scenario

A fictional company has:

- Finance, HR, IT, and SOC teams.
- On-premises Active Directory.
- Microsoft 365.
- Cloud storage.
- Payroll SaaS.
- A PAM platform.

Current findings:

- Users receive access copied from coworkers.
- Movers retain old groups.
- Three shared administrator accounts exist.
- Service accounts have no owners.
- Vendors never expire.
- Break-glass accounts are untested.

### Tasks

1. Define five business roles.
2. Map each role to technical entitlements.
3. Identify three toxic combinations.
4. Design joiner, mover, and leaver workflows.
5. Replace shared admin use with a PAM design.
6. Define service-account ownership and credential controls.
7. Design a quarterly privileged review.
8. Define ten IAM alerts.
9. Classify controls by category and function.

### Access Matrix

| Role | Resource | Read | Modify | Approve | Admin | Duration |
|---|---|---:|---:|---:|---:|---|
|  |  |  |  |  |  |  |

### Instructor Checks

- Roles represent job functions.
- Access is scoped and time-bound.
- Approval and provisioning are separate.
- Movers remove old access.
- Emergency access remains usable and monitored.
- Direct assignments are exceptions.

## 34. Take-Home Practical

Create an IAM program for one organization. Include:

- Authoritative identity source.
- Human and non-human identity types.
- RBAC and ABAC use.
- Least-privilege rules.
- Separation-of-duties matrix.
- PAM architecture.
- Joiner, mover, and leaver workflows.
- Privileged and emergency-account controls.
- Access-review process.
- Logging, metrics, and incident response.

## 35. Assessment Questions

### Multiple Choice

1. What does RBAC assign permissions to?
   A. Roles
   B. Random addresses
   C. Event IDs
   D. DNS zones

2. What is privilege creep?
   A. Accumulation of access no longer required
   B. Strong MFA
   C. Removal of stale access
   D. Secure vault rotation

3. What is a toxic combination?
   A. Multiple entitlements that create unacceptable conflict or power
   B. Two approved DNS records
   C. A valid certificate chain
   D. A backup copy

4. What does just-in-time access provide?
   A. Privilege for a limited approved period
   B. Permanent administrator membership
   C. Anonymous access
   D. Password reuse

5. What does PAM credential brokering reduce?
   A. Need to reveal the privileged secret to the user
   B. Need for auditing
   C. Need for authorization
   D. Need for recovery

6. Which lifecycle stage most directly addresses job changes?
   A. Mover
   B. Joiner
   C. Backup
   D. DNS recursion

7. Why are service accounts risky?
   A. They may be long-lived, overprivileged, and poorly owned
   B. They always use MFA
   C. They cannot access resources
   D. They automatically expire

8. What should happen after emergency-account use?
   A. Review and rotate according to procedure
   B. Hide the logs
   C. Make it a daily account
   D. Disable monitoring

9. What improves access-review quality?
   A. Clear entitlement context and verified removal
   B. Automatic approval of every item
   C. No owner
   D. Review only usernames

10. Which is an operational control?
    A. Joiner-mover-leaver procedure
    B. RBAC engine
    C. PAM vault encryption
    D. Conditional-access rule

### Short Answer

1. Explain IAM and identity governance.
2. Compare RBAC and ABAC.
3. Describe role explosion, privilege creep, and toxic combinations.
4. Explain least privilege across scope and time.
5. List PAM capabilities and limitations.
6. Describe joiner, mover, and leaver controls.
7. Explain non-human identity lifecycle.
8. Describe privileged and emergency-account protection.

### Scenario Questions

1. A transferred employee retains finance and HR access. Describe remediation and process correction.
2. A service account logs on interactively from a workstation. Describe investigation.
3. A cloud administrator role is activated from an unmanaged device. Describe response.
4. A PAM vault is unavailable during an incident. Explain resilience and emergency access.
5. A terminated vendor still has active sessions and API keys. Describe full deprovisioning.

## 36. Glossary

| Term | Definition |
|---|---|
| Access Review | Periodic confirmation that identities still require assigned access. |
| ABAC | Authorization based on attributes and policy. |
| Break-Glass Account | Protected emergency identity used when normal controls fail. |
| IAM | Governance, processes, and technologies managing identities and access. |
| JIT Access | Time-bound privilege granted when required. |
| Least Privilege | Minimum access required for approved scope, task, and duration. |
| PAM | Controls protecting, brokering, monitoring, and auditing privileged access. |
| Privilege Creep | Accumulation of access no longer required. |
| RBAC | Authorization model assigning permissions through roles. |
| Separation of Duties | Division of sensitive process authority among multiple identities. |
| Toxic Combination | Combined access creating unacceptable conflict or power. |
| Workload Identity | Non-human identity used by software or infrastructure. |

## 37. Lesson Review Checklist

- I can design and assess RBAC.
- I can apply least privilege across scope and time.
- I can explain PAM architecture and limitations.
- I can design joiner, mover, and leaver controls.
- I can protect human and non-human privileged identities.
- I can conduct meaningful access reviews.
- I can identify indirect and hybrid privilege.

## 38. Continuity With Future Lessons

Lesson 21 applies identity and least privilege to endpoint security through Microsoft Defender, BitLocker, EDR, patch management, and endpoint hardening.

Students should retain:

- Strong authentication does not correct excessive authorization.
- Privilege includes indirect control paths.
- Lifecycle must remove tokens, keys, sessions, and application access.
- PAM is critical infrastructure requiring its own protection and recovery.
