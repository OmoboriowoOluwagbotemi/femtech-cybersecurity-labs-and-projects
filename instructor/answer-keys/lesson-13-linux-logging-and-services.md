# Instructor Answer Key - Lesson 13: Linux Logging and Services

Do not distribute this file before the assessment closes. Accept defensible scenario and theory answers when students support their reasoning with accurate security concepts, evidence, and business context.

### Answer Key

1. **A.** Severity 0 represents an emergency condition; lower numbers are more urgent in syslog.
2. **A.** Debian-family systems commonly write authentication events to `/var/log/auth.log`.
3. **A.** `journalctl -u` filters journal records by systemd unit.
4. **A.** Enablement normally configures whether a unit participates in startup targets.
5. **A.** Disabling startup does not necessarily stop an already running service.
6. **A.** `systemctl list-timers` lists systemd timer units and their schedules.
7. **A.** Cron's limited environment can resolve commands differently, so absolute paths reduce ambiguity.
8. **A.** Rotation manages local growth through archival, compression, and retention.
9. **A.** Central storage supports cross-host correlation and can preserve records after local loss or tampering.
10. **A.** Daily alert review is a people-driven operational procedure.
