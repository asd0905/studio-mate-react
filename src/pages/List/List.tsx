import { Outlet, useLocation } from "react-router-dom";
import { UseInfiniteQuery, UseSearchQuery } from "../../services/queries";
import CLoading from "../../components/Loading/Loading";
import CList from "../../components/List/List";
import CForm from "../../components/Form/Form";
import Meta from "../../components/Meta/Meta";
import { pokemonsAtom } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { POKEMON_IMG_URL } from "../../constants";
import { IPokemonProps } from "../../interfaces/interface";

const List = () => {
    const pokemons = useRecoilValue<IPokemonProps[]>(pokemonsAtom);
    const location = useLocation();

    // 무한 스크롤
    const { isFetching, refetch, remove } = UseInfiniteQuery();

    // 검색
    const { isLoading: isSearchLoading } = UseSearchQuery();
    return (
        <>
            <Meta
                name={pokemons[0]?.name} id={pokemons[0]?.id || ''}
                image={`${POKEMON_IMG_URL}/${pokemons[0]?.id}.png`}
            />
            {(isFetching || isSearchLoading) && <CLoading />}
            {location.pathname !== '/' ? <Outlet /> : null}

            <div style={{
                display: location.pathname === '/' ? 'block' : 'none'
            }}>
                <CForm remove={remove} refetch={refetch} />
                <CList />
            </div>
        </>
    )
};

export default List;
