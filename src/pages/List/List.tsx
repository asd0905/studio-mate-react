import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pokemonsAtom, searchIdAtom, searchPokemonsAtom } from "../../atoms/atoms";
import { POKEMON_IMG_URL } from "../../constants";
import { SLayout } from "./List.style";
import { throttle } from 'lodash';
import { UseInfiniteQuery, UseSearchQuery } from "../../services/queries";
import { IPokemonProps, ISearchProps } from "../../interfaces/interface";
import { useForm } from "react-hook-form";

const List = () => {
    const [pokemons, setPokemons] = useRecoilState<IPokemonProps[]>(pokemonsAtom);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISearchProps>();
    const setSearchId = useSetRecoilState(searchIdAtom);
    const [searchPokemon, setSearchPokemon] = useRecoilState<IPokemonProps[]>(searchPokemonsAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
        remove
    } = UseInfiniteQuery();
    const handleScroll = useCallback(
        throttle(() => {
            if (window.scrollY + window.outerHeight >= document.body.clientHeight) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }, 500),
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    const { isLoading: isSearchLoading, data: searchData } = UseSearchQuery();
    const onHandleSubmit = (data: ISearchProps) => {
        if (!data.pokemonId) {
            remove();
            refetch().then();
            setSearchPokemon([]);
        } else {
            setSearchId(data.pokemonId);
            setPokemons([]);
            reset();
        }
    }

    const handleNavigation = (id: string) => {
        navigate(`/${id}`);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [hasNextPage, isFetchingNextPage, handleScroll]);

    return (
        <>
            {location.pathname !== '/' ? <Outlet /> : null}

            <div style={{
                display: location.pathname === '/' ? 'block' : 'none'
            }}>
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <input {
                        ...register('pokemonId', {
                            pattern: {
                                value: /\d/,
                                message: '숫자만 입력 가능합니다.'
                            }

                        })}
                        // value={searchId}
                        // onChange={(e) => setSearchId(Number(e.target.value))}
                        placeholder="포켓몬 번호를 입력해주세요"
                        type='text'
                    />
                </form>
                <p>{errors.pokemonId?.message as string}</p>
                <SLayout>
                    {
                        isSearchLoading ? (
                            <div>Loading...</div>
                        ) : searchPokemon.length > 0 ? (
                            searchPokemon.map(pokemon => (
                                <div key={pokemon.id}>
                                    <div onClick={() => handleNavigation(pokemon.id)}>
                                        <img src={`${POKEMON_IMG_URL}/${pokemon.id}.gif`}
                                            alt={pokemon.name} />
                                        <p>No.{pokemon.id} {pokemon.name}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            pokemons.map(pokemon => (
                                <div key={pokemon.id}>
                                    <div onClick={() => handleNavigation(pokemon.id)}>
                                        <img src={`${POKEMON_IMG_URL}/${pokemon.id}.gif`}
                                            alt={pokemon.name} />
                                        <p>No.{pokemon.id} {pokemon.name}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </SLayout>
            </div>
        </>
    )
};

export default List;
