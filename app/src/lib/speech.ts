/**
 * Bunyi aksara & kata.
 *
 * Urutan: file rekaman di src/assets/audio/<teks>.mp3 (mis. ha.mp3, kali.mp3) → fallback Web Speech API
 * (id-ID, rate 0.8). File di folder itu otomatis ikut dibundel saat build; tidak perlu mendaftarkannya.
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

function tts(text: string) {
  if (!('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'id-ID';
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
