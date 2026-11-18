import React from 'react';
import { ArrowDown } from 'lucide-react';

export const StackingSprintSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#000000] border-b border-white/10 overflow-hidden">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 03 / 09 ]</span>
          <span className="text-[#A0A0A0]">OPERATING CADENCE // METHODOLOGY</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#757575]">
          <span>EXECUTION CYCLE: 14 DAYS</span>
          <span>&bull;</span>
          <span className="text-lime">ZERO-LEAK ASSURANCE</span>
        </div>
      </div>

      {/* Editorial Headline with Avatar Pill */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-red text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-sm">
                HOW I OPERATE
              </span>
              <img
                src="/assets/ui/fictional-cyber-character.webp"
                alt="Cyber Architect"
                className="w-8 h-8 rounded-full border border-lime/40 object-cover object-top"
              />
              <span className="font-mono text-xs text-[#808080] uppercase tracking-wider">
                MOHAMMAD FAVAS S
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              It's not an academic exercise.<br />
              <span className="text-[#8E8D8A]">It's adversarial engineering.</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-[#757575] uppercase tracking-widest flex items-center gap-2 self-start md:self-end pb-2">
            <span>(SYSTEMATIC PROCESS AS 1... 2... 3...)</span>
            <ArrowDown size={14} className="text-lime animate-bounce" />
          </div>
        </div>
      </div>

      {/* Stacking Full-Width Cards Container */}
      <div className="w-full">
        {/* CARD 01: Obsidian Glass Card */}
        <div className="sticky top-16 z-10 w-full min-h-[380px] bg-[#050505] border-b border-white/10 px-6 md:px-16 py-16 flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-red font-bold uppercase tracking-widest">
                [ 01 ]
              </span>
              <span className="font-mono text-xs text-[#757575] uppercase tracking-widest">
                PHASE ONE &bull; SCOPE &bull; DAY 01 TO 04
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest mb-8">
              One Specific Vulnerability.
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#A0A0A0] uppercase leading-relaxed max-w-3xl tracking-wider">
              I DO NOT FLOOD ARCHITECTURES WITH 400-PAGE AUTOMATED SCANNER NOISE. I TARGET THE CRITICAL FLAW PLAGUING YOUR SYSTEM AND THROW ALL TECHNICAL RIGOR AT EXPOSING THE REVERSED EXECUTION PATH.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/5 font-mono text-[11px] text-[#555]">
            <span>VECTOR ENUMERATION &bull; DECOMPILATION</span>
            <span>ARTIFACT: RECON MAPPING</span>
          </div>
        </div>

        {/* CARD 02: Vivid Crimson Red Card */}
        <div className="sticky top-24 z-20 w-full min-h-[380px] bg-red text-black border-t-2 border-black px-6 md:px-16 py-16 flex flex-col justify-between shadow-2xl">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-black font-extrabold uppercase tracking-widest">
                [ 02 ]
              </span>
              <span className="font-mono text-xs text-black/80 font-bold uppercase tracking-widest">
                PHASE TWO &bull; SPRINT &bull; DAY 05 TO 10
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-normal text-black uppercase tracking-tightest mb-8">
              Two Weeks to Exploit.
            </h3>
            <p className="font-mono text-xs md:text-sm text-black font-semibold uppercase leading-relaxed max-w-3xl tracking-wider">
              MATCHING YOUR DEV CADENCE, I WORK IN INTENSIVE TWO-WEEK SPRINTS. ONCE THE LOGIC ANOMALY OR MEMORY UNSAFETY IS HONED IN, I ENGINEER A FULL WEAPONIZED PROOF OF CONCEPT TO PROVE ARBITRARY CODE EXECUTION.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-black/20 font-mono text-[11px] text-black font-bold">
            <span>DETERMINISTIC PoC &bull; MEMORY TRACING</span>
            <span>ARTIFACT: PYTHON DISCLOSURE DOSSIER</span>
          </div>
        </div>

        {/* CARD 03: Obsidian Glass Card with Lime Highlights */}
        <div className="sticky top-32 z-30 w-full min-h-[380px] bg-[#0A0A0A] border-t-2 border-white/10 px-6 md:px-16 py-16 flex flex-col justify-between shadow-2xl">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-lime font-bold uppercase tracking-widest">
                [ 03 ]
              </span>
              <span className="font-mono text-xs text-[#757575] uppercase tracking-widest">
                PHASE THREE &bull; REINFORCEMENT &bull; DAY 11 TO 14
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest mb-8">
              Zero Residual Surface.
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#D0D0D0] uppercase leading-relaxed max-w-3xl tracking-wider">
              I DO NOT SIMPLY FILE A TICKET AND WALK AWAY. I DRAFT THE UPSTREAM PULL REQUEST, VALIDATE AUDITD KERNEL SYSCALL LOGS, AND CONFIGURE CUSTOM WAZUH CDB RULESETS TO PERMANENTLY NEUTRALIZE THE ATTACK VECTOR.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/5 font-mono text-[11px] text-[#757575]">
            <span>UPSTREAM PATCH &bull; WAZUH LOGTEST &bull; CIS VALIDATION</span>
            <span className="text-lime font-semibold">STATUS: HARDENED TO PRODUCTION</span>
          </div>
        </div>
      </div>
    </section>
  );
};