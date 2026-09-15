// lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Use DIRECT_URL (session-mode pooler, port 5432) — NOT DATABASE_URL
  // (transaction-mode PgBouncer, port 6543). Transaction-mode closes connections
  // between transactions which causes P1017 with adapter-pg's persistent Pool.
  const adapter = new PrismaPg({
    connectionString: process.env.DIRECT_URL!,
    max: 10, // keep pool small — Next.js can spawn many server instances
  });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;