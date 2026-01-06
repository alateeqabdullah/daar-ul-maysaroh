// src/components/admin/parents-management-client.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Users,
  UserPlus,
  Edit,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  User,
  BookOpen,
  Home,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getInitials, formatDate } from "@/lib/utils";

interface ParentsManagementClientProps {
  initialParents: any[];
  total: number;
  page: number;
  filters: any;
}

export default function ParentsManagementClient({
  initialParents,
  total,
  page,
  filters,
}: ParentsManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parents, setParents] = useState(initialParents);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (page > 1) params.set("page", page.toString());

      router.push(`/admin/parents?${params.toString()}`);

      const response = await fetch(`/api/admin/parents?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setParents(data.parents);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refreshData();
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/parents?${params.toString()}`);
  };

  const handleDeleteParent = async (parentId: string) => {
    if (!confirm("Are you sure you want to delete this parent?")) return;

    try {
      const response = await fetch(`/api/admin/parents/${parentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete parent");
      }

      toast.success("Parent deleted successfully");
      setParents(parents.filter((p) => p.id !== parentId));
    } catch (error) {
      toast.error("Failed to delete parent", {
        description: "Please try again.",
      });
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Parent Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and communicate with parents
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-2">
                <UserPlus className="h-4 w-4" />
                Add Parent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Parent</DialogTitle>
                <DialogDescription>
                  Create a new parent account
                </DialogDescription>
              </DialogHeader>
              <CreateParentForm
                onSubmit={() => {}}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Parents
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {total}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Children
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {parents.reduce((sum, p) => sum + p.students.length, 0)}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Children/Parent
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {parents.length > 0
                    ? (
                        parents.reduce((sum, p) => sum + p.students.length, 0) /
                        parents.length
                      ).toFixed(1)
                    : 0}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Payments
                </p>
                <p className="mt-2 text-2xl font-bold text-orange-600">87%</p>
              </div>
              <div className="rounded-lg bg-orange-100 p-3">
                <Briefcase className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Filter className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Parents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Parents List</CardTitle>
          <CardDescription>
            {total} parents found • Page {page} of {totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : parents.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No parents found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add your first parent"}
              </p>
              <Button
                className="mt-4"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Parent
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Parent
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Occupation
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Contact
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Children
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Join Date
                      </th>
                      <th className="py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parents.map((parent) => (
                      <tr key={parent.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {getInitials(parent.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{parent.user.name}</p>
                              {parent.maritalStatus && (
                                <p className="text-sm text-gray-500 capitalize">
                                  {parent.maritalStatus.toLowerCase()}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="font-medium">
                              {parent.occupation || "Not specified"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {parent.employer}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="space-y-1">
                            <p className="text-sm">{parent.user.email}</p>
                            <p className="text-sm text-gray-500">
                              {parent.user.phone}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="space-y-2">
                            {parent.students.map((student: any) => (
                              <div
                                key={student.id}
                                className="flex items-center space-x-2"
                              >
                                <User className="h-3 w-3 text-gray-400" />
                                <span className="text-sm">
                                  {student.user.name} (
                                  {student.currentClass?.name || "No class"})
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-sm">
                            {formatDate(parent.createdAt)}
                          </p>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedParent(parent);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Payments
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteParent(parent.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {(page - 1) * 10 + 1} to{" "}
                    {Math.min(page * 10, total)} of {total} results
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Parent View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedParent && (
            <>
              <DialogHeader>
                <DialogTitle>Parent Details</DialogTitle>
                <DialogDescription>
                  Complete information for {selectedParent.user.name}
                </DialogDescription>
              </DialogHeader>
              <ParentDetails parent={selectedParent} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CreateParentForm({ onSubmit, onCancel }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    occupation: "",
    employer: "",
    maritalStatus: "",
    spouseName: "",
    familySize: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) =>
              setFormData({ ...formData, occupation: e.target.value })
            }
            placeholder="e.g., Business, Doctor, Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employer">Employer</Label>
          <Input
            id="employer"
            value={formData.employer}
            onChange={(e) =>
              setFormData({ ...formData, employer: e.target.value })
            }
            placeholder="Company or organization"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <select
            id="maritalStatus"
            value={formData.maritalStatus}
            onChange={(e) =>
              setFormData({ ...formData, maritalStatus: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select status</option>
            <option value="SINGLE">Single</option>
            <option value="MARRIED">Married</option>
            <option value="DIVORCED">Divorced</option>
            <option value="WIDOWED">Widowed</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="familySize">Family Size</Label>
          <Input
            id="familySize"
            type="number"
            min="1"
            value={formData.familySize}
            onChange={(e) =>
              setFormData({ ...formData, familySize: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="spouseName">Spouse Name (if married)</Label>
        <Input
          id="spouseName"
          value={formData.spouseName}
          onChange={(e) =>
            setFormData({ ...formData, spouseName: e.target.value })
          }
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Parent"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function ParentDetails({ parent }: { parent: any }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold">Personal Information</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span>{parent.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marital Status:</span>
                  <span className="capitalize">
                    {parent.maritalStatus?.toLowerCase() || "Not specified"}
                  </span>
                </div>
                {parent.spouseName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spouse Name:</span>
                    <span>{parent.spouseName}</span>
                  </div>
                )}
                {parent.familySize && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Family Size:</span>
                    <span>{parent.familySize} members</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Date:</span>
                  <span>{formatDate(parent.createdAt)}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Professional Information</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupation:</span>
                  <span>{parent.occupation || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employer:</span>
                  <span>{parent.employer || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{parent.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>{parent.user.phone || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="children" className="space-y-4">
          <h4 className="font-semibold">Children ({parent.students.length})</h4>
          {parent.students.length > 0 ? (
            <div className="space-y-3">
              {parent.students.map((student: any) => (
                <div key={student.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(student.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.user.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{student.studentId}</span>
                          <span>•</span>
                          <span>{student.hifzLevel || "Beginner"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {student.currentClass?.name || "No class"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {student.currentClass?.teacher?.user?.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No children registered</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
