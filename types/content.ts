export type ArticleCategory = "history" | "culture" | "stories";

export interface BaseArticle {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  body: string[];
  publishedAt: string;
  readingTimeMinutes?: number;
  tags?: string[];
}

export interface HistoryArticle extends BaseArticle {
  category: "history";
}

export interface CultureArticle extends BaseArticle {
  category: "culture";
}

export interface StoryArticle extends BaseArticle {
  category: "stories";
  moral?: string;
}

export type Article = HistoryArticle | CultureArticle | StoryArticle;

export interface TraditionArticle {
  id: string;
  title: string;
  icon: string;
  image: string;
  summary: string;
  body: string[];
  readingTimeMinutes?: number;
}

export interface Proverb {
  id: string;
  title: string;
  murle: string;
  english: string;
  explanation: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  section: "History" | "Culture" | "Traditions" | "Proverbs" | "Stories";
  route: string;
  image?: string;
}
