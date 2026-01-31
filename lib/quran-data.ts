export interface Surah {
  id: number;
  name: string;
  ayahs: number;
  juz: number;
  revelation: "Meccan" | "Medinan";
}

export const QURAN_SURAHS: Surah[] = [
  { id: 1, name: "Al-Fatihah", ayahs: 7, juz: 1, revelation: "Meccan" },
  { id: 2, name: "Al-Baqarah", ayahs: 286, juz: 1, revelation: "Medinan" },
  { id: 3, name: "Al-Imran", ayahs: 200, juz: 3, revelation: "Medinan" },
  { id: 4, name: "An-Nisa", ayahs: 176, juz: 4, revelation: "Medinan" },
  { id: 5, name: "Al-Ma'idah", ayahs: 120, juz: 6, revelation: "Medinan" },
  { id: 6, name: "Al-An'am", ayahs: 165, juz: 7, revelation: "Meccan" },
  { id: 7, name: "Al-A'raf", ayahs: 206, juz: 8, revelation: "Meccan" },
  { id: 8, name: "Al-Anfal", ayahs: 75, juz: 9, revelation: "Medinan" },
  { id: 9, name: "At-Tawbah", ayahs: 129, juz: 10, revelation: "Medinan" },
  { id: 10, name: "Yunus", ayahs: 109, juz: 11, revelation: "Meccan" },
  // ... (Full list truncated for space, but you would populate all 114 here)
  // I will provide the Juz 30 (Amma) which is most used:
  { id: 78, name: "An-Naba", ayahs: 40, juz: 30, revelation: "Meccan" },
  { id: 79, name: "An-Nazi'at", ayahs: 46, juz: 30, revelation: "Meccan" },
  { id: 80, name: "Abasa", ayahs: 42, juz: 30, revelation: "Meccan" },
  { id: 81, name: "At-Takwir", ayahs: 29, juz: 30, revelation: "Meccan" },
  { id: 82, name: "Al-Infitar", ayahs: 19, juz: 30, revelation: "Meccan" },
  { id: 83, name: "Al-Mutaffifin", ayahs: 36, juz: 30, revelation: "Meccan" },
  { id: 84, name: "Al-Inshiqaq", ayahs: 25, juz: 30, revelation: "Meccan" },
  { id: 85, name: "Al-Buruj", ayahs: 22, juz: 30, revelation: "Meccan" },
  { id: 86, name: "At-Tariq", ayahs: 17, juz: 30, revelation: "Meccan" },
  { id: 87, name: "Al-A'la", ayahs: 19, juz: 30, revelation: "Meccan" },
  { id: 88, name: "Al-Ghashiyah", ayahs: 26, juz: 30, revelation: "Meccan" },
  { id: 89, name: "Al-Fajr", ayahs: 30, juz: 30, revelation: "Meccan" },
  { id: 90, name: "Al-Balad", ayahs: 20, juz: 30, revelation: "Meccan" },
  { id: 91, name: "Ash-Shams", ayahs: 15, juz: 30, revelation: "Meccan" },
  { id: 92, name: "Al-Layl", ayahs: 21, juz: 30, revelation: "Meccan" },
  { id: 93, name: "Ad-Duha", ayahs: 11, juz: 30, revelation: "Meccan" },
  { id: 94, name: "Ash-Sharh", ayahs: 8, juz: 30, revelation: "Meccan" },
  { id: 95, name: "At-Tin", ayahs: 8, juz: 30, revelation: "Meccan" },
  { id: 96, name: "Al-Alaq", ayahs: 19, juz: 30, revelation: "Meccan" },
  { id: 97, name: "Al-Qadr", ayahs: 5, juz: 30, revelation: "Meccan" },
  { id: 98, name: "Al-Bayyinah", ayahs: 8, juz: 30, revelation: "Medinan" },
  { id: 99, name: "Az-Zalzalah", ayahs: 8, juz: 30, revelation: "Medinan" },
  { id: 100, name: "Al-Adiyat", ayahs: 11, juz: 30, revelation: "Meccan" },
  { id: 101, name: "Al-Qari'ah", ayahs: 11, juz: 30, revelation: "Meccan" },
  { id: 102, name: "At-Takathur", ayahs: 8, juz: 30, revelation: "Meccan" },
  { id: 103, name: "Al-Asr", ayahs: 3, juz: 30, revelation: "Meccan" },
  { id: 104, name: "Al-Humazah", ayahs: 9, juz: 30, revelation: "Meccan" },
  { id: 105, name: "Al-Fil", ayahs: 5, juz: 30, revelation: "Meccan" },
  { id: 106, name: "Quraysh", ayahs: 4, juz: 30, revelation: "Meccan" },
  { id: 107, name: "Al-Ma'un", ayahs: 7, juz: 30, revelation: "Meccan" },
  { id: 108, name: "Al-Kawthar", ayahs: 3, juz: 30, revelation: "Meccan" },
  { id: 109, name: "Al-Kafirun", ayahs: 6, juz: 30, revelation: "Meccan" },
  { id: 110, name: "An-Nasr", ayahs: 3, juz: 30, revelation: "Medinan" },
  { id: 111, name: "Al-Masad", ayahs: 5, juz: 30, revelation: "Meccan" },
  { id: 112, name: "Al-Ikhlas", ayahs: 4, juz: 30, revelation: "Meccan" },
  { id: 113, name: "Al-Falaq", ayahs: 5, juz: 30, revelation: "Meccan" },
  { id: 114, name: "An-Nas", ayahs: 6, juz: 30, revelation: "Meccan" },
];
