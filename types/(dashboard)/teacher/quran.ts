// src/types/quran.ts

export interface QuranStudent {
  id: string;
  name: string;
  image: string | null;
  email: string;
  phone: string | null;
  hifzLevel: string;
  currentSurah: number;
  goal: string;
  lastRecited: string; // "Today", "2 days ago", etc.
  status: "Active" | "Inactive" | "At Risk";
  parentName?: string;
  parentPhone?: string | null;
}

export interface QuranLog {
  id: string;
  studentId: string;
  studentName: string;
  studentImage: string | null;
  surah: number;
  startAyah: number;
  endAyah: number;
  mistakes: number;
  rating: "EXCELLENT" | "PASS" | "NEEDS_PRACTICE" | "FAIL";
  date: string; // ISO String
  comments? : string | null;
}

export interface QuranStats {
  totalStudents: number;
  activeReciters: number;
  totalJuzCompleted: number;
  needsAttention: number;
}