// app/(portal)/dashboard/admin/users/[id]/view-user-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  GraduationCap,
  BookOpen,
  Heart,
  Crown,
  Globe,
  Users,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Award,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UserRole, UserStatus } from "@/app/generated/prisma/enums";
import { updateUserStatus, deleteUser, resetUserPassword } from "../../actions/users";
import { Input } from "@/components/ui/input";

interface UserWithProfile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  emailVerified: Date | null;
  phoneVerified: boolean;
  lastLogin: Date | null;
  loginCount: number;
  createdAt: Date;
  updatedAt: Date;
  studentProfile?: {
    studentId: string;
    currentLevel: string | null;
    enrollmentDate: Date;
    academicYear: string;
    hifzLevel: string | null;
    tajweedLevel: string | null;
    enrollments?: { id: string; enrolledAt: Date; status: string; class?: { name: string } }[];
    payments?: { id: string; amount: number; status: string; date: Date }[];
    certificates?: { id: string; title: string; issuedAt: Date }[];
  } | null;
  teacherProfile?: {
    teacherId: string;
    specialization: string | null;
    isAvailable: boolean;
    experienceYears: number;
    qualification: string | null;
    classes?: { id: string; name: string }[];
    subjects?: { id: string; name: string }[];
    sanadChains?: { id: string; name: string }[];
  } | null;
  parentProfile?: {
    occupation: string | null;
    students?: { studentId: string }[];
    payments?: { id: string; amount: number; status: string }[];
    invoices?: { id: string; invoiceNumber: string; amount: number }[];
  } | null;
  adminProfile?: {
    department: string | null;
  } | null;
}

interface ViewUserClientProps {
  user: UserWithProfile;
}

const ROLE_INFO: Record<UserRole, { label: string; icon: any; color: string; bg: string }> = {
  SUPER_ADMIN: { label: "Super Admin", icon: Crown, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-950/40" },
  ADMIN: { label: "Admin", icon: Shield, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-950/40" },
  TEACHER: { label: "Teacher", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-950/40" },
  STUDENT: { label: "Student", icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-950/40" },
  PARENT: { label: "Parent", icon: Heart, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-950/40" },
  CONTENT_MANAGER: { label: "Content Manager", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-100 dark:bg-cyan-950/40" },
  SUPPORT: { label: "Support", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-950/40" },
};

const STATUS_INFO: Record<UserStatus, { label: string; color: string; bg: string; dot: string }> = {
  PENDING: { label: "Pending", color: "text-amber-700", bg: "bg-amber-100 dark:bg-amber-950/30", dot: "bg-amber-500" },
  APPROVED: { label: "Approved", color: "text-green-700", bg: "bg-green-100 dark:bg-green-950/30", dot: "bg-green-500" },
  REJECTED: { label: "Rejected", color: "text-red-700", bg: "bg-red-100 dark:bg-red-950/30", dot: "bg-red-500" },
  SUSPENDED: { label: "Suspended", color: "text-orange-700", bg: "bg-orange-100 dark:bg-orange-950/30", dot: "bg-orange-500" },
  DEACTIVATED: { label: "Deactivated", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800", dot: "bg-gray-500" },
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: Date | null) => {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export function ViewUserClient({ user: initialUser }: ViewUserClientProps) {
  const router = useRouter();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<UserStatus | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const RoleIcon = ROLE_INFO[user.role].icon;
  const statusInfo = STATUS_INFO[user.status];

  const handleStatusChange = async () => {
    if (!newStatus) return;
    
    setIsLoading(true);
    try {
      await updateUserStatus(user.id, {
        status: newStatus,
        rejectionReason: newStatus === "REJECTED" ? rejectionReason : undefined,
      });
      
      setUser({ ...user, status: newStatus });
      toast.success(`User status updated to ${newStatus.toLowerCase()}`);
      setOpenStatusDialog(false);
      setNewStatus(null);
      setRejectionReason("");
    } catch (error) {
      toast.error("Failed to update user status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted successfully");
      router.push("/dashboard/admin/users");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    setIsLoading(true);
    try {
      await resetUserPassword(user.id, newPassword);
      toast.success("Password reset successfully");
      setOpenPasswordDialog(false);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                href="/dashboard/admin/users"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Users
              </Link>
              <div className="flex items-center gap-3">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-amber-500 text-white text-xl font-black">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
                      {user.name}
                    </h1>
                    <Badge className={cn(statusInfo.bg, statusInfo.color)}>
                      <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot} mr-1`} />
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                    {user.emailVerified && (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                      {user.phoneVerified && (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/admin/users/${user.id}/edit`}>
                <Button variant="outline" className="rounded-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setOpenPasswordDialog(true)}
                className="rounded-full border-amber-300 text-amber-600 hover:bg-amber-50"
              >
                <Key className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
              <Button
                variant="destructive"
                onClick={() => setOpenDeleteDialog(true)}
                className="rounded-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
            <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-md">Profile</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-md">Activity</TabsTrigger>
            {user.role === "STUDENT" && (
              <TabsTrigger value="academic" className="rounded-md">Academic</TabsTrigger>
            )}
            {user.role === "TEACHER" && (
              <TabsTrigger value="teaching" className="rounded-md">Teaching</TabsTrigger>
            )}
            {user.role === "PARENT" && (
              <TabsTrigger value="children" className="rounded-md">Children</TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Account Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>User account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <div className="flex items-center gap-2">
                      <RoleIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{ROLE_INFO[user.role].label}</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={cn(statusInfo.bg, statusInfo.color)}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-muted-foreground">Last Login</span>
                    <span className="text-sm">{formatDate(user.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-muted-foreground">Login Count</span>
                    <span className="text-sm font-medium">{user.loginCount}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Account Created</span>
                    <span className="text-sm">{formatDate(user.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage user account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setNewStatus("APPROVED");
                          setOpenStatusDialog(true);
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          setNewStatus("REJECTED");
                          setOpenStatusDialog(true);
                        }}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {user.status === "APPROVED" && (
                    <Button
                      onClick={() => {
                        setNewStatus("SUSPENDED");
                        setOpenStatusDialog(true);
                      }}
                      variant="outline"
                      className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Suspend User
                    </Button>
                  )}
                  {user.status === "SUSPENDED" && (
                    <Button
                      onClick={() => {
                        setNewStatus("APPROVED");
                        setOpenStatusDialog(true);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate User
                    </Button>
                  )}
                  <Link href={`/dashboard/admin/users/${user.id}/edit`}>
                    <Button variant="outline" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit User Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>User profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.role === "STUDENT" && user.studentProfile && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Student ID</p>
                      <p className="font-mono font-medium">{user.studentProfile.studentId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Current Level</p>
                      <p>{user.studentProfile.currentLevel || "Not set"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Academic Year</p>
                      <p>{user.studentProfile.academicYear}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Enrollment Date</p>
                      <p>{formatDate(user.studentProfile.enrollmentDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Hifz Level</p>
                      <p>{user.studentProfile.hifzLevel || "Not started"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tajweed Level</p>
                      <p>{user.studentProfile.tajweedLevel || "Not started"}</p>
                    </div>
                  </div>
                )}

                {user.role === "TEACHER" && user.teacherProfile && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Teacher ID</p>
                      <p className="font-mono font-medium">{user.teacherProfile.teacherId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Specialization</p>
                      <p>{user.teacherProfile.specialization || "Not set"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p>{user.teacherProfile.experienceYears} years</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Qualification</p>
                      <p>{user.teacherProfile.qualification || "Not set"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <Badge className={user.teacherProfile.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                        {user.teacherProfile.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                )}

                {user.role === "PARENT" && user.parentProfile && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Occupation</p>
                      <p>{user.parentProfile.occupation || "Not specified"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Number of Children</p>
                      <p>{user.parentProfile.students?.length || 0}</p>
                    </div>
                  </div>
                )}

                {user.role === "ADMIN" && user.adminProfile && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p>{user.adminProfile.department || "Not assigned"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Recent account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">Account Created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                  {user.lastLogin && (
                    <div className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm">Last Login</p>
                        <p className="text-xs text-muted-foreground">{formatDate(user.lastLogin)}</p>
                      </div>
                    </div>
                  )}
                  {user.emailVerified && (
                    <div className="flex items-center gap-3 py-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm">Email Verified</p>
                        <p className="text-xs text-muted-foreground">{formatDate(user.emailVerified)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Tab for Students */}
          {user.role === "STUDENT" && user.studentProfile && (
            <TabsContent value="academic">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollments</CardTitle>
                    <CardDescription>Current and past classes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.studentProfile.enrollments?.length ? (
                      <div className="space-y-3">
                        {user.studentProfile.enrollments.map((enrollment: any) => (
                          <div key={enrollment.id} className="flex justify-between items-center py-2 border-b border-slate-100">
                            <div>
                              <p className="font-medium">{enrollment.class?.name || "Class"}</p>
                              <p className="text-xs text-muted-foreground">Enrolled: {formatDate(enrollment.enrolledAt)}</p>
                            </div>
                            <Badge variant="outline">{enrollment.status}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No enrollments found</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certificates</CardTitle>
                    <CardDescription>Achievements and certifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.studentProfile.certificates?.length ? (
                      <div className="space-y-3">
                        {user.studentProfile.certificates.map((cert: any) => (
                          <div key={cert.id} className="flex items-center gap-3 py-2 border-b border-slate-100">
                            <Award className="w-4 h-4 text-amber-500" />
                            <div>
                              <p className="font-medium">{cert.title}</p>
                              <p className="text-xs text-muted-foreground">Issued: {formatDate(cert.issuedAt)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No certificates yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Status Change Dialog */}
      <Dialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {newStatus === "APPROVED" && "Approve User"}
              {newStatus === "REJECTED" && "Reject User"}
              {newStatus === "SUSPENDED" && "Suspend User"}
            </DialogTitle>
            <DialogDescription>
              {newStatus === "APPROVED" && `Are you sure you want to approve ${user.name}?`}
              {newStatus === "REJECTED" && `Are you sure you want to reject ${user.name}'s application?`}
              {newStatus === "SUSPENDED" && `Are you sure you want to suspend ${user.name}?`}
            </DialogDescription>
          </DialogHeader>
          {newStatus === "REJECTED" && (
            <div className="space-y-2">
              <label className="text-sm font-black">Rejection Reason</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-sm"
                rows={3}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenStatusDialog(false)}>Cancel</Button>
            <Button
              onClick={handleStatusChange}
              disabled={isLoading || (newStatus === "REJECTED" && !rejectionReason)}
              className={cn(
                newStatus === "APPROVED" && "bg-green-600 hover:bg-green-700",
                newStatus === "REJECTED" && "bg-red-600 hover:bg-red-700",
                newStatus === "SUSPENDED" && "bg-orange-600 hover:bg-orange-700"
              )}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {user.name}? This action cannot be undone.
              All associated data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Password Dialog */}
      <Dialog open={openPasswordDialog} onOpenChange={setOpenPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for {user.name}. The user will be able to log in with this password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-black">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <p className="text-[10px] text-muted-foreground">Minimum 8 characters with uppercase, lowercase, and number</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
            <Button onClick={handleResetPassword} disabled={!newPassword || !confirmPassword}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}