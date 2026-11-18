import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Writeup } from '../types/portfolio';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { initialWriteups } from '../data/portfolioData';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export const WriteupDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [writeup, setWriteup] = useState<Writeup | undefined>(
    initialWriteups.find(w => w.slug === slug)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = initialWriteups.find(w => w.slug === slug);
    if (found) setWriteup(found);
  }, [slug]);

  if (!writeup) {
    return (
      <main className="w-full bg-[#000000] text-[#F4F1EE] min-h-screen py-32 text-center">
        <div className="max-w-md mx-auto font-mono space-y-4">
          <div className="text-lime text-2xl font-bold">// 404 NOT FOUND</div>
          <p className="text-[#8E8D8A] text-sm">The requested technical writeup could not be located.</p>
          <Link to="/writeups" className="inline-block text-white underline text-xs pt-4">
            &larr; Return to all writeups
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="w-full bg-[#000000] text-[#F4F1EE] min-h-screen">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ DISCLOSURE ]</span>
          <span>{writeup.title.slice(0, 45)}...</span>
        </div>
        <Link 
          to="/writeups" 
          className="inline-flex items-center gap-1.5 text-white hover:text-lime transition-colors"
        >
          <ArrowLeft size={13} />
          <span>BACK TO WRITEUPS</span>
        </Link>
      </div>

      {/* Article Header Block */}
      <header className="px-6 md:px-12 py-12 md:py-20 border-b border-white/10 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#757575] uppercase mb-6">
          <span className="text-lime bg-lime/10 border border-lime/20 px-2.5 py-1 font-bold">
            VERIFIED RESEARCH
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {writeup.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {writeup.readingTime} MIN READ
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tightest leading-[0.95] text-white uppercase mb-8">
          {writeup.title}
        </h1>

        {writeup.summary && (
          <p className="text-lg md:text-2xl text-[#8E8D8A] font-light leading-relaxed mb-8 max-w-4xl">
            {writeup.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {writeup.tags.map((tag) => (
            <span 
              key={tag}
              className="font-mono text-[11px] uppercase bg-[#0A0A0A] border border-white/10 text-[#8E8D8A] px-3 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Markdown Body */}
      <div className="px-6 md:px-12 py-12 md:py-16 max-w-5xl mx-auto">
        <MarkdownRenderer content={writeup.body} />
      </div>

      {/* Bottom Dispatch Footer */}
      <div className="border-t border-white/10 px-6 md:px-12 py-12 text-center bg-[#050505]">
        <div className="font-mono text-xs text-[#757575] uppercase mb-4">
          // END OF INVESTIGATION
        </div>
        <Link
          to="/writeups"
          className="inline-flex items-center gap-2 bg-white hover:bg-lime text-black font-mono text-xs uppercase tracking-wider px-6 py-3 font-semibold transition-colors"
        >
          <ArrowLeft size={14} />
          <span>EXPLORE OTHER WRITEUPS</span>
        </Link>
      </div>
    </article>
  );
};
