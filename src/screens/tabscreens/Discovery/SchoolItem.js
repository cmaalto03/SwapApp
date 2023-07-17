import { Text, SafeAreaView, StyleSheet, Image} from "react-native"
import React from "react"


function SchoolItem({route}) {

   
    const { username, time, title, description, image} = route.params;

    return(
        <SafeAreaView>
            <Text>{username}</Text>
            <Text>{time}</Text>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Image 
             source={{uri:`${image}`}}
             />
            
        </SafeAreaView>
    )

   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    } 
})
export default SchoolItem
