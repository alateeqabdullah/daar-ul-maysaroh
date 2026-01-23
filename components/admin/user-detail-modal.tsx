// src/components/admin/user-detail-modal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  Mail,
  Phone,
  Calendar,
  User,
  BookOpen,
  GraduationCap,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  MessageSquare,
} from "lucide-react";

interface UserDetailModalProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailModal({
  user,
  open,
  onOpenChange,
}: UserDetailModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "STUDENT":
        return "bg-blue-100 text-blue-800";
      case "TEACHER":
        return "bg-purple-100 text-purple-800";
      case "PARENT":
        return "bg-green-100 text-green-800";
      case "ADMIN":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info Header */}
          <div className="rounded-lg bg-gradient-primary p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full border-4 border-white/20 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-purple-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.toLowerCase()}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status.toLowerCase()}
                  </Badge>
                  {user.teacherProfile?.qualification && (
                    <Badge
                      variant="outline"
                      className="border-white/30 text-white"
                    >
                      {user.teacherProfile.qualification}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <User className="mr-2 h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-medium">{user.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Registered
                  </p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last Login
                  </p>
                  <p className="font-medium">
                    {user.lastLogin
                      ? formatDate(user.lastLogin)
                      : "Never logged in"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Role-Specific Information */}
          {user.studentProfile && (
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-semibold">
                <BookOpen className="mr-2 h-5 w-5" />
                Student Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Student ID
                  </p>
                  <p className="font-medium">{user.studentProfile.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gender
                  </p>
                  <p className="font-medium capitalize">
                    {user.studentProfile.gender?.toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date of Birth
                  </p>
                  <p className="font-medium">
                    {user.studentProfile.dateOfBirth
                      ? formatDate(user.studentProfile.dateOfBirth)
                      : "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enrollment Date
                  </p>
                  <p className="font-medium">
                    {formatDate(user.studentProfile.enrollmentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Hifz Level
                  </p>
                  <p className="font-medium">
                    {user.studentProfile.hifzLevel || "Not started"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tajweed Level
                  </p>
                  <p className="font-medium">
                    {user.studentProfile.tajweedLevel || "Not assessed"}
                  </p>
                </div>
                {user.studentProfile.parent && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Parent/Guardian
                    </p>
                    <p className="font-medium">
                      {user.studentProfile.parent.user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.studentProfile.parent.user.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {user.teacherProfile && (
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-semibold">
                <GraduationCap className="mr-2 h-5 w-5" />
                Teacher Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Teacher ID
                  </p>
                  <p className="font-medium">{user.teacherProfile.teacherId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Qualification
                  </p>
                  <p className="font-medium">
                    {user.teacherProfile.qualification || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Specialization
                  </p>
                  <p className="font-medium">
                    {user.teacherProfile.specialization || "General"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Experience
                  </p>
                  <p className="font-medium">
                    {user.teacherProfile.experienceYears || 0} year(s)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Joining Date
                  </p>
                  <p className="font-medium">
                    {formatDate(user.teacherProfile.joiningDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </p>
                  <Badge
                    className={
                      user.teacherProfile.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {user.teacherProfile.isAvailable
                      ? "Available"
                      : "Not Available"}
                  </Badge>
                </div>
                {user.teacherProfile.bio && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bio
                    </p>
                    <p className="font-medium">{user.teacherProfile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {user.parentProfile && (
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-semibold">
                <Shield className="mr-2 h-5 w-5" />
                Parent Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Occupation
                  </p>
                  <p className="font-medium">
                    {user.parentProfile.occupation || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Employer
                  </p>
                  <p className="font-medium">
                    {user.parentProfile.employer || "Not provided"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Students
                  </p>
                  <div className="mt-2 space-y-2">
                    {user.parentProfile.students?.map((student: any) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                      >
                        <div>
                          <p className="font-medium">{student.user.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Student ID: {student.studentId}
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          {student.currentLevel || "Not assigned"}
                        </Badge>
                      </div>
                    )) || (
                      <p className="text-gray-600 dark:text-gray-400">
                        No students linked
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Approval History */}
          {(user.approvedAt || user.rejectionReason) && (
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-semibold">
                {user.status === "APPROVED" ? (
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="mr-2 h-5 w-5 text-red-600" />
                )}
                Approval History
              </h3>
              <div className="space-y-4">
                {user.approvedAt && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Approved</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        by {user.approvedBy?.name || "System"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(user.approvedAt)}
                    </p>
                  </div>
                )}
                {user.rejectionReason && (
                  <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                    <p className="font-medium text-red-800 dark:text-red-400">
                      Rejection Reason
                    </p>
                    <p className="mt-1 text-red-700 dark:text-red-300">
                      {user.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes/Comments */}
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
            <h3 className="mb-4 flex items-center text-lg font-semibold">
              <MessageSquare className="mr-2 h-5 w-5" />
              Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No notes added yet. Add internal notes about this user for
              reference.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {user.status === "PENDING" && (
            <Button className="bg-gradient-primary">Process Approval</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
