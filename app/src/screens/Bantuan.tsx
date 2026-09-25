import { Icon } from '../components/Icon';
import { MENU, NAV_HELP } from '../data/menu';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import './Bantuan.css';

/** 09 Bantuan — tombol navigasi & menu utama (item menu bisa diklik). */
export function Bantuan() {
  const { st, go } = useApp();
  return (
    <div className="help" data-screen-label="09 Bantuan" data-anim="rise" data-anim-key={contentKey(st)}>
      <div className="help-col">
        <h2 className="help-h">Tombol Navigasi</h2>
        {NAV_HELP.map((h) => (
          <div key={h.n} className="help-item">
            <span className="help-disc" style={{ background: h.bg, boxShadow: `0 3px 0 ${h.sh}` }}><Icon name={h.icon} size={30} /></span>
            <div><div className="help-name">{h.n}</div><div className="help-desc">{h.d}</div></div>
          </div>
        ))}
      </div>
      <div className="help-col">
        <h2 className="help-h">Menu Utama</h2>
        {MENU.filter((m) => m.d).map((m) => (
          <button key={m.id} type="button" className="help-item help-link" onClick={() => go(m.id)}>
            <span className="help-tile" style={{ background: `linear-gradient(180deg,${m.c1},${m.c2})` }}>
              {m.glyph}
              {m.icon && <Icon name={m.icon} size={30} />}
            </span>
            <div><div className="help-name">{m.label}</div><div className="help-desc">{m.d}</div></div>
          </button>
        ))}
      </div>
    </div>
  );
}
