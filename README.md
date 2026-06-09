# GitHub Contribution Simulator

Practice Open Source Before Contributing to Real Repositories.

This is a full-stack Next.js 14 App Router application for learning the open-source contribution workflow in a safe sandbox. It includes fake repositories, issues, Monaco-based editing, Git command simulation, pull requests, AI maintainer review, XP, badges, heatmaps, leaderboards, admin analytics, Prisma models, and seed data.

<img width="1897" height="979" alt="git semulator" src="https://github.com/user-attachments/assets/421b7450-6c5f-4564-a2e6-e0c72a605fa4" />
## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- shadcn-style UI primitives with Radix
- Prisma ORM with PostgreSQL
- NextAuth credentials auth with Prisma adapter
- Monaco Editor
- Zustand local simulator state
- Supabase Realtime-ready helper, with local event fallback
- OpenAI or Gemini AI review integration, with deterministic fallback

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```
Use this public URL to open the app from any device anywhere:

https://fluffy-trains-pick.loca.lt

I verified that this tunnel currently responds with HTTP 200 OK.
The local app is also available on your machine at http://localhost:3000.
Open http://localhost:3000.

Demo login:

- Email: `maya@example.com`
- Password: `password`

The UI runs with local simulator data immediately. For real database persistence, run PostgreSQL and set `DATABASE_URL`, then:

```bash
npm run db:migrate
npm run db:seed
```

## Environment Variables

See `.env.example`.

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: local or deployed URL
- `NEXTAUTH_SECRET`: long random secret
- `OPENAI_API_KEY` or `GEMINI_API_KEY`: optional AI maintainer review
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: optional realtime channel support

## Key Routes

- `/` landing page
- `/auth/signup` and `/auth/login`
- `/dashboard`
- `/repositories`
- `/repositories/[slug]`
- `/issues`
- `/editor/[issueId]`
- `/pull-requests`
- `/pull-requests/[id]`
- `/leaderboard`
- `/admin`

## Main Pages

- `/` - Landing page with product overview, features, testimonials, pricing, FAQ, and action hub.
- `/auth/login` - Login form with demo access.
- `/auth/signup` - Demo signup flow.
- `/dashboard` - XP, level, solved issues, merged PRs, badges, heatmap, activity, and quick actions.
- `/repositories` - Practice repository catalog.
- `/repositories/[slug]` - Repository tabs for code, issues, pull requests, README, and contributors.
- `/issues` - Issue marketplace with filtering and assignment.
- `/editor/[issueId]` - Monaco editor, file tree, language selector, terminal, tests, commits, and PR creation.
- `/pull-requests` - Simulated PR list.
- `/pull-requests/[id]` - Conversation, commits, files changed, checks, review, and merge.
- `/merge-conflicts` - Manual merge conflict practice.
- `/leaderboard` - XP and contributor ranking.
- `/admin` - Admin dashboard for content and analytics.
- 
## Deployment Guide for Vercel

1. Push this folder to GitHub.
2. Create a PostgreSQL database such as Neon, Supabase, or Vercel Postgres.
3. Add the environment variables in Vercel Project Settings.
4. Set `NEXTAUTH_URL` to your deployed domain.
5. Run the Prisma migration from your machine or CI:

```bash
npm run db:migrate
npm run db:seed
```

6. Deploy with Vercel. The app uses deterministic AI review if no provider key is configured.

## Seed Data

The seed includes:

- 8 fake repositories
- 40 issues
- 10 badges
- 5 demo users
- 10 demo pull requests
- Example files and branches for each repository

## Notes

Protected routes accept either a NextAuth JWT session or the local simulator cookie set by the demo auth form. This keeps the app usable before PostgreSQL is connected while preserving the production database/auth path.

