import { TeachersPage } from "@/components/teachers/teachers-page";

export default function Teachers() {
  return <TeachersPage />;
}

// "use client"

// import { motion } from "framer-motion";
// import { Users, Award, Clock, Star, BookOpen } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { teachers } from "@/lib/data";

// export default function TeachersPage() {
//   return (
//     <div className="min-h-screen bg-background pt-16">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
//         <div className="container mx-auto px-4 lg:px-6 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl lg:text-6xl font-heading font-bold mb-6"
//           >
//             Meet Our Teachers
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
//           >
//             Learn from certified Quran teachers with years of experience and
//             authentic Islamic knowledge
//           </motion.p>
//         </div>
//       </section>

//       {/* Teachers Grid */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//               Qualified Quran Instructors
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Our teachers are carefully selected for their expertise, teaching
//               ability, and dedication to Islamic values
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {teachers.map((teacher, index) => (
//               <motion.div
//                 key={teacher.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
//               >
//                 <div className="p-6 space-y-4">
//                   {/* Teacher Avatar & Basic Info */}
//                   <div className="text-center">
//                     <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                       <Users className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-xl font-heading font-bold text-card-foreground">
//                       {teacher.name}
//                     </h3>
//                     <p className="text-primary font-medium">
//                       {teacher.specialization}
//                     </p>
//                   </div>

//                   {/* Qualifications */}
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3 text-sm">
//                       <Award className="w-4 h-4 text-primary flex-shrink-0" />
//                       <span className="text-card-foreground">
//                         {teacher.qualification}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-3 text-sm">
//                       <Clock className="w-4 h-4 text-primary flex-shrink-0" />
//                       <span className="text-card-foreground">
//                         {teacher.experience}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Expertise Tags */}
//                   <div className="flex flex-wrap gap-2">
//                     {teacher.expertise.slice(0, 3).map((skill) => (
//                       <span
//                         key={skill}
//                         className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {teacher.expertise.length > 3 && (
//                       <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
//                         +{teacher.expertise.length - 3} more
//                       </span>
//                     )}
//                   </div>

//                   {/* Bio Preview */}
//                   <p className="text-sm text-muted-foreground line-clamp-3">
//                     {teacher.bio}
//                   </p>

//                   {/* CTA */}
//                   <div className="flex space-x-3">
//                     <Link href={`/teachers/${teacher.id}`} className="flex-1">
//                       <Button className="w-full">View Profile</Button>
//                     </Link>
//                     <Link href="/#courses" className="flex-1">
//                       <Button variant="outline" className="w-full">
//                         Book Class
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Why Choose Our Teachers */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mt-20 bg-primary/5 rounded-2xl p-8 border border-primary/20"
//           >
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 {
//                   icon: Award,
//                   title: "Certified",
//                   description:
//                     "All teachers hold Ijazah and proper certifications",
//                 },
//                 {
//                   icon: Star,
//                   title: "Experienced",
//                   description:
//                     "Years of teaching experience with proven results",
//                 },
//                 {
//                   icon: Users,
//                   title: "Student-Focused",
//                   description: "Personalized approach for each student's needs",
//                 },
//                 {
//                   icon: BookOpen,
//                   title: "Comprehensive",
//                   description:
//                     "Expertise in recitation, memorization, and Tajweed",
//                 },
//               ].map((feature, index) => (
//                 <div key={feature.title} className="text-center">
//                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <feature.icon className="w-6 h-6 text-primary" />
//                   </div>
//                   <h4 className="font-semibold text-card-foreground mb-2">
//                     {feature.title}
//                   </h4>
//                   <p className="text-sm text-muted-foreground">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="text-center mt-16"
//           >
//             <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
//               Ready to Start Your Quran Journey?
//             </h3>
//             <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
//               Choose your teacher and begin learning the Quran with personalized
//               one-on-one sessions
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/#courses">
//                 <Button size="lg">Browse Courses</Button>
//               </Link>
//               <Link href="/contact">
//                 <Button variant="outline" size="lg">
//                   Get Guidance
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // import { motion } from "framer-motion";
// // import {
// //   Search,
// //   Filter,
// //   Star,
// //   Award,
// //   Clock,
// //   User,
// //   GraduationCap,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useTeachers } from "@/hooks/use-courses";
// // import Link from "next/link";
// // import { cn } from "@/lib/utils";

// // export default function TeachersPage() {
// //   const { teachers, isLoading } = useTeachers();

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-background pt-16">
// //         <div className="container mx-auto px-4 lg:px-6 py-8">
// //           <div className="animate-pulse space-y-4">
// //             <div className="h-8 bg-card rounded w-1/4"></div>
// //             <div className="h-4 bg-card rounded w-1/2"></div>
// //             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
// //               {[...Array(6)].map((_, i) => (
// //                 <div
// //                   key={i}
// //                   className="bg-card rounded-xl border p-6 h-80"
// //                 ></div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background pt-16">
// //       {/* Hero Section */}
// //       <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
// //         <div className="container mx-auto px-4 lg:px-6 text-center">
// //           <motion.h1
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-4xl lg:text-6xl font-heading font-bold mb-6"
// //           >
// //             Our Qualified Teachers
// //           </motion.h1>
// //           <motion.p
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
// //           >
// //             Learn from certified Quran teachers with years of experience and
// //             authentic Islamic knowledge. Each teacher is carefully selected for
// //             their expertise and teaching methodology.
// //           </motion.p>
// //         </div>
// //       </section>

// //       {/* Teachers Section */}
// //       <section className="py-20">
// //         <div className="container mx-auto px-4 lg:px-6">
// //           {/* Header */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-center mb-12"
// //           >
// //             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
// //               Meet Our Teaching Team
// //             </h2>
// //             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
// //               Certified educators dedicated to helping you achieve your Quran
// //               learning goals
// //             </p>
// //           </motion.div>

// //           {/* Search and Filters */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="flex flex-col lg:flex-row gap-4 mb-12"
// //           >
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search teachers..."
// //                 className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
// //               />
// //             </div>
// //             <div className="flex gap-4">
// //               <select className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
// //                 <option value="">All Specializations</option>
// //                 <option value="hifz">Hifz Program</option>
// //                 <option value="tajweed">Tajweed</option>
// //                 <option value="nazrah">Nazrah</option>
// //                 <option value="arabic">Arabic</option>
// //               </select>
// //               <select className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
// //                 <option value="">All Experience Levels</option>
// //                 <option value="1-5">1-5 years</option>
// //                 <option value="5-10">5-10 years</option>
// //                 <option value="10+">10+ years</option>
// //               </select>
// //               <Button variant="outline" className="whitespace-nowrap">
// //                 <Filter className="w-4 h-4 mr-2" />
// //                 Filter
// //               </Button>
// //             </div>
// //           </motion.div>

// //           {/* Teachers Grid */}
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {teachers.map((teacher, index) => (
// //               <motion.div
// //                 key={teacher.id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: index * 0.1 }}
// //                 whileHover={{ y: -5 }}
// //                 className="bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
// //               >
// //                 <div className="p-6 space-y-4">
// //                   {/* Teacher Header */}
// //                   <div className="flex items-start space-x-4">
// //                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
// //                       <User className="w-8 h-8 text-primary" />
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors mb-1">
// //                         {teacher.name}
// //                       </h3>
// //                       <p className="text-sm text-muted-foreground line-clamp-2">
// //                         {teacher.qualification}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   {/* Experience & Rating */}
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center space-x-1 text-sm text-muted-foreground">
// //                       <Clock className="w-4 h-4" />
// //                       <span>{teacher.experience}</span>
// //                     </div>
// //                     <div className="flex items-center space-x-1">
// //                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// //                       <span className="text-sm font-medium text-card-foreground">
// //                         4.9
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* Specialization */}
// //                   <div className="flex flex-wrap gap-1">
// //                     {teacher.expertise.slice(0, 3).map((skill, skillIndex) => (
// //                       <span
// //                         key={skillIndex}
// //                         className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
// //                       >
// //                         {skill}
// //                       </span>
// //                     ))}
// //                     {teacher.expertise.length > 3 && (
// //                       <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
// //                         +{teacher.expertise.length - 3}
// //                       </span>
// //                     )}
// //                   </div>

// //                   {/* Bio */}
// //                   <p className="text-sm text-muted-foreground line-clamp-3">
// //                     {teacher.bio}
// //                   </p>

// //                   {/* Stats */}
// //                   <div className="grid grid-cols-3 gap-4 pt-2 border-t">
// //                     <div className="text-center">
// //                       <div className="font-bold text-card-foreground">50+</div>
// //                       <div className="text-xs text-muted-foreground">
// //                         Students
// //                       </div>
// //                     </div>
// //                     <div className="text-center">
// //                       <div className="font-bold text-card-foreground">98%</div>
// //                       <div className="text-xs text-muted-foreground">
// //                         Success
// //                       </div>
// //                     </div>
// //                     <div className="text-center">
// //                       <div className="font-bold text-card-foreground">100+</div>
// //                       <div className="text-xs text-muted-foreground">
// //                         Classes
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* CTA */}
// //                   <div className="flex space-x-3 pt-2">
// //                     <Link href={`/teachers/${teacher.id}`} className="flex-1">
// //                       <Button className="w-full">
// //                         <GraduationCap className="w-4 h-4 mr-2" />
// //                         View Profile
// //                       </Button>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* No Teachers Message */}
// //           {teachers.length === 0 && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="text-center py-12"
// //             >
// //               <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
// //               <h3 className="text-xl font-heading font-bold mb-2">
// //                 No Teachers Found
// //               </h3>
// //               <p className="text-muted-foreground">
// //                 Try adjusting your search filters or browse all teachers
// //               </p>
// //             </motion.div>
// //           )}

// //           {/* Teacher Qualifications Info */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.4 }}
// //             className="mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/20"
// //           >
// //             <div className="grid md:grid-cols-3 gap-8">
// //               <div className="text-center">
// //                 <Award className="w-12 h-12 text-primary mx-auto mb-4" />
// //                 <h4 className="font-heading font-bold text-lg mb-2">
// //                   Certified Teachers
// //                 </h4>
// //                 <p className="text-muted-foreground">
// //                   All teachers hold Ijazah (certification) in Quran recitation
// //                   and teaching
// //                 </p>
// //               </div>
// //               <div className="text-center">
// //                 <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
// //                 <h4 className="font-heading font-bold text-lg mb-2">
// //                   Expert Guidance
// //                 </h4>
// //                 <p className="text-muted-foreground">
// //                   Years of experience in teaching Quran to students of all
// //                   levels
// //                 </p>
// //               </div>
// //               <div className="text-center">
// //                 <Star className="w-12 h-12 text-primary mx-auto mb-4" />
// //                 <h4 className="font-heading font-bold text-lg mb-2">
// //                   Proven Results
// //                 </h4>
// //                 <p className="text-muted-foreground">
// //                   Track record of student success and satisfaction
// //                 </p>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }
