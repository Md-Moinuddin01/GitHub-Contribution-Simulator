"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, GitMerge, MessageSquareWarning, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { issues, repositories } from "@/lib/demo-data";
import type { AiReviewResult } from "@/lib/ai-review";
import { useSimulatorStore } from "@/store/simulator-store";
import type { PullRequest } from "@/types";

export function PullRequestReviewer({ pullRequest }: { pullRequest: PullRequest }) {
  const storePr = useSimulatorStore((state) => state.prs.find((item) => item.id === pullRequest.id));
  const updatePr = useSimulatorStore((state) => state.updatePr);
  const addXp = useSimulatorStore((state) => state.addXp);
  const pr = storePr ?? pullRequest;
  const repo = repositories.find((item) => item.id === pr.repositoryId) ?? repositories[0];
  const issue = issues.find((item) => item.id === pr.issueId);
  const [code, setCode] = useState(repo.files.map((file) => `// ${file.path}\n${file.content}`).join("\n\n"));
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<AiReviewResult | undefined>();

  const changedFiles = useMemo(() => pr.changedFiles.length ? pr.changedFiles : repo.files.slice(0, 2).map((file) => file.path), [pr.changedFiles, repo.files]);

  async function requestReview() {
    setLoading(true);
    const response = await fetch(`/api/pull-requests/${pr.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: pr.title,
        description: pr.description,
        code,
        issueTitle: issue?.title,
        expectedSolution: issue?.expectedSolution,
        changedFiles,
      }),
    });
    const result = (await response.json()) as AiReviewResult;
    setReview(result);
    updatePr(pr.id, {
      status: result.decision === "APPROVE" ? "Approved" : "Changes Requested",
      review: {
        reviewerName: result.reviewerName,
        decision: result.decision,
        summary: result.summary,
        lineComments: result.lineComments,
      },
    });
    setLoading(false);
  }

  function mergePr() {
    updatePr(pr.id, { status: "Merged" });
    addXp(issue?.xpReward ?? 100);
  }

  return (
    <Tabs defaultValue="conversation">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <TabsList className="flex-wrap">
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="files">Files changed</TabsTrigger>
          <TabsTrigger value="checks">Checks</TabsTrigger>
        </TabsList>
        <Badge variant={pr.status === "Merged" ? "default" : pr.status === "Changes Requested" ? "warning" : "blue"}>
          {pr.status}
        </Badge>
      </div>
      <TabsContent value="conversation">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Maintainer conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
                <p className="font-medium">{pr.author} opened this pull request</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-400">{pr.description}</p>
              </div>
              {(review ?? pr.review) ? (
                <div className="rounded-md border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 font-medium text-blue-200">
                    <MessageSquareWarning className="h-4 w-4" />
                    {(review ?? pr.review)?.reviewerName}
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-zinc-200">{(review ?? pr.review)?.summary}</p>
                </div>
              ) : (
                <div className="rounded-md border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
                  No review yet. Ask the AI maintainer for feedback.
                </div>
              )}
              <Textarea value={code} onChange={(event) => setCode(event.target.value)} className="min-h-56 font-mono" />
              <div className="flex flex-wrap gap-2">
                <Button onClick={requestReview} disabled={loading}>
                  <RefreshCcw className="h-4 w-4" />
                  {loading ? "Reviewing..." : "Request AI review"}
                </Button>
                <Button variant="secondary" onClick={() => updatePr(pr.id, { status: "Open" })}>
                  Resubmit changes
                </Button>
                <Button onClick={mergePr} disabled={pr.status !== "Approved"}>
                  <GitMerge className="h-4 w-4" />
                  Merge PR
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reviewers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {["AI Maintainer", "Human Maintainer Simulator", "Senior Contributor Bot"].map((name) => (
                <div key={name} className="flex items-center justify-between rounded-md bg-zinc-900 p-3">
                  <span>{name}</span>
                  <Badge variant="zinc">available</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="commits">
        <Card>
          <CardContent className="grid gap-3 p-5">
            {pr.commits.map((commit) => (
              <div key={commit.hash} className="flex items-center justify-between rounded-md border border-zinc-800 p-3">
                <span>{commit.message}</span>
                <code className="text-emerald-300">{commit.hash}</code>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="files">
        <Card>
          <CardContent className="grid gap-3 p-5">
            {changedFiles.map((path) => (
              <div key={path} className="rounded-md bg-zinc-900 p-3 font-mono text-sm text-zinc-300">
                + {path}
              </div>
            ))}
            {(review ?? pr.review)?.lineComments.map((comment) => (
              <div key={`${comment.path}-${comment.line}`} className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-sm">
                <strong>{comment.path}:{comment.line}</strong> {comment.body}
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="checks">
        <Card>
          <CardContent className="grid gap-3 p-5">
            {(review?.checks ?? pr.checklist.map((item) => ({ label: item.label, passed: item.done, detail: item.done ? "Complete" : "Pending" }))).map((check) => (
              <div key={check.label} className="flex items-center justify-between rounded-md border border-zinc-800 p-3">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${check.passed ? "text-emerald-400" : "text-zinc-600"}`} />
                  {check.label}
                </span>
                <span className="text-sm text-zinc-400">{check.detail}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
