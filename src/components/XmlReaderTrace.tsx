import { useEffect, useId, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useReducedMotion } from '../lib/useReducedMotion';

const blocks = Array.from({ length: 8 }, (_, index) => index + 1);

export function XmlReaderTrace() {
  const [arrival, setArrival] = useState(4);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const labelId = useId();

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(arrival + 1, blocks.length);
      setArrival(next);
      if (next === blocks.length) setPlaying(false);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [playing, arrival, reduced]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  return (
    <section aria-labelledby={labelId} className="reader-trace my-8 border border-white/15 bg-[#080808]">
      <header className="p-5 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-wider text-lime">XML corpus reader / CVE-2026-81723</p>
        <h3 id={labelId} className="mt-2 text-3xl sm:text-4xl tracking-tight">The cost of reading twice.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c3c3c3]">
          Follow one unfinished fragment as blocks arrive. Each row is a new arrival.
          Each lit tile counts one block examined in this simplified model.
        </p>
      </header>
      <div className="grid grid-cols-2 border-y border-white/15 divide-x divide-white/15">
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
      <div className="p-5 sm:p-7 flex flex-wrap items-end gap-x-6 gap-y-2">
        <label className="min-w-[9rem] flex-1 font-mono text-xs">
          <span className="flex justify-between gap-3">Blocks received <span>{arrival} / {blocks.length}</span></span>
          <input type="range" min="1" max={blocks.length} value={arrival}
            aria-valuetext={`${arrival} blocks received. Original reader ${arrival * (arrival + 1) / 2} visits. Patched reader ${arrival} visits.`}
            onChange={event => { setPlaying(false); setArrival(Number(event.target.value)); }}
            className="block h-11 w-full cursor-pointer accent-lime" />
        </label>
        {!reduced && <button type="button" onClick={() => {
          if (arrival === blocks.length) setArrival(1);
          setPlaying(!playing);
        }} className="inline-flex items-center gap-2 px-4 border border-white/25 font-mono text-xs hover:border-lime">
          {playing ? <Pause size={14} /> : arrival === blocks.length ? <RotateCcw size={14} /> : <Play size={14} />}
          {playing ? 'Pause' : arrival === blocks.length ? 'Replay' : 'Play trace'}
        </button>}
      </div>
    </section>
  );
}
