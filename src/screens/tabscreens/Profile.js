import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import UserItems from "../../componets/UserItems";
import { useUser } from "../../../store/UserContext";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Profile = ({ navigation }) => {
  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  const { user, setUser } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          //default state for user
          setUser({
            message: "Logged in!",
            token: "notoken",
            user: {
              id: "none",
              last_login: "none",
              name: "none",
              number: 16,
              password: "none",
              registered: "none",
              school: "none",
              username: "none",
            },
          });
          SecureStore.deleteItemAsync("user");
          navigation.reset({
            index: 0,
            routes: [{ name: "Launch" }],
          });
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Text>{user.user.username}</Text>
      <UserItems />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "grey",
    height: 25,
    width: 200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 100,
  },
  logoutButtonText: {
    textAlign: "center",
  },
});
export default Profile;
