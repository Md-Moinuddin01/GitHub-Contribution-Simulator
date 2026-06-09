"use client";

import Link from "next/link";
import { GitPullRequest, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { issues, pullRequests } from "@/lib/demo-data";
import type { Repository } from "@/types";

export function RepositoryTabs({ repository }: { repository: Repository }) {
  const repoIssues = issues.filter((issue) => issue.repositoryId === repository.id);
  const repoPrs = pullRequests.filter((pr) => pr.repositoryId === repository.id);

  return (
    <Tabs defaultValue="code">
      <TabsList className="max-w-full flex-wrap">
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="issues">Issues</TabsTrigger>
        <TabsTrigger value="pulls">Pull Requests</TabsTrigger>
        <TabsTrigger value="readme">README</TabsTrigger>
        <TabsTrigger value="contributors">Contributors</TabsTrigger>
      </TabsList>
      <TabsContent value="code">
        <Card>
          <CardHeader>
            <CardTitle>File tree</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {repository.fileStructure.map((path) => (
              <div key={path} className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm">
                {path}
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="issues">
        <div className="grid gap-3">
          {repoIssues.map((issue) => (
            <Card key={issue.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium">{issue.title}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {issue.labels.map((label) => (
                      <Badge key={label} variant="zinc">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild size="sm">
                  <Link href={`/editor/${issue.id}`}>Start issue</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="pulls">
        <div className="grid gap-3">
          {repoPrs.map((pr) => (
            <Card key={pr.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <GitPullRequest className="h-4 w-4 text-emerald-300" />
                    #{pr.number} {pr.title}
                  </div>
                  <p className="text-sm text-zinc-400">{pr.status}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/pull-requests/${pr.id}`}>View</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="readme">
        <Card>
          <CardContent className="prose prose-invert max-w-none whitespace-pre-wrap p-5 font-mono text-sm leading-7">
            {repository.readme}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="contributors">
        <Card>
          <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
            {[repository.maintainerName, "AI Maintainer", "Senior Contributor Bot"].map((name) => (
              <div key={name} className="flex items-center gap-3 rounded-md border border-zinc-800 p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-zinc-500">Maintainer simulator</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
