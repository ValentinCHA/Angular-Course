import { Component } from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent {

  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon|undefined;

  selectPokemon(pokemonId : string) {
    const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id === +pokemonId);
    if (pokemon) {
    console.log(`Vous avez clique que le pokémon ${pokemon.name}`);
    this.pokemonSelected = pokemon;
  } else {
    console.log(`Vous avez demandé un pokemon qui n'existe pas`);
    this.pokemonSelected = undefined;
  }
}

}
