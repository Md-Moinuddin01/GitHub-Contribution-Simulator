import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { RepositoryTabs } from "@/components/repository/repository-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { repositories } from "@/lib/demo-data";

export default function RepositoryPage({ params }: { params: { slug: string } }) {
  const repository = repositories.find((item) => item.slug === params.slug);
  if (!repository) notFound();

  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{repository.difficulty}</Badge>
              {repository.tags.map((tag) => (
                <Badge key={tag} variant="zinc">{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-3 text-3xl font-semibold">{repository.name}</h1>
            <p className="mt-2 max-w-3xl text-zinc-400">{repository.description}</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-sm text-zinc-500">Maintained by {repository.maintainerName}</p>
            <Button asChild variant="outline">
              <a href={repository.githubUrl} target="_blank" rel="noreferrer">
                View existing GitHub repo
              </a>
            </Button>
          </div>
        </div>
        <RepositoryTabs repository={repository} />
      </MotionShell>
    </AppShell>
  );
}
