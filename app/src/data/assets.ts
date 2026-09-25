/** Path aset gambar (relatif terhadap base, lihat public/assets). */
const A = (f: string) => `${import.meta.env.BASE_URL}assets/${f}`;

export const IMG = {
  bg: A('bg_menu.webp'),
  papanMenu: A('papan_menu.webp'),
  papan: A('papan.webp'),
  pita: A('pita_menu.webp'),
  badge: A('badge_menu.webp'),
  cowoBerdiri: A('avatar_cowo_berdiri.webp'),
  ceweFull: A('avatar_cewe_fullbody.webp'),
  cowoFull: A('avatar_cowo_fullbody.webp'),
  ceweSimpuh: A('avatar_cewe_bersimpuh.webp'),
  tutwuri: A('logo_tutwuri.webp'),
  merdekaIkon: A('logo_merdeka_ikon.webp'),
  merdekaTeks: A('logo_merdeka_teks.webp'),
};

export const BGM_SRC = A('bgm_gending.mp3');
