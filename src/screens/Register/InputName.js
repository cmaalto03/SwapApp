import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useRegister } from "../../../store/RegisterContext";
function InputName({ navigation }) {
  const [name, onChangeName] = useState("");

  const { userCred, setUserCred } = useRegister();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        //make this a drop down later

        style={styles.input}
        onChangeText={onChangeName}
        //value={userName}
        placeholder="name"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setUserCred((user) => ({
            ...user,
            name: name,
          }));

          navigation.navigate("InputCreds");
        }}
      >
        <Text style={styles.buttonLabel}>Continue</Text>
      </TouchableOpacity>
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
});
export default InputName;
