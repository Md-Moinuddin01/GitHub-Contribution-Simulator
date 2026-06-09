"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitPullRequest, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSimulatorStore } from "@/store/simulator-store";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Repositories", "/repositories"],
  ["Issues", "/issues"],
  ["Pull Requests", "/pull-requests"],
  ["Conflicts", "/merge-conflicts"],
  ["Leaderboard", "/leaderboard"],
  ["Admin", "/admin"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const user = useSimulatorStore((state) => state.user);
  const logout = useSimulatorStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 text-zinc-950">
            <GitPullRequest className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">GitHub Contribution Simulator</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white",
                pathname.startsWith(href) && "bg-zinc-900 text-white",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button>
          {user ? (
            <Button asChild variant="secondary" size="sm" onClick={logout}>
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 xl:hidden">
        {nav.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "shrink-0 rounded-md border border-zinc-800 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white",
              pathname.startsWith(href) && "border-emerald-500/40 bg-zinc-900 text-white",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
