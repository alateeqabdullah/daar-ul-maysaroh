"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  X,
  User,
  Shield,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Wallet,
  CheckCircle,
  Ban,
  GraduationCap,
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

interface ParentsManagementClientProps {
  initialParents: any[];
  stats: any;
  pagination: any;
}

export default function ParentsManagementClient({
  initialParents,
  stats,
  pagination,
}: ParentsManagementClientProps) {
  const router = useRouter();
  const [parents, setParents] = useState(initialParents);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
  });

  // Filter Logic
  const filteredParents = parents.filter((p) => {
    const term = searchQuery.toLowerCase();
    return (
      p.user.name.toLowerCase().includes(term) ||
      p.user.email.toLowerCase().includes(term) ||
      p.user.phone?.toLowerCase().includes(term)
    );
  });

  // --- ACTIONS ---
  const handleCreateOrUpdate = async () => {
    if (!formData.name || !formData.email)
      return toast.error("Name and Email required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/parents/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          parentId: selectedParent?.id,
          userId: selectedParent?.user.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        const updatedParent = {
          ...selectedParent,
          ...result.parentProfile,
          user: {
            ...selectedParent.user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        };
        setParents((prev) =>
          prev.map((p) => (p.id === selectedParent.id ? updatedParent : p))
        );
        setSelectedParent(updatedParent);
        toast.success("Profile updated");
        setIsEditing(false);
      } else {
        setParents([result.parent, ...parents]);
        toast.success("Parent created");
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (
    parentId: string,
    userId: string,
    newStatus: string
  ) => {
    setParents((prev) =>
      prev.map((p) =>
        p.id === parentId ? { ...p, user: { ...p.user, status: newStatus } } : p
      )
    );
    try {
      await fetch("/api/admin/users/manage", {
        method: "POST",
        body: JSON.stringify({
          action: "UPDATE_STATUS",
          userId,
          data: { status: newStatus },
        }),
      });
      toast.success(`Parent marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
      router.refresh();
    }
  };

  const handleDelete = async (parentId: string, userId: string) => {
    if (!confirm("Delete parent? usage history will be lost.")) return;
    setParents((prev) => prev.filter((p) => p.id !== parentId));
    setIsDetailOpen(false);
    try {
      await fetch("/api/admin/parents/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", parentId, userId }),
      });
      toast.success("Parent deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      occupation: "",
      address: "",
    });
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openDetail = (p: any) => {
    setSelectedParent(p);
    setFormData({
      name: p.user.name,
      email: p.user.email,
      phone: p.user.phone || "",
      occupation: p.occupation || "",
      address: p.address || "",
    });
    setIsDetailOpen(true);
    setIsEditing(false);
  };

  const statCards = [
    {
      label: "Total Parents",
      value: stats.totalParents,
      icon: Users,
      color: "from-emerald-500 to-green-600",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Linked Students",
      value: stats.linkedStudents,
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Fees Pending",
      value: "12",
      icon: Wallet,
      color: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
    }, // Mock data for now
    {
      label: "Suspended",
      value: stats.suspended,
      icon: Ban,
      color: "from-red-500 to-rose-500",
      shadow: "shadow-red-500/20",
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
            Parent Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage guardians, families and finances
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-muted p-1 rounded-lg border">
            <Button
              size="icon"
              variant={viewMode === "grid" ? "white" : "ghost"}
              className={`h-7 w-7 rounded-md ${
                viewMode === "grid" ? "shadow-sm" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={viewMode === "list" ? "white" : "ghost"}
              className={`h-7 w-7 rounded-md ${
                viewMode === "list" ? "shadow-sm" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-105 transition-all"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Parent
          </Button>
        </div>
      </div>

      {/* STATS */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => (
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
                  <div className="text-2xl font-bold mt-2">
                    <Counter
                      value={
                        typeof stat.value === "string"
                          ? parseInt(stat.value)
                          : stat.value
                      }
                    />
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
            placeholder="Search parents by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950"
          />
        </div>
      </motion.div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredParents.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              layoutId={p.id}
              onClick={() => openDetail(p)}
              className="cursor-pointer"
            >
              <Card
                className={`group h-full border hover:border-emerald-300 dark:hover:border-emerald-800 transition-all hover:shadow-xl bg-card ${
                  p.user.status === "SUSPENDED" ? "opacity-70 grayscale" : ""
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-lg">
                      <AvatarImage src={p.user.image} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600">
                        {getInitials(p.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-sm whitespace-nowrap bg-white text-foreground hover:bg-white dark:bg-slate-800 border-emerald-100 text-emerald-700">
                      {p.studentsCount} Kids
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg mt-2">{p.user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {p.occupation || "Guardian"}
                  </p>

                  <div className="mt-auto w-full pt-4 border-t flex justify-between items-center text-xs text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {p.user.phone || "No Phone"}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-auto p-0 hover:text-emerald-600"
                        >
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDetail(p)}>
                          <Edit className="mr-2 h-4 w-4" /> View / Edit
                        </DropdownMenuItem>
                        {p.user.status === "APPROVED" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(p.id, p.user.id, "SUSPENDED")
                            }
                          >
                            <Ban className="mr-2 h-4 w-4 text-amber-500" />{" "}
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(p.id, p.user.id, "APPROVED")
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(p.id, p.user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* LIST VIEW */
        <motion.div variants={containerVariants}>
          <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left">Parent</th>
                      <th className="px-6 py-4 text-left">Contact</th>
                      <th className="px-6 py-4 text-left">Children</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredParents.map((p) => (
                      <motion.tr
                        key={p.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => openDetail(p)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={p.user.image} />
                              <AvatarFallback>
                                {getInitials(p.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{p.user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {p.occupation}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-xs">{p.user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.user.phone || "-"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">
                            {p.studentsCount} Students
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {p.user.status === "APPROVED" ? (
                            <Badge className="bg-green-100 text-green-700">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Suspended</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openDetail(p)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(p.id, p.user.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* --- ADD MODAL --- */}
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
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add Parent</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Occupation</Label>
                  <Input
                    value={formData.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Address</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Create Parent Account"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {isDetailOpen && selectedParent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDetailOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
            >
              {/* Profile Header */}
              <div className="h-40 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex items-end relative shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="flex items-end gap-6 relative top-8 w-full">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={selectedParent.user.image} />
                    <AvatarFallback className="text-4xl bg-muted">
                      {getInitials(selectedParent.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-8 text-white">
                    <h2 className="text-3xl font-bold">
                      {selectedParent.user.name}
                    </h2>
                    <p className="opacity-90 font-mono text-sm bg-black/20 px-2 py-1 rounded inline-block mt-1">
                      Parent ID: {selectedParent.id.slice(-6)}
                    </p>
                  </div>
                  <div className="ml-auto mb-8 flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "View Mode" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-muted/10 p-6 pt-12">
                {isEditing ? (
                  <div className="max-w-2xl mx-auto space-y-4">
                    <div className="space-y-1">
                      <Label>Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Email</Label>
                        <Input
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Occupation</Label>
                      <Input
                        value={formData.occupation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            occupation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Address</Label>
                      <Input
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleCreateOrUpdate}
                      disabled={isLoading}
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="children">
                        Children ({selectedParent.studentsCount})
                      </TabsTrigger>
                      <TabsTrigger value="finance">Finance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Shield className="h-4 w-4 text-emerald-600" />{" "}
                              Contact Info
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                  Email
                                </span>{" "}
                                <span>{selectedParent.user.email}</span>
                              </div>
                              <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                  Phone
                                </span>{" "}
                                <span>{selectedParent.user.phone || "-"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Address
                                </span>{" "}
                                <span>{selectedParent.address || "-"}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-blue-600" />{" "}
                              Employment
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Occupation
                                </span>{" "}
                                <span>
                                  {selectedParent.occupation || "Not Specified"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="children">
                      <div className="space-y-3">
                        {selectedParent.students.length > 0 ? (
                          selectedParent.students.map((child: any) => (
                            <div
                              key={child.id}
                              className="flex items-center justify-between p-3 bg-card border rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={child.user.image} />
                                  <AvatarFallback>
                                    {getInitials(child.user.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-bold">{child.user.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {child.currentClass?.name || "Unassigned"}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  router.push(
                                    `/admin/students?search=${child.user.name}`
                                  )
                                }
                              >
                                View Progress
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-center py-8 text-muted-foreground">
                            No students linked yet.
                          </p>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="finance">
                      <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                        <Wallet className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No payment history available.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
