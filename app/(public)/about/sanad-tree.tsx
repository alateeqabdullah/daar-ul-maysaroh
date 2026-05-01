// app/about/components/sanad-tree.tsx
"use client";

import { useState } from "react";
import {
  ChevronDown,
  Crown,
  Users,
  GraduationCap,
  Shield,
  Heart,
  Star,
  ScrollText,
} from "lucide-react";

interface SanadNode {
  id: string;
  name: string;
  title: string;
  era: string;
  location: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  isYou?: boolean;
  children?: SanadNode[];
}

const SANAD_DATA: SanadNode = {
  id: "prophet",
  name: "Prophet Muhammad ﷺ",
  title: "Seal of the Prophets",
  era: "570-632 CE",
  location: "Makkah/Madinah",
  color: "amber",
  icon: Crown,
  description:
    "The final messenger who received the Quran through Angel Jibril.",
  children: [
    {
      id: "companions",
      name: "The Companions",
      title: "Sahabah",
      era: "7th Century",
      location: "Arabia",
      color: "amber",
      icon: Users,
      description: "First generation who learned directly from the Prophet.",
      children: [
        {
          id: "tabieen",
          name: "The Followers",
          title: "Tabieen",
          era: "7th-8th Century",
          location: "Various",
          color: "purple",
          icon: Users,
          description: "Second generation who learned from the Companions.",
          children: [
            {
              id: "classical",
              name: "Classical Scholars",
              title: "Qurra & Muhadditheen",
              era: "8th-14th Century",
              location: "Global",
              color: "purple",
              icon: GraduationCap,
              description: "The great imams who codified Tajweed and Qira'at.",
              children: [
                {
                  id: "modern",
                  name: "Modern Scholars",
                  title: "Contemporary Masters",
                  era: "14th-20th Century",
                  location: "Worldwide",
                  color: "purple",
                  icon: Shield,
                  description:
                    "Scholars who preserved the Sanad through modern times.",
                  children: [
                    {
                      id: "teachers",
                      name: "Our Teachers",
                      title: "Al-Maysaroh Faculty",
                      era: "21st Century",
                      location: "Global",
                      color: "amber",
                      icon: Heart,
                      description:
                        "Our Ijazah-certified scholars who carry the Sanad today.",
                      children: [
                        {
                          id: "you",
                          name: "YOU",
                          title: "Future Carrier",
                          era: "Present",
                          location: "Your Location",
                          color: "purple",
                          icon: Star,
                          description:
                            "Begin your journey to become a carrier of the Sanad.",
                          isYou: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function TreeNode({ node, level = 0 }: { node: SanadNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = node.icon;
  const isAmber = node.color === "amber";
  const borderColor = isAmber ? "border-amber-500" : "border-purple-600";
  const bgColor = isAmber
    ? "bg-amber-50 dark:bg-amber-950/20"
    : "bg-purple-50 dark:bg-purple-950/20";
  const textColor = isAmber ? "text-amber-600" : "text-purple-600";

  return (
    <div className="relative">
      {level > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-purple-600/30 to-amber-500/30 -translate-x-1/2" />
      )}

      <div className="relative flex mb-2">
        {level > 0 && (
          <div className="absolute left-0 top-5 w-6 h-px bg-purple-600/30 -translate-x-1/2" />
        )}

        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -left-7 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center hover:bg-purple-200 transition z-10"
          >
            <ChevronDown
              className={`w-3 h-3 text-purple-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}

        <div
          className={`flex-1 p-4 rounded-xl border-2 ${borderColor} ${bgColor} ${node.isYou ? "ring-4 ring-amber-500/30 shadow-xl" : ""} group hover:scale-[1.01] transition-all duration-300`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${bgColor} ${borderColor} border flex items-center justify-center`}
            >
              <Icon className={`w-5 h-5 ${textColor}`} />
            </div>
            <div>
              <h3
                className={`font-black ${node.isYou ? "text-amber-600" : textColor}`}
              >
                {node.name}
                {node.isYou && (
                  <span className="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                {node.title} • {node.era}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 border-t border-purple-200 pt-2">
            {node.description}
          </p>
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-6 pl-6 border-l-2 border-dashed border-purple-600/20">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SanadTree() {
  return (
    <div className="bg-card rounded-2xl border border-purple-200 p-6 shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-3">
          <ScrollText className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-black uppercase text-purple-700">
            The Living Chain
          </span>
        </div>
        <h3 className="text-xl font-black">
          Your Voice Connects to the Prophet ﷺ
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          An unbroken chain spanning 1,400 years
        </p>
      </div>
      <TreeNode node={SANAD_DATA} />
    </div>
  );
}
