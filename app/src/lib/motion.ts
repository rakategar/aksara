export const EASE_BOUNCE = 'cubic-bezier(.34,1.56,.64,1)';
export const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

type AnimEl = HTMLElement & { _sjKey?: string; _sjA?: Animation | null };

/**
 * Port langsung runAnims() prototipe: setiap elemen ber-[data-anim] dianimasikan ulang saat
 * data-anim-key-nya berubah. Jenis: bob, swing, pop, logo, rise, slide.
 */
export function runAnims(root: HTMLElement | null, dir: number, reduced: boolean) {
  if (!root) return;
  root.querySelectorAll<AnimEl>('[data-anim]').forEach((el) => {
    const key = el.getAttribute('data-anim-key') || '1';
    if (el._sjKey === key) return;
    el._sjKey = key;
    if (el._sjA) { el._sjA.cancel(); el._sjA = null; }
    if (reduced || !el.animate) return;
    const t = el.getAttribute('data-anim');
    const d = +(el.getAttribute('data-anim-delay') || 0);
    const A: Record<string, [Keyframe[], KeyframeAnimationOptions]> = {
      bob: [[{ transform: 'translateY(0)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(0)' }], { duration: 3200, iterations: Infinity, easing: 'ease-in-out', delay: d }],
      swing: [[{ transform: 'rotate(-5deg)' }, { transform: 'rotate(3.5deg)' }, { transform: 'rotate(-1.5deg)' }, { transform: 'rotate(0)' }], { duration: 1400, easing: 'ease-out', delay: d }],
      pop: [[{ transform: 'scale(.6)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: 0.7 }, { transform: 'scale(1)', opacity: 1 }], { duration: 420, easing: EASE_BOUNCE, delay: d, fill: 'backwards' }],
      logo: [[{ transform: 'translateY(-140px) scale(.4)', opacity: 0 }, { transform: 'translateY(0) scale(1.12)', opacity: 1, offset: 0.6 }, { transform: 'scale(.95)', offset: 0.8 }, { transform: 'scale(1)', opacity: 1 }], { duration: 800, easing: EASE_OUT, delay: d, fill: 'backwards' }],
      rise: [[{ transform: 'translateY(24px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 360, easing: EASE_OUT }],
      slide: [[{ transform: `translateX(${80 * dir}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 360, easing: EASE_OUT }],
    };
    const spec = t ? A[t] : undefined;
    if (spec) el._sjA = el.animate(spec[0], spec[1]);
  });
}

/** Goyang saat jawaban salah. */
export function shake(el: Element | null, reduced: boolean) {
  if (!el || reduced || !(el as HTMLElement).animate) return;
  (el as HTMLElement).animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(-12px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(-7px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
    { duration: 420, easing: 'ease-in-out' },
  );
}

const STAR = (c: string, sz: number) =>
  `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L3 9.4l6.2-.9z" fill="${c}" stroke="#fff" stroke-width="1.5"/></svg>`;

/** 14 partikel bintang + confetti dari tengah elemen (koordinat stage). */
export function burst(stage: HTMLElement | null, el: Element | null, scale: number, reduced: boolean) {
  if (!el || !stage || reduced) return;
  const r = el.getBoundingClientRect(), sr = stage.getBoundingClientRect(), k = scale || 1;
  const cx = (r.left + r.width / 2 - sr.left) / k, cy = (r.top + r.height / 2 - sr.top) / k;
  const cols = ['#FFD23F', '#F29A17', '#E0457B', '#2B92E8', '#3FA34D'];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('div'), star = i % 2 === 0, sz = star ? 30 : 14, c = cols[i % cols.length];
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = star ? STAR(c, sz) : '';
    s.style.cssText = `position:absolute;left:${cx - sz / 2}px;top:${cy - sz / 2}px;width:${sz}px;height:${sz}px;z-index:80;pointer-events:none;${star ? '' : `border-radius:3px;background:${c}`}`;
    stage.appendChild(s);
    const ang = (i / 14) * Math.PI * 2 + Math.random() * 0.4, dist = 110 + Math.random() * 90;
    const a = s.animate(
      [{ transform: 'translate(0,0) scale(.3) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) scale(1) rotate(${200 + Math.random() * 160}deg)`, opacity: 0 }],
      { duration: 800 + Math.random() * 300, easing: EASE_OUT },
    );
    a.onfinish = () => s.remove();
  }
}
