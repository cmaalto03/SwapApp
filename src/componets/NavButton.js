import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function NavButton({ title, onPress, icon, color, size }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={size} color={color} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  text: {
    fontWeight: "bold",
    fontSize: 17,
    color: "black",
    marginLeft: 10,
    marginRight: 10,
  },
});
