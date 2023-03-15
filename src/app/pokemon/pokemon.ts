export class Pokemon {
    id: number;
    name: string;
    picture: string;
    hp: number;
    cp: number;
    types: Array<string>;
    created: Date;

    constructor(
        name: string = "Entre un nom",
        picture: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png",
        hp: number = 100,
        cp: number = 10,
        types: Array<string> = ["Normal"],
        created: Date = new Date()
    ) {
        this.name = name;
        this.picture = picture;
        this.hp = hp;
        this.cp = cp;
        this.types = types;
        this.created = created;
    }

}