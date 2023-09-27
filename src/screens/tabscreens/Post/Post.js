import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Button from "../../../componets/Button";
import { Entypo } from "@expo/vector-icons";
import NavButton from "../../../componets/NavButton";
/*
 <Entypo name="plus" size={50} color="black" />
          <Entypo name="plus" size={50} color="black" />
*/
const Post = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [focus, setFocus] = useState(Camera.Constants.AutoFocus.on);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraRef.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();

        let filename = data.uri.split("/").pop();

        setImage(data.uri);
        setTimeout(saveImage, 1000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //upload to server later

  const saveImage = async () => {
    if (image) {
      try {
        navigation.navigate("Upload", { image });
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };
  /*
  if (hasCameraPermission === false) {
    return <Text>No access to Camera</Text>;
  }
  */
  return (
    <SafeAreaView style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              backgroundColor: "black",
              opacity: 0.8,
              height: "20%",
            }}
          >
            <Button
              icon={"retweet"}
              size={35}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
            <Button
              icon={"flash"}
              size={35}
              color={
                flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
              }
              onPress={() =>
                setFlash(flash === Camera.Constants.FlashMode.off)
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              }
            />
          </View>

          <View
            style={{
              backgroundColor: "black",
              opacity: 0.8,
              marginTop: "auto",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "20%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                takePicture();
                saveImage();
              }}
              style={styles.takePictureButton}
            >
              <Entypo name={"circle"} size={90} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <>
          <View style={styles.imageTakenHeader}>
            <NavButton
              onPress={() => {
                setImage(null);
              }}
              icon="cross"
              color="black"
              size={30}
            />
            <NavButton
              title="Next"
              color="black"
              onPress={saveImage}
              size={30}
            />
          </View>

          <View style={styles.imageMainContainer}>
            <ImageBackground source={{ uri: image }} style={styles.image}>
              <TouchableOpacity
                onPress={() => setImage(null)}
                style={styles.takePictureButton}
              >
                <Entypo name={"retweet"} size={50} color="white" />
              </TouchableOpacity>
            </ImageBackground>
            <Text>Main</Text>
          </View>

          <View style={styles.subPicturesContainer}>
            <View style={styles.image2Container}>
              <ImageBackground source={{ uri: image }} style={styles.image}>
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  style={styles.takePictureButton}
                >
                  <Entypo name={"retweet"} size={50} color="white" />
                </TouchableOpacity>
              </ImageBackground>
              <Text>Secondary</Text>
            </View>

            <View style={styles.image3Container}>
              <ImageBackground source={{ uri: image }} style={styles.image}>
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  style={styles.takePictureButton}
                >
                  <Entypo name={"retweet"} size={50} color="white" />
                </TouchableOpacity>
              </ImageBackground>
              <Text>Tertiary</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            ></View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  camera: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
  },
  imageMainContainer: {
    width: "75%",
    alignSelf: "center",
  },
  imageTakenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image2Container: {
    width: "50%",
  },
  image3Container: {
    width: "50%",
  },

  subPicturesContainer: {
    flexDirection: "row",
  },
  takePictureButton: {},
});
export default Post;
