import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useBookmarks, BookmarkEntry } from "@/hooks/useBookmarks";
import { radii, spacing, typography } from "@/constants/theme";

interface ReadingActionsProps {
  bookmark: Omit<BookmarkEntry, "savedAt">;
  shareTitle: string;
  shareMessage: string;
}

export function ReadingActions({ bookmark, shareTitle, shareMessage }: ReadingActionsProps) {
  const theme = useAppTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(bookmark.key);

  const onShare = async () => {
    try {
      await Share.share({ title: shareTitle, message: shareMessage });
    } catch {
      // User cancelled or share failed silently.
    }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.surfaceAlt }]}
        onPress={() => toggleBookmark(bookmark)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={18}
          color={saved ? theme.primary : theme.text}
        />
        <Text style={[styles.buttonText, { color: saved ? theme.primary : theme.text }]}>
          {saved ? "Saved" : "Save"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.surfaceAlt }]}
        onPress={onShare}
        activeOpacity={0.8}
      >
        <Ionicons name="share-social-outline" size={18} color={theme.text} />
        <Text style={[styles.buttonText, { color: theme.text }]}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
  },
  buttonText: {
    ...typography.label,
  },
});
