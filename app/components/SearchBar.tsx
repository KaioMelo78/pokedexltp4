import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";
import { ThemeColors } from "../hooks/useTheme";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  themeColors: ThemeColors;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchChange,
  themeColors,
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColors.secondary,
      marginHorizontal: 20,
      borderRadius: 25,
      flexDirection: "row",
      padding: 10,
      gap: 15,
      alignItems: "center",
      marginBottom: 25,
    },
    input: {
      flex: 1,
      color: "#fff",
    },
  });

  return (
    <View style={styles.container}>
      <MagnifyingGlass size={32} color="#fff"/>
      <TextInput 
        style={styles.input} 
        placeholder="Pesquisar por nome ou número" 
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={searchText}
        onChangeText={onSearchChange}
      />
    </View>
  );
};
