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
import { useMessage } from "../../../../store/MessageContext";

function Inbox({ navigation }) {
  const { messages, setMessages } = useMessage();
  socket.on("get-all-messages", (messages) => {
    setMessages(messages);
  });
  const conversations = [
    {
      id: "1",
      name: "Admin",
    },

    {
      id: "2",
      name: "BABYTRON1",
    },
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Message", { chat: item.name });
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

export default Inbox;
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
