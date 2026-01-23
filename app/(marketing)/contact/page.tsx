"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
          >
            Get in touch with our team. We're here to help you start your
            Quranic journey.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Have questions about our courses? Ready to start learning?
                  Reach out to us - we're happy to help you begin your Quranic
                  education journey.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "+1 (555) 123-4567",
                    description: "Mon to Fri 9am to 6pm",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "admin@almaysaroh.com",
                    description: "Send us your query anytime!",
                  },
                  {
                    icon: MapPin,
                    title: "Office",
                    content: "123 Islamic Center, Education City",
                    description: "Doha, Qatar",
                  },
                  {
                    icon: Clock,
                    title: "Support Hours",
                    content: "24/7 Online Support",
                    description: "We're always here to help",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-foreground">{item.content}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
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
                  <Users className="w-6 h-6 text-primary" />
                  <h4 className="font-semibold text-foreground">
                    Student Support
                  </h4>
                </div>
                <p className="text-muted-foreground">
                  Our dedicated student support team is available to help with
                  course selection, technical issues, and any questions about
                  your learning journey.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-card rounded-xl border shadow-sm p-6 lg:p-8"
            >
              <h3 className="text-2xl font-heading font-bold mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-card-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-card-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-card-foreground mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-card-foreground mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// // src/app/contact/page.tsx
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Form submitted:', formData);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
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
//             Contact Us
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto"
//           >
//             Get in touch with our team. We're here to help you start your Quranic journey.
//           </motion.p>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="container mx-auto px-4 lg:px-6">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Information */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="space-y-8"
//             >
//               <div>
//                 <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
//                   Get In Touch
//                 </h2>
//                 <p className="text-lg text-muted-foreground">
//                   Have questions about our courses? Ready to start learning?
//                   Reach out to us - we're happy to help you begin your Quranic education journey.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 {[
//                   {
//                     icon: Phone,
//                     title: 'Phone',
//                     content: '+1 (555) 123-4567',
//                     description: 'Mon to Fri 9am to 6pm'
//                   },
//                   {
//                     icon: Mail,
//                     title: 'Email',
//                     content: 'admin@almaysaroh.com',
//                     description: 'Send us your query anytime!'
//                   },
//                   {
//                     icon: MapPin,
//                     title: 'Office',
//                     content: '123 Islamic Center, Education City',
//                     description: 'Doha, Qatar'
//                   },
//                   {
//                     icon: Clock,
//                     title: 'Support Hours',
//                     content: '24/7 Online Support',
//                     description: "We're always here to help"
//                   }
//                 ].map((item, index) => (
//                   <motion.div
//                     key={item.title}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-start space-x-4"
//                   >
//                     <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <item.icon className="w-6 h-6 text-primary" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
//                       <p className="text-foreground">{item.content}</p>
//                       <p className="text-sm text-muted-foreground">{item.description}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Support Info */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="bg-primary/5 border border-primary/20 rounded-xl p-6"
//               >
//                 <div className="flex items-center space-x-3 mb-3">
//                   <Users className="w-6 h-6 text-primary" />
//                   <h4 className="font-semibold text-foreground">Student Support</h4>
//                 </div>
//                 <p className="text-muted-foreground">
//                   Our dedicated student support team is available to help with course selection,
//                   technical issues, and any questions about your learning journey.
//                 </p>
//               </motion.div>
//             </motion.div>

//             {/* Contact Form */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               className="bg-card rounded-xl border shadow-sm p-6 lg:p-8"
//             >
//               <h3 className="text-2xl font-heading font-bold mb-6">Send us a Message</h3>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
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
//                     <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
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

//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
//                     Subject *
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     required
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//                     placeholder="What is this regarding?"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     required
//                     rows={6}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
//                     placeholder="Tell us how we can help you..."
//                   />
//                 </div>

//                 <Button type="submit" size="lg" className="w-full">
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Message
//                 </Button>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
