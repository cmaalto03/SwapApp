import { Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useRegister } from "../../store/RegisterContext";
import { UseGetUser } from "../componets/hooks/getUser";
import { useUser } from "../../store/UserContext";
import { useMessage } from "../../store/MessageContext";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../utils/socket";
//import * as SecureStore from "expo-secure-store";
socket.on("connect", () => {
  console.log("Connected to socket!");
});
function Splash({ navigation }) {
  const { userCred, setUserCred } = useRegister();
  const { messages, setMessages } = useMessage();
  const { user, setUser } = useUser();
  //SecureStore.deleteItemAsync("user");

  useEffect(() => {
    socket.on("allChats", function (allChats) {
      console.log(allChats);
    });
    socket.on("databaseUpdate", (chats) => {
      setMessages(chats);
    });
  }, []);

  const queryClient = useQueryClient();

  //get user data (like token, school)

  //get user data (like token, school, etc) from cache

  const { data, isLoading, refetch } = UseGetUser(
    userCred.username,
    userCred.password
  );

  useEffect(() => {
    setTimeout(function () {
      refetch().then((data) => {
        setUser(data.data);
        socket.emit("clientEvent", { user: data.data, chats: "connorTOadmin" });

        //basically checks the cache
        if (data.data.message == "Logged in!") {
          //socket.emit("get-user", JSON.stringify({ user: data.data }));

          navigation.navigate("Main");
        }
      });
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.splashImage}
        source={require("../assets/placeholderlogo.jpg")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  splashImage: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Splash;
