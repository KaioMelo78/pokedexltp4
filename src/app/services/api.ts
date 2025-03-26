import axios from "axios";

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});


export const fetchPokemon = async (limit: number = 20, offset: number = 0) => {
    try {
        const response = await api.get(`/pokmeon?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}