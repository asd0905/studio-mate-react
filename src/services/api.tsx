import { POKEMON_DETAIL_API, POKEMON_EVOLUTION_CHAIN_API, POKEMON_LIST_API } from "../constants";

export const getPokemons = async ({ pageParam = 0 }): Promise<any> => {
    const queryString = new URLSearchParams({ limit: '20', offset: pageParam.toString() }).toString();
    const response = await fetch(`${POKEMON_LIST_API}?${queryString}`);
    const data = await response.json();
    const hasNextPage = !!data.next;
    return { data, nextPage: pageParam + 20, hasNextPage };
};

export const getPokemon = (pokemonId: string) => {
    return fetch(POKEMON_DETAIL_API.replace(':pokemonId', pokemonId))
        .then(data => data.json());
}

export const getEvolutionChains = (pokemonId: string) => {
    return fetch(POKEMON_EVOLUTION_CHAIN_API.replace(':pokemonId', pokemonId))
        .then(data => data.json());
}