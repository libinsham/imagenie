import { db } from "@/lib/db";

export async function findUserByEmail(email) {
  return db.user.findUnique({ where: { email } });
}

export async function findUserById(id) {
  return db.user.findUnique({ where: { id } });
}

export async function listUsers() {
  return db.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createUser(data) {
  return db.user.create({ data });
}
