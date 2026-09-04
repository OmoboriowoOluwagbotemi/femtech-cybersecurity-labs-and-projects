# Project 01 - Security Analyst Workstation and Evidence Workflow

## Portfolio Problem

A small IT support company wants to prepare a junior cybersecurity analyst workstation for safe internal investigations. The workstation must use Kali Linux in VirtualBox, organize evidence properly, run basic Linux commands confidently, and produce a sanitized portfolio report.

## Validates

Tool Lab 01 - Introduction to VirtualBox, Kali Linux, and Bash.

## Business Scenario

FEMTECH Support Services helps small businesses review suspicious emails, collect screenshots, inspect logs, and document findings. The company does not want beginners saving files randomly on the desktop or running commands they cannot explain.

Your job is to build a repeatable analyst evidence workflow using only Kali Linux, Bash, and VirtualBox.

## Required Outcomes

- Kali runs in an isolated VM.
- The student can explain VirtualBox network mode used.
- Evidence is stored in a clean folder structure.
- Linux navigation, files, permissions, processes, services, packages, logs, networking, and Bash basics are demonstrated.
- A simple Bash script collects safe system information.
- Hashes prove evidence integrity.
- The final report is safe to show in a portfolio.

## Required Work

1. Verify Kali VM name, resource allocation, and network mode.
2. Create a project evidence folder.
3. Record hostname, user, date, OS version, IP address, route, processes, services, package samples, and safe log samples.
4. Create practice files and demonstrate `600`, `644`, and `750` permissions.
5. Write a Bash review script that prints hostname, user, date, IP address, route, disk, memory, and selected service information.
6. Run the script and save output.
7. Create SHA256 hashes for evidence files.
8. Write a technical report and a sanitized portfolio summary.

## Minimum Evidence

```text
01-vm-network-proof.txt
02-hostname-user-date.txt
03-os-network-route.txt
04-file-permission-tests.txt
05-process-service-package-evidence.txt
06-safe-log-review.txt
07-linux-review-script.sh
08-script-output.txt
09-hashes.sha256
technical-report.md
portfolio-summary.md
```

## Acceptance Tests

| Test | Expected result |
|---|---|
| Student can open Kali terminal | Commands run successfully |
| Student can explain current directory | `pwd` and `ls` output are understood |
| Student can protect a file | Permission change is visible with `ls -l` |
| Student can run their script | Script output is saved |
| Student can hash evidence | SHA256 file exists |
| Student can explain evidence | Report describes what each file proves |

## Oral Defense

1. Why is evidence organization important?
2. What does `chmod 600` protect?
3. What does a hash prove and what does it not prove?
4. Why should beginners avoid unknown `sudo` commands?
5. How would this workflow help in a real junior analyst role?

## Recruiter-Visible Portfolio Artifact

Submit a sanitized `portfolio-summary.md` showing the evidence structure, script purpose, example safe outputs, lessons learned, and troubleshooting notes. Do not publish usernames, hostnames, IPs, or logs from real systems.
