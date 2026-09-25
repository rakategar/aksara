import { SANDHANGAN } from '../data/sandhangan';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import './Sandhangan.css';

/** 05 Sandhangan — 10 kartu; ketuk = bunyi contoh kata. */
export function Sandhangan() {
  const { st, speak } = useApp();
  const k = contentKey(st);
  return (
    <div className="sandh" data-screen-label="05 Sandhangan">
      {SANDHANGAN.map((s, i) => (
        <button key={s.n} type="button" className="sandh-card" aria-label={`Sandhangan ${s.n}, contoh ${s.wl}`} data-anim="pop" data-anim-key={k} data-anim-delay={i * 40} onClick={() => speak(s.wl)}>
          <span className="sandh-name">{s.n}</span>
          <span className="sandh-glyph">{s.s}</span>
          <span className="sandh-ex">ka → <b>{s.sl}</b> · bunyi {s.b}</span>
          <span className="sandh-word"><span className="sandh-word-a">{s.w}</span><span className="sandh-word-l">{s.wl}</span></span>
        </button>
      ))}
    </div>
  );
}
