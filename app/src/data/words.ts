/** Kata untuk soal evaluasi tingkat kata (latin ↔ aksara). */
export interface Word { l: string; a: string }

export const WORDS: Word[] = [
  { l: 'sapi', a: 'ꦱꦥꦶ' },     // 0
  { l: 'roti', a: 'ꦫꦺꦴꦠꦶ' },   // 1
  { l: 'paku', a: 'ꦥꦏꦸ' },     // 2
  { l: 'ibu', a: 'ꦲꦶꦧꦸ' },     // 3
  { l: 'meja', a: 'ꦩꦺꦗ' },     // 4
  { l: 'sate', a: 'ꦱꦠꦺ' },     // 5
  { l: 'kopi', a: 'ꦏꦺꦴꦥꦶ' },   // 6
  { l: 'topi', a: 'ꦠꦺꦴꦥꦶ' },   // 7
  { l: 'buku', a: 'ꦧꦸꦏꦸ' },    // 8
  { l: 'kuda', a: 'ꦏꦸꦢ' },     // 9
  { l: 'pipi', a: 'ꦥꦶꦥꦶ' },    // 10
  { l: 'abu', a: 'ꦲꦧꦸ' },      // 11
  { l: 'kaki', a: 'ꦏꦏꦶ' },     // 12
  { l: 'raja', a: 'ꦫꦗ' },      // 13
];

/** [jawaban, pengecoh…] — soal 1–3 latin → aksara, 4–5 aksara → latin. */
export const WORD_QS: { t: number; d: number[]; type: 'l2a' | 'a2l' }[] = [
  { t: 0, d: [5, 10, 7], type: 'l2a' },  // sapi
  { t: 1, d: [7, 6, 13], type: 'l2a' },  // roti
  { t: 2, d: [12, 8, 0], type: 'l2a' },  // paku
  { t: 3, d: [11, 8, 10], type: 'a2l' }, // ibu (hibu)
  { t: 4, d: [13, 5, 9], type: 'a2l' },  // meja
];
