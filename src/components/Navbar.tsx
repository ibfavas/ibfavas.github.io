import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface Props {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center text-xs font-mono tracking-wider uppercase">
        {/* Brand Left */}
        <div className="flex items-baseline gap-3">
          <Link to="/" className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
            <span className="text-lime font-mono text-base" onClick={onOpenAdmin}>&gt;</span>
            <span>MOHAMMAD FAVAS S</span>
          </Link>
          <span className="hidden lg:inline text-ink-faint text-[10px]">
            [ 08°53'N 76°36'E ]
          </span>
        </div>

        {/* Center Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-ink-muted">
          <Link 
            to={isHome ? "#research" : "/#research"} 
            className="hover:text-white transition-colors"
          >
            RESEARCH <span className="text-ink-faint text-[10px]">[ 02 ]</span>
          </Link>
          <Link 
            to={isHome ? "#projects" : "/#projects"} 
            className="hover:text-white transition-colors"
          >
            SYSTEMS <span className="text-ink-faint text-[10px]">[ 06 ]</span>
          </Link>
          <Link 
            to="/writeups" 
            className={`hover:text-white transition-colors ${location.pathname.startsWith('/writeups') ? 'text-lime font-bold' : ''}`}
          >
            WRITEUPS <span className="text-ink-faint text-[10px]">[ 07 ]</span>
          </Link>
          <Link 
            to={isHome ? "#timeline" : "/#timeline"} 
            className="hover:text-white transition-colors"
          >
            TIMELINE
          </Link>
          <Link 
            to={isHome ? "#contact" : "/#contact"} 
            className="hover:text-white transition-colors"
          >
            CONTACT
          </Link>
        </nav>

        {/* Right Status Pill & CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] text-lime/90 font-medium bg-lime/10 border border-lime/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span>UPSTREAM PATCHED</span>
          </div>

          <a 
            href="mailto:favassalam88@gmail.com" 
            className="bg-[#F4F1EE] hover:bg-white text-black px-4 py-1.5 rounded-full font-bold text-[11px] tracking-normal transition-all hover:scale-105"
          >
            ENGAGE
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-white p-1 hover:text-lime"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-white/10 px-6 py-6 space-y-4 font-mono text-sm uppercase">
          <Link 
            to={isHome ? "#research" : "/#research"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink-muted hover:text-white py-1"
          >
            RESEARCH [ 02 CVEs ]
          </Link>
          <Link 
            to={isHome ? "#projects" : "/#projects"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink-muted hover:text-white py-1"
          >
            SYSTEMS [ 06 Projects ]
          </Link>
          <Link 
            to="/writeups" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lime font-bold py-1"
          >
            ALL WRITEUPS [ 07 Articles ]
          </Link>
          <Link 
            to={isHome ? "#timeline" : "/#timeline"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink-muted hover:text-white py-1"
          >
            TIMELINE &amp; CERTS
          </Link>
          <Link 
            to={isHome ? "#contact" : "/#contact"} 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-ink-muted hover:text-white py-1"
          >
            CONTACT
          </Link>
        </div>
      )}
    </header>
  );
};
