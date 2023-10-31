export const BASE_URL = 'https://pokeapi.co/api/v2/';

// const filteredPokemons = useMemo(() => {
//     let filtredTasks;
//     if (searchValue.length > 0 && PokemonsStore.selectedTypes.length > 0) {
//         filtredTasks = PokemonsStore.allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()));
//         return filtredTasks.filter((pokemon) => {
//             return pokemon.types.every((type) => PokemonsStore.selectedTypes.includes(type.type.name));
//         })
//     } else if (PokemonsStore.selectedTypes.length > 0) {
//         return PokemonsStore.allPokemons.filter((pokemon) => {
//             return pokemon.types.every((type) => PokemonsStore.selectedTypes.includes(type.type.name));
//         })
//     } else if (searchValue.length > 0) {
//         return PokemonsStore.allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()));
//     }
//     return filtredTasks;
// }, [searchValue, PokemonsStore.selectedTypes]);

export const filterByParams = (pokemons, search, types) => {
    return pokemons.filter((pokemon) => {
        return (
            pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.types.every((type) => types.includes(type.type.name))
        )
    })
};

export const filterBySearch = (pokemons, search) => {
    return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()));
};

export const filterByTypes = (pokemons, types) => {
    return pokemons.filter((pokemon) => {
        return pokemon.types.every((type) => types.includes(type.type.name));
    })
};