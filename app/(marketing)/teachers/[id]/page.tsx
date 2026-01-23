"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Clock,
  Star,
  BookOpen,
  Calendar,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { teachers } from "@/lib/data";

export default function TeacherProfilePage() {
  const params = useParams();
  const teacherId = params.id as string;

  const teacher = teachers.find((t) => t.id === teacherId);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8 text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">
            Teacher Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
           {` The teacher you're looking for doesn't exist.`}
          </p>
          <Link href="/teachers">
            <Button>View All Teachers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-4">
                {teacher.name}
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-6">
                {teacher.qualification}
              </p>
              <p className="text-lg text-primary-foreground/80 max-w-2xl">
                {teacher.bio}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-16 h-16 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">4.9/5</span>
                </div>
                <p className="text-primary-foreground/80">Student Rating</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Specialization & Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border shadow-sm p-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Areas of Expertise
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {teacher.expertise.map((skill) => (
                    <div key={skill} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-card-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Teaching Philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl border shadow-sm p-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Teaching Approach
                </h2>
                <div className="prose prose-lg max-w-none text-card-foreground">
                  <p>
                    {teacher.name} brings a unique blend of traditional Islamic
                    teaching methodologies with modern educational techniques to
                    create an engaging and effective learning environment.
                  </p>

                  <h3 className="text-xl font-heading font-bold mt-6 mb-4">
                    Teaching Methodology
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Structured curriculum with gradual progression
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Personalized attention to individual learning styles
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Interactive sessions with continuous feedback</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        Focus on both theoretical knowledge and practical
                        application
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-heading font-bold mt-6 mb-4">
                    Student Success Stories
                  </h3>
                  <p>{`
                    Under {teacher.name.split(" ")[0]}'s guidance, numerous
                    students have successfully completed Quran memorization,
                    improved their recitation, and gained deeper understanding
                    of Tajweed rules. Many have gone on to participate in Quran
                    competitions and achieve Ijazah certifications.
                `}  </p>
                </div>
              </motion.div>

              {/* Available Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl border shadow-sm p-6"
              >
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Courses Taught
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Quran Recitation (Nazrah)",
                      level: "Beginner to Advanced",
                      description:
                        "Learn proper Quran reading from basics to fluency",
                    },
                    {
                      title: "Quran Memorization (Hifz)",
                      level: "Intermediate to Advanced",
                      description:
                        "Complete Quran memorization with revision system",
                    },
                    {
                      title: "Advanced Tajweed",
                      level: "Intermediate to Advanced",
                      description: "Master the rules of Quranic recitation",
                    },
                    {
                      title: "Quranic Arabic",
                      level: "Beginner to Intermediate",
                      description: "Understand Quran in its original language",
                    },
                  ].map((course) => (
                    <div
                      key={course.title}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-card-foreground">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {course.level}
                        </span>
                      </div>
                      <Link href="/#courses">
                        <Button size="sm">Learn More</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-card rounded-xl border shadow-sm p-6"
              >
                <h3 className="text-lg font-heading font-bold mb-6">
                  Teacher Stats
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Clock,
                      label: "Teaching Experience",
                      value: teacher.experience,
                    },
                    { icon: Users, label: "Students Taught", value: "200+" },
                    { icon: Star, label: "Success Rate", value: "98%" },
                    {
                      icon: Award,
                      label: "Certifications",
                      value: "Multiple Ijazah",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <stat.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {stat.label}
                        </span>
                      </div>
                      <span className="font-semibold text-card-foreground">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl border shadow-sm p-6"
              >
                <h3 className="text-lg font-heading font-bold mb-4">
                  Availability
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", time: "Flexible" },
                  ].map((slot) => (
                    <div
                      key={slot.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{slot.day}</span>
                      <span className="font-medium text-card-foreground">
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 text-center">
                    Currently accepting new students
                  </p>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <Link href="/#courses" className="block">
                  <Button size="lg" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Trial Class
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Teacher
                  </Button>
                </Link>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-xl border shadow-sm p-6"
              >
                <h3 className="text-lg font-heading font-bold mb-4">
                  Languages
                </h3>
                <div className="space-y-2">
                  {["Arabic", "English", "Urdu"].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-card-foreground">
                        {language}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Teachers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              Meet Other Qualified Teachers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers
                .filter((t) => t.id !== teacher.id)
                .slice(0, 3)
                .map((relatedTeacher) => (
                  <div
                    key={relatedTeacher.id}
                    className="bg-card rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-card-foreground mb-2">
                      {relatedTeacher.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {relatedTeacher.specialization}
                    </p>
                    <Link href={`/teachers/${relatedTeacher.id}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
