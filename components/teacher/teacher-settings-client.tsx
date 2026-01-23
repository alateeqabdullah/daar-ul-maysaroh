"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Lock, Bell, Moon, Sun, Globe, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function TeacherSettingsClient({ user }: { user: any }) {
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [passData, setPassData] = useState({ current: "", new: "", confirm: "" });

  const handlePasswordChange = async () => {
    if (passData.new !== passData.confirm) return toast.error("Passwords do not match");
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/profile", {
        method: "POST",
        body: JSON.stringify({ action: "CHANGE_PASSWORD", data: { newPassword: passData.new } })
      });
      if(res.ok) toast.success("Password updated");
      else throw new Error();
    } catch {
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full justify-start">
           <TabsTrigger value="account" className="px-6">Account</TabsTrigger>
           <TabsTrigger value="appearance" className="px-6">Appearance</TabsTrigger>
           <TabsTrigger value="notifications" className="px-6">Notifications</TabsTrigger>
        </TabsList>

        <div className="mt-6 space-y-6">
           {/* ACCOUNT TAB */}
           <TabsContent value="account">
              <Card>
                 <CardHeader><CardTitle>Security</CardTitle><CardDescription>Manage your password and security settings</CardDescription></CardHeader>
                 <CardContent className="space-y-4">
                    <div className="grid gap-4 max-w-md">
                       <div className="space-y-1"><Label>New Password</Label><Input type="password" value={passData.new} onChange={e => setPassData({...passData, new: e.target.value})} /></div>
                       <div className="space-y-1"><Label>Confirm Password</Label><Input type="password" value={passData.confirm} onChange={e => setPassData({...passData, confirm: e.target.value})} /></div>
                       <Button onClick={handlePasswordChange} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin mr-2"/> : "Update Password"}</Button>
                    </div>
                 </CardContent>
              </Card>
           </TabsContent>

           {/* APPEARANCE TAB */}
           <TabsContent value="appearance">
              <Card>
                 <CardHeader><CardTitle>Theme Preferences</CardTitle></CardHeader>
                 <CardContent className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setTheme("light")}><Sun className="h-6 w-6"/> Light</Button>
                    <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setTheme("dark")}><Moon className="h-6 w-6"/> Dark</Button>
                    <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => setTheme("system")}><Globe className="h-6 w-6"/> System</Button>
                 </CardContent>
              </Card>
           </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}