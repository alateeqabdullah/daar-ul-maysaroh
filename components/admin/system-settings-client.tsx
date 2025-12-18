// src/components/admin/system-settings-client.tsx
"use client";

import { useState } from "react";
import {
  Settings,
  Save,
  Mail,
  Bell,
  Shield,
  BookOpen,
  DollarSign,
  Palette,
  Upload,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function SystemSettingsClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "MadrasahPro",
    siteDescription: "Comprehensive Islamic Education Platform",
    contactEmail: "admin@madrasahpro.com",
    contactPhone: "+1234567890",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    language: "en",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    emailFrom: "noreply@madrasahpro.com",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    newUserAlerts: true,
    paymentAlerts: true,
    attendanceAlerts: true,

    // Security Settings
    requireEmailVerification: true,
    requireStrongPasswords: true,
    sessionTimeout: "24",
    maxLoginAttempts: "5",

    // Academic Settings
    academicYear: "2024-2025",
    defaultClassCapacity: "20",
    attendanceThreshold: "75",
    gradingScale: "percentage",

    // Financial Settings
    currency: "USD",
    paymentGateway: "stripe",
    taxRate: "0",
    lateFeeAmount: "10",
    lateFeeDays: "7",
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Settings saved successfully", {
        description: "All changes have been applied.",
      });
    } catch (error) {
      toast.error("Failed to save settings", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (
      confirm(
        "Are you sure you want to reset all settings to default? This action cannot be undone."
      )
    ) {
      // Reset to default settings
      toast.success("Settings reset to default");
    }
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "madrasahpro-settings.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast.success("Settings exported successfully");
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setSettings(importedSettings);
        toast.success("Settings imported successfully");
      } catch (error) {
        toast.error("Failed to import settings", {
          description: "Invalid settings file format.",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Configure system-wide settings and preferences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExportSettings}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" className="gap-2" asChild>
              <div>
                <Upload className="h-4 w-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSettings}
                  className="hidden"
                />
              </div>
            </Button>
          </label>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={handleSaveSettings}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="academic">
            <BookOpen className="mr-2 h-4 w-4" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="financial">
            <DollarSign className="mr-2 h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, contactEmail: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, contactPhone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) =>
                      setSettings({ ...settings, timezone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="GMT">
                        Greenwich Mean Time (GMT)
                      </SelectItem>
                      <SelectItem value="AST">
                        Arabia Standard Time (AST)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) =>
                      setSettings({ ...settings, dateFormat: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) =>
                      setSettings({ ...settings, language: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="ur">اردو</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      siteDescription: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email server settings for sending notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpHost: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpPort: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpUsername: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpPassword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailFrom">From Email Address</Label>
                  <Input
                    id="emailFrom"
                    type="email"
                    value={settings.emailFrom}
                    onChange={(e) =>
                      setSettings({ ...settings, emailFrom: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      Email Testing
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Send a test email to verify your email configuration is
                      working correctly.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Send Test Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send push notifications to users
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newUserAlerts" className="font-medium">
                      New User Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify admins when new users register
                    </p>
                  </div>
                  <Switch
                    id="newUserAlerts"
                    checked={settings.newUserAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, newUserAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentAlerts" className="font-medium">
                      Payment Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify admins when payments are received
                    </p>
                  </div>
                  <Switch
                    id="paymentAlerts"
                    checked={settings.paymentAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, paymentAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="attendanceAlerts" className="font-medium">
                      Attendance Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify parents when students are absent
                    </p>
                  </div>
                  <Switch
                    id="attendanceAlerts"
                    checked={settings.attendanceAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, attendanceAlerts: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="requireEmailVerification"
                      className="font-medium"
                    >
                      Require Email Verification
                    </Label>
                    <p className="text-sm text-gray-500">
                      Users must verify their email address before accessing the
                      system
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        requireEmailVerification: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="requireStrongPasswords"
                      className="font-medium"
                    >
                      Require Strong Passwords
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enforce strong password policies (min 8 chars, mixed case,
                      numbers)
                    </p>
                  </div>
                  <Switch
                    id="requireStrongPasswords"
                    checked={settings.requireStrongPasswords}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        requireStrongPasswords: checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (hours)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="1"
                    max="48"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sessionTimeout: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxLoginAttempts: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
                <div className="flex items-start">
                  <Shield className="mr-3 h-5 w-5 text-red-600 dark:text-red-400" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-red-900 dark:text-red-100">
                      Danger Zone
                    </h4>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      These actions are irreversible. Please proceed with
                      caution.
                    </p>
                    <div className="mt-3 space-x-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleResetSettings}
                      >
                        Reset All Settings
                      </Button>
                      <Button size="sm" variant="destructive">
                        Purge All Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Settings</CardTitle>
              <CardDescription>
                Configure academic year, grading, and attendance settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={settings.academicYear}
                    onChange={(e) =>
                      setSettings({ ...settings, academicYear: e.target.value })
                    }
                    placeholder="e.g., 2024-2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultClassCapacity">
                    Default Class Capacity
                  </Label>
                  <Input
                    id="defaultClassCapacity"
                    type="number"
                    min="1"
                    max="100"
                    value={settings.defaultClassCapacity}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultClassCapacity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendanceThreshold">
                    Attendance Threshold (%)
                  </Label>
                  <Input
                    id="attendanceThreshold"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.attendanceThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        attendanceThreshold: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradingScale">Grading Scale</Label>
                  <Select
                    value={settings.gradingScale}
                    onValueChange={(value) =>
                      setSettings({ ...settings, gradingScale: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grading scale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">
                        Percentage (0-100%)
                      </SelectItem>
                      <SelectItem value="letter">
                        Letter Grades (A-F)
                      </SelectItem>
                      <SelectItem value="gpa">GPA (0-4.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Settings</CardTitle>
              <CardDescription>
                Configure payment gateways, currency, and fee settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) =>
                      setSettings({ ...settings, currency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="SAR">SAR (﷼)</SelectItem>
                      <SelectItem value="AED">AED (د.إ)</SelectItem>
                      <SelectItem value="PKR">PKR (₨)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentGateway">Payment Gateway</Label>
                  <Select
                    value={settings.paymentGateway}
                    onValueChange={(value) =>
                      setSettings({ ...settings, paymentGateway: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="manual">Manual/Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={settings.taxRate}
                    onChange={(e) =>
                      setSettings({ ...settings, taxRate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lateFeeAmount">Late Fee Amount</Label>
                  <Input
                    id="lateFeeAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.lateFeeAmount}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        lateFeeAmount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lateFeeDays">
                    Late Fee Grace Period (days)
                  </Label>
                  <Input
                    id="lateFeeDays"
                    type="number"
                    min="0"
                    value={settings.lateFeeDays}
                    onChange={(e) =>
                      setSettings({ ...settings, lateFeeDays: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Configure theme, colors, and display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-10 w-10 rounded-lg border"
                      style={{ backgroundColor: "#7c3aed" }}
                    />
                    <Input id="primaryColor" value="#7c3aed" readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-900/20">
                <div className="flex items-start">
                  <Palette className="mr-3 h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">
                      Preview Theme
                    </h4>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      Preview your theme changes before applying them.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Preview Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
