import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { TimerForm } from "./timer-form";
import { HydrationWrapper } from "../common/hydration-wrapper";
import { Settings } from "lucide-react";

export function TimerEditForm({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const closeTimerForm = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={isActive} className="rounded-full">
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Timer</DialogTitle>
            <DialogDescription>
              Make changes to your timer here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          {/* Timer Form */}
          <HydrationWrapper>
            <TimerForm closeTimerForm={closeTimerForm} />
          </HydrationWrapper>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full" disabled={isActive}>
          <Settings />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-7/12 overflow-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Timer</DrawerTitle>
            <DrawerDescription>
              Make changes to your timer. Click save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>

          {/* Timer Form */}
          <HydrationWrapper>
            <TimerForm className="px-4" closeTimerForm={closeTimerForm} />
          </HydrationWrapper>
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
