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
import { useHeaderHeight } from "@react-navigation/elements";
import { useGlobalState } from "../RewardSystem";
import { auth, incrementGamesCompleted } from "../../firebase.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

const GameScreenChallenge2 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [problemSign, setProblemSign] = useState("");
  const [answer, setAnswer] = useState("");
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [finishModal, setFinishModal] = useState(false);
  const [, setStarCount] = useGlobalState("starCount");
  const [, setGlobalGamesCompleted] = useGlobalState("gamesCompleted");
  const [marks, setMarks] = useState([]);
  const [marks2, setMarks2] = useState([]);
  const myHeaderHeight = useHeaderHeight();

  const generateNumbers = () => {
    const randomNum = Math.floor(Math.random() * 100);
    const randomNum2 = Math.floor(Math.random() * 100);
    const isAddition = Math.random() < 0.5;

    if (isAddition) {
      setProblemSign("+");
      setNum1(randomNum);
      setNum2(randomNum2);
    } else {
      setProblemSign("—");
      setNum1(Math.max(randomNum, randomNum2));
      setNum2(Math.min(randomNum, randomNum2));
    }
  };

  const startGame = () => {
    generateNumbers();
    setReady(false);
  };

  const verify = () => {
    isButtonClicked(true);
    const realAnswer = problemSign === "-" ? num1 - num2 : num1 + num2;
    if (count < 10) {
      if (Number(answer) === realAnswer) {
        isAnswerCorrect(true);
        setMarks([]);
        setMarks2([]);
        setAnswer("");
        setCount(count + 1);
        generateNumbers();
      } else {
        isAnswerCorrect(false);
      }
    } else {
      setFinishModal(true);
    }
  };

  const finishGame = () => {
    setFinishModal(false);
    incrementGamesCompleted(auth.currentUser.uid);
    setGlobalGamesCompleted((c) => c + 1);
    navigation.navigate("SinglePlayer");
  };

  const addLine = () =>
    setMarks((prev) => [
      ...prev,
      <Text key={prev.length} style={styles.tally(colors)}>|</Text>,
    ]);

  const removeLine = () =>
    setMarks((prev) => prev.slice(0, -1));

  const addLine2 = () =>
    setMarks2((prev) => [
      ...prev,
      <Text key={prev.length} style={styles.tally(colors)}>|</Text>,
    ]);

  const removeLine2 = () =>
    setMarks2((prev) => prev.slice(0, -1));

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
                      <Text style={styles.modalBody}>
                        You completed this game! Now you know how to do easy and
                        hard addition and subtraction!
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

            <Text style={[styles.heading, { color: colors.text }]}>
              Let's apply the skills we learned for the following hard problems!
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

                <View style={styles.problemBlock}>
                  <View style={styles.problemRow}>
                    <Text style={[styles.numText, { color: colors.text }]}>{num1}</Text>
                    <View style={styles.tallyButtons}>
                      <Button
                        title="+"
                        buttonStyle={[styles.tallyBtn, { backgroundColor: colors.accent }]}
                        titleStyle={styles.tallyBtnText}
                        onPress={addLine}
                      />
                      <Button
                        title="—"
                        buttonStyle={[styles.tallyBtn, { backgroundColor: colors.accent }]}
                        titleStyle={styles.tallyBtnText}
                        onPress={removeLine}
                      />
                    </View>
                  </View>
                  <View style={styles.tallyRow}>{marks}</View>

                  <View style={styles.problemRow}>
                    <Text style={[styles.numText, { color: colors.text }]}>
                      {problemSign} {num2}
                    </Text>
                    <View style={styles.tallyButtons}>
                      <Button
                        title="+"
                        buttonStyle={[styles.tallyBtn, { backgroundColor: colors.accent }]}
                        titleStyle={styles.tallyBtnText}
                        onPress={addLine2}
                      />
                      <Button
                        title="—"
                        buttonStyle={[styles.tallyBtn, { backgroundColor: colors.accent }]}
                        titleStyle={styles.tallyBtnText}
                        onPress={removeLine2}
                      />
                    </View>
                  </View>
                  <View style={styles.tallyRow}>{marks2}</View>

                  <View style={[styles.divider, { borderColor: colors.text }]} />
                  <Text style={[styles.numText, { color: colors.text, alignSelf: "flex-end" }]}>?</Text>
                </View>

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
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GameScreenChallenge2;

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
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBody: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
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
  problemBlock: {
    marginTop: 40,
    width: "80%",
    alignItems: "flex-end",
  },
  problemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 4,
  },
  numText: {
    fontSize: 50,
  },
  tallyButtons: {
    flexDirection: "row",
    marginLeft: 12,
    gap: 6,
  },
  tallyBtn: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tallyBtnText: {
    color: "black",
    fontWeight: "bold",
  },
  tallyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 4,
    minHeight: 28,
  },
  tally: (colors) => ({
    marginRight: 6,
    fontSize: 20,
    fontWeight: "500",
    color: colors.text,
  }),
  divider: {
    borderWidth: 2,
    width: "100%",
    marginVertical: 6,
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
    marginBottom: 40,
    fontSize: 20,
    textAlign: "center",
    minHeight: 30,
  },
});
