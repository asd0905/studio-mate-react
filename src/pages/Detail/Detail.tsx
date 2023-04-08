import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pokemonAtom } from "../../atoms/atoms";
import { getEvolutionChains, getPokemon } from "../../services/api";

const Detail = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useRecoilState<any>(pokemonAtom);
    const { isLoading: isPokemonLoading, data: pokemonData } = useQuery(
        [pokemonId],
        () => getPokemon(pokemonId || ''),
        {
            refetchOnWindowFocus: false,
            onSuccess: (pokemonData) => {
                // const koName = pokemonData.data.names.find((name: any) => name.language.name === "ko");
                // console.log(koName);
                console.log(pokemonData);
                setPokemon(pokemonData);
            },
        }
    );

    const { isLoading: isEvolChainsLoading, data: EvolChainsData } = useQuery(
        [`${pokemonId}EvolutionChains`, pokemonId],
        () => getEvolutionChains(pokemonId || ''),
        {
            onSuccess: EvolChainsData => {
                console.log(EvolChainsData);
            },
            refetchOnWindowFocus: false,
        }
    )

    return (
        <>
            {
                isPokemonLoading ? <div>Loading...</div> : (
                    <div>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                )
            }
        </>
    )
}
export default Detail;