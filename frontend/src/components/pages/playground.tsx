import { Settings, Binary, LogOut } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../store/slice/user.slice";
import { useEffect } from "react";
import FolderView from "../folderview/folderview";
import { IApiError, IApiResponse } from "@/types";
import axios from "axios";
import { folderData } from "../store/slice/folder.slice";

export function Playground() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const folder = useSelector(folderData);
  const user = useSelector(userData);

  async function logout() {
    try {
      const response = await axios.post(`/user/log-out`, {
        userId: user.userId,
      });
      const jres: IApiResponse | IApiError = await response.data;
      if (!jres.success) {
        alert("Unable to logout... \nTry again later....");
        return;
      }
      dispatch({ type: "RESET" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex h-screen w-screen max-w-full pl-[8%]">
      <aside className="inset-y fixed bg-gray-950 w-[8%] left-0 z-20 flex h-full flex-col border-r">
        <div className="flex items-center justify-center border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Binary className="size-5 fill-foreground" />
          </Button>
        </div>
        <FolderView folder={folder} key={folder.id} />
      </aside>
      <div className="flex flex-col w-full h-full">
        <header className="sticky top-0 bg-gray-950 z-10 flex h-[57px] items-center gap-[45%] border-b px-4 justify-end">
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
                  Settings can be provided here. <br /> Only using for logout in
                  this project.
                </DrawerDescription>
                <Button
                  variant="ghost"
                  className="max-w-fit min-h-fit bg-slate-500 flex flex-col p-10 m-5"
                  onClick={() => logout()}
                >
                  <span>
                    <LogOut className="size-9" />
                  </span>
                  <span>Loguout</span>
                </Button>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </header>
        <main>
          <div className="h-[94%] w-[92%] flex absolute">
            <PanelResizable />
          </div>
        </main>
      </div>
    </div>
  );
}
