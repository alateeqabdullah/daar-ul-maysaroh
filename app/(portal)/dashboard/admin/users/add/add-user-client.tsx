// app/(portal)/dashboard/admin/users/add/add-user-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  UserPlus,
  Mail,
  Phone,
  Lock,
  Shield,
  GraduationCap,
  BookOpen,
  Heart,
  Crown,
  Globe,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UserRole } from "@/app/generated/prisma/enums";
import { createUser, isEmailExists } from "../../actions/users";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

const ROLE_OPTIONS = [
  {
    value: "STUDENT",
    label: "Student",
    icon: GraduationCap,
    description: "Can access courses and track progress",
  },
  {
    value: "TEACHER",
    label: "Teacher",
    icon: BookOpen,
    description: "Can create classes and grade assignments",
  },
  {
    value: "PARENT",
    label: "Parent",
    icon: Heart,
    description: "Can monitor children's progress",
  },
  {
    value: "ADMIN",
    label: "Admin",
    icon: Shield,
    description: "Full access to admin panel",
  },
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
    icon: Crown,
    description: "Complete system control",
  },
  {
    value: "CONTENT_MANAGER",
    label: "Content Manager",
    icon: Globe,
    description: "Manage content and resources",
  },
  {
    value: "SUPPORT",
    label: "Support",
    icon: Users,
    description: "Handle user inquiries",
  },
];

const getRoleIcon = (role: string) => {
  const option = ROLE_OPTIONS.find((r) => r.value === role);
  return option?.icon || Users;
};

export function AddUserClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (value.length > 100) return "Name must be less than 100 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "phone":
        if (
          value &&
          !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/.test(
            value,
          )
        ) {
          return "Invalid phone number";
        }
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain uppercase, lowercase, and number";
        }
        return "";
      case "confirmPassword":
        if (value !== formData.password) return "Passwords do not match";
        return "";
      case "role":
        if (!value) return "Role is required";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
  };

  const validateForm = (): boolean => {
    const fields = ["name", "email", "password", "confirmPassword", "role"];
    let isValid = true;
    const newErrors: FormErrors = {};

    for (const field of fields) {
      const value = formData[field as keyof FormData] as string;
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    }

    // Phone is optional
    const phoneError = validateField("phone", formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      return await isEmailExists(email);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      setActiveTab("details");
      return;
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      toast.error("Email already registered");
      return;
    }

    setIsLoading(true);
    try {
      await createUser({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        phone: formData.phone || undefined,
        role: formData.role,
      });

      toast.success("User created successfully!");
      router.push("/dashboard/admin/users");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.role
    );
  };

  const RoleIcon = getRoleIcon(formData.role);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/admin/users"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center shadow-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
              Add New User
            </h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Create a new user account with role-based permissions and profile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>
                    Enter the user's basic details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-black">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter full name"
                      className={cn(
                        "rounded-lg",
                        errors.name &&
                          touched.name &&
                          "border-red-500 focus:border-red-500",
                      )}
                    />
                    {errors.name && touched.name && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-black">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="user@example.com"
                        className={cn(
                          "pl-10 rounded-lg",
                          errors.email &&
                            touched.email &&
                            "border-red-500 focus:border-red-500",
                        )}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-black">
                      Phone Number{" "}
                      <span className="text-amber-500">(Optional)</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+123 456 7890"
                        className={cn(
                          "pl-10 rounded-lg",
                          errors.phone &&
                            touched.phone &&
                            "border-red-500 focus:border-red-500",
                        )}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-black">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Create a strong password"
                        className={cn(
                          "pl-10 rounded-lg",
                          errors.password &&
                            touched.password &&
                            "border-red-500 focus:border-red-500",
                        )}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground">
                      Minimum 8 characters with uppercase, lowercase, and number
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-black"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm your password"
                        className={cn(
                          "pl-10 rounded-lg",
                          errors.confirmPassword &&
                            touched.confirmPassword &&
                            "border-red-500 focus:border-red-500",
                        )}
                      />
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-black">
                      User Role <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger
                        className={cn(
                          "rounded-lg",
                          errors.role && "border-red-500",
                        )}
                      >
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center gap-2">
                              <role.icon className="w-4 h-4" />
                              <span>{role.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.role}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/admin/users")}
                  className="rounded-full px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  className="rounded-full px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4 mr-2" />
                  )}
                  Create User
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar - Role Info & Preview */}
          <div className="space-y-6">
            {/* Selected Role Preview */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div
                className={`p-4 bg-gradient-to-r from-purple-600 to-amber-500`}
              >
                <div className="flex items-center gap-2 text-white">
                  <RoleIcon className="w-5 h-5" />
                  <span className="font-black">Role Preview</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/40 dark:to-amber-950/40 flex items-center justify-center mx-auto mb-3">
                    <RoleIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-black text-lg">
                    {ROLE_OPTIONS.find((r) => r.value === formData.role)?.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {
                      ROLE_OPTIONS.find((r) => r.value === formData.role)
                        ?.description
                    }
                  </p>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-black text-purple-600">
                      Permissions:
                    </span>
                    {formData.role === "SUPER_ADMIN" &&
                      " Full system access, user management, settings"}
                    {formData.role === "ADMIN" &&
                      " User management, content management, reports"}
                    {formData.role === "TEACHER" &&
                      " Create classes, grade assignments, track students"}
                    {formData.role === "STUDENT" &&
                      " Access courses, submit assignments, track progress"}
                    {formData.role === "PARENT" &&
                      " Monitor children, view reports"}
                    {formData.role === "CONTENT_MANAGER" &&
                      " Manage resources, create content"}
                    {formData.role === "SUPPORT" &&
                      " Handle user inquiries, tickets"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Card */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={cn(
                      "w-4 h-4",
                      formData.name
                        ? "text-green-500"
                        : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={
                      formData.name
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Full name provided
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={cn(
                      "w-4 h-4",
                      formData.email && !errors.email
                        ? "text-green-500"
                        : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={
                      formData.email && !errors.email
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Valid email address
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={cn(
                      "w-4 h-4",
                      formData.password && formData.password.length >= 8
                        ? "text-green-500"
                        : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={
                      formData.password && formData.password.length >= 8
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Strong password (8+ chars)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={cn(
                      "w-4 h-4",
                      formData.password &&
                        formData.confirmPassword &&
                        formData.password === formData.confirmPassword
                        ? "text-green-500"
                        : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={
                      formData.password &&
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Password confirmation matches
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={cn(
                      "w-4 h-4",
                      formData.role
                        ? "text-green-500"
                        : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={
                      formData.role
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    User role selected
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-amber-700 dark:text-amber-400">
                      Important
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      The user will receive a welcome email with login
                      instructions. They will need to verify their email address
                      upon first login.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
