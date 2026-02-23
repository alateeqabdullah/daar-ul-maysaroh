"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const trialSchema = z.object({
  parentName: z.string().min(1, "Parent name is required"),
  parentEmail: z.string().email("Valid email is required"),
  parentPhone: z.string().min(10, "Phone number is required"),
  childName: z.string().min(1, "Child's name is required"),
  childAge: z.string().min(1, "Child's age is required"),
  selectedTrialTime: z.string().min(1, "Please select a trial time"),
  website: z.string().optional(),
});

type TrialFormData = z.infer<typeof trialSchema>;

interface TrialFormProps {
  courseId: string;
  courseName: string;
  scheduleOptions: Array<{ id: string; label: string }>;
}

export function TrialForm({
  courseId,
  courseName,
  scheduleOptions,
}: TrialFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrialFormData>({
    resolver: zodResolver(trialSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childAge: "",
      selectedTrialTime: "",
      website: "",
    },
  });

  const onSubmit = async (data: TrialFormData) => {
    // Honeypot check
    if (data.website && data.website.trim() !== "") {
      toast.error("Invalid submission detected");
      return;
    }

    setIsLoading(true);

    try {
      // Submit to API
      const response = await fetch("/api/trial-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          courseId,
          courseName,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setIsSubmitted(true);
      toast.success("Trial scheduled!", {
        description: "Check your email for confirmation details.",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or call us directly.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="font-black text-2xl uppercase tracking-tight">
          Trial Scheduled!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We've sent a confirmation to your email with the meeting link and
          preparation instructions.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="rounded-full px-8 py-3 font-black"
        >
          RETURN HOME
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <Input
          {...register("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="parentName"
          className="text-xs font-black uppercase tracking-widest text-accent"
        >
          YOUR NAME *
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-accent" />
          <Input
            {...register("parentName")}
            id="parentName"
            className="pl-9"
            placeholder="Enter your full name"
          />
        </div>
        {errors.parentName && (
          <p className="text-xs text-red-500">{errors.parentName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="parentEmail"
          className="text-xs font-black uppercase tracking-widest text-accent"
        >
          EMAIL ADDRESS *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-accent" />
          <Input
            {...register("parentEmail")}
            id="parentEmail"
            type="email"
            className="pl-9"
            placeholder="parent@example.com"
          />
        </div>
        {errors.parentEmail && (
          <p className="text-xs text-red-500">{errors.parentEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="parentPhone"
          className="text-xs font-black uppercase tracking-widest text-accent"
        >
          PHONE NUMBER *
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-accent" />
          <Input
            {...register("parentPhone")}
            id="parentPhone"
            type="tel"
            className="pl-9"
            placeholder="(555) 123-4567"
          />
        </div>
        {errors.parentPhone && (
          <p className="text-xs text-red-500">{errors.parentPhone.message}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="childName"
            className="text-xs font-black uppercase tracking-widest text-accent"
          >
            CHILD'S NAME *
          </Label>
          <Input
            {...register("childName")}
            id="childName"
            placeholder="Child's name"
          />
          {errors.childName && (
            <p className="text-xs text-red-500">{errors.childName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="childAge"
            className="text-xs font-black uppercase tracking-widest text-accent"
          >
            CHILD'S AGE *
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-accent" />
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
            <p className="text-xs text-red-500">{errors.childAge.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-black uppercase tracking-widest text-accent">
          SELECT TRIAL TIME *
        </Label>
        <RadioGroup
          onValueChange={(value) => setValue("selectedTrialTime", value)}
          className="space-y-2"
        >
          {scheduleOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-accent/20 hover:border-accent/40 transition-all"
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="font-medium text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.selectedTrialTime && (
          <p className="text-xs text-red-500">
            {errors.selectedTrialTime.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full rounded-full py-4 font-black bg-accent hover:bg-accent/90 text-white",
          isLoading && "opacity-70 cursor-not-allowed",
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            SCHEDULING...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            SCHEDULE FREE TRIAL
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        No credit card required. We'll send you the Zoom link via email.
      </p>
    </form>
  );
}
