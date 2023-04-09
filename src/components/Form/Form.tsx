import { useForm } from "react-hook-form";
import { SError, SForm } from "./Form.style";
import { ISearchProps } from "../../interfaces/interface";
import { useSetRecoilState } from "recoil";
import { isEmptyAtom, pokemonsAtom, searchIdAtom, searchPokemonsAtom } from "../../atoms/atoms";

const CForm = (props: any) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ISearchProps>();
    const setIsEmpty = useSetRecoilState(isEmptyAtom);
    const setSearchPokemon = useSetRecoilState(searchPokemonsAtom);
    const setSearchId = useSetRecoilState(searchIdAtom);
    const setPokemons = useSetRecoilState(pokemonsAtom);
    const onHandleSubmit = (data: ISearchProps) => {
        setIsEmpty(false);
        if (!data.pokemonId) {
            props.remove();
            props.refetch().then();
            setSearchPokemon([]);
            setSearchId('');
        } else {
            setSearchId(data.pokemonId);
            setPokemons([]);
            reset();
        }
    }
    return (
        <>
            <SForm onSubmit={handleSubmit(onHandleSubmit)}>
                <input {
                    ...register('pokemonId', {
                        pattern: {
                            value: /\d/,
                            message: '숫자만 입력 가능합니다.'
                        }
                    })}
                    placeholder="포켓몬 번호를 입력해주세요"
                    type='text'
                />
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </button>
            </ SForm>
            <SError>{errors.pokemonId?.message}</SError>
        </>
    )
}

export default CForm;