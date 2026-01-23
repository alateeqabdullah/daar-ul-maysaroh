// components/scroll-area.tsx
import * as ScrollArea from "@radix-ui/react-scroll-area";

export function CustomScrollArea({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollArea.Root className={`relative overflow-hidden ${className}`}>
      <ScrollArea.Viewport className="h-full w-full rounded">
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none p-0.5 bg-gray-200"
      >
        <ScrollArea.Thumb className="flex-1 bg-gray-500 rounded" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
