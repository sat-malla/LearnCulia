import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
  ImageBackground,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import MultiplicationTable from "./MultiplicationTable";
import { useHeaderHeight } from "@react-navigation/elements";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = SCREEN_WIDTH - 24;

const GameScreenChallenge3 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [helpCount, setHelpCount] = useState(0);
  const [helpModal, setHelpModal] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const generateNumbersMult = () => {
    const randomNum = Math.floor(Math.random() * 12);
    const randomNum2 = Math.floor(Math.random() * 12);
    setNum1(randomNum);
    setNum2(randomNum2);
  };

  const startGame = () => {
    generateNumbersMult();
    setReady(false);
  };

  const verify = () => {
    isButtonClicked(true);
    const realAnswer = num1 * num2;
    if (count < 10) {
      if (Number(answer) === realAnswer) {
        isAnswerCorrect(true);
        setAnswer("");
        setCount(count + 1);
        setHelpCount(0);
        generateNumbersMult();
      } else {
        isAnswerCorrect(false);
        const newHelpCount = helpCount + 1;
        setHelpCount(newHelpCount);
        if (newHelpCount >= 3) {
          setHelpModal(true);
          setHelpCount(0);
        }
      }
    } else {
      setFinishModal(true);
    }
  };

  const finishGame = () => {
    setFinishModal(false);
    navigation.navigate("SinglePlayer");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, backgroundColor: colors.primary }}
      keyboardVerticalOffset={myHeaderHeight + 107}
    >
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
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
                      <Text style={styles.modalTitle}>Congratulations!</Text>
                      <Text style={[styles.modalBody, { marginTop: 10 }]}>
                        You have completed this game! Now you know how to
                        multiply with and without the multiplication table!
                      </Text>
                      <TouchableOpacity style={[styles.modalBtn, { backgroundColor: colors.accent }]} onPress={finishGame}>
                        <Text style={styles.modalBtnText}>Finish</Text>
                        <AntDesign name="arrowright" size={22} color="black" style={{ marginLeft: 8 }} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </LinearGradient>
                </View>
              </View>
            </Modal>

            <Modal  
              animationType="fade"
              transparent={true}
              visible={helpModal}
              onRequestClose={() => setHelpModal(false)}
            >
              <View style={styles.modalBackdrop}>
                <View style={[styles.modalVw, { borderColor: colors.text, width: MODAL_WIDTH }]}>
                  <LinearGradient
                    colors={[colors.accent, colors.gradientEndCol]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0.8 }}
                    style={[styles.modalGradient, { width: MODAL_WIDTH }]}
                  >
                    <Text style={[styles.modalBody, { marginBottom: 16 }]}>
                      It seems that you are struggling with this problem. Here
                      is the multiplication table to help you! When done, press
                      Close.
                    </Text>
                    <MultiplicationTable />
                    <TouchableOpacity
                      style={[styles.modalBtn, { marginTop: 20, backgroundColor: colors.accent }]}
                      onPress={() => setHelpModal(false)}
                    >
                      <Text style={styles.modalBtnText}>Close</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </Modal>

            <Text style={[styles.heading, { color: colors.text }]}>
              Let's apply the skills we learned for the following problems
              without the Multiplication Table!
            </Text>

            {ready ? (
              <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.accent }]} onPress={startGame}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Press to Play!</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ alignItems: "center", width: "100%" }}>
                <Text style={[styles.instruction, { color: colors.text }]}>
                  Type in the correct answer below.
                </Text>
                <Text style={[styles.equation, { color: colors.text }]}>
                  {num1} × {num2} = ?
                </Text>
                <Input
                  placeholder="Type answer here"
                  keyboardType="numeric"
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
                    <Text style={[styles.response, { color: colors.text }]}>🎉 Well Done! 🎉</Text>
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

export default GameScreenChallenge3;

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
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBody: {
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
  equation: {
    fontSize: Math.min(60, SCREEN_WIDTH * 0.14),
    marginTop: 40,
    textAlign: "center",
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
    width: 260,
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
