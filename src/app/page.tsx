import Link from "next/link";
import {
  BadgeCheck,
  Bot,
  Code2,
  Flame,
  GitBranch,
  GitPullRequest,
  Merge,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { FramerReveal } from "@/components/layout/framer-reveal";
import { ActionHub } from "@/components/layout/action-hub";

const features = [
  ["Fake Repositories", Code2, "Practice in safe, realistic repos with README files, issues, and code."],
  ["Pull Request Simulator", GitPullRequest, "Open PRs with commits, changed files, checks, and conversations."],
  ["AI Maintainer Review", Bot, "Get realistic feedback on code quality, tests, naming, and scope."],
  ["Merge Conflict Practice", Merge, "Resolve classic conflict markers and validate your solution."],
  ["Issue Assignment", GitBranch, "Assign issues and move them through a real contribution workflow."],
  ["Contribution Heatmap", Flame, "Build XP, streaks, badges, and a GitHub-style activity history."],
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.22),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.16),transparent_24%),radial-gradient(circle_at_55%_80%,rgba(168,85,247,0.16),transparent_24%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1fr_520px] lg:py-28">
            <FramerReveal className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit" variant="blue">
                Duolingo for Open Source
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Practice Open Source Before Contributing to Real Repositories
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                Learn the complete GitHub contribution loop: pick issues, edit code, commit changes,
                open pull requests, respond to reviews, resolve conflicts, and merge with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/auth/signup">Start Practicing</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/repositories">Explore Repositories</Link>
                </Button>
              </div>
            </FramerReveal>
            <FramerReveal className="rounded-lg border border-zinc-800 bg-black/50 p-4 shadow-2xl">
              <div className="rounded-md border border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 font-mono text-xs text-zinc-500">feature/empty-state</span>
                </div>
                <pre className="overflow-hidden p-5 text-sm leading-7 text-zinc-300">
                  <code>{`$ git status
modified: src/components/TodoList.tsx

$ npm test
PASS TodoList.test.tsx

AI Maintainer:
"The solution is close. Add a clearer
empty state and include verification."`}</code>
                </pre>
              </div>
            </FramerReveal>
          </div>
        </section>

        <ActionHub />

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <Badge variant="purple">Features</Badge>
              <h2 className="mt-3 text-3xl font-semibold">Everything beginners need before the real thing</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, Icon, description]) => (
              <Card key={title}>
                <CardHeader>
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-zinc-400">{description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-zinc-800 bg-zinc-900/35">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 md:grid-cols-4">
            {["Choose a fake repository", "Assign an issue", "Open a pull request", "Review, fix, merge"].map((step, index) => (
              <Card key={step}>
                <CardContent className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-zinc-950">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold">{step}</h3>
                  <p className="mt-2 text-sm text-zinc-400">A guided workflow turns Git commands into repeatable muscle memory.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 lg:grid-cols-3">
          {[
            ["I finally understood PR review without feeling exposed in a real repo.", "Ravi, bootcamp student"],
            ["The conflict practice made Git less scary. That alone is worth it.", "Lina, junior developer"],
            ["It feels like GitHub, LeetCode, Replit, and a coach in one workspace.", "Omar, community mentor"],
          ].map(([quote, author]) => (
            <Card key={author}>
              <CardContent className="p-5">
                <Sparkles className="mb-4 h-5 w-5 text-purple-300" />
                <p className="text-zinc-200">&quot;{quote}&quot;</p>
                <p className="mt-4 text-sm text-zinc-500">{author}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["Free", "$0", "Practice repositories, issues, terminal, heatmap, badges"],
              ["Pro", "$9", "Advanced repos, richer AI reviews, weekly challenges"],
              ["Teams", "$29", "Classrooms, admin analytics, custom issue packs"],
            ].map(([name, price, detail]) => (
              <Card key={name} className={name === "Pro" ? "border-emerald-500/60" : undefined}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-semibold">{price}</div>
                  <p className="mt-3 min-h-12 text-sm text-zinc-400">{detail}</p>
                  <Button className="mt-5 w-full" variant={name === "Free" ? "secondary" : "default"}>
                    Choose {name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-800">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2">
            {[
              ["Does this connect to real GitHub?", "No. It intentionally simulates contribution workflows before you touch real repositories."],
              ["Is the AI review real?", "Yes when OpenAI or Gemini keys are configured; otherwise a deterministic maintainer simulator runs locally."],
              ["Can admins create content?", "Yes. The admin console includes repository, issue, badge, leaderboard, and analytics management flows."],
              ["Can I deploy it?", "Yes. It is built for Vercel with Prisma/PostgreSQL environment variables."],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-lg border border-zinc-800 p-5">
                <h3 className="font-semibold">{question}</h3>
                <p className="mt-2 text-sm text-zinc-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-800 px-4 py-8 text-center text-sm text-zinc-500">
        <BadgeCheck className="mx-auto mb-2 h-5 w-5 text-emerald-300" />
        Built for safe, realistic open-source practice.
      </footer>
    </div>
  );
}
