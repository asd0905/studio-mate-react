import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isEmptyAtom, pokemonsAtom, searchIdAtom, searchPokemonsAtom } from "../../atoms/atoms";
import { SLayout, SLoading } from "./List.style";
import { throttle } from 'lodash';
import { UseInfiniteQuery, UseSearchQuery } from "../../services/queries";
import { IPokemonProps, ISearchProps } from "../../interfaces/interface";
import { useForm } from "react-hook-form";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import styled from "styled-components";

const SForm = styled.form`
        padding: 10px;
        display: flex;
        input {
            width: 100%;
            padding: 0 20px;
        }
        button {
            background-color: #ffffff;
            width: 50px;
            height: 50px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            flext: 0 0 auto;
            border-left: 0;
            svg {
                padding: 0;
                width: 20px;
                
            }
        }
    `

const List = () => {
    const [pokemons, setPokemons] = useRecoilState<IPokemonProps[]>(pokemonsAtom);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISearchProps>();
    const setSearchId = useSetRecoilState(searchIdAtom);
    const [searchPokemon, setSearchPokemon] = useRecoilState<IPokemonProps[]>(searchPokemonsAtom);
    const [isEmpty, setIsEmpty] = useRecoilState(isEmptyAtom);
    const navigate = useNavigate();
    const location = useLocation();

    // 무한 스크롤
    const {
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
        remove
    } = UseInfiniteQuery();
    const handleScroll = useCallback(
        throttle(() => {
            setIsEmpty(false);
            if (window.scrollY + window.outerHeight >= document.body.clientHeight) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }, 500),
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    // 검색
    const { isLoading: isSearchLoading, data: searchData, isFetching: isSearchFetching } = UseSearchQuery();
    const onHandleSubmit = (data: ISearchProps) => {
        console.log(data);
        setIsEmpty(false);
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

    // 상세페이지 이동
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
            {(isFetching || isSearchLoading) &&
                <SLoading>
                    <svg color="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                    </svg>
                </SLoading>
            }
            {location.pathname !== '/' ? <Outlet /> : null}

            <div style={{
                display: location.pathname === '/' ? 'block' : 'none'
            }}>
                <SForm onSubmit={handleSubmit(onHandleSubmit)}>
                    <input {
                        ...register('pokemonId', {
                            pattern: {
                                value: /\d/,
                                message: '숫자만 입력 가능합니다.'
                            }
                        })}
                        placeholder="포켓몬 번호를 입력해주세요"
                        type='text'
                    />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </button>
                </ SForm>
                <SLayout>
                    {
                        isEmpty ? (
                            <div>데이터가 없습니다.</div>
                        ) : searchPokemon.length > 0 ? (
                            searchPokemon.map((pokemon: IPokemonProps) => (
                                <Thumbnail
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                    handleNavigation={handleNavigation} />
                            ))
                        ) : (
                            pokemons.map((pokemon: IPokemonProps) => (
                                <Thumbnail
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                    handleNavigation={handleNavigation} />
                            ))
                        )
                    }
                </SLayout>
            </div>
        </>
    )
};

export default List;
