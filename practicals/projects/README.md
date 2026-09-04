# Professional Project Portfolio Guide

The course has exactly ten professional projects. The first seven projects validate the seven tool labs by asking students to use each tool skill to solve a realistic industry problem. Projects 08 to 10 combine the tools into larger portfolio engagements.

These projects are guided professional projects. Students receive a business problem, constraints, required outcomes, ordered work stages, and acceptance tests. They must not only paste commands. They must read each step, explain the purpose, perform the work, validate the result, troubleshoot errors, document evidence, and defend decisions like entry-level cybersecurity professionals.

## Project Pathway

| Project | Portfolio problem | Validates | Main tools |
|---|---|---|---|
| 01 | Build a security analyst workstation and evidence workflow | Tool Lab 01 | VirtualBox, Kali Linux, Bash |
| 02 | AeroTech Linux file access and system hardening | Tool Lab 02 | Ubuntu Server, Linux users/groups, permissions, SGID, ACLs, SSH, UFW, auditd, backup/recovery |
| 03 | Segment a small office network with pfSense | Tool Lab 03 | pfSense, firewall rules, aliases, logs |
| 04 | Build identity and access for a growing company | Tool Lab 04 | Windows Server, AD DS, DNS, GPO, Event Viewer |
| 05 | Run a vulnerability assessment for an internal server | Tool Lab 05 | Kali, Nmap, Greenbone/OpenVAS |
| 06 | Operate a junior SOC monitoring queue | Tool Lab 06 | Wazuh, Linux agent, Windows agent, alert triage |
| 07 | Complete a professional vulnerability remediation engagement | Advanced Lab 07 | Nmap, Greenbone/OpenVAS, Ubuntu, pfSense |
| 08 | Make a school ransomware-ready | Combined tools | pfSense, Windows Server, Ubuntu, Wazuh, backups |
| 09 | Build a SOC and segmentation plan for a fintech startup | Combined tools | pfSense, Wazuh, Suricata/Zeek, Windows, Linux |
| 10 | Defend Northstar Manufacturing capstone | Combined tools | All core course tools |

## Project Index

1. [Build a Security Analyst Workstation and Evidence Workflow](project-01-analyst-workstation-evidence-workflow.md)
2. [AeroTech Linux File Access and System Hardening](project-02-aerotech-linux-file-access-system-hardening.md)
3. [Segment a Small Office Network with pfSense](project-03-pfsense-small-office-segmentation.md)
4. [Build Identity and Access for a Growing Company](project-04-windows-server-active-directory-identity.md)
5. [Run a Vulnerability Assessment for an Internal Server](project-05-internal-vulnerability-assessment.md)
6. [Operate a Junior SOC Monitoring Queue](project-06-junior-soc-monitoring-queue.md)
7. [Complete a Professional Vulnerability Remediation Engagement](project-07-vulnerability-remediation-engagement.md)
8. [Make a School Ransomware-Ready](project-08-school-ransomware-readiness.md)
9. [Build a SOC and Segmentation Plan for a Fintech Startup](project-09-fintech-soc-segmentation.md)
10. [Defend Northstar Manufacturing](project-10-northstar-manufacturing-capstone.md)

## Optional Instructor Challenge Briefs

The files below are optional challenge briefs and are not counted as part of the ten-project pathway:

- [Fintech Payment Network Segmentation and IDS/IPS Defence](pfsense-ids-ips-student-task-brief.md)

## Why The Projects Exist

The labs teach students how to operate tools. The projects prove students can use those tools to solve business problems.

Recruiters and hiring managers should be able to review a student's sanitized portfolio and see:

- Clear scope and authorization.
- Strong fundamentals, not blind tool usage.
- Evidence that controls worked.
- Evidence that blocked or denied tests worked.
- Troubleshooting notes.
- Risk-based decisions.
- Technical documentation.
- Plain-language management communication.

## Mandatory Project Rules

1. Work only on systems explicitly listed in the project scope.
2. Use synthetic data only.
3. Do not scan public systems.
4. Do not use real credentials, real patient records, real student records, real financial records, or real employer data.
5. Do not run denial-of-service tests, real malware, credential theft, persistence, or public exploit code.
6. Record source, target, purpose, date, time, and approval before scanning or making security changes.
7. Capture before, change, after, and rollback evidence.
8. Run both positive and negative validation tests.
9. Sanitize secrets before publishing portfolio evidence.
10. Explain limitations and residual risk honestly.

## Required Project Stages

Every project must include:

| Stage | Student output |
|---|---|
| Scope | Written authorization, allowed targets, prohibited actions, stop conditions |
| Discovery | Asset, identity, service, data, and dependency notes |
| Plan | Requirements, assumptions, risks, test plan, rollback plan |
| Build | Configuration or investigation work with evidence |
| Validate | Positive tests, negative tests, regression checks, logs |
| Troubleshoot | Error, hypothesis, test, result, fix |
| Report | Technical report, management summary, evidence index |
| Defend | Oral explanation of decisions and evidence |

## Step-by-Step Learning Rule

For every project from 01 to 10, students must follow this method:

1. Read the scenario and identify the business risk.
2. Write the scope before touching the system.
3. Record the starting state.
4. Complete one work package at a time.
5. Before using any command or GUI setting, explain what it is expected to change.
6. After every change, verify the result with evidence.
7. Run both allowed and denied tests where access control is involved.
8. Troubleshoot by writing the error, likely cause, test, result, and fix.
9. Write a technical report for IT staff.
10. Write a short management summary for non-technical stakeholders.

Commands in project briefs and solution guides are examples to support learning. Students must adapt names, IP addresses, interfaces, and paths to their own lab and must be able to explain every command in an oral defense.

## Standard Submission Folder

```text
project-name/
  README.md
  scope-and-authorization.md
  design-or-plan/
  evidence/
    01-before/
    02-change/
    03-validation/
    04-troubleshooting/
    05-report-support/
  reports/
    technical-report.md
    executive-summary.md
  portfolio/
    sanitized-summary.md
    screenshots/
  hashes.sha256
```

## Evidence Quality Standard

Strong evidence includes:

- Hostname and IP address proof.
- Date and UTC time.
- Commands or GUI path used.
- Saved terminal output.
- Screenshots with enough context.
- Exported configurations or reports.
- Log entries showing allowed, denied, failed, or changed activity.
- Hashes for important files.
- Student interpretation.

A screenshot alone is weak evidence if it does not show what system, time, user, or test produced the result.

## Portfolio Safety

Students may publish sanitized project summaries, but they must not publish:

- Passwords.
- Tokens.
- Private keys.
- Real names of private individuals.
- Real customer, patient, student, or employee records.
- Public IP scan results.
- Vulnerability reports for systems they do not own.
- Screenshots exposing secrets or personal data.

## Project Assessment Model

Each project is scored out of 100:

| Category | Points | Full-credit standard |
|---|---:|---|
| Scope, safety, and ethics | 10 | Clear authorization, correct targets, no real data, no unsafe activity |
| Technical fundamentals | 15 | Student explains the underlying concepts, not only tool buttons |
| Implementation or investigation | 20 | The project work solves the stated business problem |
| Validation | 20 | Positive, negative, log, and regression evidence prove the outcome |
| Troubleshooting | 10 | Student documents problems clearly and fixes them logically |
| Evidence quality | 10 | Evidence is timestamped, organized, hashed, and sanitized |
| Reporting | 10 | Technical report and executive summary are clear and useful |
| Oral defense | 5 | Student can explain decisions, trade-offs, and remaining risk |

## First-Job Readiness Standard

The projects are foundational, but they must still look professional. A student who completes them well should be able to discuss real entry-level tasks such as:

- Setting up an analyst workstation.
- Hardening Linux services.
- Creating firewall rules and validating segmentation.
- Managing Windows users, groups, and GPO basics.
- Running a safe vulnerability assessment.
- Triage of SIEM alerts.
- Explaining risk to a manager.
- Writing evidence-based security reports.

Completion does not guarantee employment. The goal is to produce practical proof that a student has solid fundamentals, can troubleshoot, and can use tools responsibly to solve real security problems.
