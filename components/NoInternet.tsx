import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks/useAppTheme";
import { radii, spacing, typography } from "@/constants/theme";

interface NoInternetProps {
  onRetry: () => void;
  checking?: boolean;
}

export function NoInternet({ onRetry, checking }: NoInternetProps) {
  const theme = useAppTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: theme.background }]}>
      <View style={[styles.iconCircle, { backgroundColor: theme.surfaceAlt }]}>
        <Ionicons name="cloud-offline-outline" size={56} color={theme.primary} />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>No Internet Connection</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>
        Please connect to the internet to continue reading.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={onRetry}
        activeOpacity={0.85}
        disabled={checking}
      >
        <Text style={styles.buttonText}>{checking ? "Checking..." : "Retry"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
  },
  buttonText: {
    color: "#fff",
    ...typography.label,
    fontSize: 15,
  },
});
