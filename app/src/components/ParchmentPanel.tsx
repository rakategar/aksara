import type { CSSProperties, ReactNode } from 'react';
import './ParchmentPanel.css';

/** Panel perkamen: border 6px parchment-300, radius 44, garis jahit putus-putus inset 12px. */
export function ParchmentPanel({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`parchment ${className ?? ''}`} style={style}>
      <div className="parchment-stitch" />
      {children}
    </div>
  );
}
