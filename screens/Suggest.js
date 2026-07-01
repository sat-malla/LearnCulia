import {
  StyleSheet,
  View,
  Modal,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Button } from "@rneui/base";
import { TextInput } from "react-native";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useHeaderHeight } from "@react-navigation/elements";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../firebase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "learnculia@gmail.com";

function ClearButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.clearBtn} activeOpacity={0.7}>
      <AntDesign name="close" size={11} color="#fff" />
    </TouchableOpacity>
  );
}

const Suggest = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const isValid = name.trim() && email.trim() && message.trim();

  const DRAFT_KEY = "suggest_draft";
  const BACKGROUND_TS_KEY = "suggest_bg_ts";
  const EXPIRY_MS = 30 * 60 * 1000;
  const saveTimer = useRef(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const restoreDraft = async () => {
      try {
        const raw = await AsyncStorage.getItem(DRAFT_KEY);
        if (!raw) return;
        const { name: n, email: e, message: m } = JSON.parse(raw);
        if (n) setName(n);
        if (e) setEmail(e);
        if (m) setMessage(m);
      } catch (_) { }
    };
    restoreDraft();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", async (next) => {
      if (appState.current === "active" && next === "background") {
        await AsyncStorage.setItem(BACKGROUND_TS_KEY, String(Date.now()));
      } else if (appState.current === "background" && next === "active") {
        try {
          const ts = await AsyncStorage.getItem(BACKGROUND_TS_KEY);
          if (ts && Date.now() - parseInt(ts) >= EXPIRY_MS) {
            await AsyncStorage.removeItem(DRAFT_KEY);
            await AsyncStorage.removeItem(BACKGROUND_TS_KEY);
            setName("");
            setEmail("");
            setMessage("");
          }
        } catch (_) { }
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, []);

  const saveDraft = useCallback((n, e, m) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      AsyncStorage.setItem(DRAFT_KEY, JSON.stringify({ name: n, email: e, message: m })).catch(() => { });
    }, 1000);
  }, []);

  const openMail = async (client) => {
    const subject = encodeURIComponent("LearnCulia - Contact");
    const urls = {
      gmail: `https://mail.google.com/mail/?view=cm&to=${CONTACT_EMAIL}&su=${subject}`,
      yahoo: `https://compose.mail.yahoo.com/?to=${CONTACT_EMAIL}&subject=${subject}`,
      apple: `mailto:${CONTACT_EMAIL}?subject=${subject}`,
    };
    const url = urls[client];
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Not available", "Could not open this mail app on your device.");
    }
  };

  const sendMessage = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;

    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await db.collection("contactresponses").add({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      const res = await fetch("https://formspree.io/f/xeeblybv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error("Formspree error");
      await AsyncStorage.removeItem(DRAFT_KEY);
      await AsyncStorage.removeItem(BACKGROUND_TS_KEY);
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Failed to send", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={myHeaderHeight + 47}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.45)" }}>
            <View style={styles.modalView}>
              <LinearGradient
                colors={[colors.accent, colors.gradientEndCol]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalGradient}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26, marginBottom: 10, color: "black" }}>
                  Message Sent!
                </Text>
                <Text style={{ marginBottom: 28, textAlign: "center", fontSize: 17, color: "black", lineHeight: 24 }}>
                  We will try to get back to you within a week.
                </Text>
                <Pressable
                  style={[styles.closeBtn, { backgroundColor: colors.accent }]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", fontSize: 18 }}>
                    Close
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </Modal>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginTop: 50,
                color: colors.text,
              }}
            >
              Contact Here
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginTop: 50,
                color: colors.text,
                textAlign: "center",
              }}
            >
              Any issues or suggestions? Please contact me to get the best out of
              this app!
            </Text>
            <View style={styles.inputCont}>
              {/* Name */}
              <View style={[styles.inputRow, { borderColor: colors.text, marginTop: 10 }]}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="gray"
                  keyboardAppearance={dark ? "dark" : "light"}
                  value={name}
                  style={[styles.textInput, { color: colors.text }]}
                  onChangeText={(text) => { setName(text); saveDraft(text, email, message); }}
                />
                {name.length > 0 && <ClearButton onPress={() => { setName(""); saveDraft("", email, message); }} />}
              </View>
              {/* Email */}
              <View style={[styles.inputRow, { borderColor: colors.text, marginTop: 14 }]}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance={dark ? "dark" : "light"}
                  value={email}
                  style={[styles.textInput, { color: colors.text }]}
                  onChangeText={(text) => { setEmail(text); saveDraft(name, text, message); }}
                />
                {email.length > 0 && <ClearButton onPress={() => { setEmail(""); saveDraft(name, "", message); }} />}
              </View>
              {/* Message */}
              <View style={[styles.inputRow, styles.messageRow, { borderColor: colors.text, marginTop: 20 }]}>
                <TextInput
                  placeholder="Your Message"
                  placeholderTextColor="gray"
                  multiline={true}
                  keyboardAppearance={dark ? "dark" : "light"}
                  value={message}
                  style={[styles.textInput, styles.textInputMessage, { color: colors.text }]}
                  onChangeText={(text) => { setMessage(text); saveDraft(name, email, text); }}
                />
                {message.length > 0 && <ClearButton onPress={() => { setMessage(""); saveDraft(name, email, ""); }} />}
              </View>
            </View>
            <Button
              disabled={!isValid || loading}
              loading={loading}
              title="Send"
              style={styles.button}
              titleStyle={{
                fontWeight: "bold",
                color: colors.bannerText,
              }}
              disabledTitleStyle={{ color: colors.bannerText, fontWeight: "bold" }}
              buttonStyle={{
                borderRadius: 8,
                backgroundColor: colors.loginBanner,
              }}
              disabledStyle={{ backgroundColor: colors.loginBanner, opacity: 0.5 }}
              onPress={sendMessage}
            />

            <Text style={[styles.orText, { color: colors.text }]}>
              Or you can contact through the following means...
            </Text>

            <View style={styles.mailButtons}>
              <TouchableOpacity
                style={[styles.mailBtn, styles.gmailBtn]}
                onPress={() => openMail("gmail")}
              >
                <Text style={styles.mailBtnText}>Gmail</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mailBtn, styles.yahooBtn]}
                onPress={() => openMail("yahoo")}
              >
                <Text style={styles.mailBtnText}>Yahoo Mail</Text>
              </TouchableOpacity>

              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={[styles.mailBtn, styles.appleBtn]}
                  onPress={() => openMail("apple")}
                >
                  <Text style={styles.mailBtnText}>Apple Mail</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Suggest;

const styles = StyleSheet.create({
  inputCont: {
    marginTop: 50,
    width: "100%",
    paddingHorizontal: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  messageRow: {
    height: 200,
    alignItems: "flex-start",
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  textInputMessage: {
    height: "100%",
    textAlignVertical: "top",
  },
  button: {
    width: 200,
    marginTop: 50,
  },
  orText: {
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  mailButtons: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: 60,
  },
  mailBtn: {
    width: "80%",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  gmailBtn: {
    backgroundColor: "#EA4335",
  },
  yahooBtn: {
    backgroundColor: "#6001D2",
  },
  appleBtn: {
    backgroundColor: "#1C1C1E",
  },
  mailBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  clearBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  modalView: {
    marginHorizontal: 30,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalGradient: {
    padding: 35,
    alignItems: "center",
    borderRadius: 20,
  },
  closeBtn: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 2,
    borderWidth: 2,
    borderColor: "black",
  },
});
