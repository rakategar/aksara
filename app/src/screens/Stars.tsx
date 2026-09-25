import { Icon } from '../components/Icon';

/** 3 bintang; n menyala kuning, sisanya pudar. */
export function Stars({ n, size, gap }: { n: number; size: number; gap: number }) {
  return (
    <div style={{ display: 'flex', gap }} role="img" aria-label={`${n} dari 3 bintang`}>
      {[0, 1, 2].map((i) => (
        <Icon key={i} name="i-star" size={size} style={{ color: i < n ? '#F5B400' : '#E3D3B3', filter: 'drop-shadow(0 4px 0 rgba(0,0,0,.15))' }} />
      ))}
    </div>
  );
}
