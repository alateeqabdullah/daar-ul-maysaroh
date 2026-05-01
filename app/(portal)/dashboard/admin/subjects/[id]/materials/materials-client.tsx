// app/(portal)/dashboard/admin/subjects/[id]/materials/materials-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Download,
  FileText,
  Video,
  Music,
  Image,
  File,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  addSubjectMaterial,
  deleteSubjectMaterial,
} from "../../../actions/subjects";

interface Material {
  id: string;
  title: string;
  description: string | null;
  type: string;
  fileUrl: string;
  fileSize: number | null;
  fileType: string | null;
  createdAt: Date;
}

interface MaterialsClientProps {
  subjectId: string;
  subjectName: string;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "DOCUMENT":
      return FileText;
    case "VIDEO":
      return Video;
    case "AUDIO":
      return Music;
    case "IMAGE":
      return Image;
    default:
      return File;
  }
};

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return "Unknown";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

export function MaterialsClient({
  subjectId,
  subjectName,
}: MaterialsClientProps) {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "DOCUMENT",
    fileUrl: "",
    fileSize: null as number | null,
    fileType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMaterial = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.fileUrl.trim()) {
      toast.error("File URL is required");
      return;
    }

    setIsLoading(true);
    try {
      const material = await addSubjectMaterial({
        subjectId,
        title: formData.title,
        description: formData.description || undefined,
        type: formData.type,
        fileUrl: formData.fileUrl,
        fileSize: formData.fileSize || undefined,
        fileType: formData.fileType || undefined,
        uploadedById: "current-user-id", // Replace with actual user ID from session
      });

      setMaterials((prev) => [material, ...prev]);
      toast.success("Material added successfully");
      setShowAddDialog(false);
      setFormData({
        title: "",
        description: "",
        type: "DOCUMENT",
        fileUrl: "",
        fileSize: null,
        fileType: "",
      });
    } catch (error) {
      toast.error("Failed to add material");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteSubjectMaterial(id);
      setMaterials((prev) => prev.filter((m) => m.id !== id));
      toast.success("Material deleted successfully");
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete material");
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
            <FileText className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Subject Materials
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                {subjectName} - Materials
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage learning resources and materials for this subject
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/subjects/${subjectId}`}>
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Subject
                </Button>
              </Link>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </div>
          </div>
        </div>

        {/* Materials Table */}
        <Card>
          <CardHeader>
            <CardTitle>Materials List</CardTitle>
            <CardDescription>
              All learning resources for this subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            {materials.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No materials added yet</p>
                <p className="text-sm">
                  Click "Add Material" to upload learning resources
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => {
                    const Icon = getFileIcon(material.type);
                    return (
                      <TableRow key={material.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-purple-600" />
                            <div>
                              <p className="font-medium">{material.title}</p>
                              {material.description && (
                                <p className="text-xs text-muted-foreground">
                                  {material.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.type}</Badge>
                        </TableCell>
                        <TableCell>
                          {formatFileSize(material.fileSize)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(material.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <a
                                href={material.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(material.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Material Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Material</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter material title"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional description"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => handleSelectChange("type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOCUMENT">Document</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
                  <SelectItem value="IMAGE">Image</SelectItem>
                  <SelectItem value="PRESENTATION">Presentation</SelectItem>
                  <SelectItem value="LINK">Link</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>File URL *</Label>
              <Input
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleChange}
                placeholder="https://example.com/file.pdf"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddMaterial}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Material
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Material</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this material? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => deleteId && handleDeleteMaterial(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
