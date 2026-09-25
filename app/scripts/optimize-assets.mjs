// Mengubah aset sumber (PNG besar) menjadi WebP berukuran ±2× ukuran tampil di stage 1600×900,
// supaya cache offline PWA tetap ringan tanpa mengubah tampilan.
// Jalankan: npm run assets
import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const SRC = path.resolve(root, '../assets');
const SRC_DESIGN = path.resolve(root, '../design/assets');
const OUT = path.resolve(root, 'public/assets');

// [file sumber, batas ukuran {width|height}]
const IMAGES = [
  ['bg_menu.png', { width: 1672 }],
  ['papan_menu.png', { width: 1080 }],
  ['papan.png', { width: 1060 }],
  ['pita_menu.png', { width: 1440 }],
  ['badge_menu.png', { width: 560 }],
  ['avatar_cowo_berdiri.png', { height: 1280 }],
  ['avatar_cewe_fullbody.png', { height: 1360 }],
  ['avatar_cowo_fullbody.png', { height: 1120 }],
  ['avatar_cewe_bersimpuh.png', { width: 480 }],
  ['logo_tutwuri.png', { width: 264 }],
  ['logo_merdeka_ikon.png', { height: 140 }],
  ['logo_merdeka_teks.png', { height: 116 }],
];

await mkdir(OUT, { recursive: true });
for (const [file, size] of IMAGES) {
  const src = [path.join(SRC, file), path.join(SRC_DESIGN, file)].find(existsSync);
  if (!src) throw new Error(`Aset tidak ditemukan: ${file}`);
  const out = path.join(OUT, file.replace(/\.png$/, '.webp'));
  const info = await sharp(src).resize({ ...size, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 95, effort: 6 }).toFile(out);
  console.log(`${file} → ${path.basename(out)} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

const bgm = [path.join(SRC, 'bgm_gending.mp3'), path.join(SRC, 'INSTRUMENTAL MUSIK GENDING JAWA.mp3')].find(existsSync);
if (bgm) { await copyFile(bgm, path.join(OUT, 'bgm_gending.mp3')); console.log('bgm_gending.mp3 disalin'); }
