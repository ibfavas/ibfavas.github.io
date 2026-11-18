import React from 'react';
import { ArrowUpRight, Mail, Key } from 'lucide-react';

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
      'Application security, Python core runtime internals, and automated SIEM detection pipelines. Specialized in isolating structural logic flaws and access control bypasses that automated scanners miss.'
  },
  {
    id: 'faq-2',
    badge: '002',
    question: 'How was CVE-2024-39705 handled?',
    answer:
      'Discovered via manual code audit of NLTK package isolation boundaries. Responsibly disclosed to upstream maintainers with reproducible PoCs, and remediated upstream in PR #3625 before CVE release.'
  },
  {
    id: 'faq-3',
    badge: '003',
    question: 'Do you engage in contract code audits?',
    answer:
      'Yes. Engaging with engineering organizations and security teams seeking adversarial code reviews, zero-dependency tooling, and custom Wazuh detection architecture.'
  },
  {
    id: 'faq-4',
    badge: '004',
    question: 'Are all writeups safe and ethical?',
    answer:
      'Every technical writeup strictly adheres to coordinated disclosure policies after upstream patches are merged and formal CVE advisories are assigned. Zero live unpatched exploits are exposed.'
  }
];

export const FullBleedCrimsonFaqSection: React.FC = () => {
  return (
    <section id="contact" className="relative w-full bg-[#000000] pt-12 md:pt-16">
      {/* Massive Crimson Red Curved Sheet (Honey Screenshot 7 signature pattern!) */}
      <div className="w-full bg-red text-black rounded-t-[48px] md:rounded-t-[64px] border-t-2 border-black overflow-hidden shadow-2xl">
        {/* Top Chapter Coordinate Header */}
        <div className="w-full border-b border-black/15 px-6 md:px-14 py-4 flex items-center justify-between font-mono text-[11px] text-black font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span>[ 09 / 09 ]</span>
            <span>FAQ // DIRECT DISPATCH</span>
          </div>
          <div className="flex items-center gap-2">
            <span>SECURITY RESEARCH LAB</span>
            <span>&bull;</span>
            <span>ENCRYPTED INQUIRIES</span>
          </div>
        </div>

        {/* Main Grid: Left Massive Headline, Right 2x2 Question Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Headline */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-normal text-black uppercase tracking-tightest leading-[0.92] mb-8">
                  You've got questions.<br />
                  <span className="font-extrabold">We've got answers.</span>
                </h2>
                <p className="text-base md:text-lg text-black/80 font-medium leading-relaxed max-w-md">
                  Everything you need to know about vulnerability disclosure ethics, audit engagements, and technical methodology.
                </p>
              </div>

              {/* Secure Dispatch Pill */}
              <div className="pt-8">
                <a
                  href="mailto:favassalam88@gmail.com"
                  className="inline-flex items-center gap-3 bg-black text-white hover:bg-[#151515] px-8 py-4 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  <span>INITIALIZE DIRECT DISPATCH</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Right 2x2 Question Grid (Honey Screenshot 7 style) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {FAQ_ITEMS.map((faq) => (
                <div key={faq.id} className="flex flex-col justify-start">
                  {/* Dark Badge Indicator */}
                  <span className="w-fit px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
                    {faq.badge}
                  </span>

                  {/* Question */}
                  <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight mb-3">
                    {faq.question}
                  </h3>

                  {/* Answer */}
                  <p className="text-sm md:text-base text-black/85 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Encrypted PGP & Direct Comms Bar */}
        <div className="w-full bg-black text-white px-6 md:px-14 py-8 border-t border-black/20 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Key size={16} className="text-lime" />
              <span className="text-[#888] uppercase tracking-wider">PGP FINGERPRINT:</span>
              <span className="text-white font-bold tracking-tight">
                9B4D 2E1F 8C7A 443B 5519 DE82 1109 FA7C
              </span>
            </div>
            <div className="flex items-center gap-6 text-[#A0A0A0]">
              <span>RESPONSE WINDOW: &lt; 24 HOURS</span>
              <span className="text-lime font-semibold">SIGNAL ENCRYPTED AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};