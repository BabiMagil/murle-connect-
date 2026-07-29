import React from "react";
import { ArticleListScreen } from "@/components/ArticleListScreen";
import { getArticles } from "@/utils/contentLoader";

export default function StoriesScreen() {
  return (
    <ArticleListScreen
      title="Stories"
      subtitle="Folktales, legends, and moral tales"
      category="stories"
      articles={getArticles("stories")}
    />
  );
}
