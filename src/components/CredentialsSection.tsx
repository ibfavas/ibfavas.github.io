import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, GraduationCap, CheckCircle2, Activity } from 'lucide-react';
import { initialCertifications, initialTimeline } from '../data/portfolioData';
import { DecryptText } from './DecryptText';

export const CredentialsSection: React.FC = () => {
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(initialTimeline[0].id);
  const activeTimeline = initialTimeline.find(t => t.id === selectedTimelineId) || initialTimeline[0];

  return (
    <section id="credentials" className="w-full bg-[#000000] border-b border-white/10 select-none">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-4 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 08 / 09 ]</span>
          <span className="text-[#A0A0A0]">ACCREDITATION // TRAJECTORY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lime">INTERACTIVE CIRCUIT TIMELINE</span>
          <span className="hidden sm:inline text-[#555]">&bull;</span>
          <span className="hidden sm:inline">TRYHACKME TOP 1%</span>
        </div>
      </div>

      {/* Editorial Section Intro Header */}
      <div className="px-4 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
              // VERIFIED ACCREDITATION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Credentials &amp;<br />
              <span className="text-[#8E8D8A]">engineering trajectory.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Verifiable industry credentials, global adversarial rankings, and formal engineering foundations. Zero unbacked claims or decorative titles.
          </p>
        </div>
      </div>

      {/* Part A: 4-Column Verified Credentials Matrix */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono text-xs text-lime uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} />
              <span>// 01. FORMAL INDUSTRY ACCREDITATIONS</span>
            </h3>
            <span className="font-mono text-[10px] text-[#555] uppercase">
              ISSUER VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialCertifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-5 md:p-6 bg-[#060606] border border-white/10 hover:border-lime/40 transition-all group flex flex-col justify-between shadow-xl"
              >
                <div>
                  {cert.image && (
                    <div className="w-14 h-14 mb-5 bg-white/[0.03] border border-white/10 p-2 flex items-center justify-center overflow-hidden rounded-none">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  )}

                  <span className="font-mono text-[10px] text-lime uppercase tracking-wider block mb-1 font-semibold">
                    {cert.issuer}
                  </span>

                  <h4 className="text-base sm:text-lg font-normal text-white uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                    {cert.title}
                  </h4>

                  <span className="font-mono text-xs text-[#777] block mb-4">
                    {cert.date}
                  </span>
                </div>

                <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-[#555] flex items-center justify-between">
                  <span>CREDENTIAL ID</span>
                  <span className="text-[#888]">{cert.credentialId || 'VERIFIED'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Part B: Interactive Cyber Circuit Timeline (Point 6 Redesign!) */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-mono text-xs text-lime uppercase tracking-widest flex items-center gap-2">
            <GraduationCap size={14} />
            <span>// 02. INTERACTIVE CIRCUIT TIMELINE</span>
          </h3>
          <span className="font-mono text-[10px] text-[#555] uppercase hidden sm:inline">
            CLICK ANY MILESTONE NODE TO INSPECT
          </span>
        </div>

        {/* Desktop Circuit Rail */}
        <div className="hidden md:block relative mb-12">
          {/* Background Connecting Bus Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="relative z-10 grid grid-cols-4 gap-4">
            {initialTimeline.map((item, idx) => {
              const isSelected = item.id === selectedTimelineId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTimelineId(item.id)}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-300 font-mono group ${
                    isSelected
                      ? 'bg-white/10 border-lime text-white shadow-[0_0_25px_rgba(212,255,0,0.15)] scale-[1.02]'
                      : 'bg-black/80 border-white/10 text-[#777] hover:border-white/30 hover:text-white'
                  }`}
                >
                  {/* Glowing Node Ping Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-3 h-3 rounded-full border-2 transition-colors ${
                      isSelected ? 'bg-lime border-white shadow-[0_0_10px_#D4FF00]' : 'bg-[#151515] border-white/20 group-hover:border-white'
                    }`} />
                    <span className="text-[10px] uppercase text-[#666]">
                      STEP 0{idx + 1}
                    </span>
                  </div>

                  <span className={`text-xs block font-bold mb-1 ${isSelected ? 'text-lime' : 'text-white'}`}>
                    {item.period}
                  </span>
                  <span className="text-xs font-medium block truncate text-[#A0A0A0]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Milestone Selector Pills */}
        <div className="flex md:hidden flex-wrap gap-2 mb-8 font-mono text-xs">
          {initialTimeline.map((item) => {
            const isSelected = item.id === selectedTimelineId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedTimelineId(item.id)}
                className={`px-3 py-2 border rounded-lg transition-all ${
                  isSelected
                    ? 'bg-lime text-black font-bold border-lime shadow-lg shadow-lime/20'
                    : 'bg-[#080808] border-white/10 text-[#888]'
                }`}
              >
                {item.period}
              </button>
            );
          })}
        </div>

        {/* Holographic Expanded Milestone Terminal Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTimeline.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="p-6 md:p-10 rounded-2xl bg-[#060606] border border-white/15 relative overflow-hidden shadow-2xl"
          >
            {/* Top Amber Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-lime text-black font-bold text-[10px] uppercase tracking-wider">
                  {activeTimeline.period}
                </span>
                <span className="text-[#888] uppercase text-[11px]">
                  CATEGORY: {activeTimeline.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lime text-[11px]">
                <Activity size={14} className="animate-pulse" />
                <span>ACTIVE OPERATIONAL NODE</span>
              </div>
            </div>

            {/* Title & Role */}
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white uppercase tracking-tight mb-2">
              <DecryptText text={activeTimeline.title} />
            </h4>
            <div className="font-mono text-xs md:text-sm text-lime uppercase tracking-wider mb-6 font-semibold">
              ROLE: {activeTimeline.role}
            </div>

            {/* Tactical In-Depth Narrative (Strict First-Person Singular: I, my) */}
            <p className="text-base md:text-lg text-[#C5C5C5] font-light leading-relaxed mb-8 max-w-4xl">
              {activeTimeline.description}
            </p>

            {/* Key Deliverables & Validation Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="p-3 bg-black/60 border border-white/5 flex items-center gap-2.5 text-white">
                <CheckCircle2 size={14} className="text-lime flex-shrink-0" />
                <span>Deterministic Execution</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/5 flex items-center gap-2.5 text-white">
                <CheckCircle2 size={14} className="text-lime flex-shrink-0" />
                <span>Production Security Verified</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/5 flex items-center gap-2.5 text-white">
                <CheckCircle2 size={14} className="text-lime flex-shrink-0" />
                <span>Zero Unbacked Claims</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};