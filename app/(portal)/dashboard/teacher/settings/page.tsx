import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherSettingsClient from "@/components/teacher/teacher-settings-client";

export const metadata = { title: "Settings | Teacher" };

export default async function TeacherSettingsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { email: true, name: true } // Fetch minimal info needed
  });

  return <TeacherSettingsClient user={user} />;
}







// // src/app/(dashboard)/teacher/settings/page.tsx
// "use client";

// import { useState } from "react";
// import {
//   User,
//   Bell,
//   Lock,
//   Globe,

//   Palette,
//   Save,
//   Upload,
//   Eye,
//   EyeOff,
//   Smartphone,
//   Mail,
//   Calendar,
//   Clock,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [showPassword, setShowPassword] = useState(false);
//   const [settings, setSettings] = useState({
//     profile: {
//       name: "Teacher Name",
//       email: "teacher@madrasah.com",
//       phone: "+1234567890",
//       bio: "Experienced Quran teacher with 10+ years of experience",
//       timezone: "UTC+3",
//       language: "en",
//     },
//     notifications: {
//       emailNotifications: true,
//       pushNotifications: true,
//       assignmentAlerts: true,
//       attendanceAlerts: true,
//       gradeAlerts: false,
//       announcementAlerts: true,
//     },
//     security: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//       twoFactorEnabled: false,
//     },
//     appearance: {
//       theme: "light",
//       fontSize: "medium",
//       density: "comfortable",
//     },
//   });

//   const handleSave = (section: string) => {
//     toast.success(`${section} settings saved successfully`);
//     // In production: API call to save settings
//   };

//   const handleProfilePicture = () => {
//     // Handle profile picture upload
//     toast.info("Profile picture upload feature coming soon");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Settings
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             Manage your account preferences and settings
//           </p>
//         </div>
//         <Button className="bg-gradient-primary gap-2">
//           <Save className="h-4 w-4" />
//           Save All Changes
//         </Button>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-4">
//         {/* Settings Sidebar */}
//         <Card className="lg:col-span-1">
//           <CardContent className="p-6">
//             <nav className="space-y-2">
//               <button
//                 onClick={() => setActiveTab("profile")}
//                 className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left ${
//                   activeTab === "profile"
//                     ? "bg-gradient-primary text-white"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-800"
//                 }`}
//               >
//                 <User className="h-4 w-4" />
//                 <span>Profile</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("notifications")}
//                 className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left ${
//                   activeTab === "notifications"
//                     ? "bg-gradient-primary text-white"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-800"
//                 }`}
//               >
//                 <Bell className="h-4 w-4" />
//                 <span>Notifications</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("security")}
//                 className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left ${
//                   activeTab === "security"
//                     ? "bg-gradient-primary text-white"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-800"
//                 }`}
//               >
//                 <Lock className="h-4 w-4" />
//                 <span>Security</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("appearance")}
//                 className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left ${
//                   activeTab === "appearance"
//                     ? "bg-gradient-primary text-white"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-800"
//                 }`}
//               >
//                 <Palette className="h-4 w-4" />
//                 <span>Appearance</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("preferences")}
//                 className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left ${
//                   activeTab === "preferences"
//                     ? "bg-gradient-primary text-white"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-800"
//                 }`}
//               >
//                 <Globe className="h-4 w-4" />
//                 <span>Preferences</span>
//               </button>
//             </nav>
//           </CardContent>
//         </Card>

//         {/* Settings Content */}
//         <div className="lg:col-span-3">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <TabsContent value="profile" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Profile Information</CardTitle>
//                   <CardDescription>
//                     Update your personal details
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="flex items-center space-x-6">
//                     <Avatar className="h-24 w-24">
//                       <AvatarImage src="/api/placeholder/96/96" />
//                       <AvatarFallback className="bg-gradient-primary text-2xl text-white">
//                         TN
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="space-y-2">
//                       <h3 className="font-semibold">Profile Picture</h3>
//                       <p className="text-sm text-gray-500">
//                         JPG, PNG or GIF (Max 2MB)
//                       </p>
//                       <div className="flex space-x-3">
//                         <Button
//                           variant="outline"
//                           onClick={handleProfilePicture}
//                         >
//                           <Upload className="mr-2 h-4 w-4" />
//                           Upload New
//                         </Button>
//                         <Button variant="ghost" className="text-red-600">
//                           Remove
//                         </Button>
//                       </div>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="grid gap-6 md:grid-cols-2">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name</Label>
//                       <Input
//                         id="name"
//                         value={settings.profile.name}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             profile: {
//                               ...settings.profile,
//                               name: e.target.value,
//                             },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={settings.profile.email}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             profile: {
//                               ...settings.profile,
//                               email: e.target.value,
//                             },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone Number</Label>
//                       <Input
//                         id="phone"
//                         value={settings.profile.phone}
//                         onChange={(e) =>
//                           setSettings({
//                             ...settings,
//                             profile: {
//                               ...settings.profile,
//                               phone: e.target.value,
//                             },
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="timezone">Timezone</Label>
//                       <Select
//                         value={settings.profile.timezone}
//                         onValueChange={(value) =>
//                           setSettings({
//                             ...settings,
//                             profile: { ...settings.profile, timezone: value },
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="UTC+3">
//                             UTC+3 (Makkah Time)
//                           </SelectItem>
//                           <SelectItem value="UTC+0">UTC (GMT)</SelectItem>
//                           <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
//                           <SelectItem value="UTC+8">
//                             UTC+8 (Singapore)
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bio">Bio</Label>
//                     <textarea
//                       id="bio"
//                       rows={3}
//                       className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
//                       value={settings.profile.bio}
//                       onChange={(e) =>
//                         setSettings({
//                           ...settings,
//                           profile: { ...settings.profile, bio: e.target.value },
//                         })
//                       }
//                     />
//                     <p className="text-sm text-gray-500">
//                       A brief description about yourself
//                     </p>
//                   </div>

//                   <Button
//                     className="bg-gradient-primary"
//                     onClick={() => handleSave("Profile")}
//                   >
//                     <Save className="mr-2 h-4 w-4" />
//                     Save Profile
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="notifications" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Notification Preferences</CardTitle>
//                   <CardDescription>
//                     Choose how you want to be notified
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium">Email Notifications</h3>
//                         <p className="text-sm text-gray-500">
//                           Receive notifications via email
//                         </p>
//                       </div>
//                       <Switch
//                         checked={settings.notifications.emailNotifications}
//                         onCheckedChange={(checked) =>
//                           setSettings({
//                             ...settings,
//                             notifications: {
//                               ...settings.notifications,
//                               emailNotifications: checked,
//                             },
//                           })
//                         }
//                       />
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium">Push Notifications</h3>
//                         <p className="text-sm text-gray-500">
//                           Receive push notifications on your devices
//                         </p>
//                       </div>
//                       <Switch
//                         checked={settings.notifications.pushNotifications}
//                         onCheckedChange={(checked) =>
//                           setSettings({
//                             ...settings,
//                             notifications: {
//                               ...settings.notifications,
//                               pushNotifications: checked,
//                             },
//                           })
//                         }
//                       />
//                     </div>

//                     <Separator />

//                     <div className="space-y-4">
//                       <h3 className="font-semibold">Notification Types</h3>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Assignment Alerts</h4>
//                           <p className="text-sm text-gray-500">
//                             New assignments and submissions
//                           </p>
//                         </div>
//                         <Switch
//                           checked={settings.notifications.assignmentAlerts}
//                           onCheckedChange={(checked) =>
//                             setSettings({
//                               ...settings,
//                               notifications: {
//                                 ...settings.notifications,
//                                 assignmentAlerts: checked,
//                               },
//                             })
//                           }
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Attendance Alerts</h4>
//                           <p className="text-sm text-gray-500">
//                             Student attendance and absences
//                           </p>
//                         </div>
//                         <Switch
//                           checked={settings.notifications.attendanceAlerts}
//                           onCheckedChange={(checked) =>
//                             setSettings({
//                               ...settings,
//                               notifications: {
//                                 ...settings.notifications,
//                                 attendanceAlerts: checked,
//                               },
//                             })
//                           }
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Grade Alerts</h4>
//                           <p className="text-sm text-gray-500">
//                             Grade submissions and updates
//                           </p>
//                         </div>
//                         <Switch
//                           checked={settings.notifications.gradeAlerts}
//                           onCheckedChange={(checked) =>
//                             setSettings({
//                               ...settings,
//                               notifications: {
//                                 ...settings.notifications,
//                                 gradeAlerts: checked,
//                               },
//                             })
//                           }
//                         />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Announcement Alerts</h4>
//                           <p className="text-sm text-gray-500">
//                             System and class announcements
//                           </p>
//                         </div>
//                         <Switch
//                           checked={settings.notifications.announcementAlerts}
//                           onCheckedChange={(checked) =>
//                             setSettings({
//                               ...settings,
//                               notifications: {
//                                 ...settings.notifications,
//                                 announcementAlerts: checked,
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <Button
//                     className="bg-gradient-primary"
//                     onClick={() => handleSave("Notification")}
//                   >
//                     <Save className="mr-2 h-4 w-4" />
//                     Save Preferences
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="security" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Security Settings</CardTitle>
//                   <CardDescription>
//                     Manage your account security
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <h3 className="font-semibold">Change Password</h3>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="currentPassword">
//                           Current Password
//                         </Label>
//                         <div className="relative">
//                           <Input
//                             id="currentPassword"
//                             type={showPassword ? "text" : "password"}
//                             value={settings.security.currentPassword}
//                             onChange={(e) =>
//                               setSettings({
//                                 ...settings,
//                                 security: {
//                                   ...settings.security,
//                                   currentPassword: e.target.value,
//                                 },
//                               })
//                             }
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2"
//                           >
//                             {showPassword ? (
//                               <EyeOff className="h-4 w-4 text-gray-400" />
//                             ) : (
//                               <Eye className="h-4 w-4 text-gray-400" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="newPassword">New Password</Label>
//                         <Input
//                           id="newPassword"
//                           type={showPassword ? "text" : "password"}
//                           value={settings.security.newPassword}
//                           onChange={(e) =>
//                             setSettings({
//                               ...settings,
//                               security: {
//                                 ...settings.security,
//                                 newPassword: e.target.value,
//                               },
//                             })
//                           }
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="confirmPassword">
//                           Confirm New Password
//                         </Label>
//                         <Input
//                           id="confirmPassword"
//                           type={showPassword ? "text" : "password"}
//                           value={settings.security.confirmPassword}
//                           onChange={(e) =>
//                             setSettings({
//                               ...settings,
//                               security: {
//                                 ...settings.security,
//                                 confirmPassword: e.target.value,
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                     </div>

//                     <Button
//                       className="bg-gradient-primary"
//                       onClick={() => handleSave("Password")}
//                     >
//                       Update Password
//                     </Button>
//                   </div>

//                   <Separator />

//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium">
//                           Two-Factor Authentication
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Add an extra layer of security to your account
//                         </p>
//                       </div>
//                       <Switch
//                         checked={settings.security.twoFactorEnabled}
//                         onCheckedChange={(checked) =>
//                           setSettings({
//                             ...settings,
//                             security: {
//                               ...settings.security,
//                               twoFactorEnabled: checked,
//                             },
//                           })
//                         }
//                       />
//                     </div>

//                     {settings.security.twoFactorEnabled && (
//                       <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
//                         <div className="flex items-center space-x-3">
//                           <Smartphone className="h-5 w-5 text-gray-400" />
//                           <div>
//                             <h4 className="font-medium">Setup Required</h4>
//                             <p className="text-sm text-gray-500">
//                               Scan the QR code with your authenticator app
//                             </p>
//                           </div>
//                         </div>
//                         <Button variant="outline" className="mt-4">
//                           Setup 2FA
//                         </Button>
//                       </div>
//                     )}
//                   </div>

//                   <Separator />

//                   <div className="space-y-4">
//                     <h3 className="font-semibold text-red-600">Danger Zone</h3>
//                     <div className="rounded-lg border border-red-200 p-4 dark:border-red-900">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Delete Account</h4>
//                           <p className="text-sm text-gray-500">
//                             Permanently delete your account and all data
//                           </p>
//                         </div>
//                         <Button variant="destructive">Delete Account</Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="appearance" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Appearance Settings</CardTitle>
//                   <CardDescription>Customize the look and feel</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium">Theme</h3>
//                         <p className="text-sm text-gray-500">
//                           Choose light or dark mode
//                         </p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <Button
//                           variant={
//                             settings.appearance.theme === "light"
//                               ? "default"
//                               : "outline"
//                           }
//                           size="sm"
//                           onClick={() =>
//                             setSettings({
//                               ...settings,
//                               appearance: {
//                                 ...settings.appearance,
//                                 theme: "light",
//                               },
//                             })
//                           }
//                         >
//                           Light
//                         </Button>
//                         <Button
//                           variant={
//                             settings.appearance.theme === "dark"
//                               ? "default"
//                               : "outline"
//                           }
//                           size="sm"
//                           onClick={() =>
//                             setSettings({
//                               ...settings,
//                               appearance: {
//                                 ...settings.appearance,
//                                 theme: "dark",
//                               },
//                             })
//                           }
//                         >
//                           Dark
//                         </Button>
//                         <Button
//                           variant={
//                             settings.appearance.theme === "system"
//                               ? "default"
//                               : "outline"
//                           }
//                           size="sm"
//                           onClick={() =>
//                             setSettings({
//                               ...settings,
//                               appearance: {
//                                 ...settings.appearance,
//                                 theme: "system",
//                               },
//                             })
//                           }
//                         >
//                           System
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="fontSize">Font Size</Label>
//                       <Select
//                         value={settings.appearance.fontSize}
//                         onValueChange={(value) =>
//                           setSettings({
//                             ...settings,
//                             appearance: {
//                               ...settings.appearance,
//                               fontSize: value,
//                             },
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="small">Small</SelectItem>
//                           <SelectItem value="medium">Medium</SelectItem>
//                           <SelectItem value="large">Large</SelectItem>
//                           <SelectItem value="xlarge">Extra Large</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="density">Density</Label>
//                       <Select
//                         value={settings.appearance.density}
//                         onValueChange={(value) =>
//                           setSettings({
//                             ...settings,
//                             appearance: {
//                               ...settings.appearance,
//                               density: value,
//                             },
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="compact">Compact</SelectItem>
//                           <SelectItem value="comfortable">
//                             Comfortable
//                           </SelectItem>
//                           <SelectItem value="spacious">Spacious</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <Button
//                     className="bg-gradient-primary"
//                     onClick={() => handleSave("Appearance")}
//                   >
//                     <Save className="mr-2 h-4 w-4" />
//                     Save Appearance
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="preferences" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Preferences</CardTitle>
//                   <CardDescription>
//                     System and teaching preferences
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="grid gap-6 md:grid-cols-2">
//                     <div className="space-y-2">
//                       <Label htmlFor="language">Language</Label>
//                       <Select
//                         value={settings.profile.language}
//                         onValueChange={(value) =>
//                           setSettings({
//                             ...settings,
//                             profile: { ...settings.profile, language: value },
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="en">English</SelectItem>
//                           <SelectItem value="ar">Arabic</SelectItem>
//                           <SelectItem value="ur">Urdu</SelectItem>
//                           <SelectItem value="fr">French</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="dateFormat">Date Format</Label>
//                       <Select defaultValue="MM/DD/YYYY">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
//                           <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
//                           <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="timeFormat">Time Format</Label>
//                       <Select defaultValue="12h">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="12h">12-hour</SelectItem>
//                           <SelectItem value="24h">24-hour</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="weekStart">Week Starts On</Label>
//                       <Select defaultValue="sunday">
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="sunday">Sunday</SelectItem>
//                           <SelectItem value="monday">Monday</SelectItem>
//                           <SelectItem value="saturday">Saturday</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <h3 className="font-semibold">Teaching Preferences</h3>

//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Auto-save Grades</h4>
//                           <p className="text-sm text-gray-500">
//                             Automatically save grades as you enter them
//                           </p>
//                         </div>
//                         <Switch defaultChecked />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">Attendance Reminders</h4>
//                           <p className="text-sm text-gray-500">
//                             Remind to take attendance at class start
//                           </p>
//                         </div>
//                         <Switch defaultChecked />
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h4 className="font-medium">
//                             Assignment Due Notifications
//                           </h4>
//                           <p className="text-sm text-gray-500">
//                             Notify when assignments are due soon
//                           </p>
//                         </div>
//                         <Switch defaultChecked />
//                       </div>
//                     </div>
//                   </div>

//                   <Button
//                     className="bg-gradient-primary"
//                     onClick={() => handleSave("Preferences")}
//                   >
//                     <Save className="mr-2 h-4 w-4" />
//                     Save Preferences
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }
