import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReadingActions } from "@/components/ReadingActions";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";
import { getTraditionById } from "@/utils/contentLoader";
import { estimateReadingTime } from "@/utils/readingTime";

export default function TraditionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const router = useRouter();
  const tradition = getTraditionById(id);

  if (!tradition) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text, padding: spacing.lg }}>Tradition not found.</Text>
      </SafeAreaView>
    );
  }

  const minutes = tradition.readingTimeMinutes ?? estimateReadingTime(tradition.body);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: tradition.image }} style={styles.image} />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: "rgba(0,0,0,0.4)" }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={[styles.label, { color: theme.primary }]}>TRADITIONS</Text>
          <Text style={[styles.title, { color: theme.text }]}>{tradition.title}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color={theme.textMuted} />
            <Text style={[styles.meta, { color: theme.textMuted }]}>{minutes} min read</Text>
          </View>

          <View style={styles.actionsWrap}>
            <ReadingActions
              bookmark={{
                key: `traditions:${tradition.id}`,
                section: "traditions",
                id: tradition.id,
                title: tradition.title,
                subtitle: tradition.summary,
                image: tradition.image,
                route: `/traditions/${tradition.id}`,
              }}
              shareTitle={tradition.title}
              shareMessage={`${tradition.title} — ${tradition.summary}\n\nRead more on Murle Connect.`}
            />
          </View>

          {tradition.body.map((paragraph, idx) => (
            <Text key={idx} style={[styles.paragraph, { color: theme.text }]}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  image: {
    width: "100%",
    height: 260,
  },
  backButton: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: 6,
  },
  title: {
    ...typography.title,
    fontSize: 26,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.lg,
  },
  meta: {
    ...typography.caption,
  },
  actionsWrap: {
    marginBottom: spacing.lg,
  },
  paragraph: {
    ...typography.body,
    marginBottom: spacing.md,
  },
});
