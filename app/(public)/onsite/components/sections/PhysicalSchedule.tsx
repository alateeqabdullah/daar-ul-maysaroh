// // app/(marketing)/physical/components/sections/PhysicalSchedule.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Calendar, Clock, Users, BookOpen, Sun, Moon } from "lucide-react";

// const SCHEDULES = {
//   day: {
//     title: "Day Program",
//     description:
//       "For students who attend classes without staying at the Institute",
//     days: [
//       {
//         day: "Saturday & Sunday",
//         time: "9:00 AM – 4:30 PM",
//         activities: ["Tahfeedh", "Tajweed", "Muraja'ah", "Islamic Studies"],
//       },
//       {
//         day: "Monday – Wednesday",
//         time: "4:30 PM – 6:00 PM",
//         activities: ["Tahfeedh", "Muraja'ah"],
//       },
//     ],
//   },
//   boarding: {
//     title: "Boarding Program",
//     description: "Full-time residential program with structured daily routine",
//     days: [
//       {
//         day: "Monday – Saturday",
//         time: "Full Day",
//         activities: [
//           "Fajr & Morning Hizb",
//           "Tahfeedh Sessions",
//           "Tajweed Class",
//           "Muraja'ah",
//           "Islamic Studies",
//           "Night Review",
//         ],
//       },
//     ],
//   },
//   special: {
//     title: "Holiday Programs",
//     description: "Special programs during school breaks",
//     days: [
//       {
//         day: "Monday – Friday",
//         time: "8:00 AM – 12:00 PM",
//         activities: ["Intensive Tahfeedh", "Tajweed", "Quran Review"],
//       },
//     ],
//   },
// };

// export function PhysicalSchedule() {
//   return (
//     <section className="py-12 md:py-20 bg-gradient-to-b from-background via-emerald-50/5 to-amber-50/5">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 mb-4">
//             <Calendar className="w-4 h-4 text-emerald-600" />
//             <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
//               Class Schedules
//             </span>
//           </div>
//           <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
//             Program <span className="text-emerald-600">Schedules</span>
//           </h2>
//           <p className="text-lg text-muted-foreground">
//             Clear and organized class timings for all programs
//           </p>
//         </motion.div>

//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* Day Program */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-card p-6 md:p-8 rounded-2xl border border-border"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
//                 <Sun className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-black">{SCHEDULES.day.title}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {SCHEDULES.day.description}
//                 </p>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {SCHEDULES.day.days.map((schedule, i) => (
//                 <div key={i} className="p-4 rounded-xl bg-muted/30">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                     <span className="font-black">{schedule.day}</span>
//                     <span className="text-sm font-medium text-emerald-600">
//                       {schedule.time}
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {schedule.activities.map((activity, j) => (
//                       <span
//                         key={j}
//                         className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 text-xs font-medium"
//                       >
//                         {activity}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Boarding Program */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-br from-emerald-600/5 to-amber-500/5 p-6 md:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
//                 <Moon className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-black">
//                   {SCHEDULES.boarding.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {SCHEDULES.boarding.description}
//                 </p>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {SCHEDULES.boarding.days.map((schedule, i) => (
//                 <div key={i} className="p-4 rounded-xl bg-card/50">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                     <span className="font-black">{schedule.day}</span>
//                     <span className="text-sm font-medium text-emerald-600">
//                       {schedule.time}
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {schedule.activities.map((activity, j) => (
//                       <span
//                         key={j}
//                         className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 text-xs font-medium"
//                       >
//                         {activity}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Holiday Program */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="bg-card p-6 md:p-8 rounded-2xl border border-border"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
//                 <Calendar className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-black">
//                   {SCHEDULES.special.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {SCHEDULES.special.description}
//                 </p>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {SCHEDULES.special.days.map((schedule, i) => (
//                 <div key={i} className="p-4 rounded-xl bg-muted/30">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                     <span className="font-black">{schedule.day}</span>
//                     <span className="text-sm font-medium text-amber-600">
//                       {schedule.time}
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {schedule.activities.map((activity, j) => (
//                       <span
//                         key={j}
//                         className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 text-xs font-medium"
//                       >
//                         {activity}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }












// app/(marketing)/physical/components/sections/PhysicalSchedule.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Coffee,
  Crown,
  Heart,
  Moon,
  Sun
} from "lucide-react";

const DAILY_SCHEDULE = [
  { time: "5:00 AM", activity: "Fajr Prayer & Tahajjud", icon: Moon, color: "purple" },
  { time: "5:30 AM", activity: "Morning Tahfeedh Session", icon: BookOpen, color: "amber" },
  { time: "7:30 AM", activity: "Breakfast & Morning Review", icon: Coffee, color: "purple" },
  { time: "9:00 AM", activity: "Tajweed & Qira'ah Classes", icon: Sun, color: "amber" },
  { time: "11:00 AM", activity: "Islamic Studies / Arabic", icon: BookOpen, color: "purple" },
  { time: "1:00 PM", activity: "Dhuhr Prayer & Lunch", icon: Coffee, color: "amber" },
  { time: "2:00 PM", activity: "Asr Prayer & Study Period", icon: Clock, color: "purple" },
  { time: "3:00 PM", activity: "Revision & Muraja'ah", icon: Crown, color: "amber" },
  { time: "5:00 PM", activity: "Maghrib Prayer & Break", icon: Heart, color: "purple" },
  { time: "6:00 PM", activity: "Evening Tahfeedh Session", icon: BookOpen, color: "amber" },
  { time: "8:00 PM", activity: "Isha Prayer & Night Revision", icon: Moon, color: "purple" },
  { time: "10:00 PM", activity: "Rest & Sleep", icon: Coffee, color: "amber" },
];

const WEEKLY_OVERVIEW = [
  { day: "Monday - Thursday", focus: "Full Academic Schedule", icon: BookOpen },
  { day: "Friday", focus: "Jumu'ah Activities & Light Review", icon: Heart },
  { day: "Saturday", focus: "Extended Revision & Assessments", icon: Crown },
  { day: "Sunday", focus: "Rest & Personal Study", icon: Coffee },
];

export function PhysicalSchedule() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
              <Clock className="w-4 h-4" /> Daily Schedule
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading mb-4">
              A Structured{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Day of Learning
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every moment is designed for optimal Quran memorization, revision,
              and spiritual growth.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Schedule Timeline - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-amber-500 to-purple-600 hidden sm:block" />
              
              <div className="space-y-3">
                {DAILY_SCHEDULE.map((item, idx) => {
                  const Icon = item.icon;
                  const isPurple = item.color === "purple";
                  return (
                    <Reveal key={idx} delay={idx * 0.02}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="relative flex items-start gap-4 pl-0 sm:pl-12 group"
                      >
                        {/* Timeline Dot */}
                        <div className="hidden sm:flex absolute left-0 top-3 w-10 h-10 rounded-full bg-card border-2 border-purple-200 dark:border-purple-800 items-center justify-center z-10 group-hover:scale-110 transition-transform">
                          <div className={`w-3 h-3 rounded-full ${isPurple ? 'bg-purple-600' : 'bg-amber-500'}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-4 rounded-xl bg-card border border-border hover:border-purple-300 transition-all group-hover:shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg ${isPurple ? 'bg-purple-100 dark:bg-purple-950/40' : 'bg-amber-100 dark:bg-amber-950/40'} flex items-center justify-center shrink-0`}>
                                <Icon className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-amber-500'}`} />
                              </div>
                              <span className="font-black text-sm min-w-[70px]">{item.time}</span>
                            </div>
                            <span className="text-sm font-medium">{item.activity}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Weekly Overview - Takes 1 column */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-6">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                Weekly Overview
              </h3>
              <div className="space-y-4">
                {WEEKLY_OVERVIEW.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-black text-xs">{item.day}</p>
                        <p className="text-xs text-muted-foreground">{item.focus}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-purple-600/10 to-amber-500/10 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
              <h3 className="font-black text-sm mb-3">Key Benefits</h3>
              <div className="space-y-2">
                {[
                  "Structured daily routine",
                  "Consistent revision schedule",
                  "Balanced study and rest",
                  "Community learning environment",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}