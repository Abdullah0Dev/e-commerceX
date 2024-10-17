import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { DarkModeColors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

const UserAccount = () => {
  const [image, setImage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log(`User:`, user);
    });
  }, []);
  // Load the image URI from AsyncStorage when component mounts
  useEffect(() => {
    loadImageFromStorage();
  }, []);

  // Function to load the image URI from AsyncStorage
  const loadImageFromStorage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("userImage");
      if (savedImage !== null) {
        setImage(savedImage);
      }
    } catch (error) {
      console.error("Error loading image from AsyncStorage: ", error);
    }
  };

  // Function to save the picked image URI to AsyncStorage
  const saveImageToStorage = async (uri: string) => {
    try {
      await AsyncStorage.setItem("userImage", uri);
    } catch (error) {
      console.error("Error saving image to AsyncStorage: ", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Save the picked image URI to AsyncStorage
      saveImageToStorage(result.assets[0].uri);
    }
  };

  return (
    <View>
      {/* INfo */}
      <View className="">
        <View className=" h-14 px-2 py-1 justify-center rounded-xl bg-lightPrimary/80 mt-5 mx-5">
          <Text className=" text-lg text-center pl-2">{user?.displayName}</Text>
        </View>
        <Feather
          name="user"
          // onPress={handleSearchSubmit}
          color={`#3d3d3d`}
          style={{
            fontSize: 23,
            position: "absolute",
            top: "50%",
            left: `8%`,
          }}
        />
      </View>

      <View className="">
        <View className=" h-14 px-2 py-1 justify-center rounded-xl bg-lightPrimary/80 mt-5 mx-5">
          <Text className=" text-lg text-center pl-2">{user?.email} </Text>
        </View>
        <Feather
          name="mail"
          // onPress={handleSearchSubmit}
          color={`#3d3d3d`}
          style={{
            fontSize: 23,
            position: "absolute",
            top: "50%",
            left: `8%`,
          }}
        />
      </View>
      {/* image */}
      {/* {image && <Image source={{ uri: image }}  className="w-32 mt-60 h-32 rounded-full self-center"/>} */}
      <View
        className="w-32  h-32 mt-60 rounded-full self-center"
        style={{ backgroundColor: DarkModeColors.accent }}
      >
        <ImageBackground
          className=" items-center  justify-center "
          source={{
            uri: image
              ? image
              : `https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png`,
          }}
          style={styles.backgroundImage}
        >
          <AntDesign name="plus" size={39} color="black" onPress={pickImage} />
        </ImageBackground>
      </View>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DarkModeColors.primary,
    color: DarkModeColors.accent,
    height: "100%",
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 999, // Adjust the value as needed for the desired roundness
    overflow: "hidden", // Ensures that the image stays within the rounded border
  },
});
