import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';
import './AksaraCard.css';

/**
 * Kartu aksara perkamen. Ukuran di stage: 240×330 (latihan menulis), 280×330 (modal detail),
 * 290×390 (kuis & evaluasi).
 */
export function AksaraCard({ size, top, glyph, glyphSize, bottom, onSpeak, speakLabel, className, style }: {
  size: 'write' | 'detail' | 'quiz';
  top?: ReactNode;
  glyph: ReactNode;
  /** px; default 150 (write) / 170 */
  glyphSize?: number;
  bottom?: ReactNode;
  onSpeak?: () => void;
  speakLabel?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`akcard akcard-${size} ${className ?? ''}`} style={style}>
      {onSpeak && (
        <button type="button" className="akcard-speak fx-200 fx-grow sj-hit" onClick={onSpeak} aria-label={speakLabel}>
          <Icon name="i-sound" size={26} />
        </button>
      )}
      {top}
      <span className="akcard-glyph" style={glyphSize ? { fontSize: glyphSize } : undefined}>{glyph}</span>
      {bottom}
    </div>
  );
}

/** Pill kayu berisi bacaan latin di bawah kartu. */
export const LatinPill = ({ children }: { children: ReactNode }) => <span className="akcard-pill">{children}</span>;
