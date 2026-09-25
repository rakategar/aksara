import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';

// Font di-host sendiri (offline): Fredoka 500–700, Nunito 400–800, Noto Sans Javanese 400–700
import '@fontsource/fredoka/500.css';
import '@fontsource/fredoka/600.css';
import '@fontsource/fredoka/700.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/noto-sans-javanese/400.css';
import '@fontsource/noto-sans-javanese/700.css';

import './styles/tokens.css';
import './styles/global.css';
import App from './App';
import { IMG } from './data/assets';

registerSW({ immediate: true });

/** Tunggu semua gambar & font siap sebelum aplikasi tampil (hindari gambar muncul bertahap di internet lambat). */
function preload(): Promise<void> {
  const fill = document.getElementById('sj-fill');
  const pct = document.getElementById('sj-pct');
  const loader = document.getElementById('sj-loader');
  const img = (src: string) => new Promise<void>((ok) => {
    const i = new Image();
    i.onload = () => (i.decode ? i.decode().catch(() => {}) : Promise.resolve()).then(() => ok());
    i.onerror = () => ok();
    i.src = src;
  });
  const fonts = document.fonts
    ? ['500 1em Fredoka', '600 1em Fredoka', '700 1em Fredoka', '400 1em Nunito', '600 1em Nunito', '700 1em Nunito',
       '800 1em Nunito', '400 1em "Noto Sans Javanese"', '700 1em "Noto Sans Javanese"']
        .map((f) => document.fonts.load(f, f.includes('Javanese') ? '\uA9B2' : 'Aa').then(() => {}, () => {}))
    : [];
  const jobs = [...Object.values(IMG).map(img), ...fonts];
  let n = 0;
  const tick = () => {
    const v = Math.round((++n / jobs.length) * 100);
    if (fill) fill.style.width = v + '%';
    if (pct) pct.textContent = `Memuat… ${v}%`;
    loader?.setAttribute('aria-valuenow', String(v));
  };
  const all = Promise.all(jobs.map((j) => j.then(tick)));
  const timeout = new Promise<void>((ok) => setTimeout(ok, 30000)); // jangan pernah macet selamanya
  return Promise.race([all.then(() => {}), timeout]);
}

preload().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  const loader = document.getElementById('sj-loader');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    loader?.classList.add('done');
    setTimeout(() => loader?.remove(), 500);
  }));
});
