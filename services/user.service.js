import { findUserByEmail, findUserById, listUsers, createUser } from "@/repositories/user.repository";
import { hashPassword } from "@/lib/auth";

export async function getUserById(id) {
  return findUserById(id);
}

export async function getAllUsers() {
  return listUsers();
}

export async function registerUser({ name, email, password, role }) {
  if (!name || !email || !password) {
    throw new Error("name, email, and password are required.");
  }
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("A user with this email already exists.");
  }
  const hashed = await hashPassword(password); // throws until lib/auth.js is implemented
  return createUser({ name, email, password: hashed, role: role || "EDITOR" });
}
