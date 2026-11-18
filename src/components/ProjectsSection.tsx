import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialProjects } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  // Mapping project IDs to corresponding writeup slugs
  const projectWriteupMap: Record<string, string> = {
    'proj-1': 'threat-intel-pipeline',
    'proj-2': 'linux-hardening',
    'proj-3': 'peelr',
    'proj-4': 'siteguard',
    'proj-5': 'netpulse'
  };

  return (
    <section id="systems" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 05 / 08 ]</span>
          <span>DEFENSIVE SYSTEMS &bull; PRODUCTION LABS</span>
        </div>
        <span>ARCHITECTURES: SIEM &bull; CTI &bull; HARDENING &bull; RECON</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Sticky Column */}
        <div className="lg:col-span-4 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 lg:sticky lg:top-14 self-start">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
            // VERIFIED ARCHITECTURES
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tightest leading-[0.95] text-white uppercase mb-6">
            Defensive systems &amp; labs.
          </h2>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed mb-8">
            Every system in this index is backed by verifiable code and functional deployments. From automated multi-feed CTI ingestors to kernel-level auditd telemetry and pure standard library utilities.
          </p>

          <div className="p-4 bg-[#080808] border border-white/10 font-mono text-xs text-[#8E8D8A] space-y-2">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 size={14} className="text-lime" />
              <span>Zero-dependency tooling where possible</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 size={14} className="text-lime" />
              <span>Full documentation &amp; writeup for each lab</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 size={14} className="text-lime" />
              <span>Open-source and reproducible</span>
            </div>
          </div>
        </div>

        {/* Right Projects Column */}
        <div className="lg:col-span-8 divide-y divide-white/10">
          {initialProjects.map((project, idx) => {
            const writeupSlug = projectWriteupMap[project.id];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 md:p-10 hover:bg-[#060606] transition-colors group"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-lime font-bold">[{String(idx + 1).padStart(2, '0')}]</span>
                    <span className="text-[#8E8D8A] uppercase">{project.category}</span>
                  </div>
                  <span className="text-[11px] text-[#575757] uppercase tracking-widest">
                    {project.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-white uppercase mb-4 group-hover:text-lime transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-[#8E8D8A] font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Screenshot Preview (if available) */}
                {project.image && (
                  <div className="w-full aspect-[16/9] max-h-72 bg-[#090909] border border-white/10 mb-6 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px]">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[#999] bg-[#111] border border-white/5 px-2.5 py-1 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                  {writeupSlug && (
                    <Link
                      to={`/writeups/${writeupSlug}`}
                      className="inline-flex items-center gap-2 bg-white hover:bg-lime text-black px-4 py-2 font-semibold uppercase tracking-wider text-[11px] transition-colors"
                    >
                      <FileText size={13} />
                      <span>READ FULL WRITEUP</span>
                    </Link>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white hover:text-white px-4 py-2 uppercase tracking-wider text-[11px] hover:bg-white/5 transition-all"
                    >
                      <Github size={13} />
                      <span>SOURCE REPO</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
