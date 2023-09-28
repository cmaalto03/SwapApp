import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset="100"
      style={styles.container}
    >
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
    </KeyboardAvoidingView>
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
    marginBottom: 30,
    borderWidth: 0.5,
    fontSize: 20,
  },
  sendButton: {},

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
    justifyContent: "center",
    backgroundColor: "blue",

    color: "white",
    fontSize: 18,
    flex: 1,
    height: 50,
    width: 90,
    margin: 10,
    marginLeft: 0,
    marginBottom: 30,
  },
  sendBar: {
    flexDirection: "row",
    backgroundColor: "#5ce1e6",
  },
});
