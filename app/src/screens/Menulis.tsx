import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AksaraCard, LatinPill } from '../components/AksaraCard';
import { ActionButton } from '../components/ActionButton';
import { WoodSign } from '../components/WoodSign';
import { AKSARA } from '../data/aksara';
import { PENS } from '../data/menu';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import './Menulis.css';

type Stroke = { w: number; p: [number, number][] };

/** 04 Latihan Menulis — kanvas pointer events 2× (1348×868), urungkan, hapus, ketebalan, jiplak. */
export function Menulis() {
  const { st, dispatch, speak } = useApp();
  const cur = AKSARA[st.ti];
  const cv = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const drawing = useRef<Stroke | null>(null);
  const [count, setCount] = useState(0);
  const penW = PENS.find((x) => x.id === st.pen)!.w;

  const redraw = useCallback(() => {
    const c = cv.current;
    if (!c) return;
    const x = c.getContext('2d')!;
    x.clearRect(0, 0, c.width, c.height);
    x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = '#3B1E0A';
    for (const s of strokes.current) {
      x.lineWidth = s.w;
      x.beginPath();
      s.p.forEach(([a, b], k) => (k ? x.lineTo(a, b) : x.moveTo(a, b)));
      if (s.p.length === 1) x.lineTo(s.p[0][0] + 0.1, s.p[0][1]);
      x.stroke();
    }
  }, []);

  // kanvas dikosongkan tiap ganti aksara
  useLayoutEffect(() => { strokes.current = []; drawing.current = null; setCount(0); redraw(); }, [st.ti, redraw]);
  useEffect(() => { document.fonts?.ready.then(redraw); }, [redraw]);

  const pt = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const c = e.currentTarget, r = c.getBoundingClientRect();
    return [((e.clientX - r.left) * c.width) / r.width, ((e.clientY - r.top) * c.height) / r.height];
  };
  const pDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button > 0) return;
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* */ }
    drawing.current = { w: penW, p: [pt(e)] };
    strokes.current.push(drawing.current);
    redraw();
    if (count === 0) setCount(strokes.current.length);
  };
  const pMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    // pakai titik-titik perantara (stylus/sentuh) agar garis halus
    const evs = e.nativeEvent.getCoalescedEvents?.() ?? [];
    if (evs.length > 1) {
      const c = e.currentTarget, r = c.getBoundingClientRect();
      for (const ce of evs) drawing.current.p.push([((ce.clientX - r.left) * c.width) / r.width, ((ce.clientY - r.top) * c.height) / r.height]);
    } else drawing.current.p.push(pt(e));
    redraw();
  };
  const pUp = () => { if (drawing.current) { drawing.current = null; setCount(strokes.current.length); } };
  const undo = () => { strokes.current.pop(); redraw(); setCount(strokes.current.length); };
  const clear = () => { strokes.current = []; redraw(); setCount(0); };

  const empty = count === 0;
  return (
    <div className="tulis" data-screen-label="04 Latihan Menulis" data-anim="slide" data-anim-key={contentKey(st)}>
      <WoodSign variant="label" text={cur.L} className="tulis-label" />
      <AksaraCard size="write" className="tulis-card" glyph={cur.a} bottom={<LatinPill>{cur.l}</LatinPill>} onSpeak={() => speak(cur.l)} speakLabel={`Dengarkan bunyi ${cur.l}`} />
      <svg width="60" height="60" viewBox="0 0 24 24" aria-hidden="true" className="tulis-arrow"><path d="M3 9h9V4.5l9 7.5-9 7.5V15H3z" fill="#FFB52E" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
      <div className="tulis-canvas-wrap">
        <div className="tulis-board">
          <div className="tulis-guide" style={{ top: '28%' }} />
          <div className="tulis-guide" style={{ top: '72%' }} />
          {st.trace && <div aria-hidden="true" className="tulis-trace">{cur.a}</div>}
          <canvas
            ref={cv}
            width={1348}
            height={868}
            aria-label={`Kanvas menulis aksara ${cur.l}`}
            onPointerDown={pDown}
            onPointerMove={pMove}
            onPointerUp={pUp}
            onPointerCancel={pUp}
            onPointerLeave={pUp}
          />
          {empty && <div className="tulis-hint">Tulis aksara <b>{cur.l}</b> di sini dengan jari atau mouse</div>}
        </div>
        <div className="tulis-tools">
          <ActionButton variant="wood" icon="i-undo" iconSize={24} className="press tool" disabled={empty} style={{ opacity: empty ? 0.45 : 1 }} onClick={undo}>Urungkan</ActionButton>
          <ActionButton variant="danger" icon="i-trash" iconSize={24} className="press tool tool-danger" disabled={empty} style={{ opacity: empty ? 0.45 : 1 }} onClick={clear}>Hapus</ActionButton>
          <div role="radiogroup" aria-label="Ketebalan" className="tulis-pens">
            <span>Ketebalan</span>
            {PENS.map((x) => {
              const on = st.pen === x.id;
              return (
                <button key={x.id} type="button" role="radio" aria-checked={on} aria-label={x.id} className="tulis-pen sj-hit" style={{ borderColor: on ? '#1E7FD8' : '#EED7A8', background: on ? '#E3F2FE' : '#fff' }} onClick={() => dispatch({ type: 'setPen', pen: x.id })}>
                  <span style={{ width: x.d, height: x.d }} />
                </button>
              );
            })}
          </div>
          <button type="button" aria-pressed={st.trace} className="tulis-trace-btn" style={{ background: st.trace ? '#1E7FD8' : '#FFFBF2', color: st.trace ? '#fff' : '#0E4E8F' }} onClick={() => dispatch({ type: 'toggleTrace' })}>Jiplak</button>
        </div>
      </div>
    </div>
  );
}
