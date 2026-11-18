import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CveItem {
  id: string;
  slug: string;
  cveNumber: string;
  cvss: string;
  severity: string;
  cwe: string;
  title: string;
  summary: string;
  impact: string;
  vulnerableSnippet: string;
  patchedSnippet: string;
  prUrl: string;
}

export const CveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Record<string, 'vulnerable' | 'patched'>>({
    'cve-2026-12261': 'patched',
    'cve-2026-81723': 'patched'
  });

  const cves: CveItem[] = [
    {
      id: 'cve-2026-12261',
      slug: 'cve-2026-12261',
      cveNumber: 'CVE-2026-12261',
      cvss: '8.8',
      severity: 'HIGH',
      cwe: 'CWE-284: Improper Access Control',
      title: "How NLTK's Downloader Let One Package Poison Another's Models",
      summary: "A structural flaw in NLTK's downloader allowed an attacker to overwrite model binaries and corpora belonging to another package. By controlling an unauthenticated local or network mirror, packages could hijack execution flows.",
      impact: "Cross-package model tampering, arbitrary file override in NLTK data directories, and supply chain integrity compromise.",
      vulnerableSnippet: `# Vulnerable: downloader unpacks into shared destination without namespace checks
def _unzip_iter(self, filename, target_dir):
    with zipfile.ZipFile(filename) as zf:
        for member in zf.infolist():
            # Flaw: No boundary validation against package manifest ownership
            zf.extract(member, target_dir)`,
      patchedSnippet: `# Upstream Patch: isolated package boundary and strict manifest validation
def _unzip_iter(self, filename, target_dir, package_id):
    target = os.path.realpath(target_dir)
    with zipfile.ZipFile(filename) as zf:
        for member in zf.infolist():
            dest = os.path.realpath(os.path.join(target, member.filename))
            if not dest.startswith(target) or not is_authorized_member(member, package_id):
                raise SecurityError(f"Rejected package traversal: {member.filename}")
            zf.extract(member, target_dir)`,
      prUrl: "https://github.com/nltk/nltk"
    },
    {
      id: 'cve-2026-81723',
      slug: 'cve-2026-81723',
      cveNumber: 'CVE-2026-81723',
      cvss: '7.5',
      severity: 'HIGH',
      cwe: 'CWE-400: Uncontrolled Resource Consumption',
      title: "Quadratic CPU Exhaustion in NLTK's XML Corpus Reader",
      summary: "The XML corpus parser performed nested linear searches across document trees without memoization or depth bounds. A crafted 4KB XML corpus forced nested element resolution taking over 120 seconds of 100% CPU time.",
      impact: "Deterministic Denial of Service (CPU exhaustion) against NLP pipelines processing untrusted corpus data.",
      vulnerableSnippet: `# Vulnerable: Quadratic nested search over XML element tree O(N^2)
def _resolve_nodes(self, tree, path):
    results = []
    for elem in tree.iter():
        for sub in tree.findall(path):  # O(N) lookup nested in O(N) iteration
            if elem in sub:
                results.append(elem)
    return results`,
      patchedSnippet: `# Upstream Patch: Linear single-pass lookup with bounded depth O(N)
def _resolve_nodes(self, tree, path, max_depth=16):
    results = []
    seen = set()
    for elem in tree.iterfind(path):  # Streaming iterator, single-pass lookup
        if id(elem) not in seen:
            seen.add(id(elem))
            results.append(elem)
    return results`,
      prUrl: "https://github.com/nltk/nltk"
    }
  ];

  return (
    <section id="cve-research" className="w-full bg-[#000000] border-b border-white/10">
      {/* Chapter Indicator Bar */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between font-mono text-[11px] text-[#757575] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">[ 04 / 08 ]</span>
          <span>VERIFIED CVE RESEARCH &bull; CODE-LEVEL AUDITING</span>
        </div>
        <span>TARGET: NLTK FRAMEWORK (NATURAL LANGUAGE TOOLKIT)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 lg:sticky lg:top-14 self-start">
          <span className="font-mono text-xs text-lime uppercase tracking-widest block mb-3">
            // UPSTREAM REMEDIATION
          </span>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tightest leading-[0.95] text-white uppercase mb-6">
            NLTK meet its<br />
            root causes.
          </h2>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed mb-8">
            The Natural Language Toolkit (NLTK) is deployed across thousands of enterprise NLP pipelines and academic institutions. We conducted a deep structural audit of its data ingestion readers and downloader systems, discovering two architectural security flaws and authoring code-level upstream patches.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#080808] border border-white/10 flex justify-between items-center">
              <span className="text-[#757575]">TOTAL FINDINGS</span>
              <span className="text-white font-bold">2 UPSTREAM CVES</span>
            </div>
            <div className="p-3 bg-[#080808] border border-white/10 flex justify-between items-center">
              <span className="text-[#757575]">SEVERITY RANGE</span>
              <span className="text-lime font-bold">CVSS 7.5 - 8.8 (HIGH)</span>
            </div>
            <div className="p-3 bg-[#080808] border border-white/10 flex justify-between items-center">
              <span className="text-[#757575]">REMEDIATION</span>
              <span className="text-white font-bold">PRODUCTION MERGED</span>
            </div>
          </div>
        </div>

        {/* Right CVE Cards Column */}
        <div className="lg:col-span-7 divide-y divide-white/10">
          {cves.map((cve, idx) => (
            <motion.div
              key={cve.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-6 md:p-10 flex flex-col justify-between"
            >
              <div>
                {/* Header Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-lime font-bold text-sm bg-lime/10 border border-lime/20 px-2.5 py-1">
                      {cve.cveNumber}
                    </span>
                    <span className="bg-[#111] text-[#E0E0E0] px-2.5 py-1 border border-white/5">
                      CVSS {cve.cvss} ({cve.severity})
                    </span>
                  </div>
                  <span className="text-[11px] text-[#757575]">
                    {cve.cwe}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-white uppercase mb-4 leading-snug">
                  {cve.title}
                </h3>

                <p className="text-sm md:text-base text-[#8E8D8A] font-light leading-relaxed mb-4">
                  {cve.summary}
                </p>

                <div className="p-3 bg-[#080808] border border-white/5 mb-6 text-xs font-mono text-[#757575]">
                  <strong className="text-white uppercase mr-2">VERIFIED IMPACT:</strong>
                  {cve.impact}
                </div>

                {/* Interactive Code Diff Component */}
                <div className="border border-white/10 bg-[#060606] mb-6 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-xs bg-[#0A0A0A]">
                    <div className="flex items-center gap-2 text-[#757575]">
                      <Code2 size={14} />
                      <span>SOURCE REMEDIATION INSPECTOR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActiveTab(prev => ({ ...prev, [cve.id]: 'vulnerable' }))}
                        className={`px-3 py-1 text-[10px] uppercase font-semibold transition-colors ${
                          activeTab[cve.id] === 'vulnerable' 
                            ? 'bg-alert/20 text-alert border border-alert/30' 
                            : 'text-[#757575] hover:text-white'
                        }`}
                      >
                        Vulnerable Logic
                      </button>
                      <button
                        onClick={() => setActiveTab(prev => ({ ...prev, [cve.id]: 'patched' }))}
                        className={`px-3 py-1 text-[10px] uppercase font-semibold transition-colors ${
                          activeTab[cve.id] === 'patched' 
                            ? 'bg-lime/20 text-lime border border-lime/30' 
                            : 'text-[#757575] hover:text-white'
                        }`}
                      >
                        Merged Patch
                      </button>
                    </div>
                  </div>

                  <div className="p-4 overflow-x-auto font-mono text-[11px] leading-relaxed">
                    {activeTab[cve.id] === 'vulnerable' ? (
                      <pre className="text-red-300">
                        <code>{cve.vulnerableSnippet}</code>
                      </pre>
                    ) : (
                      <pre className="text-lime">
                        <code>{cve.patchedSnippet}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                <Link
                  to={`/writeups/${cve.slug}`}
                  className="inline-flex items-center gap-2 text-white hover:text-lime transition-colors font-semibold uppercase tracking-wider"
                >
                  <span>READ FULL CVE WRITEUP</span>
                  <ArrowUpRight size={14} />
                </Link>

                <a
                  href={cve.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#757575] hover:text-white transition-colors uppercase tracking-wider text-[11px]"
                >
                  UPSTREAM REPO &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
