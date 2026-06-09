import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return (
    <AppShell>
      <MotionShell>
        <DashboardView />
      </MotionShell>
    </AppShell>
  );
}
