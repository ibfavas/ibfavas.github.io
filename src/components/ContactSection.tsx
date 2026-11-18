import React from 'react';
import { Profile } from '../types/portfolio';
import { Mail, ArrowUpRight } from 'lucide-react';

interface Props {
  profile: Profile;
}

export const ContactSection: React.FC<Props> = ({ profile }) => {
  const contactLinks = [
    { name: 'Email', handle: profile.contact.email, url: `mailto:${profile.contact.email}` },
    { name: 'GitHub', handle: 'github.com/ibfavas', url: profile.contact.github },
    { name: 'LinkedIn', handle: 'linkedin.com/in/ibfavas', url: profile.contact.linkedin },
    { name: 'Telegram', handle: 't.me/BreachBrief', url: profile.contact.telegram },
    { name: 'X', handle: 'x.com/ibfavas', url: profile.contact.x }
  ];

  return (
    <section id="contact" className="py-24 md:py-36">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="font-mono text-xs text-lime uppercase tracking-wider mb-6">
          // ESTABLISH UPLINK
        </div>

        {/* Giant Honey Callout */}
        <h2 className="text-[52px] sm:text-[76px] lg:text-[108px] font-black uppercase tracking-[-0.04em] leading-[0.92] text-white mb-8 select-none">
          LET'S TALK <span className="text-lime glow-lime">DEFENSE.</span>
        </h2>

        <p className="text-lg md:text-xl text-ink-muted max-w-2xl mb-12 font-normal leading-relaxed">
          Open to application security roles, SOC analyst opportunities, penetration testing, and defensive engineering collaborations.
        </p>

        {/* Big Email Button */}
        <div className="mb-16">
          <a 
            href={`mailto:${profile.contact.email}`}
            className="inline-flex items-center gap-4 bg-[#F4F1EE] hover:bg-white text-black font-extrabold text-lg md:text-2xl font-mono px-8 py-5 rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
          >
            <Mail size={24} />
            <span>{profile.contact.email}</span>
            <ArrowUpRight size={24} />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-12 border-t border-white/10">
          {contactLinks.map((item) => (
            <a 
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A0A0A] hover:bg-[#121212] border border-white/10 hover:border-lime/40 rounded p-4 flex flex-col justify-between transition-all group"
            >
              <div className="flex justify-between items-center font-mono text-[11px] text-ink-faint uppercase mb-2">
                <span>{item.name}</span>
                <ArrowUpRight size={14} className="group-hover:text-lime transition-colors" />
              </div>
              <div className="font-mono text-xs text-white group-hover:text-lime truncate">
                {item.handle}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
