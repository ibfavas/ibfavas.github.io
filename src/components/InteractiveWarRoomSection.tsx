import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, ChevronRight } from 'lucide-react';

interface PhaseData {
  id: string;
  step: string;
  title: string;
  dotColor: string;
  tag: string;
  image: string;
  imageTitle: string;
  description: string;
  deliverables: string[];
}

const PHASES: PhaseData[] = [
  {
    id: 'recon',
    step: '01',
    title: '01 / Map ownership',
    dotColor: 'bg-[#FF7700]',
    tag: 'SURFACE ENUMERATION',
    image: '/assets/ui/phase-recon.webp',
    imageTitle: 'NOCTURNAL SURFACE CARTOGRAPHY & SCHEMATICS',
    description:
      'Start with the downloader contract. A data package has an ID and a shared installation directory. Which paths belong to that package?',
    deliverables: ['Package ID', 'Shared directory', 'Expected owner']
  },
  {
    id: 'fuzzing',
    step: '02',
    title: '02 / Trace the checks',
    dotColor: 'bg-[#E5D020]',
    tag: 'ROOT-CAUSE DISCOVERY',
    image: '/assets/ui/phase-fuzzing.webp',
    imageTitle: 'FORENSIC CODE DISSECTION // REMBRANDT ANATOMY',
    description:
      'Trace the order of the checks. The old downloader could make files available before it verified the archive, and did not enforce ownership of each member.',
    deliverables: ['Integrity check', 'Installation order', 'Member ownership']
  },
  {
    id: 'poc',
    step: '03',
    title: '03 / Establish impact',
    dotColor: 'bg-[#33DD66]',
    tag: 'INTEGRITY IMPACT',
    image: '/assets/ui/phase-poc.webp',
    imageTitle: 'THE REVELATION // CARAVAGGIO CHIAROSCURO',
    description:
      'Record the integrity impact. An ordinary NLTK API could read another package’s changed data after installation, including after an interpreter restart.',
    deliverables: ['Changed resource', 'Affected API', 'Persistence on disk']
  },
  {
    id: 'remediation',
    step: '04',
    title: '04 / Inspect the fix',
    dotColor: 'bg-[#20D0C0]',
    tag: 'UPSTREAM REPAIR',
    image: '/assets/ui/phase-remediation.webp',
    imageTitle: 'THE CITADEL COUNCIL // ARCHITECTURAL REINFORCEMENT',
    description:
      'Review PR #3625. The downloader verifies the staged archive and checks member ownership while preserving the directory layout. NLTK 3.10.0 includes the change.',
    deliverables: ['Merged patch', 'Regression checks', 'Released version']
  }
];

export const InteractiveWarRoomSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = PHASES[activePhaseIndex];

  return (
    <section id="war-room" className="relative w-full bg-[#000000] border-b border-white/10 overflow-hidden py-16 md:py-24">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 pb-3.5 mb-12 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 06 / 12 ]</span>
          <span className="text-[#A0A0A0]">WAR ROOM ARCHITECTURE // INTERACTIVE PHASES</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-lime">SELECT PHASE TO INSPECT</span>
          <span>&bull;</span>
          <span>4 DISTINCT PHASES</span>
        </div>
      </div>

      {/* Main Master Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Interactive Tab Sidebar */}
            <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-white" />
                    <span className="font-mono text-sm uppercase font-semibold text-white tracking-wider">
                      NLTK case file
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#909090] uppercase">
                    #3625
                  </span>
                </div>

                {/* Phase Selection Tabs */}
                <div className="space-y-3 font-mono">
                  {PHASES.map((phase, idx) => {
                    const isActive = idx === activePhaseIndex;
                    return (
                      <button
                        key={phase.id}
                        aria-pressed={isActive}
                        onClick={() => setActivePhaseIndex(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                          isActive
                            ? 'bg-white/10 border-white/30 text-white shadow-lg'
                            : 'bg-black/40 border-white/5 text-[#888] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${phase.dotColor} shadow-sm`} />
                          <span className="text-xs md:text-sm tracking-wide font-medium">
                            {phase.title}
                          </span>
                        </div>
                        <ChevronRight
                          size={14}
                          className={`transition-transform duration-300 ${
                            isActive ? 'text-white translate-x-1' : 'text-[#909090] group-hover:text-white'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Operational Note */}
              <div className="mt-8 pt-6 border-t border-white/5 font-mono text-[11px] text-[#909090]">
                <span className="text-white block font-semibold mb-1">CASE NOTES</span>
                Follow one downloader finding from the ownership question to the released fix.
              </div>
            </div>

            {/* Right War Room Content & Fine Art Pane */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Bracketed Header Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-6 md:p-8 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md"
                >
                  {/* Honey-style Red Corner Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red pointer-events-none" />

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-red font-bold uppercase tracking-widest">
                      [ {activePhase.step} &bull; {activePhase.tag} ]
                    </span>
                    <span className="font-mono text-[10px] text-[#777] uppercase">
                      CVE-2026-12261
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-normal text-white uppercase tracking-tight mb-4">
                    {activePhase.title}
                  </h3>

                  <p className="font-mono text-xs md:text-sm text-[#B0B0B0] leading-relaxed uppercase tracking-wider mb-6">
                    {activePhase.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono text-[11px]">
                    {activePhase.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/90">
                        <CheckCircle2 size={13} className="text-lime flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Classical Fine-Art Artwork Frame with Dynamic Switcher */}
              <div className="relative rounded-2xl border border-white/10 overflow-hidden aspect-[16/9] bg-black group shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhase.image}
                    loading="lazy" src={activePhase.image}
                    alt={activePhase.imageTitle}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-110"
                  />
                </AnimatePresence>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Artwork Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#A0A0A0] bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10">
                  <span className="uppercase text-white font-medium">{activePhase.imageTitle}</span>
                  <span className="text-red font-semibold uppercase">PHASE {activePhase.step} ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};