"use client";

import { motion } from "framer-motion";
import {
  Star,
  Award,
  Users,
  Clock,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeachers } from "@/hooks/use-courses";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Teachers() {
  const { teachers, isLoading } = useTeachers();

  const featuredTeachers = teachers.slice(0, 3); // Show only 3 featured teachers on homepage

  if (isLoading) {
    return (
      <section id="teachers" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading teachers...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="teachers"
      className="py-20 bg-gradient-to-br from-background to-muted/50"
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Certified Educators
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Learn from{" "}
            <span className="text-primary">Expert Quran Teachers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our certified teachers bring years of experience and traditional
            Islamic knowledge to guide you in your Quranic journey.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Teacher Card */}
              <div className="relative p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white font-semibold text-lg">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-card-foreground">
                        {teacher.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {teacher.qualification}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specialization */}
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(teacher.specialization) ? teacher.specialization : [])
    .slice(0, 2)
    .map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                  {teacher.specialization.length > 2 && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      +{teacher.specialization.length - 2} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-y">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-1">
                      <Users className="w-4 h-4" />
                      <span>Students</span>
                    </div>
                    <div className="font-bold text-card-foreground">50+</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Experience</span>
                    </div>
                    <div className="font-bold text-card-foreground">
                      {teacher.experience}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>Rating</span>
                    </div>
                    <div className="font-bold text-card-foreground">4.9</div>
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {teacher.bio}
                </p>

                {/* CTA */}
                <Button className="w-full group/btn" asChild>
                  <Link href={`/teachers#teacher-${teacher.id}`}>
                    <MessageCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    View Profile
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of students who are already learning Quran with our
              certified teachers. Start your journey today with a free trial
              class.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/teachers">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Meet All Teachers
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// // 📄 src/components/sections/teachers.tsx
// "use client";

// import { motion } from "framer-motion";
// import { GraduationCap, Award, Clock, Users } from "lucide-react";
// import { Button } from "../ui/button";
// import Link from "next/link";

// const teachers = [
//   {
//     id: "1",
//     name: "Shaykh Ahmed Al-Mansouri",
//     qualification: "Ijazah in Hafs & Shubah, Al-Azhar Certified",
//     specialization: "Quran Memorization & Advanced Tajweed",
//     experience: "15+ Years in Hifz Teaching",
//     bio: "Expert in Quranic sciences with multiple Ijazah chains. Specialized in one-on-one Hifz programs with over 50 students who completed memorization under his guidance.",
//     expertise: ["Hifz Program", "Ijazah", "Advanced Tajweed"],
//   },
//   {
//     id: "2",
//     name: "Ustadha Fatima Khan",
//     qualification: "Ijazah in Qiraat, Islamic University Graduate",
//     specialization: "Quran Recitation & Tajweed",
//     experience: "10+ Years in Quran Teaching",
//     bio: "Specialized in teaching children and beginners with modern methodologies. Expert in making Quran learning enjoyable and effective through personalized one-on-one sessions.",
//     expertise: ["Nazrah", "Basic Tajweed", "Children Education"],
//   },
//   {
//     id: "3",
//     name: "Shaykh Omar Abdul Hakim",
//     qualification: "M.A. Quranic Studies, Certified Qari",
//     specialization: "Quranic Arabic & Tafsir",
//     experience: "12+ Years Teaching Experience",
//     bio: "Focuses on helping students understand Quran in its original language. Expert in Arabic grammar and Quranic vocabulary with practical teaching approach.",
//     expertise: ["Quranic Arabic", "Tafsir", "Translation"],
//   },
// ];

// export function Teachers() {
//   return (
//     <section id="teachers" className="py-20 bg-background">
//       <div className="container mx-auto px-4 lg:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//             Meet Our <span className="text-primary">Qualified Teachers</span>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Learn from certified Huffaz and Islamic scholars with years of
//             teaching experience
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {teachers.map((teacher, index) => (
//             <motion.div
//               key={teacher.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               whileHover={{ y: -5 }}
//               className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center"
//             >
//               <div className="space-y-4">
//                 {/* Teacher Avatar */}
//                 <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
//                   <Users className="w-8 h-8 text-white" />
//                 </div>

//                 {/* Teacher Info */}
//                 <div>
//                   <h3 className="text-xl font-bold text-card-foreground mb-1">
//                     {teacher.name}
//                   </h3>
//                   <p className="text-primary font-medium text-sm mb-3">
//                     {teacher.specialization}
//                   </p>
//                 </div>

//                 {/* Qualifications */}
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-center space-x-2 text-sm">
//                     <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
//                     <span className="text-card-foreground">
//                       {teacher.qualification}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-center space-x-2 text-sm">
//                     <Clock className="w-4 h-4 text-primary flex-shrink-0" />
//                     <span className="text-card-foreground">
//                       {teacher.experience}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-center space-x-2 text-sm">
//                     <Award className="w-4 h-4 text-primary flex-shrink-0" />
//                     <span className="text-card-foreground">
//                       Certified Instructor
//                     </span>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <div className="pt-4 border-t">
//                   <p className="text-sm text-muted-foreground leading-relaxed">
//                     {teacher.bio}
//                   </p>
//                 </div>

//                 {/* Expertise Tags */}
//                 <div className="pt-3">
//                   <div className="flex flex-wrap justify-center gap-2">
//                     {teacher.expertise.map((skill) => (
//                       <span
//                         key={skill}
//                         className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* CTA */}
//                 <button className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
//                   Book Trial Class
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-center mt-12"
//         >
//           <p className="text-muted-foreground mb-6">
//             All our teachers are carefully selected and undergo rigorous
//             training
//           </p>
//           <Button variant="outline" size="lg" asChild>
//             <Link href="#contact">Meet More Teachers</Link>
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
