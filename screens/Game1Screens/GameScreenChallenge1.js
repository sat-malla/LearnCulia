import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { Text } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalState } from "../GlobalState.js";
import { auth, incrementGamesCompleted } from "../../firebase.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

const AppleImages = [
  require("../../Images/AppleImages/oneApple.png"),
  require("../../Images/AppleImages/twoApple.png"),
  require("../../Images/AppleImages/threeApple.png"),
  require("../../Images/AppleImages/fourApple.png"),
  require("../../Images/AppleImages/fiveApple.png"),
  require("../../Images/AppleImages/sixApple.png"),
  require("../../Images/AppleImages/sevenApple.png"),
  require("../../Images/AppleImages/eightApple.png"),
  require("../../Images/AppleImages/nineApple.png"),
  require("../../Images/AppleImages/tenApple.png"),
];

const OrangeImages = [
  require("../../Images/OrangeImages/oneOrange.png"),
  require("../../Images/OrangeImages/twoOrange.png"),
  require("../../Images/OrangeImages/threeOrange.png"),
  require("../../Images/OrangeImages/fourOrange.png"),
  require("../../Images/OrangeImages/fiveOrange.png"),
  require("../../Images/OrangeImages/sixOrange.png"),
  require("../../Images/OrangeImages/sevenOrange.png"),
  require("../../Images/OrangeImages/eightOrange.png"),
  require("../../Images/OrangeImages/nineOrange.png"),
  require("../../Images/OrangeImages/tenOrange.png"),
];

const BananaImages = [
  require("../../Images/BananaImages/oneBanana.png"),
  require("../../Images/BananaImages/twoBanana.png"),
  require("../../Images/BananaImages/threeBanana.png"),
  require("../../Images/BananaImages/fourBanana.png"),
  require("../../Images/BananaImages/fiveBanana.png"),
  require("../../Images/BananaImages/sixBanana.png"),
  require("../../Images/BananaImages/sevenBanana.png"),
  require("../../Images/BananaImages/eightBanana.png"),
  require("../../Images/BananaImages/nineBanana.png"),
  require("../../Images/BananaImages/tenBanana.png"),
];

const ALL_BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const GameScreenChallenge1 = ({ navigation }) => {
  const { colors } = useTheme();
  const [number, setNumber] = useState(0);
  const [ready, setReady] = useState(true);
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [finishModal, setFinishModal] = useState(false);
  const [image, setImage] = useState(null);
  const [userFruit] = useGlobalState("game1Fruit");
  const [, setGlobalGamesCompleted] = useGlobalState("gamesCompleted");
  const pool = useRef([]);

  const finishGame = () => {
    setFinishModal(false);
    incrementGamesCompleted(auth.currentUser.uid);
    setGlobalGamesCompleted((c) => c + 1);
    navigation.navigate("SinglePlayer");
  };

  const generateNumber = () => {
    if (pool.current.length === 0) {
      pool.current = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((n) => ({ n, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ n }) => n);
    }
    const next = pool.current.pop();
    setNumber(next);
    if (userFruit === "apple") {
      setImage(AppleImages[next - 1]);
    } else if (userFruit === "orange") {
      setImage(OrangeImages[next - 1]);
    } else {
      setImage(BananaImages[next - 1]);
    }
  };

  const startGame = () => {
    generateNumber();
    setReady(false);
  };

  const verify = (num) => {
    isButtonClicked(true);
    if (count < 10) {
      if (number === num) {
        isAnswerCorrect(true);
        setCount(count + 1);
        generateNumber();
      } else {
        isAnswerCorrect(false);
      }
    } else {
      setFinishModal(true);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 15 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Modal  
        animationType="fade"
        transparent={true}
        visible={finishModal}
        onRequestClose={() => setFinishModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalVw, { borderColor: colors.text, width: MODAL_WIDTH }]}>
            <LinearGradient
              colors={[colors.accent, colors.gradientEndCol]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 0.8 }}
              style={[styles.modalGradient, { width: MODAL_WIDTH }]}
            >
              <ImageBackground
                source={require("../../Images/confetti.jpeg")}
                imageStyle={{ opacity: 0.2, borderRadius: 16 }}
                style={{ alignSelf: "stretch", padding: 28, alignItems: "center" }}
              >
                <Text
                  style={{
                    marginBottom: 20,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Congratulations! Now you know how to count numbers with your
                  fingers!
                </Text>
                <Pressable style={[styles.finishButton, { backgroundColor: colors.accent }]} onPress={finishGame}>
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 18,
                      marginRight: 8,
                    }}
                  >
                    Finish
                  </Text>
                  <AntDesign name="arrowright" size={22} color="black" />
                </Pressable>
              </ImageBackground>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      <Text
        style={{
          color: colors.text,
          marginTop: 50,
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Let's apply the skills we learned for the following problems!
      </Text>

      {ready ? (
        <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.accent }]} onPress={startGame}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Press to Play!
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              color: colors.text,
              marginTop: 10,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Count the number of fruits on your screen!
          </Text>
          {image && (
            <Image
              source={image}
              style={[
                styles.fruitImage,
                number >= 1 && number <= 5
                  ? { width: SCREEN_WIDTH * 0.75, height: SCREEN_WIDTH * 0.38 }
                  : { width: SCREEN_WIDTH * 0.75, height: SCREEN_WIDTH * 0.5 },
              ]}
            />
          )}
          {buttonClicked ? (
            answerCorrect ? (
              <Text style={[styles.response, { color: colors.text }]}>
                👏 Good Job! 👏
              </Text>
            ) : (
              <Text style={[styles.response, { color: colors.text }]}>
                No pressure! Try it one more time!
              </Text>
            )
          ) : (
            <Text style={styles.response}> </Text>
          )}

          <View style={styles.buttonGrid}>
            {ALL_BUTTONS.map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.answerButton, { borderColor: colors.text }]}
                onPress={() => verify(num)}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default GameScreenChallenge1;

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
  },
  finishButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    width: 200,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  fruitImage: {
    alignSelf: "center",
    marginTop: 30,
    resizeMode: "contain",
  },
  response: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 20,
    textAlign: "center",
    minHeight: 30,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
    gap: 12,
    paddingHorizontal: 8,
  },
  answerButton: {
    borderWidth: 1.5,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#b3ffe4",
  },
});
