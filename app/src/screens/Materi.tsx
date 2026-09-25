import { ActionButton } from '../components/ActionButton';
import { Icon } from '../components/Icon';
import { CARAKAN } from '../data/carakan';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import './Materi.css';

/** 02 Materi */
export function Materi() {
  const { st, go } = useApp();
  return (
    <div className="materi" data-screen-label="02 Materi" data-anim="rise" data-anim-key={contentKey(st)} tabIndex={0} aria-label="Materi aksara Jawa">
      <h2 className="materi-h2">Sejarah Singkat Aksara Jawa</h2>
      <p className="materi-p">Aksara Jawa atau <b>Hanacaraka</b> adalah huruf tradisional untuk menulis bahasa Jawa. Aksara ini berkembang dari aksara Kawi, yang berakar dari aksara Brahmi dari India. Dahulu aksara Jawa dipakai untuk menulis naskah, surat, dan tembang di keraton. Sekarang kita masih bisa melihatnya di papan nama jalan, gapura, dan buku pelajaran.</p>
      <div className="materi-callout">
        <span className="materi-callout-ic"><Icon name="i-help" size={30} /></span>
        <div>
          <div className="materi-callout-h">Tahukah kamu?</div>
          <p>Menurut cerita rakyat, aksara Jawa berasal dari kisah <b>Aji Saka</b> dan dua abdinya yang setia, <b>Dora</b> dan <b>Sembada</b>. Kisah mereka diabadikan menjadi urutan 20 aksara: <i>ha na ca ra ka</i>.</p>
        </div>
      </div>
      <h2 className="materi-h2">Mengenal Aksara Jawa</h2>
      <p className="materi-p" style={{ marginBottom: 16 }}>Aksara Jawa ditulis dari kiri ke kanan. Setiap aksara dasar dibaca dengan bunyi vokal <b>a</b>, misalnya <span className="materi-inline-ak">ꦏ</span> dibaca <b>ka</b>. Di kelas IV, kita belajar dua bagian:</p>
      <div className="materi-cards">
        <div className="materi-card"><div className="materi-card-h" style={{ color: 'var(--sj-blue-700)' }}>Aksara Carakan</div><p>20 aksara dasar, dari <b>ha</b> sampai <b>nga</b>.</p></div>
        <div className="materi-card"><div className="materi-card-h" style={{ color: '#6A3DB8' }}>Sandhangan</div><p>Tanda yang mengubah bunyi aksara, seperti <b>wulu</b> (i) dan <b>suku</b> (u).</p></div>
      </div>
      <h3 className="materi-h3">Arti urutan Hanacaraka</h3>
      <div className="materi-rows">
        {CARAKAN.map((r) => (
          <div key={r.l} className="materi-row">
            <span className="materi-row-a" lang="jv">{r.a}</span>
            <span className="materi-row-l">{r.l}</span>
            <span className="materi-row-m">{r.m}</span>
          </div>
        ))}
      </div>
      <div className="materi-actions">
        <ActionButton variant="secondary" icon="i-home" className="hov ts materi-btn" onClick={() => go('cover')}>Kembali ke Cover</ActionButton>
        <ActionButton variant="primary" icon="i-right" iconAfter className="hov ts materi-btn" onClick={() => go('aksara')}>Lihat Aksara Jawa</ActionButton>
      </div>
    </div>
  );
}
