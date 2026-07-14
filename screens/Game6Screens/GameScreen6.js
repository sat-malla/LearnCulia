import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

const GameScreen6 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [numbers, setNumbers] = useState("");
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [challengeModal, setChallengeModal] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const generateNumbers = () => {
    const numArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    setNumbers(numArray.join(", "));
  };

  const startGame = () => {
    generateNumbers();
    setReady(false);
  };

  const verify = () => {
    isButtonClicked(true);
    const sorted = numbers
      .split(", ")
      .sort((a, b) => Number(a) - Number(b))
      .join(", ");
    if (count < 10) {
      if (answer === sorted) {
        isAnswerCorrect(true);
        setAnswer("");
        setCount(count + 1);
        generateNumbers();
      } else {
        isAnswerCorrect(false);
      }
    } else {
      setChallengeModal(true);
    }
  };

  const nextScreen = () => {
    setChallengeModal(false);
    navigation.navigate("MidScreen6");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, backgroundColor: colors.primary }}
      keyboardVerticalOffset={myHeaderHeight + 57}
    >
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={challengeModal}
              onRequestClose={() => setChallengeModal(false)}
            >
              <View style={styles.modalBackdrop}>
                <View style={[styles.modalVw, { borderColor: colors.text, width: MODAL_WIDTH }]}>
                  <LinearGradient
                    colors={[colors.accent, colors.gradientEndCol]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0.8 }}
                    style={[styles.modalGradient, { width: MODAL_WIDTH }]}
                  >
                    <Text style={styles.modalTitle}>🙌 Well Done! 🙌</Text>
                    <Text style={styles.modalBody}>
                      Let's now order more complex numbers!
                    </Text>
                    <TouchableOpacity style={[styles.modalBtn, { backgroundColor: colors.accent }]} onPress={nextScreen}>
                      <Text style={styles.modalBtnText}>Next</Text>
                      <AntDesign name="arrow-right" size={22} color="black" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </Modal>

            <Text style={[styles.heading, { color: colors.text }]}>
              Let's apply the skills we learned for the following problems!
            </Text>

            {ready ? (
              <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.accent }]} onPress={startGame}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Press to Play!</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ alignItems: "center", width: "100%" }}>
                <Text style={[styles.instruction, { color: colors.text }]}>
                  Type the numbers in order from smallest to largest!
                </Text>
                <Text style={[styles.numbers, { color: colors.text }]}>{numbers}</Text>
                <Input
                  placeholder="e.g. 1, 2, 3, 4, 5"
                  keyboardAppearance={dark ? "dark" : "light"}
                  value={answer}
                  onChangeText={setAnswer}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  style={{ color: colors.text }}
                  containerStyle={[{ borderColor: colors.text }, styles.styleInput]}
                />
                <Button
                  disabled={!answer}
                  title="Check"
                  style={{ width: 200, marginTop: 24 }}
                  titleStyle={{ color: "black", fontWeight: "bold" }}
                  buttonStyle={{ borderRadius: 8, backgroundColor: colors.accent }}
                  onPress={verify}
                />
                {buttonClicked ? (
                  answerCorrect ? (
                    <Text style={[styles.response, { color: colors.text }]}>👏 Good Job! 👏</Text>
                  ) : (
                    <Text style={[styles.response, { color: colors.text }]}>
                      No pressure! Try it one more time!
                    </Text>
                  )
                ) : (
                  <Text style={styles.response}> </Text>
                )}
              </View>
            )}
            <View style={{ height: 60 }} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GameScreen6;

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
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalBody: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  modalBtnText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  heading: {
    marginTop: 60,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  instruction: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  numbers: {
    fontSize: Math.min(40, SCREEN_WIDTH * 0.09),
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
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
  styleInput: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
    marginTop: 24,
    width: 300,
    height: 50,
  },
  response: {
    marginTop: 24,
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
    minHeight: 30,
  },
});
