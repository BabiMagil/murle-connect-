import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "Overview",
    body:
      "Murle Connect (\"the App\") is a cultural and educational application. This Privacy Policy explains what information is and is not collected when you use the App.",
  },
  {
    heading: "No Account Required",
    body:
      "The App does not require you to create an account, sign in, or provide any personal information to read its content. All articles, traditions, proverbs, and stories are available immediately after opening the App.",
  },
  {
    heading: "Information We Do Not Collect",
    body:
      "We do not directly collect names, email addresses, phone numbers, or any other personally identifiable information through the App's core reading features.",
  },
  {
    heading: "Advertising (Google AdMob)",
    body:
      "The App displays advertisements provided by Google AdMob to support ongoing development and hosting costs. Google AdMob may collect and use certain data — such as device identifiers and general usage information — in accordance with Google's own Privacy Policy. We encourage you to review Google's Privacy Policy to understand how this data is handled.",
  },
  {
    heading: "Internet Connection",
    body:
      "An internet connection is required to open and use the App. This is necessary so that advertisements can load correctly and to support future content updates.",
  },
  {
    heading: "Bookmarks & Local Storage",
    body:
      "If you bookmark an article, that information is stored only on your own device using local storage. Bookmarks are never transmitted to us or to any third party, and are removed if you uninstall the App or clear its data.",
  },
  {
    heading: "Children's Privacy",
    body:
      "The App is intended for a general audience and does not knowingly collect personal information from children. Advertising shown within the App is served in accordance with Google AdMob's applicable policies.",
  },
  {
    heading: "Changes to This Policy",
    body:
      "This Privacy Policy may be updated from time to time to reflect changes in the App or applicable regulations. Continued use of the App after changes are posted constitutes acceptance of the updated policy.",
  },
  {
    heading: "Contact Us",
    body:
      "If you have questions about this Privacy Policy, please reach out using the contact details provided on the About page of the App.",
  },
];

export default function PrivacyPolicyScreen() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Privacy Policy</Text>
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
