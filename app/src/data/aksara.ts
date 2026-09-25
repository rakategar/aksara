export interface Aksara {
  /** latin, huruf kecil (ha, na, …) */
  l: string;
  /** glyph Unicode Jawa */
  a: string;
  /** indeks 0–19 */
  i: number;
  /** latin kapital, untuk papan label */
  L: string;
  /** nomor urut 1–20 */
  n: number;
}

const RAW: [string, string][] = [
  ['ha', 'ꦲ'], ['na', 'ꦤ'], ['ca', 'ꦕ'], ['ra', 'ꦫ'], ['ka', 'ꦏ'],
  ['da', 'ꦢ'], ['ta', 'ꦠ'], ['sa', 'ꦱ'], ['wa', 'ꦮ'], ['la', 'ꦭ'],
  ['pa', 'ꦥ'], ['dha', 'ꦝ'], ['ja', 'ꦗ'], ['ya', 'ꦪ'], ['nya', 'ꦚ'],
  ['ma', 'ꦩ'], ['ga', 'ꦒ'], ['ba', 'ꦧ'], ['tha', 'ꦛ'], ['nga', 'ꦔ'],
];

export const AKSARA: Aksara[] = RAW.map(([l, a], i) => ({ l, a, i, L: l.toUpperCase(), n: i + 1 }));
export const AKSARA_IDX = AKSARA.map((x) => x.i);
