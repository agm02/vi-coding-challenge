import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { cardStyles, globalStyles } from './styles/main'
import type { Pokemon, PokemonDetail, PokemonType } from './utils/interfaces'
import { getAllPokemons, getAllPokemonsByType, getPokemonDetail } from './utils/api'
import { TYPE_COLOR } from './utils/colors'

/**
 * Pokémon list component
 */
@customElement('pokemon-list')
export class PokemonList extends LitElement {
  @state() allPokemons: Pokemon[] = [];
  @state() pokemonsDetailArray: PokemonDetail[] = [];
  @state() hasPrev: boolean = false;
  @state() hasNext: boolean = false;
  @state() isLoading: boolean = false;

  /**
   * List of Pokémons
   */
  @property({ type: Array })
  pokemonTypes: PokemonType[] = [];

  /**
   * List offset
   */
  @property({ type: Number })
  listOffset: number = 0

  /**
   * Number of items displayed
   */
  @property({ type: Number })
  listLimit: number = 20

  /**
   * Function that will monitor any change in the properties, to update the Pokémon list
   * @param changedProperties 
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('pokemonTypes')) {
      this.listOffset = 0
    }

    if (changedProperties.has('listOffset') || changedProperties.has('listLimit') || changedProperties.has('pokemonTypes')) {
      this.fetchAllPokemons()
    }
  }

  /**
   * Function that fetches all the needed Pokémons
   */
  private async fetchAllPokemons() {
    this.isLoading = true

    if (this.pokemonTypes.length !== 0) {
      try {
        let pokemonArray: Pokemon[] = []
        for (let i = 0; i < this.pokemonTypes.length; i++) {
          const allPokemonByType = (await getAllPokemonsByType(this.pokemonTypes[i].name))
          const tempPokemonByTypeSet = new Set(allPokemonByType.pokemon.map(pType => pType.pokemon.name));

          if (pokemonArray.length === 0 && i === 0) {
            allPokemonByType.pokemon.forEach(pType => pokemonArray.push(pType.pokemon))
          } else {
            pokemonArray = pokemonArray.filter(pType => tempPokemonByTypeSet.has(pType.name))
          }
        }

        const currLimit = this.listOffset + this.listLimit
        const details = await Promise.all(
          pokemonArray.slice(this.listOffset, currLimit).map(pokemon => getPokemonDetail(pokemon.url))
        );

        this.pokemonsDetailArray = details.sort((a, b) => a.id - b.id)
        this.hasPrev = this.listOffset > 0
        this.hasNext = pokemonArray.length > currLimit
      } catch (e) {
        console.error('Failed to fetch data', e);
      }
    } else {

      try {
        const currPokemons = (await getAllPokemons(this.listOffset, this.listLimit))
        this.allPokemons = currPokemons.results;
        this.hasPrev = currPokemons.previous != null
        this.hasNext = currPokemons.next != null
        const details = await Promise.all(
          this.allPokemons.map(pokemon => getPokemonDetail(pokemon.url))
        );
        
        this.pokemonsDetailArray = []
        this.pokemonsDetailArray = details.sort((a, b) => a.id - b.id)

      } catch (e) {
        console.error('Failed to fetch data', e);
      }
    }

    this.isLoading = false
  }

  private prevPage() {
    this.listOffset = Math.max(0, this.listOffset - this.listLimit);
  }

  private nextPage() {
    this.listOffset += this.listLimit;
  }

  render() {
    if (this.isLoading) return html`<p>Loading...</p>`

    return html`
      <div class="grid">
        ${this.pokemonsDetailArray.map(pokemon => html`
          <div>
            <div class="card pokemon-card">
              <span class="pokemon-id">#${pokemon.id}</span>
              <img style="${pokemon.sprites.front_default !== null ? '' : 'padding: 2rem'}" src="${pokemon.sprites.front_default !== null 
                ? pokemon.sprites.front_default
                : '/pokemon_default.png'}"/>
            </div>
            <div class="pokemon-title">
              <span>${pokemon.name}</span>
              <div class="pokemon-type-colors">
                ${pokemon.types.map(type => html`<div class="circle-color-type" style="background-color: ${TYPE_COLOR[type.type.name] || '#777'}" />`)}
              </div>
            </div>
          </div>
          `)}
      </div>
      ${this.pokemonsDetailArray.length === 0
        ? html`<div>
              No Pokémons Found
            </div>`
        : null
      }
      ${this.pokemonsDetailArray.length > 0
        ? html`<div class="pagination-buttons">
              <button class="round-button flip" @click=${this.prevPage} ?disabled=${!this.hasPrev}>➜</button>
              <span>${Math.floor(this.listOffset / this.listLimit) + 1}</span>
              <button class="round-button" @click=${this.nextPage} ?disabled=${!this.hasNext}>➜</button>
            </div>`
        : null
      }
    `
  }

  static styles = [
    cardStyles,
    globalStyles,
    css`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
        gap: 2rem;
      }

      .pokemon-card {
        display: flex;
        flex-direction: column;
        position: relative;
        cursor: pointer;
        padding: 0;
      }

      .pokemon-title {
        display: flex;
        justify-content: space-between;
        border: 2.5px solid black;
        text-transform: capitalize;
        border-top: 0;
        padding: 2px 5px;
      }

      .pokemon-id {
        position: absolute;
        top: 5px;
        right: 5px;
      }

      .pokemon-type-colors {
        display: flex;
        align-items: center;
      }

      .circle-color-type {
        margin-left: 4px;
        width: 16px;
      }

      .pagination-buttons {
        margin: 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 16px;
      }
    `
  ];

}

declare global {
  interface HTMLElementTagNameMap {
    'pokemon-list': PokemonList
  }
}
