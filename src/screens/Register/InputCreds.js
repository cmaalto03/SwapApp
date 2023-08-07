import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useState, useRef } from "react";
import { useRegister } from "../../../store/RegisterContext";

import { UseGetUser } from "../../componets/hooks/getUser";
import { useUser } from "../../../store/UserContext";
import { save } from "../../../storageFunctions";
import { UseCreateUser } from "../../componets/hooks/createUser";

//          console.log({ ...user, username: username, password: password });

function InputCreds({ navigation }) {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  //const { user, setUser } = useUser();

  const userCreds = {
    ...useRegister().userCred,
    username: username,
    password: password,
  };

  const { userCred, setUserCred } = useRegister();

  //const { data, isLoading, refetch } = UseGetUser(username, password);

  const { data, isLoading, refetch } = UseCreateUser(userCreds);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        //make this a drop down later

        style={styles.input}
        onChangeText={onChangeUsername}
        //value={userName}
        placeholder="username"
      />

      <TextInput
        //make this a drop down later

        style={styles.input}
        onChangeText={onChangePassword}
        //value={userName}
        placeholder="password"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          refetch().then((data) => {
            if (data.data.message == "Registered!") {
              setUserCred({
                ...userCreds,
                username: username,
                password: password,
              });
              save(
                "user",
                JSON.stringify({ username: username, password: password })
              );
              navigation.navigate("Splash");
            }
          });
        }}
      >
        <Text style={styles.buttonLabel}>Continue</Text>
      </TouchableOpacity>

      <View>
        {isLoading ? (
          <Text></Text>
        ) : data.message == "This username is already in use!" ? (
          <Text>{JSON.stringify(data.message)}</Text>
        ) : (
          <Text></Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  input: {
    margin: 20,
  },
});
export default InputCreds;
