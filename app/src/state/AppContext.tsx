import { createContext, useContext, type Dispatch, type RefObject } from 'react';
import type { PageId } from '../data/menu';
import type { Action, Mode, State, Tone } from './reducer';

export interface AppApi {
  st: State;
  dispatch: Dispatch<Action>;
  stageRef: RefObject<HTMLDivElement | null>;
  reduced: boolean;
  go: (page: PageId, mode?: Mode) => void;
  /** bunyikan teks (rekaman bila ada, lalu TTS). Diam bila senyap. */
  speak: (text: string) => void;
  toast: (text: string, tone: Tone) => void;
  burst: (el: Element | null) => void;
  shake: (el: Element | null) => void;
  /** setTimeout yang dibersihkan saat unmount */
  later: (fn: () => void, ms: number) => void;
}

export const AppCtx = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const v = useContext(AppCtx);
  if (!v) throw new Error('useApp di luar <AppCtx.Provider>');
  return v;
}
