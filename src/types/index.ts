export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type IssueStatus =
  | "Open"
  | "Assigned"
  | "In Progress"
  | "Submitted"
  | "Closed";

export type PullRequestStatus =
  | "Draft"
  | "Open"
  | "Changes Requested"
  | "Approved"
  | "Merged"
  | "Closed";

export type RepoFile = {
  path: string;
  language: string;
  content: string;
};

export type Repository = {
  id: string;
  slug: string;
  name: string;
  description: string;
  techStack: string[];
  readme: string;
  fileStructure: string[];
  fakeStars: number;
  fakeForks: number;
  difficulty: Difficulty;
  maintainerName: string;
  tags: string[];
  files: RepoFile[];
  githubUrl: string;
};

export type Issue = {
  id: string;
  repositoryId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  labels: string[];
  xpReward: number;
  assignedUser?: string;
  status: IssueStatus;
  expectedSolution: string;
  testCases: string[];
};

export type Badge = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
};

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  badges: string[];
  contributionsCount: number;
  role?: "USER" | "ADMIN";
};

export type PullRequest = {
  id: string;
  number: number;
  repositoryId: string;
  issueId?: string;
  author: string;
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
  status: PullRequestStatus;
  commits: { hash: string; message: string; createdAt: string }[];
  changedFiles: string[];
  checklist: { label: string; done: boolean }[];
  review?: {
    reviewerName: string;
    decision: "COMMENT" | "REQUEST_CHANGES" | "APPROVE";
    summary: string;
    lineComments: { path: string; line: number; body: string }[];
  };
};

export type ContributionDay = {
  date: string;
  commits: number;
  issues: number;
  prsMerged: number;
  reviews: number;
  xpEarned: number;
};

export type ActivityItem = {
  id: string;
  type:
    | "issue"
    | "commit"
    | "pull-request"
    | "review"
    | "badge"
    | "merge"
    | "conflict";
  message: string;
  time: string;
};
