// src/app/(dashboard)/admin/pricing/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  DollarSign,
  Clock,
  Calendar,
  Users,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data - In real app, this would come from API
const mockPlans = [
  {
    id: "1",
    name: "One-on-One Quran Hifz",
    description: "Personalized Quran memorization sessions",
    type: "ONE_ON_ONE",
    category: "QURAN",
    level: "All Levels",
    minDuration: 30,
    maxDuration: 90,
    durationStep: 5,
    daysPerWeek: [1, 2, 3, 5, 7],
    sessionsPerWeek: [1, 2, 3, 4, 5],
    basePrice: 49.0,
    pricePerMinute: 1.25,
    currency: "USD",
    monthlyDiscount: 5,
    quarterlyDiscount: 10,
    yearlyDiscount: 15,
    features: ["Personalized lessons", "Weekly reports", "Recording review"],
    isActive: true,
    isPublic: true,
    orderIndex: 1,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Group Tajweed Class",
    description: "Learn tajweed in small groups",
    type: "GROUP",
    category: "TAJWEED",
    level: "Beginner",
    minDuration: 45,
    maxDuration: 90,
    durationStep: 15,
    daysPerWeek: [1, 2],
    sessionsPerWeek: [1, 2],
    basePrice: 29.0,
    pricePerSession: 19.0,
    currency: "USD",
    monthlyDiscount: 10,
    quarterlyDiscount: 15,
    yearlyDiscount: 20,
    features: ["Small groups", "Interactive", "Exercises"],
    isActive: true,
    isPublic: true,
    orderIndex: 2,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
];

const planTypes = [
  { value: "ONE_ON_ONE", label: "One-on-One" },
  { value: "GROUP", label: "Group Class" },
  { value: "CLASS", label: "Regular Class" },
  { value: "CUSTOM", label: "Custom" },
];

const planCategories = [
  { value: "QURAN", label: "Quran" },
  { value: "TAJWEED", label: "Tajweed" },
  { value: "ARABIC", label: "Arabic" },
  { value: "FIQH", label: "Fiqh" },
  { value: "AQEEDAH", label: "Aqeedah" },
  { value: "SEERAH", label: "Seerah" },
  { value: "HADITH", label: "Hadith" },
  { value: "GENERAL", label: "General" },
];

const levels = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "ALL_LEVELS", label: "All Levels" },
];

const daysOptions = [
  { value: 1, label: "1 day/week" },
  { value: 2, label: "2 days/week" },
  { value: 3, label: "3 days/week" },
  { value: 4, label: "4 days/week" },
  { value: 5, label: "5 days/week" },
  { value: 6, label: "6 days/week" },
  { value: 7, label: "7 days/week" },
];

const durationOptions = [
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "1 hour" },
  { value: 75, label: "1 hour 15min" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
];

export default function AdminPricingPage() {
  const [plans, setPlans] = useState(mockPlans);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    type: "ONE_ON_ONE",
    category: "QURAN",
    level: "ALL_LEVELS",
    minDuration: 30,
    maxDuration: 90,
    durationStep: 5,
    daysPerWeek: [1, 2, 3, 5],
    sessionsPerWeek: [1, 2, 3, 4, 5],
    basePrice: 0,
    pricePerMinute: 0,
    pricePerSession: 0,
    currency: "USD",
    monthlyDiscount: 0,
    quarterlyDiscount: 0,
    yearlyDiscount: 0,
    features: [""],
    isActive: true,
    isPublic: true,
    orderIndex: 0,
  });

  // Pricing Tier Management
  const [pricingTiers, setPricingTiers] = useState<any[]>([
    {
      id: "1",
      minDuration: 30,
      daysPerWeek: 2,
      sessionsPerWeek: 2,
      pricePerSession: 29,
      pricePerMonth: 232,
      isRecommended: true,
    },
    {
      id: "2",
      minDuration: 45,
      daysPerWeek: 3,
      sessionsPerWeek: 3,
      pricePerSession: 40,
      pricePerMonth: 480,
      isRecommended: false,
    },
  ]);

  const handleEditPlan = (plan: any) => {
    setEditingPlan(JSON.parse(JSON.stringify(plan)));
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? editingPlan : p)));
      setEditingPlan(null);
      toast({
        title: "Plan Updated",
        description: "Pricing plan has been updated successfully.",
      });
    }
  };

  const handleCreatePlan = () => {
    const newPlanWithId = {
      ...newPlan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPlans([...plans, newPlanWithId]);
    setIsCreating(false);
    setNewPlan({
      name: "",
      description: "",
      type: "ONE_ON_ONE",
      category: "QURAN",
      level: "ALL_LEVELS",
      minDuration: 30,
      maxDuration: 90,
      durationStep: 5,
      daysPerWeek: [1, 2, 3, 5],
      sessionsPerWeek: [1, 2, 3, 4, 5],
      basePrice: 0,
      pricePerMinute: 0,
      pricePerSession: 0,
      currency: "USD",
      monthlyDiscount: 0,
      quarterlyDiscount: 0,
      yearlyDiscount: 0,
      features: [""],
      isActive: true,
      isPublic: true,
      orderIndex: 0,
    });
    toast({
      title: "Plan Created",
      description: "New pricing plan has been created successfully.",
    });
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
    toast({
      title: "Plan Deleted",
      description: "Pricing plan has been deleted.",
    });
  };

  const handleAddTier = () => {
    const newTier = {
      id: Date.now().toString(),
      minDuration: 30,
      daysPerWeek: 2,
      sessionsPerWeek: 2,
      pricePerSession: 0,
      pricePerMonth: 0,
      isRecommended: false,
    };
    setPricingTiers([...pricingTiers, newTier]);
  };

  const handleUpdateTier = (id: string, field: string, value: any) => {
    setPricingTiers(
      pricingTiers.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const handleRemoveTier = (id: string) => {
    setPricingTiers(pricingTiers.filter((tier) => tier.id !== id));
  };

  const calculateMonthlyPrice = (tier: any) => {
    const sessionsPerMonth = tier.sessionsPerWeek * 4;
    return tier.pricePerSession * sessionsPerMonth;
  };

  const getPlanTypeIcon = (type: string) => {
    switch (type) {
      case "ONE_ON_ONE":
        return <Users className="h-4 w-4" />;
      case "GROUP":
        return <Users className="h-4 w-4" />;
      case "CLASS":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getPlanTypeColor = (type: string) => {
    switch (type) {
      case "ONE_ON_ONE":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "GROUP":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "CLASS":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Pricing Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure and manage pricing plans for your madrasah
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      {/* Create Plan Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Pricing Plan</CardTitle>
              <CardDescription>
                Configure all aspects of the new pricing plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name *</Label>
                    <Input
                      id="name"
                      value={newPlan.name}
                      onChange={(e) =>
                        setNewPlan({ ...newPlan, name: e.target.value })
                      }
                      placeholder="e.g., One-on-One Quran Hifz"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newPlan.category}
                      onValueChange={(value) =>
                        setNewPlan({ ...newPlan, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {planCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPlan.description}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, description: e.target.value })
                    }
                    placeholder="Describe this pricing plan..."
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="type">Plan Type *</Label>
                    <Select
                      value={newPlan.type}
                      onValueChange={(value) =>
                        setNewPlan({ ...newPlan, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {planTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={newPlan.level}
                      onValueChange={(value) =>
                        setNewPlan({ ...newPlan, level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency *</Label>
                    <Select
                      value={newPlan.currency}
                      onValueChange={(value) =>
                        setNewPlan({ ...newPlan, currency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="SAR">SAR (ر.س)</SelectItem>
                        <SelectItem value="AED">AED (د.إ)</SelectItem>
                        <SelectItem value="PKR">PKR (₨)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Session Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Session Configuration</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="minDuration">
                      Minimum Duration (minutes) *
                    </Label>
                    <Input
                      id="minDuration"
                      type="number"
                      value={newPlan.minDuration}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          minDuration: parseInt(e.target.value),
                        })
                      }
                      min="30"
                      step="5"
                    />
                    <p className="text-xs text-gray-500">Minimum 30 minutes</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxDuration">
                      Maximum Duration (optional)
                    </Label>
                    <Input
                      id="maxDuration"
                      type="number"
                      value={newPlan.maxDuration}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          maxDuration: parseInt(e.target.value),
                        })
                      }
                      min={newPlan.minDuration}
                      step="5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="durationStep">
                      Duration Step (minutes)
                    </Label>
                    <Input
                      id="durationStep"
                      type="number"
                      value={newPlan.durationStep}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          durationStep: parseInt(e.target.value),
                        })
                      }
                      min="5"
                      step="5"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Available Days Per Week</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={
                            newPlan.daysPerWeek.includes(day)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            const newDays = newPlan.daysPerWeek.includes(day)
                              ? newPlan.daysPerWeek.filter((d) => d !== day)
                              : [...newPlan.daysPerWeek, day];
                            setNewPlan({
                              ...newPlan,
                              daysPerWeek: newDays.sort(),
                            });
                          }}
                          className={
                            newPlan.daysPerWeek.includes(day)
                              ? "bg-gradient-primary"
                              : ""
                          }
                        >
                          {day} day{day > 1 ? "s" : ""}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Available Sessions Per Week</Label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((session) => (
                        <Button
                          key={session}
                          type="button"
                          variant={
                            newPlan.sessionsPerWeek.includes(session)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            const newSessions =
                              newPlan.sessionsPerWeek.includes(session)
                                ? newPlan.sessionsPerWeek.filter(
                                    (s) => s !== session
                                  )
                                : [...newPlan.sessionsPerWeek, session];
                            setNewPlan({
                              ...newPlan,
                              sessionsPerWeek: newSessions.sort(),
                            });
                          }}
                          className={
                            newPlan.sessionsPerWeek.includes(session)
                              ? "bg-gradient-primary"
                              : ""
                          }
                        >
                          {session} session{session > 1 ? "s" : ""}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing Configuration</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">
                      Base Price ({newPlan.currency})
                    </Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={newPlan.basePrice}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          basePrice: parseFloat(e.target.value),
                        })
                      }
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerMinute">
                      Price per Minute (optional)
                    </Label>
                    <Input
                      id="pricePerMinute"
                      type="number"
                      value={newPlan.pricePerMinute}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          pricePerMinute: parseFloat(e.target.value),
                        })
                      }
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyDiscount">
                      Monthly Discount (%)
                    </Label>
                    <Input
                      id="monthlyDiscount"
                      type="number"
                      value={newPlan.monthlyDiscount}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          monthlyDiscount: parseFloat(e.target.value),
                        })
                      }
                      step="1"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quarterlyDiscount">
                      Quarterly Discount (%)
                    </Label>
                    <Input
                      id="quarterlyDiscount"
                      type="number"
                      value={newPlan.quarterlyDiscount}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          quarterlyDiscount: parseFloat(e.target.value),
                        })
                      }
                      step="1"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearlyDiscount">Yearly Discount (%)</Label>
                    <Input
                      id="yearlyDiscount"
                      type="number"
                      value={newPlan.yearlyDiscount}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          yearlyDiscount: parseFloat(e.target.value),
                        })
                      }
                      step="1"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Features</h3>
                <div className="space-y-2">
                  {newPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...newPlan.features];
                          newFeatures[index] = e.target.value;
                          setNewPlan({ ...newPlan, features: newFeatures });
                        }}
                        placeholder="e.g., Personalized lesson plan"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newFeatures = newPlan.features.filter(
                            (_, i) => i !== index
                          );
                          setNewPlan({ ...newPlan, features: newFeatures });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setNewPlan({
                        ...newPlan,
                        features: [...newPlan.features, ""],
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleCreatePlan}
                className="bg-gradient-primary"
              >
                <Save className="mr-2 h-4 w-4" />
                Create Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge className={getPlanTypeColor(plan.type)}>
                      <span className="flex items-center gap-1">
                        {getPlanTypeIcon(plan.type)}
                        {planTypes.find((t) => t.value === plan.type)?.label}
                      </span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700"
                    >
                      {
                        planCategories.find((c) => c.value === plan.category)
                          ?.label
                      }
                    </Badge>
                    {plan.isPublic ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <Eye className="mr-1 h-3 w-3" />
                        Public
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <EyeOff className="mr-1 h-3 w-3" />
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Plan Configuration */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Session Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Duration Range
                      </span>
                      <span className="font-medium">
                        {plan.minDuration} - {plan.maxDuration || "∞"} minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Days Per Week
                      </span>
                      <span className="font-medium">
                        {plan.daysPerWeek.join(", ")} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Sessions Per Week
                      </span>
                      <span className="font-medium">
                        {plan.sessionsPerWeek.join(", ")} sessions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Pricing</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Base Price
                      </span>
                      <span className="font-medium">
                        {plan.currency} {plan.basePrice.toFixed(2)}
                      </span>
                    </div>
                    {plan.pricePerMinute && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Price per Minute
                        </span>
                        <span className="font-medium">
                          {plan.currency} {plan.pricePerMinute.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly Discount
                      </span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {plan.monthlyDiscount}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="space-y-4">
                <h4 className="font-semibold">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      {feature}
                    </Badge>
                  ))}
                  {plan.features.length > 3 && (
                    <Badge
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700"
                    >
                      +{plan.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={plan.isActive}
                    onCheckedChange={() => {
                      /* Handle toggle */
                    }}
                  />
                  <span className="text-sm font-medium">
                    {plan.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pricing Tiers Section */}
      <div className="mt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Pricing Tiers</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pre-configured pricing tiers for quick selection
            </p>
          </div>
          <Button onClick={handleAddTier} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Tier
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={
                tier.isRecommended
                  ? "border-purple-300 dark:border-purple-700"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {tier.minDuration}min × {tier.daysPerWeek} days
                  </CardTitle>
                  {tier.isRecommended && (
                    <Badge className="bg-gradient-primary">Recommended</Badge>
                  )}
                </div>
                <CardDescription>
                  {tier.sessionsPerWeek} sessions per week
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Per Session:
                    </span>
                    <span className="text-xl font-bold">
                      ${tier.pricePerSession}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly (est.):
                    </span>
                    <span className="text-xl font-bold">
                      ${calculateMonthlyPrice(tier)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`duration-${tier.id}`} className="text-xs">
                      Duration (min)
                    </Label>
                    <Input
                      id={`duration-${tier.id}`}
                      type="number"
                      value={tier.minDuration}
                      onChange={(e) =>
                        handleUpdateTier(
                          tier.id,
                          "minDuration",
                          parseInt(e.target.value)
                        )
                      }
                      className="h-8 text-sm"
                      min="30"
                      step="5"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`sessions-${tier.id}`} className="text-xs">
                      Sessions/Week
                    </Label>
                    <Input
                      id={`sessions-${tier.id}`}
                      type="number"
                      value={tier.sessionsPerWeek}
                      onChange={(e) =>
                        handleUpdateTier(
                          tier.id,
                          "sessionsPerWeek",
                          parseInt(e.target.value)
                        )
                      }
                      className="h-8 text-sm"
                      min="1"
                      max="7"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`price-${tier.id}`} className="text-xs">
                      Price/Session
                    </Label>
                    <Input
                      id={`price-${tier.id}`}
                      type="number"
                      value={tier.pricePerSession}
                      onChange={(e) =>
                        handleUpdateTier(
                          tier.id,
                          "pricePerSession",
                          parseFloat(e.target.value)
                        )
                      }
                      className="h-8 text-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={tier.isRecommended}
                    onCheckedChange={(checked) =>
                      handleUpdateTier(tier.id, "isRecommended", checked)
                    }
                  />
                  <span className="text-sm">Recommended</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveTier(tier.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
