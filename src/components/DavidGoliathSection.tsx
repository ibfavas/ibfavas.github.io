import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DecryptText } from './DecryptText';

export const DavidGoliathSection: React.FC = () => {
  return (
    <section id="david-goliath" className="relative w-full bg-[#000000] border-b border-white/10 overflow-hidden">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 04 / 12 ]</span>
          <span className="text-[#A0A0A0]">EDITORIAL // PERSPECTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>ETHICAL ADVERSARY</span>
          <span>&bull;</span>
          <span className="text-lime">DEFENSIVE ARCHITECT</span>
        </div>
      </div>

      {/* Main Two-Column Architectural Feature */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95] mb-8">
              Adversary meet Defender.<br />
              <span className="text-[#8E8D8A]">Defender meet Adversary.</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-[#C5C5C5] font-light leading-relaxed mb-10">
              <p>
                NLTK’s downloader made me wonder what should happen to a model already on disk when I install a second package alongside it.
              </p>
              <p className="text-white font-normal">
                I think about the person who calls the downloader once and trusts that model for months. That ordinary expectation is what made the ownership bug worth pursuing.
              </p>
            </div>

            <div>
              <a
                href="#cve-research"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 hover:border-white hover:bg-white hover:text-black font-mono text-xs uppercase tracking-wider text-white transition-all duration-300 group"
              >
                <span>EXPLORE TECHNICAL DOSSIERS</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Cyber Architect Avatar Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Concentric Hairline Frame */}
              <div className="p-3 md:p-4 rounded-3xl border border-white/15 bg-white/[0.02] backdrop-blur-sm shadow-2xl">
                {/* Inner Concentric Hairline Frame */}
                <div className="p-2 rounded-2xl border border-white/10 bg-black/50 overflow-hidden">
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden group">
                    <img
                      src="/assets/ui/fictional-cyber-character.webp"
                      alt="Cybersecurity Operative - Fictional 2D Character"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />

                    {/* Ambient subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Metadata Label */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#A0A0A0] uppercase tracking-wider bg-black/80 backdrop-blur-md px-3.5 py-2.5 border border-white/15">
                      <DecryptText text="CYBERNETIC OPERATIVE" className="text-white font-semibold" />
                      <span className="text-lime font-bold">RESEARCH MATRIX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};