import { Text, SafeAreaView, StyleSheet, Image, TextInput } from "react-native";
import React, { useState } from "react";
import AWS from "aws-sdk";
import Button from "../../../componets/Button";

import { useUser } from "../../../../store/UserContext";

function Upload({ navigation, route }) {
  const image = route.params;

  const user = useUser().user;

  const [title, onChangeTitle] = useState("");
  const [description, onChangeDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: `source={require("../assets/placeholderlogo.jpg")}` }}
      />
      <TextInput
        style={styles.title}
        onChangeText={onChangeTitle}
        //value={userName}
        placeholder="title"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.description}
        onChangeText={onChangeDescription}
        placeholder="description"
        autoCapitalize="none"

        //onSubmitEditing={onSubmit}
      />
      <Button
        title={"Upload"}
        icon="camera"
        onPress={() => {
          const uploadFile = async () => {
            const S3_BUCKET = "swapapp";
            const REGION = "region";

            AWS.config.update({
              accessKeyId: "AKIASXKDWHOHM6GXHZWE",
              secretAccessKey: "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",
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
                    "http://172.20.10.2:3000/api/upload",
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${user.token} `,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ imageKey, title, description }),
                    }
                  );
                } catch (error) {
                  console.error(error);
                }
              };
              createItem();

              alert("File uploaded successfully.");
            });
          };

          uploadFile();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    flex: 0.75,
    borderRadius: 20,
  },

  title: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  description: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Upload;
