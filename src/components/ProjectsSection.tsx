import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialProjects } from '../data/portfolioData';
import { ProjectImage } from './ProjectImage';

export const ProjectsSection: React.FC = () => {
  const projectWriteupMap: Record<string, string> = {
    'proj-1': 'threat-intel-pipeline',
    'proj-2': 'linux-hardening',
    'proj-3': 'peelr',
    'proj-4': 'siteguard',
    'proj-5': 'netpulse'
  };

  return (
    <section id="systems" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 09 / 12 ]</span>
          <span className="text-[#A0A0A0]">ENGINEERING // PROJECTS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>6 FEATURED PROJECTS</span>
          <span className="text-lime">LABS & TOOLS</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
              // ENGINEERING PROJECTS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Defensive systems &amp; labs.<br />
              <span className="text-[#8E8D8A]">Tools, telemetry and field notes.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Explore the implementation, recorded lab results and tradeoffs behind each project.
            <Link to="/projects" className="block w-fit py-3 text-lime hover:underline">Browse projects by discipline &rarr;</Link>
          </p>
        </div>
      </div>

      {/* Varied 2-Column Alternating Grid (NO STICKY PATTERN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b border-white/10">
        {initialProjects.map((project, idx) => {
          const writeupSlug = projectWriteupMap[project.id];

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 md:p-12 hover:bg-[#050505] transition-colors flex flex-col justify-between group border-b border-white/10"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-6 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lime font-bold">[{String(idx + 1).padStart(2, '0')}]</span>
                    <span className="text-[#8E8D8A] uppercase font-medium">{project.category}</span>
                  </div>
                  <span className="text-[11px] text-[#909090] uppercase tracking-wider">
                    {project.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-white uppercase mb-4 group-hover:text-lime transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-[#A8A8A8] font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Visual Preview (if available) */}
                {project.image && (
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    aspectRatio="aspect-[16/9]"
                    className="mb-6 rounded-sm"
                  />
                )}
              </div>

              {/* Action Buttons & Tech Tags */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] text-[#909090] bg-[#0A0A0A] border border-white/5 px-2 py-0.5 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-white uppercase hover:bg-white/5 transition-colors"
                    >
                      <Github size={13} />
                      <span>{project.id === 'proj-6' ? 'OPEN CHANNEL' : 'SOURCE CODE'}</span>
                    </a>
                  )}

                  {writeupSlug && (
                    <Link
                      to={`/writeups/${writeupSlug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-lime hover:text-black text-white uppercase font-medium transition-colors"
                    >
                      <FileText size={13} />
                      <span>TECHNICAL DOSSIER</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};