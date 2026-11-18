import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="w-full grid grid-cols-12 text-xs font-mono tracking-wider">
        {/* Cell 1: Brand Identifier */}
        <div className="col-span-8 sm:col-span-4 lg:col-span-3 px-6 py-4 border-r border-white/10 flex items-center justify-between">
          <Link to="/" className="flex flex-col group">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/ui/logo.webp" 
                alt="Favas Logo" 
                className="h-5 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-lime transition-colors">
                MOHAMMAD FAVAS S
              </span>
            </div>
            <span className="text-[10px] text-[#757575] uppercase tracking-widest mt-0.5">
              APPSEC &bull; SOC ANALYST &bull; &copy;2026
            </span>
          </Link>
        </div>

        {/* Cell 2: Live Coordinates & Telemetry (Hidden on small screens) */}
        <div className="hidden lg:flex col-span-4 px-6 py-4 border-r border-white/10 items-center justify-between text-[11px] text-[#8E8D8A]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
            </span>
            <span className="text-white font-medium">SOC TELEMETRY: ACTIVE</span>
          </div>
          <span className="text-[#575757]">
            LOC: 08&deg;53'N 76&deg;36'E [KOLLAM]
          </span>
        </div>

        {/* Cell 3: Desktop Navigation Chapters */}
        <nav className="hidden sm:flex col-span-4 lg:col-span-5 px-6 py-4 items-center justify-end gap-6 text-[11px]">
          <a 
            href={isHome ? "#disciplines" : "/#disciplines"} 
            className="text-[#8E8D8A] hover:text-white transition-colors"
          >
            <span className="text-[#575757] mr-1">[02]</span>DISCIPLINES
          </a>
          <a 
            href={isHome ? "#cve-research" : "/#cve-research"} 
            className="text-[#8E8D8A] hover:text-white transition-colors"
          >
            <span className="text-[#575757] mr-1">[04]</span>CVEs
          </a>
          <a 
            href={isHome ? "#systems" : "/#systems"} 
            className="text-[#8E8D8A] hover:text-white transition-colors"
          >
            <span className="text-[#575757] mr-1">[05]</span>WORK
          </a>
          <Link 
            to="/writeups" 
            className={`transition-colors ${location.pathname.startsWith('/writeups') ? 'text-lime font-bold' : 'text-[#8E8D8A] hover:text-white'}`}
          >
            WRITEUPS
          </Link>
          <a 
            href="mailto:favassalam88@gmail.com" 
            className="inline-flex items-center gap-1.5 bg-white hover:bg-lime text-black font-semibold px-3 py-1 text-[11px] transition-colors"
          >
            <span>DISPATCH</span>
            <ArrowUpRight size={13} />
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden col-span-4 px-6 py-4 items-center justify-end">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-white hover:text-lime p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#050505] border-t border-white/10 px-6 py-6 space-y-4 font-mono text-xs uppercase">
          <a 
            href={isHome ? "#disciplines" : "/#disciplines"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [02] CORE DISCIPLINES
          </a>
          <a 
            href={isHome ? "#sprint" : "/#sprint"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [03] SPRINT CADENCE
          </a>
          <a 
            href={isHome ? "#cve-research" : "/#cve-research"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [04] VERIFIED CVE RESEARCH
          </a>
          <a 
            href={isHome ? "#systems" : "/#systems"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [05] DEFENSIVE SYSTEMS &amp; LABS
          </a>
          <Link 
            to="/writeups" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lime font-bold py-1.5 border-b border-white/5"
          >
            ALL WRITEUPS [07 ARTICLES]
          </Link>
          <a 
            href={isHome ? "#rules" : "/#rules"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [06] OPERATING RULES
          </a>
          <a 
            href={isHome ? "#credentials" : "/#credentials"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [07] CREDENTIALS &amp; TIMELINE
          </a>
          <a 
            href="mailto:favassalam88@gmail.com" 
            className="block text-center bg-white text-black font-bold py-2.5 mt-4"
          >
            INITIATE DISPATCH
          </a>
        </div>
      )}
    </header>
  );
};
