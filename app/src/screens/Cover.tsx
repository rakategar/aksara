import { MenuButton } from '../components/MenuButton';
import { WoodSign } from '../components/WoodSign';
import { IMG } from '../data/assets';
import { LOGO, MENU } from '../data/menu';
import { useApp } from '../state/AppContext';
import './Cover.css';

/** 01 Cover / Beranda */
export function Cover() {
  const { st, dispatch, go } = useApp();
  const k = `i${st.intro}`;
  return (
    <div className="cover" data-screen-label="01 Cover">
      <WoodSign variant="school" className="cover-school" data-anim="swing" data-anim-key={k} />
      <div className="cover-subtitle" data-anim="pop" data-anim-key={k} data-anim-delay={150}>Media Pembelajaran</div>
      <h1 className="cover-logo" aria-label="SIAKJADA">
        {LOGO.map(([t, c, r], i) => (
          <span key={i} aria-hidden="true" data-anim="logo" data-anim-key={k} data-anim-delay={200 + i * 70} style={{ color: c, transform: `rotate(${r}deg)` }}>{t}</span>
        ))}
      </h1>
      <img src={IMG.pita} alt="Sinau Aksara Jawa dengan Mudah" className="cover-pita" data-anim="pop" data-anim-key={k} data-anim-delay={700} />
      <img src={IMG.badge} alt="Kelas IV" className="cover-badge" data-anim="pop" data-anim-key={k} data-anim-delay={850} />
      <img src={IMG.cowoBerdiri} alt="" className="cover-char-l" data-anim="bob" data-anim-key="c1" />
      <img src={IMG.ceweFull} alt="" className="cover-char-r" data-anim="bob" data-anim-key="c2" data-anim-delay={900} />
      <nav aria-label="Menu utama" className="cover-menu">
        {MENU.map((m, i) => (
          <MenuButton key={m.id} item={m} animKey={k} delay={1000 + i * 60} onClick={() => (m.id === 'cover' ? dispatch({ type: 'replayIntro' }) : go(m.id))} />
        ))}
      </nav>
    </div>
  );
}
