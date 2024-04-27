import {
  Book,
  Bot,
  Code2,
  LifeBuoy,
  Settings,
  Settings2,
  SquareTerminal,
  SquareUser,
  Triangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PanelResizable from "./panel";

export function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg bg-muted"
            aria-label="Playground"
          >
            <SquareTerminal className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Models"
          >
            <Bot className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="API"
          >
            <Code2 className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Documentation"
          >
            <Book className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Settings"
          >
            <Settings2 className="size-5" />
          </Button>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Button
            variant="ghost"
            size="icon"
            className="mt-auto rounded-lg"
            aria-label="Help"
          >
            <LifeBuoy className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="mt-auto rounded-lg"
            aria-label="Account"
          >
            <SquareUser className="size-5" />
          </Button>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4 justify-between">
          <h1 className="text-xl font-semibold">Playground</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className=" text-white">
                <Settings className="size-7" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh] text-white bg-slate-700">
              <DrawerHeader>
                <DrawerTitle>Settings Here</DrawerTitle>
                <DrawerDescription>
                  Not used in this project.....
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </header>
        <main className="flex-1">
          <PanelResizable />
        </main>
      </div>
    </div>
  );
}
