import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Text } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { useGlobalState } from "../RewardSystem";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ALL_BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const FingerImages = [
  require("../../Images/fingerOne.png"),
  require("../../Images/fingerTwo.png"),
  require("../../Images/fingerThree.png"),
  require("../../Images/fingerFour.png"),
  require("../../Images/fingerFive.png"),
  require("../../Images/fingerSix.png"),
  require("../../Images/fingerSeven.png"),
  require("../../Images/fingerEight.png"),
  require("../../Images/fingerNine.png"),
  require("../../Images/fingerTen.png"),
];

const GameScreen1 = ({ navigation }) => {
  const { colors } = useTheme();
  const [number, setNumber] = useState(0);
  const [ready, setReady] = useState(true);
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [challengeModal, setChallengeModal] = useState(false);
  const [image, setImage] = useState(null);
  const [, setFruit] = useGlobalState("game1Fruit");
  const [loading, setLoading] = useState(true);
  const pool = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateNumber = () => {
    if (pool.current.length === 0) {
      pool.current = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((n) => ({ n, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ n }) => n);
    }
    const next = pool.current.pop();
    setNumber(next);
    setImage(FingerImages[next - 1]);
  };

  const startGame = () => {
    generateNumber();
    setReady(false);
  };

  const nextGame = (selectedFruit) => {
    setFruit(selectedFruit);
    setChallengeModal(false);
    navigation.navigate("GameScreenChallenge1");
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
      setChallengeModal(true);
    }
  };

  const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 15 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      {loading ? (
        <View style={{ marginTop: "50%" }}>
          <ActivityIndicator size="large" color="#6bffc6" />
        </View>
      ) : (
        <View style={{ alignItems: "center", width: "100%" }}>
          {/* Fruit picker modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={challengeModal}
            onRequestClose={() => setChallengeModal(false)}
          >
            <View style={styles.modalBackdrop}>
              <View
                style={[
                  styles.modalVw,
                  { borderColor: colors.text, width: MODAL_WIDTH },
                ]}
              >
                <LinearGradient
                  colors={["#6bffc6", colors.gradientEndCol]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 0.8 }}
                  style={[styles.modalGradient, { width: MODAL_WIDTH }]}
                >
                  <Text
                    style={{
                      marginTop: 20,
                      marginBottom: 24,
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                      paddingHorizontal: 12,
                    }}
                  >
                    Congratulations! Before we move on to the challenge, pick
                    your favorite fruit!
                  </Text>
                  <View style={styles.fruitRow}>
                    {[
                      { key: "apple", src: require("../../Images/appleicon.png"), label: "Apple" },
                      { key: "orange", src: require("../../Images/orangeicon.png"), label: "Orange" },
                      { key: "banana", src: require("../../Images/bananaicon.png"), label: "Banana" },
                    ].map(({ key, src, label }) => (
                      <View key={key} style={styles.fruitOption}>
                        <TouchableOpacity
                          style={styles.fruitButton}
                          onPress={() => nextGame(key)}
                        >
                          <Image source={src} style={{ width: 36, height: 36 }} />
                        </TouchableOpacity>
                        <Text style={{ marginTop: 6 }}>{label}</Text>
                      </View>
                    ))}
                  </View>
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
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
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
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                What is the number of fingers shown by the hand? Press the
                correct button below.
              </Text>
              {image && (
                <Image
                  source={image}
                  style={[
                    styles.fingerImage,
                    number >= 1 && number <= 5
                      ? { width: SCREEN_WIDTH * 0.28, height: SCREEN_WIDTH * 0.55 }
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

              {/* Single unified button grid */}
              <View style={styles.buttonGrid}>
                {ALL_BUTTONS.map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[styles.answerButton, { borderColor: colors.bannerText, backgroundColor: colors.loginBanner }]}
                    onPress={() => verify(num)}
                  >
                    <Text style={{ color: colors.bannerText, fontWeight: "bold", fontSize: 16 }}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default GameScreen1;

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
    paddingBottom: 20,
  },
  fruitRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  fruitOption: {
    alignItems: "center",
  },
  fruitButton: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "transparent",
    borderColor: "gray",
    borderWidth: 1,
  },
  startButton: {
    width: 200,
    borderWidth: 2,
    borderColor: "#333",
    backgroundColor: "#6bffc6",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  fingerImage: {
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
  },
});
