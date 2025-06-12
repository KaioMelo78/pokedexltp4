import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CaretRight, Heart } from "phosphor-react-native";
import { PokemonListItem } from "../types/pokemon";
import { ThemeColors } from "../hooks/useTheme";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  index: number;
  onPress: () => void;
  onAddToTeam: () => void;
  isInTeam: boolean;
  themeColors: ThemeColors;
  isDarkTheme: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  index,
  onPress,
  onAddToTeam,
  isInTeam,
  themeColors,
  isDarkTheme,
}) => {
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: themeColors.cardBackground,
      alignItems: "center",
      padding: 15,
      justifyContent: "space-between",
      borderRadius: 4,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: themeColors.border,
      shadowColor: isDarkTheme ? "#000" : "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    cardInTeam: {
      borderColor: themeColors.success,
      borderWidth: 2,
      backgroundColor: isDarkTheme ? "#2d5535" : "#f0fff4",
    },
    cardInfo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    cardActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    cardText: {
      color: themeColors.text,
      fontWeight: "500",
    },
    cardNumber: {
      color: themeColors.textSecondary,
      fontSize: 12,
    },
    heartButton: {
      padding: 5,
    },
  });

  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.card, isInTeam && styles.cardInTeam]}
    >
      <View style={styles.cardInfo}>
        <Image width={60} height={60} source={{uri: pokemon.image}}/>
        <View>
          <Text style={styles.cardNumber}>#{index + 1}</Text>
          <Text style={styles.cardText}>{pokemon.name}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <Pressable 
          onPress={onAddToTeam}
          style={styles.heartButton}
        >
          <Heart 
            size={24} 
            color={isInTeam ? themeColors.success : themeColors.textSecondary}
            weight={isInTeam ? "fill" : "regular"}
          />
        </Pressable>
        <CaretRight size={32} color={themeColors.textSecondary} />
      </View>
    </Pressable>
  );
};
