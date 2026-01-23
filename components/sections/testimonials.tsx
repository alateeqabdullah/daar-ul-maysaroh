"use client";

import { motion } from "framer-motion";
import { Quote, Star, Play } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Rahman",
    age: 35,
    course: "Hifz Program",
    content:
      "Alhamdulillah, I completed my Hifz in 2.5 years with Shaykh Ahmed. The personalized attention and flexible scheduling made it possible while working full-time.",
    duration: "2.5 Years",
    achievement: "Completed Hifz with Ijazah",
    rating: 5,
    video: true,
  },
  {
    id: 2,
    name: "Maryam Johnson",
    age: 8,
    course: "Quran Recitation",
    content:
      "The one-on-one sessions helped me learn so quickly! My teacher was so patient and made Quran learning fun. I can now read Quran fluently.",
    duration: "6 Months",
    achievement: "Completed Juz 30",
    rating: 5,
    video: false,
  },
  {
    id: 3,
    name: "Brother Omar",
    age: 42,
    course: "Advanced Tajweed",
    content:
      "My recitation improved dramatically with one-on-one correction. I finally understand the proper rules and can recite with confidence in prayers.",
    duration: "1 Year",
    achievement: "Tajweed Certification",
    rating: 5,
    video: true,
  },
  {
    id: 4,
    name: "Sister Fatima",
    age: 28,
    course: "Quranic Arabic",
    content:
      "Learning Arabic to understand Quran directly has been life-changing. The teachers are knowledgeable and make complex concepts easy to understand.",
    duration: "8 Months",
    achievement: "Arabic Proficiency",
    rating: 5,
    video: false,
  },
];

export function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from students who transformed their Quran learning
            journey with us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 p-6 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Video Thumbnail */}
              {testimonial.video && (
                <div className="relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 aspect-video flex items-center justify-center cursor-pointer group">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Watch Video Testimonial
                    </p>
                  </div>
                </div>
              )}

              {/* Content */}
              <p className="text-card-foreground mb-6 leading-relaxed">
                `{testimonial.content}`
              </p>

              {/* Student Info */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.age} years • {testimonial.course}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {testimonial.achievement}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <span>{testimonial.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
              Ready to Start Your Quran Journey?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied students who have transformed their
              relationship with Quran through our personalized teaching
              approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-white/90 transition-colors font-semibold">
                Start Free Trial
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold">
                View All Courses
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// // 📄 src/components/sections/testimonials.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Quote, Star, Calendar } from "lucide-react";

// const testimonials = [
//   {
//     id: "1",
//     name: "Maryam Johnson",
//     age: 8,
//     course: "Quran Recitation",
//     content:
//       "The one-on-one sessions helped me learn so quickly! My teacher was so patient and made Quran learning fun. I can now read Surah Al-Fatihah perfectly.",
//     duration: "6 Months",
//     achievement: "Completed Juz 30",
//   },
//   {
//     id: "2",
//     name: "Brother Ahmed Rahman",
//     age: 35,
//     course: "Hifz Program",
//     content:
//       "Alhamdulillah, I completed my Hifz in 2.5 years with Shaykh Ahmed. The personalized attention and consistent motivation made all the difference in my journey.",
//     duration: "2.5 Years",
//     achievement: "Completed Hifz with Ijazah",
//   },
//   {
//     id: "3",
//     name: "Sister Aisha Mohammed",
//     age: 28,
//     course: "Advanced Tajweed",
//     content:
//       "My recitation improved dramatically with one-on-one correction. I can now recite with proper Tajweed rules and understand the meaning behind the verses.",
//     duration: "1 Year",
//     achievement: "Tajweed Certification",
//   },
// ];

// export function Testimonials() {
//   return (
//     <section id="testimonials" className="py-20 bg-muted/30">
//       <div className="container mx-auto px-4 lg:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//             What Our <span className="text-primary">Students Say</span>
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Real experiences from our students and their families
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 p-6 relative"
//             >
//               {/* Quote Icon */}
//               <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

//               {/* Stars */}
//               <div className="flex space-x-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-accent text-accent" />
//                 ))}
//               </div>

//               {/* Content */}
//               <p className="text-card-foreground mb-6 leading-relaxed">
//                {` "${testimonial.content}"`}
//               </p>

//               {/* Student Info */}
//               <div className="border-t pt-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-semibold text-card-foreground">
//                       {testimonial.name}
//                     </h4>
//                     <p className="text-sm text-muted-foreground">
//                       {testimonial.age} years • {testimonial.course}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-1 text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4" />
//                     <span>{testimonial.duration}</span>
//                   </div>
//                 </div>

//                 {/* Achievement */}
//                 <div className="mt-2">
//                   <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
//                     {testimonial.achievement}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Additional Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
//         >
//           {[
//             { number: "98%", label: "Satisfaction Rate" },
//             { number: "2,500+", label: "Students Enrolled" },
//             { number: "25+", label: "Countries" },
//             { number: "24/7", label: "Support" },
//           ].map((stat, index) => (
//             <div key={stat.label} className="text-center">
//               <motion.div
//                 initial={{ scale: 0 }}
//                 whileInView={{ scale: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
//                 className="text-3xl lg:text-4xl font-bold text-primary mb-2"
//               >
//                 {stat.number}
//               </motion.div>
//               <div className="text-sm text-muted-foreground font-medium">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
