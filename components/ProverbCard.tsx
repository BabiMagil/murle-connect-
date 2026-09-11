import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Card } from "./Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import {
  radii,
  spacing,
  typography,
} from "@/constants/theme";

interface ProverbCardProps {
  proverb: any;
  compact?: boolean;
}

export function ProverbCard({
  proverb,
  compact = false,
}: ProverbCardProps) {
  const theme = useAppTheme();
  const router = useRouter();

  const title = proverb?.title || "Murle Proverb";
  const murle = proverb?.murle || "";
  const english = proverb?.english || "";
  const id = proverb?.id || "";

  const onPress = () => {
    router.push(`/article/proverbs/${id}` as any);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Card
        padded={false}
        style={[
          styles.card,
          compact && styles.compactCard,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.border,
          },
        ]}
      >
        <View
          style={[
            styles.iconBox,
            compact && styles.compactIconBox,
            {
              backgroundColor: theme.primary + "18",
            },
          ]}
        >
          <Ionicons
            name="book-outline"
            size={compact ? 21 : 25}
            color={theme.primary}
          />
        </View>

        <View style={styles.body}>
          <Text
            style={[
              styles.category,
              {
                color: theme.primary,
              },
            ]}
          >
            MURLE WISDOM
          </Text>

          <Text
            numberOfLines={compact ? 1 : 2}
            style={[
              styles.title,
              compact && styles.compactTitle,
              {
                color: theme.text,
              },
            ]}
          >
            {title}
          </Text>

          {murle ? (
            <Text
              numberOfLines={compact ? 1 : 2}
              style={[
                styles.murle,
                compact && styles.compactMurle,
                {
                  color: theme.text,
                },
              ]}
            >
              “{murle}”
            </Text>
          ) : null}

          {!compact && english ? (
            <Text
              numberOfLines={2}
              style={[
                styles.english,
                {
                  color: theme.textMuted,
                },
              ]}
            >
              {english}
            </Text>
          ) : null}

          {!compact && (
            <View style={styles.footer}>
              <Text
                style={[
                  styles.readText,
                  {
                    color: theme.primary,
                  },
                ]}
              >
                Read proverb
              </Text>

              <Ionicons
                name="arrow-forward"
                size={17}
                color={theme.primary}
              />
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: radii.lg,
    marginBottom: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },

  compactCard: {
    marginBottom: spacing.sm,
  },

  iconBox: {
    width: 72,
    height: 72,
    marginLeft: spacing.md,
    marginTop: spacing.md,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  compactIconBox: {
    width: 54,
    height: 54,
    marginLeft: spacing.sm,
    marginTop: spacing.sm,
    borderRadius: radii.md,
  },

  body: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },

  category: {
    ...typography.label,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 5,
  },

  title: {
    ...typography.body,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },

  compactTitle: {
    fontSize: 15,
    marginBottom: 3,
  },

  murle: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "600",
    fontStyle: "italic",
    marginBottom: 5,
  },

  compactMurle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 0,
  },

  english: {
    ...typography.bodyMuted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 9,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },

  readText: {
    ...typography.caption,
    fontWeight: "800",
  },
});