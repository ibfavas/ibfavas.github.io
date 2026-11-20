import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { initialCertifications } from '../data/portfolioData';
import type { Certification } from '../types/portfolio';
import type { mountCredentialDeck } from '../lib/credentialDeck';
import { usePlaybackVisibility } from '../lib/usePlaybackVisibility';
import { useReducedMotion } from '../lib/useReducedMotion';

const documents = initialCertifications.filter((cert): cert is Certification & { image: string } => Boolean(cert.image));
const previews = documents.map(cert => cert.image.replace('.png', '-thumb.webp'));

export function CredentialGallery({ onOpen, documentOpen }: {
  onOpen: (cert: Certification) => void;
  documentOpen: boolean;
}) {
  const reduced = useReducedMotion();
  const { ref, visible } = usePlaybackVisibility<HTMLDivElement>();
  const mount = useRef<HTMLDivElement>(null);
  const deck = useRef<ReturnType<typeof mountCredentialDeck> | null>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ready, setReady] = useState(false);
  const cert = documents[active];

  useEffect(() => {
    const host = mount.current;
    if (!host || !visible || reduced) return;
    let cancelled = false;
    import('../lib/credentialDeck').then(({ mountCredentialDeck }) => {
      if (cancelled) return;
      deck.current = mountCredentialDeck(host, previews, 0);
      setReady(true);
    }).catch(() => setReady(false));
    return () => {
      cancelled = true;
      deck.current?.dispose();
      deck.current = null;
      setReady(false);
    };
  }, [visible, reduced]);

  useEffect(() => { deck.current?.select(active); }, [active, ready]);
  useEffect(() => {
    if (!visible || !auto || reduced || documentOpen) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % documents.length), 5500);
    return () => window.clearInterval(timer);
  }, [visible, auto, reduced, documentOpen]);

  return (
    <div ref={ref} className="grid lg:grid-cols-[3fr_2fr] border border-white/15 bg-[#070808]">
      <div className="min-w-0">
        <div className="credential-stage relative overflow-hidden">
          <div ref={mount} aria-hidden="true" className="absolute inset-0 pointer-events-none" />
          {!ready && <img src={previews[active]} loading="lazy" alt=""
            className="absolute inset-0 m-auto w-[68%] h-[80%] object-contain" />}
          <button type="button" aria-label={`View ${cert.title}`}
            onFocus={() => setAuto(false)} onClick={() => onOpen(cert)}
            className="absolute inset-0 z-10 w-full cursor-zoom-in focus-visible:outline-offset-[-4px]">
            <span className="absolute bottom-3 right-3 px-3 py-2 bg-black/90 border border-white/20 text-xs font-mono">
              Open document <ArrowUpRight size={14} className="inline" />
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3 justify-between px-4 py-3 border-t border-white/15">
          <p className="text-xs font-mono text-[#bdbdbd]">{cert.date} · {cert.evidence}</p>
          {!reduced && <button type="button" aria-label={auto ? 'Pause gallery' : 'Play gallery'}
            onClick={() => setAuto(value => !value)} className="px-3 text-lime hover:bg-white/5">
            {auto ? <Pause size={17} /> : <Play size={17} />}
          </button>}
        </div>
      </div>
      <div className="grid grid-rows-4 border-t lg:border-t-0 lg:border-l border-white/15 divide-y divide-white/10">
        {documents.map((item, index) => (
          <button type="button" key={item.id} aria-pressed={active === index}
            onFocus={() => setAuto(false)} onClick={() => { setAuto(false); setActive(index); }}
            className={`text-left px-5 py-4 border-l-2 hover:bg-white/5 ${active === index ? 'border-lime bg-lime/5' : 'border-transparent'}`}>
            <span className="block font-mono text-[11px] text-lime uppercase">{item.issuer}</span>
            <span className="block text-base leading-snug text-white mt-1">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
