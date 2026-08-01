import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { ArticleCard } from "@/components/ArticleCard";
import { getTraditionArticles } from "@/utils/contentLoader";


export default function TraditionsIndexScreen(){

const router = useRouter();


const traditions =
getTraditionArticles() ?? [];


return (

<View style={styles.container}>


<FlatList

data={traditions}

keyExtractor={(item,index)=>
String(item.id ?? index)
}


renderItem={({item})=>(

<ArticleCard

article={item}

onPress={()=>
router.push(
`/traditions/${item.id}` as any
)
}

/>

)}


/>

</View>

);

}



const styles = StyleSheet.create({

container:{
flex:1,
padding:16
}

});