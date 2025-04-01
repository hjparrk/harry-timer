"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { Clock, AlarmClock } from "lucide-react";
import { NavFunctions } from "@/components/global/nav-functions";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const functions = [
  {
    name: "timer",
    url: "/timer",
    icon: Clock,
  },
  {
    name: "pomodoro timer",
    url: "/pomodoro-timer",
    icon: AlarmClock,
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
    </Sidebar>
  );
}
