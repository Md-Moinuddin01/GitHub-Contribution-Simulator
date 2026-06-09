import type {
  ActivityItem,
  Badge,
  ContributionDay,
  DemoUser,
  Issue,
  PullRequest,
  Repository,
} from "@/types";

const file = (path: string, language: string, content: string) => ({
  path,
  language,
  content,
});

export const repositories: Repository[] = [
  {
    id: "repo-react-todo",
    slug: "react-todo-app",
    name: "React Todo App",
    description:
      "A small productivity app with filters, local persistence, and accessible task controls.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vitest"],
    readme:
      "# React Todo App\n\nPractice focused frontend contributions: responsive navigation, empty states, tests, and tiny UX polish.\n\n## Scripts\n\n- npm install\n- npm test\n- npm run lint\n",
    fileStructure: ["src/App.tsx", "src/components/TodoList.tsx", "src/lib/storage.ts", "README.md"],
    fakeStars: 1248,
    fakeForks: 318,
    difficulty: "Beginner",
    maintainerName: "Maya Chen",
    tags: ["frontend", "react", "accessibility"],
    githubUrl: "https://github.com/tastejs/todomvc",
    files: [
      file(
        "src/App.tsx",
        "typescript",
        "export default function App() {\n  return <main className=\"app\"><h1>Todos</h1></main>;\n}\n",
      ),
      file(
        "src/components/TodoList.tsx",
        "typescript",
        "export function TodoList({ items }: { items: string[] }) {\n  if (!items.length) return null;\n  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;\n}\n",
      ),
      file("README.md", "markdown", "# React Todo App\n\nRun `npm test` before opening a PR.\n"),
    ],
  },
  {
    id: "repo-weather-dashboard",
    slug: "weather-dashboard",
    name: "Weather Dashboard",
    description: "A weather UI with search, cards, loading states, and API error handling.",
    techStack: ["Next.js", "TypeScript", "OpenWeather", "Tailwind CSS"],
    readme: "# Weather Dashboard\n\nA fake weather project for practicing API states and component cleanup.\n",
    fileStructure: ["app/page.tsx", "components/weather-card.tsx", "lib/weather.ts", "README.md"],
    fakeStars: 932,
    fakeForks: 202,
    difficulty: "Beginner",
    maintainerName: "Noah Patel",
    tags: ["api", "frontend", "state"],
    githubUrl: "https://github.com/syawqy/react-weather-dashboard",
    files: [
      file("components/weather-card.tsx", "typescript", "export function WeatherCard() {\n  return <section>72F</section>;\n}\n"),
      file("lib/weather.ts", "typescript", "export async function getWeather() {\n  return { temp: 72 };\n}\n"),
    ],
  },
  {
    id: "repo-blog-platform",
    slug: "blog-platform",
    name: "Blog Platform",
    description: "A publishing app with markdown posts, comments, profile pages, and moderation tools.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "MDX"],
    readme: "# Blog Platform\n\nPractice full-stack changes, validation, and docs updates.\n",
    fileStructure: ["app/posts/page.tsx", "components/comment-form.tsx", "prisma/schema.prisma"],
    fakeStars: 2210,
    fakeForks: 531,
    difficulty: "Intermediate",
    maintainerName: "Riley Brooks",
    tags: ["full-stack", "database", "content"],
    githubUrl: "https://github.com/gothinkster/realworld",
    files: [
      file("components/comment-form.tsx", "typescript", "export function CommentForm() {\n  return <form><textarea /></form>;\n}\n"),
      file("prisma/schema.prisma", "prisma", "model Post {\n  id String @id @default(cuid())\n  title String\n}\n"),
    ],
  },
  {
    id: "repo-portfolio-website",
    slug: "portfolio-website",
    name: "Portfolio Website",
    description: "A designer portfolio with case studies, contact form, and smooth motion.",
    techStack: ["Astro", "React", "Tailwind CSS", "Framer Motion"],
    readme: "# Portfolio Website\n\nPractice responsive layouts, animation polish, and semantic HTML.\n",
    fileStructure: ["src/pages/index.astro", "src/components/project-card.tsx", "src/styles.css"],
    fakeStars: 689,
    fakeForks: 154,
    difficulty: "Beginner",
    maintainerName: "Sam Rivera",
    tags: ["design", "frontend", "responsive"],
    githubUrl: "https://github.com/adrianhajdin/project_3D_developer_portfolio",
    files: [file("src/components/project-card.tsx", "typescript", "export function ProjectCard() {\n  return <article>Project</article>;\n}\n")],
  },
  {
    id: "repo-ecommerce-ui",
    slug: "ecommerce-ui",
    name: "E-commerce UI",
    description: "A product browsing interface with carts, filters, skeletons, and checkout states.",
    techStack: ["React", "Redux Toolkit", "Tailwind CSS", "Playwright"],
    readme: "# E-commerce UI\n\nPractice user-facing bugs and state management workflows.\n",
    fileStructure: ["src/features/cart.ts", "src/components/product-grid.tsx", "src/components/checkout.tsx"],
    fakeStars: 1850,
    fakeForks: 447,
    difficulty: "Intermediate",
    maintainerName: "Avery Kim",
    tags: ["frontend", "state", "testing"],
    githubUrl: "https://github.com/vercel/commerce",
    files: [file("src/features/cart.ts", "typescript", "export const cart = { items: [] as string[] };\n")],
  },
  {
    id: "repo-student-management",
    slug: "student-management-system",
    name: "Student Management System",
    description: "An admin app for students, attendance, grades, and import workflows.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
    readme: "# Student Management System\n\nPractice dashboards, forms, validation, and role-based access.\n",
    fileStructure: ["app/admin/page.tsx", "app/students/page.tsx", "lib/validation.ts"],
    fakeStars: 1140,
    fakeForks: 301,
    difficulty: "Advanced",
    maintainerName: "Priya Nair",
    tags: ["admin", "backend", "auth"],
    githubUrl: "https://github.com/berthutapea/mern-student-management-system",
    files: [file("lib/validation.ts", "typescript", "export function validateEmail(value: string) {\n  return value.includes('@');\n}\n")],
  },
  {
    id: "repo-crypto-wallet",
    slug: "crypto-wallet-ui",
    name: "Crypto Wallet UI",
    description: "A wallet interface for balances, token lists, onboarding, and warnings.",
    techStack: ["React", "TypeScript", "Zustand", "Tailwind CSS"],
    readme: "# Crypto Wallet UI\n\nPractice careful UI copy, edge states, and security-oriented warnings.\n",
    fileStructure: ["src/wallet.tsx", "src/components/balance-card.tsx", "src/store/wallet.ts"],
    fakeStars: 1564,
    fakeForks: 389,
    difficulty: "Intermediate",
    maintainerName: "Jordan Lee",
    tags: ["frontend", "security", "state"],
    githubUrl: "https://github.com/rainbow-me/rainbowkit",
    files: [file("src/components/balance-card.tsx", "typescript", "export function BalanceCard() {\n  return <div>$0.00</div>;\n}\n")],
  },
  {
    id: "repo-hospital-management",
    slug: "hospital-management-app",
    name: "Hospital Management App",
    description: "A scheduling and patient workflow app with strict validation and audit trails.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Socket.io"],
    readme: "# Hospital Management App\n\nPractice complex CRUD, realtime updates, and safe error states.\n",
    fileStructure: ["app/patients/page.tsx", "app/appointments/page.tsx", "lib/audit.ts"],
    fakeStars: 2478,
    fakeForks: 612,
    difficulty: "Advanced",
    maintainerName: "Elena Garcia",
    tags: ["backend", "realtime", "forms"],
    githubUrl: "https://github.com/Kennedy-Njeri/hospital-management-system",
    files: [file("lib/audit.ts", "typescript", "export function audit(action: string) {\n  return { action, at: new Date() };\n}\n")],
  },
];

const issueTitles = [
  ["Fix broken navbar on mobile", ["bug", "frontend"]],
  ["Add dark mode toggle", ["enhancement", "frontend"]],
  ["Update README installation steps", ["documentation"]],
  ["Fix button hover state", ["bug", "frontend"]],
  ["Add empty state UI", ["enhancement", "frontend"]],
  ["Improve form validation", ["backend", "enhancement"]],
  ["Fix API error message", ["bug", "backend"]],
  ["Add loading spinner", ["enhancement", "frontend"]],
] as const;

export const issues: Issue[] = repositories.flatMap((repo, repoIndex) =>
  issueTitles.slice(0, 5).map(([title, labels], titleIndex) => {
    const number = repoIndex * 5 + titleIndex + 1;
    const difficulty: Issue["difficulty"] =
      repo.difficulty === "Advanced" && titleIndex > 1
        ? "Advanced"
        : titleIndex > 3 || repo.difficulty === "Intermediate"
          ? "Intermediate"
          : "Beginner";

    return {
      id: `issue-${number.toString().padStart(2, "0")}`,
      repositoryId: repo.id,
      title,
      description: `${title} in ${repo.name}. Keep the change scoped, update any nearby tests or docs, and explain the fix clearly in your PR.`,
      difficulty,
      labels: [...labels],
      xpReward: difficulty === "Advanced" ? 220 : difficulty === "Intermediate" ? 140 : 80,
      assignedUser: number % 7 === 0 ? "demo-maya" : undefined,
      status: number % 7 === 0 ? "Assigned" : number % 9 === 0 ? "In Progress" : "Open",
      expectedSolution:
        "Make the smallest clear code change that satisfies the issue, keep naming readable, and add a test or documented verification step.",
      testCases: ["npm run lint passes", "npm test passes", "The related UI state works on mobile and desktop"],
    };
  }),
);

export const badges: Badge[] = [
  ["first-commit", "First Commit", "Create your first simulated commit.", "GitCommit", 20],
  ["first-pr", "First Pull Request", "Open your first pull request.", "GitPullRequest", 40],
  ["first-merge", "First Merge", "Merge a pull request successfully.", "GitMerge", 80],
  ["bug-fixer", "Bug Fixer", "Close five bug-labeled issues.", "Bug", 120],
  ["documentation-hero", "Documentation Hero", "Improve docs in three repositories.", "BookOpen", 100],
  ["code-reviewer", "Code Reviewer", "Complete your first review cycle.", "MessagesSquare", 90],
  ["conflict-solver", "Merge Conflict Solver", "Resolve a simulated conflict.", "GitCompare", 120],
  ["open-source-beginner", "Open Source Beginner", "Earn 250 XP.", "Sprout", 60],
  ["open-source-pro", "Open Source Pro", "Earn 1500 XP.", "Rocket", 200],
  ["maintainer-mode", "Maintainer Mode", "Reach level 5.", "ShieldCheck", 300],
].map(([slug, name, description, icon, xpReward]) => ({
  slug: slug as string,
  name: name as string,
  description: description as string,
  icon: icon as string,
  xpReward: xpReward as number,
}));

export const demoUsers: DemoUser[] = [
  {
    id: "demo-maya",
    name: "Maya Chen",
    email: "maya@example.com",
    username: "maya",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=maya",
    level: 4,
    xp: 1680,
    badges: ["first-commit", "first-pr", "first-merge", "bug-fixer"],
    contributionsCount: 87,
    role: "ADMIN",
  },
  {
    id: "demo-ravi",
    name: "Ravi Kumar",
    email: "ravi@example.com",
    username: "ravi",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=ravi",
    level: 3,
    xp: 910,
    badges: ["first-commit", "first-pr", "documentation-hero"],
    contributionsCount: 42,
  },
  {
    id: "demo-lina",
    name: "Lina Gomez",
    email: "lina@example.com",
    username: "lina",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=lina",
    level: 2,
    xp: 540,
    badges: ["first-commit", "open-source-beginner"],
    contributionsCount: 25,
  },
  {
    id: "demo-omar",
    name: "Omar Ali",
    email: "omar@example.com",
    username: "omar",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=omar",
    level: 5,
    xp: 2400,
    badges: ["first-merge", "code-reviewer", "open-source-pro"],
    contributionsCount: 112,
  },
  {
    id: "demo-nia",
    name: "Nia Walker",
    email: "nia@example.com",
    username: "nia",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=nia",
    level: 1,
    xp: 180,
    badges: ["first-commit"],
    contributionsCount: 9,
  },
];

export const pullRequests: PullRequest[] = Array.from({ length: 10 }, (_, index) => {
  const repo = repositories[index % repositories.length];
  const issue = issues[index];
  const status: PullRequest["status"][] = [
    "Open",
    "Changes Requested",
    "Approved",
    "Merged",
    "Draft",
  ];

  return {
    id: `pr-${index + 1}`,
    number: index + 12,
    repositoryId: repo.id,
    issueId: issue.id,
    author: demoUsers[index % demoUsers.length].username,
    title: `${issue.title} in ${repo.name}`,
    description: `Closes ${issue.id}. This PR updates the related implementation and includes manual verification notes.`,
    sourceBranch: `fix/${issue.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    targetBranch: "main",
    status: status[index % status.length],
    commits: [
      {
        hash: `${(index + 1).toString(16)}a9f3c${index}`,
        message: issue.title,
        createdAt: new Date(Date.now() - index * 86400000).toISOString(),
      },
    ],
    changedFiles: repo.files.slice(0, 2).map((item) => item.path),
    checklist: [
      { label: "Linked issue", done: true },
      { label: "Tests pass", done: index % 3 !== 1 },
      { label: "Docs updated when needed", done: index % 4 !== 2 },
    ],
    review:
      index % 2 === 0
        ? {
            reviewerName: "AI Maintainer",
            decision: index % 4 === 0 ? "APPROVE" : "REQUEST_CHANGES",
            summary:
              index % 4 === 0
                ? "Great contribution. The scope is tight and the verification notes are clear."
                : "Thanks for the contribution. Please tighten the naming and add one missing loading or empty-state check.",
            lineComments: [
              {
                path: repo.files[0]?.path ?? "src/App.tsx",
                line: 3,
                body: "Consider a more descriptive variable name here.",
              },
            ],
          }
        : undefined,
  };
});

export const contributionDays: ContributionDay[] = Array.from({ length: 98 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (97 - index));
  const seed = (index * 7) % 11;
  return {
    date: date.toISOString().slice(0, 10),
    commits: seed % 4,
    issues: seed % 3 === 0 ? 1 : 0,
    prsMerged: seed % 7 === 0 ? 1 : 0,
    reviews: seed % 5 === 0 ? 1 : 0,
    xpEarned: seed * 10,
  };
});

export const activity: ActivityItem[] = [
  { id: "a1", type: "issue", message: "Assigned issue: Add empty state UI", time: "12 minutes ago" },
  { id: "a2", type: "commit", message: "Committed changes on fix/empty-state", time: "34 minutes ago" },
  { id: "a3", type: "review", message: "AI Maintainer requested two changes", time: "1 hour ago" },
  { id: "a4", type: "merge", message: "Merged PR #18 in Weather Dashboard", time: "Yesterday" },
  { id: "a5", type: "badge", message: "Unlocked Documentation Hero", time: "2 days ago" },
];

export const dailyChallenges = [
  "Fix one beginner bug issue",
  "Run fake tests after editing code",
  "Write a PR description with a checklist",
];

export const weeklyChallenges = [
  "Merge 3 simulated pull requests",
  "Resolve one merge conflict",
  "Earn 500 XP from documentation or bug fixes",
];

export const conflictSnippet =
  '<<<<<<< main\nconst title = "Open Source Practice";\n=======\nconst title = "GitHub Simulator";\n>>>>>>> feature-branch\n';
