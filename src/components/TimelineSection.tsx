import React from 'react';
import { TimelineEntry } from '../types/portfolio';
import { Briefcase, GraduationCap } from 'lucide-react';

interface Props {
  entries: TimelineEntry[];
}

export const TimelineSection: React.FC<Props> = ({ entries }) => {
  return (
    <section id="timeline" className="py-20 md:py-28 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline border-b border-white/10 pb-4 mb-16 font-mono text-xs uppercase tracking-wider text-ink-muted">
          <span>[ SECTION 04 / 05 ]</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight my-2">
            CAREER &amp; TIMELINE
          </h2>
          <span className="text-lime">VERIFIED RECORD</span>
        </div>

        {/* Vertical Timeline with Drawing Line */}
        <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:left-[11px] md:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-lime before:via-white/20 before:to-transparent">
          {entries.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[30px] md:-left-[35px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-lime group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(212,255,0,0.4)]" />

              <div className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 rounded-lg space-y-3 group-hover:border-white/30 transition-all">
                <div className="flex flex-wrap justify-between items-center font-mono text-xs text-lime">
                  <span className="font-bold tracking-wider">{item.period}</span>
                  <span className="text-ink-faint text-[11px] uppercase flex items-center gap-1.5">
                    {item.category === 'experience' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                    {item.role}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
