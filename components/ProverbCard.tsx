import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card } from "./Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";
import { Proverb } from "@/types/content";

interface ProverbCardProps {
  proverb: Proverb;
  compact?: boolean;
}

export function ProverbCard({ proverb, compact = false }: ProverbCardProps) {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/proverbs/${proverb.id}` as any)}
      style={compact ? styles.compactWrap : undefined}
    >
      <Card style={{ backgroundColor: theme.surfaceAlt, borderColor: "transparent" }}>
        <View style={styles.headerRow}>
          <Ionicons name="chatbox-ellipses-outline" size={16} color={theme.primary} />
          <Text style={[styles.title, { color: theme.primary }]}>{proverb.title}</Text>
        </View>
        <Text style={[styles.murle, { color: theme.text }]} numberOfLines={compact ? 2 : undefined}>
          “{proverb.murle}”
        </Text>
        <Text style={[styles.english, { color: theme.textMuted }]} numberOfLines={compact ? 2 : undefined}>
          {proverb.english}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  compactWrap: {
    width: 260,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.label,
  },
  murle: {
    ...typography.heading,
    fontStyle: "italic",
    marginBottom: 6,
  },
  english: {
    ...typography.bodyMuted,
  },
});
