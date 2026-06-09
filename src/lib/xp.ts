import { badges, contributionDays } from "@/lib/demo-data";

export const levels = [
  { level: 1, title: "New Contributor", minXp: 0 },
  { level: 2, title: "Active Contributor", minXp: 300 },
  { level: 3, title: "Trusted Contributor", minXp: 750 },
  { level: 4, title: "Core Contributor", minXp: 1400 },
  { level: 5, title: "Maintainer", minXp: 2200 },
  { level: 6, title: "Open Source Leader", minXp: 3500 },
];

export function getLevel(xp: number) {
  return [...levels].reverse().find((level) => xp >= level.minXp) ?? levels[0];
}

export function getNextLevel(xp: number) {
  return levels.find((level) => xp < level.minXp) ?? levels[levels.length - 1];
}

export function getLevelProgress(xp: number) {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (current.level === next.level) return 100;
  return Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100);
}

export function unlockableBadges(stats: {
  commits: number;
  prs: number;
  merged: number;
  bugs: number;
  docs: number;
  reviews: number;
  conflicts: number;
  xp: number;
  level: number;
}) {
  const unlocked = new Set<string>();
  if (stats.commits >= 1) unlocked.add("first-commit");
  if (stats.prs >= 1) unlocked.add("first-pr");
  if (stats.merged >= 1) unlocked.add("first-merge");
  if (stats.bugs >= 5) unlocked.add("bug-fixer");
  if (stats.docs >= 3) unlocked.add("documentation-hero");
  if (stats.reviews >= 1) unlocked.add("code-reviewer");
  if (stats.conflicts >= 1) unlocked.add("conflict-solver");
  if (stats.xp >= 250) unlocked.add("open-source-beginner");
  if (stats.xp >= 1500) unlocked.add("open-source-pro");
  if (stats.level >= 5) unlocked.add("maintainer-mode");
  return badges.filter((badge) => unlocked.has(badge.slug));
}

export function contributionIntensity(day: (typeof contributionDays)[number]) {
  const total = day.commits + day.issues + day.prsMerged * 2 + day.reviews;
  if (total === 0) return "bg-zinc-800";
  if (total <= 1) return "bg-emerald-950";
  if (total <= 3) return "bg-emerald-800";
  if (total <= 5) return "bg-emerald-600";
  return "bg-emerald-400";
}
