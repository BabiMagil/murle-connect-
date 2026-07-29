import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { radii, spacing, typography } from "@/constants/theme";
import { traditions } from "@/utils/contentLoader";

export default function TraditionsIndexScreen() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Traditions</Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {traditions.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={styles.item}
            activeOpacity={0.85}
            onPress={() => router.push(`/traditions/${t.id}` as any)}
          >
            <Card padded={false} style={styles.card}>
              <View style={[styles.iconWrap, { backgroundColor: theme.surfaceAlt }]}>
                <Ionicons name={t.icon as any} size={26} color={theme.primary} />
              </View>
              <View style={styles.body}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>{t.title}</Text>
                <Text numberOfLines={2} style={[styles.summary, { color: theme.textMuted }]}>
                  {t.summary}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </Card>
          </TouchableOpacity>
        ))}
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
  title: {
    ...typography.title,
  },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  item: {},
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.md,
    borderRadius: radii.lg,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    ...typography.body,
    fontWeight: "700",
  },
  summary: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
});
