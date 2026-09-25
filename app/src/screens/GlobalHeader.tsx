import { NavButton } from '../components/NavButton';
import { IMG } from '../data/assets';
import { useApp } from '../state/AppContext';
import './GlobalHeader.css';

/** Logo Tut Wuri (kiri atas), kartu Kemendikbudristek + Merdeka Belajar, tombol PENGATURAN. */
export function GlobalHeader() {
  const { dispatch } = useApp();
  return (
    <>
      <img src={IMG.tutwuri} alt="Tut Wuri Handayani" className="gh-tutwuri" />
      <div className="gh-card">
        <div className="gh-kemdik" role="img" aria-label="Kemendikbudristek">
          <img src={IMG.tutwuri} alt="" />
          <span>KEMENDIKBUDRISTEK</span>
        </div>
        <div className="gh-sep" />
        <div className="gh-merdeka" role="img" aria-label="Merdeka Belajar">
          <img src={IMG.merdekaIkon} alt="" className="gh-mb-ikon" />
          <img src={IMG.merdekaTeks} alt="" className="gh-mb-teks" />
        </div>
      </div>
      <NavButton variant="settings" small label="PENGATURAN" ariaLabel="Pengaturan" className="gh-settings" onClick={() => dispatch({ type: 'openModal', modal: 'settings' })} />
    </>
  );
}
