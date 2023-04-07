import { useInfiniteQuery } from "react-query";
import { getPokemons } from "./api";
import { useSetRecoilState } from "recoil";
import { pokemonsAtom } from "../atoms/atoms";
import { ILastpageProps, IpokemonProps } from '../interfaces/interface';

export const UseInfiniteQuery = () => {
    const setPokemons = useSetRecoilState(pokemonsAtom);
    return useInfiniteQuery('pokemons', getPokemons, {
        getNextPageParam: (lastPage: ILastpageProps) => {
            return lastPage.nextPage;
        },
        onSuccess: (data) => {
            setPokemons((prev: IpokemonProps[]) => {
                const combinArr = data.pages.reduce((acc: any, curr) => [...acc, ...curr.data.results], []);
                const newArr = combinArr.map((d: any) => {
                    return { ...d, id: d.url.split('/')[6] }
                })
                return newArr;
            })
        }
    })
}