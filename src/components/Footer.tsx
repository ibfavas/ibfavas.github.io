import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToElement } from '../lib/lenis';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-white/10 font-mono text-[11px] text-[#909090]">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Left Column */}
        <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })} className="flex items-center gap-2.5">
                <img src="/assets/ui/logo.webp" alt="Favas Logo" className="h-5 w-auto object-contain" />
                <span className="font-bold text-white text-sm tracking-tight block">
                  MOHAMMAD FAVAS S
                </span>
              </Link>
            </div>
            <span className="text-[10px] text-[#909090] uppercase tracking-widest block">
              APPLICATION SECURITY &bull; VULNERABILITY RESEARCH &bull; KOLLAM, INDIA
            </span>
          </div>
          <div className="text-[10px] text-[#909090] mt-6">
            SECURITY RESEARCH PORTFOLIO
          </div>
        </div>

        {/* Center Navigation Column */}
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4 uppercase text-[10px] tracking-wider">
            <div className="space-y-2">
              <Link
                to="/#sprint"
                onClick={() => scrollToElement('sprint')}
                className="block text-[#8E8D8A] hover:text-white transition-colors"
              >
                [03] SPRINT CADENCE
              </Link>
              <Link
                to="/#disciplines"
                onClick={() => scrollToElement('disciplines')}
                className="block text-[#8E8D8A] hover:text-white transition-colors"
              >
                [07] DISCIPLINES
              </Link>
              <Link
                to="/#cve-research"
                onClick={() => scrollToElement('cve-research')}
                className="block text-[#8E8D8A] hover:text-white transition-colors"
              >
                [08] CVE RESEARCH
              </Link>
            </div>
            <div className="space-y-2">
              <Link
                to="/#systems"
                onClick={() => scrollToElement('systems')}
                className="block text-[#8E8D8A] hover:text-white transition-colors"
              >
                [09] SYSTEMS &amp; LABS
              </Link>
              <Link
                to="/#rules"
                onClick={() => scrollToElement('rules')}
                className="block text-[#8E8D8A] hover:text-white transition-colors"
              >
                [10] OPERATING RULES
              </Link>
              <Link
                to="/#credentials"
                onClick={() => scrollToElement('credentials')}
                className="block text-[#8E8D8A] hover:text-white transition-colors"
              >
                [11] CREDENTIALS
              </Link>
              <Link to="/writeups" className="block text-lime hover:underline font-bold">
                ALL 07 WRITEUPS &rarr;
              </Link>
            </div>
          </div>

          <div className="text-[10px] text-[#909090] mt-6">
            KOLLAM, KERALA, INDIA
          </div>
        </div>

        {/* Right Status & Copyright Column */}
        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-white font-medium">SYS.STATUS: OPERATIONAL</span>
          </div>

          <div className="text-[10px] text-[#909090] mt-6">
            &copy; 2026 Mohammad Favas S. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
