import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Text, Button } from "@rneui/base";
import { useTheme } from "../DarkTheme/ThemeProvider";
import { useHeaderHeight } from "@react-navigation/elements";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase";

const ForgotPass = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const forgotPass = async () => {
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const q = query(collection(firestore, "userdata"), where("email", "==", normalizedEmail));
      const snap = await getDocs(q);
      if (snap.empty) {
        Alert.alert(
          "Account not found",
          "No account with that email exists. Please register first.",
          [
            { text: "Register", onPress: () => navigation.navigate("Register") },
            { text: "Cancel", style: "cancel" },
          ]
        );
        setLoading(false);
        return;
      }

      const code = Math.floor(10000000 + Math.random() * 90000000).toString();
      const expiresAt = Timestamp.fromMillis(Date.now() + 5 * 60 * 1000);

      await addDoc(collection(firestore, "passwordResetTokens"), {
        email: normalizedEmail,
        code,
        expiresAt,
      });

      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          to: [{ email: normalizedEmail }],
          templateId: 3,
          params: { code },
        }),
      });
      if (!res.ok) throw new Error("Brevo error");

      Alert.alert("Success!", "Password reset email sent. Check your inbox! The link will expire in 5 minutes.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ backgroundColor: colors.primary, flex: 1 }}
      keyboardVerticalOffset={myHeaderHeight + 47}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={[styles.title, { color: colors.text }]}>
            Forgot Password?
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Enter your email address and we'll send you a link to reset your
            password.
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={[styles.input, { borderColor: colors.text, color: colors.text }]}
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
            keyboardAppearance={dark ? "dark" : "light"}
            value={email}
            onChangeText={setEmail}
          />
          <Button
            disabled={!email.trim() || loading}
            loading={loading}
            title="Send Reset Email"
            containerStyle={styles.buttonContainer}
            titleStyle={[styles.buttonTitle, { color: colors.bannerText }]}
            buttonStyle={[styles.button, { backgroundColor: colors.loginBanner }]}
            onPress={forgotPass}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 24,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 30,
    height: 48,
    width: 300,
  },
  buttonContainer: {
    marginTop: 30,
    width: 300,
  },
  buttonTitle: {
    fontWeight: "bold",
  },
  button: {
    borderRadius: 8,
    height: 48,
  },
});
