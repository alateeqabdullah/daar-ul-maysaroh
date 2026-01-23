"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: 500, suffix: "+", label: "Students Enrolled" },
  { number: 98, suffix: "%", label: "Success Rate" },
  { number: 15, suffix: "+", label: "Countries" },
  { number: 1000, suffix: "+", label: "Classes Monthly" },
  { number: 24, suffix: "/7", label: "Support" },
  { number: 4.9, suffix: "/5", label: "Average Rating" },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-primary to-accent text-white"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Trusted by Muslims Worldwide
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join our growing community of Quran learners achieving their Islamic
            education goals
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold mb-2">
                {isInView ? stat.number : 0}
                {stat.suffix}
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// // 📄 src/components/sections/stats.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Users, Award, Globe, Clock } from "lucide-react";

// const stats = [
//   {
//     icon: Users,
//     label: "Active Students",
//     value: "2,500+",
//     description: "Learning Quran daily",
//   },
//   {
//     icon: Award,
//     label: "Success Rate",
//     value: "98%",
//     description: "Student satisfaction",
//   },
//   {
//     icon: Globe,
//     label: "Countries",
//     value: "25+",
//     description: "Worldwide reach",
//   },
//   {
//     icon: Clock,
//     label: "Support",
//     value: "24/7",
//     description: "Always available",
//   },
// ];

// export function Stats() {
//   return (
//     <section className="py-16 bg-muted/30">
//       <div className="container mx-auto px-4 lg:px-6">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="text-center"
//             >
//               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <stat.icon className="w-8 h-8 text-primary" />
//               </div>
//               <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
//                 {stat.value}
//               </div>
//               <div className="font-semibold text-foreground mb-1">
//                 {stat.label}
//               </div>
//               <div className="text-sm text-muted-foreground">
//                 {stat.description}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
