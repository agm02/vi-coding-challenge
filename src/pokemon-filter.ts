import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { cardStyles, globalStyles } from './styles/main'
import type { PokemonType } from './utils/interfaces'
import { TYPE_COLOR } from './utils/colors'

/**
 * Pokémon type filter component.
 */
@customElement('pokemon-filter')
export class PokemonFilter extends LitElement {
  @state() updatedPokemonTypes: PokemonType[] = [];

  /**
   * List of Pokémons
   */
  @property({ type: Array })
  pokemonTypes: PokemonType[] = [];


  /**
   * Function that will monitor any change in the properties, to update the Pokémon types list
   * @param changedProperties 
   */
  updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('pokemonTypes') && this.updatedPokemonTypes.length === 0) {
      this.updatedPokemonTypes = [...this.pokemonTypes];
    }
  }

  /**
   * Function that will be triggered everytime the user toggles a Pokémon type
   * @param typeIndex Pokémon type index
   */
  private _typeToggled(typeIndex: number) {
    this.dispatchEvent(new CustomEvent('type-toggled', {
      detail: { typeIndex },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
        <div class="card">
          <p>Filter</p>
          <p>Type</p>
          <div style="display: flex; flex-direction: column;">
            ${this.pokemonTypes.map((type, index) => html`
              <div class="pokemon-filter-input">
                <input type="checkbox" name="${type.name}" value=${type.checked} @change=${() => this._typeToggled(index)} >
                  ${type.name}
                </input>
                <div class="circle-color-type" style="background-color: ${TYPE_COLOR[type.name] || '#777'}"></div>
              </div>
              `)}
          </div>
        </div>
    `
  }

  static styles = [
    cardStyles,
    globalStyles,
    css`
      .pokemon-filter-input {
        display: flex; 
        align-items: center;
        text-transform: capitalize;
      }
    `
  ];

}

declare global {
  interface HTMLElementTagNameMap {
    'pokemon-filter': PokemonFilter
  }
}
