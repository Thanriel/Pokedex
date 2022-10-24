const url = `https://pokeapi.co/api/v2/pokemon/`


const fetchPokemon = () => {
    const getPokemon = id => `${url}${id}`

    const pokemonPromises = [] 

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemon(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumullator, pokemon) => {
                
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumullator += 
                    `
                    <li class="card-primario" onclick="getUniquePokemon(${pokemon.id})">
                        <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" ${onclick="console.log('teste')"}>
                        <h2 clas="name">#${pokemon.id}  ${pokemon.name}</h2>
                        <span class="card-subtitle type ${types[0]}">${types[0]}</span><span card-subtitle class="${types[1]} type">${types[1]}</span>
                    </li>
                    `
                return accumullator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })
}


fetchPokemon()



function getUniquePokemon (id) {
    location.href = "poke-info.html"
    const getPokemon = `${url}${id}`

}