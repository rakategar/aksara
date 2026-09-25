import { useLayoutEffect, useRef, type ReactNode, type Ref } from 'react';
import './Stage.css';

/** Kanvas desain 1600×900 yang diskalakan agar pas layar (letterbox), setara fit() prototipe. */
export function Stage({ scale, onScale, stageRef, label, children }: {
  scale: number;
  onScale: (s: number) => void;
  stageRef: Ref<HTMLDivElement>;
  label: string;
  children: ReactNode;
}) {
  const vp = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const v = vp.current;
    if (!v) return;
    const fit = () => onScale(Math.min(v.clientWidth / 1600, v.clientHeight / 900));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(v);
    return () => ro.disconnect();
  }, [onScale]);
  return (
    <div ref={vp} className="sj-viewport">
      <div ref={stageRef} className="sj-stage" data-screen-label={label} style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
