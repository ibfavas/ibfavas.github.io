import React from 'react';
import { Link } from 'react-router-dom';
import { Writeup } from '../types/portfolio';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

interface Props {
  writeups: Writeup[];
  limit?: number;
}

export const WriteupsSection: React.FC<Props> = ({ writeups, limit = 4 }) => {
  const displayed = limit ? writeups.slice(0, limit) : writeups;

  return (
    <section id="writeups" className="py-20 md:py-28 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline border-b border-white/10 pb-4 mb-12 font-mono text-xs uppercase tracking-wider text-ink-muted">
          <span>[ SECTION 03 / 05 ]</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight my-2">
            RESEARCH &amp; WRITEUPS
          </h2>
          <Link to="/writeups" className="text-lime hover:underline font-bold">
            VIEW ALL 7 ARTICLES &rarr;
          </Link>
        </div>

        {/* Writeup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayed.map((item, idx) => (
            <article 
              key={item.id}
              className="bg-[#0A0A0A] hover:bg-[#0E0E0E] border border-white/10 hover:border-white/30 rounded-lg p-8 flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                <div className="flex justify-between items-center font-mono text-[11px] text-ink-faint mb-4">
                  <span>[ 0{idx + 1} // {item.date} ]</span>
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Clock size={12} />
                    {item.readingTime} min read
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-lime transition-colors">
                  <Link to={`/writeups/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>

                <p className="text-ink-muted text-sm leading-relaxed mb-6 font-normal line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-[10px] uppercase bg-[#141414] border border-white/5 text-ink-faint px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link 
                    to={`/writeups/${item.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs text-lime font-bold hover:underline"
                  >
                    <span>Read Full Writeup</span>
                    <ArrowRight size={14} />
                  </Link>
                  <BookOpen size={16} className="text-ink-faint" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
