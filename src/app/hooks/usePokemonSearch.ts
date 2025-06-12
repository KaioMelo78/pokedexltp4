import { useState, useEffect } from "react";
import { PokemonListItem } from "../types/pokemon";

export const usePokemonSearch = (pokemons: PokemonListItem[]) => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListItem[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) => 
        pokemon.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (pokemons.indexOf(pokemon) + 1).toString().includes(searchText)
      );
      setFilteredPokemons(filtered);
    }
  }, [searchText, pokemons]);

  return {
    searchText,
    filteredPokemons,
    handleSearch,
    hasResults: filteredPokemons.length > 0,
  };
};
