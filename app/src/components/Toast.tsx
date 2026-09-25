import type { Tone } from '../state/reducer';
import { Icon } from './Icon';
import './Toast.css';

const BG: Record<Tone, string> = {
  success: 'linear-gradient(180deg,#4CC064,#2E9E48)',
  error: 'linear-gradient(180deg,#F26B5E,#D93A2E)',
  info: 'linear-gradient(180deg,#44A6F2,#1B72C9)',
};
const ICON = { success: 'i-star', error: 'i-retry', info: 'i-sound' } as const;

/** Notifikasi singkat (2200ms), role="status". */
export function Toast({ toast }: { toast: { text: string; tone: Tone; id: string } | null }) {
  return (
    <div role="status" className="toast-live">
      {toast && (
        <div className="toast" data-anim="pop" data-anim-key={toast.id} key={toast.id}>
          <div className="toast-pill" style={{ background: BG[toast.tone] }}>
            <span className="toast-ic"><Icon name={ICON[toast.tone]} size={26} /></span>
            {toast.text}
          </div>
        </div>
      )}
    </div>
  );
}
