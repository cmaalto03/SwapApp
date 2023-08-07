import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useUser } from "../../store/UserContext";
import { useState } from "react";
import { RefreshControl } from "react-native";
import getSchoolItems from "./hooks/getSchoolItems";
import { Image } from "expo-image";
import { useQueryClient } from "@tanstack/react-query";

function SchoolItems({ navigation }) {
  const queryClient = useQueryClient();

  const user = useUser().user;

  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch } =
    getSchoolItems(user);

  const [refreshing, setRefreshing] = useState(false);
  const blurhash = "K6PZfSi_.A_3t7t7*0o#Dg";

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>An error occurred while fetching data</Text>;

  const flattenData = data.pages.flatMap((page) => page.data.data);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    //fix later and make it so it resets page to 1

    queryClient.resetQueries();
  };

  const Item = ({ username, time, title, description, image }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SchoolItem", {
            username: username,
            time: time,
            description: description,
            image: image,
            title: title,
          })
        }
      >
        <Image
          style={styles.image}
          source={{
            uri: `https://swapapp.s3.us-east-2.amazonaws.com/item_image/${image}`,
          }}
          loading="eager"
          priority="high"
          placeholder={blurhash}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {data ? (
        <View style={styles.container}>
          <FlatList
            data={flattenData}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }} // causes items to be equally spaced
            onEndReached={loadNext}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <Item
                username={item.username}
                image={item.image}
                description={item.description}
                time={item.time}
                title={item.title}
              />
            )}
            keyExtractor={(item) => item.image}
          />
        </View>
      ) : (
        <Text> No data avaliable</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  item: {
    flex: 2.5 / 5,
    padding: 5,
  },

  image: {
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
