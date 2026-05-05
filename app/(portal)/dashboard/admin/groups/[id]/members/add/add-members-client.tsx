// app/(portal)/dashboard/admin/groups/[id]/members/add/add-members-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  UserPlus,
  Loader2,
  Search,
  CheckCircle,
  XCircle,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { addGroupMember } from "../../../../actions/groups";

interface GroupWithRelations {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  classId: string | null;
}

interface AvailableStudent {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

interface AddMembersClientProps {
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

export function AddMembersClient({ group, availableStudents: initialAvailable }: AddMembersClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [selectedRole, setSelectedRole] = useState("MEMBER");

  const remainingCapacity = group.capacity - group.currentCount;

  const filteredStudents = initialAvailable.filter((student) =>
    searchQuery === "" ||
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      if (selectedStudents.size >= remainingCapacity) {
        toast.error(`Cannot add more than ${remainingCapacity} student(s)`);
        return;
      }
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const handleAddMembers = async () => {
    if (selectedStudents.size === 0) {
      toast.error("Please select at least one student");
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    for (const studentId of selectedStudents) {
      try {
        await addGroupMember({
          groupId: group.id,
          studentId,
          role: selectedRole as any,
        });
        successCount++;
      } catch (error) {
        failCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} student(s) added successfully`);
    }
    if (failCount > 0) {
      toast.error(`${failCount} student(s) failed to add`);
    }

    router.push(`/dashboard/admin/groups/${group.id}`);
    router.refresh();
  };

  const memberRate = (group.currentCount / group.capacity) * 100;

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
                Add Members to {group.name}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Select students to add to this group
              </p>
            </div>
            <Link href={`/dashboard/admin/groups/${group.id}`}>
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Group
              </Button>
            </Link>
          </div>
        </div>

        {/* Capacity Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-black">Group Capacity</span>
              <span className="text-sm font-black">{group.currentCount} / {group.capacity}</span>
            </div>
            <Progress value={memberRate} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {remainingCapacity} slot(s) available
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Student List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Students</CardTitle>
                <CardDescription>
                  Select students to add to this group
                  {group.classId && (
                    <Badge variant="outline" className="ml-2">
                      Filtered by class
                    </Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 rounded-lg"
                  />
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredStudents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No available students found</p>
                      {group.classId && (
                        <p className="text-sm">Only students from the associated class can be added</p>
                      )}
                    </div>
                  ) : (
                    filteredStudents.map((student) => {
                      const isSelected = selectedStudents.has(student.id);
                      return (
                        <button
                          key={student.id}
                          onClick={() => toggleSelectStudent(student.id)}
                          disabled={!isSelected && selectedStudents.size >= remainingCapacity}
                          className={cn(
                            "w-full p-3 rounded-lg flex items-center justify-between transition-all",
                            isSelected
                              ? "bg-purple-50 border border-purple-200"
                              : "hover:bg-slate-50 border border-transparent",
                            !isSelected && selectedStudents.size >= remainingCapacity && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {getInitials(student.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                              <p className="font-black text-sm">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                              <p className="text-xs text-muted-foreground font-mono">ID: {student.studentId}</p>
                            </div>
                          </div>
                          {isSelected ? (
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          ) : (
                            <UserPlus className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selection Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Selection Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Selected Students</p>
                  <p className="text-3xl font-black text-purple-600">{selectedStudents.size}</p>
                  <p className="text-xs text-muted-foreground">of {remainingCapacity} available slots</p>
                </div>

                <div className="space-y-2">
                  <Label>Default Role</Label>
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
                  <p className="text-xs text-muted-foreground">
                    All selected students will be added with this role
                  </p>
                </div>

                <Button
                  onClick={handleAddMembers}
                  disabled={selectedStudents.size === 0 || isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4 mr-2" />
                  )}
                  Add {selectedStudents.size} Member(s)
                </Button>

                {selectedStudents.size > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-xs font-black mb-2">Selected Students:</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {Array.from(selectedStudents).map((studentId) => {
                        const student = initialAvailable.find(s => s.id === studentId);
                        return (
                          <div key={studentId} className="flex items-center justify-between text-xs">
                            <span>{student?.name}</span>
                            <button
                              onClick={() => toggleSelectStudent(studentId)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-4 border-amber-200 bg-amber-50/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-amber-700">Note</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Students can only be added if they are not already in the group.
                      {group.classId && " Only students from the associated class are shown."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}