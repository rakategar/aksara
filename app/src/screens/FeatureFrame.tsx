import { NavButton } from '../components/NavButton';
import { ParchmentPanel } from '../components/ParchmentPanel';
import { WoodSign } from '../components/WoodSign';
import { IMG } from '../data/assets';
import { TITLES } from '../data/menu';
import { useApp } from '../state/AppContext';
import { evBusy } from '../state/reducer';
import { Materi } from './Materi';
import { AksaraGrid } from './AksaraGrid';
import { LatihanTabs } from './LatihanTabs';
import { Menulis } from './Menulis';
import { TebakAksara } from './TebakAksara';
import { Sandhangan } from './Sandhangan';
import { Permainan } from './Permainan';
import { Evaluasi } from './Evaluasi';
import { Bantuan } from './Bantuan';
import './FeatureFrame.css';

/** Kerangka semua halaman fitur: papan sekolah, panel perkamen, papan judul, karakter, navigasi, indikator. */
export function FeatureFrame() {
  const { st, dispatch, go, toast } = useApp();
  const p = st.page;
  const isTulis = p === 'latihan' && st.mode === 'tulis';
  const isKuis = p === 'latihan' && st.mode === 'kuis';
  const { kq, ev, g } = st;

  const indicator = isTulis ? `${st.ti + 1} / 20`
    : isKuis ? (kq.done ? null : `${kq.i + 1} / 5`)
    : p === 'evaluasi' ? `${ev.i + 1} / 10`
    : p === 'permainan' ? `${g.matched.length / 2} / 6`
    : null;

  const goHome = () => (evBusy(st) ? dispatch({ type: 'openModal', modal: 'exit' }) : go('cover'));
  const goBack = () => {
    if (isTulis && st.ti > 0) return dispatch({ type: 'setTi', ti: st.ti - 1, dir: -1 });
    goHome();
  };
  const goNext = () => {
    if (p === 'materi') return go('aksara');
    if (isTulis) {
      if (st.ti < 19) dispatch({ type: 'setTi', ti: st.ti + 1, dir: 1 });
      else toast('Hebat! 20 aksara sudah kamu tulis', 'success');
    }
  };
  const toggleMute = () => {
    dispatch({ type: 'toggleMute' });
    toast(st.muted ? 'Suara dinyalakan' : 'Suara dimatikan', 'info');
  };

  return (
    <div className="feature">
      <WoodSign variant="school" className="feature-school" />
      <ParchmentPanel className="feature-panel">
        <div className="feature-content">
          {p === 'materi' && <Materi />}
          {p === 'aksara' && <AksaraGrid />}
          {p === 'latihan' && <LatihanTabs />}
          {isTulis && <Menulis />}
          {isKuis && <TebakAksara />}
          {p === 'sandhangan' && <Sandhangan />}
          {p === 'permainan' && <Permainan />}
          {p === 'evaluasi' && <Evaluasi />}
          {p === 'bantuan' && <Bantuan />}
        </div>
      </ParchmentPanel>
      <WoodSign variant="title" heading text={TITLES[p] ?? ''} className="feature-title" data-anim="swing" data-anim-key={p} />
      <img src={IMG.cowoFull} alt="" className="feature-char-l" data-anim="bob" data-anim-key="f1" />
      <img src={IMG.ceweFull} alt="" className="feature-char-r" data-anim="bob" data-anim-key="f2" data-anim-delay={900} />
      <nav aria-label="Navigasi" className="feature-nav-l">
        <NavButton variant="home" label="BERANDA" onClick={goHome} />
        <NavButton variant="back" label="KEMBALI" onClick={goBack} />
      </nav>
      <nav aria-label="Navigasi kanan" className="feature-nav-r">
        {(isTulis || p === 'materi') && <NavButton variant="next" label="SELANJUTNYA" onClick={goNext} />}
        <NavButton variant={st.muted ? 'mute' : 'sound'} label={st.muted ? 'SENYAP' : 'SUARA'} pressed={st.muted} onClick={toggleMute} />
      </nav>
      {indicator && <WoodSign variant="indicator" text={indicator} ariaLive className="feature-indicator" />}
    </div>
  );
}
