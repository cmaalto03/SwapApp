import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCategory } from "../../../../store/CategoryContext";
function Category({ navigation }) {
  const { category, setCategory } = useCategory();

  const categories = [
    {
      id: "1",
      name: "Electronics",
    },
    {
      id: "2",
      name: "Textbooks",
    },
    {
      id: "3",
      name: "Clothing",
    },
    {
      id: "4",
      name: "Appliances",
    },
    {
      id: "5",
      name: "Furniture",
    },
    {
      id: "6",
      name: "School Supplies",
    },
    {
      id: "7",
      name: "Dorm Decour",
    },
    {
      id: "8",
      name: "Other",
    },
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setCategory([...category, item.name]);
            }}
          >
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default Category;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginBottom: 5,
    backgroundColor: "white",
  },
});
