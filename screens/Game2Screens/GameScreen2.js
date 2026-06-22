import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

const GameScreen2 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [problemSign, setProblemSign] = useState("");
  const [answer, setAnswer] = useState("");
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [challengeModal, setChallengeModal] = useState(false);
  const [marks, setMarks] = useState([]);
  const [marks2, setMarks2] = useState([]);
  const [loading, setLoading] = useState(true);
  const myHeaderHeight = useHeaderHeight();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateNumbers = () => {
    const randomNum = Math.floor(Math.random() * 10);
    const randomNum2 = Math.floor(Math.random() * 10);
    const isAddition = Math.random() < 0.5;

    if (isAddition) {
      setProblemSign("+");
      setNum1(randomNum);
      setNum2(randomNum2);
    } else {
      setProblemSign("-");
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
      setChallengeModal(true);
    }
  };

  const nextScreen = () => {
    setChallengeModal(false);
    navigation.navigate("GameScreenChallenge2");
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
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#6bffc6" />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
          keyboardVerticalOffset={myHeaderHeight + 107}
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
                        colors={["#6bffc6", colors.gradientEndCol]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 0.8 }}
                        style={[styles.modalGradient, { width: MODAL_WIDTH }]}
                      >
                        <Text style={styles.modalTitle}>🙌 Well Done! 🙌</Text>
                        <Text style={styles.modalBody}>
                          Let's move on to the Hard Problems! You got this!
                        </Text>
                        <TouchableOpacity style={styles.modalBtn} onPress={nextScreen}>
                          <Text style={styles.modalBtnText}>Next</Text>
                          <AntDesign name="arrowright" size={22} color="black" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </Modal>

                <Text style={[styles.heading, { color: colors.text }]}>
                  Let's apply the skills we learned for the following problems!
                </Text>

                {ready ? (
                  <TouchableOpacity style={styles.startButton} onPress={startGame}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Press to Play!</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ alignItems: "center", width: "100%" }}>
                    <Text style={[styles.instruction, { color: colors.text }]}>
                      Type in the correct answer below.
                    </Text>

                    {/* Problem display — right-aligned column */}
                    <View style={styles.problemBlock}>
                      {/* Row 1: num1 + tally helpers */}
                      <View style={styles.problemRow}>
                        <Text style={[styles.numText, { color: colors.text }]}>{num1}</Text>
                        <View style={styles.tallyButtons}>
                          <Button
                            title="+"
                            buttonStyle={styles.tallyBtn}
                            titleStyle={styles.tallyBtnText}
                            onPress={addLine}
                          />
                          <Button
                            title="-"
                            buttonStyle={styles.tallyBtn}
                            titleStyle={styles.tallyBtnText}
                            onPress={removeLine}
                          />
                        </View>
                      </View>
                      <View style={styles.tallyRow}>{marks}</View>

                      {/* Row 2: sign + num2 + tally helpers */}
                      <View style={styles.problemRow}>
                        <Text style={[styles.numText, { color: colors.text }]}>
                          {problemSign} {num2}
                        </Text>
                        <View style={styles.tallyButtons}>
                          <Button
                            title="+"
                            buttonStyle={styles.tallyBtn}
                            titleStyle={styles.tallyBtnText}
                            onPress={addLine2}
                          />
                          <Button
                            title="-"
                            buttonStyle={styles.tallyBtn}
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
                      buttonStyle={{ borderRadius: 8, backgroundColor: "#6bffc6" }}
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
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default GameScreen2;

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
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBody: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6bffc6",
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
    backgroundColor: "#6bffc6",
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
    backgroundColor: "#6bffc6",
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
