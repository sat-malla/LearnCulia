import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
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
import { useGlobalState } from "./GlobalState.js";
import { auth, db, deleteUserData } from "../firebase.js";
import AvatarSVG from "../components/AvatarSVG.js";

const SKIN_OPTIONS = [
  { key: "light",       label: "Light",        color: "#f5cba7" },
  { key: "mediumLight", label: "Medium Light",  color: "#d4956a" },
  { key: "medium",      label: "Medium",        color: "#b06040" },
  { key: "mediumDark",  label: "Medium Dark",   color: "#7d4535" },
  { key: "dark",        label: "Dark",          color: "#4a2820" },
  { key: "deep",        label: "Deep",          color: "#2c1810" },
];

const SHIRT_OPTIONS = [
  { key: "green", color: "#6bffc6" },
  { key: "red",   color: "#ff4d4d" },
  { key: "blue",  color: "#2f96fd" },
];

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [profileLoaded, setProfileLoaded] = useGlobalState("profileLoaded");
  const [selectedIndex, setSelectedIndex] = useGlobalState("gender");
  const [glasses, setGlasses] = useGlobalState("glasses");
  const [partyHat, setPartyHat] = useGlobalState("partyHat");
  const [shirtColor, setShirtColor] = useGlobalState("shirtColor");
  const [skinTone, setSkinTone] = useGlobalState("skinTone");
  const [gamesCompleted, setGamesCompleted] = useGlobalState("gamesCompleted");
  const [registered, isRegistered] = useGlobalState("registered");

  const loadUserData = () => {
    if (profileLoaded) return;
    db.collection("userdata")
      .get()
      .then(function (querySnapshot) {
        const doc = querySnapshot.docs.find((d) => d.data().id === auth.currentUser.uid);
        if (doc) {
          setSelectedIndex(doc.data().gender ?? 0);
          setGlasses(doc.data().glasses ?? false);
          setPartyHat(doc.data().partyHat ?? false);
          setShirtColor(doc.data().shirtColor ?? "green");
          setSkinTone(doc.data().skinTone ?? "mediumDark");
          setGamesCompleted(doc.data().gamesCompleted ?? 0);
          setProfileLoaded(true);
        }
      });
  };

  const saveData = () => {
    db.collection("userdata")
      .get()
      .then(function (querySnapshot) {
        const doc = querySnapshot.docs.find((d) => d.data().id === auth.currentUser.uid);
        if (doc) {
          db.collection("userdata").doc(doc.id).update({
            gender: selectedIndex,
            glasses: glasses,
            partyHat: partyHat,
            shirtColor: shirtColor,
            skinTone: skinTone,
          });
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
        setProfileLoaded(false);
        setGamesCompleted(0);
        navigation.navigate("Home");
        isRegistered(false);
      })
      .catch((error) => alert(error));
  };

  const deleteAccount = async () => {
    try {
      const uid = auth.currentUser.uid;
      await deleteUserData(uid);
      await auth.deleteUser();
      setProfileLoaded(false);
      setGamesCompleted(0);
      isRegistered(false);
      setDeleteModalVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      setDeleteModalVisible(false);
      Alert.alert("Error", "Failed to delete account. Please sign out and sign back in, then try again.");
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);


  const buttonOptions = ["Male", "Female"];

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
              marginBottom: 20,
              color: colors.text,
            }}
          >
            Make your desired changes, and hit save below!
          </Text>
          <AvatarSVG
            gender={selectedIndex === 0 ? "male" : "female"}
            shirtColor={shirtColor}
            skinTone={skinTone}
            glasses={glasses}
            partyHat={partyHat}
            gamesCompleted={gamesCompleted}
            size={340}
          />
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
          {/* ── SHIRT COLOR ── */}
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Shirt Color</Text>
          <View style={styles.swatchRow}>
            {SHIRT_OPTIONS.map(({ key, color }) => (
              <TouchableOpacity
                key={key}
                onPress={() => setShirtColor(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: color },
                  shirtColor === key && [styles.swatchSelected, { borderColor: colors.text }],
                ]}
              />
            ))}
          </View>

          {/* ── SKIN TONE ── */}
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Skin Tone</Text>
          <View style={styles.swatchRow}>
            {SKIN_OPTIONS.map(({ key, color }) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSkinTone(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: color },
                  skinTone === key && [styles.swatchSelected, { borderColor: colors.text }],
                ]}
              />
            ))}
          </View>

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
          <TouchableOpacity
            onPress={userLogout}
            style={{
              backgroundColor: "#e53935",
              borderRadius: 10,
              paddingVertical: 13,
              paddingHorizontal: 40,
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            style={{
              backgroundColor: "transparent",
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: "#e53935",
              paddingVertical: 13,
              paddingHorizontal: 40,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#e53935", fontWeight: "bold", fontSize: 17 }}>Delete Account</Text>
          </TouchableOpacity>
          <Modal
            transparent
            animationType="fade"
            visible={deleteModalVisible}
            onRequestClose={() => setDeleteModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 14,
                  padding: 24,
                  width: "100%",
                  maxWidth: 360,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.text,
                    marginBottom: 14,
                    textAlign: "center",
                  }}
                >
                  Delete Account
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.text,
                    marginBottom: 24,
                    textAlign: "center",
                    lineHeight: 22,
                  }}
                >
                  This will delete your account from the app, including your saved progress and profile. Press Confirm to continue or Cancel to exit.
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => setDeleteModalVisible(false)}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor: colors.text,
                      paddingVertical: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={deleteAccount}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: "#e53935",
                      paddingVertical: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
          {colors.accent === "#6bffc6" ? (
            <Image
              source={require("../Images/notRegistered.png")}
              style={{ width: 300, height: 320, marginTop: 150, borderRadius: 8 }}
            />
          ) : colors.accent === "#ff4d4d" ? (
            <Image
              source={require("../Images/notRegisteredRed.png")}
              style={{ width: 300, height: 320, marginTop: 150, borderRadius: 8 }}
            />
          ) : colors.accent === "#2f96fd" ? (
            <Image
              source={require("../Images/notRegisteredBlue.png")}
              style={{ width: 300, height: 320, marginTop: 150, borderRadius: 8 }}
            />
          ) : null}
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
  sectionLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 28,
    marginBottom: 12,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  swatchRow: {
    flexDirection: "row",
    gap: 14,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  swatch: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchSelected: {
    borderColor: "#000",
    transform: [{ scale: 1.18 }],
  },
});
