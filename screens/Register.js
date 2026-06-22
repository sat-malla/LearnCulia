import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Text, Button } from "@rneui/base";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather, Entypo } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";
import { Link } from "@react-navigation/native";
import { auth, db } from "../firebase.js";
import { useGlobalState } from "./RewardSystem.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Register = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsCo, setTermsCo] = useState(false);
  const [revealPass, setRevealPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, isRegistered] = useGlobalState("registered");
  const [, setUserId] = useGlobalState("userId");
  useGlobalState("docUserId");
  const myHeaderHeight = useHeaderHeight();

  const addUserData = async () => {
    await db
      .collection("userdata")
      .add({
        email: auth.currentUser.email,
        gender: 0,
        glasses: false,
        partyHat: false,
        id: auth.currentUser.uid,
      });
  };

  const register = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) return;

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(trimmedEmail, password);
      setUserId(auth.currentUser.uid);
      await addUserData();
      isRegistered(true);
      navigation.navigate("Home");
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          Alert.alert("Email in use", `An account with ${trimmedEmail} already exists.`);
          break;
        case "auth/invalid-email":
          Alert.alert("Invalid email", "Please enter a valid email address.");
          break;
        case "auth/weak-password":
          Alert.alert("Weak password", "Password must be at least 6 characters.");
          break;
        case "auth/too-many-requests":
          Alert.alert("Too many attempts", "Please try again later.");
          break;
        default:
          Alert.alert("Registration failed", e.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "flex-end", width: 80, marginRight: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} activeOpacity={0.5}>
            <Entypo name="home" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ backgroundColor: colors.primary, flex: 1 }}
      keyboardVerticalOffset={myHeaderHeight + 47}
    >
      <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 60 }}>
            <Text style={[styles.title, { color: colors.text }]}>Register Today!</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Register for customized profile pictures, achievements, and more!
            </Text>
            <Image
              source={require("../Images/registerPic.png")}
              style={styles.image}
            />

            <View style={styles.inputCont}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                style={[styles.styleInput, { borderColor: colors.text, color: colors.text }]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                keyboardAppearance={dark ? "dark" : "light"}
              />
              <View style={styles.passwordRow}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style={[styles.styleInput, { borderColor: colors.text, color: colors.text, flex: 1 }]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!revealPass}
                  keyboardAppearance={dark ? "dark" : "light"}
                />
                <TouchableOpacity style={styles.eyeBtn} onPress={() => setRevealPass(!revealPass)}>
                  <Feather name={revealPass ? "eye" : "eye-off"} size={22} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.termsRow}>
              <CheckBox
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                  margin: 0,
                  marginRight: 4,
                }}
                checkedColor="#11ad71"
                checked={termsCo}
                onPress={() => setTermsCo(!termsCo)}
              />
              <Text style={{ color: colors.text, flex: 1, flexWrap: "wrap" }}>
                By registering, you confirm that you accept our{" "}
                <Link
                  to={{ screen: "TermsAndCo", params: { id: "id" } }}
                  style={{ color: colors.buttonColor }}
                >
                  Terms & Conditions
                </Link>
              </Text>
            </View>

            <Button
              disabled={!email.trim() || !password || !termsCo || loading}
              loading={loading}
              title="Register"
              containerStyle={{ marginTop: 30, width: "100%" }}
              titleStyle={{ fontWeight: "bold", color: colors.bannerText }}
              disabledTitleStyle={{ color: colors.bannerText, fontWeight: "bold" }}
              buttonStyle={{ borderRadius: 8, backgroundColor: colors.loginBanner, height: 50 }}
              disabledStyle={{ backgroundColor: colors.loginBanner, opacity: 0.5 }}
              onPress={register}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 30,
    textAlign: "center",
  },
  image: {
    width: SCREEN_WIDTH - 80,
    height: 200,
    marginTop: 30,
    borderRadius: 8,
    resizeMode: "cover",
  },
  inputCont: {
    marginTop: 30,
    width: "100%",
  },
  styleInput: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
    height: 50,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    width: "100%",
  },
});
