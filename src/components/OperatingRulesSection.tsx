import React from 'react';
import { motion } from 'framer-motion';

export const OperatingRulesSection: React.FC = () => {
  const rules = [
    {
      number: "001",
      title: "PIN THE VERSION.",
      description: "Record the library version, configuration and input boundary alongside each finding."
    },
    {
      number: "002",
      title: "ACCOUNT FOR DEPENDENCIES.",
      description: "Prefer the standard library when it fits. Document the modules and privileges a tool requires."
    },
    {
      number: "003",
      title: "WORK WITH MAINTAINERS.",
      description: "Keep a patch focused on the failed invariant and the callers it affects."
    },
    {
      number: "004",
      title: "KEEP THE EVIDENCE.",
      description: "Save the observation that supports the finding and state what remains uncertain."
    },
    {
      number: "005",
      title: "TEST ORDINARY INPUTS.",
      description: "A fix should preserve the behavior existing callers rely on."
    },
    {
      number: "006",
      title: "LAYER THE CONTROLS.",
      description: "Consider prevention, detection and recovery separately when choosing controls."
    },
    {
      number: "007",
      title: "REVIEW THE SIGNAL.",
      description: "Measure a detection against representative events and document likely false positives."
    },
    {
      number: "008",
      title: "RECORD THE HANDOFF.",
      description: "List affected releases, mitigation options and how the next engineer can check the result."
    }
  ];

  return (
    <section id="rules" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 10 / 12 ]</span>
          <span>OPERATING RULES &bull; DEFENSIVE PRINCIPLES</span>
        </div>
        <span>REVIEW CHECKLIST</span>
      </div>

      {/* Main Headline */}
      <div className="px-6 md:px-12 py-12 md:py-16 border-b border-white/10">
        <div className="font-mono text-xs text-[#909090] uppercase tracking-widest mb-3">
          // PRINCIPLES
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tightest leading-[0.95] text-white uppercase max-w-4xl">
          Operating rules.
        </h2>
        <p className="font-mono text-xs text-lime mt-3 uppercase tracking-wider">
          WHAT I CHECK BEFORE HANDING WORK TO ANOTHER ENGINEER
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 w-full">
        {rules.map((rule, idx) => (
          <motion.div
            key={rule.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
            className={`rule-card relative isolate overflow-hidden p-6 md:p-10 flex flex-col justify-between hover:bg-[#070707] transition-colors ${
              idx >= 2 ? 'border-t border-white/10' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-lime font-bold">
                  [{rule.number}]
                </span>
                <span className="font-mono text-[10px] text-[#909090] uppercase tracking-widest">
                  RULE {rule.number}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white uppercase mb-3 leading-snug">
                {rule.title}
              </h3>

              <p className="text-sm md:text-base text-[#8E8D8A] font-light leading-relaxed">
                {rule.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
