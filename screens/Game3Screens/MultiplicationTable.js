import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from "@rneui/base";
import React from "react";
import { useTheme } from "../../DarkTheme/ThemeProvider";

const SIZE = 13;
const TABLE_WIDTH = Dimensions.get("window").width - 48;
const CELL = Math.floor(TABLE_WIDTH / SIZE);

const MultiplicationTable = () => {
  const { dark, colors } = useTheme();

  const headerBg = colors.accent;
  const headerText = "#000";
  const evenBg = dark ? "#2e2e3a" : "#f0fff8";
  const oddBg = dark ? "#242430" : "#ffffff";
  const cellText = dark ? "#fff" : "#000";
  const borderColor = dark ? "#444" : "#c0e8d8";

  const cellStyle = (row, col) => {
    const isHeader = row === 0 || col === 0;
    const isHighlight = row !== 0 && col !== 0 && row === col;
    return [
      styles.cell,
      {
        backgroundColor: isHeader
          ? headerBg
          : isHighlight
          ? "#ffe066"
          : (row + col) % 2 === 0
          ? evenBg
          : oddBg,
        borderColor,
      },
    ];
  };

  const textStyle = (row, col) => ({
    fontSize: 11,
    fontWeight: row === 0 || col === 0 ? "bold" : "400",
    color: row === 0 || col === 0 ? headerText : cellText,
  });

  return (
    <View>
      {Array.from({ length: SIZE }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: SIZE }, (_, col) => {
            const val =
              row === 0 && col === 0
                ? "×"
                : row === 0
                ? col
                : col === 0
                ? row
                : row * col;
            return (
              <View key={col} style={cellStyle(row, col)}>
                <Text style={textStyle(row, col)}>{val}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default MultiplicationTable;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  cell: {
    width: CELL,
    height: CELL,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#000000",
  },
});
