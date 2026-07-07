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
import React, { useState } from "react";
import { Text, Button } from "@rneui/base";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../firebase.js";
import { useGlobalState } from "./RewardSystem.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealPass, setRevealPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, isRegistered] = useGlobalState("registered");
  const [, setUserId] = useGlobalState("userId");
  const [, setProfileLoaded] = useGlobalState("profileLoaded");
  const [, setGender] = useGlobalState("gender");
  const [, setGlasses] = useGlobalState("glasses");
  const [, setPartyHat] = useGlobalState("partyHat");
  const [, setShirtColor] = useGlobalState("shirtColor");
  const [, setSkinTone] = useGlobalState("skinTone");
  const [, setGamesCompleted] = useGlobalState("gamesCompleted");
  const myHeaderHeight = useHeaderHeight();

  const login = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) return;

    setLoading(true);
    try {
      const userCred = await auth.signInWithEmailAndPassword(trimmedEmail, password);
      isRegistered(true);
      setUserId(userCred.user.uid);
      db.collection("userdata").get().then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().id === userCred.user.uid) {
            setGender(doc.data().gender ?? 0);
            setGlasses(doc.data().glasses ?? false);
            setPartyHat(doc.data().partyHat ?? false);
            setShirtColor(doc.data().shirtColor ?? "green");
            setSkinTone(doc.data().skinTone ?? "mediumDark");
            setGamesCompleted(doc.data().gamesCompleted ?? 0);
            setProfileLoaded(true);
          }
        });
      });
      navigation.navigate("Home");
    } catch (e) {
      isRegistered(false);
      switch (e.code) {
        case "auth/user-not-found":
          Alert.alert("Account not found", `No account found for ${trimmedEmail}. Please register first.`);
          break;
        case "auth/wrong-password":
          Alert.alert("Incorrect password", "The password you entered is wrong. Try again.");
          break;
        case "auth/invalid-email":
          Alert.alert("Invalid email", "Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          Alert.alert("Too many attempts", "Account temporarily locked. Please try again later.");
          break;
        case "auth/user-disabled":
          Alert.alert("Account disabled", "This account has been disabled. Contact support.");
          break;
        default:
          Alert.alert("Login failed", "Incorrect email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <View style={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 50 }}>
            <Text style={[styles.title, { color: colors.text }]}>Login</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              Login today to have custom profile pictures, achievements, and more!
            </Text>
            {colors.accent === "#6bffc6" ? (
              <Image
                source={require("../Images/loginPic.png")}
                style={styles.image}
              />
            ) : colors.accent === "#ff4d4d" ? (
              <Image
                source={require("../Images/loginPicRed.png")}
                style={styles.image}
              />
            ) : colors.accent === "#2f96fd" ? (
              <Image
                source={require("../Images/loginPicBlue.png")}
                style={styles.image}
              />
            ) : null}
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

            <Button
              disabled={!email.trim() || !password || loading}
              loading={loading}
              title="Login"
              containerStyle={{ marginTop: 40, width: "100%" }}
              titleStyle={{ fontWeight: "bold", color: colors.bannerText }}
              disabledTitleStyle={{ color: colors.bannerText, fontWeight: "bold" }}
              buttonStyle={{ borderRadius: 8, backgroundColor: colors.loginBanner, height: 50 }}
              disabledStyle={{ backgroundColor: colors.loginBanner, opacity: 0.5 }}
              onPress={login}
            />

            <Link
              to={{ screen: "ForgotPass", params: { id: "id" } }}
              style={{ marginTop: 20, color: colors.buttonColor, fontSize: 17 }}
            >
              Forgot Password?
            </Link>

            <Text style={[styles.orText, { color: colors.orYouCan }]}>Or you can...</Text>

            <TouchableOpacity
              style={[styles.registerBtn, { backgroundColor: colors.orangeBG }]}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: colors.orangeText, fontWeight: "bold", fontSize: 18 }}>
                Create New Account
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    width: SCREEN_WIDTH - 80,
    height: 150,
    marginTop: 30,
    borderRadius: 8,
    resizeMode: "cover",
  },
  inputCont: {
    marginTop: 40,
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
  orText: {
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 16,
  },
  registerBtn: {
    borderRadius: 20,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
});
