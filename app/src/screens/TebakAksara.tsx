import { AksaraCard, LatinPill } from '../components/AksaraCard';
import { ActionButton } from '../components/ActionButton';
import { Icon } from '../components/Icon';
import { OptionButton } from '../components/OptionButton';
import { ProgressBar } from '../components/ProgressBar';
import { AKSARA } from '../data/aksara';
import { kuisStars } from '../lib/quiz';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import { Stars } from './Stars';
import './Quiz.css';

/** 06 Latihan — Tebak Aksara: 5 soal, jawab langsung, salah = boleh coba lagi. */
export function TebakAksara() {
  const { st, dispatch, go, speak, toast, burst, shake, later } = useApp();
  const kq = st.kq;
  const q = kq.qs[Math.min(kq.i, 4)];
  const answered = kq.picked !== null;

  const pick = (o: number, el: HTMLElement) => {
    if (answered) return;
    if (o === q.t) {
      burst(el); speak(AKSARA[o].l); toast('Hebat! Jawabanmu benar', 'success');
      dispatch({ type: 'kqAnswer', o });
      later(() => dispatch({ type: 'kqAdvance' }), 1300);
    } else {
      shake(el); toast('Belum tepat, coba lagi ya!', 'error');
      dispatch({ type: 'kqAnswer', o });
    }
  };

  const fb = answered
    ? { bg: '#DDF3E1', fg: '#1D6B30', text: `Benar! Ini aksara "${AKSARA[q.t].l}".` }
    : kq.wrong.length
      ? { bg: '#FBE0DC', fg: '#A8281F', text: 'Coba lagi! Perhatikan bentuk aksaranya.' }
      : { bg: '#F3E2BE', fg: '#6B4A2E', text: 'Ketuk bacaan yang cocok dengan aksara di kiri.' };

  return (
    <div className="quiz" data-screen-label="06 Latihan Kuis" data-anim="slide" data-anim-key={contentKey(st)}>
      {!kq.done && (
        <>
          <ProgressBar num={kq.i + 1} total={5} pct={((kq.i + (answered ? 1 : 0)) / 5) * 100} tone="success">
            <span className="quiz-score" aria-label={`Skor ${kq.score}`}><Icon name="i-star" size={28} style={{ color: '#F5B400' }} />{kq.score}</span>
          </ProgressBar>
          <AksaraCard
            size="quiz"
            className="quiz-card"
            top={<span className="quiz-q">Aksara apakah ini?</span>}
            glyph={AKSARA[q.t].a}
            bottom={<LatinPill>{answered ? AKSARA[q.t].l : '?'}</LatinPill>}
          />
          <div className="quiz-opts">
            {q.opts.map((o) => (
              <OptionButton key={o} state={kq.picked === o ? 'correct' : kq.wrong.includes(o) ? 'wrong' : 'idle'} onClick={(e) => pick(o, e.currentTarget)}>
                {AKSARA[o].l}
              </OptionButton>
            ))}
          </div>
          <div className="quiz-fb" role="status" style={{ background: fb.bg, color: fb.fg }}>{fb.text}</div>
        </>
      )}
      {kq.done && (
        <div className="quiz-done">
          <Stars n={kuisStars(kq.score)} size={84} gap={10} />
          <div className="quiz-done-h">Latihan selesai!</div>
          <div className="quiz-done-p">Kamu menjawab benar <b>{kq.score} dari 5</b> soal pada percobaan pertama.</div>
          <div className="quiz-done-actions">
            <ActionButton variant="secondary" icon="i-retry" className="quiz-done-btn" onClick={() => dispatch({ type: 'kqReset' })}>Coba Lagi</ActionButton>
            <ActionButton variant="primary" icon="i-right" iconAfter className="quiz-done-btn" onClick={() => go('evaluasi')}>Lanjut ke Evaluasi</ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
