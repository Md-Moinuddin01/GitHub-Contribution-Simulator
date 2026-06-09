import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export function isDatabaseEnabled() {
  return Boolean(process.env.DATABASE_URL && process.env.ENABLE_DATABASE === "true");
}

export function getDb() {
  if (!isDatabaseEnabled()) {
    throw new Error("Set ENABLE_DATABASE=true and DATABASE_URL before using Prisma operations.");
  }

  if (!global.prisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    global.prisma = new PrismaClient({ adapter });
  }

  return global.prisma;
}

export async function tryDb<T, F>(task: (db: PrismaClient) => Promise<T>, fallback: F): Promise<T | F> {
  if (!isDatabaseEnabled()) return fallback;

  try {
    return await task(getDb());
  } catch {
    console.warn("Database unavailable, using simulator fallback.");
    return fallback;
  }
}
