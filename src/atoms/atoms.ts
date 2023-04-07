import { atom } from "recoil";
import { IpokemonProps } from "../interfaces/interface";

export const pokemonsAtom = atom<IpokemonProps[]>({
    key: 'pokemons',
    default: [],
})

export const pokemonAtom = atom({
    key: 'pokemon',
    default: {},
})

export const isListLoadedAtom = atom({
    key: 'isListLoaded',
    default: false,
})