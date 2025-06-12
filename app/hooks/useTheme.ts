import { useState } from "react";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textSecondary: string;
  cardBackground: string;
  border: string;
  success: string;
  danger: string;
}

export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeColors: ThemeColors = {
    primary: isDarkTheme ? "#2d3748" : "#f7776a",
    secondary: isDarkTheme ? "#4a5568" : "#f98e80",
    background: isDarkTheme ? "#1a202c" : "#fff",
    text: isDarkTheme ? "#fff" : "#000",
    textSecondary: isDarkTheme ? "#a0aec0" : "#666",
    cardBackground: isDarkTheme ? "#2d3748" : "#fff",
    border: isDarkTheme ? "#4a5568" : "#f2f2f2",
    success: isDarkTheme ? "#48bb78" : "#38a169",
    danger: isDarkTheme ? "#f56565" : "#e53e3e",
  };

  return {
    isDarkTheme,
    toggleTheme,
    themeColors,
  };
};
