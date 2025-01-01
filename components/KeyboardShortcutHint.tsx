"use client";

import { useEffect, useState } from "react";

export default function KeyboardShortcutHint() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!showHint) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg text-sm space-y-1">
      <p>Tip: Press Ctrl + ← to go back</p>
      <p>Tip: Press Ctrl + → to go forward</p>
    </div>
  );
}
