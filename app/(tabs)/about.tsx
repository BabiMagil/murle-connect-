import React from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";

export default function AboutScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>About</Text>

        <Card style={styles.card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Murle Connect</Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Murle Connect is a cultural and educational app dedicated to preserving and sharing
            the heritage of the Murle people — their history, culture, traditions, proverbs, and
            stories — in one simple, respectful place.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Our Mission</Text>
          <Text style={[styles.body, { color: theme.text }]}>
            To document and share Murle heritage in a way that is accessible to younger
            generations and to anyone curious about the community, helping ensure that oral
            traditions are not lost over time.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Our Vision</Text>
          <Text style={[styles.body, { color: theme.text }]}>
            A future where Murle history, language, and customs are easy to explore, celebrated
            with pride, and passed on with care from one generation to the next.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Developer</Text>
          <Text style={[styles.body, { color: theme.text }]}>
            Built with care as an independent cultural preservation project. Contact and
            organization details can be added here.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Contact</Text>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Linking.openURL("mailto:contact@murleconnect.example")}
          >
            <Ionicons name="mail-outline" size={18} color={theme.text} />
            <Text style={[styles.link, { color: theme.text }]}>contact@murleconnect.example</Text>
          </TouchableOpacity>
        </Card>

        <TouchableOpacity style={styles.row} onPress={() => router.push("/privacy-policy")}>
          <Text style={[styles.rowLabel, { color: theme.text }]}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => router.push("/terms")}>
          <Text style={[styles.rowLabel, { color: theme.text }]}>Terms &amp; Conditions</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
        </TouchableOpacity>

        <Text style={[styles.version, { color: theme.textMuted }]}>Version {version}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  heading: {
    ...typography.label,
    marginBottom: 8,
  },
  body: {
    ...typography.body,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  link: {
    ...typography.body,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(128,128,128,0.2)",
  },
  rowLabel: {
    ...typography.body,
    fontWeight: "600",
  },
  version: {
    ...typography.caption,
    textAlign: "center",
    marginTop: spacing.lg,
  },
});
