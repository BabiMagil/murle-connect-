import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useRouter } from "expo-router";
import { spacing, typography } from "@/constants/theme";


export function ProverbCard({ proverb }: any){

const router = useRouter();


return (

<TouchableOpacity

style={styles.card}

onPress={()=>

router.push(

`/article/proverbs/${proverb.id}`

)

}

>


<Text style={styles.title}>

{proverb.title}

</Text>



{proverb.murle ? (

<Text style={styles.murle}>

{proverb.murle}

</Text>

):null}




{proverb.english ? (

<Text style={styles.body}>

{proverb.english}

</Text>

):null}




{proverb.explanation ? (

<Text style={styles.body}>

{proverb.explanation}

</Text>

):null}



</TouchableOpacity>

);

}



const styles = StyleSheet.create({

card:{

padding:spacing.lg,

borderRadius:12,

backgroundColor:"#ffffff",

},


title:{

...typography.title,

marginBottom:spacing.sm

},


murle:{

fontSize:18,

fontWeight:"600",

marginBottom:spacing.sm

},


body:{

fontSize:15,

lineHeight:22

}


});