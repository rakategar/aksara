/**
 * Bunyi aksara & kata.
 *
 * Urutan: file rekaman di src/assets/audio/<teks>.mp3 (mis. ha.mp3, kali.mp3) → fallback Web Speech API
 * (suara jv-ID bila ada, jika tidak id-ID; nama aksara dilafalkan Jawa: ha → ho; rate 0.8). File di folder itu otomatis ikut dibundel saat build; tidak perlu mendaftarkannya.
 */
const FILES = import.meta.glob('../assets/audio/*.{mp3,m4a,ogg,wav}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const RECORDINGS: Record<string, string> = {};
for (const [path, url] of Object.entries(FILES)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase();
  RECORDINGS[name] = url;
}

let current: HTMLAudioElement | null = null;

/** Kunci file: huruf kecil, tanpa diakritik (saté → sate, sêga → sega). */
export const audioKey = (text: string) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

export const hasRecording = (text: string) => audioKey(text) in RECORDINGS;

/** Nama aksara dasar (ha, na, ca … dha, nya, tha, nga). */
const AKSARA_NAME = /^(h|n|c|r|k|d|t|s|w|l|p|dh|j|y|ny|m|g|b|th|ng)a$/;

/**
 * Lafal Jawa: nama aksara dibaca dengan vokal "o" (ha → ho, na → no, dha → dho).
 * Hanya untuk nama aksara tunggal; kata contoh sandhangan dibiarkan apa adanya.
 */
export const javaneseReading = (text: string) => {
  const k = audioKey(text);
  return AKSARA_NAME.test(k) ? k.slice(0, -1) + 'o' : text;
};

/** Suara bahasa Jawa (jv-ID) bila perangkat punya, jika tidak bahasa Indonesia. */
function pickVoice(): SpeechSynthesisVoice | undefined {
  const vs = speechSynthesis.getVoices();
  const by = (re: RegExp) => vs.find((v) => re.test(v.lang.replace('_', '-')));
  return by(/^jv\b/i) ?? by(/^id\b/i);
}
if ('speechSynthesis' in window) speechSynthesis.getVoices(); // picu pemuatan daftar suara

function tts(text: string) {
  if (!('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(javaneseReading(text));
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v?.lang ?? 'id-ID';
    u.rate = 0.8;
    speechSynthesis.speak(u);
  } catch {
    /* abaikan */
  }
}

export function stopSpeech() {
  if (current) { current.pause(); current = null; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

export function speak(text: string) {
  stopSpeech();
  const url = RECORDINGS[audioKey(text)];
  if (!url) return tts(text);
  const a = new Audio(url);
  current = a;
  a.play().catch(() => { if (current === a) tts(text); });
}
