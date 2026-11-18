import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWriteups } from '../lib/supabase';
import { Writeup } from '../types/portfolio';
import { initialWriteups } from '../data/portfolioData';
import { Search, Clock, ArrowRight, Shield } from 'lucide-react';

export const WriteupsPage: React.FC = () => {
  const [writeups, setWriteups] = useState<Writeup[]>(initialWriteups);
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    getWriteups().then(setWriteups);
    window.scrollTo(0, 0);
  }, []);

  // Collect all unique tags
  const allTags = Array.from(new Set(writeups.flatMap((w) => w.tags)));

  // Filter
  const filtered = writeups.filter((w) => {
    const matchesQuery = 
      w.title.toLowerCase().includes(query.toLowerCase()) || 
      w.summary.toLowerCase().includes(query.toLowerCase()) ||
      w.body.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTag ? w.tags.includes(selectedTag) : true;
    return matchesQuery && matchesTag;
  });

  return (
    <main className="py-16 md:py-24">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="font-mono text-xs text-lime uppercase tracking-wider mb-4 flex items-center gap-2">
            <Shield size={14} />
            <span>RESEARCH DOSSIER · ALL 7 DISCLOSURES</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase leading-[0.95] mb-6">
            TECHNICAL <span className="text-lime">WRITEUPS.</span>
          </h1>

          <p className="text-lg text-ink-muted max-w-2xl font-normal leading-relaxed">
            Detailed vulnerability investigations, upstream open-source patches, Linux hardening methodology, and defensive tooling blueprints.
          </p>

          {/* Search & Tag Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-3.5 text-ink-faint" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search writeups or keywords..."
                className="w-full bg-[#0C0C0C] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder:text-ink-faint focus:outline-none focus:border-lime transition-colors"
              />
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedTag(null)}
                className={`font-mono text-[11px] px-3 py-1.5 rounded uppercase tracking-wider transition-colors ${selectedTag === null ? 'bg-lime text-black font-bold' : 'bg-[#111111] text-ink-muted border border-white/10 hover:text-white'}`}
              >
                All ({writeups.length})
              </button>
              {allTags.map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`font-mono text-[11px] px-3 py-1.5 rounded uppercase tracking-wider transition-colors ${selectedTag === tag ? 'bg-lime text-black font-bold' : 'bg-[#111111] text-ink-muted border border-white/10 hover:text-white'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Writeups List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item, idx) => (
            <article 
              key={item.id}
              className="bg-[#0A0A0A] hover:bg-[#0E0E0E] border border-white/10 hover:border-white/30 rounded-lg p-8 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex justify-between items-center font-mono text-[11px] text-ink-faint mb-4">
                  <span>[ 0{idx + 1} // {item.date} ]</span>
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Clock size={12} />
                    {item.readingTime} min read
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-lime transition-colors">
                  <Link to={`/writeups/${item.slug}`}>
                    {item.title}
                  </Link>
                </h2>

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
                    <span>Read Investigation</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 font-mono text-ink-muted">
            No technical writeups match the selected query.
          </div>
        )}
      </div>
    </main>
  );
};
