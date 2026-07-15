import { getPublishedPosts, createBlogPost } from "@/services/blog.service";
import { jsonResponse, errorResponse, parseJsonBody } from "@/lib/helpers";

export async function GET() {
  const posts = await getPublishedPosts();
  return jsonResponse({ posts });
}

export async function POST(request) {
  // TODO: gate this behind requireUser()/admin role check once auth is wired up.
  const body = await parseJsonBody(request);
  if (!body) return errorResponse("Invalid JSON body.");

  try {
    const post = await createBlogPost(body);
    return jsonResponse({ post }, { status: 201 });
  } catch (err) {
    return errorResponse(err.message || "Failed to create post.", 400);
  }
}
