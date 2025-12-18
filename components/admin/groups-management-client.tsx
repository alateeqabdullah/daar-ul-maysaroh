// src/components/admin/groups-management-client.tsx
"use client";

import { useState } from "react";
import {
  Users2,
  Plus,
  Search,
  Edit,
  Trash2,
  UserPlus,
  Calendar,
  BookOpen,
  GraduationCap,
  MoreVertical,
  X,
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

interface GroupsManagementClientProps {
  initialGroups: any[];
  teachers: any[];
  students: any[];
  classes: any[];
}

export default function GroupsManagementClient({
  initialGroups,
  teachers,
  students,
  classes,
}: GroupsManagementClientProps) {
  const [groups, setGroups] = useState(initialGroups);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    type: "ACADEMIC",
    academicYear: "2024-2025",
    capacity: 20,
    teacherId: "",
    classId: "none", // Initialized as "none" for the Select component
    isActive: true,
  });

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = async () => {
    if (!newGroup.name.trim()) {
      toast.error("Group name is required");
      return;
    }

    setIsLoading(true);
    try {
      // Convert "none" back to null/empty before sending to server
      const payload = {
        ...newGroup,
        classId: newGroup.classId === "none" ? null : newGroup.classId,
      };

      const response = await fetch("/api/admin/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create group");
      }

      toast.success("Group created successfully");
      setGroups([data.group, ...groups]);
      setIsCreateDialogOpen(false);
      resetNewGroup();
    } catch (error) {
      toast.error("Failed to create group", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm("Are you sure you want to delete this group?")) return;

    try {
      const response = await fetch(`/api/admin/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete group");
      }

      toast.success("Group deleted successfully");
      setGroups(groups.filter((g) => g.id !== groupId));
    } catch (error) {
      toast.error("Failed to delete group", {
        description: "Please try again.",
      });
    }
  };

  const handleAddMember = async (groupId: string, studentId: string) => {
    try {
      const response = await fetch(`/api/admin/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add member");
      }

      toast.success("Member added successfully");

      setGroups(
        groups.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              members: [...group.members, data.member],
            };
          }
          return group;
        })
      );
    } catch (error) {
      toast.error("Failed to add member", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleRemoveMember = async (groupId: string, memberId: string) => {
    try {
      const response = await fetch(
        `/api/admin/groups/${groupId}/members/${memberId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove member");
      }

      toast.success("Member removed successfully");

      setGroups(
        groups.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              members: group.members.filter((m: any) => m.id !== memberId),
            };
          }
          return group;
        })
      );
    } catch (error) {
      toast.error("Failed to remove member", {
        description: "Please try again.",
      });
    }
  };

  const resetNewGroup = () => {
    setNewGroup({
      name: "",
      description: "",
      type: "ACADEMIC",
      academicYear: "2024-2025",
      capacity: 20,
      teacherId: "",
      classId: "none",
      isActive: true,
    });
  };

  const groupTypes = [
    {
      value: "ACADEMIC",
      label: "Academic",
      color: "bg-blue-100 text-blue-800",
    },
    { value: "HIFZ", label: "Hifz", color: "bg-purple-100 text-purple-800" },
    {
      value: "REVISION",
      label: "Revision",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "SUPPORT",
      label: "Support",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "PROJECT",
      label: "Project",
      color: "bg-indigo-100 text-indigo-800",
    },
    { value: "SOCIAL", label: "Social", color: "bg-pink-100 text-pink-800" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Groups
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage student groups and learning communities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={(open) => {
              setIsCreateDialogOpen(open);
              if (!open) resetNewGroup();
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>
                  Create a new student group for specialized learning
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Group Name *</Label>
                    <Input
                      id="name"
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      placeholder="e.g., Hifz Excellence Group"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Group Type *</Label>
                    <Select
                      value={newGroup.type}
                      onValueChange={(value) =>
                        setNewGroup({ ...newGroup, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {groupTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGroup.description}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, description: e.target.value })
                    }
                    placeholder="Describe the purpose and goals of this group..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={newGroup.academicYear}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          academicYear: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={newGroup.capacity}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          capacity: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher">Supervising Teacher</Label>
                    <Select
                      value={newGroup.teacherId}
                      onValueChange={(value) =>
                        setNewGroup({ ...newGroup, teacherId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers
                          .filter((t) => t.id)
                          .map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.user.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Parent Class (Optional)</Label>
                    <Select
                      value={newGroup.classId}
                      onValueChange={(value) =>
                        setNewGroup({ ...newGroup, classId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Fix: Non-empty string for placeholder value */}
                        <SelectItem value="none">
                          None (Independent Group)
                        </SelectItem>
                        {classes
                          .filter((c) => c.id)
                          .map((classItem) => (
                            <SelectItem key={classItem.id} value={classItem.id}>
                              {classItem.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={newGroup.isActive}
                    onCheckedChange={(checked) =>
                      setNewGroup({ ...newGroup, isActive: checked })
                    }
                  />
                  <Label htmlFor="active">Active Group</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup} disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Group"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredGroups.map((group) => {
          const groupType = groupTypes.find((t) => t.value === group.type);

          return (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge className={groupType?.color}>
                        {groupType?.label}
                      </Badge>
                      {!group.isActive && (
                        <Badge variant="outline" className="text-gray-500">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {group.description || "No description"}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedGroup(group);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Academic Year:</span>
                      <span className="font-medium">{group.academicYear}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">
                        {group.members?.length || 0} / {group.capacity} members
                      </span>
                    </div>
                    {group.teacher?.user && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Supervisor:</span>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">
                              {getInitials(group.teacher.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {group.teacher.user.name}
                          </span>
                        </div>
                      </div>
                    )}
                    {group.class && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Parent Class:</span>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {group.class.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-medium">Members</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                          >
                            <UserPlus className="mr-1 h-3 w-3" />
                            Add Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>
                              Add Members to {group.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="max-h-96 overflow-y-auto py-4">
                            <div className="space-y-2">
                              {students
                                .filter(
                                  (s) =>
                                    s.id &&
                                    !group.members?.some(
                                      (m: any) => m.studentId === s.id
                                    )
                                )
                                .map((student) => (
                                  <div
                                    key={student.id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <Avatar>
                                        <AvatarFallback>
                                          {getInitials(student.user.name)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">
                                          {student.user.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {student.studentId}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleAddMember(group.id, student.id)
                                      }
                                    >
                                      Add
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-2">
                      {group.members?.slice(0, 3).map((member: any) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between rounded-lg border p-2"
                        >
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {getInitials(member.student.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {member.student.user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.student.studentId}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-red-600"
                            onClick={() =>
                              handleRemoveMember(group.id, member.id)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {group.members?.length > 3 && (
                        <p className="text-center text-sm text-gray-500">
                          + {group.members.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" /> Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <GraduationCap className="mr-2 h-4 w-4" /> Assignments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGroups.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users2 className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold">No groups found</h3>
            <Button
              className="mt-4 bg-gradient-primary gap-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" /> Create Group
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
