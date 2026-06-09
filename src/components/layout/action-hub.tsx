"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  GitCompare,
  GitPullRequest,
  LayoutDashboard,
  ListChecks,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const actions = [
  {
    title: "Dashboard",
    description: "See XP, badges, heatmap, recent activity, and recommended repos.",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Repositories",
    description: "Open real GitHub-backed practice repositories and README tabs.",
    href: "/repositories",
    icon: Code2,
  },
  {
    title: "Issue Marketplace",
    description: "Filter beginner, intermediate, advanced, frontend, backend, and docs issues.",
    href: "/issues",
    icon: ListChecks,
  },
  {
    title: "Code Editor",
    description: "Jump into Monaco with language selection, terminal, tests, and commits.",
    href: "/editor/issue-01",
    icon: Code2,
  },
  {
    title: "Pull Requests",
    description: "Review PR conversations, commits, changed files, checks, and merge state.",
    href: "/pull-requests",
    icon: GitPullRequest,
  },
  {
    title: "Merge Conflicts",
    description: "Resolve conflict markers and validate the solution.",
    href: "/merge-conflicts",
    icon: GitCompare,
  },
  {
    title: "Leaderboard",
    description: "Compare XP, levels, and contributor progress.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Admin",
    description: "Manage repositories, issues, badges, users, PRs, and analytics.",
    href: "/admin",
    icon: ShieldCheck,
  },
] as const;

export function ActionHub({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "space-y-4" : "mx-auto max-w-7xl px-4 py-16"}>
      <div className={compact ? "flex flex-col gap-3 md:flex-row md:items-end md:justify-between" : "mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"}>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">Practice control center</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Choose what you want to do</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Start anywhere: assign an issue, edit code, create commits, open a PR, get review, resolve conflicts, or manage content.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/auth/demo">
            Enter demo workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Card key={action.href} className="transition hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-zinc-900/80">
            <CardContent className="flex h-full flex-col p-4">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 text-emerald-300">
                <action.icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-white">{action.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">{action.description}</p>
              <Button asChild className="mt-4 w-full" variant="outline" size="sm">
                <Link href={action.href}>
                  Open
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
