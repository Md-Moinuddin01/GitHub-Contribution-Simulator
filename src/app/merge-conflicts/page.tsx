import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { ConflictWorkbench } from "@/components/merge-conflict/conflict-workbench";
import { Badge } from "@/components/ui/badge";

export default function MergeConflictsPage() {
  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge variant="warning">Merge conflict simulator</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Resolve a conflict</h1>
          <p className="mt-2 text-zinc-400">Practice the exact conflict-marker cleanup you will see in real Git workflows.</p>
        </div>
        <ConflictWorkbench />
      </MotionShell>
    </AppShell>
  );
}
