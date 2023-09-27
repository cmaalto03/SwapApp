import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "../../../../store/UserContext";
import * as SecureStore from "expo-secure-store";
function Settings({ navigation }) {
  const { user, setUser } = useUser();

  const settings = [
    {
      id: "1",
      name: "Setting 1",
    },
    {
      id: "2",
      name: "Setting 2",
    },
    {
      id: "3",
      name: "Setting 3",
    },
    {
      id: "4",
      name: "Setting 4",
    },
    {
      id: "5",
      name: "Setting 5",
    },
    {
      id: "6",
      name: "Setting 6",
    },
    {
      id: "7",
      name: "Setting 7",
    },
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={settings}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          //default state for user
          setUser({
            message: "Logged in!",
            token: "notoken",
            user: {
              id: "none",
              last_login: "none",
              name: "none",
              number: 16,
              password: "none",
              registered: "none",
              school: "none",
              username: "none",
            },
          });
          SecureStore.deleteItemAsync("user");
          navigation.reset({
            index: 0,
            routes: [{ name: "Launch" }],
          });
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Settings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  logoutButton: {
    backgroundColor: "blue",
    height: 50,
  },
  logoutButtonText: {
    textAlign: "center",
    color: "white",
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginBottom: 5,
    backgroundColor: "white",
  },
});
