import { StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./tabscreens/Profile/Profile";
import Discovery from "./tabscreens/Discovery/Discovery";
import Post from "./tabscreens/Post/Post";
import { useUser } from "../../store/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useMessage } from "../../store/MessageContext";
import { io } from "socket.io-client";

const Tab = createBottomTabNavigator();

function Main({ navigation }) {
  //user credentials
  const user = useUser().user;
  const { messages, setMessages } = useMessage();

  return (
    <>
      <>
        {/* Tab screens for main, authenticated user */}

        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              height: 90,
            },
          })}
        >
          <Tab.Screen
            name="Discovery"
            component={Discovery}
            options={{
              headerShown: false,
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color={"black"} size={30} />
              ),
            }}
          />

          <Tab.Screen
            name="Post"
            component={Post}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="plussquareo" color={"black"} size={30} />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarLabel: "",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" size={30} color="black" />
              ),
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
