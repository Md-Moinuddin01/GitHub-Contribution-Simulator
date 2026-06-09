import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { AdminConsole } from "@/components/admin/admin-console";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge variant="purple">Admin panel</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Content and analytics</h1>
          <p className="mt-2 text-zinc-400">Create repositories, edit issues, view users and PRs, manage badges, and inspect platform metrics.</p>
        </div>
        <AdminConsole />
      </MotionShell>
    </AppShell>
  );
}
