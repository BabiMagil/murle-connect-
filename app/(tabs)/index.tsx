import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ArticleCard } from "@/components/ArticleCard";
import { ProverbCard } from "@/components/ProverbCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";
import { getFeaturedArticle, getLatestStories, getPopularProverbs } from "@/utils/contentLoader";

export default function HomeScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const featured = getFeaturedArticle();
  const latestStories = getLatestStories();
  const popularProverbs = getPopularProverbs();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.welcome, { color: theme.textMuted }]}>Welcome to</Text>
            <Text style={[styles.appName, { color: theme.text }]}>Murle Connect</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/search")}
            style={[styles.searchButton, { backgroundColor: theme.surfaceAlt }]}
          >
            <Ionicons name="search" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        <Hero />

        <SectionHeader title="Featured" subtitle="Start here" />
        <View style={{ marginBottom: spacing.xl }}>
          <ArticleCard article={featured} variant="featured" />
        </View>

        <SectionHeader
          title="Latest Stories"
          actionLabel="See all"
          onAction={() => router.push("/stories")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.md, marginBottom: spacing.xl }}
        >
          {latestStories.map((s) => (
            <ArticleCard key={s.id} article={s} variant="horizontal" />
          ))}
        </ScrollView>

        <SectionHeader
          title="Popular Proverbs"
          actionLabel="See all"
          onAction={() => router.push("/proverbs")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.md, marginBottom: spacing.xl }}
        >
          {popularProverbs.map((p) => (
            <ProverbCard key={p.id} proverb={p} compact />
          ))}
        </ScrollView>

        <SectionHeader title="Explore" subtitle="Browse every section" />
        <CategoryGrid />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  welcome: {
    ...typography.bodyMuted,
  },
  appName: {
    ...typography.display,
    fontSize: 26,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
