import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ArticleCard } from "./ArticleCard";
import { SectionHeader } from "./SectionHeader";
import { Article } from "@/types/content";
import { spacing } from "@/constants/theme";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;
  return (
    <View style={styles.wrap}>
      <SectionHeader title="Related Articles" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} variant="horizontal" />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.xl,
  },
});
