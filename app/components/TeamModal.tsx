import React from "react";
import { Image, Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { PokemonListItem } from "../types/pokemon";
import { ThemeColors } from "../hooks/useTheme";

const { height } = Dimensions.get('window');

interface TeamModalProps {
  isVisible: boolean;
  onClose: () => void;
  team: PokemonListItem[];
  onRemovePokemon: (pokemonName: string) => void;
  themeColors: ThemeColors;
  isDarkTheme: boolean;
}

export const TeamModal: React.FC<TeamModalProps> = ({
  isVisible,
  onClose,
  team,
  onRemovePokemon,
  themeColors,
  isDarkTheme,
}) => {
  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      height: height * 0.7,
      backgroundColor: themeColors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: themeColors.text,
    },
    closeButton: {
      color: themeColors.primary,
      fontWeight: "bold",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 10,
    },
    slot: {
      width: "48%",
      height: 120,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: themeColors.border,
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    slotFilled: {
      borderStyle: "solid",
      borderColor: themeColors.success,
      backgroundColor: isDarkTheme ? "#2d5535" : "#f0fff4",
    },
    slotContent: {
      alignItems: "center",
      gap: 5,
    },
    slotText: {
      color: themeColors.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },
    slotName: {
      color: themeColors.text,
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
    },
    removeButton: {
      position: "absolute",
      top: 5,
      right: 5,
      backgroundColor: themeColors.danger,
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    removeButtonText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "bold",
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    emptyText: {
      color: themeColors.textSecondary,
      fontSize: 16,
      textAlign: "center",
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={"down"}
      onSwipeComplete={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Time</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.closeButton}>Fechar</Text>
          </Pressable>
        </View>
        
        <View style={styles.grid}>
          {Array.from({ length: 6 }, (_, index) => {
            const pokemon = team[index];
            return (
              <View 
                key={index}
                style={[
                  styles.slot,
                  pokemon && styles.slotFilled
                ]}
              >
                {pokemon ? (
                  <>
                    <Pressable 
                      style={styles.removeButton}
                      onPress={() => onRemovePokemon(pokemon.name)}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </Pressable>
                    <View style={styles.slotContent}>
                      <Image width={50} height={50} source={{uri: pokemon.image}}/>
                      <Text style={styles.slotName}>{pokemon.name}</Text>
                    </View>
                  </>
                ) : (
                  <View style={styles.slotContent}>
                    <Text style={styles.slotText}>Slot Vazio</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        
        {team.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Seu time está vazio!{'\n'}
              Adicione Pokémons tocando no ❤️ na lista.
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};
