export interface Sandhangan {
  /** nama */
  n: string;
  /** bunyi */
  b: string;
  /** contoh pada ka (glyph) */
  s: string;
  /** contoh pada ka (latin) */
  sl: string;
  /** contoh kata (glyph) */
  w: string;
  /** contoh kata (latin) */
  wl: string;
}

export const SANDHANGAN: Sandhangan[] = [
  { n: 'Wulu', b: 'i', s: 'ꦏꦶ', sl: 'ki', w: 'ꦏꦭꦶ', wl: 'kali' },
  { n: 'Suku', b: 'u', s: 'ꦏꦸ', sl: 'ku', w: 'ꦧꦸꦏꦸ', wl: 'buku' },
  { n: 'Taling', b: 'é', s: 'ꦏꦺ', sl: 'ké', w: 'ꦱꦠꦺ', wl: 'saté' },
  { n: 'Pepet', b: 'ê', s: 'ꦏꦼ', sl: 'kê', w: 'ꦱꦼꦒ', wl: 'sêga' },
  { n: 'Taling Tarung', b: 'o', s: 'ꦏꦺꦴ', sl: 'ko', w: 'ꦭꦺꦴꦫꦺꦴ', wl: 'loro' },
  { n: 'Layar', b: 'r', s: 'ꦏꦂ', sl: 'kar', w: 'ꦥꦱꦂ', wl: 'pasar' },
  { n: 'Wignyan', b: 'h', s: 'ꦏꦃ', sl: 'kah', w: 'ꦒꦗꦃ', wl: 'gajah' },
  { n: 'Cecak', b: 'ng', s: 'ꦏꦁ', sl: 'kang', w: 'ꦧꦮꦁ', wl: 'bawang' },
  { n: 'Pangkon', b: 'mati', s: 'ꦏ꧀', sl: 'k', w: 'ꦮꦶꦠ꧀', wl: 'wit' },
  { n: 'Cakra', b: 'ra', s: 'ꦏꦿ', sl: 'kra', w: 'ꦏꦿꦠꦺꦴꦤ꧀', wl: 'kraton' },
];
