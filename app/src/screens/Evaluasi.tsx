import { AksaraCard } from '../components/AksaraCard';
import { ActionButton } from '../components/ActionButton';
import { OptionButton, type OptState } from '../components/OptionButton';
import { ProgressBar } from '../components/ProgressBar';
import { AKSARA } from '../data/aksara';
import { useApp } from '../state/AppContext';
import { contentKey } from '../state/contentKey';
import './Quiz.css';

/** 08 Evaluasi — 10 soal campur; Pilih → Cek Jawaban → Soal Berikutnya → Hasil. */
export function Evaluasi() {
  const { st, dispatch, stageRef, speak, burst, shake, later } = useApp();
  const ev = st.ev;
  const q = ev.qs[ev.i];
  const isA2L = q.type === 'a2l';
  const correct = ev.checked && ev.sel === q.t;
  const last = ev.i >= 9;

  const action = () => {
    if (!ev.checked) {
      if (ev.sel === null) return;
      const el = stageRef.current?.querySelector(`[data-opt="${ev.sel}"]`) ?? null;
      if (ev.sel === q.t) { burst(el); speak(AKSARA[q.t].l); } else shake(el);
      dispatch({ type: 'evCheck' });
    } else if (last) {
      dispatch({ type: 'evResult' });
      later(() => burst(stageRef.current?.querySelector('[role=dialog]') ?? null), 300);
    } else dispatch({ type: 'evNext' });
  };

  const optState = (o: number): OptState => {
    if (!ev.checked) return ev.sel === o ? 'selected' : 'idle';
    if (o === q.t) return 'correct';
    if (o === ev.sel) return 'wrong';
    return 'dim';
  };

  const fb = !ev.checked
    ? { bg: '#F3E2BE', fg: '#6B4A2E', text: ev.sel === null ? 'Pilih salah satu jawaban.' : 'Sudah yakin? Tekan Cek Jawaban.' }
    : correct ? { bg: '#DDF3E1', fg: '#1D6B30', text: 'Benar! Hebat sekali.' } : { bg: '#FBE0DC', fg: '#A8281F', text: `Kurang tepat. Jawabannya "${AKSARA[q.t].l}".` };

  const noSel = !ev.checked && ev.sel === null;

  return (
    <div className="quiz" data-screen-label="08 Evaluasi" data-anim="slide" data-anim-key={contentKey(st)}>
      <ProgressBar num={ev.i + 1} total={10} pct={((ev.i + (ev.checked ? 1 : 0)) / 10) * 100} tone="primary" />
      <AksaraCard
        size="quiz"
        className="quiz-card"
        style={{ textAlign: 'center' }}
        top={<span className="quiz-q" style={{ lineHeight: 1.25 }}>{isA2L ? 'Aksara apakah ini?' : 'Manakah aksara untuk bacaan ini?'}</span>}
        glyph={isA2L ? AKSARA[q.t].a : <span className="ev-stim-l">{AKSARA[q.t].l}</span>}
        bottom={<span className="ev-hint">Pilih satu jawaban, lalu tekan <b>Cek Jawaban</b></span>}
      />
      <div className="quiz-opts">
        {q.opts.map((o) => (
          <OptionButton key={o} dataOpt={o} state={optState(o)} pressed={ev.sel === o} ariaLabel={isA2L ? undefined : `Aksara ${AKSARA[o].l}`} onClick={() => dispatch({ type: 'evSelect', o })}>
            {isA2L ? <span className="ev-opt-l">{AKSARA[o].l}</span> : <span className="ev-opt-a">{AKSARA[o].a}</span>}
          </OptionButton>
        ))}
      </div>
      <div className="ev-bar">
        <div className="ev-fb" role="status" style={{ background: fb.bg, color: fb.fg }}>{fb.text}</div>
        <ActionButton
          variant={ev.checked ? 'secondary' : 'primary'}
          icon={!ev.checked ? 'i-check' : last ? 'i-trophy' : 'i-right'}
          iconSize={24}
          iconAfter
          className="press ts ev-btn"
          disabled={noSel}
          style={{ opacity: noSel ? 0.5 : 1 }}
          onClick={action}
        >
          {!ev.checked ? 'Cek Jawaban' : last ? 'Lihat Hasil' : 'Soal Berikutnya'}
        </ActionButton>
      </div>
    </div>
  );
}
