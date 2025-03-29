"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { Command, Clock, AlarmClock } from "lucide-react";
import { NavFunctions } from "@/components/global/nav-functions";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
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
