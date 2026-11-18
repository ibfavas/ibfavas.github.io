import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    "CVE-2026-12261 UPSTREAM NLTK PATCH MERGED (PR #3625)",
    "ARCH LINUX 83% CIS COMPLIANCE BENCHMARK (FROM 26%)",
    "55,000+ IOCS INGESTED PER 6-HOUR SYSTEMD CYCLE",
    "TRYHACKME TOP 1% GLOBAL RANKING (21 BADGES)",
    "CVE-2026-81723 ALGORITHMIC COMPLEXITY DISCLOSURE",
    "22,000+ AUDITD KERNEL RULES DEPLOYED",
    "EC-COUNCIL CERTIFIED SOC ANALYST (ECC3194250687)",
    "ZERO DEPENDENCY RECON TOOLING IN GO & PYTHON"
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap border-b border-white/10 bg-[#080808] py-3 font-mono text-[11px] text-ink-muted select-none">
      <div className="inline-block animate-marquee">
        {items.concat(items).map((text, idx) => (
          <span key={idx} className="mr-10 inline-flex items-center">
            <span className="text-lime mr-3">■</span>
            <span className="tracking-wider">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
