export default function StopwatchPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 flex aspect-video items-center justify-center rounded-xl">
          <h1 className="block text-2xl md:hidden">COMING SOON ...</h1>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 flex h-full min-h-[100vh] flex-1 items-center justify-center rounded-xl md:min-h-min">
        <h1 className="hidden md:block md:text-5xl">COMING SOON ...</h1>
      </div>
    </div>
  );
}
