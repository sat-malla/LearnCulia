import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  Modal,
  Animated,
  Switch,
  Dimensions,
} from "react-native";
import { Text } from "@rneui/base";
import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useGlobalState } from "./RewardSystem.js";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PANEL_WIDTH = SCREEN_WIDTH * 0.72;

const Home = ({ navigation }) => {
  const { colors, dark, setScheme } = useTheme();
  const [heyThere, setHeyThere] = useState(false);
  const [registered, isRegistered] = useGlobalState("registered");
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

        <View style={styles.panelDivider} />

        <TouchableOpacity
          style={styles.panelRow}
          onPress={() => { closeSettings(); navigation.navigate("Info"); }}
        >
          <Text style={[styles.panelLabel, { color: colors.text }]}>About</Text>
          <AntDesign name="arrowright" size={20} color={colors.text} />
        </TouchableOpacity>
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
      ) : (
        <TouchableOpacity
          style={{
            borderRadius: 10,
            padding: 10,
            elevation: 2,
            width: "75%",
            backgroundColor: colors.loginBanner,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: colors.bannerText, fontWeight: "500", fontSize: 30, marginLeft: 90 }}>
            Login
          </Text>
          <AntDesign
            name="arrowright"
            size={30}
            color={colors.bannerText}
            style={{ marginTop: 4, marginLeft: 70 }}
          />
        </TouchableOpacity>
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
        Let LearnCulia guide you to conquer your math hurdles!
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
      <TouchableOpacity
        style={{
          borderWidth: 1,
          height: 170,
          width: 180,
          alignItems: "center",
          marginTop: 50,
          marginBottom: 50,
          borderRadius: 16,
          borderColor: colors.text,
        }}
        onPress={() => navigation.navigate("SinglePlayer")}
      >
        <LinearGradient
          colors={["#6bffc6", colors.gradientEndCol]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            width: 178,
            marginRight: 0.75,
            height: 168,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Single Player
          </Text>
          <Text style={{ fontSize: 17, marginTop: 10 }}>
            Solve exciting challenges for desired self-improvement!
          </Text>
          <AntDesign name="arrowright" size={24} style={{ marginTop: 5 }} />
        </LinearGradient>
      </TouchableOpacity>
      <Button
        title="Any problems or advice? Contact here"
        color={colors.buttonColor}
        onPress={() => navigation.navigate("Suggest")}
      />
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
});
