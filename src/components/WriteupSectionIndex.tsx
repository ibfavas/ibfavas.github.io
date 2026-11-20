import { useEffect, useRef, useState, type RefObject } from 'react';

export function WriteupSectionIndex({ article }: { article: RefObject<HTMLElement> }) {
  const nav = useRef<HTMLElement>(null);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const page = article.current;
    const index = nav.current;
    const header = document.querySelector('header');
    if (!page || !index || !header) return;

    const headings = Array.from(page.querySelectorAll<HTMLElement>('.markdown-body h2'));
    const used = new Set<string>();
    for (const heading of headings) {
      const label = heading.lastElementChild?.textContent?.trim() || '';
      const base = 'section-' + (label.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'heading');
      let id = base;
      let suffix = 2;
      while (used.has(id)) id = base + '-' + suffix++;
      used.add(id);
      heading.id = id;
      heading.tabIndex = -1;
    }
    setSections(headings);

    let inset = 0;
    const update = () => {
      let current = '';
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > inset + 2) break;
        current = heading.id;
      }
      if (headings.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        current = headings[headings.length - 1].id;
      }
      setActive(current);
    };
    const measure = () => {
      const headerHeight = header.getBoundingClientRect().height;
      const mobile = Boolean(index.querySelector('select')?.offsetHeight);
      inset = headerHeight + (mobile ? index.offsetHeight : 0) + 12;
      page.style.setProperty('--dossier-header', headerHeight + 'px');
      page.style.setProperty('--heading-inset', inset + 'px');
      update();
    };
    measure();
    const bounds = new ResizeObserver(measure);
    bounds.observe(header);
    bounds.observe(index);
    bounds.observe(page);

    // A direct visit can resolve the fragment before the lazy dossier has mounted.
    const target = headings.find(heading => '#' + heading.id === window.location.hash);
    if (target) target.scrollIntoView({ behavior: 'instant' });
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      bounds.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [article]);

  useEffect(() => {
    const link = nav.current?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    const list = link?.parentElement;
    if (!link || !list || !list.clientHeight) return;
    const offset = link.getBoundingClientRect().top - list.getBoundingClientRect().top;
    if (offset < 0) list.scrollTop += offset;
    else if (offset + link.offsetHeight > list.clientHeight) list.scrollTop += offset + link.offsetHeight - list.clientHeight;
  }, [active]);

  return (
    <nav ref={nav} aria-label="Writeup sections" className="dossier-index sticky z-30 min-w-0 self-start bg-[#030303] px-6 py-2 font-mono lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:px-10 lg:py-4">
      <h2 className="mb-3 hidden text-xs uppercase tracking-wider text-[#aaa] lg:block">In this writeup</h2>
      <div data-lenis-prevent className="hidden max-h-[calc(100dvh-var(--dossier-header)-5rem)] overflow-y-auto overscroll-contain lg:grid">
        {sections.map(heading => (
          <a key={heading.id} href={'#' + heading.id} aria-current={active === heading.id ? 'location' : undefined}
            className="border-l border-white/20 px-3 py-1.5 text-xs text-[#aaa] hover:text-white aria-[current=location]:border-lime aria-[current=location]:text-lime">
            {heading.lastElementChild?.textContent}
          </a>
        ))}
      </div>
      <label className="flex items-center gap-3 text-xs lg:hidden">
        <span className="shrink-0 text-[#aaa]">Jump to section</span>
        <select className="min-h-11 min-w-0 flex-1 border border-white/20 bg-black px-2 text-white" value={active}
          onChange={event => { window.location.hash = event.target.value; }}>
          <option value="" disabled>Select section</option>
          {sections.map(heading => <option key={heading.id} value={heading.id}>{heading.lastElementChild?.textContent}</option>)}
        </select>
      </label>
    </nav>
  );
}
