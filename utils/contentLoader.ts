// utils/contentLoader.ts

// =====================================================
// HISTORY IMPORTS
// =====================================================

import article1 from "@/content/history/01-the-journey-of-the-murle-people.json";
import article2 from "@/content/history/02-the-murle-homeland-boma-and-pibor.json";
import article3 from "@/content/history/03-the-murle-people-and-their-language.json";
import article4 from "@/content/history/04-murle-clans-and-ancestral-lineages.json";
import article5 from "@/content/history/05-murle-age-sets-warriors-and-social-organization.json";
import article6 from "@/content/history/06-murle-traditional-leadership-and-red-chiefs.json";
import article7 from "@/content/history/07-the-murle-before-and-during-colonial-rule.json";
import article8 from "@/content/history/08-the-murle-and-the-pibor-region.json";
import article9 from "@/content/history/09-the-murle-through-sudans-civil-wars.json";
import article10 from "@/content/history/10-the-murle-in-south-sudan-today.json";
import article11 from "@/content/history/11-leaders-of-the-murle-people.json";

// =====================================================
// CULTURE IMPORTS
// =====================================================

import cultureArticle1 from "@/content/culture/01-murle-identity-and-values.json";
import cultureArticle2 from "@/content/culture/02-family-ancestry-and-clans.json";
import cultureArticle3 from "@/content/culture/03-cattle-and-traditional-livelihood.json";
import cultureArticle4 from "@/content/culture/04-age-sets-and-generational-life.json";
import cultureArticle5 from "@/content/culture/05-elders-and-traditional-authority.json";
import cultureArticle6 from "@/content/culture/06-marriage-and-family-life.json";
import cultureArticle7 from "@/content/culture/07-songs-dance-and-ceremonies.json";
import cultureArticle8 from "@/content/culture/08-proverbs-and-oral-wisdom.json";
import cultureArticle9 from "@/content/culture/09-traditional-clothing-and-appearance.json";
import cultureArticle10 from "@/content/culture/10-murle-culture-in-the-modern-world.json";

// =====================================================
// PROVERBS IMPORTS
// =====================================================

import proverbArticle1 from "@/content/proverbs/01-wisdom-is-like-a-baobab-tree.json";
import proverbArticle2 from "@/content/proverbs/02-if-you-want-to-go-fast-go-alone.json";
import proverbArticle3 from "@/content/proverbs/03-a-child-not-embraced-by-the-village.json";
import proverbArticle4 from "@/content/proverbs/04-however-long-the-night-the-dawn-will-come.json";
import proverbArticle5 from "@/content/proverbs/05-unity-and-community-strength.json";
import proverbArticle6 from "@/content/proverbs/06-patience-and-endurance.json";
import proverbArticle7 from "@/content/proverbs/07-respect-for-elders-and-ancestry.json";
import proverbArticle8 from "@/content/proverbs/08-cattle-wealth-and-responsibility.json";
import proverbArticle9 from "@/content/proverbs/09-words-truth-and-reputation.json";
import proverbArticle10 from "@/content/proverbs/10-the-future-belongs-to-those-who-preserve-wisdom.json";

// =====================================================
// RAW HISTORY CONTENT
// =====================================================

const historyRaw: any[] = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
];

// =====================================================
// RAW CULTURE CONTENT
// =====================================================

const cultureRaw: any[] = [
  cultureArticle1,
  cultureArticle2,
  cultureArticle3,
  cultureArticle4,
  cultureArticle5,
  cultureArticle6,
  cultureArticle7,
  cultureArticle8,
  cultureArticle9,
  cultureArticle10,
];

// =====================================================
// RAW PROVERBS CONTENT
// =====================================================

const proverbsRaw: any[] = [
  proverbArticle1,
  proverbArticle2,
  proverbArticle3,
  proverbArticle4,
  proverbArticle5,
  proverbArticle6,
  proverbArticle7,
  proverbArticle8,
  proverbArticle9,
  proverbArticle10,
];

// =====================================================
// FORMAT ARTICLE
// =====================================================

function formatArticle(
  item: any,
  index: number,
  category: string
): any {
  const fallbackId = `${category}-${index + 1}`;

  return {
    ...item,

    id: String(
      item?.id ??
      item?.slug ??
      fallbackId
    ),

    slug: String(
      item?.slug ??
      item?.id ??
      fallbackId
    ),

    category,

    title: String(
      item?.title ??
      "Untitled Article"
    ),

    subtitle: String(
      item?.subtitle ??
      ""
    ),

    body:
      item?.body ??
      item?.content ??
      item?.description ??
      item?.text ??
      "",

    summary: String(
      item?.summary ??
      item?.description ??
      item?.subtitle ??
      ""
    ),

    image:
      item?.image ??
      null,

    author: String(
      item?.author ??
      "Murle Connect"
    ),

    publishedAt: String(
      item?.publishedAt ??
      ""
    ),

    tags: Array.isArray(item?.tags)
      ? item.tags
      : [],

    featured:
      item?.featured === true,

    nextArticle:
      item?.nextArticle ??
      null,
  };
}

// =====================================================
// HISTORY ARTICLES
// =====================================================

export const historyArticles: any[] =
  historyRaw.map(
    (item, index) =>
      formatArticle(
        item,
        index,
        "history"
      )
  );

// =====================================================
// CULTURE ARTICLES
// =====================================================

export const cultureArticles: any[] =
  cultureRaw.map(
    (item, index) =>
      formatArticle(
        item,
        index,
        "culture"
      )
  );

// =====================================================
// PROVERBS ARTICLES
// =====================================================

export const proverbArticles: any[] =
  proverbsRaw.map(
    (item, index) =>
      formatArticle(
        item,
        index,
        "proverbs"
      )
  );

// =====================================================
// ALL ARTICLES
// =====================================================

export const allArticles: any[] = [
  ...historyArticles,
  ...cultureArticles,
  ...proverbArticles,
];

// =====================================================
// GET ALL ARTICLES
// =====================================================

export function getAllArticles(): any[] {
  return allArticles;
}

// =====================================================
// GET ARTICLES BY CATEGORY
// =====================================================

export function getArticles(
  category?: string
): any[] {
  if (!category) {
    return allArticles;
  }

  const normalizedCategory =
    category.trim().toLowerCase();

  return allArticles.filter(
    (article: any) =>
      String(article.category)
        .toLowerCase() ===
      normalizedCategory
  );
}

export function getArticlesByCategory(
  category: string
): any[] {
  return getArticles(category);
}

// =====================================================
// HISTORY
// =====================================================

export function getHistoryArticles(): any[] {
  return historyArticles;
}

// =====================================================
// CULTURE
// =====================================================

export function getCultureArticles(): any[] {
  return cultureArticles;
}

// =====================================================
// PROVERBS
// =====================================================

export function getProverbs(): any[] {
  return proverbArticles;
}

export function getPopularProverbs(): any[] {
  return proverbArticles;
}

// =====================================================
// GET ARTICLE BY ID
// =====================================================

export function getHistoryArticleById(
  id: string
): any {
  const normalizedId = String(id);

  return historyArticles.find(
    (article: any) =>
      String(article.id) === normalizedId ||
      String(article.slug) === normalizedId
  );
}

export function getCultureArticleById(
  id: string
): any {
  const normalizedId = String(id);

  return cultureArticles.find(
    (article: any) =>
      String(article.id) === normalizedId ||
      String(article.slug) === normalizedId
  );
}

export function getProverbById(
  id: string
): any {
  const normalizedId = String(id);

  return proverbArticles.find(
    (article: any) =>
      String(article.id) === normalizedId ||
      String(article.slug) === normalizedId
  );
}

export function getArticleById(
  id: string
): any {
  const normalizedId = String(id);

  return allArticles.find(
    (article: any) =>
      String(article.id) === normalizedId ||
      String(article.slug) === normalizedId
  );
}

// =====================================================
// SEARCH
// =====================================================

export function searchArticles(
  query: string
): any[] {
  const q = String(query ?? "")
    .trim()
    .toLowerCase();

  if (!q) {
    return allArticles;
  }

  return allArticles.filter(
    (article: any) => {
      const searchableText = [
        article.title,
        article.subtitle,
        article.summary,
        article.author,
        JSON.stringify(article.body ?? ""),
        JSON.stringify(article.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    }
  );
}

export function searchAll(
  query: string
): any[] {
  return searchArticles(query);
}

// =====================================================
// FEATURED
// =====================================================

export function getFeaturedArticle(): any {
  return (
    allArticles.find(
      (article: any) =>
        article.featured === true
    ) ??
    allArticles[0]
  );
}

// =====================================================
// LATEST ARTICLES
// =====================================================

export function getLatestStories(
  limit: number = 10
): any[] {
  return allArticles.slice(
    0,
    limit
  );
}

// =====================================================
// TRADITIONS COMPATIBILITY
// =====================================================

export function getTraditionArticles(): any[] {
  return getArticles("traditions");
}

// =====================================================
// DEBUG
// =====================================================

console.log(
  "================================="
);

console.log(
  "Murle Connect Content Loaded"
);

console.log(
  "History Articles:",
  historyArticles.length
);

console.log(
  "Culture Articles:",
  cultureArticles.length
);

console.log(
  "Proverb Articles:",
  proverbArticles.length
);

console.log(
  "Total Articles:",
  allArticles.length
);

console.log(
  "================================="
);