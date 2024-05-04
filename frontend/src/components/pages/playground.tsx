import {
  // Book,
  // Bot,
  // Code2,
  // LifeBuoy,
  Settings,
  // Settings2,
  // SquareUser,
  Binary,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PanelResizable from "../panel";
import { useSelector } from "react-redux";
import { userData } from "../store/slice/user.slice";
import { useEffect } from "react";
import FolderView from "../folderview/folderview";

export function Playground() {

  const navigate = useNavigate();
  const user = useSelector(userData);

  useEffect(()=>{
    if (!user.loggedIn) {
      navigate("/login")
    }
  },[])

  return (
    <div className="flex h-screen w-screen max-w-full pl-[8%]">
      <aside className="inset-y fixed w-[8%] left-0 z-20 flex h-full flex-col border-r">
        <div className="flex items-center justify-center border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Binary className="size-5 fill-foreground" />
          </Button>
        </div>
        <FolderView />
      </aside>
      <div className="flex flex-col w-full h-full">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-[45%] border-b px-4 justify-end">
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
        <main>
          <div className="h-[94%] w-[92%] flex absolute"><PanelResizable /></div>
        </main>
      </div>
    </div>
  );
}
