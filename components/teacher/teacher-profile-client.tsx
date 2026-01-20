"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Save,
  Loader2,
  Edit,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

export default function TeacherProfileClient({ profile }: { profile: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone || "",
    qualification: profile.qualification || "",
    specialization: profile.specialization || "",
    experienceYears: profile.experienceYears?.toString() || "0",
    bio: profile.bio || "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/profile", {
        method: "POST",
        body: JSON.stringify({ action: "UPDATE_PROFILE", data: formData }),
      });
      if (res.ok) {
        toast.success("Profile updated");
        setIsEditing(false);
      } else throw new Error();
    } catch {
      toast.error("Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Profile Header */}
      <div className="relative h-48 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <Avatar className="h-32 w-32 border-[6px] border-white dark:border-slate-950 shadow-xl">
            <AvatarImage src={profile.image} />
            <AvatarFallback className="text-4xl">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-1">
              {profile.name}
            </h1>
            <p className="text-indigo-100">
              {profile.specialization || "Instructor"}
            </p>
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Contact */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4" /> {profile.email}
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Phone className="h-4 w-4" />{" "}
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-8"
                  />
                ) : (
                  profile.phone || "N/A"
                )}
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Calendar className="h-4 w-4" /> Joined {profile.joiningDate}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Details */}
        <Card className="md:col-span-2">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-bold text-lg">Professional Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Qualification</Label>
                {isEditing ? (
                  <Input
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-slate-600">{profile.qualification}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Experience (Years)</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceYears: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-slate-600">{profile.experienceYears}</p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Label>Specialization</Label>
              {isEditing ? (
                <Input
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                />
              ) : (
                <p className="text-slate-600">{profile.specialization}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Bio</Label>
              {isEditing ? (
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              ) : (
                <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4 border-t">
                <Button
                  className="bg-indigo-600 text-white"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}{" "}
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
