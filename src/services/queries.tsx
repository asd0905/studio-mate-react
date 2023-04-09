import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getEvolutionChains, getPokemon, getPokemonSpecies, getPokemons, searchPokemon } from "./api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isEmptyAtom, pokemonEvolvChainAtom, pokemonsAtom, searchIdAtom, searchPokemonsAtom } from "../atoms/atoms";
import { ILastpageProps, IPokemonProps } from '../interfaces/interface';
import { pokemonAtom } from "../atoms/atoms";

// 무한 스크롤
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

// 검색
export const UseSearchQuery = () => {
    const searchId = useRecoilValue(searchIdAtom);
    const setSearchPokemon = useSetRecoilState(searchPokemonsAtom);
    const seIsEmpty = useSetRecoilState(isEmptyAtom)
    return useQuery(
        [`pokemon`, searchId],
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

// 상세 페이지
export const UsePokemonQuery = (pokemonId: string) => {
    const setPokemon = useSetRecoilState(pokemonAtom);
    const queryClient = useQueryClient();
    return useQuery(
        [pokemonId],
        () => getPokemonSpecies(pokemonId),
        {
            refetchOnWindowFocus: false,
            onSuccess: (pokemonData) => {
                const pokemonKoName = pokemonData.names.find((e: any) => e.language.name === 'ko');
                setPokemon({ ...pokemonData, name: pokemonKoName.name });
                queryClient.setQueryData([pokemonId], { ...pokemonData, name: pokemonKoName.name });
            },
        }
    )
}

// 진화 체인
export const UseEvolutionChaninQuery = (pokemonId: string) => {
    const queryClient = useQueryClient();
    const pokemon = queryClient.getQueryData(pokemonId) as any;
    const goupId = pokemon?.evolution_chain?.url.split('/')[6];
    const setPokemonEvolvChain = useSetRecoilState(pokemonEvolvChainAtom);
    return useQuery(
        ['evolvChain', goupId],
        () => getEvolutionChains(goupId),
        {
            enabled: !!goupId,
            refetchOnWindowFocus: false,
            onSuccess: (evolvChainData) => {
                const evolvChainArr = [] as any;
                const chain = evolvChainData.chain;
                evolvChainArr.push({ ...chain.species, id: chain.species.url.split('/')[6] });
                const chainFn = (arr: any[]) => {
                    if (arr.length === 0) {
                        return;
                    }
                    arr.forEach(e => {
                        evolvChainArr.push({ ...e.species, id: e.species.url.split('/')[6] });
                        if (e.evolves_to.length > 0) {
                            chainFn(e.evolves_to);
                        }
                    });
                }
                chainFn(chain.evolves_to);
                setPokemonEvolvChain({ ...pokemon, evolvChain: evolvChainArr });
                queryClient.setQueryData([pokemonId], { ...pokemon, evolvChain: evolvChainArr });
            }
        }
    )
}