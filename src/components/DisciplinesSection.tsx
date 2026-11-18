import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Terminal, Lock } from 'lucide-react';

export const DisciplinesSection: React.FC = () => {
  const disciplines = [
    {
      number: "01",
      title: "Application Security & Code Audit",
      subtitle: "Source-Code Vulnerability Discovery & Upstream Fixes",
      icon: <Shield className="w-5 h-5 text-lime" />,
      description: "Auditing application source code for structural logic flaws, improper access control, and algorithmic exhaustion. Crafting deterministic, weaponized repros and writing code-level remediation patches upstream in production frameworks.",
      stack: ["Python", "Node.js", "AST Analysis", "OWASP Top 10", "Burp Suite", "API Security", "Semgrep"]
    },
    {
      number: "02",
      title: "SOC Analytics & SIEM Orchestration",
      subtitle: "Threat Intelligence & Detection Engineering",
      icon: <Eye className="w-5 h-5 text-lime" />,
      description: "Engineering automated threat intelligence pipelines ingesting 55,000+ indicators per run. Building confidence-scoring algorithms, syncing validated CDB lists into Wazuh SIEM, and deploying 22,000+ kernel-level auditd rules mapped to MITRE ATT&CK.",
      stack: ["Wazuh SIEM", "Threat Intel Feeds", "auditd (Neo23x0)", "SQLite", "MITRE ATT&CK", "Sysmon", "systemd"]
    },
    {
      number: "03",
      title: "Zero-Dependency Security Tooling",
      subtitle: "Lean, Pure-Standard-Library defensive utilities",
      icon: <Terminal className="w-5 h-5 text-lime" />,
      description: "Building defensive security utilities without bloated third-party dependencies. Utilizing pure standard libraries for real-time telemetry HUDs, AST extractors, and reconnaissance scanners that run seamlessly in restricted production environments.",
      stack: ["Python Standard Library", "POSIX Shell", "Linux sysfs", "AST Parsing", "Zero-Bloat Binaries"]
    },
    {
      number: "04",
      title: "CIS-Benchmarked Linux Hardening",
      subtitle: "Host Auditing, Compliance & Kernel Lockdown",
      icon: <Lock className="w-5 h-5 text-lime" />,
      description: "Auditing Linux servers against CIS Benchmark v3.0 baselines. Remediating over 100 system misconfigurations to elevate compliance from 26% to 83%. Enforcing kernel module blacklisting, sysctl network protections, and file integrity monitoring.",
      stack: ["CIS Benchmark v3.0", "Arch Linux", "Debian", "sysctl Hardening", "FIM", "Filesystem Mount Security"]
    }
  ];

  return (
    <section id="disciplines" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 02 / 08 ]</span>
          <span>CORE DISCIPLINES &bull; SERVICES</span>
        </div>
        <span>DOMAINS: OFFENSE &bull; DEFENSE &bull; INFRASTRUCTURE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 lg:sticky lg:top-14 self-start">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
            // METHODICAL EXPERTISE
          </span>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tightest leading-[0.95] text-white uppercase mb-6">
            Offense, defense,<br />
            and hardened<br />
            systems.
          </h2>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed mb-8">
            We do not skim surfaces. Every assessment isolates structural root causes, builds deterministic weaponized repros, and verifies system boundaries before delivering upstream patches and hardened baselines.
          </p>

          <div className="p-4 bg-[#080808] border border-white/10 font-mono text-xs text-[#8E8D8A]">
            <span className="text-white font-bold block mb-1">DEFENSIVE DIRECTIVE:</span>
            <span>&ldquo;Anyone can report a vulnerability. I wanted to know if I could fix one.&rdquo;</span>
          </div>
        </div>

        {/* Right Disciplines Grid */}
        <div className="lg:col-span-7 divide-y divide-white/10">
          {disciplines.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-10 hover:bg-[#060606] transition-colors group"
            >
              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-lime font-bold">[{item.number}]</span>
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white group-hover:text-lime transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </div>
              </div>

              <div className="font-mono text-xs text-[#8E8D8A] uppercase tracking-wider mb-4">
                {item.subtitle}
              </div>

              <p className="text-sm md:text-base text-[#A0A0A0] font-light leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.stack.map((s, sIdx) => (
                  <span 
                    key={sIdx}
                    className="font-mono text-[10px] text-[#A0A0A0] bg-[#111111] border border-white/5 px-2.5 py-1 uppercase"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
