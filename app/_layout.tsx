import React, { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { NoInternet } from "@/components/NoInternet";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const theme = useAppTheme();
  const { isConnected, checking, retry } = useNetworkStatus();

  useEffect(() => {
    if (isConnected !== null) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isConnected]);

  // While we haven't determined connectivity yet, keep native splash visible.
  if (isConnected === null) {
    return <View style={{ flex: 1, backgroundColor: theme.background }} />;
  }

  if (!isConnected) {
    return (
      <>
        <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
        <NoInternet onRetry={retry} checking={checking} />
      </>
    );
  }

  return (
    <>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="article/[category]/[id]" options={{ presentation: "card" }} />
        <Stack.Screen name="traditions/[id]" options={{ presentation: "card" }} />
        <Stack.Screen name="proverbs/[id]" options={{ presentation: "card" }} />
        <Stack.Screen name="search" options={{ presentation: "modal" }} />
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="terms" />
      </Stack>
    </>
  );
}
