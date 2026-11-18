import React from 'react';
import { SkillGroup } from '../types/portfolio';

interface Props {
  skills: SkillGroup[];
}

export const SkillsSection: React.FC<Props> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline border-b border-white/10 pb-4 mb-12 font-mono text-xs uppercase tracking-wider text-ink-muted">
          <span>[ CAPABILITIES ]</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight my-2">
            TECHNICAL ARSENAL
          </h2>
          <span className="text-lime">STANDARDS &amp; TOOLS</span>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, idx) => (
            <div 
              key={group.id} 
              className="bg-[#0A0A0A] border border-white/10 rounded-lg p-6 space-y-4 hover:border-white/20 transition-colors"
            >
              <div className="font-mono text-xs text-lime font-bold uppercase tracking-wider flex items-center gap-2">
                <span>// 0{idx + 1}</span>
                <span>{group.title}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span 
                    key={item} 
                    className="font-mono text-xs bg-[#111111] hover:bg-[#161616] border border-white/10 text-ink-muted hover:text-white px-3 py-1.5 rounded transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
