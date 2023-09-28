import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AWS from "aws-sdk";
import Button from "../../../componets/Button";
import Checkbox from "expo-checkbox";
import NavButton from "../../../componets/NavButton";
import { AntDesign } from "@expo/vector-icons";

import { useUser } from "../../../../store/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";

function Upload({ navigation, route }) {
  const image = route.params;

  const user = useUser().user;

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [isCheckedSwap, setCheckedSwap] = useState(true);
  const [isCheckedCash, setCheckedCash] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: image.image }} style={styles.postImage} />

        <View style={styles.title}>
          <Text>Title</Text>
          <TextInput
            onChangeText={onChangeTitle}
            //value={userName}
            autoCapitalize="none"
          ></TextInput>
        </View>

        <View style={styles.description}>
          <Text>Description</Text>
          <TextInput
            onChangeText={onChangeDescription}
            autoCapitalize="none"

            //onSubmitEditing={onSubmit}
          />
        </View>

        <View style={styles.category}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CategorySelect");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.categoryText}>Cateogry</Text>
              <AntDesign
                name="down"
                size={25}
                color="black"
                style={styles.categoryBtn}
              />
            </View>
            <Text

            //onSubmitEditing={onSubmit}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Swap or Cash or Both?
        </Text>

        <View style={styles.checkboxes}>
          <View style={styles.section}>
            <Text style={styles.paragraph}>Swap</Text>

            <Checkbox
              style={styles.checkbox}
              value={isCheckedSwap}
              onValueChange={setCheckedSwap}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.paragraph}>Cash</Text>

            <Checkbox
              style={styles.checkbox}
              value={isCheckedCash}
              onValueChange={setCheckedCash}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            const uploadFile = async () => {
              const S3_BUCKET = "swapapp";
              const REGION = "region";

              AWS.config.update({
                accessKeyId: "filler",
                secretAccessKey: "filler",
              });
              const s3 = new AWS.S3({
                params: { Bucket: S3_BUCKET },
                region: REGION,
              });

              const img_uri = image.image;
              const response = await fetch(img_uri);
              const blob = await response.blob();

              const imageKey = response._bodyBlob._data.name;
              const params = {
                Bucket: S3_BUCKET,
                Key: "item_image/" + imageKey,
                Body: blob,
              };

              var upload = s3
                .putObject(params)
                .on("httpUploadProgress", function (evt) {
                  console.log(console.log(evt));
                })
                .promise();

              await upload.then((err, data) => {
                const createItem = async () => {
                  try {
                    const response = await fetch(
                      "http://136.244.139.127:3000/api/upload",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${user.token} `,
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          imageKey,
                          title,
                          description,
                          isCheckedSwap,
                          isCheckedCash,
                        }),
                      }
                    );
                  } catch (error) {
                    console.error(error);
                  }
                };
                createItem();
                navigation.navigate({
                  name: "Discovery",
                });
              });
            };

            uploadFile();
          }}
        >
          <Text style={styles.uploadBtnText}>Upload</Text>
        </TouchableOpacity>
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            By using Swaply, you understand that this listing will become public
            at your school. Use at your own discretion. Unapproved items will be
            taken off if they pose a threat.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    height: 50,
    borderRadius: 5,
    borderColor: "grey",
  },

  description: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
  },

  checkbox: {
    width: 30,
    height: 30,
  },
  category: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
  },

  section: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
  categoryText: {},
  categoryBtn: {
    marginLeft: "auto",
    marginRight: 10,
  },

  postImage: {
    aspectRatio: 1,
  },
  checkboxes: {
    flexDirection: "row",
    justifyContent: "center",
  },

  disclaimer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
  },
  disclaimerText: {
    lineHeight: 25,
    color: "grey",
  },
  uploadBtn: {
    backgroundColor: "#5ce1e6",
    width: "35%",
    alignSelf: "center",
    marginTop: 50,
    borderWidth: 1,
  },
  uploadBtnText: {
    textAlign: "center",
    fontSize: 25,
    color: "black",
  },
});
export default Upload;
