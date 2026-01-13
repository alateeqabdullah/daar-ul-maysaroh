"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Users,
  FileText,
  UploadCloud,
  MoreVertical,
  Trash2,
  Send,
  Paperclip,
  Clock,
  Calendar,
  CheckCircle2,
  Download,
  Link as LinkIcon,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface Props {
  classData: any;
  teacherId: string;
}

export default function ClassDetailsClient({ classData, teacherId }: Props) {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState(classData.announcements);
  const [materials, setMaterials] = useState(classData.materials);
  const [isLoading, setIsLoading] = useState(false);

  // Forms
  const [postContent, setPostContent] = useState({ title: "", content: "" });
  const [materialForm, setMaterialForm] = useState({
    title: "",
    description: "",
    fileUrl: "",
  });
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // --- ACTIONS ---

  const handlePostAnnouncement = async () => {
    if (!postContent.title || !postContent.content)
      return toast.error("Title and Content required");
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/classes/details", {
        method: "POST",
        body: JSON.stringify({
          action: "POST_ANNOUNCEMENT",
          classId: classData.id,
          data: postContent,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setAnnouncements([result.item, ...announcements]);
      setPostContent({ title: "", content: "" });
      toast.success("Announcement Posted");
    } catch (e) {
      toast.error("Failed to post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadMaterial = async () => {
    if (!materialForm.title || !materialForm.fileUrl)
      return toast.error("Title and Link required");
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/classes/details", {
        method: "POST",
        body: JSON.stringify({
          action: "UPLOAD_MATERIAL",
          classId: classData.id,
          data: materialForm,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setMaterials([result.item, ...materials]);
      setMaterialForm({ title: "", description: "", fileUrl: "" });
      setIsUploadOpen(false);
      toast.success("Material Added");
    } catch (e) {
      toast.error("Failed to upload");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (
    id: string,
    type: "ANNOUNCEMENT" | "MATERIAL"
  ) => {
    if (!confirm("Are you sure?")) return;
    if (type === "ANNOUNCEMENT")
      setAnnouncements((prev) => prev.filter((a: any) => a.id !== id));
    else setMaterials((prev) => prev.filter((m: any) => m.id !== id));

    try {
      await fetch("/api/teacher/classes/details", {
        method: "POST",
        body: JSON.stringify({
          action: "DELETE_ITEM",
          classId: classData.id,
          data: { id, type },
        }),
      });
      toast.success("Deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. HEADER BANNER */}
      <div className="relative h-48 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Classes
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-end text-white">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                  {classData.code}
                </Badge>
                <span className="text-sm font-medium opacity-90">
                  {classData.academicYear}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                {classData.name}
              </h1>
            </div>
            <div className="hidden md:flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">
                  {classData.students.length}
                </p>
                <p className="text-xs opacity-80 uppercase tracking-wider">
                  Students
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">{materials.length}</p>
                <p className="text-xs opacity-80 uppercase tracking-wider">
                  Resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN TABS */}
      <Tabs defaultValue="stream" className="w-full">
        <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-xl border w-full md:w-auto flex justify-start">
          <TabsTrigger value="stream" className="gap-2 px-6">
            <Bell className="h-4 w-4" /> Stream
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-2 px-6">
            <FileText className="h-4 w-4" /> Classwork
          </TabsTrigger>
          <TabsTrigger value="people" className="gap-2 px-6">
            <Users className="h-4 w-4" /> People
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-2 space-y-6">
            {/* STREAM TAB */}
            <TabsContent value="stream" className="space-y-6 m-0">
              {/* Post Box */}
              <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                <CardContent className="p-4">
                  <Input
                    placeholder="Announcement Title"
                    className="mb-2 border-0 shadow-none font-bold text-lg px-2 focus-visible:ring-0"
                    value={postContent.title}
                    onChange={(e) =>
                      setPostContent({ ...postContent, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Announce something to your class..."
                    className="border-0 shadow-none resize-none min-h-[80px] px-2 focus-visible:ring-0 text-slate-600 dark:text-slate-300"
                    value={postContent.content}
                    onChange={(e) =>
                      setPostContent({
                        ...postContent,
                        content: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-between items-center mt-2 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400"
                    >
                      <Paperclip className="h-4 w-4 mr-2" /> Attach
                    </Button>
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={handlePostAnnouncement}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Posting..."
                      ) : (
                        <>
                          <Send className="h-3 w-3 mr-2" /> Post
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feed */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {announcements.map((a: any) => (
                  <motion.div key={a.id} variants={itemVariants}>
                    <Card className="group border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">
                              {a.title}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {new Date(a.createdAt).toLocaleDateString()} •{" "}
                              {new Date(a.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-500"
                          onClick={() => handleDelete(a.id, "ANNOUNCEMENT")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {a.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* RESOURCES TAB */}
            <TabsContent value="resources" className="space-y-6 m-0">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Class Materials</h2>
                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Plus className="h-4 w-4 mr-2" /> Add Material
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Resource</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input
                          value={materialForm.title}
                          onChange={(e) =>
                            setMaterialForm({
                              ...materialForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Description</Label>
                        <Input
                          value={materialForm.description}
                          onChange={(e) =>
                            setMaterialForm({
                              ...materialForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Link URL</Label>
                        <Input
                          value={materialForm.fileUrl}
                          onChange={(e) =>
                            setMaterialForm({
                              ...materialForm,
                              fileUrl: e.target.value,
                            })
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <Button
                        className="w-full bg-indigo-600"
                        onClick={handleUploadMaterial}
                        disabled={isLoading}
                      >
                        {isLoading ? "Uploading..." : "Add Resource"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((m: any) => (
                  <Card
                    key={m.id}
                    className="hover:border-indigo-300 transition-colors group"
                  >
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">
                          {m.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {m.description || "No description"}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <a
                            href={m.fileUrl}
                            target="_blank"
                            className="text-xs font-medium text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            <LinkIcon className="h-3 w-3" /> Open
                          </a>
                          <button
                            onClick={() => handleDelete(m.id, "MATERIAL")}
                            className="text-xs text-rose-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* PEOPLE TAB */}
            <TabsContent value="people" className="m-0">
              <Card>
                <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Student Roster</span>
                    <Badge variant="secondary">
                      {classData.students.length} Students
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {classData.students.map((s: any) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={s.image} />
                            <AvatarFallback>
                              {getInitials(s.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-sm">{s.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {s.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-xs text-muted-foreground uppercase font-bold">
                              Phone
                            </p>
                            <p className="text-xs font-medium">
                              {s.phone || "-"}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4 text-slate-400" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* RIGHT SIDEBAR (Info) */}
          <div className="space-y-6">
            <Card className="bg-indigo-900 text-white border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-1">Class Schedule</h3>
                <p className="text-indigo-200 text-sm mb-4">
                  Upcoming sessions
                </p>
                <div className="space-y-3">
                  {classData.schedules.map((s: any) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10"
                    >
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">
                          {
                            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                              s.dayOfWeek
                            ]
                          }
                        </p>
                        <p className="text-xs opacity-80">
                          {s.startTime} - {s.endTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Class Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Attendance Avg</span>
                  </div>
                  <span className="font-bold text-sm">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Assignments</span>
                  </div>
                  <span className="font-bold text-sm">12 Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
