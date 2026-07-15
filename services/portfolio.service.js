import { db } from "@/lib/db";

export async function getPortfolioItems() {
  return db.portfolioItem.findMany({ orderBy: { order: "asc" } });
}

export async function getPortfolioItemBySlug(slug) {
  return db.portfolioItem.findUnique({ where: { slug } });
}

export async function createPortfolioItem(data) {
  return db.portfolioItem.create({ data });
}
