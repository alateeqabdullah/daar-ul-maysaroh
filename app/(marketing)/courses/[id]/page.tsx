"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  CheckCircle,
  Star,
  BookOpen,
  User,
  Zap,
  Target,
  Award,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnrollmentForm } from "@/components/courses/enrollment-form";
import { PriceCalculator } from "@/components/courses/price-calculator";
import { useCourses } from "@/hooks/use-courses";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { courses, isLoading } = useCourses();
  const { isAuthenticated } = useAuth();

  const course = courses.find((c) => c.id === courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse bg-card rounded-xl border p-6 h-96"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8 text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">
            Course Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
           {` The course you're looking for doesn't exist.`}
          </p>
          <Link href="/#courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div
              className={cn(
                "inline-flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium mb-6",
                course.type === "ONE_ON_ONE"
                  ? "bg-blue-500/20 text-blue-200"
                  : "bg-green-500/20 text-green-200"
              )}
            >
              {course.type === "ONE_ON_ONE" ? (
                <>
                  <User className="w-4 h-4" />
                  <span>One-on-One Course</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span>Group Course</span>
                </>
              )}
            </div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              {course.title}
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto mb-8">
              {course.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">${course.price}</div>
                <div className="text-sm text-primary-foreground/80">
                  per month
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-lg font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}m</span>
                </div>
                <div className="text-sm text-primary-foreground/80">
                  per session
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold capitalize">
                  {course.level.toLowerCase()}
                </div>
                <div className="text-sm text-primary-foreground/80">Level</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-lg font-semibold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
                <div className="text-sm text-primary-foreground/80">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border shadow-sm p-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <Zap className="w-6 h-6 text-primary mr-3" />
                 {` What You'll Achieve`}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-card-foreground font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border shadow-sm p-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 text-primary mr-3" />
                  Course Overview
                </h2>
                <div className="prose prose-lg max-w-none text-card-foreground space-y-4">
                  <p>
                    This comprehensive Quran course is designed to help you
                    master {course.title.toLowerCase()}
                    through personalized sessions with certified teachers. Our
                    curriculum is carefully structured to ensure gradual
                    progression and solid understanding of Quranic principles.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-heading font-bold flex items-center">
                        <Target className="w-5 h-5 text-primary mr-2" />
                        Learning Objectives
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Master proper Quran recitation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Understand Tajweed rules</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Build confidence in reading</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Develop love for Quran learning</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-heading font-bold flex items-center">
                        <Award className="w-5 h-5 text-primary mr-2" />
                      {`  What's Included`}
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>Personalized learning plan</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>Weekly progress reports</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>24/7 teacher support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>Completion certificate</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Custom Price Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PriceCalculator />
              </motion.div>
            </div>

            {/* Enrollment Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                <EnrollmentForm course={course} />

                {/* Guarantee Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6 text-center">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-green-800 mb-2">
                    14-Day Satisfaction Guarantee
                  </h4>
                  <p className="text-sm text-green-700">
                    Not satisfied? Get a full refund within the first 14 days.
                    No questions asked.
                  </p>
                </div>

                {/* Support Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                  <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-blue-800 mb-2">
                    Need Help Choosing?
                  </h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Our education consultants are here to help you find the
                    perfect course.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link href="/contact">Get Free Consultation</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import {
//   CheckCircle,
//   Clock,
//   Users,
//   Award,
//   BookOpen,
//   Star,
//   Zap,
//   Calendar,
//   Target,
//   ArrowRight,
//   Crown,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// interface CourseDetailProps {
//   course: {
//     id: string;
//     title: string;
//     description: string;
//     longDescription: string;
//     level: "Beginner" | "Intermediate" | "Advanced";
//     classType: "one-on-one" | "group";
//     duration: number;
//     basePrice: number;
//     features: string[];
//     prerequisites: string[];
//     outcomes: string[];
//     icon: string;
//   };
//   user?: {
//     id: string;
//     email: string;
//     name: string;
//     role: string;
//   };
// }

// export function CourseDetail({ course, user }: CourseDetailProps) {
//   const [calculator, setCalculator] = useState({
//     sessionsPerWeek: 2,
//     familyMembers: 1,
//     duration: 3,
//   });

//   const calculatePrice = () => {
//     const basePrice = course.basePrice * calculator.sessionsPerWeek * 4; // Monthly
//     let totalPrice = basePrice * calculator.duration;

//     // Family discount
//     if (calculator.familyMembers > 1) {
//       const discount = Math.min(30, (calculator.familyMembers - 1) * 10);
//       totalPrice = totalPrice * (1 - discount / 100);
//     }

//     // Bulk discount for longer duration
//     if (calculator.duration >= 6) {
//       totalPrice *= 0.9;
//     } else if (calculator.duration >= 3) {
//       totalPrice *= 0.95;
//     }

//     return Math.round(totalPrice);
//   };

//   const calculateMonthlyPrice = () => {
//     const total = calculatePrice();
//     return Math.round(total / calculator.duration);
//   };

//   return (
//     <div className="min-h-screen bg-background pt-16">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-primary to-accent text-white py-16">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-4xl"
//           >
//             <div className="flex items-center space-x-4 mb-6">
//               <span className="text-4xl">{course.icon}</span>
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-2">
//                   {course.title}
//                 </h1>
//                 <p className="text-xl text-primary-foreground/90">
//                   {course.description}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4 mb-8">
//               <div
//                 className={cn(
//                   "flex items-center space-x-2 px-4 py-2 rounded-full",
//                   course.level === "Beginner"
//                     ? "bg-green-500/20 text-green-300"
//                     : course.level === "Intermediate"
//                       ? "bg-blue-500/20 text-blue-300"
//                       : "bg-purple-500/20 text-purple-300"
//                 )}
//               >
//                 <Zap className="w-4 h-4" />
//                 <span>{course.level}</span>
//               </div>
//               <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
//                 <Users className="w-4 h-4" />
//                 <span>One-on-One Classes</span>
//               </div>
//               <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
//                 <Clock className="w-4 h-4" />
//                 <span>{course.duration} minutes per session</span>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link href={user ? "/dashboard/enroll" : "/auth/signup"}>
//                 <Button
//                   size="lg"
//                   className="bg-white text-primary hover:bg-gray-100"
//                 >
//                   Enroll Now
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </Link>
//               <Link href="/auth/signup">
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="border-white text-white hover:bg-white/10"
//                 >
//                   Start Free Trial
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Course Content */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-12">
//               {/* Course Description */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 className="prose prose-lg max-w-none"
//               >
//                 <h2 className="text-3xl font-heading font-bold mb-6">
//                   Course Overview
//                 </h2>
//                 <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
//                   {course.longDescription}
//                 </div>
//               </motion.div>

//               {/* Learning Outcomes */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 <h2 className="text-3xl font-heading font-bold mb-6">
//                  {` What You'll Achieve`}
//                 </h2>
//                 <div className="grid gap-3">
//                   {course.outcomes.map((outcome, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center space-x-3 p-4 bg-card rounded-lg border"
//                     >
//                       <Target className="w-5 h-5 text-primary flex-shrink-0" />
//                       <span className="text-card-foreground">{outcome}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Course Features */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <h2 className="text-3xl font-heading font-bold mb-6">
//                   Course Features
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {course.features.map((feature, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
//                       <span className="text-card-foreground">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Pricing Calculator */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 className="bg-card rounded-xl border shadow-lg p-6 sticky top-24"
//               >
//                 <div className="flex items-center space-x-3 mb-6">
//                   <Crown className="w-6 h-6 text-primary" />
//                   <h3 className="text-xl font-heading font-bold">Enroll Now</h3>
//                 </div>

//                 <div className="space-y-4">
//                   {/* Sessions Per Week */}
//                   <div>
//                     <label className="block text-sm font-medium text-card-foreground mb-2">
//                       Sessions Per Week
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {[2, 3, 5].map((count) => (
//                         <button
//                           key={count}
//                           onClick={() =>
//                             setCalculator((prev) => ({
//                               ...prev,
//                               sessionsPerWeek: count,
//                             }))
//                           }
//                           className={cn(
//                             "py-2 rounded-lg border transition-all duration-200 text-sm",
//                             calculator.sessionsPerWeek === count
//                               ? "bg-primary text-primary-foreground border-primary"
//                               : "bg-background border-border hover:border-primary/50"
//                           )}
//                         >
//                           {count}/week
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Family Members */}
//                   <div>
//                     <label className="block text-sm font-medium text-card-foreground mb-2">
//                       Family Members
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {[1, 2, 3].map((count) => (
//                         <button
//                           key={count}
//                           onClick={() =>
//                             setCalculator((prev) => ({
//                               ...prev,
//                               familyMembers: count,
//                             }))
//                           }
//                           className={cn(
//                             "py-2 rounded-lg border transition-all duration-200 text-sm",
//                             calculator.familyMembers === count
//                               ? "bg-primary text-primary-foreground border-primary"
//                               : "bg-background border-border hover:border-primary/50"
//                           )}
//                         >
//                           {count} {count === 1 ? "person" : "people"}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Duration */}
//                   <div>
//                     <label className="block text-sm font-medium text-card-foreground mb-2">
//                       Duration
//                     </label>
//                     <div className="grid grid-cols-3 gap-2">
//                       {[1, 3, 6].map((months) => (
//                         <button
//                           key={months}
//                           onClick={() =>
//                             setCalculator((prev) => ({
//                               ...prev,
//                               duration: months,
//                             }))
//                           }
//                           className={cn(
//                             "py-2 rounded-lg border transition-all duration-200 text-sm",
//                             calculator.duration === months
//                               ? "bg-primary text-primary-foreground border-primary"
//                               : "bg-background border-border hover:border-primary/50"
//                           )}
//                         >
//                           {months}m
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Price Summary */}
//                   <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-4 text-white text-center">
//                     <div className="text-2xl font-bold mb-1">
//                       ${calculateMonthlyPrice()}
//                       <span className="text-sm font-normal opacity-90">
//                         /month
//                       </span>
//                     </div>
//                     <p className="text-sm opacity-90">
//                       Total: ${calculatePrice()} for {calculator.duration}{" "}
//                       months
//                     </p>
//                   </div>

//                   {/* CTA Buttons */}
//                   <div className="space-y-3">
//                     <Link
//                       href={user ? "/dashboard/enroll" : "/auth/signup"}
//                       className="block"
//                     >
//                       <Button size="lg" className="w-full">
//                         Enroll Now
//                       </Button>
//                     </Link>
//                     <Link href="/auth/signup" className="block">
//                       <Button variant="outline" size="lg" className="w-full">
//                         Free Trial Class
//                       </Button>
//                     </Link>
//                   </div>

//                   {/* Additional Info */}
//                   <div className="text-center">
//                     <p className="text-xs text-muted-foreground">
//                       ✅ Free trial • ✅ Flexible scheduling • ✅ Cancel anytime
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Prerequisites */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="bg-card rounded-xl border p-6"
//               >
//                 <h4 className="font-heading font-bold mb-4 flex items-center space-x-2">
//                   <BookOpen className="w-5 h-5 text-primary" />
//                   <span>Prerequisites</span>
//                 </h4>
//                 <ul className="space-y-2">
//                   {course.prerequisites.map((prereq, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center space-x-2 text-sm text-muted-foreground"
//                     >
//                       <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                       <span>{prereq}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>

//               {/* Course Info */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="bg-card rounded-xl border p-6"
//               >
//                 <h4 className="font-heading font-bold mb-4 flex items-center space-x-2">
//                   <Award className="w-5 h-5 text-primary" />
//                   <span>Course Details</span>
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Level:</span>
//                     <span className="font-medium">{course.level}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Class Type:</span>
//                     <span className="font-medium">One-on-One</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">
//                       Session Duration:
//                     </span>
//                     <span className="font-medium">
//                       {course.duration} minutes
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Base Price:</span>
//                     <span className="font-medium">
//                       ${course.basePrice}/session
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4 lg:px-6 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="max-w-2xl mx-auto"
//           >
//             <h2 className="text-3xl font-heading font-bold mb-4">
//               Ready to Start Your {course.title} Journey?
//             </h2>
//             <p className="text-xl text-muted-foreground mb-8">
//               Join hundreds of students mastering {course.title.toLowerCase()}{" "}
//               with our expert teachers
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href={user ? "/dashboard/enroll" : "/auth/signup"}>
//                 <Button size="lg" className="px-8">
//                   Enroll Now
//                 </Button>
//               </Link>
//               <Link href="/courses">
//                 <Button variant="outline" size="lg" className="px-8">
//                   Explore Other Courses
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
