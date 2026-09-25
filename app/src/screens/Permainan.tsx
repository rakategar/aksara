import { ActionButton } from '../components/ActionButton';
import { Icon } from '../components/Icon';
import { AKSARA } from '../data/aksara';
import { flipCard } from '../lib/quiz';
import { useApp } from '../state/AppContext';
import './Permainan.css';

/** 07 Permainan — memori 12 kartu (6 pasang aksara ↔ latin), hitung langkah. */
export function Permainan() {
  const { st, dispatch, speak, toast, burst, later } = useApp();
  const g = st.g;

  const tap = (id: number, el: HTMLElement) => {
    const r = flipCard(g, id);
    if (!r) return;
    dispatch({ type: 'game', g: r.g });
    if (r.kind === 'match') {
      burst(el); speak(AKSARA[r.pair!].l);
      if (r.g.matched.length === 12) later(() => toast(`Hebat! Selesai dalam ${r.g.moves} langkah`, 'success'), 400);
    } else if (r.kind === 'miss') later(() => dispatch({ type: 'gameHide' }), 950);
  };

  return (
    <div className="game" data-screen-label="07 Permainan">
      <div className="game-head">
        <span className="game-title">Cocokkan aksara dengan bacaannya!</span>
        <span className="game-moves" aria-live="polite">Langkah: {g.moves}</span>
        <ActionButton variant="secondary" icon="i-retry" iconSize={22} className="game-reset" onClick={() => dispatch({ type: 'gameReset' })}>Main Lagi</ActionButton>
      </div>
      <div className="game-grid">
        {g.cards.map((c) => {
          const done = g.matched.includes(c.id), open = g.open.includes(c.id), face = done || open;
          const sty = done ? { bg: '#DDF3E1', bd: '#2E9E48', sh: '#2E9E48' }
            : open ? { bg: '#FFFBF2', bd: '#1E7FD8', sh: '#0E4E8F' }
            : { bg: 'linear-gradient(180deg,#B06A33,#7E4520)', bd: '#4A230C', sh: '#4A230C' };
          const text = c.k === 'a' ? AKSARA[c.p].a : AKSARA[c.p].l;
          return (
            <button
              key={c.id}
              type="button"
              className="mcard"
              aria-label={face ? `Kartu ${AKSARA[c.p].l}` : 'Kartu tertutup'}
              data-anim="pop"
              data-anim-key={`${g.round}-${c.id}-${face ? 1 : 0}`}
              style={{ borderColor: sty.bd, background: sty.bg, boxShadow: `0 6px 0 ${sty.sh}` }}
              onClick={(e) => tap(c.id, e.currentTarget)}
            >
              {!face && <span className="mcard-back"><Icon name="i-help" size={40} /></span>}
              {face && c.k === 'a' && <span className="mcard-a">{text}</span>}
              {face && c.k === 'l' && <span className="mcard-l">{text}</span>}
              {done && <span className="mcard-done"><Icon name="i-check" size={20} /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
