import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, ButtonGroup } from "@rneui/base";
import { useTheme } from "../DarkTheme/ThemeProvider.js";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useGlobalState } from "./RewardSystem.js";
import { auth, db } from "../firebase.js";

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [glasses, setGlasses] = useState(false);
  const [partyHat, setPartyHat] = useState(false);
  const [registered, isRegistered] = useGlobalState("registered");
  //const [starCount, setStarCount] = useGlobalState("starCount");

  const loadUserData = () => {
    db.collection("userdata")
      .get()
      .then(function (querySnapshot) {
        try {
          querySnapshot.forEach(function (doc) {
            if (doc.data().id == auth.currentUser.uid) {
              setSelectedIndex(doc.data().gender);
              setGlasses(doc.data().glasses);
              setPartyHat(doc.data().partyHat);
              setStarCount(doc.data().stars);
              throw new Exception("User has been found");
            }
          });
        } catch (e) {
          console.log("User found");
        }
      });
  };

  const saveData = () => {
    db.collection("userdata")
      .get()
      .then(function (querySnapshot) {
        try {
          querySnapshot.forEach(function (doc) {
            if (doc.data().id === auth.currentUser.uid) {
              db.collection("userdata").doc(doc.id).update({
                gender: selectedIndex,
                glasses: glasses,
                partyHat: partyHat,
              });
              throw new Exception("User is found and is being updated");
            }
          });
        } catch (e) {
          console.log("Updated user data");
        }
      });
  };

  const saveButton = () => {
    saveData();
    showMessage({
      message: "Saved!",
      type: "success",
      titleStyle: {
        fontSize: 19,
        marginTop: 20,
        fontWeight: "bold",
        color: colors.bannerText,
      },
      backgroundColor: colors.savedBG,
      style: {
        alignItems: "center",
        alignSelf: "center",
        width: 450,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        overflow: "scroll",
      },
      position: "bottom",
    });
  };

  const userLogout = async () => {
    await auth
      .signOut(auth)
      .then(() => {
        navigation.navigate("Home");
        isRegistered(false);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    loadUserData();
  }, []);


  const buttonOptions = ["Male", "Female"];
  // Add glasses and party hat profile pictures

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.primary,
      }}
    >
      {registered ? (
        <ScrollView
          style={{
            height: "100%",
            backgroundColor: colors.primary,
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 15,
          }}
          scrollIndicatorInsets={{ right: 1 }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 50,
              color: colors.text,
            }}
          >
            Welcome to Your Profile!
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginTop: 15,
              color: colors.text,
            }}
          >
            Make your desired changes, and hit save below!
          </Text>
          {glasses && partyHat ? (
            <Image
              source={
                selectedIndex == 0
                  ? require("../Images/maleGPHProfilePic.png")
                  : require("../Images/femaleGPHProfilePic.png")
              }
              style={{ width: 400, height: 400 }}
            />
          ) : glasses ? (
            <Image
              source={
                selectedIndex == 0
                  ? require("../Images/maleGlassesProfilePic.png")
                  : require("../Images/femaleGlassesProfilePic.png")
              }
              style={{ width: 400, height: 400 }}
            />
          ) : partyHat ? (
            <Image
              source={
                selectedIndex == 0
                  ? require("../Images/malePHProfilePic.png")
                  : require("../Images/femalePHProfilePic.png")
              }
              style={{ width: 400, height: 400 }}
            />
          ) : (
            <Image
              source={
                selectedIndex == 0
                  ? require("../Images/maleProfilePic.png")
                  : require("../Images/femaleProfilePic.png")
              }
              style={{ width: 400, height: 400 }}
            />
          )}
          <ButtonGroup
            buttons={buttonOptions}
            selectedIndex={selectedIndex}
            onPress={(value) => setSelectedIndex(value)}
            containerStyle={[
              styles.buttonGStyle,
              { borderColor: colors.text, backgroundColor: colors.primary },
            ]}
            selectedButtonStyle={{ backgroundColor: colors.accent }}
            textStyle={{ color: colors.text, fontWeight: "bold", fontSize: 20 }}
            selectedTextStyle={{ color: "black", fontWeight: "bold" }}
          />
          {/* <Text
        style={{
          marginTop: 50,
          fontWeight: "500",
          fontSize: 20,
          textAlign: "center",
          color: colors.text,
        }}
      >
        When you complete 3 single-player games(15 stars), you will earn this
        feature!:
      </Text> */}
          {glasses ? (
            <TouchableOpacity
              style={{
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                width: "40%",
                backgroundColor: colors.loginBanner,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "center",
              }}
              //  Disable when user hasn't completed 3 games
              onPress={() => setGlasses(!glasses)}
            >
              <Text
                style={{
                  color: colors.bannerText,
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 30,
                }}
              >
                Added!
              </Text>
              <Feather
                name="check"
                size={24}
                color={colors.bannerText}
                style={{ marginLeft: 20, marginRight: 20 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              // disabled={starCount < 15}
              style={{
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                width: "75%",
                backgroundColor: colors.loginBanner,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 50,
                alignSelf: "center",
              }}
              //  Disable when user hasn't completed 3 games
              onPress={() => setGlasses(!glasses)}
            >
              <Ionicons name="glasses" size={35} color={colors.bannerText} />
              <Text
                style={{
                  color: colors.bannerText,
                  fontWeight: "bold",
                  fontSize: 18,
                  marginRight: 35,
                }}
              >
                Add Glasses!
              </Text>
            </TouchableOpacity>
          )}
          {glasses ? (
            <Text
              style={{
                color: colors.redComp,
                fontSize: 15,
                marginTop: 10,
              }}
            >
              Tap to remove glasses
            </Text>
          ) : (
            <Text> </Text>
          )}
          {/* <Text
        style={{
          marginTop: 50,
          fontWeight: "500",
          fontSize: 20,
          textAlign: "center",
          color: colors.text,
        }}
      >
        When you complete 6 single-player games(30 stars), you will earn this
        feature!:
      </Text> */}
          {partyHat ? (
            <TouchableOpacity
              style={{
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                width: "40%",
                backgroundColor: colors.loginBanner,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "center",
              }}
              //  Disable when user hasn't completed 3 games
              onPress={() => setPartyHat(!partyHat)}
            >
              <Text
                style={{
                  color: colors.bannerText,
                  fontWeight: "bold",
                  fontSize: 18,
                  marginLeft: 30,
                }}
              >
                Added!
              </Text>
              <Feather
                name="check"
                size={24}
                color={colors.bannerText}
                style={{ marginLeft: 20, marginRight: 20 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                borderRadius: 8,
                padding: 10,
                elevation: 2,
                width: "75%",
                backgroundColor: colors.loginBanner,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 20,
                alignSelf: "center",
              }}
              //  Disable when user hasn't completed 3 games
              onPress={() => setPartyHat(!partyHat)}
            >
              <MaterialCommunityIcons
                name="party-popper"
                size={35}
                color={colors.bannerText}
              />
              <Text
                style={{
                  color: colors.bannerText,
                  fontWeight: "bold",
                  fontSize: 18,
                  marginRight: 35,
                }}
              >
                Add Party Hat!
              </Text>
            </TouchableOpacity>
          )}
          {partyHat ? (
            <Text
              style={{
                color: colors.redComp,
                fontSize: 15,
                marginTop: 10,
              }}
            >
              Tap to remove party hat
            </Text>
          ) : (
            <Text> </Text>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: colors.saveButtonBG,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
              marginBottom: 50,
              width: "55%",
              borderRadius: 8,
              padding: 10,
              elevation: 2,
            }}
            //  Save changes, GLOBALLY!!!, put this in a const function later
            onPress={saveButton}
          >
            <Text
              style={{
                color: colors.saveButtonText,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
          <Button title="Logout" color={colors.redComp} onPress={userLogout} />
          <FlashMessage />
          <View style={{ height: 50 }} />
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              marginTop: 50,
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              color: colors.text
            }}
          >
            You're not logged in! Log in or Register to access your Profile!
          </Text>
          <Image
            source={require("../Images/notRegistered.png")}
            style={{ width: 300, height: 320, marginTop: 150, borderRadius: 8 }}
          />
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  buttonGStyle: {
    marginTop: 20,
    width: 380,
    height: 50,
    alignSelf: "center",
    borderWidth: "2",
    borderRadius: 8,
  },
});
