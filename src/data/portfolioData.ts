import { Project, Writeup, CveItem, Certification, TimelineEntry, SkillGroup, Profile } from '../types/portfolio';

export const initialProfile: Profile = {
  "name": "Mohammad Favas S",
  "role": "Application Security Researcher",
  "specialties": "Vulnerability Research | Security Engineering",
  "location": "Kollam, Kerala, India",
  "summary": "I research trust boundaries in Python libraries and build tools for application review, detection engineering and Linux hardening.",
  "tagline": "Bridging offensive security research, blue-team detection engineering, and Linux infrastructure hardening.",
  "quote": "Anyone can report a vulnerability. I wanted to know if I could fix one.",
  "contact": {
    "email": "favassalam88@gmail.com",
    "github": "https://github.com/ibfavas",
    "linkedin": "https://linkedin.com/in/ibfavas",
    "telegram": "https://t.me/BreachBrief",
    "x": "https://x.com/ibfavas",
    "instagram": "https://instagram.com/ibfavas",
    "tryhackme": "https://tryhackme.com/p/ibfavas"
  }
};

export const initialProjects: Project[] = [
  {
    "id": "proj-1",
    "title": "Threat Intelligence Pipeline & Wazuh Detection Engineering",
    "subtitle": "Blue Team CTI Automation",
    "category": "Detection Engineering",
    "description": "A Python and SQLite lab pipeline collects URLhaus, Feodo Tracker and AlienVault OTX feeds. A recorded run processed 55,445 feed records. A scoring snapshot covers 45,024 unique indicators. The lab exports Wazuh CDB lists and validates matches with wazuh-logtest.",
    "techStack": [
      "Python",
      "Wazuh SIEM",
      "SQLite",
      "Threat Intel",
      "systemd",
      "MITRE ATT&CK"
    ],
    "link": "https://github.com/ibfavas/threat-intel-pipeline",
    "image": "/assets/ui/thumb-threat-intel.webp",
    "displayOrder": 1,
    "published": true,
    "featured": true
  },
  {
    "id": "proj-2",
    "title": "Linux Infrastructure Hardening & SIEM Orchestration",
    "subtitle": "Arch Linux hardening lab",
    "category": "Infrastructure Hardening",
    "description": "On an Arch Linux lab endpoint, the Wazuh configuration assessment rose from 26% to 83%. The snapshots document changes to authentication, mounts and kernel settings. A Docker-based Wazuh manager collects audit and file-integrity events.",
    "techStack": [
      "Arch Linux",
      "CIS Benchmark",
      "auditd",
      "Wazuh",
      "Docker",
      "Kernel Hardening"
    ],
    "link": "https://github.com/ibfavas/arch-linux-wazuh-detection-lab",
    "image": "/assets/ui/thumb-linux-hardening.webp",
    "displayOrder": 2,
    "published": true,
    "featured": true
  },
  {
    "id": "proj-3",
    "title": "Peelr",
    "subtitle": "JavaScript Recon & Triage Scanner",
    "category": "Security Tooling",
    "description": "Peelr is a Go tool for static analysis of JavaScript files and URLs. Its v3 detectors use string-literal context to flag candidate secrets, endpoints and risky code for review. The CLI and local web console support repeat scans, filtering and export.",
    "techStack": [
      "Go (Golang)",
      "Static Analysis",
      "JavaScript string literals",
      "Security Console",
      "CLI"
    ],
    "link": "https://github.com/ibfavas/peelr",
    "image": "/assets/ui/thumb-peelr.webp",
    "displayOrder": 3,
    "published": true,
    "featured": true
  },
  {
    "id": "proj-4",
    "title": "SiteGuard",
    "subtitle": "Website Security Monitoring",
    "category": "Web Security",
    "description": "SiteGuard runs scheduled website checks with Flask, SQLite and APScheduler. It compares scan results over time and sends an uptime alert after consecutive failed probes.",
    "techStack": [
      "Python",
      "Flask",
      "SQLite",
      "Security Monitoring",
      "Uptime"
    ],
    "link": "https://github.com/ibfavas/siteguard",
    "image": "/assets/ui/thumb-siteguard.webp",
    "displayOrder": 4,
    "published": true,
    "featured": false
  },
  {
    "id": "proj-5",
    "title": "NetPulse",
    "subtitle": "Real-Time Network Telemetry HUD",
    "category": "Network Diagnostics",
    "description": "NetPulse is a Linux network diagnostics dashboard written in Go with Bubble Tea. Concurrent collectors show gateway latency, DNS timing, packet loss and interface throughput in one terminal.",
    "techStack": [
      "Go",
      "Bubble Tea TUI",
      "ICMP Sockets",
      "Concurrency",
      "Linux Networking"
    ],
    "link": "https://github.com/ibfavas/netpulse",
    "image": "/assets/ui/thumb-netpulse.webp",
    "displayOrder": 5,
    "published": true,
    "featured": false
  },
  {
    "id": "proj-6",
    "title": "Breach Brief",
    "subtitle": "Cybersecurity news channel",
    "category": "Threat Intelligence",
    "description": "Breach Brief is my Telegram channel covering breaches, vulnerabilities and security advisories. Each briefing links the story to its source.",
    "techStack": [
      "Threat Intel",
      "Security News",
      "Curated Briefings",
      "Telegram"
    ],
    "link": "https://t.me/BreachBrief",
    "image": "/assets/ui/thumb-breach-brief.webp",
    "displayOrder": 6,
    "published": true,
    "featured": false
  }
];

export const initialCves: CveItem[] = [
  {
    "id": "cve-1",
    "cveId": "CVE-2026-12261",
    "title": "Cross-Package Resource and Model Poisoning in NLTK Downloader",
    "weakness": "CWE-284 · Improper Access Control",
    "affected": "NLTK downloader through 3.9.4",
    "status": "NLTK 3.10.0 includes PR #3625, authored by ibfavas and merged on 26 June 2026.",
    "summary": "Installing a malicious or tampered data package could overwrite resources belonging to another package in the same NLTK data directory. Later calls could load the changed models or corpora, even after an interpreter restart.",
    "prLink": "https://github.com/nltk/nltk/pull/3625",
    "advisoryLink": "https://nvd.nist.gov/vuln/detail/CVE-2026-12261",
    "rating": "NVD CVSS 3.1 · 6.5 Medium"
  },
  {
    "id": "cve-2",
    "cveId": "CVE-2026-81723",
    "title": "Quadratic CPU Exhaustion in NLTK XML Corpus Reader",
    "weakness": "CWE-400 · Uncontrolled Resource Consumption",
    "affected": "NLTK XMLCorpusView before 3.10.3",
    "status": "Fixed in NLTK 3.10.3. The advisory credits ibfavas as reporter and commit 7808692 lists ibfavas as a co-author.",
    "summary": "An application that reads an untrusted XML corpus through an affected reader can spend increasing amounts of CPU time rescanning an unfinished fragment. The impact is denial of service.",
    "advisoryLink": "https://nvd.nist.gov/vuln/detail/CVE-2026-81723",
    "rating": "VulnCheck CVSS 3.1 · 3.7 Low",
    "prLink": "https://github.com/nltk/nltk/commit/7808692"
  }
];

export const initialWriteups: Writeup[] = [
  {
    "id": "writeup-1",
    "slug": "cve-2026-12261",
    "title": "CVE-2026-12261: How NLTK's Downloader Let One Package Poison Another's Models",
    "date": "2026-09-29",
    "summary": "Installing a malicious or tampered data package could overwrite resources belonging to another package in the same NLTK data directory. Later calls could load the changed models or corpora, even after an interpreter restart.",
    "body": "## The trust boundary\n\nNLTK data packages can share a directory such as `corpora/` or `taggers/`. In NLTK through 3.9.4, the downloader accepted archive members without enforcing which package owned the destination. It also checked package integrity after installation. A user had to install a malicious or tampered package for the issue to affect their local data.\n\n## What changed on disk\n\nAnother package’s data could be replaced and subsequently loaded through an ordinary NLTK API. Restarting Python left the altered data in place. The demonstrated consequence was loss of model or corpus integrity.\n\n## Upstream repair\n\nI contributed PR #3625. The downloader now compares archive members’ top-level path components with the expected package ID and verifies the staged download before committing it. This preserves the directory layout expected by existing data loaders. The PR merged on 26 June 2026 and shipped in 3.10.0. Environments that previously installed untrusted data also need to restore affected resources from a trusted source.\n\n## Severity and sources\n\nThe assigning authority lists CWE-284 and scores the issue 5.3 Medium under CVSS 3.0. NVD scores it 6.5 Medium under CVSS 3.1. Both assessments identify user interaction and an integrity impact. Their attack-complexity ratings differ.\n\n[Public report](https://huntr.com/bounties/8b8c381e-08a8-4e4f-bb46-a320c96a364f) · [NVD record](https://nvd.nist.gov/vuln/detail/CVE-2026-12261) · [Merged patch](https://github.com/nltk/nltk/pull/3625) · [NLTK 3.10.0 release](https://github.com/nltk/nltk/releases/tag/v3.10.0)\n\n[CVE record](https://www.cve.org/CVERecord?id=CVE-2026-12261) · [Merge commit](https://github.com/nltk/nltk/commit/7a5740af89feeb739193db766e11e85dfe78339c) · [Snyk entry](https://security.snyk.io/vuln/SNYK-PYTHON-NLTK-18592338)",
    "tags": [
      "CVE",
      "Vulnerability Research",
      "NLTK",
      "Python",
      "Upstream Fix"
    ],
    "readingTime": 2,
    "displayOrder": 1,
    "published": true
  },
  {
    "id": "writeup-2",
    "slug": "cve-2026-81723",
    "title": "CVE-2026-81723: Quadratic CPU Exhaustion in NLTK's XML Corpus Reader",
    "date": "2026-09-29",
    "summary": "An application that reads an untrusted XML corpus through an affected reader can spend increasing amounts of CPU time rescanning an unfinished fragment. The impact is denial of service.",
    "body": "## Where the time went\n\nWhile reviewing an earlier parser fix, I found repeated work in the loop surrounding the XML matcher. For a long unfinished fragment, the reader revisited data it had already examined. CPU cost grew quadratically with input length. This affected applications reading untrusted XML through readers that use `XMLCorpusView`, including `BNCCorpusReader`.\n\n## Measurement and impact\n\nThe upstream advisory records approximately 48 CPU-seconds for an 8 MiB input on the research system. That measurement describes one environment. The security consequence is CPU exhaustion and reduced availability for other work sharing the process.\n\n## Upstream repair\n\nThe fixed reader tracks fragment state incrementally across blocks. NLTK lists releases through 3.10.2 as affected and 3.10.3 as patched. The advisory credits ibfavas as the reporter. The fixing commit by alvations lists ibfavas and leduckhuong as co-authors.\n\n## Severity and sources\n\nVulnCheck assigns CWE-400 and publishes both CVSS 3.1 (3.7 Low) and CVSS 4.0 (6.3 Medium). The upstream advisory also identifies CWE-407 for inefficient algorithmic complexity.\n\n[NLTK advisory](https://github.com/nltk/nltk/security/advisories/GHSA-vp2x-qp44-57v7) · [CVE record](https://www.cve.org/CVERecord?id=CVE-2026-81723) · [Fixing commit](https://github.com/nltk/nltk/commit/7808692) · [NLTK 3.10.3 release](https://github.com/nltk/nltk/releases/tag/v3.10.3)\n\n[VulnCheck advisory](https://www.vulncheck.com/advisories/nltk-before-3.10.3-quadratic-cpu-exhaustion-via-xmlcorpusview) · [NVD record](https://nvd.nist.gov/vuln/detail/CVE-2026-81723)",
    "tags": [
      "CVE",
      "Algorithmic Complexity",
      "Denial of Service",
      "NLTK",
      "Python"
    ],
    "readingTime": 2,
    "displayOrder": 2,
    "published": true
  },
  {
    "id": "writeup-3",
    "slug": "linux-hardening",
    "title": "🐧 Linux Infrastructure Hardening & SIEM Orchestration",
    "date": "2026-04-24",
    "summary": "On an Arch Linux lab endpoint, the Wazuh configuration assessment rose from 26% to 83%. The snapshots document changes to authentication, mounts and kernel settings. A Docker-based Wazuh manager collects audit and file-integrity events.",
    "body": "## Lab environment\n\nA Wazuh manager running in Docker assessed one Arch Linux endpoint. Its initial security configuration assessment (SCA) score was 26%. The score measures checks in the selected policy and depends on which checks apply to the host.\n\n![Wazuh lab dashboard](/assets/writeups/linux-hardening/dashboard-wazuh.png)\n\n![Initial configuration assessment](/assets/writeups/linux-hardening/CIS-26.png)\n\n## Changes between assessments\n\nI restricted administrative access, updated password policy and applied mount flags to temporary directories. Further work covered unused kernel modules, network settings and audit rules for changes to privileged files.\n\n![Intermediate assessment at 55%](/assets/writeups/linux-hardening/CIS-55.png)\n\n## Reading the result\n\nThe final assessment reached 83%, a rise of 57 percentage points on this endpoint. The remaining failed and inapplicable checks are visible in the report. The dashboard and file-integrity events provide a separate view of activity after configuration changes.\n\n![Final Arch Linux assessment at 83%](/assets/writeups/linux-hardening/CIS-83.png)\n\n[Lab configuration and evidence](https://github.com/ibfavas/arch-linux-wazuh-detection-lab)",
    "coverImage": "/assets/writeups/linux-hardening/dashboard-wazuh.png",
    "tags": [
      "Arch Linux",
      "CIS Benchmark",
      "Wazuh",
      "auditd",
      "Hardening"
    ],
    "readingTime": 2,
    "displayOrder": 3,
    "published": true
  },
  {
    "id": "writeup-4",
    "slug": "threat-intel-pipeline",
    "title": "🛰️ Threat Intel Aggregation & IOC Enrichment Pipeline",
    "date": "2026-05-01",
    "summary": "A Python and SQLite lab pipeline collects URLhaus, Feodo Tracker and AlienVault OTX feeds. A recorded run processed 55,445 feed records. A scoring snapshot covers 45,024 unique indicators. The lab exports Wazuh CDB lists and validates matches with wazuh-logtest.",
    "body": "# 🛰️ Threat Intel Aggregation & IOC Enrichment Pipeline\n\n## Executive Summary\n\nThis project is a Blue Team threat intelligence pipeline that turns raw\nopen-source CTI feeds into actionable Wazuh detections. It ingests indicators\nof compromise from URLhaus, Feodo Tracker, and AlienVault OTX, normalizes them\ninto a unified schema, deduplicates repeated indicators, calculates confidence\nscores, enriches high-confidence IOCs with AbuseIPDB and VirusTotal, and exports\nthe final IP/domain indicators into Wazuh CDB lookup lists.\n\nThe main purpose is to bridge the gap between \"threat intelligence as data\" and\n\"threat intelligence as detection.\" A CSV feed or API response is useful, but it\ndoes not protect an environment by itself. The value comes when those indicators\nare filtered, scored, operationalized, and loaded into a SIEM where they can\nmatch real logs and generate alerts.\n\n## Problem Statement\n\nOpen-source CTI feeds are easy to collect but difficult to use directly. They\noften contain different schemas, inconsistent field names, overlapping data,\nstale indicators, and noisy community-submitted entries. Sending every raw IOC\ndirectly into a SIEM creates alert fatigue and can waste API quota during\nenrichment.\n\nThis pipeline addresses those issues by adding engineering controls between\nfeed collection and detection:\n\n- Normalize different feed formats into one IOC model.\n- Deduplicate repeated values by `value` and `type`.\n- Track source corroboration with `hit_count`.\n- Score indicators before enrichment or export.\n- Enrich only high-confidence indicators.\n- Export actionable indicators into Wazuh CDB lists.\n- Automate the workflow with a systemd user timer.\n\n## Architecture Overview\n\n![Pipeline architecture](/assets/writeups/threat-intel-pipeline/01-architecture-diagram.png)\n\nThe architecture is split into independent stages:\n\n1. Feed ingestion pulls raw data from external CTI sources.\n2. Normalization converts each feed's native format into the shared IOC model.\n3. SQLite storage deduplicates indicators and preserves operational metadata.\n4. Scoring ranks IOCs by recency, source trust, and corroboration.\n5. Enrichment adds AbuseIPDB, VirusTotal, WHOIS, and ASN context.\n6. Wazuh export writes high-confidence IP/domain indicators to CDB list files.\n7. Wazuh rules match decoded log fields against those CDB lists.\n\nThis design keeps responsibilities separated. A feed parser can change without\ntouching scoring. A scoring rule can change without touching Wazuh export. A\nnew enrichment provider can be added without changing the database schema\nbecause enrichment data is stored as JSON.\n\n## IOC Data Model\n\nEvery feed is normalized into the same structure:\n\n| Field | Purpose |\n|---|---|\n| `value` | IOC value such as an IP, domain, URL, or hash |\n| `type` | IOC type: `ip`, `domain`, `url`, or `hash` |\n| `source` | Feed source such as `urlhaus`, `feodo`, or `otx` |\n| `first_seen` | Earliest known timestamp |\n| `last_seen` | Most recent observation timestamp |\n| `confidence_score` | Pipeline-calculated score from 0 to 100 |\n| `hit_count` | Number of unique feed sources that observed the IOC |\n| `enrichment` | JSON blob containing API enrichment results |\n| `tags` | Malware family, campaign, pulse tag, or feed label metadata |\n\nThe important engineering choice is the uniqueness constraint:\n\n```sql\nUNIQUE(value, type)\n```\n\nThis prevents duplicate feed entries from creating duplicate database rows.\nWhen the same IOC appears again, the pipeline updates metadata instead of\nreplacing the record. This preserves `first_seen`, updates `last_seen`, merges\ntags, merges sources, and recalculates `hit_count`.\n\n## Recorded lab measurements\n\nOne ingestion processed 55,445 feed records. A scoring snapshot shows 45,024 unique indicators. The example CDB export contains 1,803 IPs and 1,649 domains. These measure different stages and vary with feed contents. The project’s Wazuh rules carry the ATT&CK T1071 tag. The recorded alert confirms a list match, which still needs analyst review.\n\n## Feed Ingestion\n\n![Feed ingestion output](/assets/writeups/threat-intel-pipeline/02-feed-ingestion-all-feeds.png)\n\nThe project currently supports three feed sources:\n\n| Feed | Indicator Types | Notes |\n|---|---|---|\n| URLhaus | URLs, domains, IPs | Recent malicious URLs and derived host indicators |\n| Feodo Tracker | IPs | Curated C2 IP blocklist |\n| AlienVault OTX | IPs, domains, URLs, hashes | Community pulse indicators |\n\nEach feed has a dedicated ingestor class. This is intentional: feed parsing is\nusually the least stable part of a CTI pipeline because providers change CSV\nheaders, API parameters, or field names over time. Keeping each parser isolated\nmakes those changes easier to fix without affecting other stages.\n\nURLhaus required special parsing because its CSV header is commented out with a\nleading `#`. The ingestor extracts that header, parses the remaining CSV rows,\nstores the full URL, and derives a host indicator from the URL. If the host is\nan IP address, it is stored as `type=ip`; otherwise it is stored as\n`type=domain`.\n\nOTX ingestion is intentionally tunable:\n\n```bash\npython cli.py ingest --otx-limit 100 --otx-max-page 5\n```\n\nThis is useful because OTX can be slow or large depending on the subscribed\npulses. For screenshot/demo work, the limit can be reduced. For deeper pulls,\nthe page and item limits can be raised.\n\n## Storage and Feed Health\n\n![SQLite stats and feed health](/assets/writeups/threat-intel-pipeline/03-sqlite-stats-feed-health.png)\n\nSQLite was chosen because this project is intended to run anywhere without\nadditional infrastructure. It provides enough durability, queryability, and\nschema control for an analyst workstation or lab Wazuh deployment.\n\nThe database stores both IOCs and feed run history. Feed run logging matters\nbecause CTI pipelines can fail partially. URLhaus might work while OTX is down,\nor an API key might expire while Feodo continues to ingest successfully. The\n`stats` command gives quick visibility into:\n\n- total IOC count,\n- IOC type distribution,\n- source distribution,\n- recent feed run success/failure status.\n\nThe storage layer also uses a SQLite busy timeout and WAL fallback handling to\nreduce failures when the CLI, timer, or manual queries overlap.\n\n## Deduplication and Corroboration\n\n![SQLite deduplication query](/assets/writeups/threat-intel-pipeline/04-sqlite-dedup-hit-count.png)\n\nDeduplication is more than a storage optimization. It directly affects scoring.\nAn IOC that appears in multiple sources is stronger than an IOC seen in only\none source. The pipeline records this using merged source values and\n`hit_count`.\n\nExample logic:\n\n- First observation: `source=urlhaus`, `hit_count=1`\n- Later seen in OTX: `source=otx,urlhaus`, `hit_count=2`\n- Tags from both feeds are merged into the same IOC row\n\nThis allows the confidence engine to use corroboration as a scoring factor\nwithout needing to query raw feed tables.\n\n## Confidence Scoring\n\n![Scoring report](/assets/writeups/threat-intel-pipeline/05-scoring-report.png)\n\nThe confidence score is calculated from three factors:\n\n| Factor | Max Points | Reason |\n|---|---:|---|\n| Recency | 40 | Recent infrastructure is more actionable |\n| Source reputation | 35 | Curated feeds should carry more trust |\n| Cross-feed corroboration | 25 | Multi-source sightings are stronger signal |\n\nSource reputation weights:\n\n| Source | Weight |\n|---|---:|\n| Feodo Tracker | 35 |\n| URLhaus | 30 |\n| OTX | 20 |\n\nThe final score is capped at 100. Only IOCs scoring at or above the configured\nthreshold, default `60`, proceed to enrichment and Wazuh export.\n\nThis scoring model is intentionally simple and explainable. In detection\nengineering, a transparent score is often more useful than an opaque model\nbecause analysts need to understand why an IOC became actionable.\n\n## Enrichment Strategy\n\n![API enrichment and DB query](/assets/writeups/threat-intel-pipeline/06-api-enrichment-and-db.png)\n\nEnrichment is rate-limit-aware and selective. The pipeline does not enrich\nevery IOC because free-tier APIs are limited and low-confidence indicators can\nwaste quota.\n\nEnrichment sources:\n\n| Provider | IOC Types | Data Added |\n|---|---|---|\n| AbuseIPDB | IP | abuse score, country, ISP, usage type |\n| VirusTotal | IP, domain, URL, hash | malicious/suspicious counts, reputation |\n| ipwhois / RDAP | IP | ASN, organization, country, network |\n| python-whois | Domain | registrar and registration metadata |\n\nThe enrichment data is stored in the `enrichment` column as JSON. This avoids\nschema churn when API responses change and keeps the original context available\nfor reporting.\n\nVerbose enrichment output was added for screenshot and operator visibility:\n\n```text\n[+] Enriched 115.55.229.86: abuse_score=4 vt_malicious=1 country=CN\n```\n\n## Wazuh CDB Export\n\n![Wazuh CDB export](/assets/writeups/threat-intel-pipeline/07-wazuh-cdb-export-local.png)\n\nWazuh CDB lists use a simple key/value format:\n\n```text\n1.2.3.4:malware-c2\nevil.example:botnet\n```\n\nThe exporter queries high-confidence IPs and domains and writes two separate\nlists:\n\n- `threat-intel-ips`\n- `threat-intel-domains`\n\nFor Docker-based Wazuh, the pipeline exports locally first:\n\n```bash\npython cli.py export --wazuh \\\n  --ip-list exports/threat-intel-ips \\\n  --domain-list exports/threat-intel-domains\n```\n\nThose files are then copied into the Wazuh manager container. This avoids\nassuming that `/var/ossec` exists on the host.\n\nThe exporter also guards against stale database rows by routing IP-looking\nvalues into the IP list even if an older row was incorrectly typed as a domain.\n\n## Wazuh Rule Logic\n\n![Wazuh custom rule](/assets/writeups/threat-intel-pipeline/08-wazuh-custom-rule.png)\n\nThe custom Wazuh rule checks decoded log fields against the threat-intel CDB\nlists. For SSH events, the rule uses Wazuh's built-in SSH decoding first, then\nmatches `srcip` against the exported IP list.\n\nThe important rule detail is the parent rule condition:\n\n```xml\n<if_sid>5710,5716</if_sid>\n```\n\nThis ensures the threat-intel rule is evaluated after Wazuh has decoded the SSH\nevent and extracted `srcip`. Without a parent rule, Wazuh may not evaluate the\nlist lookup in the expected context.\n\nThe custom alert is high severity:\n\n```text\nrule.id: 100500\nrule.level: 12\ndescription: Source IP matched threat intelligence CDB list: $(srcip)\n```\n\n## Docker-Based Wazuh Deployment\n\n![Docker Wazuh deployment](/assets/writeups/threat-intel-pipeline/09-wazuh-docker-deploy-restart.png)\n\nThe Wazuh deployment used for this project runs in Docker. That changes the\ndeployment model:\n\n- CDB lists must be copied into the manager container.\n- Custom rules must be copied into `/var/ossec/etc/rules/`.\n- CDB list paths must be registered in `/var/ossec/etc/ossec.conf`.\n- The Wazuh manager must be restarted after changes.\n\nThe Docker workflow:\n\n```bash\ndocker cp exports/threat-intel-ips single-node-wazuh.manager-1:/var/ossec/etc/lists/threat-intel-ips\ndocker cp exports/threat-intel-domains single-node-wazuh.manager-1:/var/ossec/etc/lists/threat-intel-domains\ndocker cp wazuh/threat_intel_rules.xml single-node-wazuh.manager-1:/var/ossec/etc/rules/threat_intel_rules.xml\ndocker exec single-node-wazuh.manager-1 /var/ossec/bin/wazuh-control restart\n```\n\nDuring validation, Wazuh initially warned that the custom lists could not be\nloaded. The fix was to register the custom lists in `ossec.conf` under the\nruleset list declarations. This is an important operational lesson: copying a\nCDB list file is not always enough. Wazuh must also be configured to load it.\n\n## Detection Validation\n\n![Wazuh logtest alert](/assets/writeups/threat-intel-pipeline/10-wazuh-logtest-alert.png)\n\nThe detection was validated using `wazuh-logtest`. A synthetic SSH failure log\nwas generated using an IP from the exported CDB list:\n\n```bash\nIOC=$(cut -d: -f1 exports/threat-intel-ips | head -1)\nprintf \"May  1 09:30:00 arch sshd[12345]: Failed password for invalid user admin from %s port 55222 ssh2\\n\" \"$IOC\" | docker exec -i single-node-wazuh.manager-1 /var/ossec/bin/wazuh-logtest\n```\n\nWazuh decoded the log, extracted `srcip`, checked the CDB list, and fired the\ncustom rule:\n\n```text\nid: '100500'\nlevel: '12'\ndescription: 'Source IP matched threat intelligence CDB list: 1.22.174.37'\n```\n\nThis is the key proof that the pipeline produces real detection logic, not just\nstatic reports.\n\n## Dashboard Evidence\n\n![Wazuh dashboard alert](/assets/writeups/threat-intel-pipeline/11-wazuh-dashboard-alert.png)\n\nThe dashboard screenshot shows the alert visible in Wazuh Discover. This is\nimportant because analyst-facing visibility is the final requirement for a\nuseful SIEM integration. The event includes the matched IOC, rule ID, rule\nlevel, decoded fields, manager name, and rule description.\n\nIn practical terms, this means a SOC analyst could filter on:\n\n```text\nrule.id: 100500\n```\n\nand review events where internal telemetry matched the live threat-intel list.\n\n## Automation\n\n![systemd timer status](/assets/writeups/threat-intel-pipeline/13-systemd-timer-status.png)\n\nThe pipeline is automated with a user-level systemd timer. The timer runs every\nsix hours and triggers the service. This is cleaner than cron on an Arch Linux\nworkstation because systemd provides native status, logs, and failure tracking.\n\n![systemd service journal](/assets/writeups/threat-intel-pipeline/12-systemd-journal-run.png)\n\nThe journal output provides operational evidence that the automated run\ncompleted each stage:\n\n- ingestion,\n- scoring,\n- enrichment sample,\n- local Wazuh export.\n\nThe timer makes the project behave like a lightweight daemon while still\nremaining easy to run manually from the CLI.\n\n## CLI Workflow\n\nThe pipeline can be operated manually through `cli.py`:\n\n```bash\npython cli.py ingest --otx-limit 100 --otx-max-page 5\npython cli.py score --verbose --top 5\npython cli.py enrich --type ip --limit 5 --verbose\npython cli.py export --wazuh --ip-list exports/threat-intel-ips --domain-list exports/threat-intel-domains\npython cli.py report --top 20\npython cli.py stats\n```\n\nThe CLI is intentionally simple. Each command maps to one pipeline stage,\nmaking it easy to troubleshoot failures and capture evidence for each phase.\n\n## What This Project Demonstrates\n\nThis project demonstrates several practical Blue Team engineering skills:\n\n- CTI feed parsing and normalization.\n- SQLite-backed IOC storage and deduplication.\n- Confidence scoring and prioritization.\n- API enrichment under rate limits.\n- Wazuh CDB list generation.\n- Custom Wazuh rule development.\n- Docker-based Wazuh deployment.\n- systemd automation.\n- End-to-end detection validation.\n\nThe most important result is the final detection chain:\n\n```text\nRaw CTI feed -> normalized IOC -> scored IOC -> enriched IOC -> Wazuh CDB list -> custom Wazuh rule -> visible SIEM alert\n```\n\n## Limitations\n\nThis is a personal lab project, not a production CTI platform. Current\nlimitations include:\n\n- No distributed queue or worker system.\n- No API response cache beyond stored enrichment JSON.\n- Limited retry/backoff behavior.\n- Simple explainable scoring rather than statistical scoring.\n- Wazuh Docker configuration is documented but not fully automated.\n- Enrichment depends on free-tier API limits.\n\nThese limitations are acceptable for the project goal: demonstrating a complete\nengineering pipeline from CTI ingestion to SIEM detection.\n\n## Future Improvements\n\nPotential improvements:\n\n- Add unit tests for ingestor normalization and scoring.\n- Add structured logging instead of plain `print` output.\n- Add API backoff and retry policies.\n- Add a `deploy-wazuh-docker` CLI command for container copy/restart steps.\n- Add enrichment caching and skip recently enriched IOCs.\n- Add support for more feeds such as MalwareBazaar, OpenPhish, or ThreatFox.\n- Add rule templates for more decoded fields such as DNS queries, proxy URLs,\n  firewall source/destination IPs, and Windows event fields.\n- Add a dashboard or HTML report for enriched indicators.\n\n## Conclusion\n\nThe project turns open-source CTI into operational Wazuh detections. The\nengineering value is not just pulling feeds; it is the full chain of\nnormalization, deduplication, scoring, enrichment, export, rule matching, and\nautomation. The final Wazuh alert proves that the pipeline can take an IOC from\nan external feed and make it visible as a high-severity SIEM event.\n\n[Project source and documentation](https://github.com/ibfavas/threat-intel-pipeline)",
    "coverImage": "/assets/writeups/threat-intel-pipeline/01-architecture-diagram.png",
    "tags": [
      "CTI",
      "Wazuh",
      "Python",
      "Threat Intelligence",
      "Automation"
    ],
    "readingTime": 12,
    "displayOrder": 4,
    "published": true
  },
  {
    "id": "writeup-5",
    "slug": "peelr",
    "title": "🧅 Peelr: JavaScript Recon And Triage",
    "date": "2026-04-01",
    "summary": "Peelr is a Go tool for static analysis of JavaScript files and URLs. Its v3 detectors use string-literal context to flag candidate secrets, endpoints and risky code for review. The CLI and local web console support repeat scans, filtering and export.",
    "body": "## 🔎 Why Peelr\n\nWhen a target already has JavaScript URLs collected, the bottleneck is usually triage, not discovery.\n\nLarge frontend bundles often hide the pieces that matter:\n\n- exposed API keys and tokens\n- risky DOM sinks\n- internal API routes\n- sensitive parameters\n- hardcoded paths\n- comments that reveal implementation details\n\nPeelr is built for that stage. It does not try to be a crawler or a full static-analysis framework. It focuses on reviewing JavaScript sources quickly and surfacing what deserves attention first.\n\n---\n\n## 🧠 What It Finds\n\nPeelr v3 runs its detectors against real JavaScript string literals instead of raw regex lines, which kills the biggest false-positive classes (DOM sinks inside strings, `keyboard` matching `key`, division operators read as paths). Placeholder values, dummy passwords, template-interpolated values, and example domains are downgraded or dropped, and only sensitive-named function parameters are reported. Findings are grouped into practical categories:\n\n- API keys and tokens such as AWS, Google, GitHub, Stripe, Slack, Firebase, JWT, PayPal, and SendGrid patterns\n- Credentials such as hardcoded passwords, bearer tokens, Basic auth headers, DB connection strings, and private key blocks\n- XSS-related sinks including `innerHTML`, `outerHTML`, `document.write()`, `eval()`, `new Function()`, `insertAdjacentHTML`, `srcdoc`, and `dangerouslySetInnerHTML`\n- Endpoints and request targets from `fetch()`, `axios`, XHR, jQuery AJAX, and literal route references\n- Parameters, including sensitive names like `token`, `secret`, `key`, `password`, and `email`\n- Emails, filesystem paths, relative paths, and S3 references\n- Interesting comments such as `TODO`, `FIXME`, `HACK`, and security-related notes\n\nEach analyzed file also gets:\n\n- a severity and confidence breakdown\n- a `0-100` risk score\n- a risk label for quick prioritization\n\n---\n\n## ⚙️ Core Workflows\n\n### 🖥️ CLI triage\n\nPeelr works well when you want immediate output in the terminal:\n\n```bash\n./peelr --url https://target.com/app.js\n./peelr --file js_urls.txt\n./peelr --js-file ./sample-test.js\n./peelr --js-file ./dist\n```\n\nIt supports:\n\n- remote JavaScript URLs\n- local `.js` files\n- directories containing JavaScript\n- comma-separated local file paths\n- JSON or plain-text output for automation\n\n### 🌐 Local web UI\n\nRunning Peelr without input starts a local web interface:\n\n```bash\n./peelr\n./peelr --listen 0.0.0.0 --port 9000\n```\n\nDefault address:\n\n```text\nhttp://127.0.0.1:8080\n```\n\nThe web UI supports:\n\n- direct URL input\n- uploaded files containing URL lists\n- live job progress with per-file status\n- stats dashboard with files, findings, secrets, and critical/high counts\n- category tabs with live counts\n- severity filter and debounced search\n- finding dismissal (with restore) and JSON/CSV export\n- scan history drawer\n\nHere are the current interface views:\n\n![Peelr input view](/assets/writeups/peelr/peelr-web-input.png)\n\n![Peelr results view](/assets/writeups/peelr/peelr-web-console.png)\n\n### 🕘 Repeat scans and change tracking\n\nPeelr stores previous results locally, which makes repeat reviews more practical:\n\n```bash\n./peelr --history\n./peelr --url https://target.com/app.js --diff\n./peelr --clear-history\n```\n\nHistory is stored under:\n\n```text\n~/.peelr/history/\n```\n\n---\n\n## 🛠️ Installation\n\nRequirement: `Go 1.21+`\n\n```bash\ngit clone https://github.com/ibfavas/peelr.git\ncd peelr\ngo build -o peelr ./cmd/peelr\n```\n\nPeelr uses the Go standard library only. There are no third-party runtime dependencies.\n\n---\n\n## 📌 CLI Flags\n\n| Flag | Default | Description |\n|---|---|---|\n| `--listen` | `127.0.0.1` | Web UI listen address |\n| `--port` | `8080` | Web UI port |\n| `--url` | - | Single JavaScript URL to analyze |\n| `--file` | - | File with one JavaScript URL per line |\n| `--js-file` | - | Local JavaScript file, directory, or comma-separated file paths |\n| `--format` | `table` | Output: `table`, `json`, `plain` |\n| `--min-severity` | - | Minimum severity for table/plain output: `critical`, `high`, `medium`, `low`, `info` |\n| `--diff` | `false` | Compare results with the last stored scan |\n| `--history` | `false` | List stored scan history |\n| `--clear-history` | `false` | Delete saved history |\n| `--workers` | `4` | Concurrent workers for URL mode |\n| `--silent` | `false` | Suppress banner and progress output |\n| `--version` | `false` | Print version and exit |\n\nPeelr exits with code `1` when a scan fails or when findings include `high` or `critical` severity results, which makes it usable in simple automation flows.\n\n---\n\n## 🔌 HTTP Endpoints\n\nThe local web server exposes a small API:\n\n```bash\ncurl -X POST http://127.0.0.1:8080/api/jobs\ncurl http://127.0.0.1:8080/api/jobs/JOB_ID\ncurl http://127.0.0.1:8080/api/history\n```\n\nThe web job interface accepts up to `250` JavaScript URLs per job.\n\n---\n\n## 🗂️ Project Layout\n\n```text\npeelr/\n├── cmd/peelr/main.go\n├── internal/analyzer/analyzer.go\n├── internal/history/history.go\n├── internal/server/server.go\n├── web/templates/index.html\n├── web/static/app.css\n└── web/static/app.js\n```\n\nThe codebase stays intentionally small:\n\n- `internal/analyzer` handles detection logic, summaries, and scoring\n- `internal/history` manages saved scans and diffing\n- `internal/server` serves the UI and asynchronous scan jobs\n- `cmd/peelr` ties together CLI and web entry points\n\n---\n\n## 📏 Practical Limits\n\n| Limit | Value |\n|---|---|\n| Maximum JavaScript source size | `20 MB` |\n| Maximum JavaScript URLs per web job | `250` |\n| Default URL worker count | `4` |\n| HTTP timeout per remote fetch | `20s` |\n\n---\n\n## ✅ Takeaway\n\nPeelr is aimed at the moment after collection, when you need to decide what to inspect first across one or many JavaScript files. It keeps the workflow lightweight, local, and fast while still preserving enough structure to help with repeat scans and triage.\n\nOnly use it on systems you own or have explicit permission to assess. 🧅\n\n[Project source and documentation](https://github.com/ibfavas/peelr)",
    "coverImage": "/assets/writeups/peelr/peelr-web-console.png",
    "tags": [
      "Go",
      "Static Analysis",
      "JavaScript",
      "Recon",
      "CLI"
    ],
    "readingTime": 5,
    "displayOrder": 5,
    "published": true
  },
  {
    "id": "writeup-6",
    "slug": "siteguard",
    "title": "🛡️ SiteGuard: Website Security Monitoring for Small Businesses",
    "date": "2026-09-29",
    "summary": "SiteGuard runs scheduled website checks with Flask, SQLite and APScheduler. It compares scan results over time and sends an uptime alert after consecutive failed probes.",
    "body": "## 🔎 Why SiteGuard\n\nI built SiteGuard to keep a history of website configuration checks and give site owners a plain-language account of what changed.\n\n**Important:** only scan sites you own or have written permission to test.\n\n![SiteGuard dashboard](/assets/writeups/siteguard/dashboard.png)\n\n---\n\n## 🧠 What Gets Checked\n\n17 security checks per scan:\n\n| # | Check | What it does |\n|---|---|---|\n| 1 | SSL certificate | Validity, days to expiry, issuer |\n| 2 | Security headers | HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |\n| 3 | Exposed admin panels | Probes `/wp-admin`, `/admin`, `/login`, `/phpmyadmin`, `/.git/HEAD`, `/.env`, … |\n| 4 | WordPress | Detects WP, reads version, compares against wordpress.org latest |\n| 5 | Directory listing | Looks for `Index of /` on common paths |\n| 6 | Email DNS | SPF, DMARC, DKIM strength — permissive `+all`/`?all`, `p=none`, missing `rua` |\n| 7 | Server banners | Flags version numbers in `Server` / `X-Powered-By` headers |\n| 8 | Change detection | Text + DOM-structure fingerprints with an adaptive per-site baseline |\n| 9 | Cookie flags | Every cookie checked for missing `HttpOnly` / `Secure` / `SameSite` |\n| 10 | CORS | Tests whether the site reflects an untrusted `Origin` with credentials |\n| 11 | HTTP methods | Flags risky methods advertised via `OPTIONS` |\n| 12 | security.txt | Checks for `/.well-known/security.txt` (informational) |\n| 13 | Mixed content | Parses real subresource URLs on HTTPS pages |\n| 14 | Sensitive files | Backup/config/debug paths with soft-404 filtering |\n| 15 | JS libraries | Outdated jQuery/Bootstrap/AngularJS/Lodash/Moment via URL versions and SHA-256 fingerprints |\n| 16 | Subdomain takeover | Certificate-transparency subdomains pointing at dead services |\n| 17 | Zone transfer | Attempts DNS AXFR — HIGH only if it actually succeeds |\n\n### ⏱️ Uptime monitoring\n\nSeparate from the weekly full scan: every 30 minutes each active site gets a lightweight reachability probe. The dashboard shows the latest status and the last-24h uptime %. An alert fires only after **2 consecutive failures**, so one flapping probe doesn't spam anyone.\n\n---\n\n## 📊 Grades & Plain-Language Reports\n\nEvery scan produces an **A - F grade**: start at 100, −25 per high, −10 per medium, −3 per low finding. Each finding comes with a plain-language *\"What this means\"* and *\"How to fix it\"* — written for shop owners, not security engineers.\n\nScan history keeps every report, and diffs highlight what changed between scans.\n\n### 🛡️ Honesty rule\n\nIf a check **cannot run** (network blocked, DNS down, site unreachable), it is recorded as *\"Check could not run\"* — never as clean. This keeps an unavailable result visible in the report.\n\n---\n\n## ⚙️ Under the Hood\n\n- **Stack:** Flask + SQLite + APScheduler — vanilla CSS, no frontend frameworks\n- **Scheduler:** weekly full re-scans plus 30-minute uptime probes, all automatic\n- **Alerts:** SMTP email on new high-severity findings (graceful when unconfigured); WhatsApp integration stubbed\n- **Change detection:** adaptive per-site baseline — alerts only when a change exceeds the site's own normal variance (15% floor)\n- **Config:** everything overridable via `SITEGUARD_*` environment variables for hosted deploys\n\n## 🛠️ Quick Start\n\n```bash\ngit clone https://github.com/ibfavas/siteguard.git\ncd siteguard\npython3 -m venv venv\n./venv/bin/pip install -r requirements.txt\n./venv/bin/python app.py\n```\n\nThen open `http://127.0.0.1:5000`.\n\n---\n\n[Project source and documentation](https://github.com/ibfavas/siteguard)",
    "coverImage": "/assets/writeups/siteguard/dashboard.png",
    "tags": [
      "Python",
      "Flask",
      "Security Monitoring",
      "VAPT"
    ],
    "readingTime": 4,
    "displayOrder": 6,
    "published": true
  },
  {
    "id": "writeup-7",
    "slug": "netpulse",
    "title": "⚡ NetPulse: Real-Time Network Telemetry HUD",
    "date": "2026-09-28",
    "summary": "NetPulse is a Linux network diagnostics dashboard written in Go with Bubble Tea. Concurrent collectors show gateway latency, DNS timing, packet loss and interface throughput in one terminal.",
    "body": "## 🔎 Why NetPulse\n\nDebugging a network issue on Linux usually means juggling half a dozen windows: `ping` for the gateway, `mtr` for the path, `dig` for DNS, `nload` for throughput. Each one answers a different question, and none of them talk to each other.\n\nNetPulse collapses all of that into a single terminal HUD. It is written in Go with the Charmbracelet Bubble Tea framework, runs its collectors concurrently via non-blocking goroutines, and renders everything as a cyberpunk tactical dashboard.\n\n![NetPulse terminal HUD demo](/assets/ui/netpulse_demo.gif)\n\n---\n\n## 🧠 Interface Modules\n\n### ▰▰ MODULE: GATEWAY_CORE\n\nContinuously monitors the local default gateway (auto-parsed from system routing paths). Live Braille-based latency sparklines map local link reliability at a glance, with unprivileged packet fallback when running without root capabilities.\n\n### ▰▰ SUBSYSTEM: DNS_MATRIX\n\nReal-time resolution benchmarking across multiple DNS clusters — system resolver, Cloudflare, Google, Quad9, OpenDNS. The context-aware input engine lets you append custom upstream resolvers on the fly and watch them race.\n\n### ▰▰ SENSOR: LOCAL_HARDWARE & NODE: WAN_TELEMETRY\n\nParses low-level Linux networking layers for real-time interface throughput (`RX`/`TX` delta streams), plus automated BGP ASN mapping, WAN validation, and ISP provider identification.\n\n### ▰▰ SYSTEM: EXTERNAL_TRANSIT\n\nHigh-density tabular metrics for critical backbones: current RTT, minimum, maximum, average, packet loss, and jitter — computed concurrently. Supports an interactive full-screen MTR mode tracing individual network hops.\n\n### ▰▰ SUBSYSTEM: TELEMETRY_EVENT_LOG\n\nA scrolling operational ring buffer console that hooks diagnostic notifications, alert thresholds, and user inputs dynamically.\n\n---\n\n## 🕹️ Keyboard Matrix\n\n| Key | Action |\n|---|---|\n| `Tab` | Cycle module focus |\n| `A` | Add host (DNS server or WAN target, context-aware) |\n| `X` | Delete host |\n| `R` | Rename host |\n| `Enter` / `T` | Full-screen MTR mode |\n| `+` / `-` | Scale tick rate (`250ms`  -  `5s`) |\n| `Esc` | Freeze viewport on an anomaly |\n| `Q` / `Ctrl+C` | Clean shutdown |\n\n---\n\n## ⚙️ Design Notes\n\n- **Concurrency first:** separate collectors keep DNS and gateway measurements independent.\n- **Raw ICMP with fallback:** uses raw sockets when privileged, tries an unprivileged ICMP socket when the system permits it.\n- **Build dependencies:** the executable includes Bubble Tea and other Go modules listed in go.mod.\n\n## 🛠️ Installation\n\nThe repository’s Go module declares Go 1.18. The terminal entry point is in `cmd/netpulse`.\n\n```bash\ngit clone https://github.com/ibfavas/netpulse.git\ncd netpulse\ngo build -o netpulse ./cmd/netpulse\n./netpulse\n```\n\n---\n\n## ✅ Takeaway\n\nNetPulse is the tool I reach for when a network problem is vague — *\"the internet feels slow\"* — and I need every layer of the path visible at once. The combined view helps distinguish a local link problem from a slow resolver.\n\n[Project source and documentation](https://github.com/ibfavas/netpulse)",
    "coverImage": "/assets/ui/netpulse_demo.gif",
    "tags": [
      "Go",
      "TUI",
      "Networking",
      "ICMP",
      "Telemetry"
    ],
    "readingTime": 3,
    "displayOrder": 7,
    "published": true
  }
];

export const initialCertifications: Certification[] = [
  {
    "id": "cert-1",
    "title": "Certified SOC Analyst (CSA)",
    "issuer": "EC-Council",
    "date": "Apr 2026",
    "image": "/assets/ui/cert-csa-1.png",
    "evidence": "Credential ECC3194250687"
  },
  {
    "id": "cert-2",
    "title": "Docker Foundations Professional Certificate",
    "issuer": "LinkedIn Learning and Docker",
    "date": "May 2026",
    "image": "/assets/ui/cert-docker-1.png",
    "evidence": "Learning path completed"
  },
  {
    "id": "cert-3",
    "title": "CC Course Conclusion & Final Assessment",
    "issuer": "ISC2",
    "date": "Feb 2026",
    "image": "/assets/ui/cert-isc2-1.png",
    "evidence": "Course completion"
  },
  {
    "id": "cert-4",
    "title": "Certified IT Infrastructure & Cyber SOC Analyst",
    "issuer": "RedTeam Hacker Academy",
    "date": "2025 - 2026",
    "image": "/assets/ui/cert-redteam-1.png",
    "evidence": "Academy certification program completed"
  }
];

export const initialTimeline: TimelineEntry[] = [
  {
    "id": "time-1",
    "period": "2026 - Present",
    "title": "VAPT Consultant (Freelance)",
    "role": "Offensive Security",
    "description": "Project-based web and API assessments for a Dubai-based consultancy. I scope the assessment, document the observed impact, and retest changes with the engineering team.",
    "category": "experience"
  },
  {
    "id": "time-2",
    "period": "Apr 2024 - Sep 2025",
    "title": "Freelance Software Developer",
    "role": "Software & Security Engineering",
    "description": "Developed and deployed applications with secure coding, input validation, authentication controls, API handling, and basic security monitoring in mind. Performed manual review, testing, and remediation during delivery to reduce attack surface while keeping applications reliable and performant.",
    "category": "experience"
  },
  {
    "id": "time-3",
    "period": "2025 - 2026",
    "title": "IT Infrastructure & Cyber SOC Analyst",
    "role": "RedTeam Hacker Academy",
    "description": "Specialized training covering SIEM orchestration, incident handling, threat detection, and defensive operations.",
    "category": "education"
  },
  {
    "id": "time-4",
    "period": "2021 - 2025",
    "title": "B.Tech in Computer Science & Engineering",
    "role": "Vidya Academy of Science & Technology",
    "description": "Undergraduate degree with technical focus on systems engineering, computer networks, and application security. Graduated with CGPA 7.56/10.",
    "category": "education"
  }
];

export const initialSkills: SkillGroup[] = [
  {
    "id": "skill-1",
    "title": "Application Security & VAPT",
    "items": [
      "Web Application VAPT",
      "OWASP Top 10",
      "API Penetration Testing",
      "Secure Code Review",
      "Burp Suite",
      "Postman",
      "Metasploit",
      "Exploit Replication"
    ]
  },
  {
    "id": "skill-2",
    "title": "Detection Engineering (SOC & SIEM)",
    "items": [
      "Wazuh",
      "Alert Triage",
      "Log Correlation",
      "MITRE ATT&CK",
      "auditd",
      "FIM",
      "SCA",
      "SIEM Tuning",
      "IOC Analysis"
    ]
  },
  {
    "id": "skill-3",
    "title": "Linux & Infrastructure",
    "items": [
      "Arch Linux",
      "Debian",
      "Ubuntu",
      "Kernel Hardening",
      "systemd",
      "PAM",
      "CIS Benchmarks",
      "SSH Hardening",
      "UFW",
      "Apache",
      "Nginx"
    ]
  },
  {
    "id": "skill-4",
    "title": "Threat Intelligence & CTI",
    "items": [
      "IOC Enrichment",
      "Wazuh CDB Lists",
      "AbuseIPDB",
      "VirusTotal",
      "MITRE ATT&CK Mapping",
      "Threat Correlation"
    ]
  },
  {
    "id": "skill-5",
    "title": "Scripting & Tooling",
    "items": [
      "Go (Golang)",
      "Python",
      "Bash",
      "SQLite",
      "Docker",
      "Git",
      "Regex",
      "Concurrent Automation"
    ]
  }
];
