import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { pokemonAtom, pokemonEvolvChainAtom } from "../../atoms/atoms";
import Meta from "../../components/Meta/Meta";
import { POKEMON_IMG_URL } from "../../constants";
import { UseEvolutionChaninQuery, UsePokemonQuery } from "../../services/queries";
import CLoading from "../../components/Loading/Loading";
import { SDetail } from "./Detail.style";
import { IPokemonProps } from "../../interfaces/interface";
import CThumbnail from "../../components/Thumbnail/Thumbnail";
import styled from "styled-components";

const SEvolvChain = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
`;

const Detail = () => {
    const { pokemonId } = useParams();
    const pokemon = useRecoilValue<any>(pokemonAtom);
    const pokemonEvolvChain = useRecoilValue<any>(pokemonEvolvChainAtom)
    const { isLoading: isPokemonLoading, data: pokemonData } = UsePokemonQuery(pokemonId || '');
    const navigate = useNavigate();

    const { isLoading: isEvolChainsLoading, data: EvolChainsData } = UseEvolutionChaninQuery(pokemonId || '');
    const handleNavigation = (id: string) => {
        navigate(`/${id}`);
    }
    return (
        <>
            {
                isPokemonLoading ? <CLoading /> : (
                    <>
                        <Meta
                            name={pokemon.name}
                            id={pokemon.id}
                            image={`${POKEMON_IMG_URL}/${pokemon.id}.png`}
                        />
                        <SDetail>
                            <h1>{pokemon.name}</h1>
                            <img src={`${POKEMON_IMG_URL}/${pokemon.id}.png`} alt={pokemon.name} />
                            <h3>진화단계</h3>
                            <SEvolvChain>
                                {pokemonEvolvChain?.evolvChain && pokemonEvolvChain?.evolvChain.length > 0 ? (
                                    pokemonEvolvChain?.evolvChain.map((d: IPokemonProps) => (
                                        <CThumbnail key={d.id} pokemon={d} handleNavigation={handleNavigation} />
                                    ))) : null
                                }
                            </SEvolvChain>
                        </SDetail>
                    </>
                )
            }
        </>
    )
}
export default Detail;