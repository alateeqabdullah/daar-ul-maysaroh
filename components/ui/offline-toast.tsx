// components/ui/offline-toast.tsx
export function OfflineToast({ isOffline }: { isOffline: boolean }) {
  if (!isOffline) return null;

  return (
    // We use z-[9999] to ensure it is above headers, modals, and sidebars
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-9999 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-2xl 
                      bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
      >
        {/* Animated Pulse Indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>

        <p className="text-sm font-semibold tracking-wide">Offline Mode</p>
      </div>
    </div>
  );
}
