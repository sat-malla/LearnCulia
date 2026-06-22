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
import React, { useState } from "react";
import { Text, Input, Button } from "@rneui/base";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useHeaderHeight } from "@react-navigation/elements";
import { db } from "../firebase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "learnculia@gmail.com";

const Suggest = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const isValid = name.trim() && email.trim() && message.trim();

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
      keyboardVerticalOffset={myHeaderHeight+47}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: colors.primary,
                borderColor: colors.text,
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 25,
                marginBottom: 15,
                color: colors.text,
              }}
            >
              Message Sent!
            </Text>
            <Text
              style={{
                marginBottom: 20,
                textAlign: "center",
                fontSize: 20,
                color: colors.text,
              }}
            >
              We will try to get back to you within a week.
            </Text>
            <Pressable
              style={[
                { borderRadius: 20, padding: 10, elevation: 2, width: 150 },
                { backgroundColor: "#6bffc6" },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Close
              </Text>
            </Pressable>
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
            <Input
              placeholder="Name"
              placeholderTextColor="gray"
              type="text"
              keyboardAppearance={dark ? "dark" : "light"}
              value={name}
              style={{ color: colors.text }}
              onChangeText={(text) => setName(text)}
              containerStyle={[styles.inputStyl, { borderColor: colors.text }]}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            <Input
              placeholder="Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance={dark ? "dark" : "light"}
              value={email}
              style={{ color: colors.text }}
              onChangeText={(text) => setEmail(text)}
              containerStyle={[styles.inputStyl, { borderColor: colors.text }]}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            <Input
              placeholder="Your Message"
              placeholderTextColor="gray"
              multiline={true}
              type="text"
              keyboardAppearance={dark ? "dark" : "light"}
              value={message}
              style={{ color: colors.text, textAlignVertical: "top" }}
              onChangeText={(text) => setMessage(text)}
              containerStyle={[
                styles.mesContainer,
                { borderColor: colors.text },
              ]}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
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
  inputStyl: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 5,
    marginTop: 10,
    height: 50,
  },
  mesContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 5,
    marginTop: 20,
    height: 200,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
