import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { ReadingActions } from "@/components/ReadingActions";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";
import { getProverbById } from "@/utils/contentLoader";

export default function ProverbDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const router = useRouter();
  const proverb = getProverbById(id);

  if (!proverb) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text, padding: spacing.lg }}>Proverb not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Proverb</Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={[styles.mainCard, { backgroundColor: theme.surfaceAlt, borderColor: "transparent" }]}>
          <Text style={[styles.label, { color: theme.primary }]}>{proverb.title.toUpperCase()}</Text>
          <Text style={[styles.murle, { color: theme.text }]}>“{proverb.murle}”</Text>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <Text style={[styles.englishLabel, { color: theme.textMuted }]}>ENGLISH MEANING</Text>
          <Text style={[styles.english, { color: theme.text }]}>{proverb.english}</Text>
        </Card>

        <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>EXPLANATION</Text>
        <Text style={[styles.explanation, { color: theme.text }]}>{proverb.explanation}</Text>

        <View style={styles.actionsWrap}>
          <ReadingActions
            bookmark={{
              key: `proverbs:${proverb.id}`,
              section: "proverbs",
              id: proverb.id,
              title: proverb.title,
              subtitle: proverb.english,
              route: `/proverbs/${proverb.id}`,
            }}
            shareTitle={proverb.title}
            shareMessage={`"${proverb.murle}" — ${proverb.english}\n\nShared from Murle Connect.`}
          />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    ...typography.heading,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  mainCard: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  murle: {
    ...typography.title,
    fontSize: 22,
    fontStyle: "italic",
    marginBottom: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: spacing.md,
  },
  englishLabel: {
    ...typography.label,
    fontSize: 11,
    marginBottom: 6,
  },
  english: {
    ...typography.body,
    fontWeight: "600",
  },
  sectionLabel: {
    ...typography.label,
    fontSize: 11,
    marginBottom: spacing.sm,
  },
  explanation: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
  actionsWrap: {
    marginTop: spacing.sm,
  },
});
