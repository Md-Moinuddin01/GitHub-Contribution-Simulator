"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, GitBranch, GitCommit, Play, RotateCcw, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { simulateTerminalCommand, workflowSteps } from "@/lib/git-simulator";
import { repositories } from "@/lib/demo-data";
import { useSimulatorStore } from "@/store/simulator-store";
import type { Issue, PullRequest } from "@/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="flex h-[480px] items-center justify-center bg-zinc-950 text-zinc-500">Loading Monaco editor...</div>,
});

const supportedLanguages = [
  { id: "typescript", label: "TypeScript", monacoLanguage: "typescript" },
  { id: "tsx", label: "TSX", monacoLanguage: "typescript" },
  { id: "javascript", label: "JavaScript", monacoLanguage: "javascript" },
  { id: "jsx", label: "JSX", monacoLanguage: "javascript" },
  { id: "html", label: "HTML", monacoLanguage: "html" },
  { id: "css", label: "CSS", monacoLanguage: "css" },
  { id: "json", label: "JSON", monacoLanguage: "json" },
  { id: "markdown", label: "Markdown", monacoLanguage: "markdown" },
  { id: "prisma", label: "Prisma", monacoLanguage: "prisma" },
  { id: "python", label: "Python", monacoLanguage: "python" },
] as const;

export function CodeEditorWorkspace({ issue }: { issue: Issue }) {
  const repository = repositories.find((item) => item.id === issue.repositoryId) ?? repositories[0];
  const [activePath, setActivePath] = useState(repository.files[0]?.path ?? "src/App.tsx");
  const activeFile = repository.files.find((item) => item.path === activePath) ?? repository.files[0];
  const [files, setFiles] = useState<Record<string, string>>(
    Object.fromEntries(repository.files.map((file) => [file.path, file.content])),
  );
  const [fileLanguages, setFileLanguages] = useState<Record<string, string>>(
    Object.fromEntries(repository.files.map((file) => [file.path, file.language])),
  );
  const [terminal, setTerminal] = useState("$ git status\n" + simulateTerminalCommand("git status"));
  const [command, setCommand] = useState("npm test");
  const [branch, setBranch] = useState(`fix/${issue.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
  const [commitMessage, setCommitMessage] = useState(issue.title);
  const [prTitle, setPrTitle] = useState(issue.title);
  const [prDescription, setPrDescription] = useState(`Closes ${issue.id}\n\nSummary:\n- ${issue.expectedSolution}\n\nVerification:\n- npm test\n- npm run lint`);
  const markWorkflow = useSimulatorStore((state) => state.markWorkflow);
  const workflow = useSimulatorStore((state) => state.workflow);
  const updateIssueStatus = useSimulatorStore((state) => state.updateIssueStatus);
  const createPr = useSimulatorStore((state) => state.createPr);

  const currentCode = files[activePath] ?? activeFile?.content ?? "";
  const activeLanguageId = fileLanguages[activePath] ?? activeFile?.language ?? "typescript";
  const activeLanguage = supportedLanguages.find((language) => language.id === activeLanguageId) ?? supportedLanguages[0];
  const completedCount = workflowSteps.filter((step) => workflow[step]).length;
  const tests = useMemo(() => issue.testCases, [issue.testCases]);

  const runCommand = (value = command) => {
    const output = simulateTerminalCommand(value, {
      branch,
      hasChanges: workflow["Edit code"],
      staged: workflow["Stage changes"],
      committed: workflow["Commit changes"],
      pushed: workflow["Push branch"],
    });
    setTerminal((previous) => `${previous}\n\n$ ${value}\n${output}`);
    if (value === "git add .") markWorkflow("Stage changes");
    if (value.startsWith("git commit")) markWorkflow("Commit changes");
    if (value.startsWith("git push")) markWorkflow("Push branch");
    if (value === "npm test" || value === "npm run lint") updateIssueStatus(issue.id, "In Progress");
  };

  const saveFile = () => {
    markWorkflow("Edit code");
    updateIssueStatus(issue.id, "In Progress");
    setTerminal((previous) => `${previous}\n\nSaved ${activePath}`);
  };

  const openPullRequest = () => {
    const pr: PullRequest = {
      id: `local-pr-${Date.now()}`,
      number: Math.floor(Math.random() * 800) + 200,
      repositoryId: repository.id,
      issueId: issue.id,
      author: "you",
      title: prTitle,
      description: prDescription,
      sourceBranch: branch,
      targetBranch: "main",
      status: "Open",
      commits: [{ hash: Math.random().toString(16).slice(2, 9), message: commitMessage, createdAt: new Date().toISOString() }],
      changedFiles: Object.keys(files).filter((path) => files[path] !== repository.files.find((file) => file.path === path)?.content),
      checklist: [
        { label: "Fork completed", done: Boolean(workflow["Fork repository"]) },
        { label: "Branch created", done: Boolean(workflow["Create branch"]) },
        { label: "Files modified", done: Boolean(workflow["Edit code"]) },
        { label: "Commit created", done: Boolean(workflow["Commit changes"]) },
        { label: "Pull request opened", done: true },
      ],
    };
    createPr(pr);
    markWorkflow("Open pull request");
    updateIssueStatus(issue.id, "Submitted");
    setTerminal((previous) => `${previous}\n\nOpened PR #${pr.number}: ${pr.title}`);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_1fr_360px]">
      <aside className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Issue requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-400">
            <h2 className="text-base font-semibold text-white">{issue.title}</h2>
            <p>{issue.description}</p>
            <div className="flex flex-wrap gap-2">
              {issue.labels.map((label) => (
                <Badge key={label} variant="zinc">
                  {label}
                </Badge>
              ))}
              <Badge>{issue.xpReward} XP</Badge>
            </div>
            <div>
              <p className="mb-2 font-medium text-zinc-200">Test cases</p>
              <ul className="space-y-1">
                {tests.map((test) => (
                  <li key={test} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                    {test}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>File tree</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {repository.files.map((file) => (
              <button
                key={file.path}
                className={`rounded-md px-3 py-2 text-left font-mono text-sm ${activePath === file.path ? "bg-emerald-500 text-zinc-950" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"}`}
                onClick={() => setActivePath(file.path)}
              >
                {file.path}
              </button>
            ))}
          </CardContent>
        </Card>
      </aside>

      <section className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 p-3">
          <div className="font-mono text-sm text-zinc-300">{activePath}</div>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 text-xs text-zinc-500">
              Language
              <select
                value={activeLanguageId}
                onChange={(event) => {
                  setFileLanguages((current) => ({ ...current, [activePath]: event.target.value }));
                  markWorkflow("Edit code");
                }}
                className="h-8 rounded-md border border-zinc-800 bg-zinc-950 px-2 text-xs text-zinc-100 outline-none focus:border-emerald-500"
              >
                {supportedLanguages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.label}
                  </option>
                ))}
              </select>
            </label>
            <Button size="sm" variant="secondary" onClick={() => setFiles((current) => ({ ...current, [activePath]: activeFile?.content ?? "" }))}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button size="sm" onClick={saveFile}>
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
        <MonacoEditor
          height="540px"
          theme="vs-dark"
          language={activeLanguage.monacoLanguage}
          value={currentCode}
          onChange={(value) => setFiles((current) => ({ ...current, [activePath]: value ?? "" }))}
          options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on", padding: { top: 16 } }}
        />
      </section>

      <aside className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Git workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="secondary" onClick={() => markWorkflow("Fork repository")}>
              Fork repository
            </Button>
            <div className="flex gap-2">
              <Input value={branch} onChange={(event) => setBranch(event.target.value)} />
              <Button size="icon" onClick={() => markWorkflow("Create branch")} aria-label="Create branch">
                <GitBranch className="h-4 w-4" />
              </Button>
            </div>
            <Input value={commitMessage} onChange={(event) => setCommitMessage(event.target.value)} />
            <div className="grid gap-2">
              {workflowSteps.map((step) => (
                <div key={step} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className={`h-4 w-4 ${workflow[step] ? "text-emerald-400" : "text-zinc-700"}`} />
                  <span className={workflow[step] ? "text-zinc-100" : "text-zinc-500"}>{step}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500">{completedCount} of {workflowSteps.length} steps complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terminal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="max-h-64 overflow-auto rounded-md bg-black p-3 text-xs leading-5 text-emerald-200">{terminal}</pre>
            <div className="flex gap-2">
              <Input value={command} onChange={(event) => setCommand(event.target.value)} />
              <Button size="icon" onClick={() => runCommand()} aria-label="Run command">
                <Play className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["git status", "git add .", `git commit -m \"${commitMessage}\"`, `git push origin ${branch}`, "npm test", "npm run lint"].map((item) => (
                <Button key={item} size="sm" variant="outline" onClick={() => runCommand(item)}>
                  {item.split(" ")[0] === "git" ? <GitCommit className="h-3 w-3" /> : null}
                  {item}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open pull request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={prTitle} onChange={(event) => setPrTitle(event.target.value)} />
            <Textarea value={prDescription} onChange={(event) => setPrDescription(event.target.value)} />
            <Button className="w-full" onClick={openPullRequest}>
              Open simulated PR
            </Button>
            <Button asChild className="w-full" variant="secondary">
              <Link href="/pull-requests">Go to pull requests</Link>
            </Button>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
