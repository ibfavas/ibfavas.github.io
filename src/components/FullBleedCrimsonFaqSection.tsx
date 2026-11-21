import { initialProfile } from '../data/portfolioData';
import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface FaqItem {
  id: string;
  badge: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    badge: '001',
    question: 'What is your primary research domain?',
    answer:
      'My main focus is application security, especially the way Python libraries handle data across trust boundaries. I also build detection tools and maintain a Wazuh lab.'
  },
  {
    id: 'faq-2',
    badge: '002',
    question: 'How was CVE-2026-12261 handled?',
    answer:
      'My upstream patch enforces package ownership during extraction and checks the staged download before installation. NLTK shipped the fix in 3.10.0.'
  },
  {
    id: 'faq-3',
    badge: '003',
    question: 'Do you engage in contract code audits?',
    answer:
      'Yes. I work on scoped web and API assessments, source reviews and remediation retests. Email me with the application, scope and timeframe.'
  },
  {
    id: 'faq-4',
    badge: '004',
    question: 'What is in the research archive?',
    answer:
      'The archive contains two NLTK disclosures and five engineering writeups. The dossiers link to upstream fixes, project source or measurements from my lab.'
  }
];

export const FullBleedCrimsonFaqSection: React.FC = () => {
  return (
    <section id="contact" className="relative w-full bg-[#000000] pt-12 md:pt-16">
      <div className="w-full bg-red text-black rounded-t-[48px] md:rounded-t-[64px] border-t-2 border-black overflow-hidden shadow-2xl">
        <div className="w-full border-b border-black/15 px-6 md:px-14 py-4 flex items-center justify-between font-mono text-[11px] text-black font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span>[ 12 / 12 ]</span>
            <span>FAQ // DIRECT DISPATCH</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span>SECURITY RESEARCH LAB</span>
            <span>&bull;</span>
            <span>CONTACT</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-normal text-black uppercase tracking-tightest leading-[0.92] mb-8">
                  You've got questions.<br />
                  <span className="font-extrabold">I've got answers.</span>
                </h2>
                <p className="text-base md:text-lg text-black/80 font-medium leading-relaxed max-w-md">
                  For research correspondence, security engineering roles or a scoped application review, get in touch.
                </p>
              </div>

              <div className="pt-8">
                <a
                  href="mailto:favassalam88@gmail.com"
                  className="inline-flex items-center gap-3 bg-black text-white hover:bg-[#151515] px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  <span>EMAIL FAVAS</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {FAQ_ITEMS.map((faq) => (
                <div key={faq.id} className="flex flex-col justify-start">
                  <span className="w-fit px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
                    {faq.badge}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight mb-3">
                    {faq.question}
                  </h3>

                  <p className="text-sm md:text-base text-black/85 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-black text-white px-6 md:px-14 py-8 border-t border-black/20 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <a href={`mailto:${initialProfile.contact.email}`} className="hover:text-lime">{initialProfile.contact.email}</a>
            <div className="flex flex-wrap gap-6">
              <a href={initialProfile.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={initialProfile.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={initialProfile.contact.tryhackme} target="_blank" rel="noopener noreferrer">TryHackMe / ibfavas</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
