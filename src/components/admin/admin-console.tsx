"use client";

import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { demoUsers, pullRequests, repositories } from "@/lib/demo-data";

export function AdminConsole() {
  const [repoName, setRepoName] = useState("Accessibility Starter Kit");
  const [issueTitle, setIssueTitle] = useState("Add keyboard focus state");
  const [log, setLog] = useState("Admin console ready. CRUD actions are stored in the local simulator session until Postgres is connected.");

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <div className="grid gap-5 md:grid-cols-2">
        {[
          ["Total users", demoUsers.length],
          ["Active users", 4],
          ["Issues solved", 128],
          ["PRs created", pullRequests.length],
          ["PRs merged", pullRequests.filter((pr) => pr.status === "Merged").length],
          ["Repositories", repositories.length],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-sm text-zinc-400">{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">{value}</CardContent>
          </Card>
        ))}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Most popular repositories</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {repositories.slice(0, 5).map((repo) => (
              <div key={repo.id} className="flex items-center justify-between rounded-md bg-zinc-900 p-3">
                <span>{repo.name}</span>
                <Badge>{repo.fakeStars} stars</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <aside className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Create repository</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={repoName} onChange={(event) => setRepoName(event.target.value)} />
            <Textarea defaultValue="A practice repository for beginners." />
            <Button className="w-full" onClick={() => setLog(`Created repository draft: ${repoName}`)}>
              <Plus className="h-4 w-4" /> Create
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={issueTitle} onChange={(event) => setIssueTitle(event.target.value)} />
            <Textarea defaultValue="Describe the expected solution and test cases." />
            <Button className="w-full" variant="secondary" onClick={() => setLog(`Saved issue draft: ${issueTitle}`)}>
              <Save className="h-4 w-4" /> Save issue
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin activity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400">{log}</CardContent>
        </Card>
      </aside>
    </div>
  );
}
