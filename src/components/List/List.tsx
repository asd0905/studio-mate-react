import { useRecoilValue } from "recoil";
import { IPokemonProps } from "../../interfaces/interface";
import CThumbnail from "../Thumbnail/Thumbnail";
import { searchPokemonsAtom } from "../../atoms/atoms";
import { isEmptyAtom } from "../../atoms/atoms";
import { pokemonsAtom } from "../../atoms/atoms";
import { SLayout } from "./List.style";

const CList = (props: any) => {
    const searchPokemon = useRecoilValue(searchPokemonsAtom);
    const isEmpty = useRecoilValue(isEmptyAtom);
    const pokemons = useRecoilValue(pokemonsAtom);
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