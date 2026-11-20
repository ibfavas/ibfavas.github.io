import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { initialProjects } from '../data/portfolioData';
import { ArrowUpRight, Github, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectImage } from '../components/ProjectImage';

export const ProjectsPage: React.FC = () => {
  const [projects] = useState<Project[]>(initialProjects);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = category === 'all' 
    ? projects 
    : projects.filter((p) => p.category === category);

  const projectWriteupMap: Record<string, string> = {
    'proj-1': 'threat-intel-pipeline',
    'proj-2': 'linux-hardening',
    'proj-3': 'peelr',
    'proj-4': 'siteguard',
    'proj-5': 'netpulse'
  };

  return (
    <main className="w-full bg-[#000000] text-[#F4F1EE] min-h-screen">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ SYSTEMS ]</span>
          <span>DEFENSIVE LABS &bull; {projects.length} PROJECTS</span>
        </div>
        <Link to="/" className="text-white hover:text-lime transition-colors inline-flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>BACK TO DISPATCH</span>
        </Link>
      </div>

      {/* Hero Headline Block */}
      <div className="px-6 md:px-12 py-12 md:py-20 border-b border-white/10">
        <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">
          // PROJECT SOURCE &amp; LABS
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-normal tracking-tightest leading-[0.92] text-white uppercase mb-8">
          Defensive<br />
          systems.
        </h1>
        <p className="text-lg md:text-xl text-[#8E8D8A] font-light max-w-3xl leading-relaxed mb-10">
          Automated threat intelligence pipelines, CIS-benchmarked Linux hardening suites, and tools for JavaScript review and network diagnostics.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat} aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 uppercase text-[11px] transition-colors ${
                category === cat
                  ? 'bg-lime text-black font-bold'
                  : 'bg-[#080808] border border-white/10 text-[#8E8D8A] hover:text-white'
              }`}
            >
              {cat === 'all' ? `All (${projects.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Projects Grid */}
      <div className="divide-y divide-white/10">
        {filtered.map((proj, idx) => {
          const writeupSlug = projectWriteupMap[proj.id];

          return (
            <motion.article 
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 md:p-12 hover:bg-[#060606] transition-colors group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2 font-mono text-xs text-[#909090]">
                  <span className="text-lime font-bold block text-base md:text-lg mb-1">
                    [{String(idx + 1).padStart(2, '0')}]
                  </span>
                  <span className="uppercase">{proj.category}</span>
                </div>

                <div className="lg:col-span-6">
                  <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-white uppercase mb-3 group-hover:text-lime transition-colors leading-snug">
                    {proj.title}
                  </h2>
                  <div className="font-mono text-xs text-[#8E8D8A] uppercase mb-4 tracking-wider">
                    {proj.subtitle}
                  </div>

                  <p className="text-sm md:text-base text-[#A0A0A0] font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px]">
                    {proj.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="bg-[#111] border border-white/5 text-[#888] px-2.5 py-1 uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                    {writeupSlug && (
                      <Link
                        to={`/writeups/${writeupSlug}`}
                        className="inline-flex items-center gap-2 bg-white hover:bg-lime text-black px-4 py-2 font-semibold uppercase tracking-wider text-[11px] transition-colors"
                      >
                        <FileText size={13} />
                        <span>READ WRITEUP</span>
                      </Link>
                    )}

                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-4 py-2 uppercase tracking-wider text-[11px] hover:bg-white/5 transition-all"
                      >
                        <Github size={13} />
                        <span>{proj.id === 'proj-6' ? 'OPEN CHANNEL' : 'SOURCE CODE'}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {proj.image && (
                  <div className="lg:col-span-4">
                    <ProjectImage
                      src={proj.image}
                      alt={proj.title}
                      aspectRatio="aspect-[16/9]"
                    />
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </main>
  );
};
