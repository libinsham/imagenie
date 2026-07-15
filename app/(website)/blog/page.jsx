import Link from "next/link";
import { getPublishedPosts } from "@/services/blog.service";
import { formatDate, truncate } from "@/utils/formatter";

export const metadata = {
  title: "Blog — Imagenie",
  description: "Ideas on brand strategy, creative, and growth.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts().catch(() => []);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-40 pb-24">
      <div className="eyebrow mb-3">Blog</div>
      <h1 className="font-display font-semibold text-4xl md:text-5xl mb-12">
        Ideas worth building on.
      </h1>

      {posts.length === 0 ? (
        <p className="text-stone">
          No posts published yet — once <code>DATABASE_URL</code> is configured and
          <code> npx prisma db seed</code> has run, they'll show up here.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-line p-6 hover:border-orange transition-colors"
            >
              <div className="text-xs text-stone mb-2">
                {post.publishedAt ? formatDate(post.publishedAt) : "Draft"} · {post.author?.name}
              </div>
              <h2 className="font-headline font-bold text-xl mb-2">{post.title}</h2>
              <p className="text-stone text-sm leading-relaxed">{truncate(post.excerpt, 140)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
