import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { Text, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const GameScreen5 = ({ navigation }) => {
  const { colors, dark } = useTheme();
  const [ready, setReady] = useState(true);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [buttonClicked, isButtonClicked] = useState(false);
  const [answerCorrect, isAnswerCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [challengeModal, setChallengeModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: ">", value: ">" },
    { label: "<", value: "<" },
    { label: "=", value: "=" },
  ]);

  const [marks, setMarks] = useState([]);
  const [marks2, setMarks2] = useState([]);
  const markAdd = 1;
  const markAdd2 = 1;

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

  const generateNumbers = () => {
    const randomNum = Math.floor(Math.random() * 10) + 0;
    const randomNum2 = Math.floor(Math.random() * 10) + 0;

    setNum1(randomNum);
    setNum2(randomNum2);
  };

  const startGame = () => {
    generateNumbers();
    setReady(false);
  };

  const verify = () => {
    let ans = "";
    isButtonClicked(true);
    if (num1 > num2) {
      ans = ">";
    } else if (num1 == num2) {
      ans = "=";
    } else if (num1 < num2) {
      ans = "<";
    }
    if (count < 10) {
      if (value === ans) {
        isAnswerCorrect(true);
        setMarks([]);
        setMarks2([]);
        setValue(null);
        setCount(count + 1);
        generateNumbers();
      } else if (value !== ans) {
        isAnswerCorrect(false);
      }
    } else if (count == 10) {
      setChallengeModal(true);
    }
  };

  const nextScreen = () => {
    setChallengeModal(false);
    navigation.navigate("MidScreen5");
  };

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
        visible={challengeModal}
        onRequestClose={() => {
          Alert.alert("Closed");
          setModalVisible(!challengeModal);
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
                height: 208,
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
                🙌Well Done!🙌
              </Text>
              <Text
                style={{
                  marginBottom: 20,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Let's now use other comparisons! You got this!
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
                onPress={nextScreen}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  Next
                </Text>
                <AntDesign name="arrowright" size={24} color="black" />
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
              marginTop: 20,
              marginLeft: 20,
              paddingHorizontal: 150,
            }}
          >
            <Text style={{ fontSize: 50, color: colors.redComp }}>{num1}</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownContainerStyle={{
                width: 70,
                marginLeft: 2,
                backgroundColor: colors.primary,
                borderColor: colors.text,
              }}
              placeholder=" "
              listItemLabelStyle={{ fontSize: 25, color: colors.text }}
              labelStyle={{ fontSize: 25, color: colors.text }}
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
                width: 70,
                alignSelf: "center",
                backgroundColor: colors.primary,
                borderColor: colors.text,
                color: colors.text,
              }}
            />
            <Text style={{ fontSize: 50, color: colors.blueComp }}>{num2}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 100,
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
                  <Text style={{ fontSize: 18, color: item.color }}>
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
                👏Good Job!👏
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
      <View style={{ height: 300 }} />
    </ScrollView>
  );
};

export default GameScreen5;

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
