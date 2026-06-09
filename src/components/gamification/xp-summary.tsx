import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getLevel, getLevelProgress, getNextLevel } from "@/lib/xp";

export function XpSummary({ xp }: { xp: number }) {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  const progress = getLevelProgress(xp);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{current.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-end justify-between">
          <span className="text-3xl font-semibold text-emerald-300">{xp} XP</span>
          <span className="text-sm text-zinc-400">Level {current.level}</span>
        </div>
        <Progress value={progress} />
        <p className="mt-3 text-sm text-zinc-400">
          {next.level === current.level ? "Maximum level reached" : `${next.minXp - xp} XP to ${next.title}`}
        </p>
      </CardContent>
    </Card>
  );
}
