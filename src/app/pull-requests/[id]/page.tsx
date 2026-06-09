import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { PullRequestReviewer } from "@/components/pull-request/pull-request-reviewer";
import { Badge } from "@/components/ui/badge";
import { pullRequests } from "@/lib/demo-data";

export default function PullRequestPage({ params }: { params: { id: string } }) {
  const pr = pullRequests.find((item) => item.id === params.id) ?? pullRequests[0];
  if (!pr) notFound();

  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge variant="blue">PR #{pr.number}</Badge>
          <h1 className="mt-3 text-3xl font-semibold">{pr.title}</h1>
          <p className="mt-2 text-zinc-400">
            {pr.sourceBranch} into {pr.targetBranch}
          </p>
        </div>
        <PullRequestReviewer pullRequest={pr} />
      </MotionShell>
    </AppShell>
  );
}
