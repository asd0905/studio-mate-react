export interface IPokemonProps {
    name: string;
    url: string;
    id: string;
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