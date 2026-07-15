import { db } from "@/lib/db";
import { jsonResponse } from "@/lib/helpers";

export async function GET() {
  const services = await db.service.findMany({ orderBy: { order: "asc" } });
  return jsonResponse({ services });
}

// POST/PATCH/DELETE: scaffolded but intentionally not implemented yet —
// add once the dashboard's services editor is built.
