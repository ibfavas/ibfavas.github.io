import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Cpu } from 'lucide-react';
import { initialProfile } from '../data/portfolioData';
import { HeroThreeCanvas } from './HeroThreeCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full border-b border-white/10 bg-[#000000] overflow-hidden">
      {/* Top Chapter Coordinate Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 01 / 08 ]</span>
          <span>DISPATCH &bull; TELEMETRY</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>TARGET: LINUX // WAZUH // NLTK</span>
          <span>LOCATION: KOLLAM, IN</span>
        </div>
      </div>

      {/* Main Massive Title Block */}
      <div className="px-6 md:px-12 pt-12 md:pt-20 pb-8 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-xs md:text-sm text-lime uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-lime" />
            <span>APPLICATION SECURITY &bull; SOC ANALYST &bull; SYSTEMS RESEARCH</span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-normal tracking-tightest leading-[0.92] text-white uppercase select-none">
            Move like an adversary.<br />
            <span className="text-[#8E8D8A] hover:text-white transition-colors duration-500">
              Defend like an architect.
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Two-Column Architectural Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Editorial & Action Column */}
        <div className="lg:col-span-7 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            <h2 className="font-mono text-xs text-[#757575] uppercase tracking-widest mb-4">
              // RESEARCH SUMMARY
            </h2>
            <p className="text-lg md:text-2xl text-[#E9E9E9] font-light leading-relaxed tracking-tight max-w-2xl mb-8">
              {initialProfile.summary}
            </p>

            {/* Key Empirical Verification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-y border-white/10 mb-8 font-mono">
              <div className="p-3 bg-[#080808] border border-white/5">
                <span className="text-[10px] text-[#757575] block uppercase">CVEs Patched</span>
                <span className="text-xl font-bold text-white tracking-tight">02 Upstream</span>
              </div>
              <div className="p-3 bg-[#080808] border border-white/5">
                <span className="text-[10px] text-[#757575] block uppercase">IOC Ingestion</span>
                <span className="text-xl font-bold text-white tracking-tight">55K+ / Run</span>
              </div>
              <div className="p-3 bg-[#080808] border border-white/5">
                <span className="text-[10px] text-[#757575] block uppercase">CIS Baseline</span>
                <span className="text-xl font-bold text-lime tracking-tight">26% &rarr; 83%</span>
              </div>
              <div className="p-3 bg-[#080808] border border-white/5">
                <span className="text-[10px] text-[#757575] block uppercase">TryHackMe</span>
                <span className="text-xl font-bold text-white tracking-tight">Top 1%</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#cve-research" 
              className="inline-flex items-center gap-3 bg-white hover:bg-lime text-black px-6 py-3.5 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:scale-[1.02]"
            >
              <span>INSPECT VERIFIED CVEs</span>
              <ArrowDownRight size={16} />
            </a>
            <a 
              href="#systems" 
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/5 transition-all"
            >
              <span>DEFENSIVE LABS &amp; CODE</span>
            </a>
          </div>
        </div>

        {/* Right Interactive Cybernetic Viewport */}
        <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full bg-[#050505] overflow-hidden flex flex-col justify-between p-6">
          {/* Three.js interactive constellation */}
          <HeroThreeCanvas />

          {/* Telemetry Window Header Overlay */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#757575] border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-ping" />
              <span className="text-white font-semibold">HUD // TELEMETRY CANVAS</span>
            </div>
            <span>MODE: INTERACTIVE 3D</span>
          </div>

          {/* Center Coordinates & Visual Graphic */}
          <div className="relative z-10 my-auto text-center pointer-events-none py-12">
            <div className="inline-block p-4 border border-white/10 bg-black/60 backdrop-blur-sm rounded-none">
              <Cpu className="w-8 h-8 mx-auto text-lime mb-2 opacity-80" />
              <div className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                NEURAL DEFENSE GRID
              </div>
              <div className="font-mono text-[10px] text-[#757575] mt-1">
                CURSOR RECEPTIVE &bull; REAL-TIME PARALLAX
              </div>
            </div>
          </div>

          {/* Telemetry Window Footer Overlay */}
          <div className="relative z-10 grid grid-cols-3 gap-2 font-mono text-[10px] border-t border-white/10 pt-3 text-[#757575]">
            <div>
              <span className="block text-[9px] uppercase">LATENCY</span>
              <span className="text-white">0.4 MS</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase">AUDITD RULES</span>
              <span className="text-white">22,000+</span>
            </div>
            <div className="text-right">
              <span className="block text-[9px] uppercase">STATUS</span>
              <span className="text-lime font-bold">NOMINAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
