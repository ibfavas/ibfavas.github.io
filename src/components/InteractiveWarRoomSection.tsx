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
    title: 'Phase 01: The Reconnaissance',
    dotColor: 'bg-[#FF7700]',
    tag: 'SURFACE ENUMERATION',
    image: '/assets/ui/phase-recon.webp',
    imageTitle: 'NOCTURNAL SURFACE CARTOGRAPHY & SCHEMATICS',
    description:
      'I COMMENCE BY SYSTEMATICALLY MAPPING EVERY UNRESTRICTED SYSTEMCALL, RAW SOCKET CONTRACT, AND DECOMPILING PACKAGED RUNTIMES. ISOLATING THE HIDDEN CHINK IN THE ARMOR BEFORE ANY ATTACK TRAFFIC IS GENERATED.',
    deliverables: ['Network Attack Surface Map', 'Decompiled Binary Disassembly', 'Endpoint Logic Matrix']
  },
  {
    id: 'fuzzing',
    step: '02',
    title: 'Phase 02: Exploit Fuzzing',
    dotColor: 'bg-[#E5D020]',
    tag: 'ROOT-CAUSE DISCOVERY',
    image: '/assets/ui/phase-fuzzing.webp',
    imageTitle: 'FORENSIC CODE DISSECTION // REMBRANDT ANATOMY',
    description:
      'DYNAMIC PAYLOAD INJECTION TARGETING MEMORY UNSAFETY, CORRUPTED DESERIALIZATION CHAINS, AND STATE MACHINE ANOMALIES. I CONSTRUCT TARGETED HARNESSES TO PROVE CRITICAL BUFFER OVERFLOW AND ARBITRARY CODE EXECUTION (AS ACHIEVED IN CVE-2026-12261).',
    deliverables: ['Fuzzing Harness Scripts', 'Crash Dumps & Core Analysis', 'Deterministic Execution Path']
  },
  {
    id: 'poc',
    step: '03',
    title: 'Phase 03: The Exhibition',
    dotColor: 'bg-[#33DD66]',
    tag: 'VERIFIED PROOF OF CONCEPT',
    image: '/assets/ui/phase-poc.webp',
    imageTitle: 'THE REVELATION // CARAVAGGIO CHIAROSCURO',
    description:
      'I DEMONSTRATE THE VULNERABILITY UNDER STRICT CONTROLLED CONDITIONS. FULL REVERSE SHELL INTERACTION, PAYLOAD OBFUSCATION TESTING (PEELR), AND CVSS v3.1 BASE SCORING TO PROVIDE IRREFUTABLE SCIENTIFIC EVIDENCE.',
    deliverables: ['Weaponized Python PoC', 'CVSS Vector String & Score', 'Technical Disclosure Advisory']
  },
  {
    id: 'remediation',
    step: '04',
    title: 'Phase 04: The Fortification',
    dotColor: 'bg-[#20D0C0]',
    tag: 'PRODUCTION HARDENING',
    image: '/assets/ui/phase-remediation.webp',
    imageTitle: 'THE CITADEL COUNCIL // ARCHITECTURAL REINFORCEMENT',
    description:
      'CLOSING THE DOOR PERMANENTLY. I ENGINEER THE UPSTREAM SOURCE PATCH, CONFIGURE HARDENED SYSTEMD SANDBOX DIRECTIVES, AND INJECT CUSTOM WAZUH CDB RULESETS WITH ZERO REGRESSION TO SYSTEM PERFORMANCE.',
    deliverables: ['Upstream Pull Request', 'CIS Benchmark Auditd Rules', 'Wazuh Active Response Config']
  }
];

export const InteractiveWarRoomSection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = PHASES[activePhaseIndex];

  return (
    <section id="war-room" className="relative w-full bg-[#000000] border-b border-white/10 overflow-hidden py-16 md:py-24">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 pb-3.5 mb-12 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
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
                      Audit Cadence
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#757575] uppercase">
                    CYCLE: 14 DAYS
                  </span>
                </div>

                {/* Phase Selection Tabs */}
                <div className="space-y-3 font-mono">
                  {PHASES.map((phase, idx) => {
                    const isActive = idx === activePhaseIndex;
                    return (
                      <button
                        key={phase.id}
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
                            isActive ? 'text-white translate-x-1' : 'text-[#555] group-hover:text-white'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Operational Note */}
              <div className="mt-8 pt-6 border-t border-white/5 font-mono text-[11px] text-[#757575]">
                <span className="text-white block font-semibold mb-1">STRICT PROTOCOL:</span>
                Continuous synchronization with core engineering stakeholders at every sprint milestone.
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
                      VERIFIED CADENCE
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
                    src={activePhase.image}
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