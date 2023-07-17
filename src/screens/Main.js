import { Text, SafeAreaView, StyleSheet, View, Image} from "react-native"
import React, { useEffect } from "react"
import { useState, useRef } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

import Profile from "./tabscreens/Profile"
import { ScrollView } from "react-native";
import Discovery from "./tabscreens/Discovery/Discovery";



import Post from "./tabscreens/Post";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

//<UserItems  user = {data}/>           

function Main({navigation}) {

    //user info
    const [user, setUser] = useState('');
    const didMount = useRef(false);

    useEffect( () => {
        async function getValueFor(key) {
            let result = await SecureStore.getItemAsync(key);
            if (result) {
                didMount.current = true;
                setUser(JSON.parse(result));
            } else {
              console.log("none");
            }
          }

          getValueFor("user");
    }, [])
 
    return(
    <>
        <SafeAreaView style = {styles.toolbar}>
            {user ? (
            <View style = {styles.header} >

                <Text style = {styles.appName}>Swaply</Text>
                <Text style = {styles.school}>{user.data.user.school}</Text>
            </View>
        ) : (
            <Text>Loading</Text>
        )
        }

            <ScrollView style = {styles.filters}
            horizontal={true}
            >
                <TouchableOpacity style = {styles.filter}>
            <Text style = {styles.filterText}>All Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.filter}>
            <Text style = {styles.filterText}>Newest Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.filter}>
            <Text style = {styles.filterText}>Recommended</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.filter}>
            <Text style = {styles.filterText}>Categories</Text>
                </TouchableOpacity>
        
            </ScrollView>
           
        </SafeAreaView>
            <Tab.Navigator>
                <Tab.Screen name="Discovery" component={Discovery} options = {{
                    headerShown: false,
                }}/>

           
                 <Tab.Screen name="Post" component={Post} options = {{
                    headerShown: false,
                }} />
        
                 <Tab.Screen name="Profile" component={Profile} options = {{
                    headerShown: false,
                }} />
            </Tab.Navigator>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    toolbar: {
        marginBottom: 10,
    },
    header: {
        
    },
    
    appName: {
        fontSize: 20,
        margin: 5,

    },

    school: {
        textAlign: 'center',
        fontWeight: 'bold',
        
        fontSize: 20,
    },
   
    filterText: {
        fontSize: 10,

    },
    filter: {
        padding: 10,
        margin: 5,
        backgroundColor: "#ADD8E6",
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    }
})
export default Main
