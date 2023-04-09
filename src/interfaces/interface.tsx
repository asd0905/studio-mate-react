export interface IPokemonProps {
    name: string;
    url: string;
    id?: string;
}

export interface ISearchProps {
    pokemonId: string;
}

export interface ILastpageResultsProps {
    name: string;
    url: string;
}

export interface ILastpageDataProps {
    count: number;
    next: string;
    results: ILastpageResultsProps[];
}

export interface ILastpageProps {
    data: ILastpageDataProps;
    hasNextPage: boolean;
    nextPage: number;
}

export interface IMetaProps {
    name: string;
    id: string;
    image: string;
}

export interface ITypeProps {
    name: string;
    url: string;
}

export interface ITypesProps {
    slot: number;
    type: ITypeProps;
}