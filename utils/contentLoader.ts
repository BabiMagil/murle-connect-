import { 
  Article, 
  ArticleCategory, 
  Proverb, 
  SearchResultItem, 
  TraditionArticle 
} from "@/types/content";


import article01 from "@/content/history/01-the-origin-of-the-murle.json";
import article02 from "@/content/history/02-murle-ethnic-identity-and-language.json";
import article03 from "@/content/history/03-murle-migration-and-movement.json";
import article04 from "@/content/history/04-murle-settlement-in-pibor.json";
import article05 from "@/content/history/05-murle-clans-and-social-organization.json";
import article06 from "@/content/history/06-murle-leadership-and-age-sets.json";
import article07 from "@/content/history/07-murle-family-life-and-kinship.json";
import article08 from "@/content/history/08-murle-marriage-customs-and-bride-wealth.json";
import article09 from "@/content/history/09-murle-childhood-and-traditional-education.json";
import article10 from "@/content/history/10-murle-cattle-and-the-pastoral-way-of-life.json";
import article11 from "@/content/history/11-hunting-fishing-and-agriculture.json";
import article12 from "@/content/history/12-murle-traditional-religion-and-spiritual-beliefs.json";
import article13 from "@/content/history/13-traditional-law-and-conflict-resolution.json";
import article14 from "@/content/history/14-murle-women-in-history-and-society.json";
import article15 from "@/content/history/15-murle-men-and-community-responsibilities.json";
import article16 from "@/content/history/16-murle-traditional-housing-and-village-life.json";
import article17 from "@/content/history/17-murle-food-and-daily-life-through-history.json";
import article18 from "@/content/history/18-murle-songs-dances-and-oral-traditions.json";
import article19 from "@/content/history/19-murle-relations-with-neighboring-communities.json";
import article20 from "@/content/history/20-the-colonial-period-in-murle-land.json";
import article21 from "@/content/history/21-the-first-sudanese-civil-war-and-the-murle.json";
import article22 from "@/content/history/22-the-second-sudanese-civil-war-and-the-murle.json";
import article23 from "@/content/history/23-the-murle-and-the-independence-of-south-sudan.json";
import article24 from "@/content/history/24-modern-challenges-facing-the-murle.json";
import article25 from "@/content/history/25-preserving-murle-history-and-heritage.json";

import babimagil from "@/content/culture/babi-ngerthimagil.json";


import storiesTortoise from "@/content/stories/the-clever-tortoise.json";
import storiesLion from "@/content/stories/the-lion-and-the-drum.json";
import storiesRiver from "@/content/stories/why-the-river-bends.json";


// =======================
// TRADITIONS ARTICLES
// =======================

import tradition01 from "@/content/traditions/01-murle-clans-kidongwa-and-traditional-authority.json";
import tradition02 from "@/content/traditions/02-murle-age-sets-buul-and-generations.json";
import tradition03 from "@/content/traditions/03-murle-red-chiefs-alan-ci-merik-and-leadership.json";
import tradition04 from "@/content/traditions/04-murle-birth-and-childhood-traditions.json";
import tradition05 from "@/content/traditions/05-murle-naming-traditions.json";
import tradition06 from "@/content/traditions/06-murle-initiation-and-coming-of-age.json";
import tradition07 from "@/content/traditions/07-murle-marriage-customs-and-bride-wealth.json";
import tradition08 from "@/content/traditions/08-murle-family-life-and-parenthood.json";
import tradition09 from "@/content/traditions/09-murle-cattle-and-pastoral-traditions.json";
import tradition10 from "@/content/traditions/10-murle-food-and-hospitality-traditions.json";
import tradition11 from "@/content/traditions/11-murle-clothing-ornaments-and-body-decoration.json";
import tradition12 from "@/content/traditions/12-murle-music-dance-and-celebrations.json";
import tradition13 from "@/content/traditions/13-murle-hunting-fishing-and-survival-skills.json";
import tradition14 from "@/content/traditions/14-murle-traditional-leadership-and-governance.json";
import tradition15 from "@/content/traditions/15-murle-elders-and-the-preservation-of-knowledge.json";
import tradition16 from "@/content/traditions/16-murle-customary-laws-and-conflict-resolution.json";
import tradition17 from "@/content/traditions/17-murle-spiritual-beliefs-and-sacred-practices.json";
import tradition19 from "@/content/traditions/19-murle-seasonal-life-and-the-natural-environment.json";
import tradition20 from "@/content/traditions/20-preserving-murle-traditions-for-future-generations.json";


import proverbsData from "@/content/proverbs/proverbs.json";


// ARTICLES

const historyArticles: Article[] = [
  article01,
  article02,
  article03,
  article04,
  article05,
  article06,
  article07,
  article08,
  article09,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
  article21,
  article22,
  article23,
  article24,
  article25
];


const cultureArticles: Article[] = [

  babimagil
];


const storyArticles: Article[] = [
  storiesTortoise,
  storiesLion,
  storiesRiver
];


// TRADITIONS

export const traditions: TraditionArticle[] = [
  tradition01,
  tradition02,
  tradition03,
  tradition04,
  tradition05,
  tradition06,
  tradition07,
  tradition08,
  tradition09,
  tradition10,
  tradition11,
  tradition12,
  tradition13,
  tradition14,
  tradition15,
  tradition16,
  tradition17,
  tradition19,
  tradition20
];


// PROVERBS

export const proverbs: Proverb[] = proverbsData;


// CATEGORY

const byCategory: Record<ArticleCategory, Article[]> = {
  history: historyArticles,
  culture: cultureArticles,
  stories: storyArticles
};


// GET CATEGORY ARTICLES

export function getArticles(
  category: ArticleCategory
): Article[] {

  return byCategory[category] ?? [];

}


// GET ALL ARTICLES

export function getAllArticles(): Article[] {

  return [
    ...historyArticles,
    ...cultureArticles,
    ...storyArticles
  ];

}


// GET ARTICLE BY ID

export function getArticleById(
  category: ArticleCategory,
  id: string
): Article | undefined {

  const articles = byCategory[category];

  if (!articles) {
    console.log("Category missing:", category);
    return undefined;
  }


  return articles.find(
    (article) => article.id === id
  );

}


// GET TRADITION

export function getTraditionById(
  id: string
): TraditionArticle | undefined {

  return traditions.find(
    (item) => item.id === id
  );

}


// GET PROVERB

export function getProverbById(
  id: string
): Proverb | undefined {

  return proverbs.find(
    (item) => item.id === id
  );

}


// FEATURED

export function getFeaturedArticle(): Article {

  return historyArticles[0];

}


// LATEST STORIES

export function getLatestStories(
  limit = 3
): Article[] {

  return [...storyArticles]
    .sort(
      (a,b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0,limit);

}


// POPULAR PROVERBS

export function getPopularProverbs(
  limit = 3
): Proverb[] {

  return proverbs.slice(0,limit);

}


// SEARCH

export function searchAll(
  query:string
): SearchResultItem[] {

  const q = query.trim().toLowerCase();

  if(!q) return [];


  const results: SearchResultItem[] = [];


  for(const article of getAllArticles()) {

    const text =
      `${article.title}
      ${article.subtitle ?? ""}
      ${article.tags?.join(" ") ?? ""}`
      .toLowerCase();


    if(text.includes(q)) {

      results.push({

        id: article.id,

        title: article.title,

        subtitle: article.subtitle ?? "",

        section:
          article.category === "history"
            ? "History"
            : article.category === "culture"
            ? "Culture"
            : "Stories",

        route:
          `/article/${article.category}/${article.id}`,

        image:
          article.image

      });

    }

  }


  for(const tradition of traditions) {

    const text =
      `${tradition.title}
      ${tradition.summary}`
      .toLowerCase();


    if(text.includes(q)) {

      results.push({

        id: tradition.id,

        title: tradition.title,

        subtitle: tradition.summary,

        section:"Traditions",

        route:
          `/traditions/${tradition.id}`,

        image:
          tradition.image

      });

    }

  }


  for(const proverb of proverbs) {

    const text =
      `${proverb.title}
      ${proverb.murle}
      ${proverb.english}`
      .toLowerCase();


    if(text.includes(q)) {

      results.push({

        id: proverb.id,

        title: proverb.title,

        subtitle: proverb.english,

        section:"Proverbs",

        route:
          `/proverbs/${proverb.id}`

      });

    }

  }


  return results;

}