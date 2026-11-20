import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Writeup } from '../types/portfolio';
import { initialWriteups } from '../data/portfolioData';
import { Search, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DecryptText } from '../components/DecryptText';

export const WriteupsPage: React.FC = () => {
  const [writeups] = useState<Writeup[]>(initialWriteups);
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTags = Array.from(new Set(writeups.flatMap((w) => w.tags)));

  const filtered = writeups.filter((w) => {
    const matchesQuery = 
      w.title.toLowerCase().includes(query.toLowerCase()) || 
      w.summary.toLowerCase().includes(query.toLowerCase()) ||
      w.body.toLowerCase().includes(query.toLowerCase());
    const matchesTag = selectedTag ? w.tags.includes(selectedTag) : true;
    return matchesQuery && matchesTag;
  });

  return (
    <main className="w-full bg-[#000000] text-[#F4F1EE] min-h-screen">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ ARCHIVE ]</span>
          <span>TECHNICAL WRITEUPS &bull; 07 DOSSIERS</span>
        </div>
        <Link to="/" className="text-white hover:text-lime transition-colors">
          &larr; BACK TO DISPATCH
        </Link>
      </div>

      {/* Hero Headline Block */}
      <div className="px-6 md:px-12 py-12 md:py-20 border-b border-white/10">
        <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">
          // <DecryptText text="COMPLETE TECHNICAL DOSSIER" />
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-normal tracking-tightest leading-[0.92] text-white uppercase mb-8">
          Technical<br />
          writeups.
        </h1>
        <p className="text-lg md:text-xl text-[#8E8D8A] font-light max-w-3xl leading-relaxed mb-10">
          In-depth vulnerability analyses, upstream open-source patches, Linux hardening procedures, and defensive telemetry engineering blueprints.
        </p>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-6 border-t border-white/10 font-mono text-xs">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search size={14} className="absolute left-3.5 top-3.5 text-[#909090]" />
            <input 
              aria-label="Filter writeups by keyword or CVE" type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="FILTER BY KEYWORD OR CVE..."
              className="w-full bg-[#080808] border border-white/10 px-10 py-3 text-xs text-white placeholder:text-[#909090] focus:outline-none focus:border-lime transition-colors uppercase tracking-wider"
            />
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 uppercase text-[11px] transition-colors ${
                selectedTag === null ? 'bg-white text-black font-bold' : 'bg-[#080808] border border-white/10 text-[#8E8D8A] hover:text-white'
              }`}
            >
              All (07)
            </button>
            {allTags.map((tag) => (
              <button 
                key={tag} aria-pressed={selectedTag === tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 uppercase text-[11px] transition-colors ${
                  selectedTag === tag ? 'bg-lime text-black font-bold' : 'bg-[#080808] border border-white/10 text-[#8E8D8A] hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Writeup Rows */}
      <div className="w-full divide-y divide-white/10">
        {filtered.map((item, idx) => (
          <motion.article 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="p-6 md:p-12 hover:bg-[#060606] transition-colors group flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Number & Date */}
              <div className="lg:col-span-2 font-mono text-xs text-[#909090]">
                <span className="text-lime font-bold block text-base md:text-lg mb-1">
                  [{String(idx + 1).padStart(2, '0')}]
                </span>
                <span>{item.date}</span>
                <span className="block text-[11px] text-[#909090] mt-1">
                  {item.readingTime} MIN READ
                </span>
              </div>

              {/* Center Column: Title & Summary */}
              <div className="lg:col-span-8">
                <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-white uppercase mb-4 group-hover:text-lime transition-colors leading-snug">
                  <Link to={`/writeups/${item.slug}`}>
                    {item.title}
                  </Link>
                </h2>

                <p className="text-base text-[#8E8D8A] font-light leading-relaxed mb-6 max-w-3xl">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-[10px] uppercase bg-[#111] border border-white/5 text-[#888] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Direct Read Button */}
              <div className="lg:col-span-2 flex lg:justify-end items-center pt-2">
                <Link
                  to={`/writeups/${item.slug}`}
                  className="inline-flex items-center gap-2 border border-white/20 group-hover:border-lime group-hover:bg-lime group-hover:text-black text-white px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all"
                >
                  <span>INSPECT</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}

        {filtered.length === 0 && (
          <div className="p-20 text-center font-mono text-sm text-[#909090]">
            NO TECHNICAL WRITEUPS FOUND MATCHING QUERY.
          </div>
        )}
      </div>
    </main>
  );
};
