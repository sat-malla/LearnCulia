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
import { auth } from "../firebase.js";

const ForgotPass = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const myHeaderHeight = useHeaderHeight();

  const forgotPass = async () => {
    setLoading(true);
    try {
      await auth.sendPasswordResetEmail(email.trim());
      Alert.alert("Success!", "Password reset email sent.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
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
