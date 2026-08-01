import React from "react";
import { ArticleListScreen } from "@/components/ArticleListScreen";
import { getHistoryArticles } from "@/utils/contentLoader";

export default function HistoryScreen() {
  return (
    <ArticleListScreen
      title="History"
      subtitle="Origins, migration, and heritage"
      category="history"
      articles={getHistoryArticles()}
    />
  );
}