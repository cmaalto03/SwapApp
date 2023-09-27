import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useFilter } from "../../store/FilterContext";
import { useQueryClient } from "@tanstack/react-query";
import getSchoolItems from "./hooks/getSchoolItems";

const FilterBar = ({ navigation }) => {
  const [bttnColor1, setBtnnColor1] = useState("#0096FF");
  const [bttnColor2, setBtnnColor2] = useState("white");
  const [bttnColor3, setBtnnColor3] = useState("white");
  const [bttnColor4, setBtnnColor4] = useState("white");

  const { filter, setFilter } = useFilter();

  const queryClient = useQueryClient();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.filters} horizontal={true}>
        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor1 }]}
          onPress={() => {
            setFilter({ trade: true, cash: true });

            setBtnnColor1("#0096FF");
            setBtnnColor2("white");
            setBtnnColor3("white");
            setBtnnColor4("white");
            queryClient.clear();
          }}
        >
          <Text style={styles.filterText}>All Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor2 }]}
          onPress={() => {
            setFilter({ trade: true, cash: false });
            setBtnnColor1("white");
            setBtnnColor2("#0096FF");
            setBtnnColor3("white");
            setBtnnColor4("white");
            queryClient.clear();
          }}
        >
          <Text style={styles.filterText}>Looking to Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor3 }]}
          onPress={() => {
            setFilter({ trade: false, cash: true });

            setBtnnColor1("white");
            setBtnnColor2("white");
            setBtnnColor3("#0096FF");
            setBtnnColor4("white");
            queryClient.clear();
          }}
        >
          <Text style={styles.filterText}>Looking for Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterMore, { backgroundColor: bttnColor4 }]}
          onPress={() => {
            navigation.navigate("Category");
          }}
        >
          <Text style={styles.filterText}>Category</Text>
          <AntDesign name="down" size={15} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default FilterBar;

const styles = StyleSheet.create({
  container: {},

  toolbar: {
    marginBottom: 10,
  },

  filterText: {
    fontSize: 10,
    color: "black",
  },
  filter: {
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
  filterMore: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    backgroundColor: "black",
    borderRadius: 15,
    alignItems: "center",
  },
});
