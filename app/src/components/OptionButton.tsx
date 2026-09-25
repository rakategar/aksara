import type { ReactNode } from 'react';
import { Icon } from './Icon';
import './OptionButton.css';

export type OptState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dim';

const STY: Record<OptState, { bg: string; bd: string; fg: string; op?: number }> = {
  idle: { bg: '#FFFBF2', bd: '#D9B77A', fg: '#3B1E0A' },
  selected: { bg: '#E3F2FE', bd: '#1E7FD8', fg: '#0E4E8F' },
  correct: { bg: '#DDF3E1', bd: '#2E9E48', fg: '#1D6B30' },
  wrong: { bg: '#FBE0DC', bd: '#D93A2E', fg: '#A8281F' },
  dim: { bg: '#FFFBF2', bd: '#D9B77A', fg: '#3B1E0A', op: 0.55 },
};

/** Opsi kuis/evaluasi (tinggi 150px). Benar/salah memakai ikon + warna. */
export function OptionButton({ state, onClick, children, dataOpt, pressed, ariaLabel }: {
  state: OptState;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  dataOpt?: number;
  pressed?: boolean;
  ariaLabel?: string;
}) {
  const s = STY[state];
  return (
    <button
      type="button"
      className="optbtn fx-200 fx-lift"
      data-opt={dataOpt}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ borderColor: s.bd, background: s.bg, color: s.fg, boxShadow: `0 6px 0 ${s.bd}`, opacity: s.op ?? 1 }}
    >
      {children}
      {state === 'correct' && <span className="optbtn-mark" style={{ background: 'var(--sj-success-500)' }}><Icon name="i-check" size={26} /></span>}
      {state === 'wrong' && <span className="optbtn-mark" style={{ background: 'var(--sj-error-500)' }}><Icon name="i-x" size={24} /></span>}
    </button>
  );
}
