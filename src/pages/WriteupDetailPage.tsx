import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWriteupBySlug } from '../lib/supabase';
import { Writeup } from '../types/portfolio';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { initialWriteups } from '../data/portfolioData';
import { ArrowLeft, Clock, Calendar, Tag, Shield } from 'lucide-react';

export const WriteupDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [writeup, setWriteup] = useState<Writeup | undefined>(
    initialWriteups.find(w => w.slug === slug)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      getWriteupBySlug(slug).then((data) => {
        if (data) setWriteup(data);
      });
    }
  }, [slug]);

  if (!writeup) {
    return (
      <main className="py-32 text-center">
        <div className="max-w-md mx-auto font-mono space-y-4">
          <div className="text-lime text-2xl font-bold">// 404 NOT FOUND</div>
          <p className="text-ink-muted text-sm">The requested technical writeup could not be located.</p>
          <Link to="/writeups" className="inline-block text-white underline text-xs pt-4">
            &larr; Return to all writeups
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-[1040px] mx-auto px-6 md:px-10">
        {/* Back Link */}
        <div className="mb-10">
          <Link 
            to="/writeups" 
            className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-lime uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={14} />
            <span>All Writeups</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-white/10 pb-12 mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-ink-faint uppercase">
            <span className="flex items-center gap-1.5 text-lime bg-lime/10 px-2.5 py-1 rounded border border-lime/20 font-bold">
              <Shield size={12} />
              DISCLOSURE
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {writeup.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {writeup.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
            {writeup.title}
          </h1>

          {writeup.summary && (
            <p className="text-lg md:text-xl text-ink-muted leading-relaxed font-normal">
              {writeup.summary}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {writeup.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase bg-[#111111] border border-white/10 text-ink-muted px-2.5 py-1 rounded"
              >
                <Tag size={10} className="text-lime" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Cover Image if present */}
        {writeup.coverImage && (
          <div className="mb-12 rounded-lg overflow-hidden border border-white/10 bg-black/40">
            <img 
              src={writeup.coverImage} 
              alt={writeup.title} 
              className="w-full h-auto max-h-[500px] object-cover mx-auto"
            />
          </div>
        )}

        {/* Markdown Content Body */}
        <div className="pt-4">
          <MarkdownRenderer content={writeup.body} />
        </div>

        {/* Article Footer */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center font-mono text-xs text-ink-muted">
          <div>
            <span>Published by </span>
            <strong className="text-white">Mohammad Favas S</strong>
          </div>
          <Link to="/writeups" className="text-lime hover:underline font-bold">
            &larr; More Technical Writeups
          </Link>
        </div>
      </div>
    </article>
  );
};
