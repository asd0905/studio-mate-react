import { useInfiniteQuery, useQuery } from "react-query";
import { getPokemons, searchPokemon } from "./api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pokemonsAtom, searchIdAtom, searchPokemonsAtom } from "../atoms/atoms";
import { ILastpageProps, IPokemonProps } from '../interfaces/interface';

export const UseInfiniteQuery = () => {
    const setPokemons = useSetRecoilState(pokemonsAtom);
    return useInfiniteQuery('pokemons', getPokemons, {
        getNextPageParam: (lastPage: ILastpageProps) => {
            return lastPage.nextPage;
        },
        onSuccess: (data) => {
            setPokemons((prev: IPokemonProps[]) => {
                const combinArr = data.pages.reduce((acc: any, curr) => [...acc, ...curr.data.results], []);
                const newArr = combinArr.map((d: any) => {
                    return { ...d, id: d.url.split('/')[6] }
                })
                return newArr;
            })
        },
        refetchOnWindowFocus: false,
        onError: () => {
            console.log('에러 발생');
        }
    })
}

export const UseSearchQuery = () => {
    const searchId = useRecoilValue(searchIdAtom);
    const setSearchPokemon = useSetRecoilState(searchPokemonsAtom);
    return useQuery(
        [`pokemon_${searchId}`],
        async () => {
            try {
                const data = await searchPokemon(searchId);
                setSearchPokemon([
                    {
                        ...data.species,
                        id: data.species.url.split('/')[6]
                    }
                ]);
                return data;
            } catch (error) {
                console.log('에러 발생');
            }
        },
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(searchId),
            onError: () => {
                console.log('에러 발생');
            },
        }
    )
}