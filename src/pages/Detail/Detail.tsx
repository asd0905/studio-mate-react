import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pokemonAtom } from "../../atoms/atoms";
import { getEvolutionChains, getPokemon } from "../../services/api";
import { Helmet } from "react-helmet-async";

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
                        <Helmet>
                            <title>{pokemon.name}</title>
                            <meta name="description" content={pokemon.name} />
                            <meta property="og:type" content="website" />
                            <link href={pokemon.sprites.front_default} />
                            <meta property="og:url" content={`${process.env.PUBLIC_URL}/${pokemon.id}`} />
                            <meta name="og:title" content={pokemon.name} />
                            <meta name="og:description" content={pokemon.name} />
                            <meta property="og:image" content={pokemon.sprites.front_default} />
                            <meta property="og:image:width" content={pokemon.sprites.front_default} />
                            <meta property="og:image:height" content={pokemon.sprites.front_default} />
                        </Helmet>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                )
            }
        </>
    )
}
export default Detail;