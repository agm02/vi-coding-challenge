import type { DefaultResponse, Pokemon, PokemonByType, PokemonDetail, PokemonType } from "./interfaces";

const API_URL = 'https://pokeapi.co/api/v2/'

export async function getAllTypes(limit: number = 30): Promise<DefaultResponse<PokemonType>> {
    const response = await fetch(API_URL + 'type?limit=' + limit);

    if (!response.ok) {
        throw new Error(`Error fetching types: ${response.status}`);
    }

    const data: DefaultResponse<PokemonType> = await response.json();
    let allTypes: DefaultResponse<PokemonType> = data
    if (data.results) {
        allTypes.results = data.results.map(d => {
            d.checked = false
            return d
        })
    }
    return allTypes;
}

export async function getAllPokemons(offset: number = 0, limit: number = 20): Promise<DefaultResponse<Pokemon>> {
    const response = await fetch(API_URL + 'pokemon?offset=' + offset + '&limit=' + limit);

    if (!response.ok) {
        throw new Error(`Error fetching pokemons: ${response.status}`);
    }

    const data: DefaultResponse<Pokemon> = await response.json();
    return data;
}

export async function getAllPokemonsByType(typeName: string): Promise<PokemonByType> {
    const response = await fetch(API_URL + 'type/' + typeName);

    if (!response.ok) {
        throw new Error(`Error fetching pokemons by type: ${response.status}`);
    }

    const data: PokemonByType = await response.json();
    return data;
}

export async function getPokemonDetail(url: string): Promise<PokemonDetail> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching pokemon details: ${response.status}`);
    }

    const data: PokemonDetail = await response.json();
    return data;
}