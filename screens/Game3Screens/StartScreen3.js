import { StyleSheet, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { Text } from "@rneui/base";
import YoutubeIframe from "react-native-youtube-iframe";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const VIDEO_WIDTH = SCREEN_WIDTH - 32;

const StartScreen3 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.primary }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 16 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 60,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Welcome to Multiplication!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 40,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Let's refresh or learn our memory to learn how to read multiplication
        tables to multiply two numbers!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 20,
          marginBottom: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Click the video below to watch!
      </Text>
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="DFIj8CFSIFo" />
      <Text
        style={{
          fontSize: 19,
          marginTop: 16,
          color: colors.redComp,
          textAlign: "center",
        }}
      >
        Note: Any number multiplied by 0 gives 0!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 24,
          marginBottom: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Now, let's try some multiplication problems by clicking the button below!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 5,
          marginBottom: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        *Note: You can access the multiplication table on the top right corner
        if needed.
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("GameScreen3")}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Click to go to game page!
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default StartScreen3;

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: "#6bffc6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#333",
  },
});
