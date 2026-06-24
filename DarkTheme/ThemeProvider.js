import React, { createContext, useState, useEffect, useContext } from "react";
import { buildTheme } from "./colors";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext({
  dark: false,
  appColor: "green",
  colors: buildTheme(false, "green"),
  setScheme: () => {},
  setAppColor: () => {},
});

export const ThemeProvider = (props) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");
  const [appColor, setAppColor] = useState("green");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const value = {
    dark: isDark,
    appColor,
    colors: buildTheme(isDark, appColor),
    setScheme: (scheme) => setIsDark(scheme === "dark"),
    setAppColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
