import { db } from "@/lib/db";

export async function listPublishedPosts() {
  return db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } },
  });
}

export async function findPostBySlug(slug) {
  return db.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });
}

export async function listAllPostsForAdmin() {
  return db.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    include: { author: { select: { name: true } } },
  });
}

export async function createPost(data) {
  return db.blogPost.create({ data });
}

export async function updatePost(id, data) {
  return db.blogPost.update({ where: { id }, data });
}

export async function deletePost(id) {
  return db.blogPost.delete({ where: { id } });
}
