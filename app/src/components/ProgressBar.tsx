import './ProgressBar.css';

/** Baris "Soal x dari n" + progress bar (hijau = latihan, biru = evaluasi). */
export function ProgressBar({ num, total, pct, tone, children }: { num: number; total: number; pct: number; tone: 'success' | 'primary'; children?: React.ReactNode }) {
  return (
    <div className="progress-row">
      <span className="progress-label">Soal {num} dari {total}</span>
      <div className="progress" role="progressbar" aria-valuenow={num} aria-valuemin={1} aria-valuemax={total} aria-label={`Soal ${num} dari ${total}`}>
        <div className={`progress-fill progress-${tone}`} style={{ width: `${pct}%` }} />
      </div>
      {children}
    </div>
  );
}
