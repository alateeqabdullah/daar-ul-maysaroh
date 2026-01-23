// // Update src/app/(public)/courses/page.tsx to fetch real data
// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import {
//   BookOpen,
//   Users,
//   Clock,
//   Award,
//   Star,
//   CheckCircle,
//   PlayCircle,
//   Book,
//   Globe,
//   Calendar,
//   Filter,
//   Search,
//   Loader2,
// } from "lucide-react";

// interface Course {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   level: string;
//   duration: string;
//   totalLessons: number;
//   price: number;
//   currency: string;
//   rating: number;
//   totalRatings: number;
//   isFeatured: boolean;
//   teacher: {
//     user: {
//       name: string;
//     };
//   };
//   _count: {
//     enrollments: number;
//   };
// }

// const categories = [
//   { name: "All", value: "all" },
//   { name: "Quran", value: "QURAN" },
//   { name: "Tajweed", value: "TAJWEED" },
//   { name: "Fiqh", value: "FIQH" },
//   { name: "Arabic", value: "ARABIC" },
//   { name: "Aqeedah", value: "AQEEDAH" },
//   { name: "Seerah", value: "SEERAH" },
//   { name: "Hadith", value: "HADITH" },
//   { name: "Children", value: "CHILDREN" },
// ];

// const levels = [
//   { name: "All Levels", value: "all" },
//   { name: "Beginner", value: "beginner" },
//   { name: "Intermediate", value: "intermediate" },
//   { name: "Advanced", value: "advanced" },
// ];

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedLevel, setSelectedLevel] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     filterCourses();
//   }, [courses, selectedCategory, selectedLevel, searchQuery]);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/courses");
//       const data = await response.json();
//       setCourses(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCourses = () => {
//     let filtered = [...courses];

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(
//         (course) => course.category === selectedCategory
//       );
//     }

//     if (selectedLevel !== "all") {
//       filtered = filtered.filter((course) =>
//         course.level.toLowerCase().includes(selectedLevel.toLowerCase())
//       );
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (course) =>
//           course.name.toLowerCase().includes(query) ||
//           course.description.toLowerCase().includes(query)
//       );
//     }

//     setFilteredCourses(filtered);
//   };

//   const getCategoryColor = (category: string) => {
//     const colors: Record<string, string> = {
//       QURAN:
//         "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
//       TAJWEED:
//         "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
//       FIQH: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
//       ARABIC:
//         "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
//       AQEEDAH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
//       SEERAH:
//         "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
//       HADITH:
//         "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
//     };
//     return (
//       colors[category] ||
//       "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-linear-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5" />
//         <div className="container relative mx-auto px-4 py-16 md:py-24">
//           <div className="mx-auto max-w-3xl text-center">
//             <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
//               <span className="block text-gradient bg-gradient-primary bg-clip-text">
//                 Islamic Courses
//               </span>
//               <span className="block text-gray-900 dark:text-white">
//                 For Every Level & Age
//               </span>
//             </h1>
//             <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
//               Choose from our comprehensive curriculum taught by qualified
//               scholars and teachers. Live classes, recorded sessions, and
//               personalized feedback.
//             </p>

//             {/* Search Bar */}
//             <div className="mt-10">
//               <div className="relative mx-auto max-w-2xl">
//                 <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search courses by name, description, or teacher..."
//                   className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="sticky top-16 z-10 border-b border-gray-200/50 bg-white/80 py-4 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/80">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div className="flex items-center gap-2">
//               <Filter className="h-5 w-5 text-gray-500" />
//               <span className="font-medium">Filters:</span>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {/* Category Filters */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   Category:
//                 </span>
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((category) => (
//                     <Button
//                       key={category.value}
//                       size="sm"
//                       variant={
//                         selectedCategory === category.value
//                           ? "default"
//                           : "outline"
//                       }
//                       onClick={() => setSelectedCategory(category.value)}
//                       className={
//                         selectedCategory === category.value
//                           ? "bg-gradient-primary"
//                           : ""
//                       }
//                     >
//                       {category.name}
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               {/* Level Filters */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   Level:
//                 </span>
//                 <div className="flex flex-wrap gap-2">
//                   {levels.map((level) => (
//                     <Button
//                       key={level.value}
//                       size="sm"
//                       variant={
//                         selectedLevel === level.value ? "default" : "outline"
//                       }
//                       onClick={() => setSelectedLevel(level.value)}
//                       className={
//                         selectedLevel === level.value
//                           ? "bg-gradient-primary"
//                           : ""
//                       }
//                     >
//                       {level.name}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Courses Grid */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <div className="mb-8 flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold">Available Courses</h2>
//               <p className="text-gray-600 dark:text-gray-400">
//                 {filteredCourses.length} courses found
//               </p>
//             </div>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setSelectedCategory("all");
//                 setSelectedLevel("all");
//                 setSearchQuery("");
//               }}
//             >
//               Clear Filters
//             </Button>
//           </div>

//           {filteredCourses.length === 0 ? (
//             <div className="text-center py-12">
//               <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
//               <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
//               <p className="mt-2 text-gray-600 dark:text-gray-400">
//                 Try adjusting your filters or search terms
//               </p>
//             </div>
//           ) : (
//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredCourses.map((course) => (
//                 <Card
//                   key={course.id}
//                   className="group relative overflow-hidden border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/50"
//                 >
//                   {course.isFeatured && (
//                     <div className="absolute right-4 top-4 z-10">
//                       <Badge className="bg-gradient-primary">
//                         <Award className="mr-1 h-3 w-3" />
//                         Featured
//                       </Badge>
//                     </div>
//                   )}

//                   <CardHeader>
//                     <div className="mb-4 flex items-center justify-between">
//                       <Badge className={getCategoryColor(course.category)}>
//                         {course.category}
//                       </Badge>
//                       <Badge variant="outline">{course.level}</Badge>
//                     </div>
//                     <CardTitle className="line-clamp-2 text-xl">
//                       <Link
//                         href={`/courses/${course.id}`}
//                         className="hover:text-purple-600 dark:hover:text-purple-400"
//                       >
//                         {course.name}
//                       </Link>
//                     </CardTitle>
//                     <CardDescription className="line-clamp-2">
//                       {course.description}
//                     </CardDescription>
//                   </CardHeader>

//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                             <Clock className="mr-1 h-4 w-4" />
//                             {course.duration}
//                           </div>
//                           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                             <Users className="mr-1 h-4 w-4" />
//                             {course._count.enrollments}
//                           </div>
//                         </div>
//                         <div className="flex items-center">
//                           <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                           <span className="ml-1 text-sm font-medium">
//                             {course.rating}
//                           </span>
//                           <span className="ml-1 text-xs text-gray-500">
//                             ({course.totalRatings})
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between text-sm">
//                         <div className="flex items-center text-gray-600 dark:text-gray-400">
//                           <Book className="mr-1 h-4 w-4" />
//                           {course.totalLessons} lessons
//                         </div>
//                         <div className="font-semibold">
//                           {course.currency} {course.price?.toFixed(2) || "Free"}
//                         </div>
//                       </div>

//                       <div className="pt-2">
//                         <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                           <span>Teacher:</span>
//                           <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                             {course.teacher.user.name}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>

//                   <CardFooter className="flex flex-col space-y-4">
//                     <Button className="w-full bg-gradient-primary" asChild>
//                       <Link href={`/courses/${course.id}`}>
//                         <PlayCircle className="mr-2 h-4 w-4" />
//                         View Details
//                       </Link>
//                     </Button>
//                     <Button className="w-full" variant="outline" asChild>
//                       <Link href={`/subscribe?course=${course.id}`}>
//                         Enroll Now
//                       </Link>
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-3xl text-center">
//             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//               Why Our Courses Stand Out
//             </h2>
//             <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
//               We combine traditional Islamic teaching with modern educational
//               technology
//             </p>
//           </div>

//           <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {[
//               {
//                 icon: <Globe className="h-8 w-8" />,
//                 title: "Global Access",
//                 description:
//                   "Learn from anywhere in the world with our online platform",
//               },
//               {
//                 icon: <Calendar className="h-8 w-8" />,
//                 title: "Flexible Schedule",
//                 description:
//                   "Live classes with recorded sessions available 24/7",
//               },
//               {
//                 icon: <Award className="h-8 w-8" />,
//                 title: "Certified Teachers",
//                 description:
//                   "All instructors are qualified scholars with teaching experience",
//               },
//             ].map((feature, index) => (
//               <div key={index} className="text-center">
//                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold">{feature.title}</h3>
//                 <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="rounded-3xl bg-gradient-primary p-8 md:p-12">
//             <div className="mx-auto max-w-3xl text-center">
//               <h2 className="text-3xl font-bold text-white sm:text-4xl">
//                 Ready to Start Your Islamic Learning Journey?
//               </h2>
//               <p className="mt-4 text-lg text-purple-100">
//                 Join thousands of students worldwide who are benefiting from our
//                 comprehensive Islamic education platform.
//               </p>
//               <div className="mt-8">
//                 <Button
//                   size="lg"
//                   className="bg-white text-purple-700 hover:bg-gray-100"
//                   asChild
//                 >
//                   <Link href="/register">Get Started Free</Link>
//                 </Button>
//                 <p className="mt-4 text-sm text-purple-200">
//                   14-day free trial • Cancel anytime • No credit card required
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



// Update src/app/(public)/courses/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  Star, 
  CheckCircle, 
  PlayCircle,
  Book,
  Globe,
  Calendar,
  Filter,
  Search,
  Loader2,
  AlertCircle
} from "lucide-react"

interface Course {
  id: string
  name: string
  description: string
  category: string
  level: string
  duration: string
  totalLessons: number
  price: number
  currency: string
  rating: number
  totalRatings: number
  isFeatured: boolean
  teacher: {
    user: {
      name: string
    }
  }
  _count: {
    enrollments: number
  }
}

const categories = [
  { name: "All", value: "all" },
  { name: "Quran", value: "QURAN" },
  { name: "Tajweed", value: "TAJWEED" },
  { name: "Fiqh", value: "FIQH" },
  { name: "Arabic", value: "ARABIC" },
  { name: "Aqeedah", value: "AQEEDAH" },
  { name: "Seerah", value: "SEERAH" },
  { name: "Hadith", value: "HADITH" },
  { name: "Children", value: "CHILDREN" }
]

const levels = [
  { name: "All Levels", value: "all" },
  { name: "Beginner", value: "beginner" },
  { name: "Intermediate", value: "intermediate" },
  { name: "Advanced", value: "advanced" }
]

// Mock data for development/testing
const mockCourses: Course[] = [
  {
    id: "1",
    name: "Complete Quran Memorization (Hifz) Program",
    description: "A comprehensive program to memorize the entire Quran with proper tajweed and understanding.",
    category: "QURAN",
    level: "Beginner to Advanced",
    duration: "12-36 months",
    totalLessons: 240,
    price: 49.00,
    currency: "USD",
    rating: 4.9,
    totalRatings: 324,
    isFeatured: true,
    teacher: {
      user: {
        name: "Sheikh Ahmed Al-Qari"
      }
    },
    _count: {
      enrollments: 1245
    }
  },
  {
    id: "2",
    name: "Tajweed Rules Mastery",
    description: "Master the rules of Quranic recitation with practical exercises and teacher feedback.",
    category: "TAJWEED",
    level: "Beginner to Intermediate",
    duration: "3 months",
    totalLessons: 36,
    price: 29.00,
    currency: "USD",
    rating: 4.7,
    totalRatings: 156,
    isFeatured: false,
    teacher: {
      user: {
        name: "Sheikh Ahmed Al-Qari"
      }
    },
    _count: {
      enrollments: 892
    }
  },
  {
    id: "3",
    name: "Fiqh of Worship - Comprehensive Guide",
    description: "Learn the rulings of purification, prayer, fasting, zakat, and hajj according to Hanafi madhhab.",
    category: "FIQH",
    level: "All Levels",
    duration: "4 months",
    totalLessons: 48,
    price: 34.00,
    currency: "USD",
    rating: 4.8,
    totalRatings: 89,
    isFeatured: true,
    teacher: {
      user: {
        name: "Ustadh Muhammad Ali"
      }
    },
    _count: {
      enrollments: 567
    }
  },
  {
    id: "4",
    name: "Arabic Language - Full Program",
    description: "Complete Arabic language course from basics to advanced reading and conversation.",
    category: "ARABIC",
    level: "Beginner",
    duration: "8 months",
    totalLessons: 96,
    price: 59.00,
    currency: "USD",
    rating: 4.6,
    totalRatings: 198,
    isFeatured: false,
    teacher: {
      user: {
        name: "Ustadha Fatima Zahra"
      }
    },
    _count: {
      enrollments: 456
    }
  },
  {
    id: "5",
    name: "Islamic Studies - Children Program",
    description: "Age-appropriate Islamic education covering Aqeedah, Seerah, Akhlaq, and Islamic stories.",
    category: "AQEEDAH",
    level: "Children (5-12)",
    duration: "Ongoing",
    totalLessons: 120,
    price: 29.00,
    currency: "USD",
    rating: 4.9,
    totalRatings: 234,
    isFeatured: true,
    teacher: {
      user: {
        name: "Ustadha Sarah Ahmed"
      }
    },
    _count: {
      enrollments: 789
    }
  },
  {
    id: "6",
    name: "Seerah of Prophet Muhammad (PBUH)",
    description: "In-depth study of the life, character, and teachings of Prophet Muhammad (peace be upon him).",
    category: "SEERAH",
    level: "Intermediate",
    duration: "4 months",
    totalLessons: 48,
    price: 34.00,
    currency: "USD",
    rating: 4.8,
    totalRatings: 167,
    isFeatured: false,
    teacher: {
      user: {
        name: "Dr. Omar Khan"
      }
    },
    _count: {
      enrollments: 456
    }
  }
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses) // Start with mock data
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [useMockData, setUseMockData] = useState(true)

  useEffect(() => {
    // Only fetch real data if not using mock data
    if (!useMockData) {
      fetchCourses()
    }
  }, [useMockData])

  useEffect(() => {
    filterCourses()
  }, [courses, selectedCategory, selectedLevel, searchQuery])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/courses')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setCourses(data || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError('Failed to load courses. Using sample data instead.')
      // Fall back to mock data if API fails
      setCourses(mockCourses)
      setUseMockData(true)
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    if (!courses || !Array.isArray(courses)) {
      setFilteredCourses([])
      return
    }

    let filtered = [...courses]

    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(course => 
        course.level.toLowerCase().includes(selectedLevel.toLowerCase())
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.teacher.user.name.toLowerCase().includes(query)
      )
    }

    setFilteredCourses(filtered)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      QURAN: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      TAJWEED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      FIQH: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      ARABIC: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      AQEEDAH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      SEERAH: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      HADITH: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    }
    return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  }

  const LoadingState = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading courses...</p>
      </div>
    </div>
  )

  const ErrorState = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h3 className="mt-4 text-lg font-semibold">Error Loading Courses</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
        <Button 
          onClick={fetchCourses} 
          className="mt-4 bg-gradient-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            "Try Again"
          )}
        </Button>
        <Button 
          onClick={() => {
            setCourses(mockCourses)
            setUseMockData(true)
            setError(null)
          }} 
          variant="outline"
          className="mt-2 ml-2"
        >
          Use Sample Data
        </Button>
      </div>
    </div>
  )

  if (loading && courses.length === 0) {
    return <LoadingState />
  }

  if (error && courses.length === 0) {
    return <ErrorState />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-gradient bg-gradient-primary bg-clip-text">
                Islamic Courses
              </span>
              <span className="block text-gray-900 dark:text-white">
                For Every Level & Age
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Choose from our comprehensive curriculum taught by qualified scholars 
              and teachers. Live classes, recorded sessions, and personalized feedback.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10">
              <div className="relative mx-auto max-w-2xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses by name, description, or teacher..."
                  className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {useMockData && (
              <div className="mt-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Using sample data
                </Badge>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  The API is not connected. Showing sample courses for demonstration.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-10 border-b border-gray-200/50 bg-white/80 py-4 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      size="sm"
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.value)}
                      className={selectedCategory === category.value ? "bg-gradient-primary" : ""}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Level Filters */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Level:</span>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level.value}
                      size="sm"
                      variant={selectedLevel === level.value ? "default" : "outline"}
                      onClick={() => setSelectedLevel(level.value)}
                      className={selectedLevel === level.value ? "bg-gradient-primary" : ""}
                    >
                      {level.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Available Courses</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </p>
            </div>
            <Button variant="outline" onClick={() => {
              setSelectedCategory("all")
              setSelectedLevel("all")
              setSearchQuery("")
            }}>
              Clear Filters
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-600" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search terms
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                  setSearchQuery("")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group relative overflow-hidden border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/50">
                  {course.isFeatured && (
                    <div className="absolute right-4 top-4 z-10">
                      <Badge className="bg-gradient-primary">
                        <Award className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className={getCategoryColor(course.category)}>
                        {course.category}
                      </Badge>
                      <Badge variant="outline">
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl">
                      <Link href={`/courses/${course.id}`} className="hover:text-purple-600 dark:hover:text-purple-400">
                        {course.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="mr-1 h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Users className="mr-1 h-4 w-4" />
                            {course._count?.enrollments || 0}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{course.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">
                            ({course.totalRatings})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Book className="mr-1 h-4 w-4" />
                          {course.totalLessons} lessons
                        </div>
                        <div className="font-semibold">
                          {course.currency} {course.price?.toFixed(2) || "Free"}
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span>Teacher:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {course.teacher?.user?.name || "Not assigned"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full bg-gradient-primary" asChild>
                      <Link href={`/courses/${course.id}`}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/subscribe?course=${course.id}`}>
                        Enroll Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Our Courses Stand Out
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We combine traditional Islamic teaching with modern educational technology
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Access",
                description: "Learn from anywhere in the world with our online platform"
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                title: "Flexible Schedule",
                description: "Live classes with recorded sessions available 24/7"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Certified Teachers",
                description: "All instructors are qualified scholars with teaching experience"
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Personalized Learning",
                description: "Custom learning paths based on your goals and level"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community Support",
                description: "Join study groups and connect with fellow students"
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Comprehensive Materials",
                description: "Access to extensive library of Islamic resources"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-primary p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Start Your Islamic Learning Journey?
              </h2>
              <p className="mt-4 text-lg text-purple-100">
                Join thousands of students worldwide who are benefiting from our 
                comprehensive Islamic education platform.
              </p>
              <div className="mt-8">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100" asChild>
                  <Link href="/register">
                    Get Started Free
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-purple-200">
                  14-day free trial • Cancel anytime • No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
