import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
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

  const colors = useMemo(() => buildTheme(isDark, appColor), [isDark, appColor]);
  const setScheme = useCallback((scheme) => setIsDark(scheme === "dark"), []);

  const value = useMemo(() => ({
    dark: isDark,
    appColor,
    colors,
    setScheme,
    setAppColor,
  }), [isDark, appColor, colors, setScheme]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
