import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function SchoolItem({ route }) {
  const { username, time, title, description, image, name } = route.params;

  const date = new Date();
  dif = new Date(time);

  const nowOfSecs = date.getTime();
  const postOfSecs = dif.getTime();

  const difMinutes = ((nowOfSecs - postOfSecs) / 60000).toFixed(2);

  let timeMessage;

  //for calculating time message... Need to add Hours, Days, and Year
  if (difMinutes < 60) {
    if (difMinutes < 1) {
      timeMessage = "Posted now";
    } else {
      timeMessage = Math.round(difMinutes) + " minutes ago";
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: `https://swapapp.s3.us-east-2.amazonaws.com/item_image/${image}`,
          }}
        />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.timeMessage}>{timeMessage}</Text>

        {/*<Text style={styles.name}>Listed by {name}</Text>*/}

        <Text style={styles.description}>{description}</Text>

        <TextInput
          style={styles.input}
          //value={userName}

          autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Send a message to {name}</Text>
        <View style={styles.exchangeIcons}>
          <TouchableOpacity>
            <Ionicons name="swap-horizontal" color={"black"} size={60} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="dollar-sign" color={"black"} size={60} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  timeMessage: {
    textAlign: "center",
    color: "grey",
  },
  name: {
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  description: {
    textAlign: "center",
    margin: 20,

    fontSize: 15,
  },
  input: {
    height: 50,
    width: "70%",
    margin: 10,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: "blue",
    fontSize: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  textInputTitle: {
    alignSelf: "center",
    fontSize: 10,
  },

  exchangeIcons: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
});
export default SchoolItem;
