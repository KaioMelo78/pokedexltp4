import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { api } from '../services/api';

interface Props {
    name?: string | null;
}

interface Evolution {
    name: string;
    image: string;
}
export default function Pokemon({name}: Props) {
    const[pokemon, SetPokemon] = useState<any>(null);
    const [evolutions, setEvolutions] = useState<Evolution[]>([]);

    useEffect(() => {
        const loadPokemon = async () => {
            const response = await api.get(`/pokemon/${name}`);
            SetPokemon(response.data);

            const speciesURL = response.data.species.url;

            const speciesResponse = await api.get(speciesURL);
            const evolutionsURL = speciesResponse.data.evolution_chain.url;

            const evolutionResponse = await api.get(evolutionsURL);
            const evolutions = extractEvolutions(evolutionResponse.data.chain);

            const evolutionImages = await Promise.all(
                evolutions.map(async (evoName) => {
                    const response = await api.get(`/pokemon/${evoName}`);
                    return {
                        name: evoName,
                        image: response.data.sprites.front_default,
                    };
                })
            );
            setEvolutions(evolutionImages);
        }
        loadPokemon();
    }, [name])

    const extractEvolutions = (chain: any): string[] => {
        const evolutions: string[] = [];
        let current = chain;

        while (current) {
            evolutions.push(current.species.name);
            current = current.evolves_to[0];
        }

        return evolutions;
    }

    if (!pokemon) {
        return <Text>Carregando...</Text>
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{width: 150, height: 150}}
                source={{uri: pokemon.sprites.front_default}}/>
            </View>

            <Text style={styles.namePokemon} >{name}</Text>

            <View style={styles.infoPokemon}>
                <View style={styles.info}>
                    <Text style={styles.infoText1}>{pokemon.weight / 10}kg</Text>
                    <Text>Peso</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoText1}>{pokemon.height / 10}m</Text>
                    <Text>Altura</Text>
                </View>
            </View>
            <Text style={styles.namePokemon} >Evoluções</Text>

            <View style={styles.footer}>
                {evolutions.map((evo, index) => (
                    <View key={index} style={styles.footerCardContainer}>
                        <View style={styles.footerCard}>
                            <Image 
                            style={{width: 88, height: 88}}
                            source={{uri: evo.image}}
                            />
                        </View>    
                        <Text>{evo.name}</Text>
                    </View>
                ))}
                
            </View>
        </View>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 25,
    },
    header: {
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25,
    },
    namePokemon: {
        fontSize: 25,
        margin: 20,
        fontWeight: 'bold',
    },
    infoPokemon: {
        flexDirection: 'row',
        gap: 15,
    },
    info: {
        padding: 25,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    infoText1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerCardContainer: {
        width: 88,
        height: 88,
    },
    footerCard: {
        backgroundColor: '#f6f6f6',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 25,   
    },
});