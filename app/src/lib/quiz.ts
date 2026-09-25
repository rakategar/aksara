import { AKSARA_IDX } from '../data/aksara';

export const shuffle = <T,>(arr: readonly T[]): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** a2l = aksara → latin, l2a = latin → aksara */
export type QType = 'a2l' | 'l2a';
export interface Question { t: number; type: QType; opts: number[] }

/** n soal acak; bila mixed, soal ganjil berjenis latin → aksara. */
export const mkQ = (n: number, mixed = false): Question[] =>
  shuffle(AKSARA_IDX).slice(0, n).map((t, k) => ({
    t,
    type: mixed && k % 2 ? 'l2a' : 'a2l',
    opts: shuffle([t, ...shuffle(AKSARA_IDX.filter((i) => i !== t)).slice(0, 3)]),
  }));

/** Latihan Tebak Aksara */
export interface Kuis { qs: Question[]; i: number; picked: number | null; wrong: number[]; score: number; done: boolean }
export const newKq = (): Kuis => ({ qs: mkQ(5), i: 0, picked: null, wrong: [], score: 0, done: false });

/** Evaluasi */
export interface Eval { qs: Question[]; i: number; sel: number | null; checked: boolean; score: number }
export const newEv = (): Eval => ({ qs: mkQ(10, true), i: 0, sel: null, checked: false, score: 0 });

/** Permainan memori */
export interface MemCard { p: number; k: 'a' | 'l'; id: number }
export interface Game { cards: MemCard[]; open: number[]; matched: number[]; moves: number; round: number }
export const newGame = (): Game => {
  const ps = shuffle(AKSARA_IDX).slice(0, 6);
  return {
    cards: shuffle(ps.flatMap((p) => [{ p, k: 'a' as const }, { p, k: 'l' as const }])).map((c, id) => ({ ...c, id })),
    open: [], matched: [], moves: 0, round: Math.random(),
  };
};

export type FlipResult = { g: Game; kind: 'open' | 'match' | 'miss'; pair?: number } | null;

/** Membuka satu kartu. null = ketukan diabaikan. */
export function flipCard(g: Game, id: number): FlipResult {
  if (g.matched.includes(id) || g.open.includes(id) || g.open.length >= 2) return null;
  const open = [...g.open, id];
  if (open.length < 2) return { g: { ...g, open }, kind: 'open' };
  const a = g.cards[open[0]], b = g.cards[open[1]], moves = g.moves + 1;
  if (a.p === b.p) return { g: { ...g, open: [], matched: [...g.matched, a.id, b.id], moves }, kind: 'match', pair: a.p };
  return { g: { ...g, open, moves }, kind: 'miss' };
}

/** Jumlah bintang: evaluasi (dari 10) */
export const evalStars = (score: number) => (score >= 8 ? 3 : score >= 6 ? 2 : score >= 1 ? 1 : 0);
/** Jumlah bintang: latihan tebak aksara (dari 5) */
export const kuisStars = (score: number) => (score >= 5 ? 3 : score >= 3 ? 2 : 1);
