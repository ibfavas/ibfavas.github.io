import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Terminal, Flame, ExternalLink } from 'lucide-react';
import { initialProfile } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full border-b border-white/10 bg-[#000000] overflow-hidden">
      {/* Top Chapter Coordinate Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 01 / 09 ]</span>
          <span className="text-[#A0A0A0]">DISPATCH // TELEMETRY</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-white">STATUS: ARMED</span>
          </span>
          <span>TARGETS: NLTK // WAZUH // LINUX</span>
          <span>LOCATION: KOLLAM, IN</span>
        </div>
      </div>

      {/* Main Massive Editorial Title Block (Full-Width, Centered Impact like Honey Screenshot 1) */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-16 border-b border-white/10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto flex flex-col items-center"
        >
          {/* Subtle Tagline Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#E0E0E0]">
              APPLICATION SECURITY &bull; OFFENSIVE RESEARCH &bull; SYSTEMS RESILIENCE
            </span>
          </div>

          {/* Massive Display Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal tracking-tightest leading-[0.94] text-white uppercase select-none mb-8">
            Move like an adversary.<br />
            <span className="text-[#8E8D8A] hover:text-white transition-colors duration-500">
              Defend like an architect.
            </span>
          </h1>

          {/* Editorial Summary */}
          <p className="text-lg md:text-2xl text-[#C0C0C0] font-light leading-relaxed tracking-tight max-w-3xl mb-10">
            {initialProfile.summary}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a
              href="#cve-research"
              className="inline-flex items-center gap-3 bg-red hover:bg-[#ff5d38] text-white px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:scale-[1.02] shadow-lg shadow-red/20"
            >
              <Flame size={16} />
              <span>INSPECT VERIFIED CVEs</span>
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#interactive-core"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white px-8 py-4 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/5 transition-all"
            >
              <Terminal size={16} />
              <span>LAUNCH 3D THREAT CORE</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-lime/60 px-6 py-4 font-mono text-xs uppercase tracking-wider text-[#A0A0A0] hover:text-white transition-all"
            >
              <span>DISPATCH ENQUIRY</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Key Empirical Verification Badges (Oversized 4-Box Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl font-mono text-left">
            <div className="p-4 bg-[#080808] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[10px] text-[#757575] block uppercase tracking-wider mb-1">CVE Record</span>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">CVE-2024-39705</span>
              <span className="text-[10px] text-red block mt-1 uppercase font-semibold">CVSS 8.8 HIGH &bull; NLTK</span>
            </div>
            <div className="p-4 bg-[#080808] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[10px] text-[#757575] block uppercase tracking-wider mb-1">Verified Writeups</span>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">07 Dossiers</span>
              <span className="text-[10px] text-[#A0A0A0] block mt-1 uppercase">Full Technical PoCs</span>
            </div>
            <div className="p-4 bg-[#080808] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[10px] text-[#757575] block uppercase tracking-wider mb-1">CIS Linux Baseline</span>
              <span className="text-xl md:text-2xl font-bold text-lime tracking-tight">26% &rarr; 83%</span>
              <span className="text-[10px] text-lime block mt-1 uppercase font-semibold">Ubuntu 22.04 LTS</span>
            </div>
            <div className="p-4 bg-[#080808] border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-[10px] text-[#757575] block uppercase tracking-wider mb-1">Certifications</span>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">ISC2 &bull; CSA</span>
              <span className="text-[10px] text-[#A0A0A0] block mt-1 uppercase">Certified in Cyber</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};