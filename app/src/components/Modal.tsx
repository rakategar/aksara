import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';
import { WoodSign } from './WoodSign';
import './Modal.css';

/**
 * Modal perkamen dengan papan judul & tombol tutup merah.
 * role=dialog, aria-modal, fokus terkunci di dalam, Esc menutup (kecuali `escClose=false`).
 */
export function Modal({ title, width, onClose, escClose = true, animKey, children }: {
  title: string;
  width: number;
  onClose: () => void;
  escClose?: boolean;
  animKey: string;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const el = box.current;
    const focusables = () => Array.from(el?.querySelectorAll<HTMLElement>('button:not([disabled]),input,[tabindex]:not([tabindex="-1"])') ?? []);
    // fokus ke kontrol pertama selain tombol tutup
    const f = focusables();
    (f[1] ?? f[0])?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && escClose) { e.preventDefault(); onClose(); }
      if (e.key === 'Tab') {
        const list = focusables();
        if (!list.length) return;
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!el?.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (prev && document.contains(prev)) prev.focus({ preventScroll: true });
    };
  }, [onClose, escClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={box}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="modal-box"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        data-anim="pop"
        data-anim-key={animKey}
      >
        <div className="modal-stitch" />
        <WoodSign variant="modal" text={title} className="modal-title" />
        <button type="button" className="modal-close sj-hit" onClick={onClose} aria-label="Tutup">
          <Icon name="i-x" size={28} />
        </button>
        {children}
      </div>
    </div>
  );
}
