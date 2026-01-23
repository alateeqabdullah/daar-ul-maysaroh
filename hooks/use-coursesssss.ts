import { useState, useEffect } from "react";

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  type: "ONE_ON_ONE" | "GROUP";
  duration: number;
  price: number;
  features: string[];
  prerequisites: string[];
  outcomes: string[];
  icon: string;
  popular?: boolean;
}

const mockCourses: Course[] = [
  {
    id: "nazrah",
    title: "Quran Recitation (Nazrah)",
    description:
      "Learn to read Quran with proper pronunciation from absolute basics to fluent recitation.",
    longDescription:
      "Comprehensive course covering Arabic alphabet, proper pronunciation (Makharij), and fluent Quran reading.",
    level: "BEGINNER",
    type: "ONE_ON_ONE",
    duration: 45,
    price: 48,
    features: [
      "Personalized 1-on-1 Sessions",
      "Arabic Alphabet & Basics",
      "Proper Pronunciation (Makharij)",
      "Individual Pace & Attention",
      "Flexible Scheduling",
      "Weekly Progress Reports",
    ],
    prerequisites: ["No prior knowledge required"],
    outcomes: ["Read Quran fluently", "Understand basic Tajweed"],
    icon: "📖",
  },
  {
    id: "hifz",
    title: "Quran Memorization (Hifz)",
    description:
      "Complete Quran memorization program with certified Huffaz and Ijazah preparation.",
    longDescription:
      "Structured memorization program with daily targets and revision schedules.",
    level: "INTERMEDIATE",
    type: "ONE_ON_ONE",
    duration: 60,
    price: 80,
    features: [
      "Daily One-on-One Sessions",
      "Individual Memorization Plans",
      "Ijazah Preparation",
      "Tahfeezh Methodology",
      "Progress Tracking System",
      "Parent/Guardian Updates",
    ],
    prerequisites: ["Ability to read Quran fluently"],
    outcomes: ["Memorize entire Quran", "Receive Ijazah"],
    popular: true,
    icon: "🕌",
  },
  {
    id: "tajweed",
    title: "Advanced Tajweed",
    description:
      "Master the rules of Quranic recitation with expert teachers and professional certification.",
    longDescription:
      "Advanced Tajweed rules with practical application and voice training.",
    level: "ADVANCED",
    type: "ONE_ON_ONE",
    duration: 60,
    price: 60,
    features: [
      "Advanced Tajweed Rules",
      "Practical Application",
      "Voice Quality Training",
      "Recitation Correction",
      "Professional Certification",
      "Competition Preparation",
    ],
    prerequisites: ["Fluency in Quran reading"],
    outcomes: ["Master Tajweed rules", "Professional recitation"],
    icon: "🎵",
  },
  {
    id: "arabic",
    title: "Quranic Arabic",
    description:
      "Understand Quran directly in Arabic with vocabulary, grammar, and translation techniques.",
    longDescription:
      "Quranic vocabulary, grammar, and contextual understanding.",
    level: "INTERMEDIATE",
    type: "ONE_ON_ONE",
    duration: 45,
    price: 56,
    features: [
      "Quranic Vocabulary Building",
      "Arabic Grammar Rules",
      "Translation Techniques",
      "Tafsir Principles",
      "Context Understanding",
      "Practical Application",
    ],
    prerequisites: ["Basic Arabic reading"],
    outcomes: ["Understand Quran in Arabic", "Build vocabulary"],
    icon: "🔤",
  },
  {
    id: "kids-quran",
    title: "Kids Quran Club",
    description:
      "Fun and engaging Quran learning for children aged 5-12 in a group setting.",
    longDescription:
      "Interactive group learning designed specifically for children with games and activities.",
    level: "BEGINNER",
    type: "GROUP",
    duration: 45,
    price: 25,
    features: [
      "Age-appropriate Learning",
      "Interactive Games & Activities",
      "Small Group Setting",
      "Progress Reports",
      "Fun Learning Environment",
      "Qualified Kids Teachers",
    ],
    prerequisites: ["Age 5-12 years"],
    outcomes: ["Basic Quran reading", "Love for learning Quran"],
    icon: "👶",
  },
  {
    id: "tajweed-group",
    title: "Tajweed Mastery Group",
    description:
      "Master Tajweed rules in a collaborative group environment with peer learning.",
    longDescription:
      "Group Tajweed learning with peer correction and collaborative exercises.",
    level: "INTERMEDIATE",
    type: "GROUP",
    duration: 60,
    price: 35,
    features: [
      "Group Tajweed Practice",
      "Peer Learning & Correction",
      "Collaborative Exercises",
      "Group Recitation Sessions",
      "Monthly Assessments",
      "Community Support",
    ],
    prerequisites: ["Basic Quran reading skills"],
    outcomes: ["Tajweed proficiency", "Confident recitation"],
    icon: "🎯",
  },
];

export function useCourses(type?: "ONE_ON_ONE" | "GROUP") {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      let filteredCourses = mockCourses;

      if (type) {
        filteredCourses = mockCourses.filter((course) => course.type === type);
      }

      setCourses(filteredCourses);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [type]);

  return { courses, isLoading };
}
