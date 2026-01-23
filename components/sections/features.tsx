"use client";

import { motion } from "framer-motion";
import { Video, Users, BookOpen, Target, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live One-on-One Classes",
    description:
      "Personalized attention with real-time video sessions and interactive whiteboard",
  },
  {
    icon: Users,
    title: "Certified Native Teachers",
    description:
      "Learn from qualified Arabic teachers with Ijazah certification and experience",
  },
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description:
      "Progressive learning path from basics to advanced Tajweed and memorization",
  },
  {
    icon: Target,
    title: "Goal-Oriented Learning",
    description:
      "Set and achieve specific goals with personalized learning plans",
  },
  {
    icon: Award,
    title: "Progress Certification",
    description:
      "Receive certificates and Ijazah upon completion of each level",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "24/7 class booking that fits your schedule and timezone",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Why Choose <span className="text-primary">Al-Maysaroh</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the most effective way to learn Quran online with our
            comprehensive platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// {// 📄 src/components/sections/features.tsx
// "use client";

// import { motion } from "framer-motion";
// import { User, Clock, Award, BookOpen, Languages, Video } from "lucide-react";

// const features = [
//   {
//     icon: User,
//     title: "One-on-One Classes",
//     description:
//       "Personalized attention from certified Quran teachers tailored to your learning pace and goals.",
//   },
//   {
//     icon: Clock,
//     title: "Flexible Scheduling",
//     description:
//       "Learn at your convenience with 24/7 class scheduling across different time zones.",
//   },
//   {
//     icon: Award,
//     title: "Certified Teachers",
//     description:
//       "All our teachers are certified with Ijazah and years of teaching experience.",
//   },
//   {
//     icon: BookOpen,
//     title: "Comprehensive Curriculum",
//     description:
//       "Structured learning path from basic Arabic to advanced Tajweed and Hifz programs.",
//   },
//   {
//     icon: Languages,
//     title: "Multilingual Support",
//     description:
//       "Teachers available in multiple languages including English, Arabic, Urdu, and more.",
//   },
//   {
//     icon: Video,
//     title: "Interactive Platform",
//     description:
//       "Advanced virtual classroom with whiteboard, screen sharing, and recording features.",
//   },
// ];

// export function Features() {
//   return (
//     <section className="py-20 bg-background">
//       <div className="container mx-auto px-4 lg:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//             Why Choose <span className="text-primary">Al-Maysaroh</span>?
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Experience the difference with our comprehensive Quran learning
//             platform designed for your success.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
//                 <feature.icon className="w-6 h-6 text-primary" />
//               </div>
//               <h3 className="text-xl font-heading font-bold mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// }
