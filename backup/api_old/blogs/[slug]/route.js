import { getPostBySlug } from "@/services/blog.service";
import { jsonResponse, errorResponse } from "@/lib/helpers";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return errorResponse("Post not found.", 404);
  return jsonResponse({ post });
}
