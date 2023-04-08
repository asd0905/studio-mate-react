import React from "react";
import { POKEMON_IMG_URL } from "../constants";
import { IPokemonProps } from "../interfaces/interface";
import { SThumnail } from './Thumbnail/Thumbnail.style';

const Thumbnail = ({ pokemon, handleNavigation }: { pokemon: IPokemonProps, handleNavigation: (id: string) => void }) => {
    return (
        <SThumnail>
            <div onClick={() => handleNavigation(pokemon.id)}>
                <img src={`${POKEMON_IMG_URL}/${pokemon.id}.png`}
                    alt={pokemon.name} />
                <p>No.{pokemon.id} {pokemon.name}</p>
            </div>
        </SThumnail>
    )
}

export default Thumbnail;