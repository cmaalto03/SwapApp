import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import SchoolItems from "../../../componets/SchoolItems";
import { useUser } from "../../../../store/UserContext";

const Discovery = ({ navigation }) => {
  //how state is set from secure storage to reduce server calls

  const user = useUser().user;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.appName}>Swaply</Text>

        <View>
          {user ? (
            <Text style={styles.school}>{user.user.school}</Text>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>

      <View style={styles.schoolItemsContainer}>
        <SchoolItems navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  schoolItemsContainer: {
    flex: 1,
  },

  appName: {
    fontSize: 20,
    margin: 5,
  },

  school: {
    textAlign: "center",
    fontWeight: "bold",

    fontSize: 20,
  },
});

export default Discovery;
