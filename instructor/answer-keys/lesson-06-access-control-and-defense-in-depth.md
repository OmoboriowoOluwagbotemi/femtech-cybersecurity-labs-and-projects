# Instructor Answer Key - Lesson 6: Access Control and Defense in Depth

Do not distribute this file before the assessment closes. Accept defensible scenario and short-answer responses when students support their reasoning with accurate security concepts, evidence, and business context.

## Multiple Choice Answer Key

1. **B.** Authorization decides whether a subject is allowed to perform a requested action on a resource.
2. **B.** RBAC assigns permissions based on job roles such as Finance, HR, Helpdesk, or SOC Analyst.
3. **B.** Least privilege gives users only the access required for approved work.
4. **B.** A domain administrator account is privileged because it can administer many domain resources.
5. **C.** Operational is a Security+ SY0-701 control category.
6. **D.** Directive is a Security+ SY0-701 control function.
7. **B.** Defense in depth uses layered controls so one failed safeguard does not expose the entire organization.
8. **A.** A SIEM alert is detective because it identifies suspicious activity.
9. **B.** Role creep occurs when users retain old permissions after job changes.
10. **C.** A firewall restriction can compensate when the preferred control, such as patching a legacy system, cannot be implemented immediately.

## Short Answer Guidance

1. Identification is the claimed identity, authentication proves the identity, authorization decides permitted actions, and accounting records activity.
2. A successful login proves only that authentication succeeded. Authorization must still check whether the user, device, role, data sensitivity, and business context allow the requested action.
3. DAC lets owners or administrators grant access; MAC uses central labels and policy; RBAC uses job roles; rule-based access uses explicit conditions such as time or network; ABAC uses attributes such as department, device compliance, location, and risk.
4. Least privilege means giving only required access. Windows example: remove ordinary users from Local Administrators. Linux example: restrict `sudo` to required commands. Cloud example: scope an IAM role to one storage bucket instead of all buckets.
5. A strong defense-in-depth answer should include several layers, such as MFA and RBAC at the identity layer, EDR and patching at the endpoint layer, firewall rules and segmentation at the network layer, server-side authorization at the application layer, encryption and DLP at the data layer, SIEM monitoring at the detection layer, and incident response playbooks at the response layer.

## Scenario Guidance

### Scenario 1: Finance Employee Moved to Operations

Strong answers should identify role creep, excessive access, weak joiner-mover-leaver process, lack of access review, and excessive approval rights. Business risks include payroll exposure, fraudulent payment approval, unauthorized VPN access, regulatory exposure, and loss of trust.

Immediate containment should include disabling or restricting the compromised account, revoking sessions and tokens, resetting credentials, reviewing MFA activity, checking mailbox rules, reviewing VPN logs, checking payment-system activity, removing unnecessary permissions, and preserving evidence.

Defense-in-depth improvements should include HR-driven role updates, manager and data-owner approval, RBAC groups, separation of duties for payments, MFA, Conditional Access, privileged access management where applicable, SIEM alerts for privilege changes, quarterly access reviews, and documented exceptions with expiration dates.

### Scenario 2: Healthcare Linux Patient Reports

Strong answers should connect world-readable patient reports to confidentiality risk, weak SSH password login to unauthorized access risk, missing log review to poor detection, and backups stored on the same server to availability and ransomware recovery risk.

Recommended controls should include restricted Linux ownership and group permissions, ACL review, SSH hardening, MFA or key-based administration where practical, least-privilege service accounts, AppArmor or SELinux where supported, UFW or network firewall restriction, audit logging, Wazuh or SIEM log forwarding, tested offline or separate backups, access reviews, incident response procedures, and management-approved policy.

Accept answers that are practical for a small IT team and clearly distinguish remediation, mitigation, and remaining risk.
