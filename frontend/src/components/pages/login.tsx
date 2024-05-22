import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../store/slice/user.slice"
import type { IApiError, IApiResponse, IUser } from "@/types"
import { useNavigate } from "react-router-dom"

export function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: ""
  });

  function handleUserChange(field: string, value: string) {
    setUser((prevState)=>({
      ...prevState,
      [field]: value
    }))
  }

  async function login(){
    if (!user.email || !user.password) {
      alert("Email and Password are required for login")
      return;
    }
    const response = await fetch(
      "http://52.23.234.225:8000/api/user/sign-in",
      {
        method: "POST",
        mode: "no-cors",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to login... \nTry again later....")
      return;
    }
    if ('data' in jres) {
      dispatch(loginUser({
        username: jres.data.username,
        email: jres.data.email
      }))
    }
    navigate("/");
  }

  async function signup(){
    if (!user.email || !user.password || !user.username) {
      alert("Name, Email and Password are required for signup")
      return;
    }
    const response = await fetch(
      "http://52.23.234.225:8000/api/user/sign-up",
      {
        method: "POST",
        mode: "no-cors",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password
        })
      }
    );
    const jres: IApiResponse | IApiError = await response.json();
    if (jres.statusCode >= 400) {
      alert("Unable to login... \nTry again later....")
      return;
    }
    if ('data' in jres) {
      dispatch(loginUser({
        username: jres.data.username,
        email: jres.data.email
      }))
    }
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
    <Tabs defaultValue="login" className="w-[400px] bg-gray-900">
      <TabsList className="grid w-full grid-cols-2 bg-gray-600">
        <TabsTrigger value="login" className="data-[state=active]:bg-gray-800">Login</TabsTrigger>
        <TabsTrigger value="signup" className="data-[state=active]:bg-gray-800">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login Account</CardTitle>
            <CardDescription>
              Login to your account. Keep your data safe for future use.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2  text-slate-900">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-100" >Email</Label>
              <Input
                id="email"
                placeholder="examplemail@example.com"
                value={user.email}
                onChange={(e)=>(handleUserChange("email",e.target.value.trim()))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-slate-100" >Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e)=>(handleUserChange("password",e.target.value))}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={login}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Create a new account to keep your data safe for future use.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-slate-900">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-slate-100" >Name</Label>
              <Input
                id="username"
                placeholder="Name Here"
                value={user.username}
                onChange={(e)=>(handleUserChange("username",e.target.value.trim()))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-100" >Email</Label>
              <Input
                id="semail"
                placeholder="examplemail@example.com"
                value={user.email}
                onChange={(e)=>(handleUserChange("email",e.target.value.trim()))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="spassword" className="text-slate-100" >Password</Label>
              <Input
                id="spassword"
                type="password"
                value={user.password}
                onChange={(e)=>(handleUserChange("password",e.target.value))}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={signup}>Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
