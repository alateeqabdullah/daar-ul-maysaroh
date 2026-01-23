"use client";

import { motion } from "framer-motion";
import { BookOpen, UserCheck, Target, Award } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: BookOpen,
    title: "Free Trial Class",
    description:
      "Start with a free trial to experience our teaching methodology",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Choose Your Teacher",
    description: "Select from certified teachers based on your learning goals",
  },
  {
    step: "03",
    icon: Target,
    title: "Personalized Plan",
    description:
      "Get a customized learning plan tailored to your level and objectives",
  },
  {
    step: "04",
    icon: Award,
    title: "Start Learning",
    description:
      "Begin your Quran journey with regular classes and progress tracking",
  },
];

export function LearningProcess() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Start Your <span className="text-primary">Quran Journey</span> in 4
            Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple process to begin learning Quran with expert guidance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-primary/20 -z-10" />
              )}

              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative">
                {step.step}
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
              </div>

              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-heading font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg">
            Start Free Trial
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 30-minute session with certified teacher
          </p>
        </motion.div>
      </div>
    </section>
  );
}
