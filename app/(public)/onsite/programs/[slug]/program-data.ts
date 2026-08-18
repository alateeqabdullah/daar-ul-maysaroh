// app/(marketing)/onsite/programs/[slug]/program-data.ts

const ALL_PROGRAMS = [
  {
    slug: "full-time-boarding",
    title: "Full-Time Boarding",
    subtitle: "Complete Immersion",
    icon: "Moon",
    color: "purple",
    badge: "Premium",
    description:
      "Complete immersion in the Quranic environment with 24/7 supervision, support, and accelerated memorization.",
    features: [
      "Full-time campus living",
      "Immersive environment",
      "24/7 supervision",
      "Accelerated memorization",
      "Complete curriculum",
    ],
    detailedDescription: `The Full-Time Boarding programme at Daar-ul-Maysaroh offers the most comprehensive Quran memorization experience. Students live on campus full-time, immersed in a structured environment designed for optimal memorization and spiritual growth.

With 24/7 supervision, students benefit from a disciplined routine that includes Tahfeedh sessions, Tajweed practice, Islamic studies, and Muraja'ah. The boarding environment fosters brotherhood/sisterhood, accountability, and deep connection to the Quran.

This programme is ideal for students who want to dedicate themselves fully to Quran memorization without distractions.`,
    duration: "2-5 Years",
    level: "All Levels",
    attendance: "Daily",
    schedule: [
      "4:00 AM - Tahajjud & Morning Preparation",
      "4:30 AM - Fajr Prayer & Quran Recitation",
      "5:00 AM - Morning Tahfeedh Session",
      "7:00 AM - Breakfast & Personal Study",
      "8:00 AM - Tajweed & Qira'ah Classes",
      "10:00 AM - Islamic Studies / Arabic",
      "12:00 PM - Dhuhr Prayer",
      "12:30 PM - Lunch & Rest",
      "2:00 PM - Revision & Muraja'ah",
      "4:00 PM - Asr Prayer & Break",
      "4:30 PM - Afternoon Tahfeedh Session",
      "6:30 PM - Maghrib Prayer & Dinner",
      "7:30 PM - Evening Revision & Review",
      "8:30 PM - Isha Prayer & Night Revision",
      "9:00 PM - Rest & Sleep",
    ],
    curriculum: [
      "Tahfeedh",
      "Tajweed",
      "Qira'aat",
      "Islamic Studies",
      "Arabic",
      "Tarbiyah",
    ],
    whoIsItFor: [
      "Students seeking full-time memorization",
      "Those who need structured supervision",
      "Students who thrive in immersive environments",
      "Those who want to dedicate themselves fully to Quran",
    ],
    outcomes: [
      "Complete Quran memorization",
      "Ijazah certification",
      "Strong Tajweed foundation",
      "Deep Islamic knowledge",
      "Disciplined character",
    ],
  },
  {
    slug: "part-time-boarding",
    title: "Part-Time Boarding",
    subtitle: "Weekend Intensive",
    icon: "Moon",
    color: "amber",
    badge: "Weekend Intensive",
    description:
      "Weekend immersion with on-campus accommodation, perfect for out-of-town students seeking focused memorization.",
    features: [
      "Weekend immersion",
      "On-campus accommodation",
      "Full supervision",
      "Community experience",
      "Accelerated progress",
    ],
    detailedDescription: `The Part-Time Boarding programme is designed for students who cannot commit to full-time boarding but still want the immersive experience. Students arrive on Friday evenings and stay through Sunday, benefiting from a concentrated weekend of memorization and revision.

This programme is perfect for out-of-town students or those who have weekday commitments but want dedicated Quran time on weekends. The weekend immersion provides a taste of the boarding experience with full supervision and community living.`,
    duration: "Ongoing",
    level: "All Levels",
    attendance: "Fri - Sun",
    schedule: [
      "Friday 4:30 PM - Arrival & Registration",
      "5:00 PM - Evening Tahfeedh Session",
      "6:30 PM - Maghrib Prayer & Dinner",
      "8:00 PM - Isha & Night Revision",
      "Saturday 5:00 AM - Morning Tahfeedh",
      "8:00 AM - Tajweed & Recitation",
      "10:00 AM - Islamic Studies",
      "2:00 PM - Revision & Muraja'ah",
      "4:30 PM - Afternoon Tahfeedh",
      "Sunday 5:00 AM - Morning Tahfeedh",
      "12:00 PM - Final Review",
      "4:30 PM - Departure",
    ],
    curriculum: [
      "Tahfeedh",
      "Tajweed",
      "Islamic Studies",
      "Arabic",
      "Tarbiyah",
    ],
    whoIsItFor: [
      "Out-of-town students",
      "Those with weekday commitments",
      "Students seeking weekend immersion",
      "Those who want to experience boarding",
    ],
    outcomes: [
      "Consistent weekend memorization",
      "Community connection",
      "Structured revision",
      "Spiritual recharge",
    ],
  },
  {
    slug: "full-time-day",
    title: "Full-Time Day",
    subtitle: "Comprehensive Learning",
    icon: "Sun",
    color: "purple",
    badge: "Most Popular",
    description:
      "Ideal for students seeking a comprehensive program with extended learning hours and accelerated progress.",
    features: [
      "5 days per week",
      "Extended learning hours",
      "Complete curriculum",
      "Accelerated progress",
      "Regular assessments",
    ],
    detailedDescription: `The Full-Time Day programme offers the most comprehensive day-based learning experience. Students attend classes five days a week with extended hours that maximize learning time while allowing students to return home each evening.

This programme is ideal for students who want the structure and depth of a full-time programme while maintaining family connections. The extended hours include evening sessions that ensure comprehensive coverage of Tahfeedh, Tajweed, and Islamic Studies.`,
    duration: "Ongoing",
    level: "All Levels",
    attendance: "Sat-Sun (9-4:30) • Mon-Wed (4:30-6:30)",
    schedule: [
      "Saturday & Sunday: 9:00 AM - 4:30 PM",
      "Monday - Wednesday: 4:30 PM - 6:30 PM",
      "Full academic program",
      "Tahfeedh & Tajweed focus",
      "Islamic Studies & Arabic",
      "Regular assessments",
    ],
    curriculum: [
      "Tahfeedh",
      "Tajweed",
      "Islamic Studies",
      "Arabic",
      "Tarbiyah",
    ],
    whoIsItFor: [
      "Students who want comprehensive learning",
      "Those who can commit to 5 days",
      "Students who prefer to return home daily",
      "Those seeking accelerated progress",
    ],
    outcomes: [
      "Accelerated memorization",
      "Strong Tajweed foundation",
      "Comprehensive Islamic knowledge",
      "Consistent progress",
    ],
  },
  {
    slug: "part-time-day",
    title: "Part-Time Day",
    subtitle: "Weekend Focus",
    icon: "Sun",
    color: "amber",
    badge: "Weekend",
    description:
      "Perfect for students who want to focus on Quran on weekends while maintaining weekday commitments.",
    features: [
      "2 days per week",
      "Full academic program",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
    ],
    detailedDescription: `The Part-Time Day programme is designed for students who have weekday commitments but still want structured Quran education. Students attend classes on Saturdays and Sundays, receiving comprehensive instruction in Tahfeedh, Tajweed, and Islamic Studies.

This programme is perfect for students who are in regular school during the week but want dedicated Quran learning on weekends. The program provides a solid foundation for Quran memorization while allowing students to continue their other commitments.`,
    duration: "Ongoing",
    level: "All Levels",
    attendance: "Sat - Sun (9:00 AM - 4:30 PM)",
    schedule: [
      "Saturday & Sunday: 9:00 AM - 4:30 PM",
      "Tahfeedh Sessions",
      "Tajweed & Recitation",
      "Islamic Studies",
      "Group Learning",
    ],
    curriculum: ["Tahfeedh", "Tajweed", "Islamic Studies", "Arabic"],
    whoIsItFor: [
      "Students in regular school",
      "Those with weekday commitments",
      "Beginners wanting to start Quran",
      "Those seeking weekend learning",
    ],
    outcomes: [
      "Consistent weekend learning",
      "Foundational Tajweed",
      "Basic memorization",
      "Islamic knowledge",
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return ALL_PROGRAMS.find((p) => p.slug === slug);
}

export function getAllProgramSlugs() {
  return ALL_PROGRAMS.map((p) => p.slug);
}
