"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock, Users } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Certified Teachers",
    description:
      "All teachers are certified with Ijazah and years of experience",
  },
  {
    icon: CheckCircle,
    title: "Quality Guarantee",
    description: "14-day satisfaction guarantee with full refund option",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Learn at your own pace with 24/7 class scheduling",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Join 500+ students from 15+ countries worldwide",
  },
];

export function TrustIndicators() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
