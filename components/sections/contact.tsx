"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Get <span className="text-primary">Started</span> Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Begin your Quran learning journey with a free trial class. Our team
            is here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="grid gap-6">
              {[
                {
                  icon: MessageCircle,
                  title: "Free Trial Class",
                  description:
                    "Experience our teaching methodology with a 30-minute free session",
                  action: "Book Free Trial",
                  color: "primary",
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  description:
                    "Get detailed answers to your questions within 24 hours",
                  action: "Send Email",
                  color: "accent",
                },
                {
                  icon: Phone,
                  title: "Phone Consultation",
                  description: "Speak directly with our education consultants",
                  action: "Schedule Call",
                  color: "green",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : item.color === "accent"
                            ? "bg-accent/10 text-accent"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Button
                        className={
                          item.color === "primary"
                            ? "bg-primary hover:bg-primary/90"
                            : item.color === "accent"
                              ? "bg-accent hover:bg-accent/90"
                              : "bg-green-600 hover:bg-green-700"
                        }
                      >
                        {item.action}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-primary" />
                <h4 className="font-semibold text-foreground">Support Hours</h4>
              </div>
              <p className="text-muted-foreground mb-2">
                <strong>24/7 Online Support:</strong> Get help anytime through
                our platform
              </p>
              <p className="text-muted-foreground">
                <strong>Phone Support:</strong> Mon-Fri 9AM-6PM (Your Local
                Time)
              </p>
            </motion.div>
          </motion.div>

          {/* Quick Enrollment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-card rounded-xl border shadow-sm p-6 lg:p-8"
          >
            <h3 className="text-2xl font-heading font-bold mb-2">
              Quick Enrollment
            </h3>
            <p className="text-muted-foreground mb-6">
            {`  Provide your details and we'll contact you to schedule your free
              trial`}
            </p>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Interested Course
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
                  <option value="">Select a course</option>
                  <option value="quran-recitation">
                    Quran Recitation (Nazrah)
                  </option>
                  <option value="hifz">Quran Memorization (Hifz)</option>
                  <option value="tajweed">Advanced Tajweed</option>
                  <option value="arabic">Quranic Arabic</option>
                </select>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Get Free Trial Class
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to our terms and privacy policy. No
                credit card required.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// // 📄 src/components/sections/contact.tsx
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Mail, Phone, MapPin, Send, Clock, Users } from "lucide-react";

// export function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     course: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate form submission
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     setIsSubmitting(false);
//     setIsSubmitted(true);

//     // Reset form after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({ name: "", email: "", phone: "", course: "", message: "" });
//     }, 3000);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <section id="contact" className="py-20 bg-background">
//       <div className="container mx-auto px-4 lg:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//             Get <span className="text-primary">Started</span> Today
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Begin your Quranic journey with a free trial class
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {/* Contact Information */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="space-y-8"
//           >
//             <div>
//               <h3 className="text-2xl font-heading font-bold mb-6">
//                 Contact Information
//               </h3>
//               <p className="text-muted-foreground mb-8">
//                 Reach out to us for any questions about our courses, enrollment
//                 process, or to schedule a free trial class with our qualified
//                 teachers.
//               </p>
//             </div>

//             <div className="space-y-6">
//               {[
//                 {
//                   icon: Phone,
//                   title: "Phone",
//                   content: "+1 (555) 123-4567",
//                   description: "Mon to Fri 9am to 6pm",
//                 },
//                 {
//                   icon: Mail,
//                   title: "Email",
//                   content: "admin@almaysaroh.com",
//                   description: "Send us your query anytime!",
//                 },
//                 {
//                   icon: MapPin,
//                   title: "Office",
//                   content: "123 Islamic Center, Education City",
//                   description: "Doha, Qatar",
//                 },
//                 {
//                   icon: Clock,
//                   title: "Support Hours",
//                   content: "24/7 Online Support",
//                   description: "We're always here to help",
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={item.title}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className="flex items-start space-x-4"
//                 >
//                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <item.icon className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-foreground mb-1">
//                       {item.title}
//                     </h4>
//                     <p className="text-foreground">{item.content}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {item.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Support Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="bg-primary/5 border border-primary/20 rounded-xl p-6"
//             >
//               <div className="flex items-center space-x-3 mb-3">
//                 <Users className="w-6 h-6 text-primary" />
//                 <h4 className="font-semibold text-foreground">
//                   Student Support
//                 </h4>
//               </div>
//               <p className="text-muted-foreground">
//                 Our dedicated student support team is available to help with
//                 course selection, technical issues, and any questions about your
//                 learning journey.
//               </p>
//             </motion.div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-card rounded-xl border shadow-sm p-6 lg:p-8"
//           >
//             {isSubmitted ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="text-center py-8"
//               >
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Send className="w-8 h-8 text-green-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-card-foreground mb-2">
//                   Thank You!
//                 </h3>
//                 <p className="text-muted-foreground">
//               {`    Your message has been sent successfully. We'll contact you
//                   within 24 hours.`}
//                 </p>
//               </motion.div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-card-foreground mb-2"
//                     >
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//                       placeholder="Your full name"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-card-foreground mb-2"
//                     >
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//                       placeholder="your@email.com"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-card-foreground mb-2"
//                     >
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//                       placeholder="+1 (555) 123-4567"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="course"
//                       className="block text-sm font-medium text-card-foreground mb-2"
//                     >
//                       Interested Course
//                     </label>
//                     <select
//                       id="course"
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//                     >
//                       <option value="">Select a course</option>
//                       <option value="quran-recitation">Quran Recitation</option>
//                       <option value="hifz">Quran Memorization (Hifz)</option>
//                       <option value="tajweed">Advanced Tajweed</option>
//                       <option value="arabic">Arabic Language</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-medium text-card-foreground mb-2"
//                   >
//                     Message *
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     required
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
//                     placeholder="Tell us about your goals and experience level..."
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full"
//                   size="lg"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4 mr-2" />
//                       Send Message
//                     </>
//                   )}
//                 </Button>
//               </form>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
