import {
  listPublishedPosts,
  findPostBySlug,
  listAllPostsForAdmin,
  createPost,
  updatePost,
  deletePost,
} from "@/repositories/blog.repository";
import { slugify } from "@/utils/slugify";

export async function getPublishedPosts() {
  return listPublishedPosts();
}

export async function getPostBySlug(slug) {
  const post = await findPostBySlug(slug);
  if (!post || post.status !== "PUBLISHED") return null;
  return post;
}

export async function getAllPostsForAdmin() {
  return listAllPostsForAdmin();
}

export async function createBlogPost(input) {
  const { title, excerpt, content, authorId } = input || {};
  if (!title || !excerpt || !content || !authorId) {
    throw new Error("title, excerpt, content, and authorId are required.");
  }
  return createPost({
    title,
    slug: slugify(title),
    excerpt,
    content,
    authorId,
    status: input.status || "DRAFT",
    coverImage: input.coverImage || null,
  });
}

export async function updateBlogPost(id, input) {
  return updatePost(id, input);
}

export async function deleteBlogPost(id) {
  return deletePost(id);
}
