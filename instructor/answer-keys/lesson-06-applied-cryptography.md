# Instructor Answer Key - Lesson 6: Applied Cryptography

Do not distribute this file before the assessment closes. Accept defensible scenario and theory answers when students support their reasoning with accurate security concepts, evidence, and business context.

### Answer Key

1. **B.** SPF evaluates whether the sending IP is authorized for the SMTP envelope domain.
2. **A.** DKIM verification uses the public key published for the signing domain and selector.
3. **B.** DMARC passes when aligned SPF or aligned DKIM passes.
4. **C.** `p=reject` requests rejection of messages that fail DMARC evaluation.
5. **B.** HTTPS is HTTP protected by TLS; it does not guarantee safe application logic.
6. **B.** A missing intermediate can prevent some clients from constructing a valid trust chain.
7. **B.** Confirmed key exposure requires revocation, replacement, deployment, and investigation.
8. **A.** Loss of the sole decryption key makes protected data unavailable to authorized users.
9. **B.** Monitoring reveals legitimate senders and alignment problems before enforcement.
10. **B.** Certificate renewal is performed through an operational process.

Scenario responses should connect technical failure to business impact, ownership, containment, recovery, and long-term improvement.
