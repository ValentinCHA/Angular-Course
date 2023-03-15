import { Component, OnInit } from "@angular/core";
import { Pokemon } from '../pokemon';
import { Router } from "@angular/router";
import { PokemonService } from '../pokemon.service';

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  // pokemonSelected: Pokemon | undefined;

  constructor(private router: Router, private PokemonService: PokemonService) {}

  ngOnInit() {
    this.PokemonService.getPokemonList()
    .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id]);
  }




  // ngOnInit() {
  //   console.table(this.pokemonList);
  // }

  // selectPokemon(pokemonId: string) {
  //   const pokemon: Pokemon | undefined = this.pokemonList.find(
  //     (pokemon) => pokemon.id === +pokemonId
  //   );
  //   if (pokemon) {
  //     console.log(`Vous avez clique que le pokémon ${pokemon.name}`);
  //     this.pokemonSelected = pokemon;
  //   } else {
  //     console.log(`Vous avez demandé un pokemon qui n'existe pas`);
  //     this.pokemonSelected = undefined;
  //   }
  // }

}
