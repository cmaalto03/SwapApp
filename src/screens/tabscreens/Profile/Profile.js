import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import UserItems from "../../../componets/UserItems";
import { useUser } from "../../../../store/UserContext";

import UserBar from "../../../componets/UserBar";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

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
      <View style={styles.bannerTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Feather
            name="settings"
            size={35}
            color="black"
            style={styles.settings}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={require("../../../assets/sampleprofile.png")}
        style={styles.profile}
      />
      <Text style={styles.name}>{user.user.name}</Text>
      <Text style={styles.name}>{user.user.school}</Text>

      <UserBar />
      <UserItems />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  profile: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  name: {
    alignSelf: "center",
  },
  bannerTop: {
    flexDirection: "row",
  },
  settings: {},
});
export default Profile;
