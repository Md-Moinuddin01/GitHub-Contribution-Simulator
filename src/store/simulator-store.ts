"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoUsers, issues, pullRequests } from "@/lib/demo-data";
import type { DemoUser, IssueStatus, PullRequest } from "@/types";

type SimulatorState = {
  user: DemoUser | null;
  localUsers: DemoUser[];
  xp: number;
  issueStatus: Record<string, IssueStatus>;
  prs: PullRequest[];
  workflow: Record<string, boolean>;
  login: (emailOrUsername: string, password?: string) => boolean;
  signup: (input: { name: string; email: string; username: string; password: string }) => DemoUser;
  logout: () => void;
  assignIssue: (issueId: string) => void;
  updateIssueStatus: (issueId: string, status: IssueStatus) => void;
  addXp: (amount: number) => void;
  markWorkflow: (step: string) => void;
  createPr: (pr: PullRequest) => void;
  updatePr: (id: string, patch: Partial<PullRequest>) => void;
};

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set) => ({
      user: null,
      localUsers: [],
      xp: 0,
      issueStatus: Object.fromEntries(issues.map((issue) => [issue.id, issue.status])),
      prs: pullRequests,
      workflow: {},
      login: (emailOrUsername, password) => {
        const normalized = emailOrUsername.toLowerCase().trim();
        const user =
          useSimulatorStore
            .getState()
            .localUsers.find(
              (item) => item.email.toLowerCase() === normalized || item.username.toLowerCase() === normalized,
            ) ??
          demoUsers.find(
            (item) => item.email.toLowerCase() === normalized || item.username.toLowerCase() === normalized,
          );

        if (!user) return false;
        if (!useSimulatorStore.getState().localUsers.some((item) => item.id === user.id) && password && !["password", "demo123"].includes(password)) {
          return false;
        }

        document.cookie = `simulator-auth=${encodeURIComponent(user.username)}; path=/; max-age=604800; SameSite=Lax`;
        set({ user, xp: user.xp });
        return true;
      },
      signup: (input) => {
        const user: DemoUser = {
          id: `local-${input.username.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
          name: input.name,
          email: input.email.toLowerCase().trim(),
          username: input.username.toLowerCase().trim(),
          avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(input.username)}`,
          level: 1,
          xp: 0,
          badges: [],
          contributionsCount: 0,
        };
        document.cookie = `simulator-auth=${encodeURIComponent(user.username)}; path=/; max-age=604800; SameSite=Lax`;
        set((state) => ({
          localUsers: [
            user,
            ...state.localUsers.filter(
              (item) => item.email !== user.email && item.username !== user.username,
            ),
          ],
          user,
          xp: user.xp,
        }));
        return user;
      },
      logout: () => {
        document.cookie = "simulator-auth=; path=/; max-age=0; SameSite=Lax";
        set({ user: null, xp: 0, workflow: {} });
      },
      assignIssue: (issueId) =>
        set((state) => ({
          issueStatus: { ...state.issueStatus, [issueId]: "Assigned" },
        })),
      updateIssueStatus: (issueId, status) =>
        set((state) => ({
          issueStatus: { ...state.issueStatus, [issueId]: status },
        })),
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      markWorkflow: (step) =>
        set((state) => ({
          workflow: { ...state.workflow, [step]: true },
        })),
      createPr: (pr) => set((state) => ({ prs: [pr, ...state.prs] })),
      updatePr: (id, patch) =>
        set((state) => ({
          prs: state.prs.map((pr) => (pr.id === id ? { ...pr, ...patch } : pr)),
        })),
      }),
    {
      name: "github-contribution-simulator",
      partialize: (state) => ({
        user: state.user,
        localUsers: state.localUsers,
        xp: state.xp,
        issueStatus: state.issueStatus,
        prs: state.prs,
        workflow: state.workflow,
      }),
    },
  ),
);
