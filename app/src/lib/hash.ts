import type { PageId } from '../data/menu';
import type { StartPage, State } from '../state/reducer';

/**
 * Deep-link opsional lewat hash: #materi, #aksara, #sandhangan, #tulis, #tulis/5, #kuis,
 * #permainan, #evaluasi, #bantuan. Tanpa hash = Cover.
 */
const PAGES: StartPage[] = ['cover', 'materi', 'aksara', 'sandhangan', 'latihan', 'tulis', 'kuis', 'permainan', 'evaluasi', 'bantuan'];

export function parseHash(h: string): { start: StartPage; ti?: number } | null {
  const [name, n] = h.replace(/^#\/?/, '').toLowerCase().split('/');
  if (!name) return { start: 'cover' };
  if (!(PAGES as string[]).includes(name)) return null;
  const ti = n && /^\d+$/.test(n) ? Math.min(20, Math.max(1, +n)) - 1 : undefined;
  return { start: name as StartPage, ti };
}

export function hashFor(st: Pick<State, 'page' | 'mode' | 'ti'>): string {
  if (st.page === 'cover') return '';
  if (st.page === 'latihan') return st.mode === 'kuis' ? '#kuis' : `#tulis/${st.ti + 1}`;
  return `#${st.page satisfies PageId}`;
}
