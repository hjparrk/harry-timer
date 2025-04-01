"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import {
  Clock,
  AlarmClock,
  WatchIcon,
  Github,
  Globe,
  Instagram,
} from "lucide-react";
import { NavFunctions } from "@/components/global/nav-functions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";

const functions = [
  {
    name: "Clock",
    url: "/",
    icon: Clock,
  },
  {
    name: "timer",
    url: "/timer",
    icon: AlarmClock,
  },
  {
    name: "stop watch",
    url: "/stopwatch",
    icon: WatchIcon,
  },
];

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/icon.svg"
                    alt="icon"
                    height={0}
                    width={0}
                    className="h-full w-full"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Harry&apos;s Timer
                  </span>
                  <span className="truncate text-xs">© Harry Park</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavFunctions functions={functions} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="secondary" size="icon" className="w-full">
          <Link
            href="https://harrypark.dev"
            target="_blank"
            className="flex items-center gap-2 capitalize"
          >
            <Globe />
            <h1>Portfolio</h1>
          </Link>
        </Button>
        <Button variant="secondary" size="icon" className="w-full">
          <Link
            href="https://www.instagram.com/hjparrk"
            target="_blank"
            className="flex items-center gap-2 capitalize"
          >
            <Instagram />
            <h1>Instagram</h1>
          </Link>
        </Button>
        <Button variant="secondary" size="icon" className="w-full">
          <Link
            href="https://github.com/hjparrk"
            target="_blank"
            className="flex items-center gap-2 capitalize"
          >
            <Github />
            <h1>Github</h1>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
