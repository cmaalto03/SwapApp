import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { UseGetSchoolItems } from "./hooks/getSchoolItems";
import { useUser } from "../../store/UserContext";

function SchoolItems({ navigation }) {
  const user = useUser().user;
  const { data, isLoading } = UseGetSchoolItems(user);

  const Item = ({ username, time, title, description, image }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SchoolItem", {
            username: username,
            time: time,
            description: description,
            image: image,
          })
        }
      >
        <Image style={styles.image} source={{ uri: `${image}` }} />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {isLoading ? (
        <Text>Loading</Text>
      ) : data ? (
        <View style={styles.container}>
          <FlatList
            data={data.data}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }} // causes items to be equally spaced
            renderItem={({ item }) => (
              <Item
                style={styles.item}
                username={item.username}
                image={item.image}
                description={item.title}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.itemNumber}
          />
        </View>
      ) : (
        <Text> No data avaliable</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  /*
  container: {
    flexGrow: 1,
  },
  item: {
    width: "50%",
    backgroundColor: "yellow",
  },

  */

  container: {},

  item: {
    width: "49%",
    padding: 5,
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  title: {
    fontSize: 30,
    marginLeft: 20,
  },

  logo: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
  },
});

export default SchoolItems;
