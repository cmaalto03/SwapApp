import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./tabscreens/Profile";
import Discovery from "./tabscreens/Discovery/Discovery";
import Post from "./tabscreens/Post/Post";
import { useUser } from "../../store/UserContext";
const Tab = createBottomTabNavigator();

function Main({ navigation }) {
  //user credentials
  const user = useUser().user;

  return (
    <>
      <>
        {/* Tab screens for main, authenticated user */}

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
