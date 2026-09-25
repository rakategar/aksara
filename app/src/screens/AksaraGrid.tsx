import { AKSARA } from '../data/aksara';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import './AksaraGrid.css';

/** 03 Aksara Jawa — grid 20 aksara; ketuk = bunyi + modal detail. */
export function AksaraGrid() {
  const { st, dispatch, speak } = useApp();
  const k = contentKey(st);
  return (
    <div className="akgrid" data-screen-label="03 Aksara Jawa">
      {AKSARA.map((t) => (
        <button
          key={t.l}
          type="button"
          className="aktile"
          aria-label={`Aksara ${t.l}`}
          data-anim="pop"
          data-anim-key={k}
          data-anim-delay={t.i * 25}
          onClick={() => { speak(t.l); dispatch({ type: 'showDetail', di: t.i }); }}
        >
          <span className="aktile-a" aria-hidden="true">{t.a}</span>
          <span className="aktile-l" aria-hidden="true">{t.l}</span>
        </button>
      ))}
    </div>
  );
}
