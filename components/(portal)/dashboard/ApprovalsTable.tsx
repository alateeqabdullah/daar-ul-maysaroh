"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  MoreVertical,
  Search,
  UserCheck,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  applied: string;
}

interface ApprovalsTableProps {
  users: User[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export function ApprovalsTable({
  users,
  onApprove,
  onReject,
}: ApprovalsTableProps) {
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Animated Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search pending users..."
          className="pl-9 focus-visible:ring-purple-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              className="divide-y divide-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filtered.map((user) => (
                <motion.div
                  key={user.id}
                  layout // This handles the smooth sliding of other rows
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex flex-col p-4 sm:flex-row sm:items-center sm:justify-between gap-4 bg-card"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-medium">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 uppercase font-bold tracking-wider"
                        >
                          {user.role}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                          {user.applied}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300 dark:border-green-900 dark:text-green-400 transition-all"
                      onClick={() => onApprove(user.id)}
                    >
                      <CheckCircle className="mr-1 h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-destructive border-red-100 hover:bg-destructive/5 hover:border-red-200 transition-all"
                      onClick={() => onReject(user.id)}
                    >
                      <XCircle className="mr-1 h-3.5 w-3.5" /> Reject
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-muted"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="cursor-pointer">
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Message user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="rounded-full bg-muted/50 p-4 mb-3">
                <UserCheck className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-medium text-foreground">
                No pending requests
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Everything is up to date!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
