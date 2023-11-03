export const filterBySearch = (pokemons, search) => {
    return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()));
};

export const filterByTypes = (pokemons, namesSet) => {
    return pokemons.filter((pokemon) => namesSet.has(pokemon.name))
}