import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Pressable,
  Modal,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);
import React, { useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

const GameScreenChallenge4 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [problemSign, setProblemSign] = useState("");
  const [answer, setAnswer] = useState("");
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [helpCount, setHelpCount] = useState(1);
  const [finishModal, setFinishModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const generateNumbers = () => {
    const randomNum = Math.floor(Math.random() * 10) + 0;
    const randomNum2 = Math.floor(Math.random() * 10) + 0;
    const problemSign = Math.floor(Math.random() * 2) + 1;

    if (problemSign == 2) {
      setProblemSign("+");
      setNum1(randomNum);
      setNum2(randomNum2);
    } else {
      setProblemSign("-");
      if (randomNum > randomNum2) {
        setNum1(randomNum);
        setNum2(randomNum2);
      } else {
        setNum1(randomNum2);
        setNum2(randomNum);
      }
    }
  };

  const startGame = () => {
    generateNumbers();
    setReady(false);
  };

  const verify = () => {
    isButtonClicked(true);
    let realAnswer = num1.toString() + problemSign + num2.toString() + "=?";
    if (count < 10) {
      if (answer === realAnswer) {
        generateNumbers();
        isAnswerCorrect(true);
        setAnswer("");
        setCount(count + 1);
      } else if (answer !== realAnswer) {
        isAnswerCorrect(false);
        setHelpCount(helpCount + 1);
        if (helpCount >= 3) {
          setHelpModal(true);
        }
      }
    } else if (count == 10) {
      setFinishModal(true);
    }
  };

  const finishGame = () => {
    setFinishModal(false);
    navigation.navigate("SinglePlayer");
  };

  const contactScreen = () => {
    setHelpModal(false);
    navigation.navigate("Suggest");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{
        height: "100%",
        backgroundColor: colors.primary,
      }}
      contentContainerStyle={{
        flexDirection: "column",
        paddingHorizontal: 20,
        flex: 1,
      }}
      keyboardVerticalOffset={myHeaderHeight + 107}
    >
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Modal
              animationType="fade"
              transparent={true}
              visible={finishModal}
              onRequestClose={() => {
                Alert.alert("Closed");
                setModalVisible(!finishModal);
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={[
                    styles.modalVw,
                    {
                      borderColor: colors.text,
                      borderWidth: 3,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#6bffc6", colors.gradientEndCol]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0.8 }}
                    style={{
                      borderRadius: 16,
                      width: MODAL_WIDTH,
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      source={require("../../Images/confetti.jpeg")}
                      imageStyle={{ opacity: 0.2, borderRadius: 16 }}
                      style={{ alignSelf: "stretch", padding: 25, alignItems: "center" }}
                    >
                      <Text
                        style={{
                          marginBottom: 10,
                          textAlign: "center",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Congratulations!
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10,
                          textAlign: "center",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        You have completed this game! Now you know how to read
                        equations forwards and backwards!
                      </Text>
                      <Pressable
                        style={{
                          borderRadius: 20,
                          padding: 10,
                          elevation: 2,
                          width: 150,
                          backgroundColor: "#6bffc6",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginTop: 10,
                          alignSelf: "center",
                        }}
                        onPress={finishGame}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 20,
                          }}
                        >
                          Finish
                        </Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                      </Pressable>
                    </ImageBackground>
                  </LinearGradient>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="fade"
              transparent={true}
              visible={helpModal}
              onRequestClose={() => {
                Alert.alert("Closed");
                setModalVisible(!helpModal);
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={[
                    styles.modalVw,
                    {
                      borderColor: colors.text,
                      borderWidth: 3,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["#6bffc6", colors.gradientEndCol]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0.8 }}
                    style={{
                      borderRadius: 16,
                      height: 758,
                      width: 378,
                      alignItems: "center",
                      padding: 26,
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      It seems that you are struggling on this problem. Here are
                      some tips to help you out!
                    </Text>
                    <Text
                      style={{
                        marginBottom: 20,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Recall from the video that a+b=? is the same as ?=a+b.
                      This is the same for subtraction.
                    </Text>
                    <Text
                      style={{
                        marginBottom: 20,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      How? Because for both operations, they are the same
                      operations and numbers. They are just swapped.
                    </Text>
                    <Text
                      style={{
                        marginBottom: 15,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Let me know if you are still struggling by contacting me
                      below, and I can help you out!
                    </Text>
                    <Button
                      title="Contact Me!"
                      style={{ width: 200 }}
                      titleStyle={{
                        fontSize: 13,
                        textDecorationLine: "underline",
                        color: "black",
                        marginTop: -10,
                        marginBottom: 10,
                      }}
                      buttonStyle={{
                        backgroundColor: "white",
                        borderWidth: 0,
                      }}
                      onPress={contactScreen}
                    />
                    <Pressable
                      style={{
                        borderRadius: 20,
                        padding: 10,
                        elevation: 2,
                        width: 150,
                        backgroundColor: "#6bffc6",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        alignSelf: "center",
                      }}
                      onPress={() => setHelpModal(false)}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 20,
                        }}
                      >
                        Close
                      </Text>
                    </Pressable>
                  </LinearGradient>
                </View>
              </View>
            </Modal>
            <Text
              style={{
                color: colors.text,
                marginTop: 60,
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Let's apply the skills we learned for the following problems!
            </Text>
            {ready ? (
              <TouchableOpacity
                style={{
                  width: 200,
                  borderWidth: 2,
                  borderColor: colors.text,
                  backgroundColor: "#6bffc6",
                  borderRadius: 8,
                  height: 50,
                  padding: 10,
                  alignItems: "center",
                  marginTop: 50,
                }}
                onPress={startGame}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Press to Play!
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    marginTop: 20,
                    marginHorizontal: 10,
                    fontSize: 20,
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  Write the the expression shown in the reverse direction. Make
                  sure to write the numbers in the opposite order shown.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    marginTop: 50,
                  }}
                >
                  <Text style={{ fontSize: 70, color: colors.text }}>
                    ? = {num1} {problemSign} {num2}
                  </Text>
                </View>
                <Input
                  placeholder="Type answer here"
                  type="text"
                  keyboardAppearance={dark ? "dark" : "light"}
                  value={answer}
                  onChangeText={(text) => setAnswer(text)}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  style={{ color: colors.text }}
                  containerStyle={[
                    { borderColor: colors.text },
                    styles.styleInput,
                  ]}
                />
                <Button
                  disabled={!answer}
                  title="Check"
                  style={styles.button}
                  titleStyle={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                  buttonStyle={{
                    borderRadius: 8,
                    backgroundColor: "#6bffc6",
                  }}
                  onPress={verify}
                />
                {buttonClicked ? (
                  answerCorrect ? (
                    <Text style={[styles.response, { color: colors.text }]}>
                      🎉 Well Done! 🎉
                    </Text>
                  ) : (
                    <Text style={[styles.response, { color: colors.text }]}>
                      No pressure! Try it one more time!
                    </Text>
                  )
                ) : (
                  <Text> </Text>
                )}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GameScreenChallenge4;

const styles = StyleSheet.create({
  styleInput: {
    borderWidth: 2,
    alignContent: "center",
    borderRadius: 8,
    padding: 5,
    marginTop: 70,
    width: 300,
    height: 50,
  },
  button: {
    width: 200,
    marginTop: 50,
  },
  response: {
    marginTop: 40,
    fontSize: 20,
  },
  modalVw: {
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
