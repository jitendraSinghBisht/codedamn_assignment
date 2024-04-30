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

export function Login() {
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
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="examplemail@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password"type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Login</Button>
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
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <Input id="username" placeholder="Name Here" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="examplemail@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password"type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
