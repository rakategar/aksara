import type { CSSProperties } from 'react';

const G = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <g style={{ fill: 'none', stroke: 'currentColor', strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round' }}>{children}</g>
);

/** Sprite ikon 24px (sama persis dengan <symbol id="i-*"> di prototipe). Dirender sekali di root. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="i-home" viewBox="0 0 24 24"><G w={2.4}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h5v-5.5h3v5.5h5V10" /></G></symbol>
        <symbol id="i-left" viewBox="0 0 24 24"><G w={2.8}><path d="M20 12H5" /><path d="M11 5l-7 7 7 7" /></G></symbol>
        <symbol id="i-right" viewBox="0 0 24 24"><G w={2.8}><path d="M4 12h15" /><path d="M13 5l7 7-7 7" /></G></symbol>
        <symbol id="i-sound" viewBox="0 0 24 24"><G w={2.2}><path d="M3.5 9.5H7L12.5 5v14L7 14.5H3.5z" fill="currentColor" /><path d="M16 9a4 4 0 0 1 0 6" /><path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" /></G></symbol>
        <symbol id="i-mute" viewBox="0 0 24 24"><G w={2.2}><path d="M3.5 9.5H7L12.5 5v14L7 14.5H3.5z" fill="currentColor" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></G></symbol>
        <symbol id="i-book" viewBox="0 0 24 24"><G w={2.2}><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" /><path d="M12 6.5v13" /></G></symbol>
        <symbol id="i-pencil" viewBox="0 0 24 24"><G w={2.2}><path d="M15.5 4.5l4 4L8 20H4v-4z" /><path d="M13 7l4 4" /></G></symbol>
        <symbol id="i-trophy" viewBox="0 0 24 24"><G w={2.2}><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" /><path d="M12 14v3M8.5 20.5h7M9.5 17h5v3.5h-5z" /></G></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><G w={3}><path d="M5 12.5l4.5 4.5L19 7.5" /></G></symbol>
        <symbol id="i-x" viewBox="0 0 24 24"><G w={3}><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></G></symbol>
        <symbol id="i-help" viewBox="0 0 24 24"><G w={2.4}><path d="M8.8 9.2a3.3 3.3 0 1 1 4.6 3c-.9.4-1.4 1.1-1.4 2v.6" /><circle cx="12" cy="18.6" r="1.1" fill="currentColor" stroke="none" /></G></symbol>
        <symbol id="i-game" viewBox="0 0 24 24"><G w={2.2}><path d="M7 8h10a4 4 0 0 1 4 4.5l-.6 3.5a2.5 2.5 0 0 1-4.3 1.2L14.5 15h-5l-1.6 2.2A2.5 2.5 0 0 1 3.6 16L3 12.5A4 4 0 0 1 7 8z" /><path d="M7.5 10.5v3.5M5.75 12.25h3.5" /><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="17.8" cy="13.4" r="1" fill="currentColor" stroke="none" /></G></symbol>
        <symbol id="i-clip" viewBox="0 0 24 24"><G w={2.2}><rect x="5" y="4.5" width="14" height="16.5" rx="2.5" /><path d="M9 3h6v3.2H9z" /><path d="M8.3 11.2l1.5 1.5 2.4-2.6M14.2 11.6h2.3M8.3 16.2l1.5 1.5 2.4-2.6M14.2 16.6h2.3" /></G></symbol>
        <symbol id="i-sandh" viewBox="0 0 24 24"><G w={2.2}><path d="M5 20v-6.5a3.5 3.5 0 0 1 7 0V20M12 13.5a3.5 3.5 0 0 1 7 0V20" /><path d="M9 4.5c1.5-1.5 4.5-1.5 6 0M12 4.5V8" /></G></symbol>
        <symbol id="i-gear" viewBox="0 0 24 24"><G w={2.2}><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8" /><circle cx="12" cy="12" r="6.6" /></G></symbol>
        <symbol id="i-music" viewBox="0 0 24 24"><G w={2.2}><path d="M9 18V5.5l11-2V16" /><circle cx="6.5" cy="18" r="2.6" fill="currentColor" /><circle cx="17.5" cy="16" r="2.6" fill="currentColor" /></G></symbol>
        <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L3 9.4l6.2-.9z" fill="currentColor" /></symbol>
        <symbol id="i-undo" viewBox="0 0 24 24"><G w={2.4}><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-3" /></G></symbol>
        <symbol id="i-trash" viewBox="0 0 24 24"><G w={2.4}><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" /><path d="M10 11v5M14 11v5" /></G></symbol>
        <symbol id="i-retry" viewBox="0 0 24 24"><G w={2.6}><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></G></symbol>
      </defs>
    </svg>
  );
}

export type IconName =
  | 'i-home' | 'i-left' | 'i-right' | 'i-sound' | 'i-mute' | 'i-book' | 'i-pencil' | 'i-trophy' | 'i-check'
  | 'i-x' | 'i-help' | 'i-game' | 'i-clip' | 'i-sandh' | 'i-gear' | 'i-music' | 'i-star' | 'i-undo' | 'i-trash' | 'i-retry';

export function Icon({ name, size, style, className }: { name: IconName; size: number; style?: CSSProperties; className?: string }) {
  return (
    <svg width={size} height={size} style={style} className={className} aria-hidden="true" focusable="false">
      <use href={`#${name}`} />
    </svg>
  );
}
