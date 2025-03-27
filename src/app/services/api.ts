import axios from "axios";

export const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});


export const fetchPokemon = async (limit: number = 51, offset: number = 0) => {
    try {
        const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return "ah";
    }
}