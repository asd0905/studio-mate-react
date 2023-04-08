import { atom } from "recoil";
import { IPokemonProps } from "../interfaces/interface";

export const pokemonsAtom = atom<IPokemonProps[]>({
    key: 'pokemons',
    default: [],
})

export const searchPokemonsAtom = atom<IPokemonProps[]>({
    key: 'searchPokemon',
    default: [],
})

export const searchIdAtom = atom({
    key: 'searchId',
    default: ''
})

export const pokemonAtom = atom({
    key: 'pokemon',
    default: {},
})

export const isListLoadedAtom = atom({
    key: 'isListLoaded',
    default: false,
})

export const isEmptyAtom = atom({
    key: 'isEmpty',
    default: false,
})