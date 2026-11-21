import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { scrollToElement } from '../lib/lenis';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  return (
    <header onKeyDown={event => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggle.current?.focus();
      }
    }} className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="w-full flex items-stretch text-xs font-mono tracking-wider">
        {/* Cell 1: Brand Identifier */}
        <div className="min-w-0 flex-1 px-3 sm:px-6 py-2 sm:py-4 border-r border-white/10 flex items-center justify-between">
          <Link to="/" aria-label="Mohammad Favas S, home" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })} className="flex flex-col group">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/ui/logo.webp" 
                alt="Favas Logo" 
                className="h-5 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-lime transition-colors">
                <span className="hidden sm:inline">MOHAMMAD </span>FAVAS<span className="hidden sm:inline"> S</span>
              </span>
            </div>
            <span className="hidden sm:block text-[10px] text-[#909090] uppercase tracking-widest mt-0.5">
              SOC &bull; SECURITY RESEARCH &bull; VAPT
            </span>
          </Link>
        </div>

        {/* Cell 2: Live Coordinates & Telemetry (Hidden on small screens) */}
        <div className="hidden xl:flex gap-6 px-6 py-4 border-r border-white/10 items-center justify-between text-[11px] text-[#8E8D8A]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
            </span>
            <span className="text-white font-medium">RESEARCH DESK</span>
          </div>
          <span className="text-[#909090]">
            KOLLAM, INDIA
          </span>
        </div>

        {/* Cell 3: Desktop Navigation Chapters */}
        <nav className="hidden lg:flex px-5 py-2 items-center justify-end gap-6 text-[11px]">
          <Link 
            to="/#disciplines" 
            onClick={() => scrollToElement('disciplines')}
            className="text-[#8E8D8A] hover:text-white transition-colors"
          >
            <span className="text-[#909090] mr-1">[07]</span>DISCIPLINES
          </Link>
          <Link 
            to="/#cve-research" 
            onClick={() => scrollToElement('cve-research')}
            className="text-[#8E8D8A] hover:text-white transition-colors"
          >
            <span className="text-[#909090] mr-1">[08]</span>CVEs
          </Link>
          <Link 
            to="/#systems" 
            onClick={() => scrollToElement('systems')}
            className="text-[#8E8D8A] hover:text-white transition-colors"
          >
            <span className="text-[#909090] mr-1">[09]</span>WORK
          </Link>
          <Link 
            to="/writeups" 
            className={`transition-colors ${location.pathname.startsWith('/writeups') ? 'text-lime font-bold' : 'text-[#8E8D8A] hover:text-white'}`}
          >
            WRITEUPS
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-1 px-1 sm:gap-3 sm:px-4 font-mono text-[11px]">
          <a href="/Mohammad-Favas-S-Resume.pdf" download
            className="inline-flex min-h-11 items-center px-2 text-white hover:text-lime">
            RÉSUMÉ
          </a>
          <a href="mailto:favassalam88@gmail.com"
            className="inline-flex min-h-11 items-center gap-1.5 bg-white px-2.5 font-semibold text-black hover:bg-lime sm:px-3">
            CONTACT <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden pr-2 py-2 items-center justify-end">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-white hover:text-lime p-3"
            ref={toggle} aria-expanded={mobileMenuOpen} aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-h-[78dvh] overflow-y-auto bg-[#050505] border-t border-white/10 px-6 py-6 space-y-4 font-mono text-xs uppercase">
          <Link 
            to="/#sprint" 
            onClick={() => { setMobileMenuOpen(false); scrollToElement('sprint'); }}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [03] SPRINT CADENCE
          </Link>
          <Link 
            to="/#disciplines" 
            onClick={() => { setMobileMenuOpen(false); scrollToElement('disciplines'); }}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [07] CORE DISCIPLINES
          </Link>
          <Link 
            to="/#cve-research" 
            onClick={() => { setMobileMenuOpen(false); scrollToElement('cve-research'); }}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [08] VERIFIED CVE RESEARCH
          </Link>
          <Link 
            to="/#systems" 
            onClick={() => { setMobileMenuOpen(false); scrollToElement('systems'); }}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [09] DEFENSIVE SYSTEMS &amp; LABS
          </Link>
          <Link 
            to="/writeups" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lime font-bold py-1.5 border-b border-white/5"
          >
            ALL WRITEUPS [07 ARTICLES]
          </Link>
          <Link 
            to="/#rules" 
            onClick={() => { setMobileMenuOpen(false); scrollToElement('rules'); }}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [10] OPERATING RULES
          </Link>
          <Link 
            to="/#credentials" 
            onClick={() => { setMobileMenuOpen(false); scrollToElement('credentials'); }}
            className="block text-[#8E8D8A] hover:text-white py-1.5 border-b border-white/5"
          >
            [11] CREDENTIALS &amp; TIMELINE
          </Link>
        </div>
      )}
    </header>
  );
};
