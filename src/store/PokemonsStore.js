import { makeAutoObservable, toJS } from "mobx";

class PokemonsStore {
    constructor() {
        this._pokemons = [];
        this._selectedTypes = [];
        makeAutoObservable(this)
    };

    setSelectedType(type) {
        this._selectedTypes = type;
    };

    setPokemons(pokemons) {
        this._pokemons = pokemons;
    };

    addPokemon(pokemon) {
        this._pokemons.push(pokemon);
    }

    get allPokemons() {
        return toJS(this._pokemons);
    };

    get selectedTypes() {
        return toJS(this._selectedTypes);
    }
};

export default new PokemonsStore();