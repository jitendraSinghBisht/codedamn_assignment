import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../store/slice/user.slice";
import { useState } from "react";
import type { IApiError, IApiResponse, IOldVolumes } from "@/types";
import { setContainer } from "../store/slice/container.slice";
import { updateFolder } from "../store/slice/folder.slice";

export function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [old, setOld] = useState(false);
  const [oldVolumes, setOldVolumes] = useState<Array<IOldVolumes>>([
    {
      _id: "60d0fe4f5311236168a109ca",
      volumeName: "Volume 1",
      volumeImage: "http://example.com/image1.jpg",
      volumeLang: "EN"
    },
    {
      _id: "60d0fe4f5311236168a109cb",
      volumeName: "Volume 2",
      volumeImage: "http://example.com/image2.jpg",
      volumeLang: "FR"
    },
    {
      _id: "60d0fe4f5311236168a109cc",
      volumeName: "Volume 3",
      volumeImage: "http://example.com/image3.jpg",
      volumeLang: "ES"
    },
    {
      _id: "60d0fe4f5311236168a109cb",
      volumeName: "Volume 2",
      volumeImage: "http://example.com/image2.jpg",
      volumeLang: "FR"
    },
    {
      _id: "60d0fe4f5311236168a109cc",
      volumeName: "Volume 3",
      volumeImage: "http://example.com/image3.jpg",
      volumeLang: "ES"
    },
    {
      _id: "60d0fe4f5311236168a109cb",
      volumeName: "Volume 2",
      volumeImage: "http://example.com/image2.jpg",
      volumeLang: "FR"
    },
    {
      _id: "60d0fe4f5311236168a109cc",
      volumeName: "Volume 3",
      volumeImage: "http://example.com/image3.jpg",
      volumeLang: "ES"
    }
  ]);
  const [values, setValues] = useState({
    name: "",
    lang: ""
  });

  function handleValueChange(field: string, value: string) {
    setValues((prevState)=>({
      ...prevState,
      [field]: value
    }))
  }

  const user = useSelector(userData)
  if (!user.loggedIn) {
    navigate("/")
  }

  async function getFiles(volumeName: string){
    const response = await fetch(
      "http://localhost:8000/api/container/get-root-structure",
      {
        method: "POST",
        mode: "no-cors",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          volumeName
        })
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to get files... \nTry again later....")
      return;
    }
    if ('data' in jres) {
      dispatch(updateFolder({
        ...jres.data.result
      }))
    }
    navigate("/playground");
  }

  async function deploy(){
    if (!values.lang || !values.name) {
      alert("Name and Framework are required..")
      return;
    }

    const images = {language: "ubuntu"}

    const response = await fetch(
      "http://localhost:8000/api/container/create",
      {
        method: "POST",
        mode: "no-cors",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          lang: values.lang,
          imageName: images.language,
        })
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to deploy... \nTry again later....")
      return;
    }
    if ('data' in jres) {
      dispatch(setContainer({
        wsurl: jres.data.wsurl,
        containerId: jres.data.containerId,
        containerName: jres.data.containerName
      }))
      getFiles(jres.data.containerName)
    }
  }

  async function oldDeploy(vols: IOldVolumes) {
    const response = await fetch(
      "http://localhost:8000/api/container/create",
      {
        method: "POST",
        mode: "no-cors",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: vols.volumeName,
          lang: vols.volumeLang,
          imageName: vols.volumeImage
        })
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to deploy... \nTry again later....")
      return;
    }
    if ('data' in jres) {
      dispatch(setContainer({
        wsurl: jres.data.wsurl,
        containerId: jres.data.containerId,
        containerName: jres.data.containerName
      }))
      getFiles(jres.data.containerName)
    }
  }

  async function getProject(){ 
    setOld((prevState)=> !prevState);
    if (!old && !oldVolumes.length) {
      const response = await fetch("http://localhost:8000/api/container/get-old-volumes",{mode: "no-cors"});
      const jres: IApiResponse | IApiError = await response.json();
      if (jres.statusCode >= 400) {
        alert("No previous projects found");
        setOld((prevState)=> !prevState);
        return;
      }
      if ('data' in jres) {
        setOldVolumes(jres.data.oldVolumes)
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-full w-full flex-col gap-3">
      <Card className="w-[350px] bg-gray-600">
      <CardHeader>
          <CardTitle>Enter existing project</CardTitle>
          <CardDescription>
            Goto your previous project in one-click.
          </CardDescription>
        </CardHeader>
        {old && <CardContent className="flex flex-col bg-slate-700 m-3 mt-0 gap-2 overflow-scroll max-h-48">
          {oldVolumes.map((vols)=>(
            <Button variant="link" key={vols._id} className="w-fit" onClick={()=>(oldDeploy(vols))} >
              {vols.volumeName}
            </Button>
          ))}
        </CardContent>}
        <CardFooter className="flex justify-between" >
          {user.loggedIn && <Button variant="outline" onClick={getProject}>
            {old ? 'Create new project' :'Get previous projects'}
          </Button>}
        </CardFooter>
      </Card>
      {!old && <Card className="w-[350px] bg-gray-600">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4  text-slate-900">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-slate-100">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={values.name}
                  onChange={(e)=>(handleValueChange("name",e.target.value.trim()))}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework" className="text-slate-100">Framework</Label>
                <Select onValueChange={(e)=>(handleValueChange("lang",e))}>
                  <SelectTrigger id="framework" className="bg-slate-100">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-gray-300">
                    <SelectItem value="node">Node.js</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="ccpp">C/C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={deploy}>Deploy</Button>
        </CardFooter>
      </Card>}
    </div>
  );
}
