"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/global/theme-toggle";
import FullScreenToggle from "./fullscreen-toggle";

export default function Header() {
  const pathname =
    usePathname().replace(/\/|-/g, (match) => (match === "/" ? "" : " ")) ||
    "Time Now";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <FullScreenToggle />
        <ThemeToggle />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-bold capitalize">{pathname}</h1>
      </div>
    </header>
  );
}
