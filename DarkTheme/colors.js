const accentPalettes = {
  green: {
    accent: "#6bffc6",
    accentText: "#11ad71",
    loginBanner: "rgba(201, 255, 234, 1)",
    savedBG: "#c9ffea",
    gradientEnd: "white",
    darkLoginBanner: "rgba(0, 102, 62, 0.4)",
    darkAccentText: "#1cffa8",
    darkSavedBG: "#00663d",
    darkGradientEnd: "#ccffec",
  },
  red: {
    accent: "#ff4d4d",
    accentText: "#cc1f1f",
    loginBanner: "rgba(255, 220, 220, 1)",
    savedBG: "#ffd6d6",
    gradientEnd: "white",
    darkLoginBanner: "rgba(140, 0, 0, 0.4)",
    darkAccentText: "#ff7070",
    darkSavedBG: "#8c0000",
    darkGradientEnd: "#ffcccc",
  },
  blue: {
    accent: "#2f96fd",
    accentText: "#0062cc",
    loginBanner: "rgba(210, 235, 255, 1)",
    savedBG: "#d2ebff",
    gradientEnd: "white",
    darkLoginBanner: "rgba(0, 60, 140, 0.4)",
    darkAccentText: "#5ab4ff",
    darkSavedBG: "#003c8c",
    darkGradientEnd: "#cce5ff",
  },
};

export const buildTheme = (dark, appColor = "green") => {
  const p = accentPalettes[appColor] || accentPalettes.green;
  if (dark) {
    return {
      primary: "#242430",
      text: "white",
      buttonColor: "#089cff",
      accent: p.accent,
      gradientEndCol: p.darkGradientEnd,
      redComp: "#ff3654",
      blueComp: "#33b8ff",
      orYouCan: "white",
      loginBanner: p.darkLoginBanner,
      bannerText: p.darkAccentText,
      saveButtonBG: "rgba(0, 56, 168, 0.4)",
      saveButtonText: "#1f9bff",
      savedBG: p.darkSavedBG,
      orangeBG: "rgba(143, 64, 0, 0.4)",
      orangeText: "#ff9540",
    };
  }
  return {
    primary: "white",
    text: "black",
    buttonColor: "#0099ff",
    accent: p.accent,
    gradientEndCol: p.gradientEnd,
    redComp: "red",
    blueComp: "blue",
    orYouCan: "gray",
    loginBanner: p.loginBanner,
    bannerText: p.accentText,
    saveButtonBG: "#e1eafc",
    saveButtonText: "#4f8aff",
    savedBG: p.savedBG,
    orangeBG: "#fcede1",
    orangeText: "#ed8939",
  };
};

export const lightTheme = buildTheme(false, "green");
export const darkTheme = buildTheme(true, "green");
