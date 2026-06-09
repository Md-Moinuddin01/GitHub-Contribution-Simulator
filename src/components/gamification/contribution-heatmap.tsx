"use client";

import { useMemo } from "react";
import type { ContributionDay } from "@/types";
import { contributionIntensity } from "@/lib/xp";
import { cn } from "@/lib/utils";

function seededValue(seed: string, index: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  return (hash + index * 17) % 11;
}

function buildUserContributionDays(seed: string, xp: number, contributionsCount: number): ContributionDay[] {
  const today = new Date();
  const activeDays = Math.min(98, Math.max(contributionsCount, Math.floor(xp / 45)));

  return Array.from({ length: 98 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (97 - index));
    const distanceFromToday = 97 - index;
    const active = distanceFromToday < activeDays;
    const score = active ? seededValue(seed, index) : 0;

    return {
      date: date.toISOString().slice(0, 10),
      commits: active ? score % 4 : 0,
      issues: active && score % 3 === 0 ? 1 : 0,
      prsMerged: active && score % 7 === 0 ? 1 : 0,
      reviews: active && score % 5 === 0 ? 1 : 0,
      xpEarned: active ? Math.max(10, score * 12) : 0,
    };
  });
}

export function ContributionHeatmap({
  seed = "demo",
  xp = 0,
  contributionsCount = 0,
}: {
  seed?: string;
  xp?: number;
  contributionsCount?: number;
}) {
  const days = useMemo(
    () => buildUserContributionDays(seed, xp, contributionsCount),
    [seed, xp, contributionsCount],
  );
  const total = days.reduce((sum, day) => sum + day.commits + day.issues + day.prsMerged + day.reviews, 0);

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
        {days.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.commits + day.issues + day.prsMerged + day.reviews} contributions`}
            className={cn("h-3 w-3 rounded-sm ring-1 ring-zinc-950", contributionIntensity(day))}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>Last 14 weeks</span>
        <span>{total ? `${total} tracked practice contributions` : "No practice contributions yet"}</span>
      </div>
    </div>
  );
}
