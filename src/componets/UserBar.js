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

import { useQueryClient } from "@tanstack/react-query";

const FilterBar = ({ navigation }) => {
  const [bttnColor1, setBtnnColor1] = useState("#0096FF");
  const [bttnColor2, setBtnnColor2] = useState("white");
  const [bttnColor3, setBtnnColor3] = useState("white");
  const [bttnColor4, setBtnnColor4] = useState("white");

  const queryClient = useQueryClient();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.filters}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor1 }]}
          onPress={() => {
            setBtnnColor1("#0096FF");
            setBtnnColor2("white");
            setBtnnColor3("white");
            setBtnnColor4("white");
          }}
        >
          <Text style={styles.filterText}>My Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor2 }]}
          onPress={() => {
            setBtnnColor1("white");
            setBtnnColor2("#0096FF");
            setBtnnColor3("white");
            setBtnnColor4("white");
          }}
        >
          <Text style={styles.filterText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor3 }]}
          onPress={() => {
            setBtnnColor1("white");
            setBtnnColor2("white");
            setBtnnColor3("#0096FF");
            setBtnnColor4("white");
          }}
        >
          <Text style={styles.filterText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, { backgroundColor: bttnColor4 }]}
          onPress={() => {
            setBtnnColor1("white");
            setBtnnColor2("white");
            setBtnnColor3("white");
            setBtnnColor4("#0096FF");
          }}
        >
          <Text style={styles.filterText}>Past Purchases</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default FilterBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  toolbar: {
    marginBottom: 10,
  },

  filterText: {
    fontSize: 15,
    color: "black",
  },
  filter: {
    padding: 15,
    margin: 10,
  },
});
