# Instructor Answer Key - Lesson 39: Integration Review

Do not distribute this file before the assessment closes. Accept defensible scenario and theory answers when students support their reasoning with accurate security concepts, evidence, and business context.

## 32. Answer Key

1. **B.** Architecture security exists to protect business services, data, and users; technology review follows that context.
2. **B.** Identity, ownership, and privilege assumptions change when vendor access reaches an internal management resource.
3. **B.** Zero Trust evaluates identity, device, resource, context, policy, and risk rather than trusting location alone.
4. **A.** The tools produce relevant risk information, but the access decision does not consume it.
5. **A.** End-to-end testing proves whether the detection chain works in practice.
6. **B.** One credential or directory compromise can defeat both production and recovery.
7. **C.** It identifies scope, observed condition, and operational consequence.
8. **C.** Organizational risk depends on connected conditions and business context, not one technical value.
9. **A.** Reviewing a data flow requires source, destination, identity, protocol, data sensitivity, controls, and logging.
10. **A.** A compensating control is an alternative safeguard used when the preferred control cannot currently be implemented.

Short-answer guidance:

1. Any six of: source, destination, protocol, identity, authentication, authorization, encryption, certificate validation, data classification, input validation, logging, failure behavior, and owner.
2. GPOs can be filtered, overridden, blocked, conflicted, delayed, or fail to apply. Effective-result evidence confirms the endpoint's actual state.
3. A coverage gap leaves part of the required population or environment outside the control. An operating gap occurs when a correctly designed control fails to run or produce the required result.
4. Surround it with controls: isolate it, permit only necessary flows, restrict and monitor administrative access, use passive monitoring, manage exceptions, and plan replacement. Do not force an unsupported control that threatens patient safety.
5. Backup and recovery must be reviewed separately because production compromise can also affect backup consoles, credentials, storage, and restore processes. Strong recovery requires independent access, immutable or offline copies where appropriate, tested restores, monitoring, and documented emergency procedures.

Scenario guidance:

13. MFA reduces credential-only attacks but does not establish device trust or least privilege. Personal devices increase malware and evidence risk; broad VPN access enables lateral movement; standing Domain Admin magnifies compromise; shared production and backup administration threatens recovery. Phase improvements by first monitoring and restricting source paths, separating backup credentials, and removing unnecessary standing privilege. Then deploy managed privileged workstations, PAM with time-bound roles, a bastion, resource-specific access, device-compliance decisions, segmented management networks, and correlated logs. Test emergency access and domain-compromise recovery.

14. Strong answers should identify that cloud administrator activity is a central visibility gap because privilege changes, resource exposure, and destructive actions may not be detected or investigated. Backup dependence on the production identity provider creates a shared failure mode during identity compromise or ransomware. Improvements include exporting cloud control-plane logs to the SIEM, alerting on privileged role changes, separating recovery identities, protecting backup administration with independent credentials and MFA, using immutable or offline backup options, testing restores, documenting emergency access, and reviewing the design as an integrated attack path.
