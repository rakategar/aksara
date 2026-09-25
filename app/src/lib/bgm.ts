import { BGM_SRC } from '../data/assets';

/** iOS Safari hanya mengizinkan play() dari gesture tertentu, jadi dengarkan beberapa jenis. */
const UNLOCK_EVENTS = ['pointerdown', 'touchend', 'click', 'keydown'] as const;

/**
 * Musik latar (port initBgm/syncBgm prototipe). Diputar berulang; baru bisa mulai setelah interaksi
 * pertama karena kebijakan autoplay browser.
 */
export class Bgm {
  private a = new Audio(BGM_SRC);
  private started = false;
  private vol = 0;
  private unlock: (() => void) | null = null;

  constructor() {
    this.a.loop = true;
    this.a.preload = 'auto';
    this.unlock = () => this.sync(true);
    for (const ev of UNLOCK_EVENTS) window.addEventListener(ev, this.unlock);
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  /** v = 0..1 (0 = senyap) */
  set(v: number, tryPlay = false) {
    this.vol = v;
    this.sync(tryPlay);
  }

  private onVisibility = () => {
    if (document.hidden) this.a.pause();
    else this.sync();
  };

  private sync(tryPlay = false) {
    const a = this.a;
    a.volume = this.vol;
    if (this.vol === 0) { if (!a.paused) a.pause(); return; }
    if (document.hidden) return;
    if (a.paused && (tryPlay || this.started)) {
      a.play().then(() => {
        this.started = true;
        this.removeUnlock();
      }).catch(() => {});
    }
  }

  private removeUnlock() {
    if (!this.unlock) return;
    for (const ev of UNLOCK_EVENTS) window.removeEventListener(ev, this.unlock);
    this.unlock = null;
  }

  dispose() {
    this.a.pause();
    this.removeUnlock();
    document.removeEventListener('visibilitychange', this.onVisibility);
  }
}
