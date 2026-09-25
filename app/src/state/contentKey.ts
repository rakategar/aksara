import type { State } from './reducer';

/** Kunci animasi isi panel (setara contentKey prototipe). */
export const contentKey = (st: State) => [st.page, st.mode, st.ti, st.kq.i, st.kq.done, st.ev.i].join('-');
