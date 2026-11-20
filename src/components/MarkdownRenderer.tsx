import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
}

const preprocessMarkdown = (raw: string): string => {
  if (!raw) return '';
  // 1. Transform raw HTML <img ...> tags into markdown image syntax ![alt](src)
  let processed = raw.replace(
    /<img\s+[^>]*?src=["']([^"']+)["'][^>]*?(?:alt=["']([^"']*)["'])?[^>]*?\/?>|<img\s+[^>]*?(?:alt=["']([^"']*)["'])[^>]*?src=["']([^"']+)["'][^>]*?\/?>/gi,
    (_match, src1, alt1, alt2, src2) => {
      const src = src1 || src2 || '';
      const alt = alt1 || alt2 || 'Technical diagram';
      return `\n\n![${alt}](${src})\n\n`;
    }
  );
  // 2. Strip any leftover outer <div align="center">...</div> wrapper tags
  processed = processed.replace(/<\/?div[^>]*>/gi, '\n');
  return processed;
};

export const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  const sanitizedContent = preprocessMarkdown(content);

  return (
    <div className="markdown-body space-y-6 text-[#D0CDC7] text-[16px] md:text-[17px] leading-[1.8] font-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-12 mb-6 tracking-tight border-b border-border pb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 tracking-tight flex items-center gap-3">
              <span className="text-lime text-base font-mono">//</span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3 tracking-tight">
              {children}
            </h3>
          ),
          p: ({ children, node }) => node?.children.some(child => child.type === 'element' && child.tagName === 'img') ? <div>{children}</div> : (
            <p className="my-4 leading-relaxed text-[#D0CDC7]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 my-4 marker:text-lime">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 my-4 marker:text-lime font-mono text-sm">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[#D0CDC7] leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-lime pl-5 py-2 my-6 bg-surface/60 rounded-r text-ink-muted italic font-mono text-sm">
              {children}
            </blockquote>
          ),
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            if (isInline) {
              return (
                <code className="bg-[#141414] border border-white/10 text-lime px-1.5 py-0.5 rounded font-mono text-[13px]" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <div className="relative my-6 rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0A]">
                {match && (
                  <div className="bg-[#111111] border-b border-white/10 px-4 py-1.5 text-[11px] font-mono text-ink-muted uppercase tracking-wider flex justify-between items-center">
                    <span>{match[1]}</span>
                    <span>RAW</span>
                  </div>
                )}
                <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#ECE8E1]">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border border-white/10 rounded-lg bg-surface">
              <table className="w-full text-left text-sm font-mono border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#141414] border-b border-white/10 text-white uppercase text-[11px] tracking-wider">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-bold border-r border-white/5 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-white/5 border-r border-white/5 last:border-r-0 text-ink-muted">
              {children}
            </td>
          ),
          img: ({ src, alt }) => {
            return (
              <figure className="my-8 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                <picture>
                  {src === '/assets/ui/netpulse_demo.gif' && (
                    <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/ui/thumb-netpulse.webp" />
                  )}
                  <img
                    src={src}
                    alt={alt || 'Technical diagram'}
                    className="w-full aspect-video h-auto max-h-[560px] object-contain mx-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                {alt && (
                  <figcaption className="text-center font-mono text-[11px] text-ink-muted py-2.5 border-t border-white/5 bg-[#0C0C0C]">
                    [ {alt} ]
                  </figcaption>
                )}
              </figure>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:underline font-medium break-words transition-colors"
            >
              <span>{children}</span>
              <span className="text-[10px] font-mono">&nearr;</span>
            </a>
          ),
          hr: () => <hr className="border-t border-white/10 my-10" />
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
};
