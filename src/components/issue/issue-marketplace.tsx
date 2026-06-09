"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { issues, repositories } from "@/lib/demo-data";
import { useSimulatorStore } from "@/store/simulator-store";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const labels = ["All", "bug", "documentation", "frontend", "backend", "enhancement"] as const;

export function IssueMarketplace() {
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");
  const [label, setLabel] = useState<(typeof labels)[number]>("All");
  const [query, setQuery] = useState("");
  const issueStatus = useSimulatorStore((state) => state.issueStatus);
  const assignIssue = useSimulatorStore((state) => state.assignIssue);

  const filtered = useMemo(
    () =>
      issues.filter((issue) => {
        const repo = repositories.find((item) => item.id === issue.repositoryId);
        const matchesDifficulty = difficulty === "All" || issue.difficulty === difficulty;
        const matchesLabel = label === "All" || issue.labels.includes(label);
        const matchesQuery = `${issue.title} ${issue.description} ${repo?.name}`.toLowerCase().includes(query.toLowerCase());
        return matchesDifficulty && matchesLabel && matchesQuery;
      }),
    [difficulty, label, query],
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
          <Input className="pl-9" placeholder="Search issues or repositories" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((item) => (
            <Button key={item} variant={difficulty === item ? "default" : "secondary"} size="sm" onClick={() => setDifficulty(item)}>
              {item}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {labels.map((item) => (
            <Button key={item} variant={label === item ? "default" : "outline"} size="sm" onClick={() => setLabel(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {filtered.map((issue) => {
          const repo = repositories.find((item) => item.id === issue.repositoryId);
          const status = issueStatus[issue.id] ?? issue.status;
          return (
            <Card key={issue.id}>
              <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{issue.title}</h3>
                    <Badge variant={status === "Open" ? "default" : "warning"}>{status}</Badge>
                    <Badge variant="blue">{issue.xpReward} XP</Badge>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{issue.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="purple">{repo?.name}</Badge>
                    <Badge variant="zinc">{issue.difficulty}</Badge>
                    {issue.labels.map((item) => (
                      <Badge key={item} variant="zinc">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => assignIssue(issue.id)}>
                    Assign
                  </Button>
                  <Button asChild>
                    <Link href={`/editor/${issue.id}`}>Start working</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
