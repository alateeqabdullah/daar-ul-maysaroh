"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Target,
  Clock,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type QuizStep = {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    value: any;
  }[];
};

type QuizAnswers = {
  level: "beginner" | "intermediate" | "advanced";
  goal: "reading" | "memorization" | "tajweed" | "understanding";
  schedule: "flexible" | "regular" | "intensive";
  learningStyle: "one-on-one" | "group" | "self-paced";
  ageGroup: "kids" | "teens" | "adults" | "seniors";
};

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: "What's your current Quran reading level?",
    options: [
      {
        id: "beginner",
        text: "Beginner - Starting from scratch",
        value: "beginner",
      },
      {
        id: "intermediate",
        text: "Intermediate - Can read with some mistakes",
        value: "intermediate",
      },
      { id: "advanced", text: "Advanced - Fluent reader", value: "advanced" },
    ],
  },
  {
    id: 2,
    question: "What's your primary learning goal?",
    options: [
      { id: "reading", text: "Learn to read Quran properly", value: "reading" },
      {
        id: "memorization",
        text: "Memorize Quran (Hifz)",
        value: "memorization",
      },
      { id: "tajweed", text: "Master Tajweed rules", value: "tajweed" },
      {
        id: "understanding",
        text: "Understand Quranic Arabic",
        value: "understanding",
      },
    ],
  },
  {
    id: 3,
    question: "What's your preferred learning schedule?",
    options: [
      {
        id: "flexible",
        text: "Flexible - When I have time",
        value: "flexible",
      },
      {
        id: "regular",
        text: "Regular - Set days/times each week",
        value: "regular",
      },
      {
        id: "intensive",
        text: "Intensive - Daily sessions",
        value: "intensive",
      },
    ],
  },
  {
    id: 4,
    question: "What's your preferred learning style?",
    options: [
      {
        id: "one-on-one",
        text: "One-on-One with teacher",
        value: "one-on-one",
      },
      { id: "group", text: "Group learning with peers", value: "group" },
      {
        id: "self-paced",
        text: "Self-paced with guidance",
        value: "self-paced",
      },
    ],
  },
  {
    id: 5,
    question: "Which age group do you belong to?",
    options: [
      { id: "kids", text: "Kids (5-12 years)", value: "kids" },
      { id: "teens", text: "Teens (13-17 years)", value: "teens" },
      { id: "adults", text: "Adults (18-59 years)", value: "adults" },
      { id: "seniors", text: "Seniors (60+ years)", value: "seniors" },
    ],
  },
];

const recommendedCourses = {
  beginner: {
    reading: "nazrah",
    memorization: "nazrah",
    tajweed: "nazrah",
    understanding: "arabic",
  },
  intermediate: {
    reading: "tajweed",
    memorization: "hifz",
    tajweed: "tajweed",
    understanding: "arabic",
  },
  advanced: {
    reading: "tajweed",
    memorization: "hifz",
    tajweed: "tajweed",
    understanding: "arabic",
  },
};

export default function CourseQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizSteps[currentStep];
  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  const handleAnswer = (value: any) => {
    const fieldName =
      currentQuestion.id === 1
        ? "level"
        : currentQuestion.id === 2
          ? "goal"
          : currentQuestion.id === 3
            ? "schedule"
            : currentQuestion.id === 4
              ? "learningStyle"
              : "ageGroup";

    setAnswers((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getRecommendedCourse = () => {
    if (answers.level && answers.goal) {
      const courseKey =
        recommendedCourses[answers.level as keyof typeof recommendedCourses]?.[
          answers.goal as keyof typeof recommendedCourses.beginner
        ];
      return courseKey || "nazrah";
    }
    return "nazrah";
  };

  const courseDetails = {
    nazrah: {
      title: "Quran Recitation (Nazrah)",
      description: "Perfect for beginners to learn Quran reading from scratch",
      match: "95% match",
      features: ["Arabic alphabet", "Basic pronunciation", "Fluent reading"],
      price: 48,
    },
    hifz: {
      title: "Quran Memorization (Hifz)",
      description: "Structured program for memorizing the entire Quran",
      match: "92% match",
      features: ["Daily memorization", "Revision system", "Ijazah preparation"],
      price: 80,
    },
    tajweed: {
      title: "Advanced Tajweed",
      description: "Master the rules of Quranic recitation",
      match: "88% match",
      features: ["Tajweed rules", "Practical application", "Voice training"],
      price: 60,
    },
    arabic: {
      title: "Quranic Arabic",
      description: "Understand Quran directly in Arabic",
      match: "90% match",
      features: ["Vocabulary building", "Grammar rules", "Translation"],
      price: 56,
    },
  };

  if (showResults) {
    const recommendedCourse = getRecommendedCourse();
    const course =
      courseDetails[recommendedCourse as keyof typeof courseDetails];

    return (
      <div className="min-h-screen bg-background pt-16">
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Star className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                Perfect Course Found!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Based on your learning preferences and goals
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card rounded-2xl border shadow-lg p-8 text-center">
                <div className="bg-primary/10 rounded-full px-4 py-2 w-fit mx-auto mb-6">
                  <span className="text-primary font-semibold">
                    {course.match}
                  </span>
                </div>

                <h2 className="text-3xl font-heading font-bold mb-4">
                  {course.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {course.description}
                </p>

                <div className="grid gap-3 mb-6">
                  {course.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-card-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-3xl font-bold text-primary mb-2">
                  ${course.price}
                </div>
                <div className="text-muted-foreground mb-6">per month</div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href={`/courses/${recommendedCourse}`}>
                      View Course Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/courses">Explore All Courses</Link>
                  </Button>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                >
                  Retake Quiz
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentStep + 1} of {quizSteps.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
                  {currentQuestion.question}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Options */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-4"
              >
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-6 text-left border-2 border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={goBack}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Question
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
