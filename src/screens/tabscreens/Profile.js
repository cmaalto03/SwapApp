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
          setUser();
          SecureStore.deleteItemAsync("user");
          navigation.reset({
            index: 0,
            routes: [{ name: "Launch" }],
          });
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
