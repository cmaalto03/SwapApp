import { Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";

function SchoolItem({ route }) {
  const { username, time, title, description, image } = route.params;

  return (
    <SafeAreaView>
      <Image
        style={styles.image}
        source={{
          uri: `https://swapapp.s3.us-east-2.amazonaws.com/item_image/${image}`,
        }}
      />

      <Text>{username}</Text>
      <Text>{time}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
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
});
export default SchoolItem;
