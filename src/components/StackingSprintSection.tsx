import React from 'react';

export const StackingSprintSection: React.FC = () => {
  return (
    <section id="sprint" className="relative w-full bg-[#000000] border-b border-white/10 overflow-hidden">
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 03 / 12 ]</span>
          <span className="text-[#A0A0A0]">OPERATING CADENCE // METHODOLOGY</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#909090]">
          <span>RESEARCH WORKFLOW</span>
          <span>&bull;</span>
          <span className="text-lime">EVIDENCE-DRIVEN ASSESSMENT</span>
        </div>
      </div>

      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-red text-black font-mono text-xs font-semibold uppercase tracking-wider rounded-sm">
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
              From suspicion to evidence.<br />
              <span className="text-[#8E8D8A]">From evidence to a fix.</span>
            </h2>
          </div>

        </div>
      </div>

      <div className="w-full">
        <div className="sticky top-16 z-10 w-full min-h-[380px] bg-[#050505] border-b border-white/10 px-6 md:px-16 py-16 flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-red font-bold uppercase tracking-widest">
                [ 01 ]
              </span>
              <span className="font-mono text-xs text-[#909090] uppercase tracking-widest">
                PHASE ONE &bull; SCOPE &bull; DEFINE BOUNDARIES
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest mb-8">
              Scope the question.
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#A0A0A0] uppercase leading-relaxed max-w-3xl tracking-wider">
              I trace one input from its caller to the component that first trusts it.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/5 font-mono text-[11px] text-[#909090]">
            <span>ENTRY POINTS &bull; TRUST BOUNDARIES</span>
            <span>ARTIFACT: RECON MAPPING</span>
          </div>
        </div>

        <div className="sticky top-24 z-20 w-full min-h-[380px] bg-red text-black border-t-2 border-black px-6 md:px-16 py-16 flex flex-col justify-between shadow-2xl">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-black font-extrabold uppercase tracking-widest">
                [ 02 ]
              </span>
              <span className="font-mono text-xs text-black/80 font-bold uppercase tracking-widest">
                PHASE TWO &bull; SPRINT &bull; VALIDATE IMPACT
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-normal text-black uppercase tracking-tightest mb-8">
              Measure the impact.
            </h3>
            <p className="font-mono text-xs md:text-sm text-black font-semibold uppercase leading-relaxed max-w-3xl tracking-wider">
              I vary one input in the lab and compare the result with a baseline.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-black/20 font-mono text-[11px] text-black font-bold">
            <span>AFFECTED VERSION &bull; OBSERVED BEHAVIOR</span>
            <span>ARTIFACT: RESEARCH NOTES</span>
          </div>
        </div>

        <div className="sticky top-32 z-30 w-full min-h-[380px] bg-[#0A0A0A] border-t-2 border-white/10 px-6 md:px-16 py-16 flex flex-col justify-between shadow-2xl">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-xs text-lime font-bold uppercase tracking-widest">
                [ 03 ]
              </span>
              <span className="font-mono text-xs text-[#909090] uppercase tracking-widest">
                PHASE THREE &bull; REINFORCEMENT &bull; RETEST
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest mb-8">
              Verify the mitigation.
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#D0D0D0] uppercase leading-relaxed max-w-3xl tracking-wider">
              I rerun the same comparison with the proposed fix and check that ordinary inputs still work.
            </p>
          </div>
          <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/5 font-mono text-[11px] text-[#909090]">
            <span>UPSTREAM PATCH &bull; WAZUH LOGTEST &bull; CIS VALIDATION</span>
            <span className="text-lime font-semibold">ARTIFACT: RETEST NOTES</span>
          </div>
        </div>
      </div>
    </section>
  );
};