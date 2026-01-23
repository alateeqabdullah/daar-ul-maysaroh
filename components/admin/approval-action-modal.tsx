// src/components/admin/approval-action-modal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ApprovalActionModalProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (
    userId: string,
    action: "APPROVE" | "REJECT",
    reason?: string
  ) => void;
}

export default function ApprovalActionModal({
  user,
  open,
  onOpenChange,
  onAction,
}: ApprovalActionModalProps) {
  const [action, setAction] = useState<"APPROVE" | "REJECT">("APPROVE");
  const [reason, setReason] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    if (action === "REJECT" && !reason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setProcessing(true);
    try {
      await onAction(user.id, action, reason || undefined);
      onOpenChange(false);
      setReason("");
    } catch (error) {
      console.error("Error processing action:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Process User Registration</DialogTitle>
          <DialogDescription>
            Review and take action on this user's registration request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Information */}
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-primary p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-800">
                  <span className="font-semibold text-purple-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-3 w-3" />
                  <span>{user.email}</span>
                </div>
                <div className="mt-1">
                  <Badge
                    className={
                      user.role === "STUDENT"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "TEACHER"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {user.role.toLowerCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Action Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={action === "APPROVE" ? "default" : "outline"}
                className={`h-auto flex-col p-4 ${
                  action === "APPROVE" ? "bg-green-600 hover:bg-green-700" : ""
                }`}
                onClick={() => setAction("APPROVE")}
                disabled={processing}
              >
                <CheckCircle className="mb-2 h-8 w-8" />
                <span className="font-medium">Approve</span>
                <span className="mt-1 text-sm opacity-90">
                  Grant access to the system
                </span>
              </Button>

              <Button
                type="button"
                variant={action === "REJECT" ? "default" : "outline"}
                className={`h-auto flex-col p-4 ${
                  action === "REJECT" ? "bg-red-600 hover:bg-red-700" : ""
                }`}
                onClick={() => setAction("REJECT")}
                disabled={processing}
              >
                <XCircle className="mb-2 h-8 w-8" />
                <span className="font-medium">Reject</span>
                <span className="mt-1 text-sm opacity-90">
                  Deny access with reason
                </span>
              </Button>
            </div>

            {/* Rejection Reason */}
            {action === "REJECT" && (
              <div className="space-y-3">
                <Label htmlFor="reason" className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                  Reason for Rejection
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide a clear reason for rejection. This will be shared with the user."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="resize-none"
                  required
                />
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">Common reasons:</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Incomplete registration information</li>
                    <li>Duplicate account detected</li>
                    <li>Age requirements not met</li>
                    <li>Invalid contact information</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Approval Notes */}
            {action === "APPROVE" && (
              <div className="space-y-3">
                <Label htmlFor="approval-notes">
                  Internal Notes (Optional)
                </Label>
                <Textarea
                  id="approval-notes"
                  placeholder="Add any internal notes about this approval..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={processing}
            className={
              action === "APPROVE"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            {processing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : action === "APPROVE" ? (
              "Approve User"
            ) : (
              "Reject User"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
