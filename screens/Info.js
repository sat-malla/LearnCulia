import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "@rneui/base";
import { useTheme } from "../DarkTheme/ThemeProvider.js";

const Info = ({ navigation }) => {
  const { colors } = useTheme();

  return (
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
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 50,
          color: colors.text,
        }}
      >
        What is this App?
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Welcome to LearnCulia™ – an exciting app designed to empower young kids
        who struggle with dyscalculia on their journey to conquer math
        challenges with confidence and joy. Through a collection of interactive
        games, tutorials, and challenge puzzles, LearnCulia™ turns learning into
        an exciting adventure. Unlike traditional learning environments, this
        app provides small tutorial videos before each game to not just learn
        how to play the game, but also learn the mathematical concept. To enjoy
        this app even more, you can create an account to have your own custom
        profile picture!
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 50,
          color: colors.text,
        }}
      >
        Purpose
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        I want to make sure that every single student, who struggles to achieve
        success because of dyscalculia, will earn an opportunity in LearnCulia™
        to sharpen mathematical skills for their benefit. I want to make sure
        that everyone can work on what they want to work on, with helpful and
        short tutorial videos to stay successful. I also strive to make this
        app even better, so if you have any advice or ideas, please contact me!
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 50,
          color: colors.text,
        }}
      >
        Single Player Games
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        The main feature of this app is the Single Player Games. Currently,
        there are six fun and exciting challenge games with different levels of
        difficulty. There is no need to go through all the games in order, or
        complete every single game. If you find yourself struggling with a
        mathematical concept, simply press the respective game, and start the
        challenge! Every single player game as a information/tutorial page, a
        normal game page, and the challenge. You first start on the information
        page where you can watch the necessary tutorial videos for the game.
        After you correctly answer 10 problems, you may move on to the challenge
        problems. If you correctly answer 10 challenge problems, you have
        completed the game! You may also complete the game however many times
        you would like. Any time you feel stressed or anxious about a game,
        simply press ‘Quit Game’ on the top left corner. In the future, there
        will be multiplayer games, and way more single player games based on
        difficulty and age level!
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 50,
          color: colors.text,
        }}
      >
        About the Developer
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          marginBottom: 30,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Hey there! I am currently an undergraduate college student residing in California. App
        development is one of my passions, and I love to spend my free time
        working on some small app projects for fun. I wanted to build LearnCulia™
        because there aren’t many great tools out there that really support and
        encourage young students who struggle with dyscalculia to solve math
        problems with the development of necessary skills. In this app, I want
        to make sure that everyone gets an opportunity to access a fun
        environment to hone their skills. You are welcome to contact me below if
        you have any questions!
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Suggest")}
        style={[styles.btn, { backgroundColor: colors.accent }]}
      >
        <Text style={styles.btnText}>Contact Here</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default Info;

const styles = StyleSheet.create({
  btn: {
    marginTop: 16,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 36,
    alignItems: "center",
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
