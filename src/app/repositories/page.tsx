import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { RepositoryCard } from "@/components/repository/repository-card";
import { Badge } from "@/components/ui/badge";
import { repositories } from "@/lib/demo-data";

export default function RepositoriesPage() {
  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge>Fake repository system</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Explore repositories</h1>
          <p className="mt-2 text-zinc-400">Choose a safe open-source sandbox with issues, files, and PR history.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {repositories.map((repository) => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))}
        </div>
      </MotionShell>
    </AppShell>
  );
}
