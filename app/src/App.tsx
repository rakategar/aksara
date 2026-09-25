import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import { IconSprite } from './components/Icon';
import { Stage } from './components/Stage';
import { Toast } from './components/Toast';
import { IMG } from './data/assets';
import type { PageId } from './data/menu';
import { Bgm } from './lib/bgm';
import { hashFor, parseHash } from './lib/hash';
import { burst as fxBurst, prefersReducedMotion, runAnims, shake as fxShake } from './lib/motion';
import { speak as speakText, stopSpeech } from './lib/speech';
import { AppCtx, type AppApi } from './state/AppContext';
import { BGM_KEY, initState, reducer, type Mode, type Tone } from './state/reducer';
import { GlobalHeader } from './screens/GlobalHeader';
import { Cover } from './screens/Cover';
import { FeatureFrame } from './screens/FeatureFrame';
import { Modals } from './modals/Modals';

const SCREEN_LABEL: Partial<Record<PageId, string>> = {
  cover: '01 Cover', materi: '02 Materi', aksara: '03 Aksara Jawa', sandhangan: '05 Sandhangan',
  permainan: '07 Permainan', evaluasi: '08 Evaluasi', bantuan: '09 Bantuan',
};

function useReducedMotion() {
  const [rm, setRm] = useState(prefersReducedMotion);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setRm(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return rm;
}

export default function App() {
  const [st, dispatch] = useReducer(reducer, undefined, () => {
    const h = parseHash(location.hash);
    return h ? initState(h.start, h.ti) : initState();
  });
  const [scale, setScale] = useState(0.5);
  const onScale = useCallback((s: number) => setScale((p) => (Math.abs(s - p) > 0.001 ? s : p)), []);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // state terbaru untuk callback yang dipanggil dari timer
  const live = useRef({ st, scale, reduced });
  live.current = { st, scale, reduced };

  // ---- timer
  const timers = useRef(new Set<number>());
  const later = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(() => { timers.current.delete(t); fn(); }, ms);
    timers.current.add(t);
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // ---- toast 2200ms
  const toastTimer = useRef<number>(0);
  const toast = useCallback((text: string, tone: Tone) => {
    clearTimeout(toastTimer.current);
    dispatch({ type: 'toast', text, tone });
    toastTimer.current = window.setTimeout(() => dispatch({ type: 'toastClear', id: live.current.st.toast?.id ?? '' }), 2200);
  }, []);

  // ---- audio
  const speak = useCallback((text: string) => { if (!live.current.st.muted) speakText(text); }, []);
  const bgm = useRef<Bgm | null>(null);
  useEffect(() => {
    const b = new Bgm();
    bgm.current = b;
    b.set(live.current.st.muted ? 0 : live.current.st.bgmVol / 100, true);
    return () => b.dispose();
  }, []);
  const firstVol = useRef(true);
  useEffect(() => {
    bgm.current?.set(st.muted ? 0 : st.bgmVol / 100, !firstVol.current);
    if (!firstVol.current) { try { localStorage.setItem(BGM_KEY, String(st.bgmVol)); } catch { /* mode privat */ } }
    firstVol.current = false;
    if (st.muted) stopSpeech();
  }, [st.muted, st.bgmVol]);

  // ---- efek visual
  const burst = useCallback((el: Element | null) => fxBurst(stageRef.current, el, live.current.scale, live.current.reduced), []);
  const shake = useCallback((el: Element | null) => fxShake(el, live.current.reduced), []);
  useLayoutEffect(() => { runAnims(stageRef.current, st.dir, reduced); });

  // ---- navigasi & deep-link hash
  const go = useCallback((page: PageId, mode?: Mode) => dispatch({ type: 'go', page, mode }), []);
  useEffect(() => {
    const h = hashFor(st);
    if (h !== location.hash && !(h === '' && location.hash === '')) history.replaceState(null, '', h || location.pathname + location.search);
  }, [st.page, st.mode, st.ti]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const on = () => {
      const h = parseHash(location.hash);
      if (!h) return;
      const { start, ti } = h;
      if (start === 'tulis' || start === 'kuis') {
        go('latihan', start);
        if (start === 'tulis' && ti !== undefined) dispatch({ type: 'setTi', ti, dir: 1 });
      } else go(start);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, [go]);

  const api = useMemo<AppApi>(() => ({ st, dispatch, stageRef, reduced, go, speak, toast, burst, shake, later }), [st, reduced, go, speak, toast, burst, shake, later]);

  const isTulis = st.page === 'latihan' && st.mode === 'tulis';
  const label = st.page === 'latihan' ? (isTulis ? '04 Latihan Menulis' : '06 Latihan Kuis') : SCREEN_LABEL[st.page] ?? '';

  return (
    <AppCtx.Provider value={api}>
      <IconSprite />
      <Stage scale={scale} onScale={onScale} stageRef={stageRef} label={label}>
        <img src={IMG.bg} alt="" className="sj-bg" />
        <GlobalHeader />
        {st.page === 'cover' ? <Cover /> : <FeatureFrame />}
        <Modals />
        <Toast toast={st.toast} />
      </Stage>
    </AppCtx.Provider>
  );
}
