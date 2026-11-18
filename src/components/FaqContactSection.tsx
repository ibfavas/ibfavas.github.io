import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, Mail, Github, Send, Linkedin } from 'lucide-react';
import { initialProfile } from '../data/portfolioData';

export const FaqContactSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      number: "001",
      question: "What is your primary technical focus?",
      answer: "Application security assessments, source code reviews, and SOC detection engineering. I specialize in identifying structural logic flaws in code and translating threat intelligence into automated SIEM detections."
    },
    {
      number: "002",
      question: "How do you audit source code for vulnerabilities?",
      answer: "Manual line-by-line review supplemented by custom AST extractors. I trace untrusted input sources through trust boundaries to sink functions, with special attention to access control enforcement, state-machine transitions, and resource consumption boundaries."
    },
    {
      number: "003",
      question: "What is your experience with SIEM and telemetry?",
      answer: "Architectural deployment of Wazuh SIEM, CIS Benchmark v3.0 compliance auditing, Linux auditd kernel logging with 22,000+ rules, and building custom Python automation pipelines syncing 55,000+ indicators per run into active CDB lookup tables."
    },
    {
      number: "004",
      question: "Are you available for full-time roles or consulting?",
      answer: "Yes. I am available for full-time roles as an Application Security Engineer, SOC Analyst, or Security Researcher, as well as freelance penetration testing and source-code auditing engagements."
    }
  ];

  return (
    <section id="contact" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 08 / 08 ]</span>
          <span>FAQ &bull; DIRECT DISPATCH</span>
        </div>
        <span>LOCATION: KOLLAM, KERALA &bull; REMOTE &bull; ON-SITE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-white/10">
        {/* Left Headline Column */}
        <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 lg:sticky lg:top-14 self-start">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
            // FREQUENTLY ADDRESSED
          </span>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tightest leading-[0.95] text-white uppercase mb-6">
            You've got questions.<br />
            We've got answers.
          </h2>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed mb-6">
            Direct answers on technical approach, code audits, infrastructure baselines, and availability.
          </p>
        </div>

        {/* Right Accordion Column */}
        <div className="lg:col-span-7 divide-y divide-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="p-6 md:p-8 hover:bg-[#060606] transition-colors">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-start justify-between text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-lime font-bold mt-1">
                      {faq.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white uppercase group-hover:text-lime transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-1.5 border border-white/10 text-white group-hover:border-lime group-hover:text-lime transition-colors ml-4 shrink-0">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 pl-10 text-sm md:text-base text-[#A0A0A0] font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Massive WithHoney Closing CTA Block */}
      <div className="px-6 md:px-12 py-16 md:py-24 bg-[#050505] text-center flex flex-col items-center justify-center">
        <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-4">
          // INITIATE ENGAGEMENT
        </span>
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tightest leading-none text-white uppercase mb-8">
          Where do we connect?
        </h2>

        <a
          href={`mailto:${initialProfile.contact.email}`}
          className="inline-flex items-center gap-3 bg-white hover:bg-lime text-black font-mono text-sm md:text-lg uppercase tracking-wider px-8 py-5 font-bold transition-all hover:scale-105 mb-10"
        >
          <Mail size={20} />
          <span>[ {initialProfile.contact.email} ]</span>
          <ArrowUpRight size={20} />
        </a>

        {/* Channels Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#8E8D8A] uppercase">
          <a
            href={initialProfile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Github size={14} />
            <span>GITHUB: /IBFAVAS</span>
          </a>
          <span className="text-[#333]">&bull;</span>
          <a
            href={initialProfile.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Send size={14} />
            <span>TELEGRAM: @BREACHBRIEF</span>
          </a>
          <span className="text-[#333]">&bull;</span>
          <a
            href={initialProfile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Linkedin size={14} />
            <span>LINKEDIN: /IN/IBFAVAS</span>
          </a>
        </div>
      </div>
    </section>
  );
};
