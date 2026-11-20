import { useEffect, useId, useState } from 'react';
import { usePlaybackVisibility } from '../lib/usePlaybackVisibility';
import { useReducedMotion } from '../lib/useReducedMotion';

const blocks = Array.from({ length: 8 }, (_, index) => index + 1);

// A return to the same route keeps the finished diagram until the next page load.
const completedPages = new Set<string>();

export function XmlReaderTrace() {
  const page = window.location.pathname;
  const [step, setStep] = useState(() => completedPages.has(page) ? blocks.length : 1);
  const reduced = useReducedMotion();
  const arrival = reduced ? blocks.length : step;
  const { ref, visible } = usePlaybackVisibility<HTMLElement>();
  const labelId = useId();

  useEffect(() => {
    if (!visible || reduced || step >= blocks.length) return;
    const timer = window.setTimeout(() => {
      const next = step + 1;
      if (next === blocks.length) completedPages.add(page);
      setStep(next);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, step, page]);

  return (
    <section ref={ref} aria-labelledby={labelId} className="reader-trace my-8 border border-white/15 bg-[#080808]">
      <header className="p-5 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-wider text-lime">XML corpus reader / CVE-2026-81723</p>
        <h3 id={labelId} className="mt-2 text-3xl sm:text-4xl tracking-tight">The cost of reading twice.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c3c3c3]">
          Follow one unfinished fragment as blocks arrive. Each row is a new arrival.
          Each lit tile counts one block examined in this simplified model.
        </p>
      </header>
      <div className="grid grid-cols-2 border-t border-white/15 divide-x divide-white/15">
        {[false, true].map(incremental => {
          const visits = incremental ? arrival : arrival * (arrival + 1) / 2;
          return (
            <div key={String(incremental)} className={`trace-panel ${incremental ? 'trace-fixed' : ''}`}>
              <div className="px-3 pt-4 sm:px-6 font-mono">
                <p className="text-xs text-[#b8b8b8]">{incremental ? 'Patched reader' : 'Original reader'}</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <strong className="trace-count text-3xl sm:text-5xl tabular-nums">{visits}</strong>
                  <span className="text-xs">{visits === 1 ? 'block visit' : 'block visits'}</span>
                </p>
              </div>
              <div className="trace-stage" aria-hidden="true">
                <div className="trace-plane">
                  {blocks.flatMap(row => blocks.map(column => {
                    const visited = row <= arrival && (incremental ? column === row : column <= row);
                    return <i key={row * 10 + column} className={visited ? 'trace-tile is-read' : 'trace-tile'}
                      style={{ animationDelay: `${incremental ? 0 : column * 44}ms` }} />;
                  }))}
                </div>
              </div>
              <p className="px-3 pb-4 sm:px-6 text-sm text-[#bbb]">
                {incremental ? 'Carry the tag state into the next block.' : 'Revisit the growing fragment on each read.'}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
