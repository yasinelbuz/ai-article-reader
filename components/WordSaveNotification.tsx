"use client";

import { useEffect, useState } from "react";

interface NotificationProps {
  word: string;
}

export default function WordSaveNotification({ word }: NotificationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-violet-500/10 text-violet-400 px-4 py-2 rounded-lg text-sm border border-violet-500/20">
      Saved word: {word}
    </div>
  );
}
