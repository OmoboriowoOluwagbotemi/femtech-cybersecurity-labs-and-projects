# Lesson 4: Cryptography Fundamentals

## Lesson Overview

Cryptography protects information by applying mathematical techniques to data. It supports confidentiality, integrity, authentication, and non-repudiation across endpoints, networks, applications, cloud platforms, and enterprise identity systems.

Lesson 1 introduced confidentiality and integrity as security objectives. Lessons 2 and 3 showed how attackers threaten those objectives and how security professionals respond. This lesson explains the cryptographic mechanisms organizations use to protect data at rest and in transit.

The lesson covers hashing, symmetric encryption, asymmetric encryption, public key infrastructure (PKI), TLS, digital certificates, and the operational responsibilities involved in using cryptography securely.

## Learning Objectives

By the end of this lesson, students should be able to:

- Explain what cryptography is and why enterprises use it.
- Distinguish hashing from encryption.
- Compare symmetric and asymmetric encryption.
- Explain how keys, algorithms, and cryptographic operations work together.
- Describe the purpose and components of PKI.
- Explain how digital certificates establish identity and trust.
- Describe how TLS protects network communications.
- Distinguish data at rest from data in transit.
- Select appropriate cryptographic protections for realistic enterprise situations.
- Identify common implementation and key-management risks.
- Interpret basic certificate and file-hash information using operating-system tools.

## Prerequisite Knowledge

Students should understand:

- Confidentiality, integrity, and availability from Lesson 1.
- Threats, vulnerabilities, risk, and security controls from Lesson 1.
- Malware and threat actors from Lesson 2.
- The responsibilities of SOC analysts, security administrators, systems administrators, IAM analysts, and incident responders from Lesson 3.

Advanced mathematics and programming are not required.

## Enterprise Relevance

Organizations use cryptography when they:

- Encrypt laptops, servers, databases, backups, and cloud storage.
- Protect web traffic, remote administration, email transport, and application programming interfaces.
- Verify software, documents, messages, and downloaded files.
- Authenticate users, servers, services, and devices.
- Protect payment information, health records, student records, intellectual property, and government data.
- Meet contractual, regulatory, and risk-management requirements.

Cryptography is therefore both a technical security control and an operational responsibility. Strong algorithms can still fail when keys are exposed, certificates expire, systems use insecure protocols, or administrators configure trust incorrectly.

## 1. Cryptography

Cryptography is the use of mathematical algorithms and keys to protect information and communications.

Cryptographic systems commonly provide:

- **Confidentiality:** preventing unauthorized disclosure.
- **Integrity:** detecting unauthorized modification.
- **Authentication:** establishing that an entity or message is genuine.
- **Non-repudiation:** providing evidence that a specific private key was used to create a digital signature.

Cryptography does not automatically provide availability. An encrypted service can still be disrupted, and loss of an encryption key can make legitimate data unavailable.

Data regularly travels through or resides in environments that cannot be assumed to be fully trusted. A laptop may be stolen, a backup may be misplaced, or network traffic may cross infrastructure controlled by other parties.

Cryptography reduces the value of exposed data and helps detect tampering. It also enables trust between systems that have not previously communicated.

A cryptographic operation normally involves:

- Plaintext or original input.
- An approved algorithm.
- A key, except in unkeyed hashing.
- Ciphertext, a digest, or a digital signature as output.
- A secure process for generating, storing, distributing, rotating, revoking, and destroying keys.

An **algorithm** is the mathematical procedure. A **key** is the value that controls a cryptographic operation. The security of modern cryptography should depend on protecting the key, not hiding the algorithm.

Cryptography appears in:

- Full-disk encryption.
- Encrypted databases and backups.
- HTTPS websites.
- Virtual private networks.
- Secure Shell (SSH).
- Wi-Fi security.
- Password storage.
- Software signing.
- Digital certificates.
- Cloud key-management services.
- Authentication tokens.
- Email security.

## 2. Core Cryptographic Concepts

| Concept | Meaning | Enterprise Example |
|---|---|---|
| Plaintext | Data before encryption or after authorized decryption. | A readable payroll file. |
| Ciphertext | Data transformed by encryption into an unreadable form. | An encrypted payroll database record. |
| Algorithm | A mathematical procedure used for a cryptographic operation. | AES used to encrypt a disk. |
| Key | A value that controls encryption, decryption, signing, or verification. | A key stored in a hardware security module. |
| Key length | The size of a cryptographic key, normally measured in bits. | A 256-bit AES key. |
| Hash or digest | Fixed-length output produced from input data by a hash function. | A SHA-256 file digest. |
| Salt | A unique random value added before hashing passwords. | A different salt stored with each password hash. |
| Initialization vector or nonce | A value used with certain encryption modes to prevent repeated plaintext from producing predictable ciphertext. | A unique nonce used for each encryption operation. |
| Digital signature | A cryptographic value created with a private key and verified with the corresponding public key. | A vendor signs a software package. |
| Entropy | The unpredictability used when generating keys and random values. | An operating system's cryptographically secure random generator. |

### Kerckhoffs's Principle

A secure cryptographic design should remain secure even if an attacker knows how the system works, provided the key remains secret. Enterprises should use publicly reviewed, approved algorithms rather than inventing private encryption schemes.

## 3. Hashing

Hashing is a one-way mathematical process that converts input of any practical size into a fixed-length output called a **hash**, **digest**, or **message digest**.

Hashing is not encryption. It does not use a decryption key and is not designed to restore the original input.

Hashing allows a system or analyst to determine whether data has changed without comparing every part of the original content. It is also used as one component of secure password storage and digital signatures.

The input is processed by a hash algorithm. A secure cryptographic hash function should have these properties:

- **Deterministic:** the same input produces the same digest.
- **One-way:** recovering the original input from the digest should be computationally impractical.
- **Collision resistant:** finding two different inputs with the same digest should be computationally impractical.
- **Avalanche effect:** a small input change should produce a substantially different digest.
- **Fixed-length output:** output size is determined by the algorithm, not input size.

For example, changing one character in an incident report produces a different SHA-256 digest.

Hashing is used for:

- File-integrity verification.
- Password-storage systems.
- Digital signatures.
- Malware identification.
- Forensic evidence verification.
- Package and software verification.
- Integrity monitoring.
- Message authentication when combined with a secret key.

### Common Hash Algorithms

| Algorithm | Status | Security Use |
|---|---|---|
| MD5 | Cryptographically broken | May appear as a legacy file identifier; should not be trusted for collision-resistant security decisions. |
| SHA-1 | Cryptographically weak and deprecated for security-sensitive use | May exist in legacy systems; migrate to stronger algorithms. |
| SHA-256 | Widely used member of SHA-2 | File verification, certificates, signatures, and integrity checks. |
| SHA-384 | SHA-2 with a longer digest | Higher-security profiles and certificate suites. |
| SHA-3 | Modern hash family with a different internal design from SHA-2 | Approved hashing where supported and required. |

### Hashing and Password Storage

Passwords should not be stored as plaintext or as quickly computed, unsalted general-purpose hashes.

A secure password-storage design uses:

- A unique random salt for each password.
- A password-specific key-derivation function such as Argon2id, bcrypt, scrypt, or PBKDF2.
- A configurable work factor that makes large-scale guessing expensive.
- Secure access controls around the authentication database.

A salt is not secret. Its purpose is to prevent identical passwords from producing identical stored values and to reduce the usefulness of precomputed lookup tables.

Lesson 5 examines password storage and credential security in greater depth.

### Hashing in SOC and Incident Response

A SOC analyst may calculate the SHA-256 digest of a suspicious file and compare it with:

- Endpoint alerts.
- Threat-intelligence records.
- Other hosts in the enterprise.
- An internal malware repository.
- An incident case file.

A matching hash can support identification, but it is not complete proof that two files are safe or malicious in every context. Attackers can modify malware to produce a new hash, so analysts also use behavior, metadata, signatures, and other indicators.

### Integrity Limitation

An unkeyed hash can show that two copies differ, but it cannot prove who created the digest. If an attacker can replace both a file and its published hash, the comparison provides no trustworthy integrity assurance.

For authenticated integrity, organizations may use:

- A keyed-hash message authentication code (HMAC).
- A digital signature.
- A trusted, access-controlled integrity-monitoring system.

## 4. Symmetric Encryption

Symmetric encryption uses the same secret key, or closely related secret keys, for encryption and decryption.

Symmetric algorithms are efficient and suitable for encrypting large amounts of data. They are commonly used for disks, files, databases, backups, and the bulk-data portion of network sessions.

1. A secret key is generated.
2. Plaintext and the key are processed by a symmetric algorithm.
3. Ciphertext is produced.
4. An authorized party uses the secret key to decrypt the ciphertext.

Anyone who possesses the key may be able to decrypt the data. Secure key distribution and storage are therefore essential.

Symmetric encryption is used in:

- BitLocker and other full-disk encryption products.
- Database and backup encryption.
- Cloud storage encryption.
- File and volume encryption.
- VPN and TLS session protection.
- Application-level data encryption.

### AES

The Advanced Encryption Standard (AES) is a widely used symmetric block cipher. AES supports 128-bit, 192-bit, and 256-bit keys.

Key length is only one part of security. Implementations must also use:

- An appropriate mode of operation.
- Unique nonces or initialization vectors where required.
- Authenticated encryption where possible.
- Secure random-number generation.
- Protected key storage.

Authenticated encryption modes, such as AES-GCM, protect confidentiality and also detect unauthorized modification.

### Strengths and Limitations

| Strength | Limitation |
|---|---|
| Fast for large data volumes. | Secret keys must be distributed securely. |
| Efficient for endpoints, servers, and network sessions. | Every authorized decryption location increases key exposure. |
| Strong security when correctly implemented. | Key loss can make data permanently inaccessible. |
| Supports encryption at scale. | A compromised key may expose all data protected by that key. |

## 5. Asymmetric Encryption

Asymmetric cryptography uses a mathematically related key pair:

- A **public key**, which may be distributed.
- A **private key**, which must remain protected.

What one key does depends on the cryptographic operation. Public-key encryption and digital signing are different uses and should not be described as simply "encrypting with either key."

Asymmetric cryptography helps solve the challenge of establishing trust and exchanging secrets without first sharing one secret key through an insecure channel.

It also supports digital signatures and scalable identity verification.

For confidentiality:

1. A sender obtains the recipient's authentic public key.
2. The public key is used within an approved encryption or key-establishment process.
3. Only the holder of the corresponding private key can complete the required decryption operation.

For digital signatures:

1. A digest of the message is calculated.
2. The signer uses the private key to create a signature over the digest.
3. A recipient uses the public key to verify the signature.
4. Successful verification supports integrity and signer authentication.

Asymmetric cryptography is used in:

- TLS certificates and handshakes.
- Digital signatures.
- Software and document signing.
- Secure email.
- SSH authentication.
- Certificate-based device authentication.
- Key establishment and exchange.

### Common Asymmetric Technologies

| Technology | Typical Purpose | Operational Note |
|---|---|---|
| RSA | Encryption, key transport in legacy designs, and digital signatures | Requires suitable key sizes and padding; modern TLS commonly prefers ephemeral key exchange. |
| Elliptic Curve Cryptography (ECC) | Key agreement and digital signatures | Provides strong security with smaller keys than traditional RSA configurations. |
| Diffie-Hellman (DH) | Establishing a shared secret | Does not authenticate parties by itself. |
| Elliptic Curve Diffie-Hellman (ECDH) | Efficient shared-secret establishment | Ephemeral forms can support forward secrecy. |
| ECDSA | Digital signatures | Depends on secure private-key and nonce handling. |

### Hybrid Cryptography

Enterprise systems normally combine asymmetric and symmetric cryptography.

For example, TLS uses public-key mechanisms to authenticate parties and establish keying material. It then uses efficient symmetric encryption to protect application data.

This hybrid approach provides:

- Scalable trust and key establishment.
- Efficient bulk encryption.
- Strong session protection.

## 6. Symmetric, Asymmetric, and Hashing Comparison

| Characteristic | Hashing | Symmetric Encryption | Asymmetric Cryptography |
|---|---|---|---|
| Main purpose | Integrity and one-way representation | Confidentiality for data at scale | Authentication, signatures, and key establishment |
| Key requirement | No key for ordinary hashing; secret key for HMAC | Shared secret key | Public/private key pair |
| Reversible | No | Yes, with the secret key | Depends on the operation |
| Relative speed | Fast | Fast | Slower and more computationally intensive |
| Typical use | File verification, password derivation, signatures | Disk, database, backup, and session encryption | Certificates, signatures, and session key establishment |
| Primary risk | Weak algorithm or misuse | Secret-key exposure or reuse | Private-key compromise or invalid trust |

## 7. Digital Signatures

A digital signature is a cryptographic mechanism that uses a private key to sign data and a corresponding public key to verify the signature.

Digital signatures help recipients determine:

- Whether content changed after signing.
- Whether the signature corresponds to a particular private key.
- Whether the associated public key is trusted for that purpose.

The signing system calculates a digest and creates a signature using the signer's private key. The verifier independently calculates a digest, verifies the signature with the public key, and evaluates the certificate and trust path where certificates are used.

Digital signatures protect:

- Software packages.
- Operating-system updates.
- PowerShell scripts.
- Documents and contracts.
- Email messages.
- Certificates.
- Application code.

### Non-Repudiation Qualification

Digital signatures can support non-repudiation, but technology alone does not settle every dispute. Assurance depends on:

- Exclusive control of the private key.
- Reliable identity verification before certificate issuance.
- Trusted timestamps.
- Secure audit records.
- Policy and legal context.
- Evidence that the signing system was not compromised.

## 8. Public Key Infrastructure

Public key infrastructure (PKI) is the combination of people, policies, procedures, hardware, software, and services used to create, manage, distribute, validate, revoke, and retire digital certificates and public-key credentials.

A public key alone does not prove who owns it. PKI provides a structured trust system that binds public keys to identified subjects such as websites, users, devices, or services.

A typical PKI uses:

- **Certificate authority (CA):** issues and signs certificates.
- **Root CA:** the trust anchor at the top of a hierarchy.
- **Intermediate CA:** issues certificates beneath the root and limits direct use of the root key.
- **Registration authority (RA):** performs or supports identity verification and certificate requests.
- **Certificate repository:** makes certificates and status information available.
- **Certificate policy and practice documentation:** defines issuance and operational requirements.
- **Revocation services:** communicate whether a certificate should no longer be trusted.
- **Hardware security module (HSM):** protects high-value cryptographic keys and performs controlled cryptographic operations.

PKI supports:

- Public HTTPS websites.
- Internal enterprise applications.
- Corporate Wi-Fi authentication.
- VPN authentication.
- Device identity.
- Smart cards.
- Secure email.
- Code signing.
- Machine-to-machine communications.

## 9. Certificate Authorities and Trust Chains

A root CA signs an intermediate CA certificate. The intermediate CA signs an end-entity certificate, such as a web-server certificate.

```text
Trusted Root CA
       |
       v
Intermediate CA
       |
       v
Server or End-Entity Certificate
```

A client validates the certificate path from the end-entity certificate to a trusted root in its trust store.

Organizations commonly keep root CA private keys offline or under highly restricted control. Intermediate CAs perform routine issuance so that compromise of an issuing system does not directly expose the root key.

### Public and Private PKI

| PKI Type | Use | Example |
|---|---|---|
| Public PKI | Trust for public Internet services | A certificate for a customer-facing banking website. |
| Private PKI | Trust controlled by one organization | Certificates for internal servers, users, managed devices, or corporate Wi-Fi. |

A private CA certificate is not automatically trusted by external devices. The organization must securely distribute the appropriate root certificate to managed trust stores.

## 10. Digital Certificates

A digital certificate is a signed electronic document that binds a public key to a subject and describes how that key may be used.

The commonly used certificate format is X.509.

Certificates allow systems to verify identity and public-key ownership at scale. Without trustworthy validation, an attacker could present a fraudulent public key and impersonate a service.

A certificate normally contains:

- Subject information.
- Issuer information.
- Subject public key.
- Serial number.
- Validity period.
- Signature algorithm.
- Issuer's digital signature.
- Subject Alternative Name (SAN).
- Key Usage and Extended Key Usage fields.

For modern TLS hostname validation, the SAN extension identifies the DNS names or addresses the certificate is valid for.

Certificates are installed on:

- Web servers.
- Load balancers.
- Firewalls and VPN gateways.
- Email systems.
- Wireless authentication services.
- User and device stores.
- Code-signing systems.
- Cloud services and application gateways.

## 11. Certificate Lifecycle

Although Lesson 6 examines certificate lifecycle in greater operational depth, students need the foundational sequence:

1. **Request:** a subject generates or receives a key pair and creates a certificate signing request.
2. **Identity validation:** the CA or RA validates the requester according to policy.
3. **Issuance:** the CA signs and issues the certificate.
4. **Deployment:** administrators install the certificate and protect its private key.
5. **Monitoring:** teams monitor validity, usage, configuration, and approaching expiration.
6. **Renewal or replacement:** a new certificate is deployed before expiration or when requirements change.
7. **Revocation:** trust is withdrawn when the key is compromised, the subject changes, or the certificate was incorrectly issued.
8. **Retirement:** expired certificates and obsolete keys are securely removed or archived according to policy.

### Revocation Checking

Two common mechanisms communicate certificate status:

- **Certificate Revocation List (CRL):** a signed list of revoked certificate serial numbers published by a CA.
- **Online Certificate Status Protocol (OCSP):** a protocol used to request status information about a specific certificate.

Revocation is not identical to expiration. Expiration occurs when the defined validity period ends. Revocation invalidates a certificate before that date.

## 12. TLS and SSL

Transport Layer Security (TLS) is a protocol that protects application communications over a network.

Secure Sockets Layer (SSL) is the obsolete predecessor to TLS. People sometimes use the phrase "SSL certificate," but modern secure services should use supported TLS versions and configurations.

Without transport protection, an attacker positioned on a network path may be able to read or modify traffic, steal session information, or impersonate a service.

TLS can provide:

- Server authentication.
- Optional client authentication.
- Confidentiality.
- Message integrity.

A simplified TLS connection works as follows:

1. The client connects and proposes supported cryptographic parameters.
2. The server responds with selected parameters and its certificate.
3. The client validates the certificate, hostname, validity, trust chain, and other requirements.
4. The parties establish shared session keys.
5. Each side confirms that the handshake has not been altered.
6. Symmetric authenticated encryption protects application data.

Modern TLS designs use ephemeral key establishment where supported. This can provide **forward secrecy**, meaning later compromise of a server's long-term private key should not reveal previously recorded sessions.

TLS protects:

- HTTPS web traffic.
- Application programming interfaces.
- Email transport and client connections when correctly configured.
- Secure LDAP.
- Database connections.
- Cloud-management interfaces.
- Internal service-to-service traffic.

### TLS Limitations

A valid TLS connection does not prove that:

- A website is honest.
- An application has no vulnerabilities.
- An endpoint is free from malware.
- Authorized users will handle data correctly.
- Data remains encrypted after the receiving application processes it.

Attackers can obtain certificates for domains they control. Users and analysts must still verify the actual destination and investigate suspicious behavior.

## 13. Certificate Validation Failures

| Failure | Meaning | Security Concern |
|---|---|---|
| Expired certificate | Current time is outside the certificate validity period. | Identity assurance is no longer current; service interruption may occur. |
| Hostname mismatch | Requested hostname is not covered by the certificate SAN. | The client may be connected to the wrong or impersonated service. |
| Untrusted issuer | Trust chain does not end at an accepted root. | Certificate identity cannot be established under the client's trust policy. |
| Revoked certificate | CA has invalidated the certificate before expiration. | Private-key compromise or another serious condition may exist. |
| Incomplete chain | Required intermediate certificate is unavailable. | Some clients cannot construct a valid trust path. |
| Weak algorithm or protocol | Obsolete cryptography is enabled. | Traffic may be exposed to known attacks or policy violations. |
| Private-key mismatch | Certificate does not match the installed private key. | Service cannot correctly complete required cryptographic operations. |

Administrators should not teach users to bypass certificate warnings as a routine troubleshooting step. The cause must be investigated and corrected.

## 14. Data at Rest

Data at rest is data stored on media and not actively moving between systems.

Examples include:

- Files on laptops and servers.
- Database records.
- Virtual-machine disks.
- Cloud object storage.
- Backups.
- Mobile-device storage.
- Removable media.

Stored data may be exposed through device theft, lost media, unauthorized access, decommissioned equipment, cloud misconfiguration, or backup compromise.

Organizations protect data at rest through:

- Full-disk or volume encryption.
- File- and folder-level encryption.
- Database encryption.
- Application-level field encryption.
- Encrypted backups.
- Cloud storage encryption.
- Access controls and separation of duties.
- Secure key storage and recovery procedures.

Examples include:

- BitLocker on managed Windows laptops.
- Linux Unified Key Setup (LUKS) on Linux volumes.
- Database transparent data encryption.
- Cloud-provider storage encryption with provider-managed or customer-managed keys.
- Encrypted backup repositories.

### Important Limitation

Full-disk encryption is most effective when a device is powered off and the key is not available. After an authorized user unlocks a device, malware or an attacker using that session may access readable data. Encryption must be combined with endpoint security, authentication, least privilege, monitoring, and physical controls.

## 15. Data in Transit

Data in transit, also called data in motion, is data moving between systems, networks, services, or locations.

Network paths may include wireless networks, Internet service providers, cloud networks, proxies, gateways, and other infrastructure outside the organization's direct control.

Data in transit may be protected with:

- TLS for application traffic.
- IPsec for network-layer protection.
- Secure Shell for administration and tunneling.
- VPNs for protected remote or site-to-site connectivity.
- Secure Wi-Fi protocols.
- Message-level or application-level encryption.

Examples include:

- A browser connecting to an online banking portal.
- A hospital application sending data to a cloud service.
- An administrator using SSH to manage a Linux server.
- A branch office connecting to headquarters through an IPsec VPN.
- An application sending database queries over TLS.

## 16. Data-State Comparison

| Data State | Description | Common Protection | Example Risk |
|---|---|---|---|
| At rest | Stored on media | Disk, file, database, or backup encryption | Stolen laptop exposes customer records. |
| In transit | Moving between systems | TLS, VPN, IPsec, SSH | Network interception exposes credentials. |
| In use | Being processed in memory or by an application | Access control, isolation, secure coding, endpoint protection, and specialized confidential-computing capabilities | Malware reads data after a user decrypts it. |

Data in use is included for comparison. Protecting data at rest and in transit does not remove risks while data is being processed.

## 17. Key Management

Key management is the controlled handling of cryptographic keys throughout their lifecycle.

Cryptographic strength depends heavily on key protection. A strong algorithm cannot preserve confidentiality if an attacker obtains the decryption key.

An enterprise key lifecycle includes:

1. Secure generation.
2. Authorized distribution or establishment.
3. Protected storage.
4. Controlled use.
5. Rotation or renewal.
6. Backup and recovery where appropriate.
7. Revocation or deactivation.
8. Secure destruction.

Keys may be protected in:

- Trusted Platform Modules (TPMs).
- Hardware security modules.
- Cloud key-management services.
- Managed certificate systems.
- Protected operating-system key stores.
- Offline recovery systems.

### Key-Management Principles

- Use cryptographically secure random-number generation.
- Restrict key access through least privilege.
- Separate key administration from data administration where feasible.
- Log and monitor high-risk key operations.
- Rotate keys according to risk, policy, and cryptoperiod.
- Maintain controlled recovery procedures.
- Never embed production secrets in source code or public repositories.
- Revoke and replace keys when compromise is suspected.
- Test recovery before an incident occurs.

### Key Escrow and Recovery

**Key escrow** stores a protected copy of a key with an authorized third party or recovery service. It can support business continuity, legal requirements, and employee-device recovery.

Escrow also creates a high-value target. Access must be tightly controlled, logged, and governed by policy.

## 18. Cryptographic Failure Modes

| Failure | Example | Likely Impact | Defensive Action |
|---|---|---|---|
| Weak or deprecated algorithm | Legacy SHA-1 signature dependency | Reduced integrity assurance | Migrate to approved algorithms. |
| Private-key exposure | Web-server key copied from an unsecured share | Service impersonation or decryption risk | Revoke, replace, investigate, and protect keys. |
| Hard-coded secret | Encryption key stored in public source code | Unauthorized decryption | Remove, rotate, use managed secret storage. |
| Key loss | Backup key destroyed without recovery copy | Permanent data loss | Use controlled escrow, backup, and recovery testing. |
| Nonce or IV reuse | Application repeats values in an unsafe mode | Plaintext or key information may be exposed | Use approved libraries and unique values. |
| Certificate expiration | Public portal certificate expires | Outage and loss of trust | Inventory certificates and automate renewal. |
| Disabled validation | Application accepts every certificate | Man-in-the-middle exposure | Enforce complete certificate validation. |
| Excessive key access | Many administrators can export a CA key | Increased compromise risk | Apply least privilege and HSM protections. |
| Encryption without integrity | Ciphertext can be altered undetected | Data manipulation | Use authenticated encryption. |

## 19. Enterprise Use Cases

### Financial Institution: Online Banking

A bank uses TLS to authenticate its online banking service and protect customer sessions in transit. Sensitive database fields and backups are encrypted at rest. Code-signing certificates help verify application releases.

The bank must also monitor certificate expiration, protect private keys in HSMs, restrict key administrators, and investigate certificate-related alerts. Encryption does not replace fraud detection, secure coding, or IAM.

### Healthcare Organization: Clinical Devices and Records

A hospital encrypts managed laptops and backup media to reduce disclosure risk if devices are lost. Clinical applications use TLS when exchanging patient data.

Availability remains critical. Recovery keys must be protected but accessible through an approved emergency process. Poor key recovery planning could turn a hardware failure into a patient-care outage.

### Small Business: Lost Laptop

A small accounting firm uses full-disk encryption on employee laptops. A laptop is stolen from a vehicle while powered off. Strong disk encryption and protected credentials reduce the likelihood that client records can be read from the drive.

The firm still follows incident procedures: it records the loss, disables sessions, assesses notification obligations, and checks whether the device was compliant before theft.

### University: Internal PKI

A university operates an internal PKI for managed devices and secure Wi-Fi authentication. Certificates allow devices to authenticate without relying only on shared passwords.

Because students also use unmanaged devices, administrators must separate private-PKI trust from public services and avoid distributing private keys with certificate profiles.

### Government Agency: Document Signing

A government agency digitally signs official documents and software packages. Recipients verify signatures before trusting the content.

The agency protects signing keys with strong access controls, separation of duties, HSMs, and audit logging. If a signing key is suspected of compromise, it must be revoked and affected artifacts investigated.

### Hybrid Enterprise: Cloud and On-Premises Keys

A hybrid enterprise encrypts on-premises databases and cloud storage. It maintains a key inventory, assigns key owners, monitors cloud key usage, and separates cloud administrators from key administrators.

Central policy is essential because different platforms may use different key stores, certificate services, and renewal processes.

## 20. Security Operations Responsibilities

| Role | Cryptographic Responsibility |
|---|---|
| SOC analyst | Investigate certificate alerts, suspicious key access, unsigned software, and encryption-related events. |
| Security administrator | Configure encryption policies, certificates, key stores, and secure protocols. |
| Systems administrator | Deploy certificates, enable disk encryption, maintain recovery information, and remove weak protocols. |
| IAM analyst | Manage certificate-based authentication and access to keys or secrets. |
| Incident responder | Preserve hashes, assess key compromise, coordinate revocation, and document evidence integrity. |
| Vulnerability analyst | Identify deprecated protocols, weak cipher suites, expired certificates, and insecure cryptographic configurations. |
| Cloud security analyst | Review key policies, storage encryption, secret exposure, and cloud key-management logs. |

## 21. Security+ SY0-701 Alignment

This lesson supports Security+ concepts involving:

- Cryptographic solutions.
- Public key infrastructure.
- Certificates and certificate authorities.
- Symmetric and asymmetric encryption.
- Hashing and digital signatures.
- Data protection at rest and in transit.
- Key management.
- Secure protocols.
- Cryptographic implementation risks.

Cryptographic mechanisms are primarily technical controls. Their secure operation also depends on managerial controls such as policy and operational controls such as certificate renewal, key rotation, recovery testing, and incident procedures.

## 22. Classroom Hands-On Practical

### Practical Title

Verify File Integrity and Inspect a TLS Certificate

### Objectives

Students will:

- Calculate a SHA-256 digest.
- Demonstrate the avalanche effect.
- Explain why hashing is not encryption.
- Inspect certificate identity, issuer, validity, and trust information.
- Identify security and operational concerns.

### Safety and Authorization

Use only instructor-provided files and approved public or lab services. Do not capture credentials, bypass certificate warnings, or test systems without authorization.

### Part A: Windows File Hashing

1. Create or use an instructor-provided text file named `security-note.txt`.
2. Calculate its SHA-256 hash:

```powershell
Get-FileHash .\security-note.txt -Algorithm SHA256
```

3. Record the digest.
4. Change one character in the file and save it.
5. Calculate the hash again.
6. Compare the two values.

Alternative Windows command:

```powershell
certutil -hashfile .\security-note.txt SHA256
```

### Part B: Linux File Hashing

```bash
sha256sum security-note.txt
```

Modify one character and run the command again.

### Part C: Certificate Inspection

Using a browser on an instructor-approved HTTPS site:

1. Open the certificate viewer.
2. Record the subject or covered hostname.
3. Record the issuer.
4. Record the validity dates.
5. Identify the signature algorithm.
6. Identify the public-key type.
7. Review the certificate chain.

On a Linux lab system with OpenSSL, the instructor may use:

```bash
openssl s_client -connect example.com:443 -servername example.com
```

The student should not assume that a successful connection alone proves all application content is trustworthy.

### Student Analysis Questions

1. Why did the file digest change?
2. Can the original file be decrypted from its SHA-256 digest?
3. What identity does the certificate claim?
4. Which CA issued it?
5. Is the certificate currently valid?
6. What would a hostname mismatch mean?
7. Which part of the TLS process uses asymmetric cryptography?
8. Why does TLS use symmetric encryption after the handshake?

### Expected Evidence

Students submit:

- Both file digests.
- A brief explanation of the observed change.
- Certificate fields recorded in a table.
- A conclusion explaining the difference between integrity checking and encryption.

### Instructor Review Points

Confirm that students:

- Use SHA-256 rather than MD5 or SHA-1 for the exercise.
- Do not describe hashes as encrypted data.
- Distinguish certificate validity from website trustworthiness.
- Explain the performance role of symmetric encryption in TLS.
- Recognize that certificate validation includes hostname and trust-chain checks.

## 23. Take-Home Practical

### Assignment

Design a cryptographic protection plan for one of the following:

- A small accounting firm.
- A hospital department.
- A university records office.
- A bank branch.
- A government service portal.
- A hybrid cloud enterprise.

### Required Deliverables

Create a two-page report containing:

1. Five sensitive data assets.
2. The state of each asset: at rest, in transit, or in use.
3. The required security objective.
4. The recommended cryptographic mechanism.
5. The keys or certificates that must be managed.
6. One likely implementation failure.
7. One recovery or revocation requirement.
8. The role responsible for each operational task.

Use this format:

| Data Asset | Data State | Security Objective | Mechanism | Key or Certificate | Failure Risk | Owner |
|---|---|---|---|---|---|---|
| Customer backup | At rest | Confidentiality | Authenticated backup encryption | Backup encryption key | Key loss | Security administrator |

### Evaluation Criteria

- Correct selection of hashing, symmetric encryption, or asymmetric cryptography.
- Appropriate protection for each data state.
- Realistic key-management planning.
- Clear distinction between technical protection and operational responsibility.
- Professional writing and business relevance.

## 24. Assessment Questions

### Multiple Choice

1. Which cryptographic process produces a fixed-length, one-way representation of data?
   A. Symmetric encryption
   B. Hashing
   C. Tokenization
   D. Decryption

2. Which technology is most appropriate for efficiently encrypting a large backup file?
   A. Symmetric encryption
   B. An unkeyed hash
   C. A digital signature only
   D. Certificate revocation

3. What must be protected in an asymmetric key pair?
   A. Public key only
   B. Certificate serial number
   C. Private key
   D. Subject Alternative Name

4. What is the primary purpose of a certificate authority?
   A. Store every user's password
   B. Issue and sign digital certificates
   C. Encrypt all network traffic directly
   D. Replace endpoint protection

5. Which certificate field is normally used for modern TLS hostname validation?
   A. Subject Alternative Name
   B. Serial port
   C. File digest
   D. Recovery key

6. Which statement about TLS is correct?
   A. TLS proves every website is honest.
   B. TLS eliminates application vulnerabilities.
   C. TLS can protect confidentiality and integrity in transit.
   D. TLS encrypts data after it is displayed to the user.

7. What is a salt used for in password storage?
   A. To decrypt a forgotten password
   B. To ensure identical passwords do not produce identical stored values
   C. To replace the password hash
   D. To serve as a public certificate

8. What does certificate revocation accomplish?
   A. Extends the certificate validity period
   B. Invalidates a certificate before expiration
   C. Changes plaintext into ciphertext
   D. Creates a root CA

9. Which mechanism can provide integrity and signer authentication?
   A. Digital signature
   B. Plaintext password
   C. Anonymous file share
   D. Unencrypted HTTP

10. Which is the strongest response to suspected private-key compromise?
    A. Ignore it until the certificate expires
    B. Rename the certificate file
    C. Revoke and replace the certificate and investigate the exposure
    D. Publish the private key for validation

### Short Answer

1. Explain the difference between hashing and encryption.
2. Why do enterprise systems combine symmetric and asymmetric cryptography?
3. Explain how a digital signature supports integrity.
4. Describe the purpose of a certificate trust chain.
5. Explain one limitation of full-disk encryption.
6. Distinguish certificate expiration from revocation.
7. Why is key management as important as algorithm selection?
8. Give one example each of data at rest and data in transit.

### Scenario-Based Questions

1. A healthcare employee's encrypted laptop is stolen while powered off. Explain what encryption reduces and what incident-response actions are still required.
2. A web application accepts any certificate without validating the hostname or issuer. Identify the risk and recommend a correction.
3. A company loses the only key for an encrypted archive. Explain the security objective that is now affected and the missing operational control.
4. A software vendor publishes a SHA-256 hash beside a download, but an attacker can modify both values on the same server. Explain why stronger authenticity assurance is needed.
5. A certificate expires during a bank's busiest business period. Identify the technical and operational consequences and propose preventive controls.

## 25. Glossary

| Term | Definition |
|---|---|
| Advanced Encryption Standard (AES) | A widely used symmetric block cipher supporting 128-bit, 192-bit, and 256-bit keys. |
| Algorithm | A defined mathematical procedure used in a cryptographic operation. |
| Asymmetric Cryptography | Cryptography that uses a related public and private key pair. |
| Certificate Authority (CA) | A trusted entity that issues and digitally signs certificates. |
| Certificate Revocation List (CRL) | A signed list of certificates revoked by a CA. |
| Ciphertext | Data transformed into an unreadable form by encryption. |
| Collision | A condition in which different inputs produce the same hash digest. |
| Cryptography | Mathematical techniques used to protect information and communications. |
| Data at Rest | Data stored on media and not actively moving between systems. |
| Data in Transit | Data moving between systems, services, or networks. |
| Decryption | The authorized conversion of ciphertext back into plaintext. |
| Digital Certificate | A signed electronic document binding a public key to a subject. |
| Digital Signature | A value created with a private key and verified with the corresponding public key to support integrity and authentication. |
| Digest | The fixed-length output of a hash function. |
| Encryption | The conversion of plaintext into ciphertext using an algorithm and key. |
| Forward Secrecy | A property designed to prevent later compromise of a long-term key from exposing previously recorded session data. |
| Hardware Security Module (HSM) | A specialized device that protects keys and performs controlled cryptographic operations. |
| Hashing | A one-way process that maps input data to a fixed-length digest. |
| Initialization Vector (IV) | A value used by certain encryption modes to help produce unique ciphertext. |
| Key | A value controlling a cryptographic operation. |
| Key Escrow | Controlled storage of a recoverable copy of a cryptographic key. |
| Nonce | A value intended for limited or one-time use in a cryptographic operation. |
| Non-Repudiation | Assurance and evidence intended to prevent an entity from credibly denying an action. |
| Online Certificate Status Protocol (OCSP) | A protocol used to request the revocation status of a certificate. |
| Plaintext | Original readable data before encryption or after decryption. |
| Private Key | The protected member of an asymmetric key pair. |
| Public Key | The distributable member of an asymmetric key pair. |
| Public Key Infrastructure (PKI) | The people, policies, processes, hardware, software, and services used to manage certificates and public-key trust. |
| Root CA | The certificate authority serving as the trust anchor of a PKI hierarchy. |
| Salt | A unique random value combined with a password before password derivation. |
| Subject Alternative Name (SAN) | A certificate extension identifying covered names or addresses. |
| Symmetric Encryption | Encryption that uses the same secret key, or closely related secret keys, for encryption and decryption. |
| Transport Layer Security (TLS) | A protocol that protects application communications across networks. |
| Trust Chain | A certificate path from an end-entity certificate through issuing CAs to a trusted root. |

## 26. Lesson Review Checklist

Students should be able to confirm:

- I can explain what cryptography provides and what it does not provide.
- I can distinguish hashing from encryption.
- I can compare symmetric and asymmetric cryptography.
- I can explain why hybrid cryptography is used.
- I can describe digital signatures and their limitations.
- I can identify the major components of PKI.
- I can explain how a client validates a TLS certificate.
- I can distinguish data at rest, data in transit, and data in use.
- I can explain why keys must be managed throughout their lifecycle.
- I can identify common cryptographic implementation failures.
- I can apply cryptographic controls to enterprise scenarios.

## 27. Continuity With Future Lessons

Lesson 5 will build on these foundations through authentication and identity, including MFA, single sign-on, token-based authentication, password storage, and credential security.

Lesson 6 will apply cryptographic concepts to email security, HTTPS, certificate lifecycle operations, and the business impact of encryption failures.

Students should carry forward these questions:

- What security objective is required?
- Is the data at rest, in transit, or in use?
- Is hashing, symmetric encryption, asymmetric cryptography, or a combination appropriate?
- Who owns and protects the key?
- How is identity or trust established?
- What happens if a key is lost, exposed, or revoked?
- How will certificates and keys be monitored, renewed, recovered, and retired?
