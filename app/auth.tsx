import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { DarkModeColors } from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  signInWithCredential,
  signInWithRedirect,
} from "firebase/auth";
import { loginUser } from "@/redux/actions/userAction";
import CustomKeyboard from "@/components/CustomKeyboard";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const submitHandler = (e: any) => {};

  const handleSignUpWithEmailPassword = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(response);
      alert(`Check Your Email`);
      if (response && response.user) {
        await updateProfile(response.user, {
          displayName: name, // Assuming 'name' is the variable holding the display name
        });
        setLoading(false);
        router.push("/(tabs)/home");
        // Save user data to AsyncStorage after successful sign up
        await AsyncStorage.setItem("userData", JSON.stringify(response.user));
      }
    } catch (error: any) {
      alert(`Registration Failed \n Make Sure to fill All inputs`);
      console.log(`Registration Failed`, error.message);
    } finally {
      setLoading(false);
    }
  };  

  const handleSignInWithEmailPassword = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      if (response) {
        setLoading(false);
        router.push("/(tabs)/home");
        // Save user data to AsyncStorage after successful sign in
        await AsyncStorage.setItem("userData", JSON.stringify(response.user));
      }
    } catch (error: any) {
      console.log(`Login Failed`, error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        await updateProfile(result.user, {
          displayName: result.user.displayName,
        });
        await AsyncStorage.setItem("userData", JSON.stringify(result.user));
        router.push("/home");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };
  // main.webmind@gmail.com
  // awer@#4oWER23
  return (
    <SafeAreaView
      style={styles.container}
      className="flex-[1] justify-center  items-center"
    >
      <CustomKeyboard>
        <Text className=" text-white text-xl font-bold">
          {isLogin ? "Login" : "SignUp"}
        </Text>
        <View
          className=" flex-col py-12  justify-around w-[90vw] rounded-2xl mt-12 "
          style={{ backgroundColor: DarkModeColors.secondary }}
        >
          <View>
            {!isLogin ? (
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setName(text)}
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                className=" h-14  px-2 py-1 rounded-xl mt-5 mx-5"
                style={{ backgroundColor: DarkModeColors.accent }}
              />
            ) : (
              ""
            )}
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              className=" h-14  px-2 py-1 rounded-xl mt-5 mx-5"
              style={{ backgroundColor: DarkModeColors.accent }}
            />
            <TextInput
              placeholder="Password.."
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              className=" h-14   px-2 py-1 rounded-xl mt-5 mx-5"
              style={{ backgroundColor: DarkModeColors.accent }}
              secureTextEntry
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={
                isLogin
                  ? handleSignInWithEmailPassword
                  : handleSignUpWithEmailPassword
              }
              className="mt-8 mx-5 bg-white/10 py-3 rounded-xl"
            >
              <Text className="text-lg font-bold text-center text-white">
                {isLogin ? "Login" : "Sign UP"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text className="text-white text-center text-base mt-3">
                {isLogin
                  ? " Don't Have an Account?"
                  : "Already Have an Account?"}
                <Text className="text-blue-300 font-bold">
                  {""} {!isLogin ? "Login" : "Sign UP"}
                </Text>{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-5">
            <Text className="text-white text-center font-pextralight">
              {" "}
              ______or_____
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSignInWithGoogle}
            className="flex-row justify-center bg-lightPrimary/20 mx-5 rounded-xl py-3 my-3 items-center"
          >
            <Image
              className="w-7 h-7"
              source={require("@/assets/images/google.png")}
            />
            <Text className="text-xl ml-2 text-white ">Sign With Google</Text>
          </TouchableOpacity>
        </View>
      </CustomKeyboard>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DarkModeColors.primary,
    color: DarkModeColors.accent,
  },
});
