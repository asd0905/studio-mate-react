import { POKEMON_IMG_URL } from "../../constants";
import { SThumnail } from "./Thumbnail.style";

const CThumbnail = ({ pokemon, handleNavigation }: any) => {
    return (
        <SThumnail>
            <div onClick={() => handleNavigation ? handleNavigation(pokemon.id) : null}>
                <img src={`${POKEMON_IMG_URL}/${pokemon.id}.png`}
                    alt={pokemon.name} />
                <p>No.{pokemon.id} {pokemon.name}</p>
            </div>
        </SThumnail>
    )
}

export default CThumbnail;