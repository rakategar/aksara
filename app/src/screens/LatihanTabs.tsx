import { Icon } from '../components/Icon';
import { useApp } from '../state/AppContext';
import './LatihanTabs.css';

/** Tab Latihan: Menulis / Tebak Aksara. */
export function LatihanTabs() {
  const { st, dispatch } = useApp();
  const tab = (mode: 'tulis' | 'kuis', icon: 'i-pencil' | 'i-help', label: string) => {
    const on = st.mode === mode;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={on}
        className="ltab sj-hit"
        style={on ? { background: 'linear-gradient(180deg,#B06A33,#7E4520)', color: '#FFF6E3' } : { background: '#FFFBF2', color: '#6B3715' }}
        onClick={() => dispatch({ type: 'setMode', mode })}
      >
        <Icon name={icon} size={22} />{label}
      </button>
    );
  };
  return (
    <div role="tablist" aria-label="Jenis latihan" className="ltabs">
      {tab('tulis', 'i-pencil', 'Menulis')}
      {tab('kuis', 'i-help', 'Tebak Aksara')}
    </div>
  );
}
