import { Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useRegister } from "../../store/RegisterContext";
import { UseGetUser } from "../componets/hooks/getUser";
import { useUser } from "../../store/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import getSchoolItems from "../componets/hooks/getSchoolItems";

function Splash({ navigation }) {
  const { userCred, setUserCred } = useRegister();
  const queryClient = useQueryClient();

  const { user, setUser } = useUser();

  //const { data, isLoading, refetch } = UseGetUser(username, password);

  const { data, isLoading, refetch } = UseGetUser(
    userCred.username,
    userCred.password
  );

  useEffect(() => {
    setTimeout(function () {
      refetch().then((data) => {
        setUser(data.data);
        if (data.data.message == "Logged in!") {
          navigation.navigate("Main");
        }
      });
    }, 500);
  }, []);

  return (
    <SafeAreaView>
      <Text>This is where the splash screen will go</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Splash;
