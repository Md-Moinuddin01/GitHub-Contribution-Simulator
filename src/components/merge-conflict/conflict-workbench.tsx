"use client";

import { useState } from "react";
import { CheckCircle2, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { conflictSnippet } from "@/lib/demo-data";
import { useSimulatorStore } from "@/store/simulator-store";

export function ConflictWorkbench() {
  const [content, setContent] = useState(conflictSnippet);
  const [message, setMessage] = useState("Resolve the conflict by removing markers and keeping one valid title.");
  const markWorkflow = useSimulatorStore((state) => state.markWorkflow);
  const addXp = useSimulatorStore((state) => state.addXp);

  async function validate() {
    const response = await fetch("/api/conflicts/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    setMessage(result.message);
    if (result.valid) {
      markWorkflow("Resolve merge conflict");
      addXp(120);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-emerald-300" />
            Conflict editor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea className="min-h-80 font-mono" value={content} onChange={(event) => setContent(event.target.value)} />
          <Button onClick={validate}>Validate resolution</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Validation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-zinc-400">
          <p>{message}</p>
          <div className="rounded-md border border-zinc-800 p-3">
            <p className="mb-2 font-medium text-zinc-200">Rules</p>
            {["Remove <<<<<<<, =======, and >>>>>>> markers", "Keep one const title assignment", "Make the file valid JavaScript"].map((rule) => (
              <p key={rule} className="flex gap-2 py-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {rule}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
