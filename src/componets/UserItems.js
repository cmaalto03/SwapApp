import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useUser } from "../../store/UserContext";
import { RefreshControl } from "react-native";
import getSchoolItems from "./hooks/getSchoolItems";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";
import getUserItems from "../componets/hooks/getUserItems";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";

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
  } = getUserItems(user);

  const blurhash = "K6PZfSi_.A_3t7t7*0o#Dg";

  const Item = useCallback(
    ({ username, time, title, description, image, name }) => (
      <View style={styles.item}>
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
          <View style={styles.itemContents}>
            <Image
              style={styles.image}
              source={{
                uri: `https://swapapp.s3.us-east-2.amazonaws.com/item_image/${image}`,
              }}
              placeholder={blurhash}
            />

            <View style={styles.itemIcons}>
              <Text style={styles.userItemTitle}>{title}</Text>

              <View style={styles.itemIconsTest}>
                <Text>Edit</Text>
                <Text>Offers</Text>
                <Text>Views</Text>
              </View>
              <View style={styles.itemIconsTest}>
                <Feather name="edit" size={40} color="black" />
                <Text>0</Text>
                <Text>0</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
            ref={listRef}
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
    marginTop: 0,
    borderColor: "#d3d3d3",
    borderWidth: 0.5,
  },

  itemIcons: {
    flexDirection: "column",
    flex: 1,
  },

  itemContents: {
    flexDirection: "row",
    flex: 1,
  },

  itemIconsTest: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.7,
    width: "90%",
  },
  userItemTitle: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  image: {
    height: undefined,
    aspectRatio: 1,
    width: "40%",

    margin: 5,
  },

  name: {
    fontSize: 10,
    marginLeft: 5,
  },

  profile: {
    height: 35,
    width: 35,
  },
});

export default SchoolItems;
