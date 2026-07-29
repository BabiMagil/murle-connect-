import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "Educational Purpose",
    body:
      "Murle Connect is provided for educational and cultural purposes only. Content within the App is intended to inform, celebrate, and help preserve Murle heritage, history, and traditions.",
  },
  {
    heading: "Cultural Preservation",
    body:
      "The App aims to present Murle culture with accuracy and respect. Where oral tradition varies between communities or families, we aim to note this rather than present a single account as absolute.",
  },
  {
    heading: "Respectful Use",
    body:
      "By using this App, you agree to engage with its content respectfully and not to use it in any way that misrepresents, mocks, or diminishes the culture and people it describes.",
  },
  {
    heading: "Copyright",
    body:
      "All articles, images, and other content within the App are protected by copyright and remain the property of their respective owners or contributors, unless otherwise stated.",
  },
  {
    heading: "No Unauthorized Reproduction",
    body:
      "You may not copy, reproduce, redistribute, or publish content from this App elsewhere without prior written permission, except for personal, non-commercial use such as sharing a single article link through the App's built-in share feature.",
  },
  {
    heading: "Third-Party Advertising",
    body:
      "This App displays advertisements through Google AdMob. We are not responsible for the content of third-party advertisements shown within the App.",
  },
  {
    heading: "Disclaimer",
    body:
      "While care is taken to present historical and cultural information accurately, the App is provided \"as is\" without warranties of any kind. Historical accounts based on oral tradition may vary, and the App does not claim to be an exhaustive or singularly authoritative source.",
  },
  {
    heading: "Changes to These Terms",
    body:
      "These Terms & Conditions may be updated periodically. Continued use of the App after changes are posted constitutes acceptance of the updated terms.",
  },
];

export default function TermsScreen() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Terms &amp; Conditions</Text>
        <View style={{ width: 26 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.updated, { color: theme.textMuted }]}>Last updated: 2026</Text>
        {SECTIONS.map((section) => (
          <View key={section.heading} style={styles.section}>
            <Text style={[styles.sectionHeading, { color: theme.primary }]}>{section.heading}</Text>
            <Text style={[styles.sectionBody, { color: theme.text }]}>{section.body}</Text>
          </View>
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
  headerTitle: {
    ...typography.heading,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  updated: {
    ...typography.caption,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    ...typography.label,
    marginBottom: 6,
  },
  sectionBody: {
    ...typography.body,
  },
});
