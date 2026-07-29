import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "react-native-markdown-display";

import { ReadingActions } from "@/components/ReadingActions";
import { RelatedArticles } from "@/components/RelatedArticles";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";
import { getArticleById, getArticles } from "@/utils/contentLoader";
import { estimateReadingTime } from "@/utils/readingTime";
import { ArticleCategory } from "@/types/content";


export default function ArticleDetailScreen() {

  const {
    category,
    id
  } = useLocalSearchParams<{
    category: ArticleCategory;
    id: string;
  }>();


  const theme = useAppTheme();
  const router = useRouter();


  const article = getArticleById(
    category,
    id
  );


  if (!article) {

    return (

      <SafeAreaView
        style={[
          styles.safe,
          {
            backgroundColor:
              theme.background
          }
        ]}
      >

        <Text
          style={{
            color: theme.text,
            padding: spacing.lg
          }}
        >
          Article not found.
        </Text>

      </SafeAreaView>

    );

  }



  /*
   Convert article body into Markdown

   Supports:

   OLD:
   [
    "paragraph",
    "paragraph"
   ]


   NEW:
   [
    {
      heading:"",
      paragraphs:[]
    }
   ]

  */


  const markdownBody = Array.isArray(article.body)

    ? article.body
        .map((section:any)=>{


          // old format

          if(typeof section === "string"){

            return section;

          }



          // new format

          if(
            section.heading &&
            Array.isArray(section.paragraphs)
          ){

            return (

`## ${section.heading}

${section.paragraphs.join("\n\n")}`

            );

          }


          return "";

        })
        .join("\n\n")


    : "";





  /*
    Reading time converter
  */


  const readingText = Array.isArray(article.body)

    ? article.body
        .map((section:any)=>{


          if(typeof section === "string"){

            return section;

          }


          if(
            section.paragraphs &&
            Array.isArray(section.paragraphs)
          ){

            return section.paragraphs.join(" ");

          }


          return "";


        })
        .join(" ")


    : "";



  const minutes =
    article.readingTimeMinutes ??
    estimateReadingTime(readingText);





  const related =
    getArticles(category)
      .filter(
        item =>
          item.id !== article.id
      )
      .slice(0,5);





  return (

    <SafeAreaView
      style={[
        styles.safe,
        {
          backgroundColor:
            theme.background
        }
      ]}
      edges={["top"]}
    >


      <ScrollView
        showsVerticalScrollIndicator={false}
      >


        <View>


          <Image
            source={{
              uri: article.image
            }}
            style={styles.image}
          />



          <TouchableOpacity

            style={[
              styles.backButton,
              {
                backgroundColor:
                "rgba(0,0,0,0.4)"
              }
            ]}

            onPress={() =>
              router.back()
            }

          >

            <Ionicons
              name="chevron-back"
              size={22}
              color="#fff"
            />

          </TouchableOpacity>


        </View>





        <View
          style={styles.content}
        >


          <Text
            style={[
              styles.label,
              {
                color:
                theme.primary
              }
            ]}
          >

            {article.category.toUpperCase()}

          </Text>





          <Text
            style={[
              styles.title,
              {
                color:
                theme.text
              }
            ]}
          >

            {article.title}

          </Text>





          {
            article.subtitle && (

              <Text
                style={[
                  styles.subtitle,
                  {
                    color:
                    theme.textMuted
                  }
                ]}
              >

                {article.subtitle}

              </Text>

            )
          }






          <View
            style={styles.metaRow}
          >

            <Ionicons
              name="time-outline"
              size={14}
              color={theme.textMuted}
            />


            <Text
              style={[
                styles.meta,
                {
                  color:
                  theme.textMuted
                }
              ]}
            >

              {minutes} min read

            </Text>


          </View>






          <ReadingActions

            bookmark={{

              key:
              `${article.category}:${article.id}`,

              section:
              article.category,

              id:
              article.id,

              title:
              article.title,

              subtitle:
              article.subtitle,

              image:
              article.image,

              route:
              `/article/${article.category}/${article.id}`

            }}


            shareTitle={
              article.title
            }


            shareMessage={
              `${article.title}\n\nRead on Murle Connect`
            }

          />








          <Markdown

            style={{

              body:{
                color:theme.text,
                fontSize:16,
                lineHeight:26
              },


              heading2:{

                color:"#ff9800",

                fontSize:24,

                fontWeight:"800",

                marginTop:25,

                marginBottom:12,

                textDecorationLine:
                "underline"

              },


              paragraph:{

                color:theme.text,

                marginBottom:15

              },


              strong:{

                fontWeight:"700"

              }


            }}

          >

            {markdownBody}

          </Markdown>








          {
            "moral" in article &&
            article.moral && (

              <View
                style={[
                  styles.moralBox,
                  {
                    backgroundColor:
                    theme.surfaceAlt
                  }
                ]}
              >

                <Text
                  style={[
                    styles.moralLabel,
                    {
                      color:
                      theme.primary
                    }
                  ]}
                >

                  MORAL OF THE STORY

                </Text>


                <Text
                  style={[
                    styles.moralText,
                    {
                      color:
                      theme.text
                    }
                  ]}
                >

                  {article.moral}

                </Text>


              </View>

            )
          }





          <RelatedArticles
            articles={related}
          />



        </View>



      </ScrollView>


    </SafeAreaView>

  );

}






const styles = StyleSheet.create({

safe:{
flex:1
},


image:{
width:"100%",
height:280
},


backButton:{

position:"absolute",

top:spacing.md,

left:spacing.md,

width:40,

height:40,

borderRadius:20,

alignItems:"center",

justifyContent:"center"

},


content:{
padding:spacing.lg
},


label:{
...typography.label,
marginBottom:6
},


title:{
...typography.title,
fontSize:26,
marginBottom:6
},


subtitle:{
...typography.body,
marginBottom:spacing.sm
},


metaRow:{

flexDirection:"row",

alignItems:"center",

gap:6,

marginBottom:spacing.lg

},


meta:{
...typography.caption
},


moralBox:{

borderRadius:16,

padding:spacing.md,

marginTop:spacing.sm

},


moralLabel:{

...typography.label,

fontSize:11,

marginBottom:6

},


moralText:{

...typography.body,

fontStyle:"italic"

}

});