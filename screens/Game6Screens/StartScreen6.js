import { StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { Text } from "@rneui/base";
import YoutubeIframe from "react-native-youtube-iframe";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StartScreen6 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 20, paddingBottom: 40 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 60, color: colors.text, textAlign: "center" }}>
        Welcome to Arranging Numbers!
      </Text>
      <Text style={{ fontSize: 19, marginTop: 40, color: colors.text, textAlign: "center" }}>
        Let's learn or refresh our memory about how to organize numbers!
      </Text>
      <Text style={{ fontSize: 19, marginTop: 20, marginBottom: 20, color: colors.text, textAlign: "center" }}>
        Click the video below to watch!
      </Text>
      <YoutubeIframe
        height={220}
        width={SCREEN_WIDTH - 40}
        play={false}
        videoId="3KJvGsBQ4jc"
      />
      <Text style={{ fontSize: 19, marginTop: 20, marginBottom: 30, color: colors.text, textAlign: "center" }}>
        Now, let's try some problems by clicking the button below!
      </Text>
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate("GameScreen6")}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Click to go to game page!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StartScreen6;

const styles = StyleSheet.create({
  startButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
});
