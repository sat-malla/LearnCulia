import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { Text } from "@rneui/base";
import YoutubeIframe from "react-native-youtube-iframe";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const VIDEO_WIDTH = SCREEN_WIDTH - 32;

const StartScreen2 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.primary }}
      contentContainerStyle={{ alignItems: "center", paddingHorizontal: 16 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 60,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Welcome to Addition & Subtraction!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 40,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Let's refresh or learn our memory to learn how to add and subtract!
        We're here to help you!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Here are some great guides to learn how to add and subtract. No pressure to watch them all!:
      </Text>

      <Text style={styles.sectionLabel(colors)}>Easy Addition:</Text>
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="rSt9iSAZT0s" />

      <Text style={styles.sectionLabel(colors)}>Hard Addition:</Text>
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="EsAs4xa6_tY" />
      <View style={{ height: 16 }} />
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="L2YTc3k99TE" />

      <Text style={styles.sectionLabel(colors)}>Easy Subtraction:</Text>
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="I9SlThGGxI4" />

      <Text style={styles.sectionLabel(colors)}>Hard Subtraction:</Text>
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="fSK3T0WhAS8" />
      <View style={{ height: 16 }} />
      <YoutubeIframe height={220} width={VIDEO_WIDTH} play={false} videoId="_nupRU7ZEmY" />

      <Text
        style={{
          fontSize: 19,
          marginTop: 24,
          marginBottom: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Now, let's try some addition and subtraction problems by clicking the
        button below!
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("GameScreen2")}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Click to go to game page!
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default StartScreen2;

const styles = StyleSheet.create({
  sectionLabel: (colors) => ({
    fontSize: 19,
    marginTop: 24,
    marginBottom: 16,
    color: colors.text,
    textAlign: "center",
    fontWeight: "bold",
  }),
  startButton: {
    backgroundColor: "#6bffc6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#333",
  },
});
