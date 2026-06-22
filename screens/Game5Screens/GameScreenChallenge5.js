import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Text, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const GameScreenChallenge5 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [compSign, setCompSign] = useState("");
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [finishModal, setFinishModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ]);

  const [marks, setMarks] = useState([]);
  const [marks2, setMarks2] = useState([]);
  const markAdd = 1;
  const markAdd2 = 1;

  const generateNumbers = () => {
    const randomNum = Math.floor(Math.random() * 10) + 0;
    const randomNum2 = Math.floor(Math.random() * 10) + 0;
    const randomCompSign = Math.floor(Math.random() * 5) + 1;

    if (randomCompSign == 1) {
      setCompSign(">");
    } else if (randomCompSign == 2) {
      setCompSign("<");
    } else if (randomCompSign == 3) {
      setCompSign("≥");
    } else if (randomCompSign == 4) {
      setCompSign("≤");
    } else if (randomCompSign == 5) {
      setCompSign("=");
    }

    setNum1(randomNum);
    setNum2(randomNum2);
  };

  const startGame = () => {
    generateNumbers();
    setReady(false);
  };

  const verify = () => {
    isButtonClicked(true);
    let comparison = "";
    if (compSign === ">") {
      comparison = ">";
    } else if (compSign === "<") {
      comparison = "<";
    } else if (compSign === "≥") {
      comparison = ">=";
    } else if (compSign === "≤") {
      comparison = "<=";
    } else if (compSign === "=") {
      comparison = "==";
    }
    const stringEval = num1.toString() + comparison + num2.toString();
    if (count <= 10) {
      if (eval(stringEval) == eval(value)) {
        generateNumbers();
        isAnswerCorrect(true);
        setMarks([]);
        setMarks2([]);
        setValue(null);
        setCount(count + 1);
      } else if (eval(stringEval) != eval(value)) {
        isAnswerCorrect(false);
      }
    } else if (count > 10) {
      setFinishModal(true);
    }
  };

  const finishScreen = () => {
    setFinishModal(false);
    navigation.navigate("SinglePlayer");
  };

  const addLine = () => {
    setMarks((prevLines) => [
      ...prevLines,
      <Text
        key={prevLines.length}
        style={{
          marginRight: 10,
          fontSize: 20,
          fontWeight: "500",
          color: colors.redComp,
        }}
      >
        |
      </Text>,
    ]);
  };
  const addLine2 = () => {
    setMarks2((prevLines) => [
      ...prevLines,
      <Text
        key={prevLines.length}
        style={{
          marginRight: 10,
          fontSize: 20,
          fontWeight: "500",
          color: colors.blueComp,
        }}
      >
        |
      </Text>,
    ]);
  };
  const removeLine = () => {
    setMarks((prevLines) => {
      let newLines = [...prevLines];
      newLines.splice(-markAdd);
      return newLines;
    });
  };
  const removeLine2 = () => {
    setMarks2((prevLines) => {
      let newLines = [...prevLines];
      newLines.splice(-markAdd2);
      return newLines;
    });
  };

  const marksData = [
    {
      id: "1",
      text: "Red Number Ticks: ",
      color: colors.redComp,
      onPressAdd: () => addLine(),
      onPressRemove: () => removeLine(),
      marks: marks,
    },
    {
      id: "2",
      text: "Blue Number Ticks: ",
      color: colors.blueComp,
      onPressAdd: () => addLine2(),
      onPressRemove: () => removeLine2(),
      marks: marks2,
    },
  ];

  return (
    <ScrollView
    style={{
      height: "100%",
      backgroundColor: colors.primary,
    }}
    contentContainerStyle={{
      alignItems: "center",
    }}
    scrollIndicatorInsets={{ right: 1 }}
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
                height: 258,
                width: 378,
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={require("../../Images/confetti.jpeg")}
                imageStyle={{ opacity: 0.2 }}
                animationType="fade"
                style={{ width: 378, height: 318, padding: 25 }}
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
                    marginBottom: 20,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  You have completed this game! Now you know how to compare two
                  numbers with different comparison symbols!
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
                  onPress={finishScreen}
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
              fontSize: 20,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Choose the correct option!
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              borderRadius: 8,
              borderColor: colors.text,
              borderWidth: 2,
              width: "50%",
            }}
          >
            <Text style={{ fontSize: 50, color: colors.redComp }}>{num1}</Text>
            <Text style={{ fontSize: 50, color: colors.text, marginLeft: 15 }}>
              {compSign}
            </Text>
            <Text
              style={{
                fontSize: 50,
                color: colors.blueComp,
                marginLeft: 15,
                marginRight: 30,
              }}
            >
              {num2}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: -30,
            }}
          >
            <FlatList
              data={marksData}
              scrollEnabled={false}
              contentContainerStyle={{ justifyContent: "center" }}
              style={{ marginTop: 70 }}
              ItemSeparatorComponent={() => <View style={{ height: 50 }} />}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, color: item.color }}>
                    {item.text}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 270,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        marginRight: 50,
                      }}
                    >
                      <Button
                        title="+"
                        buttonStyle={{
                          borderRadius: 8,
                          backgroundColor: "#6bffc6",
                          borderWidth: 1.5,
                          width: 50,
                          borderColor: "black",
                        }}
                        titleStyle={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        onPress={item.onPressAdd}
                      />
                      <Button
                        title="-"
                        style={{ marginLeft: 10, marginRight: 10 }}
                        buttonStyle={{  
                          borderRadius: 8,
                          backgroundColor: "#6bffc6",
                          borderWidth: 1.5,
                          width: 50,
                          borderColor: "black",
                        }}
                        titleStyle={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        onPress={item.onPressRemove}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        width: 100,
                        marginRight: 280,
                        flexDirection: "row",
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: colors.text,
                        padding: 15,
                      }}
                    >
                      {item.marks}
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{
              width: 100,
              marginTop: 40,
              backgroundColor: colors.primary,
              borderColor: colors.text,
            }}
            placeholder=" "
            listItemLabelStyle={{ fontSize: 20, color: colors.text }}
            labelStyle={{ fontSize: 20, color: colors.text }}
            arrowIconStyle={
              dark
                ? { backgroundColor: colors.text, borderRadius: 8 }
                : { backgroundColor: "white" }
            }
            tickIconStyle={
              dark
                ? { backgroundColor: colors.text, borderRadius: 8 }
                : { backgroundColor: "white" }
            }
            style={{
              width: 100,
              alignSelf: "center",
              marginTop: 40,
              backgroundColor: colors.primary,
              borderColor: colors.text,
              color: colors.text,
            }}
          />
          <Button
            disabled={!value}
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
    </ScrollView>
  );
};

export default GameScreenChallenge5;

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
