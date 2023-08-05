import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { UseGetUserItems } from "./hooks/getUserItems";
import { useUser } from "../../store/UserContext";
import { RefreshControl } from "react-native";
import { useState } from "react";

function UserItems({ navigation }) {
  const [refreshing, setRefreshing] = useState(true);

  const user = useUser().user;
  const { data, isLoading } = UseGetUserItems(user);

  const loadUserData = () => {
    setRefreshing(false);
  };

  const Item = ({ username, time, title, description, image }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text>{username}</Text>
      <Image
        style={styles.image}
        source={{
          uri: `https://swapapp.s3.us-east-2.amazonaws.com/item_image/${image}`,
        }}
      />
    </View>
  );
  return (
    <>
      <View>
        {isLoading ? (
          <Text>Loading</Text>
        ) : data ? (
          <FlatList
            data={data.data}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={loadUserData}
              />
            }
            renderItem={({ item }) => (
              <Item
                username={item.username}
                time={item.time}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            )}
            keyExtractor={(item) => item.itemNumber}
          />
        ) : (
          <Text> No data avaliable</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoutButton: {
    backgroundColor: "grey",
  },
  item: {
    flexDirection: "column",
  },
  image: {
    width: "50%",
    height: undefined,
    aspectRatio: 1,
  },

  title: {
    fontSize: 30,
  },
});

export default UserItems;
