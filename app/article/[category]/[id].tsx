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

  const article = getArticleById(String(id));


  if (!article) {

    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Article not found
        </Text>
      </View>
    );

  }



  function renderParagraph(text:any, index:number){

    if(typeof text !== "string"){
      return null;
    }


    return (
      <Text
        key={index}
        style={styles.paragraph}
      >
        {text}
      </Text>
    );

  }




  function renderBody(){

    const body = article.body;


    if(!body){
      return null;
    }



    // SIMPLE TEXT ARTICLE

    if(typeof body === "string"){

      return (

        <Text style={styles.paragraph}>
          {body}
        </Text>

      );

    }




    // SECTION FORMAT
    // [
    //  {
    //    heading:"",
    //    paragraphs:[]
    //  }
    // ]

    if(Array.isArray(body)){


      return body.map(
        (section:any,index:number)=>{


          if(
            typeof section === "object" &&
            section.heading
          ){


            return (

              <View
                key={index}
                style={styles.section}
              >


                <Text style={styles.heading}>
                  {section.heading}
                </Text>



                {
                  Array.isArray(section.paragraphs)
                  &&
                  section.paragraphs.map(
                    (paragraph:any,pIndex:number)=>
                      renderParagraph(
                        paragraph,
                        pIndex
                      )
                  )
                }


              </View>

            );

          }



          return renderParagraph(
            section,
            index
          );


        }
      );

    }





    // OBJECT FORMAT

    if(typeof body === "object"){


      return Object.entries(body).map(
        ([key,value]:any,index:number)=>(


          <View
            key={index}
            style={styles.section}
          >


            <Text style={styles.heading}>
              {key}
            </Text>



            {
              Array.isArray(value)

              ?

              value.map(
                (item:any,i:number)=>{


                  if(typeof item==="object"){

                    return (

                      <View key={i}>

                        {
                          item.heading &&
                          <Text style={styles.heading}>
                            {item.heading}
                          </Text>
                        }


                        {
                          item.paragraphs?.map(
                            (p:string,pIndex:number)=>
                              renderParagraph(
                                p,
                                pIndex
                              )
                          )
                        }


                      </View>

                    );

                  }


                  return renderParagraph(
                    item,
                    i
                  );


                }
              )


              :

              typeof value==="string"

              ?

              <Text style={styles.paragraph}>
                {value}
              </Text>


              :

              null

            }



          </View>


        )
      );


    }



    return null;


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




      {renderBody()}



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