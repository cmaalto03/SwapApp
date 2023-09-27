import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMessage } from "../../../../store/MessageContext";
import { useUser } from "../../../../store/UserContext";
import socket from "../../../utils/socket";

function Message({ route }) {
  const { messages, setMessages } = useMessage();

  const { user, setUser } = useUser();

  const [message, onChangeMessage] = useState("");

  const Item = ({ message, userID }) => (
    <View style={styles.item}>
      {userID == user.user.id ? (
        <Text style={styles.messageRight}>{message}</Text>
      ) : (
        <Text style={styles.messageLeft}>{message}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages.chats}
        renderItem={({ item }) => (
          <Item message={item.message} userID={item.userID} />
        )}
        keyExtractor={(item, index) => "key" + index}
        style={styles.chats}
      />
      <View style={styles.sendBar}>
        <TextInput
          style={styles.input}
          //value={userName}
          onChangeText={onChangeMessage}
          placeholder="username"
          value={message}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => {
            socket.emit("clientEvent", {
              user: user,
              message: message,
            });

            onChangeMessage("");
          }}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Message;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chats: {},
  input: {
    height: 50,
    width: "70%",
    margin: 10,
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: "yellow",
    height: 50,
    width: "15%",
    margin: 10,
  },

  messageLeft: {
    backgroundColor: "#D3D3D3",
    margin: 10,
    textAlign: "left",
    padding: 10,
    alignSelf: "flex-start",
    marginRight: "auto",
    maxWidth: "75%",
  },

  messageRight: {
    backgroundColor: "#D3D3D3",
    margin: 10,
    textAlign: "right",
    padding: 10,
    alignSelf: "flex-start",
    marginLeft: "auto",
    maxWidth: "75%",
  },

  sendButtonText: {
    textAlign: "center",
  },
  sendBar: {
    flexDirection: "row",
  },
});
