import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "../DarkTheme/ThemeProvider.js";

const TermsAndCo = () => {
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
        Terms & Conditions
      </Text>
      <Text style={{ fontSize: 20, marginTop: 20, color: colors.text, textAlign: "center" }}>Last updated: September 23, 2023</Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Welcome to LearnCulia!
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        These terms and conditions outline the rules and regulations for the use
        of LearnCulia.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        By using this app we assume you accept these terms and conditions. Do
        not continue to use LearnCulia if you do not agree to take all of the
        terms and conditions stated on this page.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        The following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: "Client", "You" and
        "Your" refers to you, the person log on this website and compliant to
        the Company’s terms and conditions. "The Company", "Ourselves", "We",
        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
        refers to both the Client and ourselves. All terms refer to the offer,
        acceptance and consideration of payment necessary to undertake the
        process of our assistance to the Client in the most appropriate manner
        for the express purpose of meeting the Client’s needs in respect of
        provision of the Company’s stated services, in accordance with and
        subject to, prevailing law of Netherlands. Any use of the above
        terminology or other words in the singular, plural, capitalization
        and/or he/she or they, are taken as interchangeable and therefore as
        referring to the same.
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 50,
          color: colors.text,
        }}
      >
        License
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Unless otherwise stated, LearnCulia and/or its licensors own the
        intellectual property rights for all material on LearnCulia. All
        intellectual property rights are reserved. You may access this from
        LearnCulia for your own personal use subject to restrictions set in
        these terms and conditions.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        You must not:
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Republish material from LearnCulia Sell
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Rent or sub-license material from LearnCulia Reproduce
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Duplicate or copy material from LearnCulia
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Redistribute content from LearnCulia
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        Parts of this app offer an opportunity for users to post and exchange
        opinions and information in certain areas of the website. LearnCulia
        does not filter, edit, publish or review Comments prior to their
        presence on the website. Comments do not reflect the views and opinions
        of LearnCulia, its agents and/or affiliates. Comments reflect the views
        and opinions of the person who posts their views and opinions. To the
        extent permitted by applicable laws, LearnCulia shall not be liable for
        the Comments or for any liability, damages or expenses caused and/or
        suffered as a result of any use of and/or posting of and/or appearance
        of the Comments on this website.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 50,
          color: colors.text,
          textAlign: "center",
        }}
      >
        You warrant and represent that:
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          color: colors.text,
          textAlign: "center",
        }}
      >
        You are entitled to post the Comments on our App and have all necessary
        licenses and consents to do so.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        The Comments do not invade any intellectual property right, including
        without limitation copyright, patent or trademark of any third party.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        The Comments do not contain any defamatory, libelous, offensive,
        indecent or otherwise unlawful material which is an invasion of privacy.{" "}
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
          textAlign: "center",
        }}
      >
        The Comments will not be used to solicit or promote business or custom
        or present commercial activities or unlawful activity.{" "}
      </Text>
      <View style={{ height: 70 }} />
    </ScrollView>
  );
};

export default TermsAndCo;

const styles = StyleSheet.create({});
