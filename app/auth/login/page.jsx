"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
      });

      if (result.error) {
        setError(result.error);
        console.log(error);
      } else {
        toast.success("Login Successful");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full justify-center  justify-items-center content-center">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid  h-[400px]  w-[400px] gap-3 bg-slate-300 ring-1 ring-blue-500 p-10 rounded-md">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-black/50">
              Enter your username and password below to login to your account
            </p>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="John"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="1234567"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full "
              disabled={!username || !password}
            >
              Login
            </Button>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      </form>
    </div>
  );
}
// }
export default Login;
