import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card } from "./Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";

const CATEGORIES = [
  { label: "History", icon: "time-outline", route: "/history" },
  { label: "Culture", icon: "color-palette-outline", route: "/culture" },
  { label: "Traditions", icon: "leaf-outline", route: "/traditions" },
  { label: "Proverbs", icon: "chatbox-ellipses-outline", route: "/proverbs" },
  { label: "Stories", icon: "book-outline", route: "/stories" },
  { label: "About", icon: "information-circle-outline", route: "/about" },
] as const;

export function CategoryGrid() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <View style={styles.grid}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.label}
          style={styles.item}
          activeOpacity={0.85}
          onPress={() => router.push(cat.route as any)}
        >
          <Card style={[styles.card, { backgroundColor: theme.surfaceAlt, borderColor: "transparent" }]}>
            <Ionicons name={cat.icon as any} size={24} color={theme.primary} />
            <Text style={[styles.label, { color: theme.text }]}>{cat.label}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -spacing.xs,
  },
  item: {
    width: "33.33%",
    padding: spacing.xs,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: spacing.md,
  },
  label: {
    ...typography.caption,
    fontWeight: "700",
  },
});
