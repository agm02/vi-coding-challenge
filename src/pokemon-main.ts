import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { cardStyles, globalStyles } from './styles/main'
import './pokemon-filter';
import './pokemon-list';
import { getAllTypes } from './utils/api';
import type { PokemonType } from './utils/interfaces';

/**
 * Main Pokémon component 
 */
@customElement('pokemon-main')
export class PokemonMain extends LitElement {
  @state() allPokemonTypes: PokemonType[] = [];
  @state() checkedPokemonTypes: PokemonType[] = [];

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
   * Optional title
   */
  @property({ type: String })
  title: string = "These are our products"

  /**
   * Fetch every Pokémon type
   */
  async connectedCallback() {
    super.connectedCallback();
    try {
      this.allPokemonTypes = (await getAllTypes()).results;
    } catch (e) {
      console.error('Failed to fetch data', e);
    }
  }

  /**
   * Function that will be triggered everytime the user toggles a Pokémon type in the filter
   * @param e Custom event, with the index of the toggled Pokémon type
   */
  private _filtersChanged(e: CustomEvent<{ typeIndex: number }>) {
    this.allPokemonTypes = this.allPokemonTypes.map((type, i) =>
      i === e.detail.typeIndex ? { ...type, checked: !type.checked } : type
    );

    this.checkedPokemonTypes = this.allPokemonTypes.filter(type => type.checked)
  }

  render() {
    if (this.allPokemonTypes.length === 0) return html`<p>Loading...</p>`

    return html`
      <div class="outer-layout">
        <h1>${this.title}</h1>
        <div class="layout">
          <pokemon-filter .pokemonTypes=${this.allPokemonTypes} @type-toggled=${this._filtersChanged}></pokemon-filter>
          <pokemon-list .listOffset=${this.listOffset} .listLimit=${this.listLimit} .pokemonTypes=${this.checkedPokemonTypes}></pokemon-list>
        </div>
      </div>
    `
  }

  static styles = [
    cardStyles,
    globalStyles,
    css`
      .outer-layout {
        margin: 40px 10rem;
        font-family: Arial, sans-serif;
      }

      .layout {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 2rem;
      }
    `
  ];

}

declare global {
  interface HTMLElementTagNameMap {
    'pokemon-main': PokemonMain
  }
}
