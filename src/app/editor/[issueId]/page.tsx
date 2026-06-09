import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { MotionShell } from "@/components/layout/motion-shell";
import { CodeEditorWorkspace } from "@/components/editor/code-editor-workspace";
import { Badge } from "@/components/ui/badge";
import { issues, repositories } from "@/lib/demo-data";

export default function EditorPage({ params }: { params: { issueId: string } }) {
  const issue = issues.find((item) => item.id === params.issueId);
  if (!issue) notFound();
  const repo = repositories.find((item) => item.id === issue.repositoryId);

  return (
    <AppShell>
      <MotionShell className="space-y-6">
        <div>
          <Badge>{repo?.name}</Badge>
          <h1 className="mt-3 text-3xl font-semibold">Browser code editor</h1>
          <p className="mt-2 text-zinc-400">Edit files, run fake tests, commit changes, push a branch, and open a simulated PR.</p>
        </div>
        <CodeEditorWorkspace issue={issue} />
      </MotionShell>
    </AppShell>
  );
}
