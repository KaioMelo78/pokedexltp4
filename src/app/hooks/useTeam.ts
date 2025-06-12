import { useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokemonListItem } from "../types/pokemon";

const TEAM_STORAGE_KEY = '@pokemon_team';

export const useTeam = () => {
  const [team, setTeam] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o time do AsyncStorage quando o hook é inicializado
  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const savedTeam = await AsyncStorage.getItem(TEAM_STORAGE_KEY);
      if (savedTeam) {
        setTeam(JSON.parse(savedTeam));
      }
    } catch (error) {
      console.error('Erro ao carregar time:', error);
      Alert.alert("Erro", "Não foi possível carregar seu time salvo.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveTeam = async (newTeam: PokemonListItem[]) => {
    try {
      await AsyncStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(newTeam));
    } catch (error) {
      console.error('Erro ao salvar time:', error);
      Alert.alert("Erro", "Não foi possível salvar seu time.");
    }
  };

  const addToTeam = async (pokemon: PokemonListItem) => {
    if (team.length >= 6) {
      Alert.alert("Time Completo!", "Você já tem 6 Pokémons no seu time. Remova um para adicionar outro.");
      return;
    }

    if (team.find(p => p.name === pokemon.name)) {
      Alert.alert("Pokémon já está no time!", "Este Pokémon já faz parte do seu time.");
      return;
    }

    const newTeam = [...team, pokemon];
    setTeam(newTeam);
    await saveTeam(newTeam);
    Alert.alert("Sucesso!", `${pokemon.name} foi adicionado ao seu time!`);
  };

  const removeFromTeam = async (pokemonName: string) => {
    const newTeam = team.filter(p => p.name !== pokemonName);
    setTeam(newTeam);
    await saveTeam(newTeam);
  };

  const isPokemonInTeam = (pokemonName: string) => {
    return team.some(p => p.name === pokemonName);
  };

  const clearTeam = async () => {
    setTeam([]);
    await saveTeam([]);
    Alert.alert("Time Limpo!", "Todos os Pokémons foram removidos do seu time.");
  };

  return {
    team,
    addToTeam,
    removeFromTeam,
    isPokemonInTeam,
    clearTeam,
    teamCount: team.length,
    isTeamFull: team.length >= 6,
    isLoading,
  };
};
