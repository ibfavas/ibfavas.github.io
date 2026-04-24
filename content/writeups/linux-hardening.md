+++
title = "🐧 Linux Infrastructure Hardening & SIEM Orchestration"
date = 2026-04-01T10:00:00+05:30
draft = false
description = "Technical walkthrough covering the remediation of 100+ misconfigurations on a minimalist Arch Linux endpoint to achieve an 83% CIS Benchmark score. Demonstrates a defense-in-depth methodology, shifting from a vulnerable baseline to a production-hardened posture via layered kernel, filesystem, and identity-level controls."
+++
# Linux Infrastructure Hardening and SIEM Orchestration

**Compliance status:** `83%`  
**Starting baseline:** `26%`  
**Framework:** CIS Arch Linux Benchmark  
**Environment:** Arch Linux security lab with Wazuh-based monitoring

---

## 1. Executive Summary
This project documents the hardening of a newly deployed Arch Linux system using CIS-aligned controls and centralized monitoring through Wazuh. The goal was not only to raise the benchmark score, but to build a host that was easier to audit, harder to misuse, and capable of producing actionable security telemetry.

Over the course of the engagement, I remediated more than 100 configuration issues spanning identity management, filesystem protections, kernel behavior, and network exposure. The final system reached `83%` CIS compliance and produced materially stronger audit coverage through `auditd`, Wazuh SCA, and policy-driven service restrictions.

---

## 2. Technical Stack
- **Operating system:** Arch Linux
- **Monitoring platform:** Wazuh `4.14.4` deployed in Docker
- **Instrumentation:** `auditd`, `libpwquality`
- **Hardening controls:** `pam_pwquality`, `systemd`, `sysctl`, `visudo`, `ip6tables`
- **Automation environment:** Fish shell for repeatable remediation steps

---

## 3. The Monitoring Dashboard
Wazuh served as the operational center for the project. It provided a consolidated view of benchmark findings, agent health, vulnerability data, and MITRE ATT&CK-aligned detections, which made it easier to validate each remediation step against a measurable control outcome.

![Wazuh Dashboard](/writeups/assets/linux-hardening/dashboard-wazuh.png)
*Figure 1. Wazuh dashboard showing the monitored Arch Linux endpoint and active security telemetry.*

---

## 4. Implementation Phases

### Phase 1: Instrumentation & Baseline
The first step was to deploy the Wazuh manager and enroll the Arch Linux host as an agent. Once the agent began reporting, the initial Security Configuration Assessment established a baseline score of `26%`. Most failures were concentrated in authentication controls, service exposure, and auditability.

![Baseline Scan](/writeups/assets/linux-hardening/CIS-26.png)
*Figure 2. Initial CIS assessment showing low baseline compliance and multiple gaps in core host protections.*

### Phase 2: Remediation Sprints
To keep the work structured, I grouped remediation into focused sprints based on control families rather than fixing findings one by one.

#### Sprint A: Identity and Access Management
- **Sudo hardening:** Enabled `use_pty` and configured dedicated `sudo` logging to improve command accountability.
- **Privilege restriction:** Limited `su` access to the `wheel` group with `pam_wheel.so`.
- **Password policy:** Enforced password aging and complexity requirements through `login.defs` and related PAM controls.

#### Sprint B: Filesystem and Kernel Hardening
- **Mount restrictions:** Applied `noexec`, `nosuid`, and `nodev` on `/tmp`, `/var/tmp`, and `/dev/shm`.
- **Kernel module policy:** Added `modprobe` rules to disable unnecessary or risky filesystem modules and to block unauthorized USB storage support.

![Mid-Project Progress](/writeups/assets/linux-hardening/CIS-55.png)
*Figure 3. Mid-project assessment after initial filesystem, kernel, and service hardening raised compliance to 55%.*

#### Sprint C: Network Surface Reduction
- **Service masking:** Disabled and masked legacy services such as FTP, Telnet, SNMP, and HTTP where they were not required.
- **Kernel network settings:** Tightened `sysctl` parameters to disable forwarding and reject unsafe redirect behavior.

### Phase 3: Deep Telemetry & Auditing
The final phase focused on depth of visibility. To address the more demanding CIS audit requirements, I expanded host-level telemetry with `auditd` and loaded more than `22,000` rules derived from the Neo23x0 baseline. That rule set captured high-value system events such as:

- **`-k modules`** for unauthorized kernel module activity
- **`-k scope`** for changes to `sudoers` and related privilege boundaries
- **`-k file_creation`** for suspicious file creation attempts in restricted locations

---

## 5. Key Results
- **Compliance improvement:** Increased the CIS score from `26%` to `83%`, a gain of `57` percentage points.
- **Reduced attack surface:** Removed or constrained common privilege escalation and lateral movement paths.
- **Operational visibility:** Established near real-time monitoring for host-level changes and audit events.

![Final Hardened State](/writeups/assets/linux-hardening/CIS-83.png)
*Figure 4. Final CIS assessment reflecting an 83% compliance score after remediation and audit expansion.*

---

## 6. Lessons Learned
- **Minimal base systems still require strong control design:** Arch Linux starts lean, but enterprise-grade hardening still depends on deliberate policy, logging, and service management.
- **Benchmarking is most useful when paired with telemetry:** Raising a score is helpful, but the more valuable outcome was the ability to observe and validate changes continuously through Wazuh and `auditd`.
- **Automation matters:** Using shell-based remediation reduced drift and made it easier to apply the same controls consistently during iterative testing.

---

## 7. Project Completion Checklist
- [x] Deploy Wazuh SIEM
- [x] Agent Instrumentation
- [x] Kernel Hardening
- [x] Telemetry Enrichment
- [x] CIS Benchmark Compliance (80%+)
