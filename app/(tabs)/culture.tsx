import React from "react";
import { ArticleListScreen } from "@/components/ArticleListScreen";
import { getArticlesByCategory } from "@/utils/contentLoader";

export default function CultureScreen() {
  return (
    <ArticleListScreen
      title="Culture"
      subtitle="Dress, music, food, and daily life"
      category="culture"
      articles={getArticlesByCategory("culture")}
    />
  );
}