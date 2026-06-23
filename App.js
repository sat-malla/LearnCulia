import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity, Image, Modal, View } from "react-native";
import { Text } from "@rneui/base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeProvider, useTheme } from "./DarkTheme/ThemeProvider"

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

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#6bffc6" },
  headerTitleStyle: { color: "black" },
  headerTintColor: "black",
  headerBackTitleVisible: true,
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
        <AntDesign name="arrowleft" size={18} color="black" style={{ marginTop: 2.5 }} />
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
              colors={["#6bffc6", colors.gradientEndCol]}
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

export default function App({ navigation }) {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
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
});
