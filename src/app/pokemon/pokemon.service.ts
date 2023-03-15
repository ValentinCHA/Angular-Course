import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}
  
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((pokemonList) =>this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  serachPokemonList(term: string): Observable<Pokemon[]> {

    if (!term.trim() || term.length < 2) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    );
    }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }
    return this.http.put<Pokemon>(`api/pokemons/${pokemon.id}`, pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
}

addPokemon(pokemon: Pokemon): Observable<Pokemon> {
  const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }
  return this.http.post<Pokemon>("api/pokemons", pokemon, httpOptions).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, pokemon))
  );
}

deletePokemonById(pokemonId: number): Observable<null> {
  return this.http.delete<null>(`api/pokemons/${pokemonId}`).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, null))
  );
}



  private log(response: Pokemon[] | Pokemon | undefined| null): void {
    console.log(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): Array<string> | string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
    ];
  }
}




  // getPokemonList(): Pokemon[] {
  //   return POKEMONS;
  // }  

  // getPokemonById(pokemonId: number): Pokemon | undefined {
  //   return POKEMONS.find((pokemon) => pokemon.id === pokemonId);
  // }