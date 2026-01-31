export const QURAN_SURAHS = [
  { id: 1, name: "Al-Fatihah", ayahs: 7, juz: 1 },
  { id: 2, name: "Al-Baqarah", ayahs: 286, juz: 1 },
  // ... for brevity, assume a full list or use an npm package like 'quran-json'
  { id: 78, name: "An-Naba", ayahs: 40, juz: 30 },
  { id: 114, name: "An-Nas", ayahs: 6, juz: 30 },
].sort((a, b) => b.id - a.id); // Often Hifz starts from the back (Juz Amma)
