import type { CSSProperties, ReactNode } from 'react';
import { IMG } from '../data/assets';
import './WoodSign.css';

type Variant = 'title' | 'label' | 'indicator' | 'modal';
type AnimProps = { 'data-anim'?: string; 'data-anim-key'?: string; 'data-anim-delay'?: number };

/**
 * Papan kayu. `school` = aset bertulisan "SDN KENDANGSARI II" (papan_menu).
 * Varian lain = papan.png kosong + teks live (area teks top 26% / bottom 16%).
 */
export function WoodSign(props: { variant: 'school'; className?: string; style?: CSSProperties } & AnimProps): ReactNode;
export function WoodSign(props: { variant: Variant; text: ReactNode; heading?: boolean; className?: string; style?: CSSProperties; ariaLive?: boolean } & AnimProps): ReactNode;
export function WoodSign(p: { variant: 'school' | Variant; text?: ReactNode; heading?: boolean; className?: string; style?: CSSProperties; ariaLive?: boolean } & AnimProps) {
  const { variant, text, heading, className, style, ariaLive, ...anim } = p;
  if (variant === 'school') {
    return <img src={IMG.papanMenu} alt="SDN Kendangsari II" className={`ws-school ${className ?? ''}`} style={style} {...anim} />;
  }
  const Tag = heading ? 'h1' : 'div';
  return (
    <div className={`ws ws-${variant} ${className ?? ''}`} style={style} aria-live={ariaLive ? 'polite' : undefined} {...anim}>
      <img src={IMG.papan} alt="" />
      <Tag className="ws-text">{text}</Tag>
    </div>
  );
}
