import React from 'react';
import { Link } from 'react-router-dom';
import { CveItem } from '../types/portfolio';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  cves: CveItem[];
}

export const CveSection: React.FC<Props> = ({ cves }) => {
  return (
    <section id="research" className="py-20 md:py-28 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline border-b border-white/10 pb-4 mb-12 font-mono text-xs uppercase tracking-wider text-ink-muted">
          <span>[ SECTION 01 / 05 ]</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight my-2">
            UPSTREAM DISCLOSURES
          </h2>
          <span className="text-lime">VERIFIED CODE REMEDIATION</span>
        </div>

        {/* 2-Column CVE Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cves.map((cve, idx) => (
            <article 
              key={cve.id} 
              className="bg-[#0A0A0A] hover:bg-[#0E0E0E] border border-white/10 hover:border-white/30 rounded-lg p-8 md:p-10 flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                <div className="flex justify-between items-center font-mono text-xs mb-6">
                  <span className="bg-lime/10 border border-lime/30 text-lime px-3 py-1 rounded font-bold">
                    [ 0{idx + 1} // {cve.cveId} ]
                  </span>
                  <span className="text-ink-muted flex items-center gap-1.5 text-[11px]">
                    <ShieldCheck size={14} className="text-lime" />
                    {cve.status}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4 group-hover:text-lime transition-colors">
                  {cve.title}
                </h3>

                <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-6 font-normal">
                  {cve.summary}
                </p>
              </div>

              <div>
                <div className="bg-[#121212] border border-white/5 rounded p-4 font-mono text-[11px] text-ink-faint space-y-1.5 mb-6">
                  <div className="truncate"><strong className="text-ink-muted">Weakness:</strong> {cve.weakness}</div>
                  <div className="truncate"><strong className="text-ink-muted">Scope:</strong> {cve.affected}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Link 
                    to={`/writeups/${cve.cveId.toLowerCase()}`}
                    className="inline-flex items-center gap-2 font-mono text-xs text-lime font-bold hover:underline"
                  >
                    <span>Read Technical Writeup</span>
                    <ArrowRight size={14} />
                  </Link>
                  {cve.prLink && (
                    <a 
                      href={cve.prLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-ink-muted hover:text-white"
                    >
                      PR #3625 &nearr;
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
