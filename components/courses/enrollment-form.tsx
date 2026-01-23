"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCreateEnrollment } from "@/hooks/use-enrollments";
import { useTeachers } from "@/hooks/use-courses";
import { cn } from "@/lib/utils";
import { StripeCheckoutButton } from "@/components/payment/stripe-checkout-button";

interface EnrollmentFormProps {
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    type: string;
  };
  onSuccess?: () => void;
}

export function EnrollmentForm({ course, onSuccess }: EnrollmentFormProps) {
  const { user, isAuthenticated } = useAuth();
  const { teachers, isLoading: teachersLoading } = useTeachers();
  const { createEnrollment, isCreating, error } = useCreateEnrollment();

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [startDate, setStartDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [studentCount, setStudentCount] = useState(1);
  const [step, setStep] = useState(1);

  const availableTeachers = teachers.filter((teacher) =>
    teacher.specialization.some(
      (spec) =>
        course.title.toLowerCase().includes(spec.toLowerCase()) ||
        spec.toLowerCase().includes(course.type.toLowerCase())
    )
  );

  const familyDiscounts = [
    { students: 1, discount: 0, label: "No Discount" },
    { students: 2, discount: 0.15, label: "15% Family Discount" },
    { students: 3, discount: 0.25, label: "25% Family Discount" },
    { students: 4, discount: 0.35, label: "35% Family Discount" },
  ];

  const currentDiscount =
    familyDiscounts.find((d) => d.students === studentCount)?.discount || 0;
  const discountedPrice = course.price * (1 - currentDiscount) * studentCount;

  const handleEnroll = async () => {
    if (!isAuthenticated || !user?.studentId) {
      alert("Please sign in to enroll in a course");
      return;
    }

    if (!selectedTeacher || !startDate) {
      alert("Please select a teacher and start date");
      return;
    }

    try {
      await createEnrollment({
        studentId: user.studentId,
        courseId: course.id,
        teacherId: selectedTeacher,
        startDate: new Date(startDate).toISOString(),
        studentCount: studentCount,
      });

      setStep(4); // Payment step
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-card rounded-2xl border shadow-sm p-6 text-center">
        <h3 className="text-lg font-heading font-bold mb-4">
          Enroll in Course
        </h3>
        <p className="text-muted-foreground mb-6">
          Please sign in to enroll in this course
        </p>
        <Button asChild className="w-full">
          <a href="/auth/signin">Sign In to Enroll</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border shadow-sm p-6">
      <h3 className="text-lg font-heading font-bold mb-6">
        Enroll in {course.title}
      </h3>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step >= stepNumber
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step > stepNumber ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 4 && (
              <div
                className={cn(
                  "w-8 h-1 mx-2",
                  step > stepNumber ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Teacher Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h4 className="font-semibold text-card-foreground mb-4 flex items-center">
              <User className="w-5 h-5 text-primary mr-2" />
              Select Your Teacher
            </h4>
            <div className="space-y-3">
              {availableTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className={cn(
                    "p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedTeacher === teacher.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedTeacher(teacher.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-card-foreground">
                        {teacher.name}
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {teacher.qualification}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                          {teacher.experience}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Specializes in: {teacher.specialization.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setStep(2)}
            disabled={!selectedTeacher}
            className="w-full"
          >
            Continue to Schedule
          </Button>
        </motion.div>
      )}

      {/* Step 2: Schedule & Family Selection */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center">
                <Calendar className="w-4 h-4 text-primary mr-2" />
                Preferred Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center">
                <Clock className="w-4 h-4 text-primary mr-2" />
                Preferred Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 9PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center">
                <Users className="w-4 h-4 text-primary mr-2" />
                Number of Students
              </label>
              <div className="grid grid-cols-4 gap-2">
                {familyDiscounts.map((discount) => (
                  <button
                    key={discount.students}
                    onClick={() => setStudentCount(discount.students)}
                    className={cn(
                      "p-3 border rounded-lg text-sm font-medium transition-all duration-200 relative",
                      studentCount === discount.students
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 text-card-foreground"
                    )}
                  >
                    {discount.students}
                    {discount.discount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
                        -{discount.discount * 100}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {currentDiscount > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  🎉 You qualify for {currentDiscount * 100}% family discount!
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!startDate}
              className="flex-1"
            >
              Review & Enroll
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review & Confirm */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-heading font-bold mb-2">
              Review Your Enrollment
            </h4>
            <p className="text-muted-foreground">
              Please review your course details before proceeding to payment
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course:</span>
              <span className="font-medium">{course.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Teacher:</span>
              <span className="font-medium">
                {availableTeachers.find((t) => t.id === selectedTeacher)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date:</span>
              <span className="font-medium">
                {new Date(startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Students:</span>
              <span className="font-medium">{studentCount}</span>
            </div>

            {currentDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Family Discount:</span>
                <span className="font-medium">-{currentDiscount * 100}%</span>
              </div>
            )}

            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total Monthly:</span>
              <span>${discountedPrice}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleEnroll}
              disabled={isCreating}
              className="flex-1"
            >
              {isCreating ? "Processing..." : "Confirm & Pay"}
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              Failed to enroll: {error.message}
            </div>
          )}
        </motion.div>
      )}

      {/* Step 4: Payment */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-center">
            <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-heading font-bold mb-2">
              Complete Payment
            </h4>
            <p className="text-muted-foreground">
              Secure payment processed by Stripe
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">${discountedPrice}</div>
            <p className="text-primary-foreground/80">per month</p>
            {currentDiscount > 0 && (
              <p className="text-green-300 text-sm mt-2">
               {` 🎉 You're saving $
                ${course.price * studentCount - discountedPrice} monthly!`}
              </p>
            )}
          </div>

          <StripeCheckoutButton
            priceId={getStripePriceIdForCourse(course)}
            courseId={course.id}
            className="w-full"
          >
            <Zap className="w-4 h-4 mr-2" />
            Pay Securely
          </StripeCheckoutButton>

          <div className="text-center text-xs text-muted-foreground">
            🔒 Your payment is secure and encrypted. You can cancel anytime.
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Helper function to get Stripe price ID
function getStripePriceIdForCourse(course: any): string {
  // This would map your course to actual Stripe price IDs
  // For now, returning a placeholder
  return "price_" + course.id;
}

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, Clock, User, CreditCard, CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/use-auth";
// import { StripeCheckoutButton } from "@/components/payment/stripe-checkout-button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// interface EnrollmentFormProps {
//   course: {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     duration: number;
//     type: string;
//   };
// }

// export function EnrollmentForm({ course }: EnrollmentFormProps) {
//   const { user, isAuthenticated } = useAuth();
//   const [selectedTeacher, setSelectedTeacher] = useState<string>("");
//   const [startDate, setStartDate] = useState<string>("");
//   const [preferredTime, setPreferredTime] = useState<string>("");
//   const [step, setStep] = useState<number>(1);

//   // Mock teachers data - in real app, fetch from API
//   const teachers = [
//     {
//       id: "1",
//       name: "Shaykh Ahmed Al-Mansouri",
//       qualification: "Ijazah in Hafs & Shubah, Al-Azhar Certified",
//       specialization: ["Hifz Program", "Ijazah", "Advanced Tajweed"],
//       experience: "15+ Years",
//     },
//     {
//       id: "2",
//       name: "Ustadha Fatima Khan",
//       qualification: "Ijazah in Qiraat, Islamic University Graduate",
//       specialization: ["Nazrah", "Basic Tajweed", "Children Education"],
//       experience: "10+ Years",
//     },
//   ];

//   const availableTeachers = teachers.filter((teacher) =>
//     teacher.specialization.some(
//       (spec) =>
//         course.title.toLowerCase().includes(spec.toLowerCase()) ||
//         spec.toLowerCase().includes(course.type.toLowerCase())
//     )
//   );

//   const getStripePriceId = (): string => {
//     // Map course to Stripe price ID
//     const priceMap: Record<string, string> = {
//       basic: "price_basic_monthly",
//       standard: "price_standard_monthly",
//       premium: "price_premium_monthly",
//       hifz: "price_hifz_monthly",
//     };

//     const courseType = course.title.toLowerCase().includes("hifz")
//       ? "hifz"
//       : course.price <= 49
//         ? "basic"
//         : course.price <= 89
//           ? "standard"
//           : "premium";

//     return priceMap[courseType] || "price_basic_monthly";
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="bg-card rounded-xl border shadow-sm p-6 text-center">
//         <h3 className="text-lg font-heading font-bold mb-4">
//           Enroll in Course
//         </h3>
//         <p className="text-muted-foreground mb-6">
//           Please sign in to enroll in this course
//         </p>
//         <Button asChild>
//           <Link href={`/auth/signin?callbackUrl=/courses/${course.id}`}>
//             Sign In to Enroll
//           </Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-card rounded-xl border shadow-sm p-6">
//       <h3 className="text-lg font-heading font-bold mb-6">
//         Enroll in {course.title}
//       </h3>

//       {/* Progress Steps */}
//       <div className="flex items-center justify-between mb-8">
//         {[1, 2, 3].map((stepNumber) => (
//           <div key={stepNumber} className="flex items-center">
//             <div
//               className={cn(
//                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
//                 step >= stepNumber
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-muted text-muted-foreground"
//               )}
//             >
//               {step > stepNumber ? (
//                 <CheckCircle className="w-4 h-4" />
//               ) : (
//                 stepNumber
//               )}
//             </div>
//             {stepNumber < 3 && (
//               <div
//                 className={cn(
//                   "w-12 h-1 mx-2",
//                   step > stepNumber ? "bg-primary" : "bg-muted"
//                 )}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Step 1: Teacher Selection */}
//       {step === 1 && (
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="space-y-6"
//         >
//           <div>
//             <h4 className="font-semibold text-card-foreground mb-4">
//               Select Your Teacher
//             </h4>
//             <div className="space-y-3">
//               {availableTeachers.map((teacher) => (
//                 <div
//                   key={teacher.id}
//                   className={cn(
//                     "p-4 border rounded-lg cursor-pointer transition-all duration-200",
//                     selectedTeacher === teacher.id
//                       ? "border-primary bg-primary/5"
//                       : "hover:border-primary/50"
//                   )}
//                   onClick={() => setSelectedTeacher(teacher.id)}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
//                       <User className="w-5 h-5 text-primary" />
//                     </div>
//                     <div className="flex-1">
//                       <h5 className="font-semibold text-card-foreground">
//                         {teacher.name}
//                       </h5>
//                       <p className="text-sm text-muted-foreground">
//                         {teacher.qualification}
//                       </p>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
//                           {teacher.experience}
//                         </span>
//                         <span className="text-xs text-muted-foreground">
//                           Specializes in: {teacher.specialization.join(", ")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Button
//             onClick={() => setStep(2)}
//             disabled={!selectedTeacher}
//             className="w-full"
//           >
//             Continue to Schedule
//           </Button>
//         </motion.div>
//       )}

//       {/* Step 2: Schedule Selection */}
//       {step === 2 && (
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="space-y-6"
//         >
//           <div className="grid gap-4">
//             <div>
//               <label className="block text-sm font-medium text-card-foreground mb-2">
//                 Preferred Start Date
//               </label>
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 min={new Date().toISOString().split("T")[0]}
//                 className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-card-foreground mb-2">
//                 Preferred Time
//               </label>
//               <select
//                 value={preferredTime}
//                 onChange={(e) => setPreferredTime(e.target.value)}
//                 className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
//               >
//                 <option value="">Select preferred time</option>
//                 <option value="morning">Morning (8AM - 12PM)</option>
//                 <option value="afternoon">Afternoon (12PM - 5PM)</option>
//                 <option value="evening">Evening (5PM - 9PM)</option>
//               </select>
//             </div>
//           </div>

//           <div className="bg-muted/50 rounded-lg p-4">
//             <h5 className="font-semibold text-card-foreground mb-2">
//               Course Summary
//             </h5>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Course:</span>
//                 <span className="font-medium">{course.title}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Duration:</span>
//                 <span className="font-medium">
//                   {course.duration} minutes per session
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Type:</span>
//                 <span className="font-medium">
//                   {course.type === "ONE_ON_ONE" ? "One-on-One" : "Group"}
//                 </span>
//               </div>
//               <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
//                 <span>Monthly Fee:</span>
//                 <span>${course.price}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <Button
//               variant="outline"
//               onClick={() => setStep(1)}
//               className="flex-1"
//             >
//               Back
//             </Button>
//             <Button
//               onClick={() => setStep(3)}
//               disabled={!startDate}
//               className="flex-1"
//             >
//               Continue to Payment
//             </Button>
//           </div>
//         </motion.div>
//       )}

//       {/* Step 3: Payment */}
//       {step === 3 && (
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="space-y-6"
//         >
//           <div className="text-center">
//             <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
//             <h4 className="text-xl font-heading font-bold mb-2">
//               Complete Your Enrollment
//             </h4>
//             <p className="text-muted-foreground">
//               Secure payment processed by Stripe
//             </p>
//           </div>

//           <div className="bg-muted/50 rounded-lg p-4">
//             <h5 className="font-semibold text-card-foreground mb-3">
//               Order Summary
//             </h5>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Course:</span>
//                 <span className="font-medium">{course.title}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Teacher:</span>
//                 <span className="font-medium">
//                   {teachers.find((t) => t.id === selectedTeacher)?.name}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-foreground">Start Date:</span>
//                 <span className="font-medium">
//                   {new Date(startDate).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
//                 <span>Total:</span>
//                 <span>${course.price}/month</span>
//               </div>
//             </div>
//           </div>

//           <StripeCheckoutButton
//             priceId={getStripePriceId()}
//             courseId={course.id}
//             className="w-full"
//           >
//             Pay ${course.price} / month
//           </StripeCheckoutButton>

//           <div className="flex space-x-4">
//             <Button
//               variant="outline"
//               onClick={() => setStep(2)}
//               className="flex-1"
//             >
//               Back
//             </Button>
//           </div>

//           <div className="text-center text-xs text-muted-foreground">
//             Your payment is secure and encrypted. You can cancel anytime.
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// // // src/components/courses/enrollment-form.tsx
// // "use client";

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Calendar, Clock, User, CreditCard, CheckCircle } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useAuth } from "@/hooks/use-auth";
// // import { useCreateEnrollment } from "@/hooks/use-enrollments";
// // import { useTeachers } from "@/hooks/use-courses";
// // import { cn } from "@/lib/utils";
// // import { StripeCheckoutButton } from "../payment/stripe-checkout-button";

// // interface EnrollmentFormProps {
// //   course: {
// //     id: string;
// //     title: string;
// //     description: string;
// //     price: number;
// //     duration: number;
// //     type: string;
// //   };
// //   onSuccess?: () => void;
// // }

// // export function EnrollmentForm({ course, onSuccess }: EnrollmentFormProps) {
// //   const { user, isAuthenticated } = useAuth();
// //   const { teachers, isLoading: teachersLoading } = useTeachers();
// //   const { createEnrollment, isCreating, error } = useCreateEnrollment();

// //   const [selectedTeacher, setSelectedTeacher] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [preferredTime, setPreferredTime] = useState("");
// //   const [step, setStep] = useState(1);

// //   const availableTeachers = teachers.filter((teacher) =>
// //     teacher.specialization.some(
// //       (spec) =>
// //         course.title.toLowerCase().includes(spec.toLowerCase()) ||
// //         spec.toLowerCase().includes(course.type.toLowerCase())
// //     )
// //   );

// //   const handleEnroll = async () => {
// //     if (!isAuthenticated || !user?.studentId) {
// //       alert("Please sign in to enroll in a course");
// //       return;
// //     }

// //     if (!selectedTeacher || !startDate) {
// //       alert("Please select a teacher and start date");
// //       return;
// //     }

// //     try {
// //       await createEnrollment({
// //         studentId: user.studentId,
// //         courseId: course.id,
// //         teacherId: selectedTeacher,
// //         startDate: new Date(startDate).toISOString(),
// //       });

// //       setStep(3); // Success step
// //       onSuccess?.();
// //     } catch (err) {
// //       console.error("Enrollment error:", err);
// //     }
// //   };

// //   if (!isAuthenticated) {
// //     return (
// //       <div className="bg-card rounded-xl border shadow-sm p-6 text-center">
// //         <h3 className="text-lg font-heading font-bold mb-4">
// //           Enroll in Course
// //         </h3>
// //         <p className="text-muted-foreground mb-6">
// //           Please sign in to enroll in this course
// //         </p>
// //         <Button asChild>
// //           <a href="/auth/signin">Sign In to Enroll</a>
// //         </Button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-card rounded-xl border shadow-sm p-6">
// //       <h3 className="text-lg font-heading font-bold mb-6">
// //         Enroll in {course.title}
// //       </h3>
// //       {/* Progress Steps */}
// //       <div className="flex items-center justify-between mb-8">
// //         {[1, 2, 3].map((stepNumber) => (
// //           <div key={stepNumber} className="flex items-center">
// //             <div
// //               className={cn(
// //                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
// //                 step >= stepNumber
// //                   ? "bg-primary text-primary-foreground"
// //                   : "bg-muted text-muted-foreground"
// //               )}
// //             >
// //               {step > stepNumber ? (
// //                 <CheckCircle className="w-4 h-4" />
// //               ) : (
// //                 stepNumber
// //               )}
// //             </div>
// //             {stepNumber < 3 && (
// //               <div
// //                 className={cn(
// //                   "w-12 h-1 mx-2",
// //                   step > stepNumber ? "bg-primary" : "bg-muted"
// //                 )}
// //               />
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //       {/* Step 1: Teacher Selection */}
// //       {step === 1 && (
// //         <motion.div
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           className="space-y-6"
// //         >
// //           <div>
// //             <h4 className="font-semibold text-card-foreground mb-4">
// //               Select Your Teacher
// //             </h4>
// //             <div className="space-y-3">
// //               {availableTeachers.map((teacher) => (
// //                 <div
// //                   key={teacher.id}
// //                   className={cn(
// //                     "p-4 border rounded-lg cursor-pointer transition-all duration-200",
// //                     selectedTeacher === teacher.id
// //                       ? "border-primary bg-primary/5"
// //                       : "hover:border-primary/50"
// //                   )}
// //                   onClick={() => setSelectedTeacher(teacher.id)}
// //                 >
// //                   <div className="flex items-center space-x-3">
// //                     <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
// //                       <User className="w-5 h-5 text-primary" />
// //                     </div>
// //                     <div className="flex-1">
// //                       <h5 className="font-semibold text-card-foreground">
// //                         {teacher.name}
// //                       </h5>
// //                       <p className="text-sm text-muted-foreground">
// //                         {teacher.qualification}
// //                       </p>
// //                       <div className="flex items-center space-x-2 mt-1">
// //                         <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
// //                           {teacher.experience}
// //                         </span>
// //                         <span className="text-xs text-muted-foreground">
// //                           Specializes in: {teacher.specialization.join(", ")}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <Button
// //             onClick={() => setStep(2)}
// //             disabled={!selectedTeacher}
// //             className="w-full"
// //           >
// //             Continue to Schedule
// //           </Button>
// //         </motion.div>
// //       )}
// //       {/* Step 2: Schedule Selection */}
// //       {step === 2 && (
// //         <motion.div
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           className="space-y-6"
// //         >
// //           <div className="grid gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-card-foreground mb-2">
// //                 Preferred Start Date
// //               </label>
// //               <input
// //                 type="date"
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //                 min={new Date().toISOString().split("T")[0]}
// //                 className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-card-foreground mb-2">
// //                 Preferred Time
// //               </label>
// //               <select
// //                 value={preferredTime}
// //                 onChange={(e) => setPreferredTime(e.target.value)}
// //                 className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
// //               >
// //                 <option value="">Select preferred time</option>
// //                 <option value="morning">Morning (8AM - 12PM)</option>
// //                 <option value="afternoon">Afternoon (12PM - 5PM)</option>
// //                 <option value="evening">Evening (5PM - 9PM)</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="bg-muted/50 rounded-lg p-4">
// //             <h5 className="font-semibold text-card-foreground mb-2">
// //               Course Summary
// //             </h5>
// //             <div className="space-y-2 text-sm">
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Course:</span>
// //                 <span className="font-medium">{course.title}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Duration:</span>
// //                 <span className="font-medium">
// //                   {course.duration} minutes per session
// //                 </span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Type:</span>
// //                 <span className="font-medium">
// //                   {course.type === "ONE_ON_ONE" ? "One-on-One" : "Group"}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
// //                 <span>Monthly Fee:</span>
// //                 <span>${course.price}</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex space-x-4">
// //             <Button
// //               variant="outline"
// //               onClick={() => setStep(1)}
// //               className="flex-1"
// //             >
// //               Back
// //             </Button>
// //             <Button
// //               onClick={handleEnroll}
// //               disabled={!startDate || isCreating}
// //               className="flex-1"
// //             >
// //               {isCreating ? "Enrolling..." : "Enroll Now"}
// //             </Button>
// //           </div>

// //           {error && (
// //             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
// //               Failed to enroll: {error.message}
// //             </div>
// //           )}
// //         </motion.div>
// //       )}

// //       {/* Step 3: Payment */}
// //       {step === 3 && (
// //         <motion.div
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           className="space-y-6"
// //         >
// //           <div className="text-center">
// //             <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
// //             <h4 className="text-xl font-heading font-bold mb-2">
// //               Complete Your Enrollment
// //             </h4>
// //             <p className="text-muted-foreground">
// //               Secure payment processed by Stripe
// //             </p>
// //           </div>

// //           <div className="bg-muted/50 rounded-lg p-4">
// //             <h5 className="font-semibold text-card-foreground mb-3">
// //               Order Summary
// //             </h5>
// //             <div className="space-y-2 text-sm">
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Course:</span>
// //                 <span className="font-medium">{course.title}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Teacher:</span>
// //                 <span className="font-medium">
// //                   {
// //                     availableTeachers.find((t) => t.id === selectedTeacher)
// //                       ?.name
// //                   }
// //                 </span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-muted-foreground">Start Date:</span>
// //                 <span className="font-medium">
// //                   {new Date(startDate).toLocaleDateString()}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
// //                 <span>Total:</span>
// //                 <span>${course.price}/month</span>
// //               </div>
// //             </div>
// //           </div>

// //           <StripeCheckoutButton
// //             priceId={getStripePriceIdForCourse(course)}
// //             courseId={course.id}
// //             className="w-full"
// //           >
// //             Pay ${course.price} / month
// //           </StripeCheckoutButton>

// //           <div className="flex space-x-4">
// //             <Button
// //               variant="outline"
// //               onClick={() => setStep(2)}
// //               className="flex-1"
// //             >
// //               Back
// //             </Button>
// //           </div>

// //           <div className="text-center text-xs text-muted-foreground">
// //             Your payment is secure and encrypted. You can cancel anytime.
// //           </div>
// //         </motion.div>
// //       )}
// //       {/* Step 4: Success */}
// //       {step === 3 && (
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.8 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           className="text-center py-8"
// //         >
// //           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <CheckCircle className="w-8 h-8 text-green-600" />
// //           </div>
// //           <h4 className="text-xl font-heading font-bold mb-2">
// //             Enrollment Successful!
// //           </h4>
// //           <p className="text-muted-foreground mb-6">
// //             You have successfully enrolled in {course.title}. Your teacher will
// //             contact you soon to schedule your first class.
// //           </p>
// //           <div className="flex space-x-4">
// //             <Button variant="outline" asChild className="flex-1">
// //               <a href="/dashboard">Go to Dashboard</a>
// //             </Button>
// //             <Button asChild className="flex-1">
// //               <a href="/dashboard/schedule">View Schedule</a>
// //             </Button>
// //           </div>
// //         </motion.div>
// //       )}
// //     </div>
// //   );
// // }
