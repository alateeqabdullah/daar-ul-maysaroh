// app/(portal)/dashboard/admin/groups/[id]/view-group-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Users,
  Calendar,
  Clock,
  UserPlus,
  Loader2,
  CheckCircle,
  XCircle,
  Video,
  MapPin,
  BookOpen,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteGroup,
  removeGroupMember,
  updateMemberRole,
} from "../../actions/groups";
import { GroupType } from "@/app/generated/prisma/enums";
import { Label } from "@/components/ui/label";

interface GroupWithRelations {
  id: string;
  name: string;
  description: string | null;
  type: GroupType;
  academicYear: string;
  term: string | null;
  capacity: number;
  currentCount: number;
  teacherId: string | null;
  assistantTeacherId: string | null;
  classId: string | null;
  scheduleType: string;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  teacher?: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
  assistantTeacher?: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
  class?: {
    id: string;
    name: string;
    code: string;
    level: string;
  };
  schedules: Array<{
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isOnline: boolean;
    meetingUrl: string | null;
    physicalLocation: string | null;
  }>;
  members: Array<{
    id: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    joinedAt: Date;
    role: string;
    status: string;
    groupProgress: number | null;
  }>;
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: Date;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    dueDate: Date;
    totalMarks: number;
  }>;
}

interface ViewGroupClientProps {
  group: GroupWithRelations;
}

const TYPE_COLORS: Record<GroupType, string> = {
  ACADEMIC:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  HIFZ: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  REVISION: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  SUPPORT:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  PROJECT: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  COMPETITION:
    "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  SOCIAL:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getDayName = (day: number) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
};

export function ViewGroupClient({ group }: ViewGroupClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<
    (typeof group.members)[0] | null
  >(null);
  const [newRole, setNewRole] = useState("");

  const typeColor = TYPE_COLORS[group.type];
  const memberRate = (group.currentCount / group.capacity) * 100;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGroup(group.id);
      toast.success("Group deleted successfully");
      router.push("/dashboard/admin/groups");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete group");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const handleRemoveMember = async (studentId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    try {
      await removeGroupMember(group.id, studentId);
      toast.success("Member removed successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove member");
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedMember || !newRole) return;

    try {
      await updateMemberRole(
        group.id,
        selectedMember.studentId,
        newRole as any,
      );
      toast.success("Member role updated successfully");
      setOpenMemberDialog(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Group Details
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                {group.name}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {group.description || "No description provided"}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/groups">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href={`/dashboard/admin/groups/${group.id}/edit`}>
                <Button
                  variant="outline"
                  className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => setOpenDeleteDialog(true)}
                variant="outline"
                className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge className={cn("mt-1", typeColor)}>{group.type}</Badge>
                </div>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-black">
                    {group.currentCount} / {group.capacity}
                  </p>
                </div>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <Progress value={memberRate} className="mt-2 h-1" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {group.isActive ? (
                    <Badge className="mt-1 bg-emerald-100 text-emerald-700">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="mt-1 bg-gray-100 text-gray-600">
                      Inactive
                    </Badge>
                  )}
                </div>
                {group.isActive ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-sm font-medium mt-1">
                    {formatDate(group.createdAt)}
                  </p>
                </div>
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger
              value="members"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Details
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Group Members</CardTitle>
                  <CardDescription>
                    Students enrolled in this group
                  </CardDescription>
                </div>
                <Link href={`/dashboard/admin/groups/${group.id}/members/add`}>
                  <Button
                    size="sm"
                    className="rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {group.members.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No members yet</p>
                    <p className="text-sm">Add students to this group</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-purple-100 text-purple-600">
                                  {getInitials(member.studentName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-black text-sm">
                                  {member.studentName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {member.studentEmail}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(member.joinedAt)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{member.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black">
                                {member.groupProgress || 0}%
                              </span>
                              <Progress
                                value={member.groupProgress || 0}
                                className="w-20 h-1.5"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setNewRole(member.role);
                                  setOpenMemberDialog(true);
                                }}
                              >
                                <User className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveMember(member.studentId)
                                }
                                className="text-red-500"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Schedule</CardTitle>
                <CardDescription>
                  Regular meeting times for this group
                </CardDescription>
              </CardHeader>
              <CardContent>
                {group.schedules.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No schedule set</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {group.schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="font-black">
                            {getDayName(schedule.dayOfWeek)} •{" "}
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {schedule.isOnline ? (
                            <>
                              <Video className="w-3.5 h-3.5" />
                              <span>Online Meeting</span>
                              {schedule.meetingUrl && (
                                <a
                                  href={schedule.meetingUrl}
                                  target="_blank"
                                  className="text-purple-600 hover:underline ml-2"
                                >
                                  Join Link
                                </a>
                              )}
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3.5 h-3.5" />
                              <span>
                                {schedule.physicalLocation || "Location TBD"}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Group Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Name
                    </p>
                    <p className="text-base">{group.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Description
                    </p>
                    <p className="text-base text-muted-foreground">
                      {group.description || "No description"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Academic Year
                    </p>
                    <p className="text-base">{group.academicYear}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Term
                    </p>
                    <p className="text-base">{group.term || "Not specified"}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Supervision</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-black text-muted-foreground">
                        Supervising Teacher
                      </p>
                      {group.teacher ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                              {getInitials(group.teacher.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {group.teacher.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {group.teacher.user.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground mt-1">
                          Not assigned
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-muted-foreground">
                        Assistant Teacher
                      </p>
                      {group.assistantTeacher ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                              {getInitials(group.assistantTeacher.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {group.assistantTeacher.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {group.assistantTeacher.user.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground mt-1">
                          Not assigned
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-muted-foreground">
                        Associated Class
                      </p>
                      {group.class ? (
                        <div className="mt-1">
                          <p className="font-medium">{group.class.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.class.code} • {group.class.level}
                          </p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground mt-1">
                          Not associated
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {group.announcements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Announcements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {group.announcements.slice(0, 3).map((announcement) => (
                        <div
                          key={announcement.id}
                          className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                        >
                          <p className="font-medium text-sm">
                            {announcement.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {announcement.content}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {formatDate(announcement.createdAt)}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{group.name}"? This action will
              also remove all members from the group. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Role Dialog */}
      <Dialog open={openMemberDialog} onOpenChange={setOpenMemberDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Member Role</DialogTitle>
            <DialogDescription>
              Change role for {selectedMember?.studentName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEADER">Leader</SelectItem>
                  <SelectItem value="ASSISTANT">Assistant</SelectItem>
                  <SelectItem value="MEMBER">Member</SelectItem>
                  <SelectItem value="MONITOR">Monitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenMemberDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRole}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
