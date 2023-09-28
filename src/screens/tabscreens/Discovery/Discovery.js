import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import SchoolItems from "../../../componets/SchoolItems";
import { useUser } from "../../../../store/UserContext";
import { Feather, Entypo } from "@expo/vector-icons";
import FilterBar from "../../../componets/FilterBar";
import { useCategory } from "../../../../store/CategoryContext";
import { MaterialIcons } from "@expo/vector-icons";

const Discovery = ({ navigation, route }) => {
  //how state is set from secure storage to reduce server calls
  const { category, setCategory } = useCategory();
  const user = useUser().user;

  function CategoryItems() {
    if (category[0] != undefined) {
      return (
        <View style={styles.categoryContainer}>
          {category.map((c) => {
            return (
              <View style={styles.categoryItem} key={c}>
                <Text style={styles.categoryText}>{c}</Text>
                <TouchableOpacity
                  onPress={() => {
                    arr = category.filter(function (item) {
                      return item !== c;
                    });
                    setCategory(arr);
                  }}
                >
                  <MaterialIcons
                    name="cancel"
                    size={25}
                    color="red"
                    style={styles.clearBtn}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    }
  }
  return (
    <>
      <SafeAreaView style={styles.header}>
        <View style={styles.iconsAndName}>
          <Text style={styles.appName}>Swaply</Text>

          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Inbox");
              }}
            >
              <Feather
                name="inbox"
                style={styles.inbox}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <FilterBar navigation={navigation} />
      </SafeAreaView>
      <CategoryItems />

      <View style={styles.schoolItemsContainer}>
        <SchoolItems navigation={navigation} refresh={route.params} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  schoolItemsContainer: {
    flex: 1,
  },
  categoryItem: {
    margin: 10,
    flexDirection: "row",
  },
  categoryContainer: {
    flexDirection: "row",
  },
  categoryText: {
    alignSelf: "center",
    fontSize: 12,
  },
  clearBtn: {
    alignSelf: "center",
  },
  category: {
    textAlign: "center",
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 20,
    color: "black",
    marginLeft: 10,
  },

  messageOutline: {
    alignSelf: "flex-end",
  },
  school: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "black",
    fontSize: 20,
  },
  header: {
    backgroundColor: "#5ce1e6",
  },
  iconsAndName: {
    flexDirection: "row",
  },

  icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  inbox: {
    marginRight: 15,
  },
  message: {
    marginRight: 15,
  },
});

export default Discovery;
