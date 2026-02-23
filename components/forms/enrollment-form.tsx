"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const enrollmentSchema = z.object({
  // Parent Information
  parentFirstName: z.string().min(1, "First name is required"),
  parentLastName: z.string().min(1, "Last name is required"),
  parentEmail: z.string().email("Valid email is required"),
  parentPhone: z.string().min(10, "Phone number is required"),

  // Child Information
  childFirstName: z.string().min(1, "Child's first name is required"),
  childLastName: z.string().min(1, "Child's last name is required"),
  childAge: z.string().min(1, "Child's age is required"),
  childGender: z.enum(["boy", "girl", "prefer-not"], {
    required_error: "Please select",
  }),

  // Course Selection
  selectedPlan: z.string().min(1, "Please select a payment plan"),
  selectedSchedule: z.string().min(1, "Please select a schedule"),

  // Additional Info
  previousQuranStudy: z.string().optional(),
  specialNeeds: z.string().optional(),

  // Consent
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
  agreeContact: z.boolean().default(false),

  // Honeypot
  website: z.string().optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

interface EnrollmentFormProps {
  courseId: string;
  courseName: string;
  priceOptions: Array<{ id: string; name: string; price: number }>;
  scheduleOptions: Array<{ id: string; label: string }>;
}

export function EnrollmentForm({
  courseId,
  courseName,
  priceOptions,
  scheduleOptions,
}: EnrollmentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      parentFirstName: "",
      parentLastName: "",
      parentEmail: "",
      parentPhone: "",
      childFirstName: "",
      childLastName: "",
      childAge: "",
      childGender: undefined,
      selectedPlan: "",
      selectedSchedule: "",
      previousQuranStudy: "",
      specialNeeds: "",
      agreeTerms: false,
      agreeContact: false,
      website: "",
    },
    mode: "onChange",
  });

  const watchedFields = watch();

  // Step validation
  const validateStep = async (step: number) => {
    let fieldsToValidate: string[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "parentFirstName",
          "parentLastName",
          "parentEmail",
          "parentPhone",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "childFirstName",
          "childLastName",
          "childAge",
          "childGender",
        ];
        break;
      case 3:
        fieldsToValidate = ["selectedPlan", "selectedSchedule"];
        break;
      case 4:
        fieldsToValidate = ["agreeTerms"];
        break;
    }

    const output = await trigger(fieldsToValidate as any);
    return output;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: EnrollmentFormData) => {
    // Honeypot check
    if (data.website && data.website.trim() !== "") {
      toast.error("Invalid submission detected");
      return;
    }

    setIsLoading(true);

    try {
      // Submit to API
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          courseId,
          courseName,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast.success("Enrollment submitted!", {
        description:
          "We'll contact you within 24 hours to confirm your child's spot.",
      });

      // Redirect or show success
      setTimeout(() => {
        window.location.href = "/enrollment-success";
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Honeypot field - hidden from real users
  if (currentStep === 1) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot */}
        <div className="sr-only" aria-hidden="true">
          <Input
            {...register("website")}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-primary-700 uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-muted-foreground">
              Parent Information
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-700 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-black text-lg uppercase tracking-tight">
            Parent/Guardian Information
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="parentFirstName"
                className="text-xs font-black uppercase tracking-widest text-primary-700"
              >
                FIRST NAME *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-primary-700" />
                <Input
                  {...register("parentFirstName")}
                  id="parentFirstName"
                  className="pl-9"
                  placeholder="Enter first name"
                />
              </div>
              {errors.parentFirstName && (
                <p className="text-xs text-red-500">
                  {errors.parentFirstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="parentLastName"
                className="text-xs font-black uppercase tracking-widest text-primary-700"
              >
                LAST NAME *
              </Label>
              <Input
                {...register("parentLastName")}
                id="parentLastName"
                placeholder="Enter last name"
              />
              {errors.parentLastName && (
                <p className="text-xs text-red-500">
                  {errors.parentLastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="parentEmail"
              className="text-xs font-black uppercase tracking-widest text-primary-700"
            >
              EMAIL ADDRESS *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-primary-700" />
              <Input
                {...register("parentEmail")}
                id="parentEmail"
                type="email"
                className="pl-9"
                placeholder="parent@example.com"
              />
            </div>
            {errors.parentEmail && (
              <p className="text-xs text-red-500">
                {errors.parentEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="parentPhone"
              className="text-xs font-black uppercase tracking-widest text-primary-700"
            >
              PHONE NUMBER *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-primary-700" />
              <Input
                {...register("parentPhone")}
                id="parentPhone"
                type="tel"
                className="pl-9"
                placeholder="(555) 123-4567"
              />
            </div>
            {errors.parentPhone && (
              <p className="text-xs text-red-500">
                {errors.parentPhone.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-full px-8 py-3 font-black bg-primary-700 hover:bg-primary-800"
          >
            <span className="flex items-center gap-2">
              NEXT STEP
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </form>
    );
  }

  if (currentStep === 2) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-primary-700 uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-muted-foreground">
              Child Information
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-700 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-black text-lg uppercase tracking-tight">
            Child's Information
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="childFirstName"
                className="text-xs font-black uppercase tracking-widest text-primary-700"
              >
                CHILD'S FIRST NAME *
              </Label>
              <Input
                {...register("childFirstName")}
                id="childFirstName"
                placeholder="Enter child's first name"
              />
              {errors.childFirstName && (
                <p className="text-xs text-red-500">
                  {errors.childFirstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="childLastName"
                className="text-xs font-black uppercase tracking-widest text-primary-700"
              >
                CHILD'S LAST NAME *
              </Label>
              <Input
                {...register("childLastName")}
                id="childLastName"
                placeholder="Enter child's last name"
              />
              {errors.childLastName && (
                <p className="text-xs text-red-500">
                  {errors.childLastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="childAge"
                className="text-xs font-black uppercase tracking-widest text-primary-700"
              >
                CHILD'S AGE *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-primary-700" />
                <Input
                  {...register("childAge")}
                  id="childAge"
                  type="number"
                  min="7"
                  max="12"
                  className="pl-9"
                  placeholder="7-12"
                />
              </div>
              {errors.childAge && (
                <p className="text-xs text-red-500">
                  {errors.childAge.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-primary-700">
                GENDER *
              </Label>
              <RadioGroup
                onValueChange={(value) => setValue("childGender", value as any)}
                className="flex gap-4 pt-2"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="boy" id="boy" />
                  <Label htmlFor="boy">Boy</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="girl" id="girl" />
                  <Label htmlFor="girl">Girl</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="prefer-not" id="prefer-not" />
                  <Label htmlFor="prefer-not">Prefer not to say</Label>
                </div>
              </RadioGroup>
              {errors.childGender && (
                <p className="text-xs text-red-500">
                  {errors.childGender.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="previousQuranStudy"
              className="text-xs font-black uppercase tracking-widest text-primary-700"
            >
              PREVIOUS QURAN STUDY
            </Label>
            <Select
              onValueChange={(value) => setValue("previousQuranStudy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select if applicable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No previous study</SelectItem>
                <SelectItem value="basic">Basic Arabic letters</SelectItem>
                <SelectItem value="some">Some Quran reading</SelectItem>
                <SelectItem value="fluent">Can read Quran</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="specialNeeds"
              className="text-xs font-black uppercase tracking-widest text-primary-700"
            >
              SPECIAL NEEDS OR ACCOMMODATIONS
            </Label>
            <textarea
              {...register("specialNeeds")}
              id="specialNeeds"
              rows={3}
              className="w-full p-3 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
              placeholder="Any learning needs, allergies, or accommodations we should know about?"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="rounded-full px-6 py-3 font-black"
          >
            BACK
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-full px-8 py-3 font-black bg-primary-700 hover:bg-primary-800"
          >
            <span className="flex items-center gap-2">
              NEXT STEP
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </form>
    );
  }

  if (currentStep === 3) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-primary-700 uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs text-muted-foreground">
              Select Plan & Schedule
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-700 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-black text-lg uppercase tracking-tight">
              Select Payment Plan
            </h3>
            <RadioGroup
              onValueChange={(value) => setValue("selectedPlan", value)}
              className="space-y-3"
            >
              {priceOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-4 rounded-xl border-2 border-border hover:border-primary-700/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="font-black">
                      {option.name}
                    </Label>
                  </div>
                  <span className="font-black text-primary-700">
                    ${option.price}
                  </span>
                </div>
              ))}
            </RadioGroup>
            {errors.selectedPlan && (
              <p className="text-xs text-red-500">
                {errors.selectedPlan.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-lg uppercase tracking-tight">
              Select Schedule
            </h3>
            <RadioGroup
              onValueChange={(value) => setValue("selectedSchedule", value)}
              className="space-y-3"
            >
              {scheduleOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-primary-700/30 transition-all cursor-pointer"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="font-black">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.selectedSchedule && (
              <p className="text-xs text-red-500">
                {errors.selectedSchedule.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="rounded-full px-6 py-3 font-black"
          >
            BACK
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="rounded-full px-8 py-3 font-black bg-primary-700 hover:bg-primary-800"
          >
            <span className="flex items-center gap-2">
              NEXT STEP
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </form>
    );
  }

  // Step 4: Review & Submit
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-primary-700 uppercase tracking-wider">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-xs text-muted-foreground">Review & Submit</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-700 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 space-y-3">
          <h3 className="font-black text-sm uppercase tracking-tight">
            Parent Information
          </h3>
          <p className="text-sm">
            {watchedFields.parentFirstName} {watchedFields.parentLastName}
          </p>
          <p className="text-sm">{watchedFields.parentEmail}</p>
          <p className="text-sm">{watchedFields.parentPhone}</p>
        </div>

        <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 space-y-3">
          <h3 className="font-black text-sm uppercase tracking-tight">
            Child Information
          </h3>
          <p className="text-sm">
            {watchedFields.childFirstName} {watchedFields.childLastName}
          </p>
          <p className="text-sm">Age: {watchedFields.childAge}</p>
          <p className="text-sm">Gender: {watchedFields.childGender}</p>
        </div>

        <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 space-y-3">
          <h3 className="font-black text-sm uppercase tracking-tight">
            Selected Options
          </h3>
          <p className="text-sm">
            Plan:{" "}
            {
              priceOptions.find((p) => p.id === watchedFields.selectedPlan)
                ?.name
            }
          </p>
          <p className="text-sm">
            Schedule:{" "}
            {
              scheduleOptions.find(
                (s) => s.id === watchedFields.selectedSchedule,
              )?.label
            }
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="agreeTerms"
              {...register("agreeTerms")}
              className="mt-1"
            />
            <Label htmlFor="agreeTerms" className="text-sm">
              I agree to the terms and conditions, including the refund policy
              and privacy policy.
            </Label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500">{errors.agreeTerms.message}</p>
          )}

          <div className="flex items-start gap-3">
            <Checkbox
              id="agreeContact"
              {...register("agreeContact")}
              className="mt-1"
            />
            <Label htmlFor="agreeContact" className="text-sm">
              I agree to receive communications about my child's enrollment via
              email and SMS.
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 pt-4">
        <Button
          type="button"
          onClick={handleBack}
          variant="outline"
          className="rounded-full px-6 py-3 font-black"
        >
          BACK
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !isValid}
          className={cn(
            "rounded-full px-8 py-3 font-black min-w-[160px]",
            "bg-primary-700 hover:bg-primary-800",
            isLoading && "opacity-70 cursor-not-allowed",
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              SUBMITTING...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              SUBMIT ENROLLMENT
              <CheckCircle2 className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
