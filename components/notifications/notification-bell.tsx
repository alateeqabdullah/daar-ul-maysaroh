"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to Admin Portal",
    message: "You have successfully logged in as administrator",
    type: "success",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "New Student Registration",
    message: "Mohammed Ali just registered for Quran Reading Basics",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "3",
    title: "Payment Received",
    message: "Payment of $70.00 received from Sara Ahmed",
    type: "success",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
];

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors group"
      >
        <Bell className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-200/50 backdrop-blur-xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group",
                      !notification.read && "bg-blue-50/50"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              notification.type === "success" && "bg-green-500",
                              notification.type === "info" && "bg-blue-500",
                              notification.type === "warning" &&
                                "bg-yellow-500",
                              notification.type === "error" && "bg-red-500"
                            )}
                          />
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {notification.title}
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                        >
                          <X className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200/50">
              <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// // src/components/notifications/notification-bell.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Bell, Check, X, Loader } from "lucide-react";
// import { useAuth } from "@/hooks/use-auth";
// import Link from "next/link";

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: "info" | "success" | "warning" | "error";
//   read: boolean;
//   createdAt: Date;
//   actionUrl?: string;
// }

// export function NotificationBell() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       loadNotifications();
//     }
//   }, [user]);

//   const loadNotifications = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/notifications");
//       const { data } = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error loading notifications:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const markAsRead = async (notificationId: string) => {
//     try {
//       await fetch(`/api/notifications/${notificationId}/read`, {
//         method: "POST",
//       });

//       setNotifications((prev) =>
//         prev.map((notif) =>
//           notif.id === notificationId ? { ...notif, read: true } : notif
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await fetch("/api/notifications/read-all", {
//         method: "POST",
//       });

//       setNotifications((prev) =>
//         prev.map((notif) => ({ ...notif, read: true }))
//       );
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
//       >
//         <Bell className="w-5 h-5" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: -10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: -10 }}
//             className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="font-semibold text-card-foreground">
//                 Notifications
//               </h3>
//               <div className="flex items-center space-x-2">
//                 {unreadCount > 0 && (
//                   <button
//                     onClick={markAllAsRead}
//                     className="text-xs text-primary hover:text-primary/80"
//                   >
//                     Mark all read
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-1 hover:bg-muted rounded"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Notifications List */}
//             <div className="max-h-96 overflow-y-auto">
//               {isLoading ? (
//                 <div className="flex items-center justify-center p-8">
//                   <Loader className="w-6 h-6 animate-spin text-primary" />
//                 </div>
//               ) : notifications.length === 0 ? (
//                 <div className="text-center p-8 text-muted-foreground">
//                   <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                   <p>No notifications</p>
//                 </div>
//               ) : (
//                 <div className="divide-y">
//                   {notifications.map((notification) => (
//                     <div
//                       key={notification.id}
//                       className={`p-4 hover:bg-muted/50 transition-colors ${
//                         !notification.read
//                           ? "bg-blue-50 border-l-4 border-blue-500"
//                           : ""
//                       }`}
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-card-foreground text-sm">
//                             {notification.title}
//                           </h4>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             {notification.message}
//                           </p>
//                           <p className="text-xs text-muted-foreground mt-2">
//                             {new Date(
//                               notification.createdAt
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>
//                         {!notification.read && (
//                           <button
//                             onClick={() => markAsRead(notification.id)}
//                             className="ml-2 p-1 hover:bg-muted rounded"
//                           >
//                             <Check className="w-3 h-3" />
//                           </button>
//                         )}
//                       </div>
//                       {notification.actionUrl && (
//                         <Link
//                           href={notification.actionUrl}
//                           className="inline-block mt-2 text-xs text-primary hover:text-primary/80"
//                         >
//                           View details
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
