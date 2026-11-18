import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-12 font-mono text-xs text-ink-muted">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-tight">favas.is-a.dev</span>
          <span className="text-ink-faint">/</span>
          <span className="text-[11px] text-ink-faint">HONEY OBSIDIAN SYSTEM</span>
        </div>

        <div className="flex items-center gap-6 uppercase text-[11px]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/#research" className="hover:text-white transition-colors">Research</Link>
          <Link to="/#projects" className="hover:text-white transition-colors">Systems</Link>
          <Link to="/writeups" className="hover:text-white transition-colors">Writeups</Link>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-[11px] text-ink-faint text-center md:text-right">
          &copy; 2026 Mohammad Favas S. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
