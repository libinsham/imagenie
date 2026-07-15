import { notFound } from "next/navigation";
import { getPostBySlug } from "@/services/blog.service";
import { formatDate } from "@/utils/formatter";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Post not found — Imagenie" };
  return { title: `${post.title} — Imagenie`, description: post.excerpt };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 pt-40 pb-24">
      <div className="text-xs text-stone mb-3">
        {formatDate(post.publishedAt)} · {post.author?.name}
      </div>
      <h1 className="font-display font-semibold text-4xl md:text-5xl mb-6">{post.title}</h1>
      <p className="text-stone text-lg leading-relaxed mb-8">{post.excerpt}</p>
      <div className="prose max-w-none text-[15px] leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
}
