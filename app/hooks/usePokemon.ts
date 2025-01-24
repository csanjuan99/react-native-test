import {useEffect, useMemo, useState} from "react";
import {PokemonData, PokemonProfile} from "@/types/pokemon.type";
import {sortElements} from "@/utils";

export const usePokemon = () => {
    const [data, setData] = useState<PokemonData[]>([]);
    const [pokemons, setPokemons] = useState<PokemonProfile[]>([]);

    const fetchPokemonProfile = async () => {
        const pokemons: PokemonProfile[] = await Promise.all(
            data.map(async (pokemon: PokemonData) => {
                const response = await fetch(pokemon.url);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return await response.json();
            })
        );
        setPokemons(sortElements(pokemons));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v2/pokemon`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            setData(data.results);
        }


        fetchData().then(() => true);

    }, []);

    useMemo(() => fetchPokemonProfile(), [data]);


    return {
        data: pokemons,
    }
}
