import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Text } from "@rneui/base";
import React, { useLayoutEffect, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useGlobalState } from "./GlobalState.js";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = 90;
const SLANT = 24;
const R = 16;
const PAD = 3;

const ParallelogramCard = ({ title, desc, onPress, gradientColors }) => {
  const w = SCREEN_WIDTH - 40;
  const h = CARD_HEIGHT;
  const s = SLANT;
  const svgW = w + PAD * 2;
  const svgH = h + PAD * 2;
  const x0 = PAD, y0 = PAD, x1 = w + PAD, y1 = h + PAD;
  const tl = { x: x0 + s, y: y0 };
  const tr = { x: x1, y: y0 };
  const br = { x: x1 - s, y: y1 };
  const bl = { x: x0, y: y1 };
  const slantLen = Math.sqrt(s * s + h * h);
  const su = s / slantLen;
  const hu = h / slantLen;
  const d = [
    `M ${tl.x + R} ${tl.y}`,
    `L ${tr.x - R} ${tr.y}`,
    `Q ${tr.x} ${tr.y} ${tr.x - su * R} ${tr.y + hu * R}`,
    `L ${br.x + su * R} ${br.y - hu * R}`,
    `Q ${br.x} ${br.y} ${br.x - R} ${br.y}`,
    `L ${bl.x + R} ${bl.y}`,
    `Q ${bl.x} ${bl.y} ${bl.x + su * R} ${bl.y - hu * R}`,
    `L ${tl.x - su * R} ${tl.y + hu * R}`,
    `Q ${tl.x} ${tl.y} ${tl.x + R} ${tl.y}`,
    `Z`,
  ].join(" ");

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={{ width: w, height: h }}>
      <Svg width={svgW} height={svgH} style={{ position: "absolute", top: -PAD, left: -PAD }}>
        <Defs>
          <SvgLinearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={gradientColors[0]} />
            <Stop offset="1" stopColor={gradientColors[1]} />
          </SvgLinearGradient>
        </Defs>
        <Path d={d} fill="url(#cardGrad)" stroke="#000" strokeWidth="2" />
      </Svg>
      <View style={{ position: "absolute", top: 0, left: s, right: s, bottom: 0, justifyContent: "center", flexDirection: "row", alignItems: "center", paddingHorizontal: 12 }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{desc}</Text>
        </View>
        <AntDesign name="arrow-right" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [heyThereDismissed, setHeyThereDismissed] = useState(true); // true until loaded to avoid flash
  const [registered] = useGlobalState("registered");

  useEffect(() => {
    AsyncStorage.getItem("heyThere_dismissed").then((val) => {
      setHeyThereDismissed(val === "true");
    });
  }, []);

  const dismissHeyThere = () => {
    setHeyThereDismissed(true);
    AsyncStorage.setItem("heyThere_dismissed", "true");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={{ justifyContent: "center", alignItems: "center", height: 44, width: 44, marginLeft: -5 }}
        >
          <Ionicons name="person-circle-outline" size={40} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <>
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: colors.accent }]}
      onPress={() => navigation.navigate("Chat")}
      activeOpacity={0.85}
    >
      <Ionicons name="chatbubble-ellipses" size={26} color="#000" />
    </TouchableOpacity>
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: colors.primary,
      }}
      contentContainerStyle={{
        alignItems: "center",
        paddingHorizontal: 20,
      }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      {registered && !heyThereDismissed && (
          <View
            style={{
              backgroundColor: colors.loginBanner,
              borderWidth: 2,
              borderRadius: 8,
              borderColor: colors.text,
              marginTop: 20,
              width: "86%",
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={dismissHeyThere}
              style={{ position: "absolute", top: 10, right: 12, zIndex: 1, padding: 4 }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <AntDesign name="close" size={20} color={colors.bannerText} />
            </TouchableOpacity>
            { colors.accent === "#6bffc6" ? (
              <Image
                source={require("../Images/helloHome.png")}
                style={{ width: "100%", height: 180, marginTop: 0 }}
              />
            ) : colors.accent === "#ff4d4d" ? (
              <Image
                source={require("../Images/helloHomeRed.png")}
                style={{ width: "100%", height: 180, marginTop: 0 }}
              />
            ) : colors.accent === "#2f96fd" ? (
              <Image
                source={require("../Images/helloHomeBlue.png")}
                style={{ width: "100%", height: 180, marginTop: 0 }}
              />
            ) : null}
            <View style={{ paddingHorizontal: 15, paddingBottom: 18 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 16,
                  color: colors.bannerText
                }}
              >
                Hey There! 👋
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                  color: colors.bannerText
                }}
              >
                Click the top left corner above to access your profile!
              </Text>
            </View>
          </View>
      )}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 30,
          textAlign: "center",
          color: colors.text,
        }}
      >
        Let LearnCulia™ guide you to conquer your math hurdles!
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "500",
          marginTop: 50,
          color: colors.text,
        }}
      >
        Get started below!
      </Text>
      <View style={styles.cardStack}>
        <ParallelogramCard
          title="Single Player"
          desc="Solve exciting challenges for desired self-improvement!"
          onPress={() => navigation.navigate("SinglePlayer")}
          gradientColors={[colors.accent, colors.gradientEndCol]}
        />
        {!registered && (
          <ParallelogramCard
            title="Login"
            desc="Sign in to track your progress and rewards!"
            onPress={() => navigation.navigate("Login")}
            gradientColors={[colors.accent, colors.gradientEndCol]}
          />
        )}
        <ParallelogramCard
          title="Contact"
          desc="Any problems or advice? Reach out here!"
          onPress={() => navigation.navigate("Suggest")}
          gradientColors={[colors.accent, colors.gradientEndCol]}
        />
        <ParallelogramCard
          title="About"
          desc="Learn more about LearnCulia and what we do!"
          onPress={() => navigation.navigate("Info")}
          gradientColors={[colors.accent, colors.gradientEndCol]}
        />
      </View>
      <View style={{ height: 70 }} />
    </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  cardStack: {
    width: "100%",
    marginTop: 40,
    gap: 24,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  cardDesc: {
    fontSize: 14,
    color: "#000",
    marginTop: 3,
  },
});
