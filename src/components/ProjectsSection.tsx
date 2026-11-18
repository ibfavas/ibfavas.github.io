import React from 'react';
import { Project } from '../types/portfolio';
import { ExternalLink } from 'lucide-react';

interface Props {
  projects: Project[];
}

export const ProjectsSection: React.FC<Props> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 md:py-28 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline border-b border-white/10 pb-4 mb-12 font-mono text-xs uppercase tracking-wider text-ink-muted">
          <span>[ SECTION 02 / 05 ]</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight my-2">
            ENGINEERED SYSTEMS
          </h2>
          <span className="text-lime">SOURCE CODE REPOSITORIES</span>
        </div>

        {/* Honey Style Horizontal Work Rows */}
        <div className="divide-y divide-white/10">
          {projects.map((proj, idx) => (
            <div 
              key={proj.id} 
              className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group transition-colors hover:bg-white/[0.015] px-2 rounded-lg"
            >
              {/* Index Column */}
              <div className="lg:col-span-1 font-mono text-sm text-ink-faint">
                [ 0{idx + 1} / 0{projects.length} ]
              </div>

              {/* Details Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs text-lime uppercase tracking-wider">
                  {proj.category} · {proj.subtitle}
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-lime transition-colors">
                  {proj.title}
                </h3>

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
                    <span>Open Repository / Intel</span>
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Image Preview Column */}
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
    </section>
  );
};
