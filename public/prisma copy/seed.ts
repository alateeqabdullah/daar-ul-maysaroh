// prisma/seed.ts
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { hash } from "bcryptjs";

// Initialize Prisma
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// ==================== DATA DEFINITIONS ====================

// Define User Data (same as before)
const userData: Prisma.UserCreateInput[] = [
  // SUPER ADMIN
  {
    email: "admin@madrasah.com",
    password: "Admin123!",
    name: "Super Admin",
    phone: "+1234567890",
    role: "SUPER_ADMIN",
    status: "APPROVED",
    emailVerified: new Date(),
    isActive: true,
    adminProfile: {
      create: {
        department: "Administration",
        permissions: ["all"],
      },
    },
  },
  // ADMINS
  {
    email: "academic@madrasah.com",
    password: "Admin123!",
    name: "Academic Admin",
    phone: "+1234567891",
    role: "ADMIN",
    status: "APPROVED",
    emailVerified: new Date(),
    adminProfile: {
      create: {
        department: "Academics",
        permissions: ["manage_classes", "manage_teachers", "manage_students"],
      },
    },
  },
  {
    email: "finance@madrasah.com",
    password: "Admin123!",
    name: "Finance Admin",
    phone: "+1234567892",
    role: "ADMIN",
    status: "APPROVED",
    emailVerified: new Date(),
    adminProfile: {
      create: {
        department: "Finance",
        permissions: ["manage_payments", "view_reports"],
      },
    },
  },
  // TEACHERS
  {
    email: "quran.teacher@madrasah.com",
    password: "Teacher123!",
    name: "Sheikh Ahmed Al-Qari",
    phone: "+966501234567",
    role: "TEACHER",
    status: "APPROVED",
    emailVerified: new Date(),
    teacherProfile: {
      create: {
        teacherId: "TCH-2024-001",
        qualification: "PhD in Quranic Sciences, Ijazah in Hafs narration",
        specialization: "Quran Memorization & Tajweed",
        experienceYears: 15,
        bio: "Expert in Quran memorization with 15+ years of experience teaching students of all ages.",
        expertise: ["Quran Memorization", "Tajweed", "Qiraat"],
        contractType: "FULL_TIME",
        maxStudents: 25,
        teachingStyle: "Traditional with modern techniques",
      },
    },
  },
  {
    email: "fiqh.teacher@madrasah.com",
    password: "Teacher123!",
    name: "Ustadh Muhammad Ali",
    phone: "+923001234567",
    role: "TEACHER",
    status: "APPROVED",
    emailVerified: new Date(),
    teacherProfile: {
      create: {
        teacherId: "TCH-2024-002",
        qualification: "MA in Islamic Jurisprudence, Alimiyyah Degree",
        specialization: "Fiqh & Islamic Law",
        experienceYears: 10,
        bio: "Specialized in teaching Fiqh according to the four madhahib with practical applications.",
        expertise: ["Fiqh", "Usul al-Fiqh", "Comparative Fiqh"],
        contractType: "FULL_TIME",
        maxStudents: 30,
        teachingStyle: "Interactive with case studies",
      },
    },
  },
  {
    email: "arabic.teacher@madrasah.com",
    password: "Teacher123!",
    name: "Ustadha Fatima Zahra",
    phone: "+201001234567",
    role: "TEACHER",
    status: "APPROVED",
    emailVerified: new Date(),
    teacherProfile: {
      create: {
        teacherId: "TCH-2024-003",
        qualification:
          "BA in Arabic Language, Teaching Arabic as Foreign Language Certificate",
        specialization: "Arabic Language & Literature",
        experienceYears: 8,
        bio: "Passionate about teaching Arabic to non-native speakers with proven methods.",
        expertise: [
          "Modern Standard Arabic",
          "Classical Arabic",
          "Arabic Grammar",
        ],
        contractType: "PART_TIME",
        maxStudents: 20,
        teachingStyle: "Communicative approach",
      },
    },
  },
  // PARENTS
  {
    email: "parent.ahmed@example.com",
    password: "Parent123!",
    name: "Ahmed Khan",
    phone: "+971501234567",
    role: "PARENT",
    status: "APPROVED",
    emailVerified: new Date(),
    parentProfile: {
      create: {
        occupation: "Businessman",
        employer: "Self-employed",
        maritalStatus: "MARRIED",
        spouseName: "Fatima Khan",
        familySize: 5,
      },
    },
  },
  {
    email: "parent.sara@example.com",
    password: "Parent123!",
    name: "Sara Ali",
    phone: "+923331234567",
    role: "PARENT",
    status: "APPROVED",
    emailVerified: new Date(),
    parentProfile: {
      create: {
        occupation: "Doctor",
        employer: "City Hospital",
        maritalStatus: "MARRIED",
        spouseName: "Ali Raza",
        familySize: 4,
      },
    },
  },
  // STUDENTS
  {
    email: "student.omar@example.com",
    password: "Student123!",
    name: "Omar Ahmed",
    phone: "+971551234567",
    role: "STUDENT",
    status: "APPROVED",
    emailVerified: new Date(),
    studentProfile: {
      create: {
        studentId: "STD-2024-001",
        dateOfBirth: new Date("2010-05-15"),
        gender: "MALE",
        nationality: "Pakistani",
        address: "Dubai, UAE",
        city: "Dubai",
        country: "UAE",
        emergencyContact: "Ahmed Khan (Father)",
        emergencyPhone: "+971501234567",
        enrollmentDate: new Date("2024-09-01"),
        currentLevel: "Beginner",
        academicYear: "2024-2025",
        hifzLevel: "Juz 30",
        tajweedLevel: "Basic",
        qiraahStyle: "Hafs",
        memorizationGoal: "Complete Quran in 5 years",
      },
    },
  },
  {
    email: "student.aisha@example.com",
    password: "Student123!",
    name: "Aisha Ahmed",
    phone: "+971561234567",
    role: "STUDENT",
    status: "APPROVED",
    emailVerified: new Date(),
    studentProfile: {
      create: {
        studentId: "STD-2024-002",
        dateOfBirth: new Date("2012-08-20"),
        gender: "FEMALE",
        nationality: "Pakistani",
        address: "Dubai, UAE",
        city: "Dubai",
        country: "UAE",
        emergencyContact: "Ahmed Khan (Father)",
        emergencyPhone: "+971501234567",
        enrollmentDate: new Date("2024-09-01"),
        currentLevel: "Intermediate",
        academicYear: "2024-2025",
        hifzLevel: "Juz 25",
        tajweedLevel: "Intermediate",
        qiraahStyle: "Hafs",
        memorizationGoal: "Complete Quran in 3 years",
      },
    },
  },
  {
    email: "student.hassan@example.com",
    password: "Student123!",
    name: "Hassan Ali",
    phone: "+923341234567",
    role: "STUDENT",
    status: "APPROVED",
    emailVerified: new Date(),
    studentProfile: {
      create: {
        studentId: "STD-2024-003",
        dateOfBirth: new Date("2009-03-10"),
        gender: "MALE",
        nationality: "Pakistani",
        address: "Lahore, Pakistan",
        city: "Lahore",
        country: "Pakistan",
        emergencyContact: "Sara Ali (Mother)",
        emergencyPhone: "+923331234567",
        enrollmentDate: new Date("2024-09-01"),
        currentLevel: "Beginner",
        academicYear: "2024-2025",
        hifzLevel: "Juz 29",
        tajweedLevel: "Basic",
        qiraahStyle: "Hafs",
        memorizationGoal: "Complete Quran in 4 years",
      },
    },
  },
  {
    email: "student.adult@example.com",
    password: "Student123!",
    name: "Yusuf Abdullah",
    phone: "+966501234568",
    role: "STUDENT",
    status: "APPROVED",
    emailVerified: new Date(),
    studentProfile: {
      create: {
        studentId: "STD-2024-004",
        dateOfBirth: new Date("1995-11-25"),
        gender: "MALE",
        nationality: "Saudi",
        address: "Riyadh, Saudi Arabia",
        city: "Riyadh",
        country: "Saudi Arabia",
        emergencyContact: "Mohammed Abdullah (Brother)",
        emergencyPhone: "+966501234569",
        enrollmentDate: new Date("2024-09-01"),
        currentLevel: "Intermediate",
        academicYear: "2024-2025",
        hifzLevel: "Juz 20",
        tajweedLevel: "Intermediate",
        qiraahStyle: "Hafs",
        memorizationGoal: "Complete Quran in 2 years",
      },
    },
  },
  // PENDING USERS
  {
    email: "pending.student@example.com",
    password: "Pending123!",
    name: "Pending Student",
    phone: "+971521234567",
    role: "STUDENT",
    status: "PENDING",
    studentProfile: {
      create: {
        studentId: "PENDING-001",
        dateOfBirth: new Date("2011-07-15"),
        gender: "MALE",
        nationality: "Pending",
        address: "Pending",
        city: "Pending",
        country: "Pending",
        emergencyContact: "Pending",
        emergencyPhone: "+0000000000",
        enrollmentDate: new Date(),
        academicYear: "2024-2025",
        hifzLevel: "Not started",
        tajweedLevel: "Beginner",
        qiraahStyle: "Hafs",
        memorizationGoal: "To be determined",
        currentLevel: "Beginner",
      },
    },
  },
  {
    email: "pending.teacher@example.com",
    password: "Pending123!",
    name: "Pending Teacher",
    phone: "+966521234567",
    role: "TEACHER",
    status: "PENDING",
    teacherProfile: {
      create: {
        teacherId: "PENDING-TCH-001",
        qualification: "BA in Islamic Studies",
        expertise: [],
        contractType: "FULL_TIME",
        maxStudents: 20,
      },
    },
  },
  {
    email: "rejected.user@example.com",
    password: "Rejected123!",
    name: "Rejected User",
    phone: "+923351234567",
    role: "STUDENT",
    status: "REJECTED",
    rejectionReason: "Incomplete application information",
  },
];

const classData: Prisma.ClassCreateInput[] = [
  {
    name: "Quran Memorization - Beginner Level",
    code: "QUR-101",
    description:
      "Start your journey of Quran memorization with proper tajweed rules. Suitable for complete beginners.",
    level: "Beginner",
    section: "Morning",
    capacity: 20,
    currentEnrollment: 0,
    academicYear: "2024-2025",
    term: "Fall 2024",
    scheduleType: "REGULAR",
    isActive: true,
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-12-20"),
    teacher: {
      connect: {
        userId: "quran.teacher@madrasah.com",
      },
    },
    createdBy: {
      connect: {
        email: "admin@madrasah.com",
      },
    },
    schedules: {
      create: [
        {
          dayOfWeek: 1,
          startTime: "09:00",
          endTime: "10:30",
          timezone: "UTC",
          isLive: true,
          meetingPlatform: "ZOOM",
          isRecurring: true,
        },
        {
          dayOfWeek: 3,
          startTime: "09:00",
          endTime: "10:30",
          timezone: "UTC",
          isLive: true,
          meetingPlatform: "ZOOM",
          isRecurring: true,
        },
      ],
    },
    subjects: {
      create: [
        {
          name: "Memorization of Juz Amma",
          code: "QUR-101-MEM",
          description:
            "Memorization of the 30th Juz of the Quran with proper tajweed",
          category: "QURAN",
          creditHours: 3,
          orderIndex: 1,
          teacher: {
            connect: {
              userId: "quran.teacher@madrasah.com",
            },
          },
        },
        {
          name: "Basic Tajweed Rules",
          code: "QUR-101-TAJ",
          description: "Learning the foundational rules of Quranic recitation",
          category: "TAJWEED",
          creditHours: 2,
          orderIndex: 2,
          teacher: {
            connect: {
              userId: "quran.teacher@madrasah.com",
            },
          },
        },
      ],
    },
  },
  {
    name: "Fiqh of Worship - Intermediate",
    code: "FIQ-201",
    description:
      "Detailed study of purification, prayer, fasting, zakat, and hajj according to Hanafi madhhab.",
    level: "Intermediate",
    section: "Evening",
    capacity: 25,
    currentEnrollment: 0,
    academicYear: "2024-2025",
    term: "Fall 2024",
    scheduleType: "REGULAR",
    isActive: true,
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-12-20"),
    teacher: {
      connect: {
        userId: "fiqh.teacher@madrasah.com",
      },
    },
    createdBy: {
      connect: {
        email: "admin@madrasah.com",
      },
    },
    schedules: {
      create: [
        {
          dayOfWeek: 2,
          startTime: "18:00",
          endTime: "19:30",
          timezone: "UTC",
          isLive: true,
          meetingPlatform: "GOOGLE_MEET",
          isRecurring: true,
        },
        {
          dayOfWeek: 4,
          startTime: "18:00",
          endTime: "19:30",
          timezone: "UTC",
          isLive: true,
          meetingPlatform: "GOOGLE_MEET",
          isRecurring: true,
        },
      ],
    },
    subjects: {
      create: [
        {
          name: "Purification (Taharah)",
          code: "FIQ-201-TAH",
          description:
            "Rules of purification in Islam according to Hanafi school",
          category: "FIQH",
          creditHours: 2,
          orderIndex: 1,
          teacher: {
            connect: {
              userId: "fiqh.teacher@madrasah.com",
            },
          },
        },
        {
          name: "Prayer (Salah)",
          code: "FIQ-201-SAL",
          description: "Complete fiqh of prayer with practical applications",
          category: "FIQH",
          creditHours: 3,
          orderIndex: 2,
          teacher: {
            connect: {
              userId: "fiqh.teacher@madrasah.com",
            },
          },
        },
      ],
    },
  },
];

const enrollmentData: Prisma.EnrollmentCreateInput[] = [
  {
    student: { connect: { userId: "student.omar@example.com" } },
    class: { connect: { code: "QUR-101" } },
    enrollmentType: "REGULAR",
    status: "ACTIVE",
    enrolledAt: new Date("2024-09-01"),
  },
  {
    student: { connect: { userId: "student.aisha@example.com" } },
    class: { connect: { code: "FIQ-201" } },
    enrollmentType: "REGULAR",
    status: "ACTIVE",
    enrolledAt: new Date("2024-09-01"),
  },
  {
    student: { connect: { userId: "student.hassan@example.com" } },
    class: { connect: { code: "QUR-101" } },
    enrollmentType: "REGULAR",
    status: "ACTIVE",
    enrolledAt: new Date("2024-09-01"),
  },
  {
    student: { connect: { userId: "student.adult@example.com" } },
    class: { connect: { code: "FIQ-201" } },
    enrollmentType: "REGULAR",
    status: "ACTIVE",
    enrolledAt: new Date("2024-09-01"),
  },
];

const announcementData: Prisma.AnnouncementCreateInput[] = [
  {
    title: "Welcome to New Academic Year 2024-2025!",
    content:
      "We are excited to welcome all students, parents, and teachers to the new academic year. May Allah make it beneficial for all of us.",
    type: "GENERAL",
    priority: "HIGH",
    targetAudience: ["ALL"],
    publishAt: new Date("2024-09-01"),
    isPublished: true,
    createdBy: { connect: { email: "admin@madrasah.com" } },
  },
  {
    title: "Eid al-Fitr Holiday Announcement",
    content:
      "The madrasah will be closed for Eid al-Fitr holidays from April 10th to April 15th. Classes will resume on April 16th.",
    type: "HOLIDAY",
    priority: "NORMAL",
    targetAudience: ["STUDENTS", "TEACHERS", "PARENTS"],
    publishAt: new Date("2024-04-01"),
    isPublished: true,
    createdBy: { connect: { email: "admin@madrasah.com" } },
  },
];

const quranProgressData: Prisma.QuranProgressCreateInput[] = [
  {
    student: { connect: { userId: "student.omar@example.com" } },
    type: "MEMORIZATION",
    surahNumber: 78,
    surahName: "An-Naba",
    juzNumber: 30,
    fromAyah: 1,
    toAyah: 40,
    totalAyahs: 40,
    status: "COMPLETED",
    startedAt: new Date("2024-09-01"),
    completedAt: new Date("2024-09-15"),
    evaluationScore: 8,
    evaluationNotes: "Good memorization, need to work on tajweed of ghunnah",
  },
  {
    student: { connect: { userId: "student.omar@example.com" } },
    type: "MEMORIZATION",
    surahNumber: 79,
    surahName: "An-Naziat",
    juzNumber: 30,
    fromAyah: 1,
    toAyah: 46,
    totalAyahs: 46,
    status: "IN_PROGRESS",
    startedAt: new Date("2024-09-16"),
    revisionCount: 3,
  },
];

const assignmentData: Prisma.AssignmentCreateInput[] = [
  {
    title: "Memorize Surah An-Naziat (1-20)",
    description:
      "Memorize the first 20 ayahs of Surah An-Naziat with proper tajweed.",
    dueDate: new Date("2024-10-15"),
    totalMarks: 20,
    weightage: 15,
    type: "TEST",
    attachments: ["https://example.com/surah-an-naziat-audio.mp3"],
    instructions: "Record your recitation and upload the audio file.",
    subject: { connect: { code: "QUR-101-MEM" } },
    createdBy: { connect: { email: "quran.teacher@madrasah.com" } },
  },
];

const studentGroupData: Prisma.StudentGroupCreateInput[] = [
  {
    name: "Hifz Excellence Group",
    description: "Advanced memorization group for motivated students",
    type: "HIFZ",
    academicYear: "2024-2025",
    capacity: 15,
    currentCount: 0,
    scheduleType: "REGULAR",
    isActive: true,
    startDate: new Date("2024-09-01"),
    teacher: { connect: { userId: "quran.teacher@madrasah.com" } },
    class: { connect: { code: "QUR-101" } },
    schedules: {
      create: [
        {
          dayOfWeek: 6,
          startTime: "08:00",
          endTime: "09:30",
          timezone: "UTC",
          isOnline: true,
          meetingPlatform: "ZOOM",
          isRecurring: true,
        },
      ],
    },
  },
];

// ==================== MAIN FUNCTION ====================
export async function main() {
  console.log("🌱 Starting database seeding...");

  // Arrays to hold created entities for linking later
  // We use 'any' here for simplicity in the seed file, but in a real app these would be typed
  const createdStudents: any[] = [];
  const createdTeachers: any[] = [];

  try {
    // Clear existing data
    console.log("🧹 Clearing existing data...");
    // Using CASCADE to clean up dependent tables
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE pricing_plans CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE courses CASCADE;`;

    // 1. Create Users (Students, Teachers, Admins, Parents)
    console.log("👤 Creating users...");
    for (const user of userData) {
      const hashedPassword = await hash(user.password!, 12);

      const createdUser = await prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
        include: {
          studentProfile: true,
          teacherProfile: true,
        },
      });

      // Capture created profiles for later usage in subscriptions/courses
      if (createdUser.studentProfile) {
        createdStudents.push(createdUser.studentProfile);
      }
      if (createdUser.teacherProfile) {
        createdTeachers.push(createdUser.teacherProfile);
      }

      console.log(`✅ Created user: ${user.email}`);
    }

    // 2. Create Classes
    console.log("🏫 Creating classes...");
    for (const classItem of classData) {
      await prisma.class.create({
        data: classItem,
      });
      console.log(`✅ Created class: ${classItem.name}`);
    }

    // 3. Link Students to Parents
    console.log("👨‍👩‍👧‍👦 Linking students to parents...");
    // Fetch parents ids
    const parentAhmed = await prisma.parent.findFirst({
      where: { user: { email: "parent.ahmed@example.com" } },
    });
    const parentSara = await prisma.parent.findFirst({
      where: { user: { email: "parent.sara@example.com" } },
    });

    if (parentAhmed) {
      await prisma.student.update({
        where: { userId: "student.omar@example.com" },
        data: { parent: { connect: { id: parentAhmed.id } } },
      });
      await prisma.student.update({
        where: { userId: "student.aisha@example.com" },
        data: { parent: { connect: { id: parentAhmed.id } } },
      });
    }

    if (parentSara) {
      await prisma.student.update({
        where: { userId: "student.hassan@example.com" },
        data: { parent: { connect: { id: parentSara.id } } },
      });
    }

    // 4. Create Enrollments
    console.log("📝 Creating enrollments...");
    for (const enrollment of enrollmentData) {
      await prisma.enrollment.create({
        data: enrollment,
      });
      console.log(
        `✅ Created enrollment for ${enrollment.student.connect?.userId}`
      );
    }

    // 5. Create Pricing Plans
    console.log("💰 Creating Pricing Plans...");
    const createdPlans = await Promise.all([
      // One-on-One Quran Memorization Plan
      prisma.pricingPlan.create({
        data: {
          name: "One-on-One Quran Hifz",
          description:
            "Personalized Quran memorization sessions with dedicated teacher",
          type: "ONE_ON_ONE",
          category: "QURAN",
          level: "All Levels",
          minDuration: 30,
          durationStep: 5,
          daysPerWeek: [1, 2, 3, 5, 7],
          sessionsPerWeek: [1, 2, 3, 4, 5],
          basePrice: 49.0,
          pricePerMinute: 1.25,
          currency: "USD",
          monthlyDiscount: 5,
          quarterlyDiscount: 10,
          yearlyDiscount: 15,
          features: [
            "Personalized lesson plan",
            "Weekly progress reports",
            "Recording review",
            "Tajweed correction",
            "Flexible scheduling",
          ],
          isActive: true,
          isPublic: true,
          orderIndex: 1,
          pricingTiers: {
            create: [
              {
                minDuration: 30,
                daysPerWeek: 2,
                sessionsPerWeek: 2,
                pricePerSession: 29.0,
                pricePerMonth: 232.0,
                isRecommended: true,
              },
              {
                minDuration: 45,
                daysPerWeek: 3,
                sessionsPerWeek: 3,
                pricePerSession: 40.0,
                pricePerMonth: 480.0,
              },
              {
                minDuration: 60,
                daysPerWeek: 5,
                sessionsPerWeek: 5,
                pricePerSession: 55.0,
                pricePerMonth: 1100.0,
              },
            ],
          },
        },
      }),

      // Group Tajweed Classes
      prisma.pricingPlan.create({
        data: {
          name: "Group Tajweed Class",
          description: "Learn tajweed rules in small group settings",
          type: "GROUP",
          category: "TAJWEED",
          level: "Beginner",
          minDuration: 45,
          durationStep: 15,
          daysPerWeek: [1, 2],
          sessionsPerWeek: [1, 2],
          basePrice: 29.0,
          pricePerSession: 19.0,
          currency: "USD",
          monthlyDiscount: 10,
          quarterlyDiscount: 15,
          yearlyDiscount: 20,
          features: [
            "Small group (3-6 students)",
            "Interactive sessions",
            "Group exercises",
            "Weekly assignments",
            "Progress tracking",
          ],
          isActive: true,
          isPublic: true,
          orderIndex: 2,
          pricingTiers: {
            create: [
              {
                minDuration: 45,
                daysPerWeek: 1,
                sessionsPerWeek: 1,
                pricePerSession: 19.0,
                pricePerMonth: 76.0,
                isRecommended: true,
              },
              {
                minDuration: 60,
                daysPerWeek: 2,
                sessionsPerWeek: 2,
                pricePerSession: 25.0,
                pricePerMonth: 200.0,
              },
            ],
          },
        },
      }),

      // Arabic Language Course
      prisma.pricingPlan.create({
        data: {
          name: "Arabic Language Intensive",
          description:
            "Comprehensive Arabic language course with certified teachers",
          type: "CLASS",
          category: "ARABIC",
          level: "Beginner",
          minDuration: 60,
          durationStep: 30,
          daysPerWeek: [2, 3],
          sessionsPerWeek: [2, 3],
          basePrice: 39.0,
          pricePerSession: 29.0,
          currency: "USD",
          monthlyDiscount: 5,
          quarterlyDiscount: 12,
          yearlyDiscount: 18,
          features: [
            "Structured curriculum",
            "Certified Arabic teachers",
            "Speaking practice",
            "Writing exercises",
            "Monthly assessments",
          ],
          isActive: true,
          isPublic: true,
          orderIndex: 3,
          pricingTiers: {
            create: [
              {
                minDuration: 60,
                daysPerWeek: 2,
                sessionsPerWeek: 2,
                pricePerSession: 29.0,
                pricePerMonth: 232.0,
                isRecommended: true,
              },
              {
                minDuration: 90,
                daysPerWeek: 3,
                sessionsPerWeek: 3,
                pricePerSession: 40.0,
                pricePerMonth: 480.0,
              },
            ],
          },
        },
      }),
    ]);

    console.log("✅ Created", createdPlans.length, "Pricing Plans");

    // 6. Create Subscriptions
    // We only create subscriptions if we have valid students and plans
    if (
      createdStudents.length >= 2 &&
      createdPlans.length >= 2 &&
      createdTeachers.length > 0
    ) {
      console.log("💳 Creating Sample Subscriptions...");

      const subscriptions = await Promise.all([
        prisma.subscription.create({
          data: {
            studentId: createdStudents[0].id, // Using captured Student ID
            planId: createdPlans[0].id,
            duration: 30,
            daysPerWeek: 3,
            sessionsPerWeek: 3,
            scheduleType: "REGULAR",
            basePrice: 360.0,
            discount: 10.0,
            finalPrice: 324.0,
            billingPeriod: "MONTHLY",
            currency: "USD",
            preferredDays: [1, 3, 5], // Mon, Wed, Fri
            preferredTimes: ["14:00", "15:00", "16:00"],
            timezone: "America/New_York",
            status: "ACTIVE",
            startDate: new Date(),
            nextBillingAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            autoRenew: true,
          },
        }),
        prisma.subscription.create({
          data: {
            studentId: createdStudents[1].id, // Using captured Student ID
            planId: createdPlans[1].id,
            duration: 45,
            daysPerWeek: 2,
            sessionsPerWeek: 2,
            scheduleType: "REGULAR",
            teacherId: createdTeachers[0].id, // Using captured Teacher ID
            basePrice: 152.0,
            discount: 15.0,
            finalPrice: 129.2,
            billingPeriod: "QUARTERLY",
            currency: "USD",
            preferredDays: [2, 4], // Tue, Thu
            preferredTimes: ["17:00", "18:00"],
            timezone: "Europe/London",
            status: "ACTIVE",
            startDate: new Date(),
            nextBillingAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            autoRenew: true,
          },
        }),
      ]);
      console.log("✅ Created", subscriptions.length, "Sample Subscriptions");
    }

    // 7. Create Announcements
    console.log("📢 Creating announcements...");
    for (const announcement of announcementData) {
      await prisma.announcement.create({
        data: announcement,
      });
      console.log(`✅ Created announcement: ${announcement.title}`);
    }

    // 8. Create Quran Progress
    console.log("📖 Creating Quran progress records...");
    for (const progress of quranProgressData) {
      await prisma.quranProgress.create({
        data: progress,
      });
      console.log(
        `✅ Created Quran progress for ${progress.student.connect?.userId}`
      );
    }

    // 9. Create Courses (Requires Teacher ID)
    if (createdTeachers.length >= 2) {
      console.log("📚 Creating Courses...");

      const courses = await Promise.all([
        // Quran Memorization Course
        prisma.course.create({
          data: {
            name: "Complete Quran Memorization (Hifz) Program",
            description:
              "A comprehensive program to memorize the entire Quran with proper tajweed and understanding.",
            category: "QURAN",
            level: "Beginner to Advanced",
            duration: "12-36 months",
            totalLessons: 240,
            price: 49.0,
            currency: "USD",
            features: [
              "Personalized memorization plan",
              "Daily revision schedule",
              "Tajweed correction sessions",
              "Monthly progress evaluations",
            ],
            requirements: [
              "Basic ability to read Arabic script",
              "Dedication to daily practice",
            ],
            curriculum: {
              modules: [
                {
                  title: "Foundation & Preparation",
                  weeks: 2,
                  topics: [
                    "Introduction to Hifz methodology",
                    "Setting realistic goals",
                  ],
                },
              ],
            },
            schedule: {
              liveSessions: [
                {
                  day: "Monday",
                  time: "9:00 AM - 10:30 AM",
                  type: "Memorization",
                },
              ],
              selfStudy: "Daily 1-hour practice recommended",
            },
            teacherId: createdTeachers[0].id, // Referenced correctly
            isActive: true,
            isPublic: true,
            isFeatured: true,
            viewCount: 1567,
            rating: 4.9,
            totalRatings: 324,
          },
        }),

        // Tajweed Course
        prisma.course.create({
          data: {
            name: "Tajweed Rules Mastery",
            description:
              "Master the rules of Quranic recitation with practical exercises and teacher feedback.",
            category: "TAJWEED",
            level: "Beginner to Intermediate",
            duration: "3 months",
            totalLessons: 36,
            price: 29.0,
            currency: "USD",
            features: [
              "Complete tajweed rules coverage",
              "Practical recitation exercises",
            ],
            requirements: ["Ability to read Arabic script fluently"],
            teacherId: createdTeachers[0].id, // Referenced correctly
            isActive: true,
            isPublic: true,
            isFeatured: true,
            viewCount: 892,
            rating: 4.7,
            totalRatings: 156,
          },
        }),

        // Fiqh Course
        prisma.course.create({
          data: {
            name: "Fiqh of Worship - Comprehensive Guide",
            description:
              "Learn the rulings of purification, prayer, fasting, zakat, and hajj according to Hanafi madhhab.",
            category: "FIQH",
            level: "All Levels",
            duration: "4 months",
            totalLessons: 48,
            price: 34.0,
            currency: "USD",
            features: [
              "Detailed rulings of purification",
              "Complete prayer guidelines",
            ],
            teacherId: createdTeachers[1].id, // Referenced correctly
            isActive: true,
            isPublic: true,
            isFeatured: false,
            viewCount: 567,
            rating: 4.8,
            totalRatings: 89,
          },
        }),
      ]);

      console.log("✅ Created", courses.length, "Courses");

      // 10. Create Course Materials (Linked to created courses)
      const courseMaterials = await Promise.all([
        prisma.courseMaterial.create({
          data: {
            courseId: courses[0].id,
            title: "Complete Hifz Methodology Guide",
            description:
              "Detailed guide on the methodology used in this course",
            type: "DOCUMENT",
            fileUrl: "https://example.com/hifz-methodology.pdf",
            fileSize: 2450000,
            fileType: "application/pdf",
            chapter: "Introduction",
            lessonNumber: 1,
            isFree: true,
            orderIndex: 1,
          },
        }),
        prisma.courseMaterial.create({
          data: {
            courseId: courses[0].id,
            title: "Daily Revision Schedule Template",
            description: "Excel template for tracking daily revision",
            type: "DOCUMENT",
            fileUrl: "https://example.com/revision-schedule.xlsx",
            fileSize: 150000,
            fileType: "application/vnd.ms-excel",
            chapter: "Foundation",
            lessonNumber: 2,
            isFree: true,
            orderIndex: 2,
          },
        }),
      ]);
      console.log("✅ Created", courseMaterials.length, "Course Materials");
    }

    // 11. Create Assignments
    console.log("📚 Creating assignments...");
    for (const assignment of assignmentData) {
      await prisma.assignment.create({
        data: assignment,
      });
      console.log(`✅ Created assignment: ${assignment.title}`);
    }

    // 12. Create Student Groups
    console.log("👥 Creating student groups...");
    for (const group of studentGroupData) {
      const createdGroup = await prisma.studentGroup.create({
        data: group,
      });
      console.log(`✅ Created group: ${group.name}`);

      // Add members to group
      await prisma.groupMember.create({
        data: {
          group: { connect: { id: createdGroup.id } },
          student: { connect: { userId: "student.omar@example.com" } },
          role: "LEADER",
          status: "ACTIVE",
        },
      });
      await prisma.groupMember.create({
        data: {
          group: { connect: { id: createdGroup.id } },
          student: { connect: { userId: "student.adult@example.com" } },
          role: "MEMBER",
          status: "ACTIVE",
        },
      });
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Users Created: ${userData.length}`);
    console.log(`   - Classes Created: ${classData.length}`);
    console.log(`   - Pricing Plans: ${createdPlans.length}`);
    console.log(`   - Enrollments: ${enrollmentData.length}`);

    console.log("\n🔑 Default Login Credentials:");
    console.log("   Super Admin: admin@madrasah.com / Admin123!");
    console.log("   Teacher: quran.teacher@madrasah.com / Teacher123!");
    console.log("   Student: student.omar@example.com / Student123!");
    console.log("   Parent: parent.ahmed@example.com / Parent123!");
    console.log("   Pending User: pending.student@example.com / Pending123!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
