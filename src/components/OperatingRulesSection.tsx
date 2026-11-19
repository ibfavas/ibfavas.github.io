import React from 'react';
import { motion } from 'framer-motion';

export const OperatingRulesSection: React.FC = () => {
  const rules = [
    {
      number: "001",
      title: "VERIFY AT THE BYTE LEVEL.",
      description: "Hypotheses mean nothing until confirmed against the raw bytes, memory layout, or packet capture. If you cannot point to the precise instruction or boundary where validation fails, the investigation is incomplete."
    },
    {
      number: "002",
      title: "ZERO UNNECESSARY DEPENDENCIES.",
      description: "Every third-party dependency is a supply-chain liability. Defensive tooling should run on the standard library whenever possible: zero unneeded runtime packages, hyper-lean execution, deterministic deployment."
    },
    {
      number: "003",
      title: "UPSTREAM FIRST.",
      description: "Reporting a vulnerability is only half of research. If an open-source library has an architectural flaw, the gold standard is contributing an upstream, production-grade pull request with regression tests."
    },
    {
      number: "004",
      title: "EVIDENCE OVER CLAIMS.",
      description: "Advisories and audit reports must provide deterministic reproducer scripts. A claim without an empirical reproducer is merely an opinion."
    },
    {
      number: "005",
      title: "TEST UNDER ADVERSARIAL PRESSURE.",
      description: "Defenses that only pass polite unit tests fail in the wild. Stress every parser with quadratic inputs, nested structures, malformed headers, and race conditions."
    },
    {
      number: "006",
      title: "DEFENSE IN DEPTH IS NOT JUST A SLOGAN.",
      description: "Layered security is an architectural contract: CIS-benchmarked kernel hardening at the base, auditd kernel hooks in the middle, and automated IOC scoring at the perimeter."
    },
    {
      number: "007",
      title: "DETERMINISTIC OVER HEURISTIC.",
      description: "Heuristics produce alert fatigue and false positives. Deterministic AST parsing, strict schema validation, and structured CDB tables provide actionable high-fidelity telemetry."
    },
    {
      number: "008",
      title: "NO SHORTCUTS IN SOURCE CODE AUDITING.",
      description: "Automated scanners miss architectural logic bypasses. Manual line-by-line review of data flows, deserialization endpoints, and trust boundaries remains irreplaceable."
    }
  ];

  return (
    <section id="rules" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 10 / 12 ]</span>
          <span>OPERATING RULES &bull; DEFENSIVE PRINCIPLES</span>
        </div>
        <span>STANDARD: NON-NEGOTIABLE ENGINEERING DISCIPLINE</span>
      </div>

      {/* Main Headline */}
      <div className="px-6 md:px-12 py-12 md:py-16 border-b border-white/10">
        <div className="font-mono text-xs text-[#757575] uppercase tracking-widest mb-3">
          // PRINCIPLES
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tightest leading-[0.95] text-white uppercase max-w-4xl">
          Operating rules.
        </h2>
        <p className="font-mono text-xs text-lime mt-3 uppercase tracking-wider">
          (THE NON-NEGOTIABLE ENGINEERING STANDARDS THAT GOVERN EVERY AUDIT AND DEFENSIVE SYSTEM)
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 w-full">
        {rules.map((rule, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
            className={`p-6 md:p-10 flex flex-col justify-between hover:bg-[#070707] transition-colors ${
              idx >= 2 ? 'border-t border-white/10' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-lime font-bold">
                  [{rule.number}]
                </span>
                <span className="font-mono text-[10px] text-[#575757] uppercase tracking-widest">
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
