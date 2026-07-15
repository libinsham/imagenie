/**
 * Seed script — populates local dev data.
 * Run with: npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@imagenie.com" },
    update: {},
    create: {
      name: "Imagenie Admin",
      email: "admin@imagenie.com",
      // TODO: replace with a real bcrypt hash once lib/auth.js is wired up.
      password: "CHANGE_ME_PLACEHOLDER_HASH",
      role: "ADMIN",
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "welcome-to-imagenie" },
    update: {},
    create: {
      title: "Welcome to Imagenie",
      slug: "welcome-to-imagenie",
      excerpt: "A first look at how we think about brand and growth.",
      content: "Full article content goes here.",
      status: "PUBLISHED",
      publishedAt: new Date(),
      authorId: admin.id,
    },
  });

  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "GTM Strategy & Positioning",
        slug: "gtm-strategy-positioning",
        summary: "Sharper positioning. Clearer market direction.",
        description:
          "We develop GTM strategy, messaging, buyer journeys, and launch plans.",
        order: 1,
      },
      {
        title: "Brand & Identity",
        slug: "brand-identity",
        summary: "Brands people recognise, trust, and choose.",
        description:
          "Visual and verbal identity systems designed to scale across markets.",
        order: 2,
      },
      {
        title: "Content, Research & Thought Leadership",
        slug: "content-research-thought-leadership",
        summary: "Content that builds authority.",
        description:
          "Research-led whitepapers, reports, articles, and enablement assets.",
        order: 3,
      },
      {
        title: "Creative & Campaigns",
        slug: "creative-campaigns",
        summary: "Design that makes strategy visible.",
        description:
          "Websites, landing pages, social content, ads, decks, and collateral.",
        order: 4,
      },
    ],
  });

  await prisma.careerListing.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Senior Brand Strategist",
        department: "Strategy",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        description: "Own positioning and GTM strategy for enterprise clients.",
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
