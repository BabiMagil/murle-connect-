import { 
  Article, 
  ArticleCategory, 
  Proverb, 
  SearchResultItem, 
  TraditionArticle 
} from "@/types/content";


import magilBabiNgathin from "@/content/history/magil-babi-ngathin-part-one.json";
import ArticleOne from "@/content/history/01-the-origin-of-the-murle.json";
import babimagil from "@/content/culture/babi-ngerthimagil.json";


import storiesTortoise from "@/content/stories/the-clever-tortoise.json";
import storiesLion from "@/content/stories/the-lion-and-the-drum.json";
import storiesRiver from "@/content/stories/why-the-river-bends.json";


import tradAgeSets from "@/content/traditions/age-sets.json";
import tradClans from "@/content/traditions/clans.json";
import tradLeadership from "@/content/traditions/leadership.json";
import tradFamily from "@/content/traditions/family-structure.json";
import tradMarriage from "@/content/traditions/marriage-customs.json";
import tradValues from "@/content/traditions/community-values.json";


import proverbsData from "@/content/proverbs/proverbs.json";


// ARTICLES

const historyArticles: Article[] = [
  magilBabiNgathin,
  ArticleOne
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
  tradAgeSets,
  tradClans,
  tradLeadership,
  tradFamily,
  tradMarriage,
  tradValues
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