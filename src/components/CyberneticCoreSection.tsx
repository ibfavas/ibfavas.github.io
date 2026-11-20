import React, { useEffect, useRef, useState } from 'react';
import type { ThreatMode } from '../lib/threatCoreScene';
import { useReducedMotion } from '../lib/useReducedMotion';
import { RefreshCw, Zap, Activity, ShieldAlert, ShieldCheck, Database } from 'lucide-react';
import { DecryptText } from './DecryptText';

export const CyberneticCoreSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<ThreatMode>('nltk');
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [nodePingCount, setNodePingCount] = useState<number>(0);

  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [ready, setReady] = useState(false);
  const settings = useRef({ mode: activeMode, speed: rotationSpeed, wireframe: wireframeMode });
  settings.current = { mode: activeMode, speed: rotationSpeed, wireframe: wireframeMode };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || paused || unavailable || reduced) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      try {
        const { mountThreatCore } = await import('../lib/threatCoreScene');
        if (cancelled) return;
        dispose = mountThreatCore(container, () => settings.current,
          () => setNodePingCount(count => count + 1), () => setUnavailable(true));
        setReady(true);
      } catch {
        if (!cancelled) setUnavailable(true);
      }
    });
    observer.observe(container);
    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
      setReady(false);
    };
  }, [reduced, paused, unavailable]);

  return (
    <section id="interactive-core" className="relative w-full border-b border-white/10 bg-[#020202] overflow-hidden select-none">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-4 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#909090] uppercase tracking-wider bg-black/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="text-white font-semibold">[ 02 / 12 ]</span>
          <span className="text-lime font-medium">// INTERACTIVE THREAT CORE</span>
          <span className="hidden sm:inline text-[#909090]">&bull; FULL-WIDTH 3D HUD</span>
        </div>
        <div className="flex items-center gap-3">
          {ready && <span className="text-[#888] text-[10px] hidden md:inline">DRAG OR USE ARROW KEYS · ENTER TO PULSE</span>}
          <span className="px-2 py-0.5 border border-lime/40 text-lime text-[10px] bg-lime/5 font-semibold">
            {ready ? 'INTERACTIVE 3D' : 'STATIC VIEW'}
          </span>
        </div>
      </div>

      {/* Main Full-Width Canvas Container */}
      <div className="relative w-full h-[720px] md:h-[680px] cursor-grab active:cursor-grabbing">
        {/* Three.js DOM Injection Node */}
        {!ready && (
          <div aria-hidden="true" className={`core-orbit absolute left-1/2 top-[66%] md:top-1/2 ${activeMode === 'cis' ? 'text-lime' : activeMode === 'wazuh' ? 'text-sky-400' : 'text-red'}`}>
            <span /><span /><span />
          </div>
        )}
        <div ref={containerRef} tabIndex={ready ? 0 : -1} role="group"
          aria-label={ready ? "Threat Core. Use arrow keys to rotate and Enter to pulse." : "Static Threat Core illustration"}
          className="absolute inset-x-0 top-[21rem] bottom-24 md:inset-0 touch-pan-y focus-visible:outline-offset-[-4px]" />

        {/* Top Controls on Small Screens / Split on Desktop */}
        <div className="absolute top-4 left-4 right-4 md:left-12 md:right-12 z-20 flex flex-col md:flex-row justify-between items-start md:items-start gap-3 pointer-events-none">
          {/* Top-Left Telemetry Overlay Box */}
          <div className="p-4 bg-black/80 border border-white/15 backdrop-blur-xl font-mono max-w-sm w-full md:w-auto pointer-events-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full animate-ping ${
                  activeMode === 'nltk' ? 'bg-red' : activeMode === 'cis' ? 'bg-lime' : 'bg-sky-400'
                }`}
              />
              <span className="text-xs text-white font-semibold uppercase tracking-wider">
                <DecryptText text={activeMode === 'nltk' ? 'PACKAGE INTEGRITY' : activeMode === 'cis' ? 'HARDENED SHIELD' : 'SIEM IOC VORTEX'} />
              </span>
            </div>
            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-3">
              {activeMode === 'nltk' && 'The radial lines illustrate the shared data boundary in the NLTK downloader.'}
              {activeMode === 'cis' && 'The outer shield represents host controls in the Arch Linux lab. Its final Wazuh SCA score was 83%.'}
              {activeMode === 'wazuh' && 'The moving points represent feed records collected, scored and exported to Wazuh lists in the lab.'}
            </p>
            <div className="space-y-1.5 text-[10px] border-t border-white/10 pt-2 text-[#909090]">
              <div className="flex justify-between">
                <span>SIMULATION TARGET</span>
                <span className="text-white font-medium uppercase">
                  {activeMode === 'nltk' ? 'NLTK Core [CVE-2026-12261]' : activeMode === 'cis' ? 'Arch Linux lab' : 'Wazuh lab'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>USER PULSES</span>
                <span className="text-lime">{nodePingCount}</span>
              </div>
            </div>
          </div>

          {/* Top-Right Attack Simulation Mode Selector */}
          <div className="p-3 bg-black/85 border border-white/15 backdrop-blur-xl font-mono space-y-1.5 text-[11px] pointer-events-auto shadow-2xl w-full md:w-auto">
            <span className="text-[9px] uppercase tracking-wider text-[#909090] block px-1">
              CHOOSE ACTIVE THREAT SCENARIO
            </span>
            <button
              aria-pressed={activeMode === 'nltk'} onClick={() => setActiveMode('nltk')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 transition-all ${
                activeMode === 'nltk'
                  ? 'bg-red text-black font-bold shadow-lg shadow-red/20'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldAlert size={14} />
              <span>01 &bull; NLTK POISONING (CVE-2026-12261)</span>
            </button>
            <button
              aria-pressed={activeMode === 'cis'} onClick={() => setActiveMode('cis')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 transition-all ${
                activeMode === 'cis'
                  ? 'bg-lime text-black font-bold shadow-lg shadow-lime/20'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck size={14} />
              <span>02 &bull; CIS KERNEL AUDIT (83% SCA)</span>
            </button>
            <button
              aria-pressed={activeMode === 'wazuh'} onClick={() => setActiveMode('wazuh')}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 transition-all ${
                activeMode === 'wazuh'
                  ? 'bg-sky-400 text-black font-bold shadow-lg shadow-sky-400/20'
                  : 'text-[#888] hover:text-white hover:bg-white/5'
              }`}
            >
              <Database size={14} />
              <span>03 &bull; WAZUH SIEM IOC STREAM</span>
            </button>
          </div>
        </div>

        {/* Bottom-Left Real-time HUD Controls */}
        <div className="absolute bottom-4 left-4 md:left-12 z-20 flex flex-wrap items-center gap-2.5 font-mono text-xs">
          {ready && <>
          <button aria-pressed={wireframeMode}
            onClick={() => setWireframeMode(!wireframeMode)}
            className="flex items-center gap-2 px-3 py-2 bg-black/85 hover:bg-white hover:text-black border border-white/20 text-white backdrop-blur-md transition-colors"
          >
            <Zap size={13} className={wireframeMode ? 'text-lime' : 'text-[#888]'} />
            <span>MODE: {wireframeMode ? 'WIREFRAME' : 'SOLID'}</span>
          </button>
          <button
            onClick={() => setRotationSpeed(s => (s === 1 ? 2.5 : s === 2.5 ? 0.2 : 1))}
            className="flex items-center gap-2 px-3 py-2 bg-black/85 hover:bg-white hover:text-black border border-white/20 text-white backdrop-blur-md transition-colors"
          >
            <RefreshCw size={13} />
            <span>VELOCITY: {rotationSpeed}X</span>
          </button>
          </>}
          {!unavailable && !reduced && <button aria-pressed={paused} onClick={() => setPaused(!paused)}
            className="px-3 py-2 bg-black/85 border border-white/20">
            {paused ? 'ENABLE 3D' : 'STATIC VIEW'}
          </button>}
          {(unavailable || reduced) && <span className="bg-black/85 p-2 text-[#aaa]">
            {reduced ? 'REDUCED MOTION' : 'WEBGL UNAVAILABLE'} · SELECT A SCENARIO
          </span>}
        </div>

        {/* Bottom-Right Stream Diagnostic Log */}
        <div className="absolute bottom-4 right-4 md:right-12 z-20 pointer-events-none hidden xl:block">
          <div className="px-4 py-2 bg-black/85 border border-white/15 backdrop-blur-md font-mono text-[10px] text-[#808080] flex items-center gap-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-lime" />
              <span>LOCAL VISUALIZATION</span>
            </div>
            <span>THREE.JS</span>
            <span className="text-white font-semibold">SCENARIO MODEL</span>
          </div>
        </div>
      </div>
    </section>
  );
};