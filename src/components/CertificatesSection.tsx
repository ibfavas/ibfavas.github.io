import React from 'react';
import { Certification } from '../types/portfolio';
import { Award, CheckCircle } from 'lucide-react';

interface Props {
  certifications: Certification[];
}

export const CertificatesSection: React.FC<Props> = ({ certifications }) => {
  return (
    <section id="certificates" className="py-20 md:py-28 border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline border-b border-white/10 pb-4 mb-12 font-mono text-xs uppercase tracking-wider text-ink-muted">
          <span>[ CREDENTIALS &amp; AUDITS ]</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight my-2">
            CERTIFICATIONS
          </h2>
          <span className="text-lime">VERIFIED CREDENTIALS</span>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div 
              key={cert.id}
              className="bg-[#0A0A0A] border border-white/10 hover:border-lime/40 rounded-lg p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="w-16 h-16 bg-[#111111] border border-white/10 rounded p-2 mb-6 flex items-center justify-center overflow-hidden">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <Award className="text-lime" size={28} />
                  )}
                </div>

                <div className="font-mono text-[11px] text-lime font-bold uppercase mb-2">
                  {cert.issuer} · {cert.date}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-lime transition-colors">
                  {cert.title}
                </h3>
              </div>

              <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-ink-faint flex items-center justify-between">
                <span className="truncate">{cert.credentialId}</span>
                <CheckCircle size={14} className="text-lime shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
