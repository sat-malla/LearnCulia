import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Text, Button } from "@rneui/base";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

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

  const addLine = () =>
    setMarks((prev) => [...prev, <Text key={prev.length} style={styles.tally(colors.redComp)}>|</Text>]);
  const removeLine = () => setMarks((prev) => prev.slice(0, -1));

  const addLine2 = () =>
    setMarks2((prev) => [...prev, <Text key={prev.length} style={styles.tally(colors.blueComp)}>|</Text>]);
  const removeLine2 = () => setMarks2((prev) => prev.slice(0, -1));

  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  };

  const startGame = () => {
    generateNumbers();
    setReady(false);
  };

  const verify = () => {
    isButtonClicked(true);
    let ans;
    if (num1 > num2) ans = ">";
    else if (num1 === num2) ans = "=";
    else ans = "<";

    if (count < 10) {
      if (value === ans) {
        isAnswerCorrect(true);
        setMarks([]);
        setMarks2([]);
        setValue(null);
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
    navigation.navigate("MidScreen5");
  };

  const tallyRows = [
    { label: "Red Number Ticks:", color: colors.redComp, marks, onAdd: addLine, onRemove: removeLine },
    { label: "Blue Number Ticks:", color: colors.blueComp, marks: marks2, onAdd: addLine2, onRemove: removeLine2 },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.primary }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 60 }}
      scrollIndicatorInsets={{ right: 1 }}
      keyboardShouldPersistTaps="handled"
    >
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
                Let's now use other comparisons! You got this!
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
            Choose the correct option!
          </Text>

          <View style={styles.equationRow}>
            <Text style={{ fontSize: 50, color: colors.redComp }}>{num1}</Text>
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="SCROLLVIEW"
                dropDownContainerStyle={{
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
                  backgroundColor: colors.primary,
                  borderColor: colors.text,
                }}
              />
            </View>
            <Text style={{ fontSize: 50, color: colors.blueComp }}>{num2}</Text>
          </View>

          {tallyRows.map((row) => (
            <View key={row.label} style={styles.tallySection}>
              <Text style={[styles.tallyLabel, { color: row.color }]}>{row.label}</Text>
              <View style={styles.tallyControls}>
                <Button
                  title="+"
                  buttonStyle={styles.tallyBtn}
                  titleStyle={styles.tallyBtnText}
                  onPress={row.onAdd}
                />
                <Button
                  title="—"
                  style={{ marginLeft: 10 }}
                  buttonStyle={styles.tallyBtn}
                  titleStyle={styles.tallyBtnText}
                  onPress={row.onRemove}
                />
                <View style={[styles.tallyBox, { borderColor: colors.text }]}>
                  {row.marks}
                </View>
              </View>
            </View>
          ))}

          <Button
            disabled={!value}
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
    </ScrollView>
  );
};

export default GameScreen5;

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
  equationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 10,
  },
  dropdownWrapper: {
    width: 80,
    marginHorizontal: 12,
    zIndex: 10,
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
  tallySection: {
    width: "100%",
    marginTop: 28,
    zIndex: 1,
  },
  tallyLabel: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  tallyControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  tallyBtn: {
    borderRadius: 8,
    backgroundColor: "#6bffc6",
    borderWidth: 1.5,
    width: 50,
    borderColor: "black",
  },
  tallyBtnText: {
    color: "black",
    fontWeight: "bold",
  },
  tallyBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    marginLeft: 12,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    minHeight: 44,
  },
  tally: (color) => ({
    marginRight: 6,
    fontSize: 20,
    fontWeight: "500",
    color,
  }),
  response: {
    marginTop: 24,
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
    minHeight: 30,
  },
});
