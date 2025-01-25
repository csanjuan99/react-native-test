import {PokemonProfile} from "@/types/pokemon.type";

export function sortElements(array: PokemonProfile[]) {
    return [...array].sort((a: PokemonProfile, b: PokemonProfile) => a.height - b.height);
}
