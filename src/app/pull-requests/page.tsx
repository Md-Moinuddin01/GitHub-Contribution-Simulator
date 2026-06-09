import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { PullRequestList } from "@/components/pull-request/pull-request-list";
import { Badge } from "@/components/ui/badge";

export default function PullRequestsPage() {
  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge variant="blue">Pull request simulator</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Pull requests</h1>
          <p className="mt-2 text-zinc-400">Review conversations, commits, files changed, checks, approvals, and merges.</p>
        </div>
        <PullRequestList />
      </MotionShell>
    </AppShell>
  );
}
