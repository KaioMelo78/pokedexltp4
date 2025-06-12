import { useEffect, useState } from "react";
import { Dimensions, View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { fetchPokemon } from "./services/api";
import { PokemonListItem } from "./types/pokemon";
import Modal from "react-native-modal"; 
import Pokemon from "./pokemon/[id]";
import { Users } from 'phosphor-react-native';

// Hooks
import { useTheme } from "./hooks/useTheme";
import { useTeam } from "./hooks/useTeam";
import { usePokemonSearch } from "./hooks/usePokemonSearch";

// Components
import { AppHeader } from "./components/AppHeader";
import { SearchBar } from "./components/SearchBar";
import { PokemonCard } from "./components/PokemonCard";
import { TeamModal } from "./components/TeamModal";

const {height} = Dimensions.get('window');

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTeamModalVisible, setTeamModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // Custom hooks
  const { isDarkTheme, toggleTheme, themeColors } = useTheme();
  const { team, addToTeam, removeFromTeam, isPokemonInTeam, teamCount } = useTeam();
  const { searchText, filteredPokemons, handleSearch, hasResults } = usePokemonSearch(pokemons);

  const toggleModal = (pokemonName?: string) => {
    if (pokemonName) {
      setSelectedPokemon(pokemonName);
    }
    setModalVisible(!isModalVisible);
  };

  const toggleTeamModal = () => {
    setTeamModalVisible(!isTeamModalVisible);
  };

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemon();
      console.log(fetchPokemon);
      const fetchPokemonsData: PokemonListItem[] = await Promise.all(
        data.map(async (item: {name: string; url: string}) => {
          const response = await fetch(item.url);
          const details = await response.json();

          return {
            name: item.name,
            image: details.sprites.front_default,
          };
        })
      );
      setPokemons(fetchPokemonsData);
    }
    loadPokemons();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.primary,
    },
    info: {
      color: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    content: {
      flex: 1,
      backgroundColor: themeColors.background,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      padding: 15,
    },
    footer: {
      borderWidth: 1,
      backgroundColor: themeColors.background,
      borderColor: themeColors.border,
      padding: 25,
      gap: 10,
    },
    buttonFooter: {
      backgroundColor: themeColors.primary,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      flexDirection: "row",
      gap: 10,
    },
    teamButton: {
      backgroundColor: themeColors.success,
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      flexDirection: "row",
      gap: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    contentText: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 20,
      color: themeColors.text,
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      height: height * 0.8,
      backgroundColor: themeColors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
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

  console.log(pokemons);
  
  return (
    <View style={styles.container}>
      <AppHeader
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
        teamCount={teamCount}
        onOpenTeam={toggleTeamModal}
        themeColors={themeColors}
      />
      
      <Text style={styles.info}>
        Encontre seu pokemon pesquisando pelo nome ou 
        por seu código Pokédex.
      </Text>

      <SearchBar
        searchText={searchText}
        onSearchChange={handleSearch}
        themeColors={themeColors}
      />

      <View style={styles.content}>
        <Text style={styles.contentText}>
          {searchText ? `Resultados para "${searchText}"` : "Todos os pokemons"}
        </Text>

        {!hasResults && searchText ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Nenhum Pokemon encontrado para "{searchText}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredPokemons}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => {
              const originalIndex = pokemons.findIndex(p => p.name === item.name);
              
              return (
                <PokemonCard
                  pokemon={item}
                  index={originalIndex}
                  onPress={() => toggleModal(item.name)}
                  onAddToTeam={() => addToTeam(item)}
                  isInTeam={isPokemonInTeam(item.name)}
                  themeColors={themeColors}
                  isDarkTheme={isDarkTheme}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.teamButton} onPress={toggleTeamModal}>
          <Users size={20} color="#fff" weight="fill" />
          <Text style={styles.buttonText}>Ver Meu Time ({teamCount}/6)</Text>
        </Pressable>
        <Pressable style={styles.buttonFooter}>
          <Text style={styles.buttonText}>Conhecer um pokemon</Text>
        </Pressable>
      </View> 

      {/* Modal do Pokemon */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
        swipeDirection={"down"}
        onSwipeComplete={() => toggleModal()}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Pokemon name={selectedPokemon}/>
        </View>
      </Modal>

      {/* Modal do Time */}
      <TeamModal
        isVisible={isTeamModalVisible}
        onClose={toggleTeamModal}
        team={team}
        onRemovePokemon={removeFromTeam}
        themeColors={themeColors}
        isDarkTheme={isDarkTheme}
      />
    </View>
  );
}
