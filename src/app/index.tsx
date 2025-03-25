import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { CaretRight, Gear, MagnifyingGlass } from 'phosphor-react-native';

export default function Index() {
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
        <Text>Todos os pokemons</Text>

        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Image source={require("../app/assets/bulbasaur.png")} />
            <View></View>
          </View>
          <CaretRight size={32} color="#fff"  />
        </View>
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
  },
});