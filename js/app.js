//Constante que armazena a ur
const getPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(151).fill().map((_, index) =>
    fetch(getPokemon(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumullator, { id, name, types }) => {

    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    if (elementTypes[1] === undefined) {
        accumullator +=
            `
            <li class="card-primario ${elementTypes[0]}-back">
                <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" onclick="getUniquePokemon(${id})"}>
                <h2 clas="name">#${id}  ${name}</h2>
                <span class="card-subtitle type ${elementTypes[0]}">${elementTypes[0]}
            </li>
            `
        return accumullator
    }
    else {
        accumullator +=
            `
            <li class="card-primario ${elementTypes[0]}-back">
                <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" onclick="getUniquePokemon(${id})"}>
                <h2 clas="name">#${id}  ${name}</h2>
                <span class="card-subtitle type ${elementTypes[0]}">${elementTypes[0]}</span><span card-subtitle class="${elementTypes[1]} type">${elementTypes[1]}</span>
            </li>
            `
        return accumullator
    }

}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}


const pokemonPromises = generatePokemonPromisses()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)


function getUniquePokemon(id) {
    location.href = "poke-info.html"
    const getPokemon = `${url}${id}`

    const pokemon = fetch(getPokemon).then(response => response.json())

    console.log(pokemon.name)

}