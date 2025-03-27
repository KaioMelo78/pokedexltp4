import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { CaretRight, Gear, MagnifyingGlass } from 'phosphor-react-native';
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { fetchPokemon } from "./services/api";
import { PokemonListItem } from "./types/pokemon";

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemon();
      const fetchPokemonsData: PokemonListItem[] = await Promise.all(
        data.map(async (item: {name: string; url: string}) => {
          const response = await fetch(item.url);
          const details = await response.json();

          return {
            name: item.name,
            Image: details.sprites.front_default,
          };
        })
      );
      setPokemons(fetchPokemonsData);    
    }
  })
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Pokedéx</Text>
        <Gear size={32} color="#fff"/>
      </View>
      <Text style={styles.info}>
        Encontre seu pokemon pesquisando pelo nome ou 
        por seu código Pokédex.
      </Text>

      <View style={styles.imputContainer}>
        <MagnifyingGlass size={32} color="#fff"/>
        <TextInput style={styles.imput} placeholder="Pesquisar" 
        placeholderTextColor="#fff"/>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Todos os pokemons</Text>

        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Image source={{uri: item.image}}/>
                <View>
                  <Text>#001</Text>
                  <Text>{item.name}</Text>
                </View>
              </View>

              <Link 
                href={{
                pathname: "/pokemon/[id]",
                params: {
                  id: 2,
                },
              }}>
            <CaretRight size={32} />
          </Link>
        </View>
          
        )}
        />
        
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.buttonFooter}>
          <Text style={styles.buttonText}>Conhecer um pokemon</Text>
        </Pressable>
      </View> 
    </View>
  );
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7776a",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    padding: 20,
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imputContainer: {
    backgroundColor: "#f98e80",
    marginHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    padding: 10,
    gap: 15,
    alignItems: "center",
    marginBottom: 25,
  },
  imput: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 15,
  },
  footer: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#f2f2f2",
    padding: 25,
  },
  buttonFooter: {
    backgroundColor: "#f7776a",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 15,
    elevation: 5,
    justifyContent: "space-between",
    borderRadius: 25,
  },
  cardInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contentText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});