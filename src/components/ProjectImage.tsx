import React, { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[16/9]',
  className = ''
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-[#060606] border border-white/10 overflow-hidden select-none ${className}`}
    >
      {/* Dark Brutalist Loading Placeholder Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070707] text-[#909090] font-mono text-[10px] tracking-wider animate-pulse">
          <div className="w-5 h-5 rounded-full border border-lime/30 border-t-lime animate-spin mb-2" />
          <span className="uppercase text-[#777]">TELEMETRY // SYNCING</span>
        </div>
      )}

      {/* Dark Fallback if Image Fails to Load */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#080808] text-center font-mono">
          <span className="text-[10px] text-lime uppercase tracking-widest block mb-1">
            [ SECURE REPOSITORY ARTIFACT ]
          </span>
          <span className="text-xs text-white font-medium uppercase tracking-tight">
            {alt}
          </span>
          <span className="text-[9px] text-[#909090] mt-2">
            TELEMETRY NODE ACTIVE // 2026
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            loaded ? 'opacity-90 group-hover:opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle Dark Vignette Border */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
    </div>
  );
};
