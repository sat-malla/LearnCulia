import { StyleSheet, View, ScrollView, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";
import { Text } from "@rneui/base";
import { TouchableOpacity } from "react-native";

const images = [
  require("../../Images/fingerOneSlide.png"),
  require("../../Images/fingerTwoSlide.png"),
  require("../../Images/fingerThreeSlide.png"),
  require("../../Images/fingerFourSlide.png"),
  require("../../Images/fingerFiveSlide.png"),
  require("../../Images/fingerSixSlide.png"),
  require("../../Images/fingerSevenSlide.png"),
  require("../../Images/fingerEightSlide.png"),
  require("../../Images/fingerNineSlide.png"),
  require("../../Images/fingerTenSlide.png"),
];

const { width: WIDTH } = Dimensions.get("window");
const SLIDE_HEIGHT = Math.round(WIDTH * 0.9 * 0.75);

const StartScreen1 = ({ navigation }) => {
  const { colors } = useTheme();
  const [imgActive, setImgActive] = useState(0);

  const onScroll = ({ nativeEvent }) => {
    if (nativeEvent) {
      const slide = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 20, alignItems: "center" }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
          marginTop: 60,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Welcome to Counting!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 40,
          textAlign: "center",
          color: colors.text,
        }}
      >
        Take some time to memorize the images from the slideshow below. Swipe
        left to see the rest of the slideshow!
      </Text>
      <Text
        style={{
          fontSize: 19,
          marginTop: 20,
          textAlign: "center",
          color: colors.redComp,
        }}
      >
        *Fingers might not change, but that's because it's run by a not-really
        random number generator. Just click the correct number again!
      </Text>

      <View style={{ marginTop: 20, width: WIDTH * 0.9 }}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={{ width: WIDTH * 0.9 }}
        >
          {images.map((src, index) => (
            <Image
              key={index}
              resizeMode="cover"
              style={{
                width: WIDTH * 0.9,
                height: SLIDE_HEIGHT,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: colors.accent,
              }}
              source={src}
            />
          ))}
        </ScrollView>

        <View style={styles.slidesDot}>
          {images.map((_, index) => (
            <Text
              key={index}
              style={[imgActive === index ? styles.dotActive : styles.dot, imgActive === index ? { color: colors.accent } : null]}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>

      <Text
        style={{
          fontSize: 19,
          marginTop: 24,
          marginBottom: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Now, let's try some problems by clicking the button below!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colors.accent,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderWidth: 2,
          borderColor: colors.text,
        }}
        onPress={() => navigation.navigate("GameScreen1")}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Click when you are ready!
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default StartScreen1;

const styles = StyleSheet.create({
  slidesDot: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    margin: 3,
    color: "#888",
  },
  dotActive: {
    margin: 3,
  },
});
