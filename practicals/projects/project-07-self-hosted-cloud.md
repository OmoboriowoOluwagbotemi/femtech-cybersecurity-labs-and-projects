# Project 07 - Protect a Self-Hosted Cloud Storage Service

## Scenario

DesignWorks wants Dropbox-like file sharing without subscription cost. It has deployed a self-hosted MinIO object-storage lab in Docker on Ubuntu but uses HTTP, a shared administrator credential, public buckets, and no logs. Treat this as an IaaS-style workload and apply shared-responsibility thinking even though it is hosted locally.

**Duration:** 2 weeks
**Tools:** Ubuntu, Docker Engine, MinIO Community/AGPL build or instructor-approved open-source object store, OpenSSL/Nginx, pfSense, Wazuh, curl, MinIO client, Trivy, Git, Gitleaks, OpenTofu
**Lessons:** 4-6, 14, 21, 26, 36-37

## Free-Tool Caution

The instructor must verify the current MinIO Community distribution and licence before the cohort. If packaging or terms change, substitute another open-source S3-compatible service. Record version, source, digest, and licence; do not download unofficial binaries.

## Required Outcomes

- Private-by-default object access.
- Named or scoped service identities, no shared root use for applications.
- TLS with tested identity.
- Network and host restriction.
- Object/audit and platform logs ingested.
- Backup/restore and key/secret rotation procedure.
- Threat model for public exposure, credentials, data loss, and misconfiguration.

## Phase 1 - Baseline the Container and Exposure

```bash
sudo docker ps --no-trunc
sudo docker inspect <CONTAINER> > evidence/container-inspect.json
sudo docker image inspect <IMAGE> --format '{{json .RepoDigests}}'
sudo ss -lntup
sudo nft list ruleset
curl -I http://10.10.20.30:9000/
```

Inspect environment variables carefully; do not print secrets into transcripts or reports. Identify mounted volumes, ports, restart policy, user, capabilities, and update source.

## Phase 2 - Threat Model and Responsibility Matrix

Use STRIDE across browser/client, reverse proxy, object API, container, host, storage, identity, backup, and administrator. For each control, assign responsibility to platform/host operator, application owner, identity owner, data owner, or end user.

## Phase 3 - Scan the Supply Chain and Configuration

Pin the deployed image digest. Use Trivy to inspect vulnerabilities, secrets, misconfiguration, licences, and an SBOM:

```bash
trivy --version
trivy image --format json --output evidence/trivy-image.json <IMAGE>@<DIGEST>
trivy fs --scanners vuln,secret,misconfig --format json --output evidence/trivy-repository.json .
trivy image --format cyclonedx --output evidence/storage-sbom.cdx.json <IMAGE>@<DIGEST>
sha256sum evidence/trivy-*.json evidence/storage-sbom.cdx.json
```

Validate findings against the running component and exposure. Keep secret findings restricted and redacted.

Initialise a local Git repository with `.env`, state, plans, evidence originals, and secrets excluded. Run:

```bash
gitleaks dir --redact --report-format json --report-path evidence/gitleaks-tree.json .
gitleaks git --redact --report-format json --report-path evidence/gitleaks-history.json .
```

If an actual secret is detected, rotate it before cleaning history.

Model the lab configuration with OpenTofu or instructor-provided local Docker resources:

```bash
tofu fmt -recursive -check
tofu init
tofu validate
tofu plan -out=tfplan
tofu show -json tfplan > evidence/tfplan.json
trivy config .
```

Never commit state or plan files; treat both as sensitive.

## Phase 4 - TLS and Network Protection

Place Nginx in front of the service or use native TLS. Issue a lab certificate with SAN and protect the private key. Bind the object service to an internal address; allow client API and admin console from separate source aliases.

```bash
openssl s_client -connect storage.femtech.lab:443 -servername storage.femtech.lab -CAfile <LAB_ROOT_CA> -verify_return_error </dev/null
curl --cacert <LAB_ROOT_CA> -I https://storage.femtech.lab/
nc -vz -w 3 <STORAGE_IP> 9000
nc -vz -w 3 <STORAGE_IP> 9001
```

The client path may be allowed while the management console is denied from ordinary USERS.

## Phase 5 - Identity and Bucket Policy

Create separate synthetic identities for backup service, design team read/write, auditor read-only, and administrator. Use the official client for the installed version. Never pass secrets on a shared command line. Validate:

- Anonymous access denied.
- Design user can access only the project bucket.
- Auditor reads but cannot write/delete.
- Backup identity can write to backup destination but cannot administer.
- Root/admin is not used by applications.

Record policy documents and test results with secrets removed.

## Phase 6 - Logging and Detection

Collect host journal, Docker events/logs, Nginx access/error, authentication/audit events, file integrity for configuration, and Wazuh agent health. Build detections for public-policy change, repeated auth failure, admin-console access from USERS, configuration change, and telemetry loss.

```bash
sudo journalctl -u docker --since '-2 hours' --utc --no-pager
sudo docker logs --timestamps <CONTAINER>
sudo find /srv/object-data -maxdepth 2 -type f -printf '%TY-%Tm-%TdT%TH:%TM:%TS %u %g %s %p\n' | head
```

## Phase 7 - Backup, Restore, and Secret Rotation

Back up configuration and synthetic objects to a separate restricted repository. Restore to a new bucket/instance, validate hashes and permissions, and measure RPO/RTO. Rotate one non-root service credential, prove old denial and new success, and confirm dependent service recovery.

## Injects

1. A designer requests a public link for a client.
2. Container credentials appear in `docker inspect` evidence.
3. A bucket policy accidentally grants anonymous listing.
4. The image has an update, but the owner refuses downtime.

## Deliverables

- Architecture, data flow, STRIDE model, and responsibility matrix.
- Version/digest/licence and supply-chain record.
- Trivy vulnerability/secret/misconfiguration reports, CycloneDX SBOM, Gitleaks reports, and validated OpenTofu plan.
- TLS, firewall, identity, policy, and host-hardening evidence.
- Five detections with tests.
- Public-link governance, credential-rotation, backup/restore, and update runbooks.
- Risk assessment comparing self-hosting with a hypothetical SaaS model.
