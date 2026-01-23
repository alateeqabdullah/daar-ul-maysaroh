// src/components/admin/bulk-actions-modal.tsx
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
import { CheckCircle, XCircle, Users, AlertTriangle } from "lucide-react";

interface BulkActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onAction: (action: "APPROVE" | "REJECT", reason?: string) => void;
}

export default function BulkActionsModal({
  open,
  onOpenChange,
  selectedCount,
  onAction,
}: BulkActionsModalProps) {
  const [action, setAction] = useState<"APPROVE" | "REJECT">("APPROVE");
  const [reason, setReason] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    if (action === "REJECT" && !reason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setProcessing(true);
    try {
      await onAction(action, reason || undefined);
      setReason("");
    } catch (error) {
      console.error("Error processing bulk action:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Actions</DialogTitle>
          <DialogDescription>
            Apply action to {selectedCount} selected user
            {selectedCount !== 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  Bulk Action Warning
                </p>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                  This action will affect {selectedCount} user
                  {selectedCount !== 1 ? "s" : ""}. Please review your selection
                  carefully.
                </p>
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
                <span className="font-medium">Approve All</span>
                <span className="mt-1 text-xs opacity-90">
                  Grant access to all
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
                <span className="font-medium">Reject All</span>
                <span className="mt-1 text-xs opacity-90">
                  Deny access to all
                </span>
              </Button>
            </div>

            {/* Rejection Reason */}
            {action === "REJECT" && (
              <div className="space-y-3">
                <Label htmlFor="bulk-reason">Reason for Rejection</Label>
                <Textarea
                  id="bulk-reason"
                  placeholder="Provide a reason that applies to all selected users..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="resize-none"
                  required
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
              `Approve ${selectedCount} Users`
            ) : (
              `Reject ${selectedCount} Users`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
