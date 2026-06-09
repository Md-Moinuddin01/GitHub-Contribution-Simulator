"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Award, GitPullRequest, ListChecks } from "lucide-react";
import { StatCard } from "@/components/layout/stat-card";
import { ActionHub } from "@/components/layout/action-hub";
import { ContributionHeatmap } from "@/components/gamification/contribution-heatmap";
import { XpSummary } from "@/components/gamification/xp-summary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activity, badges, demoUsers, pullRequests, repositories } from "@/lib/demo-data";
import { useSimulatorStore } from "@/store/simulator-store";

export function DashboardView() {
  const storedUser = useSimulatorStore((state) => state.user);
  const xp = useSimulatorStore((state) => state.xp);
  const prs = useSimulatorStore((state) => state.prs);
  const login = useSimulatorStore((state) => state.login);
  const user = storedUser ?? demoUsers[0];
  const currentXp = storedUser ? xp : user.xp;
  const merged = prs.filter((pr) => pr.status === "Merged").length || pullRequests.filter((pr) => pr.status === "Merged").length;

  useEffect(() => {
    if (!storedUser && document.cookie.includes("simulator-auth=maya")) {
      login("maya@example.com", "password");
    }
  }, [login, storedUser]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="blue">Protected dashboard</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Welcome back, {user.name}</h1>
          <p className="mt-2 text-zinc-400">Your open-source practice cockpit is ready.</p>
        </div>
        <Button asChild>
          <Link href="/issues">Find an issue</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="User XP" value={currentXp} detail="Practice points earned" />
        <StatCard label="Level" value={user.level} detail="Contributor track" />
        <StatCard label="Issues solved" value={user.contributionsCount} detail="Across fake repositories" />
        <StatCard label="PRs merged" value={merged} detail="Simulated merges" />
      </div>
      <ActionHub compact />
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <XpSummary xp={currentXp} />
        <Card>
          <CardHeader>
            <CardTitle>Contribution heatmap</CardTitle>
          </CardHeader>
          <CardContent>
              <ContributionHeatmap
                seed={user.username}
                xp={currentXp}
                contributionsCount={user.contributionsCount}
              />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-300" /> Badges earned
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {badges.filter((badge) => user.badges.includes(badge.slug)).length ? (
              badges.filter((badge) => user.badges.includes(badge.slug)).map((badge) => (
                <Badge key={badge.slug}>{badge.name}</Badge>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No badges yet. Create your first commit to unlock one.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5 text-blue-300" /> Recommended repositories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {repositories.slice(0, 3).map((repo) => (
              <Link key={repo.id} className="block rounded-md bg-zinc-900 p-3 hover:bg-zinc-800" href={`/repositories/${repo.slug}`}>
                {repo.name}
                <p className="text-sm text-zinc-500">{repo.difficulty}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-purple-300" /> Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((item) => (
              <div key={item.id} className="rounded-md bg-zinc-900 p-3 text-sm">
                <p>{item.message}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
