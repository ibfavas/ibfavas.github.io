-- Seed data for Mohammad Favas S Portfolio

INSERT INTO public.profile (name, role, specialties, location, summary, tagline, quote, contact)
VALUES (
  'Mohammad Favas S',
  'Application Security | SOC Analyst | Linux Systems Engineer',
  'Penetration Testing, Detection Engineering, and Infrastructure Hardening',
  'Kollam, Kerala, India',
  'Information Security researcher specializing in web application security, source-code analysis, and custom defensive tooling. Verified record of code-level remediation in the open-source ecosystem, including an upstream patch for a structural improper access control flaw in the NLTK Python framework (CVE-2026-12261) and a quadratic CPU exhaustion flaw (CVE-2026-81723). Experienced in automated threat intelligence pipelines, CIS-benchmarked Linux hardening, API security assessment, and building zero-dependency security tooling.',
  'Bridging offensive security research, blue-team detection engineering, and Linux infrastructure hardening.',
  'Anyone can report a vulnerability. I wanted to know if I could fix one.',
  '{"email":"favassalam88@gmail.com","github":"https://github.com/ibfavas","linkedin":"https://linkedin.com/in/ibfavas","telegram":"https://t.me/BreachBrief","x":"https://x.com/ibfavas"}'::jsonb
);

INSERT INTO public.projects (title, subtitle, category, description, tech_stack, link, image_url, display_order, published, featured)
VALUES (
  'Threat Intelligence Pipeline & Wazuh Detection Engineering',
  'Blue Team CTI Automation',
  'Blue Team CTI Automation',
  'Architected a Python CTI pipeline ingesting 55,000+ IOCs per run from URLhaus, Feodo Tracker, and AlienVault OTX. Built a weighted confidence-scoring engine ranking 45,000+ indicators by recency, source trust, and corroboration: exporting 1,800+ IPs and 1,600+ domains into Wazuh CDB lists with automatic SIEM hot-reload. Enriched high-confidence IOCs via AbuseIPDB and VirusTotal, authored custom Wazuh rules mapped to MITRE ATT&CK T1071, automated on a 6-hour systemd timer.',
  ARRAY['Python', 'Wazuh SIEM', 'SQLite', 'CTI', 'systemd', 'MITRE ATT&CK'],
  'https://github.com/ibfavas/threat-intel-pipeline',
  '/content/writeups/assets/threat-intel-pipeline/01-architecture-diagram.png',
  1,
  true,
  true
);

INSERT INTO public.projects (title, subtitle, category, description, tech_stack, link, image_url, display_order, published, featured)
VALUES (
  'Linux Infrastructure Hardening & SIEM Orchestration',
  'CIS Compliance & Detection Stack',
  'CIS Compliance & Detection Stack',
  'Audited Arch Linux against CIS Benchmark v3.0, remediating 100+ misconfigurations to lift SCA compliance from 26% to 83%. Deployed 22,000+ auditd rules (Neo23x0 baseline) for kernel-level telemetry and MITRE ATT&CK-mapped detection. Hardened via kernel module blacklisting, noexec/nosuid/nodev mounts, and sysctl protections. Containerized Wazuh for real-time FIM, SCA scoring, and SOC-style triage.',
  ARRAY['Arch Linux', 'CIS Benchmark', 'auditd', 'Wazuh', 'Docker', 'Kernel Hardening'],
  'https://github.com/ibfavas/arch-linux-wazuh-detection-lab',
  '/content/writeups/assets/linux-hardening/dashboard-wazuh.png',
  2,
  true,
  true
);

INSERT INTO public.projects (title, subtitle, category, description, tech_stack, link, image_url, display_order, published, featured)
VALUES (
  'Peelr',
  'JavaScript Recon & Triage Scanner',
  'JavaScript Recon & Triage Scanner',
  'Rebuilt in v3 around a literal-scoped detection engine: detectors run against real JavaScript string literals instead of raw regex lines, killing the biggest false-positive classes, with placeholder-value filtering and confidence-graded findings. Ships a dark security-console web UI with live scan progress, stats dashboard, category tabs, severity filter, search, finding dismissal, and JSON/CSV export, plus a stdlib-only Go CLI.',
  ARRAY['Go (Golang)', 'Static Analysis', 'AST / Tokens', 'Security Console', 'CLI'],
  'https://github.com/ibfavas/peelr',
  '/content/writeups/assets/peelr/peelr-web-console.png',
  3,
  true,
  true
);

INSERT INTO public.projects (title, subtitle, category, description, tech_stack, link, image_url, display_order, published, featured)
VALUES (
  'SiteGuard',
  'Website Security Monitoring',
  'Website Security Monitoring',
  'Website security monitor aimed at small businesses: 17 security checks plus 30-minute uptime monitoring with alerts after consecutive failures. Flask, SQLite, and APScheduler backend, with a dashboard showing stat cards, scan diffs, grade trends, and dark mode.',
  ARRAY['Python', 'Flask', 'SQLite', 'Security Monitoring', 'Uptime'],
  'https://github.com/ibfavas/siteguard',
  '/content/writeups/assets/siteguard/dashboard.png',
  4,
  true,
  false
);

INSERT INTO public.projects (title, subtitle, category, description, tech_stack, link, image_url, display_order, published, featured)
VALUES (
  'NetPulse',
  'Real-Time Network Telemetry HUD',
  'Real-Time Network Telemetry HUD',
  'Developed a lightweight, real-time network diagnostic tool for Linux in Go using goroutines for zero-dependency terminal-based telemetry. Concurrently monitors gateway latency, interface throughput, and backbone packet loss metrics with raw ICMP socket support.',
  ARRAY['Go', 'Bubble Tea TUI', 'ICMP Sockets', 'Concurrency', 'Linux Networking'],
  'https://github.com/ibfavas/netpulse',
  '/static/ui-assets/netpulse_demo.gif',
  5,
  true,
  false
);

INSERT INTO public.projects (title, subtitle, category, description, tech_stack, link, image_url, display_order, published, featured)
VALUES (
  'Breach Brief',
  'Daily Cyber Security News Channel',
  'Daily Cyber Security News Channel',
  'A Telegram channel I run: daily cyber security news under a strict editorial filter: breaches, critical CVEs, zero-days, and major takedowns only, no vendor noise. Sourced from The Hacker News, BleepingComputer, Krebs on Security, and CISA in three curated checks a day, with a plain-English Daily Briefing every evening.',
  ARRAY['Threat Intel', 'Security News', 'Curated Briefings', 'Telegram'],
  'https://t.me/BreachBrief',
  NULL,
  6,
  true,
  false
);

INSERT INTO public.skills (group_name, items, display_order)
VALUES (
  'Application Security & VAPT',
  ARRAY['Web Application VAPT', 'OWASP Top 10', 'API Penetration Testing', 'Secure Code Review', 'Burp Suite', 'Postman', 'Metasploit', 'Exploit Replication'],
  1
);

INSERT INTO public.skills (group_name, items, display_order)
VALUES (
  'Detection Engineering (SOC & SIEM)',
  ARRAY['Wazuh', 'Alert Triage', 'Log Correlation', 'MITRE ATT&CK', 'auditd', 'FIM', 'SCA', 'SIEM Tuning', 'IOC Analysis'],
  2
);

INSERT INTO public.skills (group_name, items, display_order)
VALUES (
  'Linux & Infrastructure',
  ARRAY['Arch Linux', 'Debian', 'Ubuntu', 'Kernel Hardening', 'systemd', 'PAM', 'CIS Benchmarks', 'SSH Hardening', 'UFW', 'Apache', 'Nginx'],
  3
);

INSERT INTO public.skills (group_name, items, display_order)
VALUES (
  'Threat Intelligence & CTI',
  ARRAY['IOC Enrichment', 'Wazuh CDB Lists', 'AbuseIPDB', 'VirusTotal', 'MITRE ATT&CK Mapping', 'Threat Correlation'],
  4
);

INSERT INTO public.skills (group_name, items, display_order)
VALUES (
  'Scripting & Tooling',
  ARRAY['Go (Golang)', 'Python', 'Bash', 'SQLite', 'Docker', 'Git', 'Regex', 'Concurrent Automation'],
  5
);

