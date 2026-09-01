# Lesson 5: Authentication and Identity

## Lesson Overview

Identity is the foundation of enterprise access. Organizations must determine who or what is requesting access, verify that identity, authorize appropriate actions, and record activity for accountability.

This lesson covers multifactor authentication (MFA), single sign-on (SSO), token-based authentication, password storage, and credential security. It builds on Lesson 4: passwords require secure one-way derivation rather than reversible encryption, while tokens and authentication protocols rely on cryptographic protection and trusted keys.

## Learning Objectives

By the end of this lesson, students should be able to:

- Distinguish identification, authentication, authorization, and accounting.
- Classify authentication factors correctly.
- Explain how MFA reduces account-takeover risk.
- Compare common MFA methods and recognize MFA fatigue and phishing risks.
- Explain SSO, federation, identity providers, and service providers.
- Describe token-based authentication and secure token handling.
- Explain secure password storage using salts and password-specific derivation functions.
- Identify common credential attacks and defensive controls.
- Apply identity controls to enterprise and cloud environments.
- Analyze sample sign-in events and recommend appropriate response actions.

## Prerequisite Knowledge

Students should understand:

- Confidentiality, integrity, risk, and security controls from Lesson 1.
- Phishing, malware, and threat actors from Lesson 2.
- IAM, SOC, systems administration, and incident response roles from Lesson 3.
- Hashing, keys, digital certificates, and TLS from Lesson 4.

## Enterprise Relevance

Modern organizations grant access through identities rather than network location alone. Employees, contractors, customers, service accounts, applications, devices, and automated workloads all require controlled identities.

Compromised credentials can give an attacker valid-looking access to:

- Microsoft 365 and cloud services.
- Financial systems.
- Electronic health records.
- Student information systems.
- Government portals.
- VPNs and remote desktops.
- Source-code repositories.
- Administrative tools.

Strong identity security combines technology, policy, monitoring, user support, and incident response.

## 1. Identity and Access

A digital identity is a representation of a user, device, application, service, or workload within an information system.

An identity may contain:

- A unique identifier.
- Username or sign-in name.
- Group memberships.
- Job role or organizational unit.
- Authentication methods.
- Assigned permissions.
- Device or risk attributes.
- Account status.

Systems need a reliable way to distinguish one entity from another. Without identity controls, organizations cannot consistently limit access, investigate actions, or remove access when relationships end.

Identity systems create accounts, register authentication methods, assign access, monitor use, and disable or remove identities when no longer required.

Identities exist in:

- Active Directory.
- Microsoft Entra ID.
- Linux and Windows local accounts.
- Cloud IAM platforms.
- SaaS applications.
- Customer identity systems.
- Databases and applications.
- Devices, certificates, and service workloads.

## 2. Identification, Authentication, Authorization, and Accounting

| Function | Question | Example |
|---|---|---|
| Identification | Who are you claiming to be? | A user enters `ada@company.example`. |
| Authentication | Can you prove that claim? | The user provides a password and security key. |
| Authorization | What are you allowed to do? | The user can read payroll reports but cannot change salaries. |
| Accounting | What activity was recorded? | Logs show sign-in time, device, source, and actions. |

These functions are related but not interchangeable. Successful authentication does not automatically justify unrestricted access.

## 3. Authentication Factors

An authentication factor is a category of evidence used to verify identity.

| Factor | Meaning | Examples |
|---|---|---|
| Something you know | Knowledge held by the user | Password, PIN, passphrase |
| Something you have | Possession of an authenticator | Smart card, security key, authenticator app, hardware token |
| Something you are | Biometric characteristic | Fingerprint, facial recognition, iris pattern |
| Somewhere you are | Location-related evidence | Approved office location or geographic region |
| Something you do | Behavioral characteristic | Typing rhythm, gesture, signature dynamics |

Location and behavior are frequently used as contextual or risk signals. Their reliability depends on implementation and should not be assumed equal to a strong cryptographic authenticator.

Authentication evidence differs in strength. Passwords can be guessed or stolen. Devices can be lost. Biometrics can be spoofed or become unavailable. Combining independent factors reduces reliance on one control.

An authentication service validates submitted evidence against securely enrolled information. It then applies policy, risk signals, and authorization requirements.

Authentication occurs at:

- Workstation sign-in.
- VPN gateways.
- Cloud applications.
- Privileged administration portals.
- Mobile applications.
- Physical access systems.
- Customer-facing services.

## 4. Multifactor Authentication

MFA requires evidence from two or more different authentication factor categories.

A password plus a PIN is not MFA because both are something the user knows. A password plus a hardware security key is MFA because knowledge and possession are different factors.

MFA reduces the likelihood that a stolen password alone results in account takeover. It is especially important for:

- Administrators.
- Remote access.
- Cloud email.
- Financial transactions.
- Sensitive records.
- Password-reset operations.

1. The user identifies an account.
2. The first factor is validated.
3. The system requests a second, independent factor.
4. Risk and access policies are evaluated.
5. A session is created if all requirements are satisfied.
6. The authentication event is logged.

MFA is deployed through identity providers, VPN systems, privileged access platforms, SaaS applications, and endpoint sign-in.

## 5. MFA Methods

| Method | Strengths | Risks and Limitations |
|---|---|---|
| SMS or voice code | Broadly available | Vulnerable to social engineering, number reassignment, interception, and SIM swapping |
| Email code | Easy to deploy | Weak if the same email account is compromised |
| Time-based one-time password | Works offline and is widely supported | Can be phished in real time |
| Push notification | Convenient and provides context | Susceptible to MFA fatigue and accidental approval |
| Hardware OTP token | Separate physical device | Codes may still be phished; device management is required |
| Smart card | Strong enterprise authentication | Requires PKI, readers, issuance, and recovery processes |
| FIDO2 security key or passkey | Origin-bound and resistant to credential phishing | Enrollment, recovery, device support, and user training are required |
| Biometrics | Convenient and tied to the user | Privacy, sensor reliability, spoofing, and fallback-method risks |

### Phishing-Resistant Authentication

Phishing-resistant authentication uses cryptographic mechanisms bound to the legitimate service origin. FIDO2 security keys and appropriately implemented passkeys can prevent a credential from being replayed to a fraudulent domain.

No MFA method removes the need for:

- Secure enrollment.
- Protected recovery.
- Session monitoring.
- Device security.
- User awareness.
- Incident response.

## 6. MFA Attacks and Defenses

### MFA Fatigue

An attacker with a stolen password repeatedly sends push requests, hoping the user approves one to stop the notifications.

Defenses include:

- Number matching.
- Displaying sign-in location and application.
- Rate limiting.
- Alerting on repeated denials.
- Phishing-resistant authenticators.
- Training users to deny and report unexpected prompts.

### Real-Time Phishing

An adversary-in-the-middle site can relay a password and one-time code to the real service and steal the resulting session.

Defenses include:

- FIDO2 or certificate-based authentication.
- Device compliance requirements.
- Conditional access.
- Token protection where supported.
- Detection of unusual sessions and sign-in properties.

### SIM Swapping

An attacker persuades or compromises a telecommunications provider to transfer a victim's phone number.

Organizations should avoid relying on SMS for high-risk access when stronger methods are practical.

### Recovery Abuse

Strong daily authentication can be undermined by a weak help-desk reset process. Recovery must verify identity, record approval, notify the user, and apply additional controls to privileged accounts.

## 7. Single Sign-On

SSO allows a user to authenticate through a central identity service and access multiple connected applications without entering credentials separately for each one.

SSO is not the same as using one shared password in many systems. Proper SSO uses trusted authentication assertions or tokens.

SSO can:

- Reduce password exposure and password reuse.
- Centralize authentication policy.
- Improve user experience.
- Simplify account disablement.
- Improve authentication logging.
- Apply MFA consistently.

1. A user requests an application.
2. The application redirects the user to an identity provider.
3. The identity provider authenticates the user and applies policy.
4. The identity provider issues a protected assertion or token.
5. The application validates it.
6. The application creates an authorized session.

SSO is used across:

- Microsoft 365.
- Cloud applications.
- Corporate intranets.
- HR and finance platforms.
- Educational portals.
- Customer and partner applications.

## 8. Federation and SSO Components

**Federation** is a trust relationship that allows identities managed in one security domain to access services in another.

| Component | Role |
|---|---|
| Identity Provider (IdP) | Authenticates the user and issues assertions or tokens |
| Service Provider (SP) or relying party | Consumes identity information and provides the application |
| Directory | Stores identity attributes and account information |
| Assertion or token | Carries protected claims about authentication and identity |
| Trust configuration | Defines accepted issuers, keys, certificates, endpoints, and claims |

Common technologies include:

- **SAML:** XML-based federation commonly used for enterprise browser SSO.
- **OAuth 2.0:** an authorization framework for delegated access.
- **OpenID Connect (OIDC):** an identity layer built on OAuth 2.0 for user authentication.
- **Kerberos:** ticket-based authentication widely used in Active Directory environments.

OAuth does not by itself authenticate a user. OIDC adds standardized identity information and an ID token.

### SSO Risk

SSO centralizes control but also increases the impact of identity-provider compromise. Defense in depth requires strong MFA, privileged access controls, resilient availability, logging, secure federation settings, and emergency access procedures.

## 9. Token-Based Authentication

A token is a protected data object representing authorization, authentication information, or a session. It allows a system to make access decisions without repeatedly transmitting a password.

Tokens support scalable web, mobile, API, cloud, and federated access. They can be limited by audience, scope, lifetime, and other claims.

After authentication or authorization, a trusted service issues a token. The receiving service validates:

- Issuer.
- Audience.
- Signature or protection mechanism.
- Expiration and activation time.
- Scope or permissions.
- Nonce or state where required.
- Other policy claims.

Tokens appear in:

- Web sessions.
- OAuth and OIDC.
- API authorization.
- Cloud command-line tools.
- Mobile applications.
- Service-to-service access.
- Password-reset workflows.

## 10. Token Types and Security

| Token | Purpose | Security Consideration |
|---|---|---|
| Access token | Authorizes access to a resource | Limit scope and lifetime; protect from disclosure |
| ID token | Communicates authentication claims to a client in OIDC | Validate issuer, audience, signature, nonce, and time claims |
| Refresh token | Obtains new access tokens | Store with stronger protection; rotate and revoke when possible |
| Session token or cookie | Maintains an authenticated web session | Use Secure, HttpOnly, and appropriate SameSite protections |
| Password-reset token | Authorizes a limited recovery action | Make single-use, short-lived, random, and securely delivered |

### Bearer Tokens

Many access and session tokens are bearer tokens: possession may be sufficient for use. If stolen, they may allow access without re-entering the password or MFA.

Protect tokens by:

- Using TLS.
- Avoiding logs, URLs, chat, and source code.
- Limiting lifetime and scope.
- Using secure platform storage.
- Revoking sessions after compromise.
- Monitoring unusual token use.
- Preventing script access to cookies where appropriate.

### JSON Web Tokens

A JSON Web Token (JWT) is a compact token format containing claims. A signed JWT is generally encoded, not encrypted. Its contents may be readable, so sensitive data should not be placed in it merely because it is signed.

Validation must not trust claims before verifying the approved signature algorithm, key, issuer, audience, and time restrictions.

## 11. Passwords and Passphrases

A password is a secret knowledge factor. A passphrase is typically longer and may consist of multiple words.

Passwords remain common because they are inexpensive and broadly supported. Their weaknesses include reuse, predictable choices, phishing, insecure storage, and recovery abuse.

Users create or receive a secret, and the authentication system verifies it against a protected stored representation.

Passwords protect local accounts, directories, applications, databases, cloud services, devices, and recovery systems.

### Better Password Practice

Organizations should:

- Encourage long, unique passwords or passphrases.
- Block common and known-compromised passwords.
- Permit password managers.
- Avoid arbitrary complexity rules that produce predictable patterns.
- Avoid routine forced changes without evidence of compromise or a justified policy requirement.
- Require immediate change after known or suspected compromise.
- Protect privileged and service-account credentials more strongly.
- Add MFA wherever practical.

## 12. Secure Password Storage

Secure password storage retains a one-way derived value instead of plaintext or reversibly encrypted passwords.

If an authentication database is stolen, secure derivation increases the cost of offline guessing and prevents administrators from directly reading passwords.

1. Generate a unique random salt.
2. Combine the password and salt through a password-specific derivation function.
3. Apply a suitable work factor and, where supported, memory cost and parallelism settings.
4. Store the salt, parameters, and derived value.
5. During sign-in, derive a value from the submitted password using the stored parameters.
6. Compare values using a safe implementation.

Suitable technologies include Argon2id, bcrypt, scrypt, and PBKDF2 when properly configured.

This process belongs in application authentication systems, identity platforms, and any approved system that must directly verify passwords.

### Salt, Pepper, and Work Factor

| Element | Purpose | Secret? |
|---|---|---|
| Salt | Makes each stored value unique and defeats useful precomputation | No |
| Pepper | Optional additional secret kept separately from the password database | Yes |
| Work factor | Increases computational cost per guess | No |

A general-purpose fast hash such as unsalted MD5, SHA-1, or SHA-256 alone is unsuitable for password storage because attackers can test guesses rapidly.

Passwords should not be encrypted merely so the application can decrypt and compare them. Systems requiring recovery of another service's password should use an approved secrets vault and strong access controls, not treat it as ordinary password verification.

## 13. Credential Attacks

| Attack | How It Works | Primary Defense |
|---|---|---|
| Brute force | Tries many values against one account or protected hash | Rate limiting, MFA, strong passwords, offline-resistant storage |
| Dictionary attack | Tests likely words and patterns | Long unique passwords and compromised-password screening |
| Password spraying | Tries a few common passwords against many accounts | MFA, smart lockout, detection across accounts |
| Credential stuffing | Reuses breached username-password pairs | Unique passwords, MFA, breach monitoring |
| Phishing | Deceives users into disclosing credentials | Phishing-resistant authentication, filtering, awareness |
| Keylogging | Captures user input | Endpoint security, patching, least privilege |
| Token theft | Steals an authenticated session or access token | Secure token storage, session controls, monitoring |
| Kerberos ticket theft | Steals or abuses authentication tickets | Endpoint protection, privilege control, credential isolation |
| Default credentials | Uses vendor or unchanged initial passwords | Secure provisioning and credential rotation |
| Shoulder surfing | Observes a user entering a secret | Physical awareness and protected entry |

Account lockout can slow online guessing but may also be abused to deny service. Smart lockout, risk-based controls, rate limiting, and monitoring provide a more balanced design.

## 14. Credential Security Lifecycle

### Enrollment

- Verify identity before registering authenticators.
- Record authorized devices and methods.
- Protect activation links and initial secrets.
- Apply stronger approval to privileged accounts.

### Use

- Require MFA based on risk.
- Use TLS.
- Limit sign-in locations, devices, and protocols where justified.
- Alert on suspicious authentication.

### Storage

- Use password-specific derivation.
- Store service secrets in managed vaults.
- Protect tokens and private keys in platform security stores.
- Prohibit secrets in source code and documentation.

### Rotation and Reset

- Change credentials after compromise, exposure, personnel changes, or policy-defined cryptoperiods.
- Verify reset requests.
- Revoke sessions and refresh tokens when necessary.
- Notify users of security changes.

### Revocation and Offboarding

- Disable accounts promptly.
- Remove active sessions, tokens, keys, and application consent.
- Recover organizational devices and authenticators.
- Review recent activity for misuse.

## 15. Privileged, Service, and Emergency Accounts

### Privileged Accounts

Administrative identities have greater impact and should use:

- Separate standard and administrative accounts.
- Phishing-resistant MFA.
- Privileged access management.
- Just-in-time and time-limited access.
- Dedicated administrative workstations where appropriate.
- Session logging and alerting.

### Service Accounts

Service identities support applications and automation. They should:

- Avoid interactive sign-in.
- Receive only required permissions.
- Use managed identities or certificates where possible.
- Rotate secrets automatically.
- Have an accountable owner.
- Be monitored for unusual use.

### Emergency Access Accounts

Emergency or break-glass accounts support recovery if normal identity services fail. They require:

- Strict access control.
- Strong, protected credentials.
- Continuous monitoring.
- Regular testing.
- Documented authorization and post-use review.

## 16. Conditional and Risk-Based Access

Conditional access evaluates context before granting access.

Signals may include:

- User and role.
- Device compliance.
- Application sensitivity.
- Source network.
- Geographic information.
- Sign-in risk.
- Authentication strength.
- Unusual travel or behavior.

Possible decisions include allow, block, require MFA, require a compliant device, limit the session, or require stronger authentication.

Risk signals are evidence, not certainty. Analysts must account for VPN use, mobile networks, travel, shared infrastructure, and false positives.

## 17. Enterprise Scenarios

### Small Business: Microsoft 365 Account Takeover

An employee reuses a password exposed in another breach. An attacker signs in and creates a mailbox forwarding rule.

The organization enables MFA, blocks legacy authentication, reviews sign-in and audit logs, removes the rule, resets the password, revokes sessions, and checks for additional affected accounts.

### Bank: Privileged Administrator

A bank requires a separate administrator account, FIDO2 authentication, a managed workstation, time-limited privilege, and session monitoring. A password alone cannot authorize high-risk administration.

### Hospital: Emergency Access

Clinical staff normally authenticate through SSO and MFA. A monitored emergency access process supports continuity during identity-service disruption. Every emergency use triggers review to balance availability with accountability.

### University: Student and Staff Federation

A university uses one IdP for learning, library, and administrative applications. Students and staff receive different claims and authorization. Disabling a departed staff identity blocks connected applications without separate account-by-account password changes.

### Government Agency: Contractor Offboarding

A contractor's directory account, VPN certificate, active sessions, cloud tokens, and application assignments are revoked when the contract ends. Removing only the password would leave other credentials active.

### Cloud Application: Stolen Token

A user successfully completes MFA, but malware steals the browser session cookie. The SOC detects use from an unmanaged device, revokes the session, isolates the endpoint, and investigates the malware. This demonstrates why MFA does not prevent every token-based attack.

## 18. SOC Monitoring and Incident Response

Useful identity log fields include:

- Timestamp.
- User or service identity.
- Source IP address.
- Device identifier and compliance.
- Application and resource.
- Authentication method.
- MFA result.
- Conditional-access result.
- Failure reason.
- Session or correlation identifier.
- Geographic and risk information.

### Investigation Workflow

1. Validate the alert and normalize time zones.
2. Identify the affected identity and privilege level.
3. Review successful and failed sign-ins.
4. Check device, source, application, and authentication method.
5. Review mailbox, cloud, endpoint, and administrative activity.
6. Contact the user through a trusted channel when appropriate.
7. Contain by blocking access, revoking sessions, resetting credentials, or isolating devices.
8. Preserve logs and document actions.
9. Identify the initial access method.
10. Correct control gaps and tune detections.

## 19. Security+ SY0-701 Alignment

This lesson supports Security+ concepts involving:

- Authentication factors and MFA.
- Passwordless and biometric authentication.
- SSO and federation.
- Identity providers and authorization protocols.
- Password security.
- Tokens and certificates.
- Least privilege and privileged access.
- Conditional access.
- Account lifecycle and credential management.

Authentication mechanisms are technical controls. Enrollment, recovery, access review, and offboarding are operational controls. Identity policy and governance are managerial controls.

## 20. Classroom Hands-On Practical

### Practical Title

Authentication Policy Review and Sign-In Triage

### Objectives

Students will classify factors, assess authentication policy, and investigate sample sign-in events without testing real credentials.

### Scenario

A 120-person company uses Microsoft 365 and a cloud payroll application. Current practices are:

- Passwords require eight characters and change every 30 days.
- SMS MFA is required only for payroll staff.
- Administrators use the same account for email and administration.
- Help-desk staff reset MFA after asking for employee number and date of birth.
- Service-account passwords are stored in a shared spreadsheet.
- Departed users are disabled during a monthly review.
- SSO is enabled for payroll.

### Part A: Control Assessment

Identify at least eight risks and recommend controls. Classify each control as technical, managerial, operational, or physical and identify its function where relevant.

| Finding | Risk | Recommendation | Control Category | Control Function |
|---|---|---|---|---|
| Delayed offboarding | Former users retain access | Trigger immediate disablement from HR departure events | Operational | Preventive |

Remember: operational is a control category; directive is a control function.

### Part B: Sign-In Events

Analyze these fictional events:

| Time | User | Result | Source | Device | MFA | Detail |
|---|---|---|---|---|---|---|
| 08:01 | amina | Failure | Lagos | Managed laptop | Not reached | Incorrect password |
| 08:02 | amina | Failure | Lagos | Managed laptop | Not reached | Incorrect password |
| 08:04 | 24 users | Failure | Multiple regions | Unknown | Not reached | Same application |
| 08:10 | finance-admin | Success | New region | Unmanaged browser | Push approved | New device |
| 08:12 | finance-admin | Success | New region | Unmanaged browser | Satisfied | Payroll export |

### Student Tasks

1. Identify evidence of possible password spraying.
2. Prioritize the highest-risk account.
3. Explain why successful MFA does not close the investigation.
4. List immediate containment actions.
5. Identify additional logs needed.
6. Draft a five-sentence ticket escalation.

### Expected Findings

- Failures across many users may indicate password spraying.
- The privileged finance account and payroll export require immediate review.
- Push approval may result from fatigue, deception, or unauthorized user action.
- Containment may include session revocation, temporary blocking, credential reset, device investigation, and payroll review.
- Analysts should request identity, cloud audit, endpoint, mailbox, application, and help-desk records.

## 21. Take-Home Practical

Design an authentication and credential-security standard for one organization:

- Small business.
- Hospital.
- Bank.
- University.
- Government agency.
- Hybrid cloud enterprise.

Include:

- User, administrator, service, and emergency account requirements.
- Approved MFA methods.
- SSO and federation requirements.
- Password and passphrase rules.
- Password-storage requirements.
- Token lifetimes and handling.
- Enrollment and recovery controls.
- Offboarding actions.
- Monitoring and incident-response requirements.
- At least ten risks mapped to controls.

## 22. Assessment Questions

### Multiple Choice

1. Which combination is true MFA?
   A. Password and PIN
   B. Password and security key
   C. PIN and security question
   D. Fingerprint and facial recognition

2. What is the main role of an identity provider?
   A. Encrypt every database
   B. Authenticate identities and issue protected assertions or tokens
   C. Replace authorization
   D. Store plaintext passwords

3. Which statement about OAuth 2.0 is correct?
   A. It is primarily an authorization framework.
   B. It is a password-hashing function.
   C. It is a disk-encryption standard.
   D. It replaces TLS.

4. Why is a salt used in password storage?
   A. To make identical passwords produce different stored values
   B. To allow administrators to decrypt passwords
   C. To replace MFA
   D. To create a session cookie

5. Which attack tries a small number of common passwords against many accounts?
   A. Credential stuffing
   B. Password spraying
   C. Token signing
   D. Federation

6. Which is most resistant to credential phishing?
   A. SMS code
   B. Push approval
   C. FIDO2 security key
   D. Security question

7. What should happen after suspected session-token theft?
   A. Change only the username
   B. Revoke sessions and investigate the endpoint and activity
   C. Wait for natural expiration
   D. Publish the token

8. Which function determines what an authenticated user may do?
   A. Identification
   B. Authentication
   C. Authorization
   D. Accounting

9. Why is a fast, unsalted SHA-256 hash unsuitable for password storage?
   A. It cannot produce output.
   B. Attackers can test guesses rapidly.
   C. It always encrypts the password.
   D. It requires a certificate.

10. What is an important service-account control?
    A. Enable normal interactive sign-in
    B. Share its secret with every administrator
    C. Assign an owner and least privilege
    D. Exclude it from monitoring

### Short Answer

1. Distinguish identification, authentication, authorization, and accounting.
2. Explain why a password and PIN do not provide MFA.
3. Describe one benefit and one risk of SSO.
4. Distinguish an access token from a refresh token.
5. Explain the purpose of a password work factor.
6. Describe MFA fatigue and two defenses.
7. Explain why offboarding must revoke more than a password.
8. List four identity log fields useful to a SOC analyst.

### Scenario Questions

1. A user approves an unexpected push notification, and a new mailbox rule appears. Describe containment and investigation.
2. A developer places an API token in a public repository. Explain the required response.
3. A hospital's IdP is unavailable. Explain how resilient design can protect both availability and accountability.
4. A service account signs in interactively from a user workstation. Explain why this is suspicious.

## 23. Glossary

| Term | Definition |
|---|---|
| Access Token | A token authorizing access to a protected resource. |
| Accounting | Recording identity and system activity for accountability and investigation. |
| Authentication | Verification of a claimed identity. |
| Authentication Factor | A category of evidence used to authenticate an identity. |
| Authorization | Determination of what an authenticated entity may access or perform. |
| Bearer Token | A token whose possession may be sufficient for use. |
| Conditional Access | Access decisions based on identity, device, application, location, risk, and other context. |
| Credential Stuffing | Use of breached username-password pairs against other services. |
| Federation | Trust that allows identities from one security domain to access services in another. |
| Identity Provider (IdP) | A service that authenticates identities and issues assertions or tokens. |
| Identification | Claiming a particular identity. |
| JSON Web Token (JWT) | A compact format for carrying claims, commonly signed and not necessarily encrypted. |
| Multifactor Authentication (MFA) | Authentication using evidence from two or more factor categories. |
| OpenID Connect (OIDC) | An identity layer built on OAuth 2.0. |
| Password Spraying | Testing a few common passwords across many accounts. |
| Passkey | A FIDO-based credential supporting phishing-resistant authentication. |
| Refresh Token | A token used to obtain new access tokens. |
| SAML | An XML-based standard commonly used for enterprise federation and SSO. |
| Service Account | A non-human identity used by an application, service, or automated process. |
| Session Token | A token representing an authenticated session. |
| Single Sign-On (SSO) | Central authentication that enables access to multiple connected applications. |
| Work Factor | A configurable cost that makes password derivation and guessing more expensive. |

## 24. Lesson Review Checklist

Students should be able to confirm:

- I can distinguish identification, authentication, authorization, and accounting.
- I can classify authentication factors.
- I can explain MFA strengths, limitations, and attacks.
- I can explain SSO and federation components.
- I can distinguish OAuth authorization from OIDC authentication.
- I can describe access, ID, refresh, and session tokens.
- I can explain salts, peppers, and work factors.
- I can recognize major credential attacks.
- I can recommend controls for privileged and service accounts.
- I can investigate a suspicious identity event.

## 25. Continuity With Future Lessons

Lesson 6 applies cryptography to email security, HTTPS, certificate lifecycle, and encryption failures. Lesson 7 then examines social engineering and credential attacks in greater investigative depth.

Carry forward these questions:

- What identity is requesting access?
- Which evidence authenticated it?
- What authorization was granted?
- Which tokens or sessions remain active?
- How are credentials stored and recovered?
- What logs establish accountability?
- How can access be contained without harming essential operations?
