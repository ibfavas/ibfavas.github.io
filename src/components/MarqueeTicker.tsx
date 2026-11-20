import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    "CVE-2026-12261 UPSTREAM REMEDIATION",
    "CVE-2026-81723 QUADRATIC CPU EXHAUSTION",
    "CIS-BENCHMARKED LINUX HARDENING",
    "55,445 FEED RECORDS IN A LAB RUN",
    "WAZUH SIEM CUSTOM CDB DETECTION",
    "PEELR JAVASCRIPT TRIAGE",
    "NETPULSE LINUX DIAGNOSTICS",
    "TRYHACKME / IBFAVAS",
    "APPLICATION SECURITY RESEARCH"
  ];

  return (
    <div className="w-full bg-[#080808] border-b border-white/10 py-3.5 overflow-hidden whitespace-nowrap select-none font-mono text-xs uppercase tracking-wider text-[#A0A0A0]">
      <div aria-hidden="true" className="inline-flex animate-marquee">
        {items.concat(items).map((text, idx) => (
          <span key={idx} className="flex items-center mx-6 gap-6 hover:text-white transition-colors">
            <span className="text-lime font-bold">//</span>
            <span className="tracking-tight">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
