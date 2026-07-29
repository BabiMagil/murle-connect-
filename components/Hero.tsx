import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { radii, spacing, typography } from "@/constants/theme";

export function Hero() {
  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80",
        }}
        style={styles.image}
        imageStyle={{ borderRadius: radii.xl }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.55)"]}
          style={StyleSheet.absoluteFillObject as any}
        />
        <View style={styles.content}>
          <Text style={styles.eyebrow}>MURLE CONNECT</Text>
          <Text style={styles.title}>Preserving our heritage,{"\n"}one story at a time</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.xl,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  image: {
    height: 220,
    justifyContent: "flex-end",
  },
  content: {
    padding: spacing.lg,
  },
  eyebrow: {
    color: "#F3E5C7",
    ...typography.label,
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    ...typography.title,
    fontSize: 26,
  },
});
