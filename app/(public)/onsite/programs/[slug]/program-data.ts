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
    ratio: "1:4",
    schedule: [
      "4:00 AM - Tahajjud Preparation",
      "4:30 AM - Tahajjud Prayer",
      "5:00 AM - Personal Hygiene",
      "5:30 AM - Fajr Prayer",
      "6:00 AM - Adhkaar & Qur'an Classes",
      "8:00 AM - Morning Prep, Breakfast & Rest",
      "10:00 AM - Qur'an Classes",
      "1:00 PM - Dhuhr Prayer",
      "2:00 PM - Lunch & Rest",
      "4:00 PM - Asr Prayer",
      "4:30 PM - Afternoon Session",
      "7:00 PM - Maghrib Prayer, Adhkaar & Dinner",
      "8:00 PM - Isha Prayer & Night Revision",
      "8:20 PM - Evening Revision & Review",
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
    highlights: [
      "24/7 Supervision",
      "Full Immersion",
      "Accelerated Memorization",
      "Complete Curriculum",
      "Ijazah Track",
      "Community Living",
    ],
    milestones: [
      {
        phase: "Foundation",
        description: "Build strong Quranic foundation with proper Makharij",
      },
      {
        phase: "Progression",
        description: "Advance through structured memorization levels",
      },
      { phase: "Mastery", description: "Achieve fluency and retention goals" },
      {
        phase: "Ijazah",
        description: "Earn Ijazah certification with Sanad chain",
      },
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
    testimonials: [
      {
        name: "Abdulrahman",
        role: "Day Programme",
        content:
          "The structured environment transformed my memorization. In 18 months, Ustaz's guidance was invaluable.",
      },
      {
        name: "Hafidh",
        role: "Day Programme",
        content:
          "Balancing school and memorization seemed impossible until we joined. The revision system kept me consistent.",
      },
    ],
    faqs: [
      {
        q: "What is the duration of the Full-Time Boarding programme?",
        a: "The programme typically takes 1-3 years, depending on individual pace, commitment, and memorization goals.",
      },
      {
        q: "What level of Quran knowledge is required?",
        a: "This programme is suitable for all levels. Students are placed according to their current ability through an initial assessment.",
      },
      {
        q: "Is Ijazah certification included?",
        a: "Yes, students who complete the memorization with proper Tajweed and pass the final examination receive Ijazah certification.",
      },
      {
        q: "What is the teacher-student ratio?",
        a: "Our ratio is 1:4, ensuring personalized attention and guidance for each student.",
      },
    ],
    relatedPrograms: [
      {
        title: "Part-Time Boarding",
        slug: "part-time-boarding",
        description: "Weekend immersion option",
      },
      {
        title: "Full-Time Day",
        slug: "full-time-day",
        description: "Comprehensive day learning",
      },
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
    ratio: "1:4",
    schedule: [
      "friday: 4:00 PM - Arrival & Registration",
        "4:30 PM - Asr Prayer",
        "5:00 PM - Welcome & Orientation",
        "6:30 PM - Maghrib Prayer & Dinner",
        "7:30 PM - Evening Revision & Review",
        "8:30 PM - Isha Prayer & Night Revision",
        "9:00 PM - Rest & Sleep",
      "saturday: 4:00 AM - Tahajjud Preparation",
        "4:30 AM - Tahajjud Prayer",
        "5:00 AM - Personal Hygiene",
        "5:30 AM - Fajr Prayer",
        "6:00 AM - Adhkaar & Qur'an Classes",
        "8:00 AM - Morning Prep, Breakfast & Rest",
        "10:00 AM - Qur'an Classes",
        "1:00 PM - Dhuhr Prayer",
        "2:00 PM - Lunch & Rest",
        "4:00 PM - Asr Prayer",
        "4:30 PM - Afternoon Session",
        "7:00 PM - Maghrib Prayer, Adhkaar & Dinner",
        "8:00 PM - Isha Prayer & Night Revision",
        "8:20 PM - Evening Revision & Review",
        "9:00 PM - Rest & Sleep",
     
      "sunday: 4:00 AM - Tahajjud Preparation",
        "4:30 AM - Tahajjud Prayer",
        "5:00 AM - Personal Hygiene",
        "5:30 AM - Fajr Prayer",
        "6:00 AM - Adhkaar & Qur'an Classes",
        "8:00 AM - Morning Prep, Breakfast & Rest",
        "10:00 AM - Qur'an Classes",
        "1:00 PM - Dhuhr Prayer",
        "2:00 PM - Lunch & Rest",
        "3:00 PM - Final Revision & Review",
        "4:00 PM - Asr Prayer",
        "4:30 PM - Departure",
      ],
    curriculum: [
      "Tahfeedh",
      "Tajweed",
      "Islamic Studies",
      "Arabic",
      "Tarbiyah",
    ],
    highlights: [
      "Weekend Immersion",
      "On-Campus Stay",
      "Full Supervision",
      "Community Experience",
      "Accelerated Progress",
      "Flexible Commitment",
    ],
    milestones: [
      {
        phase: "Weekend Foundation",
        description: "Establish consistent weekend routine",
      },
      {
        phase: "Memorization Growth",
        description: "Build memorization through weekend sessions",
      },
      {
        phase: "Revision Mastery",
        description: "Strengthen existing memorization",
      },
      {
        phase: "Community Connection",
        description: "Become part of the boarding community",
      },
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
    testimonials: [
      {
        name: "Shaykh Umar",
        role: "Part-Time Boarding Student",
        content:
          "The weekend programme gave me the structure I needed while allowing me to work during the week. The best of both worlds.",
      },
    ],
    faqs: [
      {
        q: "Can I switch from Part-Time to Full-Time Boarding?",
        a: "Yes, students can transition between programmes based on their needs and availability.",
      },
      {
        q: "What is included in the accommodation?",
        a: "On-campus accommodation includes a comfortable room, three meals, and access to all campus facilities.",
      },
      {
        q: "Is there supervision on weekends?",
        a: "Yes, qualified staff provide full supervision throughout the weekend stay.",
      },
    ],
    relatedPrograms: [
      {
        title: "Full-Time Boarding",
        slug: "full-time-boarding",
        description: "Complete immersion option",
      },
      {
        title: "Part-Time Day",
        slug: "part-time-day",
        description: "Weekend day learning",
      },
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
    ratio: "1:6",
    schedule: [
      "Saturday & Sunday: 9:00 AM - 4:30 PM",
      "Full academic program",
      "Tahfeedh & Tajweed focus",
      "Islamic Studies & Arabic",
      "Monday - Wednesday: 4:30 PM - 6:30 PM",
      "Evening Tahfeedh sessions",
      "Revision & Muraja'ah",
      "Regular assessments",
    ],
    curriculum: [
      "Tahfeedh",
      "Tajweed",
      "Islamic Studies",
      "Arabic",
      "Tarbiyah",
    ],
    highlights: [
      "5 Days Per Week",
      "Extended Hours",
      "Complete Curriculum",
      "Accelerated Progress",
      "Regular Assessments",
      "Return Home Daily",
    ],
    milestones: [
      {
        phase: "Daily Consistency",
        description: "Build consistent daily learning habit",
      },
      {
        phase: "Memorization Build",
        description: "Progress through structured memorization",
      },
      { phase: "Tajweed Mastery", description: "Perfect recitation rules" },
      {
        phase: "Comprehensive Knowledge",
        description: "Gain deep Islamic understanding",
      },
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
    testimonials: [
      {
        name: "Ustadhah Aisha",
        role: "Full-Time Day Student",
        content:
          "The extended hours made a huge difference. I could memorize during the day and review in the evening sessions.",
      },
    ],
    faqs: [
      {
        q: "What are the timings for the Full-Time Day programme?",
        a: "Saturday and Sunday: 9:00 AM - 4:30 PM. Monday to Wednesday: 4:30 PM - 6:30 PM.",
      },
      {
        q: "Can I join if I have other commitments?",
        a: "This programme is designed for students who can commit to 5 days. For those with limited availability, we recommend the Part-Time Day programme.",
      },
      {
        q: "What is the teacher-student ratio?",
        a: "The ratio is 1:6, allowing for individual attention and guidance.",
      },
    ],
    relatedPrograms: [
      {
        title: "Part-Time Day",
        slug: "part-time-day",
        description: "Weekend learning option",
      },
      {
        title: "Full-Time Boarding",
        slug: "full-time-boarding",
        description: "Complete immersion option",
      },
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
    ratio: "1:6",
    schedule: [
      "Saturday & Sunday: 9:00 AM - 4:30 PM",
      "Tahfeedh Sessions",
      "Tajweed & Recitation",
      "Islamic Studies",
      "Group Learning",
      "Progress Assessments",
    ],
    curriculum: ["Tahfeedh", "Tajweed", "Islamic Studies", "Arabic"],
    highlights: [
      "2 Days Per Week",
      "Full Academic Program",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
      "Flexible Commitment",
      "Return Home Daily",
    ],
    milestones: [
      {
        phase: "Weekend Foundation",
        description: "Establish consistent weekend learning",
      },
      {
        phase: "Basic Memorization",
        description: "Begin Quran memorization journey",
      },
      {
        phase: "Tajweed Introduction",
        description: "Learn foundational recitation rules",
      },
      {
        phase: "Islamic Knowledge",
        description: "Build basic Islamic understanding",
      },
    ],
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
    testimonials: [
      {
        name: "Zainab",
        role: "Part-Time Day Student",
        content:
          "I could continue my regular school during the week and focus on Quran on weekends. The perfect balance for my family.",
      },
    ],
    faqs: [
      {
        q: "Can I join if I have no prior Quran knowledge?",
        a: "Absolutely! This programme is designed for beginners and students of all levels. We start from the basics.",
      },
      {
        q: "What if I miss a weekend session?",
        a: "We understand that weekends can be busy. Makeup sessions can be arranged with prior notice.",
      },
      {
        q: "How is progress measured?",
        a: "Progress is measured through regular assessments and milestone tracking. Teachers provide personalized feedback.",
      },
    ],
    relatedPrograms: [
      {
        title: "Full-Time Day",
        slug: "full-time-day",
        description: "Extended learning option",
      },
      {
        title: "Part-Time Boarding",
        slug: "part-time-boarding",
        description: "Weekend immersion option",
      },
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return ALL_PROGRAMS.find((p) => p.slug === slug);
}

export function getAllProgramSlugs() {
  return ALL_PROGRAMS.map((p) => p.slug);
}
