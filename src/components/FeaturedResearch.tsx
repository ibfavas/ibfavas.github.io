import type { CSSProperties } from 'react';
import { ArrowUpRight, GitMerge, GitCommitHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialCves } from '../data/portfolioData';
import { usePlaybackVisibility } from '../lib/usePlaybackVisibility';

export function FeaturedResearch() {
  const { ref, visible } = usePlaybackVisibility<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="featured-research" data-visible={visible}
      className="research-strip border-b border-white/15 bg-[#070707] px-5 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 flex items-center gap-4">
          <h2 id="featured-research" className="text-lg font-medium uppercase leading-none tracking-tight text-white sm:text-xl">
            <span aria-hidden="true" className="mr-2 font-mono text-lime">//</span>Featured Research
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {initialCves.map(cve => {
            const downloader = cve.id === 'cve-1';
            const EvidenceIcon = downloader ? GitMerge : GitCommitHorizontal;
            return (
              <article key={cve.id} className="research-case" data-study={downloader ? 'ownership' : 'xml'}>
                <div className="research-art" aria-hidden="true">
                  <div className="research-plane">
                    {Array.from({ length: downloader ? 2 : 4 }, (_, index) => (
                      <i key={index} className="research-sheet" style={{ '--i': index } as CSSProperties} />
                    ))}
                  </div>
                </div>
                <h3 className="relative max-w-[77%]">
                  <Link to={`/writeups/${cve.cveId.toLowerCase()}`} className="group inline-block">
                    <span className="research-id block font-mono text-[11px] tracking-wider">{cve.cveId}</span>
                    <span className="mt-2 block text-xl font-medium leading-tight tracking-tight text-white transition-colors duration-200 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] sm:text-2xl">
                      {downloader ? 'NLTK downloader package ownership' : 'Quadratic reads in the NLTK XML reader'}
                    </span>
                  </Link>
                </h3>
                <a href={cve.prLink} target="_blank" rel="noopener noreferrer" className="research-evidence">
                  <EvidenceIcon size={15} aria-hidden="true" />
                  {cve.contribution}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
