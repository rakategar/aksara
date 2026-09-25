import type { MenuItem } from '../data/menu';
import { Icon } from './Icon';
import './MenuButton.css';

/** Tombol menu cover 128×150, bingkai kayu 5px. */
export function MenuButton({ item, onClick, animKey, delay }: { item: MenuItem; onClick: () => void; animKey: string; delay: number }) {
  return (
    <button type="button" className="menubtn fx-240" onClick={onClick} aria-label={item.label} data-anim="pop" data-anim-key={animKey} data-anim-delay={delay}>
      <span className="menubtn-face" style={{ background: `linear-gradient(180deg,${item.c1},${item.c2})` }}>
        <span className="menubtn-gloss" />
        {item.glyph && <span className="menubtn-glyph">{item.glyph}</span>}
        {item.icon && <Icon name={item.icon} size={56} className="menubtn-icon" />}
        <span className="menubtn-label">{item.label}</span>
      </span>
    </button>
  );
}
