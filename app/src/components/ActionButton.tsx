import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import './ActionButton.css';

export type ActionVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'wood';

/** Tombol aksi 3D (radius 18, border 3px, bayangan 0 5px 0 <border>). */
export function ActionButton({ variant, icon, iconSize = 26, iconAfter, children, onClick, disabled, className, style, ariaPressed }: {
  variant: ActionVariant;
  icon?: IconName;
  iconSize?: number;
  /** ikon di kanan teks */
  iconAfter?: boolean;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaPressed?: boolean;
}) {
  const ic = icon && <Icon name={icon} size={iconSize} />;
  return (
    <button type="button" className={`actbtn actbtn-${variant} ${className ?? ''}`} onClick={onClick} disabled={disabled} style={style} aria-pressed={ariaPressed}>
      {!iconAfter && ic}
      {children}
      {iconAfter && ic}
    </button>
  );
}
