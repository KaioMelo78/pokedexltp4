import { Text, View, Image, StyleSheet } from 'react-native';

export default function Pokemon() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                source={require("../assets/bulbasaur.png")
                }
                resizeMode="contain"
                style={{ width: 120, height: 120 }} 
                />
            </View>

            <Text style={styles.namePokemon} >Bulbasaur</Text>

            <View style={styles.infoPokemon}>
                <View style={styles.info}>
                    <Text style={styles.infoText1}>0.9m</Text>
                    <Text>Altura</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoText1}>6.9kg</Text>
                    <Text>Peso</Text>
                </View>
            </View>
            <Text style={styles.namePokemon} >Evoluções</Text>

            <View style={styles.footer}>
                <View style={styles.footerCardContainer}>
                    <View style={styles.footerCard}>
                    <Image 
                    source={require("../assets/bulbasaur.png")
                    }
                    resizeMode="contain"
                    style={{ width: 80, height: 80 }} 
                    />
                    </View>    
                    <Text>Bulbasaur</Text>
                </View>
                <View style={styles.footerCardContainer}>
                    <View style={styles.footerCard}>
                    <Image 
                    source={require("../assets/bulbasaur.png")
                    }
                    resizeMode="contain"
                    style={{ width: 80, height: 80 }} 
                    />
                    </View>    
                    <Text>Bulbasaur</Text>
                </View>
                <View style={styles.footerCardContainer}>
                    <View style={styles.footerCard}>
                    <Image 
                    source={require("../assets/bulbasaur.png")
                    }
                    resizeMode="contain"
                    style={{ width: 80, height: 80 }} 
                    />
                    </View>    
                    <Text>Bulbasaur</Text>
                </View>
                
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