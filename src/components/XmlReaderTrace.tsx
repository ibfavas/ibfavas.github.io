import { useEffect, useId, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useReducedMotion } from '../lib/useReducedMotion';
import { usePlaybackVisibility } from '../lib/usePlaybackVisibility';

const blocks = Array.from({ length: 8 }, (_, index) => index + 1);

// Each column is one arriving block. Each glass layer is one visit to that block.
function ReaderStacks({ arrival, incremental }: { arrival: number; incremental: boolean }) {
  return (
    <svg viewBox="0 0 272 196" aria-hidden="true" className="trace-stacks">
      <g stroke="currentColor" fill="none" opacity=".18">
        {blocks.map(block => <path key={block}
          d={`M${10 + block * 27} ${113 + block * 5} l29 -21`} />)}
        {[0, 1, 2, 3].map(line => <path key={line} d={`M${18 + line * 8} ${115 - line * 6} l216 40`} />)}
      </g>
      {blocks.map((block, i) => {
        const visits = block > arrival ? 0 : incremental ? 1 : arrival - i;
        return (
          <g key={block} transform={`translate(${22 + i * 27} ${112 + i * 5})`}>
            <path d="M0 0 l22 4 12 -9 -22 -4 Z" fill="#141717" stroke="#48504c" />
            {Array.from({ length: visits }, (_, layer) => (
              <g key={layer} transform={`translate(0 ${-layer * 11})`}>
                <g className="trace-layer" style={{ animationDelay: `${incremental ? 0 : i * 65}ms` }}>
                  <path d="M0 0 l22 4 v-10 l-22 -4 Z" className="trace-face" />
                  <path d="M22 4 l12 -9 v-10 l-12 9 Z" className="trace-side" />
                  <path d="M0 -10 l22 4 12 -9 -22 -4 Z" className="trace-lid" />
                </g>
              </g>
            ))}
            <text x="8" y="20" className="trace-block-index">{String(block).padStart(2, '0')}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function XmlReaderTrace() {
  const reduced = useReducedMotion();
  const { ref, visible } = usePlaybackVisibility<HTMLElement>();
  const [arrival, setArrival] = useState(reduced ? blocks.length : 1);
  const [playing, setPlaying] = useState(!reduced);
  const labelId = useId();

  useEffect(() => {
    if (!visible || !playing || reduced) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(arrival + 1, blocks.length);
      setArrival(next);
      if (next === blocks.length) setPlaying(false);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [visible, playing, arrival, reduced]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  return (
    <section ref={ref} aria-labelledby={labelId} className="reader-trace my-8 border border-white/15 bg-[#080808]">
      <header className="p-5 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-wider text-lime">XML corpus reader / CVE-2026-81723</p>
        <h3 id={labelId} className="mt-2 text-3xl sm:text-4xl tracking-tight">The cost of reading twice.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c3c3c3]">
          Watch one unfinished fragment grow. Each column is an input block. A layer rises each time the reader examines that block in this simplified model.
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
              <ReaderStacks arrival={arrival} incremental={incremental} />
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
