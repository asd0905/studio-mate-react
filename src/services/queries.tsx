import { useInfiniteQuery, useQuery } from "react-query";
import { getPokemons, searchPokemon } from "./api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isEmptyAtom, pokemonsAtom, searchIdAtom, searchPokemonsAtom } from "../atoms/atoms";
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
    const seIsEmpty = useSetRecoilState(isEmptyAtom)
    return useQuery(
        [`pokemon_${searchId}`],
        () => searchPokemon(searchId),
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(searchId),
            onError: () => {
                console.log('에러 발생');
                setSearchPokemon([]);
                seIsEmpty(true);
            },
            onSuccess: (data) => {
                setSearchPokemon([
                    {
                        ...data.species,
                        id: data.species.url.split('/')[6]
                    }
                ]);
            }
        }
    )
}