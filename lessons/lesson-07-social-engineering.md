# Lesson 7: Social Engineering

## Lesson Overview

Social engineering is the manipulation of people into revealing information, transferring value, granting access, or performing an unsafe action. Attackers exploit trust, authority, urgency, fear, curiosity, helpfulness, and normal business processes.

This lesson covers phishing, spear phishing, business email compromise (BEC), vishing, pretexting, credential attacks, and email-header analysis. It builds on Lesson 5 identity security and Lesson 6 email authentication. Students will learn that social engineering is an enterprise process risk, not merely a user-awareness problem.

## Learning Objectives

By the end of this lesson, students should be able to:

- Explain what social engineering is and why it succeeds.
- Distinguish phishing, spear phishing, BEC, vishing, and pretexting.
- Identify common psychological and business-process techniques.
- Explain credential phishing, MFA fatigue, credential stuffing, and session theft.
- Analyze email headers using a structured workflow.
- Interpret SPF, DKIM, and DMARC results without overestimating them.
- Identify indicators of compromise and business impact.
- Recommend preventive, detective, and corrective controls.
- Triage and escalate a suspected social-engineering incident.

## Prerequisite Knowledge

Students should understand:

- Risk, controls, defense in depth, and attack surface from Lesson 1.
- Threat actors, malware, the Cyber Kill Chain, and MITRE ATT&CK from Lesson 2.
- SOC and incident-response responsibilities from Lesson 3.
- TLS, signatures, and certificates from Lesson 4.
- MFA, SSO, tokens, passwords, and credential security from Lesson 5.
- SPF, DKIM, DMARC, and email authentication results from Lesson 6.

## Enterprise Relevance

Social engineering can bypass expensive technology by persuading an authorized person to act on the attacker's behalf. It affects:

- Finance teams processing payments.
- Help desks resetting credentials.
- Executives handling confidential information.
- Healthcare staff accessing clinical systems.
- Students and staff using educational portals.
- Government employees handling public records.
- Cloud administrators approving access.
- Vendors participating in supply chains.

Organizations need secure processes, usable reporting, identity protection, monitoring, and practiced response.

## 1. Social Engineering Fundamentals

Social engineering is the use of deception, influence, or manipulation to cause a person to disclose information or perform an action that benefits an attacker.

People must make decisions with incomplete information. Attackers imitate normal communications and exploit business pressure. A message may arrive during a busy period, use a familiar name, and request an action that appears reasonable.

### How

An attacker commonly:

1. Researches a target.
2. Selects a believable identity and communication channel.
3. Creates a pretext.
4. Applies influence.
5. Requests information, payment, access, or execution.
6. Uses the result for further compromise.
7. Conceals or repeats the activity.

### Where

Social engineering occurs through:

- Email.
- Telephone and voice calls.
- SMS and messaging applications.
- Social media.
- Video meetings.
- Physical visits.
- Support portals.
- QR codes.
- Collaboration platforms.

## 2. Influence Techniques

| Technique | Attacker Approach | Defensive Habit |
|---|---|---|
| Authority | Claims to be an executive, regulator, or administrator | Verify through an approved independent channel |
| Urgency | Creates an artificial deadline | Pause and follow normal approval |
| Fear | Threatens account closure or punishment | Contact the service through known details |
| Scarcity | Claims an offer or opportunity is limited | Avoid rushed decisions |
| Familiarity | Uses names, projects, or writing style | Verify identity and request context |
| Reciprocity | Offers help or a reward before requesting action | Evaluate the request independently |
| Curiosity | Uses unexpected documents, news, or images | Avoid opening unverified content |
| Helpfulness | Exploits a desire to assist | Follow identity-verification procedures |
| Social proof | Claims others already approved | Confirm directly with accountable owners |

Influence is not evidence of user weakness. Secure systems anticipate ordinary human behavior and make verification easier than unsafe compliance.

## 3. Phishing

Phishing is a deceptive communication intended to make recipients reveal information, open malicious content, visit a fraudulent service, transfer value, or grant access.

Email and messaging provide low-cost access to many potential targets. Even a small success rate can be profitable.

### How

A phishing message may:

- Link to a credential-harvesting site.
- Deliver malware.
- Request a payment or gift card.
- Ask the user to approve an MFA prompt.
- Present a QR code leading to a fraudulent site.
- Ask for sensitive information.
- Initiate a conversation before making the true request.

### Where

Phishing targets personal and corporate email, Microsoft Teams, SMS, social media, customer portals, and cloud collaboration tools.

### Common Indicators

- Unexpected urgency.
- Mismatched display name and address.
- Lookalike domain.
- Link destination inconsistent with visible text.
- Unexpected attachment.
- Unusual payment instructions.
- Request to bypass normal procedure.
- New reply-to address.
- Language inconsistent with the sender.
- Unexpected MFA prompt.

No single indicator proves maliciousness. Analysts combine technical and contextual evidence.

## 4. Phishing Variants

| Variant | Target or Channel | Example |
|---|---|---|
| Bulk phishing | Large recipient population | Generic account-expiration notice |
| Spear phishing | Selected person or team | Tailored document request to legal staff |
| Whaling | Senior leader or high-value person | Fraudulent board communication to a CFO |
| Smishing | SMS or mobile messaging | Fake package-delivery link |
| Vishing | Voice call | Caller impersonates the bank's fraud team |
| QR phishing | QR code | Code leads to a fraudulent cloud sign-in |
| Angler phishing | Social-media support interaction | Fake support account contacts a complainant |
| Clone phishing | Copy of a legitimate message with altered content | Replacement attachment contains malware |

## 5. Spear Phishing

Spear phishing is targeted phishing tailored to a particular person, role, organization, or business process.

Personalization increases credibility. Public websites, social media, breached data, vendor information, job advertisements, and previous compromises provide useful details.

### How

An attacker may study:

- Reporting relationships.
- Current projects.
- Technology platforms.
- Vendors and customers.
- Travel and event schedules.
- Writing style.
- Approval processes.

The attacker then creates a message that fits expected work.

### Where

Common targets include finance, human resources, administrators, executives, researchers, procurement, and IT support.

### Enterprise Example

A university researcher receives a conference document using the correct event title and collaborator name. The link opens a convincing cloud sign-in page. The message is more dangerous than generic phishing because its context is accurate.

## 6. Business Email Compromise

BEC is fraud or unauthorized activity conducted through impersonated or compromised business communications. It commonly targets payments, payroll, procurement, sensitive data, and account changes.

BEC can produce high financial returns without malware. Attackers exploit normal authority and transaction processes.

### How

Common patterns include:

- Executive impersonation.
- Supplier invoice fraud.
- Payroll direct-deposit change.
- Attorney or regulator impersonation.
- Property or transaction payment diversion.
- Compromised mailbox conversation hijacking.

An attacker with mailbox access may:

- Read business conversations.
- Create forwarding or inbox rules.
- Delete warnings.
- Wait for a payment opportunity.
- Reply within an existing thread.
- Change bank details.

### Where

BEC affects finance, payroll, procurement, real estate, legal services, charities, schools, healthcare, and government contracting.

### BEC Controls

- MFA and phishing-resistant authentication.
- Payment verification through a known independent channel.
- Dual authorization.
- Separation of duties.
- Alerts for mailbox forwarding and suspicious rules.
- Sign-in and audit-log monitoring.
- Supplier change-management procedures.
- Email authentication and filtering.
- Rapid financial escalation.

Email authentication may not stop BEC sent from a genuinely compromised account.

## 7. Vishing

Vishing is voice-based social engineering conducted through telephone calls, voice messages, or voice-enabled platforms.

Voice creates immediacy and social pressure. Caller ID can be spoofed, and realistic personal information can increase credibility.

### How

Attackers may impersonate:

- Help-desk staff.
- Banks.
- Executives.
- Vendors.
- Government agencies.
- Patients, employees, or customers.

They may ask for passwords, one-time codes, remote-access installation, payments, or MFA approval.

### Where

Vishing targets support desks, finance teams, customer service, healthcare reception, and remote workers.

### Defenses

- Never disclose passwords or one-time codes.
- Call back using a trusted directory number.
- Require documented identity verification.
- Apply stronger procedures to password and MFA resets.
- Record and investigate suspicious support interactions.
- Use authorization workflows for financial changes.

## 8. Pretexting

Pretexting is constructing a believable scenario and identity to justify a request.

A plausible story explains why an unusual request appears necessary.

### How

The attacker prepares details, establishes rapport, answers likely questions, and gradually requests more sensitive action.

### Where

Examples include:

- A caller claiming to be a new employee needing urgent access.
- A person claiming to be a technician requesting entry.
- A fake auditor requesting records.
- A vendor requesting changed payment details.
- A supposed executive requesting confidential files.

### Verification

Verify the claimed identity, authority, request, and channel independently. Do not use phone numbers, links, or contacts supplied only by the requester.

## 9. Credential Attacks in Social Engineering

Lesson 5 introduced credential attacks. Social engineering commonly enables:

| Attack | Social-Engineering Connection |
|---|---|
| Credential phishing | Fraudulent sign-in page captures username and password |
| MFA fatigue | Repeated prompts pressure a user to approve |
| Adversary-in-the-middle phishing | Proxy captures credentials and session tokens |
| Help-desk reset abuse | Attacker pretexts as a user and replaces MFA |
| Consent phishing | User is deceived into granting an application permissions |
| Credential stuffing | Breached credentials are tested against other services |
| Password spraying | Common passwords are tested across many accounts |
| Session theft | Malware or phishing captures an authenticated token |

### Credential Incident Response

Changing a password may be insufficient. Responders should consider:

- Session and refresh-token revocation.
- MFA method review.
- Malicious application consent.
- Mailbox rules and forwarding.
- Password-reset activity.
- Endpoint compromise.
- Privileged actions.
- Other accounts using the same password.

## 10. Email Structure

An email contains:

- **Envelope information:** used during SMTP delivery.
- **Headers:** metadata such as routing, sender, recipient, dates, identifiers, and authentication results.
- **Body:** text or HTML content.
- **Attachments:** encoded files or message parts.

The visible mail client may hide much of this information. Analysts inspect raw headers and message source.

## 11. Important Email Headers

| Header | Purpose | Investigation Use |
|---|---|---|
| `From` | Visible author identity | Compare with expected sender and DMARC alignment |
| `Reply-To` | Destination for replies | Detect redirection to another address |
| `Return-Path` | Delivered envelope return address | Review SPF identity and bounce path |
| `Received` | Records transfer between mail servers | Reconstruct route and timing |
| `Date` | Sender-supplied message time | Compare with trusted receipt times |
| `Message-ID` | Message identifier | Correlate related messages and sending infrastructure |
| `Authentication-Results` | Receiver's SPF, DKIM, and DMARC evaluation | Assess domain authentication |
| `DKIM-Signature` | DKIM signature and parameters | Identify signing domain and selector |
| `Received-SPF` | SPF evaluation information | Supporting evidence; trust depends on inserting system |
| `Content-Type` | Message body and attachment format | Identify multipart, HTML, and encoded content |

Header names are case-insensitive. Attackers can add misleading headers, so trust must be based on where a header entered the organization's controlled mail path.

## 12. Received-Header Analysis

Mail servers normally add `Received` headers as the message travels. The newest entry appears at the top, so analysts generally read the chain from bottom to top to reconstruct the route.

However:

- The earliest entries may be sender-controlled.
- Internal infrastructure details may be masked.
- Time zones differ.
- Relays and cloud services can create complex paths.

Analysts identify the first header added by trusted receiving infrastructure and avoid treating older untrusted entries as verified facts.

## 13. Authentication-Result Analysis

### SPF

Check the result, client IP, and envelope domain. SPF pass does not necessarily align with the visible `From` address.

### DKIM

Check the result, signing domain (`d=`), and selector (`s=`). A valid signature proves use of a domain's signing key, not that the message is safe.

### DMARC

Check whether SPF or DKIM passed with alignment to the visible `From` domain. A DMARC pass can occur for a malicious message sent through a compromised legitimate account.

### Decision Table

| Results | Interpretation |
|---|---|
| SPF pass, DKIM pass, DMARC pass | Domain authentication succeeded; content still requires analysis |
| SPF fail, DKIM pass and aligned, DMARC pass | DKIM provides aligned authentication, possibly despite forwarding |
| SPF pass but not aligned, DKIM fail, DMARC fail | Visible sender identity is not authenticated |
| No DMARC policy | Domain has not published usable DMARC policy |
| Authentication pass with suspicious reply-to | Possible authorized-platform abuse or account compromise |

## 14. URL and Attachment Analysis

### URL Review

Analysts inspect:

- Actual destination, not only visible text.
- Registered domain.
- Subdomain structure.
- Misspellings and lookalike characters.
- URL shorteners and redirects.
- Use of raw IP addresses.
- Unexpected ports.
- Encoded or unusually long paths.

Do not open suspicious links on a normal workstation. Use approved analysis systems, secure gateways, or sanitized evidence.

### Attachment Review

Record:

- Filename and actual type.
- Extension mismatches.
- Hash.
- Digital signature.
- Archive or password protection.
- Macro or script content.
- Detection results.

Do not execute suspicious attachments outside an approved isolated environment.

## 15. Structured Email Investigation

1. Preserve the original message and metadata.
2. Record reporter, recipient, and time.
3. Determine the requested action.
4. Compare display identity, `From`, `Reply-To`, and `Return-Path`.
5. Trace trusted `Received` headers.
6. Evaluate SPF, DKIM, and DMARC.
7. Inspect URLs and attachments safely.
8. Search for related messages across the organization.
9. Review identity, endpoint, mailbox, DNS, proxy, and financial evidence.
10. Classify severity and business impact.
11. Contain affected accounts, messages, endpoints, or transactions.
12. Document evidence, decisions, and follow-up.

## 16. Defensive Strategy

### People

- Role-specific awareness.
- Easy reporting mechanisms.
- Supportive reporting culture.
- Finance and help-desk verification training.
- Exercises based on realistic business processes.

### Process

- Independent payment verification.
- Dual authorization.
- Supplier change control.
- Secure password-reset procedure.
- Rapid legal, finance, and security escalation.
- Tested incident playbooks.

### Technology

- Phishing-resistant MFA.
- Email filtering and attachment controls.
- SPF, DKIM, and DMARC.
- Endpoint detection and response.
- URL rewriting or isolation where appropriate.
- Identity risk and mailbox-rule alerts.
- SIEM correlation.
- Domain and brand monitoring.

No single control is sufficient. Defense in depth must reduce both attack likelihood and impact.

## 17. Enterprise Scenarios

### Small Business: Invoice Diversion

A supplier mailbox is compromised. The attacker replies in an existing invoice thread with new banking details. DMARC passes because the message comes from the genuine supplier account. A callback to the supplier's known number prevents payment.

### Bank: Help-Desk Vishing

An attacker uses employee information to request an MFA reset for a privileged user. The help desk pauses the request because the caller cannot satisfy enhanced verification. The attempt is logged and escalated.

### Hospital: Fake Clinical Document

A targeted message claims to contain an urgent patient transfer document. The attachment attempts to execute malicious code. Email controls quarantine the file, and the employee reports the message.

### University: QR Phishing

Posters and messages display a QR code for a fake student portal. Students entering credentials expose their accounts. The university blocks the domain, resets affected accounts, revokes sessions, and communicates through trusted channels.

### Government Agency: Executive Impersonation

A lookalike domain impersonates a director and requests sensitive records. DMARC protects the agency's exact domain but cannot stop registration of the lookalike. Staff verification and domain monitoring identify the attempt.

### Cloud Enterprise: Consent Phishing

A user grants a malicious cloud application access to mail. Password reset alone does not remove the application's authorization. Responders revoke consent, sessions, and tokens and review mailbox activity.

## 18. SOC Triage and Severity

Consider:

- Was a credential entered?
- Was MFA approved?
- Was a token or application consent granted?
- Was malware executed?
- Was money or sensitive data transferred?
- Is the identity privileged?
- Are multiple recipients affected?
- Is an active attacker in a mailbox?
- Can the transaction be stopped?
- Is regulated information involved?

A reported message with no interaction may be low severity but high value for campaign detection. A single successful BEC payment can be critical.

## 19. MITRE ATT&CK Context

Social-engineering activity may relate to ATT&CK techniques involving phishing, valid accounts, user execution, external remote services, account manipulation, and application access tokens.

Analysts map observed behavior only when evidence supports it. ATT&CK mapping improves detection and communication but does not replace incident facts or business-impact assessment.

## 20. Security+ SY0-701 Alignment

This lesson reinforces:

- Social-engineering techniques.
- Phishing variants.
- Impersonation and pretexting.
- Credential attacks.
- MFA attacks.
- Email security.
- Indicators and incident response.
- Security awareness.

Filtering and MFA are technical controls. Verification and incident procedures are operational controls. Awareness policy is managerial and directive in function. A security-awareness instruction is not an operational control merely because employees perform it.

## 21. Classroom Hands-On Practical

### Practical Title

Triage a Suspected Business Email Compromise

### Safety

Use only instructor-provided sanitized headers, fictional domains, and nonfunctional URLs. Do not contact the apparent sender, open links, execute files, or send test phishing messages.

### Scenario

An accounts-payable employee receives a reply in an existing supplier conversation. It requests payment to a new bank account before 14:00.

Sanitized evidence:

```text
From: Billing Team <billing@northwind-payments.example>
Reply-To: urgent-settlement@externalmail.example
Return-Path: bounce@mailer.northwind-payments.example
Authentication-Results: gateway.corp.example;
 spf=pass smtp.mailfrom=mailer.northwind-payments.example;
 dkim=pass header.d=northwind-payments.example;
 dmarc=pass header.from=northwind-payments.example
Subject: RE: Invoice 4821 - Updated Banking Details
```

Additional facts:

- The supplier normally requires a signed bank-change form.
- The email omits the form.
- The reply-to domain is unfamiliar.
- The supplier's known telephone number differs from the number in the message.
- No payment has been made.

### Tasks

1. Identify technical and contextual indicators.
2. Explain why DMARC passes.
3. Explain why a pass does not establish legitimacy.
4. Determine severity and immediate action.
5. List evidence to preserve.
6. Draft a SOC escalation.
7. Recommend controls that would prevent payment diversion.

### Expected Analysis

- SPF and DKIM authenticate infrastructure associated with the visible domain.
- The account or authorized platform may be compromised.
- The unfamiliar reply-to and process deviation require independent verification.
- Finance should pause payment and call the supplier through known contact details.
- Security should preserve the message, search for related mail, and investigate identity and mailbox activity.

### Extension: Header Table

| Evidence | Observation | Meaning | Confidence |
|---|---|---|---|
| DMARC | Pass | Aligned authentication passed | High |
| Reply-To | Different domain | Replies leave supplier domain | High |
| Payment process | Required form absent | Business control bypass attempted | High |

## 22. Take-Home Practical

Create a social-engineering defense and response plan for one organization.

Include:

- Five likely social-engineering scenarios.
- Targeted roles and business processes.
- Technical, managerial, operational, and physical controls.
- Preventive, deterrent, detective, corrective, compensating, and directive functions where appropriate.
- Credential and token containment steps.
- Email-header investigation checklist.
- Finance or help-desk verification workflow.
- Reporting and escalation path.
- Five assessment metrics.

## 23. Assessment Questions

### Multiple Choice

1. What best distinguishes spear phishing?
   A. It uses only SMS.
   B. It is tailored to a selected target.
   C. It cannot contain links.
   D. It always fails DMARC.

2. Which is a common BEC objective?
   A. Improving certificate renewal
   B. Diverting a payment
   C. Encrypting backups for recovery
   D. Applying patches

3. What is vishing?
   A. Voice-based social engineering
   B. A hash collision
   C. Network segmentation
   D. Certificate signing

4. Which header commonly controls where a reply is sent?
   A. `Reply-To`
   B. `Content-Length`
   C. `Expires`
   D. `Host`

5. Why can a malicious email pass DMARC?
   A. DMARC scans every attachment.
   B. A compromised legitimate account can send authenticated email.
   C. DMARC blocks all authorized senders.
   D. DMARC replaces identity security.

6. In which direction are `Received` headers generally read to reconstruct delivery?
   A. Top to bottom
   B. Bottom to top
   C. Alphabetically
   D. They are never useful

7. Which response is appropriate after credential phishing and suspected token theft?
   A. Reset the password only
   B. Revoke sessions and investigate account and endpoint activity
   C. Delete the report
   D. Approve another MFA prompt

8. What is pretexting?
   A. Constructing a believable scenario to justify a request
   B. Encrypting a message body
   C. Scanning a network
   D. Renewing a certificate

9. Which is strongest for payment-change verification?
   A. Reply to the requesting email
   B. Call a number in the message
   C. Use a known independent supplier contact
   D. Trust the display name

10. Which control function instructs employees to follow required verification?
    A. Detective
    B. Corrective
    C. Directive
    D. Compensating

### Short Answer

1. Explain how phishing differs from spear phishing.
2. Describe three BEC patterns.
3. Explain two vishing defenses.
4. Why should analysts identify the first trusted `Received` header?
5. Distinguish `From`, `Reply-To`, and `Return-Path`.
6. Explain why password reset may be insufficient after account compromise.
7. List five questions used to assess social-engineering severity.
8. Describe one technical and one operational defense against invoice fraud.

### Scenario Questions

1. A user approves repeated MFA prompts and a foreign mailbox login follows. Describe containment and investigation.
2. A hospital employee opens an urgent attachment that launches a script. Identify likely evidence and immediate response.
3. A help-desk caller knows an employee's ID and manager name. Explain why this is insufficient verification.
4. An email has aligned SPF and DKIM but requests an unusual confidential-data transfer. Explain the analyst's next steps.

## 24. Glossary

| Term | Definition |
|---|---|
| Angler Phishing | Social engineering through fake support identities on social media. |
| Business Email Compromise (BEC) | Fraud or unauthorized activity using impersonated or compromised business communications. |
| Clone Phishing | A copied legitimate message altered to include malicious content. |
| Consent Phishing | Deception that persuades a user to authorize a malicious application. |
| Credential Phishing | Theft of authentication information through a deceptive interface or request. |
| Display-Name Impersonation | Use of a trusted name while sending from another address. |
| Email Header | Metadata describing message identity, routing, authentication, and format. |
| Impersonation | Pretending to be another person or organization. |
| Pretexting | Use of a constructed scenario to justify a deceptive request. |
| QR Phishing | Phishing that uses a QR code to direct victims to malicious content. |
| Smishing | Social engineering through SMS or mobile messaging. |
| Social Engineering | Manipulation intended to make a person reveal information or perform an unsafe action. |
| Spear Phishing | Phishing tailored to a selected person, role, or organization. |
| Vishing | Voice-based social engineering. |
| Whaling | Targeted phishing aimed at senior or high-value individuals. |

## 25. Lesson Review Checklist

Students should be able to confirm:

- I can distinguish major social-engineering methods.
- I can identify influence techniques without blaming users.
- I can explain BEC and its business-process risks.
- I can identify credential and token threats.
- I can interpret important email headers.
- I can evaluate SPF, DKIM, and DMARC evidence correctly.
- I can analyze URLs and attachments safely.
- I can triage, contain, and document a social-engineering incident.
- I can classify controls by category and function correctly.

## 26. Continuity With Future Lessons

Lesson 8 examines network and system attacks, including reconnaissance, scanning, spoofing, poisoning, man-in-the-middle activity, DDoS, and enumeration. Social engineering may provide initial access before those techniques occur.

Students should continue asking:

- What identity or process is being impersonated?
- What action does the attacker want?
- Which evidence is trusted?
- Were credentials, tokens, money, or data exposed?
- What containment is urgent?
- Which process allowed the request to appear legitimate?
