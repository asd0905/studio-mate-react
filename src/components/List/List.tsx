import { useRecoilValue, useSetRecoilState } from "recoil";
import { IPokemonProps } from "../../interfaces/interface";
import CThumbnail from "../Thumbnail/Thumbnail";
import { searchPokemonsAtom } from "../../atoms/atoms";
import { isEmptyAtom } from "../../atoms/atoms";
import { pokemonsAtom } from "../../atoms/atoms";
import { SLayout } from "./List.style";
import { useCallback, useEffect } from "react";
import { throttle } from "lodash";
import { UseInfiniteQuery } from "../../services/queries";
import { useLocation } from "react-router-dom";

const CList = (props: any) => {
    const searchPokemon = useRecoilValue(searchPokemonsAtom);
    const isEmpty = useRecoilValue(isEmptyAtom);
    const pokemons = useRecoilValue(pokemonsAtom);
    const setIsEmpty = useSetRecoilState(isEmptyAtom);
    const location = useLocation();

    // 무한 스크롤
    const {
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = UseInfiniteQuery();

    const handleScroll = useCallback(
        throttle(() => {
            setIsEmpty(false);
            if (location.pathname !== '/') {
                return;
            }
            if (window.scrollY + window.outerHeight >= document.body.clientHeight) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }, 500),
        [hasNextPage, isFetchingNextPage, fetchNextPage, location]
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [hasNextPage, isFetchingNextPage, handleScroll]);
    return (
        <SLayout>
            {
                isEmpty ? (
                    <div>데이터가 없습니다.</div>
                ) : searchPokemon.length > 0 ? (
                    searchPokemon.map((pokemon: IPokemonProps) => (
                        <CThumbnail
                            key={pokemon.id}
                            pokemon={pokemon}
                            handleNavigation={props.handleNavigation} />
                    ))
                ) : (
                    pokemons.map((pokemon: IPokemonProps) => (
                        <CThumbnail
                            key={pokemon.id}
                            pokemon={pokemon}
                            handleNavigation={props.handleNavigation} />
                    ))
                )
            }
        </SLayout>
    )
}

export default CList;