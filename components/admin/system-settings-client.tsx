"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Globe,
  Lock,
  Bell,
  GraduationCap,
  Wallet,
  AlertTriangle,
  Loader2,
  RefreshCcw,
  Mail,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface Props {
  initialSettings: any;
}

export default function SystemSettingsClient({ initialSettings }: Props) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Settings updated successfully");
      setHasChanges(false);
      router.refresh();
    } catch (error) {
      toast.error("Error saving settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-20"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure global platform preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-xl w-full justify-start overflow-x-auto border">
          <TabsTrigger value="general" className="rounded-lg gap-2">
            <Globe className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg gap-2">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="academic" className="rounded-lg gap-2">
            <GraduationCap className="h-4 w-4" /> Academic
          </TabsTrigger>
          <TabsTrigger value="financial" className="rounded-lg gap-2">
            <Wallet className="h-4 w-4" /> Financial
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* --- GENERAL TAB --- */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Details</CardTitle>
                  <CardDescription>
                    Basic information about your madrasah.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label>Site Name</Label>
                    <Input
                      value={settings.siteName}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Description</Label>
                    <Textarea
                      value={settings.siteDescription}
                      onChange={(e) =>
                        handleChange("siteDescription", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Localization</CardTitle>
                  <CardDescription>
                    How users contact support and time settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Contact Email</Label>
                      <Input
                        value={settings.contactEmail}
                        onChange={(e) =>
                          handleChange("contactEmail", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Contact Phone</Label>
                      <Input
                        value={settings.contactPhone}
                        onChange={(e) =>
                          handleChange("contactPhone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Timezone</Label>
                      <Select
                        value={settings.timezone}
                        onValueChange={(v) => handleChange("timezone", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="Asia/Riyadh">Riyadh</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="America/New_York">
                            New York
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label>Language</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(v) => handleChange("language", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="ur">Urdu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- SECURITY TAB --- */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                  <CardDescription>
                    Manage user access and registration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Registration</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow new users to sign up.
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableRegistration}
                      onCheckedChange={(v) =>
                        handleChange("enableRegistration", v)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-xs text-muted-foreground">
                        Disable access for non-admins.
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(v) =>
                        handleChange("maintenanceMode", v)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Email Verification</Label>
                      <p className="text-xs text-muted-foreground">
                        Users must verify email to login.
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(v) =>
                        handleChange("requireEmailVerification", v)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Session Security</CardTitle>
                  <CardDescription>Timeouts and login limits.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label>Session Timeout (Hours)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        handleChange("sessionTimeout", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Max Login Attempts</Label>
                    <Input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) =>
                        handleChange("maxLoginAttempts", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- NOTIFICATIONS TAB --- */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>
                  SMTP Settings for system emails.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>SMTP Host</Label>
                  <Input
                    value={settings.smtpHost}
                    onChange={(e) => handleChange("smtpHost", e.target.value)}
                    placeholder="smtp.example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label>SMTP Port</Label>
                  <Input
                    value={settings.smtpPort}
                    onChange={(e) => handleChange("smtpPort", e.target.value)}
                    placeholder="587"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <Label>From Email</Label>
                  <Input
                    value={settings.emailFrom}
                    onChange={(e) => handleChange("emailFrom", e.target.value)}
                    placeholder="no-reply@madrasah.com"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Alert Triggers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>New User Alerts</Label>
                  <Switch
                    checked={settings.newUserAlerts}
                    onCheckedChange={(v) => handleChange("newUserAlerts", v)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Payment Received Alerts</Label>
                  <Switch
                    checked={settings.paymentAlerts}
                    onCheckedChange={(v) => handleChange("paymentAlerts", v)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- ACADEMIC TAB --- */}
          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Settings</CardTitle>
                <CardDescription>
                  Configuration for classes and grading.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Current Academic Year</Label>
                    <Input
                      value={settings.academicYear}
                      onChange={(e) =>
                        handleChange("academicYear", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Default Class Capacity</Label>
                    <Input
                      type="number"
                      value={settings.defaultClassCapacity}
                      onChange={(e) =>
                        handleChange("defaultClassCapacity", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Attendance Warning Threshold (%)</Label>
                  <Input
                    type="number"
                    value={settings.attendanceThreshold}
                    onChange={(e) =>
                      handleChange("attendanceThreshold", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- FINANCIAL TAB --- */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Payment & Billing</CardTitle>
                <CardDescription>Currency and fee settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Currency</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(v) => handleChange("currency", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="SAR">SAR (﷼)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) => handleChange("taxRate", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Late Fee Amount</Label>
                    <Input
                      type="number"
                      value={settings.lateFeeAmount}
                      onChange={(e) =>
                        handleChange("lateFeeAmount", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* FLOATING SAVE BAR */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 mx-auto w-full max-w-2xl px-4 z-50"
          >
            <div className="bg-slate-900 text-white p-4 rounded-full shadow-2xl flex justify-between items-center border border-slate-700">
              <span className="pl-4 text-sm font-medium">
                You have unsaved changes
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.refresh()}
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}{" "}
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
