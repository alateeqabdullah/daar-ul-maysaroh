"use client";

import { useEffect } from "react";

interface Shortcuts {
  [key: string]: (event: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for modifier keys
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? event.metaKey : event.ctrlKey;

      // Build shortcut string
      const keys = [];
      if (modKey) keys.push("mod");
      if (event.altKey) keys.push("alt");
      if (event.shiftKey) keys.push("shift");
      if (!["Control", "Alt", "Shift", "Meta"].includes(event.key)) {
        keys.push(event.key.toLowerCase());
      }

      const shortcut = keys.join("+");

      // Execute shortcut if defined
      if (shortcuts[shortcut]) {
        event.preventDefault();
        shortcuts[shortcut](event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}
