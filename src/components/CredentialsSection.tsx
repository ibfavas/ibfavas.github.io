import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { initialCertifications, initialTimeline } from '../data/portfolioData';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 07 / 08 ]</span>
          <span>VERIFIED CREDENTIALS &bull; TRAJECTORY</span>
        </div>
        <span>BADGES: EC-COUNCIL &bull; TRYHACKME &bull; REDTEAM &bull; ISC2</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Sticky Column */}
        <div className="lg:col-span-4 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 lg:sticky lg:top-14 self-start">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
            // ACCREDITATION &amp; PATH
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tightest leading-[0.95] text-white uppercase mb-6">
            Credentials &amp;<br />
            trajectory.
          </h2>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed mb-8">
            Verifiable industry credentials, global adversarial rankings, and formal engineering background. No self-assigned labels or unbacked claims.
          </p>

          <div className="p-4 bg-[#080808] border border-white/10 font-mono text-xs text-[#8E8D8A] space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Award size={14} className="text-lime" />
              <span>Certified SOC Analyst (CSA)</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 size={14} className="text-lime" />
              <span>Top 1% Global on TryHackMe</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award size={14} className="text-lime" />
              <span>B.Tech Computer Science (2025)</span>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-8 divide-y divide-white/10">
          {/* Section A: Certifications */}
          <div className="p-6 md:p-10">
            <h3 className="font-mono text-xs text-lime uppercase tracking-widest mb-6 flex items-center gap-2">
              <span>// 01. VERIFIED CERTIFICATIONS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {initialCertifications.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 bg-[#070707] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {cert.image && (
                      <div className="w-12 h-12 mb-4 bg-white/5 border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                    )}
                    <span className="font-mono text-[10px] text-lime uppercase tracking-wider block mb-1">
                      {cert.issuer}
                    </span>
                    <h4 className="text-base font-normal text-white uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                      {cert.title}
                    </h4>
                  </div>

                  <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-[#757575] flex items-center justify-between">
                    <span>DATE: {cert.date}</span>
                    <span className="text-[#888]">ID: {cert.credentialId}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section B: Career & Education Timeline */}
          <div className="p-6 md:p-10">
            <h3 className="font-mono text-xs text-lime uppercase tracking-widest mb-6 flex items-center gap-2">
              <span>// 02. CAREER &amp; EDUCATION TIMELINE</span>
            </h3>

            <div className="space-y-6">
              {initialTimeline.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-[#070707] border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-lime font-bold tracking-wider">{item.period}</span>
                    <span className="text-[#757575] uppercase">{item.category}</span>
                  </div>

                  <h4 className="text-xl font-normal text-white uppercase tracking-tight mb-1">
                    {item.role}
                  </h4>
                  <div className="font-mono text-xs text-[#8E8D8A] uppercase mb-4">
                    {item.title}
                  </div>

                  <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
