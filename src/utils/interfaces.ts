export interface DefaultResponse<T> {
    count: number
    next?: string
    previous?: string
    results: T[]
}

export interface PokemonType {
    name: string
    url: string
    checked: boolean
}

export interface Pokemon {
    name: string
    url: string
}

export interface PokemonDetail {
    abilities: any
    base_experience: number
    cries: any
    forms: any
    game_indices: any
    height: number
    held_items: any
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: any
    name: string
    order: number
    past_abilities: any
    past_types: any
    species: any
    sprites: Sprites
    stats: any
    types: {
        slot: number
        type: PokemonType
    }[]
    weight: number
}

interface Sprites {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
}

export interface PokemonByType {
    damage_relations: any
    game_indices: any
    generations: any
    move_damage_class: any
    moves: any
    name: string
    names: any
    past_damage_relations: any
    pokemon: PokemonByTypeDetail[]
    sprites: any
}

interface PokemonByTypeDetail {
    pokemon: Pokemon
    slot: number
}