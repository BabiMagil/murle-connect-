import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { radii, spacing, typography } from "@/constants/theme";
import { searchAll } from "@/utils/contentLoader";
import { SearchResultItem } from "@/types/content";

const SECTION_ICONS: Record<SearchResultItem["section"], keyof typeof Ionicons.glyphMap> = {
  History: "time-outline",
  Culture: "color-palette-outline",
  Traditions: "leaf-outline",
  Proverbs: "chatbox-ellipses-outline",
  Stories: "book-outline",
};

export default function SearchScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchAll(query), [query]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <View style={styles.header}>
        <View style={[styles.inputWrap, { backgroundColor: theme.surfaceAlt }]}>
          <Ionicons name="search" size={18} color={theme.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search history, culture, stories..."
            placeholderTextColor={theme.textMuted}
            style={[styles.input, { color: theme.text }]}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={[styles.cancelText, { color: theme.primary }]}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {query.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="search-outline" size={40} color={theme.textMuted} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Search across History, Culture, Traditions, Proverbs, and Stories.
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.section}-${item.id}`}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.textMuted, marginTop: spacing.xl }]}>
              No results for “{query}”.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.85} onPress={() => router.push(item.route as any)}>
              <Card style={styles.resultCard}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.resultImage} />
                ) : (
                  <View style={[styles.resultIconWrap, { backgroundColor: theme.surfaceAlt }]}>
                    <Ionicons name={SECTION_ICONS[item.section]} size={22} color={theme.primary} />
                  </View>
                )}
                <View style={styles.resultBody}>
                  <Text style={[styles.resultSection, { color: theme.primary }]}>
                    {item.section.toUpperCase()}
                  </Text>
                  <Text numberOfLines={1} style={[styles.resultTitle, { color: theme.text }]}>
                    {item.title}
                  </Text>
                  {item.subtitle ? (
                    <Text numberOfLines={1} style={[styles.resultSubtitle, { color: theme.textMuted }]}>
                      {item.subtitle}
                    </Text>
                  ) : null}
                </View>
                <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
              </Card>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing.md,
    height: 46,
    borderRadius: radii.pill,
  },
  input: {
    flex: 1,
    ...typography.body,
    fontSize: 15,
  },
  cancelButton: {
    paddingHorizontal: 4,
  },
  cancelText: {
    ...typography.label,
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  emptyText: {
    ...typography.body,
    textAlign: "center",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  resultImage: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
  },
  resultIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  resultBody: {
    flex: 1,
    gap: 2,
  },
  resultSection: {
    ...typography.caption,
    fontWeight: "700",
    fontSize: 10,
  },
  resultTitle: {
    ...typography.body,
    fontWeight: "700",
  },
  resultSubtitle: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
});
