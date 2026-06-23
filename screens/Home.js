import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Animated,
  Switch,
  Dimensions,
} from "react-native";
import { Text } from "@rneui/base";
import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useGlobalState } from "./RewardSystem.js";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PANEL_WIDTH = SCREEN_WIDTH * 0.72;
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
        <AntDesign name="arrowright" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const { colors, dark, setScheme } = useTheme();
  const [heyThere, setHeyThere] = useState(false);
  const [registered] = useGlobalState("registered");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(PANEL_WIDTH)).current;

  const openSettings = useCallback(() => {
    setSettingsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const closeSettings = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: PANEL_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setSettingsVisible(false));
  }, [slideAnim]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 22,
            marginLeft: -5,
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons
              name="ios-person-circle-outline"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity onPress={openSettings} activeOpacity={0.5}>
            <Feather name="settings" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, openSettings]);

  return (
    <>
    <Modal
      visible={settingsVisible}
      transparent
      animationType="none"
      onRequestClose={closeSettings}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={closeSettings}
      />
      <Animated.View
        style={[
          styles.settingsPanel,
          { backgroundColor: colors.primary, transform: [{ translateX: slideAnim }] },
        ]}
      >
        <Text style={[styles.panelTitle, { color: colors.text }]}>Settings</Text>

        <View style={styles.panelRow}>
          <Text style={[styles.panelLabel, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={dark}
            onValueChange={(val) => setScheme(val ? "dark" : "light")}
            trackColor={{ false: "#ccc", true: "#6bffc6" }}
            thumbColor={dark ? "#fff" : "#fff"}
          />
        </View>

      </Animated.View>
    </Modal>
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
      {registered ? (
        heyThere ? (
          <Text> </Text>
        ) : (
          <View
            style={{
              backgroundColor: colors.loginBanner,
              width: 300,
              padding: 15,
              paddingVertical: 10,
              overflow: "hidden",
              borderWidth: 2,
              borderRadius: 8,
              borderColor: colors.text,
              marginTop: 20,
              width: "86%",
            }}
          >
            <Button
              title="Close"
              color={colors.bannerText}
              onPress={() => setHeyThere(true)}
              style={{ marginTop: -20, marginBottom: 20, marginRight: 50 }}
            />
            <Image
              source={require("../Images/helloHome.png")}
              style={{ width: 300, height: 200, borderRadius: 6 }}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 20,
                color: colors.bannerText
              }}
            >
              Hey There! 👋
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10,
                color: colors.bannerText
              }}
            >
              Click the top left corner above to access your profile! ↖️
            </Text>
          </View>
        )
      ) : null}
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
          gradientColors={["#6bffc6", colors.gradientEndCol]}
        />
        {!registered && (
          <ParallelogramCard
            title="Login"
            desc="Sign in to track your progress and rewards!"
            onPress={() => navigation.navigate("Login")}
            gradientColors={["#6bffc6", colors.gradientEndCol]}
          />
        )}
        <ParallelogramCard
          title="Contact"
          desc="Any problems or advice? Reach out here!"
          onPress={() => navigation.navigate("Suggest")}
          gradientColors={["#6bffc6", colors.gradientEndCol]}
        />
        <ParallelogramCard
          title="About"
          desc="Learn more about LearnCulia and what we do!"
          onPress={() => navigation.navigate("Info")}
          gradientColors={["#6bffc6", colors.gradientEndCol]}
        />
      </View>
      <View style={{ height: 70 }} />
    </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  settingsPanel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: PANEL_WIDTH,
    paddingTop: 60,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  panelTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  panelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  panelLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  panelDivider: {
    height: 1,
    backgroundColor: "#ccc",
    opacity: 0.4,
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
