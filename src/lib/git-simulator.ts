type GitState = {
  branch?: string;
  hasChanges?: boolean;
  staged?: boolean;
  committed?: boolean;
  pushed?: boolean;
};

export function simulateTerminalCommand(command: string, state: GitState = {}) {
  const normalized = command.trim();

  if (normalized === "git status") {
    if (state.staged) {
      return "On branch " + (state.branch ?? "feature/practice") + "\nChanges to be committed:\n  modified: src/components/TodoList.tsx";
    }

    if (state.hasChanges) {
      return "On branch " + (state.branch ?? "feature/practice") + "\nChanges not staged for commit:\n  modified: src/components/TodoList.tsx";
    }

    return "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean";
  }

  if (normalized === "git add .") {
    return "Staged all modified files.\nRun git commit -m \"your message\" next.";
  }

  if (normalized.startsWith("git commit -m")) {
    const message = normalized.match(/"(.+)"/)?.[1] ?? "practice contribution";
    return `[feature/practice ${Math.random().toString(16).slice(2, 9)}] ${message}\n 2 files changed, 18 insertions(+), 4 deletions(-)`;
  }

  if (normalized.startsWith("git push origin")) {
    const branch = normalized.replace("git push origin", "").trim() || "feature/practice";
    return `Enumerating objects: 8, done.\nWriting objects: 100% (8/8), done.\nremote: Create a pull request for '${branch}' on GitHub Contribution Simulator.\nTo origin/${branch}`;
  }

  if (normalized === "npm test") {
    return "PASS src/components/TodoList.test.tsx\nPASS src/lib/git-simulator.test.ts\n\nTest Suites: 2 passed, 2 total\nTests: 9 passed, 9 total";
  }

  if (normalized === "npm run lint") {
    return "> simulator-repo@1.0.0 lint\n> eslint .\n\nNo lint warnings found.";
  }

  if (normalized === "npm install") {
    return "added 248 packages, and audited 249 packages in 4s\nfound 0 vulnerabilities";
  }

  return `Command not recognized in the simulator: ${normalized}\nTry git status, git add ., git commit -m \"message\", git push origin branch-name, npm test, or npm run lint.`;
}

export const workflowSteps = [
  "Fork repository",
  "Create branch",
  "Edit code",
  "Stage changes",
  "Commit changes",
  "Push branch",
  "Open pull request",
];
