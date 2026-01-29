"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-courses";
import {
  CheckCircle,
  Clock,
  Users,
  User,
  Users2,
  Calculator,
  Tag,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PriceCalculator } from "@/components/courses/price-calculator";

export function Courses() {
  const { courses, isLoading, isError } = useCourses();

  if (isLoading) {
    return (
      <section id="courses" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading courses...</div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="courses" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center text-red-600">
            Failed to load courses. Please try again.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Our <span className="text-primary">Quran Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Specialized one-on-one Quran education with certified teachers.
            Personalized attention for optimal learning.
          </p>

          {/* Features Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <User className="w-4 h-4" />
              <span>One-on-One Sessions</span>
            </div>
            <div className="flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Calculator className="w-4 h-4" />
              <span>Flexible Pricing</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <Tag className="w-4 h-4" />
              <span>Family Discounts</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4" />
              <span>Satisfaction Guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* Price Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <PriceCalculator />
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course: any, index: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Header with Class Type Badge */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Class Type & Duration */}
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium",
                      course.type === "ONE_ON_ONE"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    )}
                  >
                    {course.type === "ONE_ON_ONE" ? (
                      <>
                        <User className="w-3 h-3" />
                        <span>One-on-One</span>
                      </>
                    ) : (
                      <>
                        <Users2 className="w-3 h-3" />
                        <span>Group Course</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} mins/session</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center py-4">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold text-primary">
                      ${course.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Flexible payment options available
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {(Array.isArray(course.features) ? course.features : [])
                    .slice(0, 4)
                    .map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-card-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  {course.features.length > 4 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{course.features.length - 4} more features
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full group-hover:scale-105 transition-transform duration-200">
                    {course.type === "ONE_ON_ONE"
                      ? "Start One-on-One"
                      : "Join Group Course"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Family Discount Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="w-8 h-8" />
              <h3 className="text-2xl lg:text-3xl font-heading font-bold">
                Family & Group Discounts
              </h3>
            </div>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Learning together saves more! Get special discounts when you
              enroll multiple family members.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">2 Students</div>
                <div className="text-green-200">15% Discount</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">3 Students</div>
                <div className="text-green-200">25% Discount</div>
              </div>
              <div className="bg-white/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">4+ Students</div>
                <div className="text-green-200">35% Discount</div>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-6 bg-white text-green-600 hover:bg-white/90"
              asChild
            >
              <Link href="/contact?inquiry=family-discount">
                Get Family Discount
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { useCourses } from "@/hooks/use-courses";
// import { CheckCircle, Clock, User, Users2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// export function Courses() {
//   const { courses, isLoading, isError } = useCourses();

//   if (isLoading) {
//     return (
//       <section id="courses" className="py-20 bg-muted/50">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="text-center">
//             <div className="animate-pulse">Loading courses...</div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (isError) {
//     return (
//       <section id="courses" className="py-20 bg-muted/50">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="text-center text-red-600">
//             Failed to load courses. Please try again.
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="courses" className="py-20 bg-muted/50">
//       <div className="container mx-auto px-4 lg:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//             Our <span className="text-primary">Quran Courses</span>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Specialized one-on-one Quran education with certified teachers.
//             Personalized attention for optimal learning.
//           </p>
//           <div className="mt-6 flex flex-wrap justify-center gap-4">
//             <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
//               <User className="w-4 h-4" />
//               <span>Primarily One-on-One</span>
//             </div>
//             <div className="flex items-center space-x-2 bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm">
//               <Users2 className="w-4 h-4" />
//               <span>Limited Group Courses</span>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {courses.map((course, index) => (
//             <motion.div
//               key={course.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//             >
//               <div className="p-6 space-y-4">
//                 {/* Header with Class Type Badge */}
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-2 flex-1">
//                     <h3 className="text-xl font-bold text-card-foreground">
//                       {course.title}
//                     </h3>
//                     <p className="text-muted-foreground text-sm">
//                       {course.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Class Type & Duration */}
//                 <div className="flex items-center justify-between">
//                   <div
//                     className={cn(
//                       "flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium",
//                       course.type === "ONE_ON_ONE"
//                         ? "bg-blue-100 text-blue-800"
//                         : "bg-green-100 text-green-800"
//                     )}
//                   >
//                     {course.type === "ONE_ON_ONE" ? (
//                       <>
//                         <User className="w-3 h-3" />
//                         <span>One-on-One</span>
//                       </>
//                     ) : (
//                       <>
//                         <Users2 className="w-3 h-3" />
//                         <span>Group Course</span>
//                       </>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-1 text-sm text-muted-foreground">
//                     <Clock className="w-4 h-4" />
//                     <span>{course.duration}m</span>
//                   </div>
//                 </div>

//                 {/* Level Badge */}
//                 <div
//                   className={cn(
//                     "inline-block px-3 py-1 rounded-full text-xs font-medium",
//                     course.level === "BEGINNER"
//                       ? "bg-green-100 text-green-800"
//                       : course.level === "INTERMEDIATE"
//                         ? "bg-blue-100 text-blue-800"
//                         : "bg-purple-100 text-purple-800"
//                   )}
//                 >
//                   {course.level} Level
//                 </div>

//                 {/* Price */}
//                 <div className="text-center">
//                   <span className="text-2xl font-bold text-primary">
//                     ${course.price}
//                   </span>
//                   <span className="text-sm text-muted-foreground ml-1">
//                     /month
//                   </span>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-2">
//                   {(Array.isArray(course.features) ? course.features : [])
//                     .slice(0, 4)
//                     .map((feature: string, index: number) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
//                         <span className="text-sm text-card-foreground">
//                           {feature}
//                         </span>
//                       </div>
//                     ))}
//                 </div>

//                 {/* CTA */}
//                 <Link href={`/courses/${course.id}`}>
//                   <Button className="w-full">
//                     {course.type === "ONE_ON_ONE"
//                       ? "Learn More"
//                       : "View Details"}
//                   </Button>
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Additional Info Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
//         >
//           <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
//             Why Choose One-on-One Quran Learning?
//           </h3>
//           <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             {[
//               {
//                 icon: User,
//                 title: "Personalized Attention",
//                 description:
//                   "Your teacher focuses 100% on your progress and specific needs",
//               },
//               {
//                 icon: Clock,
//                 title: "Flexible Scheduling",
//                 description:
//                   "Choose class times that work with your schedule and timezone",
//               },
//               {
//                 icon: "🎯",
//                 title: "Customized Pace",
//                 description:
//                   "Learn at your own speed without pressure from other students",
//               },
//             ].map((item, index) => (
//               <div key={item.title} className="text-center">
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   {typeof item.icon === "string" ? (
//                     <span className="text-2xl">{item.icon}</span>
//                   ) : (
//                     <item.icon className="w-8 h-8 text-primary" />
//                   )}
//                 </div>
//                 <h4 className="font-semibold text-foreground mb-2">
//                   {item.title}
//                 </h4>
//                 <p className="text-sm text-muted-foreground">
//                   {item.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
