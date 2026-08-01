import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card } from "./Card";
import { useAppTheme } from "@/hooks/useAppTheme";
import { radii, spacing, typography } from "@/constants/theme";
import { Article } from "@/types/content";
import { estimateReadingTime } from "@/utils/readingTime";

interface ArticleCardProps {
  article: Article;
  variant?: "vertical" | "horizontal" | "featured";
}

export function ArticleCard({
  article,
  variant = "vertical",
}: ArticleCardProps) {

  const theme = useAppTheme();
  const router = useRouter();

  const category =
    article?.category?.toString() || "HISTORY";

  const title =
    article?.title || "Untitled Article";

  const subtitle =
    article?.subtitle || "";

  const image =
    article?.image || 
    "https://via.placeholder.com/400x250";

  const id =
    article?.id || "";

  const minutes =
    article?.readingTimeMinutes ??
    estimateReadingTime(article?.body || "");


  const onPress = () => {

router.push({
pathname:"/article/[category]/[id]",
params:{
category: article.category,
id: String(article.id)
}
} as any);

};


  if (variant === "featured") {

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
      >

        <Card
          padded={false}
          style={styles.featuredCard}
        >

          <Image
            source={{ uri: image }}
            style={styles.featuredImage}
          />

          <View style={styles.featuredOverlay}>

            <Text style={styles.featuredTag}>
              FEATURED · {category.toUpperCase()}
            </Text>


            <Text style={styles.featuredTitle}>
              {title}
            </Text>


            <View style={styles.metaRow}>

              <Ionicons
                name="time-outline"
                size={14}
                color="#fff"
              />

              <Text style={styles.featuredMeta}>
                {minutes} min read
              </Text>

            </View>

          </View>

        </Card>

      </TouchableOpacity>
    );
  }



  if (variant === "horizontal") {

    return (

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.horizontalWrap}
      >

        <Card
          padded={false}
          style={styles.horizontalCard}
        >

          <Image
            source={{ uri:image }}
            style={styles.horizontalImage}
          />


          <View style={styles.horizontalBody}>

            <Text
              numberOfLines={2}
              style={[
                styles.horizontalTitle,
                {color:theme.text}
              ]}
            >
              {title}
            </Text>


            <View style={styles.metaRow}>

              <Ionicons
                name="time-outline"
                size={12}
                color={theme.textMuted}
              />


              <Text
                style={[
                  styles.horizontalMeta,
                  {color:theme.textMuted}
                ]}
              >
                {minutes} min read
              </Text>

            </View>

          </View>


        </Card>


      </TouchableOpacity>

    );
  }




  return (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
    >

      <Card
        padded={false}
        style={styles.verticalCard}
      >

        <Image
          source={{uri:image}}
          style={styles.verticalImage}
        />


        <View style={styles.verticalBody}>


          <Text
            style={[
              styles.verticalCategory,
              {color:theme.primary}
            ]}
          >

            {category.toUpperCase()}

          </Text>



          <Text
            numberOfLines={2}
            style={[
              styles.verticalTitle,
              {color:theme.text}
            ]}
          >

            {title}

          </Text>



          {subtitle ? (

            <Text
              numberOfLines={2}
              style={[
                styles.verticalSubtitle,
                {color:theme.textMuted}
              ]}
            >

              {subtitle}

            </Text>

          ):null}



          <View style={styles.metaRow}>

            <Ionicons
              name="time-outline"
              size={13}
              color={theme.textMuted}
            />


            <Text
              style={[
                styles.verticalMeta,
                {color:theme.textMuted}
              ]}
            >

              {minutes} min read

            </Text>


          </View>


        </View>


      </Card>


    </TouchableOpacity>

  );
}



const IMAGE_HEIGHT_FEATURED = 220;


const styles = StyleSheet.create({

  metaRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:4,
  },


  featuredCard:{
    height:IMAGE_HEIGHT_FEATURED,
    borderRadius:radii.xl,
  },


  featuredImage:{
    width:"100%",
    height:"100%",
  },


  featuredOverlay:{
    position:"absolute",
    left:0,
    right:0,
    bottom:0,
    padding:spacing.lg,
    backgroundColor:"rgba(0,0,0,0.35)",
  },


  featuredTag:{
    color:"#F3E5C7",
    ...typography.label,
    marginBottom:6,
  },


  featuredTitle:{
    color:"#fff",
    ...typography.title,
    marginBottom:8,
  },


  featuredMeta:{
    color:"#fff",
    ...typography.caption,
  },


  horizontalWrap:{
    width:200,
  },


  horizontalCard:{
    borderRadius:radii.lg,
  },


  horizontalImage:{
    width:"100%",
    height:120,
  },


  horizontalBody:{
    padding:spacing.sm+4,
  },


  horizontalTitle:{
    ...typography.bodyMuted,
    fontWeight:"700",
    marginBottom:6,
  },


  horizontalMeta:{
    ...typography.caption,
  },


  verticalCard:{
    flexDirection:"row",
    borderRadius:radii.lg,
    marginBottom:spacing.md,
  },


  verticalImage:{
    width:104,
    height:104,
  },


  verticalBody:{
    flex:1,
    padding:spacing.sm+4,
    justifyContent:"center",
    gap:4,
  },


  verticalCategory:{
    ...typography.label,
    fontSize:11,
  },


  verticalTitle:{
    ...typography.body,
    fontWeight:"700",
  },


  verticalSubtitle:{
    ...typography.bodyMuted,
    fontSize:13,
  },


  verticalMeta:{
    ...typography.caption,
  },

});