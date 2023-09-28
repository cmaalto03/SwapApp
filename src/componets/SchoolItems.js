import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useUser } from "../../store/UserContext";
import { RefreshControl } from "react-native";
import getSchoolItems from "./hooks/getSchoolItems";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef } from "react";

function SchoolItems({ navigation }) {
  const listRef = useRef(null);

  const queryClient = useQueryClient();
  const user = useUser().user;

  const type = "All";
  useFocusEffect(
    React.useCallback(() => {
      //listRef.current.scrollToOffset({ offset: 0, animated: true });

      setTimeout(function () {
        refetch();
      }, 1000);
    }, [])
  );
  const {
    data,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    refetch,
    isPreviousData,
    isFetched,
  } = getSchoolItems(user, type);

  const blurhash = "K6PZfSi_.A_3t7t7*0o#Dg";

  const Item = useCallback(
    ({ username, time, title, description, image, name }) => (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Image
            style={styles.profile}
            source={require("../assets/blank.png")}
          />
          <Text style={styles.name}>{name}</Text>

          <TouchableOpacity style={styles.configItem}>
            <Entypo name="dots-three-horizontal" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SchoolItem", {
              username: username,
              time: time,
              description: description,
              image: image,
              title: title,
              name: name,
            })
          }
        >
          <Image
            style={styles.image}
            source={{
              uri: `https://swapapp.s3.us-east-2.amazonaws.com/item_image/${image}`,
            }}
            placeholder={blurhash}
          />
        </TouchableOpacity>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
    ),
    []
  );

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>An error occurred while fetching data</Text>;

  //console.log(flattenData[0].image);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    //fix later and make it so it resets page to 1

    //queryClient.refetch({ queryKey: ["schoolitems"] });

    //queryClient.resetQueries();
    refetch();
  };

  return (
    <>
      {data ? (
        <View style={styles.container}>
          <FlatList
            data={data.pages.map((page) => page.data.data).flat()}
            numColumns={2}
            ref={listRef}
            columnWrapperStyle={{ justifyContent: "space-between" }} // causes items to be equally spaced
            onEndReached={loadNext}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl onRefresh={onRefresh} />}
            renderItem={({ item }) => (
              <Item
                username={item.username}
                image={item.image}
                description={item.description}
                time={item.time}
                title={item.title}
                userId={item.userId}
                name={item.name}
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
    flex: 1,
  },
  item: {
    flex: 2.5 / 5,
    margin: 5,
    marginBottom: 10,
    marginTop: 0,
  },

  itemHeader: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderTopWidth: 1,
    paddingTop: 5,
    alignItems: "center",
  },
  image: {
    height: undefined,
    aspectRatio: 1,
  },

  name: {
    fontSize: 10,
    marginLeft: 5,
  },

  profile: {
    height: 35,
    width: 35,
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },

  configItem: {
    marginLeft: "auto",
    marginRight: 5,
  },
});

export default SchoolItems;
