import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { initialWriteups } from '../data/portfolioData';
import { ArrowLeft, ShieldCheck, Share2, Check } from 'lucide-react';
import { DecryptText } from '../components/DecryptText';

export const WriteupDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const writeup = initialWriteups.find(item => item.slug === slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCopied(false);
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!writeup) {
    return (
      <main className="w-full bg-[#000000] text-[#F4F1EE] min-h-screen py-32 text-center">
        <div className="max-w-md mx-auto font-mono space-y-4 px-6">
          <div className="text-lime text-2xl font-bold">// 404 DOSSIER NOT FOUND</div>
          <p className="text-[#8E8D8A] text-sm">The requested technical investigation could not be retrieved from the archive.</p>
          <Link to="/writeups" className="inline-block text-white underline text-xs pt-4 hover:text-lime">
            &larr; Return to all writeups
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="w-full bg-[#000000] text-[#F4F1EE] min-h-screen">
      {/* Top Chapter Coordinate Header */}
      <div className="w-full border-b border-white/10 px-4 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider bg-black/60 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ DOSSIER DECLASSIFIED ]</span>
          <span className="hidden sm:inline text-[#A0A0A0]">
            <DecryptText text={writeup.slug.toUpperCase()} />
          </span>
        </div>
        <Link 
          to="/writeups" 
          className="inline-flex items-center gap-1.5 text-white hover:text-lime transition-colors"
        >
          <ArrowLeft size={13} />
          <span>ALL WRITEUPS</span>
        </Link>
      </div>

      {/* Main Two-Column Architectural Layout (No huge margins!) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left Sticky Dossier Sidebar */}
        <aside className="lg:col-span-4 p-6 md:p-10 lg:sticky lg:top-12 self-start space-y-8 bg-[#030303]">
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-lime font-bold uppercase tracking-wider">
                {writeup.tags.includes('CVE') ? 'VULNERABILITY DISCLOSURE' : 'ENGINEERING FIELD NOTES'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white uppercase mb-6 leading-tight">
              {writeup.title}
            </h1>

            {writeup.summary && (
              <p className="text-sm md:text-base text-[#A8A8A8] font-light leading-relaxed mb-6">
                {writeup.summary}
              </p>
            )}
          </div>

          {/* Dossier Metadata Card */}
          <div className="p-4 bg-[#080808] border border-white/10 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-[#909090] pb-2 border-b border-white/5">
              <span>AUTHOR</span>
              <span className="text-white font-semibold">MOHAMMAD FAVAS S</span>
            </div>
            <div className="flex items-center justify-between text-[#909090] pb-2 border-b border-white/5">
              <span>DATE PUBLISHED</span>
              <span className="text-white">{writeup.date}</span>
            </div>
            <div className="flex items-center justify-between text-[#909090] pb-2 border-b border-white/5">
              <span>READING CADENCE</span>
              <span className="text-lime font-bold">{writeup.readingTime || 8} MIN</span>
            </div>
            <div className="flex items-center justify-between text-[#909090]">
              <span>STATUS</span>
              <span className="text-white">PUBLIC COORDINATED DISCLOSURE</span>
            </div>
          </div>

          {/* Tag Cloud */}
          <div>
            <div className="font-mono text-[10px] text-[#909090] uppercase tracking-wider mb-2.5">
              INDEXED TAXONOMY:
            </div>
            <div className="flex flex-wrap gap-2">
              {writeup.tags.map((tag) => (
                <span 
                  key={tag}
                  className="font-mono text-[10px] uppercase bg-black border border-white/10 text-[#A0A0A0] px-2.5 py-1 hover:border-lime/40 hover:text-white transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10 font-mono text-xs">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white transition-all w-full justify-center"
            >
              {copied ? <Check size={14} className="text-lime" /> : <Share2 size={14} />}
              <span>{copied ? 'DOSSIER URL COPIED' : 'COPY DOSSIER LINK'}</span>
            </button>
          </div>
        </aside>

        {/* Right Fluid Markdown Reader Area */}
        <main className="min-w-0 lg:col-span-8 p-6 md:p-12 lg:p-16 overflow-x-hidden bg-[#000000]">
          <div className="max-w-4xl">
            <MarkdownRenderer content={writeup.body} />
          </div>

          {/* Bottom End-of-Report Navigation */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#909090]">
              <ShieldCheck size={14} className="text-lime" />
              <span>END OF DOSSIER</span>
            </div>
            <Link
              to="/writeups"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold uppercase hover:bg-lime transition-colors"
            >
              <span>RETURN TO WRITEUPS INDEX</span>
            </Link>
          </div>
        </main>
      </div>
    </article>
  );
};