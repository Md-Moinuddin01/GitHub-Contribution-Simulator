import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { badges, demoUsers, issues, pullRequests, repositories } from "../src/lib/demo-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const difficultyMap = {
  Beginner: "BEGINNER",
  Intermediate: "INTERMEDIATE",
  Advanced: "ADVANCED",
} as const;

const issueStatusMap = {
  Open: "OPEN",
  Assigned: "ASSIGNED",
  "In Progress": "IN_PROGRESS",
  Submitted: "SUBMITTED",
  Closed: "CLOSED",
} as const;

const prStatusMap = {
  Draft: "DRAFT",
  Open: "OPEN",
  "Changes Requested": "CHANGES_REQUESTED",
  Approved: "APPROVED",
  Merged: "MERGED",
  Closed: "CLOSED",
} as const;

async function main() {
  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        image: user.avatar,
        level: user.level,
        xp: user.xp,
        contributionsCount: user.contributionsCount,
        role: user.role ?? "USER",
        passwordHash: await bcrypt.hash("password", 10),
      },
    });
  }

  for (const repo of repositories) {
    await prisma.repository.upsert({
      where: { slug: repo.slug },
      update: {},
      create: {
        id: repo.id,
        slug: repo.slug,
        name: repo.name,
        description: repo.description,
        techStack: repo.techStack,
        readme: repo.readme,
        fileStructure: repo.fileStructure,
        fakeStars: repo.fakeStars,
        fakeForks: repo.fakeForks,
        difficulty: difficultyMap[repo.difficulty],
        maintainerName: repo.maintainerName,
        tags: repo.tags,
        githubUrl: repo.githubUrl,
        branches: {
          create: [
            { name: "main", isDefault: true },
            { name: "good-first-issues", baseBranch: "main" },
          ],
        },
        files: {
          create: repo.files.map((file) => ({
            path: file.path,
            language: file.language,
            content: file.content,
            starter: file.content,
          })),
        },
      },
    });
  }

  for (const issue of issues) {
    await prisma.issue.upsert({
      where: { id: issue.id },
      update: {},
      create: {
        id: issue.id,
        repositoryId: issue.repositoryId,
        title: issue.title,
        description: issue.description,
        difficulty: difficultyMap[issue.difficulty],
        labels: issue.labels,
        xpReward: issue.xpReward,
        status: issueStatusMap[issue.status],
        expectedSolution: issue.expectedSolution,
        testCases: issue.testCases,
        assignedUserId: issue.assignedUser,
      },
    });
  }

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: badge,
    });
  }

  for (const user of demoUsers) {
    for (const badgeSlug of user.badges) {
      const badge = await prisma.badge.findUnique({ where: { slug: badgeSlug } });
      if (!badge) continue;
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: user.id, badgeId: badge.id } },
        update: {},
        create: { userId: user.id, badgeId: badge.id },
      });
    }
  }

  for (const [index, pr] of pullRequests.entries()) {
    const author = demoUsers[index % demoUsers.length];
    await prisma.pullRequest.upsert({
      where: { repositoryId_number: { repositoryId: pr.repositoryId, number: pr.number } },
      update: {},
      create: {
        id: pr.id,
        number: pr.number,
        repositoryId: pr.repositoryId,
        issueId: pr.issueId,
        authorId: author.id,
        title: pr.title,
        description: pr.description,
        sourceBranch: pr.sourceBranch,
        targetBranch: pr.targetBranch,
        status: prStatusMap[pr.status],
        checklist: pr.checklist,
        changedFiles: pr.changedFiles,
        commits: {
          create: pr.commits.map((commit) => ({
            hash: commit.hash,
            message: commit.message,
            repositoryId: pr.repositoryId,
            authorId: author.id,
            changedFiles: pr.changedFiles,
          })),
        },
      },
    });
  }

  await prisma.leaderboard.createMany({
    data: demoUsers
      .sort((a, b) => b.xp - a.xp)
      .map((user, index) => ({
        userId: user.id,
        rank: index + 1,
        score: user.xp,
        weeklyScore: Math.round(user.xp / 5),
        streak: user.level + 2,
      })),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
