import {sortElements} from '@/utils';
import {VStack} from '@/components/ui/vstack';
import PokemonTable from '@/components/Table/PokemonTable';
import {useEffect, useState} from 'react';
import {PokemonProfile} from '@/types/pokemon.type';
import {usePokemon} from '@/hooks/usePokemon';
import {ScrollView} from 'react-native';

export default function HomeScreen() {
    const {data} = usePokemon();

    const [pokemons, setPokemons] = useState<PokemonProfile[]>([]);
    const [favorites, setFavorites] = useState<PokemonProfile[]>([]);

    useEffect(() => {
        if (data.length) {
            setPokemons(data);
        }
    }, [data]);

    // Mover de "No favoritos" a "Favoritos"
    const handleFavorite = (pokemon: PokemonProfile) => {
        const list: PokemonProfile[] = pokemons.filter((_pokemon: PokemonProfile) => _pokemon.id !== pokemon.id);
        setPokemons([...list]);

        const sorted: PokemonProfile[] = sortElements([...favorites, pokemon]);
        setFavorites(sorted);
    };

    // Mover de "Favoritos" a "No favoritos"
    const handleNotFavorite = (pokemon: PokemonProfile) => {
        const list: PokemonProfile[] = favorites.filter((_pokemon: PokemonProfile) => _pokemon.id !== pokemon.id);
        setFavorites([...list]);

        const sorted: PokemonProfile[] = sortElements([...pokemons, pokemon]);
        setPokemons(sorted);
    };

    return (
        <VStack className="p-4 flex gap-4">
            <ScrollView>
                {/* Tabla con “No favoritos” */}
                <PokemonTable
                    props={{
                        data: pokemons,
                        title: 'Pokemones',
                        onPress: handleFavorite,
                    }}
                />

                {/* Tabla con “Favoritos” */}
                <PokemonTable
                    props={{
                        data: favorites,
                        title: 'Favoritos',
                        caption: 'Lista de pokemones favoritos',
                        onPress: handleNotFavorite,
                    }}
                />
            </ScrollView>
        </VStack>
    );
}
