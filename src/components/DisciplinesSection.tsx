import React from 'react';
import { Shield, Eye, Terminal, Lock } from 'lucide-react';

export const DisciplinesSection: React.FC = () => {
  const disciplines = [
    {
      number: '01',
      title: 'Application Security & Vulnerability Research',
      subtitle: 'Source-Code Auditing, Upstream Patches & Memory Tracing',
      icon: <Shield className="w-5 h-5 text-lime" />,
      description:
        'Auditing production codebases for structural logic flaws, race conditions, and deserialization escapes. Author of CVE-2024-39705 and CVE-2026-81723 in Python NLTK core, with fully merged upstream fixes.',
      stack: ['Python Core', 'AST Parsing', 'CWE-284 / CWE-400', 'Decompilation', 'Burp Suite', 'GDB', 'OWASP Top 10']
    },
    {
      number: '02',
      title: 'SOC Analytics & SIEM Orchestration',
      subtitle: 'Automated Threat Intelligence & Detection Engineering',
      icon: <Eye className="w-5 h-5 text-lime" />,
      description:
        'Engineering automated threat intelligence pipelines ingesting 55,000+ indicators per run with automated confidence scoring. Synchronizing verified CDB lists into Wazuh SIEM with 22,000+ MITRE-mapped auditd rules.',
      stack: ['Wazuh SIEM', 'Threat Feeds', 'auditd (Neo23x0)', 'SQLite Deduplication', 'MITRE ATT&CK', 'Sysmon', 'systemd']
    },
    {
      number: '03',
      title: 'Zero-Dependency Security Tooling',
      subtitle: 'Lean Standard-Library Utilities for Hardened Environments',
      icon: <Terminal className="w-5 h-5 text-lime" />,
      description:
        'Author of PEELR (Reverse Shell & Obfuscation Suite) and NetPulse (Terminal Diagnostic HUD). Building zero-dependency, ultra-lightweight utilities that run natively in restricted air-gapped environments without dependency bloat.',
      stack: ['POSIX Shell', 'Python Standard Lib', 'Linux sysfs', 'Pure C / Rust', 'Zero-Bloat CLI', 'Network Sockets']
    },
    {
      number: '04',
      title: 'CIS-Benchmarked Linux Hardening',
      subtitle: 'Host Lockdown, Compliance & Kernel Hardening',
      icon: <Lock className="w-5 h-5 text-lime" />,
      description:
        'Author of SiteGuard and Linux Hardening Benchmarks. Audited Ubuntu and Debian servers against CIS Benchmark v3.0, systematically remediating over 100 configuration points to escalate host compliance from 26% to 83%.',
      stack: ['CIS Benchmark v3.0', 'Arch Linux', 'Ubuntu LTS', 'sysctl Hardening', 'Auditd Rules', 'File Integrity Monitoring']
    }
  ];

  return (
    <section id="disciplines" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 02 / 09 ]</span>
          <span className="text-[#A0A0A0]">CORE DISCIPLINES // TECHNICAL CAPABILITIES</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>FOUR PILLARS OF PRACTICE</span>
          <span className="text-lime">VERIFIED UPSTREAM</span>
        </div>
      </div>

      {/* Editorial Section Intro Header */}
      <div className="px-6 md:px-12 pt-16 md:pt-20 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
              // METHODICAL EXCELLENCE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Offense, defense,<br />
              <span className="text-[#8E8D8A]">and hardened systems.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Every discipline is practiced at source code depth. Zero automated scanning theater, zero unverified reports, strictly deterministic adversarial engineering.
          </p>
        </div>
      </div>

      {/* 4-Box Full-Width Architectural Grid (VARIED LAYOUT, NO REPETITIVE STICKY COLUMN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b border-white/10">
        {disciplines.slice(0, 2).map((item, idx) => (
          <div
            key={idx}
            className="p-8 md:p-14 hover:bg-[#050505] transition-colors duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-lime font-bold tracking-widest">
                  [ {item.number} ]
                </span>
                <div className="p-2 border border-white/10 bg-white/[0.02] text-white group-hover:border-lime group-hover:text-lime transition-colors">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-normal text-white uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                {item.title}
              </h3>

              <div className="font-mono text-xs text-[#757575] uppercase tracking-wider mb-6">
                {item.subtitle}
              </div>

              <p className="text-sm md:text-base text-[#B0B0B0] font-light leading-relaxed mb-8">
                {item.description}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider mb-3">
                CORE TECHNICAL ARSENAL:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[10px] text-[#A0A0A0] bg-[#0A0A0A] border border-white/10 px-2.5 py-1 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b border-white/10">
        {disciplines.slice(2, 4).map((item, idx) => (
          <div
            key={idx + 2}
            className="p-8 md:p-14 hover:bg-[#050505] transition-colors duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-lime font-bold tracking-widest">
                  [ {item.number} ]
                </span>
                <div className="p-2 border border-white/10 bg-white/[0.02] text-white group-hover:border-lime group-hover:text-lime transition-colors">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-normal text-white uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                {item.title}
              </h3>

              <div className="font-mono text-xs text-[#757575] uppercase tracking-wider mb-6">
                {item.subtitle}
              </div>

              <p className="text-sm md:text-base text-[#B0B0B0] font-light leading-relaxed mb-8">
                {item.description}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-[#555] uppercase tracking-wider mb-3">
                CORE TECHNICAL ARSENAL:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[10px] text-[#A0A0A0] bg-[#0A0A0A] border border-white/10 px-2.5 py-1 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};