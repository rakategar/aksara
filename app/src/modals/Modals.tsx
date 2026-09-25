import { useCallback } from 'react';
import { AksaraCard, LatinPill } from '../components/AksaraCard';
import { ActionButton } from '../components/ActionButton';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';
import { AKSARA } from '../data/aksara';
import { IMG } from '../data/assets';
import { evalStars } from '../lib/quiz';
import { useApp } from '../state/AppContext';
import { Stars } from '../screens/Stars';
import './Modals.css';

const META = { detail: ['AKSARA', 560], exit: ['KELUAR?', 620], result: ['HASIL', 720], settings: ['PENGATURAN', 620] } as const;

/** Modal Detail aksara, Konfirmasi keluar, Pengaturan, dan Hasil evaluasi. */
export function Modals() {
  const { st, dispatch } = useApp();
  const close = useCallback(() => dispatch({ type: 'closeModal' }), [dispatch]);
  if (!st.modal) return null;
  const [title, width] = META[st.modal];
  return (
    <Modal title={title} width={width} onClose={close} escClose={st.modal !== 'result'} animKey={st.modal}>
      {st.modal === 'detail' && <Detail />}
      {st.modal === 'exit' && <Exit />}
      {st.modal === 'settings' && <Settings />}
      {st.modal === 'result' && <Result />}
    </Modal>
  );
}

function Detail() {
  const { st, dispatch, speak } = useApp();
  const det = AKSARA[st.di];
  return (
    <div className="md-detail">
      <AksaraCard size="detail" top={<span className="md-detail-L">{det.L}</span>} glyph={det.a} bottom={<LatinPill>{det.l}</LatinPill>} />
      <p className="md-detail-p">Aksara ke-{det.n} dari 20 · dibaca <b>"{det.l}"</b></p>
      <div className="md-row" style={{ gap: 14 }}>
        <ActionButton variant="primary" icon="i-sound" onClick={() => speak(det.l)}>Dengarkan</ActionButton>
        <ActionButton variant="secondary" icon="i-pencil" onClick={() => dispatch({ type: 'writeDetail' })}>Latihan Menulis</ActionButton>
      </div>
    </div>
  );
}

function Exit() {
  const { dispatch, go } = useApp();
  return (
    <div className="md-exit">
      <p className="md-exit-h">Yakin ingin keluar dari Evaluasi?</p>
      <p className="md-exit-p">Jawabanmu belum selesai dan tidak akan disimpan.</p>
      <div className="md-row" style={{ gap: 16, marginTop: 8 }}>
        <ActionButton variant="primary" className="md-btn-lg" onClick={() => dispatch({ type: 'closeModal' })}>Tetap di Sini</ActionButton>
        <ActionButton variant="danger" className="md-btn-lg" onClick={() => go('cover')}>Ya, Keluar</ActionButton>
      </div>
    </div>
  );
}

function Settings() {
  const { st, dispatch, toast } = useApp();
  const setVol = (v: number) => dispatch({ type: 'setVol', v });
  const toggleMute = () => { dispatch({ type: 'toggleMute' }); toast(st.muted ? 'Suara dinyalakan' : 'Suara dimatikan', 'info'); };
  return (
    <div className="md-settings">
      <div className="md-box md-box-col">
        <div className="md-box-row">
          <span className="md-music-ic"><Icon name="i-music" size={28} /></span>
          <div style={{ flex: 1 }}>
            <div className="md-box-h" id="bgm-label">Musik Latar</div>
            <div className="md-box-p">Gending Jawa instrumental</div>
          </div>
          <span className="md-vol" aria-hidden="true">{st.bgmVol}%</span>
        </div>
        <div className="md-box-row">
          <button type="button" className="md-step sj-hit" aria-label="Kecilkan musik" onClick={() => setVol(st.bgmVol - 10)}><Icon name="i-mute" size={24} /></button>
          <input
            type="range" min={0} max={100} step={5} value={st.bgmVol}
            aria-label="Volume musik latar" aria-valuetext={`${st.bgmVol} persen`}
            className="md-range"
            onChange={(e) => setVol(+e.target.value)}
          />
          <button type="button" className="md-step sj-hit" aria-label="Keraskan musik" onClick={() => setVol(st.bgmVol + 10)}><Icon name="i-sound" size={24} /></button>
        </div>
      </div>
      <div className="md-box md-box-mute">
        <div style={{ flex: 1 }}>
          <div className="md-box-h">Semua Suara</div>
          <div className="md-box-p">Musik latar dan bunyi aksara</div>
        </div>
        <ActionButton variant={st.muted ? 'success' : 'danger'} className="md-mute" ariaPressed={st.muted} onClick={toggleMute}>
          {st.muted ? 'Nyalakan' : 'Matikan'}
        </ActionButton>
      </div>
      <ActionButton variant="primary" className="md-btn-lg md-done" onClick={() => dispatch({ type: 'closeModal' })}>Selesai</ActionButton>
    </div>
  );
}

function Result() {
  const { st, dispatch, go } = useApp();
  const n = evalStars(st.ev.score);
  const msg = ['Ayo belajar lagi, kamu pasti bisa!', 'Ayo belajar lagi, kamu pasti bisa!', 'Bagus! Terus berlatih ya.', 'Luar biasa! Kamu hebat!'][n];
  return (
    <div className="md-result">
      <img src={IMG.ceweSimpuh} alt="" className="md-result-img" />
      <div className="md-result-body">
        <Stars n={n} size={76} gap={8} />
        <div className="md-result-cap">Nilaimu</div>
        <div className="md-result-score">{st.ev.score * 10}</div>
        <div className="md-result-msg">{msg}</div>
        <div className="md-result-sub">Benar {st.ev.score} dari 10 soal</div>
        <div className="md-row" style={{ gap: 14, marginTop: 8 }}>
          <ActionButton variant="secondary" icon="i-retry" iconSize={24} onClick={() => dispatch({ type: 'evRetry' })}>Ulangi</ActionButton>
          <ActionButton variant="primary" icon="i-home" iconSize={24} onClick={() => go('cover')}>Beranda</ActionButton>
        </div>
      </div>
    </div>
  );
}
