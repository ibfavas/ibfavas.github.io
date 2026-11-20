import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, GraduationCap, Activity, X } from 'lucide-react';
import { CredentialGallery } from './CredentialGallery';
import { initialTimeline } from '../data/portfolioData';
import { Certification } from '../types/portfolio';
import { DecryptText } from './DecryptText';

export const CredentialsSection: React.FC = () => {
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>(initialTimeline[0].id);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const activeTimeline = initialTimeline.find(t => t.id === selectedTimelineId) || initialTimeline[0];

  // Prevent background scrolling while certificate lightbox is open
  useEffect(() => {
    if (!selectedCert) return;
    const element = dialog.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [selectedCert]);

  return (
    <section id="credentials" className="w-full bg-[#000000] border-b border-white/10 select-none">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-4 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 11 / 12 ]</span>
          <span className="text-[#A0A0A0]">ACCREDITATION // TRAJECTORY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lime">INTERACTIVE CIRCUIT TIMELINE</span>
          <span className="hidden sm:inline text-[#909090]">&bull;</span>
          <a href="https://tryhackme.com/p/ibfavas" className="hidden sm:inline hover:text-white">TRYHACKME / IBFAVAS</a>
        </div>
      </div>

      {/* Editorial Section Intro Header */}
      <div className="px-4 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
              // PROFESSIONAL RECORD
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Credentials &amp;<br />
              <span className="text-[#8E8D8A]">engineering trajectory.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            View the supporting documents for my certifications and training, then follow my education and project-based work.
          </p>
        </div>
      </div>

      {/* Part A: 4-Column Verified Credentials Matrix */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono text-xs text-lime uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} />
              <span>// 01. CERTIFICATIONS &amp; COURSEWORK</span>
            </h3>
            <span className="font-mono text-[10px] text-[#909090] uppercase">
              VIEW DOCUMENTS
            </span>
          </div>

          <CredentialGallery onOpen={setSelectedCert} documentOpen={Boolean(selectedCert)} />
        </div>
      </div>

      {/* Part B: Interactive Cyber Circuit Timeline (Point 6 Redesign!) */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-mono text-xs text-lime uppercase tracking-widest flex items-center gap-2">
            <GraduationCap size={14} />
            <span>// 02. INTERACTIVE CIRCUIT TIMELINE</span>
          </h3>
          <span className="font-mono text-[10px] text-[#909090] uppercase hidden sm:inline">
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
                  aria-pressed={isSelected}
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
                    <span className="text-[10px] uppercase text-[#909090]">
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
                aria-pressed={isSelected}
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

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Certificate Lightbox Modal (Scale 0.95 -> 1, Opacity 0 -> 1, 250ms easeOut) */}
      <AnimatePresence>
        {selectedCert && (
          <dialog ref={dialog} aria-label={selectedCert.title}
            onCancel={() => setSelectedCert(null)}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 m-0 h-[100dvh] w-screen max-h-none max-w-none open:flex items-center justify-center p-3 sm:p-6 bg-black/90 text-white backdrop:bg-black/80"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#070707] border border-white/20 p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Technical Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                  <span className="text-white font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                    [ CREDENTIAL DOCUMENT ]
                  </span>
                  <span className="text-[#909090] hidden sm:inline">&bull;</span>
                  <span className="text-lime uppercase hidden sm:inline">{selectedCert.issuer}</span>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-red hover:text-white text-white font-mono text-xs uppercase tracking-wider transition-colors"
                  onKeyDown={event => { if (event.key === 'Tab') event.preventDefault(); }}
                  aria-label="Close modal"
                >
                  <span className="hidden sm:inline">ESC /</span>
                  <span>CLOSE</span>
                  <X size={14} />
                </button>
              </div>

              {/* Large Readable Certificate Image Container */}
              <div className="relative flex-1 min-h-0 bg-[#030303] border border-white/10 p-2 sm:p-4 flex items-center justify-center overflow-auto">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[62vh] w-auto max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              {/* Modal Technical Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[#888]">
                <div>
                  <span className="text-white font-semibold uppercase">{selectedCert.title}</span>
                  <span className="text-[#909090] mx-2">&bull;</span>
                  <span>{selectedCert.date}</span>
                </div>
                <div>
                  <span className="text-[#909090] uppercase mr-2">RECORD:</span>
                  <span className="text-lime font-bold">{selectedCert.evidence}</span>
                </div>
              </div>
            </motion.div>
          </dialog>
        )}
      </AnimatePresence>
    </section>
  );
};