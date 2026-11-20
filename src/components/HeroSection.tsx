import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Terminal, Flame, ExternalLink } from 'lucide-react';
import { DecryptText } from './DecryptText';

export const HeroSection: React.FC = () => {
  const spotlight = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" onPointerMove={event => {
      const node = spotlight.current;
      if (node && event.pointerType === 'mouse') {
        node.style.setProperty('--spot-x', `${event.clientX}px`);
        node.style.setProperty('--spot-y', `${event.clientY - event.currentTarget.getBoundingClientRect().top}px`);
      }
    }} className="relative w-full min-h-[calc(100vh-65px)]  border-b border-white/10 bg-[#000000] overflow-hidden flex flex-col justify-between select-none">
      {/* Interactive Cursor Spotlight Glow Effect (Soft subtle ambient light) */}
      <div
        ref={spotlight} className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(450px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), rgba(212, 255, 0, 0.025), transparent 70%), radial-gradient(300px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), rgba(255, 76, 36, 0.015), transparent 55%)`
        }}
      />

      {/* Subtle Background Geometric Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Chapter Coordinate Header */}
      <div className="relative z-10 w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold whitespace-nowrap">[ 01 / 12 ]</span>
          <span className="text-[#A0A0A0]">DISPATCH <span className="hidden sm:inline">// TELEMETRY</span></span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-white">PORTFOLIO</span>
          </span>
          <span className="hidden sm:inline">FOCUS: NLTK // WAZUH // LINUX</span>
          <span className="hidden md:inline">LOC: KOLLAM, IN</span>
        </div>
      </div>

      {/* Main Centered Content (Fitted within 100vh without cutting off) */}
      <div className="relative z-10 px-6 md:px-12 py-6 md:py-8 my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Subtle Tagline Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#D0D0D0]">
              <DecryptText text="SOC • SECURITY RESEARCH • VAPT" />
            </span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-normal tracking-tightest leading-[0.94] text-white uppercase select-none mb-4 md:mb-6">
            Move like an adversary.<br />
            <span className="text-[#8E8D8A] hover:text-white transition-colors duration-500">
              Defend like an architect.
            </span>
          </h1>

          {/* Punchy Sub-Headline (Kept concise to fit the fold) */}
          <p className="text-sm sm:text-base md:text-lg text-[#B5B5B5] font-light leading-relaxed max-w-2xl mb-6 md:mb-8">
            I’m Mohammad Favas S. I contributed fixes for two NLTK vulnerabilities and build tools for JavaScript review, threat detection and Linux hardening.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <a
              href="#cve-research"
              className="inline-flex items-center gap-2.5 bg-red hover:bg-[#ff5d38] text-black px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:scale-[1.02] shadow-lg shadow-red/25"
            >
              <Flame size={15} />
              <span>INSPECT VERIFIED CVEs</span>
              <ArrowDownRight size={15} />
            </a>
            <a
              href="#interactive-core"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/5 transition-all"
            >
              <Terminal size={15} />
              <span>3D THREAT CORE</span>
            </a>
            <a
              href="/Mohammad-Favas-S-Resume.pdf" download
              className="inline-flex items-center gap-2 border border-white/10 hover:border-lime/60 px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#999] hover:text-white transition-all"
            >
              <span>RÉSUMÉ (PDF)</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Docked Key Verification Badges (Docked along bottom of hero inside fold) */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10 font-mono text-left">
          <div className="p-3.5 md:p-4 hover:bg-white/[0.02] transition-colors group">
            <span className="text-[9px] text-[#909090] block uppercase tracking-wider mb-0.5">Downloader research</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-red transition-colors">
              CVE-2026-12261
            </span>
            <span className="text-[9px] text-red block mt-0.5 uppercase font-semibold">NVD CVSS 3.1 · 6.5 &bull; NLTK</span>
          </div>

          <div className="p-3.5 md:p-4 hover:bg-white/[0.02] transition-colors group">
            <span className="text-[9px] text-[#909090] block uppercase tracking-wider mb-0.5">Research archive</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-lime transition-colors">
              07 Dossiers
            </span>
            <span className="text-[9px] text-[#A0A0A0] block mt-0.5 uppercase">2 CVEs · 5 engineering notes</span>
          </div>

          <div className="p-3.5 md:p-4 hover:bg-white/[0.02] transition-colors group">
            <span className="text-[9px] text-[#909090] block uppercase tracking-wider mb-0.5">Wazuh SCA score</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-lime tracking-tight">
              26% &rarr; 83%
            </span>
            <span className="text-[9px] text-lime block mt-0.5 uppercase font-semibold">Arch Linux lab endpoint</span>
          </div>

          <div className="p-3.5 md:p-4 hover:bg-white/[0.02] transition-colors group">
            <span className="text-[9px] text-[#909090] block uppercase tracking-wider mb-0.5">Certification</span>
            <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-lime transition-colors">
              EC-Council CSA
            </span>
            <span className="text-[9px] text-[#A0A0A0] block mt-0.5 uppercase">Certified SOC Analyst</span>
          </div>
        </div>
      </div>
    </section>
  );
};
