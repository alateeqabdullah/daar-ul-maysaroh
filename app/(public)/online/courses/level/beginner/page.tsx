'use client';

import { motion } from 'framer-motion';
import { BookOpen, Target, Clock, CheckCircle, Zap, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourses } from '@/hooks/use-courses';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BeginnerCoursesPage() {
  const { courses, isLoading } = useCourses();
  
  const beginnerCourses = courses.filter(course => course.level === 'BEGINNER');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-card rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500 to-pink-600 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Beginner Level</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold">
                Start Your Quran Journey
              </h1>
              
              <p className="text-xl text-purple-100">
                Perfect for absolute beginners. Learn Quran reading from scratch with patient, certified teachers.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Start from Zero', value: 'No Experience Needed' },
                  { label: 'Patient Teachers', value: 'Specialized' },
                  { label: 'Success Rate', value: '99%' },
                  { label: 'Flexible Pace', value: 'Your Speed' },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-heading font-bold mb-6">Perfect for Beginners</h3>
              <div className="space-y-4">
                {[
                  'Start with Arabic alphabet and basic sounds',
                  'Learn at your own comfortable pace',
                  'Patient teachers specialized in beginner education',
                  'Build confidence step by step',
                  'Focus on proper pronunciation from day one',
                  'Supportive and encouraging environment'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-purple-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Beginner Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your Quranic journey with our carefully designed beginner courses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beginnerCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Course Header */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Type Badge */}
                  <div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      course.type === 'ONE_ON_ONE' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    )}>
                      {course.type === 'ONE_ON_ONE' ? 'One-on-One' : 'Group'}
                    </span>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    {course.features.slice(0, 3).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-card-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-primary">${course.price}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}m</span>
                      </div>
                      <div className="text-xs text-muted-foreground">per session</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full group-hover:scale-105 transition-transform duration-200" asChild>
                    <Link href={`/courses/${course.id}`}>
                      Start Learning
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From complete beginner to confident Quran reader
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Foundation Building',
                  description: 'Learn Arabic alphabet and basic pronunciation',
                  duration: '2-4 weeks'
                },
                {
                  step: '02',
                  title: 'Word Formation',
                  description: 'Combine letters to form words and short verses',
                  duration: '3-5 weeks'
                },
                {
                  step: '03',
                  title: 'Fluent Reading',
                  description: 'Read complete verses and short Surahs fluently',
                  duration: '4-6 weeks'
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-2">{step.description}</p>
                  <div className="text-sm text-primary font-medium">{step.duration}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Star className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Begin Your Quran Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Take the first step towards connecting with the Quran. No prior experience needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore All Courses
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}