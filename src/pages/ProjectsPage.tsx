import React, { useState, useEffect } from 'react';
import { getProjects } from '../lib/supabase';
import { Project } from '../types/portfolio';
import { initialProjects } from '../data/portfolioData';
import { ExternalLink, Terminal } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    getProjects().then(setProjects);
    window.scrollTo(0, 0);
  }, []);

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = category === 'all' 
    ? projects 
    : projects.filter((p) => p.category === category);

  return (
    <main className="py-16 md:py-24">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="font-mono text-xs text-lime uppercase tracking-wider mb-4 flex items-center gap-2">
            <Terminal size={14} />
            <span>ENGINEERED DEFENSIVE LABS &amp; TOOLING</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase leading-[0.95] mb-6">
            ALL <span className="text-lime">SYSTEMS.</span>
          </h1>

          <p className="text-lg text-ink-muted max-w-2xl font-normal leading-relaxed">
            Automated threat intelligence pipelines, CIS benchmarked Linux hardening stacks, and zero-dependency static analysis tools.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`font-mono text-[11px] px-3.5 py-1.5 rounded uppercase tracking-wider transition-colors ${
                  category === cat
                    ? 'bg-lime text-black font-bold'
                    : 'bg-[#111111] text-ink-muted border border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-white/10">
          {filtered.map((proj, idx) => (
            <div 
              key={proj.id}
              className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group transition-colors hover:bg-white/[0.015] px-2 rounded-lg"
            >
              <div className="lg:col-span-1 font-mono text-sm text-ink-faint">
                [ 0{idx + 1} / 0{filtered.length} ]
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs text-lime uppercase tracking-wider">
                  {proj.category} · {proj.subtitle}
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-lime transition-colors">
                  {proj.title}
                </h2>

                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-normal">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="font-mono text-[10px] uppercase bg-[#111111] border border-white/10 text-ink-muted px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-white hover:text-lime font-bold uppercase py-2 group/link"
                  >
                    <span>Open Repository / Telemetry</span>
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden h-[240px] md:h-[280px] flex items-center justify-center relative">
                  {proj.image ? (
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="font-mono text-xs text-ink-faint uppercase text-center p-6">
                      <div className="text-lime text-lg mb-2">⚡</div>
                      <div>[ {proj.category} ]</div>
                      <div className="mt-1 text-[11px] text-ink-muted">{proj.subtitle}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
