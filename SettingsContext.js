import { createContext } from "react";

export const SettingsContext = createContext({ openSettings: () => {}, closeSettings: () => {}, navigate: () => {} });
