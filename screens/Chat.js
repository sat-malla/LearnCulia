import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@rneui/base";
import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { useGlobalState } from "./RewardSystem.js";

const BACKEND_URL = "http://localhost:3000";

const INITIAL_MESSAGE = { id: "0", role: "assistant", text: "Hey there! I'm Culiabot, your LearnCulia assistant. Ask me anything about dyscalculia, the games, app features,or how to improve your math skills!" };

const Chat = () => {
  const { colors, dark } = useTheme();
  const myHeaderHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom || 18;
  const [registered] = useGlobalState("registered");
  const [userId] = useGlobalState("userId");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const storageKey = registered && userId ? `chat_history_${userId}` : null;

  useEffect(() => {
    setHistoryLoaded(false);
    if (!storageKey) {
      setHistoryLoaded(true);
      return;
    }
    AsyncStorage.getItem(storageKey).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw);
          if (saved.length > 0) setMessages(saved);
        } catch (_) {}
      }
      setHistoryLoaded(true);
    });
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || !historyLoaded) return;
    AsyncStorage.setItem(storageKey, JSON.stringify(messages)).catch(() => {});
  }, [messages, storageKey, historyLoaded]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => m.id !== "0"),
        }),
      });
      const data = await res.json();
      const reply = res.status === 429
        ? data.error
        : res.ok
          ? data.response
          : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { id: Date.now().toString() + "r", role: "assistant", text: reply }]);
    } catch (_) {
      setMessages((prev) => [...prev, { id: Date.now().toString() + "e", role: "assistant", text: "Could not reach the server. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";
    const textColor = isUser ? "#000" : colors.text;
    return (
      <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowAssistant]}>
        <View style={[
          styles.bubble,
          isUser
            ? { backgroundColor: colors.accent }
            : { backgroundColor: dark ? "#2a2a2a" : "#f0f0f0" },
        ]}>
          {isUser ? (
            <Text style={[styles.bubbleText, { color: textColor }]}>{item.text}</Text>
          ) : (
            <Markdown style={{
              body: { color: textColor, fontSize: 18, lineHeight: 24 },
              strong: { fontWeight: "bold", color: textColor },
              bullet_list: { color: textColor },
              ordered_list: { color: textColor },
            }}>
              {item.text}
            </Markdown>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.primary }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={myHeaderHeight + 47}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      {loading && (
        <View style={styles.typingRow}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text style={[styles.typingText, { color: colors.text }]}>Thinking...</Text>
        </View>
      )}
      <View style={[styles.inputRow, { borderTopColor: dark ? "#333" : "#e0e0e0", backgroundColor: colors.primary, paddingBottom: bottomPad }]}>
        <TextInput
          style={[styles.input, { borderColor: colors.text, color: colors.text }]}
          placeholder="Ask me anything..."
          placeholderTextColor="gray"
          value={input}
          multiline
          numberOfLines={1}
          maxLength={500}
          keyboardAppearance={dark ? "dark" : "light"}
          blurOnSubmit={false}
          onChangeText={(val) => {
            if (val.endsWith("\n") && !val.endsWith("\n\n")) {
              sendMessage();
            } else {
              setInput(val);
            }
          }}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: colors.accent, opacity: !input.trim() || loading ? 0.4 : 1 }]}
          onPress={sendMessage}
          disabled={!input.trim() || loading}
        >
          <Feather name="send" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  bubbleRow: {
    marginBottom: 12,
    flexDirection: "row",
  },
  bubbleRowUser: {
    justifyContent: "flex-end",
  },
  bubbleRowAssistant: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontSize: 18,
    lineHeight: 22,
  },
  typingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 6,
    gap: 8,
  },
  typingText: {
    fontSize: 18,
    opacity: 0.6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 20,
    fontSize: 18,
  },
  sendBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
});
