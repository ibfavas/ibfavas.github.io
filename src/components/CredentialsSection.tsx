import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';
import { initialCertifications, initialTimeline } from '../data/portfolioData';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 08 / 09 ]</span>
          <span className="text-[#A0A0A0]">ACCREDITATION // TRAJECTORY</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-lime">VERIFIED CITATIONS</span>
          <span>&bull;</span>
          <span>TRYHACKME TOP 1%</span>
        </div>
      </div>

      {/* Editorial Section Intro Header */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
              // VERIFIED ACCREDITATION
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Credentials &amp;<br />
              <span className="text-[#8E8D8A]">engineering trajectory.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Verifiable industry credentials, global adversarial rankings, and formal engineering foundations. Zero unbacked claims or decorative titles.
          </p>
        </div>
      </div>

      {/* Part A: 4-Column Verified Credentials Matrix (VARIED FULL-WIDTH GRID) */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono text-xs text-lime uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} />
              <span>// 01. FORMAL INDUSTRY ACCREDITATIONS</span>
            </h3>
            <span className="font-mono text-[10px] text-[#555] uppercase">
              ISSUER VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialCertifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 bg-[#060606] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  {cert.image && (
                    <div className="w-14 h-14 mb-6 bg-white/[0.03] border border-white/10 p-2 flex items-center justify-center overflow-hidden rounded-none">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  )}

                  <span className="font-mono text-[10px] text-lime uppercase tracking-wider block mb-1 font-semibold">
                    {cert.issuer}
                  </span>

                  <h4 className="text-lg font-normal text-white uppercase tracking-tight mb-3 group-hover:text-lime transition-colors">
                    {cert.title}
                  </h4>

                  <span className="font-mono text-xs text-[#777] block mb-4">
                    {cert.date}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-[#555] flex items-center justify-between">
                  <span>CREDENTIAL ID</span>
                  <span className="text-[#888]">{cert.credentialId || 'VERIFIED'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Part B: Engineering Trajectory & Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-mono text-xs text-lime uppercase tracking-widest flex items-center gap-2">
            <GraduationCap size={14} />
            <span>// 02. TIMELINE &amp; OPERATIONAL MILESTONES</span>
          </h3>
          <span className="font-mono text-[10px] text-[#555] uppercase">
            CHRONOLOGICAL RECORD
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialTimeline.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-[#060606] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-mono text-xs">
                  <span className="text-lime font-bold">[{item.period}]</span>
                  <span className="text-[#666] uppercase text-[10px]">{item.category}</span>
                </div>

                <h4 className="text-xl font-normal text-white uppercase tracking-tight mb-1">
                  {item.title}
                </h4>

                <div className="font-mono text-xs text-[#808080] uppercase tracking-wider mb-4">
                  {item.role}
                </div>

                <p className="text-xs md:text-sm text-[#A0A0A0] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-lime font-mono text-[10px]">
                <CheckCircle2 size={12} />
                <span>RECORD VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};