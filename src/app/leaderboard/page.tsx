import { Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { demoUsers } from "@/lib/demo-data";

export default function LeaderboardPage() {
  const users = [...demoUsers].sort((a, b) => b.xp - a.xp);

  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge>Gamification</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Leaderboard</h1>
          <p className="mt-2 text-zinc-400">XP, streaks, daily challenges, and weekly challenge progress.</p>
        </div>
        <div className="grid gap-3">
          {users.map((user, index) => (
            <Card key={user.id}>
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900">
                    {index === 0 ? <Trophy className="h-5 w-5 text-amber-300" /> : index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-zinc-500">@{user.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-emerald-300">{user.xp} XP</p>
                  <p className="text-sm text-zinc-500">Level {user.level}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </MotionShell>
    </AppShell>
  );
}
