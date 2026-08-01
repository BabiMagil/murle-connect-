import React from "react";
import {View,Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

import {getArticleById} from "@/utils/contentLoader";


export default function TraditionDetail(){

const {id}=useLocalSearchParams();


const article =
getArticleById(String(id));


if(!article){

return (

<View style={{padding:20}}>

<Text>
Article not found
</Text>

</View>

);

}


return (

<View style={{padding:20}}>

<Text
style={{
fontSize:28,
fontWeight:"bold"
}}
>

{article.title}

</Text>


<Text
style={{
marginTop:20,
fontSize:16
}}
>

{article.body}

</Text>


</View>

);

}