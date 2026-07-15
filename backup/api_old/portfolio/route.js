import { getPortfolioItems } from "@/services/portfolio.service";
import { jsonResponse } from "@/lib/helpers";

export async function GET() {
  const items = await getPortfolioItems();
  return jsonResponse({ items });
}
