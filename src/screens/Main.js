import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import Profile from "./tabscreens/Profile";
import { ScrollView } from "react-native";
import Discovery from "./tabscreens/Discovery/Discovery";
import Post from "./tabscreens/Post/Post";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "../../store/UserContext";
const Tab = createBottomTabNavigator();

//<UserItems  user = {data}/>

function Main({ navigation }) {
  //user info

  const user = useUser().user;

  return (
    <>
      <>
        <Tab.Navigator>
          <Tab.Screen
            name="Discovery"
            component={Discovery}
            options={{
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="Post"
            component={Post}
            options={{
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Main;
