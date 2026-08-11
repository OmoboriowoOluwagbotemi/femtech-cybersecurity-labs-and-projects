# Reusable Practical Templates

Ready-to-use CSV files:

- [Asset inventory template](asset-inventory-template.csv)
- [Asset reconciliation template](asset-reconciliation-template.csv)

## Scope and Authorisation

```text
Exercise/project:
Business owner:
Technical owner:
Authorising instructor:
Valid from/to UTC:
Source systems/IPs:
Target systems/IPs/CIDRs:
Permitted techniques:
Prohibited techniques:
Data handling requirements:
Stop conditions:
Emergency contact:
Approval signature/date:
```

## Change Ticket

```text
Change ID and owner:
Business reason:
Assets and dependencies:
Original state/evidence:
Exact proposed change:
Security and availability risk:
Preconditions:
Positive tests:
Negative tests:
Regression tests:
Monitoring/log tests:
Rollback triggers:
Rollback commands/actions:
Maintenance window and approval:
Actual result and evidence:
Residual risk/follow-up:
```

## Security Finding

```text
Title and finding ID:
Asset/owner/business service:
Observation:
Evidence and timestamp:
Reproduction steps:
Expected vs actual result:
Threat/vulnerability/control failure:
Business impact:
Likelihood and severity rationale:
CVSS/CWE/CVE/ATT&CK mapping, if justified:
Recommendation:
Validation test:
Compensating controls:
Limitations/uncertainty:
Owner/deadline/status:
```

## Risk Register Row

```csv
risk_id,asset,scenario,threat,vulnerability,existing_controls,likelihood,impact,inherent_risk,treatment,actions,owner,due_date,residual_risk,review_date,status,evidence
```

## Incident Timeline Row

```csv
time_utc,time_original,source,evidence_id,host,user,src_ip,dst_ip,event,fact_or_hypothesis,confidence,analyst,notes
```

## Executive Update

```text
What happened / current condition:
Business impact now:
What is confirmed:
What is not yet known:
Actions completed:
Decision or support needed:
Next update time:
```

## Test Case

```text
Test ID:
Control/requirement:
Precondition:
Exact action/command:
Expected result:
Actual result:
Evidence locator:
Pass/fail:
Defect/next action:
```

## Evidence Register

```csv
evidence_id,case_or_change,description,source,collector,collected_utc,original_path,working_path,sha256,timezone,handling,notes
```
