import React, { useState } from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CveItem {
  id: string;
  slug: string;
  cveNumber: string;
  cvss: string;
  severity: string;
  component: string;
  fixVersion: string;
  cwe: string;
  title: string;
  summary: string;
  impact: string;
  vulnerableSnippet: string;
  patchedSnippet: string;
  nvdUrl: string;
  prUrl: string;
}

export const CveSection: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<Record<string, 'vulnerable' | 'patched'>>({
    'cve-1': 'patched',
    'cve-2': 'patched'
  });

  const cves: CveItem[] = [
    {
      id: 'cve-1',
      slug: 'cve-2026-12261',
      cveNumber: 'CVE-2026-12261',
      cvss: '6.5',
      severity: 'MEDIUM',
      component: 'NLTK nltk.downloader (versions <= 3.9.4)',
      fixVersion: 'Fixed in NLTK 3.10.0. Upstream patched, verified.',
      cwe: 'CWE-284: Improper Access Control (Cross-package resource and model poisoning)',
      title: "Cross-Package Resource and Model Poisoning in NLTK Downloader",
      summary:
        "NLTK's data downloader extracted package archives into shared namespace folders without verifying that members belonged to the installing package, and validated package checksums only after extraction was committed. A malicious package could silently overwrite trusted models and corpora.",
      impact:
        "Silent cross-package model poisoning and persistent tampering of NLP data pipelines across interpreter restarts.",
      vulnerableSnippet: `# Vulnerable: downloader unpacks into shared destination without namespace checks
def _unzip_iter(self, filename, target_dir):
    with zipfile.ZipFile(filename) as zf:
        for member in zf.infolist():
            # Flaw: No boundary validation against package manifest ownership
            zf.extract(member, target_dir)`,
      patchedSnippet: `# Upstream Patch (PR #3625): enforce package ownership during ZIP extraction
def _unzip_iter(self, filename, target_dir, expected_root):
    with zipfile.ZipFile(filename) as zf:
        for member in zf.infolist():
            # Verified: rejects any member outside expected package root
            if not member.filename.startswith(expected_root):
                raise SecurityError(f"Rejected unowned package traversal: {member.filename}")
            zf.extract(member, target_dir)`,
      nvdUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2026-12261',
      prUrl: 'https://github.com/nltk/nltk/pull/3625'
    },
    {
      id: 'cve-2',
      slug: 'cve-2026-81723',
      cveNumber: 'CVE-2026-81723',
      cvss: '3.7',
      severity: 'LOW',
      component: 'NLTK XML corpus parsing: XMLCorpusView._read_xml_fragment() (affects NLTK below 3.10.3)',
      fixVersion: 'Fixed in NLTK 3.10.3. Upstream patched, verified.',
      cwe: 'CWE-400: Uncontrolled Resource Consumption (Quadratic CPU Exhaustion)',
      title: "Quadratic CPU Exhaustion in NLTK's XML Corpus Reader",
      summary:
        "The XML corpus parser rescanned the entire accumulated buffer on every 1 KiB block during fragment reads. An 8 MiB XML file burned 48 CPU-seconds through a public API due to quadratic buffer concatenation and repeated linear rescanning.",
      impact:
        "Algorithmic complexity denial of service (CPU exhaustion) against NLP pipelines processing untrusted corpus inputs.",
      vulnerableSnippet: `# Vulnerable: quadratic buffer rescan on every 1 KiB chunk in XMLCorpusView
def _read_xml_fragment(self):
    while True:
        chunk = self._stream.read(1024)
        self._buffer += chunk
        # Flaw: rescans entire accumulated buffer O(N^2)
        match = self._tag_pattern.search(self._buffer)
        if match:
            return self._parse_fragment(match)`,
      patchedSnippet: `# Upstream Patch (commit 7808692): bounded fragment accumulation and streaming seek
def _read_xml_fragment(self):
    pos = 0
    while True:
        chunk = self._stream.read(1024)
        if not chunk:
            break
        # Fixed: search only from last unexamined index O(N)
        match = self._tag_pattern.search(self._buffer, pos)
        if match:
            return self._parse_fragment(match)
        pos = max(0, len(self._buffer) - self._overlap_size)`,
      nvdUrl: 'https://nvd.nist.gov/vuln/detail/CVE-2026-81723',
      prUrl: 'https://github.com/nltk/nltk/commit/7808692'
    }
  ];

  return (
    <section id="cve-research" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Marker Header */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 07 / 09 ]</span>
          <span className="text-red font-semibold">// ZERO-DAY RESEARCH</span>
          <span className="text-[#A0A0A0] hidden sm:inline">&bull; PYTHON RUNTIME EXPLOITATION</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white">TARGET: NLTK ENGINE</span>
          <span className="px-2 py-0.5 bg-red text-white text-[10px] font-bold">2 CVEs MERGED</span>
        </div>
      </div>

      {/* Editorial Section Intro Header */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-red uppercase tracking-widest block mb-3">
              // DISCLOSED VULNERABILITIES
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white uppercase tracking-tightest leading-[0.95]">
              Python core vulnerabilities.<br />
              <span className="text-[#8E8D8A]">Audited and patched upstream.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-[#9A9A9A] font-light leading-relaxed">
            Real vulnerability discovery is not automated scanning. It requires reverse engineering package lifecycles, memory boundaries, and algorithmic complexity limits.
          </p>
        </div>
      </div>

      {/* Full-Width Spotlight Cards (VARIED FULL-WIDTH ARCHITECTURAL LAYOUT) */}
      <div className="divide-y divide-white/10">
        {cves.map((cve) => {
          const isVulnerable = activeCodeTab[cve.id] === 'vulnerable';

          return (
            <div key={cve.id} className="p-6 md:p-14 max-w-7xl mx-auto">
              {/* Header Badges & CVE Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-red text-white font-mono text-xs font-bold uppercase tracking-wider">
                    {cve.cveNumber}
                  </span>
                  <span className="px-2.5 py-1 bg-white/10 text-white font-mono text-xs font-semibold">
                    CVSS {cve.cvss} {cve.severity}
                  </span>
                  <span className="px-2.5 py-1 border border-lime/40 text-lime font-mono text-[10px] font-bold uppercase tracking-wider">
                    UPSTREAM PATCHED // VERIFIED
                  </span>
                  <span className="font-mono text-xs text-[#808080] hidden lg:inline">
                    {cve.cwe}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/writeups/${cve.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-lime text-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    <span>READ DOSSIER</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href={cve.nvdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-lime text-[#CCC] hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    <span>NVD RECORD</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={cve.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
                  >
                    <span>UPSTREAM FIX</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Title & Component Meta */}
              <h3 className="text-2xl md:text-4xl font-normal text-white uppercase tracking-tight mb-3">
                {cve.title}
              </h3>

              <div className="space-y-1 mb-5 font-mono text-xs">
                <div className="text-[#A0A0A0]">
                  <span className="text-white font-semibold uppercase mr-2">AFFECTED:</span>
                  <span>{cve.component}</span>
                </div>
                <div className="text-lime">
                  <span className="text-white font-semibold uppercase mr-2">REMEDIATION:</span>
                  <span>{cve.fixVersion}</span>
                </div>
              </div>

              <p className="text-base md:text-lg text-[#C0C0C0] font-light leading-relaxed mb-6 max-w-4xl">
                {cve.summary}
              </p>

              {/* Impact Banner */}
              <div className="p-4 bg-red/10 border-l-2 border-red mb-8 font-mono text-xs text-white/90">
                <span className="text-red font-bold mr-2 uppercase">VERIFIED IMPACT:</span>
                {cve.impact}
              </div>

              {/* Interactive Code Comparison Box */}
              <div className="border border-white/15 rounded-none bg-[#050505] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-[#888]" />
                    <span className="text-[#888] uppercase">SOURCE COMPARISON</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActiveCodeTab(prev => ({ ...prev, [cve.id]: 'vulnerable' }))
                      }
                      className={`px-3 py-1 font-mono text-xs transition-colors ${
                        isVulnerable
                          ? 'bg-red text-white font-bold'
                          : 'text-[#777] hover:text-white'
                      }`}
                    >
                      FLAWED CODE
                    </button>
                    <button
                      onClick={() =>
                        setActiveCodeTab(prev => ({ ...prev, [cve.id]: 'patched' }))
                      }
                      className={`px-3 py-1 font-mono text-xs transition-colors ${
                        !isVulnerable
                          ? 'bg-lime text-black font-bold'
                          : 'text-[#777] hover:text-white'
                      }`}
                    >
                      PATCHED REVISION
                    </button>
                  </div>
                </div>

                <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto text-[#E0E0E0] bg-[#030303] leading-relaxed">
                  <pre>
                    <code>{isVulnerable ? cve.vulnerableSnippet : cve.patchedSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Writeup Dossiers Link Banner */}
      <div className="w-full bg-[#080808] border-t border-white/10 p-6 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-1">
            ARCHIVE DOSSIERS
          </span>
          <p className="text-sm md:text-base text-white font-light">
            Review all 7 verified vulnerability writeups, including PEELR obfuscation, SiteGuard, and Threat Intelligence pipelines.
          </p>
        </div>
        <Link
          to="/writeups"
          className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex-shrink-0"
        >
          <span>VIEW ALL 7 WRITEUPS</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
};