import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from '../pokemon';
import { PokemonService } from "../pokemon.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: Array<string>;
  isAddForm: boolean;

  constructor(private PokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.types = this.PokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add')
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string): void {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      this.pokemon.types = this.pokemon.types.filter((t) => t !== type);
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    // console.log("THIS POKEMON =>", this.pokemon);
    if (this.isAddForm) {
      this.PokemonService.addPokemon(this.pokemon).subscribe(
        (pokemon: Pokemon) => this.router.navigate(["/pokemon", pokemon.id]),
        // (error) => console.log(error)
      );
    } else {
    this.PokemonService.updatePokemon(this.pokemon).subscribe(
      () => this.router.navigate(["/pokemon", this.pokemon.id])
    );
  }}
}
