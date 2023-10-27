import { makeAutoObservable, toJS } from "mobx";

class PokemonsStore {
    constructor() {
        this._pokemons = [];
        makeAutoObservable(this)
    };

    setPokemons(pokemons) {
        this._pokemons = pokemons;
    };

    get allPokemons() {
        return toJS(this._pokemons);
    };
};

export default new PokemonsStore();