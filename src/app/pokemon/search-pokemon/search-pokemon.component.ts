import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  // {..."a"..."ab"...}
  searchTerms= new Subject<string>(); // flux de données asynchrones dans le temps
  // {...pokemonList(a)...pokemonList(ab)...}
  pokemons$: Observable<Pokemon[]>;// Un Subject est un Observable également mais il est possible de lui permettre de nouvelles données dynamiquement.

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // le async pipe dans le template permet de faire le subscribe et unsubscribe automatiquement 
    this.pokemons$ = this.searchTerms.pipe(
      // attendre 300ms de pause entre chaque requete
      debounceTime(300),
      // ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      // on retourne la liste des pokemons correspondant au terme de recherche
      switchMap((term: string) => this.pokemonService.serachPokemonList(term)),
    );
  }

  search(term: string) {
    console.log('Search term: ', term);
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);

}

}
