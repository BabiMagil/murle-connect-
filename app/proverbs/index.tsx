import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProverbCard } from "@/components/ProverbCard";
import { useAppTheme } from "@/hooks/useAppTheme";
import { spacing, typography } from "@/constants/theme";

import { getProverbs } from "@/utils/contentLoader";


export default function ProverbsIndexScreen() {

  const theme = useAppTheme();

  const router = useRouter();


  const proverbs = getProverbs();



  return (

    <SafeAreaView
      style={[
        styles.safe,
        {
          backgroundColor: theme.background
        }
      ]}
      edges={["top"]}
    >


      <View style={styles.header}>


        <TouchableOpacity
          onPress={() => router.back()}
        >

          <Ionicons
            name="chevron-back"
            size={26}
            color={theme.text}
          />

        </TouchableOpacity>



        <Text
          style={[
            styles.title,
            {
              color: theme.text
            }
          ]}
        >
          Proverbs
        </Text>



        <View style={{width:26}} />


      </View>




      <FlatList

        data={proverbs}


        keyExtractor={(item,index)=>
          String(item.id ?? index)
        }


        renderItem={({item})=>(

          <ProverbCard

            proverb={item}

          />

        )}


        contentContainerStyle={styles.list}


        ItemSeparatorComponent={()=>(

          <View
            style={{
              height:spacing.md
            }}
          />

        )}


        showsVerticalScrollIndicator={false}

      />


    </SafeAreaView>

  );

}



const styles = StyleSheet.create({

safe:{
  flex:1
},


header:{

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between",

paddingHorizontal:spacing.lg,

paddingTop:spacing.sm,

paddingBottom:spacing.md

},


title:{

...typography.title

},


list:{

paddingHorizontal:spacing.lg,

paddingBottom:spacing.xxl

}


});