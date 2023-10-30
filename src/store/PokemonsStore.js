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

    clearDataOfPokemons() {
        this._pokemons = [];
    }

    setPokemons(pokemons) {
        this._pokemons = pokemons;
    };

    get allPokemons() {
        return toJS(this._pokemons);
    };

    get selectedTypes() {
        return toJS(this._selectedTypes);
    }
};

export default new PokemonsStore();