# Lesson 15: Bash and Python Basics

## Lesson Overview

Security professionals use scripts to collect evidence, parse logs, check configuration, validate indicators, and automate repetitive tasks. Automation improves consistency, but unsafe scripts can delete evidence, expose secrets, overload systems, or apply the wrong action at scale.

This lesson introduces variables, loops, conditionals, functions, regular expressions, log parsing, and simple security scripts in Bash and Python.

## Learning Objectives

Students will be able to:

- Explain the purpose and limits of security scripting.
- Create and use variables safely.
- Apply conditionals, loops, and functions.
- Use regular expressions for structured text matching.
- Parse sample security logs with Bash and Python.
- Validate input and handle common errors.
- Produce useful script output and exit codes.
- Protect credentials, evidence, and production systems during automation.

## Prerequisite Knowledge

Students should understand Linux commands, permissions, logs, services, hardening, and the isolated lab built in Lessons 10 through 14.

## Enterprise Relevance

Scripts support:

- SOC enrichment and triage.
- Configuration and baseline checks.
- Vulnerability data processing.
- File-integrity verification.
- Log normalization.
- Incident evidence collection.
- Cloud administration.
- Repetitive system maintenance.

Scripts must be reviewed, tested, versioned, monitored, and assigned an owner.

## 1. Security Scripting

### What

A script is a sequence of instructions executed by an interpreter or shell.

### Why

Manual work is slow and inconsistent at scale. Scripts make a process repeatable.

### How

A script accepts input, performs logic, handles errors, and produces output.

### Where

Scripts run on analyst workstations, servers, cloud automation systems, CI/CD pipelines, SIEM platforms, and incident-response tools.

## 2. Bash and Python Comparison

| Characteristic | Bash | Python |
|---|---|---|
| Strength | Combining operating-system commands | Structured logic and data processing |
| Common use | Administration and command pipelines | Parsing, APIs, automation, analysis |
| Data model | Primarily text and command results | Rich objects, collections, modules |
| Portability | Best on Unix-like systems | Cross-platform when dependencies permit |
| Risk | Quoting, expansion, and shell injection | Dependency, unsafe deserialization, and logic risks |

Use the language that matches the task and existing enterprise standards.

## 3. Script Safety

Before automation:

1. Define the task and authorization.
2. Identify inputs and trusted boundaries.
3. Use synthetic or copied data.
4. Test on a small scope.
5. Add a dry-run mode for changes.
6. Log actions without exposing secrets.
7. Handle failures safely.
8. Define rollback.
9. Review code.
10. Validate results.

Never automate a command that is not understood manually.

## 4. Bash Script Structure

```bash
#!/usr/bin/env bash

set -o nounset
set -o pipefail

main() {
    printf '%s\n' "Security script started"
}

main "$@"
```

The shebang selects an interpreter through the environment. `nounset` helps detect unset variables; `pipefail` makes a pipeline reflect failures. `errexit` may be useful but has context-dependent behavior and must not replace explicit error handling.

## 5. Bash Variables

```bash
log_file="/var/log/auth.log"
case_name="IR-2026-001"
readonly case_name
printf 'Case: %s\n' "$case_name"
```

Rules:

- Do not put spaces around `=`.
- Quote expansions: `"$variable"`.
- Use meaningful names.
- Do not store secrets in source code.
- Use `readonly` for values that should not change.

Command substitution:

```bash
current_user="$(whoami)"
```

Treat command output as untrusted input.

## 6. Python Script Structure

```python
#!/usr/bin/env python3

def main():
    print("Security script started")


if __name__ == "__main__":
    main()
```

The main guard prevents automatic execution when the file is imported as a module.

## 7. Python Variables and Types

```python
case_name = "IR-2026-001"
failed_count = 4
is_confirmed = False
source_ips = ["192.0.2.10", "192.0.2.11"]
event = {"user": "analyst", "result": "failed"}
```

Common types:

| Type | Example |
|---|---|
| String | `"failed"` |
| Integer | `4` |
| Float | `4.5` |
| Boolean | `True` |
| List | `["a", "b"]` |
| Dictionary | `{"user": "analyst"}` |
| Set | `{"192.0.2.10"}` |

## 8. Input

Bash positional arguments:

```bash
input_file="${1:-}"
if [[ -z "$input_file" ]]; then
    printf '%s\n' "Usage: script.sh FILE" >&2
    exit 2
fi
```

Python arguments:

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("file")
args = parser.parse_args()
```

Validate that a path exists, is the expected type, is within authorized scope, and is not an unintended symbolic link before changing it.

## 9. Conditionals

Bash:

```bash
if [[ -r "$log_file" ]]; then
    printf '%s\n' "Readable"
else
    printf '%s\n' "Cannot read log" >&2
fi
```

Python:

```python
from pathlib import Path

log_file = Path("auth.log")
if log_file.is_file():
    print("File exists")
else:
    print("File not found")
```

Conditionals make decisions based on evaluated conditions. They should include explicit handling for expected failure states.

## 10. Loops

Bash:

```bash
for file in "$directory"/*.log; do
    [[ -e "$file" ]] || continue
    printf '%s\n' "$file"
done
```

Safe line reading:

```bash
while IFS= read -r line; do
    printf '%s\n' "$line"
done < "$log_file"
```

Python:

```python
for source_ip in source_ips:
    print(source_ip)

with open("auth.log", encoding="utf-8", errors="replace") as handle:
    for line in handle:
        print(line.rstrip())
```

Process large files line by line rather than loading everything into memory.

## 11. Functions

Bash:

```bash
is_readable_file() {
    local path="$1"
    [[ -f "$path" && -r "$path" ]]
}
```

Python:

```python
from pathlib import Path

def is_readable_file(path):
    candidate = Path(path)
    return candidate.is_file()
```

Functions should perform one clear task, have meaningful names, avoid hidden global state, and return predictable results.

## 12. Exit Status and Exceptions

Bash commands return an exit status. Zero conventionally means success; nonzero means failure.

```bash
if grep -q "Failed password" "$log_file"; then
    printf '%s\n' "Matches found"
fi
```

Python uses exceptions:

```python
from pathlib import Path

try:
    text = Path("auth.log").read_text(encoding="utf-8")
except OSError as error:
    print(f"Read failed: {error}")
```

Catch errors that can be handled. Do not suppress every exception or continue after an unsafe partial failure.

## 13. Regular Expressions

### What

A regular expression is a pattern language for matching text.

### Why

Logs contain repeated structures such as IP addresses, usernames, dates, and event phrases.

### How

| Pattern | Meaning |
|---|---|
| `^` | Start of line |
| `$` | End of line |
| `.` | Any character except newline in common modes |
| `*` | Zero or more repetitions |
| `+` | One or more repetitions |
| `?` | Optional or non-greedy modifier depending on context |
| `[0-9]` | One digit |
| `[^ ]` | One character other than a space |
| `(...)` | Group |
| `\.` | Literal dot |

Regex syntax varies among tools. Test patterns against representative data.

## 14. Regex Security Considerations

- Avoid assuming a matched IP-like string is a valid IP address.
- Anchor patterns when the whole field must match.
- Limit input size.
- Avoid catastrophically expensive patterns.
- Do not parse complex formats such as JSON with regex when a parser exists.
- Treat extracted content as untrusted.
- Preserve original records.

## 15. Bash Log Parsing

Count failed SSH messages:

```bash
grep -c "Failed password" auth-sample.log
```

Extract source fields from a known sample format:

```bash
grep "Failed password" auth-sample.log |
awk '{for (i=1; i<=NF; i++) if ($i=="from") print $(i+1)}' |
sort |
uniq -c |
sort -nr
```

This pipeline depends on log wording. Production parsing should account for formats, IPv6, malformed data, localization, and structured alternatives.

## 16. Python Log Parsing

```python
import re
from collections import Counter
from pathlib import Path

pattern = re.compile(r"Failed password .* from (?P<ip>\S+) port ")
counts = Counter()

with Path("auth-sample.log").open(
    encoding="utf-8", errors="replace"
) as handle:
    for line in handle:
        match = pattern.search(line)
        if match:
            counts[match.group("ip")] += 1

for address, count in counts.most_common():
    print(f"{address}\t{count}")
```

For IP validation:

```python
import ipaddress

address = ipaddress.ip_address(value)
```

Use standard parsers for CSV, JSON, timestamps, IP addresses, and URLs instead of rebuilding them with string splitting.

## 17. Simple File Hash Script

Python:

```python
import hashlib
from pathlib import Path

def sha256_file(path):
    digest = hashlib.sha256()
    with Path(path).open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()
```

The script reads in blocks, supporting large files. A hash can verify change relative to a trusted value, but it does not prove safety or authorship by itself.

Bash can use:

```bash
sha256sum -- "$file"
```

The `--` ends option parsing, helping with filenames beginning with `-`.

## 18. Security Script Design

### Input

- Accept explicit paths and parameters.
- Validate format, size, ownership, and scope.
- Reject unsafe or ambiguous values.

### Processing

- Prefer structured libraries.
- Avoid shell construction from input.
- Use least privilege.
- Apply resource limits and timeouts where needed.

### Output

- Produce timestamps and clear status.
- Separate human-readable and machine-readable output where useful.
- Avoid logging passwords, tokens, private keys, or regulated data.
- Return meaningful exit codes.

### Operations

- Version control scripts.
- Require peer review for high-impact automation.
- Sign or verify deployment artifacts where appropriate.
- Test updates.
- Monitor execution.
- Assign owner and retirement date.

## 19. Common Scripting Risks

| Risk | Example | Control |
|---|---|---|
| Command injection | User input concatenated into a shell command | Avoid shell; fixed argument arrays and validation |
| Unquoted expansion | Filename splits into multiple arguments | Quote Bash variables |
| Secret exposure | Token in source or process arguments | Managed secret store |
| Excess privilege | Script always runs as root | Least privilege and scoped sudo |
| Unsafe file handling | Predictable temporary filename | Secure temporary-file APIs |
| Race condition | File changes between validation and use | Atomic operations and secure design |
| Partial failure | Half of many systems are changed | Transactions, checkpoints, rollback |
| Excessive output | Script logs sensitive records | Redaction and access control |
| Dependency risk | Unreviewed external package | Approved repositories and version controls |

## 20. Evidence Preservation

An evidence-collection script should:

- Record start and end time.
- Record hostname, user, script version, and arguments where safe.
- Avoid modifying source artifacts.
- Write to a controlled destination.
- Hash collected output.
- Record errors.
- Preserve metadata where required.
- Be tested before an incident.

Automation does not automatically create forensic soundness. Collection methods must match organizational and legal procedures.

## 21. Enterprise Scenarios

### Small Business

A Bash script checks whether approved backups exist and alerts on age. It does not claim that files are restorable; recovery testing remains separate.

### Financial Institution

A Python parser normalizes authentication events into approved fields. Test datasets include malformed lines, IPv6, time zones, and missing values.

### Healthcare Organization

An inventory script accidentally prints patient-data paths into an open ticket. The team implements data minimization, redaction, and restricted output.

### University

A student writes a cleanup script with an unchecked path variable. Review catches the risk before recursive deletion. The script gains scope validation and dry-run mode.

### Government Agency

An incident collector records command output, timestamps, hashes, and errors. The script version is approved and preserved with the case.

### Cloud Environment

A script inventories cloud resources using a managed identity with read-only scope. Credentials are not embedded in code.

## 22. Security+ SY0-701 Alignment

This lesson supports automation, log analysis, secure coding, input validation, indicators, file integrity, least privilege, secrets management, and incident evidence.

Script validation and access restrictions are technical controls. Review, testing, deployment, and rollback are operational controls. Secure scripting standards are managerial controls and directive in function.

## 23. Programming and Secure Automation Depth

### Shell Parsing Stages

Bash performs parsing, expansions, word splitting, and pathname expansion before launching external commands. Quoting controls those stages. Double quotes preserve most text while still allowing variable and command substitution; single quotes preserve literal content. Unquoted variables can become multiple arguments or wildcard matches.

Arrays are safer than constructed command strings:

```bash
command=(grep -n -- "$pattern" "$file")
"${command[@]}"
```

Do not pass untrusted values to `eval` or construct a string for `bash -c`.

### Python Subprocess Safety

When Python must run an external program, pass an argument list and avoid a shell:

```python
import subprocess

result = subprocess.run(
    ["sha256sum", "--", str(path)],
    check=True,
    capture_output=True,
    text=True,
    timeout=30,
)
```

`shell=True` introduces shell interpretation and should not be used with untrusted content.

### Data Validation Versus Sanitization

Validation decides whether input conforms to an expected type, range, length, and business rule. Sanitization transforms content for a specific destination. Neither is a universal operation. A value safe as a filename is not automatically safe in SQL, HTML, a shell, or a URL.

### Time Handling

Security logs may contain local time, UTC, offsets, daylight-saving transitions, or incomplete dates. Parse timestamps into timezone-aware values, preserve the original representation, and normalize a copy for correlation.

### Testing Strategy

Unit tests verify functions. Integration tests verify interaction with files, commands, and services. Negative tests verify rejection of malformed or unauthorized input. Boundary tests cover empty, maximum-size, duplicate, Unicode, IPv6, and time-transition cases. A dry run must exercise the same selection logic as live mode while suppressing changes.

### Idempotence and Concurrency

An idempotent script can run repeatedly without creating unintended repeated changes. Automation should also consider two copies running simultaneously, files changing during processing, partial network failure, retries, and rate limits. Use locks, atomic writes, unique temporary files, checkpoints, and bounded retries where required.

### Structured Output

For machine processing, produce documented JSON or CSV with stable field names and explicit schema version. Send diagnostics to standard error and data to standard output. Do not mix banners with structured records.

## 24. Classroom Hands-On Practical

### Practical Title

Build a Failed-Login Analyzer

### Safety

Use an instructor-provided copied log. Do not parse production logs or automatically block addresses.

### Requirements

Create either a Bash or Python script that:

1. Accepts a log path.
2. Confirms it is a readable regular file.
3. Finds lines containing `Failed password`.
4. Extracts the source IP from the approved sample format.
5. Counts events by source.
6. Sorts highest count first.
7. Reports malformed matching lines.
8. Returns a nonzero exit code for invalid input.
9. Does not modify the input.
10. Writes optional output only to an explicit destination.

### Test Cases

| Test | Expected Result |
|---|---|
| Valid sample | Correct counts |
| Missing file | Clear error and nonzero exit |
| Empty file | Zero matches without crash |
| Malformed line | Counted as parse error |
| Filename with spaces | Handled safely |
| Duplicate events | Counted individually |

### Analysis

Students explain:

- Why a high count is not proof of compromise.
- Which additional logs are needed.
- Why automatic blocking could harm shared users.
- How IPv6 and format changes affect parsing.

## 25. Take-Home Practical

Create the same analyzer in the other language. Include:

- Usage help.
- Input validation.
- Functions.
- At least one regular expression.
- Exception or exit-status handling.
- CSV or JSON output using a structured library where applicable.
- Six tests.
- A short threat model.
- Deployment and rollback notes.

## 26. Assessment Questions

### Multiple Choice

1. Which language is especially suited to combining Linux commands?
   A. Bash
   B. SQL only
   C. HTML
   D. DNS

2. Why quote Bash variable expansions?
   A. Prevent unintended splitting and wildcard expansion
   B. Grant root access
   C. Encrypt output
   D. Start a service

3. What does a zero exit status conventionally mean?
   A. Success
   B. Malware
   C. Root login
   D. No logging

4. Which Python structure maps keys to values?
   A. Dictionary
   B. Float
   C. Boolean
   D. Comment

5. Which regex symbol anchors the start of a line?
   A. `^`
   B. `$`
   C. `+`
   D. `.`

6. Why use a JSON parser instead of regex?
   A. It understands structured syntax and edge cases
   B. It always grants access
   C. It removes encryption
   D. It changes ownership

7. What does `--` commonly do in a command?
   A. Ends option parsing
   B. Deletes the system
   C. Starts Python
   D. Enables SSH

8. Why include dry-run mode?
   A. Preview intended changes safely
   B. Hide errors
   C. Expose secrets
   D. Avoid validation

9. What should a security script never log?
   A. Plaintext credentials or tokens
   B. Its version
   C. A safe timestamp
   D. A non-sensitive status

10. Which is an operational control?
    A. Peer review and deployment procedure
    B. Python `if` statement
    C. Bash variable
    D. Regex engine

### Short Answer

1. Compare Bash and Python security use cases.
2. Explain variables, conditionals, loops, and functions.
3. Describe five input-validation checks.
4. Explain exit statuses and exceptions.
5. List five regex risks or limitations.
6. Explain why log parsers should preserve original records.
7. Describe four command-injection defenses.
8. List evidence-collection script requirements.

### Scenario Questions

1. A root script constructs a shell command from a username. Assess and redesign it.
2. A parser crashes on malformed UTF-8. Describe resilient handling.
3. An automation job changes only half of 500 servers. Describe response and design improvements.
4. A script places an API token in logs. Describe containment and remediation.

### Answer Key

1. **A.** Bash is designed to compose Unix-like commands and pipelines.
2. **A.** Quoting prevents unintended word splitting and pathname expansion of a variable's content.
3. **A.** By convention, zero indicates successful process completion.
4. **A.** A Python dictionary maps keys to associated values.
5. **A.** `^` anchors a match at the beginning of a line or string under the applicable mode.
6. **A.** A structured parser understands quoting, escaping, nesting, and malformed syntax defined by the format.
7. **A.** `--` commonly marks the end of options so a following filename beginning with `-` is treated as an operand.
8. **A.** Dry run allows operators to review selected actions before modification.
9. **A.** Plaintext secrets in logs create additional credential exposure and retention.
10. **A.** Peer review and deployment are people-driven operational processes.

## 27. Glossary

| Term | Definition |
|---|---|
| Argument | Value supplied to a command, script, or function. |
| Conditional | Logic selecting actions based on a condition. |
| Dry Run | Mode showing intended actions without applying them. |
| Exception | Python mechanism representing an error or unusual condition. |
| Exit Status | Numeric result returned by a process. |
| Function | Named reusable block of logic. |
| Loop | Logic repeating an action over items or while a condition holds. |
| Parser | Software interpreting input according to a defined structure. |
| Regular Expression | Pattern language for matching text. |
| Shebang | First script line selecting an interpreter. |
| Variable | Named reference to a value. |

## 28. Lesson Review Checklist

- I can use variables, conditionals, loops, and functions.
- I can write basic Bash and Python scripts.
- I can use regex cautiously.
- I can parse copied logs safely.
- I can validate inputs and handle errors.
- I can protect secrets and evidence.
- I can test and review automation before deployment.

## 29. Continuity With Future Lessons

Lesson 16 applies Linux commands and scripting to interfaces, sockets, DNS, HTTP, SSH tunneling, Samba, and secure file sharing.
