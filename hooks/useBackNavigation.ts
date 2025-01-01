"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useNavigation() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const goForward = () => {
    router.forward();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.key === "ArrowLeft") {
          goBack();
        } else if (event.key === "ArrowRight") {
          goForward();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { goBack, goForward };
}
