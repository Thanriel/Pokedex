const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = [] 

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumullator, pokemon) => {
                
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumullator += 
                    `<li class="card-primario">
                        <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                        <h2 clas="name">#${pokemon.id}  ${pokemon.name}</h2>
                        <span class="card-subtitle type ${types[0]}">${types[0]}</span><span card-subtitle class="${types[1]} type">${types[1]}</span>
                    </li>`
                return accumullator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
}


fetchPokemon()