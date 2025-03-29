"use client";

import { Button } from "@/components/ui/button";
import { Fullscreen } from "lucide-react";
import { useEffect } from "react";

export default function FullScreenToggle() {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size={"icon"}
      onClick={toggleFullscreen}
      className="size-7"
    >
      <Fullscreen />
    </Button>
  );
}
