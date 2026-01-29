import { BookOpen, Users, Award, Calendar, Video, FileText } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      title: "Hifz Tracking",
      description: "Track surah-by-surah progress with our visual Quran tracker. Log mistakes, retention, and daily lessons easily.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Classroom Mgmt",
      description: "Manage multiple classes, take attendance in one click, and organize students into study circles (Halqahs).",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Automated Grading",
      description: "Create assignments and quizzes. Our system calculates grades and generates report cards automatically.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-amber-600" />,
      title: "Smart Scheduling",
      description: "Automated timetables that respect prayer times. Avoid conflicts and manage teacher availability effortlessly.",
    },
    {
      icon: <Video className="h-8 w-8 text-rose-600" />,
      title: "Hybrid Learning",
      description: "Seamless integration with Zoom for online classes. Share resources and recordings securely.",
    },
    {
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      title: "Finance & Fees",
      description: "Automated invoicing for parents. Track payments, donations, and teacher payroll in one dashboard.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white mb-4">
            Everything Your Madrasah Needs
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A complete suite of tools designed specifically for Islamic educational institutions, from small Maktabs to large Universities.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
               <div className="mb-4 inline-flex rounded-xl bg-white dark:bg-slate-800 p-3 shadow-sm border border-slate-100 dark:border-slate-700">
                 {feature.icon}
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}