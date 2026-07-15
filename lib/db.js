/**
 * Thin re-export so app code can `import { db } from "@/lib/db"` without
 * caring that Prisma happens to be the underlying driver — makes it easier
 * to swap ORMs later without touching every call site.
 */
export { prisma as db } from "./prisma";
