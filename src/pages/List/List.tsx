import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pokemonsAtom } from "../../atoms/atoms";
import { POKEMON_IMG_URL } from "../../constants";
import { SLayout } from "./List.style";
import { throttle } from 'lodash';
import { UseInfiniteQuery } from "../../services/queries";

const List = () => {
    const [pokemons, setPokemons] = useRecoilState(pokemonsAtom);

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = UseInfiniteQuery();

    const handleScroll = useCallback(
        throttle(() => {
            if (Math.floor(document.body.clientHeight - window.innerHeight - window.scrollY) <= 0) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }, 500),
        [hasNextPage, isFetchingNextPage]
    )


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [data, handleScroll]);

    return (
        <SLayout>
            {
                isLoading ? <div>Loading...</div> : (
                    pokemons.map(pokemon => (
                        <div key={pokemon.id}>
                            <Link
                                to={pokemon.id}
                                state={{ pokemonName: pokemon.name }}
                            >
                                <img src={`${POKEMON_IMG_URL}/${pokemon.id}.png`}
                                    alt={pokemon.name} />
                                <p>No.{pokemon.id} {pokemon.name}</p>
                            </Link>
                        </div>
                    ))
                )
            }
        </SLayout>
    )
};

export default List;
