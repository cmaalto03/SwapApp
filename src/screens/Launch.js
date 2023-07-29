import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useRegister } from "../../store/RegisterContext";
import { useEffect } from "react";
function Launch({ navigation }) {
  const { userCred, setUserCred } = useRegister();

  async function getValueFor(key) {
    try {
      let result = await SecureStore.getItemAsync(key);
      if ("username" && "password" in JSON.parse(result)) {
        setUserCred({
          username: JSON.parse(result).username,
          password: JSON.parse(result).password,
        });
        navigation.navigate("Splash");
        return result;
      } else {
      }
    } catch {}
  }

  useEffect(() => {
    getValueFor("user");
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("InputSchool");
        }}
      >
        <Text style={styles.buttonLabel}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonLabel}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
    justifyContent: "flex-end",
  },

  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 12,
    width: 200,
    color: "white",
  },
  buttonLabel: {
    color: "white",
    textAlign: "center",
  },
});

export default Launch;
