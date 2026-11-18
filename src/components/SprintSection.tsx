import React from 'react';
import { motion } from 'framer-motion';

export const SprintSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "One Structural Flaw",
      summary: "WE DO NOT WASTE TIME ON SURFACE SYMPTOMS. WE AUDIT THE CODE AND ARCHITECTURE TO ISOLATE THE ROOT-CAUSE VULNERABILITY DOWN TO THE PRECISE INSTRUCTION.",
      details: "Whether evaluating an XML corpus reader or a distributed package downloader, we trace data flow across trust boundaries to pinpoint where validation breaks.",
      phase: "PHASE: SOURCE-CODE & FLOW DISCOVERY"
    },
    {
      step: "02",
      title: "Deterministic Repro",
      summary: "EVERY CLAIM MUST WITHSTAND ADVERSARIAL SCRUTINY. WE CONSTRUCT STANDALONE, WEAPONIZED REPRODUCERS THAT PROVE EXPLOITATION UNDER STRICT ZERO-DEPENDENCY CONDITIONS.",
      details: "Empirical proof over hypothetical claims. For CVE-2026-81723, a minimal payload confirmed quadratic O(N^2) CPU hang in under 3 seconds.",
      phase: "PHASE: WEAPONIZED VERIFICATION"
    },
    {
      step: "03",
      title: "Upstream Fix",
      summary: "ANYONE CAN REPORT A BUG. WE ENGINEER THE PRODUCTION FIX, AUTHOR COMPREHENSIVE REGRESSION TESTS, AND CONTRIBUTE PULL REQUESTS MERGED DIRECTLY UPSTREAM.",
      details: "Our patch for CVE-2026-12261 introduced isolated namespace boundaries in the NLTK Downloader, permanently eliminating multi-package model poisoning.",
      phase: "PHASE: UPSTREAM REMEDIATION & MERGE"
    }
  ];

  return (
    <section id="sprint" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 03 / 08 ]</span>
          <span>HOW WE WORK &bull; THE SPRINT METHOD</span>
        </div>
        <span>TRIPLE GATE: DISCOVERY &bull; PROOF &bull; REMEDIATION</span>
      </div>

      {/* Headline Block */}
      <div className="px-6 md:px-12 py-12 md:py-16 border-b border-white/10">
        <div className="font-mono text-xs text-[#757575] uppercase tracking-widest mb-3">
          // AUDIT PROTOCOL
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tightest leading-[0.95] text-white uppercase max-w-4xl">
          Not guesswork. Protocol.
        </h2>
        <p className="font-mono text-xs text-lime mt-3 uppercase tracking-wider">
          (OUR RESEARCH AND ENGINEERING WORKFLOW FOLLOWS THREE DETERMINISTIC PHASES)
        </p>
      </div>

      {/* The 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 w-full">
        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-6 md:p-10 flex flex-col justify-between hover:bg-[#070707] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-4xl md:text-5xl font-mono text-lime font-bold">
                  {item.step}
                </span>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest">
                  GATE {item.step} / 03
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-white uppercase mb-4">
                {item.title}
              </h3>

              <p className="font-mono text-xs text-white uppercase leading-relaxed tracking-wider mb-6">
                {item.summary}
              </p>

              <p className="text-sm text-[#8E8D8A] font-light leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <span className="font-mono text-[10px] text-lime uppercase tracking-widest block">
                {item.phase}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
