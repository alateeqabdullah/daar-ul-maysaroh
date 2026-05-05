// app/(portal)/dashboard/admin/groups/[id]/members/manage-members-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  UserPlus,
  Trash2,
  X,
  Loader2,
  Search,
  CheckCircle,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  addGroupMember,
  removeGroupMember,
  updateMemberRole,
} from "../../../actions/groups";

interface GroupWithRelations {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
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
}

interface AvailableStudent {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

interface ManageMembersClientProps {
  group: GroupWithRelations;
  availableStudents: AvailableStudent[];
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ManageMembersClient({
  group,
  availableStudents: initialAvailable,
}: ManageMembersClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedRole, setSelectedRole] = useState("MEMBER");
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const filteredStudents = initialAvailable.filter(
    (student) =>
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddMember = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }

    setIsLoading(true);
    try {
      await addGroupMember({
        groupId: group.id,
        studentId: selectedStudent,
        role: selectedRole as any,
      });
      toast.success("Member added successfully");
      setOpenAddDialog(false);
      setSelectedStudent("");
      setSelectedRole("MEMBER");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add member",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (studentId: string, studentName: string) => {
    if (!confirm(`Remove ${studentName} from this group?`)) return;

    setIsLoading(true);
    try {
      await removeGroupMember(group.id, studentId);
      toast.success("Member removed successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRole = async (studentId: string, newRole: string) => {
    setIsLoading(true);
    try {
      await updateMemberRole(group.id, studentId, newRole as any);
      toast.success("Role updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update role");
    } finally {
      setIsLoading(false);
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
              Group Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                {group.name} - Members
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage group members | Capacity: {group.currentCount}/
                {group.capacity}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/groups/${group.id}`}>
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Group
                </Button>
              </Link>
              <Button
                onClick={() => setOpenAddDialog(true)}
                disabled={group.currentCount >= group.capacity}
                className="rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Group Members</CardTitle>
            <CardDescription>Students currently in this group</CardDescription>
          </CardHeader>
          <CardContent>
            {group.members.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No members yet</p>
                <p className="text-sm">Click "Add Member" to add students</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
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
                      <TableCell className="font-mono text-sm">
                        {member.studentId}
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={member.role}
                          onValueChange={(v) =>
                            handleUpdateRole(member.studentId, v)
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-28 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LEADER">Leader</SelectItem>
                            <SelectItem value="ASSISTANT">Assistant</SelectItem>
                            <SelectItem value="MEMBER">Member</SelectItem>
                            <SelectItem value="MONITOR">Monitor</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-black">
                          {member.groupProgress || 0}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveMember(
                              member.studentId,
                              member.studentName,
                            )
                          }
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-lg"
                />
              </div>
              <div className="max-h-60 overflow-y-auto border rounded-lg mt-2">
                {filteredStudents.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No available students found
                  </div>
                ) : (
                  filteredStudents.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student.id)}
                      className={cn(
                        "w-full p-3 text-left flex items-center justify-between hover:bg-slate-50 transition-colors",
                        selectedStudent === student.id && "bg-purple-50",
                      )}
                    >
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                      {selectedStudent === student.id && (
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
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
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              disabled={!selectedStudent || isLoading}
              className="bg-purple-600"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
