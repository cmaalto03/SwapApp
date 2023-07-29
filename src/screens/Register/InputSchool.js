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
function InputSchool({ navigation }) {
  const [school, onChangeSchool] = useState("");
  const { userCred, setUserCred } = useRegister();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        //make this a drop down later

        style={styles.input}
        onChangeText={onChangeSchool}
        //value={userName}
        placeholder="Connecticut College"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setUserCred((user) => ({
            ...user,
            school: school,
          }));

          navigation.navigate("InputName");
        }}
      >
        <Text style={styles.buttonLabel}>Create Account</Text>
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
export default InputSchool;
