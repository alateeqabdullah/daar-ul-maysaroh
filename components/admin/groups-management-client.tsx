"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  GraduationCap,
  Loader2,
  Layers,
  UserPlus,
  X,
  UserX,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";
import { ScrollArea } from "@radix-ui/react-scroll-area";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

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
  const router = useRouter();
  const [groups, setGroups] = useState(initialGroups);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "ACADEMIC",
    capacity: "20",
    teacherId: "",
    classId: "",
    academicYear:
      new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
  });

  // Filter Logic
  const filteredGroups = groups.filter((g) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      g.name.toLowerCase().includes(term) ||
      g.teacher?.user.name.toLowerCase().includes(term);
    const matchesType = filterType === "ALL" || g.type === filterType;
    return matchesSearch && matchesType;
  });

  // --- ACTIONS ---

  const handleCreateOrUpdate = async () => {
    if (!formData.name || !formData.teacherId)
      return toast.error("Name and Teacher are required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/groups/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          groupId: selectedGroup?.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        setGroups((prev) =>
          prev.map((g) => (g.id === selectedGroup.id ? result.group : g))
        );
        toast.success("Group updated successfully");
      } else {
        setGroups([result.group, ...groups]);
        toast.success("Group created successfully");
      }
      setIsAddModalOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (groupId: string) => {
    if (!confirm("Delete this group? This cannot be undone.")) return;

    const originalGroups = [...groups];
    setGroups((prev) => prev.filter((g) => g.id !== groupId)); // Optimistic delete

    try {
      const res = await fetch("/api/admin/groups/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", groupId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Group deleted");
    } catch {
      setGroups(originalGroups); // Revert
      toast.error("Delete failed");
    }
  };

  const handleMemberAction = async (
    action: "ADD_MEMBER" | "REMOVE_MEMBER",
    studentId: string
  ) => {
    try {
      const res = await fetch("/api/admin/groups/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, groupId: selectedGroup.id, studentId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      const updatedGroup = result.group;
      setGroups((prev) =>
        prev.map((g) => (g.id === selectedGroup.id ? updatedGroup : g))
      );
      setSelectedGroup(updatedGroup);

      toast.success(
        action === "ADD_MEMBER" ? "Student added" : "Student removed"
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to update members");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "ACADEMIC",
      capacity: "20",
      teacherId: "",
      classId: "",
      academicYear:
        new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    });
    setIsEditing(false);
    setSelectedGroup(null);
  };

  const openEdit = (group: any) => {
    setSelectedGroup(group);
    setFormData({
      name: group.name,
      description: group.description || "",
      type: group.type,
      capacity: group.capacity.toString(),
      teacherId: group.teacherId,
      classId: group.classId || "none",
      academicYear: group.academicYear,
    });
    setIsEditing(true);
    setIsAddModalOpen(true);
  };

  const stats = [
    {
      label: "Total Groups",
      value: groups.length,
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Total Students",
      value: groups.reduce((acc, g) => acc + (g.members?.length || 0), 0),
      icon: Users,
      color: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Active Teachers",
      value: new Set(groups.map((g) => g.teacherId)).size,
      icon: GraduationCap,
      color: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Groups Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage halqahs, study circles, and classes
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/20 hover:scale-105 transition-all gap-2"
        >
          <Plus className="h-4 w-4" /> Create Group
        </Button>
      </div>

      {/* STATS */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-3"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
              />
              <CardContent className="p-6 relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                  <div className="text-3xl font-bold mt-2">
                    <Counter value={stat.value} />
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* FILTERS */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups or teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="ACADEMIC">Academic</SelectItem>
            <SelectItem value="HIFZ">Hifz</SelectItem>
            <SelectItem value="REVISION">Revision</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* GROUPS GRID */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredGroups.map((group) => (
          <motion.div
            key={group.id}
            variants={itemVariants}
            layoutId={group.id}
          >
            <Card className="group h-full border hover:border-purple-200 dark:hover:border-purple-900 transition-all hover:shadow-md bg-card">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                      {group.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-none">
                        {group.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {group.members?.length || 0} / {group.capacity} Students
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedGroup(group);
                          setIsMembersModalOpen(true);
                        }}
                      >
                        <Users className="mr-2 h-4 w-4" /> Manage Members
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEdit(group)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Group
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(group.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {group.type}
                  </Badge>
                  {group.class && (
                    <Badge variant="outline" className="text-xs">
                      {group.class.name}
                    </Badge>
                  )}
                </div>

                {/* Teacher Info */}
                <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={group.teacher?.user.image} />
                    <AvatarFallback>
                      {getInitials(group.teacher?.user.name || "T")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-medium">
                    {group.teacher?.user.name || "Unassigned"}
                  </p>
                </div>

                {/* Progress / Footer */}
                <div className="mt-auto pt-4 border-t flex justify-between items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    {group.members &&
                      group.members.slice(0, 4).map((m: any) => (
                        <Avatar
                          key={m.id}
                          className="inline-block h-6 w-6 ring-2 ring-background"
                        >
                          <AvatarImage src={m.student.user.image} />
                          <AvatarFallback className="text-[9px]">
                            {getInitials(m.student.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    {group.members && group.members.length > 4 && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-background bg-muted text-[9px] font-medium">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-purple-600 hover:text-purple-700"
                    onClick={() => {
                      setSelectedGroup(group);
                      setIsMembersModalOpen(true);
                    }}
                  >
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* --- ADD/EDIT MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-background w-full max-w-md rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {isEditing ? "Edit Group" : "Create New Group"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>Group Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Quran Hifz Circle A"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) =>
                        setFormData({ ...formData, type: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACADEMIC">Academic</SelectItem>
                        <SelectItem value="HIFZ">Hifz</SelectItem>
                        <SelectItem value="REVISION">Revision</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Teacher</Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(v) =>
                      setFormData({ ...formData, teacherId: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Link to Class (Optional)</Label>
                  <Select
                    value={formData.classId || "none"}
                    onValueChange={(v) =>
                      setFormData({
                        ...formData,
                        classId: v === "none" ? "" : v,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Academic Year</Label>
                  <Input
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                  />
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Create Group"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MANAGE MEMBERS MODAL --- */}
      <AnimatePresence>
        {isMembersModalOpen && selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-background w-full max-w-2xl h-[600px] flex flex-col rounded-2xl shadow-2xl border overflow-hidden"
            >
              <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Manage Members</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedGroup.name} • {selectedGroup.members?.length || 0}{" "}
                    Students
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsMembersModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 flex overflow-hidden">
                {/* Left: Add Student */}
                <div className="w-1/2 p-4 border-r flex flex-col">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" /> Add Student
                  </h3>
                  <Input placeholder="Search students..." className="mb-3" />
                  <ScrollArea className="flex-1">
                    <div className="space-y-2">
                      {students
                        .filter(
                          (s) =>
                            !selectedGroup.members?.some(
                              (m: any) => m.studentId === s.id
                            )
                        )
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.user.image} />
                                <AvatarFallback>
                                  {getInitials(student.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">
                                {student.user.name}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleMemberAction("ADD_MEMBER", student.id)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Right: Current Members */}
                <div className="w-1/2 p-4 flex flex-col">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Current Members
                  </h3>
                  <ScrollArea  className="flex-1">
                    <div className="space-y-2">
                      {selectedGroup.members?.map((member: any) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-2 rounded-lg border bg-muted/20"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.student.user.image} />
                              <AvatarFallback>
                                {getInitials(member.student.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {member.student.user.name}
                            </span>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() =>
                              handleMemberAction(
                                "REMOVE_MEMBER",
                                member.studentId
                              )
                            }
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {(!selectedGroup.members ||
                        selectedGroup.members.length === 0) && (
                        <div className="text-center text-sm text-muted-foreground py-10">
                          No members yet.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
