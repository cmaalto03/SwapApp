import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { UseGetUser } from "../componets/hooks/getUser";
import { useRegister } from "../../store/RegisterContext";

import { save } from "../../storageFunctions";

const Login = ({ navigation }) => {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  const { userCred, setUserCred } = useRegister();
  const { data, isLoading, refetch } = UseGetUser(username, password);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/placeholderlogo.jpg")}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        //value={userName}
        placeholder="username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        autoCapitalize="none"

        //onSubmitEditing={onSubmit}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          refetch().then((data) => {
            if (data.data.message == "Logged in!") {
              setUserCred({ username: username, password: password });
              save(
                "user",
                JSON.stringify({ username: username, password: password })
              );

              navigation.navigate("Splash");
            }
          });
        }}
      >
        <Text style={styles.buttonLabel}>Log in</Text>
      </TouchableOpacity>

      <View>
        {isLoading ? (
          <Text></Text>
        ) : data.message == "Username or password incorrect!" ? (
          <Text>{data.message}</Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.createAccount}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 12,
    width: 200,
    color: "white",
  },
  logo: {
    margin: 75,
  },
  createAccount: {
    margin: 12,
  },
  buttonLabel: {
    color: "white",
    textAlign: "center",
  },
});

export default Login;
