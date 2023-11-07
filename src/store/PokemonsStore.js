import { makeAutoObservable, toJS } from "mobx";

class PokemonsStore {
    constructor() {
        this._pokemons = [];
        this._selectedTypes = [];
        this._currentMode = 'list';
        this._allLightData = '';
        this._lastAddedCard = {};
        makeAutoObservable(this)
    };

    setLastAddedCard(card) {
        this._lastAddedCard = card;
    }

    setSelectedType(type) {
        this._selectedTypes = type;
    };

    setPokemons(pokemons) {
        this._pokemons = pokemons;
    };

    setCurrentMode(mode) {
        this._currentMode = mode;
    };

    addPokemon(pokemon) {
        this._pokemons.push(pokemon);
    };

    setAllLightData(data) {
        this._allLightData = data;
    };

    get lastAddedCard() {
        return toJS(this._lastAddedCard);
    };

    get allLightData() {
        return toJS(this._allLightData);
    };

    get allPokemons() {
        return toJS(this._pokemons);
    };

    get selectedTypes() {
        return toJS(this._selectedTypes);
    };

    get currentMode() {
        return toJS(this._currentMode)
    }
};

export default new PokemonsStore();