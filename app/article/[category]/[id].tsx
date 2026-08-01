import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { getArticleById } from "@/utils/contentLoader";


export default function ArticleDetail() {


  const { id } = useLocalSearchParams();


  const article = getArticleById(
    String(id)
  );



  if(!article){

    return (

      <View style={styles.container}>

        <Text style={styles.error}>
          Article not found
        </Text>

      </View>

    );

  }




  function TextBlock({
    text
  }:{
    text:any
  }){


    if(
      text === null ||
      text === undefined ||
      text === ""
    ){

      return null;

    }



    if(Array.isArray(text)){

      return text.map(
        (item,index)=>(

          <TextBlock
            key={index}
            text={item}
          />

        )
      );

    }




    if(typeof text === "object"){

      return Object.entries(text).map(
        ([key,value]:any)=>(

          <View
            key={key}
            style={styles.section}
          >

            <Text style={styles.heading}>
              {key}
            </Text>


            <TextBlock
              text={value}
            />

          </View>

        )
      );

    }




    return (

      <Text style={styles.paragraph}>
        {String(text)}
      </Text>

    );


  }







  function renderContent(){



    return (

      <View>


        {/* PROVERB ORIGINAL */}

        {
          article.murle &&

          <View style={styles.section}>

            <Text style={styles.heading}>
              Murle Proverb
            </Text>


            <Text style={styles.paragraph}>
              {article.murle}
            </Text>

          </View>

        }




        {/* ENGLISH TRANSLATION */}

        {
          article.english &&

          <View style={styles.section}>

            <Text style={styles.heading}>
              Translation
            </Text>


            <Text style={styles.paragraph}>
              {article.english}
            </Text>

          </View>

        }






        {/* MEANING */}

        {
          article.meaning &&

          <View style={styles.section}>

            <Text style={styles.heading}>
              Meaning
            </Text>


            <Text style={styles.paragraph}>
              {article.meaning}
            </Text>

          </View>

        }





        {/* EXPLANATION */}

        {
          article.explanation &&

          <View style={styles.section}>

            <Text style={styles.heading}>
              Explanation
            </Text>


            <Text style={styles.paragraph}>
              {article.explanation}
            </Text>

          </View>

        }







        {/* NORMAL ARTICLE BODY */}

        {
          article.body &&

          <View style={styles.section}>

            <TextBlock
              text={article.body}
            />

          </View>

        }






        {/* CONTENT FALLBACK */}

        {
          !article.body &&
          article.content &&

          <TextBlock
            text={article.content}
          />

        }



      </View>

    );


  }







  return (

    <ScrollView

      style={styles.container}

      showsVerticalScrollIndicator={false}

    >



      {
        article.image &&

        <Image

          source={{
            uri:article.image
          }}

          style={styles.image}

        />

      }





      <Text style={styles.title}>

        {article.title}

      </Text>





      {
        article.subtitle &&

        <Text style={styles.subtitle}>

          {article.subtitle}

        </Text>

      }





      {renderContent()}



    </ScrollView>

  );


}







const styles = StyleSheet.create({


container:{

flex:1,

padding:20,

backgroundColor:"#fff"

},



error:{

fontSize:18,

textAlign:"center",

marginTop:50

},




image:{

width:"100%",

height:230,

borderRadius:15,

marginBottom:20

},




title:{

fontSize:28,

fontWeight:"700",

marginBottom:12

},




subtitle:{

fontSize:17,

color:"#666",

marginBottom:25

},




section:{

marginBottom:25

},




heading:{

fontSize:22,

fontWeight:"700",

marginBottom:12

},




paragraph:{

fontSize:16,

lineHeight:27,

marginBottom:15,

color:"#333"

}



});