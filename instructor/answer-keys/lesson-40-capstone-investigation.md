# Instructor Answer Key - Lesson 40: Capstone Investigation

Do not distribute this file before the assessment closes. Accept defensible scenario and theory answers when students support their reasoning with accurate security concepts, evidence, and business context.

## 39. Answer Key

1. **B.** Triage verifies whether the alert and entities are reliable and establishes proportionate action.
2. **B.** TLS metadata proves a connection and encrypted exchange, not the meaning or content of transferred bytes.
3. **B.** A logon-triggered scheduled task is a mechanism intended to execute again.
4. **A.** Password reset may not invalidate every active token or session, so revocation is required.
5. **C.** The evidence supports neither successful clinical access nor confirmed external transfer of the finance file.
6. **B.** Intelligence enriches evidence but must retain provenance, confidence, and uncertainty.
7. **B.** Trusted-channel verification directly reduces the business email and payment-diversion risk.
8. **B.** Accurate mapping requires a demonstrated match to technique scope and procedure.
9. Any six of: other hosts contacting domain/IP, other message recipients, hash prevalence, process-pattern search, task-name search, file-path search, mailbox-rule search, Entra sign-ins, token or consent changes, SMB access, domain authentication, proxy volume, and historical DNS.
10. Reimaging can destroy memory, process, persistence, and contextual evidence needed to determine scope and method. Preserve necessary evidence first while using EDR isolation to limit harm.
11. High factors include confirmed malicious execution, persistence, finance-user trust, supplier banking-data access, mailbox manipulation, and external communication. Severity increases with confirmed payment fraud, data exfiltration, clinical impact, privileged compromise, destructive activity, or widespread execution.
12. The malicious domain, IP, hash, task name, and path are IOCs associated with a compromise. Word spawning hidden encoded PowerShell followed by download and persistence is an IOA describing attacker behavior.
13. Treat the second endpoint as a likely affected asset requiring rapid isolation or equivalent network containment under procedure. Preserve DNS, firewall, proxy, Windows, memory, email, and local artifacts because EDR history is unavailable; verify sensor failure and collect safely. Search recipients and related hosts, review identity and file access, and increase severity if execution, spread, or broader finance targeting is confirmed. The missing sensor is both an evidence limitation and endpoint-control coverage/health gap requiring fleet-wide validation and alerting for stale sensors.
