import React from 'react';
import { HeroThreeCanvas } from './HeroThreeCanvas';
import { Profile } from '../types/portfolio';
import { ArrowDownRight, ExternalLink } from 'lucide-react';

interface Props {
  profile: Profile;
}

export const HeroSection: React.FC<Props> = ({ profile }) => {
  return (
    <section className="relative pt-16 md:pt-28 pb-16 md:pb-24 border-b border-white/10 overflow-hidden">
      {/* Three.js Interactive Particle Canvas */}
      <HeroThreeCanvas />

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Honey Metadata Bar */}
        <div className="flex flex-wrap justify-between items-center font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-8 md:mb-12 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-lime rounded-full" />
            <span>{profile.role}</span>
          </div>
          <div className="hidden sm:block">{profile.location}</div>
          <div>RESEARCH DOSSIER · 2026</div>
        </div>

        {/* Massive Honey Headline */}
        <h1 className="text-[52px] sm:text-[76px] lg:text-[104px] font-black uppercase tracking-[-0.04em] leading-[0.92] mb-12 md:mb-16 select-none">
          CODE-LEVEL <span className="text-lime glow-lime">RESEARCH.</span><br />
          MEASURED <span className="text-ink-faint">DEFENSE.</span>
        </h1>

        {/* Two-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-4">
          {/* Left Column: Real Verified Summary & Tagline */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed tracking-tight">
              {profile.tagline}
            </p>
            <p className="text-base md:text-lg text-[#B5B2AC] leading-relaxed font-normal">
              {profile.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#research" 
                className="inline-flex items-center gap-2.5 bg-lime hover:bg-[#b8dd00] text-black font-bold text-xs uppercase font-mono px-6 py-3.5 rounded transition-all hover:translate-y-[-2px] shadow-[0_4px_20px_rgba(212,255,0,0.25)]"
              >
                <span>Inspect Upstream CVEs</span>
                <ArrowDownRight size={16} />
              </a>
              <a 
                href={profile.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#181818] border border-white/10 text-white font-mono text-xs uppercase px-6 py-3.5 rounded transition-colors"
              >
                <span>GitHub Verification</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Key Verified Stats Blocks */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-6 rounded-lg">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
                83%
              </div>
              <div className="text-xs font-mono font-bold text-lime uppercase mt-2">
                CIS Compliance
              </div>
              <div className="text-[11px] text-ink-muted mt-1">
                Arch Linux (lifted from 26% baseline)
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-6 rounded-lg">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
                55k+
              </div>
              <div className="text-xs font-mono font-bold text-lime uppercase mt-2">
                IOCs / Cycle
              </div>
              <div className="text-[11px] text-ink-muted mt-1">
                Automated 6-hour CTI pipeline
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-6 rounded-lg">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
                Top 1%
              </div>
              <div className="text-xs font-mono font-bold text-lime uppercase mt-2">
                TryHackMe Global
              </div>
              <div className="text-[11px] text-ink-muted mt-1">
                21 verified security badges
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-6 rounded-lg">
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
                2 CVEs
              </div>
              <div className="text-xs font-mono font-bold text-lime uppercase mt-2">
                Upstream Patches
              </div>
              <div className="text-[11px] text-ink-muted mt-1">
                NLTK framework PR #3625
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
