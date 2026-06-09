"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSimulatorStore } from "@/store/simulator-store";

export function LoginForm() {
  const [identifier, setIdentifier] = useState("maya@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = useSimulatorStore((state) => state.login);

  function goToDashboard() {
    router.push("/dashboard");
    router.refresh();
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (login(identifier, password)) {
      goToDashboard();
      return;
    }
    setError("Could not sign in. Try maya@example.com / password or create a demo account.");
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="Email or username" />
          <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button className="w-full" type="submit">Start practicing</Button>
          <Button
            asChild
            className="w-full"
            variant="secondary"
          >
            <Link href="/auth/demo">Continue as demo user</Link>
          </Button>
          <p className="text-center text-sm text-zinc-400">
            New here? <Link className="text-emerald-300" href="/auth/signup">Create an account</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export function SignupForm() {
  const [name, setName] = useState("New Contributor");
  const [email, setEmail] = useState("new@example.com");
  const [username, setUsername] = useState("newcontributor");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const router = useRouter();
  const signup = useSimulatorStore((state) => state.signup);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Use at least 6 characters for the demo password.");
      return;
    }
    const user = signup({ name, email, username, password });
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    }).catch(() => {
      // The local demo account is already created; database sync is optional.
    });
    document.cookie = `simulator-auth=${encodeURIComponent(user.username)}; path=/; max-age=604800; SameSite=Lax`;
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
          <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" />
          <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
          <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button className="w-full" type="submit">Create simulator profile</Button>
          <p className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            Demo accounts are saved in this browser, so you can practice signup, login, logout, XP, and PR flows without configuring a database first.
          </p>
          <p className="text-center text-sm text-zinc-400">
            Already have an account? <Link className="text-emerald-300" href="/auth/login">Log in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export function LogoutClient() {
  const router = useRouter();
  const logout = useSimulatorStore((state) => state.logout);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>End practice session?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-400">This clears your local simulator session on this browser.</p>
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => {
            logout();
            router.push("/");
            router.refresh();
          }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
