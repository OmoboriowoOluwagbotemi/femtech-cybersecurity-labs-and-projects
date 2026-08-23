# FEMTECH Cybersecurity Labs and Projects

A complete practical cybersecurity training repository containing 40 lessons, 16 detailed guided labs, and 11 scenario-based professional projects.

## Start Here

- [Course curriculum](COURSE_CURRICULUM.md)
- [Course continuity and concept memory](COURSE_MEMORY.md)
- [Practical programme guide](practicals/README.md)
- [Complete tool-mastery guide](practicals/TOOL_MASTERY_GUIDE.md)
- [16 guided labs](practicals/labs/README.md)
- [11 professional projects](practicals/projects/README.md)
- [Separate instructor solution guides](solutions/README.md)
- [Evidence and reporting templates](practicals/templates/README.md)
- [Assessments](assessments/)

## Practical Approach

Students learn to:

- Build and prove an isolated VirtualBox cyber range.
- Administer and harden Ubuntu, Windows Server, Windows endpoints, Active Directory, and pfSense.
- Use Nmap, Wireshark, Suricata, Zeek, Greenbone, OWASP ZAP, Wazuh, Sigma, Sysmon, osquery, YARA, Chainsaw, Volatility, Sleuth Kit, Trivy, Gitleaks, OpenTofu, and other free tools.
- Validate controls with positive, negative, regression, monitoring, and rollback tests.
- Preserve evidence and communicate findings to technical and executive audiences.
- Respond to realistic business constraints and incident injects.

## Safety

All vulnerable systems and security tests must remain in an explicitly authorised, isolated lab. Never bridge an intentionally vulnerable VM, test public systems, use production credentials, or publish collected evidence.

Windows Server and Windows 11 are used only through official time-limited evaluation editions. They are not free production licences.

## Google Forms Assessment Scripts

The Apps Script files use the placeholder `YOUR_GOOGLE_FORM_ID`. Replace it locally with the identifier of a form you own or are authorised to administer. Do not commit the real identifier, student data, tokens, or credentials.

## Repository Hygiene

The `.gitignore` excludes common credentials, private keys, Wazuh password archives, infrastructure state, PCAPs, EVTX files, disk/memory images, VM images, and generated security reports. Always run a secret scan before publishing portfolio work.
