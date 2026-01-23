// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ChevronDown,
//   ChevronUp,
//   BookOpen,
//   Users,
//   CreditCard,
//   Clock,
// } from "lucide-react";
// import Link from "next/link";

// const faqCategories = [
//   {
//     icon: BookOpen,
//     title: "Courses & Learning",
//     questions: [
//       {
//         question: "What courses do you offer?",
//         answer:
//           "We offer comprehensive Quran courses including Quran Recitation (Nazrah), Quran Memorization (Hifz Program), Advanced Tajweed, Quranic Arabic, and specialized programs like Quran Competition Preparation and Ramadan Intensive courses.",
//       },
//       {
//         question: "Are the classes one-on-one or group?",
//         answer:
//           "Most of our courses are one-on-one to ensure personalized attention. We also offer limited group courses for special programs like competition preparation and Ramadan intensives.",
//       },
//       {
//         question: "What qualifications do your teachers have?",
//         answer:
//           "All our teachers are certified with Ijazah (teaching certification) in Quran recitation. Many have degrees from reputable Islamic universities and years of teaching experience. Each teacher is carefully vetted and trained in our teaching methodology.",
//       },
//       {
//         question: "Can I choose my teacher?",
//         answer:
//           "Yes! During enrollment, you can select from available teachers based on their specialization, experience, and teaching style. We also provide teacher profiles to help you make an informed choice.",
//       },
//     ],
//   },
//   {
//     icon: CreditCard,
//     title: "Payment & Pricing",
//     questions: [
//       {
//         question: "What are your payment options?",
//         answer:
//           "We accept major credit cards, debit cards, and online payments through secure payment gateways. We offer monthly subscription plans with flexible billing cycles.",
//       },
//       {
//         question: "Is there a free trial?",
//         answer:
//           "Yes! We offer a free trial class so you can experience our teaching methodology and meet your potential teacher before committing to a course.",
//       },
//       {
//         question: "Can I get a refund?",
//         answer:
//           "We offer a 14-day satisfaction guarantee. If you're not satisfied with our service within the first two weeks, you can request a full refund.",
//       },
//       {
//         question: "Do you offer financial assistance?",
//         answer:
//           "Yes, we offer scholarships and financial aid for deserving students. Contact our support team to learn more about eligibility and application process.",
//       },
//     ],
//   },
//   {
//     icon: Clock,
//     title: "Schedule & Timing",
//     questions: [
//       {
//         question: "How flexible is the schedule?",
//         answer:
//           "Very flexible! You can schedule classes at times that work for you, including evenings and weekends. Our platform supports multiple time zones to accommodate international students.",
//       },
//       {
//         question: "What if I miss a class?",
//         answer:
//           "We understand life happens. You can reschedule classes with at least 24 hours notice. We allow up to 2 reschedules per month to ensure flexibility while maintaining learning consistency.",
//       },
//       {
//         question: "How long are the class sessions?",
//         answer:
//           "Class durations vary by course: Recitation classes are 45 minutes, Hifz program sessions are 60 minutes, and group courses are 90 minutes. All sessions are designed for optimal learning retention.",
//       },
//       {
//         question: "Do you offer intensive programs?",
//         answer:
//           "Yes! We offer Ramadan intensive programs and summer crash courses for students who want to accelerate their learning. These are typically group-based with more frequent sessions.",
//       },
//     ],
//   },
//   {
//     icon: Users,
//     title: "Technical & Support",
//     questions: [
//       {
//         question: "What equipment do I need?",
//         answer:
//           "You need a computer or tablet with webcam, microphone, and stable internet connection. We recommend using headphones for better audio quality. Our platform works on all modern browsers.",
//       },
//       {
//         question: "How do online classes work?",
//         answer:
//           "Classes are conducted through our secure video platform. You'll get a personalized classroom with interactive whiteboard, document sharing, and real-time feedback tools. All sessions are recorded for your review.",
//       },
//       {
//         question: "What if I have technical issues?",
//         answer:
//           "Our technical support team is available 24/7 to help with any issues. We also provide pre-class technical checks and have detailed troubleshooting guides for common problems.",
//       },
//       {
//         question: "Is the platform mobile-friendly?",
//         answer:
//           "Yes! Our platform works seamlessly on smartphones and tablets. You can attend classes, submit assignments, and track your progress from any device.",
//       },
//     ],
//   },
// ];

// export default function FAQPage() {
//   const [openCategory, setOpenCategory] = useState(0);
//   const [openQuestions, setOpenQuestions] = useState<number[]>([]);

//   const toggleQuestion = (index: number) => {
//     setOpenQuestions((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

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
//             Frequently Asked Questions
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
//           >
//             Find answers to common questions about our Quran courses and
//             learning platform.
//           </motion.p>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="container mx-auto px-4 lg:px-6">
//           {/* Category Tabs */}
//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             {faqCategories.map((category, index) => (
//               <motion.button
//                 key={category.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => setOpenCategory(index)}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 ${
//                   openCategory === index
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "bg-card text-card-foreground border-border hover:border-primary/50"
//                 }`}
//               >
//                 <category.icon className="w-4 h-4" />
//                 <span className="font-medium">{category.title}</span>
//               </motion.button>
//             ))}
//           </div>

//           {/* FAQ Content */}
//           <div className="max-w-4xl mx-auto">
//             <motion.div
//               key={openCategory}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-4"
//             >
//               {faqCategories[openCategory].questions.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-card border border-border rounded-xl shadow-sm"
//                 >
//                   <button
//                     onClick={() => toggleQuestion(index)}
//                     className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
//                   >
//                     <span className="font-semibold text-lg text-card-foreground pr-4">
//                       {item.question}
//                     </span>
//                     {openQuestions.includes(index) ? (
//                       <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
//                     ) : (
//                       <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
//                     )}
//                   </button>

//                   <AnimatePresence>
//                     {openQuestions.includes(index) && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="px-6 pb-6">
//                           <p className="text-muted-foreground leading-relaxed">
//                             {item.answer}
//                           </p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Still Have Questions */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/20"
//           >
//             <h3 className="text-2xl font-heading font-bold mb-4">
//               Still have questions?
//             </h3>
//             <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
//              {` Can't find the answer you're looking for? Please chat with our
//               friendly team.`}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
//               >
//                 Contact Support
//               </Link>
//               <Link
//                 href="mailto:support@almaysaroh.com"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
//               >
//                 Email Us
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }



// src/app/faq/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  CreditCard,
  Clock,
} from "lucide-react";

const faqCategories = [
  {
    icon: BookOpen,
    title: "Courses & Learning",
    questions: [
      {
        question: "What courses do you offer?",
        answer:
          "We offer comprehensive Quran courses including Quran Recitation (Nazrah), Quran Memorization (Hifz Program), Advanced Tajweed, Quranic Arabic, and specialized programs like Quran Competition Preparation and Ramadan Intensive courses.",
      },
      {
        question: "Are the classes one-on-one or group?",
        answer:
          "Most of our courses are one-on-one to ensure personalized attention. We also offer limited group courses for special programs like competition preparation and Ramadan intensives.",
      },
      {
        question: "What qualifications do your teachers have?",
        answer:
          "All our teachers are certified with Ijazah (teaching certification) in Quran recitation. Many have degrees from reputable Islamic universities and years of teaching experience. Each teacher is carefully vetted and trained in our teaching methodology.",
      },
      {
        question: "Can I choose my teacher?",
        answer:
          "Yes! During enrollment, you can select from available teachers based on their specialization, experience, and teaching style. We also provide teacher profiles to help you make an informed choice.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Pricing",
    questions: [
      {
        question: "What are your payment options?",
        answer:
          "We accept major credit cards, debit cards, and online payments through secure payment gateways. We offer monthly subscription plans with flexible billing cycles.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a free trial class so you can experience our teaching methodology and meet your potential teacher before committing to a course.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "We offer a 14-day satisfaction guarantee. If you're not satisfied with our service within the first two weeks, you can request a full refund.",
      },
      {
        question: "Do you offer financial assistance?",
        answer:
          "Yes, we offer scholarships and financial aid for deserving students. Contact our support team to learn more about eligibility and application process.",
      },
    ],
  },
  {
    icon: Clock,
    title: "Schedule & Timing",
    questions: [
      {
        question: "How flexible is the schedule?",
        answer:
          "Very flexible! You can schedule classes at times that work for you, including evenings and weekends. Our platform supports multiple time zones to accommodate international students.",
      },
      {
        question: "What if I miss a class?",
        answer:
          "We understand life happens. You can reschedule classes with at least 24 hours notice. We allow up to 2 reschedules per month to ensure flexibility while maintaining learning consistency.",
      },
      {
        question: "How long are the class sessions?",
        answer:
          "Class durations vary by course: Recitation classes are 45 minutes, Hifz program sessions are 60 minutes, and group courses are 90 minutes. All sessions are designed for optimal learning retention.",
      },
      {
        question: "Do you offer intensive programs?",
        answer:
          "Yes! We offer Ramadan intensive programs and summer crash courses for students who want to accelerate their learning. These are typically group-based with more frequent sessions.",
      },
    ],
  },
  {
    icon: Users,
    title: "Technical & Support",
    questions: [
      {
        question: "What equipment do I need?",
        answer:
          "You need a computer or tablet with webcam, microphone, and stable internet connection. We recommend using headphones for better audio quality. Our platform works on all modern browsers.",
      },
      {
        question: "How do online classes work?",
        answer:
          "Classes are conducted through our secure video platform. You'll get a personalized classroom with interactive whiteboard, document sharing, and real-time feedback tools. All sessions are recorded for your review.",
      },
      {
        question: "What if I have technical issues?",
        answer:
          "Our technical support team is available 24/7 to help with any issues. We also provide pre-class technical checks and have detailed troubleshooting guides for common problems.",
      },
      {
        question: "Is the platform mobile-friendly?",
        answer:
          "Yes! Our platform works seamlessly on smartphones and tablets. You can attend classes, submit assignments, and track your progress from any device.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState(0);
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
          >
            Find answers to common questions about our Quran courses and
            learning platform.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {faqCategories.map((category, index) => (
              <motion.button
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setOpenCategory(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 ${
                  openCategory === index
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border hover:border-primary/50"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="font-medium">{category.title}</span>
              </motion.button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={openCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {faqCategories[openCategory].questions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl shadow-sm"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-lg text-card-foreground pr-4">
                      {item.question}
                    </span>
                    {openQuestions.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {openQuestions.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/20"
          >
            <h3 className="text-2xl font-heading font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please chat with our
              friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@almaysaroh.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
