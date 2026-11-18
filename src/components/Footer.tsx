import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-white/10 font-mono text-[11px] text-[#757575]">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Left Column */}
        <div className="md:col-span-4 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img src="/assets/ui/logo.webp" alt="Favas Logo" className="h-5 w-auto object-contain" />
              <span className="font-bold text-white text-sm tracking-tight block">
                MOHAMMAD FAVAS S
              </span>
            </div>
            <span className="text-[10px] text-[#575757] uppercase tracking-widest block">
              APPLICATION SECURITY &bull; SOC ANALYST &bull; KOLLAM, INDIA
            </span>
          </div>
          <div className="text-[10px] text-[#444] mt-6">
            DEPLOYMENT: GITHUB PAGES &bull; REACT VITE SPA
          </div>
        </div>

        {/* Center Navigation Column */}
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4 uppercase text-[10px] tracking-wider">
            <div className="space-y-2">
              <a href="#disciplines" className="block text-[#8E8D8A] hover:text-white transition-colors">
                [02] DISCIPLINES
              </a>
              <a href="#sprint" className="block text-[#8E8D8A] hover:text-white transition-colors">
                [03] SPRINT CADENCE
              </a>
              <a href="#cve-research" className="block text-[#8E8D8A] hover:text-white transition-colors">
                [04] CVE RESEARCH
              </a>
            </div>
            <div className="space-y-2">
              <a href="#systems" className="block text-[#8E8D8A] hover:text-white transition-colors">
                [05] SYSTEMS &amp; LABS
              </a>
              <a href="#rules" className="block text-[#8E8D8A] hover:text-white transition-colors">
                [06] OPERATING RULES
              </a>
              <Link to="/writeups" className="block text-lime hover:underline font-bold">
                ALL 07 WRITEUPS &rarr;
              </Link>
            </div>
          </div>

          <div className="text-[10px] text-[#444] mt-6">
            BRUTALIST ARCHITECTURAL EDITION // NO EM DASHES
          </div>
        </div>

        {/* Right Status & Copyright Column */}
        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-white font-medium">SYS.STATUS: OPERATIONAL</span>
          </div>

          <div className="text-[10px] text-[#575757] mt-6">
            &copy; 2026 Mohammad Favas S. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
