import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pokemonAtom } from "../../atoms/atoms";
import { getEvolutionChains, getPokemon } from "../../services/api";

const Detail = () => {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useRecoilState<any>(pokemonAtom);
    const location = useLocation();
    const pokemonName = location.state.pokemonName;
    const { isLoading: isPokemonLoading, data: pokemonData } = useQuery(
        [pokemonName, pokemonId], () => getPokemon(pokemonId || ''), {
        onSuccess: (pokemonData) => {
            console.log(pokemonData);
            setPokemon(pokemonData);
        }
    });
    const { isLoading: isEvolChainsLoading, data: EvolChainsData } = useQuery(
        [`${pokemonName}EvolutionChains`, pokemonId], () => getEvolutionChains(pokemonId || ''), {
        onSuccess: EvolChainsData => {
            console.log(EvolChainsData);
        }
    })
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