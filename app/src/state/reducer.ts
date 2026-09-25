import type { PageId, PenId } from '../data/menu';
import { newEv, newGame, newKq, type Eval, type Game, type Kuis } from '../lib/quiz';

export type Mode = 'tulis' | 'kuis';
export type ModalId = 'detail' | 'exit' | 'result' | 'settings';
export type Tone = 'success' | 'error' | 'info';

export interface State {
  page: PageId;
  mode: Mode;
  modal: ModalId | null;
  /** indeks aksara di Latihan Menulis */
  ti: number;
  /** indeks aksara di modal detail */
  di: number;
  /** arah animasi slide: 1 = maju, -1 = mundur */
  dir: 1 | -1;
  muted: boolean;
  bgmVol: number;
  pen: PenId;
  trace: boolean;
  /** kunci ulang animasi cover */
  intro: number;
  kq: Kuis;
  ev: Eval;
  g: Game;
  toast: { text: string; tone: Tone; id: string } | null;
}

export type Action =
  | { type: 'go'; page: PageId; mode?: Mode }
  | { type: 'replayIntro' }
  | { type: 'setTi'; ti: number; dir: 1 | -1 }
  | { type: 'setMode'; mode: Mode }
  | { type: 'openModal'; modal: ModalId }
  | { type: 'closeModal' }
  | { type: 'showDetail'; di: number }
  | { type: 'writeDetail' }
  | { type: 'toggleMute' }
  | { type: 'setVol'; v: number }
  | { type: 'setPen'; pen: PenId }
  | { type: 'toggleTrace' }
  | { type: 'kqAnswer'; o: number }
  | { type: 'kqAdvance' }
  | { type: 'kqReset' }
  | { type: 'evSelect'; o: number }
  | { type: 'evCheck' }
  | { type: 'evNext' }
  | { type: 'evResult' }
  | { type: 'evRetry' }
  | { type: 'game'; g: Game }
  | { type: 'gameHide' }
  | { type: 'gameReset' }
  | { type: 'toast'; text: string; tone: Tone }
  | { type: 'toastClear'; id: string };

export const BGM_KEY = 'sj_bgmVol';
const readVol = () => {
  try {
    const v = localStorage.getItem(BGM_KEY);
    return v === null || Number.isNaN(+v) ? 40 : Math.max(0, Math.min(100, +v));
  } catch {
    return 40;
  }
};

export type StartPage = PageId | 'tulis' | 'kuis';

/** Setara startState() di prototipe; dipakai juga untuk deep-link hash. */
export function initState(start: StartPage = 'cover', ti = 4): State {
  const s: State = {
    page: 'cover', mode: 'tulis', modal: null, ti, di: 0, dir: 1, muted: false, bgmVol: readVol(),
    pen: 'sedang', trace: true, intro: 0, kq: newKq(), ev: newEv(), g: newGame(), toast: null,
  };
  if (start === 'tulis') return { ...s, page: 'latihan', mode: 'tulis' };
  if (start === 'kuis') return { ...s, page: 'latihan', mode: 'kuis' };
  return { ...s, page: start };
}

export const clampVol = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

export function reducer(st: State, a: Action): State {
  switch (a.type) {
    case 'go': {
      const s: State = { ...st, page: a.page, modal: null, dir: 1 };
      if (a.mode) s.mode = a.mode;
      if (a.page === 'evaluasi') s.ev = newEv();
      if (a.page === 'permainan' && st.g.matched.length === 12) s.g = newGame();
      if (a.page === 'latihan' && st.kq.done) s.kq = newKq();
      if (a.page === 'cover') s.intro = st.intro + 1;
      return s;
    }
    case 'replayIntro':
      return { ...st, intro: st.intro + 1 };
    case 'setTi':
      return { ...st, ti: a.ti, dir: a.dir };
    case 'setMode':
      return a.mode === 'tulis'
        ? { ...st, mode: 'tulis', dir: -1 }
        : { ...st, mode: 'kuis', dir: 1, kq: st.kq.done ? newKq() : st.kq };
    case 'openModal':
      return { ...st, modal: a.modal };
    case 'closeModal':
      return { ...st, modal: null };
    case 'showDetail':
      return { ...st, modal: 'detail', di: a.di };
    case 'writeDetail':
      return { ...st, page: 'latihan', mode: 'tulis', ti: st.di, modal: null, dir: 1 };
    case 'toggleMute':
      return { ...st, muted: !st.muted };
    case 'setVol':
      return { ...st, bgmVol: clampVol(a.v) };
    case 'setPen':
      return { ...st, pen: a.pen };
    case 'toggleTrace':
      return { ...st, trace: !st.trace };
    // --- Latihan: Tebak Aksara (jawab langsung, skor = benar di percobaan pertama)
    case 'kqAnswer': {
      const kq = st.kq, t = kq.qs[kq.i].t;
      if (kq.picked !== null || kq.done) return st;
      if (a.o === t) return { ...st, kq: { ...kq, picked: a.o, score: kq.score + (kq.wrong.length ? 0 : 1) } };
      return kq.wrong.includes(a.o) ? st : { ...st, kq: { ...kq, wrong: [...kq.wrong, a.o] } };
    }
    case 'kqAdvance':
      if (st.kq.picked === null) return st;
      return st.kq.i >= 4
        ? { ...st, dir: 1, kq: { ...st.kq, done: true } }
        : { ...st, dir: 1, kq: { ...st.kq, i: st.kq.i + 1, picked: null, wrong: [] } };
    case 'kqReset':
      return { ...st, kq: newKq() };
    // --- Evaluasi: Pilih → Cek Jawaban → Soal Berikutnya
    case 'evSelect':
      return st.ev.checked ? st : { ...st, ev: { ...st.ev, sel: a.o } };
    case 'evCheck': {
      const ev = st.ev;
      if (ev.checked || ev.sel === null) return st;
      return { ...st, ev: { ...ev, checked: true, score: ev.score + (ev.sel === ev.qs[ev.i].t ? 1 : 0) } };
    }
    case 'evNext':
      if (!st.ev.checked || st.ev.i >= 9) return st;
      return { ...st, dir: 1, ev: { ...st.ev, i: st.ev.i + 1, sel: null, checked: false } };
    case 'evResult':
      return { ...st, modal: 'result' };
    case 'evRetry':
      return { ...st, ev: newEv(), modal: null };
    // --- Permainan memori
    case 'game':
      return { ...st, g: a.g };
    case 'gameHide':
      return { ...st, g: { ...st.g, open: [] } };
    case 'gameReset':
      return { ...st, g: newGame() };
    case 'toast':
      return { ...st, toast: { text: a.text, tone: a.tone, id: String(Date.now()) } };
    case 'toastClear':
      return st.toast && st.toast.id === a.id ? { ...st, toast: null } : st;
  }
}

/** Evaluasi sedang dikerjakan (untuk konfirmasi keluar). */
export const evBusy = (st: State) => st.page === 'evaluasi' && !st.modal && (st.ev.i > 0 || st.ev.sel !== null);
