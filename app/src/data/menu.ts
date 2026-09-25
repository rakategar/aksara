import type { IconName } from '../components/Icon';

export type PageId = 'cover' | 'materi' | 'aksara' | 'sandhangan' | 'latihan' | 'permainan' | 'evaluasi' | 'bantuan';

export interface MenuItem {
  id: PageId;
  label: string;
  icon?: IconName;
  glyph?: string;
  c1: string;
  c2: string;
  /** deskripsi di halaman Bantuan */
  d?: string;
}

export const MENU: MenuItem[] = [
  { id: 'cover', label: 'Beranda', icon: 'i-home', c1: '#4F8FF0', c2: '#1F5BC4' },
  { id: 'materi', label: 'Materi', icon: 'i-book', c1: '#5CC266', c2: '#2E8A3A', d: 'Membaca sejarah dan pengenalan aksara Jawa.' },
  { id: 'aksara', label: 'Aksara Jawa', glyph: 'ꦲꦤ', c1: '#FF9A45', c2: '#E0620F', d: 'Melihat 20 aksara. Ketuk aksara untuk mendengar bunyinya.' },
  { id: 'sandhangan', label: 'Sandhangan', icon: 'i-sandh', c1: '#9A6BE0', c2: '#6A3DB8', d: 'Mengenal tanda pengubah bunyi, seperti wulu dan suku.' },
  { id: 'latihan', label: 'Latihan', icon: 'i-pencil', c1: '#4FB0F5', c2: '#1F7CD0', d: 'Berlatih menulis aksara dan menebak aksara.' },
  { id: 'permainan', label: 'Permainan', icon: 'i-game', c1: '#F0689A', c2: '#C8305F', d: 'Mencocokkan kartu aksara dengan bacaan latinnya.' },
  { id: 'evaluasi', label: 'Evaluasi', icon: 'i-clip', c1: '#35BBA5', c2: '#17806F', d: 'Mengerjakan 10 soal lalu melihat nilaimu.' },
  { id: 'bantuan', label: 'Bantuan', icon: 'i-help', c1: '#FFC23D', c2: '#E0900A', d: 'Membaca panduan cara memakai aplikasi.' },
];

export const TITLES: Partial<Record<PageId, string>> = {
  materi: 'MATERI', aksara: 'AKSARA JAWA', sandhangan: 'SANDHANGAN', latihan: 'LATIHAN',
  permainan: 'PERMAINAN', evaluasi: 'EVALUASI', bantuan: 'BANTUAN',
};

/** Logo SIAKJADA: huruf, warna, rotasi (deg). */
export const LOGO: [string, string, number][] = [
  ['S', '#F07A1E', -4], ['I', '#F5B400', 3], ['A', '#F2A516', -2], ['K', '#8A4B1F', 4],
  ['J', '#7A4CC9', -3], ['A', '#2D6FD6', 2], ['D', '#E0463A', -4], ['A', '#3FA34D', 3],
];

export const BTN_BLUE = 'radial-gradient(circle at 50% 28%,#7FD0FF 0%,#2B92E8 45%,#1567C0 100%)';
export const BTN_ORANGE = 'radial-gradient(circle at 50% 28%,#FFE27A 0%,#F5A623 50%,#D97A08 100%)';
export const BTN_GREY = 'radial-gradient(circle at 50% 28%,#C9D3DD 0%,#8C9AA8 55%,#66737F 100%)';

/** Daftar tombol navigasi di halaman Bantuan. */
export const NAV_HELP: { n: string; icon: IconName; bg: string; sh: string; d: string }[] = [
  { n: 'Beranda', icon: 'i-home', bg: BTN_ORANGE, sh: '#B8650A', d: 'Kembali ke halaman utama (cover).' },
  { n: 'Kembali', icon: 'i-left', bg: BTN_BLUE, sh: '#0E4E8F', d: 'Mundur ke halaman atau aksara sebelumnya.' },
  { n: 'Selanjutnya', icon: 'i-right', bg: BTN_BLUE, sh: '#0E4E8F', d: 'Maju ke aksara atau halaman berikutnya.' },
  { n: 'Suara', icon: 'i-sound', bg: BTN_BLUE, sh: '#0E4E8F', d: 'Menyalakan atau mematikan semua suara.' },
  { n: 'Pengaturan', icon: 'i-gear', bg: BTN_ORANGE, sh: '#B8650A', d: 'Mengatur volume musik latar.' },
  { n: 'Urungkan & Hapus', icon: 'i-undo', bg: BTN_BLUE, sh: '#0E4E8F', d: 'Di kanvas: batalkan satu coretan, atau hapus semua.' },
];

/** Ketebalan pena: lebar garis (px kanvas 2×) & diameter titik pratinjau. */
export const PENS = [
  { id: 'tipis', w: 10, d: 8 },
  { id: 'sedang', w: 20, d: 15 },
  { id: 'tebal', w: 32, d: 22 },
] as const;
export type PenId = (typeof PENS)[number]['id'];
