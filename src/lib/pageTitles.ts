import { initialWriteups } from '../data/portfolioData';

export const pageTitles = new Map<string, string>([
  ['/', 'Mohammad Favas S | SOC, Security Research & VAPT'],
  ['/projects', 'Security Projects | Mohammad Favas S'],
  ['/writeups', 'Technical Writeups | Mohammad Favas S'],
]);

for (const writeup of initialWriteups) {
  pageTitles.set(`/writeups/${writeup.slug}`, writeup.title);
}
