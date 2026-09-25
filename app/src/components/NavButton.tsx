import { BTN_BLUE, BTN_GREY, BTN_ORANGE } from '../data/menu';
import { Icon, type IconName } from './Icon';
import './NavButton.css';

export type NavVariant = 'home' | 'back' | 'next' | 'sound' | 'mute' | 'help' | 'settings';

const V: Record<NavVariant, { icon: IconName; bg: string; sh: string; rim: string }> = {
  home: { icon: 'i-home', bg: BTN_ORANGE, sh: 'var(--sj-shadow-btn3d-orange)', rim: '5px solid var(--sj-wood-500)' },
  settings: { icon: 'i-gear', bg: BTN_ORANGE, sh: 'var(--sj-shadow-btn3d-orange)', rim: '5px solid var(--sj-wood-500)' },
  back: { icon: 'i-left', bg: BTN_BLUE, sh: 'var(--sj-shadow-btn3d-blue)', rim: 'var(--sj-border-rim)' },
  next: { icon: 'i-right', bg: BTN_BLUE, sh: 'var(--sj-shadow-btn3d-blue)', rim: 'var(--sj-border-rim)' },
  help: { icon: 'i-help', bg: BTN_BLUE, sh: 'var(--sj-shadow-btn3d-blue)', rim: 'var(--sj-border-rim)' },
  sound: { icon: 'i-sound', bg: BTN_BLUE, sh: '0 6px 0 #0E4E8F,0 10px 18px rgba(0,0,0,.3)', rim: 'var(--sj-border-rim)' },
  mute: { icon: 'i-mute', bg: BTN_GREY, sh: '0 6px 0 #4D5863,0 10px 18px rgba(0,0,0,.3)', rim: 'var(--sj-border-rim)' },
};

/** Tombol bulat 3D berlabel pill kayu (96px; `small` = 76px untuk Pengaturan). */
export function NavButton({ variant, label, onClick, small, pressed, ariaLabel, disabled, className }: {
  variant: NavVariant;
  label: string;
  onClick: () => void;
  small?: boolean;
  pressed?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}) {
  const v = V[variant];
  return (
    <button
      type="button"
      className={`navbtn fx-240 fx-grow ${small ? 'navbtn-sm' : ''} ${className ?? ''}`}
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <span className="navbtn-disc" style={{ background: v.bg, border: v.rim, boxShadow: `${v.sh},var(--sj-shadow-inner-gloss)` }}>
        <span className="navbtn-gloss" />
        <Icon name={v.icon} size={small ? 40 : 48} className="navbtn-icon" />
      </span>
      <span className="navbtn-label">{label}</span>
    </button>
  );
}
