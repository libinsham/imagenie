import { db } from "@/lib/db";

export async function createContactSubmission(data) {
  return db.contactSubmission.create({ data });
}

export async function listContactSubmissions() {
  return db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
}
