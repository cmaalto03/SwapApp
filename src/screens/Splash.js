import { Text, SafeAreaView, StyleSheet} from "react-native"
import React from "react"
import { UseGetUser } from "../componets/hooks/getUser";
import { save } from "../../storageFunctions";
import { useEffect } from "react";

function Splash({navigation}) {

    const {data, isLoading, refetch} = UseGetUser('Mike', 'mikepassword');

    useEffect( () => {
        refetch()

    }, [])

        if ({data}) {
            save("user", JSON.stringify({data}));
            setTimeout(function () {
                navigation.navigate("Main")
            }, 1000)

        }

    return(
        <SafeAreaView>
            <Text>Amazing Splash Screen</Text>
            
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
export default Splash


