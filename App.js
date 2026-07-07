import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, Image, Modal, View, Animated, Switch, Dimensions, Linking } from "react-native";
import { Text } from "@rneui/base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useRef, useCallback, useContext, useMemo } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeProvider, useTheme } from "./DarkTheme/ThemeProvider"
import { SettingsContext } from "./SettingsContext";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PANEL_WIDTH = SCREEN_WIDTH * 0.72;

// Importing Screens
import Home from "./screens/Home";
import Info from "./screens/Info";
import Suggest from "./screens/Suggest";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgotPass from "./screens/ForgotPass";
import TermsAndCo from "./screens/TermsAndCo";
import Profile from "./screens/Profile";
import SinglePlayer from "./screens/SinglePlayer";
import Chat from "./screens/Chat";

// Importing Single Player Game 1 Screens
import StartScreen1 from "./screens/Game1Screens/StartScreen1";
import GameScreen1 from "./screens/Game1Screens/GameScreen1";
import GameScreenChallenge1 from "./screens/Game1Screens/GameScreenChallenge1";

// Importing Single Player Game 2 Screens
import StartScreen2 from "./screens/Game2Screens/StartScreen2";
import GameScreen2 from "./screens/Game2Screens/GameScreen2";
import GameScreenChallenge2 from "./screens/Game2Screens/GameScreenChallenge2";

// Importing Single Player Game 3 Screens
import StartScreen3 from "./screens/Game3Screens/StartScreen3";
import GameScreen3 from "./screens/Game3Screens/GameScreen3";
import GameScreenChallenge3 from "./screens/Game3Screens/GameScreenChallenge3";

// Importing Single Player Game 4 Screens
import StartScreen4 from "./screens/Game4Screens/StartScreen4";
import GameScreen4 from "./screens/Game4Screens/GameScreen4";
import GameScreenChallenge4 from "./screens/Game4Screens/GameScreenChallenge4";

// Importing Single Player Game 5 Screens
import StartScreen5 from "./screens/Game5Screens/StartScreen5";
import GameScreen5 from "./screens/Game5Screens/GameScreen5";
import MidScreen5 from "./screens/Game5Screens/MidScreen5";
import GameScreenChallenge5 from "./screens/Game5Screens/GameScreenChallenge5";

// Importing Single Player Game 6 Screens
import StartScreen6 from "./screens/Game6Screens/StartScreen6";
import GameScreen6 from "./screens/Game6Screens/GameScreen6";
import MidScreen6 from "./screens/Game6Screens/MidScreen6";
import GameScreenChallenge6 from "./screens/Game6Screens/GameScreenChallenge6";

const Stack = createNativeStackNavigator();

const globalScreenOptionsBase = {
  headerBackTitleVisible: true,
  headerRight: () => <SettingsButton />,
};

// Screen titles in functions
function HomeTitle({ navigation }) {
  return <Image style={{ height: 30, width: 150, marginTop: 10 }} source={require("./Images/LearnCuliaHeader.png")} />;
}

function InfoTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>App Information</Text>;
}

function SuggestTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Contact</Text>;
}

function LoginTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Login</Text>;
}

function RegisterTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Register</Text>;
}

function ForgotPassTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Forgot Password?</Text>;
}

function TACTitle({ navigation }) {
  return (
    <Text style={{ fontSize: 25, marginLeft: 10 }}>Terms & Conditions</Text>
  );
}

function ProfileTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Profile</Text>;
}

function SPTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Single Player</Text>;
}

function ChatTitle({ navigation }) {
  return <Text style={{ fontSize: 25 }}>CuliaBot</Text>;
}

function Game1Title({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Counting</Text>;
}

function Game2Title({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Add. & Subt.</Text>;
}

function Game3Title({ navigation }) {
  return <Text style={{ fontSize: 25, marginLeft: 10 }}>Multiplication</Text>;
}

function Game4Title({ navigation }) {
  return <Text style={{ fontSize: 23, marginLeft: 5 }}>Reverse Equations</Text>;
}

function Game5Title({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Comparisons</Text>;
}

function Game6Title({ navigation }) {
  return <Text style={{ fontSize: 25 }}>Arrange Nums</Text>;
}

function QuitGameButton({ navigation }) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const MODAL_WIDTH = 300;

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{ flexDirection: "row", marginLeft: -10 }}
      >
        <AntDesign name="arrowleft" size={18} color="#000" style={{ marginTop: 2.5 }} />
        <Text style={{ fontSize: 18, marginLeft: 5 }}>Quit Game</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalVw, { borderColor: colors.text, width: MODAL_WIDTH }]}>
            <LinearGradient
              colors={[colors.accent, colors.gradientEndCol]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 0.8 }}
              style={[styles.modalGradient, { width: MODAL_WIDTH }]}
            >
              <Text style={styles.modalTitle}>Quit Game?</Text>
              <Text style={styles.modalBody}>
                Are you sure you want to quit? Your progress will be lost.
              </Text>
              <TouchableOpacity
                style={styles.modalBtnConfirm}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("SinglePlayer");
                }}
              >
                <Text style={styles.modalBtnText}>Yes, Quit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnCancel, { borderColor: colors.text }]}
                onPress={() => setVisible(false)}
              >
                <Text style={[styles.modalBtnText, { color: colors.text }]}>Keep Playing</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </>
  );
}

function SettingsButton() {
  const { openSettings } = useContext(SettingsContext);
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={openSettings} activeOpacity={0.5} style={{ marginRight: 10 }}>
      <Feather name="settings" size={25} color="#000" />
    </TouchableOpacity>
  );
}

function AppInner() {
  const { colors, dark, setScheme, appColor, setAppColor } = useTheme();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(PANEL_WIDTH)).current;
  const navRef = useRef(null);

  const openSettings = useCallback(() => {
    setSettingsVisible(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }).start();
  }, [slideAnim]);

  const closeSettings = useCallback(() => {
    Animated.timing(slideAnim, { toValue: PANEL_WIDTH, duration: 220, useNativeDriver: true })
      .start(() => setSettingsVisible(false));
  }, [slideAnim]);

  const screenOptions = useMemo(
    () => ({
      ...globalScreenOptionsBase,
      headerStyle: { backgroundColor: colors.accent },
      headerTitleStyle: { color: "#000" },
      headerTintColor: "#000",
    }),
    [colors.accent, colors.text]
  );

  const settingsContextValue = useMemo(() => ({ openSettings, closeSettings }), [openSettings, closeSettings]);

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      <Modal visible={settingsVisible} transparent animationType="none" onRequestClose={closeSettings}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeSettings} />
        <Animated.View style={[styles.settingsPanel, { backgroundColor: colors.primary, transform: [{ translateX: slideAnim }] }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>Settings</Text>
            <View style={styles.panelRow}>
              <Text style={[styles.panelLabel, { color: colors.text }]}>Dark Mode</Text>
              <Switch
                value={dark}
                onValueChange={(val) => setScheme(val ? "dark" : "light")}
                trackColor={{ false: "#ccc", true: colors.accent }}
                thumbColor="#fff"
              />
            </View>
            <View style={[styles.panelDivider, { backgroundColor: colors.text }]} />
            <Text style={[styles.panelLabel, { color: colors.text, marginTop: 16, marginBottom: 12 }]}>Color Theme</Text>
            {[
              { key: "green", hex: "#6bffc6", label: "Green" },
              { key: "red", hex: "#ff4d4d", label: "Red" },
              { key: "blue", hex: "#2f96fd", label: "Blue" },
            ].map(({ key, hex, label }) => {
              const selected = appColor === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setAppColor(key)}
                  style={[
                    styles.colorRadio,
                    { borderColor: selected ? hex : (dark ? "#555" : "#ccc"), backgroundColor: selected ? hex + "22" : "transparent" },
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={[styles.headerPreview, { backgroundColor: hex }]}>
                    <Ionicons name="ios-person-circle-outline" size={14} color="black" />
                    <Text style={styles.headerPreviewText}>LearnCulia</Text>
                    <Feather name="settings" size={13} color="black" />
                  </View>
                  <Text style={[styles.panelLabel, { color: colors.text, flex: 1, marginLeft: 10 }]}>{label}</Text>
                  <View style={[styles.radioOuter, { borderColor: selected ? hex : (dark ? "#555" : "#ccc") }]}>
                    {selected && <View style={[styles.radioInner, { backgroundColor: hex }]} />}
                  </View>
                </TouchableOpacity>
              );
            })}
            <View style={[styles.panelDivider, { backgroundColor: colors.text, marginTop: 16 }]} />
            <Text style={[styles.panelLabel, { color: colors.text, marginTop: 16, marginBottom: 4, fontSize: 14, opacity: 0.5 }]}>LEGAL</Text>
            <TouchableOpacity
              onPress={() => { closeSettings(); navRef.current?.navigate("TermsAndCo"); }}
              style={styles.panelRow}
            >
              <Text style={[styles.panelLabel, { color: "#0099ff" }]}>Terms & Conditions</Text>
              <Text style={styles.tacLink}>→</Text>
            </TouchableOpacity>
            <View style={[styles.panelDivider, { backgroundColor: colors.text }]} />
            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.privacypolicies.com/live/8face58a-f75c-41fc-9db5-fd29e92eded6")}
              style={styles.panelRow}
            >
              <Text style={[styles.panelLabel, { color: "#0099ff" }]}>Privacy Policy</Text>
              <Text style={styles.tacLink}>→</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.copyright, { color: colors.text }]}>© {new Date().getFullYear()} LearnCulia™. All rights reserved.</Text>
        </Animated.View>
      </Modal>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => {
              return {
                headerTitle: () => <HomeTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="Info"
            component={Info}
            options={({ navigation }) => {
              return {
                headerTitle: () => <InfoTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="Suggest"
            component={Suggest}
            options={({ navigation }) => {
              return {
                headerTitle: () => <SuggestTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ navigation }) => {
              return {
                headerTitle: () => <LoginTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({ navigation }) => {
              return {
                headerTitle: () => <RegisterTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="ForgotPass"
            component={ForgotPass}
            options={({ navigation }) => {
              return {
                headerTitle: () => <ForgotPassTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="TermsAndCo"
            component={TermsAndCo}
            options={({ navigation }) => {
              return {
                headerTitle: () => <TACTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => {
              return {
                headerTitle: () => <ProfileTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="SinglePlayer"
            component={SinglePlayer}
            options={({ navigation }) => {
              return {
                headerTitle: () => <SPTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ navigation }) => {
              return {
                headerTitle: () => <ChatTitle navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="StartScreen1"
            component={StartScreen1}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game1Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreen1"
            component={GameScreen1}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game1Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreenChallenge1"
            component={GameScreenChallenge1}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game1Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="StartScreen2"
            component={StartScreen2}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game2Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreen2"
            component={GameScreen2}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game2Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreenChallenge2"
            component={GameScreenChallenge2}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game2Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="StartScreen3"
            component={StartScreen3}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game3Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreen3"
            component={GameScreen3}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game3Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreenChallenge3"
            component={GameScreenChallenge3}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game3Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="StartScreen4"
            component={StartScreen4}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game4Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreen4"
            component={GameScreen4}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game4Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreenChallenge4"
            component={GameScreenChallenge4}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game4Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="StartScreen5"
            component={StartScreen5}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game5Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreen5"
            component={GameScreen5}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game5Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="MidScreen5"
            component={MidScreen5}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game5Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreenChallenge5"
            component={GameScreenChallenge5}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game5Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="StartScreen6"
            component={StartScreen6}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game6Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreen6"
            component={GameScreen6}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game6Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="MidScreen6"
            component={MidScreen6}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game6Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="GameScreenChallenge6"
            component={GameScreenChallenge6}
            options={({ navigation }) => {
              return {
                headerTitle: () => <Game6Title navigation={navigation} />,
                headerLeft: () => <QuitGameButton navigation={navigation} />,
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalVw: {
    borderRadius: 16,
    borderWidth: 3,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalGradient: {
    borderRadius: 16,
    alignItems: "center",
    padding: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalBtnConfirm: {
    backgroundColor: "#ff4747",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginBottom: 12,
    elevation: 2,
    width: 200,
    alignItems: "center",
  },
  modalBtnCancel: {
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 28,
    width: 200,
    alignItems: "center",
  },
  modalBtnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  modalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  settingsPanel: {
    position: "absolute",
    top: 0, right: 0, bottom: 0,
    width: PANEL_WIDTH,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  panelTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  panelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  panelLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  panelDivider: {
    height: 1,
    opacity: 0.2,
  },
  copyright: {
    fontSize: 12,
    opacity: 0.45,
    textAlign: "center",
    paddingTop: 12,
  },
  colorRadio: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  headerPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    height: 28,
    borderRadius: 6,
    paddingHorizontal: 7,
    overflow: "hidden",
    gap: 5,
  },
  headerPreviewText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "black",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  tacLink: {
    color: "#0099ff",
    fontSize: 16,
    fontWeight: "600",
  },
});
