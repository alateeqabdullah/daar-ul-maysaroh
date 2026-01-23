// // src/app/about/page.tsx

// "use client"
// import { motion } from "framer-motion";
// import { BookOpen, Users, Target, Star, Award, Heart } from "lucide-react";

// export default function AboutPage() {
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
//             About Al-Maysaroh
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
//           >
//             Dedicated to preserving and spreading the beautiful teachings of the
//             Quran through authentic Islamic education.
//           </motion.p>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="space-y-6"
//             >
//               <div>
//                 <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//                   Our Mission & Vision
//                 </h2>
//                 <div className="w-20 h-1 bg-primary rounded-full"></div>
//               </div>

//               <div className="space-y-4 text-lg text-muted-foreground">
//                 <p>
//                   Al-Maysaroh Quran Institute was founded with a simple yet
//                   profound mission: to make authentic Quranic education
//                   accessible to every Muslim, regardless of their location or
//                   background.
//                 </p>
//                 <p>
//                   We believe that learning the Quran should be a transformative
//                   experience that connects students directly with the words of
//                   Allah through qualified, compassionate teachers.
//                 </p>
//                 <p>
//                   Our vision is to create a global community of Quran learners
//                   who not only recite beautifully but understand deeply and live
//                   by the teachings of the Holy Quran.
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="bg-card rounded-2xl border shadow-sm p-8"
//             >
//               <div className="font-arabic text-3xl lg:text-4xl text-primary text-center leading-loose mb-6">
//                 ﴾ وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا ﴿
//               </div>
//               <p className="text-center text-muted-foreground text-lg">
//                 "And recite the Quran with measured recitation."
//               </p>
//               <p className="text-center text-sm text-muted-foreground mt-2">
//                 Surah Al-Muzzammil (73:4)
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4 lg:px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//               Our Core Values
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               The principles that guide everything we do at Al-Maysaroh
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: BookOpen,
//                 title: "Authenticity",
//                 description:
//                   "Teaching based on authentic Quranic sciences and traditional Islamic scholarship",
//               },
//               {
//                 icon: Users,
//                 title: "Personalized Learning",
//                 description:
//                   "One-on-one attention ensuring every student progresses at their optimal pace",
//               },
//               {
//                 icon: Target,
//                 title: "Excellence",
//                 description:
//                   "Striving for the highest standards in Quranic education and student outcomes",
//               },
//               {
//                 icon: Heart,
//                 title: "Compassion",
//                 description:
//                   "Creating a supportive, nurturing environment for spiritual growth",
//               },
//               {
//                 icon: Star,
//                 title: "Quality Teachers",
//                 description:
//                   "Carefully selected certified teachers with proven track records",
//               },
//               {
//                 icon: Award,
//                 title: "Continuous Improvement",
//                 description:
//                   "Constantly enhancing our curriculum and teaching methodologies",
//               },
//             ].map((value, index) => (
//               <motion.div
//                 key={value.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-card rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow"
//               >
//                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <value.icon className="w-8 h-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-heading font-bold mb-3">
//                   {value.title}
//                 </h3>
//                 <p className="text-muted-foreground">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="py-20">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             {[
//               { number: "500+", label: "Students Enrolled" },
//               { number: "98%", label: "Success Rate" },
//               { number: "15+", label: "Countries" },
//               { number: "24/7", label: "Support" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="space-y-2"
//               >
//                 <div className="text-3xl lg:text-4xl font-bold text-primary">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-muted-foreground font-medium">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client"

import { motion } from "framer-motion";
import { BookOpen, Users, Target, Star, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-heading font-bold mb-6"
          >
            About Al-Maysaroh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
          >
            Dedicated to preserving and spreading the beautiful teachings of the
            Quran through authentic Islamic education.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                  Our Mission & Vision
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full"></div>
              </div>

              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Al-Maysaroh Quran Institute was founded with a simple yet
                  profound mission: to make authentic Quranic education
                  accessible to every Muslim, regardless of their location or
                  background.
                </p>
                <p>
                  We believe that learning the Quran should be a transformative
                  experience that connects students directly with the words of
                  Allah through qualified, compassionate teachers.
                </p>
                <p>
                  Our vision is to create a global community of Quran learners
                  who not only recite beautifully but understand deeply and live
                  by the teachings of the Holy Quran.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl border shadow-sm p-8"
            >
              <div className="font-arabic text-3xl lg:text-4xl text-primary text-center leading-loose mb-6">
                ﴾ وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا ﴿
              </div>
              <p className="text-center text-muted-foreground text-lg">
               {` "And recite the Quran with measured recitation."`}
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Surah Al-Muzzammil (73:4)
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Al-Maysaroh
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Authenticity",
                description:
                  "Teaching based on authentic Quranic sciences and traditional Islamic scholarship",
              },
              {
                icon: Users,
                title: "Personalized Learning",
                description:
                  "One-on-one attention ensuring every student progresses at their optimal pace",
              },
              {
                icon: Target,
                title: "Excellence",
                description:
                  "Striving for the highest standards in Quranic education and student outcomes",
              },
              {
                icon: Heart,
                title: "Compassion",
                description:
                  "Creating a supportive, nurturing environment for spiritual growth",
              },
              {
                icon: Star,
                title: "Quality Teachers",
                description:
                  "Carefully selected certified teachers with proven track records",
              },
              {
                icon: Award,
                title: "Continuous Improvement",
                description:
                  "Constantly enhancing our curriculum and teaching methodologies",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Students Enrolled" },
              { number: "98%", label: "Success Rate" },
              { number: "15+", label: "Countries" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}