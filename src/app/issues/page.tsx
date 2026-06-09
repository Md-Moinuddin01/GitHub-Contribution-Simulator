import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { IssueMarketplace } from "@/components/issue/issue-marketplace";
import { Badge } from "@/components/ui/badge";

export default function IssuesPage() {
  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge variant="purple">Issue marketplace</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Browse practice issues</h1>
          <p className="mt-2 text-zinc-400">Filter by difficulty and label, assign an issue, and start coding.</p>
        </div>
        <IssueMarketplace />
      </MotionShell>
    </AppShell>
  );
}
