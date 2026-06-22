import { StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { Text } from "@rneui/base";
import YoutubeIframe from "react-native-youtube-iframe";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StartScreen5 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 40 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 60, color: colors.text, textAlign: "center" }}>
        Welcome to Comparisons!
      </Text>
      <Text style={{ fontSize: 19, marginTop: 40, color: colors.text, textAlign: "center" }}>
        Let's learn or refresh our memory about Comparisons!
      </Text>
      <Text style={{ fontSize: 19, marginTop: 20, marginBottom: 20, color: colors.text, textAlign: "center" }}>
        Click the video below to watch!
      </Text>
      <YoutubeIframe
        height={220}
        width={SCREEN_WIDTH - 40}
        play={false}
        videoId="d43D-o6Bzac"
      />
      <Text style={{ fontSize: 19, marginTop: 20, marginBottom: 30, color: colors.text, textAlign: "center" }}>
        Now, let's try some problems by clicking the button below!
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("GameScreen5")}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Click to go to game page!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StartScreen5;

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: "#6bffc6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
});
