import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gear, Moon, Sun, Users } from "phosphor-react-native";
import { ThemeColors } from "../hooks/useTheme";

interface AppHeaderProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  teamCount: number;
  onOpenTeam: () => void;
  themeColors: ThemeColors;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  isDarkTheme,
  onToggleTheme,
  teamCount,
  onOpenTeam,
  themeColors,
}) => {
  const styles = StyleSheet.create({
    header: {
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 20,
      padding: 20,
      alignItems: "center",
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    logo: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "bold",
    },
    teamCounter: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    teamCounterText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    themeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Pokédex</Text>
      <View style={styles.headerActions}>
        <Pressable style={styles.teamCounter} onPress={onOpenTeam}>
          <Users size={20} color="#fff" weight="fill" />
          <Text style={styles.teamCounterText}>{teamCount}/6</Text>
        </Pressable>
        <Pressable style={styles.themeButton} onPress={onToggleTheme}>
          {isDarkTheme ? 
            <Sun size={24} color="#fff" weight="fill" /> : 
            <Moon size={24} color="#fff" weight="fill" />
          }
        </Pressable>
        <Gear size={32} color="#fff"/>
      </View>
    </View>
  );
};
