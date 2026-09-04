# FEMTECH Project Solution Guides

These instructor solution guides support the ten official course projects in `practicals/projects`.

They are written as reference implementations. Instructors may adapt IP addresses, hostnames, usernames, and available tools to match the classroom lab. Students should still be required to explain every command, screenshot, decision, failed test, and limitation in their own words.

## How To Use These Solutions

These solutions are not copy-and-paste scripts for students. Use them as instructor references and walkthrough guides. Each project should be taught as a sequence:

1. Read the business problem.
2. Define scope and safety limits.
3. Record the starting state.
4. Make one change at a time.
5. Explain the command or GUI setting before using it.
6. Validate the result immediately.
7. Save evidence.
8. Troubleshoot errors with notes.
9. Write the technical and management reports.

When a command block is provided, students must still replace lab-specific values, explain each option, and show the result. A submission should not pass if it only repeats commands without interpretation.

## Official Solution Index

| Project | Solution guide |
|---|---|
| Project 01 - Security Analyst Workstation and Evidence Workflow | [project-01-analyst-workstation-evidence-workflow-solution.md](project-01-analyst-workstation-evidence-workflow-solution.md) |
| Project 02 - AeroTech Linux File Access and System Hardening | [project-02-aerotech-linux-file-access-system-hardening-solution.md](project-02-aerotech-linux-file-access-system-hardening-solution.md) |
| Project 03 - Segment a Small Office Network with pfSense | [project-03-pfsense-small-office-segmentation-solution.md](project-03-pfsense-small-office-segmentation-solution.md) |
| Project 04 - Build Identity and Access for a Growing Company | [project-04-windows-server-active-directory-identity-solution.md](project-04-windows-server-active-directory-identity-solution.md) |
| Project 05 - Run a Vulnerability Assessment for an Internal Server | [project-05-internal-vulnerability-assessment-solution.md](project-05-internal-vulnerability-assessment-solution.md) |
| Project 06 - Operate a Junior SOC Monitoring Queue | [project-06-junior-soc-monitoring-queue-solution.md](project-06-junior-soc-monitoring-queue-solution.md) |
| Project 07 - Professional Vulnerability Remediation Engagement | [project-07-vulnerability-remediation-engagement-solution.md](project-07-vulnerability-remediation-engagement-solution.md) |
| Project 08 - Make a School Ransomware-Ready | [project-08-school-ransomware-readiness-solution.md](project-08-school-ransomware-readiness-solution.md) |
| Project 09 - Build a SOC and Segmentation Plan for a Fintech Startup | [project-09-fintech-soc-segmentation-solution.md](project-09-fintech-soc-segmentation-solution.md) |
| Project 10 - Defend Northstar Manufacturing Capstone | [project-10-northstar-manufacturing-capstone-solution.md](project-10-northstar-manufacturing-capstone-solution.md) |

## Instructor Quality Rules

- Do not accept screenshots alone when command output or exported configuration is possible.
- Do not accept fabricated evidence or unverifiable claims.
- Do not accept passwords, tokens, private keys, real personal data, or public scan results.
- Do not accept "it works" without positive and negative validation.
- Do not accept scanner findings without manual validation or a documented limitation.
- Do not accept broad permissions such as `777` as a final fix.
- Do not accept firewall `any to any` rules unless they are temporary, approved, and removed before final submission.

## Standard Evidence Closeout

Linux:

```bash
find evidence -type f ! -name hashes.sha256 -print0 | sort -z | xargs -0 sha256sum > evidence/hashes.sha256
sha256sum --check evidence/hashes.sha256
```

PowerShell:

```powershell
Get-ChildItem .\evidence -File -Recurse |
  Sort-Object FullName |
  ForEach-Object { "$(Get-FileHash $_.FullName -Algorithm SHA256 | Select-Object -ExpandProperty Hash) *$($_.FullName)" } |
  Set-Content .\evidence\hashes.sha256
```

Every solution ends with a management summary, a technical report, an evidence index, residual risk, and oral defense preparation.
