"use client";

import Link from "next/link";
import { GitPullRequest } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { repositories } from "@/lib/demo-data";
import { useSimulatorStore } from "@/store/simulator-store";

export function PullRequestList() {
  const prs = useSimulatorStore((state) => state.prs);
  return (
    <div className="grid gap-3">
      {prs.map((pr) => {
        const repo = repositories.find((item) => item.id === pr.repositoryId);
        return (
          <Card key={pr.id}>
            <CardContent className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <GitPullRequest className="h-4 w-4 text-emerald-300" />
                  #{pr.number} {pr.title}
                </div>
                <p className="mt-1 text-sm text-zinc-400">
                  {repo?.name} · {pr.sourceBranch} into {pr.targetBranch}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={pr.status === "Merged" ? "default" : pr.status === "Changes Requested" ? "warning" : "blue"}>
                  {pr.status}
                </Badge>
                <Button asChild size="sm">
                  <Link href={`/pull-requests/${pr.id}`}>Open</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
