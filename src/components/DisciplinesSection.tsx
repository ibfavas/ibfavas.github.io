import React from 'react';
import { Shield, Eye, Terminal, Lock } from 'lucide-react';

export const DisciplinesSection: React.FC = () => {
  const disciplines = [
    {
      number: '01',
      title: 'Application Security & Vulnerability Research',
      subtitle: 'Source review and upstream remediation',
      icon: <Shield className="w-5 h-5 text-lime" />,
      description:
        'I review application trust boundaries and parser behavior. My NLTK contributions cover package ownership and algorithmic complexity.',
      stack: ['Python', 'AST Parsing', 'CWE-284 / CWE-400', 'Decompilation', 'Burp Suite', 'GDB', 'OWASP Top 10']
    },
    {
      number: '02',
      title: 'SOC Analytics & SIEM Orchestration',
      subtitle: 'Automated Threat Intelligence & Detection Engineering',
      icon: <Eye className="w-5 h-5 text-lime" />,
      description:
        'I normalize and score threat feeds in SQLite, export CDB lists and test Wazuh rules against sample events in my lab.',
      stack: ['Wazuh SIEM', 'Threat Feeds', 'auditd (Neo23x0)', 'SQLite Deduplication', 'MITRE ATT&CK', 'Sysmon', 'systemd']
    },
    {
      number: '03',
      title: 'Security Tooling',
      subtitle: 'JavaScript triage and network diagnostics',
      icon: <Terminal className="w-5 h-5 text-lime" />,
      description:
        'I built Peelr to triage JavaScript source with a Go CLI and local web console. NetPulse uses Bubble Tea to bring Linux network measurements into one terminal.',
      stack: ['POSIX Shell', 'Python Standard Lib', 'Linux sysfs', 'Go', 'Bubble Tea', 'Network Sockets']
    },
    {
      number: '04',
      title: 'CIS-Benchmarked Linux Hardening',
      subtitle: 'Host Lockdown, Compliance & Kernel Hardening',
      icon: <Lock className="w-5 h-5 text-lime" />,
      description:
        'I use Wazuh assessments to track changes to an Arch Linux lab endpoint, including mount flags, privilege boundaries and audit logging.',
      stack: ['CIS Benchmark v3.0', 'Arch Linux', 'Ubuntu LTS', 'sysctl Hardening', 'Auditd Rules', 'File Integrity Monitoring']
    }
  ];

  return (
    <section id="disciplines" className="w-full bg-[#000000] border-b border-white/10">
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 07 / 12 ]</span>
          <span className="text-[#A0A0A0]">CORE DISCIPLINES // TECHNICAL CAPABILITIES</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>FOUR PILLARS OF PRACTICE</span>
          <span className="text-lime">RESEARCH & LAB WORK</span>
        </div>
      </div>

      <div className="px-6 md:px-12 pt-16 md:pt-20 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
              // TECHNICAL SKILLS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Offense, defense,<br />
              <span className="text-[#8E8D8A]">and hardened systems.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Application security is my primary practice. Detection engineering and host hardening help me assess what a defender can observe and control.
          </p>
        </div>
      </div>

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

              <div className="font-mono text-xs text-[#909090] uppercase tracking-wider mb-6">
                {item.subtitle}
              </div>

              <p className="text-sm md:text-base text-[#B0B0B0] font-light leading-relaxed mb-8">
                {item.description}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-[#909090] uppercase tracking-wider mb-3">
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

              <div className="font-mono text-xs text-[#909090] uppercase tracking-wider mb-6">
                {item.subtitle}
              </div>

              <p className="text-sm md:text-base text-[#B0B0B0] font-light leading-relaxed mb-8">
                {item.description}
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] text-[#909090] uppercase tracking-wider mb-3">
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