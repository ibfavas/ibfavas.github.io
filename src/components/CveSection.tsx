import React, { useState } from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { XmlReaderTrace } from './XmlReaderTrace';
import { initialCves } from '../data/portfolioData';

const comparisons: Record<string, { before: string; after: string }> = {
  'cve-1': {
    before: 'Extract into shared data directory\nCheck installed archive integrity',
    after: 'Verify staged archive before installation\nCheck each member’s top-level directory against the package ID'
  },
  'cve-2': {
    before: 'Read next block\nRecheck accumulated fragment from its beginning',
    after: 'Read next block\nCarry forward tag state and the last opening delimiter'
  }
};

export const CveSection: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<Record<string, 'vulnerable' | 'patched'>>({
    'cve-1': 'patched',
    'cve-2': 'patched'
  });

  return (
    <section id="cve-research" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 08 / 12 ]</span>
          <span className="text-red font-semibold">// CVE RESEARCH</span>
          <span className="text-[#A0A0A0] hidden sm:inline">&bull; PYTHON LIBRARY SECURITY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white">TARGET: NLTK ENGINE</span>
          <span className="px-2 py-0.5 bg-red text-black text-[10px] font-bold">2 DISCLOSURES</span>
        </div>
      </div>

      {/* Editorial Section Intro Header */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-red uppercase tracking-widest block mb-3">
              // DISCLOSED VULNERABILITIES
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Vulnerabilities in NLTK.<br />
              <span className="text-[#8E8D8A]">Audited and patched upstream.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Two public records cover different risks in the same library. One concerns the integrity of installed data, the other the cost of parsing untrusted XML.
          </p>
        </div>
      </div>

      {/* Full-Width Spotlight Cards (VARIED FULL-WIDTH ARCHITECTURAL LAYOUT) */}
      <div className="divide-y divide-white/10">
        {initialCves.map((cve) => {
          const isVulnerable = activeCodeTab[cve.id] === 'vulnerable';

          return (
            <div key={cve.id} className="p-6 md:p-14 max-w-7xl mx-auto">
              {/* Header Badges & CVE Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-red text-black font-mono text-xs font-bold uppercase tracking-wider">
                    {cve.cveId}
                  </span>
                  <span className="px-2.5 py-1 bg-white/10 text-white font-mono text-xs font-semibold">
                    {cve.rating}
                  </span>
                  <span className="px-2.5 py-1 border border-lime/40 text-lime font-mono text-[10px] font-bold uppercase tracking-wider">
                    UPSTREAM PATCHED // VERIFIED
                  </span>
                  <span className="font-mono text-xs text-[#808080] ">
                    {cve.weakness}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={`/writeups/${cve.cveId.toLowerCase()}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-lime text-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    <span>READ DOSSIER</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href={cve.advisoryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-lime text-[#CCC] hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    <span>NVD RECORD</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={cve.prLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    <span>UPSTREAM FIX</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Title & Component Meta */}
              <h3 className="text-2xl md:text-4xl font-normal text-white uppercase tracking-tight mb-3">
                {cve.title}
              </h3>

              <div className="space-y-1 mb-5 font-mono text-xs">
                <div className="text-[#A0A0A0]">
                  <span className="text-white font-semibold uppercase mr-2">AFFECTED:</span>
                  <span>{cve.affected}</span>
                </div>
                <div className="text-lime">
                  <span className="text-white font-semibold uppercase mr-2">REMEDIATION:</span>
                  <span>{cve.status}</span>
                </div>
              </div>

              <p className="text-base md:text-lg text-[#C0C0C0] font-light leading-relaxed mb-6 max-w-4xl">
                {cve.summary}
              </p>

              {/* Impact Banner */}
              <div className="p-4 bg-red/10 border-l-2 border-red mb-8 font-mono text-xs text-white/90">
                <span className="text-red font-bold mr-2 uppercase">IMPACT</span>
                {cve.id === 'cve-1' ? 'Integrity of installed resources' : 'Availability of the process reading the corpus'}
              </div>

              {cve.cveId === 'CVE-2026-81723' && <XmlReaderTrace />}

              {/* Interactive Code Comparison Box */}
              <div className="border border-white/15 rounded-none bg-[#050505] overflow-hidden">
                <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 bg-[#0A0A0A] border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-[#888]" />
                    <span className="text-[#888] uppercase">ILLUSTRATED LOGIC · PSEUDOCODE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-pressed={isVulnerable}
                      onClick={() =>
                        setActiveCodeTab(prev => ({ ...prev, [cve.id]: 'vulnerable' }))
                      }
                      className={`min-h-11 px-3 py-1 font-mono text-xs transition-colors ${
                        isVulnerable
                          ? 'bg-red text-black font-bold'
                          : 'text-[#777] hover:text-white'
                      }`}
                    >
                      BEFORE
                    </button>
                    <button aria-pressed={!isVulnerable}
                      onClick={() =>
                        setActiveCodeTab(prev => ({ ...prev, [cve.id]: 'patched' }))
                      }
                      className={`min-h-11 px-3 py-1 font-mono text-xs transition-colors ${
                        !isVulnerable
                          ? 'bg-lime text-black font-bold'
                          : 'text-[#777] hover:text-white'
                      }`}
                    >
                      AFTER
                    </button>
                  </div>
                </div>

                <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto text-[#E0E0E0] bg-[#030303] leading-relaxed">
                  <pre className="whitespace-pre-wrap">
                    <code>{isVulnerable ? comparisons[cve.id].before : comparisons[cve.id].after}</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Writeup Dossiers Link Banner */}
      <div className="w-full bg-[#080808] border-t border-white/10 p-6 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-1">
            ARCHIVE DOSSIERS
          </span>
          <p className="text-sm md:text-base text-white font-light">
            Read the two vulnerability disclosures and five engineering dossiers, including Peelr, SiteGuard and the Wazuh lab.
          </p>
        </div>
        <Link
          to="/writeups"
          className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex-shrink-0"
        >
          <span>VIEW ALL 7 WRITEUPS</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
};