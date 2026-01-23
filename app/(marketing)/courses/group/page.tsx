"use client";

import { motion } from "framer-motion";
import {
  Users,
  Target,
  Star,
  Clock,
  CheckCircle,
  Zap,
  Award,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-courses";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function GroupCoursesPage() {
  const { courses, isLoading } = useCourses("GROUP");

  const groupCourses = courses.filter((course) => course.type === "GROUP");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-card rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Group Learning</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-heading font-bold">
                Learn Together, Grow Together
              </h1>

              <p className="text-xl text-green-100">
                Join vibrant learning communities where students motivate each
                other and learn from shared experiences.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Cost Effective", value: "Save 40%" },
                  { label: "Class Size", value: "4-6 Students" },
                  { label: "Peer Learning", value: "Enhanced" },
                  { label: "Community", value: "Supportive" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-green-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-heading font-bold mb-6">
                Benefits of Group Learning
              </h3>
              <div className="space-y-4">
                {[
                  "Learn from peers questions and insights",
                  "More affordable than one-on-one sessions",
                  "Build connections with fellow students",
                  "Group activities and discussions",
                  "Healthy competition motivates learning",
                  "Diverse perspectives enrich understanding",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-green-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Group Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our specialized group courses designed for collaborative
              learning and community building
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Course Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>4-6</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Level Badge */}
                  <div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        course.level === "BEGINNER"
                          ? "bg-green-100 text-green-800"
                          : course.level === "INTERMEDIATE"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      )}
                    >
                      {course.level} Level
                    </span>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    {course.features
                      .slice(0, 3)
                      .map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-card-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ${course.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}m</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        per session
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full group-hover:scale-105 transition-transform duration-200"
                    asChild
                  >
                    <Link href={`/courses/${course.id}`}>Join Group</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Learning Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              The Group Learning Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our group courses are designed to maximize learning through
              collaboration and community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Small Groups",
                description:
                  "Intimate class sizes of 4-6 students for personalized attention",
              },
              {
                icon: Target,
                title: "Structured Curriculum",
                description:
                  "Progressive learning path with clear milestones and goals",
              },
              {
                icon: Star,
                title: "Peer Support",
                description:
                  "Learn from classmates questions and shared experiences",
              },
              {
                icon: Award,
                title: "Group Projects",
                description:
                  "Collaborative activities that reinforce learning objectives",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Ready to Join Our Learning Community?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the power of group learning with like-minded students
              on the same Quranic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  <User className="w-4 h-4 mr-2" />
                  Schedule Tour
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}




// // src/app/(marketing)/courses/group/page.tsx - COMPLETED
// 'use client';

// import { motion } from 'framer-motion';
// import { Users, Target, Star, Clock, CheckCircle, Zap, Award, User } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCourses } from '@/hooks/use-courses';
// import { cn } from '@/lib/utils';
// import Link from 'next/link';

// export default function GroupCoursesPage() {
//   const { courses, isLoading } = useCourses('GROUP');

//   const groupCourses = courses.filter(course => course.type === 'GROUP');

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background pt-16">
//         <div className="container mx-auto px-4 lg:px-6 py-8">
//           <div className="animate-pulse space-y-8">
//             <div className="h-8 bg-card rounded w-1/4"></div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="h-64 bg-card rounded-lg"></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background pt-16">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-16 lg:py-20">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="space-y-6"
//             >
//               <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
//                 <Users className="w-5 h-5" />
//                 <span className="text-sm font-medium">Group Learning</span>
//               </div>
              
//               <h1 className="text-4xl lg:text-6xl font-heading font-bold">
//                 Learn Together, Grow Together
//               </h1>
              
//               <p className="text-xl text-green-100">
//                 Join vibrant learning communities where students motivate each other and learn from shared experiences.
//               </p>

//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { label: 'Cost Effective', value: 'Save 40%' },
//                   { label: 'Class Size', value: '4-6 Students' },
//                   { label: 'Peer Learning', value: 'Enhanced' },
//                   { label: 'Community', value: 'Supportive' },
//                 ].map((stat, index) => (
//                   <div key={stat.label} className="text-center">
//                     <div className="text-2xl font-bold">{stat.value}</div>
//                     <div className="text-sm text-green-200">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
//             >
//               <h3 className="text-2xl font-heading font-bold mb-6">Benefits of Group Learning</h3>
//               <div className="space-y-4">
//                 {[
//                   'Learn from peers questions and insights',
//                   'More affordable than one-on-one sessions',
//                   'Build connections with fellow students',
//                   'Group activities and discussions',
//                   'Healthy competition motivates learning',
//                   'Diverse perspectives enrich understanding'
//                 ].map((benefit, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
//                     <span className="text-green-100">{benefit}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//               Group Courses
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Join our specialized group courses designed for collaborative learning and community building
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {groupCourses.map((course, index) => (
//               <motion.div
//                 key={course.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
//               >
//                 <div className="p-6 space-y-4">
//                   {/* Course Header */}
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
//                         {course.title}
//                       </h3>
//                       <div className="flex items-center space-x-1 text-sm text-muted-foreground">
//                         <Users className="w-4 h-4" />
//                         <span>4-6</span>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground text-sm line-clamp-2">
//                       {course.description}
//                     </p>
//                   </div>

//                   {/* Level Badge */}
//                   <div>
//                     <span className={cn(
//                       "px-3 py-1 rounded-full text-sm font-medium",
//                       course.level === 'BEGINNER' 
//                         ? 'bg-green-100 text-green-800' 
//                         : course.level === 'INTERMEDIATE'
//                         ? 'bg-blue-100 text-blue-800'
//                         : 'bg-purple-100 text-purple-800'
//                     )}>
//                       {course.level} Level
//                     </span>
//                   </div>

//                   {/* Key Features */}
//                   <div className="space-y-2">
//                     {course.features.slice(0, 3).map((feature: string, idx: number) => (
//                       <div key={idx} className="flex items-center space-x-2">
//                         <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
//                         <span className="text-sm text-card-foreground">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Price & Duration */}
//                   <div className="flex items-center justify-between pt-4 border-t">
//                     <div>
//                       <div className="text-2xl font-bold text-primary">${course.price}</div>
//                       <div className="text-sm text-muted-foreground">per month</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="flex items-center space-x-1 text-sm text-muted-foreground">
//                         <Clock className="w-4 h-4" />
//                         <span>{course.duration}m</span>
//                       </div>
//                       <div className="text-xs text-muted-foreground">per session</div>
//                     </div>
//                   </div>

//                   {/* CTA */}
//                   <Button className="w-full group-hover:scale-105 transition-transform duration-200" asChild>
//                     <Link href={`/courses/${course.id}`}>
//                       Join Group
//                     </Link>
//                   </Button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <Users className="w-16 h-16 text-primary mx-auto mb-6" />
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//               Ready to Join Our Learning Community?
//             </h2>
//             <p className="text-xl text-muted-foreground mb-8">
//               Experience the power of collaborative learning with students from around the world.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" asChild>
//                 <Link href="/auth/signup">
//                   <Zap className="w-4 h-4 mr-2" />
//                   Start Learning
//                 </Link>
//               </Button>
//               <Button size="lg" variant="outline" asChild>
//                 <Link href="/courses">
//                   <User className="w-4 h-4 mr-2" />
//                   Compare All Courses
//                 </Link>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }