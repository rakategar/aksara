# SIAKJADA — Sinau Aksara Jawa dengan Mudah

Media pembelajaran interaktif aksara Jawa untuk siswa kelas IV SDN Kendangsari II.
Vite + React + TypeScript, bisa diinstal sebagai PWA dan dipakai **offline** di kelas.

## Menjalankan

```bash
npm install
npm run dev        # mode pengembangan → http://localhost:5173
npm run build      # build produksi ke dist/ (cek tipe + PWA)
npm run preview    # menjalankan hasil build → http://localhost:4173
```

Folder `dist/` bisa disalin ke hosting statis mana pun (Netlify, Vercel, GitHub Pages, server sekolah).
Path memakai `base: './'`, jadi aplikasi juga jalan di subfolder.

### Memasang di tablet/laptop (offline)
1. Buka alamat aplikasi sekali saat online (Chrome/Edge/Safari).
2. Chrome/Edge: ikon **Instal** di bilah alamat. iPad Safari: **Bagikan → Tambahkan ke Layar Utama**.
3. Setelah terbuka sekali, semua gambar, font, dan musik sudah tersimpan, jadi aplikasi bisa dipakai tanpa internet.

Service worker memperbarui dirinya otomatis saat ada versi baru (`registerType: 'autoUpdate'`).

### Deep-link
Halaman bisa dibuka langsung lewat hash: `#materi`, `#aksara`, `#sandhangan`, `#tulis`, `#tulis/5`
(aksara ke-5), `#kuis`, `#permainan`, `#evaluasi`, `#bantuan`.

## Mengganti bunyi aksara dengan rekaman

Saat ini bunyi aksara memakai Web Speech API (suara `id-ID`, kecepatan 0.8). Untuk memakai rekaman asli:

1. Simpan file audio di **`src/assets/audio/`**, dengan nama file = bacaan latin huruf kecil:
   `ha.mp3`, `na.mp3`, `ca.mp3`, … `nga.mp3`.
   Format `.mp3`, `.m4a`, `.ogg`, atau `.wav` bisa dipakai. Usahakan tiap file ≤ 1 detik.
2. Contoh kata di halaman Sandhangan juga bisa diberi rekaman dengan cara yang sama:
   `kali.mp3`, `buku.mp3`, `sate.mp3`, `sega.mp3`, `loro.mp3`, `pasar.mp3`, `gajah.mp3`,
   `bawang.mp3`, `wit.mp3`, `kraton.mp3` (tanpa tanda é/ê).
3. Jalankan `npm run build`. File otomatis ikut dibundel dan di-cache untuk offline, tanpa perlu mendaftarkannya di kode.

Teks yang punya rekaman akan memutar file tersebut. Teks tanpa rekaman (atau file yang gagal diputar)
otomatis kembali ke Web Speech API. Logikanya ada di `src/lib/speech.ts`.

## Mengganti musik latar & gambar

Gambar sumber (PNG besar) ada di `../assets/` dan logo di `../design/assets/`. Skrip berikut mengubahnya
menjadi WebP berukuran ±2× ukuran tampil, supaya cache offline ringan, lalu menyalin musik latar:

```bash
npm run assets     # → public/assets/*.webp + public/assets/bgm_gending.mp3
```

Untuk mengganti musik latar cukup timpa `public/assets/bgm_gending.mp3`.
Volume musik disimpan di `localStorage` dengan kunci `sj_bgmVol` (default 40).

## Struktur

```
src/
  data/         aksara, sandhangan, carakan, menu & teks bantuan, path aset
  state/        reducer halaman (useReducer), context aplikasi, kunci animasi
  lib/          logika kuis/permainan, BGM, bunyi aksara, animasi (port runAnims), hash
  components/   Stage, WoodSign, NavButton, MenuButton, ParchmentPanel, AksaraCard,
                ActionButton, OptionButton, ProgressBar, Modal, Toast, Icon
  screens/      Cover, Materi, AksaraGrid, Menulis, TebakAksara, Sandhangan,
                Permainan, Evaluasi, Bantuan, kerangka FeatureFrame
  modals/       Detail aksara, Konfirmasi keluar, Pengaturan, Hasil
  styles/       tokens.css (salinan apa adanya dari desain) + global.css
```

Acuan desain: `../design/SIAKJADA App.dc.html` (prototipe, sumber kebenaran tata letak & perilaku),
`../design/Design System.dc.html`, dan `../design/tokens.css`. Semua warna, font, radius, dan bayangan memakai
token `--sj-*`.

## Catatan
- Kanvas desain 1600×900 diskalakan `min(lebar/1600, tinggi/900)` dan diberi letterbox `#0f2233`.
- Animasi mengikuti `prefers-reduced-motion`. Bila aktif, animasi masuk, bob, dan confetti dimatikan.
- Musik latar baru mulai setelah sentuhan/klik pertama (kebijakan autoplay browser), dan berhenti saat tab disembunyikan.
