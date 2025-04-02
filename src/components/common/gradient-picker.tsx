import { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "",
    "#ff4d4d", // Red
    "#ff7f00", // Orange
    "#ffe83f", // Yellow
    "#9fff5b", // Green
    "#70e2ff", // Blue
    "#09203f", // Indigo
    "#cd93ff", // Violet
    "#E2E2E2", // Light Gray (추가한 색상 중 하나)
    "#ff75c3", // Light Pink
    "#ffa647", // Light Orange
    "#00ff88", // Bright Green
    "#8e44ad", // Purple
    "#3498db", // Sky Blue
    "#f39c12", // Golden Yellow
    "#ff1493", // Deep Pink (추가된 색)
  ];

  const gradients = [
    "linear-gradient(to top left, #F00000, #DC281E, #ff5733, #ff1e00)" /* Red to Orange with a strong blend */,
    "linear-gradient(to top left, #ff75c3, #ffa647, #ffe83f, #9fff5b, #70e2ff, #cd93ff)" /* Pastel gradient with a rainbow effect */,
    "linear-gradient(to top left, #ff953c, #ff3366, #ff6a00)" /* Pink, Red, and Orange harmony */,
    "linear-gradient(to top left, #ee0979, #ff6a00, #ff8c00, #ffdf00)" /* Smooth gradient from Pink to Orange */,
    "linear-gradient(to top left, #f953c6, #b91d73, #ff3366, #ff6a00)" /* Pink to Red to Orange transition */,
    "linear-gradient(to top left, #AC32E4, #7918F2, #4801FF, #9b00ff)" /* Strong blend of Purple shades */,
    "linear-gradient(to top left, #000000, #434343, #ff6347, #ff4500)" /* Black to Red with intense shift */,
    "linear-gradient(to top left, #4facfe, #00f2fe)" /* Blue to Cyan gradient */,
    "linear-gradient(to top left, #0ba360, #3cba92)" /* Green gradient */,
    "linear-gradient(to top left, #00c6ff, #0072ff)" /* Blue gradient */,
    "linear-gradient(to top left, #09203f, #537895)" /* Dark Blue gradient */,
    "linear-gradient(to top left, #FDFC47, #24FE41)" /* Yellow to Green gradient */,
    "linear-gradient(to top left, #40E0D0, #FF8C00, #FF0080)" /* Teal to Orange to Pink gradient */,
    "linear-gradient(to top left, #accbee, #e7f0fd, #ff77ff)" /* Soft and pastel blue to pink gradient */,
    "linear-gradient(to top left, #8a2be2, #0000cd, #228b22, #ccff00)" /* Violet, Blue, Green to Yellow gradient */,
    "linear-gradient(to top left, #fcc5e4, #fda34b, #ff7882, #c8699e, #7046aa, #0c1db8, #020f75)" /* Complex gradient with diverse colors */,
  ];

  const defaultTab = useMemo(() => {
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => {
              if (s === "") {
                return (
                  <div
                    key={s}
                    className="h-6 w-6 cursor-pointer rounded-md border bg-transparent active:scale-105"
                    onClick={() => setBackground(s)}
                  />
                );
              }

              return (
                <div
                  key={s}
                  style={{ background: s }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => setBackground(s)}
                />
              );
            })}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="mb-2 flex flex-wrap gap-1">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
